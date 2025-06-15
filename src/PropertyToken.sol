// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;

// // Import OpenZeppelin contracts for ERC20 functionality and security features
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
// import "@openzeppelin/contracts/access/AccessControl.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// /**
//  * @title PropertyToken
//  * @dev ERC20 token representing fractional ownership of a real estate property
//  * @notice Each token represents a share of the underlying property
//  */
// contract PropertyToken is ERC20, ERC20Burnable, ERC20Pausable, AccessControl, ReentrancyGuard {
//     using SafeMath for uint256; // Use SafeMath library to prevent integer overflow/underflow

//     // Define role constants using keccak256 hash for unique role identifiers
//     bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE"); // Administrator role for contract management
//     bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE"); // Role for minting new tokens
//     bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE"); // Role for pausing/unpausing contract
//     bytes32 public constant REGISTRY_ROLE = keccak256("REGISTRY_ROLE"); // Role for registry contract interaction

//     // Struct to store comprehensive property information
//     struct PropertyInfo {
//         uint256 propertyId; // Unique identifier for the property
//         string propertyName; // Human-readable name of the property
//         string propertyLocation; // Physical address or location description
//         string propertyType; // Type of property (Residential, Commercial, Industrial)
//         uint256 propertyValue; // Total monetary value of the property in wei
//         uint256 tokenPrice; // Price per individual token in wei
//         string metadataURI; // URI pointing to additional property metadata (IPFS, etc.)
//         uint256 constructionYear; // Year the property was constructed
//         uint256 totalArea; // Total area of the property in square meters
//         string legalDescription; // Legal description of the property for compliance
//     }

//     // Struct to track financial metrics and costs associated with the property
//     struct FinancialInfo {
//         uint256 annualRentalIncome; // Expected annual rental income in wei
//         uint256 maintenanceCosts; // Annual maintenance costs in wei
//         uint256 propertyTaxes; // Annual property tax obligations in wei
//         uint256 insuranceCosts; // Annual insurance premiums in wei
//         uint256 managementFees; // Annual property management fees in wei
//         uint256 lastValuationDate; // Timestamp of the last property valuation
//         uint256 lastValuationAmount; // Amount of the last property valuation in wei
//     }

//     // Struct to manage dividend distribution system
//     struct DividendInfo {
//         uint256 totalDividendsDistributed; // Total amount of dividends distributed to date
//         uint256 dividendPerToken; // Cumulative dividend amount per token
//         uint256 lastDividendDate; // Timestamp of the last dividend distribution
//         mapping(address => uint256) claimedDividends; // Track dividends already claimed by each address
//         mapping(address => uint256) pendingDividends; // Track pending dividends for each address
//     }

//     // Immutable state variables (set once during deployment)
//     address public immutable registry; // Address of the registry contract that created this token
    
//     // Mutable state variables for contract management
//     address public realtor; // Address of the realtor who owns/manages the property
//     address public propertyManager; // Address of the property manager (can be different from realtor)
    
//     // Struct instances to store property and financial data
//     PropertyInfo public propertyInfo; // Instance of PropertyInfo struct containing property details
//     FinancialInfo public financialInfo; // Instance of FinancialInfo struct containing financial data
//     DividendInfo public dividendInfo; // Instance of DividendInfo struct for dividend management

//     // Trading and transfer control variables
//     bool public transfersEnabled = true; // Flag to enable/disable token transfers
//     bool public tradingEnabled = true; // Flag to enable/disable token trading
//     uint256 public minimumHoldingPeriod = 0; // Minimum time (in seconds) before tokens can be transferred
//     uint256 public maximumTokensPerWallet = 0; // Maximum number of tokens any wallet can hold (0 = no limit)
    
//     // Compliance and KYC mappings
//     mapping(address => bool) public whitelistedInvestors; // Track which addresses are approved for investment
//     mapping(address => uint256) public investorKYCLevel; // Track KYC verification level (0=none, 1=basic, 2=full)
//     mapping(address => uint256) public purchaseTimestamp; // Track when each address first purchased tokens
    
