(function () {
    const path = require('path');
    const rl = require(path.resolve(__dirname, "../readline")).default;
    const chalk = require('chalk');

    const setupTowers = function (n) {
        this.size = n;
        this.fromTower = new Tower('FROM TOWER', n, 'bgRed');
        this.toTower = new Tower('TO TOWER', n, 'bgGreen');
        this.auxTower = new Tower('AUXILARY TOWER', n, 'bgYellow');

        this.printTowerStack = () => {
            let size = this.size;
            let fromSize = this.fromTower.stack.length;
            let auxSize = this.auxTower.stack.length;
            let toSize = this.toTower.stack.length;

            let fromArray = new Array(this.size - fromSize).fill("").concat(this.fromTower.stack);
            let auxArray = new Array(this.size - auxSize).fill("").concat(this.auxTower.stack);
            let toArray = new Array(this.size - toSize).fill("").concat(this.toTower.stack);

            for (let i = 0; i < size; i++) {
                console.log(`\t${fromArray[i]}\t${auxArray[i]}\t${toArray[i]}`);
            }
            console.log(chalk `\t{${this.fromTower.color} FROM}\t{${this.auxTower.color} AUX}\t{${this.toTower.color} TO}\n\n`);
        };
    };

    const Tower = function (name, size, color) {
        this.name = name;
        this.size = size;
        this.stack = new Array();
        this.color = color;

        this.shift = () => {
            return this.stack.shift();
        };

        this.pop = () => {
            return this.stack.pop();
        };

        this.unshift = (n) => {
            return this.stack.unshift(n);
        };

        this.push = (n) => {
            return this.stack.push(n);
        }
    };

    const printHanoiTower = (towerInstance, n, fromTower, toTower, auxTower)  => {
        //if only 1 disk left make the move and return
        if (n == 1) {
            console.log(chalk`Move {blue.bold disk ${n}} from {${fromTower.color} ${fromTower.name}} to {${toTower.color} ${toTower.name}}`);
            let out_val = fromTower.shift();
            if (toTower.stack[0] > out_val) {
                toTower.push(out_val);
            } else {
                toTower.unshift(out_val);
            }
            towerInstance.printTowerStack();
            return;
        }

        //then move top n-1 disks from FROM TOWER to TO TOWER using AUXILARY TOWER
        printHanoiTower(towerInstance, n - 1, fromTower, auxTower, toTower);

        //move remaining disks from  FROM TOWER to AUXILARY TOWER
        console.log(chalk`Move {blue.bold disk ${n}} from {${fromTower.color} ${fromTower.name}} to {${toTower.color} ${toTower.name}}`);
        let out_val = fromTower.shift();
        if (toTower.stack[0] > out_val) {
            toTower.push(out_val);
        } else {
            toTower.unshift(out_val);
        }
        towerInstance.printTowerStack();

        //then move top n-1 disks from AUXILARY TOWER to TO TOWER using FROM TOWER
        printHanoiTower(towerInstance, n - 1, auxTower, toTower, fromTower);
    }

    const askQuestions = () => {
        rl.question('\nEnter the size of hanoi tower.(Enter 0 to Exit)\n:', (value) => {
            let option = parseInt(value, 10);
            if (option && option !== NaN) {
                if (option === 0) {
                    const main = require(path.resolve(__dirname, "../index")).default;
                    main();
                } else {
                    const towers = new setupTowers(option);
                    for (let i = 0; i < option; i++) {
                        towers.fromTower.push(i+1);
                    }
                    towers.printTowerStack();

                    console.log(chalk.bgBlue('\n\nStarting shuffling.....\n\n'))
                    printHanoiTower(towers, option, towers.fromTower, towers.toTower, towers.auxTower);
                    askQuestions();
                }
            } else {
                console.log("\nInvalid choice!!\n");
                askQuestions();
            }
        });
    };

    const init = () => {
        askQuestions();
    }

    module.exports = {
        init: init
    }
})();
