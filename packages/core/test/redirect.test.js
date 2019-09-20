import { Jimp as jimp, getTestDir } from '@jimp/test-utils';

const fs = require('fs');
const http = require('http');

const imagesDir = getTestDir(__dirname) + '/images';

const httpHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      switch (req.url) {
        case '/redirect.png':
          res.writeHead(301, {
            Location: 'http://localhost:5136/corrected.png'
          });
          res.end();
          break;
        case '/corrected.png':
          res.writeHead(200, { 'Content-Type': 'image/png' });
          res.end(fs.readFileSync(imagesDir + '/pixel.png'), 'binary');
          break;
        default:
          res.writeHead(404);
          res.end('Not a valid test endpoint');
          break;
      }
      break;
    default:
      res.writeHead(404);
      res.end('Invalid request method');
      break;
  }
};

const httpServer = http.createServer(httpHandler);
describe('redirect', function() {
  if (
    process.browser ||
    process.env.ENVIRONMENT === 'BROWSER' ||
    (typeof process.versions.electron !== 'undefined' &&
      process.type === 'renderer' &&
      typeof XMLHttpRequest === 'function')
  ) {
    xit('Not testing redirects in browser');
  } else {
    before(function() {
      httpServer.listen(5136);
    });

    it('follows 301 redirect', function(done) {
      jimp
        .read('http://localhost:5136/redirect.png')
        .then(() => {
          httpServer.close();
          done();
        })
        .catch(error => {
          httpServer.close();
          done(error);
        });
    });
  }
});
