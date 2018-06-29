
(function(){
    const path = require('path');
    const rl = require(path.resolve(__dirname, "./readline")).default;
    const TRIE_DS = require(path.resolve(__dirname, "./ds-trie/index.js"));
    const BST_DS = require(path.resolve(__dirname, "./ds-binary-search-tree/index.js"));
    const HANOI_PS = require(path.resolve(__dirname, "./ps-tower-of-hanoi/index.js"));
    const MERGE_SORT_PS = require(path.resolve(__dirname, "./ps-merge-sort/index.js"));

    const askQuestions = () => {
        rl.question(`\n\nWhat do you want to run?\n
            1) Trie Data Structure.\n
            2) Binary Search Tree.\n
            3) Tower of Hanoi\n
            4) Merge Sort\n
            0) Exit\n:`,
        (value) => {
            let option = parseInt(value);

            switch(option) {
                case 0:
                    rl.close();
                    break;

                case 1:
                    TRIE_DS.init();
                    break;

                case 2:
                    BST_DS.init();
                    break;

                case 3:
                    HANOI_PS.init();
                    break;

                case 4:
                    MERGE_SORT_PS.init();
                    break;

                default:
                    console.log("Invalid choice!!\n");
                    askQuestions();
            }
        });
    };

    const init = () => {
        askQuestions();
    };

    init();

    module.exports = {
        default: init
    };
})();
