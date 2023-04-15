import { Poseidon, Experimental, Field, SelfProof, Bool } from "snarkyjs";

class RecursiveHash {
	async roll_dice(
		attacking_country: Field,
		attacked_country: Field,
		attacker_nonce: Field,
		proof: Field
	) {
		const hash_output = Poseidon.hash([
			attacking_country,
			attacked_country,
			attacker_nonce,
		]);

		const { verificationKey } = await Hash.compile();
		const morphing_proof = await Hash.newDiceRoll(hash_output, proof);

		const hashOutputBits = hash_output.toBits(256);
		const result = hashOutputBits[hashOutputBits.length - 1] === Bool(false);

		// Return true if the attacker wins, false otherwise
		return { result, morphing_proof };
	}
}

const Hash = Experimental.ZkProgram({
	publicInput: Field,

	methods: {
		newDiceRoll: {
			privateInputs: [SelfProof],

			method(hash: Field, earlierProof: SelfProof<Field>) {
				earlierProof.verify();
				const result = hash.equals(hash.div(2).mul(2));

				result.assertBool();
			},
		},
	},
});

export { RecursiveHash, Hash };
