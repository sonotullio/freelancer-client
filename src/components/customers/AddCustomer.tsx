import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {Customer} from "../../types/Customer";
import {useNavigate, useParams} from "react-router";
import customerApi from "../../api/customer-api";
import Form from "../common/Form";
import {useEffect, useState} from "react";

const AddCustomer = () => {
    const {customerId} = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<Customer>({} as Customer);

    const {handleSubmit, register, setValue} = useForm<Customer>();
    const onSubmit: SubmitHandler<Customer> = (data: Customer) => {
        customerApi.create(data).then((res) => {
            navigate('/customers');
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (customerId) {
            customerApi.get(customerId).then((res) => {
                const fields = ['email', 'name', 'surname', 'phone', 'address', 'fiscalCode'];
                // @ts-ignore
                fields.map((field) => setValue(field, res.data[field]));
                setCustomer(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [customerId]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            width: '100%',
            p: 8,
            gap: 4
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {
                    customerId ? <Typography variant="h3" align="left">{customer.name} {customer.surname}</Typography> : <Typography variant="h3" align="left">Add Customer</Typography>
                }

            </Stack>

            <Form handleSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    placeholder="Name"
                    {...register("name", {required: true, maxLength: 20})}
                />
                <TextField
                    fullWidth
                    placeholder="Surname"
                    {...register("surname", {required: true, maxLength: 20})}
                />
                <TextField
                    fullWidth
                    placeholder="Email"
                    {...register("email", {required: true, maxLength: 20})}
                />
                <TextField
                    fullWidth
                    placeholder="Phone"
                    {...register("phone", {required: true, maxLength: 20})}
                />
                <TextField
                    fullWidth
                    placeholder="Address"
                    {...register("address", {required: true, maxLength: 45})}
                />
                <TextField
                    fullWidth
                    placeholder="Fiscal Code"
                    {...register("fiscalCode", {required: true, maxLength: 20})}
                />
            </Form>
        </Box>
    );
}

export default AddCustomer;