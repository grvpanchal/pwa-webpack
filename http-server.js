const http = require('http');
//creating server using nodejs http module
const server = http.createServer((req, res, next) => {
  //replace stackfame.com with your doamin name
  res.writeHead(301, {'Location' : 'https://localhost'});
  res.end();
});
server.listen(process.env.PORT || 80);