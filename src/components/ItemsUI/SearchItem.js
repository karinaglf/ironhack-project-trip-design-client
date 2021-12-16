import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";


function SearchBar( {searchList} ) {
    const [searchString, setSearchString] = useState("");

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