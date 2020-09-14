import csv from 'csvtojson';
// import EventEmitter from 'events';
import fs from 'fs';
const csvFilePath = './csv/data.csv';
import { pipeline } from 'stream';

/*class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const writer = fs.createWriteStream('file.txt');

const readData = () => {
    fs.readFile(csvFilePath,'utf8', (error,file) => {
        if (error) {
            return console.error(error.message);
        }
        lineByLineGetter(file);
    } )
};

const parseData = (data) => {
    console.log('Input Data:', data);
    csv({
        noheader: true,
        headers: ['book', 'author', 'amount', 'price'],
        colParser: {
            'amount': 'number',
            'price': 'number'
        }
    }).fromString(data).then((data) => {
            console.log('WriterData: ', ...data);
            if (data) {
                myEmitter.emit('writeData', ...data);
            }
        }
    );
};

const lineByLineGetter = (data) => {
    data.split(/\r?\n/).forEach((line, x)=> {
        if (x > 0) {
            myEmitter.emit('parseData', line);
        }
    })
};

const writeData = (data) => {
    if (data) {
        const txtData = changeDataView(data)
        writer.write(txtData,'utf8', (error => {
            console.error(error);
        }))
    }
};

const changeDataView = (data) => {
    let output = '';
    const keys = Object.keys(data);
    keys.forEach((key, i)=> {
        if (i === keys.length - 1) {
            output += `"${key}":"${data[key]}"`
        } else {
            output += `"${key}":"${data[key]}" `
        }
    });
    return `{${output}}\n`;
};

myEmitter.on('readData', readData);
myEmitter.on('parseData', parseData);
myEmitter.on('writeData', writeData);
myEmitter.emit('readData');
writer.on('finish', () => {
    console.log('wrote all data');
});*/

const readStream = fs.createReadStream(csvFilePath,'utf8');

const writeStream = fs.createWriteStream('file.txt', 'utf8');

/*class MyWriteStream extends Writable {
    constructor(options) {
        super(options);
    }

    _write(chunk, encoding, callback) {
        const data = chunk.toString();
        console.log(data);
    }
}
class MyTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const data = chunk.toString();
        console.log(data);
        data.split(/\r?\n/).forEach((line, x)=> {
            if (x > 0) {
                this.push(line);
            }
        });
        callback();
    }
}

const myTransformStream = new MyTransform();
const myWriteStream = new MyWriteStream('file.txt', 'utf8');*/

pipeline(
    readStream,
    csv({
        noheader: false,
        headers: ["book", "author", "amount", "price"],
        colParser: {
            'amount': 'number',
            'price': 'number'
        }
    }),
    writeStream,
    (error) => {
        console.error(error);
    }
);

/*readStream.pipe(csv())
    .on('error',error => console.log(error))
    .pipe(writeStream)
    .on('error', error => console.log(error));*/
