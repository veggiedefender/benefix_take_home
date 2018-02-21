const fs = require('fs');
const path = require('path');
const parseFiles = require('aetna_parser');

async function main() {
  const pdfDir = path.join(__dirname, 'pdf');
  const pdfFiles = fs.readdirSync(pdfDir)
    .map(pdf => path.join(pdfDir, pdf));
  console.log(await parseFiles(pdfFiles));
}

main();
