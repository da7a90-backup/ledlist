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
import Modal from "./Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Slider } from "@mui/material";
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


    const [shownInfo, setShownInfo] = useState(false);
    const [shownCost, setShownCost] = useState(false);
    const [shownSize, setShownSize] = useState(false);
    const [shownFeatures, setShownFeatures] = useState(false);
    const [shownWarranty, setShownWarranty] = useState(false);
    const [shownLeds, setShownLeds] = useState(false);
    const [shownWaveLengths, setShownWaveLengths] = useState(false);
    

    useEffect(()=>{
      fetchData().then(data=>{
        console.log(data)
        setData(data);
      });
    },[])


    const CustomSliderFilter = ({filterList, onChange, index, column, name}) => (
      <div>
        <FormGroup row>
        <FormGroup column>
        <FormLabel>{name}</FormLabel>

          <Slider
            label='min'
            value={filterList[index][0] || ''}
            color='secondary'
            max={3000}
            onChange={event => {
              filterList[index][0] = event.target.value;
              onChange(filterList[index], index, column);
            }}
            style={{ width: '120px' }}
          />
          <Slider
            label='max'
            max={3000}
            value={filterList[index][1] || ''}
            color='secondary'
            onChange={event => {
              filterList[index][1] = event.target.value;
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
      label: "Product Info",
      name: "info",
      options: {
        filter: false,
        sort: false
      },
    },
    {
      label: "Year",
      name: "yearReleased",
      options: {
        filter: false,
        sort:true,
      }
    },
    {
      label: "Cost",
      name: "cost",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(Object.values(obj1.data)[sortByCost], 10);
            let val2 = parseInt(Object.values(obj2.data)[sortByCost], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
         hint: (col) => {  
               return <CustomHintButton shown={shownCost} 
               setShown={setShownCost} 
               col={col}
               sortBy={sortByCost}
               setSortBy={setSortByCost}
               >

               </CustomHintButton>;
            } 
          }
    },
    {
      label: "Size",
      name: "size",
      options: {
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
          return <CustomHintButton shown={shownSize} 
          setShown={setShownSize} 
          col={col}
          sortBy={sortBySize}
          setSortBy={setSortBySize}
          >

          </CustomHintButton>;
       }  
      }
    },
    {
      label: "Features",
      name: "features",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(Object.values(obj1.data)[sortByLeds], 10);
            let val2 = parseInt(Object.values(obj2.data)[sortByLeds], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
        hint: (col) => {  
          return <CustomHintButton shown={shownFeatures} 
          setShown={setShownFeatures} 
          col={col}
          sortBy={sortByFeatures}
          setSortBy={setSortByFeatures}
          >

          </CustomHintButton>;
       }  
      }
    },
    {
      label: "Warranty",
      name: "warranty",
      options: {
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
          return <CustomHintButton shown={shownWarranty} 
          setShown={setShownWarranty} 
          col={col}
          sortBy={sortByWarranty}
          setSortBy={setSortByWarranty}
          >

          </CustomHintButton>;
       }  
      }
    },
    {
      label: "Leds",
      name: "leds",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(Object.values(obj1.data)[sortByLeds], 10);
            let val2 = parseInt(Object.values(obj2.data)[sortByLeds], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
        hint: (col) => {  
          return <CustomHintButton shown={shownLeds} 
          setShown={setShownLeds} 
          col={col}
          sortBy={sortByLeds}
          setSortBy={setSortByLeds}
          >

          </CustomHintButton>;
       }  
      }
    },
    {
      label: "Wavelengths",
      name: "wavelengths",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(sortByLeds);
            console.log(obj1.data);
            console.log(Object.values(obj1.data)[sortByWaveLengths]);
            let val1 = parseInt(Object.values(obj1.data)[sortByWaveLengths], 10);
            let val2 = parseInt(Object.values(obj2.data)[sortByWaveLengths], 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        },
        hint: (col) => {  
          return <CustomHintButton shown={shownWaveLengths} 
          setShown={setShownWaveLengths} 
          col={col}
          sortBy={sortByWaveLengths}
          setSortBy={setSortByWaveLengths}
          >

          </CustomHintButton>;
       }  
      }
    },
    {
      label: "nnEMF",
      name: "nnemf",
      options: {
        filter: false,
        sort:false,
        display:false,
        viewColumns:false
      }
    },
    {
      label: "Flicker & Sound",
      name: "flickernsound",
      options: {
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
          return <CustomHintButton shown={true} 
          setShown={()=>{}} 
          col={col}
          sortBy={sortByFlickernsound}
          setSortBy={setSortByFlickernsound}
          >

          </CustomHintButton>;
       }   
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
      name:"leds.ledDualChip",
      label:'LED Dual Chip',
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
                 return [`Min discountedPrice: ${v[0]}`, `Max discountedPrice: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min discountedPrice: ${v[0]}, Max discountedPrice: ${v[1]}`;
               } else if (v[0]) {
                 return `Min discountedPrice: ${v[0]}`;
               } else if (v[1]) {
                 return `Max discountedPrice: ${v[1]}`;
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
             names: [],
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
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Discounted Price'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"cost.shippingUsa",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min shippingUsa: ${v[0]}`, `Max shippingUsa: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min shippingUsa: ${v[0]}, Max shippingUsa: ${v[1]}`;
               } else if (v[0]) {
                 return `Min shippingUsa: ${v[0]}`;
               } else if (v[1]) {
                 return `Max shippingUsa: ${v[1]}`;
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
             names: [],
             logic(shippingUsa, filters) {
               if (filters[0] && filters[1]) {
                 return shippingUsa < filters[0] || shippingUsa > filters[1];
               } else if (filters[0]) {
                 return shippingUsa < filters[0];
               } else if (filters[1]) {
                 return shippingUsa > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Shipping US'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"cost.shippingAus",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min shippingAus: ${v[0]}`, `Max shippingAus: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min shippingAus: ${v[0]}, Max shippingAus: ${v[1]}`;
               } else if (v[0]) {
                 return `Min shippingAus: ${v[0]}`;
               } else if (v[1]) {
                 return `Max shippingAus: ${v[1]}`;
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
             names: [],
             logic(shippingAus, filters) {
               if (filters[0] && filters[1]) {
                 return shippingAus < filters[0] || shippingAus > filters[1];
               } else if (filters[0]) {
                 return shippingAus < filters[0];
               } else if (filters[1]) {
                 return shippingAus > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Shipping Australia'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"cost.shippingUk",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min shippingUK: ${v[0]}`, `Max shippingUK: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min shippingUK: ${v[0]}, Max shippingUK: ${v[1]}`;
               } else if (v[0]) {
                 return `Min shippingUK: ${v[0]}`;
               } else if (v[1]) {
                 return `Max shippingUK: ${v[1]}`;
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
             names: [],
             logic(shippingUK, filters) {
               if (filters[0] && filters[1]) {
                 return shippingUK < filters[0] || shippingUK > filters[1];
               } else if (filters[0]) {
                 return shippingUK < filters[0];
               } else if (filters[1]) {
                 return shippingUK > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Shipping UK'} >
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
                 return [`Min height: ${v[0]}`, `Max height: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min height: ${v[0]}, Max height: ${v[1]}`;
               } else if (v[0]) {
                 return `Min height: ${v[0]}`;
               } else if (v[1]) {
                 return `Max height: ${v[1]}`;
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
             names: [],
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
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Height'} >
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
                 return [`Min width: ${v[0]}`, `Max width: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min width: ${v[0]}, Max width: ${v[1]}`;
               } else if (v[0]) {
                 return `Min width: ${v[0]}`;
               } else if (v[1]) {
                 return `Max width: ${v[1]}`;
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
             names: [],
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
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Width'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"size.weight",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min weight: ${v[0]}`, `Max weight: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min weight: ${v[0]}, Max weight: ${v[1]}`;
               } else if (v[0]) {
                 return `Min weight: ${v[0]}`;
               } else if (v[1]) {
                 return `Max weight: ${v[1]}`;
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
             names: [],
             logic(weight, filters) {
               if (filters[0] && filters[1]) {
                 return weight < filters[0] || weight > filters[1];
               } else if (filters[0]) {
                 return weight < filters[0];
               } else if (filters[1]) {
                 return weight > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Weight'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"size.cableLength",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min cableLength: ${v[0]}`, `Max cableLength: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min cableLength: ${v[0]}, Max cableLength: ${v[1]}`;
               } else if (v[0]) {
                 return `Min cableLength: ${v[0]}`;
               } else if (v[1]) {
                 return `Max cableLength: ${v[1]}`;
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
             names: [],
             logic(cableLength, filters) {
               if (filters[0] && filters[1]) {
                 return cableLength < filters[0] || cableLength > filters[1];
               } else if (filters[0]) {
                 return cableLength < filters[0];
               } else if (filters[1]) {
                 return cableLength > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Cable Length'} >
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
                 return [`Min warranty: ${v[0]}`, `Max warranty: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min warranty: ${v[0]}, Max warranty: ${v[1]}`;
               } else if (v[0]) {
                 return `Min warranty: ${v[0]}`;
               } else if (v[1]) {
                 return `Max warranty: ${v[1]}`;
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
             names: [],
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
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Warranty'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"warranty.returnPolicy",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min returnPolicy: ${v[0]}`, `Max returnPolicy: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min returnPolicy: ${v[0]}, Max returnPolicy: ${v[1]}`;
               } else if (v[0]) {
                 return `Min returnPolicy: ${v[0]}`;
               } else if (v[1]) {
                 return `Max returnPolicy: ${v[1]}`;
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
             names: [],
             logic(returnPolicy, filters) {
               if (filters[0] && filters[1]) {
                 return returnPolicy < filters[0] || returnPolicy > filters[1];
               } else if (filters[0]) {
                 return returnPolicy < filters[0];
               } else if (filters[1]) {
                 return returnPolicy > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'Return Policy'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"leds.leds",
        options:{
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
             names: [],
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
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'LEDS'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"leds.ledChipPower",
        options:{
           filter:true,
           filterType: 'custom',

           // if the below value is set, these values will be used every time the table is rendered.
           // it's best to let the table internally manage the filterList
           //filterList: [25, 50],
           
           customFilterListOptions: {
             render: v => {
               if (v[0] && v[1]) {
                 return [`Min ledChipPower: ${v[0]}`, `Max ledChipPower: ${v[1]}`];
               } else if (v[0] && v[1] ) {
                 return `Min ledChipPower: ${v[0]}, Max ledChipPower: ${v[1]}`;
               } else if (v[0]) {
                 return `Min ledChipPower: ${v[0]}`;
               } else if (v[1]) {
                 return `Max ledChipPower: ${v[1]}`;
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
             names: [],
             logic(ledChipPower, filters) {
               if (filters[0] && filters[1]) {
                 return ledChipPower < filters[0] || ledChipPower > filters[1];
               } else if (filters[0]) {
                 return ledChipPower < filters[0];
               } else if (filters[1]) {
                 return ledChipPower > filters[1];
               }
               return false;
             },
             display: (filterList, onChange, index, column) => <CustomSliderFilter 
             filterList={filterList} 
             onChange={onChange} 
             index={index} 
             column={column} 
             name={'LED Chip Power'} >
             </CustomSliderFilter>,
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
      name:"leds.totalPowerOutput",
      label:'Total Power Output',
      options:{
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
           names: [],
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
           display: (filterList, onChange, index, column) => <CustomSliderFilter 
           filterList={filterList} 
           onChange={onChange} 
           index={index} 
           column={column} 
           name={'Total Power Output'} >
           </CustomSliderFilter>,
         },         
         sort:false,
         display:false,
         viewColumns:false
      }
   },
   {
    name:"leds.wattageDraw",
    label:'Wattage Draw',
    options:{
       filter:true,
       filterType: 'custom',

       // if the below value is set, these values will be used every time the table is rendered.
       // it's best to let the table internally manage the filterList
       //filterList: [25, 50],
       
       customFilterListOptions: {
         render: v => {
           if (v[0] && v[1]) {
             return [`Min wattageDraw: ${v[0]}`, `Max wattageDraw: ${v[1]}`];
           } else if (v[0] && v[1] ) {
             return `Min wattageDraw: ${v[0]}, Max wattageDraw: ${v[1]}`;
           } else if (v[0]) {
             return `Min wattageDraw: ${v[0]}`;
           } else if (v[1]) {
             return `Max wattageDraw: ${v[1]}`;
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
         names: [],
         logic(wattageDraw, filters) {
           if (filters[0] && filters[1]) {
             return wattageDraw < filters[0] || wattageDraw > filters[1];
           } else if (filters[0]) {
             return wattageDraw < filters[0];
           } else if (filters[1]) {
             return wattageDraw > filters[1];
           }
           return false;
         },
         display: (filterList, onChange, index, column) => <CustomSliderFilter 
         filterList={filterList} 
         onChange={onChange} 
         index={index} 
         column={column} 
         name={'Wattage Draw'} >
         </CustomSliderFilter>
         ,
       },         
       sort:false,
       display:false,
       viewColumns:false
    }
 },
 {
  name:"wavelengths.nm480",
  label:'nm480',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm480: ${v[0]}`, `Max nm480: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm480: ${v[0]}, Max nm480: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm480: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm480: ${v[1]}`;
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
       names: [],
       logic(nm480, filters) {
         if (filters[0] && filters[1]) {
           return nm480 < filters[0] || nm480 > filters[1];
         } else if (filters[0]) {
           return nm480 < filters[0];
         } else if (filters[1]) {
           return nm480 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm480'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"wavelengths.nm610",
  label:'nm610',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm610: ${v[0]}`, `Max nm610: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm610: ${v[0]}, Max nm610: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm610: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm610: ${v[1]}`;
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
       names: [],
       logic(nm610, filters) {
         if (filters[0] && filters[1]) {
           return nm610 < filters[0] || nm610 > filters[1];
         } else if (filters[0]) {
           return nm610 < filters[0];
         } else if (filters[1]) {
           return nm610 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm610'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"wavelengths.nm630",
  label:'nm630',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm630: ${v[0]}`, `Max nm630: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm630: ${v[0]}, Max nm630: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm630: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm630: ${v[1]}`;
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
       names: [],
       logic(nm630, filters) {
         if (filters[0] && filters[1]) {
           return nm630 < filters[0] || nm630 > filters[1];
         } else if (filters[0]) {
           return nm630 < filters[0];
         } else if (filters[1]) {
           return nm630 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm630'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"wavelengths.nm660",
  label:'nm660',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm660: ${v[0]}`, `Max nm660: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm660: ${v[0]}, Max nm660: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm660: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm660: ${v[1]}`;
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
       names: [],
       logic(nm660, filters) {
         if (filters[0] && filters[1]) {
           return nm660 < filters[0] || nm660 > filters[1];
         } else if (filters[0]) {
           return nm660 < filters[0];
         } else if (filters[1]) {
           return nm660 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm660'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
 },
{
  name:"wavelengths.nm810",
  label:'nm810',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm810: ${v[0]}`, `Max nm810: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm810: ${v[0]}, Max nm810: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm810: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm810: ${v[1]}`;
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
       names: [],
       logic(nm810, filters) {
         if (filters[0] && filters[1]) {
           return nm810 < filters[0] || nm810 > filters[1];
         } else if (filters[0]) {
           return nm810 < filters[0];
         } else if (filters[1]) {
           return nm810 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm810'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"wavelengths.nm830",
  label:'nm830',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm830: ${v[0]}`, `Max nm830: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm830: ${v[0]}, Max nm830: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm830: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm830: ${v[1]}`;
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
       names: [],
       logic(nm830, filters) {
         if (filters[0] && filters[1]) {
           return nm830 < filters[0] || nm830 > filters[1];
         } else if (filters[0]) {
           return nm830 < filters[0];
         } else if (filters[1]) {
           return nm830 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm830'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"wavelengths.nm850",
  label:'nm850',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm850: ${v[0]}`, `Max nm850: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm850: ${v[0]}, Max nm850: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm850: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm850: ${v[1]}`;
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
       names: [],
       logic(nm850, filters) {
         if (filters[0] && filters[1]) {
           return nm850 < filters[0] || nm850 > filters[1];
         } else if (filters[0]) {
           return nm850 < filters[0];
         } else if (filters[1]) {
           return nm850 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm850'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"wavelengths.nm930",
  label:'nm930',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm930: ${v[0]}`, `Max nm930: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm930: ${v[0]}, Max nm930: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm930: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm930: ${v[1]}`;
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
       names: [],
       logic(nm930, filters) {
         if (filters[0] && filters[1]) {
           return nm930 < filters[0] || nm930 > filters[1];
         } else if (filters[0]) {
           return nm930 < filters[0];
         } else if (filters[1]) {
           return nm930 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm930'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"wavelengths.nm950",
  label:'nm950',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min nm950: ${v[0]}`, `Max nm950: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min nm950: ${v[0]}, Max nm950: ${v[1]}`;
         } else if (v[0]) {
           return `Min nm950: ${v[0]}`;
         } else if (v[1]) {
           return `Max nm950: ${v[1]}`;
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
       names: [],
       logic(nm950, filters) {
         if (filters[0] && filters[1]) {
           return nm950 < filters[0] || nm950 > filters[1];
         } else if (filters[0]) {
           return nm950 < filters[0];
         } else if (filters[1]) {
           return nm950 > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'nm950'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"flickernsound.flicker",
  label:'Flicker',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min flicker: ${v[0]}`, `Max flicker: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min flicker: ${v[0]}, Max flicker: ${v[1]}`;
         } else if (v[0]) {
           return `Min flicker: ${v[0]}`;
         } else if (v[1]) {
           return `Max flicker: ${v[1]}`;
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
       names: [],
       logic(flicker, filters) {
         if (filters[0] && filters[1]) {
           return flicker < filters[0] || flicker > filters[1];
         } else if (filters[0]) {
           return flicker < filters[0];
         } else if (filters[1]) {
           return flicker > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'Flicker'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"flickernsound.soundLevels",
  label:'Sound Levels',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min soundLevels: ${v[0]}`, `Max soundLevels: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min soundLevels: ${v[0]}, Max soundLevels: ${v[1]}`;
         } else if (v[0]) {
           return `Min soundLevels: ${v[0]}`;
         } else if (v[1]) {
           return `Max soundLevels: ${v[1]}`;
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
       names: [],
       logic(soundLevels, filters) {
         if (filters[0] && filters[1]) {
           return soundLevels < filters[0] || soundLevels > filters[1];
         } else if (filters[0]) {
           return soundLevels < filters[0];
         } else if (filters[1]) {
           return soundLevels > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => <CustomSliderFilter 
       filterList={filterList} 
       onChange={onChange} 
       index={index} 
       column={column} 
       name={'Sound Levels'} >
       </CustomSliderFilter>,
     },         
     sort:false,
     display:false,
     viewColumns:false
  }
},
  ];


  const MyCustomRowComponent = (props) => {
    const {info, yearReleased, cost, size, features, warranty, leds, wavelengths, nnemf, flickernsound} = props;
  
    return (
      <TableRow>
        <TableCell>
            <Modal 
                info= {info}
                yearReleased={yearReleased}
                cost= {cost}
                size= {size}
                features= {features}
                warranty= {warranty}
                leds= {leds}
                wavelengths= {wavelengths}
                nnemf= {nnemf}
                flickernsound= {flickernsound}
        
        ></Modal></TableCell>
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
                       border: '1px solid purple',
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
                <b>Product Link</b><br/><Paper align='center' elevation={2}><Link color="secondary" href={`${info.productLink}`}><ShortcutIcon></ShortcutIcon></Link></Paper><br/>
                <b>Youtube Review</b><br/><Paper align='center' elevation={2}><Link href={`${info.youtubeReview}`}><YouTubeIcon sx={{color:'red'}}></YouTubeIcon></Link></Paper><br/>
                </React.Fragment>
                    }
            >
            <InfoIcon style={{ float: 'right' }} color="secondary"></InfoIcon>
            </Tooltip>
            
            </TableCell>
            <TableCell align="center">
              {yearReleased}
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
                    border: '1px solid purple',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={
          shownCost ? null :
            <React.Fragment>
            <b>Discounted Price</b><br/><Paper align='center' elevation={2}>${cost.discountedPrice}</Paper><br/>
            <b>Shipping USA 🇺🇸</b><br/><Paper align='center' elevation={2}>${cost.shippingUsa}</Paper><br/>
            <b>Shipping Australia 🇦🇺</b><br/><Paper align='center' elevation={2}>${cost.shippingAus}</Paper><br/>
            <b>Shipping UK 🇬🇧</b><br/><Paper align='center' elevation={2}>${cost.shippingUk}</Paper><br/>
            <b>Discounted Value per LED</b><br/><Paper align='center' elevation={2}>${cost.discountedPerLed}</Paper><br/>
            <b>Discounted Value per Output</b><br/><Paper align='center' elevation={2}>${cost.discountedPerOutput}</Paper><br/>
            </React.Fragment>
                        }
                         >
        <b>{shownCost ?  <React.Fragment>
            <b>Discounted Price</b><br/><Paper align='center' elevation={2}>${cost.discountedPrice}</Paper><br/>
            <b>Shipping USA 🇺🇸</b><br/><Paper align='center' elevation={2}>${cost.shippingUsa}</Paper><br/>
            <b>Shipping Australia 🇦🇺</b><br/><Paper align='center' elevation={2}>${cost.shippingAus}</Paper><br/>
            <b>Shipping UK 🇬🇧</b><br/><Paper align='center' elevation={2}>${cost.shippingUk}</Paper><br/>
            <b>Discounted Value per LED</b><br/><Paper align='center' elevation={2}>${cost.discountedPerLed}</Paper><br/>
            <b>Discounted Value per Output</b><br/><Paper align='center' elevation={2}>${cost.discountedPerOutput}</Paper><br/>
            </React.Fragment> : `$${cost.discountedPrice}` }</b>
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
                    border: '1px solid purple',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={
          shownSize ? null :
            <React.Fragment> 
            <b>Height</b><br/><Paper align='center' elevation={2}>{size.height}"</Paper><br/>
            <b>Width</b><br/><Paper align='center' elevation={2}>{size.width}"</Paper><br/>
            <b>Weight</b><br/><Paper align='center' elevation={2}>{size.weight}lb</Paper><br/>
            <b>Cable Length</b><br/><Paper align='center' elevation={2}>{size.cableLength}'</Paper><br/>
            </React.Fragment> 
        }>
            <span>{shownSize ?            <React.Fragment> 
            <b>Height</b><br/><Paper align='center' elevation={2}>{size.height}"</Paper><br/>
            <b>Width</b><br/><Paper align='center' elevation={2}>{size.width}"</Paper><br/>
            <b>Weight</b><br/><Paper align='center' elevation={2}>{size.weight}lb</Paper><br/>
            <b>Cable Length</b><br/><Paper align='center' elevation={2}>{size.cableLength}'</Paper><br/>
            </React.Fragment> : `${size.height}" X ${size.width}"` }</span>
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
                    border: '1px solid purple',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={
          shownFeatures ? null : <React.Fragment> 
            <b>Pulsing</b><br/><Paper align='center' elevation={2}>{features.pulsing ? "Yes" : "No"}</Paper><br/>
            <b>Modular Support</b><br/><Paper align='center' elevation={2}>{features.modularSupport ? " Yes" : "No"}</Paper><br/>
            <b>Stands</b><br/><Paper align='center' elevation={2}>{features.stands ? "Yes" : "No"}</Paper><br/>
            <b>Inbuit Timer</b><br/><Paper align='center' elevation={2}>{features.inbuiltTimer ? "Yes" : "No"}</Paper><br/>
            </React.Fragment>
        }>
          {shownFeatures ? <React.Fragment> 
            <b>Pulsing</b><br/><Paper align='center' elevation={2}>{features.pulsing ? "Yes" : "No"}</Paper><br/>
            <b>Modular Support</b><br/><Paper align='center' elevation={2}>{features.modularSupport ? " Yes" : "No"}</Paper><br/>
            <b>Stands</b><br/><Paper align='center' elevation={2}>{features.stands ? "Yes" : "No"}</Paper><br/>
            <b>Inbuit Timer</b><br/><Paper align='center' elevation={2}>{features.inbuiltTimer ? "Yes" : "No"}</Paper><br/>
            </React.Fragment> :
          <span>
             {features.pulsing ? "Pulsing," : ""}
             {features.modularSupport ? " Modular Support," : ""}
             {features.stands ? " Stands," : ""}
             {features.inbuiltTimer ? " Inbuilt Timer" : ""}
           </span>}
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
                    border: '1px solid purple',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={
          shownWarranty ? null : <React.Fragment> 
            <b>Warranty</b><br/><Paper align='center' elevation={2}>{warranty.warranty} years</Paper><br/>
            <b>Return policy</b><br/><Paper align='center' elevation={2}>{warranty.returnPolicy} days</Paper><br/>
            </React.Fragment>
        }>
        <span>{shownWarranty ? <React.Fragment> 
            <b>Warranty</b><br/><Paper align='center' elevation={2}>{warranty.warranty} years</Paper><br/>
            <b>Return policy</b><br/><Paper align='center' elevation={2}>{warranty.returnPolicy} days</Paper><br/>
            </React.Fragment> : `${warranty.warranty} years`}</span>
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
                    border: '1px solid purple',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={
          shownLeds ? null : <React.Fragment> 
            <b>Leds</b><br/><Paper align='center' elevation={2}>{leds.leds}</Paper><br/>
            <b>Led Dual Chip</b><br/><Paper align='center' elevation={2}>{leds.ledDualChip ? `Yes` : `Single`}</Paper><br/>
            <b>Led Chip Power</b><br/><Paper align='center' elevation={2}>{leds.ledChipPower}W</Paper><br/>
            <b>Total Power Output</b><br/><Paper align='center' elevation={2}>{leds.totalPowerOutput} mW</Paper><br/>
            <b>AV combined power 9 spots</b><br/><Paper align='center' elevation={2}>{leds.avCombinedPower} W</Paper><br/>
            <b>Peak Power</b><br/><Paper align='center' elevation={2}>{leds.peakPower} mW/cm²</Paper><br/>
            <b>Wattage Draw</b><br/><Paper align='center' elevation={2}>{leds.wattageDraw}</Paper><br/>
            </React.Fragment>
        }>
         { shownLeds ? <React.Fragment> 
            <b>Leds</b><br/><Paper align='center' elevation={2}>{leds.leds}</Paper><br/>
            <b>Led Dual Chip</b><br/><Paper align='center' elevation={2}>{leds.ledDualChip ? `Yes` : `Single`}</Paper><br/>
            <b>Led Chip Power</b><br/><Paper align='center' elevation={2}>{leds.ledChipPower}W</Paper><br/>
            <b>Total Power Output</b><br/><Paper align='center' elevation={2}>{leds.totalPowerOutput} mW</Paper><br/>
            <b>AV combined power 9 spots</b><br/><Paper align='center' elevation={2}>{leds.avCombinedPower} W</Paper><br/>
            <b>Peak Power</b><br/><Paper align='center' elevation={2}>{leds.peakPower} mW/cm²</Paper><br/>
            <b>Wattage Draw</b><br/><Paper align='center' elevation={2}>{leds.wattageDraw}</Paper><br/>
            </React.Fragment> : <span>
             {leds.ledDualChip ? `${leds.leds} Dual ${leds.ledChipPower}W` : `${leds.leds} Single ${leds.ledChipPower}W`}
             </span>}
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
                    border: '1px solid purple',
                    borderRadius: "10px 10px",
                    boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
                  }
            }
          }}
        title={shownWaveLengths ? null : <React.Fragment> 
            <b>480</b><br/><Paper align='center' elevation={2}>{wavelengths['nm480'] ? wavelengths['nm480'] : 'No' }</Paper><br/>
            <b>610</b><br/><Paper align='center' elevation={2}>{wavelengths['nm610'] ? wavelengths['nm610'] : 'No'}</Paper><br/>
            <b>630</b><br/><Paper align='center' elevation={2}>{wavelengths['nm630'] ? wavelengths['nm630'] : 'No'}</Paper><br/>
            <b>660</b><br/><Paper align='center' elevation={2}>{wavelengths['nm660'] ? wavelengths['nm660'] : 'No'}</Paper><br/>
            <b>810</b><br/><Paper align='center' elevation={2}>{wavelengths['nm810'] ? wavelengths['nm810'] : 'No'}</Paper><br/>
            <b>830</b><br/><Paper align='center' elevation={2}>{wavelengths['nm830'] ? wavelengths['nm830'] : 'No'}</Paper><br/>
            <b>850</b><br/><Paper align='center' elevation={2}>{wavelengths['nm850'] ? wavelengths['nm850'] : 'No'}</Paper><br/>
            <b>930</b><br/><Paper align='center' elevation={2}>{wavelengths['nm930'] ? wavelengths['nm930'] : 'No'}</Paper><br/>
            <b>950</b><br/><Paper align='center' elevation={2}>{wavelengths['nm950'] ? wavelengths['nm950'] : 'No'}</Paper><br/>
            </React.Fragment>
        }>
        <span>{shownWaveLengths ? <React.Fragment> 
            <b>480</b><br/><Paper align='center' elevation={2}>{wavelengths['nm480'] ? wavelengths['nm480'] : 'No' }</Paper><br/>
            <b>610</b><br/><Paper align='center' elevation={2}>{wavelengths['nm610'] ? wavelengths['nm610'] : 'No'}</Paper><br/>
            <b>630</b><br/><Paper align='center' elevation={2}>{wavelengths['nm630'] ? wavelengths['nm630'] : 'No'}</Paper><br/>
            <b>660</b><br/><Paper align='center' elevation={2}>{wavelengths['nm660'] ? wavelengths['nm660'] : 'No'}</Paper><br/>
            <b>810</b><br/><Paper align='center' elevation={2}>{wavelengths['nm810'] ? wavelengths['nm810'] : 'No'}</Paper><br/>
            <b>830</b><br/><Paper align='center' elevation={2}>{wavelengths['nm830'] ? wavelengths['nm830'] : 'No'}</Paper><br/>
            <b>850</b><br/><Paper align='center' elevation={2}>{wavelengths['nm850'] ? wavelengths['nm850'] : 'No'}</Paper><br/>
            <b>930</b><br/><Paper align='center' elevation={2}>{wavelengths['nm930'] ? wavelengths['nm930'] : 'No'}</Paper><br/>
            <b>950</b><br/><Paper align='center' elevation={2}>{wavelengths['nm950'] ? wavelengths['nm950'] : 'No'}</Paper><br/>
            </React.Fragment> : info.peakWavelengthsTested}</span>
        </Tooltip>
        </TableCell>
        <TableCell align="center">{flickernsound.flicker>0 ? `${flickernsound.flicker}% @ 100hz` : `${flickernsound.flicker}% @ 0hz` } Flicker - {flickernsound.soundLevels} Sound Level</TableCell>   
      </TableRow>
    );
  }


  const options = {
    filter: true,
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    selectableRows: "single",
    viewColumns: false,
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
        const [info, yearReleased, cost, size, features, warranty, leds, wavelengths, nnemf, flickernsound] = data;

        return (
          <MyCustomRowComponent
          info={info}
          yearReleased={yearReleased}
          cost={cost}
          size={size}
          features={features}
          warranty={warranty}
          leds={leds}
          wavelengths={wavelengths}
          nnemf={nnemf}
          flickernsound={flickernsound}
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
            padding: '10px'
        }}
      },
      MuiSvgIcon: {
        styleOverrides:{ root:{
            //background: 'linear-gradient(to top, #ffff 0%, aliceblue 1%, #ffff 100%);'
                color: '#9c27b0'
        }
        }
      },
      MUIDataTableFilter: {
        styleOverrides: { root: {
                height: '290px',
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
