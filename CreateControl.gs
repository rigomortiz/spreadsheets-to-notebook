
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

  var newSheet = currentSheet.copyTo(ss);
  // newSheet.setName('Control ' + form['control'][0])

  newSheet.getRange(2, 1).setValue("<HTML> # Control " + form['control'][0])
  newSheet.getRange(3, 1).setValue('<HTML> ' + form['control'][1])
  let str = 'CUTOFF_DATE = "2024-01-31"\n'
  let str_2 = ''
  for(let i = 0; i < form['rutas'].length; i++) {
    const name = form['rutas'][i][1].toUpperCase().replaceAll(' ', '_') + '_PATH'

    str += (name + ' = ' + '"' + form['rutas'][i][2] + '"' + '/cutoff_date=' + ' + CUTOFF_DATE' + '\n')
    str_2 += (name.toLowerCase().replace('_path', '_df') + ' = ' + 'spark.read.format("parquet").load(' + name + ')'+ '\n')
  }

  newSheet.getRange(5, 1).setValue(str)
  newSheet.getRange(7, 1).setValue(str_2)

  return
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