import React from "react";
import { useState } from "react";
import { TextField, Select } from "@mui/material";
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function SearchBar( {searchList, type} ) {
    const [searchString, setSearchString] = useState("");
    const [cities, setCities] = useState();


    const getAllCities = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/cities`);
    
          let citiesObj = {};
          response.data.forEach((item) => {
            citiesObj[item._id] = item.name;
          });
    
          setCities(citiesObj);
        } catch (error) {
          console.log(error);
        }
      };


    const handleSearch = (event) => {
        
        setSearchString(event.target.value);
        searchList(event.target.value);
    }

    return ( 
        <div>
            <TextField value={searchString} placeholder="Search by name" type="text" onChange={handleSearch} />
        </div>
     );
}

export default SearchBar;