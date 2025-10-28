import { Connection, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const RPC_URL = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL, process.env.CONFIRMATION_LEVEL || "confirmed");

export async function getTx(txid) {
  try {
    const tx = await connection.getTransaction(txid, {
      commitment: process.env.CONFIRMATION_LEVEL || "confirmed",
      maxSupportedTransactionVersion: 0
    });
    return tx;
  } catch (e) {
    console.error("[solana] fetch error:", e.message);
    return null;
  }
}

export async function checkReference(tx, reference) {
  if (!tx) return false;
  const memo = tx.transaction.message.instructions.find(ix => ix.programId.toString() === "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  return memo && memo.data?.includes(reference);
}
