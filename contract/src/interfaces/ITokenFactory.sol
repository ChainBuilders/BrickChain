// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24; // Updated to match your other contracts

interface ITokenFactory {
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 supply,
        string tokenName,
        string tokenSymbol,
        address indexed owner,
        address kycManager
    );
    /**
     * @notice Deploys a new ERC20 token contract for property tokenization
     * @dev Only callable by the Registry contract
     * @param _name The display name of the property (e.g. "Luxury Villa")
     * @param _symbol The ticker symbol (e.g. "BRICK1")
     * @param _initialSupply Total tokens to mint (in wei units with 18 decimals)
     * @param _tokenName The ERC20 token contract name
     * @param _tokenSymbol The ERC20 token contract symbol
     * @param _realtor Address that will receive all minted tokens
     * @param kycManager Address of kycManager contract
     * @return tokenAddress The address of the newly deployed PropertyToken
     */

    function createToken(
        string calldata _name,
        string calldata _symbol,
        uint256 _initialSupply,
        string calldata _tokenName,
        string calldata _tokenSymbol,
        address _realtor,
        address kycManager
    ) external returns (address tokenAddress);
}
