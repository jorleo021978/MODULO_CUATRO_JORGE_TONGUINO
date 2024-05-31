import React from "react"
function Detail(props) {
  return(
    <div>
      <p>
        <b>Genero:</b> {props.genre}
      </p>
      <p>
        <b>Estado:</b> {props.status}
      </p>
    </div>
  );
}
export default Detail;