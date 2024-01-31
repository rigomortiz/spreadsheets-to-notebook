function getMetadata(kernel) {
    return {
      "kernelspec": {
          "display_name": kernel,
          "language": "python",
          "name": kernel + "-" + kernel
      },
      "language_info": {
          "codemirror_mode": {
              "name": "ipython",
              "version": 3
          },
          "file_extension": ".py",
          "mimetype": "text/x-python",
          "name": "python",
          "nbconvert_exporter": "python",
          "pygments_lexer": "ipython3",
          "version": "3.9.7"
      }
  }
}

CELL = {
  "cell_type": "code",
  "execution_count": null,
  "metadata": {
  },
  "outputs": [],
  "source": [
  ]
}

function downloadFile(action){
  const sheet = SpreadsheetApp.getActiveSheet();
  const name = sheet.getSheetName()
  const metadata = getMetadata(action)
  const data = convert(sheet, metadata)

  const file = DriveApp.getRootFolder().createFile(name + '.ipynb', data);
  file.setSharing(DriveApp.Access.DOMAIN, DriveApp.Permission.VIEW)
  //file.setSecurityUpdateEnabled(true)

  return "https://colab.research.google.com/drive/" + file.getId()
}


function convert(sheet, metadata){
  try {
    const lastRow = sheet.getLastRow();
    const row = sheet.getRange(1, 1, lastRow, 1).getValues();
    let cells = []

    for (let i = 0; i < row.length; i++) {
      const data = row[i][0].toString()
      const isMarkdown = /^(<HTML\>)/.test(data);
      const lines = isMarkdown?data.replace('<HTML', '').split('\n'):data.split('\n')

      cells[i] = {
        "cell_type": !isMarkdown?"code":"markdown",
        "execution_count": null,
        "metadata": {
        },
        "outputs": [],
        "source": lines.map(e => e.concat('\n'))
      }
    }

    const notebook = {
      nbformat: 4,
      nbformat_minor: 0,
      metadata: metadata,
      cells: cells
    }
    const data = JSON.stringify(notebook);

    console.log(data)

    //var file = DriveApp.getRootFolder().createFile(name + '.ipynb', data);
    //file.setSharing(DriveApp.Access.DOMAIN, DriveApp.Permission.VIEW)
    //Browser.msgBox("Se creó el archivo en tu espacio de Drive")

    return data;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}


