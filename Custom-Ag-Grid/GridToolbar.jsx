import React, { useCallback, useMemo, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Box, styled, InputBase, Button, Grid, Menu, MenuItem, Badge, IconButton, Divider, FormGroup, FormControlLabel } from "@mui/material";
import { downloadData, getColumnState, setColumnState, setFilterColumn, setFilterType } from "./GridUtil";
import Checkbox from "../../../Checkbox/Checkbox";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DropzoneAreaBase } from "mui-file-dropzone";

export function CustomizedCheckbox(props) {
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

export default function Checkbox({ id, checked, label, onChange, item, group }) {
    const handleChange = (data) => {
        onChange(data);
    };
    return (
        <div className="custom-checkbox">
            <input
                type="checkbox"
                id={group ? group + id : id}
                checked={checked}
                onChange={(e) => {
                    handleChange({
                        target: {
                            value: { ...item, id, label, group },
                            checked: e.target.checked
                        }
                    });
                }}
            />
            <label htmlFor={group ? group + id : id}>{label}</label>
        </div>
    );
}

let uploadedFiles = [];

const Search = styled("div")(({ theme }) => ({
    borderRadius: "8px",
    border: "1px solid rgb(153, 160, 168, 0.4)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#99A0A8",
    "& .MuiInputBase-input": {
        fontSize: '12px',
        height: '30px',
    },
}));

export function CustomImport(importProps) {

    const [bulkMenuAnchor, setBulkMenuAnchor] = useState(null);
    const bulkMenuOpen = Boolean(bulkMenuAnchor);
    const anchorRef = useRef();

    function handleChangeUploadedFiles() {
        if (uploadedFiles.length > 0) {
            const formData = new FormData();
            formData.append("file", uploadedFiles[0].file, importProps.childImportProps.importProps.fileName);
            try {
                importProps.childImportProps.importProps.importFunction(formData).then((resp) => {
                    if (resp.code === 200) {
                        console.log(resp.responseMessage)
                        importProps.childImportProps.refreshGrid()
                    }
                    else {
                        console.log(resp.responseMessage)
                    }
                }).catch((e) => {
                    console.log("File Import is UnsuccessFull")
                })
            }
            catch (e) {
                console.log("Cannot call Api File upload is UnsuccessFull")
            }
            closeBulkMenu();
        }
        else {
            console.log("No file is Selected for upload")
        }
    }

    const onClickBulkImport = (event) => {
        setBulkMenuAnchor(event.currentTarget);
    };

    const closeBulkMenu = () => {
        setBulkMenuAnchor(null);
        uploadedFiles = [];
        setFileObjsUploaded([]);
        setUpload(false);
    };

    function updateUploadedNumber(data) {
        uploadedFiles = data
    }

    const [fileUploaded, setUpload] = useState(false)
    const [fileObjsUploaded, setFileObjsUploaded] = useState(uploadedFiles.length > 0 ? uploadedFiles : [])

    function checkVariant(message, variant) {
        if (variant === "success") {
            console.log(`${(variant[0].toUpperCase() + variant.slice(1))}: ${message}`);
            setUpload(true)
        }
        else if (variant === "error") {
            console.log(`${(variant[0].toUpperCase() + variant.slice(1))}: ${message}`);
        }
        else {
            console.log(`${(variant[0].toUpperCase() + variant.slice(1))}: ${message}`);
            setUpload(false)
        }
    }

    const CloudUploadOutlinedIcon = () => {
        return (<img className="block-group-upload-file-image"
            src={`${process.env.PUBLIC_URL}/icons/upload_file.svg`}
            alt="upload"
        ></img>)
    };

    function SuccessIcon() {
        return (
            <IconButton sx={{ width: "200px", marginTop: "20px" }}>
                <CheckCircleIcon sx={{
                    color: "#3DABF8",
                    width: "200px"
                }} />
            </IconButton>
        )
    }

    return (
        <div>
            <Button
                id="uploadButton"
                sx={{
                    color: "#536580",
                    fontSize: '14px',
                    lineHeight: '16px',
                    fontWeight: '400',
                    marginRight: "5px"
                }}
                onClick={onClickBulkImport}
                ref={anchorRef}
                className='headerItem' >
                <img style={{ marginRight: '8px' }}
                    src={`${process.env.PUBLIC_URL}/icons/bulk_import.svg`}
                    alt="import"
                ></img>
                {importProps.childImportProps.importProps ? importProps.childImportProps.importProps.label : 'Bulk Import'}
            </Button>
            <div ref={anchorRef}>
                <Menu anchorEl={bulkMenuAnchor}
                    open={bulkMenuOpen} onClose={closeBulkMenu} sx={{
                        "& .MuiPaper-root": {
                            backgroundColor: "#FFFFFF",
                        },
                        "& .MuiMenu-paper": {
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.04)",
                            border: "0.0625rem solid #E6E5E6",
                            borderRadius: "12px",
                            marginLeft: importProps?.childImportProps?.marginLeft || "-20.0625rem",
                            marginTop: "4px",
                            transform: "matrix(1, 0, 0, -1, 0, 0)"
                        },
                    }}>

                    <div style={{ width: '490px', padding: '15px' }}>
                        <div style={{
                            display: "flex", alignItems: "center", marginBottom: '20px',
                        }}><Typography sx={{
                            fontSize: "18px",
                            fontWeight: 400,
                            flexGrow: 1,
                            alignSelf: "center"
                        }}>
                                {importProps.childImportProps.importProps ? importProps.childImportProps.importProps.label : 'Bulk Import'}                            </Typography>
                            <IconButton
                                aria-label="close"
                                onClick={closeBulkMenu}
                                sx={{
                                    color: '#99A0A8',
                                    alignSelf: "center"
                                }}
                            >
                                <img src={`${process.env.PUBLIC_URL}/icons/close.svg`} alt='x' ></img>
                            </IconButton>
                        </div>

                        <DropzoneAreaBase
                            Icon={fileUploaded ? SuccessIcon : CloudUploadOutlinedIcon}
                            dropzoneParagraphClass="dropzone-text"
                            dropzoneClass="drop-zone-area"
                            previewGridProps={{
                                item: {
                                    position: 'absolute',
                                    display: 'flex',
                                    overflow: "hidden",
                                    //flexWrap: "wrap",
                                    alignItems: 'end',
                                    height: '40px',
                                },
                                container: { spacing: 1, direction: 'row' }
                            }}
                            dropzoneText={fileUploaded ? "" : "Drag and Drop the file to upload OR Select File "}
                            acceptedFiles={['application/vnd.ms-excel']}
                            onAdd={(files) => {
                                console.log("onchange", files)
                                if (files?.length > 0) {
                                    setFileObjsUploaded([files[0]])
                                }
                                updateUploadedNumber(files);
                            }}
                            onDrop={(files) => { console.log("ondrop", files) }}
                            onAlert={(message, variant) => { checkVariant(message, variant); }}
                            initialFiles={uploadedFiles}
                            onDelete={(fileObj) => { console.log('Removed File:', fileObj); uploadedFiles = []; setFileObjsUploaded([]) }}
                            fileObjects={fileObjsUploaded}
                            filesLimit={3}
                            useChipsForPreview={true}
                            previewText="Selected files"
                            showAlerts={false}
                        />
                        <div style={{ color: '#212121', fontSize: '14px', fontWeight: '400', paddingTop: '5px' }}>
                            *File should be in XLS format. To download sample
                            <span style={{ color: '#3D8BF8', fontSize: '14px', fontWeight: '400', cursor: 'pointer' }} onClick={() => { importProps.childImportProps.importProps.onClickSampleDownload() }}> Click Here.</span>
                        </div>
                        <div style={{ marginTop: "55px", display: "flex", justifyContent: 'flex-end' }} >
                            <Grid item>
                                <Button onClick={closeBulkMenu} style={{ borderRadius: '8px', fontSize: '0.875rem', fontWeight: '400', marginRight: "15px" }} variant="outlined">
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => handleChangeUploadedFiles()} style={{ backgroundColor: '#3D8BF8', borderRadius: '8px', fontWeight: '400', fontSize: '14px', color: '#FFFFFF' }} variant="contained">
                                    Import
                                </Button>
                            </Grid>
                        </div>
                    </div>
                </Menu>
            </div>
        </div>
    )
}

