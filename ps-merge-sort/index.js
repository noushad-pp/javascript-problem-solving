(function () {
    const path = require('path');
    const chalk = require('chalk');
    const rl = require(path.resolve(__dirname, "../readline")).default;

    const Merge = function (left = [], right = []) {
        let result = [];
        while (left.length || right.length) {
            if (left.length && right.length) {
                if (left[0] < right[0]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            } else if (left.length) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        return result;
    };

    const MergeSort = (array) => {
        let length = array.length;
        if (!Array.isArray(array) || length < 2) {
            return array;
        }

        let mid = Math.floor(length / 2);
        let left = array.slice(0, mid);
        let right = array.slice(mid, length);

        return Merge(MergeSort(left), MergeSort(right));
    }

    const askQuestions = () => {
        rl.question('\nEnter the array elements sperated by comma.\n:', (option) => {
            option = option.split(',').map(function (item) {
                return parseInt(item, 10);
            });
            if (option && Array.isArray(option)) {
                console.log(chalk.bgBlue('\n\nStarting merge sort.....\n\n'));
                let sortedArray = MergeSort(option);
                console.log(chalk`Sorted Array: {bgGreen ${sortedArray}}\n\n`);

                const main = require(path.resolve(__dirname, "../index")).default; //defined main here to avoid cyclic dependancy
                main();
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
