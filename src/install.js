#!/usr/bin/env node

const { execPromise } = require('./utils');
const chalk = require('chalk');

const installer = async () => {
  const cmd = 'npm install';
  const pkg = 'PROXY SERVER';
  const msg = {
    init: chalk.green(`${pkg}: Init`),
    install: chalk.green(`${pkg}: Installing...`),
    success: chalk.green(`${pkg}: Install Successful 🔥 `),
    fail: chalk.red(`${pkg}: Install Failed 💥`),
  };

  console.log(msg.init, cmd);

  try {
    const { stdout } = await execPromise(cmd);
    console.log(msg.install, `${__dirname}/install`);
    console.log(msg.success, stdout);
  } catch (err) {
    console.log(msg.fail, err);
  }
};


installer();
