import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import './styledAutoComplete.css'

function DropDownIcon() {
    return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.16797 7L10.0013 13.6667L15.8346 7" stroke="#99A0A8" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
}

export default function StyledAutoComplete({ error, helperText, placeholder, required, ...props }) {

    return (
        <div>
            {props.label &&
                <Typography fontSize='12px' fontWeight={400} lineHeight='14px' marginBottom={'6px'} marginLeft='1px' color={'#212121'}>
                    {props.label}
                </Typography>}
            <Autocomplete
                className="styled-autocomplete"
                popupIcon={<DropDownIcon />}
                clearIcon={""}
                noOptionsText="No matching result found"
                renderInput={(params) =>
                    <FormControl component="fieldset" fullWidth
                    >
                        <TextField
                            required={required || false}
                            error={error || false}
                            helperText={helperText || ""}
                            sx={{
                                height: "44px",
                                input: {
                                    "&::placeholder": {
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        color: '#99A0A8 !important',
                                        opacity: 1
                                    },
                                },
                                paddingRight: "10px",
                                '& .MuiOutlinedInput-root': {
                                    minHeight: "44px",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: params.inputProps.value === "" ? "#99A0A8" : "#212121",
                                    borderRadius: '8px',
                                }
                            }}
                            {...params} placeholder={placeholder} />
                    </FormControl>
                }
                {...props}
            />
        </div>
    )
}