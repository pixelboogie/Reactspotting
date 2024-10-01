import React from 'react'
import { useState, useEffect } from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [winner, setWinner] = useState(false)

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(createNewDie())
    }
    return newDice
  }

  function createNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstvalue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstvalue)
    
    if(allHeld && allSameValue){
      setWinner(true)
      console.log("you won!")
    }
  }, [dice])

  const diceElements = dice.map(die => <Die key={die.id}
    value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  function rollDice() {
    if(winner){
      setWinner(false)
      setDice(allNewDice())
    }else{
      setDice(prevDice => prevDice.map(die => die.isHeld ? die : createNewDie()))
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? {
      ...die, isHeld: !die.isHeld
    } : die))
  }


  return (
    <main>
      {winner && <Confetti />}
      <h1 className="title">ReactSpotting</h1>
      <p className="instructions">Roll until all dice are the same. <br />
        Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="button-41" role="button">🎲  &nbsp; <b>{winner ? "Play Again" : "Roll 'em"}</b> &nbsp;  🎲</button>
    </main>
  )
}
