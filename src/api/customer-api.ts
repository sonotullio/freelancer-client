import axios from "axios";
import {Customer} from "@/src/types/Customer";

const url = 'http://localhost:8080/api/customers';

const customerApi = {
    create : async (data: any) => {
        return await axios.post<Customer>(url, data);
    },

    getAll : async () => {
        return await axios.get<Customer[]>(url);
    },

    get : async (id: string) => {
        return await axios.get<Customer>(url + '/' + id);
    },

    update : async (id: string, data: any) => {
        return await axios.put<Customer>(url + '/' + id, data);
    },

    remove : async (id: string) => {
        return await axios.delete<Customer>(url + '/' + id);
    }
}

export default customerApi;