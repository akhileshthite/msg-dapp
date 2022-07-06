import { useState } from "react";
import Web3 from "web3";
import "./App.css";

function App() {
  // React hooks
  const [mmStatus, setMmStatus] = useState("Metamask status");
  const [address, setAddress] = useState("Address:");
  const [displayMessage, setDisplayMessage] = useState("");

  // Contract ABI (Application Binary Interface) is a json file that interacts with smart contracts.
  // It's a bridge between front-end and EVM.
  const ABI = [
    {
      inputs: [],
      name: "read",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newMessage",
          type: "string",
        },
      ],
      name: "write",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  //Contract Address refers to the address where the contract is deployed on Ethereum blockchain.
  const contractAddress = "0x285594f491fDb7a204EBBB26bC095e69F4BA6914";

  const web3 = new Web3(window.ethereum);
  // Instantiate smart contract instance
  const Message = new web3.eth.Contract(ABI, contractAddress);
  Message.setProvider(window.ethereum);

  // Connect to Metamask wallet
  async function connectWallet() {
    // Check Metamask status
    if (window.ethereum) {
      setMmStatus("✅ Metamask detected! Make sure you're on the rinkeby network.");
      try {
        // Metamask popup will appear to connect the account
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get address of the account
        setAddress(accounts[0]);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      setMmStatus("⚠️ No wallet detected! Please install Metamask.");
    }
  }

  // Read message from smart contract
  async function receive() {
    // Display message
    var displayMessage = await Message.methods.read().call();
    setDisplayMessage(displayMessage);
  }

  // Write message to smart contract
  async function send() {
    // Get input value of message
    var getMessage = document.getElementById("message").value;

    // Send message to smart contract
    web3.eth.getAccounts().then(function (accounts) {
      Message.methods.write(getMessage).send({ from: accounts[0] });
    });
  }

  return (
    <div>
      {/* Metamask status */}
      <div className="text-center">{mmStatus}</div>
      <hr />
      <h1 className="text-center text-4xl font-bold mt-6">Message Dapp 👋</h1>
      {/* Connect to Metamask */}
      <center>
        <button
          className="text-center items-center border-2 border-blue-500 rounded-md p-1 mt-6 mb-6"
          onClick={connectWallet}
        >
          Connect wallet
        </button>
      </center>
      {/* Show account address */}
      <div className="text-center text-sm">{address}</div>
      {/* Send message */}
      <center className="mt-12">
        <input
          type={"text"}
          placeholder={"Enter message"}
          id="message"
          className="text-left border-2 border-gray-300 rounded-sm p-1"
        />
        <button
          className="text-center border-2 border-gray-500 rounded ml-2 p-1 w-16"
          onClick={send}
        >
          Send
        </button>
        {/* Receive message */}
        <button
          className="text-center border-2 border-gray-500 rounded ml-2 p-1 w-18"
          onClick={receive}
        >
          Receive
        </button>
      </center>
      <p className="text-center text-xs mt-6">
        <i>
          Please wait till the transaction is completed, then click on the Receive
          button to display your message.
        </i>
      </p>
      {/* Display message */}
      <div className="text-center text-3xl mt-10">
        <b>{displayMessage}</b>
      </div>
    </div>
  );
}

export default App;
