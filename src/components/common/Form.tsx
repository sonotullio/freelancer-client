import {Box, Button, Card, CardContent, Stack} from "@mui/material";
import {useNavigate} from "react-router";

const Form = ({handleSubmit, children}: any) => {
    const navigate = useNavigate();

    return (
        <Box
            id="addForm"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: '100%',
            }}
        >
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <form onSubmit={handleSubmit}>
                    <Card sx={{minWidth: '33vw'}}>
                        <CardContent sx={{p: 4}}>
                            <Stack sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 2,
                                mb: 4
                            }}>
                                {children}
                            </Stack>
                            <Stack sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2
                            }}>
                                <Button fullWidth variant="contained" color="error" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button fullWidth variant="contained" type="submit">Save</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </form>
            </Stack>
        </Box>
    )
}

export default Form;