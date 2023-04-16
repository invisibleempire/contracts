import { Field, Bool, Proof, Poseidon, Circuit } from "snarkyjs";

export const MAX_PLAYER_COUNT = 4;
export const MAX_TERRITORY_COUNT = 16;

interface Territory {
	player: number;
	troops: number;
}

export class GameBoard {
	map: Territory[] = [];

	// keeps track of how many territory a player owns
	// userOwnedTerritory: number[] = [];
	recursive_proof: Proof<Field>;

	player1Territory: number;

	player2Territory: number;

	constructor(serializedState: Field) {
		// convert felt to bits
		let bits: Bool[] = serializedState.toBits(80);
		let p1T = 0;
		let p2T = 0;

		// parse the territories state first
		// 80 bits bcs (2,3) * 16 territories
		for (let i = 0; i < 80; i = i + 5) {
			// convert bool to number as player id

			const playerBits = bits
				.slice(i, i + 2)
				.map((value) => (value.toString() == "true" ? 1 : 0))
				.join("");
			const troopBits = bits
				.slice(i + 2, i + 5)
				.map((value) => (value.toString() == "true" ? 1 : 0))
				.join("");

			const t: Territory = {
				troops: parseInt(troopBits, 2),
				player: parseInt(playerBits, 2),
			};

			if (t.player === 0) {
				p1T++;
			} else if (t.player === 1) {
				p2T++;
			}

			this.map.push(t);
		}

		this.player1Territory = p1T;
		this.player2Territory = p2T;
	}

	attack(player: Field, countryA: number, countryB: number) {
		let result = this.roll(Field(countryA), Field(countryB), Field(0));
		// assert that player owns the `countryA`
		const playerA = this.map[countryA].player;
		player.assertEquals(Field(playerA));

		if (result) {
			const currentTroops = this.map[countryB].troops;
			this.map[countryB].troops = currentTroops - 1;
		} else {
			const currentTroops = this.map[countryA].troops;
			this.map[countryA].troops = currentTroops - 1;
		}

		this._postAttack(countryA, countryB);
	}

	serialize(): Field {
		const mapBits: Bool[] = [];
		const ownedBits: Bool[] = [];

		for (let i = 0; i < this.map.length; i++) {
			const { player, troops } = this.map[i];
			mapBits.concat(Field(player).toBits(2));
			mapBits.concat(Field(troops).toBits(3));
		}

		// for (let i = 0; i < this.userOwnedTerritory.length; i++) {
		// 	const current = this.userOwnedTerritory[i];
		// 	ownedBits.concat(Field(current).toBits(4));
		// }

		ownedBits.concat(Field(this.player1Territory).toBits(4));
		ownedBits.concat(Field(this.player2Territory).toBits(4));

		return Field.fromBits(mapBits.concat(ownedBits));
	}

	_postAttack(territoryA: number, territoryB: number) {
		const { player: playerA, troops: troopsA } = this.map[territoryA];
		const { player: playerB, troops: troopsB } = this.map[territoryB];

		if (troopsA === 0 && troopsB > 0) {
			this._transferTerritoryOwnership(territoryA, playerB);
		}

		if (troopsB === 0 && troopsA > 0) {
			this._transferTerritoryOwnership(territoryB, playerA);
		}
	}

	_transferTerritoryOwnership(territory: number, player: number) {
		this.map[territory].player = player;
	}

	checkIfAPlayerWin() {
		// check if a player has all the territories
		// const winner = this.userOwnedTerritory.findIndex(
		// 	(value) => value === MAX_TERRITORY_COUNT
		// );

		return Bool.or(
			Field(this.player1Territory).equals(Field(16)),
			Field(this.player2Territory).equals(Field(16))
		);
	}

	roll(attacking_country: Field, attacked_country: Field, attacker_nonce: Field) {
		const hash_output = Poseidon.hash([
			attacking_country,
			attacked_country,
			attacker_nonce,
		]);

		const result = hash_output.toBits(256)[255] == Bool(false) ? false : true;

		// Return true if the attacker wins, false otherwise
		return result;
	}
}
