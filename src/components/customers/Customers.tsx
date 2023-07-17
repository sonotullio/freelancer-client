import {Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import customerApi from "../../api/customer-api";
import {Customer} from "../../types/Customer";

const Customers = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([])

    const addCustomer = () => {
        navigate('/customers/add');
    }

    const editCustomer = (id: string) => {
        navigate('/customers/edit/' + id);
    }

    const viewCustomer = (id: string) => {
        navigate('/customers/' + id);
    }

    useEffect(() => {
        customerApi.getAll().then((res) => {
            setCustomers(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            p: 8
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography variant="h3" sx={{ mb: 4 }} >Customers</Typography>
                <Stack>
                    <Button variant="contained" color="primary" onClick={addCustomer}>Add Customer</Button>
                </Stack>
            </Stack>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Fiscal Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((row, index) => (
                            <TableRow
                                hover
                                key={index}
                                sx={{
                                    'td, th': { border: 0 },
                                    backgroundColor: 'background.paper',
                                    '&:hover': { cursor: 'pointer' }
                                }}
                                onClick={() => viewCustomer(row.id!)}
                            >
                                <TableCell>
                                    {row.name + ' '} {row.surname}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.fiscalCode}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Customers;