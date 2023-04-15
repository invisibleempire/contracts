import { Field, Bool } from "snarkyjs";

export const MAX_PLAYER_COUNT = 4;
export const MAX_TERRITORY_COUNT = 16;

interface Territory {
	player: number;
	troops: number;
}

export class GameBoard {
	map: Territory[] = [];

	// keeps track of how many territory a player owns
	userOwnedTerritory: number[] = [];

	constructor(serializedState: Field) {
		// convert felt to bits
		let bits: Bool[] = serializedState.toBits(96);

		// parse the territories state first
		// 80 bits bcs (2,3) * 16 territories
		for (let i = 0; i < 80; i = i + 5) {
			// convert bool to number as player id

			const playerBits = bits
				.slice(i, i + 2)
				.map((value) => (value.toBoolean() === true ? 1 : 0))
				.join("");
			const troopBits = bits
				.slice(i + 2, i + 5)
				.map((value) => (value.toBoolean() === true ? 1 : 0))
				.join("");

			const t: Territory = {
				troops: parseInt(troopBits, 2),
				player: parseInt(playerBits, 2),
			};

			this.map.push(t);
		}

		for (let i = 80; i < 88; i = i + 4) {
			const ownedBits = bits
				.slice(i, i + 4)
				.map((value) => (value.toBoolean() === true ? 1 : 0))
				.join("");
			this.userOwnedTerritory.push(parseInt(ownedBits, 2));
		}
	}

	attack(result: boolean, player: number, countryA: number, countryB: number) {
		// assert that player owns the `countryA`
		const playerA = this.map[countryA].player;
		Field(player).assertEquals(Field(playerA));

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

		for (let i = 0; i < this.userOwnedTerritory.length; i++) {
			const current = this.userOwnedTerritory[i];
			ownedBits.concat(Field(current).toBits(4));
		}

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

	checkWinner() {
		// check if a player has all the territories
		const winner = this.userOwnedTerritory.findIndex(
			(value) => value === MAX_TERRITORY_COUNT
		);

		return winner;
	}
}
