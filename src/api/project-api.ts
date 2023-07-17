import axios from "axios";
import {Project} from "@/src/types/Project";

const url = 'http://localhost:8080/api/projects';

const projectApi = {
    create : async (data: any) => {
        return await axios.post<Project>(url, data);
    },

    getAll : async (customerId?: string) => {
        return customerId ? await axios.get<Project[]>(url + '?customerId=' + customerId) : await axios.get<Project[]>(url);
    },

    get : async (id: string) => {
        return await axios.get<Project>(url + '/' + id);
    },

    update : async (id: string, data: any) => {
        return await axios.put<Project>(url + '/' + id, data);
    },

    remove : async (id: string) => {
        return await axios.delete<Project>(url + '/' + id);
    }
}

export default projectApi;