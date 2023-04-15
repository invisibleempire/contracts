import React, { useState } from "react";

import { countries } from "../../data/countries";

interface PlayersState {
  player: number;
  troops: number;
}

const Map = () => {
  const [players, setPlayers] = useState<PlayersState[]>([]);
  //   const [transactionHash, setTransactionHash] = useState<
  //     string | null
  //   >(null);

  //   const interactWithZkApp = async () => {
  //     try {
  //         // This is the public key of the deployed zkapp you want to interact with.
  //         const zkAppAddress = 'B62qq8sm7JdsED6VuDKNWKLAi1Tvz1jrnffuud5gXMq3mgtd';

  //         const tx = await window.mina.transaction(() => {
  //           const YourSmartContractInstance = new YourSmartContract(zkAppAddress);
  //           YourSmartContractInstance.foo();
  //         });

  //         await tx.prove();

  //         const { hash } = await window.mina.sendTransaction({
  //           transaction: tx.toJSON(),
  //           feePayer: {
  //             fee: '',
  //             memo: 'zk',
  //           },
  //         });

  //         console.log(hash);
  //       } catch (err) {
  //         // You may want to show the error message in your UI to the user if the transaction fails.
  //         console.log(err.message);
  //       }
  //   };
  return (
    <div className="grid grid-cols-4 gap-10 w-full justify-center py-10 px-10">
      {countries.map((item, index) => {
        return (
          <div
            key={index}
            className={`flex p-5 bg-white text-black rounded-lg cursor-pointer`}
          >
            <h1>{item.name}</h1>
          </div>
        );
      })}
      <div className=""></div>
    </div>
  );
};

export default Map;
