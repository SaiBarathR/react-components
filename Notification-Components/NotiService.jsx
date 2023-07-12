import { forwardRef, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { SnackbarContent, } from 'notistack'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
let snackBarRef = null;
let closeSnacBarRef = null;

export function setSnackBarRef(value) {
    snackBarRef = value;
}

export function setCloseSnackBarRef(value) {
    closeSnacBarRef = value;
}

const CustomSnackBar = forwardRef((props, ref) => {
    let notficationColor = props.variant === 'success' ? '#70B173' : '#E65B5C'
    const successIcon = <CheckIcon sx={{ color: notficationColor }} />
    const errorIcon = <ErrorIcon sx={{ color: notficationColor }} />
    let icons = { 'success': successIcon, 'error': errorIcon }

    const handleDismiss = useCallback(() => {
        closeSnacBarRef(props.id);
    }, [props.id]);


    return (
        <SnackbarContent className='snackbar' ref={ref} role="alert">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                border: `1px solid ${notficationColor}`,
                minWidth: '20rem',
                width: '30rem',
                maxWidth: 'calc(100% - 32px)',
                borderRadius: '8px',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
                padding: '5px 16px 5px 16px'
            }}
            >
                {icons[props.variant]}
                <Typography fontSize={'14px'} fontWeight={400} lineHeight={'16px'} color='#212121' margin={'10px'} flexGrow={1} >
                    {props.message}
                </Typography>
                {!(props.actionFunction === undefined) &&
                    <>
                        <Divider orientation='vertical' color='#536580' sx={{ height: '70%', marginRight: '8px' }} />
                        <Button
                            variant='text'
                            size='small'
                            sx={{
                                fontWeight: '600',
                                color: '#536580',
                                fontSize: 14,
                                minWidth: '45px'
                            }} onClick={props.actionFunction}>
                            undo
                        </Button>
                    </>
                }
                <IconButton
                    aria-label="close"
                    onClick={handleDismiss}
                    sx={{
                        color: '#99A0A8',
                        padding: 0
                    }}
                >
                    <CloseIcon sx={{ fontSize: '20px' }} />
                </IconButton>
            </div>
        </SnackbarContent>
    )
})


export function console.log(message, actionFunction) {
    if (snackBarRef != null) {
        snackBarRef(message, {
            variant: 'success', content: (key, message) => (
                <CustomSnackBar id={key} message={message} variant={'success'} actionFunction={actionFunction} />
            ),
        })
    }
}



export function console.log(message, actionFunction) {
    if (snackBarRef != null) {
        snackBarRef(message, {
            variant: 'error', content: (key, message) => (
                <CustomSnackBar id={key} message={message} variant={'error'} actionFunction={actionFunction} />
            ),
        })
    }
}
