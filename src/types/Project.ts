import {Customer} from "@/src/types/Customer";

export type Project = {
    id?: string;
    name: string;
    description: string;
    customer: Customer;
    status: string;
    workingHours: number;
}