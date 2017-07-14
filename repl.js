const repl = require('repl');
const fs = require('fs');

const caveRepl = repl.start({ prompt: '> ', writer: sendCode });

function sendCode(req, res) {
  const writeStream = fs.createWriteStream(req.body);
  repl.start({
    input: writeStream,
    output: res.send
  });
  //res.send(output);
}

module.exports = {
  sendCode
};
