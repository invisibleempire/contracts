import React, { useEffect, useState } from "react";

import { countries } from "../../data/countries";

interface PlayersState {
  player: number;
  troops: number;
}

const Map = () => {
  const [players, setPlayers] = useState<PlayersState[]>([]);

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
    <div className="flex flex-col h-[80vh]">
      <div className="grid grid-cols-4 gap-10 w-full justify-center py-10 px-10">
        {countries.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClickAttack()}
              className={`flex p-5 w-full text-white rounded-lg cursor-pointer bg-primary items-center justify-center font-bold`}
            >
              <h1>{item.name}</h1>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-5 h-[400px]">
        <div className="flex flex-col justify-center items-center border border-white h-[200px] w-[200px]">
          <h1>Player 1</h1>
          <h1>80%</h1>
          <h1>Troops: 10</h1>
        </div>
        <div className="flex flex-col justify-center items-center border border-white h-[200px] w-[200px]">
          <h1>Player 1</h1>
          <h1>80%</h1>
          <h1>Troops: 10</h1>
        </div>
      </div>
    </div>
  );
};

export default Map;
