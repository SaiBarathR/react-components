Import Note: Add the below useEffect in you App.js to hook the snackbar.
const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    setSnackBarRef(enqueueSnackbar);
    setCloseSnackBarRef(closeSnackbar);
  }, [enqueueSnackbar, closeSnackbar]);

This component uses Material UI and Notistack So do install those dependencies.

npm i notistack

npm i @mui/material

