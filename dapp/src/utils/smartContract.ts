import { contractAddress } from "config";
import json from "contracts/nft-minter.abi.json";
import { AbiRegistry, Address, SmartContract } from "./sdkDappCore";

const abi = AbiRegistry.create(json);

export const smartContract = new SmartContract({
    address: new Address(contractAddress),
    abi,
});
