import {Box, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Customer} from "../../types/Customer";
import {Project} from "../../types/Project";
import customerApi from "../../api/customer-api";
import projectApi from "../../api/project-api";
import AppCard from "../common/Card";
import RecentProjects from "../../components/home/RecentProjects";

const Home = () => {
    const [hours, setHours] = useState(0);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        customerApi.getAll().then((res) => {
            setCustomers(res.data);
        });
        projectApi.getAll().then((res) => {
            setProjects(res.data);
            let totalHours = 0;
            res.data.map((project) => {
               totalHours += project.workingHours;
            });
            setHours(totalHours);
        });
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            p: 8
        }}>
            <Typography variant="h3" sx={{ mb: 4 }} align="left">Home</Typography>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4
            }}>
                <AppCard title="Total Customers" value={customers.length} />
                <AppCard title="Total Projects" value={projects.length} />
                <AppCard title="Total Sales" value="$35,078" />
                <AppCard title="Total Working Hours" value={hours} />
            </Stack>

            <Typography variant="h5" sx={{ mt: 8, mb:2 }} align="left">Recent Projects</Typography>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
            }}>
                <RecentProjects projects={projects} />
            </Stack>
        </Box>
    )
}

export default Home;