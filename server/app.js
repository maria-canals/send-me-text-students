const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const requestListener = function (req, res) {
    const requestedURL = req.url;
    let response = url.parse(requestedURL, true);
    const filenameData = response.query.filename;
    const contentData = response.query.content;
    const contentDataLength = contentData.length;

    if (req.method === 'GET' && response.pathname === '/sendtext' && '/favicon.ico') {
        const filePath = path.join('..', 'files', filenameData);

        if (contentData.length > 1024) {
            res.writeHead(500);
            return res.end('Please shorten your description');
        }

        try {
            if (fs.existsSync(filePath)) {
                fs.appendFile(filePath, contentData, function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                });
            } else {
                fs.appendFile(filePath, contentData, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                res.end(`<h2>hemos escrito ${contentDataLength} caracteres.</h2>`);

            }
        } catch (err) {
            console.error(err)
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 error, not found');
    }
}

const server = http.createServer(requestListener);
server.listen(3000);