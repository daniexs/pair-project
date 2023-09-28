const fs = require('fs');
const pdf = require('html-pdf');
function replaceHtml (htmlPath, data) {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const {name, address, dateOfBirth} = data;
    return html.replace('###nama###', name).replace('###address###', address).replace('###date###', dateOfBirth);
}

function createPdf(html, resultPath) {
    return pdf.create(html, {format: 'Letter'}).toFile(resultPath, (err, res) => {
        if(err) return console.log(err);
        return res;
    })
}

function main(html, data, resultPath) {
    const replacedHtml = replaceHtml(html, data);
    return createPdf(replacedHtml, resultPath)
}
module.exports = main;