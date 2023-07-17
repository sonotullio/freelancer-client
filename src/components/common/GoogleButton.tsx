import {Button} from "@mui/material";
import {Google} from "@mui/icons-material";

const GoogleButton = () => {

    return (
        <Button
            fullWidth
            variant="contained"
        >
            <Google sx={{ mr:2 }} /> Continue with Google
        </Button>
    )
};

export default GoogleButton;