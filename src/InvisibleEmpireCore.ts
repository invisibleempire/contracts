import {
	Field,
	SmartContract,
	state,
	method,
	State,
	PublicKey,
	Bool,
	Signature,
	Circuit,
} from "snarkyjs";
import { GameBoard } from "./gameBoard.js";

export class InvisibleEmpireCore extends SmartContract {
	@state(Field) map = State<Field>();
	@state(Field) recursive_proof = State<Field>();
	@state(Bool) gameDone = State<Bool>();

	@state(PublicKey) player1 = State<PublicKey>();
	@state(PublicKey) player2 = State<PublicKey>();

	events = {
		stateUpdate: Field,
	};

	init() {
		super.init();

		this.gameDone.set(Bool(true));
		this.player1.set(PublicKey.empty());
		this.player2.set(PublicKey.empty());
	}

	// Create a new game and initialize its state
	@method startGame(player1: PublicKey, player2: PublicKey) {
		// you can only start a new game if the current game is done
		this.gameDone.assertEquals(Bool(true));
		this.gameDone.set(Bool(false));

		// set players
		this.player1.set(player1);
		this.player2.set(player2);

		// reset board
		this.map.set(getMapDefaultState());
		// this.map.set(Field("204433065633825441354925"));
	}

	@method play(
		pubkey: PublicKey,
		signature: Signature,
		countryA: Field,
		countryB: Field
	) {
		// if the game is already finished, abort.
		this.gameDone.assertEquals(Bool(false));

		const player = this._verifyUserIsAPlayer(pubkey, signature, countryA, countryB);

		// // 4. get and deserialize the board
		const mapState = this.map.get();
		this.map.assertEquals(mapState); // precondition that links this.board.get() to the actual on-chain state
		const map = new GameBoard(mapState);
		const rollResult = map.roll(Field(countryA), Field(countryB), Field(0));

		map.attack(player, parseInt(countryA.toString()), parseInt(countryB.toString()));
		this.map.set(map.serialize());

		const winner = map.checkIfAPlayerWin();

		this.emitEvent("stateUpdate", this.map.get());

		// // Circuit.if(FIel);

		this.gameDone.set(Bool(true));
	}

	// should return the player number, if user is a player
	_verifyUserIsAPlayer(
		pubkey: PublicKey,
		signature: Signature,
		countryA: Field,
		countryB: Field
	): Field {
		// ensure player owns the associated private key
		signature.verify(pubkey, [countryA, countryB]).assertTrue();

		// ensure player is valid
		const player1 = this.player1.get();
		this.player1.assertEquals(player1);
		const player2 = this.player2.get();
		this.player2.assertEquals(player2);

		Bool.or(pubkey.equals(player1), pubkey.equals(player2)).assertTrue();

		return Circuit.if(pubkey.equals(player1), Field(0), Field(1));
	}
}

export function getMapDefaultState(): Field {
	const state = [
		0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
		1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0,
		1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1,
	].map((value) => (value === 1 ? true : false));
	return Field.fromBits(state);
}
