import React from 'react'
import { useState, useEffect } from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'

  export default function App() {

    const [dice, setDice] = useState(allNewDice())

    function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(createNewDie())
      }
      return newDice
  }

  function createNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const diceElements = dice.map(die => <Die key={die.id} 
    value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

  function rollDice(){
    setDice(prevDice => prevDice.map(die => die.isHeld ? die : createNewDie()))
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => die.id === id ? {
      ...die, isHeld: !die.isHeld
    } : die))
  }


    return (
      <main>
      <div className="dice-container">
          {diceElements}
      </div>
      <button onClick={rollDice} className="button-41" role="button">🎲  &nbsp; <b>Roll 'Em</b> &nbsp;  🎲</button>
  </main>
    )
}
