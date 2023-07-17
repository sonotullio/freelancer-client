import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@mui/material";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {useNavigate} from "react-router";
import customerApi from "../../api/customer-api";

const DeleteCustomer = ({open, setOpen, customer}: any) => {
    const navigate = useNavigate();

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        customerApi.remove(customer.id).then((res) => {
            navigate(-1);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogContent>
                    Do you really want to delete <strong>{customer.name}</strong> and all his projects?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleDelete}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteCustomer;