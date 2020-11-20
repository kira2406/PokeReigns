import React from "react"

export default function TypeButton(props) {
  if (props.type2 == "") {
    return <span className={"type " + props.type1}>{props.type1}</span>
  } else {
    return (
      <>
        <span className={"types " + props.type1}>{props.type1}</span>{" "}
        <span className={"types " + props.type2}>{props.type2}</span>
      </>
    )
  }
}
