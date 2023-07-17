import {Project} from "../../types/Project";
import {Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router";

interface ProjectsCardProps {
    projects: Project[];
}
const ProjectsCard = ({ projects }: ProjectsCardProps) => {
    const navigate = useNavigate();

    const addProject = () => {
        navigate('projects/add');
    }

    const emptyProjects = () => {
        return (
            <Typography variant="h6" align="left" sx={{ mb: 4 }} >
                No projects found.
            </Typography>
        )
    }

    return (
        <Card>
            <CardContent>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Stack>
                        {
                            projects.length > 0 ? projects.map((project) => {
                                return (
                                    <></>
                                )
                            }): emptyProjects()
                        }
                    </Stack>
                    <Stack sx={{
                        flexDirection: 'column',
                    }}>
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 4
                        }}>
                            <Button variant="contained" color="primary" onClick={() => addProject()}>
                                <Add />
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ProjectsCard;