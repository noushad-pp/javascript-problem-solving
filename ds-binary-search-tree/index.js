(function () {
    const path = require('path');
    const rl = require(path.resolve(__dirname, "../readline")).default;

    const Node = function (value) {
        this.right = null;
        this.left = null;
        this.value = parseInt(value, 10);
    };

    const BST = function () {
        this.root = null;

        this.insertData = (data) => {
            let newNode = new Node(data);

            if (this.root === null) {
                this.root = newNode;
            } else {
                this.insertNode(this.root, newNode);
            }
        };

        this.insertNode = (node, newNode) => {
            if (newNode.value < node.value) {
                (node.left === null) ? node.left = newNode : this.insertNode(node.left, newNode);
            } else if (newNode.value > node.value) {
                (node.right === null) ? node.right = newNode : this.insertNode(node.right, newNode);
            } else {
                console.log("Item already exists in BST");
            }
            console.log(node);
        };

        this.searchData = (data, node = this.root) => {
            if (node.value === data) {
                return true;
            } else if (!node.left && !node.right) {
                return false;
            } else {
                if (node.value > data) {
                    return this.searchData(data, node.left);
                } else {
                    return this.searchData(data, node.right);
                }
            }
        };

        this.printPreOrder = function (node = this.root) {
            if (node) {
                console.log(node.value);
                this.printPreOrder(node.left);
                this.printPreOrder(node.right);
            }
        };

        this.printInOrder = function (node = this.root) {
            if (node) {
                this.printInOrder(node.left);
                console.log(node.value);
                this.printInOrder(node.right);
            }
        };

        this.printPostOrder = function (node = this.root) {
            if (node) {
                this.printPostOrder(node.left);
                this.printPostOrder(node.right);
                console.log(node.value);
            }
        };
    };

    const askQuestions = (BST) => {
        rl.question('\nWhat do you want to do?\n1) Add Items.\n2) Remove Item.\n3) Print Tree.\n4) Search Tree.\n0) Back.\n\n:', (value) => {
            let option = parseInt(value, 10);
            switch (option) {
                case 0:
                    const main = require(path.resolve(__dirname, "../index")).default;
                    main();
                    break;

                case 1:
                    rl.question('\nEnter your item \n:', (value) => {
                        if (!value) {
                            console.log("\nList value is empty!!\n");
                            askQuestions(BST);
                        } else {
                            BST.insertData(value);
                            console.log(`\n${value} added to BST\n`);
                            // console.log(BST.printBST());
                            askQuestions(BST);
                        }
                    });
                    break;

                case 2:
                    rl.question('\nEnter your item to be removed\n:', (value) => {
                        if (!value) {
                            console.log("\nEnter a valid search key!!\n");
                            askQuestions(BST);
                        } else {
                            // let wordFound = BST.searchWord(value);
                            // if (wordFound) {
                            //     console.log(`\n${value} exists in BST\n`);
                            // } else {
                            //     console.log(`\n${value} not found in BST\n`);
                            // }
                            askQuestions(BST);
                        }
                    });
                    break;

                case 3:
                    rl.question('\nHow do you want to traverse the Binary Search Tree\n1) Pre Order.\n2) In Order.\n3) Post Order.\n0) Back.\n\n:', (value) => {
                        value = parseInt(value, 10);
                        if (!value) {
                            console.log("\nEnter a valid input!!\n");
                            askQuestions(BST);
                        } else {
                            switch (value) {
                                case 1:
                                    console.log("\n\nPreorder traversal:\n");
                                    BST.printPreOrder();
                                    console.log("\n\n");
                                    break;
                                case 2:
                                    console.log("\n\nInorder traversal:\n");
                                    BST.printInOrder();
                                    console.log("\n\n");
                                    break;
                                case 3:
                                    console.log("\n\nPostorder traversal:\n");
                                    BST.printPostOrder();
                                    console.log("\n\n");
                                    break;
                            }
                        }
                        askQuestions(BST);
                    });
                    break;

                case 4:
                    rl.question('\nEnter node to be searched for.\n\n:', (value) => {
                        value = parseInt(value, 10);
                        if (!value) {
                            console.log("\nEnter a valid input!!\n");
                            askQuestions(BST);
                        } else {
                            let found = BST.searchData(value);
                            if (found) {
                                console.log(`\n${value} found in Search Tree\n`);
                            } else {
                                console.log(`\n${value} not found in Search Tree\n`);
                            }
                        }
                        askQuestions(BST);
                    });
                    break;

                default:
                    console.log("\nInvalid choice!!\n");
                    askQuestions(BST);
            }
        });
    };

    const init = () => {
        let BinSrchTree = new BST();
        console.log("\nNew Binary search tree created.\n");
        askQuestions(BinSrchTree);
    }

    module.exports = {
        init: init
    }
})();
