import axios from "axios";
import {GoogleUser} from "@/src/types/GoogleUser";

const url = 'http://localhost:8080/api/register';

const registrationApi = {
    register : async (data: any) => {
        return await axios.post<GoogleUser>(url, data);
    }
}

export default registrationApi;