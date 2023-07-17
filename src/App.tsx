import './App.css'
import Sidebar from "./components/Sidebar";
import {Box, createTheme, ThemeProvider} from "@mui/material";
import Routes from "./routes/Routes";
import {useState} from "react";
import {SignIn} from "./components/SignIn";
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogin = (token: any) => {
        localStorage.setItem("token", JSON.stringify(token));
        setToken(token);
    }

    return (
        <Box id="vieport" display="flex" flexDirection="row" width="100vw" height="100vh">
            <GoogleOAuthProvider
                clientId={`${import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}`}
            >
                {
                    token ?
                        <>
                            <Sidebar/>
                            <Routes />
                        </>
                    :
                        <SignIn handleLogin={handleLogin} />
                }
            </GoogleOAuthProvider>
        </Box>
    )
}

export default App
