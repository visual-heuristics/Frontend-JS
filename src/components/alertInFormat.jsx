import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

/**
 * Display Alert in MUI format
 * @param {Boolean} open: if Alert box is displayed or not
 * @param {function} reset: reset open value in parent component
 * @param {*} props: other props for MIU Alert
 * @returns Alert message in MUI format
 */
export default function Alert(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.reset();
  };

  return (
    <Snackbar
      open={props.open}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        {...props}
      />
    </Snackbar>
  );
}
