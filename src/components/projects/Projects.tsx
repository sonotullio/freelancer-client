import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {AccessTime, Delete, DoneOutline, Edit, WorkHistory} from "@mui/icons-material";
import {Project} from "../../types/Project";
import projectApi from "../../api/project-api";

const Projects = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([])

    const addProject = () => {
        navigate('/customers/' + id + '/projects/new');
    }

    const editProject = (id: string) => {
        navigate('/customers/' + id + '/projects/' + id);
    }

    const getStatus = (status: string) => {
        switch (status.toLowerCase()) {
            case 'done':
                return <DoneOutline color="success" />
            default:
                return <WorkHistory color="primary" />
        }
    }

    useEffect(() => {
        projectApi.getAll(id).then((res) => {
            setProjects(res.data);
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
                <Typography variant="h3" sx={{ mb: 4 }} >Projects</Typography>
                <Stack>
                    <Button variant="contained" color="primary" onClick={addProject}>Add Project</Button>
                </Stack>
            </Stack>

            <TableContainer >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Working Hours</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((row, index) => (
                            <TableRow
                                hover
                                key={index}
                                sx={{
                                    'td, th': { border: 0 },
                                    backgroundColor: 'background.default',
                                    '&:hover': { cursor: 'pointer' }
                                }}
                                onClick={() => editProject(row.id!)}
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.customer.name}</TableCell>
                                <TableCell>
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                        {row.status}{getStatus(row.status)}
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                        {row.workingHours}
                                        <AccessTime />
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Projects;