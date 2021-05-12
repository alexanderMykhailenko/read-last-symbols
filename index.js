let fs = require('fs');

module.exports = (path, length) => {
    let result;
    let resultErr;
    let fileDescriptor;
    let fileSize;
    return Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                fs.open(path, 'r', (err, fd) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!fd) {
                        return reject(new Error('Empty File Descriptor'));
                    }
                    fileDescriptor = fd;
                    return resolve();
                });
            });
        })
        .then(() => {
            return new Promise((resolve, reject) => {
                fs.fstat(fileDescriptor, (err, stats) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!stats.size) {
                        return reject(new Error('Empty stats.size'));
                    }
                    fileSize = stats.size;
                    return resolve();
                });
            });
        })
        .then(() => {
            return new Promise((resolve, reject) => {
                fs.read(
                    fileDescriptor,
                    Buffer.alloc(length),
                    0,
                    length,
                    fileSize - length,
                    (err, bytesRead, buffer) => {
                        if (err) {
                            return reject(err);
                        }
                        result = buffer.toString('utf8');
                        return resolve();
                    }
                );
            });
        })
        .catch((err) => {
            resultErr = err;
        })
        .then(() => {
            return new Promise((resolve) => {
                if (fileDescriptor === undefined) {
                    return resolve();
                }
                fs.close(fileDescriptor, (err) => {
                    if (err) {
                        resultErr = err;
                    }
                    return resolve();
                });
            });
        })
        .then(() => {
            if (resultErr) {
                return Promise.reject(resultErr);
            }
            return Promise.resolve(result);
        });
};