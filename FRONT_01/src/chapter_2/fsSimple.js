import fs from 'fs';

const readAndWriteCallbackHell = () => {
    fs.readFile('./files/fsSimple/file1.txt', 'utf8',(err, data) => {
        fs.writeFile('./files/fsSimple/file2.txt', data, 'utf8', (err) => {
            if (err) throw err;
        });
    });
};

const readAndWritePromises = () => {
    fs.promises.readFile('./files/fsSimple/file1.txt', 'utf8')
        .then(data => fs.promises.writeFile('./files/fsSimple/file2.txt', data, 'utf8'))
        .catch(err => console.error(err));
};

const readAndWriteAsyncAwait = async () => {
    const data = await new Promise(
        (resolve) => fs.readFile('./files/fsSimple/file1.txt',
        'utf8',
        (err, data) => resolve(data))
    );

    fs.writeFile('./files/fsSimple/file2.txt', data, 'utf8', err => {
        if (err) throw err;
    });
};

export {
  readAndWriteAsyncAwait,
  readAndWritePromises,
  readAndWriteCallbackHell,
};
