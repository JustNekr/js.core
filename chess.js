//1. Создать функцию, генерирующую шахматную доску. 
//При этом можно использовать любые html-теги по своему желанию. 
//Доска должна быть разлинована соответствующим образом, 
//т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, 
//столбцы – латинскими буквами A, B, C, D, E, F, G, H.
//2*. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, 
//например К – король, Ф – ферзь и т.п.
'use strict';
const settings = {
    rowCount: 10,
    colCount: 10,
    emptyCellColor: 'black',
};

const chessBoard = {
    settings,
    containerElement: null,
    cellElements: [],

    run() {
        this.init();
    },

    init() {
        this.containerElement = document.querySelector('#chess');
        this.initCells();
    },

    initCells() {
        this.containerElement.innerHTML = '';

        for (let row = 0; row < this.settings.rowCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);

            for (let col = 0; col < this.settings.colCount; col++) {
                const cell = document.createElement('td');
                if (row % 2 == 0) {
                    if (!(col % 2 == 0)) {
                        cell.style.backgroundColor = 'black';
                    };
                } else {
                    if (col % 2 == 0) {
                        cell.style.backgroundColor = 'black';
                    };
                };

                if (row == 0 || row == this.settings.rowCount - 1 || col == 0 || col == this.settings.rowCount - 1) {
                    cell.style.backgroundColor = 'brown';
                    if (row > 0 && row < this.settings.rowCount - 1) {
                        cell.innerHTML = row;
                    } else {
                        if (col > 0 && col < this.settings.rowCount - 1) {
                            cell.innerHTML = String.fromCharCode(64 + col);
                        };
                    };
                } else {
                    switch (row) {
                        case 2:
                        case 7:
                            cell.innerHTML = 'П';
                            break;
                        case 1:
                        case 8:
                            switch (col) {
                                case 1:
                                case 8:
                                    cell.innerHTML = 'Л';
                                    break;
                                case 2:
                                case 7:
                                    cell.innerHTML = 'Кн';
                                    break;
                                case 3:
                                case 6:
                                    cell.innerHTML = 'Л';
                                    break;
                                case 4:
                                    cell.innerHTML = 'Ф';
                                    break;
                                case 5:
                                    cell.innerHTML = 'Кл';
                                    break;

                            };
                    };
                    switch (row) {
                        case 1:
                        case 2:
                            cell.style.color = 'darkorange';
                            break;
                        case 7:
                        case 8:
                            cell.style.color = 'seagreen';
                            break;
                    };
                };
                trElem.appendChild(cell);
                this.cellElements.push(cell);
            };
        };
    },

};

chessBoard.run();

// Изначальная идея была :
//создать два объекта игроков, засунуть в них объекты шахмат, научить их ходить, ...
//НО, с учетом моей скорости писания кода и отпущенного времени получилось только это :-(