//     // Fee structure for transactions
//     uint256 public transferFeePercentage = 0; // Transfer fee as percentage (0-10000 = 0-100%)
//     address public feeRecipient; // Address that receives transfer fees
    
//     // Staking mechanism variables
//     mapping(address => uint256) public stakedBalances; // Track staked token amounts for each address
//     mapping(address => uint256) public stakingRewards; // Track accumulated staking rewards for each address
//     mapping(address => uint256) public lastStakeTime; // Track when each address last staked tokens
//     uint256 public stakingAPY = 500; // Annual Percentage Yield for staking (500 = 5%)
//     uint256 public totalStaked; // Total amount of tokens currently staked

//     // Event declarations for logging important contract activities
//     event PropertyInfoUpdated(uint256 indexed propertyId, string name, uint256 value); // Emitted when property info changes
//     event DividendDistributed(uint256 totalAmount, uint256 perTokenAmount, uint256 timestamp); // Emitted when dividends are distributed
//     event DividendClaimed(address indexed investor, uint256 amount); // Emitted when investor claims dividends
//     event InvestorWhitelisted(address indexed investor, uint256 kycLevel); // Emitted when investor is whitelisted
//     event TokensStaked(address indexed staker, uint256 amount); // Emitted when tokens are staked
//     event TokensUnstaked(address indexed staker, uint256 amount); // Emitted when tokens are unstaked
//     event StakingRewardsClaimed(address indexed staker, uint256 rewards); // Emitted when staking rewards are claimed
//     event TransferFeeUpdated(uint256 newFeePercentage); // Emitted when transfer fee percentage changes
//     event PropertyValuationUpdated(uint256 newValuation, uint256 timestamp); // Emitted when property is revalued

//     // Modifier to restrict function access to realtor only
//     modifier onlyRealtor() {
//         require(msg.sender == realtor, "Only realtor can perform this action"); // Check if caller is the realtor
//         _; // Continue with function execution
//     }

//     // Modifier to restrict function access to property manager only
//     modifier onlyPropertyManager() {
//         require(msg.sender == propertyManager, "Only property manager can perform this action"); // Check if caller is property manager
//         _; // Continue with function execution
//     }

//     // Modifier to ensure only whitelisted investors can perform certain actions
//     modifier onlyWhitelistedInvestor(address investor) {
//         require(whitelistedInvestors[investor], "Investor not whitelisted"); // Check if investor is on whitelist
//         _; // Continue with function execution
//     }

//     // Modifier to enforce minimum holding period before transfers
//     modifier respectsHoldingPeriod(address from) {
//         if (minimumHoldingPeriod > 0) { // Only check if holding period is set
//             require(
//                 block.timestamp >= purchaseTimestamp[from].add(minimumHoldingPeriod), // Check if enough time has passed
//                 "Minimum holding period not met" // Error message if holding period not met
//             );
//         }
//         _; // Continue with function execution
//     }

//     // Modifier to enforce maximum tokens per wallet limit
//     modifier respectsWalletLimit(address to, uint256 amount) {
//         if (maximumTokensPerWallet > 0) { // Only check if wallet limit is set
//             require(
//                 balanceOf(to).add(amount) <= maximumTokensPerWallet, // Check if transfer would exceed wallet limit
//                 "Exceeds maximum tokens per wallet" // Error message if limit would be exceeded
//             );
//         }
//         _; // Continue with function execution
//     }

//     // Contract constructor - called once when contract is deployed
//     constructor(
//         string memory _name, // Name of the token (e.g., "Lagos Mansion Token")
//         string memory _symbol, // Symbol of the token (e.g., "PROP1")
//         uint256 _totalSupply, // Total number of tokens to create
//         PropertyInfo memory _propertyInfo, // Struct containing property information
//         FinancialInfo memory _financialInfo, // Struct containing financial information
//         address _realtor, // Address of the realtor
//         address _registry // Address of the registry contract
//     ) ERC20(_name, _symbol) { // Call parent ERC20 constructor with name and symbol
//         require(_totalSupply > 0, "Total supply must be greater than 0"); // Ensure total supply is valid
//         require(_realtor != address(0), "Invalid realtor address"); // Ensure realtor address is not zero
//         require(_registry != address(0), "Invalid registry address"); // Ensure registry address is not zero

