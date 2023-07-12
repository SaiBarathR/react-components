import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { Typography } from '@mui/material';
import { getFilterColumn, getFilterType, isExternalFilterPresent, setGridRef } from './GridUtil';
import GridPagination from './GridPagination';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './dataGrid.css';


function DataGrid(props) {
    const defaultColDef = useMemo(() => ({
        editable: false,
        sortable: true,
        filter: true,
        resizable: false,
        flex: 1,
        minWidth: 140,
        // enableRowGroup: true,
        wrapHeaderText: true,
        // autoHeaderHeight: true,
        // rowGroup: true
        cellClass: "cell-border cell-vertical-align-text-right",
        suppressMenu: true

    }), []);

    const [state, setState] = useState({ columnDefs: [], data: [] });
    const [noOfRows, setRowsCount] = useState({ columnDefs: [], data: [] });
    const gridRef = useRef();

    useEffect(() => {
        setState((state) => ({
            ...state,
            columnDefs: props.columns,
            data: props.data
        }))
        setRowsCount(props.data.length)
    }, [props])

    const containerStyle = useMemo(() => ({ width: props.width || '100%', height: props.height || '30rem' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const getRowClass = useCallback((params) => {
        if (params.node.rowIndex % 2 !== 0) {
            return 'odd-row';
        } else {
            return null;
        }
    }, []);

    const buttonListener = useCallback(e => {
        if (props.rowClickCallback) {
            props.rowClickCallback(e.node);
        }

    }, [props]);

    const onGridReady = useCallback((params) => {
        if (props.setGridRef) {
            props.setGridRef(params)
            // gridRef.current.api.showNoRowsOverlay();
        }
        setGridRef(params)
    }, [props]);


    // const updateGridStyle = useCallback((params) => {
    //     gridRef.current.api.redrawRows();
    // }, []);


    const onModalChange = () => {
        setRowsCount(gridRef.current.api.getDisplayedRowCount())
        gridRef.current.api.redrawRows();

    }
    const filterColumn = getFilterColumn();

    const doesExternalFilterPass = (node) => {
        let filter = getFilterType();

        if (filter.length === 1) {
            return true;
        }
        if (node.data) {
            let isFound = false;
            if (filter.indexOf(node.data[filterColumn]) !== -1) {
                isFound = true;
            }
            return isFound;
        }
        return true;
    }

    // const onRowSelected = (params) => {
    //     if (props.onRowSelected) {
    //         return props.onRowSelected(params);
    //     }
    // }

    const onRowSelected = (params) => {
        if (props.onRowSelected) {
            let selectedRows = params.api.getSelectedRows();
            return props.onRowSelected(selectedRows)
        }
    }

    const updateGridlayout = (params, count) => {
        if (props.gridLayout) {
            if (count < 0) {
                params.api.setDomLayout('autoHeight')
                document.querySelector('#DataGrid').style.height = 'auto';
                document.querySelector('#DataGrid').style.minHeight = 'auto';
            }
        }
        else {
            if (count < 10 && count !== 0) { //count !== 0 added for no overlay disply
                params.api.setDomLayout('autoHeight')
                document.querySelector('#DataGrid').style.height = 'auto';
                document.querySelector('#DataGrid').style.minHeight = 'auto';
            } else {
                params.api.setDomLayout('normal')
                document.querySelector('#DataGrid').style.height = '100%';
            }
        }
    }
    const onDataRendered = (params) => {
        updateGridlayout(params, params.api.getDisplayedRowCount());
    }


    const onPaginationChanged = (params) => {
        let currentPage = params.api.paginationGetCurrentPage();
        let pageSize = params.api.paginationGetPageSize();
        // let totalPages = params.api.paginationGetTotalPages();
        const totalResults = params.api.paginationGetRowCount()
        // if (currentPage === (totalPages - 1)) {
        const startResult = currentPage * pageSize + 1;
        const endResult = Math.min(startResult + pageSize - 1, totalResults);
        let rows = endResult - startResult + 1;
        updateGridlayout(params, rows);
    }
    const NODataComponent = (props) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: '160px', width: '160px', backgroundColor: '#EAECF0', borderRadius: '50%' }}>
                    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z" fill="#EAECF0" />
                        <path d="M128 160H32V56.5335C36.5248 56.5284 40.8628 54.7287 44.0623 51.5292C47.2619 48.3296 49.0616 43.9916 49.0667 39.4668H110.933C110.929 41.7083 111.368 43.9284 112.227 45.9988C113.086 48.0692 114.347 49.9488 115.937 51.5286C117.517 53.1192 119.397 54.3805 121.467 55.2396C123.538 56.0987 125.758 56.5384 128 56.5335V160Z" fill="white" />
                        <path d="M80.0004 108.8C94.1389 108.8 105.6 97.3381 105.6 83.1996C105.6 69.0611 94.1389 57.5996 80.0004 57.5996C65.8619 57.5996 54.4004 69.0611 54.4004 83.1996C54.4004 97.3381 65.8619 108.8 80.0004 108.8Z" fill="#98A2B3" />
                        <path d="M92.0677 74.1492L83.0168 83.2002L92.0677 92.2512L89.0507 95.2682L79.9998 86.2172L70.9488 95.2682L67.9318 92.2512L76.9828 83.2002L67.9318 74.1492L70.9488 71.1322L79.9998 80.1832L89.0507 71.1322L92.0677 74.1492Z" fill="white" />
                        <path d="M93.8669 115.2H66.1336C64.3663 115.2 62.9336 116.633 62.9336 118.4C62.9336 120.168 64.3663 121.6 66.1336 121.6H93.8669C95.6342 121.6 97.0669 120.168 97.0669 118.4C97.0669 116.633 95.6342 115.2 93.8669 115.2Z" fill="#EAECF0" />
                        <path d="M103.467 128H56.534C54.7667 128 53.334 129.433 53.334 131.2C53.334 132.967 54.7667 134.4 56.534 134.4H103.467C105.235 134.4 106.667 132.967 106.667 131.2C106.667 129.433 105.235 128 103.467 128Z" fill="#EAECF0" />
                    </svg>

                </div>
                <Typography fontWeight={600} fontSize='24px' color='#212121' mt={'16px'} >{props.noRowsMessageFunc()}</Typography>
            </div>
        )
    }
    const noRowsOverlayComponent = useMemo(() => {
        return NODataComponent
    }, []);

    const noRowsOverlayComponentParams = useMemo(() => {
        return {
            noRowsMessageFunc: () => 'No data to display',
        };
    }, []);

    return (
        <div style={containerStyle}>
            <Typography>{props.title}</Typography>
            <div className="ag-theme-alpine" id='DataGrid' style={gridStyle}>
                <AgGridReact
                    ref={gridRef}
                    defaultColDef={defaultColDef}
                    columnDefs={state.columnDefs}
                    rowData={state.data}
                    animateRows={true}
                    pagination={true}
                    rowHeight={38}
                    // paginationPageSize={10}
                    paginationPageSize={Number((props?.doPagination || props?.name === "ResetCampaign" || props?.name === "AdminForm") ? 10 : (localStorage.getItem("ps") ? localStorage.getItem("ps") : 10))}
                    rowSelection='multiple'
                    onRowDoubleClicked={buttonListener}
                    suppressRowClickSelection={true}
                    getRowClass={getRowClass}
                    suppressPaginationPanel={true}
                    onGridReady={onGridReady}
                    headerHeight={39}
                    // onSortChanged={updateGridStyle}
                    onModelUpdated={onModalChange}
                    isExternalFilterPresent={isExternalFilterPresent}
                    doesExternalFilterPass={doesExternalFilterPass}
                    // onRowSelected={onRowSelected}
                    domLayout='normal'
                    onSelectionChanged={onRowSelected}
                    onFirstDataRendered={onDataRendered}
                    onPaginationChanged={onPaginationChanged}
                    noRowsOverlayComponent={noRowsOverlayComponent}
                    noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                // suppressNoRowsOverlay={true}
                // onFilterChanged={updateGridStyle}
                // autoGroupColumnDef={autoGroupColumnDef}
                // rowGroupPanelShow="always"
                // enableRangeSelection="true"
                // groupSelectsChildren="true"
                // suppressRowClickSelection="true"
                // toolPanel='columns'
                // sideBar={true}

                // enableCharts={true}
                // enableRangeSelection={true}
                />
            </div>
            <GridPagination
                name={props?.name}
                gridRef={gridRef}
                rcount={noOfRows}
                doPagination={props.doPagination}
                totalData={props.totalData}
                updateGridPage={props.pageNumberClicked}
                updateGridPageSize={props.pageSizeClicked}
            />
        </div >
    )
}


export default DataGrid;