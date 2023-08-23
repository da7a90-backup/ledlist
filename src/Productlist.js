import React, { memo } from "react";
import {useState, useEffect} from "react"
import MUIDataTable from "mui-datatables";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import InfoIcon from '@mui/icons-material/Info';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import Zoom from '@mui/material/Zoom';
import Link from '@mui/material/Link';
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Slider } from "@mui/material";
import CustomHintButton from "./CustomHintButton";
import { fetchData } from "./services/Data";
import { PriorityHigh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

//import makeStyles from "@mui/styles";


const Productlist = props => {
/* 
    const useStyles = makeStyles({

       });
    const classes = useStyles(); */

    const navigate = useNavigate();


    const [data, setData] = useState([]);
    const [sortByShipping, setSortByShipping] = useState('shippingUsa');
    const [sortByValue, setSortByValue] = useState('discountedPerOutput');
    const [sortBySize, setSortBySize] = useState('height');
    //const [sortByWaveLengths, setSortByWaveLengths] = useState(0);


    const [showPrice, setShowPrice] = useState(true);
    const [showLeds, setShowLeds] = useState(true);
    const [showShipping, setShowShipping] = useState(true);
    const [showAvPower, setShowAvPower] = useState(true);
    const [showTotalPower, setShowTotalPower] = useState(true);
    const [showValue, setShowValue] = useState(true);
    const [showSize, setShowSize] = useState(false);
    const [showFlickernsound, setShowFlickernsound] = useState(false);
    const [showWarranty, setShowWarranty] = useState(false);
    const [showEmf, setShowEmf] = useState(false);
    const [showWavelengths, setShowWavelengths] = useState(false);
    //const [shownWavelength, setShownWavelength] = useState({blue:[],red:[],nir:[]});
    const [evenRowBgColor, setEvenBg] = useState('#fff');
    const [oddRowBgColor, setOddBg] = useState('aliceblue');



    useEffect(()=>{
      const switchToDark = ()=>{
        setEvenBg('#000') 
        setOddBg('#ED583E')
      }
     const switchToLight = ()=>{
      setEvenBg('#fff') 
      setOddBg(' ED3838')
     }
  
      props.dark ?  switchToDark() : switchToLight()
      fetchData().then(data=>{
        setData(data);
      });
    },[props.dark])

    const showSizeInBody = (size) => {
      if(sortBySize === 'height')
       {return `Height ${size[sortBySize]}"`}
        else if (sortBySize === 'width')
        {return `Width ${size[sortBySize]}"`} 
          else if(sortBySize === 'weight') 
          {return `Weight ${size[sortBySize]}lb`} 
    }

    const CustomSliderFilter = ({filterList, onChange, index, column, name, filterData}) => (
      <div>
        <FormGroup row>
        <FormGroup column="true">
        <FormLabel>{name}</FormLabel>

          <Slider
            label='range'
            value={(!filterList[index][0] && !filterList[index][1]) ? [0,3000] : [filterList[index][0], filterList[index][1]]}
            max={Math.max(...filterData[index])}
            valueLabelDisplay="auto"
            disableSwap
            onChange={event => {
              filterList[index][0] = event.target.value[0];
              filterList[index][1] = event.target.value[1];
              onChange(filterList[index], index, column);
            }}
            style={{ width: '120px', color: '#ED3838' }}
          />
        </FormGroup>
        </FormGroup>
      </div>
    )

  const columns = [
    {
      name: "_id",
      options:{
        display:false,
        filter:false,
        sort: false,
        viewColumns:false
      }
    },
    {
      label: "Name",
      name: "info",
      options: {
        filter: false,
        viewColumns:false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            if(order == "asc"){
            if (obj1.data.productName < obj2.data.productName) {
              return -1;
            }
            if (obj1.data.productName > obj2.data.productName) {
              return 1;
            }
          }
          if(order == "desc"){
            if (obj1.data.productName > obj2.data.productName) {
              return -1;
            }
            if (obj1.data.productName < obj2.data.productName) {
              return 1;
            }
          }
            return 0;          
          
          };
        }
        },
    },
    {
      label: "Price 🏷️",
      name: "cost",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
          }
    },
    {
      label: 'Shipping 📦',
      name: "shipping",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data[sortByShipping], 10);
            let val2 = parseInt(obj2.data[sortByShipping], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
         hint: (col) => {  
               return <CustomHintButton
               col={col}
               sortBy={sortByShipping}
               setSortBy={setSortByShipping}
               >

               </CustomHintButton>;
            } 
          }
    },
    {
      name: "leds",
      options:{
        filter: false,
        sort:false,
        display:false,
        viewColumns:false
      }
    },
    {
      label: `LEDs 💡`,
      name: "leds.leds",
      options: {
        filter:true,
        filterType: 'custom',

        // if the below value is set, these values will be used every time the table is rendered.
        // it's best to let the table internally manage the filterList
        //filterList: [25, 50],
        
        customFilterListOptions: {
          render: v => {
            if (v[0] && v[1]) {
              return [`Min leds: ${v[0]}`, `Max leds: ${v[1]}`];
            } else if (v[0] && v[1] ) {
              return `Min leds: ${v[0]}, Max leds: ${v[1]}`;
            } else if (v[0]) {
              return `Min leds: ${v[0]}`;
            } else if (v[1]) {
              return `Max leds: ${v[1]}`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, '');
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          logic(leds, filters) {
            if (filters[0] && filters[1]) {
              return leds < filters[0] || leds > filters[1];
            } else if (filters[0]) {
              return leds < filters[0];
            } else if (filters[1]) {
              return leds > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column, filterData) => <CustomSliderFilter 
          filterList={filterList} 
          onChange={onChange} 
          index={index} 
          column={column} 
          name={'LEDS'}
          filterData={filterData} >
          </CustomSliderFilter>,
        },
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Total Power ⚡",
      name: "leds.totalPowerOutput",
      options: {
        filter:true,
        filterType: 'custom',

        // if the below value is set, these values will be used every time the table is rendered.
        // it's best to let the table internally manage the filterList
        //filterList: [25, 50],
        
        customFilterListOptions: {
          render: v => {
            if (v[0] && v[1]) {
              return [`Min totalPowerOutput: ${v[0]}`, `Max totalPowerOutput: ${v[1]}`];
            } else if (v[0] && v[1] ) {
              return `Min totalPowerOutput: ${v[0]}, Max totalPowerOutput: ${v[1]}`;
            } else if (v[0]) {
              return `Min totalPowerOutput: ${v[0]}`;
            } else if (v[1]) {
              return `Max totalPowerOutput: ${v[1]}`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, '');
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          logic(totalPowerOutput, filters) {
            if (filters[0] && filters[1]) {
              return totalPowerOutput < filters[0] || totalPowerOutput > filters[1];
            } else if (filters[0]) {
              return totalPowerOutput < filters[0];
            } else if (filters[1]) {
              return totalPowerOutput > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column, filterData) => <CustomSliderFilter 
          filterList={filterList} 
          onChange={onChange} 
          index={index} 
          column={column} 
          name={'Total Power'}
          filterData={filterData}  >
          </CustomSliderFilter>,
        },
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Average Irradiance 🔌",
      name: "leds.avCombinedPower",
      options:{
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Value 💲",
      name: "value",
      options:{
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data[sortByValue], 10);
            let val2 = parseInt(obj2.data[sortByValue], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
        hint: (col) => {  
          return <CustomHintButton
          col={col}
          sortBy={sortByValue}
          setSortBy={setSortByValue}
          >

          </CustomHintButton>;
       } 
      }
    },
    {
      label: "EMF",
      name: "nnemf",
      options: {
        display: showEmf,
        filter: false,
        sort: false
      }
    },
    {
      label: 'Dimensions',
      name: "size",
      options: {
        display: showSize,
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseFloat((obj1.data)[sortBySize], 10);
            let val2 = parseFloat((obj2.data)[sortBySize], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
         hint: (col) => {  
          return <CustomHintButton 
          col={col}
          sortBy={sortBySize}
          setSortBy={setSortBySize}
          >

          </CustomHintButton>;
       }  
      }
    },
    {
      label: "Warranty",
      name: "warranty",
      options: {
        display: showWarranty,
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data.warranty, 10);
            let val2 = parseInt(obj2.data.warranty, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Sound Level 🔊",
      name: "flickernsound",
      options: {
        display: showFlickernsound,
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data.soundLevels, 10);
            let val2 = parseInt(obj2.data.soundLevels, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },    
    {
      label: "Wavelengths",
      name: "wavelengths",
      options: {
        display: showWavelengths,
        filter: false,
        sort: false
      }
    },
     {
        name:"cost",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min cost: $${v[0]}`, `Max cost: $${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min cost: $${v[0]}, Max cost: $${v[1]}`;
               } else if (v[0]) {
                 return `Min cost: $${v[0]}`;
               } else if (v[1]) {
                 return `Max cost: $${v[1]}`;
               }
               return [];
             },
             update: (filterList, filterPos, index) => { 
               if (filterPos === 0) {
                 filterList[index].splice(filterPos, 1, '');
               } else if (filterPos === 1) {
                 filterList[index].splice(filterPos, 1);
               } else if (filterPos === -1) {
                 filterList[index] = [];
               }
 
               return filterList;
             },
           },
           filterOptions: {
             logic(cost, filters) {
               if (filters[0] && filters[1]) {
                 return cost < filters[0] || cost > filters[1];
               } else if (filters[0]) {
                 return cost < filters[0];
               } else if (filters[1]) {
                 return cost > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column, filterData) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Price'}
             filterData={filterData}  >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
    {
    name:"size.height",
    options:{
       filter:true,
       filterType: 'custom',

       // if the below value is set, these values will be used every time the table is rendered.
       // it's best to let the table internally manage the filterList
       //filterList: [25, 50],
       
       customFilterListOptions: {
         render: v => {
           if (v[0] && v[1]) {
             return [`Min height: ${v[0]}"`, `Max height: ${v[1]}"`];
           } else if (v[0] && v[1] ) {
             return `Min height: ${v[0]}", Max height: ${v[1]}"`;
           } else if (v[0]) {
             return `Min height: ${v[0]}"`;
           } else if (v[1]) {
             return `Max height: ${v[1]}"`;
           }
           return [];
         },
         update: (filterList, filterPos, index) => {
           if (filterPos === 0) {
             filterList[index].splice(filterPos, 1, '');
           } else if (filterPos === 1) {
             filterList[index].splice(filterPos, 1);
           } else if (filterPos === -1) {
             filterList[index] = [];
           }

           return filterList;
         },
       },
       filterOptions: {
         logic(height, filters) {
           if (filters[0] && filters[1]) {
             return height < filters[0] || height > filters[1];
           } else if (filters[0]) {
             return height < filters[0];
           } else if (filters[1]) {
             return height > filters[1];
           }
           return false;
         },
         display: (filterList, onChange, index, column, filterData) => <CustomSliderFilter 
         filterList={filterList} 
         onChange={onChange} 
         index={index} 
         column={column} 
         name={'Height'} 
         filterData={filterData} >
         </CustomSliderFilter>,
       },
       sort:false,
       display:false,
       viewColumns:false
    }
 },
 {
  name:"size.width",
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min width: ${v[0]}"`, `Max width: ${v[1]}"`];
         } else if (v[0] && v[1] ) {
           return `Min width: ${v[0]}", Max width: ${v[1]}"`;
         } else if (v[0]) {
           return `Min width: ${v[0]}"`;
         } else if (v[1]) {
           return `Max width: ${v[1]}"`;
         }
         return [];
       },
       update: (filterList, filterPos, index) => {
         if (filterPos === 0) {
           filterList[index].splice(filterPos, 1, '');
         } else if (filterPos === 1) {
           filterList[index].splice(filterPos, 1);
         } else if (filterPos === -1) {
           filterList[index] = [];
         }

         return filterList;
       },
     },
     filterOptions: {
       logic(width, filters) {
         if (filters[0] && filters[1]) {
           return width < filters[0] || width > filters[1];
         } else if (filters[0]) {
           return width < filters[0];
         } else if (filters[1]) {
           return width > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column, filterData) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'Width'} 
       filterData={filterData} >
       </CustomSliderFilter>,
     },
     sort:false,
     display:false,
     viewColumns:false
  }
},
 {
    name:"warranty.warranty",
    options:{
       filter:true,
       filterType: 'custom',

       // if the below value is set, these values will be used every time the table is rendered.
       // it's best to let the table internally manage the filterList
       //filterList: [25, 50],
       
       customFilterListOptions: {
         render: v => {
           if (v[0] && v[1]) {
             return [`Min warranty: ${v[0]} years`, `Max warranty: ${v[1]} years`];
           } else if (v[0] && v[1] ) {
             return `Min warranty: ${v[0]} years, Max warranty: ${v[1]} years`;
           } else if (v[0]) {
             return `Min warranty: ${v[0]} years`;
           } else if (v[1]) {
             return `Max warranty: ${v[1]} years`;
           }
           return [];
         },
         update: (filterList, filterPos, index) => {
           if (filterPos === 0) {
             filterList[index].splice(filterPos, 1, '');
           } else if (filterPos === 1) {
             filterList[index].splice(filterPos, 1);
           } else if (filterPos === -1) {
             filterList[index] = [];
           }

           return filterList;
         },
       },
       filterOptions: {
         logic(warranty, filters) {
           if (filters[0] && filters[1]) {
             return warranty < filters[0] || warranty > filters[1];
           } else if (filters[0]) {
             return warranty < filters[0];
           } else if (filters[1]) {
             return warranty > filters[1];
           }
           return false;
         },
         display: (filterList, onChange, index, column, filterData) => <CustomSliderFilter 
         filterList={filterList} 
         onChange={onChange} 
         index={index} 
         column={column} 
         name={'Warranty'} 
         filterData={filterData} >
         </CustomSliderFilter>,
       },
       sort:false,
       display:false,
       viewColumns:false
    }
 },
{
  name:"info.company",
  label:'Company',
  options:{
     filter:true,
     filterType: 'multiselect',
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name: "info.companyHq",
  label: "Company Location",
  options:{
    filter:true,
    filterType: 'multiselect',
    sort:false,
    display:false,
    viewColumns:false
  }

},
{
  name: "info.warehouse",
  label: "Company Warehouse",
  options:{
    filter:true,
    filterType: 'multiselect',
    sort:false,
    display:false,
    viewColumns:false
  }

},
{
  name:"info.class",
  label:"Class",
  options:{
     filter:true,
     filterType: 'multiselect',
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"yearReleased",
  label:"Year Released",
  options:{
     filter:true,
     filterType: 'multiselect',
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name: "flickernsound.flicker",
  label: "Flicker Free",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `Flicker Free` },
    filterType: "checkbox",
    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(flicker, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return !(flicker === 0);
      }
    },
  }
},
{
  name: "info.alexTested",
  label: "Alex Data Only",
  options: {
    sort: false,
    display: false,
    viewColumns: false,
    filter: true,
    customFilterListOptions: {render: v => `Alex Tested`},
    filterType: "checkbox",
    filterOptions: {
      names: [true],
      logic(alexTested, filterVal, row) {
        return alexTested === false
      }
    }
  }

},
{
  name: "nnemf",
  label: "Ultra Low EMF",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `EMF Safe` },
    filterType: "checkbox",
    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(nnemf, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        let unsafe = false;
        if(nnemf.emfe === 'Green' && nnemf.mag === 'Green')
        unsafe = true

        return !unsafe;
      }
    },
  }
},
{
  name: "leds.ledDualChip",
  label: "Multi Chip LED",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `Multi Chip LED` },
    filterType: "checkbox",
    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(ledDualChip, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return !(ledDualChip === 1);
      }
    },
  }
},
{
  name: "features.pulsing",
  label: "Pulsing",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `Pulsing` },
    filterType: "checkbox",
    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(pulsing, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return !(pulsing === 1);
      }
    },
  }
},
{
  name: "features.modularSupport",
  label: "Modular Support",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `Modular Support` },
    filterType: "checkbox",
    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(modularSupport, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return !(modularSupport === 1);
      }
    },
  }
},
{
  name: "features.inbuiltTimer",
  label: "Built in timer",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `Built in Timer` },
    filterType: "checkbox",
    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(inbuiltTimer, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return !(inbuiltTimer === 1);
      }
    },
  }
},
{
  name: "features.stands",
  label: "Stands included",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `Stands included` },
    filterType: "checkbox",
    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(stands, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return !(stands === 1);
      }
    },
  }
},
{
  name: "wavelengths",
  label: "Blue",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `${v}` },
    filterType: "checkbox+",
    filterOptions: {
      names:['480'],
      logic(wavelengths, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
          return !(wavelengths[`nm${filterVal}`] > 0)
        
      }
    },
  }
},
{
  name: "wavelengths",
  label: "Red",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `${v}` },
    filterType: "checkbox+",
    filterOptions: {
      names:['610','630','660'],
      logic(wavelengths, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        let filter = false;
        for(let key in filterVal){
          let init = !(wavelengths[`nm${filterVal[key]}`] > 0)

            for(let innerKey in filterVal){
              if(init && !(wavelengths[`nm${filterVal[innerKey]}`] > 0)){
                filter = true
              }
            }
        }
        return filter;
        
      }
    },
  }
},
{
  name: "wavelengths",
  label: "NIR",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `${v}` },
    filterType: "checkbox+",
    filterOptions: {
      names:['810', '830', '850', '930', '950'],
      logic(wavelengths, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        let filter = false;
        for(let key in filterVal){
          let init = !(wavelengths[`nm${filterVal[key]}`] > 0)

            for(let innerKey in filterVal){
              if(init && !(wavelengths[`nm${filterVal[innerKey]}`] > 0)){
                filter = true
              }
            }
        }
        return filter;
      }
    },
  }
}
  ];


  const MyCustomRowComponent = (props) => {
    const { dataIndex, rowIndex, info, cost, shipping, yearReleased, leds, totalPowerOutput, avCombinedPower, value, nnemf, size, warranty, flickernsound, wavelengths, dataObject} = props;
    const bgColor = rowIndex % 2 === 0 ? evenRowBgColor : oddRowBgColor
    console.log(dataObject);
    return (
      <TableRow style={{backgroundColor : bgColor, padding: 0, color: '#fff'}}>
        <TableCell style={{color: '#ffff'}} align="center">
          <IconButton style={{color: !props.dark ? '#000' : '#ffff'}} onClick={()=>{
              const passphrase = prompt("Please enter the password here");
              if(passphrase===null){
                return
              }
              if(passphrase!=="Red4Win"){
                alert("you don't have access to this!")
                return
              }
          navigate('/details', {state: {object: dataObject, allData: data}})
          }}>
          {rowIndex+1}
          </IconButton>
         </TableCell>
        <TableCell style={{width: '15vw', color: !props.dark ? '#000' : '#ffff'}} align="center">{info.productName}             
        <Tooltip 
               enterTouchDelay={0}
               leaveTouchDelay={2500}
               TransitionComponent={Zoom}
               componentsProps={{
                   tooltip: {
                     sx: {
                       background: '#ffff',
                       color: '#000',
                       fontSize: "1em",
                       width: "200px",
                       border: '1px solid #ED3838',
                       borderRadius: "10px 10px",
                       boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                     }
                   }
                 }}
               title={
                <React.Fragment>
                <b>Company</b><br/><Paper align='center' elevation={2}>{info.company}</Paper><br/>
                <b>Company Location</b><br/><Paper align='center' elevation={2}>{info.companyHq}</Paper>
                <b>Company Warehouse</b><br/><Paper align='center' elevation={2}>{info.warehouse.join(", ")}</Paper>
                <b>Class</b><br/><Paper align='center' elevation={2}>{info.class}</Paper><br/>
                <b>Discount Code</b><br/><Paper align='center' elevation={2}>{info.discountCode}</Paper><br/>
                <b>Product Link</b><br/><Paper align='center' elevation={2}><Link target="_blank" color="primary" href={`${info.productLink}`}><ShortcutIcon></ShortcutIcon></Link></Paper><br/>
                <b>Youtube Review</b><br/><Paper align='center' elevation={2}><Link target="_blank" href={`${info.youtubeReview}`}><YouTubeIcon sx={{color:'red'}}></YouTubeIcon></Link></Paper><br/>
                </React.Fragment>
                    }>
            <InfoIcon style={{ float: 'right' }} color="primary"></InfoIcon>
            </Tooltip>
            
            </TableCell>
          {showPrice && (
            <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center"> 
            <b>{`$${cost}` }</b>
            </TableCell>
          )}
        {showShipping && (
        <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center"> 
        <Tooltip 
        enterTouchDelay={0}
        leaveTouchDelay={2500}
        TransitionComponent={Zoom}
        componentsProps={{
            tooltip: {
                sx: {
                    background: '#ffff',
                    color: '#000',
                    fontSize: "1em",
                    width: "200px",
                    border: '1px solid #ED3838',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={<React.Fragment>
            <b>Shipping USA 🇺🇸</b><br/><Paper align='center' elevation={2}>${shipping.shippingUsa}</Paper><br/>
            <b>Shipping Intl 🌎</b><br/><Paper align='center' elevation={2}>${shipping.shippingIntl === 0 ? `${shipping.shippingIntl}` : `${shipping.shippingIntl}+` }</Paper><br/>
            </React.Fragment>
                        }>
        <b>{sortByShipping === 'shippingIntl' ? `$${shipping[sortByShipping]}➕ 🌎` : `$${shipping[sortByShipping]} 🇺🇸` }</b>
        </Tooltip>
        </TableCell>
        )}

        {showLeds && (
        <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
        <Tooltip
        enterTouchDelay={0} 
        leaveTouchDelay={2500}
        TransitionComponent={Zoom}
        componentsProps={{
            tooltip: {
                sx: {
                    background: '#ffff',
                    color: '#000',
                    fontSize: "1em",
                    width: "200px",
                    border: '1px solid #ED3838',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={ <React.Fragment> 
            <b>Leds</b><br/><Paper align='center' elevation={2}>{leds.leds}</Paper><br/>
            <b>Multi Chip LED</b><br/><Paper align='center' elevation={2}>{leds.ledDualChip ? `Yes` : `Single`}</Paper><br/>
            </React.Fragment>
        }>
         <b>{leds.leds}</b>
        </Tooltip>
        </TableCell>
        )}

          {showTotalPower && (
          <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
          {leds.totalPowerOutput} W
          </TableCell>  
          )}

          {showAvPower && (
          <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
          {leds.avCombinedPower} mw/cm2
          </TableCell> 
          )}

          {showValue && (
          <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
          <b>${sortByValue === 'discountedPerLed' ? `${value[sortByValue]} / LED` : `${value[sortByValue]} / Watt` }</b>
          </TableCell>   
          )}

          {showEmf && (
            <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
              <span>⚡ {
                nnemf.emfe !== undefined ? (nnemf.emfe.toLowerCase().includes('green') && (<span> <Tooltip title={nnemf.emfe.toLowerCase().replace('green','')}><span>🟢</span></Tooltip> </span>)) : "?"}
              {
                nnemf.emfe !== undefined ? 
              (nnemf.emfe.toLowerCase().includes('orange') && (<span><Tooltip title={nnemf.emfe.toLowerCase().replace('orange','')}><span>🟠</span></Tooltip> </span>)) : "?"}
              {nnemf.emfe !== undefined ? (nnemf.emfe.toLowerCase().includes('yellow') && (<span><Tooltip title={nnemf.emfe.toLowerCase().replace('yellow','')}><span>🟡</span></Tooltip> </span>)): "?"}
              {nnemf.emfe !== undefined ? (nnemf.emfe.toLowerCase().includes('red') && (<span><Tooltip title={nnemf.emfe.toLowerCase().replace('red','')}><span>🔴</span></Tooltip> </span>)) : "?"}
              {((nnemf.emfe.toLowerCase().includes('tbc') || nnemf.emfe === '') && (<span>?</span>))}
               </span> <br/>
              <span>🧲 {nnemf.mag !== undefined ? (nnemf.mag.toLowerCase().includes('green') && (<span><Tooltip title={nnemf.mag.toLowerCase().replace('green','')}><span>🟢</span></Tooltip> </span>)) : "?"}
              {nnemf.mag !== undefined ? (nnemf.mag.toLowerCase().includes('orange') && (<span><Tooltip title={nnemf.mag.toLowerCase().replace('orange','')}><span>🟠</span></Tooltip> </span>)) : "?"}
              {nnemf.mag !== undefined ? (nnemf.mag.toLowerCase().includes('yellow') && (<span><Tooltip title={nnemf.mag.toLowerCase().replace('yellow','')}><span>🟡</span></Tooltip> </span>)) : "?"}
              {nnemf.mag !== undefined ? (nnemf.mag.toLowerCase().includes('red') && (<span><Tooltip title={nnemf.emfe.toLowerCase().replace('red','')}><span>🔴</span></Tooltip> </span>)) : "?"}
              {((nnemf.mag.toLowerCase().includes('tbc') || nnemf.mag === '' || nnemf.mag === undefined) && (<span>?</span>))} </span>
            </TableCell>
          )

          }
          {showSize && (
                    <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
                    <Tooltip 
                    enterTouchDelay={0}
                    leaveTouchDelay={2500}
                    TransitionComponent={Zoom}
                    componentsProps={{
                        tooltip: {
                            sx: {
                                background: '#ffff',
                                color: '#000',
                                fontSize: "1em",
                                width: "200px",
                                border: '1px solid #ED3838',
                                borderRadius: "10px 10px",
                                boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                              }
                        }
                      }}
                    title={
                        <React.Fragment> 
                        <b>Height</b><br/><Paper align='center' elevation={2}>{size.height}"</Paper><br/>
                        <b>Width</b><br/><Paper align='center' elevation={2}>{size.width}"</Paper><br/>
                        <b>Weight</b><br/><Paper align='center' elevation={2}>{size.weight}lb</Paper><br/>
                        </React.Fragment> 
                    }>
                        <span>{showSizeInBody(size)}</span>
                    </Tooltip>
                    </TableCell>
          )
          }
          {showWarranty && (
                <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
                <span>{`${warranty.warranty} years`}</span>
                </TableCell>
          )}
          {showFlickernsound && (
          <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center">
            {flickernsound.soundLevels} dB
             </TableCell>   

          )}
          {showWavelengths && (
            <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="left">
              <div>
                        {wavelengths.nm480 > 0 && (<b style={{color:'blue'}}>480x{wavelengths.nm480} {wavelengths.nm480real && (
                          <Tooltip title={`480 real reading: ${wavelengths.nm480real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b>)}
                        {wavelengths.nm610 > 0 && (<b style={{color:'red'}}>610x{wavelengths.nm610} {wavelengths.nm610real && (
                          <Tooltip title={`610 real reading: ${wavelengths.nm610real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )}  </b>)}
                        {wavelengths.nm630 > 0 && (<b style={{color:'red'}}>630x{wavelengths.nm630} {wavelengths.nm630real && (
                          <Tooltip title={`630 real reading: ${wavelengths.nm630real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )}  </b> )}
                        {wavelengths.nm660 > 0 && (<b style={{color:'red'}}>660x{wavelengths.nm660} {wavelengths.nm660real && (
                          <Tooltip title={`660 real reading: ${wavelengths.nm660real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b> )}
                        {wavelengths.nm810 > 0 && (<b style={{color:'gray'}}>810x{wavelengths.nm810} {wavelengths.nm810real && (
                          <Tooltip title={`810 real reading: ${wavelengths.nm810real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b> )}
                        {wavelengths.nm830 > 0 && (<b style={{color:'gray'}}>830x{wavelengths.nm830} {wavelengths.nm830real && (
                          <Tooltip title={`830 real reading: ${wavelengths.nm830real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b> )}
                        {wavelengths.nm850 > 0 && (<b style={{color:'gray'}}>850x{wavelengths.nm850} {wavelengths.nm850real && (
                          <Tooltip title={`850 real reading: ${wavelengths.nm850real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b> )}
                        {wavelengths.nm930 > 0 && (<b style={{color:'gray'}}>930x{wavelengths.nm930} {wavelengths.nm930real && (
                          <Tooltip title={`930 real reading: ${wavelengths.nm930real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b> )}
                        {wavelengths.nm950 > 0 && (<b style={{color:'gray'}}>950x{wavelengths.nm950} {wavelengths.nm950real && (
                          <Tooltip title={`950 real reading: ${wavelengths.nm950real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b> )}                        
              </div>
            </TableCell>
          )}
      </TableRow>
    );
  }


  const options = {
    filter: true,
    onFilterChange: (changedColumn, filterList) => {
      if(changedColumn === 'wavelengths'){
        const blue = filterList[30]
        const red = filterList[31]
        const nir = filterList[32]

        console.log(filterList)
        if(blue.length === 0 && red.length === 0 && nir.length === 0){
          setShowWavelengths(false)
        }
        else{
          setShowWavelengths(true)
        }
      }
    },
    selectableRows: "single",
    viewColumns: true,
    onViewColumnsChange:(columnChanged, action) => {
      if(action === 'add'){
        switch(columnChanged){
          case 'size': setShowSize(true);
          break;
          case 'warranty': setShowWarranty(true);
          break;
          case 'flickernsound': setShowFlickernsound(true);
          break;
          case 'nnemf': setShowEmf(true);
          break;
          case 'cost': setShowPrice(true);
          break;
          case 'shipping': setShowShipping(true);
          break;
          case 'leds.leds': setShowLeds(true);
          break;
          case 'leds.totalPowerOutput': setShowTotalPower(true);
          break;
          case 'leds.avCombinedPower': setShowAvPower(true);
          break;
          case 'value': setShowValue(true);
          break;
          case 'wavelengths': setShowWavelengths(true);
          break;
        }
      }

      if(action === 'remove'){
        switch(columnChanged){
          case 'size': setShowSize(false);
          break;
          case 'warranty': setShowWarranty(false);
          break;
          case 'flickernsound': setShowFlickernsound(false);
          break;
          case 'nnemf': setShowEmf(false);
          break;
          case 'cost': setShowPrice(false);
          break;
          case 'shipping': setShowShipping(false);
          break;
          case 'leds.leds': setShowLeds(false);
          break;
          case 'leds.totalPowerOutput': setShowTotalPower(false);
          break;
          case 'leds.avCombinedPower': setShowAvPower(false);
          break;
          case 'value': setShowValue(false);
          break;
          case 'wavelengths': setShowWavelengths(false);
          break;
        }
      }
      

    },
    enableNestedDataAccess: ".",
    filterType: "dropdown",
    customSearch: (searchQuery, currentRow, columns) => {
        let isFound = false;

        currentRow.forEach(col => {

            if(typeof col ==='object' && col !== null){
                Object.keys(col).map(key => {
                      if(col[key] !== null && col[key]?.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) {
                        isFound = true;
                      }
                })
            }

            if(col !== undefined && col !== null){
            if (col.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) {
                isFound = true;
              }
            }
          
      
        });
        return isFound;
      },
    responsive: "responsive",
    customRowRender: (data, dataIndex, rowIndex) => {
        const [_id, info, cost, shipping, leds, ledcount, totalPowerOutput, avCombinedPower, value, nnemf, size, warranty, flickernsound, wavelengths] = data;
        const yearReleased = data[22]
        const ledDualChip = data[26]
        const pulsing = data[27]
        const modularSupport = data[28]
        const inbuiltTimer = data[29]
        const stands = data [30]
        const features = {ledDualChip,pulsing,modularSupport,inbuiltTimer, stands}

        const dataObject = {_id, info, cost, shipping, leds, features, flickernsound, nnemf, warranty, value, wavelengths, yearReleased, cost, size}
        console.log(data)
        return (
          <MyCustomRowComponent
          dataIndex={dataIndex}
          rowIndex={rowIndex}
          info={info}
          cost={cost}
          shipping={shipping}
          yearReleased={yearReleased}
          leds={leds}
          totalPowerOutput={totalPowerOutput}
          avCombinedPower={avCombinedPower}
          value={value}
          features={features}
          size={size}
          warranty={warranty}
          flickernsound={flickernsound}
          wavelengths={wavelengths}
          nnemf={nnemf}
          dataObject={dataObject}
          dark={props.dark}
          />
        );
      },
    rowsPerPage: 50,
    searchAlwaysOpen: true,
    expandableRows: false,
    resizableColumns: false,
    fixedHeader: true
  };

 const lightTheme = createTheme({
    components: {
        MuiTable:{
          styleOverrides:{ root:{
            borderCollapse:'separate',
            borderSpacing: '5px',
            fontFamily: 'Saira'
            }}
        },
        MuiTableCell: {
            styleOverrides:{ body: {
                //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);',
                padding: '0',
                borderBottom:'1px solid #ED3838',
                borderCollapse: 'separate',
                fontFamily: 'Saira'
            }}
          },
        MuiTableSortLabel: {
          styleOverrides:{
            root: {
              width: "0.5rem",
              },
            }
          },
        MuiInput:{styleOverrides:{
          root:{
            ":after":{
              borderBottom:'2px solid #ED3838'
            }
          }
        }},
        MuiTableCell: {
            styleOverrides:{ root: {
              padding: '0px',
              fontFamily: 'Saira'
            }}
        },
        MuiTableCell: {
            styleOverrides:{ head: {
              outline: '#ED3838 auto',
              borderCollapse: 'separate',
              borderRadius: '15px 15px 15px 15px',
              fontFamily: 'Saira',
              borderBottom: '0',
              textAlign: 'center',
              padding: '10px',
              fontVariantEmoji:'emoji',
              fontWeight:'bold',
              alignContent: 'center'
            }}
        },
        MUIDataTableHeadCell:{
            styleOverrides:{ data:{
              fontWeight:'bold',
              fontFamily: 'Saira'
            }}
        },
        MUIDataTableViewCol: {
          styleOverrides:{ root:{
              right: '5vw'
          }}
        },
          MuiSvgIcon: {
            styleOverrides:{ root:{
                //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);'
                    color: '#ED3838'
            }
            }
          },
          MUIDataTableFilter: {
            styleOverrides: { root: {
                    height: '380px',
                    overflowY: 'scroll',
                    fontFamily: 'Saira'
            }
          }
          },
          MuiGrid:{
            styleOverrides: {root: {
              zIndex:'10'
            }}
          },
          MuiChip: {
            styleOverrides: { root: {
              display : 'none'
            }}
          },
          MuiFormControlLabel: {
            styleOverrides: {root: {
                    marginLeft: '0'
            }}
          },
          MuiFormLabel:{
            styleOverrides:{root:{
              fontFamily: 'Saira'
            }}
          },
          MUIDataTableToolbar:{
            styleOverrides: {left: {
                    marginTop: '180px'
            }}
          },
          MuiTypography: {
            styleOverrides: {root: {
                    fontWeight: '900',
                    fontFamily: 'Saira'
            }}
          },
          MuiCheckbox:{
            styleOverrides: {root: {
                    paddingLeft: '26px',
                    paddingRight: '12px'
            }}
          },
          MUIDataTableViewCol:{
            styleOverrides:{title: {
                    textAlign: 'center',
                    paddingRight: '15vw'
            }}
          }
    },
    })


    const darkTheme = createTheme({
      components: {
        MuiTable:{
          styleOverrides:{ root:{
            borderCollapse:'separate',
            borderSpacing: '5px'
            }}
        },
          MuiTable:{
            styleOverrides:{ root:{
              borderCollapse:'separate',
              borderSpacing: '5px',
              background: "#000",
              color: "#ffff"
              }}
          },
          MuiTableCell: {
              styleOverrides:{ body: {
                  //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);',
                  padding: '0',
                  borderBottom:'1px solid #ED3838',
                  borderCollapse: 'separate',
                  background: "#000",
                  color: "#ffff",
                  fontFamily: 'Saira'
              }}
            },
          MuiTableSortLabel: {
            styleOverrides:{
              root: {
                width: "0.5rem",
                },
              }
            },
          MuiTableCell: {
              styleOverrides:{ root: {
                padding: '0px',
                background: "#000",
                color: "#ffff"
              }}
          },

          MuiTableCell: {
              styleOverrides:{ head: {
                outline: '#ED3838 auto',
                borderCollapse: 'separate',
                borderRadius: '15px 15px 15px 15px',
                borderBottom: '0',
                textAlign: 'center',
                fontFamily: 'Saira',
                padding: '10px',
                fontVariantEmoji:'emoji',
                fontWeight:'bold',
                alignContent: 'center',
                background: "#000",
                color: "#ffff"
              }}
          },
          MUIDataTableHeadCell:{
              styleOverrides:{ data:{
                fontWeight:'bold',
                background: "#000",
                color: "#ffff"
              }}
          },
          MUIDataTableViewCol: {
            styleOverrides:{ root:{
                right: '5vw',
                background: "#000",
                color: "#ffff"
            }}
          },
            MuiSvgIcon: {
              styleOverrides:{ root:{
                  //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);'
                      color: '#ED3838',
                      background: "#000",
                      color: "#ffff"
              }
              }
            },
            MUIDataTableFilter: {
              styleOverrides: { root: {
                      height: '345px',
                      overflowY: 'scroll',
                      background: "#000",
                      color: "#ffff"
              }
            }
            },
            MuiGrid:{
              styleOverrides: {root: {
                zIndex:'10',
                background: "#000",
                color: "#ffff"
              }}
            },
            MuiChip: {
              styleOverrides: { root: {
                display : 'none',
                background: "#000",
                color: "#ffff"
              }}
            },
            MuiFormControlLabel: {
              styleOverrides: {root: {
                      marginLeft: '0',
                      background: "#000",
                      color: "#ffff"
              }}
            },
            MUIDataTableToolbar:{
              styleOverrides: {left: {
                      marginTop: '120px',
                      background: "#000",
                      color: "#ffff"
              }}
            },
            MuiTypography: {
              styleOverrides: {root: {
                      fontWeight: '900',
                      background: "#000",
                      color: "#ffff"
              }}
            },
            MuiCheckbox:{
              styleOverrides: {root: {
                      paddingLeft: '26px',
                      paddingRight: '12px',
                      background: "#000",
                      color: "#ffff"
              }}
            },
            MUIDataTableViewCol:{
              styleOverrides:{title: {
                      textAlign: 'center',
                      paddingRight: '15vw',
                      background: "#000",
                      color: "#ffff"
              }}
            },
            MuiFormLabel:{
              styleOverrides: {root:{
                background: "#000",
                color: "#ffff",
                fontFamily: 'Saira'
              }}
            },
            MuiPaper:{
              styleOverrides:{root:{
                background: "#000",
                color: "#ffff"
              }}
            },
            MuiSvgIcon:{
              styleOverrides: {root:{
                color: "#ED3838 !important"
              }}
            },
            MuiInput:{styleOverrides:{
              root:{
                ":after":{
                  borderBottom:'2px solid #ED3838'
                }
              }
            }},
            MuiTablePagination:{styleOverrides:{
              root:{
                color: "#ffff"
              }
            }}
            //MUIDataTableSearch:{
             // styleOverrides: {searchText:{
               // background: '#ED3838'
              //}}
            //}
      },
      })


  return (
    <ThemeProvider
theme={props.dark ? darkTheme : lightTheme}
>
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
    />
    </ThemeProvider>
  );
};

export default memo(Productlist,()=>false);
