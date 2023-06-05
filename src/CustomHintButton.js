import React, {memo} from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { IconButton } from "@mui/material";

const CustomHintButton = ({col, sortBy, setSortBy})=>{
             
    if(!col || !col.data || !col.data[0])
    return ;

  let columProperties = Object.keys(col.data[0].data[col.colPosition]);

  const conditionalRendering = (sortBy) => {
       return sortBy === columProperties[columProperties.length - 1]      
  }
  

  const onClickSortByForwrd = () => {
    conditionalRendering(sortBy) ?
      setSortBy(columProperties[0]) :
      setSortBy(columProperties[ columProperties.indexOf(sortBy) + 1]);
  }


  return <>
  <IconButton onClick={onClickSortByForwrd}><ArrowForwardIosIcon></ArrowForwardIosIcon></IconButton>
    </>
  }

export default memo(CustomHintButton); // IMPORTANT

