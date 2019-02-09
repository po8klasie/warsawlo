const fs = require('fs')
const PDFParser = require("pdf2json")
const pdfParser = new PDFParser()

const chunkArray = (arr, chunkSize) => {
    let tempArr = []
    for (let index = 0; index < arr.length; index += chunkSize) {
        tempArr.push(arr.slice(index, index+chunkSize))
    }
    return tempArr
}
const extractTable = (filename) => new Promise((resolve, reject) => {
  const processData = pdfData => {
    let rows = []
    pdfData.formImage.Pages.forEach((page, pageIndex) => {
      let lastY = 0
      page.Texts.forEach((textBox, textBoxIndex, textBoxes) => {
        let text = decodeURIComponent(textBox.R[0].T)
        if(textBoxIndex != 0 && textBoxes[textBoxIndex-1].x == textBox.x){
          let prevText = decodeURIComponent(textBoxes[textBoxIndex-1].R[0].T)
          text = prevText + text
          rows.pop()
        }
        rows.push(text)
      })
    })
    return chunkArray(rows, 4)
  }
  pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError))
  pdfParser.on("pdfParser_dataReady", pdfData => resolve(processData(pdfData)));

  pdfParser.loadPDF(filename);
})
module.exports = extractTable
