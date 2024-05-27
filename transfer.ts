import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

const suppliedToPubKey = process.argv[2] || null;

if(!suppliedToPubKey) {
    console.log("Please enter the reciever address");
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY")

console.log(`Suplied to pubKey : ${suppliedToPubKey}`);

const toPubkey = new PublicKey(suppliedToPubKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log("Loaded our keypair, destination public key and connected to solana");

const transaction = new Transaction();

const lamportsToSend = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey:senderKeypair.publicKey,
    toPubkey,
    lamports:lamportsToSend,

});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction ,[
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${lamportsToSend} to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);