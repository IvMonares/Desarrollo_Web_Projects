(function() {
    'use strict';
    document.addEventListener('DOMContentLoaded', function() {


        var sidebar = document.querySelector('aside');

        /*
        var content = document.querySelector('main');
        var clone = content.cloneNode(true);
        sidebar.insertBefore(clone, sidebar.childNodes[5])

        */

        var newHeader = document.createElement('h2');
        var headerText = document.createTextNode('Posts más visitados')
        newHeader.appendChild(headerText);
        sidebar.insertBefore(newHeader, sidebar.childNodes[0])

        var postTitles = document.querySelectorAll('main h2');

        var frequentList = document.createElement('ul');

        for (let i = 0; i < postTitles.length; i++) {
            var listItem = document.createElement('li')
            var postLink = document.createElement('a');
            var postTitle = document.createTextNode(postTitles[i].innerHTML)
            postLink.setAttribute('href', '#')
            postLink.appendChild(postTitle);
            listItem.appendChild(postLink);
            frequentList.insertBefore(listItem, frequentList.childNodes[i]);
        }

        sidebar.insertBefore(frequentList, sidebar.childNodes[1])
        sidebar.insertBefore(document.createElement('br'), sidebar.childNodes[2])

    });

})();