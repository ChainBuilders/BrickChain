// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.24;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract PropertiesMarketplace is Ownable, ReentrancyGuard {
//     uint256 public feePercent;
//     address public feeCollector;
//     Counters.Counter private _listingId;
//     IERC20 public stablecoin;

//     struct Listing {
//         address seller;
//         address tokenAddress;
//         string tokenName;
//         uint256 amount;
//         uint256 pricePerToken;
//         bool active;
//     }

//     /// @notice mapping the token detail to an id for number
//     mapping(uint256 => Listing) public listings;

//     /// @notice mapping address to an array of ids mapped to one address
//     mapping(address => uint256[]) public investorListings;

//     /// @notice
//     event TokenListed(
//         uint256 indexed listingId,
//         address seller,
//         address tokenAddress,
//         string tokenName,
//         uint256 amount,
//         uint256 pricePerToken
//     );

// /// @notice Initalise the contract state 
// /// @dev Add owner, feecollector, fe percentage set the accessmanader


//     constructor(
//         uint256 _feePercentage,
//         address _feeCollector,
//         address _stablecoin
//     ) Ownable(msg.sender) {
//         require(_feePercentage <= 10, "Fee must not exceed 10%");
//         require(_feeCollector != address(0), "Invalid fee recipient address");

//         feePercent = _feePercentage;
//         feeCollector = _feeCollector;

//         _listingId.increment();
//         stablecoin = IERC20(_stablecoin);
//     }

//     /// @notice Check if the contract is allowed to spend this token
//     /// @param _tokenAddress Erc20 token
//     /// @param _user The contract in this context
//     function checkTokenApproval(
//         address _tokenAddress,
//         uint256 _user
//     ) internal returns (uint256) {
//         IERC20(_tokenAddress).allowance(_user, address(this));
//     }

//     /// @notice Create a new listing of property token
//     /// @dev Create new listing to with LIstings struct
//     /// @param _tokenAddress Address of the token to be listed
//     /// @param _amount Amount of token to be listed
//     /// @param _pricePerToken The amount of token to be listed
//     function creatListing(
//         address _tokenAddress,
//         uint256 _amount,
//         uint256 _pricePerToken
//     ) external nonReentrant {
//         require(_tokenAddress != address(0), "Invalid token");
//         require(_amount > 0, "Token amount can not be zero");
//         require(
//             checkApproveAllowance(_tokenAddress, msg.sender) >= _amount,
//             "Insufficient allowance"
//         );

//         uint256 newKeyId = _listingId.current();
//         require(!listings[newKeyId].active, "Already listed");

//         string memory tokenName = IERC20Metadata(_tokenAddress).name();

//         listings[newKeyId] = Listing({
//             seller: msg.sender,
//             tokenName: tokenName,
//             tokenAddress: _tokenAddress,
//             amount: _amount,
//             pricePerToken: _pricePerToken,
//             active: true
//         });

//         investorListings[msg.sender].push(newKeyId);

//         IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);

//         _listingId.increment();

//         emit TokenListed(
//             newKeyId,
//             msg.sender,
//             _tokenAddress,
//             tokenName,
//             _amount,
//             _pricePerToken
//         );
//     }

//     /// @notice Function to purchase a tokenised property
//     /// @dev fetch the listing that match the _listingId and buy a share
//     /// @param _listingId Id that is mapped to a listed property token
//     /// @param _amount amount of property token you can to buy

//     function purchaseToken(
//         uint256 _listingId,
//         uint256 _amount
//     ) external payable nonReentrant {
//         Listing storage listing = listings[_listingId];

//         require(msg.sender != address(0), "can not puchase with null address");

//         require(_amount > 0 && listing.amount >= _amount, "Invalid amount");

//         require(listing.active, "this listing is not active at the moment");

//         /// @notice the price of the total token you want to buy
//         uint256 tokenPrice = _amount * listing.pricePerToken;

//         /// @notice the fee percentage for the transaction to be mabe (for the market place)
//         uint256 fee = (feePercent * tokenPrice) / 100;

//         /// @notice total price to be paid by the buyer
//         uint256 totalprice = tokenPrice + fee;

//         require(
//             stablecoin.allowance(msg.sender, address(this)) >= totalprice,
//             "insufficient balance"
//         );

//         /// @notice Transfer the stablecoin to the contract to hold the money or log error if any
//         require(
//             stablecoin.transferFrom(msg.sender, address(this), tokenPrice),
//             "Payment failed"
//         );

//         /// @notice Transfer the stablecoin to the fee collector or log error if any
//         require(
//             stablecoin.transferFrom(msg.sender, feeCollector, fee),
//             "Fee transfer failed"
//         );

//         listing.amount -= _amount;

//         /// @notice deactivate the listing if the remaining amount it just 0 or less
//         if (listing.amount <= 0) {
//             listing.active = false;
//         }

//         emit TokenPurchased(
//             _listingId,
//             msg.sender,
//             _amount,
//             stablecoin,
//             finalPrice
//         );
//     }

//     function getInvestorListing() public returns (Listing[]) {}
// }
