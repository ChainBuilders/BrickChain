// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../tokens/PropertyToken.sol";
import {ITokenFactory} from "../interfaces/ITokenFactory.sol";

/// @title TokenFactory
/// @notice Deploys ERC20 tokens for properties and assigns full ownership to the Realtor
/// @dev Only callable by the Registry contract
contract TokenFactory is ITokenFactory {
    address public immutable registry; // Made immutable since it will be set once in constructor

    // event TokenCreated(
    //     address indexed tokenAddress,
    //     string name,
    //     string symbol,
    //     uint256 supply,
    //     string tokenName,
    //     string tokenSymbol,
    //     address indexed owner
    // );

    constructor(address _registry) {
        require(_registry != address(0), "Invalid registry address");
        registry = _registry;
    }

    modifier onlyRegistry() {
        require(msg.sender == registry, "Not authorized");
        _;
    }

    /// @notice Deploys a new PropertyToken ERC20 contract
    /// @param name The display name of the token
    /// @param symbol The ticker symbol (3-6 chars recommended)
    /// @param totalSupply Total tokens to mint (in wei units)
    /// @param tokenName Internal name for the token contract
    /// @param tokenSymbol Internal symbol for the token contract
    /// @param owner Address that will receive all minted tokens
    /// @param propertyURI Metadata URI for the property
    /// @param kycManager Address of the KYC manager contract
    /// @param vault Address where the tokens will be sent initially
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        string memory tokenName,
        string memory tokenSymbol,
        string memory propertyURI,
        address kycManager,
        address owner, // This is the Realtor who will own the tokens
        // The vault address is where the tokens will be sent initially
        address vault
    ) external onlyRegistry returns (address) {
        require(totalSupply > 0, "Invalid supply");
        require(bytes(symbol).length > 0, "Symbol required");
        require(vault != address(0), "Invalid owner");

        PropertyToken token = new PropertyToken(
            kycManager, // address accessManagerAddress
            name, // string memory name (property name)
            symbol, // string memory symbol (property symbol)
            totalSupply, // uint256
            tokenName, // string memory tokenName (ERC20 name)
            tokenSymbol, // string memory tokenSymbol (ERC20 symbol)
            propertyURI, // string memory _propertyURI (metadata URI)
            vault // ✅ address owner — tokens go to the vault);
        );

        emit TokenCreated(address(token), name, symbol, totalSupply, tokenName, tokenSymbol, owner, kycManager, vault);
        return address(token);
    }
}
