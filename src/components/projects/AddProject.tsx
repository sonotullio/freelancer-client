import Form from "../common/Form";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import projectApi from "../../api/project-api";
import {Project} from "../../types/Project";
import {useEffect, useState} from "react";
import customerApi from "../../api/customer-api";
import {Customer} from "../../types/Customer";

const AddProject = () => {
    const {customerId, projectId} = useParams();
    const navigate = useNavigate();

    const statusOptions = [
        {value: 'done', label: 'Done'},
        {value: 'in_progress', label: 'In Progress'},
    ]

    const [customer, setCustomer] = useState<Customer>({} as Customer);
    const [project, setProject] = useState<Project>({} as Project);
    const [customerOptions, setCustomerOptions] = useState<Customer[]>([]);

    const {handleSubmit, register, setValue} = useForm<Project>();
    const onSubmit: SubmitHandler<Project> = (data: Project) => {
        projectApi.create({...data, customer: customer}).then((res) => {
            navigate(-1);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        customerApi.getAll().then((res) => {
            setCustomerOptions(res.data);
            if (customerId) {
                customerApi.get(customerId).then((res) => {
                    setValue('customer', res.data);
                    setCustomer(res.data);

                    if (projectId) {
                        projectApi.get(projectId).then((res) => {
                            const project: Project = res.data;

                            const fields = ['name', 'description', 'customer', 'status', 'workingHours'];
                            // @ts-ignore
                            fields.forEach(field => setValue(field, project[field]));
                            setProject(project);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [customerId, projectId]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            width: '100%',
            p: 8,
            gap: 4
        }}>
            {
                projectId ? <Typography variant="h3" align="left">Edit Project</Typography> : <Typography variant="h3" align="left">Add Project</Typography>
            }

            <Form handleSubmit={handleSubmit(onSubmit)}>
                <InputLabel>Name</InputLabel>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        {...register("name", {required: true, maxLength: 20})}
                    />
                </FormControl>
                <InputLabel>Description</InputLabel>
                <FormControl fullWidth>
                    <TextField
                        {...register("description", {required: true, maxLength: 20})}
                    />
                </FormControl>
                <InputLabel>Customer</InputLabel>
                <FormControl fullWidth>
                    <Select
                        {...register("customer", {required: true})}
                    >
                        {
                            customerOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <InputLabel>Status</InputLabel>
                <FormControl fullWidth>
                    <Select
                        {...register("status", {required: true})}
                    >
                        {
                            statusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <InputLabel>Working Hours</InputLabel>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        {...register("workingHours", {required: true, maxLength: 20})}
                    />
                </FormControl>
            </Form>
        </Box>
    )
}

export default AddProject;