import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";



export default function Header({dark, switcher}) {

  const displayDesktop = () => {
    return <Toolbar>{femmecubatorLogo}{switcher()}</Toolbar>;
  };

  const femmecubatorLogo = (
<>  <Typography sx={{color:'#2c6fbb'}} variant="h6" component="h1">
     Red light Therapy LED Panel Comaparative List by <b> <a style={{textDecoration:'none', color:'#2c6fbb'}} href="https://www.alexfergus.com/">Alex Fergus</a></b>
    </Typography></>
  );

  return (
    <header style={{marginTop:'6vh'}}>
      <AppBar sx={{background: dark ? '#2b2b2b' : '#ffff'}}>{displayDesktop()}</AppBar>
    </header>
  );
}