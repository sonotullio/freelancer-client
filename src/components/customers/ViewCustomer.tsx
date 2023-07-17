import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import customerApi from "../../api/customer-api";
import {Customer} from "../../types/Customer";
import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {Project} from "../../types/Project";
import projectApi from "../../api/project-api";
import RecentProjects from "../../components/home/RecentProjects";
import DeleteCustomer from "../../components/customers/DeleteCustomer";

const ViewCustomer = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>({} as Customer);
    const [projects, setProjects] = useState<Project[]>([]);

    const edit = () => {
        navigate('/customers/edit/' + customerId);
    }

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const remove = () => {
        setOpenDeleteModal(true);
    };

    useEffect(() => {
        if (customerId) {
            customerApi.get(customerId).then((res) => {
                setCustomer(res.data);
                projectApi.getAll(res.data.id).then((res) => {
                    setProjects(res.data);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [customerId]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 4,
            p: 8
        }}
        >
            <Stack>
                <Typography variant="h3" align="left" sx={{ mb: 4 }} >{customer.name}</Typography>
                <Card>
                    <CardContent>
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                            gap: 4
                        }}>
                            <Button variant="contained" color="primary" onClick={() => edit()}>
                                <Edit />
                            </Button>
                            <Button variant="contained" color="error" onClick={() => remove()}>
                                <Delete />
                            </Button>
                        </Stack>
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}>
                            <Stack sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 12
                            }}>
                                <Stack sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">E-mail: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Name: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Surname: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Phone: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Address: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Fiscal Code: </Typography>
                                </Stack>
                                <Stack>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{customer.email}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{customer.name}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{customer.surname}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{customer.phone}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{customer.address}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{customer.fiscalCode}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>

            <Stack>
                <Typography variant="h3" align="left" sx={{ mb: 4 }} >Projects</Typography>
                <RecentProjects projects={projects} />
            </Stack>

            <DeleteCustomer open={openDeleteModal} setOpen={setOpenDeleteModal} customer={customer} />
        </Box>
    );
}

export default ViewCustomer;