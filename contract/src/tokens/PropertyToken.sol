
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../access/AccessManager.sol";

/// @title PropertyToken
/// @notice Standard ERC20 token representing fractional ownership of a property
contract PropertyToken is ERC20, Ownable {

      AccessManager public accessManager;

    string public propertyName;
    string public propertySymbol;
    string public propertyURI;

    /// @notice Constructor mints full supply to the Realtor
    /// @param name Token name
    /// @param symbol Token symbol
    /// @param totalSupply Total tokens to be minted (based on property value)
    /// @param owner Address receiving all minted tokens
     /// @param owner Realtor address (initial owner)
    /// @param _propertyURI Off-chain metadata URI
    /// @param accessManagerAddress Address of AccessManager contract
    constructor(
         address accessManagerAddress,
        string memory name, // Property name
        string memory symbol, // Token symbol (e.g. "BRICK1")
        uint256 totalSupply, // Total token supply
        string memory tokenName, // ERC20 token name
        string memory tokenSymbol, // ERC20 token symbol
          string memory _propertyURI,
        address owner // Realtor address
    ) ERC20(tokenName, tokenSymbol) {
        propertyName = name;
        propertySymbol = symbol;
        _mint(owner, totalSupply);
           _transferOwnership(owner);
         accessManager = AccessManager(accessManagerAddress);
    }

      modifier whenNotPaused() {
        require(!accessManager.paused(), "Contract is paused");
        _;
    }

     function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override
        whenNotPaused
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function setPropertyURI(string memory _propertyURI) external onlyOwner {
        propertyURI = _propertyURI;
    }
}
