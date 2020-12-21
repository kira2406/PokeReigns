import React from "react"

export default function damageCalc(level, attack, power, defense) {
  return parseInt(
    (((((((2 * level) / 5 + 2) * attack * power) / defense / 50 + 2) * 1 * 10) /
      10) *
      (Math.random() * (256 - 217) + 217)) /
      255
  )
}
