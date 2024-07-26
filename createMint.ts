import "dotenv/config";
import {createAccount, createMint} from '@solana/spl-token'
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

function loadKeyPair(envVariable: string) {
    return getKeypairFromEnvironment(envVariable)
}
async function main() {
    // connected to solana network(devnet)
    const connection = new Connection(clusterApiUrl("devnet"))
    const payer = loadKeyPair("SECRET_KEY")
    const tokenKeyPair = loadKeyPair("TOKEN_SECRET_KEY")
    const tokenAccountKeypair = loadKeyPair("TOKEN_ACCOUNT_SECRET_KEY")

    // used to create token mint address
    // const tokenMintAddress = await createMint(connection,payer,payer.publicKey,payer.publicKey,9,tokenKeyPair);
    // console.log(tokenMintAddress.toBase58())

    const tokenAccount = await createAccount(connection,payer,tokenKeyPair.publicKey,payer.publicKey,tokenAccountKeypair)
    console.log(tokenAccount.toBase58())
}

main();