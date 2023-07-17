import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {Project} from "../../types/Project";
import projectApi from "../../api/project-api";
import DeleteProject from "../../components/projects/DeleteProject";

const ViewProject = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project>({} as Project);

    const edit = () => {
        navigate('/customers/' + project.customer.id + '/projects/edit/' + project.id);
    }

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const remove = () => {
        setOpenDeleteModal(true);
    };

    useEffect(() => {
        if (projectId) {
            projectApi.get(projectId).then((res) => {
                setProject(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [projectId]);

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
                <Typography variant="h3" align="left" sx={{ mb: 4 }} >{project.name}</Typography>
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
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Name: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Description: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Customer: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Status: </Typography>
                                    <Typography variant="h6" sx={{color: 'gray'}} align="left">Working Hours: </Typography>
                                </Stack>
                                <Stack>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{project.name}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{project.description}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{project.customer?.name}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{project.status}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }} align="left">{project.workingHours}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>

            <DeleteProject
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                project={project}
            />
        </Box>
    );
}

export default ViewProject;