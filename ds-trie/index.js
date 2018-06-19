
(function(){
    const path = require('path');
    const rl = require( path.resolve( __dirname, "../readline") ).default;

    const Node = function() {
        this.keys = new Map();
        this.end = false;
        this.setEnd = () => {
            this.end = true;
        };
        this.isEnd = () => this.end;
    };

    const Trie = function() {
        this.root = new Node();

        this.addWord = (word, node = this.root) => {
            if(word.length == 0){
                node.setEnd();
                this.printTrie();
                return;
            } else if(node.keys.has(word[0])) {
                return this.addWord(word.substring(1), node.keys.get(word[0]));
            } else {
                node.keys.set(word[0], new Node());
                return this.addWord(word.substring(1), node.keys.get(word[0]))
            }
        };

        this.searchWord = (word) => {
            let searchNode = this.root;
            while(word.length > 1) {
                if(!searchNode.keys.has(word[0])){
                    return false;
                }
                searchNode = searchNode.keys.get(word[0]);
                word = word.substring(1);
            }
            return (searchNode.keys.has(word) && searchNode.keys.get(word).isEnd()) ? true : false;
        };

        this.printTrie = () => {
            let words = new Array();
            let search = function(node, string){
                if(node.keys.size > 0){
                    for(let letter of node.keys.keys()){
                        search(node.keys.get(letter), string.concat(letter));
                    }
                    if(node.isEnd()){
                        words.push(string);
                    }
                } else {
                    string.length > 0 ? words.push(string) : undefined;
                    return;
                }
            };
            search(this.root, "");
            return words;
        };
    };

    const askQuestions = (Trie) => {
        rl.question('\nWhat do you want to do?\n1) Add Word.\n2) Search Word.\n3) Print Trie.\n0) Exit.\n\n:', (value) => {
            let option = parseInt(value);
            switch(option) {
                case 0:
                    const main = require( path.resolve( __dirname, "../index") ).default;
                    main();
                    break;

                case 1:
                    rl.question('\nEnter your word \n:', (value) => {
                        if(!value) {
                            console.log("\nInvalid word entered!!\n");
                            askQuestions(Trie);
                        } else {
                            Trie.addWord(value);
                            console.log(`\n${value} added to Trie\n`);
                            console.log(Trie.printTrie());
                            askQuestions(Trie);
                        }
                    });
                    break;

                case 2:
                    rl.question('\nEnter your word to search for\n:', (value) => {
                        if(!value) {
                            console.log("\nInvalid word entered!!\n");
                            askQuestions(Trie);
                        } else {
                            let wordFound = Trie.searchWord(value);
                            if(wordFound) {
                                console.log(`\n${value} exists in Trie\n`);
                            } else {
                                console.log(`\n${value} not found in Trie\n`);
                            }
                            askQuestions(Trie);
                        }
                    });
                    break;

                case 3:
                    let words = Trie.printTrie();
                    console.log(words);
                    askQuestions(Trie);
                    break;

                default:
                    console.log("\nInvalid choice!!\n");
                    askQuestions(Trie);
                }
        });
    };

    const init = () => {
        let trie = new Trie();
        console.log("\nNew Trie created.\n");
        askQuestions(trie);
    }

    module.exports = {
        init: init
    }
})();
