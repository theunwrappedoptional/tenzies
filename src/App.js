// import logo from './logo.svg';
import './App.css';
import Die from './components/Die'
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

//Add real dots on the dice
//Track the number of rolls
//Track the time it took to win
//Save your best time to local storage

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function allNewDice() { 
    const newDice = []
    for (let i = 0; i < 10; i++ ) {
      const value = Math.ceil(Math.random() * 6)
      newDice.push({
        value: value,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }
  // console.log(allNewDice())

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
    }))
  }

  function holdDice(id) {
    // console.log(id)
    setDice(oldDice => oldDice.map(die => {
        return (die.id === id) ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function reset() {
    setTenzies(false)
    setDice(allNewDice)
  }

  const diceElement = dice.map(die => {
    return <Die
      key={die.id}
      isHeld={die.isHeld}
      value={die.value}
      holdDice={() => holdDice(die.id)}
    />
    }   
  )

  useEffect(() => {
    // console.log("Something changed")

    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won")
    }
  }, [dice])
  
  return (

    <main>

      {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dhe dice are the same.<br></br> Click each to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-dice" onClick={tenzies ? reset : rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>

  );
}

export default App;
