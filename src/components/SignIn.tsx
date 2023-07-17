import Box from "@mui/material/Box";

import {FormControlLabel, FormGroup, Stack, Switch} from "@mui/material";
import {GoogleUser} from "../types/GoogleUser";
import {useForm} from "react-hook-form";
import {useState} from "react";
import LoginForm from "../components/forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import jwtDecode from "jwt-decode";
import loginApi from "../api/login-api";
import {GoogleLogin} from "@react-oauth/google";

export const SignIn = ({handleLogin}: any) => {
    const [isLogin, setIsLogin] = useState(false);
    const {handleSubmit, register} = useForm<GoogleUser>();

    return (
        <Box id="login" sx={{
            display: "flex",
            flexDirection: "column",
            width: '100%',
            p: 8
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4
            }}>
                <FormGroup>
                    <FormControlLabel control={<Switch value={isLogin} onClick={() => setIsLogin(!isLogin)} />} label={isLogin ? 'LOGIN' : 'REGISTRATION'} />
                </FormGroup>

                {
                    isLogin ?
                        <LoginForm handleSubmit={handleSubmit} setToken={handleLogin} register={register} />
                        :
                        <RegistrationForm handleSubmit={handleSubmit} setToken={handleLogin} register={register} />
                }

                <GoogleLogin
                    onSuccess={
                        (response: any) => {
                            const decodedUser: GoogleUser = jwtDecode(response.credential);

                            loginApi.loginGoogle(decodedUser).then((res) => {
                                handleLogin(res.data);
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    }
                />

            </Stack>
        </Box>
    );
};