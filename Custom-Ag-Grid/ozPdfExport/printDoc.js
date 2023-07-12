import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getDocDefinition from "./docDefinition";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function printDoc(fileParams, gridApi, columnApi) {
  let params = {
    PDF_HEADER_COLOR: "#f8f8f8",
    PDF_INNER_BORDER_COLOR: '#dde2eb',
    PDF_OUTER_BORDER_COLOR: '#babfc7',
    PDF_LOGO: '',
    PDF_PAGE_ORITENTATION: 'landscape', //'potrait
    PDF_WITH_HEADER_IMAGE: false,
    PDF_WITH_FOOTER_PAGE_COUNT: true,
    PDF_HEADER_HEIGHT: 25,
    PDF_ROW_HEIGHT: 15,
    PDF_ODD_BKG_COLOR: '#fcfcfc',
    PDF_EVEN_BKG_COLOR: '#fff',
    PDF_WITH_CELL_FORMATTING: true,
    PDF_WITH_COLUMNS_AS_LINKS: true,
    PDF_SELECTED_ROWS_ONLY: fileParams.onlySelected || false
  };
  let filename = fileParams.fileName + '.pdf'
  console.log("Exporting to PDF...", filename);
  const docDefinition = getDocDefinition(params, gridApi, columnApi);
  pdfMake.createPdf(docDefinition).download(filename);
}

export default printDoc;
