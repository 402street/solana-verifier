import { getTx, checkReference } from "./solana.js";

export async function verifyTx(txid, reference, amount, currency) {
  const tx = await getTx(txid);
  if (!tx) return { ok: false, error: "not_found" };

  const slot = tx.slot;
  const refOk = await checkReference(tx, reference);
  if (!refOk) return { ok: false, error: "reference_mismatch", slot };

  // Simplified: extract SOL transfers or token mints
  const meta = tx.meta;
  const pre = meta?.preBalances?.[0];
  const post = meta?.postBalances?.[0];
  const delta = pre && post ? (pre - post) / 1e9 : 0;

  return {
    ok: true,
    slot,
    amount: delta.toFixed(4),
    currency,
    reference
  };
}
