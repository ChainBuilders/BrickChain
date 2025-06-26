// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../access/AccessManager.sol";
import "./IVault.sol";

/// @title AssetVault
/// @notice Vault for holding tokenized asset (ERC20), handling purchase, burn, withdrawal
/// @dev Uses centralized AccessManager  role checks

contract AssetVault is IAssetVault {
    IERC20 public assetToken;
    uint256 public pricePerToken;
    address payable public treasury;
    string public propertyName;

    AccessManager public accessManager;

 


    mapping (bytes32 => Ivestors) inverstor;

    /// @notice Vault constructor
    /// @param _assetToken Address of the ERC20 token contract
    /// @param _pricePerToken Token price
    /// @param _treasury address to recieve ETH
    /// @param _accessManager Centralized AccessManager address
    constructor(
        address _assetToken,
        uint256 _pricePerToken,
        address payable _treasury,
        address _accessManager
    ) {
        require(_assetToken != address(0), "Invalid token address");
        require(_treasury != address(0), "Invalid treasury");
        // require(_accessManager != address(0), "Invalid access manager");

        assetToken = IERC20(_assetToken);
        pricePerToken = _pricePerToken;
        treasury = _treasury;
        accessManager = AccessManager(_accessManager);
    }

    /// @notice Only ADMIN or property-specific permission
    modifier onlyAuthorized() {
        require(accessManager.hasRole(accessManager.ADMIN_ROLE(), msg.sender));
        _;
    }

    /// @notice KYC and blacklist check for buyers
    modifier onlyEligibleBuyer() {
        require(accessManager.isKYCVerified(msg.sender), "Not KYC verified");
        require(
            !accessManager.isBlacklisted(msg.sender),
            "this user is Blacklisted"
        );
        _;
    }

    /// @notice Investor buy nth Token using ETH
    /// @param tokenAmount amount of share to buy
    /// @dev only eligible investors can buy this property
    function purchaseTokens(
        uint256 tokenAmount
    ) external payable onlyEligibleBuyer {
        uint256 requiredPayment = tokenAmount * pricePerToken;
        require(msg.value >= requiredPayment, "Insufficient payment");

        uint256 vaultBalance = assetToken.balanceOf(address(this));
        require(vaultBalance >= tokenAmount, "Not enough tokens in Vault");

        // Transfer ETH to treasury
        treasury.transfer(msg.value);

        // Transfer tokens to buyer
        assetToken.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }

    /// @notice Burn unsold tokens
    /// @param amount Total amount to burn
    /// @dev Only Authorized sender can call the fuction
    function burnTokens(uint256 amount) external onlyAuthorized {
        uint256 vaultBalance = assetToken.balanceOf(address(this));
        require(vaultBalance >= amount, "Not enough tokens to burn");

        // Burn: send to dead address
        assetToken.transfer(
            address(0x000000000000000000000000000000000000dEaD),
            amount
        );

        emit TokensBurned(amount);
    }

    /// @notice Withdraw unsold tokens to external wallet
    /// @param amount Quantities of token to withdraw
    /// @param to  Wallet to withdraw to
    /// @dev Only Authorized sender can call the fuction
    function withdrawTokens(
        uint256 amount,
        address to
    ) external onlyAuthorized {
        require(to != address(0), "Invalid recipient");
        uint256 vaultBalance = assetToken.balanceOf(address(this));
        require(vaultBalance >= amount, "Not enough tokens");

        assetToken.transfer(to, amount);
    }
    

    /// @notice Update token price
    /// @param newPrice New price of the token
    /// @dev Only Authorized sender can call the fuction
    // function setPrice(uint256 newPrice) external onlyAuthorized {
    //     pricePerToken = newPrice;

    //     emit PriceUpdated(newPrice);
    // }

    /// @notice Update treasury address
    /// @param newTreasury set a new withrawal address
    /// @dev Only Authorized sender can call the fuction
    // function setTreasury(address payable newTreasury) external onlyAuthorized {
    //     require(newTreasury != address(0), "Invalid treasury");
    //     treasury = newTreasury;

    //     emit TreasuryUpdated(newTreasury);
    // }
}
