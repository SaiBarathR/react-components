import { useCallback, useEffect, useState, } from "react";
import { Typography, Box, Button, Menu, MenuItem, Pagination, PaginationItem } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import './dataGrid.css';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    pagination: {
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem 1px',
        justifyContent: 'space-between'
    },
    rowsPerPageMenuWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    rowsPerPageMenuButton: {
        border: '1px solid #99A0A8 !important',
        color: 'black !important',
        backgroundColor: 'white !important',
        borderRadius: "4px !important",
        fontSize: '14px !important'
    },
    rowsPerPageMenuButtonIcon: {
        color: '#99A0A8 !important'
    },
    rowsPerPageMenu: {
        borderRadius: '8px'
    },
    rowsPerPageMenuItem: {
        border: 'solid !important',
        borderColor: 'rgb(0,0,0,0.1) !important',
        borderWidth: '1px 0 0 0 !important',
        padding: '0.25rem 1rem !important',
        '&:nth-last-child(1)': {
            border: 'solid !important',
            borderColor: 'rgb(0,0,0,0.1) !important',
            borderWidth: '1px 0 1px 0 !important'
        }
    },
});

const GridPagination = (props) => {

    useEffect(() => {
        setRowCount(props.rcount)
        setNoOfTotalData(props.totalData)
    }, [props])

    const [page, setPage] = useState(1);
    const [noOfRows, setRowCount] = useState(props.rcount);
    const [noOfTotalData, setNoOfTotalData] = useState(props.totalData);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        props.gridRef.current.api.paginationGoToPage(newPage - 1);
        if (props?.doPagination) {
            props.updateGridPage(newPage - 1);
        }
    };

    const onPageSizeChanged = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        if (!props?.doPagination && props?.name !== "ResetCampaign" && props?.name !== "AdminForm") {
            if (event.target.value) {
                localStorage.setItem("ps", event.target.value);
            } else {
                localStorage.setItem("ps", 10);
            }
        }
        setPage(1);
        if (props?.doPagination) {
            props.updateGridPage(0);
        }
        props.gridRef.current.api.paginationGoToPage(0);
        // props.gridRef.current.api.paginationSetPageSize(Number(event.target.value));
        props.gridRef.current.api.paginationSetPageSize(Number(props?.doPagination || props?.name === "ResetCampaign" || props?.name === "AdminForm") ? event.target.value : localStorage.getItem("ps"));
        if (props?.doPagination) {
            // props.updateGridPageSize(Number(event.target.value));
            props.updateGridPageSize(Number(props?.doPagination || props?.name === "ResetCampaign" || props?.name === "AdminForm") ? event.target.value : localStorage.getItem("ps"));
        }
        setAnchorEl(null);
    }, []);

    const handleRowsPerPageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseRowsPerPageMenu = () => {
        setAnchorEl(null);
    };

    // const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState(Number((props?.doPagination || props?.name === "ResetCampaign" || props?.name === "AdminForm") ? 10 : (localStorage.getItem("ps") ? localStorage.getItem("ps") : 10)));

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const displayRowsPerPageMenu = Boolean(anchorEl);

    const PaginationRenderIcon = (props) => {

        const Prev = () => {
            return (
                props.item.disabled ? <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0.582031L1 6.58203L7 12.582" stroke="#7A7A7A" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                    : <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0.582031L1 6.58203L7 12.582" stroke="#3D8BF8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

            )
        }

        const Next = () => {
            return (
                props.item.disabled ? <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12.582L7 6.58203L1 0.582031" stroke="#7A7A7A" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                    : <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12.582L7 6.58203L1 0.582031" stroke="#3D8BF8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

            )
        }

        return (
            <PaginationItem
                components={{ previous: Prev, next: Next }}
                {...props.item}
            />
        )
    }


    return (
        <>
            {((props.doPagination) ? noOfTotalData >= 1 : noOfRows > 10) && (
                <Box className={classes.pagination}>
                    <Box className={classes.rowsPerPageMenuWrapper}>
                        <Button
                            id="rowsPerPageMenuButton"
                            aria-controls={displayRowsPerPageMenu ? 'rowsPerPageMenu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={displayRowsPerPageMenu ? 'true' : undefined}
                            variant="outlined"
                            className={classes.rowsPerPageMenuButton}
                            disableElevation
                            onClick={handleRowsPerPageMenuOpen}
                            endIcon={<KeyboardArrowDownOutlinedIcon className={classes.rowsPerPageMenuButtonIcon} />}
                        >
                            {rowsPerPage}
                        </Button>
                        <Menu
                            elevation={0}
                            open={displayRowsPerPageMenu}
                            id="rowsPerPageMenu"
                            MenuListProps={{
                                'aria-labelledby': 'rowsPerPageMenuButton',
                                className: classes.rowsPerPageMenu
                            }}
                            anchorEl={anchorEl}
                            onClose={handleCloseRowsPerPageMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                            }}
                        >
                            <MenuItem className={classes.rowsPerPageMenuItem} onClick={onPageSizeChanged} value={5} disableRipple>
                                5
                            </MenuItem>
                            <MenuItem className={classes.rowsPerPageMenuItem} onClick={onPageSizeChanged} value={10} disableRipple>
                                10
                            </MenuItem>
                            <MenuItem className={classes.rowsPerPageMenuItem} onClick={onPageSizeChanged} value={15} disableRipple>
                                15
                            </MenuItem>
                            <MenuItem className={classes.rowsPerPageMenuItem} onClick={onPageSizeChanged} value={20} disableRipple>
                                20
                            </MenuItem>
                        </Menu>
                        <Typography color={'#7A7A7A'} fontSize="14px">Rows per page</Typography>
                    </Box>

                    <Pagination
                        sx={{
                            '& .MuiPaginationItem-previousNext': { color: '#3D8BF8', border: 'none', width: '30px !important' },
                            '& .MuiPaginationItem-previousNext.Mui-disabled': { color: '#7A7A7A' },
                            '& .MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-page': { backgroundColor: '#ffff' },
                            '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-Selected': { borderColor: '#3D8BF8', color: '#3D8BF8' },
                        }}
                        // count={Math.ceil(noOfRows / rowsPerPage) || 1}
                        count={((props.doPagination) ? Math.ceil(noOfTotalData / rowsPerPage) : Math.ceil(noOfRows / rowsPerPage)) || 1}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                        onChange={handleChangePage}
                        // siblingCount={1}
                        page={page}
                        // boundaryCount={1}
                        renderItem={(item) => (
                            <PaginationRenderIcon item={item} />
                        )}
                    />
                </Box >
            )}
        </>
    )
}


export default GridPagination