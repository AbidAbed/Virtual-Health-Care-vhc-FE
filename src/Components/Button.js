// Button.js
import React from "react";

function Button({ onChange, text, className, icon }) {
  return (
    <button
      onClick={onChange}
      className={`px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105 
      hover:rounded focus:outline-none ${className}`}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  );
}

export default Button;
