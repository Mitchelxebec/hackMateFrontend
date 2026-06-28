export const PLAN_REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000000";

export const PLAN_REGISTRY_ABI = [
  {
    type: "function",
    name: "store",
    inputs: [{ name: "hash", type: "bytes32", internalType: "bytes32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userPlans",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bytes32[]", internalType: "bytes32[]" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "PlanStored",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      { name: "hash", type: "bytes32", indexed: false, internalType: "bytes32" },
    ],
    output: [],
    anonymous: false,
  },
] as const;
