<h1 align="center">Message Dapp</h1>

> A simple full-stack dapp that writes messages to the Ethereum blockchain. You will learn the whole process of developing a decentralized application.

## Contract
  https://rinkeby.etherscan.io/address/0x285594f491fDb7a204EBBB26bC095e69F4BA6914

## Development

This dapp is created by using truffle dev environment (`truffle unbox react` command). Truffle box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

Make sure you have truffle installed on your computer.
```sh
# Install Truffle globally
$ npm install -g truffle
```

### React client

```sh
$ cd client
$ npm start
  Starting the development server...
```

### Smart contracts
Follow this section if you want to develop and deploy the solidity smart contracts.

First, cd into truffle directory.
```sh
$ cd truffle
```

Ensure you create an `.env` file in `./truffle/` directory. Then to access the Ethereum network/node, create a project on [infura](https://infura.io/) and copy-paste the `rinkeby infura project-id url` in `.env` with a variable name `INFURA_RINKEBY` (contracts of this dapp is deployed to rinkeby testnet).
```sh
INFURA_RINKEBY=https://rinkeby.infura.io/v3/YOUR_PROJECT_ID
```

Paste the 12 word Secret Recovery Phrase of your (preferably newly generated and testnet-only) MetaMask wallet in `.env` with the variable name `MNEMONIC`. This will be loaded by truffle at runtime, and the environment variable can then be accessed with `process.env.MNEMONIC`.

```sh
MNEMONIC=for example put your twelve word BIP39 secret recovery phrase here
```

OR

To develop on ganache blockchain, open ganache and import the accounts by adding your ganache private keys in MetaMask.

```sh
$ ganache-cli
```

To deploy the smart contracts on Ethereum blockchain, follow this truffle command.

```sh
# truffle migrate --network NETWORK_NAME
truffle migrate --network rinkeby
```

This will generate [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#:~:text=The%20Contract%20Application%20Binary%20Interface,as%20described%20in%20this%20specification.) in `./client/contracts/`


## License
msg-dapp is licensed under the [GPL-3.0 license](https://github.com/akhileshthite/msg-dapp/blob/main/LICENSE).

<hr>
Don't forget to leave a star ⭐️
