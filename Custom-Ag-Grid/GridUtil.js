import printDoc from "./PdfExport/printDoc";
import * as XLSX from 'xlsx/xlsx.mjs';
export let gridRef = null;
export let filter = ['All'];
export let filterColumn = null;
export let rowCount = 0;

export function setGridRef(value) {
    gridRef = value;
}

export function getGridRef() {
    return gridRef;
}


export function setFilterType(value) {
    filter = value;
}


export function getFilterType() {
    return filter;
}

export function resetFilters() {
    return filter === ['All'] && filter === 'all';
}

export function setFilterColumn(value) {
    filterColumn = value;
}


export function getFilterColumn() {
    return filterColumn;
}

export function externalFilterChanged(newValue) {
    // filterType = newValue;
    setFilterType(newValue);
    gridRef.api.onFilterChanged();
    // setRowCount(gridRef.current.api.getDisplayedRowCount());
    // setPage(1);

};

export function isExternalFilterPresent() {
    return filter !== ['All'] && filter !== 'all';
};



export function getRowCount() {
    return rowCount;
}

export function setRowCount(value) {
    rowCount = value;
}

const downloadExcelFile = (params, modifyHeaderName, modifyHeaderNameLocation) => {
    try {
        let rowData = [];
        if (params.onlySelected) {
            rowData = gridRef.api.getSelectedRows()
        } else {
            let colHeaders = gridRef.columnApi.getAllDisplayedColumns().map(col => {
                return col.getColId();
            })
            gridRef.api.forEachNodeAfterFilterAndSort(node => {
                let rowToExport = {}
                colHeaders.forEach((colId) => {
                    let column = gridRef.columnApi.getColumn(colId)
                    let value = gridRef.api.getValue(column, node);
                    rowToExport[colId] = value
                })
                rowData.push(rowToExport)
            }

            );
        }
        if (rowData.length === 0) {
            let colHeaders = {}
            gridRef.columnApi.getAllDisplayedColumns().forEach(col => { colHeaders[col.colDef.headerName] = '' });
            rowData.push(colHeaders)
        }
        const worksheet = XLSX.utils.json_to_sheet(rowData);
        // if (modifyHeaderName) {
        //     worksheet[modifyHeaderNameLocation].v = modifyHeaderName;
        // }
        if (modifyHeaderName && modifyHeaderNameLocation) {
            modifyHeaderNameLocation.forEach((location, index) => {
                worksheet[modifyHeaderNameLocation[index]].v = modifyHeaderName[index];
            })
        }
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, params.fileName + ".xlsx");
    }
    catch (e) {
        console.log("Error while downloading excel file", e)
    }
}

// const downloadGridData = (type, params) => {
//     try {
//         switch (type) {
//             case 'csv':
//                 gridRef.api.exportDataAsCsv(params);
//                 break;
//             case 'excel':
//                 downloadExcelFile(params)
//                 break;
//             case 'xml':
//                 console.log(type, 'in progress')
//                 break;
//             case 'pdf':
//                 printDoc(params, gridRef.api, gridRef.columnApi);
//                 break;
//             default:
//                 console.error('Invalid type', type);
//         }
//     }
//     catch (e) {
//         console.error('Error while downloading selected Data', e)
//     }
// }

const downloadGridData = (type, params, modifyHeaderName, modifyHeaderNameLocation) => {
    try {
        switch (type) {
            case 'csv':
                gridRef.api.exportDataAsCsv(params);
                break;
            case 'excel':
                downloadExcelFile(params, modifyHeaderName, modifyHeaderNameLocation)
                break;
            case 'xml':
                console.log(type, 'in progress')
                break;
            case 'pdf':
                printDoc(params, gridRef.api, gridRef.columnApi);
                break;
            default:
                console.error('Invalid type', type);
        }
    }
    catch (e) {
        console.error('Error while downloading selected Data', e)
    }
}


export const downloadSelectedData = (type, filename) => {
    try {
        let params = { fileName: filename, onlySelected: true };
        downloadGridData(type, params);
    }
    catch (e) {
        console.log('Error while downloading selected Data', e)
    }
}


// export const downloadData = (type, filename) => {
//     try {
//         let params = { fileName: filename };
//         if (gridRef.api.getSelectedRows().length > 0) {
//             params = { fileName: filename, onlySelected: true };
//         }
//         downloadGridData(type, params);
//     }
//     catch (e) {
//         console.log('Error while downloading Data', e)
//     }

// }
export const downloadData = (type, filename, modifyHeaderName, modifyHeaderNameLocation) => {
    try {
        let params = { fileName: filename };
        if (gridRef.api.getSelectedRows().length > 0) {
            params = { fileName: filename, onlySelected: true };
        }
        downloadGridData(type, params, modifyHeaderName, modifyHeaderNameLocation);
    }
    catch (e) {
        console.log('Error while downloading Data', e)
    }

}

export function deselectAllRows() {
    gridRef.api.deselectAll();
}

export function getSelectedNodes() {
    return gridRef.api.getSelectedNodes();
}

export function setSelectedRows(rowData, columnId) {
    if (rowData) {
        rowData.forEach(item => {
            gridRef.api.forEachNode(node => {
                if (item[columnId] === node.data[columnId]) {
                    node.setSelected(true)
                }
            })
        })
    }
}

export function refreshDataGrid() {
    gridRef.api.refreshCells()
}

export function getColumnState() {
    let columnState = gridRef.columnApi.getColumnState();
    return columnState
};

export function setColumnState(newState) {
    gridRef.columnApi.applyColumnState({ state: newState });
    refreshDataGrid();

}   