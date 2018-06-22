
(function(){
    const path = require('path');
    const rl = require(path.resolve(__dirname, "./readline")).default;
    const TRIE_DS = require(path.resolve(__dirname, "./ds-trie/index.js"));
    const BST_DS = require(path.resolve(__dirname, "./ds-binary-search-tree/index.js"));

    const askQuestions = () => {
        rl.question('\n\nWhat do you want to run?\n1) Trie Data Structure.\n2) Binary Search Tree.\n0) Exit\n:', (value) => {
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
