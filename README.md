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

![CeloP2P referral](https://github.com/user-attachments/assets/c0764eac-6684-431b-80fa-55a8cbc21ced)


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
- **Contract Address**: Alfajores 0xdFa504C66e22A07f42C5616c873829cBCcee38cd Mainnet 0x7A7347FC748f12160CFB9F89f6faC2376c0495A9
- **Reward Points**: `CPT` MiniSafe reward point as reward for locking up funds for both depositor and the upliner who referred.

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
![1](https://github.com/user-attachments/assets/2dc7eed1-3398-4a4a-b007-a6a2198b7a83)
![2](https://github.com/user-attachments/assets/ad2966b3-3842-44b2-a959-e48bafa6210a)
![3](https://github.com/user-attachments/assets/5b70644d-d1ce-478b-94ee-1ddf543800dc)
![4](https://github.com/user-attachments/assets/a808c5c1-5011-4159-b8c6-f6b4a3ad7eea)
![5](https://github.com/user-attachments/assets/6d3cbf55-dc8d-4189-9bfb-7c81b88c771d)
![6](https://github.com/user-attachments/assets/cd456173-7592-4508-b58e-6f8944934180)
![7](https://github.com/user-attachments/assets/3d96fb18-fc32-4d0b-8c72-aacba244e3e0)
![8](https://github.com/user-attachments/assets/35f05bbd-50a8-43f5-9b39-d27ce4aa3bac)
![9](https://github.com/user-attachments/assets/f7492885-67bb-4a2b-a6f4-a0f4cf80347b)
![10](https://github.com/user-attachments/assets/a94ed227-ed71-4191-9161-3fe6dcdcc26e)
![12](https://github.com/user-attachments/assets/695724cf-c259-4d70-95ce-528245f101ad)
![13](https://github.com/user-attachments/assets/ce7e9cbf-bacb-4a29-bc8e-fcdbe6e46b82)
