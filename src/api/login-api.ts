import axios from "axios";
import {GoogleUser} from "@/src/types/GoogleUser";

const url = 'http://localhost:8080/api/login';

const loginApi = {
    login : async (data: any) => {
        return await axios.post<GoogleUser>(url, data);
    },

    loginGoogle : async (data: any) => {
        return await axios.post<GoogleUser>(url + '/google', data);
    }
}

export default loginApi;