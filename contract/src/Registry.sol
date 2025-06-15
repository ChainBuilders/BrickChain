// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// OpenZeppelin library for role-based access control
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

// String conversion helper for uint256 -> string (used in symbol naming)
import {StringUtils} from "./StringUtils.sol";

// Import the AggregatorV3Interface contract from Chainlink
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

// Import price-converter library
import {PriceConverter} from "./PriceConverter.sol";

// Interface to the TokenFactory responsible for creating property tokens
interface ITokenFactory {
    function createToken(
        string calldata name,
        string calldata symbol,
        uint256 totalSupply,
        address owner
    ) external returns (address);
}

contract Registry is AccessControl {
    using StringUtils for uint256;
    using PriceConverter for uint256;

    // Role constant for Realtors
    bytes32 public constant REALTOR_ROLE = keccak256("REALTOR_ROLE");

    // Counter to track number of registered properties
    uint256 public propertyCounter;

    // TokenFactory contract to mint new tokens
    ITokenFactory public tokenFactory;

    // Fixed listing fee in USD (percentage of property value)
    uint256 public listingFee; // Not used after dynamic fee is introduced

    // Address to receive listing fees
    address public feeRecipient;

    // Chainlink Price Feed for ETH/USD
    AggregatorV3Interface internal priceFeed;

    // Property structure
    struct Property {
        uint256 id;
        string name;
        string location;
        uint256 totalValue;      // Property value in USD
        address tokenAddress;    // ERC20 token address tied to this property
        address realtor;         // Realtor who registered the property
        string description;      // Property description
        bool isActive;           // Active status (soft delete)
        string metadataURI;      // Metadata image or JSON
        uint256 listedFee;       // Listing fee charged (in USD)
    }

    // Mappings
    mapping(uint256 => Property) public properties;
    mapping(address => uint256[]) public realtorToProperties;

    // Events
    event PropertyRegistered(uint256 indexed propertyId, address indexed realtor, string name, string description, uint256 listedFee, string metadataURI);
    event TokenLinked(uint256 indexed propertyId, address tokenAddress);
    event PropertyStatusUpdated(uint256 indexed propertyId, bool isActive);
    event PropertyDeactivated(uint256 indexed propertyId);
    event TokenFactoryUpdated(address newFactory);

    /// @notice Constructor to initialize the contract
    /// @param admin Address with admin privileges
    /// @param _tokenFactory TokenFactory address
    /// @param _listingFee Static listing fee (not used anymore)
    /// @param _feeRecipient Address to collect listing fees
    /// @param _priceFeed Address of the Chainlink price feed contract
    constructor(address admin, address _tokenFactory, uint256 _listingFee, address _feeRecipient, address _priceFeed) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        tokenFactory = ITokenFactory(_tokenFactory);
        listingFee = _listingFee;
        feeRecipient = _feeRecipient;
        priceFeed = AggregatorV3Interface(_priceFeed); // e.g., ETH/USD
    }

    // Restrict function to only Realtors
    modifier onlyRealtor() {
        require(hasRole(REALTOR_ROLE, msg.sender), "Not authorized: Realtor only");
        _;
    }

    /// @notice Register a new property and mint a token
    function registerProperty(
        string memory _name,
        string memory _location,
        uint256 _totalValueUSD,
        string memory _description,
        uint256 _pricePerTokenUSD, // Realtor-suggested token price
        string memory _metadataURI
    ) external payable onlyRealtor {

         // --- Enforcing tiered based pricing rules i am tired ooo obed---
    if (_totalValueUSD < 50000) {
        require(_pricePerTokenUSD == 5, "Token price must be exactly $5 for properties under $50k");
    } else if (_totalValueUSD >= 50000 && _totalValueUSD <= 150000) {
        require(
            _pricePerTokenUSD >= 5 && _pricePerTokenUSD <= 12,
            "Token price must be between $5 and $12 for properties between $50k and $150k"
        );
    } else {
        require(
            _pricePerTokenUSD >= 12 && _pricePerTokenUSD <= 20,
            "Token price must be between $12 and $20 for properties over $150k"
        );
    }


        // This calculates the 15% listing fee in USD, then dynamically converts it to ETH using Chainlink's live price feed, ensuring automation and real-time accuracy.

        // --- CALCULATE 15% LISTING FEE IN USD ---
        // first calculates the 15% listing fee in USD,
        uint256 listingFeeUSD = (_totalValueUSD * 15) / 100;

        // --- CONVERT USD FEE TO ETH ---
        // then converts it dynamically converts it to ETH using Chainlink's live price feed, ensuring automation and real-time accuracy
        uint256 listingFeeETH = listingFeeUSD.getETHAmountFromUSD(priceFeed);

        // --- VALIDATE PAYMENT ---
        require(msg.value >= listingFeeETH, "Insufficient listing fee");

        // --- FORWARD THE FEE ---
        (bool sent, ) = feeRecipient.call{value: msg.value}("");
        require(sent, "Fee transfer failed");

       

        // uint256 pricePerToken = 5; // $5 per token
        // uint8 tokenDecimals = 18;


        // //This two lines are responsible for calculating the total supply of tokens that will represent the property value in our real estate tokenization system.
        // uint256 scaledTotalValue = _totalValueUSD * (10 ** tokenDecimals);

        // uint256 tokenSupply = scaledTotalValue / pricePerToken;


        uint256 pricePerToken = 5; // Make this dynamic if needed

        uint256 tokenSupply = calculateTokenSupply(_totalValueUSD, pricePerToken);


        // --- CREATE PROPERTY TOKEN ---
        
         // --- CONTINUE PROPERTY REGISTRATION ---
        propertyCounter++;

        address token = tokenFactory.createToken(
            _name,
            string(abi.encodePacked("BRICK", propertyCounter.toString())),
            tokenSupply,
            msg.sender
        );

        // --- STORE PROPERTY ---
        properties[propertyCounter] = Property({
            id: propertyCounter,
            name: _name,
            location: _location,
            totalValue: _totalValueUSD,
            tokenAddress: token,
            realtor: msg.sender,
            description: _description,
            isActive: true,
            metadataURI: _metadataURI,
            listedFee: listingFeeUSD
        });

        realtorToProperties[msg.sender].push(propertyCounter);

        emit PropertyRegistered(propertyCounter, msg.sender, _name, _description, listingFeeUSD, _metadataURI);
        emit TokenLinked(propertyCounter, token);
    }

    /// @notice Helper to calculate token supply based on USD value and token price
