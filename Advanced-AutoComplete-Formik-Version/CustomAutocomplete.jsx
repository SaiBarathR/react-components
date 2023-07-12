import React, { useMemo, useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { connect, getIn } from "formik";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Popper from "@mui/material/Popper";
import { Chip, Typography, FormHelperText, FormControl, Grid, Box, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';

function CustomizedCheckbox(props) {
    return (
        <Checkbox
            sx={{
                '&:hover': { bgcolor: 'transparent' },
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            inputProps={{ 'aria-label': 'customized-chbx' }}
            {...props}
        />
    );
}

const avatarColor = (alphabet) => {
    var color = { 'A': "#EBADAD", 'B': "#FCC6AA", 'C': "#EAE1CD", 'D': "#FFD993", 'E': "#DDFFA9", 'F': "#9CEDE9", 'G': "#A4A4C9", 'H': "#EBADAD", 'I': "#FCC6AA", 'J': "#CCB091", 'K': "#FFD993", 'L': "#DDFFA9", 'M': "#9CEDE9", 'N': "#FCC6AA", 'O': "#A4A4C9", 'P': "#EBADAD", 'Q': "#FCC6AA", 'R': "#CCB091", 'S': "#FFD993", 'T': "#DDFFA9", 'U': "#9CEDE9", 'V': "#A4A4C9", 'W': "#EBADAD", 'X': "#FCC6AA", 'Y': "#CCB091", 'Z': "#FFD993" }
    return color[alphabet];
}

export const stringAvatar = (name) => {
    let nameparts = name.split(' ');
    if (nameparts.length < 2) {
        nameparts = nameparts[0].split("_");
    }
    let alphabet = nameparts[0][0].toUpperCase();
    return {
        sx: {
            bgcolor: avatarColor(alphabet),
        },
        children:
            (nameparts.length === 1) ?
                nameparts[0][0].toUpperCase() :
                (nameparts[0][0] + nameparts[1][0]).toUpperCase()
    };
};


const DropDownIcon = () => {
    return (
        <div style={{ display: "flex", alignContent: "center", marginTop: "7px", marginRight: "4px", }}>
            <img
                src={`${process.env.PUBLIC_URL}/icons/downArrowDropDown.svg`}
                alt="edit"
            ></img>
        </div>
    )
};

const CustomAutoComplete = connect(
    ({
        Datas,
        placeholder,
        formik,
        name,
        labelHeader,
        optionLabelName,
        mode,
        autocompleteTextFieldWidth,
        showAvatar,
        showCheckBox,
        showAvatarInChip,
        temporaryMode,
        multiple,
        showBottomButton,
        buttonName,
        ...additionalProps
    }) => {

        const [limit, setLimit] = useState(10);
        const listRef = useRef(null);

        const handleScroll = () => {
            const l = limit;
            setLimit(l + 5);
        }

        const handleClose = () => {
            setLimit(10);
        }

        const PopperMy = useMemo(
            () => (props, option) => {
                return (
                    <Popper {...props}
                        sx={{
                            "& .MuiAutocomplete-listbox": {
                                padding: "0px",
                                "& li": {
                                    height: "36px",
                                    padding: '0px',
                                    paddingLeft: (option[optionLabelName] !== "Button") ? '5px' : '0px',
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#FFFFFF !important",
                                    marginLeft: "-1px",
                                    //list item specific styling
                                },
                                "& :hover": {
                                    backgroundColor: "#FFFFFF !important"
                                },
                            },
                            '& .MuiAutocomplete-paper': {
                                marginTop: "0px",
                                marginBottom: "5px",
                                boxShadow: 'none !important',
                                border: "1px solid #E5E5E5",
                                borderRadius: "0px",
                                borderBottom: mode === "Edit" ? '0px' : "1px solid #E5E5E5",
                                borderRight: mode === "Edit" ? '0px' : "1px solid #E5E5E5",
                                borderLeft: mode === "Edit" ? '0px' : "1px solid #E5E5E5",
                                borderTop: mode === "Edit" ? "0px" : "1px solid #E5E5E5",
                                maxHeight: "275px !important",
                                overflow: "hidden !important",
                                //height: mode === "Add" ? "" : "210px",
                                "& .MuiAutocomplete-noOptions": {
                                    fontFamily: 'Roboto',
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#212121"
                                }
                            },
                        }} placement='bottom' />
                );
            },
            [],
        );
        const getTouchedStatus = () => {
            let touched = getIn(formik.touched, name);
            if (touched) {
                if (multiple) {
                    if (touched.length === 0) {
                        return true
                    } else {
                        return touched
                    }
                } else {
                    return touched
                }

            } else {
                return touched
            }
        }
        const error = getIn(formik.errors, name);
        const touch = getTouchedStatus()
        const selected = getIn(formik?.values, name)
        const [tempMode, setTempMode] = useState(temporaryMode ? temporaryMode : "temp")
        const selectAll = selected?.length === Datas?.length
        function getSelected() { return selected };
        const refContainer = useRef();
        const [dimensions, setDimensions] = useState({
            width: 0,
            height: 0
        });
        const [inputValue, setInputValue] = useState("");
        const [oldArray, setOldArray] = useState((selected?.length > 0) ? selected : []);

        const handleResize = () => {
            if (refContainer.current) {
                setDimensions({
                    width: refContainer.current.offsetWidth,
                    height: refContainer.current.offsetHeight,
                });
            }
        }

        const makeNewArray = (oldData: any) => {
            if (oldArray === null || oldArray.length < 1) {
                // console.log("data here ", oldData);
                return oldData;
            } else {
                const newnew = oldArray.concat(oldData);
                const uniqueIds = [];
                const result = newnew.filter(obj => {
                    if (!uniqueIds.includes(obj.id)) {
                        uniqueIds.push(obj.id);
                        return true;
                    }
                    return false;
                })
                return result;
            }
        }

        useEffect(() => {
            if (refContainer.current) {
                setDimensions({
                    width: refContainer.current.offsetWidth,
                    height: refContainer.current.offsetHeight,
                });
            }
            window.addEventListener("resize", handleResize, true);
        }, []);


        function changeMode() {
            if (mode !== "Add") {
                setTempMode("Edit")
            }
            if (additionalProps.onChangeValue) {
                additionalProps.onChangeValue.handleChangeDatasList(additionalProps.onChangeValue.index, selected, additionalProps.onChangeValue.createNewDatasList)
            }
        }

        const listItemStyle = useMemo(
            () => ({
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "16px",
                color: '#212121',
                paddingLeft: "6px"
            }),
            []
        );

        let styleFieldHeader = useMemo(
            () => ({
                display: "flex",
                fontSize: "12px",
                fontWeigth: 400,
                color: '#212121',
                lineHeight: "20px",
                paddingLeft: "5px",
            }),
            []
        );

        return (
            <div>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {labelHeader && <Typography htmlFor={name}
                        fontSize='12px'
                        fontWeight={400}
                        lineHeight='14px'
                        marginBottom={'6px'}
                        marginLeft='1px'
                        color={'#212121'}
                    >
                        {labelHeader}
                    </Typography>}
                    <Box
                        sx={(mode === "Edit" && tempMode === "Edit") ? {
                            border: "1px solid #E5E5E5",
                            borderRadius: "8px",
                            paddingTop: "8px",
                            paddingLeft: "15px",
                            paddingBottom: "8px",
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                        } : {}}
                    >
                        {mode === "Edit" && tempMode === "Edit" && <label
                            sx={mode === "Edit" && tempMode === "Edit" && {
                                color: "#212121",
                                fontWeight: 400,
                                fontSize: "14px",
                                marginLeft: "10px",
                            }}
                        >
                            {(selected?.length < 10) ? ("0" + (selected?.length > 0 ? selected?.length : "")) : selected?.length} Selected...
                        </label>
                        }
                    </Box>
                    <Box
                        sx={(mode === "Edit" && tempMode === "Edit") ? {
                            border: "1px solid #E5E5E5",
                            borderRadius: "8px",
                            paddingTop: "15px",
                            paddingLeft: "15px",
                            paddingBottom: "305px",
                            borderTop: 0,
                            paddingRight: "15px",
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            height: mode === "Add" ? "" : "344px"
                        } : {}}
                    >
                        <Autocomplete
                            ref={refContainer}
                            sx={{
                                '& 	.MuiAutocomplete-listbox': {
                                    scrollbarColor: 'rgb(190, 190, 190) rgb(240, 240, 240)',
                                    scrollbarWidth: 'thin',
                                },
                                "& .MuiAutocomplete - root": {
                                    "& .MuiAutocomplete-noOptions": {
                                        color: "red"
                                    }
                                },
                                //"& .MuiAutocomplete-popupIndicator": { transform: "none" },
                                "& .MuiAutocomplete-popupIndicatorOpen": { transform: "none", marginRight: "0px", padding: "0px", },
                            }}
                            popupIcon={additionalProps.popupIcon || <DropDownIcon />}
                            clearIcon={""}
                            noOptionsText={
                                <>
                                    {/* {(!additionalProps.showBottomButton) ? "No Match Result Found !!" */}
                                    {(!showBottomButton) ? "No Match Result Found !!"
                                        :
                                        <div>
                                            <div>
                                                No Match Result Found !!
                                            </div>
                                            <Button
                                                sx={{ marginLeft: '-9px', marginTop: '10px' }}
                                                onClick={() => { additionalProps.bottomButtonFunction() }}
                                            >
                                                {/* {additionalProps.buttonName} */}
                                                {buttonName}
                                            </Button>
                                        </div>
                                    }
                                </>
                            }
                            autoComplete={true}
                            multiple={multiple}
                            size="small"
                            id={name}
                            options={Datas}
                            value={selected}
                            renderTags={(value) => {
                                return (
                                    (mode === 'Add'
                                        ? selected.map(
                                            (selectedvalues, i) =>
                                            (selectedvalues[optionLabelName] !== "Select All" && selectedvalues[optionLabelName] !== "Button" &&
                                                <div key={i} >
                                                    < Chip
                                                        avatar={showAvatarInChip ? <Avatar
                                                            style={{ width: "24px", height: "24px", fontSize: "14px", color: "#212121", marginLeft: "4px" }}
                                                            {...stringAvatar(selectedvalues[optionLabelName])}>
                                                        </Avatar> : null}
                                                        key={selectedvalues[optionLabelName] + i} label={selectedvalues[optionLabelName]} size="small" sx={{
                                                            backgroundColor: "#F5F5F6", color: "#536580",
                                                            fontSize: "14px", fontWeight: 400, lineHeight: "16px",
                                                            marginTop: "4px", marginBottom: "4px", marginLeft: "4px", display: "flex", alignSelf: "center",
                                                            "& .MuiChip-label": {
                                                                color: '#536580'
                                                            }
                                                        }} />
                                                </div>
                                            )
                                        )
                                        :
                                        (<div style={{
                                            display: "flex",
                                            alignItems: 'center',
                                            alignContent: "center",
                                        }}>
                                            <Typography sx={styleFieldHeader}>
                                                {selected.map(
                                                    (selectedvalues, index) =>
                                                        (index < 3 && ((selectedvalues[optionLabelName] + (((selected.length - 1) > index) ? ", " : ""))))
                                                )}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: "14px",
                                                fontWeight: 400,
                                                color: "#212121",
                                                paddingRight: '5px',
                                                paddingLeft: "5px"
                                            }}>
                                                {(selected.length > 3) ? "..." : ""}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: "14px",
                                                fontWeight: 400,
                                                color: "#99A0A8",
                                            }}>
                                                {(selected.length > 3) ? (("+" + (selected.length - 3))) : ""}
                                            </Typography>
                                        </div>))
                                )
                            }}
                            role="listbox"
                            onChange={(e, value, reason, options) => {
                                if (multiple) {
                                    if (value.find((option) => option.id === 0)) {
                                        const filteredDatas = Datas.filter((value) => value[optionLabelName].includes(inputValue))
                                        const newArray = makeNewArray(filteredDatas);
                                        setOldArray(newArray);

                                        if (selected.length === newArray.length) { //deselect ALL
                                            formik.setFieldValue(name, []);
                                            setOldArray([]);
                                            if (additionalProps.onChangeValue) {
                                                additionalProps.onChangeValue.handleChangeDatasList(additionalProps.onChangeValue.index, [], "removeOption", newArray)
                                            }
                                        }
                                        else {
                                            formik.setFieldValue(name, newArray); //Select ALL
                                            if (additionalProps.onChangeValue) {
                                                additionalProps.onChangeValue.handleChangeDatasList(additionalProps.onChangeValue.index, newArray, additionalProps.onChangeValue.createNewDatasList)
                                            }
                                            //additionalProps.getValueFromAuto(Datas)                                            
                                        }
                                    } else {
                                        if (additionalProps.onChangeValue) {
                                            additionalProps.onChangeValue.handleChangeDatasList(additionalProps.onChangeValue.index, value, additionalProps.onChangeValue.createNewDatasList)
                                        }
                                        formik.setFieldValue(name, value);
                                    }

                                } else {
                                    if (!(value.id === (Datas.length + 1))) {
                                        formik.setFieldValue(name, value);
                                    }
                                }
                                if (reason === "removeOption") {
                                    if (additionalProps.onChangeValue) {
                                        additionalProps.onChangeValue.handleChangeDatasList(additionalProps.onChangeValue.index, [], reason, [options.option])
                                    }
                                }
                            }}
                            disableCloseOnSelect={multiple}
                            getOptionLabel={
                                ((option) => option[optionLabelName])
                            }

                            ListboxProps={{
                                ref: listRef,
                                onScroll: handleScroll,
                                sx: {
                                    maxHeight: "280px",
                                }
                            }}
                            onClose={handleClose}
                            PopperComponent={PopperMy}
                            renderOption={
                                (props, option, { selected }) => {
                                    return (
                                        <div key={option[optionLabelName] + option.id}
                                            onClick={() => {
                                                if (option[optionLabelName] === getSelected()?.name) {
                                                    formik.setFieldValue(name, null);
                                                }
                                            }} style={{ bgcolor: "#FFFFFF", position: option[optionLabelName] === "Button" ? 'fixed' : '', bottom: option[optionLabelName] === "Button" ? '-25px' : '', }} >
                                            <li {...props} style={{ height: option[optionLabelName] === "Button" ? "32px" : "36px", }} key={option[optionLabelName] + option.id}>
                                                {(showCheckBox && (option[optionLabelName] !== "Button")) && <CustomizedCheckbox
                                                    checked={(option["id"] === 0) ? selectAll : selected}
                                                />}
                                                {(showAvatar && (option[optionLabelName] !== "Button")) && (option[optionLabelName] !== "Select All") &&
                                                    <Avatar style={{ width: "24px", height: "24px", fontSize: "14px", color: "#212121", marginLeft: "4px" }} {...stringAvatar(option[optionLabelName])}></Avatar>
                                                }
                                                {option[optionLabelName] === "Button" ?
                                                    <Button sx={{
                                                        fontSize: "14px",
                                                        lineHeight: "16px"
                                                        , color: "#3D8BF8", fontWeight: '400', bgcolor: "#FFFFFF", border: "1px solid #E5E5E5",
                                                        borderTopLeftRadius: "0px", borderTopRightRadius: "0px", marginLeft: "-5px", width: String(dimensions.width) + "px !important", maxWidth: "1000px !important", marginTop: "-3px",
                                                        '&:hover': {
                                                            backgroundColor: '#FFFFFF !important',
                                                        }
                                                    }} onClick={() => { additionalProps.bottomButtonFunction() }}>
                                                        {/* {additionalProps.buttonName} */}
                                                        {buttonName}
                                                    </Button>
                                                    :
                                                    <Typography sx={listItemStyle} >{option[optionLabelName]}</Typography>
                                                }
                                            </li>
                                            {
                                                mode === "Edit" && tempMode === "Edit" && getSelected()?.length > 0 && getSelected()?.length < Datas?.length && props["data-option-index"] === getSelected()?.length &&
                                                <div style={{
                                                    border: "1px solid #E6E5E6",
                                                    height: "5px !important",
                                                    marginLeft: "5px"
                                                }}>
                                                </div>
                                            }
                                        </div>
                                    )
                                }}
                            onInputChange={(e, v) => {
                                // console.log('e', e, "v", v)
                                setInputValue(v);
                            }}
                            renderInput={(params) => (
                                ((tempMode !== 'temp') || (mode === 'Add')) && <div>
                                    <FormControl component="fieldset"
                                        error={touch & Boolean(error) ? true : false}
                                        fullWidth
                                    >
                                        <TextField
                                            onClick={changeMode}
                                            sx={{
                                                minWidth: "322px",
                                                paddingRight: tempMode === "temp" ? "" : "10px",
                                                '& .MuiOutlinedInput-root': {
                                                    minHeight: "44px",
                                                    fontSize: "14px",
                                                    color: params.inputProps.value === "" ? "#99A0A8" : "#212121",
                                                    borderRadius: '8px',
                                                },
                                                '& .MuiAutocomplete-input': {
                                                    display: (tempMode === 'temp') && (mode !== 'Add') ? 'none' : 'block'

                                                },
                                                "& .MuiOutlinedInput-root.Mui-focused": {
                                                    "& > fieldset": mode === "Add" ? {
                                                        borderBottomLeftRadius: "0px", borderBottomRightRadius: '0px', border: "1px solid #E5E5E5"
                                                    } : { border: "1px solid #E5E5E5" },
                                                },
                                                "& .MuiOutlinedInput-root:hover": {
                                                    "& > fieldset": {
                                                        border: "1px solid #E5E5E5"
                                                    }
                                                }
                                            }}
                                            {...params} placeholder={(tempMode !== 'temp') || (mode === 'Add') ? placeholder : ""} />
                                        <FormHelperText>{touch & Boolean(error) ? error : null}</FormHelperText>
                                    </FormControl>
                                </div>
                            )}
                            isOptionEqualToValue={(option, value) => option[optionLabelName] === value[optionLabelName]}
                            filterOptions={(options, params) => {
                                let filtered = createFilterOptions({
                                    matchFrom: 'any',
                                    limit: limit,
                                })(options, params);

                                let selectedFiltered = createFilterOptions({//for the selected list also to be filtered
                                    matchFrom: 'any',
                                    limit: limit,
                                })((selected || []), params);

                                let sortedOptions = filtered
                                let uniqueOptions = filtered
                                if (selected?.length > 0) {
                                    // sortedOptions = [...selected, ...filtered]
                                    sortedOptions = [...selectedFiltered, ...filtered]//for the selected list also to be filtered
                                    uniqueOptions = [...new Map(sortedOptions.map((item) => [item["id"], item])).values()];
                                }
                                filtered = uniqueOptions
                                let newOptions = filtered
                                if (filtered.length > 0) {
                                    if (additionalProps.showselectall) {
                                        newOptions = [{ id: 0, [optionLabelName]: "Select All" }, ...filtered]
                                    }
                                    // if (additionalProps.showBottomButton) {
                                    if (showBottomButton) {
                                        newOptions.push({ id: Datas.length + 1, [optionLabelName]: "Button" })
                                    }
                                }
                                // if (additionalProps.showBottomButton || additionalProps.showselectall) { return newOptions; }
                                if (showBottomButton || additionalProps.showselectall) { return newOptions; }
                                else {
                                    return filtered
                                }
                            }}
                            {...additionalProps}
                        />
                    </Box>
                </Grid>
                {mode !== 'Add' &&
                    (tempMode !== 'Edit') &&
                    <Grid item xs={12}>
                        <TextField
                            onClick={changeMode}
                            sx={{
                                minWidth: "300px",
                                paddingRight: tempMode === "temp" ? "" : "10px",
                                '& .MuiOutlinedInput-root': {
                                    minHeight: "44px",
                                    fontSize: "14px",
                                    //color: params.inputProps.value === "" ? "#99A0A8" : "#212121",
                                    borderRadius: '8px',
                                    height: "44px",
                                    width: autocompleteTextFieldWidth || ""
                                },
                                '& .MuiAutocomplete-input': {
                                    display: (tempMode === 'temp') && (mode !== 'Add') ? 'none' : 'block'
                                },
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": mode === "Add" ? {
                                        borderBottomLeftRadius: "0px", borderBottomRightRadius: '0px', border: "1px solid #E5E5E5"
                                    } : { border: "1px solid #E5E5E5" },
                                },
                                "& .MuiOutlinedInput-root:hover": {
                                    "& > fieldset": {
                                        border: "1px solid #E5E5E5"
                                    }
                                },
                                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                                    textOverflow: "ellipsis"
                                }
                            }}
                            value={selected.map((item) => { return item[optionLabelName] })}
                            placeholder={placeholder} />
                    </Grid>
                }
            </div >
        );
    }
);
export default CustomAutoComplete;
