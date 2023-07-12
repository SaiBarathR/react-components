Import Note: This is an Ag-grid table using community edition, not pro features.

This table uses Mui, Mui file Dropzone, Ag - grid, pdfmake libraries. 

It has filters, search, pagination, cell rendering, checkbox, and custom buttons on hover. And everything is a custom designed and made using internal Grid Api provided by Ag-Grid.

Sample code for creating a new table
```

const [cpuTableRef,setCpuTableDataRef]=useState(null) //ref to be passed grid api

<OZGridToolbar 
  title = 'Intel Cpu's'
  importProps={{ label: "Bulk Import Cpu", importFunction: importCpu, fileName: "CpuList.xls", onClickSampleDownload:       onClickSampleDownload
    }} // this is to all buld download and import option for the table 
  searchPlaceholder = 'Cpu Name'
  rowCount = { cpuList.length }
  dataGridRef = { cpuTableRef }
  showFilters = { true}
  filtertProps = {{ column: 'cpu name', options: ["I3", "I5, "I7", "I9"] }}
  fileName = 'cpuList'
  />

<OZDataGrid
  height="26.3rem"
  setGridRef={setCpuTableDataRef}
  columns={columnDefs} //column definition where you can set the column names and cell renderer
  data={cpuTableData}  //Row data for respective columns
  rowClickCallback={onClickRow} //Call back function for row click with the clicked row data
  onRowSelected={addSelectedRowData}
  />
```


