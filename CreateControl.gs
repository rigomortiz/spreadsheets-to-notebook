
function getRutasPersistentes(){
  const ss = SpreadsheetApp.openById('1MF1q3Fp2Hoy0uII-neZhT_bu4c1GtKk2n_p8zPT-K-w');
  const sheet = ss.getSheetByName('Rutas Persistentes');
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const data = sheet.getRange(2,1,lastRow - 1,lastColumn).getValues().map(row => [row[0], row[1], row[3]])

  return data
}

function getControles(){
  const ss = SpreadsheetApp.openById('1alFZ_HPkAKMlxty3-o4GdjR1kr90EqmqOiN7gzysHMQ');
  const sheet = ss.getSheetByName('Controles');
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const data = sheet.getRange(2,1,lastRow - 1,lastColumn).getValues()

  return data
}


function createControl(form) {
  // Use data collected from dialog to manipulate the spreadsheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var currentSheet = ss.getSheetByName('Plantilla');
  console.log(form)

  //currentSheet.copyTo(ss);

  return

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