import { PoseidonHash } from "snarkyjs";
import {Territory} from "./territory";

class RecursiveHash {
  static roll_dice(attacking_country: Territory, attacked_country: Territory): boolean {
    // Use Mina's Poseidon hash function to recursively prove that the operation was done correctly
    // Return true if the attacker wins, false otherwise
  }
}
