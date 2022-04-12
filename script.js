const board = document.getElementById('board');
const body = document.getElementById('body');

let color = ["rgb(244,089,163)", "rgb(234,230,070)", "rgb(141,253,115)", "rgb(118,254,192)", "rgb(131, 245,239)"]; // 색깔 지정

let block = [];
let boardNum = 64;
let drag = false;

for (let i = 0; i < boardNum; i++) {
    let randomcolor;
    block[i] = document.createElement('div');
    block[i].classList.add('block');
    board.appendChild(block[i]); // 블럭 생성

    block[i].addEventListener('mouseover', function () {
        randomcolor = color[getRandomIntInclusive(0, 4)]; // 색상 랜덤
        block[i].style.backgroundColor = `${randomcolor}`;
        block[i].style.boxShadow = `0px 0px 75px ${randomcolor}`; // 색상 채우기
        if (drag) {
            moveDraw(i, randomcolor)
        } // 드래그 했을 때 moveDraw함수 호출
    })

    block[i].addEventListener('mouseleave', function () {
        block[i].style.backgroundColor = "#3a3a3a";
        block[i].style.boxShadow = "0px 0px 10px #3a3a3a";
    }) // 색상 채우기

    block[i].addEventListener('click', function () {
        moveDraw(i, randomcolor)
    }) // 클릭 시 moveDraw함수 호출
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // 랜덤 함수

function move(i, j, randomcolor, direction) {
    setTimeout(function () {
        if (direction == 8 || direction == -8) {
            if (i + j * direction >= 0 && i + j * direction <= 63) {
                draw(i, j, randomcolor, direction);
            }
        } // 상하로 칠하기
        else if (direction == 1) {
            if ((i + j * direction) % 8 != 0) {
                draw(i, j, randomcolor, direction);
            }
            else if (i % 8 == 0) {
                if (j < 7) {
                    draw(i, j, randomcolor, direction);
                } // 횟수 제한
            } // 예외 처리
        } // 오른쪽 칠하기
        else if (direction == -1) {
            if (((i + 1) + j * direction) % 8 != 0) {
                draw(i, j, randomcolor, direction);
            }
            else if ((i + 1) % 8 == 0) {
                if (j < 7) {
                    draw(i, j, randomcolor, direction);
                }
            }
        } // 왼쪽 칠하기
    }, j * 100); // 딜레이
}

function draw(i, j, randomcolor, direction) {
    block[i + j * direction].style.backgroundColor = `${randomcolor}`;
    block[i + j * direction].style.boxShadow = `0px 0px 75px ${randomcolor}`; // 색상 칠하기
    setTimeout(function () {
        block[i + j * direction].style.backgroundColor = "#3a3a3a";
        block[i + j * direction].style.boxShadow = "0px 0px 10px #3a3a3a";
    }, 500) // 0.5초 후 색상 지우기
    move(i, j + 1, randomcolor, direction); // 다시 move함수 호출
}

function moveDraw(a, b) {
    move(a, 0, b, 8);
    move(a, 0, b, -8);
    move(a, 0, b, 1);
    move(a, 0, b, -1);
}

body.addEventListener('mousedown', function () {
    drag = true;
}) // 마우스를 눌렀을 때
body.addEventListener('mouseup', function () {
    drag = false;
}) // 마우스를 뗐을 때
board.addEventListener('mouseleave', function () {
    drag = false;
}) // 범위 밖을 넘어섰을 때