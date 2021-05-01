import csv from 'csvtojson';
import { createWriteStream, createReadStream } from 'fs';
import path from 'path';

const csvFilePath = path.resolve(__dirname, '..', 'module1/csv/hw1.csv');
const txtFilePath = path.resolve(__dirname, '..', 'module1/csv/hw1.txt');

const writeStream = createWriteStream(txtFilePath);

// CSV conversion
csv()
    .fromStream(createReadStream(csvFilePath))
    .pipe(writeStream)
    .on('error', (err) => {
        console.log('File conversion Error');
        console.log(err);
    })
    .on('finish', (err) => {
        console.log('File conversion completed');
    });
