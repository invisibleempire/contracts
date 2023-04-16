import {
	isReady,
	shutdown,
	Field,
	Mina,
	PrivateKey,
	AccountUpdate,
	Signature,
} from "snarkyjs";
import { InvisibleEmpireCore } from "./InvisibleEmpireCore.js";
import { GameBoard } from "./gameBoard.js";

await isReady;
console.log("SnarkyJS loaded");
const useProof = false;
const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];

// Create a public/private key pair. The public key is our address and where we will deploy to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

// create an instance of Square - and deploy it to zkAppAddress
const zkAppInstance = new InvisibleEmpireCore(zkAppAddress);
const deployTxn = await Mina.transaction(deployerAccount, () => {
	AccountUpdate.fundNewAccount(deployerAccount);
	zkAppInstance.deploy();
});
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

const p1Key = PrivateKey.random();
const p1 = p1Key.toPublicKey();
const p2Key = PrivateKey.random();
const p2 = p2Key.toPublicKey();

await zkAppInstance.startGame(p1, p2);
const sign = Signature.create(senderKey, [Field(0), Field(1)]);
await zkAppInstance.play(senderAccount, sign, Field(0), Field(1));
// get the initial state of Square after deployment
const state = zkAppInstance.map.get();
const s = new GameBoard(state);

const p1G = zkAppInstance.player1.get();
const p2G = zkAppInstance.player2.get();

console.log("p1 ", p1G.x.toBigInt());
console.log("p2 ", p2G.x.toBigInt());
// console.log("state after init:", s.map[0]);

// console.log("Shutting down");
// `
// await shutdown();`;
