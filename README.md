## CeloP2P

### Overview

CeloP2P is a decentralized application (DApp) built on the Celo mainnet/testnet to facilitate peer to peer trading between web3 users in a trustless manner. 

Transactions are carried out between users and then the `attester` who is currently contract owner then verifies the authenticity and behaviour of both parties before approving the transfer of tokens/coins from the `seller` to the `buyer`. This attestation is stored publicly onchain.

The need to build this is paramount following the suspension of Africa's biggets P2P platform-Binance in Nigeria and this has handicapped lots of web3 users. 

- We implemented a referral feature to reward users who tell their friends about our solutions to boost community engagement.
- This creates an `upliner` and `downliner` relationship
- When a `downliner` makes a deposit,
  - `downliner` earns `2 CPT` reward points
  - `upliner` earns `1 CPT` reward point as referral reward
To streamline this, we implemented Social Connect protocol to abstract away the complexities of getting to memorize walleet addresses. With Social Connect wallet addresses are mapped to social identifiers such as phone numbers, google, facebook, github, twitter profiles etc. in this iterartion, we impplmented GitHub usernames.


CeloP2P is built to function primarily on mobile devices vis Opera-mini's Minipay which currently has over 2 million daily users. Research has shown that >80% of internet users are on mobile devices hence the need to build applications that functions seemlessly on mobile devices.



### TO DO

1. Implement phone number identifiers
2. Manual smart contract review(Aderyn and Slither static analysis done)
3. Get feedback on the feature and consider intergration into the final MVP
4. Writing test for the other contracts
5. Consider a different a smart contract to handle the referral system across all 3 contracts


### Technologies Used

- **Frontend**: Next.js, Tailwind CSS, Typescript
- **Backend**: Solidity, Ethereum blockchain
- **Smart Contracts**: Foundry
- **Deployment**: Alfajores(present deployment for the hackathon as well as demo video)
- **Contract Address**: Alfajores 0x04B3E5a904B4d9659729ECcc9137d585647a58a1 Mainnet
- **Reward Points**: `CPT` CeloP2P reward point as reward for locking up funds for both depositor and the upliner who referred.

### Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/emiridbest/CeloP2P2.git
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Start the development server:

   ```
   yarn run dev
   ```

4. Visit `http://localhost:3000` in your browser to view the application.

### Usage

- Create an account or connect your Celo Minipay wallet.
- Go to the `site tester` in minipay
- Enter `http://CeloP2P-two.vercel.app`

- **CeloP2P Referrers**

1. Connect your social account(GitHub fully implemented)
2. Add `upliner` by entering the `GitHub` username of the user who referred you
3. Go ahead to make a deposit

### Architecture in the `react-app` folder

    /pages includes the main application components (specifically index.tsx and _app.tsx)
        _app.tsx includes configuration
        index.tsx is the main page of the application
    /components includes components that are rendered in index.tsx
        Balance.tsx to return your `cUSD` wallet balance
        SocialProfile.tsx to return profile details of the connected user
        SocialConnectUI.tsx to signIn, signOut of sessions amd also `register`and `revoke` identifiers
        TransactionList.tsx to return transaction history on `cUSD` reward points of the connected user
    /SocialConnect includes helper files
        /abis hold contractABI for various socialConnect protocol
    /public includes static files
    /utils
        abi.ts hold smart contract's `ABI and `Address` of the `timelock` and `referral` features logic
        CeloP2P.ts hold `ABI and `Address` of the `thrift` feature logic
        pay.ts hold `ABI and `Address` of the `utilityBills` payment feature logic

### Contributing

Contributions are welcome! Please follow the standard GitHub flow:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/<feature-name>`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/<feature-name>`)
6. Create a new Pull Request

### License

This project is licensed under the [MIT License](LICENSE).
