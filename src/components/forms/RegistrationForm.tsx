import {Button, Card, CardContent, Stack, TextField} from "@mui/material";
import {GoogleUser} from "../../types/GoogleUser";
import {UseFormHandleSubmit, UseFormRegister} from "react-hook-form/dist/types/form";
import {SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router";
import registrationApi from "../../api/registration-api";

interface SigninFormProps {
    handleSubmit: UseFormHandleSubmit<any, any>
    register: UseFormRegister<any>;
    setToken: (user: GoogleUser) => void;
}

const RegistrationForm = ({handleSubmit, setToken, register}: SigninFormProps) => {
    const navigate = useNavigate();

    const signin: SubmitHandler<GoogleUser> = (data: GoogleUser) => {
        registrationApi.register(data).then((res) => {
            setToken(res.data);
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Card sx={{minWidth: '33vw'}}>
            <CardContent sx={{p: 4}}>
                <form>
                    <Stack sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2
                    }}>
                        <TextField
                            fullWidth
                            placeholder="Name"
                            {...register("name", {required: true, maxLength: 20})}
                        />
                        <TextField
                            fullWidth
                            placeholder="Email Address"
                            {...register("email", {required: true, maxLength: 20})}
                        />
                        <TextField
                            fullWidth
                            placeholder="Password"
                            {...register("password", {required: true, maxLength: 20})}
                        />
                        <Button fullWidth variant="contained" onClick={handleSubmit((d) => signin(d))}>Sign In</Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}

export default RegistrationForm;