//         registry = _registry; // Set the registry address (immutable)
//         realtor = _realtor; // Set the realtor address
//         propertyManager = _realtor; // Initially set realtor as property manager
//         feeRecipient = _realtor; // Initially set realtor as fee recipient

//         propertyInfo = _propertyInfo; // Store property information in state
//         financialInfo = _financialInfo; // Store financial information in state

//         // Setup access control roles
//         _grantRole(DEFAULT_ADMIN_ROLE, _realtor); // Grant default admin role to realtor
//         _grantRole(ADMIN_ROLE, _realtor); // Grant admin role to realtor
//         _grantRole(MINTER_ROLE, _realtor); // Grant minting permission to realtor
//         _grantRole(PAUSER_ROLE, _realtor); // Grant pausing permission to realtor
//         _grantRole(REGISTRY_ROLE, _registry); // Grant registry role to registry contract

//         // Automatically whitelist and verify the realtor
//         whitelistedInvestors[_realtor] = true; // Add realtor to whitelist
//         investorKYCLevel[_realtor] = 2; // Set realtor's KYC level to full verification
//         purchaseTimestamp[_realtor] = block.timestamp; // Record realtor's "purchase" time

//         // Mint all initial tokens to the realtor
//         _mint(_realtor, _totalSupply); // Create and assign all tokens to realtor

//         // Emit event to log property creation
//         emit PropertyInfoUpdated(_propertyInfo.propertyId, _propertyInfo.propertyName, _propertyInfo.propertyValue);
//     }

//     // =============================================
//     // INVESTOR MANAGEMENT FUNCTIONS
//     // =============================================

//     // Function to add an investor to the whitelist with specified KYC level
//     function whitelistInvestor(
//         address investor, // Address of the investor to whitelist
//         uint256 kycLevel // KYC verification level (0=none, 1=basic, 2=full)
//     ) external onlyRole(ADMIN_ROLE) { // Only admin can call this function
//         require(investor != address(0), "Invalid investor address"); // Ensure investor address is valid
//         require(kycLevel <= 2, "Invalid KYC level"); // Ensure KYC level is within valid range
        
//         whitelistedInvestors[investor] = true; // Add investor to whitelist mapping
//         investorKYCLevel[investor] = kycLevel; // Set investor's KYC level
        
//         emit InvestorWhitelisted(investor, kycLevel); // Emit event for whitelisting
//     }

//     // Function to remove an investor from the whitelist
//     function removeInvestorFromWhitelist(address investor) external onlyRole(ADMIN_ROLE) { // Only admin can call this
//         whitelistedInvestors[investor] = false; // Remove investor from whitelist
//         investorKYCLevel[investor] = 0; // Reset KYC level to zero
//     }

//     // Function to whitelist multiple investors at once for gas efficiency
//     function batchWhitelistInvestors(
//         address[] calldata investors, // Array of investor addresses
//         uint256[] calldata kycLevels // Array of corresponding KYC levels
//     ) external onlyRole(ADMIN_ROLE) { // Only admin can call this function
//         require(investors.length == kycLevels.length, "Arrays length mismatch"); // Ensure arrays have same length
        
//         for (uint256 i = 0; i < investors.length; i++) { // Loop through all investors
//             if (investors[i] != address(0) && kycLevels[i] <= 2) { // Validate each entry
//                 whitelistedInvestors[investors[i]] = true; // Add to whitelist
//                 investorKYCLevel[investors[i]] = kycLevels[i]; // Set KYC level
//                 emit InvestorWhitelisted(investors[i], kycLevels[i]); // Emit event for each
//             }
//         }
//     }

//     // =============================================
//     // TOKEN PURCHASING FUNCTIONS
//     // =============================================

