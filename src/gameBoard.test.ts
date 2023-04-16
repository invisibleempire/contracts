import { Field, isReady } from "snarkyjs";
import { GameBoard } from "./gameBoard";

describe("GameBoard", () => {
	beforeAll(async () => {
		await isReady;
	});

	it("create new game", () => {
		const state = [
			0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0,
			0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0,
			1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
			1, 1,
		];

		const stateBool = state.map((value) => (value === 1 ? true : false));

		const game = new GameBoard(Field.fromBits(stateBool));

		const map = game.map;

		expect(map[0].player).toEqual(0);
		expect(map[0].troops).toEqual(5);
		expect(map[1].player).toEqual(1);
		expect(map[1].troops).toEqual(5);

		expect(map[15].player).toEqual(0);
		expect(map[15].troops).toEqual(7);

		expect(game.player1Territory).toEqual(11);
		expect(game.player2Territory).toEqual(5);
	});

	it("attack", () => {
		const state = [
			0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0,
			0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0,
			1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
			1, 1,
		];
		const stateBool = state.map((value) => (value === 1 ? true : false));

		const game = new GameBoard(Field.fromBits(stateBool));

		game.attack(Field(0), 0, 1);

		expect(game.map[0].player).toEqual(0);
		expect(game.map[0].troops).toEqual(5);
		expect(game.map[1].player).toEqual(1);
		expect(game.map[1].troops).toEqual(4);
	});

	it("attack and conquer because enemy troop is finished", () => {
		const state = [
			0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0,
			0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0,
			1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
			1, 1,
		];
		const stateBool = state.map((value) => (value === 1 ? true : false));

		const game = new GameBoard(Field.fromBits(stateBool));

		game.attack(Field(0), 0, 1);

		expect(game.map[0].player).toEqual(0);
		expect(game.map[0].troops).toEqual(5);
		expect(game.map[1].player).toEqual(0);
		expect(game.map[1].troops).toEqual(0);
	});
});
