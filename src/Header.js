import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Header({dark, switcher}) {

  const displayDesktop = () => {
    return <Toolbar>{femmecubatorLogo}{switcher()}</Toolbar>;
  };

  const femmecubatorLogo = (
<>      {<a style={{textDecoration:'none', color:'#ED3838'}} href="https://www.lighttherapyinsiders.com/"><img width={232} height={62} src={dark ? "/logodark.png" :"/logo.png"} alt="logo"/> </a>}
<Typography sx={{color:'#ED3838', marginLeft:'20px', fontFamily:'Saira'}} variant="h6" component="h6">
         Red Light Therapy Shopping Tool
    </Typography></>
  );

  return (
    <header style={{marginTop:'6vh'}}>
      <AppBar sx={{background: dark ? '#2b2b2b' : '#ffff'}}>{displayDesktop()}</AppBar>
    </header>
  );
}