//     // Function for investors to purchase tokens with ETH
//     function buyTokens(uint256 tokenAmount) // Number of tokens to purchase
//         external // Can be called by anyone
//         payable // Function accepts ETH payment
//         nonReentrant // Prevent reentrancy attacks
//         whenNotPaused // Only works when contract is not paused
//         onlyWhitelistedInvestor(msg.sender) // Only whitelisted investors
//         respectsWalletLimit(msg.sender, tokenAmount) // Check wallet limit
//     {
//         require(tradingEnabled, "Trading is currently disabled"); // Check if trading is enabled
//         require(tokenAmount > 0, "Must buy at least 1 token"); // Ensure purchase amount is valid
//         require(investorKYCLevel[msg.sender] >= 1, "Minimum KYC level required"); // Check minimum KYC level
        
//         uint256 totalCost = tokenAmount.mul(propertyInfo.tokenPrice); // Calculate total cost of purchase
//         require(msg.value >= totalCost, "Insufficient payment"); // Check if enough ETH was sent

//         // Check if realtor has enough tokens available for sale
//         require(balanceOf(realtor) >= tokenAmount, "Insufficient tokens available"); // Check realtor's balance
//         require(allowance(realtor, address(this)) >= tokenAmount, "Realtor must approve token sale"); // Check allowance

//         // Record purchase timestamp for holding period tracking (only if first purchase)
//         if (purchaseTimestamp[msg.sender] == 0) { // Check if this is first purchase
//             purchaseTimestamp[msg.sender] = block.timestamp; // Record current timestamp
//         }

//         // Transfer tokens from realtor to buyer
//         _transfer(realtor, msg.sender, tokenAmount); // Execute token transfer

//         // Calculate and handle transfer fees if applicable
//         uint256 feeAmount = 0; // Initialize fee amount
//         if (transferFeePercentage > 0) { // Check if fees are enabled
//             feeAmount = totalCost.mul(transferFeePercentage).div(10000); // Calculate fee amount
//             if (feeAmount > 0) { // If fee is greater than zero
//                 payable(feeRecipient).transfer(feeAmount); // Send fee to fee recipient
//             }
//         }

//         // Send remaining payment to realtor after deducting fees
//         uint256 realtorPayment = totalCost.sub(feeAmount); // Calculate realtor's payment
//         payable(realtor).transfer(realtorPayment); // Send payment to realtor

//         // Refund any excess payment to buyer
//         if (msg.value > totalCost) { // Check if buyer sent more than required
//             payable(msg.sender).transfer(msg.value.sub(totalCost)); // Refund excess amount
//         }

//         // Emit transfer event (inherited from ERC20)
//         emit Transfer(realtor, msg.sender, tokenAmount); // Log the token transfer
//     }

//     // =============================================
//     // STAKING MECHANISM FUNCTIONS
//     // =============================================

//     // Function to stake tokens and earn rewards
//     function stakeTokens(uint256 amount) external nonReentrant whenNotPaused { // Amount of tokens to stake
//         require(amount > 0, "Cannot stake 0 tokens"); // Ensure staking amount is positive
//         require(balanceOf(msg.sender) >= amount, "Insufficient balance"); // Check if user has enough tokens

//         // Update any pending staking rewards before new stake
//         _updateStakingRewards(msg.sender); // Calculate and update rewards

//         // Transfer tokens from user to contract for staking
//         _transfer(msg.sender, address(this), amount); // Move tokens to contract
        
//         stakedBalances[msg.sender] = stakedBalances[msg.sender].add(amount); // Update user's staked balance
//         totalStaked = totalStaked.add(amount); // Update total staked amount
//         lastStakeTime[msg.sender] = block.timestamp; // Record staking timestamp

//         emit TokensStaked(msg.sender, amount); // Emit staking event
//     }

//     // Function to unstake tokens and return them to user's balance
//     function unstakeTokens(uint256 amount) external nonReentrant { // Amount of tokens to unstake
//         require(amount > 0, "Cannot unstake 0 tokens"); // Ensure unstaking amount is positive
//         require(stakedBalances[msg.sender] >= amount, "Insufficient staked balance"); // Check staked balance

//         // Update rewards before unstaking
//         _updateStakingRewards(msg.sender); // Calculate pending rewards

