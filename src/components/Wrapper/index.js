import React from "react";
import "./style.css";

function Wrapper(props) {
  return <main className="wrapper"  style={{ backgroundImage: `url(${props.getusertheme})` }} {...props} />;
}

export default Wrapper;
