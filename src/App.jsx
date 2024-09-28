import React from 'react'
import { useState, useEffect } from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'

  export default function App() {

    const [dice, setDice] = React.useState(allNewDice())

    function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
          })
      }
      return newDice
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} />)

  function rollDice(){
    setDice(allNewDice())
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
