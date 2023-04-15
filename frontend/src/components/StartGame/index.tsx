import React, { useState } from "react";
import { useUserWalletContext } from "../../contexts/UserWalletContext";
import { InvisibleEmpireCore } from "../../../../src/contracts/InvisibleEmpireCore";
import { GameBoard } from "../../../../src/gameBoard";

interface PlayersState {
  pkPlayer: string;
}

const StartGame = () => {
  const { wallet, setStartGame } = useUserWalletContext();
  const [error, setError] = useState(false);
  const [players, setPlayers] = useState("");

  // const contract = new InvisibleEmpireCore("PBKEY");

  const handleClickStartGame = () => {
    const pkPlayers = {
      player4: wallet,
      player1: players,
    };

    if (players.length === 0) {
      return setError(true);
    }

    setError(false);
    setStartGame(true);
    // init game
    // const startGameInstance = contract.startGame(wallet, players.player1)

    // contract.map

    // query map (map state)
    // const newBoardGame = new GameBoard()
    // game board (pass map state constructor)

    console.log(pkPlayers);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center align-center h-[80vh]">
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
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
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
