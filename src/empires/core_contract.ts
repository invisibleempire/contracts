import { Field, SmartContract, State, state, u256, u32, PrivateKey, PublicKey, Bool } from "snarkyjs";
import { RecursiveHash } from "./recursive_hash";
import { bitsToBytes } from "snarkyjs/dist/node/provable/binable";

export {Game, CoreContract};

class Game {
  players: PublicKey[];

  constructor(serializedMap: Field) {
    // get bits for serializedMap
    let gameBits = serializedMap.toBits(256);
    let player1 = gameBits[]


    for (let i = 0; i < 80; i++) {
      gameBits[i] = 0;
      gamebits[i+1] = 0;
    }

    players[player1] => PublicKey[player1]

  }

  allocate_territories(game: Bool[2][16]) {}

  transfer_country_ownership(winning_country: Territory) {
    // Transfer ownership of a country after a battle
  }

  check_win( ) {

  }

  start_new_game() {

  }
}

class CoreContract extends SmartContract {
  let zkAppKey = PrivateKey.random();
  let zkAppAddress = PublicKey.fromPrivateKey(zkAppKey);
  let zkApp = new CoreContract(zkAppAddress);

  @
  @state(u256) country_position = State<u256>();
  @state(u256) country_address = State<u256>();
  @state(u32) game_id = State<u32>();
  @state(u32) registration_countdown = State<u32>();
  @state(Bool) gameDone = State<Bool>();

  @method new_game() {
    // Create a new game and initialize its state
  }

  @method register_player() {
    // Register a player to the game
  }

  @method execute_attack(attacking_country: Territory, attacked_country: Territory) {
    // verify that the owner of the territory's public key is doing the action
    // Perform an attack, utilizing the RecursiveHash function for dice rolls
  }
}
