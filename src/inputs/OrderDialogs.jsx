/* eslint-disable react/prop-types */

import PropTypes from 'prop-types'; // Added missing import
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

// Custom styling for the dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

// Function component to display a customized dialog
export default function CustomizedDialogs({ open, address, handleClose }) {
  return (
    <BootstrapDialog
      onClose={handleClose} // Close handler function
      aria-labelledby="customized-dialog-title"
      open={open} // Boolean to control if the dialog is open
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Address Details
        <IconButton
          aria-label="close"
          onClick={handleClose} // Call the close handler when the close icon is clicked
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {address ? ( // Check if address data is available
          <>
            <Typography gutterBottom>
              Address ID: {address.addressID}
            </Typography>
            <Typography gutterBottom>
              Street: {address.street}
            </Typography>
            <Typography gutterBottom>
              City: {address.city}
            </Typography>
            <Typography gutterBottom>
              Province: {address.province}
            </Typography>
            <Typography gutterBottom>
              Zip Code: {address.zipCode}
            </Typography>
            {address.user && ( // Check if user data is available
              <>
                <Typography gutterBottom>
                  User ID: {address.user.userID}
                </Typography>
                <Typography gutterBottom>
                  First Name: {address.user.firstName}
                </Typography>
                <Typography gutterBottom>
                  Last Name: {address.user.lastName}
                </Typography>
                <Typography gutterBottom>
                  Email: {address.user.email}
                </Typography>
              </>
            )}
          </>
        ) : (
          <Typography gutterBottom>Loading...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

// Prop types validation
CustomizedDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  address: PropTypes.shape({
    addressID: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    zipCode: PropTypes.string,
    /* user: PropTypes.shape({
      userID: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }), */
  }),
  handleClose: PropTypes.func.isRequired,
};
