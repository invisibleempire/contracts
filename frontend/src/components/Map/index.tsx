import React, { useEffect, useState } from "react";

import { InvisibleEmpireCore } from "../../../../src/contracts/InvisibleEmpireCore";

import { countries } from "../../data/countries";

interface PlayersState {
  player: number;
  troops: number;
}

const Map = () => {
  const [players, setPlayers] = useState<PlayersState[]>([]);

  const contract = new InvisibleEmpireCore("kdajdajdalklkkdjajdlaj");

  contract.init;

  const handleClickAttack = () => {
    const newObj = {
      pk: "",
      signature: "",
      countryA: "",
      countryB: "",
    };

    console.log(newObj);
  };

  return (
    <div className="grid grid-cols-4 gap-10 w-full justify-center py-10 px-10">
      {countries.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleClickAttack()}
            className={`flex p-5 text-black rounded-lg cursor-pointer bg-primary`}
          >
            <h1>{item.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Map;
