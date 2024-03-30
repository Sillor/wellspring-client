import React from "react";
import { Button } from "./button";
import "./popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button
          variant="outline"
          className="close-btn"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </Button>
        {/* <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Close
        </button> */}
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
