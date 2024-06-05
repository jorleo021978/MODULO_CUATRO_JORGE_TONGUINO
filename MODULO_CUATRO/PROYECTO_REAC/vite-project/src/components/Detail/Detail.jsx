import React from "react"

function Detail(props) {
  return(
    <div>
      <p>
        <b>Gender:</b> {props.genre}
      </p>
      <p>
        <b>status:</b> {props.status}
      </p>
    </div>
  );
}
export default Detail;