// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IAssetVault {
    function purchaseTokens(uint256 tokenAmount) external payable;
    function burnTokens(uint256 amount) external;
    function withdrawTokens(uint256 amount, address to) external;
    function setPrice(uint256 newPrice) external;
    function setTreasury(address payable newTreasury) external;

    event TokensPurchased(address indexed buyer, uint256 tokenAmount, uint256 ethPaid);
    event TokensBurned(uint256 amount);
    event TokensWithdrawn(address indexed to, uint256 amount);
    event PriceUpdated(uint256 newPrice);
    event TreasuryUpdated(address indexed newTreasury);
}
