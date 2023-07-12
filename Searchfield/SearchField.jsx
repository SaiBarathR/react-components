import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

function SearchIcon() {
    return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.66667 13.3333C11.244 13.3333 13.3333 11.244 13.3333 8.66667C13.3333 6.08934 11.244 4 8.66667 4C6.08934 4 4 6.08934 4 8.66667C4 11.244 6.08934 13.3333 8.66667 13.3333Z" stroke="#99A0A8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.123 15.3125L12.1484 12.3379" stroke="#99A0A8" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
}

export function SearchField({ onChange,..props }) {
    return (
        <TextField className="search-bar-text-field"
            InputProps={{
                endAdornment: (
                    <IconButton className="search-icon">
                        <SearchIcon />
                    </IconButton>
                )
            }}
            onChange={onChange}
            fullWidth
            type={"search"}
            placeholder={'Search'}
            {...props}
        />
    )
}