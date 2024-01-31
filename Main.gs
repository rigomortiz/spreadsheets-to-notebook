/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

var DIALOG_TITLE = 'Inventario de controles';
var SIDEBAR_TITLE = 'Inventario de controles';

function onOpen(){
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("Inventario de controles")
   .addItem('Exportar hoja actual a notebook', 'exportToNotebookDialog')
   .addToUi();
   /*
   .addItem('Convertir','convert')
   .addItem('siderbar', 'showSidebar')
   .addItem('Download','downloadFile')
   .addItem('readSpreedSheets', 'readSpreedSheets')*/

}


function exportToNotebookDialog() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const sheetName = sheet.getSheetName()
  const htmlTemplate = HtmlService.createTemplateFromFile('ExportToNotebook.view')
  htmlTemplate.dataFromServerTemplate = { sheetName: sheetName}

  const ui = htmlTemplate
      .evaluate()
      .setWidth(400)
      .setHeight(190)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

  SpreadsheetApp.getUi().showModalDialog(ui, "Exportar hoja a notebook");
}


function readSpreedSheets(){
  const ss = SpreadsheetApp.openById('1MF1q3Fp2Hoy0uII-neZhT_bu4c1GtKk2n_p8zPT-K-w');
  const sheet = ss.getSheetByName('Rutas Persistentes');
  const lastRow = sheet.getLastRow();
  const row = sheet.getRange(1,2,lastRow,1).getValues();
  for (let i = 0; i < row.length; i++) {
    const data = row[i][0].toString();
    console.log('Ruta %s', data);
  }
}




function showSidebar() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const sheetName = sheet.getSheetName()
  const htmlTemplate = HtmlService.createTemplateFromFile('Sidebar.html')
  htmlTemplate.dataFromServerTemplate = {sheetName: sheetName}

  const html = htmlTemplate
  .evaluate()
  .setTitle(SIDEBAR_TITLE)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);

  SpreadsheetApp.getUi()
    .showSidebar(html);
}


/**
 * Returns the value in the active cell.
 *
 * @return {String} The value of the active cell.
 */
function getActiveValue() {
  // Retrieve and return the information requested by the sidebar.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  return cell.getValue();
}

/**
 * Replaces the active cell value with the given value.
 *
 * @param {Number} value A reference number to replace with.
 */
function setActiveValue(value) {
  // Use data collected from sidebar to manipulate the sheet.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  cell.setValue(value);
}

/**
 * Executes the specified action (create a new sheet, copy the active sheet, or
 * clear the current sheet).
 *
 * @param {String} action An identifier for the action to take.
 */
function modifySheets(action) {
  // Use data collected from dialog to manipulate the spreadsheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var currentSheet = ss.getActiveSheet();
  if (action == "create") {
    ss.insertSheet();
  } else if (action == "copy") {
    currentSheet.copyTo(ss);
  } else if (action == "clear") {
    currentSheet.clear();
  }
}

/**
 * Returns the value in the active cell.
 *
 * @return {String} The value of the active cell.
 */
function getActiveName() {
  // Retrieve and return the information requested by the sidebar.
  const sheet = SpreadsheetApp.getActiveSheet();
  const name = sheet.getSheetName()
  return name;
}