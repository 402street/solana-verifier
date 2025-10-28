# 402Street — Solana Verifier (x402)

Verifies Solana transactions for x402 payments.

## API

### `POST /verify`
**Body:**
```json
{
  "txid": "5n7v...",
  "reference": "abc123",
  "amount": 0.25,
  "currency": "USDC"
}
```
**Response:**
```json
{
  "ok": true,
  "slot": 245229,
  "amount": "0.25",
  "currency": "USDC",
  "reference": "abc123"
}
```
**If invalid:**
```json
{ 
"ok": false, "error": "reference_mismatch"
}
```
**Setup:**
```bash
cp .env.example .env
npm install
npm start
```

Notes
Uses @solana/web3.js for transaction lookups.

Checks for memo reference and basic SOL balance change.

Designed to work with 402Street backend-gateway.
