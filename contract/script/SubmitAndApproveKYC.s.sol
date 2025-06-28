// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/kyc/KYCManager.sol";

contract SubmitAndApproveKYC is Script {
    /// @notice Submits and approves KYC for a realtor
    /// @dev Calls submitKYC and approveKYC
    function run() external {
        bytes32 deployerPrivateKey = vm.envBytes32("PRIVATE_KEY");
        address deployer = vm.addr(uint256(deployerPrivateKey));
        console.log("Deployer address:", deployer);

        address kycManager = vm.envAddress("KYC_MANAGER_ADDRESS");
        address realtor = vm.envAddress("REALTOR_ADDRESS");
        console.log("KYCManager address:", kycManager);
        console.log("Realtor address:", realtor);

        require(kycManager != address(0), "Invalid KYCManager address");
        require(realtor != address(0), "Invalid realtor address");

        vm.startBroadcast(uint256(deployerPrivateKey));
        KYCManager km = KYCManager(kycManager);
        vm.prank(realtor);
        km.submitKYC("Realtor Name", "realtor@example.com", "123456789", "1234567890");
        km.approveKYC(realtor);
        console.log("KYC submitted and approved for:", realtor);
        vm.stopBroadcast();
    }
}