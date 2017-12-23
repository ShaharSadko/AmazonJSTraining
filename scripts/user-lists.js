function UserList() {
    var listContainerElement = document.querySelector('#lists');
    var userList = [];

    this.addList = function (listName) {
        for (var i = 0; i < userList.length; i++) {
            if (userList[i].name === listName) {
                return false;
            }
        }

        userList.push({name: listName, list: []});
        var listLabel = document.createElement('label');
        listLabel.innerText = listName;
        listContainerElement.prepend(listLabel);

        return true;
    };

    this.addProduct = function (product, listName) {
        var listIndex = userList.indexOf(listName);
        userList[listIndex].push(product);
    };

    this.deleteList = function (listName) {
        var listIndex = userList.indexOf(listName);
        userList.splice(listIndex, 1);
    };

    function removeProduct(product) {
        for (var i = 0; i < userList.length; i++) {
            userList[i].find(product);
            for (var j = 0; j < userList[i].length; j++) {
                if (userList[i][j] === product) {
                    userList[i].splice(j, 1);
                }
            }
        }
    }
}
