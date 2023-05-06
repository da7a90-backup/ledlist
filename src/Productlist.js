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
import Modal from "./Modal";

//import makeStyles from "@mui/styles";


const Productlist = props => {
/* 
    const useStyles = makeStyles({

       });
    const classes = useStyles(); */
    const [data, setData] = useState([]);
    const [sortByCost, setSortByCost] = useState('discountedPrice');
    const [sortBySize, setSortBySize] = useState('height');
    const [sortByWaveLengths, setSortByWaveLengths] = useState(0);

    const [showSize, setShowSize] = useState(false);
    const [showFlickernsound, setShowFlickernsound] = useState(false);
    const [showWarranty, setShowWarranty] = useState(false);
    const [showEmf, setShowEmf] = useState(false);
    const [showWavelengths, setShowWavelengths] = useState(false);
    const [shownWavelength, setShownWavelength] = useState({blue:[],red:[],nir:[]});

    

    useEffect(()=>{
      fetchData().then(data=>{
        setData(data);
      });
    },[])

    const mapColumnSwitch = (col) => {
      switch(col){
        case 'discountedPrice':
          return 'Price 💵'
        case 'shippingUsa':
          return 'Shipping U.S 🇺🇸'
        case 'shippingIntl':
          return 'International Shipping 🌎'
        case 'discountedPerLed':
          return '💲 per Led'
        case 'height':
          return 'Height 📏'
        case 'width':
          return 'Width 📐'
        case 'weight':
          return 'Weight ⚖️'
      }
    }

    const showSizeInBody = (size) => {
      if(sortBySize === 'height')
       {return `${size[sortBySize]}"`}
        else if (sortBySize === 'width')
        {return `${size[sortBySize]}"`} 
          else if(sortBySize === 'weight') 
          {return `${size[sortBySize]}lb`} 
    }

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
      label: mapColumnSwitch(sortByCost),
      name: "cost",
      options: {
        filter: false,
        viewColumns:false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data[sortByCost], 10);
            let val2 = parseInt(obj2.data[sortByCost], 10);
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
      label: `LEDs 🔆`,
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
        viewColumns:false,
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
        viewColumns:false,
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
      label: "Average Power 🔌",
      name: "leds.avCombinedPower",
      options:{
        filter: false,
        viewColumns:false,
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
      label: "💲 Per Watt",
      name: "cost.discountedPerOutput",
      options:{
        filter: false,
        viewColumns:false,
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
      label: "EMF",
      name: "nnemf",
      options: {
        display: showEmf,
        filter: false,
        sort: false
      }
    },
    {
      label: mapColumnSwitch(sortBySize),
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
  label: "Alex Tested",
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
        for(let key in filterVal){
          return !(wavelengths[`nm${filterVal[key]}`] > 0)
        }
      }
    },
  }
}
  ];


  const MyCustomRowComponent = (props) => {
    const { dataIndex, rowIndex, info, cost, yearReleased, leds, ledcount, totalPowerOutput, avCombinedPower, discountedPerOutput, nnemf, size, warranty, flickernsound, wavelengths} = props;
    const bgColor = rowIndex % 2 === 0 ? '#fff' : 'aliceblue'
    return (
      <TableRow style={{backgroundColor : bgColor, height: '130px'}}>
        <TableCell align="center">
          <Modal
          data = {data[dataIndex]}
          index={rowIndex+1}
          > 
          </Modal>
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
                <b>Company Location</b><br/><Paper align='center' elevation={2}>{info.companyHq}</Paper>
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
            <b>Shipping Intl 🌎</b><br/><Paper align='center' elevation={2}>${cost.shippingIntl === 0 ? `${cost.shippingIntl}` : `${cost.shippingIntl}+` }</Paper><br/>
            <b>$ per LED</b><br/><Paper align='center' elevation={2}>${cost.discountedPerLed}</Paper><br/>
            </React.Fragment>
                        }>
        <b>{sortByCost === 'shippingIntl' ? `$${cost[sortByCost]}➕` : `$${cost[sortByCost]}` }</b>
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
          {showEmf && (
            <TableCell align="center">
              <span>{nnemf.emfe} </span> <br/>
              <span>{nnemf.mag} </span>
            </TableCell>
          )

          }
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
                        </React.Fragment> 
                    }>
                        <span>{showSizeInBody(size)}</span>
                    </Tooltip>
                    </TableCell>
          )
          }
          {showWarranty && (
                <TableCell align="center">
                <span>{`${warranty.warranty} years`}</span>
                </TableCell>
          )}
          {showFlickernsound && (
          <TableCell align="center">
            {flickernsound.soundLevels}
             </TableCell>   

          )}
          {showWavelengths && (
            <TableCell align="center">
              <div>
                {shownWavelength.blue.length > 0 && shownWavelength.blue.map(
                (wavelength)=>
                <div>
                  <span style={{color: '#2c6fbb'}}>
                    {wavelength} : {wavelengths[`nm${wavelength}`]}
                    </span>
                    <br/>
                    </div>)}
                {shownWavelength.red.length > 0 && shownWavelength.red.map(
                (wavelength)=>
                <div>
                  <span style={{color: 'red'}}>
                    {wavelength} : {wavelengths[`nm${wavelength}`]}
                    </span>
                    <br/>
                    </div>)}
                {shownWavelength.nir.length > 0 && shownWavelength.nir.map(
                (wavelength)=>
                <div>
                  <span style={{color: '#F47174'}}>
                    {wavelength} : {wavelengths[`nm${wavelength}`]}
                    </span>
                    <br/>
                    </div>)}
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
        const blue = filterList[27]
        const red = filterList[28]
        const nir = filterList[29]

        if(blue.length === 0 && red.length === 0 && nir.length === 0){
          setShowWavelengths(false)
        }
        else{
          setShowWavelengths(true)

          const waveobject = {blue,red,nir}

          setShownWavelength(waveobject);
  
          console.log(waveobject)
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
                      if(col[key] !== null && col[key]?.toString().indexOf(searchQuery) >= 0) {
                        isFound = true;
                      }
                })
            }

            if(col !== undefined && col !== null){
            if (col.toString().indexOf(searchQuery) >= 0) {
                isFound = true;
              }
            }
          
      
        });
        return isFound;
      },
    responsive: "scroll",
    customRowRender: (data, dataIndex, rowIndex) => {
        const [info, cost, leds, ledcount, totalPowerOutput, avCombinedPower, discountedPerOutput, features, size, warranty, flickernsound, wavelengths] = data;
        const yearReleased = data[18]
        const nnemf = data[7]

        return (
          <MyCustomRowComponent
          dataIndex={dataIndex}
          rowIndex={rowIndex}
          info={info}
          yearReleased={yearReleased}
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
    rowsPerPage: 50,
    expandableRows: false,
    resizableColumns: false,
    fixedHeader: true
  };


  return (
    <ThemeProvider
theme={createTheme({
components: {
    MuiTable:{
      styleOverrides:{ root:{
        borderCollapse:'separate',
        borderSpacing: '5px'
      }}
    },
    MuiTableBody:{
      styleOverrides:{
        root:{
          paddingTop:'90px'
        }
      }
    },
    MuiTableCell: {
        styleOverrides:{ body: {
            //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);',
            padding: '0',
            borderBottom:'1px solid #2c6fbb',
            borderCollapse: 'separate',
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
        styleOverrides:{ head: {
          outline: '#2c6fbb auto',
          borderCollapse: 'separate',
          borderRadius: '15px 15px 15px 15px',
          borderBottom: '0'
        }}
    },
    MUIDataTableViewCol: {
      styleOverrides:{ root:{
          right: '20vw'
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
