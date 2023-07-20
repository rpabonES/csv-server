const fs = require('fs');
const Tail = require('tail').Tail;
const path = require('path');

const filePath = path.join(__dirname, '/csvapi/PQR_SALP_EMCALI.csv');
const linesToWait = 10000; // Time to wait between each copy operation, in milliseconds
function appendLines() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading the file:', err);
            return;
        }

        const lines = data.trim().split('\n');
        const linesToAppend = lines.slice(1, 12).join('\n');

        fs.appendFile(filePath, linesToAppend + '\n', 'utf8', (err) => {
            if (err) {
                console.log('Error appending to the file:', err);
                return;
            }

            console.log(`Lines 2 to 11 appended to ${filePath}`);
        });
    });
}

function startAppending() {
    // Initial append
    appendLines();

    // Repeatedly append after the specified time interval
    const interval = setInterval(appendLines, linesToWait);

    // Stop appending after some time (e.g., 5 minutes = 5 * 60 * 1000 ms)
    const stopAfter = 5 * 60 * 1000;
    setTimeout(() => {
        clearInterval(interval);
        console.log('Appending stopped.');
    }, stopAfter);
}

module.exports = startAppending;