const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { workspace } = require('../../agent-conf.json');

module.exports = (command) => {
  return new Promise((resolve) => {
    const dir = path.join(__dirname, '../..', workspace, 'repo');
    fs.existsSync(dir) && fs.rmSync(dir, { recursive: true });

    const childProcess = exec(command, { cwd: path.join(dir, '..') });
    let log = '';

    childProcess.stdout.on('data', (data) => {
      log += data.toString();
    });
    childProcess.stderr.on('data', (data) => {
      log += data.toString();
    });
    childProcess.on('exit', (code) => resolve({ code, log }));
  });
};
