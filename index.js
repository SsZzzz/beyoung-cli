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
          choices: ['umi+dva', 'cra+mobx'],
        },
      ])
      .then(({ template }) => {
        const writePath = path.join(process.cwd(), name);
        const readPath =
          template === 'umi+dva'
            ? 'direct:https://github.com/SsZzzz/umi-app'
            : 'direct:https://github.com/SsZzzz/react-app';
        const spinner = ora('正在下载模板, 请稍后...');
        spinner.start();
        download(readPath, writePath, { clone: true }, (error) => {
          if (!error) {
            // success download
            spinner.succeed();
            console.log(chalk.green('success! 项目初始化成功！'));
          } else {
            spinner.fail();
            console.log(chalk.red('failed! 拉取模板失败', error));
          }
        });
      });
  });

program.parse(process.argv);
