import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

export default async function UserSettingsLoader() {
    try {
        const response = await axios.get(`http://localhost:7000/api/v1/users/`, { withCredentials: true });
        return response.data.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}