// import logo from './logo.svg';
import './App.css';
import Die from './components/Die'
import { useState } from 'react';


function App() {
  function allNewDice() { 
    const newDice = []
    for (let i = 0; i < 10; i++ ) {
      const die = Math.ceil(Math.random() * 6)
      newDice.push(die)
    }
    return newDice
  }
  // console.log(allNewDice())

  function rollDice() {
    setDice(allNewDice)
  }

  const [dice, setDice] = useState(allNewDice())
  const diceElement = dice.map(die => {
    return <Die value={die} />
    }   
  )
  
  return (

    <main>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>

  );
}

export default App;