//         stakedBalances[msg.sender] = stakedBalances[msg.sender].sub(amount); // Reduce user's staked balance
//         totalStaked = totalStaked.sub(amount); // Reduce total staked amount

//         // Transfer tokens back to user from contract
//         _transfer(address(this), msg.sender, amount); // Return tokens to user

//         emit TokensUnstaked(msg.sender, amount); // Emit unstaking event
//     }

//     // Function to claim accumulated staking rewards
//     function claimStakingRewards() external nonReentrant { // No parameters needed
//         _updateStakingRewards(msg.sender); // Update rewards calculation
        
//         uint256 rewards = stakingRewards[msg.sender]; // Get user's total rewards
//         require(rewards > 0, "No rewards to claim"); // Ensure there are rewards to claim

//         stakingRewards[msg.sender] = 0; // Reset user's rewards to zero
        
//         // Mint new tokens as rewards (inflationary staking model)
//         _mint(msg.sender, rewards); // Create new tokens for user as rewards

//         emit StakingRewardsClaimed(msg.sender, rewards); // Emit reward claiming event
//     }

//     // Internal function to calculate and update staking rewards
//     function _updateStakingRewards(address staker) internal { // Address of the staker
//         if (stakedBalances[staker] > 0 && lastStakeTime[staker] > 0) { // Check if user has staked tokens
//             uint256 stakingDuration = block.timestamp.sub(lastStakeTime[staker]); // Calculate time since last stake
//             uint256 annualReward = stakedBalances[staker].mul(stakingAPY).div(10000); // Calculate annual reward amount
//             uint256 reward = annualReward.mul(stakingDuration).div(365 days); // Calculate pro-rated reward
            
//             stakingRewards[staker] = stakingRewards[staker].add(reward); // Add to user's rewards
//             lastStakeTime[staker] = block.timestamp; // Update last stake time
//         }
//     }

//     // =============================================
//     // DIVIDEND DISTRIBUTION FUNCTIONS
//     // =============================================

//     // Function for property manager to distribute dividends to token holders
//     function distributeDividends() external payable onlyPropertyManager nonReentrant { // ETH sent as dividends
//         require(msg.value > 0, "Dividend amount must be greater than 0"); // Ensure dividend amount is positive
//         require(totalSupply() > 0, "No tokens in circulation"); // Ensure there are tokens to distribute to

//         uint256 totalDividend = msg.value; // Store total dividend amount
//         uint256 perTokenDividend = totalDividend.div(totalSupply()); // Calculate dividend per token

//         dividendInfo.totalDividendsDistributed = dividendInfo.totalDividendsDistributed.add(totalDividend); // Update total distributed
//         dividendInfo.dividendPerToken = dividendInfo.dividendPerToken.add(perTokenDividend); // Update per-token dividend
//         dividendInfo.lastDividendDate = block.timestamp; // Record distribution timestamp

//         // Note: In a production system, you would implement a more sophisticated
//         // dividend distribution mechanism, such as using snapshots or a pull-based system
//         _updateAllPendingDividends(perTokenDividend); // Update pending dividends for all holders

//         emit DividendDistributed(totalDividend, perTokenDividend, block.timestamp); // Emit distribution event
//     }

//     // Function for investors to claim their pending dividends
//     function claimDividends() external nonReentrant { // No parameters needed
//         uint256 pending = dividendInfo.pendingDividends[msg.sender]; // Get user's pending dividends
//         require(pending > 0, "No dividends to claim"); // Ensure there are dividends to claim

//         dividendInfo.pendingDividends[msg.sender] = 0; // Reset pending dividends to zero
//         dividendInfo.claimedDividends[msg.sender] = dividendInfo.claimedDividends[msg.sender].add(pending); // Update claimed amount

//         payable(msg.sender).transfer(pending); // Send ETH dividends to user

//         emit DividendClaimed(msg.sender, pending); // Emit dividend claiming event
//     }

