import React from "react";
import twitchtime from "../image/twitchtime.png";

// Displays name of webpage
function Header() {
  return (
    <header>
      <img src={twitchtime} alt="twitch-times" height="300px" />
    </header>
  );
}

export default Header;
