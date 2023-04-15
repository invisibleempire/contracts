import { InvisibleEmpireCore } from "./InvisibleEmpireCore";
import {
	isReady,
	shutdown,
	Field,
	Mina,
	PrivateKey,
	PublicKey,
	AccountUpdate,
	Bool,
} from "snarkyjs";

let proofsEnabled = false;

describe("InvisibleEmpireCore", () => {
	let deployerAccount: PublicKey,
		deployerKey: PrivateKey,
		senderAccount: PublicKey,
		senderKey: PrivateKey,
		zkAppAddress: PublicKey,
		zkAppPrivateKey: PrivateKey,
		zkApp: InvisibleEmpireCore;

	beforeAll(async () => {
		await isReady;
		if (proofsEnabled) InvisibleEmpireCore.compile();
	});

	beforeEach(() => {
		const Local = Mina.LocalBlockchain({ proofsEnabled });
		Mina.setActiveInstance(Local);
		({ privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0]);
		({ privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1]);
		zkAppPrivateKey = PrivateKey.random();
		zkAppAddress = zkAppPrivateKey.toPublicKey();
		zkApp = new InvisibleEmpireCore(zkAppAddress);

		``;
	});

	afterAll(() => {
		// `shutdown()` internally calls `process.exit()` which will exit the running Jest process early.
		// Specifying a timeout of 0 is a workaround to defer `shutdown()` until Jest is done running all tests.
		// This should be fixed with https://github.com/MinaProtocol/mina/issues/10943
		setTimeout(shutdown, 0);
	});

	async function localDeploy() {
		const txn = await Mina.transaction(deployerAccount, () => {
			AccountUpdate.fundNewAccount(deployerAccount);
			zkApp.deploy();
		});
		await txn.prove();
		// this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
		await txn.sign([deployerKey, zkAppPrivateKey]).send();
	}

	it("generates and deploys the core smart contract", async () => {
		await localDeploy();
		const gameDone = zkApp.gameDone.get();
		expect(gameDone).toEqual(Bool(true));
	});

	it("starts a new game", async () => {
		await localDeploy();

		let player1 = PrivateKey.random();
		let player2 = PrivateKey.random();

		// update transaction
		const txn = await Mina.transaction(senderAccount, () => {
			zkApp.startGame(player1.toPublicKey(), player2.toPublicKey());
		});
		await txn.prove();
		await txn.sign([senderKey]).send();

		const p1 = zkApp.player1.get();
		expect(p1).toEqual(player1.toPublicKey());
		const p2 = zkApp.player2.get();
		expect(p2).toEqual(player2.toPublicKey());

		const gameDone = zkApp.gameDone.get();
		expect(gameDone).toEqual(Bool(false));
		const gameMap = zkApp.map.get();
		expect(gameMap).toEqual(Field(0));
	});
});
