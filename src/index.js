import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { verifyTx } from "./verifyTx.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/verify", async (req, res) => {
  const { txid, reference, amount, currency } = req.body || {};
  if (!txid || !reference) return res.status(400).json({ ok: false, error: "missing fields" });
  const result = await verifyTx(txid, reference, amount, currency);
  if (!result.ok) return res.status(409).json(result);
  res.json(result);
});

const port = process.env.PORT || 9090;
app.listen(port, () => console.log(`[verifier] running on :${port}`));
