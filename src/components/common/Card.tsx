import {Card, CardContent, Stack, Typography} from "@mui/material";
import {WorkOutline} from "@mui/icons-material";

const AppCard = ({title, value}: any) => {
    return (
        <>
            <Card sx={{ backgroundColor: 'background.paper', }}>
                <CardContent>
                    <Stack sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 280,
                        gap: 1
                    }}>
                        <Typography color="gray" align="left">{title}</Typography>
                        <Typography align="left"><strong>{value}</strong></Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

export default AppCard;