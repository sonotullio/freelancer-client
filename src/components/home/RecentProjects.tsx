import {Project} from "../../types/Project";
import {
    Button,
    Card,
    CardContent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {Add} from "@mui/icons-material";

interface RecentProjectsProps {
    projects: Project[]
}

const RecentProjects = ({ projects }: RecentProjectsProps) => {
    const { customerId } = useParams();
    const navigate = useNavigate();

    const addProject = () => {
        navigate('/customers/' + customerId + '/projects/add');
    }

    const viewProject = (row: Project) => {
        navigate('/customers/' + row.customer.id + '/projects/' + row.id);
    }

    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            <Card>
                <CardContent>
                    {
                        customerId &&
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                            mb: 4
                        }}>
                            <Button variant="contained" color="primary" onClick={() => addProject()}>
                                <Add />
                            </Button>
                        </Stack>
                    }
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Working Hours</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((row, index) => (
                                    <TableRow
                                        hover
                                        key={index}
                                        sx={{
                                            'td, th': { border: 0 },
                                            backgroundColor: 'background.paper',
                                            '&:hover': { cursor: 'pointer' }
                                        }}
                                        onClick={() => viewProject(row)}
                                    >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">{row.customer.name}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                        <TableCell align="right">{row.workingHours}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Stack>
    )
}

export default RecentProjects;