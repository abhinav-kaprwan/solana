import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const account = new PublicKey("HZxce9rg9BSnNvbm5D5YqUfhHCZvH8NVkKe5KHGiXuBy")

const balance = await connection.getBalance(account);

const solBalance = balance/ LAMPORTS_PER_SOL;

console.log(`Your balance in solana is ${solBalance}`)
