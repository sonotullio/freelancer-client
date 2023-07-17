import {Button, Card, CardContent, Stack, TextField} from "@mui/material";
import {UseFormHandleSubmit, UseFormRegister} from "react-hook-form/dist/types/form";
import {SubmitHandler} from "react-hook-form";
import {GoogleUser} from "../../types/GoogleUser";
import userApi from "../../api/user-api";
import {useNavigate} from "react-router";

interface LoginFormProps {
    handleSubmit: UseFormHandleSubmit<any, any>
    register: UseFormRegister<any>;
    setToken: (user: GoogleUser) => void;
}

const LoginForm = ({handleSubmit, register, setToken}: LoginFormProps) => {
    const navigate = useNavigate();

    const login: SubmitHandler<GoogleUser> = (data: GoogleUser) => {
        userApi.login(data).then((res) => {
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
                            placeholder="Email Address"
                            {...register("email", {required: true, maxLength: 20})}
                        />
                        <TextField
                            fullWidth
                            placeholder="Password"
                            {...register("password", {required: true, maxLength: 20})}
                        />
                        <Button fullWidth variant="contained" onClick={handleSubmit((d: any) => login(d))}>LogIn</Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm;