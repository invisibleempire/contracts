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


    for (let i = 0; i < 16; i++) {
      let territory = gameBits[i:i+5];
      let territories = 
      let player = territory[:2];
      let troops = territory[2:];
    }
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

  @method register_player(player_1: PublicKey, player2: PublicKey, player_3: PublicKey) {
    // The msg.sender can register themselves and 3 other players to play the game.
    let caller = msg.sender;
    // store the 4 players on the contract
  }

  @method execute_attack(attacking_country: Field, attacked_country: Field) {
    // check if it is the actual owner of the attacking_country that is calling the function.
    // get the contract method caller
    let caller = msg.sender; 
    // because each territory is a 5-bit chunk with bits 0..2 holding the player index and bits 2..5 the troops number.
    let attacker_index = territory[attacking_country*5][:2]; 
    let attacker = self.players[attacker_index];
    // we wanna make sure that only the owner of the attacking_country can attack and not some random bloke.
    caller.assetEquals(attacker);

    // calculate the poseidon hash of [attacking_country, attacked_country, time_stamp] and if it's 
    // an even number then the attacker wins the round or else the defender wins with the losing party getting
    // deducted a troop from their arsenal.
    let poseidon_hash = get_poseidon_hash(attacking_country, attacked_country, time_stamp);
    // ASSUMPTION: Field element division rounds down to the nearest integer.
    let is_even: Bool = poseidon_hash == poseidon_hash.div(2).mul(2) // then it's an even number
    // example: poseidon_hash = 4; 4 == (4/2)*2 => poseidon_hash is even
    //          poseidon_hash = 5; 5 != (5/2)*2 => poseidon_hash is odd
    if is_even {
      // attacker wins
      territory[attacked_country*5][2:] -= 1;
      let num_troops_left = territory[attacked_country*5][2:];
      if num_troops_left == 0 {
        // transfer ownership to the attacker
        territory[attacked_country*5][:2] = attacker_index;
      }
    } else {
      territory[attacking_country*5][2:] -= 1;
      let num_troops_left = territory[attacking_country*5][2:];
      let attacked_index = territory[attacked_country*5][:2];
      if num_troops_left == 0 {
        // transfer ownership to the attacker
        territory[attacking_country*5][:2] = attacked_index;
    }

    // We check whether any player has conquered all the territories
    // Get the territories owned, i.e., the last 16 bits of our 96-bit game state, where each 4-bit chunk 
    // contains territories owned by a player
    for (let i = 0; i < 4; i++) {
      if territory[80 + i * 4][:4] == 16 // a player has won the game!
    }
    // verify that the owner of the territory's public key is doing the action
    // Perform an attack, utilizing the RecursiveHash function for dice rolls


  }
}
