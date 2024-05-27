import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl,  } from "@solana/web3.js";

// connected to solana network
const connection = new Connection(clusterApiUrl("devnet"));
// read from the network

const account = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN')

const balance = await connection.getBalance(account) // balance will come in lamport

const solBalance = balance/LAMPORTS_PER_SOL

console.log("Connection established")
console.log(`The balance of account ${account} is ${solBalance}`);