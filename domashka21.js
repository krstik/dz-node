var program = require('commander')
var http = require('http');

program
  .version('1.0.0')
  .option('-p, --port [type]', 'Listening port [output]', 3000)
  .option('-i, --interval [type]', 'Time for response [output]', 1000)
  .option('-t, --timeout [type]', 'Time for stop [output]', 10000)
  .parse(process.argv);

  const port = program.port;
  const intl = program.interval;
  const end = program.timeout;

  const server = http.createServer(function (request, response) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json', 'utf-8');
      response.write(`CURRENT DATE: `);
      watches()
        .then((date) => {
          response.write(`${date}`);
        })
        .then(() => {
          let date = new Date().toLocaleTimeString();
          response.end(` CANCEL LISTENING AT ${date}`);
        });
  });
  server.listen(port);
  const watches = () => {
    return new Promise((resolve, reject) => {
      const timerId = setInterval(() => {
        console.log(new Date()+' ');
      }, intl);
      setTimeout(() => {
        clearInterval(timerId);
        resolve(new Date());
      }, end);
    });
  };