//     // Internal function to update pending dividends for all holders
//     function _updateAllPendingDividends(uint256 perTokenDividend) internal { // Dividend amount per token
//         // This is a simplified implementation
//         // In a production system, you would use a more gas-efficient approach
//         // such as tracking dividend snapshots or implementing a pull-based mechanism
//         // to avoid gas limit issues when there are many token holders
//     }

//     // View function to check pending dividends for a specific holder
//     function getPendingDividends(address holder) external view returns (uint256) { // Address to check
//         return dividendInfo.pendingDividends[holder]; // Return pending dividend amount
//     }

//     // View function to check total claimed dividends for a specific holder
//     function getClaimedDividends(address holder) external view returns (uint256) { // Address to check
//         return dividendInfo.claimedDividends[holder]; // Return total claimed dividends
//     }

//     // =============================================
//     // PROPERTY MANAGEMENT FUNCTIONS
//     // =============================================

//     // Function to update the property's valuation
//     function updatePropertyValuation(uint256 newValuation) external onlyPropertyManager { // New valuation amount
//         require(newValuation > 0, "Valuation must be greater than 0"); // Ensure valuation is positive
        
//         financialInfo.lastValuationAmount = newValuation; // Store new valuation amount
//         financialInfo.lastValuationDate = block.timestamp; // Record valuation timestamp
//         propertyInfo.propertyValue = newValuation; // Update property value

//         emit PropertyValuationUpdated(newValuation, block.timestamp); // Emit valuation update event
//     }

//     // Function to update property's financial information
//     function updateFinancialInfo(
//         uint256 _annualRentalIncome, // Annual rental income
//         uint256 _maintenanceCosts, // Annual maintenance costs
//         uint256 _propertyTaxes, // Annual property taxes
//         uint256 _insuranceCosts, // Annual insurance costs
//         uint256 _managementFees // Annual management fees
//     ) external onlyPropertyManager { // Only property manager can update
//         financialInfo.annualRentalIncome = _annualRentalIncome; // Update rental income
//         financialInfo.maintenanceCosts = _maintenanceCosts; // Update maintenance costs
//         financialInfo.propertyTaxes = _propertyTaxes; // Update property taxes
//         financialInfo.insuranceCosts = _insuranceCosts; // Update insurance costs
//         financialInfo.managementFees = _managementFees; // Update management fees
//     }

//     // Function to change the property manager
//     function setPropertyManager(address newManager) external onlyRole(ADMIN_ROLE) { // New manager address
//         require(newManager != address(0), "Invalid manager address"); // Ensure address is valid
//         propertyManager = newManager; // Update property manager address
//     }

//     // =============================================
//     // TRANSFER CONTROL FUNCTIONS
//     // =============================================

//     // Function to set transfer fee percentage
//     function setTransferFee(uint256 feePercentage) external onlyRole(ADMIN_ROLE) { // Fee percentage (0-10000)
//         require(feePercentage <= 1000, "Fee cannot exceed 10%"); // Limit maximum fee to 10%
//         transferFeePercentage = feePercentage; // Update fee percentage
//         emit TransferFeeUpdated(feePercentage); // Emit fee update event
//     }

//     // Function to set minimum holding period before transfers are allowed
//     function setMinimumHoldingPeriod(uint256 periodInSeconds) external onlyRole(ADMIN_ROLE) { // Period in seconds
//         minimumHoldingPeriod = periodInSeconds; // Update minimum holding period
//     }

//     // Function to set maximum number of tokens per wallet
//     function setMaximumTokensPerWallet(uint256 maxTokens) external onlyRole(ADMIN_ROLE) { // Maximum tokens allowed
//         maximumTokensPerWallet = maxTokens; // Update maximum tokens per wallet
//     }

//     // Function to enable token trading
//     function enableTrading() external onlyRole(ADMIN_ROLE) { // No parameters
//         tradingEnabled = true; // Set trading flag to true
//     }

//     // Function to disable token trading
//     function disableTrading() external onlyRole(ADMIN_ROLE) { // No parameters
//         tradingEnabled = false; // Set trading flag to false
//     }

