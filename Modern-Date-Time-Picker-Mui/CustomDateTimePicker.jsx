import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { DateTimePickerTabs } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import React, { useEffect, useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./customDateTimePickerDateTimePicker.css"

function TimeIcon() {
    return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_6148_6399)">
            <path d="M9.9974 18.3346C14.5998 18.3346 18.3307 14.6037 18.3307 10.0013C18.3307 5.39893 14.5998 1.66797 9.9974 1.66797C5.39502 1.66797 1.66406 5.39893 1.66406 10.0013C1.66406 14.6037 5.39502 18.3346 9.9974 18.3346Z" stroke="#212121" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 5V10L13.3333 11.6667" stroke="#212121" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_6148_6399">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
}

function DateIcon() {
    return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8333 3.33203H4.16667C3.24619 3.33203 2.5 4.07822 2.5 4.9987V16.6654C2.5 17.5858 3.24619 18.332 4.16667 18.332H15.8333C16.7538 18.332 17.5 17.5858 17.5 16.6654V4.9987C17.5 4.07822 16.7538 3.33203 15.8333 3.33203Z" stroke="#212121" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13.332 1.66797V5.0013" stroke="#212121" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.66797 1.66797V5.0013" stroke="#212121" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2.5 8.33203H17.5" stroke="#212121" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}

export default function OzStyledDateTimePicker({ label, error, helperText, ...dateTimePickerProps }) {
    const [currentTabView, setCurrentTabView] = useState("day")

    useEffect(() => {
        if (currentTabView !== "day") {
            setCurrentTabView("day");
        }
    }, [])

    function OzStyledDateTimePickerTabs(props) {
        return (
            <Box sx={{ borderRadius: "8px", border: "0px", width: "auto", minWidth: "30px", }} >
                <DateTimePickerTabs  {...props} />
            </Box>
        )
    }

    function OzStyledActionBar(props) {
        if (props.actions == null || props.actions.length === 0) {
            return null;
        }

        return (
            <div className="styled-action-bar-container">
                <Button className="styled-action-bar-cancel-button" onClick={() => props.onCancel()}>
                    Cancel
                </Button>
                <Button className="styled-action-bar-set-button" onClick={() => props.onAccept()}>
                    Set
                </Button>
            </div >
        );
    }

    function formatDaysHeaders(day) {
        switch (day) {
            case "Su": return "Sun";
            case "Mo": return "Mon";
            case "Tu": return "Tue";
            case "We": return "Wed";
            case "Th": return "Thu";
            case "Fr": return "Fri";
            case "Sa": return "Sat";
            default: return "Oops";
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography className="callback-label-style callback-reshedule-label-header">{label}</Typography>
            <DateTimePicker
                className="styled-date-time-picker reschedule-date-time-picker callback-text-field"
                PopperProps={{
                    className: "styled-date-time-picker-popper-container",
                    sx: {
                        "& .MuiTab-root": {
                            borderRight: currentTabView === "hours" ? "0px" : "1px solid #DBE1E6",
                            borderLeft: currentTabView === "day" ? "0px" : "1px solid #DBE1E6",
                            borderTopRightRadius: currentTabView === "hours" ? "0px" : "8px",
                            borderTopLeftRadius: currentTabView === "day" ? "0px" : "8px",
                        },
                        "& .MuiTab-root.Mui-selected": {
                            borderTopLeftRadius: currentTabView === "hours" ? "0px" : "8px",
                            borderTopRightRadius: currentTabView === "day" ? "0px" : "8px",
                        },
                    }
                }}
                components={{
                    Tabs: OzStyledDateTimePickerTabs,
                    ActionBar: OzStyledActionBar,

                }}
                componentsProps={{
                    tabs: {
                        dateRangeIcon: <div className="date-time-picker-tabs-date-container"> <DateIcon className={currentTabView === "day" ? "notification-icon-selected-border" : ""} /> <label>Date</label> </div>,
                        timeIcon: <div className="date-time-picker-tabs-date-container" > <TimeIcon className={currentTabView === "hours" ? "notification-icon-selected-border" : ""} /> <label>Time</label> </ div>,
                    },
                    actionBar: {
                        actions: ["accept", "cancel"],
                    }
                }}
                dayOfWeekFormatter={formatDaysHeaders}
                disableHighlightToday
                reduceAnimations
                desktopModeMediaQuery="@media screen and (min-width: 350px) and (min-height: 200px)"
                hideTabs={false}
                onClose={() => { setCurrentTabView("day"); }}
                closeOnSelect={false}
                onViewChange={(view) => { if (view === "day" || view === "hours") { setCurrentTabView(view); } }}
                renderInput={(params) => <TextField
                    error={error}
                    helperText={helperText}
                    {...params}
                />
                }
                {...dateTimePickerProps}
            />

        </LocalizationProvider>
    )
}