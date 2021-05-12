# read-last-symbols
Read Last Symbols From File

INSTALL
-------
`npm install read-last-symbols`

USAGE
-----
    let readLastSymbols = require('./read-last-symbols');
    let pathToLastFile = __dirname + '/oneline.xml'; // path to you file
    
    let timeReadLastLinesStart = Date.now();
    readLastSymbols(pathToLastFile, 200)
        .then((result) => {
            console.log('SUCCESS:', result);
        })
        .catch((err) => {
            console.log('ERROR:', err);
        })
        .then(() => {
            console.log('TIME in MS', Date.now() - timeReadLastLinesStart);
        });
    ..............................

CHANGELOG
---------
### May 12, 2021
- first release