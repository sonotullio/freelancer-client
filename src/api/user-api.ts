import axios from "axios";
import {GoogleUser} from "@/src/types/GoogleUser";

const url = 'http://localhost:8080/api/users';

const userApi = {
    create : async (data: any) => {
        return await axios.post<GoogleUser>(url, data);
    },

    getAll : async () => {
        return await axios.get<GoogleUser[]>(url);
    },

    get : async (id: string) => {
        return await axios.get<GoogleUser>(url + '/' + id);
    },

    update : async (id: string, data: any) => {
        return await axios.put<GoogleUser>(url + '/' + id, data);
    },

    remove : async (id: string) => {
        return await axios.delete<GoogleUser>(url + '/' + id);
    }
}

export default userApi;