//     // Function to enable token transfers
//     function enableTransfers() external onlyRole(ADMIN_ROLE) { // No parameters
//         transfersEnabled = true; // Set transfers flag to true
//     }

//     // Function to disable token transfers
//     function disableTransfers() external onlyRole(ADMIN_ROLE) { // No parameters
//         transfersEnabled = false; // Set transfers flag to false
//     }

//     // =============================================
//     // OVERRIDE FUNCTIONS
//     // =============================================

//     // Override function called before every token transfer
//     function _beforeTokenTransfer(
//         address from, // Address sending tokens
//         address to, // Address receiving tokens
//         uint256 amount // Amount of tokens being transferred
//     ) internal 
//         override(ERC20, ERC20Pausable) // Override parent contract functions
//         respectsHoldingPeriod(from) // Check holding period requirement
//         respectsWalletLimit(to, amount) // Check wallet limit requirement
//     {
//         require(transfersEnabled || from == address(0) || to == address(0), "Transfers are disabled"); // Check if transfers are enabled (except minting/burning)
        
//         if (from != address(0) && to != address(0)) { // If not minting or burning
//             require(whitelistedInvestors[to], "Recipient not whitelisted"); // Ensure recipient is whitelisted
//         }

//         super._beforeTokenTransfer(from, to, amount); // Call parent contract's function
//     }

//     // Function to pause all token operations
//     function pause() external onlyRole(PAUSER_ROLE) { // Only pauser role can call
//         _pause(); // Call inherited pause function
//     }

//     // Function to unpause all token operations
//     function unpause() external onlyRole(PAUSER_ROLE) { // Only pauser role can call
//         _unpause(); // Call inherited unpause function
//     }

//     // =============================================
//     // VIEW FUNCTIONS
//     // =============================================

//     // Function to get complete property information
//     function getPropertyInfo() external view returns (PropertyInfo memory) { // Returns PropertyInfo struct
//         return propertyInfo; // Return stored property information
//     }

//     // Function to get complete financial information
//     function getFinancialInfo() external view returns (FinancialInfo memory) { // Returns FinancialInfo struct
//         return financialInfo; // Return stored financial information
//     }

//     // Function to get staking information for a specific address
//     function getStakingInfo(address staker) external view returns ( // Address to check
//         uint256 stakedBalance, // Amount of tokens staked
//         uint256 pendingRewards, // Pending staking rewards
//         uint256 lastStakeTimestamp // Last staking timestamp
//     ) {
//         stakedBalance = stakedBalances[staker]; // Get staked balance
//         lastStakeTimestamp = lastStakeTime[staker]; // Get last stake time
        
//         // Calculate pending rewards based on time elapsed
//         if (stakedBalance > 0 && lastStakeTimestamp > 0) { // If user has staked tokens
//             uint256 stakingDuration = block.timestamp.sub(lastStakeTimestamp); // Calculate time elapsed
//             uint256 annualReward = stakedBalance.mul(stakingAPY).div(10000); // Calculate annual reward
//             uint256 reward = annualReward.mul(stakingDuration).div(365 days); // Calculate time-based reward
//             pendingRewards = stakingRewards[staker].add(reward); // Add to existing rewards
//         } else {
//             pendingRewards = stakingRewards[staker]; // Return existing rewards only
//         }
//     }

//     // Override supportsInterface to handle multiple inherited contracts
//     function supportsInterface(bytes4 interfaceId) // Interface identifier to check
//         public
//         view
//         override(ERC20, AccessControl) // Override multiple parent contracts
//         returns (bool) // Returns true if interface is supported
//     {
//         return super.supportsInterface(interfaceId); // Call parent contract's implementation
//     }
// }


pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title PropertyToken
/// @notice Standard ERC20 token representing fractional ownership of a property
contract PropertyToken is ERC20 {
    /// @notice Constructor mints full supply to the Realtor
    /// @param name Token name
    /// @param symbol Token symbol
    /// @param totalSupply Total tokens to be minted (based on property value)
    /// @param owner Address receiving all minted tokens
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner

    ) ERC20(name, symbol) {
        _mint(owner, totalSupply);
    }
}
