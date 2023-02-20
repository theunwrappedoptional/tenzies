// import logo from './logo.svg';
import './App.css';
import Die from './components/Die'
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useStopwatch } from 'react-timer-hook';

function App() {

  const [rolls, setRolls] = useState(0)
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const stopwatch = useStopwatch({ autoStart: false });

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
    setRolls(oldRolls => oldRolls + 1)
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return (die.id === id) ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function startGame() {
    setRolls(1)
    stopwatch.start()
  }

  function resetGame() {
    setDice(allNewDice)
    setRolls(0)
    setTenzies(false) 
    stopwatch.reset()
    stopwatch.pause()
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
      stopwatch.pause()
      setTenzies(true)
      console.log("You won")
    }
  }, [dice, stopwatch])

  const diceElementStyle = {
    display: rolls === 0 ? "none" : ""
  }

  const startButtonStyle = {
    display: rolls > 0 ? "none" : ""
  }

  const rollButtonStyle = {
    display: rolls === 0 ? "none" : ""
  }

  
  return (

    <main>

      {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>

      <p className="instructions">Roll until all the dice are the same.<br></br> Click each to freeze it at its current value between rolls.</p>
      <div className="dice-container" style={diceElementStyle}>        
        {diceElement}
      </div>
      <button className="start-tenzies" style={startButtonStyle} onClick={startGame}>Let's Start</button>
      <button className="roll-dice" style={rollButtonStyle} onClick={tenzies ? resetGame : rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
      <div className="gameStats">
        <p className="rolls">You rolled the dice: <span>{rolls} time{rolls > 1 ? 's' : ''}</span></p>
        <p className="timer">Minutes: <span>{stopwatch.minutes}</span> Seconds: <span>{stopwatch.seconds}</span></p>
      </div>

    </main>

  );
}

export default App;
