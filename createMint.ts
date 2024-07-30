import "dotenv/config";
import {mintTo, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, transfer} from '@solana/spl-token'
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
    const mint = tokenKeyPair.publicKey
    const decimal = 9
    const ta = tokenAccountKeypair.publicKey
    // used to create token mint address
    // const tokenMintAddress = await createMint(connection,payer,payer.publicKey,payer.publicKey,9,tokenKeyPair);
    // console.log(tokenMintAddress.toBase58())

    // const tokenAccount = await createAccount(connection,payer,tokenKeyPair.publicKey,payer.publicKey)
    // // if we didn't provide key pair to token account then it becomes associate token account 
    // console.log(tokenAccount.toBase58())

    // const ata = await getOrCreateAssociatedTokenAccount(connection,payer,tokenKeyPair.publicKey,payer.publicKey);
    // console.log(ata.address.toBase58())

    //Under the hood this function is checking firstly either the associated token account is created if not then it is creating it

    const ata = await getAssociatedTokenAddress(mint,payer.publicKey)
    console.log(ata)
    // const amount = 3*10**decimal
    // const sigx = await mintTo(connection,payer,mint,ata,payer.publicKey,amount)
    // console.log(sigx)

    const sigx = await transfer(connection,payer,ata,ta,payer.publicKey,1)
    console.log(sigx)

}

main();