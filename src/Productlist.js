import React from "react";
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
import { Checkbox, FormControlLabel, Slider } from "@mui/material";
import CustomHintButton from "./CustomHintButton";
import { fetchData } from "./services/Data";

//import makeStyles from "@mui/styles";


const Productlist = props => {
/* 
    const useStyles = makeStyles({

       });
    const classes = useStyles(); */
    const [data, setData] = useState([]);
    const [sortByCost, setSortByCost] = useState(0);
    const [sortBySize, setSortBySize] = useState(0);
    const [sortByFeatures, setSortByFeatures] = useState(0);
    const [sortByWarranty, setSortByWarranty] = useState(0);
    const [sortByLeds, setSortByLeds] = useState(0);
    const [sortByWaveLengths, setSortByWaveLengths] = useState(0);
    const [sortByFlickernsound, setSortByFlickernsound] = useState(0);

    const [showFeatures, setShowFeatures] = useState(false);
    const [showSize, setShowSize] = useState(false);
    const [showFlickernsound, setShowFlickernsound] = useState(false);
    const [showWarranty, setShowWarranty] = useState(false);

    

    useEffect(()=>{
      fetchData().then(data=>{
        console.log(data)
        setData(data);
      });
    },[])


    const CustomSliderFilter = ({filterList, onChange, index, column, name, filterData}) => (
      <div>
        <FormGroup row>
        <FormGroup column="true">
        <FormLabel>{name}</FormLabel>

          <Slider
            label='range'
            value={(!filterList[index][0] && !filterList[index][1]) ? [0,3000] : [filterList[index][0], filterList[index][1]]}
            color='primary'
            max={Math.max(...filterData[index])}
            valueLabelDisplay="auto"
            disableSwap
            onChange={event => {
              console.log(Math.max(...filterData[index]));
              filterList[index][0] = event.target.value[0];
              filterList[index][1] = event.target.value[1];
              onChange(filterList[index], index, column);
            }}
            style={{ width: '120px' }}
          />
        </FormGroup>
        </FormGroup>
      </div>
    )

  const columns = [
    {
      label: "Name",
      name: "info",
      options: {
        filter: false,
        sort: false,
        viewColumns:false
      },
    },
    {
      label: "Price",
      name: "cost",
      options: {
        filter: false,
        viewColumns:false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(Object.values(obj1.data)[sortByCost], 10);
            let val2 = parseInt(Object.values(obj2.data)[sortByCost], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
         hint: (col) => {  
               return <CustomHintButton
               col={col}
               sortBy={sortByCost}
               setSortBy={setSortByCost}
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
      label: "Leds",
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
            console.log('customFilterListOnDelete: ', filterList, filterPos, index);

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
        viewColumns:false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Total Power",
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
            console.log('customFilterListOnDelete: ', filterList, filterPos, index);

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
        viewColumns:false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Average Power",
      name: "leds.avCombinedPower",
      options:{
        filter: false,
        viewColumns:false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "$ Per Watt",
      name: "cost.discountedPerOutput",
      options:{
        filter: false,
        viewColumns:false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Features",
      name: "features",
      options: {
        display: showFeatures,
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(obj1.data, 10);
            let val2 = parseInt(obj2.data, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    },
    {
      label: "Size",
      name: "size",
      options: {
        display: showSize,
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseFloat(Object.values(obj1.data)[sortBySize], 10);
            let val2 = parseFloat(Object.values(obj2.data)[sortBySize], 10);
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
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(Object.values(obj1.data)[sortByWarranty], 10);
            let val2 = parseInt(Object.values(obj2.data)[sortByWarranty], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
         hint: (col) => {  
          return <CustomHintButton
          col={col}
          sortBy={sortByWarranty}
          setSortBy={setSortByWarranty}
          >

          </CustomHintButton>;
       }  
      }
    },
    {
      label: "Flicker & Sound",
      name: "flickernsound",
      options: {
        display: showFlickernsound,
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(Object.values(obj1.data)[sortByFlickernsound], 10);
            let val2 = parseInt(Object.values(obj2.data)[sortByFlickernsound], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
        hint: (col) => {  
          return <CustomHintButton
          col={col}
          sortBy={sortByFlickernsound}
          setSortBy={setSortByFlickernsound}
          >

          </CustomHintButton>;
       }   
      }
    },    
    {
      label: "Wavelengths",
      name: "wavelengths",
      options: {
        display: false,
        viewColumns:false,
        filter: false
      }
    },
     {
        name:"cost.discountedPrice",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min discountedPrice: $${v[0]}`, `Max discountedPrice: $${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min discountedPrice: $${v[0]}, Max discountedPrice: $${v[1]}`;
               } else if (v[0]) {
                 return `Min discountedPrice: $${v[0]}`;
               } else if (v[1]) {
                 return `Max discountedPrice: $${v[1]}`;
               }
               return [];
             },
             update: (filterList, filterPos, index) => {
               console.log('customFilterListOnDelete: ', filterList, filterPos, index);
 
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
             logic(discountedPrice, filters) {
               if (filters[0] && filters[1]) {
                 return discountedPrice < filters[0] || discountedPrice > filters[1];
               } else if (filters[0]) {
                 return discountedPrice < filters[0];
               } else if (filters[1]) {
                 return discountedPrice > filters[1];
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
           console.log('customFilterListOnDelete: ', filterList, filterPos, index);

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
           console.log('customFilterListOnDelete: ', filterList, filterPos, index);

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
  name: "nnemf",
  label: "EMF Safe",
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
        const keys = Object.keys(nnemf)
        keys.forEach((key)=>{
          console.log(key)
          if(nnemf[key]!=='green')
          unsafe = true
        })
        console.log(unsafe);
        return unsafe;
      }
    },
  }
},
{
  name: "leds.ledDualChip",
  label: "Dual Chip LED",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `Dual Chip LED` },
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
        console.log(wavelengths);
        console.log(filterVal)
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
        console.log(wavelengths);
        for(let key in filterVal){
          return !(wavelengths[`nm${filterVal[key]}`] > 0)
        }
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
        console.log(wavelengths);
        for(let key in filterVal){
          return !(wavelengths[`nm${filterVal[key]}`] > 0)
        }
      }
    },
  }
}
  ];


  const MyCustomRowComponent = (props) => {
    const {info, cost, leds, ledcount, totalPowerOutput, avCombinedPower, discountedPerOutput, features, size, warranty, flickernsound, wavelengths, nnemf} = props;
    return (
      <TableRow>
        <TableCell>
         </TableCell>
        <TableCell align="center">{info.productName}             
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
                       border: '1px solid #2c6fbb',
                       borderRadius: "10px 10px",
                       boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                     }
                   }
                 }}
               title={
                <React.Fragment>
                <b>Company</b><br/><Paper align='center' elevation={2}>{info.company}</Paper><br/>
                <b>Class</b><br/><Paper align='center' elevation={2}>{info.class}</Paper><br/>
                <b>Discount Code</b><br/><Paper align='center' elevation={2}>{info.discountCode}</Paper><br/>
                <b>Product Link</b><br/><Paper align='center' elevation={2}><Link color="primary" href={`${info.productLink}`}><ShortcutIcon></ShortcutIcon></Link></Paper><br/>
                <b>Youtube Review</b><br/><Paper align='center' elevation={2}><Link href={`${info.youtubeReview}`}><YouTubeIcon sx={{color:'red'}}></YouTubeIcon></Link></Paper><br/>
                </React.Fragment>
                    }>
            <InfoIcon style={{ float: 'right' }} color="primary"></InfoIcon>
            </Tooltip>
            
            </TableCell>

        <TableCell align="center"> 
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
                    border: '1px solid #2c6fbb',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={<React.Fragment>
            <b>Discounted Price</b><br/><Paper align='center' elevation={2}>${cost.discountedPrice}</Paper><br/>
            <b>Shipping USA 🇺🇸</b><br/><Paper align='center' elevation={2}>${cost.shippingUsa}</Paper><br/>
            <b>Shipping Australia 🇦🇺</b><br/><Paper align='center' elevation={2}>${cost.shippingAus}</Paper><br/>
            <b>Shipping UK 🇬🇧</b><br/><Paper align='center' elevation={2}>${cost.shippingUk}</Paper><br/>
            <b>$ per LED</b><br/><Paper align='center' elevation={2}>${cost.discountedPerLed}</Paper><br/>
            </React.Fragment>
                        }>
        <b>{`$${cost.discountedPrice}` }</b>
        </Tooltip>
        </TableCell>
                
        <TableCell align="center">
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
                    border: '1px solid #2c6fbb',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={ <React.Fragment> 
            <b>Leds</b><br/><Paper align='center' elevation={2}>{leds.leds}</Paper><br/>
            <b>Dual Chip LED</b><br/><Paper align='center' elevation={2}>{leds.ledDualChip ? `Yes` : `Single`}</Paper><br/>
            <b>Led Chip Power</b><br/><Paper align='center' elevation={2}>{leds.ledChipPower}W</Paper><br/>
            </React.Fragment>
        }>
         <b>{leds.leds}</b>
        </Tooltip>
        </TableCell>

        <TableCell align="center">
          {leds.totalPowerOutput}
          </TableCell>   

          <TableCell align="center">
          {leds.avCombinedPower}
          </TableCell>   

          <TableCell align="center">
          <b>${cost.discountedPerOutput}</b>
          </TableCell>   

          {showFeatures && (
                  <TableCell align="center">
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
                              border: '1px solid purple',
                              borderRadius: "10px 10px",
                              boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                            }
                      }
                    }}
                  title={
                    <React.Fragment> 
                      <b>Pulsing</b><br/><Paper align='center' elevation={2}>{features.pulsing ? "Yes" : "No"}</Paper><br/>
                      <b>Modular Support</b><br/><Paper align='center' elevation={2}>{features.modularSupport ? " Yes" : "No"}</Paper><br/>
                      <b>Stands</b><br/><Paper align='center' elevation={2}>{features.stands ? "Yes" : "No"}</Paper><br/>
                      <b>Inbuit Timer</b><br/><Paper align='center' elevation={2}>{features.inbuiltTimer ? "Yes" : "No"}</Paper><br/>
                      </React.Fragment>
                  }>
                    
                      <span>
                      {features.pulsing ? "Pulsing," : ""}
                      {features.modularSupport ? " Modular Support," : ""}
                      {features.stands ? " Stands," : ""}
                      {features.inbuiltTimer ? " Inbuilt Timer" : ""}
                      </span> 
                     
                  </Tooltip>
                  </TableCell>
          )}
          {showSize && (
                    <TableCell align="center">
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
                                border: '1px solid purple',
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
                        <b>Cable Length</b><br/><Paper align='center' elevation={2}>{size.cableLength}'</Paper><br/>
                        </React.Fragment> 
                    }>
                        <span>{`${size.height}" X ${size.width}"` }</span>
                    </Tooltip>
                    </TableCell>
          )
          }
          {showWarranty && (
                <TableCell align="center">
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
                            border: '1px solid purple',
                            borderRadius: "10px 10px",
                            boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                          }
                    }
                  }}
                title={
                   <React.Fragment> 
                    <b>Warranty</b><br/><Paper align='center' elevation={2}>{warranty.warranty} years</Paper><br/>
                    <b>Return policy</b><br/><Paper align='center' elevation={2}>{warranty.returnPolicy} days</Paper><br/>
                    </React.Fragment>
                }>
                <span>{`${warranty.warranty} years`}</span>
                </Tooltip>
                </TableCell>
          )}
          {showFlickernsound && (
          <TableCell align="center">
            {flickernsound.flicker>0 ? `${flickernsound.flicker}% @ 100hz ` : `${flickernsound.flicker}% @ 0hz ` }
             Flicker - {flickernsound.soundLevels} Sound Level
             </TableCell>   

          )}
      </TableRow>
    );
  }


  const options = {
    filter: true,
    onFilterChange: (changedColumn, filterList) => {
      //console.log(changedColumn, filterList);
    },
    selectableRows: "single",
    viewColumns: true,
    onViewColumnsChange:(columnChanged, action) => {
      console.log(columnChanged);
      console.log(action);
      if(action === 'add'){
        switch(columnChanged){
          case 'features':  setShowFeatures(true);
          break;
          case 'size': setShowSize(true);
          break;
          case 'warranty': setShowWarranty(true);
          break;
          case 'flickernsound': setShowFlickernsound(true);
          break;
        }
      }

      if(action === 'remove'){
        switch(columnChanged){
          case 'features':  setShowFeatures(false);
          break;
          case 'size': setShowSize(false);
          break;
          case 'warranty': setShowWarranty(false);
          break;
          case 'flickernsound': setShowFlickernsound(false);
          break;
        }
      }
      

    },
    enableNestedDataAccess: ".",
    filterType: "dropdown",
    customSearch: (searchQuery, currentRow, columns) => {
        let isFound = false;

        currentRow.forEach(col => {

            if(typeof col ==='object'){
                Object.keys(col).forEach(key => {
                    if (col[key] !== undefined){
                      if(col[key].toString().indexOf(searchQuery) >= 0) {
                        isFound = true;
                      }
                    }
                })
            }

            if(col !== undefined){
            if (col.toString().indexOf(searchQuery) >= 0) {
                isFound = true;
              }
            }
          
      
        });
        return isFound;
      },
    responsive: "simple",
    customRowRender: data => {
        const [info, cost, leds, ledcount, totalPowerOutput, avCombinedPower, discountedPerOutput, features, size, warranty, flickernsound, wavelengths, nnemf] = data;
        console.log(data)

        return (
          <MyCustomRowComponent
          info={info}
          cost={cost}
          leds={leds}
          ledcount={ledcount}
          totalPowerOutput={totalPowerOutput}
          avCombinedPower={avCombinedPower}
          discountedPerOutput={discountedPerOutput}
          features={features}
          size={size}
          warranty={warranty}
          flickernsound={flickernsound}
          wavelengths={wavelengths}
          nnemf={nnemf}
          />
        );
      },
    rowsPerPage: 10,
    expandableRows: false,
  };


  return (
    <ThemeProvider
theme={createTheme({
components: {
    MuiTableCell: {
        styleOverrides:{ root: {
            //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);',
            padding: '10px',
            borderBottom:'0',
            borderCollapse: 'separate',
            borderRadius: '15px 15px 15px 15px',
            boxShadow: '0 1px 2px #2c6fbb'
        }}
      },
      MuiSvgIcon: {
        styleOverrides:{ root:{
            //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);'
                color: '#2c6fbb'
        }
        }
      },
      MUIDataTableFilter: {
        styleOverrides: { root: {
                height: '330px',
                overflowY: 'scroll'
        }
      }
      }
},
})}
>
    <MUIDataTable
      title={"Products"}
      data={data}
      columns={columns}
      options={options}
    />
    </ThemeProvider>
  );
};

export default Productlist;
