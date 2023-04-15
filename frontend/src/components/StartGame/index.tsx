import React, { useState } from "react";
import { useUserWalletContext } from "../../contexts/UserWalletContext";

interface PlayersState {
  pkPlayer: string;
}

const StartGame = () => {
  const { wallet, setStartGame } = useUserWalletContext();
  const [error, setError] = useState(false);
  const [players, setPlayers] = useState({
    player1: "",
    player2: "",
    player3: "",
  });

  const handleClickStartGame = () => {
    const pkPlayers = {
      player4: wallet,
      player1: players.player1,
      player2: players.player2,
      player3: players.player3,
    };

    if (
      players.player1.length === 0 ||
      players.player2.length === 0 ||
      players.player3.length === 0
    ) {
      return setError(true);
    }

    setError(false);
    setStartGame(true);

    console.log(pkPlayers);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center align-center h-[70vh]">
      <h1 className="font-bold uppercase text-[18px]">
        Players Addresses
      </h1>
      <div className="flex flex-col gap-5 p-5 uppercase">
        {error && (
          <h1 className="text-red-200 text-[15px]">
            *Please fill all the inputs
          </h1>
        )}
        <div className="flex flex-col gap-2 items-start">
          <h1>Player 1:</h1>
          <input
            type="text"
            id="player-1"
            className="bg-black border border-white rounded-md p-2"
            value={players.player1}
            onChange={(e) =>
              setPlayers({ ...players, player1: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h1>Player 2:</h1>
          <input
            type="text"
            id="player-2"
            className="bg-black border border-white rounded-md p-2"
            value={players.player2}
            onChange={(e) =>
              setPlayers({ ...players, player2: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h1>Player 3:</h1>
          <input
            type="text"
            className="bg-black border border-white rounded-md p-2"
            id="player-3"
            value={players.player3}
            onChange={(e) =>
              setPlayers({ ...players, player3: e.target.value })
            }
          />
        </div>
      </div>
      <button
        onClick={() => handleClickStartGame()}
        className="bg-primary p-3 rounded-[16px]"
      >
        START GAME
      </button>
    </div>
  );
};

export default StartGame;
