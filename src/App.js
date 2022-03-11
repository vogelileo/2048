import { useState } from 'react';
import './App.css';
import {
  generateNewEntry,
  genereateGrid,
  getColor,
  moveGrid,
} from './AppHelper';
import useEvent from './hooks/useEvent';

function App() {
  const [grid, setGrid] = useState(generateNewEntry(genereateGrid(4, 4)));
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState('playing');

  useEvent('keydown', (event) => {
    const handleKeyPress = (event, key) => {
      let gridTemp = [...grid];
      gridTemp = moveGrid(gridTemp, key);
      let checkGrid = generateNewEntry(gridTemp);
      if (checkGrid) {
        gridTemp = checkGrid;
      } else {
        setGameState('loss');
      }
      setGrid(gridTemp);
      setMoves(moves + 1);
      if (gridTemp.some((row) => row.includes(2048))) {
        setGameState('won');
      }
    };

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
        if (gameState === 'playing') handleKeyPress(event, event.key);
        break;
      default:
    }
  });

  return (
    <div className='App' onKeyDown={(e) => console.log('Hey')}>
      <h1>2048</h1>
      <h3>Moves: {moves}</h3>
      {gameState !== 'playing' && <h3>You {gameState} the game</h3>}
      <div>
        <table>
          <tbody>
            {grid.map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index} style={{ backgroundColor: getColor(cell) }}>
                    {cell !== 0 && cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
