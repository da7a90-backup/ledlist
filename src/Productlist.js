import React, { memo } from "react";
import {useState, useMemo, useEffect} from "react"
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
import CustomHintButton from "./CustomHintButton";
import { PriorityHigh } from "@mui/icons-material";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { CircularProgress, Slider, Fab, Modal, Box, TextField, Button, Snackbar, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { save_email } from "./services/Data";


//import makeStyles from "@mui/styles";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Productlist = props => {
/* 
    const useStyles = makeStyles({

       });
    const classes = useStyles(); */
    let [searchParams, setSearchParams] = useSearchParams();

    console.log('searchparams', searchParams.get('year'))
    const navigate = useNavigate();
    

    const query = useQuery();

    const available = query.get('available');

    const ledsFilter = query.get('leds')
    const powerFilter = query.get('power')
    const priceFilter = query.get('price')
    const heightFilter = query.get('height')
    const widthFilter = query.get('width')
    const warrantyFilter = query.get('warranty')
    const companyFilter = query.get('company')
    const locationFilter = query.get('location')
    const warehouseFilter = query.get('warehouse')
    const classFilter = query.get('panelclass')
    const yearFilter = query.get('year');
    const flickerFilter = query.get('flickerfree')
    const alexdataFilter = query.get('alexdata')
    const ulowemfFilter = query.get('ulowemf')
    const multichipledFilter = query.get('multichipled')
    const pulsingFilter =  query.get('pulsing')
    const modularsupportFilter = query.get('modularsupport')
    const builtintimerFilter = query.get('builtintimer')
    const standsFilter = query.get('stands')
    const notdiscontinuedFilter = query.get('notdiscontinued')
    const blueFilter = query.get('blue')
    const redFilter = query.get('red')
    const nirFilter = query.get('nir')


    const [sortByShipping, setSortByShipping] = useState('shippingUsa');
    const [sortByValue, setSortByValue] = useState('discountedPerOutput');
    const [sortBySize, setSortBySize] = useState('height');
    //const [sortByWaveLengths, setSortByWaveLengths] = useState(0);

    const [showCompany, setShowCompany] = useState(true);
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
    const [oddRowBgColor, setOddBg] = useState('#fdefef');
    const [selectedRowColor, setSelectedRowColor] = useState('#fa9898')
    const [selectedRow, setSelectedRow] = useState(-1);

    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [showFab, setShowFab] = useState(false);
    const [fabDismissed, setFabDismissed] = useState(false); // Track if the user dismissed the Fab

    const [emailLoading, setEmailLoading] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);


    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100 && !fabDismissed) { // Show only if not dismissed
          setShowFab(true);
        } else {
          setShowFab(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [fabDismissed]); // Re-run effect when fabDismissed changes

    const handleEmailChange = (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      setIsEmailValid(validateEmail(newEmail)); // Set validity based on regex check
    };

    const handleFabClick = () => setOpenModal(true);
    
    const handleCloseModal = () => setOpenModal(false);
  
    const handleCloseSnackbar = () => setSnackbarOpen(false);
  
    const handleFabClose = (e) => {
      e.stopPropagation(); // Prevent the Fab click event from firing
      setFabDismissed(true); // User dismissed the Fab, so we stop showing it
      setShowFab(false); // Hide the Fab
    };
  
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    const handleEmailSubmit = async () => {

      setEmailLoading(true)
      const {body, status} = await save_email(email)
      console.log("email capture")
      console.log(body,status)
      setEmailLoading(false)
      setOpenModal(false)
      setFabDismissed(true); // User dismissed the Fab, so we stop showing it
      setShowFab(false); // Hide the Fab
      setSnackbarOpen(true)
    };

    useEffect(()=>{
      const switchToDark = ()=>{
        setEvenBg('#000') 
        setOddBg('#ED583E')
        setSelectedRowColor('#ea0000')
      }
     const switchToLight = ()=>{
      setEvenBg('#fff') 
      setOddBg('#fdefef')
      setSelectedRowColor('#fa9898')
     }
  
      props.dark ?  switchToDark() : switchToLight()
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
      label: "Company",
      name: "info.company",
      options: {
        filter: false,
        viewColumns:true,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            if(order == "asc"){
            if (obj1.data < obj2.data) {
              return -1;
            }
            if (obj1.data > obj2.data) {
              return 1;
            }
          }
          if(order == "desc"){
            if (obj1.data > obj2.data) {
              return -1;
            }
            if (obj1.data < obj2.data) {
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
            let val1 = parseFloat(obj1.data);
            let val2 = parseFloat(obj2.data);
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
    ledsFilter ? {
      label: `LEDs 💡`,
      name: "leds.leds",
      options: {
        filter:true,
        filterList: [...ledsFilter.split(':').map((leds)=>parseInt(leds))],
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
    } 
    : {
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
    powerFilter ?
    {
      label: "Total Power ⚡",
      name: "leds.totalPowerOutput",
      options: {
        filter:true,
        filterType: 'custom',
        filterList: [...powerFilter.split(":").map((power)=>parseFloat(power))],

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
            let val1 = parseFloat(obj1.data);
            let val2 = parseFloat(obj2.data);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        }
      }
    } :
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
            let val1 = parseFloat(obj1.data);
            let val2 = parseFloat(obj2.data);
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
            let val1 = parseFloat(obj1.data);
            let val2 = parseFloat(obj2.data);
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
            let val1 = parseFloat(obj1.data[sortByValue], 10);
            let val2 = parseFloat(obj2.data[sortByValue], 10);
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
    priceFilter ? {
      name:"cost",
      options:{
         filter:true,
         filterList: [...priceFilter.split(':').map((price)=>parseInt(price))],
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
   } : {
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
    heightFilter ? 
    {
      name:"size.height",
      options:{
         filter:true,
         filterList: [...heightFilter.split(':').map((height)=>parseFloat(height))],
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
   }
    : {
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
 widthFilter ? {
  name:"size.width",
  options:{
     filter:true,
     filterList: [...widthFilter.split(':').map((width)=>parseFloat(width))],
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
} : {
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
 warrantyFilter ? {
  name:"warranty.warranty",
  options:{
     filter:true,
     filterList: [warrantyFilter.split(':').map((warranty)=>parseInt(warranty))],
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
} : {
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
 companyFilter ? {
  name:"info.company",
  label:'Company',
  options:{
     filter:true,
     filterList: [...companyFilter.split(',')],
     filterType: 'multiselect',
     sort:false,
     display:false,
     viewColumns:false
  }
} : {
  name:"info.company",
  label:'Company',
  options:{
     filter:true,
     filterType: 'multiselect',
     sort:false,
     display:false,
     viewColumns:false
  }
} ,
locationFilter ? {
  name: "info.companyHq",
  label: "Company Location",
  options:{
    filter:true,
    filterType: 'multiselect',
    filterList:[...locationFilter.split(',')],
    sort:false,
    display:false,
    viewColumns:false
  }

} : {
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
warehouseFilter ? 
{
  name: "info.warehouse",
  label: "Company Warehouse",
  options:{
    filter:true,
    filterType: 'multiselect',
    filterList: [...warehouseFilter.split(',')],
    filterOptions: {
      logic(warehouse, filters) {
        for(let filter of filters){
          if(warehouse.includes(filter)){
            return false
          }
        }
        return true;
      },

    },
    sort:false,
    display:false,
    viewColumns:false
  }

} : 
{
  name: "info.warehouse",
  label: "Company Warehouse",
  options:{
    filter:true,
    filterType: 'multiselect',
    filterOptions: {
      logic(warehouse, filters) {
        for(let filter of filters){
          if(warehouse.includes(filter)){
            return false
          }
        }
        return true;
      },

    },
    sort:false,
    display:false,
    viewColumns:false
  }

},
classFilter ? {
  name:"info.class",
  label:"Class",
  options:{
     filter:true,
     filterList: [...classFilter.split(',')],
     filterType: 'multiselect',
     sort:false,
     display:false,
     viewColumns:false
  }
} : 
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
yearFilter ? {
  name:"yearReleased",
  label:"Year Released",
  options:{
     filter:true,
     filterList: [...yearFilter.split(',').map(year => parseInt(year))],
     filterType: 'multiselect',
     sort:false,
     display:false,
     viewColumns:false
  }
}
: {
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
flickerFilter ? 
{
  name: "flickernsound.flicker",
  label: "Flicker Free",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
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
}
: {
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
alexdataFilter ? 
{
  name: "info.alexTested",
  label: "Alex Data Only",
  options: {
    sort: false,
    display: false,
    viewColumns: false,
    filter: true,
    filterList: [true],
    customFilterListOptions: {render: v => `Alex Tested`},
    filterType: "checkbox",
    filterOptions: {
      names: [true],
      logic(alexTested, filterVal, row) {
        // Only apply filtering when the checkbox is checked (filterVal.length > 0)
        if (filterVal.length > 0) {
          return alexTested !== 1;  // Filter out rows where alexTested is not 1
        }
        return false;  // Don't filter anything when checkbox is unchecked
      }
    }
  }

}
: {
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
        // Only apply filtering when the checkbox is checked (filterVal.length > 0)
        if (filterVal.length > 0) {
          return alexTested !== 1;  // Filter out rows where alexTested is not 1
        }
        return false;  // Don't filter anything when checkbox is unchecked
      }
    }
  }

},
ulowemfFilter ? 
{
  name: "nnemf",
  label: "Ultra Low EMF",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
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
}
: {
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
multichipledFilter ? {
  name: "leds.ledDualChip",
  label: "Multi Chip LED",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
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
}
: {
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
pulsingFilter ? {
  name: "features.pulsing",
  label: "Pulsing",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
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
}
: {
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
modularsupportFilter ?
{
  name: "features.modularSupport",
  label: "Modular Support",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
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
}
: {
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
builtintimerFilter ? 
{
  name: "features.inbuiltTimer",
  label: "Built in timer",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
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
}
: {
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
standsFilter ?
{
  name: "features.stands",
  label: "Stands included",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
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
}
: {
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
notdiscontinuedFilter ? {
  name: "info.discontinued",
  label: "Still Available",
  options:{
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [true],
    customFilterListOptions: { render: v => `available` },
    filterType: "checkbox",

    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(discontinued, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return (discontinued === 0);
      }
    },
  }
} : {
  name: "info.discontinued",
  label: "Still Available",
  options:{
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    customFilterListOptions: { render: v => `available` },
    filterType: "checkbox",

    filterOptions: {
      names: [true], // only 1 checkbox with value === true
      logic(discontinued, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
        return (discontinued === 0);
      }
    },
  }
},
blueFilter ? {
  name: "wavelengths",
  label: "Blue",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [...blueFilter.split(',')],
    customFilterListOptions: { render: v => `${v}` },
    filterType: "checkbox+",
    filterOptions: {
      names:['480','415'],
      logic(wavelengths, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
          return !(wavelengths[`nm${filterVal}`] > 0)
        
      }
    },
  }
}
: {
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
      names:['480','415'],
      logic(wavelengths, filterVal, row) {
        // Note: filterVal is an array of the values selected in the filter
          return !(wavelengths[`nm${filterVal}`] > 0)
        
      }
    },
  }
},
redFilter ? {
  name: "wavelengths",
  label: "Red",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [...redFilter.split(',')],
    customFilterListOptions: { render: v => `${v}` },
    filterType: "checkbox+",
    filterOptions: {
      names:['590','610','630','660'],
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
: {
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
      names:['590','610','630','660'],
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
nirFilter ? {
  name: "wavelengths",
  label: "NIR",
  options: {
    sort:false,
    display:false,
    viewColumns:false,
    filter: true,
    filterList: [...nirFilter.split(',')],
    customFilterListOptions: { render: v => `${v}` },
    filterType: "checkbox+",
    filterOptions: {
      names:['810', '830', '850', '930', '950', '1060'],
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
: {
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
      names:['810', '830', '850', '930', '950', '1060'],
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
    const { dataIndex, rowIndex, info, company, cost, shipping, yearReleased, leds, totalPowerOutput, avCombinedPower, value, nnemf, size, warranty, flickernsound, wavelengths, dataObject} = props;
    const bgColor = rowIndex % 2 === 0 ? evenRowBgColor : oddRowBgColor
    const rowColor = rowIndex === selectedRow ? selectedRowColor : bgColor

    const clickRow = ()=>{
      setSelectedRow(rowIndex)
    }
    return (
      <TableRow onClick={clickRow} style={{backgroundColor : rowColor, padding: 0, color: '#fff'}}>
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
              console.log('before naviagte: ',dataObject)
          navigate('/details', {state: {object: dataObject, allData: props.data}})
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
            {showCompany && (
            <TableCell style={{color: !props.dark ? '#000' : '#ffff'}} align="center"> 
            <b>{company}</b>
            </TableCell>
          )}
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
        <b>Shipping Intl 🌎</b><br/><Paper align='center' elevation={2}>
          {shipping.shippingIntl === -1 ? 'N/A' : 
           shipping.shippingIntl === 0 ? `$${shipping.shippingIntl}` : 
           `$${shipping.shippingIntl}+`}
        </Paper><br/>
      </React.Fragment>}>
      <b>
        {sortByShipping === 'shippingIntl' ? 
          (shipping[sortByShipping] === -1 ? 
            'N/A 🌎' : 
            `$${shipping[sortByShipping]}${shipping[sortByShipping] > 0 ? '➕' : ''} 🌎`) : 
          `$${shipping[sortByShipping]} 🇺🇸`}
      </b>
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
                        {wavelengths.nm415 > 0 && (<b style={{color:'blue'}}>415x{wavelengths.nm415} {wavelengths.nm415real && (
                          <Tooltip title={`480 real reading: ${wavelengths.nm415real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b>)}
                        {wavelengths.nm590 > 0 && (<b style={{color:'red'}}>590x{wavelengths.nm590} {wavelengths.nm590real && (
                          <Tooltip title={`590 real reading: ${wavelengths.nm590real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )}  </b>)}
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
                        {wavelengths.nm1060 > 0 && (<b style={{color:'gray'}}>1060x{wavelengths.nm1060} {wavelengths.nm1060real && (
                          <Tooltip title={`1060 real reading: ${wavelengths.nm1060real}`}><PriorityHigh style={{ float: 'right' }} color="primary"></PriorityHigh></Tooltip>
                        )} </b> )}                        
              </div>
            </TableCell>
          )}
      </TableRow>
    );
  }


  const options = {
    filter: true,
    textLabels: {
      body: {
          noMatch: !props.ready ?
              <CircularProgress sx={{color:'#ED3838'}}/> :
              'Sorry, there is no matching data to display',
      },
  },
    onFilterChange: (changedColumn, filterList) => {
      console.log(filterList)
      let queryparams = {}

      let entries = {}

      searchParams.forEach((v,k,p)=>{
        entries[k] = v
      })

      if(filterList[6].length > 0){
        queryparams = {...entries, ...queryparams, leds: filterList[6].join(':')}
      } else {
        let {leds, ...rest} = queryparams
        queryparams = rest
      }

      if(filterList[7].length > 0){
        queryparams = {...entries, ...queryparams, power: filterList[7].join(':')}
      } else {
        let {power, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[15].length > 0){
        queryparams = {...entries, ...queryparams, price: filterList[15].join(':')}
      } else {
        let {price, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[16].length > 0){
        queryparams = {...entries, ...queryparams, height: filterList[16].join(':')}
      } else {
        let {height, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[17].length > 0){
        queryparams = {...entries, ...queryparams, width: filterList[17].join(':')}
      } else {
        let {width, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[18].length > 0){
        queryparams = {...entries, ...queryparams, warranty: filterList[18].join(':')}
      } else {
        let {warranty, ...rest} = queryparams
        queryparams = rest
      }

      if(filterList[19].length > 0){
        queryparams = {...entries, ...queryparams, company: filterList[19].join(',')}
      } else {
        let {company, ...rest} = queryparams
        queryparams = rest
      }

      if(filterList[20].length > 0){
        queryparams = {...entries, ...queryparams, location: filterList[20].join(',')}
      } else {
        let {location, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[21].length > 0){
        queryparams = {...entries, ...queryparams, warehouse: filterList[21].join(',')}
      } else {
        let {warehouse, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[22].length > 0){
        queryparams = {...entries, ...queryparams, panelclass: filterList[22].join(',')}
      } else {
        let {panelclass, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[23].length > 0){
        queryparams = {...entries, ...queryparams, year: filterList[23].join(',')}
      } else {
        let {year, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[24].length > 0){
        queryparams = {...entries, ...queryparams, flickerfree: true}
      } else {
        let {flickerfree, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[25].length > 0){
        queryparams = {...entries, ...queryparams, alexdata: true}
      } else {
        let {alexdata, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[26].length > 0){
        queryparams = {...entries, ...queryparams, ulowemf: true}
      } else {
        let {ulowemf, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[27].length > 0){
        queryparams = {...entries, ...queryparams, multichipled: true}
      } else {
        let {multichipled, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[28].length > 0){
        queryparams = {...entries, ...queryparams, pulsing: true}
      } else {
        let {pulsing, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[29].length > 0){
        queryparams = {...entries, ...queryparams, modularsupport: true}
      } else {
        let {modularsupport, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[30].length > 0){
        queryparams = {...entries, ...queryparams, builtintimer: true}
      } else {
        let {builtintimer, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[31].length > 0){
        queryparams = {...entries, ...queryparams, stands: true}
      } else {
        let {stands, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[32].length > 0){
        queryparams = {...entries, ...queryparams, notdiscontinued: true}
      } else {
        let {notdiscontinued, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[33].length > 0){
        queryparams = {...entries, ...queryparams, blue: filterList[33].join(',')}
      } else {
        let {blue, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[34].length > 0){
        queryparams = {...entries, ...queryparams, red: filterList[34].join(',')}
      } else {
        let {red, ...rest} = queryparams
        queryparams = rest
      }
      if(filterList[35].length > 0){
        queryparams = {...entries, ...queryparams, nir: filterList[35].join(',')}
      } else {
        let {nir, ...rest} = queryparams
        queryparams = rest
      }


      console.log(queryparams)

      setSearchParams(queryparams)

      if(changedColumn === 'wavelengths'){
        const blue = filterList[33]
        const red = filterList[34]
        const nir = filterList[35]

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
          case 'info.company': setShowCompany(true);
          break;
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
          case 'info.company': setShowCompany(false);
          break;
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
        const [_id, info, company, cost, shipping, leds, ledcount, totalPowerOutput, avCombinedPower, value, nnemf, size, warranty, flickernsound, wavelengths] = data;
        console.log('dddd : ', data)
        const yearReleased = data[23]
        const ledDualChip = data[26]
        const pulsing = data[27]
        const modularSupport = data[28]
        const inbuiltTimer = data[29]
        const stands = data [30]
        const features = {ledDualChip,pulsing,modularSupport,inbuiltTimer, stands}
        const dataObject = {_id, info, cost, shipping, leds, features, flickernsound, nnemf, warranty, value, wavelengths, yearReleased, cost, size}
        console.log('befff ', dataObject)
        return (
          <MyCustomRowComponent
          dataIndex={dataIndex}
          rowIndex={rowIndex}
          info={info}
          company={company}
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
          data={props.data}
          />
        );
      },
    rowsPerPage:100,
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
              borderSpacing: '5px',
              background: "#000",
              color: "#ffff",
              fontFamily: 'Saira'
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
                color: "#ffff",
                fontFamily: 'Saira'
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
                color: "#ffff",
                fontFamily: 'Saira'
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
                      color: "#ffff",
                      fontFamily: 'Saira'
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
                      color: "#ffff",
                      fontFamily: 'Saira'
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
                      color: "#ffff",
                      fontFamily: "Saira"
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
            }},
            MUIDataTableSearch:{
              styleOverrides: {searchText:{
                background: '#ED583E',
                color: "#ffff"
              }}
            }
      },
      })

/*       const BodyComponent = useMemo(
        () => (props) => (
          <LoadingTableBody loading={ready} {...props} />
        ),
        [ready]
      ); */
  return (
    <ThemeProvider
theme={props.dark ? darkTheme : lightTheme}
>
    <MUIDataTable
      data={props.data}
      columns={columns}
      options={options}
      //components={{ TableBody: BodyComponent }}
    />
    
{showFab && !fabDismissed && (
  <Fab
    onClick={handleFabClick}
    style={{
      position: "fixed",
      bottom: 66,
      right: 46,
      backgroundColor: props.dark ? "#333" : "#fff", // Dark grey or white based on theme
      color: props.dark ? "#fff" : "#000", // White text for dark theme, black for light theme
      fontWeight: "bold",
      transition: "all 0.3s ease-in-out",
      width: 260,
      height: 180,
      border: 'none', // Remove border
      outline: 'none', // Remove outline
      animation: "slide-in 0.5s ease-in-out", // Slide-in animation
      backdropFilter: props.dark ? "none" : "blur(10px)", // Blur effect only on light theme
      display: 'flex', // Flexbox for centering
      flexDirection: 'column', // Vertical layout
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
      textAlign: 'center', // Center text
      zIndex: 9, // Ensure bubble is behind the close button
      fontFamily: 'Saira',
      fontSize: '11px'
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
  >
    Would you like to be updated on the latest Red Light Therapy Panels?
  </Fab>
)}

{showFab && !fabDismissed && (
  <IconButton
    onClick={handleFabClose}
    style={{
      position: "fixed",
      top: 'auto', // Aligned relative to the bubble
      right: 30, // Aligned relative to the bubble
      bottom: 200, // Adjusted based on Fab's bottom position
      backgroundColor: props.dark ? "#333" : "#fff", // Same background to blend in
      color: props.dark ? "#fff" : "#000", // Match text color to theme
      borderRadius: '50%', // Circle button
      boxShadow: '0px 0px 5px rgba(0,0,0,0.3)', // Slight shadow for visibility
      zIndex: 10, // Higher z-index to ensure it stays on top
    }}
  >
    <CloseIcon />
  </IconButton>
)}


<Modal
  open={openModal}
  onClose={handleCloseModal}
  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
>
<Box
  sx={{
    width: { xs: '90%', sm: 400 }, // Responsive width: 90% on extra-small screens, 400px on small and larger screens
    height: {xs: 200, sm: 250},
    maxWidth: 400, // Maximum width
    bgcolor: props.dark ? "#333" : "#fff", // Dark grey or white based on theme
    color: props.dark ? "#fff" : "#000", // White text for dark theme, black for light theme
    borderRadius: 2,
    p: 2,
    boxShadow: 24,
    fontFamily: 'Saira'
  }}
>
  <h3>Subscribe for Updates</h3>

  {emailLoading ? (
    <CircularProgress sx={{ color: '#ED3838' }} />
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stack elements vertically
        gap: 2, // Add some spacing between elements
      }}
    >
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        error={email.length > 0 && !isEmailValid} // Show error state if email is invalid
        helperText={
          email.length > 0 && !isEmailValid ? "Invalid email format" : ""
        }
      />
      <Button
        style={{marginTop: '65px'}}
        variant="contained"
        color="error"
        onClick={handleEmailSubmit}
        disabled={!isEmailValid} // Disable button if email is not valid
      >
        Submit
      </Button>
    </Box>
  )}
</Box>

</Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        message="Thank you for subscribing!"
      />
        <style>
        {`
          @keyframes slide-in {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </ThemeProvider>
  );
};

export default memo(Productlist,()=>false);
