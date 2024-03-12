// Hardhat: First interaction with Hardhat blockchain.
//////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

// Your code here!
const ethers = require("ethers");
const path = require("path");
let pathToEnv = path.join(process.cwd(), ".env");
require("dotenv").config( {path : pathToEnv});

// Exercise 1. Create a JSON RPC Provider for the Hardhat blockchain.
/////////////////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

// Your code here!
const hardhat = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// Hardhat Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
   
    let network = await hardhat.getNetwork();
    console.log("Network name: " + network.name);
    console.log("Chain ID: " + network.chainId);
    let blockNumber = await hardhat.getBlockNumber();
    console.log("Block number : " + blockNumber);

};

networkInfo();



// Exercise 3. Signer on the Hardhat blockchain.
////////////////////////////////////////////////

// a. Connect one a signer with one of the default private keys on
// the Hardhat blockchain.
// Hint: check the Hardhat console output.

// Your code here.
let signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
// b. Check the balance of the signer.
const checkBalance = async () => {
    // Your code here.
    let balance = await hardhat.getBalance(signer.address);
    console.log("Balance: " + ethers.formatEther(balance));
};

checkBalance();

// c. Print the signer's next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {
    // Your code here.
    // First you need to connect to the hardhat blockchain
    signer = signer.connect(hardhat);
    let nonce = await signer.getNonce();
    console.log("Next nonce: " + nonce);
};

getNonce();


// Exercise 4. Send a transaction.
//////////////////////////////////

// Send some Ether from the address of the signer in Exercise 3 to one of your
// accounts on Metamask (e.g., the one used to make the submissions in 
// this course).

const account2 = process.env.METAMASK_2_ADDRESS;
// let metamaskSigner = new ethers.Wallet(process.env.METAMASK_KEY);

const sendTransaction = async () => {

    // Your code here!
    signer = signer.connect(hardhat);
    let srcBalance = ethers.formatEther(await hardhat.getBalance(signer.address));
    let dstBalance = ethers.formatEther(await hardhat.getBalance(account2));
    console.log("Account 1 balance: " + srcBalance);
    console.log("Account 2 balance: " + dstBalance);
    // Send transaction
    tx = await signer.sendTransaction({
        to: account2,
        value: ethers.parseEther("100")
    });
    // After sending the transaction we need to wait for it to be mined
    console.log("Transaction is in the mempool")
    await tx.wait();
    console.log("Transaction complete!")
    srcBalance = ethers.formatEther(await hardhat.getBalance(signer.address));
    dstBalance = ethers.formatEther(await hardhat.getBalance(account2));
    console.log("Account 1 balance: " + srcBalance);
    console.log("Account 2 balance: " + dstBalance);

};

sendTransaction();

