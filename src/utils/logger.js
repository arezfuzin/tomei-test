const chalk = require('chalk');

module.exports = {
    info(value) {
        let newValue = value;

        if(typeof value === 'object') {
            newValue = JSON.stringify(value);
        }

        console.log(chalk.green('info:'), chalk.cyanBright(newValue));
    },

    error(value) {
        console.log(chalk.red('error:'), chalk.cyanBright(value));
    }
};