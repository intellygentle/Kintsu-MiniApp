import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import UserProfile from "./components/UserProfile";

// Kintsu contract details
const KINTSU_CONTRACT = "0xe1d2439b75fb9746E7Bc6cB777Ae10AA7f7ef9c5";
const kintsuABI = [
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "assets", type: "uint96", internalType: "uint96" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "shares", type: "uint96", internalType: "uint96" }],
    stateMutability: "payable",
  },
] as const;

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="app-bg">
      <div className="stake-card">
        <h2>Kintsu MON Staking</h2>
        <ConnectMenu />
      </div>
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (!isConnected) {
    return (
      <button type="button" onClick={() => connect({ connector: connectors[0] })}>
        Connect Wallet
      </button>
    );
  }

  return (
    <>
      <div className="connected-info">
        <div>Connected:</div>
        <div className="address">{address}</div>
      </div>
      <UserProfile />
      <StakingForm address={address!} />
    </>
  );
}

type StakingFormProps = {
  address: `0x${string}`;
};

function StakingForm({ address }: StakingFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const {
    writeContract,
    data: txHash,
    isPending,
    error: txError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleStake = () => {
    setError(null);
    try {
      const parsedAmount = parseUnits(amount, 18);
      writeContract({
        address: KINTSU_CONTRACT,
        abi: kintsuABI,
        functionName: "deposit",
        args: [parsedAmount, address],
        value: parsedAmount,
      });
    } catch (err: any) {
      setError(err.message || "Transaction failed");
    }
  };

  return (
    <div className="staking-form">
      <input
        type="number"
        min="0"
        step="any"
        placeholder="Amount to stake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <button
        type="button"
        onClick={handleStake}
        disabled={isPending || !amount || Number(amount) <= 0}
        className="button"
      >
        {isPending ? "Staking..." : "Stake MON"}
      </button>
      {isConfirming && <div className="status">Confirming transaction...</div>}
      {isSuccess && <div className="status success">Staking successful!</div>}
      {(error || txError) && (
        <div className="status error">{error || txError?.message}</div>
      )}
      {txHash && (
        <div className="tx-link">
          <a
            href={`https://testnet.monvision.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on explorer
          </a>
        </div>
      )}
    </div>
  );
}

export default App;


