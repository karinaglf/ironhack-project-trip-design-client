import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function CreateTripPage() {
    const [tripName, setTripName] = useState("");
    const [description, setDescription] = useState("");
    
    return ( 
        <div>
            <h2>Create a Trip Page</h2>
        </div>
     );
}

export default CreateTripPage;