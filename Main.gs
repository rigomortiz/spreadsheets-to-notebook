/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

function onOpen(){
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("Inventario de controles")
   .addItem('Exportar hoja actual a notebook', 'showExportToNotebookDialog')
   .addItem('Crear control', 'showCreateControlSidebar')
   .addToUi();

}

function showExportToNotebookDialog() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const sheetName = sheet.getSheetName()
  const htmlTemplate = HtmlService.createTemplateFromFile('ExportToNotebook.view')
  htmlTemplate.dataFromServerTemplate = { sheetName: sheetName}

  const ui = htmlTemplate
      .evaluate()
      .setWidth(300)
      .setHeight(100)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

  SpreadsheetApp.getUi().showModalDialog(ui, "Exportar hoja '" + sheetName + "' a notebook");
}

function showCreateControlSidebar() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const sheetName = sheet.getSheetName()
  const controles = getControles()
  const rutas = getRutasPersistentes()
  const htmlTemplate = HtmlService.createTemplateFromFile('CreateControl.view')

  htmlTemplate.dataFromServerTemplate = {
    sheetName: sheetName,
    controles: controles,
    rutas: rutas
  }

  const html = htmlTemplate
  .evaluate()
  .setTitle("Crear control")
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);

  SpreadsheetApp.getUi()
    .showSidebar(html);
}
