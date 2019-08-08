let starWarsInfo = (page) => {
    let div = document.createElement('div');
    document.body.appendChild(div);


    function createTable(page, parentElem) {
        let table = document.createElement('table');
        parentElem.appendChild(table);

        fetch(page)
            .then(res => res.json())
            .then(json => parse(json, parentElem));


        function parse(json, parentElem) {
            function checkForName (url) {
                return fetch(url)
                    .then(res => res.json())
                    .then(function (json) {
                        for (let [key, value] of Object.entries(json)) {
                            if (key == "name" || key == "title") {
                                return value;
                            }
                        }
                    })
            }

            for (let [key, value] of Object.entries(json)) {
                let tr = document.createElement('tr');
                let td01 = document.createElement('td');
                let td02 = document.createElement('td');
                td01.innerHTML = key;
                table.appendChild(tr).appendChild(td01);

                if (typeof (value) == 'object') {
                    td02.innerHTML = "";
                    tr.appendChild(td02);
                    parse(value);
                } else {
                    let a = value.toString();
                    if (a.startsWith("https://swapi.co/api/")) {
                        checkForName(value).
                        then(function (r) {
                            let button = document.createElement('button');
                            button.innerText = `${r}`;
                            tr.appendChild(td02);
                            td02.appendChild(button);
                            button.addEventListener("click", () => {
                                createTable(value, td02);
                                td02.removeChild(button);
                            })
                        });
                    } else {
                        td02.innerHTML = value;
                        tr.appendChild(td02);
                    }
                }
            }
        }
    }
    createTable(page,div);
};

starWarsInfo('https://swapi.co/api/starships/12/');
