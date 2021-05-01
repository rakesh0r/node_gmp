const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = `${__dirname  }/csv/hw1.csv`;
const txtFilePath = `${__dirname  }/csv/hw1.txt`;

const writeStream = fs.createWriteStream(txtFilePath);

// CSV conversion
csv()
    .fromStream(fs.createReadStream(csvFilePath))
    .pipe(writeStream)
    .on('error', (err) => {
        console.log('File conversion Error');
        console.log(err);
    })
    .on('finish', (err) => {
        console.log('File conversion completed');
    });
