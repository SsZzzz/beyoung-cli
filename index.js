#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path');

program
  .command('init <name>')
  .description('init a project')
  .action((name) => {
    inquirer
      .prompt([
        {
          name: 'template',
          type: 'list',
          message: '请选择一个模板',
          choices: ['后台', '大屏'],
        },
      ])
      .then(({ template }) => {
        const writePath = path.join(process.cwd(), name);
        const readPath =
          template === '后台'
            ? 'direct:https://github.com/SsZzzz/vite-project#basic'
            : 'direct:https://github.com/SsZzzz/vite-project#map';
        const spinner = ora('正在下载模板, 请稍后...');
        spinner.start();
        download(readPath, writePath, { clone: true }, (error) => {
          if (error) {
            spinner.fail();
            console.log(chalk.red('failed! 拉取模板失败', error));
          } else {
            spinner.succeed();
            console.log(chalk.green('success! 项目初始化成功！'));
          }
        });
      });
  });

program.parse(process.argv);
