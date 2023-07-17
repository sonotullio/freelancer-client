import {Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import {Home, People, Work} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useState} from "react";
import {GoogleUser} from "../types/GoogleUser";
import userAvatar from "../assets/user-avatar.png";

const Sidebar = () => {
    const [user] = useState<GoogleUser>(JSON.parse(localStorage.getItem('token')!));

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <Box sx={{
            backgroundColor: 'background.paper',
            maxWidth: '270px',
            m: 0,
            p: 8,
        }}>
            <Stack sx={{
                display: 'flex',
                direction: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
            }}>
                <Stack>
                    {
                        user.picture ?
                            <img
                                src={user.picture}
                                alt="userPicture"
                                style={{
                                    width: '150px',
                                    border: '4px solid #1ea6aa',
                                    borderRadius: '50%',
                                    marginBottom: '2rem',
                                }}
                            />
                            :
                            <img
                                src={userAvatar}
                                alt="userAvatar"
                                style={{
                                    width: '150px',
                                    border: '4px solid #1ea6aa',
                                    borderRadius: '50%',
                                    marginBottom: '2rem',
                                }}
                            />
                    }
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 4 }} >Freelancer</Typography>
                    <Stack>
                        <List>
                            <Link to="/">
                                <ListItem disablePadding sx={{
                                    borderRadius: 0.5,
                                }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Home sx={{color: 'white'}} />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <Link to="/customers">
                                <ListItem disablePadding sx={{
                                    borderRadius: 0.5,
                                }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <People sx={{color: 'white'}} />
                                        </ListItemIcon>
                                        <ListItemText primary="Customers" />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        </List>
                    </Stack>
                </Stack>

                <Stack>
                    <Button onClick={() => logout()}>Logout</Button>
                </Stack>
            </Stack>
            <Stack></Stack>
        </Box>
    )
}

export default Sidebar;