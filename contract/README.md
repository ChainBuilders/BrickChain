# 🧱 BrickChain

**Tokenizing Nigeria's Real Estate, One Property at a Time.**

BrickChain is a multi-tenant blockchain-powered real estate investment platform that enables realtors and landlords across Nigeria to tokenize their properties and allow users from anywhere in the world to invest fractionally, earn yield, and trade property-backed tokens in a decentralized, peer-to-peer (P2P) marketplace.





## 🚀 Project Overview

Real estate in Nigeria is plagued by high entry barriers, limited transparency, and extreme illiquidity. BrickChain solves this by leveraging blockchain to democratize access to property investment and enable instant liquidity through tokenized real-world assets (RWA).





## 🧠 Key Features

- **Property Tokenization**  
  Realtors tokenize properties into ERC-20 tokens (e.g., 1 token = ₦1 or $1), representing fractional ownership.

- **Stablecoin Payments**  
  Investors buy tokens using MockUSDT (a test stablecoin deployed on-chain).

- **P2P Marketplace**  
  Investors can list and trade property tokens with each other.

- **Staking/Yield System**  
  Token holders can stake tokens to earn yield (e.g., 5% APY), simulating passive income from rental properties.

- **Role-Based Access Control**  
  Realtors and Admins are authenticated and authorized via smart contract-controlled roles.

- **Registry System**  
  A verified list of approved real estate listings and their token contracts.





## 🔧 Tech Stack

| Layer        | Stack                                                                 |
|--------------|-----------------------------------------------------------------------|
| **Frontend** | Next.js, Tailwind CSS, Wagmi, RainbowKit                              |
| **Backend**  | Supabase (Auth, DB, File Upload), Node.js/Express (optional)          |
| **Smart Contracts** | Solidity (using Foundry), OpenZeppelin libraries               |
| **Blockchain** | Base Testnet (Ethereum L2)                                          |
| **Tooling**  | Foundry (Forge, Anvil), Ethers.js, IPFS (or Cloudinary for metadata)  |






## 🛠️ Smart Contracts

| Contract                | Purpose                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| `AccessControl.sol`     | Role-based permissions (Admin, Realtor)                                 |
| `Registry.sol`          | Stores verified property metadata and token mapping                     |
| `PropertyToken.sol`     | ERC-20 tokens for fractional ownership of property                      |
| `Marketplace.sol`       | P2P buying/selling of property tokens                                   |
| `Staking.sol`           | Lock tokens to earn simulated annual yield                              |
| `MockUSDT.sol`          | A stablecoin used for buying/selling and yield payout                   |





## 🧩 System Design Overview

![System Design]

1. Realtors (e.g., Baba Kasali in Lagos) apply and get verified.
2. Admin approves listing → property gets tokenized.
3. Investors (e.g., Garba in Enugu) use MockUSDT to buy tokens.
4. Investors can stake tokens or trade them on the marketplace.
5. All interactions are tracked and verified on-chain.





## 🧪 Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org)
- [Foundry](https://book.getfoundry.sh/)
- [Supabase](https://supabase.io)
- [MetaMask](https://metamask.io)



### Steps



1. Clone the repo  
   ```bash
   git clone https://github.com/ChainBuildersBrickchain
   cd contract
   cd frontend

2. Install frontend dependencies
cd frontend
npm install
npm run dev



3. Deploy contracts with Foundry


cd contracts
forge build
forge deploy --rpc-url <BASE_RPC_URL> --private-key <PRIVATE_KEY>




📌 Why BrickChain?
Gives Nigerians across the world access to fractional property investment.

Unlocks liquidity for realtors, bypassing slow and costly banks.

Bridges Web3 innovation with real-world economic problems.

Puts transparency and decentralization at the heart of real estate.




🌍 Case Study: Nigeria
Baba Kasali tokenizes his Lagos duplex for ₦80M (80,000 tokens).

Mazi Okafor in Abuja buys 5,000 tokens using USDT.

Garba in Enugu stakes his 2,000 tokens to earn passive income.

The community now has real, liquid ownership in properties they’d never afford traditionally.




💬 Team
@ChainBuilders — A team of passionate Web3 builders solving local problems with global tools.
Adebakin Olujimi - Smart-Contract Dev
Tali Nanzing Moses - Frontend Dev
Chuwku Obed - Smart-Contract Dev





🙏 Note to Reader
We believe BrickChain can unlock billions in dormant property value across Africa and make real estate investment accessible to all. If you’re reading this, you’re early — and we invite you to imagine a Nigeria where anyone, anywhere, can co-own the future.






