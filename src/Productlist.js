import React from "react";
import {useState} from "react"
import MUIDataTable from "mui-datatables";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoIcon from '@mui/icons-material/Info';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import Zoom from '@mui/material/Zoom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Modal from "./Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";




//import makeStyles from "@mui/styles";


const Productlist = props => {
/* 
    const useStyles = makeStyles({

       });
    const classes = useStyles(); */

  const columns = [
    {
      label: "Product Name",
      name: "productName",
      options: {
        filter: false
      },
    },
    {
      label: "Info",
      name: "info",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(obj1.data.yearReleased, 10);
            let val2 = parseInt(obj2.data.yearReleased, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        } 
      }
    },
    {
      label: "Cost",
      name: "cost",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseInt(obj1.data.discountedPrice, 10);
            let val2 = parseInt(obj2.data.discountedPrice, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
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
            let val1 = parseInt(obj1.data.weight, 10);
            let val2 = parseInt(obj2.data.weight, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        } 
      }
    },
    {
      label: "Features",
      name: "features",
      options: {
        filter: false,
        sort: false
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
            let val1 = parseInt(obj1.data.warranty, 10);
            let val2 = parseInt(obj2.data.warranty, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
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
            let val1 = parseInt(obj1.data.leds, 10);
            let val2 = parseInt(obj2.data.leds, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        } 
      }
    },
    {
      label: "Wavelengths",
      name: "wavelengths",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      label: "Power",
      name: "power",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            console.log(obj1, obj2)
            let val1 = parseFloat(obj1.data.totalPowerOutput);
            let val2 = parseFloat(obj2.data.totalPowerOutput);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        } 
      }
    },
    {
      label: "Value",
      name: "value",
      options: {
        filter: false,
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseFloat(obj1.data.discountedPerLed) + parseFloat(obj1.data.discountedPerOutput);
            let val2 = parseFloat(obj2.data.discountedPerLed) + parseFloat(obj2.data.discountedPerOutput);
            console.log(val1,val2);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
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
            let val1 = parseInt(obj1.data.soundLevels, 10);
            let val2 = parseInt(obj2.data.soundLevels, 10);
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          };
        } 
      }
    },    
    {
        name:"info.company",
        label:'company',
        options:{
           filter:true,
           filterType: 'checkbox',
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
        name:"info.class",
        options:{
           filter:true,
           filterType: 'checkbox',
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
         filterType: 'checkbox',
         sort:false,
         display:false,
         viewColumns:false
      }
   },
     {
        name:"info.yearReleased",
        options:{
           filter:true,
           filterType: 'checkbox',
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Discounted Price</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Shipping USA Price</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Shipping Australia Price</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Shipping UK Price</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Height</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Width</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Weight</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>cableLength</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>warranty</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>Return Policy</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>LEDS</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
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
             display: (filterList, onChange, index, column) => (
               <div>
                 <FormLabel>led Chip Power</FormLabel>
                 <FormGroup row>
                   <TextField
                     label='min'
                     value={filterList[index][0] || ''}
                     onChange={event => {
                       filterList[index][0] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%', marginRight: '5%' }}
                   />
                   <TextField
                     label='max'
                     value={filterList[index][1] || ''}
                     onChange={event => {
                       filterList[index][1] = event.target.value;
                       onChange(filterList[index], index, column);
                     }}
                     style={{ width: '45%' }}
                   />

                 </FormGroup>
               </div>
             ),
           },
           sort:false,
           display:false,
           viewColumns:false
        }
     },
     {
      name:"power.totalPowerOutput",
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
           display: (filterList, onChange, index, column) => (
             <div>
               <FormLabel>Total Power Output</FormLabel>
               <FormGroup row>
                 <TextField
                   label='min'
                   value={filterList[index][0] || ''}
                   onChange={event => {
                     filterList[index][0] = event.target.value;
                     onChange(filterList[index], index, column);
                   }}
                   style={{ width: '45%', marginRight: '5%' }}
                 />
                 <TextField
                   label='max'
                   value={filterList[index][1] || ''}
                   onChange={event => {
                     filterList[index][1] = event.target.value;
                     onChange(filterList[index], index, column);
                   }}
                   style={{ width: '45%' }}
                 />
                
               </FormGroup>
             </div>
           ),
         },         sort:false,
         display:false,
         viewColumns:false
      }
   },
   {
    name:"power.wattageDraw",
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
         display: (filterList, onChange, index, column) => (
           <div>
             <FormLabel>Wattage Draw</FormLabel>
             <FormGroup row>
               <TextField
                 label='min'
                 value={filterList[index][0] || ''}
                 onChange={event => {
                   filterList[index][0] = event.target.value;
                   onChange(filterList[index], index, column);
                 }}
                 style={{ width: '45%', marginRight: '5%' }}
               />
               <TextField
                 label='max'
                 value={filterList[index][1] || ''}
                 onChange={event => {
                   filterList[index][1] = event.target.value;
                   onChange(filterList[index], index, column);
                 }}
                 style={{ width: '45%' }}
               />
              
             </FormGroup>
           </div>
         ),
       },         sort:false,
       display:false,
       viewColumns:false
    }
 },
 {
  name:"value.discountedValuePerLed",
  label:'Discounted Value Per Led',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min discountedValuePerLed: ${v[0]}`, `Max discountedValuePerLed: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min discountedValuePerLed: ${v[0]}, Max discountedValuePerLed: ${v[1]}`;
         } else if (v[0]) {
           return `Min discountedValuePerLed: ${v[0]}`;
         } else if (v[1]) {
           return `Max discountedValuePerLed: ${v[1]}`;
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
       logic(discountedValuePerLed, filters) {
         if (filters[0] && filters[1]) {
           return discountedValuePerLed < filters[0] || discountedValuePerLed > filters[1];
         } else if (filters[0]) {
           return discountedValuePerLed < filters[0];
         } else if (filters[1]) {
           return discountedValuePerLed > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => (
         <div>
           <FormLabel>Discounted Value Per Led</FormLabel>
           <FormGroup row>
             <TextField
               label='min'
               value={filterList[index][0] || ''}
               onChange={event => {
                 filterList[index][0] = event.target.value;
                 onChange(filterList[index], index, column);
               }}
               style={{ width: '45%', marginRight: '5%' }}
             />
             <TextField
               label='max'
               value={filterList[index][1] || ''}
               onChange={event => {
                 filterList[index][1] = event.target.value;
                 onChange(filterList[index], index, column);
               }}
               style={{ width: '45%' }}
             />

           </FormGroup>
         </div>
       ),
     },         sort:false,
     display:false,
     viewColumns:false
  }
},
{
  name:"value.discountedValuePerOutput",
  label:'Discounted Value Per Output',
  options:{
     filter:true,
     filterType: 'custom',

     // if the below value is set, these values will be used every time the table is rendered.
     // it's best to let the table internally manage the filterList
     //filterList: [25, 50],
     
     customFilterListOptions: {
       render: v => {
         if (v[0] && v[1]) {
           return [`Min discountedValuePerOutput: ${v[0]}`, `Max discountedValuePerOutput: ${v[1]}`];
         } else if (v[0] && v[1] ) {
           return `Min discountedValuePerOutput: ${v[0]}, Max discountedValuePerOutput: ${v[1]}`;
         } else if (v[0]) {
           return `Min discountedValuePerOutput: ${v[0]}`;
         } else if (v[1]) {
           return `Max discountedValuePerOutput: ${v[1]}`;
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
       logic(discountedValuePerOutput, filters) {
         if (filters[0] && filters[1]) {
           return discountedValuePerOutput < filters[0] || discountedValuePerOutput > filters[1];
         } else if (filters[0]) {
           return discountedValuePerOutput < filters[0];
         } else if (filters[1]) {
           return discountedValuePerOutput > filters[1];
         }
         return false;
       },
       display: (filterList, onChange, index, column) => (
         <div>
           <FormLabel>Discounted Value Per Output</FormLabel>
           <FormGroup row>
             <TextField
               label='min'
               value={filterList[index][0] || ''}
               onChange={event => {
                 filterList[index][0] = event.target.value;
                 onChange(filterList[index], index, column);
               }}
               style={{ width: '45%', marginRight: '5%' }}
             />
             <TextField
               label='max'
               value={filterList[index][1] || ''}
               onChange={event => {
                 filterList[index][1] = event.target.value;
                 onChange(filterList[index], index, column);
               }}
               style={{ width: '45%' }}
             />

           </FormGroup>
         </div>
       ),
     },         sort:false,
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
       display: (filterList, onChange, index, column) => (
         <div>
           <FormLabel>Sound Levels</FormLabel>
           <FormGroup row>
             <TextField
               label='min'
               value={filterList[index][0] || ''}
               onChange={event => {
                 filterList[index][0] = event.target.value;
                 onChange(filterList[index], index, column);
               }}
               style={{ width: '45%', marginRight: '5%' }}
             />
             <TextField
               label='max'
               value={filterList[index][1] || ''}
               onChange={event => {
                 filterList[index][1] = event.target.value;
                 onChange(filterList[index], index, column);
               }}
               style={{ width: '45%' }}
             />

           </FormGroup>
         </div>
       ),
     },         sort:false,
     display:false,
     viewColumns:false
  }
},
  ];
  const data = [
    {
    productName: "MitoPro 1500",
    info: {company:"Mitored", class:"Body Panel", yearReleased:"2022", discountCode:"ALEX - 5%", productLink:"https://mitoredlight.com/products/mitopro-series?afmc=em", youtubeReview: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
    cost: {discountedPrice: 1092, shippingUsa:0, shippingAus:125, shippingUk: 117},
    size: {height:42,width:10,weight:25,cableLength:6},
    features: {pulsing:"No", modularSupport: "Y" ,stands: "N" ,inbuiltTimer:"Y"},
    warranty: {warranty:3, returnPolicy:60},
    leds: {leds:300, ledDualChip:"Single", ledChipPower: 5},
    wavelengths: {480: "N", 610: "N", 630: "Y - 75", 660: "Y - 75", 810: "N", 830: "Y - 75", 850: "Y - 75", 930: "N", 950: "N",
                 peakWavelengthsTested: "645, 665, 830, 850 NB: Mitored have said the 645 vs 630 discrepency will not be an issue for panels purchased after Q3 2021"},
    power: {totalPowerOutput:136.1, avCombinedPower: 76.4, peakPower: 88.2, wattageDraw: 806},
    value: {discountedPerLed:3.6, discountedPerOutput:8},
    nnemf: {emf3i:"green", emf6i:"green", mag3i:"orange - 0.12", mag6i:"orange", mico3i:"green", mico6i:"green"},
    flickernsound:{flicker: "0% @ 0hz", soundLevels: 51.7}
    },
    {
    productName: "LightPath Large Pulsed Multiwave",
    info: {company:"LightPath LED", class:"Body Panel", yearReleased:"2022", discountCode:"ALEX - 5%", productLink:"https://lightpathled.com/?afmc=alex", youtubeReview: "https://www.youtube.com/watch?v=2LgDROvdpNQ"},
    cost: {discountedPrice: 1115, shippingUsa:0, shippingAus:100, shippingUk: 25},
    size: {height:38,width:12,weight:26,cableLength:4.75},
    features: {pulsing:"Yes - 1-9999hz", modularSupport: "Y" ,stands: "N" ,inbuiltTimer:"Y"},
    warranty: {warranty:3, returnPolicy:60},
    leds: {leds:255, ledDualChip:"Dual", ledChipPower: 5},
    wavelengths: {480: "N", 610: "N", 630: "Y - 51", 660: "Y - 51", 810: "Y - 64", 830: "N", 850: "Y - 64", 930: "Y - 25", 950: "N",
    peakWavelengthsTested: "635, 660, 810, 850, 940"},
    power: {totalPowerOutput:136.1, avCombinedPower: 76.4, peakPower: 88.2, wattageDraw: 806},
    value: {discountedPerLed:4.4, discountedPerOutput:9.3},
    nnemf: {emf3i:"green", emf6i:"green", mag3i:"orange - 0.12", mag6i:"orange", mico3i:"green", mico6i:"green"},
    flickernsound:{flicker: "0% @ 0hz", soundLevels: 51.9}
    },
    {
      productName: "BioMax 600 (gen2 2021)",
      info: {company:"Platinum LED", class:"Body Panel", yearReleased:"2021", discountCode:"ALEX - 5%", productLink:"https://platinumtherapylights.com/products/biomax-rlt?variant=15666983895106", youtubeReview: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
      cost: {discountedPrice: 854, shippingUsa:0, shippingAus:80, shippingUk: 80},
      size: {height:36,width:9,weight:22,cableLength:6.5},
      features: {pulsing:"No", modularSupport: "Y" ,stands: "N" ,inbuiltTimer:"Y"},
      warranty: {warranty:3, returnPolicy:60},
      leds: {leds:200, ledDualChip:"Single", ledChipPower: 3},
      wavelengths: {480: "N", 610: "N", 630: "Y - 51", 660: "Y - 51", 810: "Y - 64", 830: "N", 850: "Y - 64", 930: "Y - 25", 950: "N",
      peakWavelengthsTested: "635, 660, 810, 850, 940"},
      power: {totalPowerOutput:101.2, avCombinedPower: 71.7, peakPower: 92.9, wattageDraw: 627},
      value: {discountedPerLed:4.3, discountedPerOutput:8.5},
      nnemf: {emf3i:"green", emf6i:"green", mag3i:"orange - 0.12", mag6i:"orange", mico3i:"green", mico6i:"green"},
      flickernsound:{flicker: "0% @ 0hz", soundLevels: 52}
      },
        {
          productName: "Red Rush 720 Classic",
          info: {company:"Red Therapy Co", class:"Body Panel", yearReleased:"2020", discountCode:"ALEX - 25%", productLink:"https://redtherapy.co/?rfsn=1246699.6149a", youtubeReview: "https://www.youtube.com/watch?v=_f8ytSdOOC0"},
          cost: {discountedPrice: 754, shippingUsa:0, shippingAus:121, shippingUk: 121},
          size: {height:35,width:10.6,weight:20,cableLength:6},
          features: {pulsing:"No", modularSupport: "N" ,stands: "N" ,inbuiltTimer:"N"},
          warranty: {warranty:2, returnPolicy:60},
          leds: {leds:240, ledDualChip:"Single", ledChipPower: 3},
          wavelengths: {480: "N", 610: "N", 630: "Y - 51", 660: "Y - 51", 810: "Y - 64", 830: "N", 850: "Y - 64", 930: "Y - 25", 950: "N",
          peakWavelengthsTested: "635, 660, 810, 850, 940"},
          power: {totalPowerOutput:70, avCombinedPower: 46.3, peakPower: 60, wattageDraw: 349},
          value: {discountedPerLed:3.1, discountedPerOutput:10.8},
          nnemf: {emf3i:"green", emf6i:"green", mag3i:"orange - 0.12", mag6i:"orange", mico3i:"green", mico6i:"green"},
          flickernsound:{flicker: "74% @ 100hz", soundLevels: 54.5}
          }
  ];

  const MyCustomRowComponent = (props) => {
    const {productName, info, cost, size, features, warranty, leds, wavelengths, power, value, nnemf, flickernsound} = props;
  
    return (
      <TableRow>
        <TableCell>
            <Modal 
                productName={productName}
                info= {info}
                cost= {cost}
                size= {size}
                features= {features}
                warranty= {warranty}
                leds= {leds}
                wavelengths= {wavelengths}
                power= {power}
                value= {value}
                nnemf= {nnemf}
                flickernsound= {flickernsound}
        
        ></Modal></TableCell>
        <TableCell align="center">{productName}</TableCell>
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
                <b>Company</b><br/><Paper align='center' elevation={2}>{info.company}</Paper><br/>
                <b>Class</b><br/><Paper align='center' elevation={2}>{info.class}</Paper><br/>
                <b>Year Released</b><br/><Paper align='center' elevation={2}>{info.yearReleased}</Paper><br/>
                <b>Discount Code</b><br/><Paper align='center' elevation={2}>{info.discountCode}</Paper><br/>
                <b>Product Link</b><br/><Paper align='center' elevation={2}><Link color="secondary" href={`${info.productLink}`}><ShortcutIcon></ShortcutIcon></Link></Paper><br/>
                <b>Youtube Review</b><br/><Paper align='center' elevation={2}><Link href={`${info.youtubeReview}`}><YouTubeIcon sx={{color:'red'}}></YouTubeIcon></Link></Paper><br/>
                </React.Fragment>
                    }
            >
            <InfoIcon color="secondary"></InfoIcon>
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
            <React.Fragment>
            <b>Discounted Price</b><br/><Paper align='center' elevation={2}>${cost.discountedPrice}</Paper><br/>
            <b>Shipping USA 🇺🇸</b><br/><Paper align='center' elevation={2}>${cost.shippingUsa}</Paper><br/>
            <b>Shipping Australia 🇦🇺</b><br/><Paper align='center' elevation={2}>${cost.shippingAus}</Paper><br/>
            <b>Shipping UK 🇬🇧</b><br/><Paper align='center' elevation={2}>${cost.shippingUk}</Paper><br/>
            </React.Fragment>
                        }
                         >
        <b>{`$${cost.discountedPrice}`}</b>
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
            <React.Fragment> 
            <b>Height</b><br/><Paper align='center' elevation={2}>{size.height}"</Paper><br/>
            <b>Width</b><br/><Paper align='center' elevation={2}>{size.width}"</Paper><br/>
            <b>Weight</b><br/><Paper align='center' elevation={2}>{size.weight}lb</Paper><br/>
            <b>Cable Length</b><br/><Paper align='center' elevation={2}>{size.cableLength}'</Paper><br/>
            </React.Fragment>
        }>
            <span>{size.height}" X {size.width}"</span>
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
            <React.Fragment> 
            <b>Pulsing</b><br/><Paper align='center' elevation={2}>{features.pulsing}</Paper><br/>
            <b>Modular Support</b><br/><Paper align='center' elevation={2}>{features.modularSupport}</Paper><br/>
            <b>Stands</b><br/><Paper align='center' elevation={2}>{features.stands}</Paper><br/>
            <b>Inbuit Timer</b><br/><Paper align='center' elevation={2}>{features.inbuiltTimer}</Paper><br/>
            </React.Fragment>
        }>
          <span>
             {features.pulsing !== "No" ? "Pulsing," : ""}
             {features.modularSupport !== "N" ? " Modular Support," : ""}
             {features.stands !== "N" ? " Stands," : ""}
             {features.inbuiltTimer !== "N" ? " Inbuilt Timer" : ""}
           </span>
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
            <React.Fragment> 
            <b>Warranty</b><br/><Paper align='center' elevation={2}>{warranty.warranty} years</Paper><br/>
            <b>Return policy</b><br/><Paper align='center' elevation={2}>{warranty.returnPolicy} days</Paper><br/>
            </React.Fragment>
        }>
        <span>{warranty.warranty} years</span>
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
            <React.Fragment> 
            <b>Leds</b><br/><Paper align='center' elevation={2}>{leds.leds}</Paper><br/>
            <b>Led Dual Chip</b><br/><Paper align='center' elevation={2}>{leds.ledDualChip}</Paper><br/>
            <b>Led Chip Power</b><br/><Paper align='center' elevation={2}>{leds.ledChipPower}W</Paper><br/>
            </React.Fragment>
        }>
            <span>
             {leds.ledDualChip !== "Single" ? `${leds.leds} Dual ${leds.ledChipPower}` : `${leds.leds} Single ${leds.ledChipPower}W`}
             </span>
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
            <React.Fragment> 
            <b>480</b><br/><Paper align='center' elevation={2}>{wavelengths['480']}</Paper><br/>
            <b>610</b><br/><Paper align='center' elevation={2}>{wavelengths['610']}</Paper><br/>
            <b>630</b><br/><Paper align='center' elevation={2}>{wavelengths['630']}</Paper><br/>
            <b>660</b><br/><Paper align='center' elevation={2}>{wavelengths['660']}</Paper><br/>
            <b>810</b><br/><Paper align='center' elevation={2}>{wavelengths['810']}</Paper><br/>
            <b>830</b><br/><Paper align='center' elevation={2}>{wavelengths['830']}</Paper><br/>
            <b>850</b><br/><Paper align='center' elevation={2}>{wavelengths['850']}</Paper><br/>
            <b>930</b><br/><Paper align='center' elevation={2}>{wavelengths['930']}</Paper><br/>
            <b>950</b><br/><Paper align='center' elevation={2}>{wavelengths['950']}</Paper><br/>
            </React.Fragment>
        }>
        <span>{wavelengths.peakWavelengthsTested}</span>
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
            <React.Fragment> 
            <b>Total Power Output</b><br/><Paper align='center' elevation={2}>{power.totalPowerOutput} mW</Paper><br/>
            <b>AV combined power 9 spots</b><br/><Paper align='center' elevation={2}>{power.avCombinedPower} W</Paper><br/>
            <b>Peak Power</b><br/><Paper align='center' elevation={2}>{power.peakPower} mW/cm²</Paper><br/>
            <b>Wattage Draw</b><br/><Paper align='center' elevation={2}>{power.wattageDraw}</Paper><br/>
            </React.Fragment>
        }>
            <span>{power.totalPowerOutput} (estimated) mW - (9 pts, AV x LED area) </span>
            </Tooltip>
            </TableCell>
        <TableCell align="center">${value.discountedPerLed} Per LED - ${value.discountedPerOutput} Per Watt Output</TableCell>   
        <TableCell align="center">{flickernsound.flicker} Flicker - {flickernsound.soundLevels} Sound Level</TableCell>   
      </TableRow>
    );
  }

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24),
    createData("Ice cream sandwich", 237, 9.0, 37),
    createData("Eclair", 262, 16.0, 24),
    createData("Cupcake", 305, 3.7, 67),
    createData("Gingerbread", 356, 16.0, 49)
  ];

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
                    if (col[key].toString().indexOf(searchQuery) >= 0) {
                        isFound = true;
                      }
                })
            }

            if (col.toString().indexOf(searchQuery) >= 0) {
                isFound = true;
              }
          
      
        });
        return isFound;
      },
    responsive: "simple",
    customRowRender: data => {
        const [productName, info, cost, size, features, warranty, leds, wavelengths, power, value, nnemf, flickernsound] = data;

        return (
          <MyCustomRowComponent
          productName={productName}
          info={info}
          cost={cost}
          size={size}
          features={features}
          warranty={warranty}
          leds={leds}
          wavelengths={wavelengths}
          power={power}
          value={value}
          nnemf={nnemf}
          flickernsound={flickernsound}
          />
        );
      },
    rowsPerPage: 10,
    expandableRows: false,
/*     renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: "650" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    }, */
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
},
})}
>
    <MUIDataTable
      title={"Products"}
      data={data}
      columns={columns}
      options={options}
      //className={classes.table}
    />
    </ThemeProvider>
  );
};

export default Productlist;