/// @param totalValueUSD The total property value in USD
/// @param pricePerTokenUSD The price of one token in USD
/// @return tokenSupply Total supply of tokens to mint (in 18 decimals)
function calculateTokenSupply(uint256 totalValueUSD, uint256 pricePerTokenUSD) public pure returns (uint256) {
    require(pricePerTokenUSD > 0, "Token price must be greater than zero");

    uint8 tokenDecimals = 18;

    uint256 scaledTotalValue = totalValueUSD * (10 ** tokenDecimals);
    uint256 tokenSupply = scaledTotalValue / pricePerTokenUSD;

    return tokenSupply;
}


    /// @notice Update the status of a property (Active/Inactive)
    function updatePropertyStatus(uint256 propertyId, bool _isActive) external {
        Property storage prop = properties[propertyId];
        require(msg.sender == prop.realtor || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not authorized");
        prop.isActive = _isActive;
        emit PropertyStatusUpdated(propertyId, _isActive);
    }

    /// @notice Soft delete a property by Admin
    function deactivateProperty(uint256 propertyId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Property storage prop = properties[propertyId];
        prop.isActive = false;
        emit PropertyDeactivated(propertyId);
    }

    /// @notice Grant Realtor role to an address
    function grantRealtorRole(address realtor) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(REALTOR_ROLE, realtor);
    }

    /// @notice Get all properties owned by a Realtor
    function getPropertiesByRealtor(address _realtor) external view returns (uint256[] memory) {
        return realtorToProperties[_realtor];
    }

    /// @notice Fetch property details by ID
    function getProperty(uint256 propertyId) external view returns (Property memory) {
        return properties[propertyId];
    }

    /// @notice Update TokenFactory address (Admin only)
    function updateTokenFactory(address newFactory) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newFactory != address(0), "Invalid address");
        tokenFactory = ITokenFactory(newFactory);
        emit TokenFactoryUpdated(newFactory);
    }
}