function GridToolbar(props) {

    let fileName = props.fileName || 'export_' + new Date().toLocaleDateString()
    const [openManageColumnDialog, setOpenManageColumnDialog] = useState(false)
    const [anchorE1, setAnchorE1] = useState(null);
    const anchorRef = useRef();

    const onClickManageColumn = () => {
        setTimeout(() => setAnchorE1(anchorRef?.current), 1);
        setOpenManageColumnDialog(true)
    };

    const onFilterTextBoxChanged = useCallback((e) => {
        props.dataGridRef.api.setQuickFilter(e.target.value);
        props.dataGridRef.api.redrawRows();
    }, [props.dataGridRef])


    if (props.filtertProps) {
        if (props.filtertProps.column) {
            setFilterColumn(props.filtertProps.column)
        }
    }

    const onClickDownload = (type) => {
        if (props.rowCount === 0) {
            return;
        }
        downloadData(type, fileName, props.modifyHeaderName, props.modifyHeaderNameLocation)
        closeDownloadMenu()
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [downloadMenuAnchor, setDownloadMenuAnchor] = React.useState(null);
    const downloadMenuOpen = Boolean(downloadMenuAnchor)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDownloadMenu = (event) => {
        setDownloadMenuAnchor(event.currentTarget);
    };

    const closeDownloadMenu = () => {
        setDownloadMenuAnchor(null);
    };

    const [selecedFilters, SetFilters] = useState((props.doFilterInDataTab) ? "all" : ['all']);
    const [selectedFilterValues, setSelectedFilterValues] = useState([])

    const removeFilter = (item) => {
        if (props.doFilterInDataTab) {
            SetFilters("all");
            setSelectedFilterValues([]);
            externalFilterChanged("all");
            props.getFilterSelected("all");
        } else {
            SetFilters((prevState) =>
                prevState.filter((prevItem) => prevItem !== (typeof (item) === 'object' ? item === null ? item : item.value : item))
            );
            setSelectedFilterValues((prevState) =>
                prevState.filter((prevItem) => prevItem !== (typeof (item) === 'object' ? item === null ? item : item.name : item))
            );
            externalFilterChanged(selecedFilters.filter((prevItem) => prevItem !== (typeof (item) === 'object' ? item === null ? item : item.value : item)))
        }
    };

    const removeAllFilters = () => {
        if (props.doFilterInDataTab) {
            SetFilters('all');
            setSelectedFilterValues([]);
            externalFilterChanged('all');
            props.getFilterSelected("all");
        }
        else {
            SetFilters(['all']);
            setSelectedFilterValues([])
            externalFilterChanged(['all'])
        }
    }

    const selectMenuItem = (value) => {
        let filterListForDisplay = typeof value === "object" ? value[0][0] : value
        let filterValueForAgGrid = typeof value === "object" ? value[0][1] : value
        if (selectedFilterValues.includes(filterListForDisplay)) {
            if (!props.doFilterInDataTab) {
                let index = selectedFilterValues.indexOf(filterListForDisplay)
                selectedFilterValues.splice(index, 1)
            }
        }
        else {
            if (props.doFilterInDataTab) {
                setSelectedFilterValues([]);
            } else {
                setSelectedFilterValues(oldArray => [...oldArray, filterListForDisplay]);
            }
        }
        if (props.doFilterInDataTab) {
            if (selecedFilters === filterValueForAgGrid) {
                removeFilter(filterValueForAgGrid);
                return;
            }
        } else {
            if (selecedFilters.includes(filterValueForAgGrid)) {
                removeFilter(filterValueForAgGrid)
                return;
            }
        }
        if (props.doFilterInDataTab) {
            SetFilters(filterValueForAgGrid);
            props.getFilterSelected(filterValueForAgGrid);
        } else {
            SetFilters(oldArray => [...oldArray, filterValueForAgGrid]);
            externalFilterChanged([...selecedFilters, filterValueForAgGrid])
        }
        // handleClose()
    }

    const externalFilterChanged = (newValue) => {
        // filterType = newValue;
        setFilterType(newValue)
        props.dataGridRef.api.onFilterChanged();
        // setRowCount(gridRef.current.api.getDisplayedRowCount());
        // setPage(1);

    };

    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    paddingLeft: "20px",
                    paddingRight: "30px",
                    borderRadius: "12px 12px 0px 0px",
                    border: "1px solid #E6E5E6",
                    height: "40px",
                    marginTop: "20px",
                    display: 'flex',
                    alignItems: 'center',
                    width: props.width || '100%'
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                    }}
                >
                    {props.title}
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "12px",
                        paddingLeft: "10px",
                        color: "#99A0A8",
                    }}
                    flexGrow={1}
                >
                    Total {props.rowCount}
                </Typography>

                {props.showImport && (
                    <CustomImport childImportProps={props} />
                )}

                {!props.hideSearch && <Search sx={{ display: 'flex', maxHeight: '30px', padding: '8px', marginRight: '25px' }} className='headerItem'>
                    <StyledInputBase
                        placeholder={props.searchPlaceholder}
                        inputProps={{ "aria-label": "search" }}
                        onInput={onFilterTextBoxChanged}
                        id='filter-text-box'

                    />
                    <SearchIcon sx={{
                        color: "#99A0A8",
                        alignSelf: 'center'
                    }} />
                </Search>}

                {props.showManageColumns && (

                    <IconButton aria-label="manage" ref={anchorRef} sx={{ backgroundColor: anchorE1 !== null ? '#E3ECFD' : 'white', borderRadius: '8px' }}
                        onClick={onClickManageColumn}>
                        <img
                            src={`${process.env.PUBLIC_URL}/icons/manage-columns.svg`}
                            alt="manage"
                        />
                    </IconButton>
                )}

                {!props.hideDownload &&
                    <>
                        <IconButton aria-label="download"
                            sx={{ marginLeft: '20px', backgroundColor: downloadMenuAnchor !== null ? '#E3ECFD' : 'white', borderRadius: '8px' }}
                            onClick={handleDownloadMenu}>
                            <img
                                src={`${process.env.PUBLIC_URL}/icons/download.svg`}
                                alt="download"

                            />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={downloadMenuAnchor}
                            open={downloadMenuOpen}
                            onClose={closeDownloadMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem dense key={'excel'} onClick={() => onClickDownload('excel')}>Excel</MenuItem>
                            <MenuItem dense key={'csv'} onClick={() => onClickDownload('csv')}>CSV</MenuItem>
                            <MenuItem dense key={'pdf'} onClick={() => onClickDownload('pdf')}>PDF</MenuItem>
                        </Menu>
                    </>
                }


                {props.showFilters && (
                    <>
                        <IconButton aria-label="filter" sx={{ marginLeft: '20px', backgroundColor: anchorEl !== null ? '#E3ECFD' : 'white', borderRadius: '8px' }}
                            onClick={handleClick}>
                            <Badge
                                // selecedFilters.length - 1 || 0
                                badgeContent={(props.doFilterInDataTab) ? null : selecedFilters.length - 1}
                                color="primary"
                                sx={{
                                    '& .MuiBadge-badge ': {
                                        fontSize: '11px',
                                        fontWeight: 400,
                                        right: '-2px',
                                        top: '-2px',
                                        height: '16px',
                                        width: '16px',
                                        minWidth: '0',
                                        paddingTop: '2px'
                                    }
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/icons/filter-icon.svg`}
                                    alt="filters"

                                ></img>
                            </Badge>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <div style={{ marginLeft: '12px', marginRight: '12px', display: 'flex', alignItems: 'center' }}>
                                <Typography flexGrow={1} fontWeight={500} fontSize='12px' color='#000000'>Filter by</Typography>
                                <Button sx={{ fontSize: '12px', fontWeight: '400', color: '#0052CC' }} onClick={removeAllFilters}>Reset Filters</Button>
                            </div>
                            <Divider />
                            <Typography fontWeight={500} fontSize='12px' color='#6B778C' m={'12px'} marginBottom={'8px'}>{props.filtertProps.column || ""}</Typography>
                            {props.filtertProps && props.filtertProps.options.map((option, index) => {
                                if (typeof option === "object") {
                                    let optionArray = Object.entries((option))
                                    return <MenuItem key={optionArray[0][0]} sx={{ fontSize: '12px', color: '#212121', paddingLeft: '12px', '& .custom-checkbox': { marginBottom: '0px' } }} onClick={() => { selectMenuItem(optionArray) }}>
                                        <Checkbox style={{ marginBottom: '100px' }} checked={selecedFilters.indexOf(optionArray[0][1]) !== -1} /> {optionArray[0][0]}
                                    </MenuItem>
                                }
                                else {
                                    return <MenuItem key={option} sx={{ fontSize: '12px', color: '#212121', paddingLeft: '12px', '& .custom-checkbox': { marginBottom: '0px' } }} onClick={() => { selectMenuItem(option) }}>
                                        <Checkbox style={{ marginBottom: '100px' }} checked={selecedFilters.indexOf(option) !== -1} /> {option}
                                    </MenuItem>
                                }
                            })
                            }
                        </Menu>
                    </>
                )}

            </div>
            {!props.doFilterInDataTab &&
                <>
                    {(props.showFilters && selecedFilters.length > 1) &&
                        <GridFilter filters={typeof (props.filtertProps.options[0]) === 'object' ? (selectedFilterValues.map((item, index) => {
                            return { name: item, value: selecedFilters[index + 1] }
                        })) : selecedFilters} onRemoveFilter={removeFilter} onRemoveAllFilters={removeAllFilters} />
                    }
                </>
            }
            {props.showManageColumns && openManageColumnDialog && <ManageColumns open={openManageColumnDialog} anchorE1={anchorE1} setAnchorE1={setAnchorE1} closeManageColumnFunction={setOpenManageColumnDialog} columnList={getColumnState()} />}
        </>
    )

}

const ManageColumns = (manageColumnsProps) => {

    let cancelButtonStyle = useMemo(
        () => ({
            height: '2.75rem',
            width: "5.6875rem",
            borderRadius: '0.5rem',
            fontSize: "0.875rem",
            fontWeight: 400,
            color: '#3D8BF8',
            border: '0.0625rem solid #008DFF',
            marginRight: '0.9375rem'
        }),
        []
    );

    const handleCloseMenu = () => {
        manageColumnsProps.setAnchorE1(null);
    };

    function closeManagecolumnMenu() {
        manageColumnsProps.closeManageColumnFunction(false)
    }

    function changeCheckBoxValue(isChecked, columnName, index) {
        manageColumnsProps.columnList[index].hide = isChecked
    }

    function hideSelectedColumn() {
        setColumnState(manageColumnsProps.columnList)
        manageColumnsProps.closeManageColumnFunction(false)
    }

    function capitalizeName(columnnName) {
        let temp = columnnName[0].toUpperCase() + columnnName.slice(1)
        columnnName = temp.replace(/([A-Z])/g, ' $1').trim()
        return columnnName;
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
        }}>

            <Menu anchorEl={manageColumnsProps.anchorE1} open={manageColumnsProps.anchorE1}
                sx={{
                    "& .MuiMenu-paper": {
                        backgroundColor: "white",
                        boxShadow: "0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.04)",
                        border: "0.0625rem solid #E6E5E6",
                        borderRadius: "12px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        marginLeft: "-4.2625rem",
                        marginTop: "7px",
                        position: "absolute",
                    },

                }}
                onClose={handleCloseMenu}
            >

                <div style={{
                    display: "flex", alignItems: "center", marginTop: "10px",
                }}><Typography sx={{
                    fontSize: "18px",
                    fontWeight: 400,
                    flexGrow: 1,
                    alignSelf: "center"
                }}>
                        Manage Columns
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={closeManagecolumnMenu}
                        sx={{
                            color: '#99A0A8',
                            alignSelf: "center"
                        }}
                    >
                        <img src={`${process.env.PUBLIC_URL}/icons/close.svg`} alt='x' ></img>
                    </IconButton>
                </div>

                <Box sx={{
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                    marginTop: "16px",

                }}>
                    <Typography sx={{
                        borderBottom: "1px solid #E5E5E5",
                        display: "flex",
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                        paddingLeft: "10px",
                        fontSize: "14px",
                        fontWeight: 400,
                        height: "44px"
                    }}>
                        Available Columns
                    </Typography>
                    <div className="cwScrollbar"
                        style={{
                            overflowY: "scroll",
                            height: "221px",
                        }}>
                        {manageColumnsProps.columnList.map((columnName, index) => (
                            <div key={columnName['colId']} style={{ display: "flex", marginTop: index === 0 ? "8px" : "0px", marginBottom: index === manageColumnsProps.columnList.length - 1 ? "4px" : "0px" }}>
                                <IconButton sx={{
                                    paddingLeft: "15px"
                                }}><img
                                    src={`${process.env.PUBLIC_URL}/icons/dragDropImage.svg`}
                                    alt="ClickToDrag"
                                ></img></IconButton>
                                <FormGroup sx={{ paddingLeft: "6px" }}>
                                    <FormControlLabel sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            color: '#212121',
                                            width: '300px',
                                            paddingLeft: "2px"
                                        }
                                    }}
                                        control={
                                            <CustomizedCheckbox
                                                defaultChecked={manageColumnsProps.columnList[index].hide}
                                                onChange={(event) => { changeCheckBoxValue(event.target.checked, columnName['colId'], index) }}>
                                            </CustomizedCheckbox>
                                        }
                                        label={capitalizeName(columnName['colId'])} />
                                </FormGroup>
                            </div>
                        ))
                        }
                    </div>
                </Box>
                <FormGroup sx={{ marginTop: "8px" }}>
                    <FormControlLabel sx={{
                        '& .MuiTypography-root': {
                            fontSize: "14px",
                            fontWeight: "400px",
                            color: '#212121',
                        }
                    }}
                        control={
                            <CustomizedCheckbox
                                onChange={(event) => { changeCheckBoxValue(event.target.checked) }}
                            ></CustomizedCheckbox>
                        }
                        label="Save as Preset" />
                </FormGroup>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: "end", marginBottom: '10px', marginTop: "10px" }}>
                    <Button
                        sx={cancelButtonStyle}
                        onClick={closeManagecolumnMenu}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: '0.5rem', backgroundColor: '#3D8BF8', fontWeight: 400,
                            fontSize: "14px"
                        }}
                        onClick={hideSelectedColumn}
                    >
                        Apply
                    </Button>
                </div>
            </Menu >

        </div >
    )

}
const GridFilter = (props) => {

    const removeAll = () => {
        props.onRemoveAllFilters()
    }

    const handleDelete = (item) => {
        props.onRemoveFilter(item);
    }
    return (
        <div
            style={{
                backgroundColor: "white",
                paddingLeft: "20px",
                paddingRight: "30px",
                // borderRadius: "12px 12px 0px 0px",
                border: "1px solid #E6E5E6",
                borderTop: 'none',
                height: "40px",
                // marginTop: "20px",
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Typography
                fontWeight={500}
                fontSize={14}
                color='#99A0A8'
                marginRight={'24px'}
            >
                Filter
            </Typography>
            <div style={{ display: 'flex' }}>{props.filters.map((item, index) => {
                return props.filters.length > 0 && item !== "all" && <div style={{
                    backgroundColor: 'rgba(0, 142, 255, 0.1)',
                    border: '1px solid #008EFF',
                    height: '22px',
                    borderRadius: '15px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '12px'

                }}>
                    <Typography fontWeight={400} fontSize='12px' color='#536580' marginRight={'8px'} flexGrow={1}>{typeof (item) === "object" ? item.name : item} </Typography>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleDelete(item)} style={{ cursor: 'pointer' }}>
                        <path d="M7 1L1 7" stroke="#008EFF" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1L7 7" stroke="#008EFF" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            })}

            </div>
            <Button sx={{ color: '#3D8BF8', fontWeight: '400', fontSize: '12px', height: '14px' }} onClick={removeAll}>Remove All</Button>
        </div>
    )

}
export default GridToolbar;