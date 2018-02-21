const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');
const { parseFiles } = require('aetna_parser');

const templatePath = 'template/BeneFix Small Group Plans upload template.xlsx';
const outputPath = 'out.xlsx';

async function main() {
  const pdfDir = path.join(__dirname, 'pdf');
  const pdfFiles = fs.readdirSync(pdfDir)
    .map(pdf => path.join(pdfDir, pdf));
  const rows = await parseFiles(pdfFiles);

  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(path.join(__dirname, templatePath));
  const worksheet = workbook.getWorksheet(1);

  // workaround to remove empty rows
  worksheet._rows = worksheet._rows.slice(0, worksheet.actualRowCount);
  worksheet.addRows(rows);
  await workbook.xlsx.writeFile(outputPath);
}

main();
