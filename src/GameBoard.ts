import { Field, Bool } from 'snarkyjs';

export const MAX_PLAYER_COUNT = 4;
export const MAX_TERRITORY_COUNT = 16;

interface Territory {
  player: number;
  troops: number;
}

export class GameBoard {
  map: Territory[];

  // keeps track of how many territory a player owns
  userOwnedTerritory: number[];

  constructor(serializedState: Field) {
    // convert felt to bits
    let bits = serializedState.toBits(96);

    // parse the territories state first
    // 80 bits bcs (2,3) * 16 territories
    for (let i = 0; i < 80; i = i + 5) {
      // convert bool to number as player id

      const t: Territory = {
        // player:
        // troops:
      };

      // this.map.push(t)
    }

    for (let i = 80; i < 96; i = i + 4) {
      // this.ownedTerritory.push()
    }
  }

  attack(player: number, countryA: number, countryB: number) {
    const result = this._rollDice();

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

  /// `true` means the roll favors the attacker,
  /// otherwise `false`.
  _rollDice(): boolean {
    // ROLL DICE LOGIC HERE
    return true;
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
