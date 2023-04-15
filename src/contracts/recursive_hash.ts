// Depracted
import { Bool, Poseidon, Experimental, Field, SelfProof } from 'snarkyjs';

export { RecursiveHash, Hash };

class RecursiveHash {
  static roll_dice(attacking_country: Field, attacked_country: Field, attacker_nonce: Field, proof: SelfProof<Field>) {
    const hash_output = Poseidon.hash([attacking_country, attacked_country, attacker_nonce]);

    // const { verificationKey } = Hash.compile();

    const morphing_proof = Hash.new_dice_roll(hash_output, proof);

    const result = hash_output.toBits(256)[255] === Bool(false);

    // Return true if the attacker wins, false otherwise
    return { result, morphing_proof };
  }
}

const Hash = Experimental.ZkProgram({
  publicInput: Field,

  methods: {
    new_dice_roll: {
      privateInputs: [SelfProof],

      method(hash: Field, earlierProof: SelfProof<Field>) {
        earlierProof.verify();
        const result: Bool = hash.equals(hash.div(2).mul(2));      
        const field_result = result == Bool(true) ? Field(1) : Field(0);
        field_result.assertBool();
      }
    }
  }

});
