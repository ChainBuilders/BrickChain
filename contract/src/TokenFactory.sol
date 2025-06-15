// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./PropertyToken.sol"; // Import the ERC20 token contract

/// @title TokenFactory
/// @notice Deploys ERC20 tokens for properties and assigns full ownership to the Realtor
contract TokenFactory {

    //  add a state variable for the registry address
    address public registry;
    
    /// @dev Emitted when a new PropertyToken is created
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 supply,
        address indexed owner
    );

    // Set it once in the constructor (when deploying the factory):
      constructor(address _registry) {
        registry = _registry;
    }

    // Add a modifier that allows only the registry to call createToken
    modifier onlyRegistry() {
        require(msg.sender == registry, "Not authorized");
        _;
    }

    /// @notice Deploys a new ERC20 token contract (PropertyToken)
    /// @param name Name of the token (e.g. "3-Bedroom Duplex in Lekki")
    /// @param symbol Token symbol (e.g. "BRICK1")
    /// @param totalSupply Total token supply (in smallest units, 18 decimals usually)
    /// @param owner Address to receive all minted tokens (the Realtor)
    /// @return The address of the newly deployed PropertyToken
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner
    ) external onlyRegistry returns (address) {
        PropertyToken token = new PropertyToken(name, symbol, totalSupply, owner);
        emit TokenCreated(address(token), name, symbol, totalSupply, owner);
        return address(token);
    }
}
