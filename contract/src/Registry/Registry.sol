// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {RegistryStorage} from "./RegistryStorage.sol";
import {IRegistry} from "./IRegistry.sol";
import {ITokenFactory} from "../interfaces/ITokenFactory.sol";
import {PriceConverter} from "../utils/PriceConverter.sol";
import {SymbolUtils} from "../utils/SymbolUtils.sol";
import {StringUtils} from "../utils/StringUtils.sol";
import {IKYCManager} from "../interfaces/IKYCManager.sol";
import {AccessManager} from "../access/AccessManager.sol";

contract Registry is AccessManager, RegistryStorage, IRegistry {
    using StringUtils for uint256;
    using StringUtils for string;
    using SymbolUtils for string;
    using PriceConverter for uint256;

    IKYCManager public kycManager;

    constructor(address admin, address _tokenFactory, uint256 _listingFee, address _feeRecipient, address _priceFeed, address _kycManager) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _setTokenFactory(_tokenFactory);
        listingFee = _listingFee;
        _setFeeRecipient(_feeRecipient);
        priceFeed = AggregatorV3Interface(_priceFeed);
        kycManager = IKYCManager(_kycManager);
    }

    // ========== MODIFIERS ==========
    modifier onlyRealtor() {
        require(hasRole(REALTOR_ROLE, msg.sender), "Not authorized: Realtor only");
        _;
    }

    modifier validProperty(uint256 propertyId) {
        require(propertyId > 0 && propertyId <= propertyCounter, "Invalid property ID");
        _;
    }

    // ========== MAIN FUNCTIONS ==========
    function registerProperty(
        string calldata _name,
        string calldata _location,
        uint256 _totalValueUSD,
        string calldata _description,
        uint256 _pricePerTokenUSD,
        string calldata _metadataURI

    ) external payable onlyRealtor {
        // Input validation
        require(kycManager.isKYCApproved(msg.sender), "KYC not approved");
        require(_totalValueUSD > 0, "Total property value must be > 0");
        require(bytes(_name).length > 0, "Property name is required");
        require(_isValidURI(_metadataURI), "Invalid metadata URI");

        // Tier-based pricing validation
        if (_totalValueUSD < 50_000) {
            require(_pricePerTokenUSD == 5, "Token price must be $5 for properties < $50k");
        } else if (_totalValueUSD <= 150_000) {
            require(_pricePerTokenUSD == 10, "Token price must be $10 for $50k-$150k");
        } else {
            require(_pricePerTokenUSD == 20, "Token price must be $20 for properties > $150k");
        }

        // Fee calculation and transfer
        uint256 listingFeeUSD = (_totalValueUSD * 15) / 100;
        uint256 listingFeeETH = listingFeeUSD.getETHAmountFromUSD(priceFeed);
        require(msg.value >= listingFeeETH, "Insufficient listing fee");

        (bool sent,) = feeRecipient.call{value: msg.value}("");
        require(sent, "Fee transfer failed");
        emit FeeTransferred(feeRecipient, msg.value);

        // Property registration
        propertyCounter++;
        uint256 newPropertyId = propertyCounter;

        string memory tokenSymbol = SymbolUtils.generateSymbol(_name, newPropertyId);
        string memory tokenName = SymbolUtils.generateName(_name, newPropertyId);
        uint256 tokenSupply = _calculateTokenSupply(_totalValueUSD, _pricePerTokenUSD);

        address token = tokenFactory.createToken(
            _name,
            string(abi.encodePacked("BRICK", newPropertyId.toString())),
            tokenSupply,
            tokenName,
            tokenSymbol,
            msg.sender,
            address(kycManager)
        );

        // Store property data
        properties[newPropertyId] = RegistryStorage.Property({
            id: newPropertyId,
            name: _name,
            location: _location,
            totalValue: _totalValueUSD,
            tokenAddress: token,
            realtor: msg.sender,
            description: _description,
            isActive: true,
            metadataURI: _metadataURI,
            listedFee: listingFeeUSD,
            pricePerToken: _pricePerTokenUSD,
            timestamp: block.timestamp,
            tokenSupply: tokenSupply,
            realtorPropertyCount: realtorToProperties[msg.sender].length + 1
        });

        realtorToProperties[msg.sender].push(newPropertyId);

        emit PropertyRegistered(
            newPropertyId, msg.sender, _name, _description, listingFeeUSD, _metadataURI, block.timestamp
        );
        emit RealtorPropertyCount(msg.sender, realtorToProperties[msg.sender].length);

        emit TokenLinked(newPropertyId, token);
    }

    // ========== INTERNAL FUNCTIONS ==========
    function _calculateTokenSupply(uint256 totalValueUSD, uint256 pricePerTokenUSD) internal pure returns (uint256) {
        require(pricePerTokenUSD > 0, "Token price must be greater than zero");
        return (totalValueUSD * 1e18) / pricePerTokenUSD;
    }

    function _isValidURI(string calldata uri) internal pure returns (bool) {
        bytes memory uriBytes = bytes(uri);
        if (uriBytes.length < 9) return false;

        bytes memory ipfsPrefix = bytes("ipfs://");
        bytes memory httpsPrefix = bytes("https://");

        return _startsWith(uriBytes, ipfsPrefix) || _startsWith(uriBytes, httpsPrefix);
    }

    function _startsWith(bytes memory data, bytes memory prefix) internal pure returns (bool) {
        if (data.length < prefix.length) return false;
        for (uint256 i = 0; i < prefix.length; i++) {
            if (data[i] != prefix[i]) return false;
        }
        return true;
    }

    // ========== VIEW FUNCTIONS ==========
    function calculateTokenSupply(uint256 totalValueUSD, uint256 pricePerTokenUSD) public pure returns (uint256) {
        return _calculateTokenSupply(totalValueUSD, pricePerTokenUSD);
    }

    function updatePropertyStatus(uint256 propertyId, bool _isActive) external validProperty(propertyId) {
        Property storage prop = properties[propertyId];
        require(msg.sender == prop.realtor || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not authorized");
        prop.isActive = _isActive;
        emit PropertyStatusUpdated(propertyId, _isActive);
    }

    function deactivateProperty(uint256 propertyId) external onlyRole(DEFAULT_ADMIN_ROLE) validProperty(propertyId) {
        properties[propertyId].isActive = false;
        emit PropertyDeactivated(propertyId);
    }

    function grantRealtorRole(address realtor) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(REALTOR_ROLE, realtor);
    }

    function revokeRealtorRole(address realtor) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(REALTOR_ROLE, realtor);
    }

    function getPropertiesByRealtor(address _realtor) external view returns (uint256[] memory) {
        return realtorToProperties[_realtor];
    }

    function getProperty(uint256 propertyId)
        external
        view
        validProperty(propertyId)
        returns (RegistryStorage.Property memory)
    {
        return properties[propertyId];
    }

    function updateFeeRecipient(address newRecipient) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newRecipient != address(0), "Invalid address");
        feeRecipient = newRecipient;
        emit FeeRecipientUpdated(newRecipient);
    }

    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(feeRecipient).transfer(balance);
    }

    function updateTokenFactory(address newFactory) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newFactory != address(0), "Invalid address");
        tokenFactory = ITokenFactory(newFactory);
        emit TokenFactoryUpdated(newFactory);
    }

    function getAllProperties() external view returns (RegistryStorage.Property[] memory) {
        RegistryStorage.Property[] memory props = new RegistryStorage.Property[](propertyCounter);
        for (uint256 i = 1; i <= propertyCounter; i++) {
            props[i - 1] = properties[i];
        }
        return props;
    }

    // ========== PRIVATE HELPERS ==========
    function _setTokenFactory(address _tokenFactory) private {
        require(_tokenFactory != address(0), "Invalid token factory");
        tokenFactory = ITokenFactory(_tokenFactory);
    }

    function _setFeeRecipient(address _feeRecipient) private {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        feeRecipient = _feeRecipient;
    }
}
