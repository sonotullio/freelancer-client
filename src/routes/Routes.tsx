import {useRoutes} from "react-router";
import Home from "../components/home/Home";
import Projects from "../components/projects/Projects";
import Customers from "../components/customers/Customers";
import AddCustomer from "../components/customers/AddCustomer";
import AddProject from "../components/projects/AddProject";
import ViewCustomer from "../components/customers/ViewCustomer";
import ViewProject from "../components/projects/ViewProject";

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },

        // customers
        {
            path: '/customers',
            element: <Customers />,
        },
        {
            path: '/customers/add',
            element: <AddCustomer />,
        },
        {
            path: '/customers/edit/:customerId',
            element: <AddCustomer />,
        },
        {
            path: '/customers/:customerId',
            element: <ViewCustomer />,
        },

        // projects
        {
            path: '/customers/:customerId/projects',
            element: <Projects />,
        },
        {
            path: '/customers/:customerId/projects/add',
            element: <AddProject />,
        },
        {
            path: '/customers/:customerId/projects/edit/:projectId',
            element: <AddProject />,
        },
        {
            path: '/customers/:customerId/projects/:projectId',
            element: <ViewProject />,
        },

        // {
        //     path: '*',
        //     element: <NotFound404 />
        // }
    ]);
}