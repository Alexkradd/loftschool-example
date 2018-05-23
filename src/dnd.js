/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    var MyDiv = document.createElement('div')

    MyDiv.classList.add('draggable-div')
    MyDiv.style.position='absolute'
    MyDiv.style.width=`${Math.round(Math.random(1000) * 1000)}px`
    MyDiv.style.height=`${Math.round(Math.random(1000) * 1000)}px`
    MyDiv.style.top=`${Math.round(Math.random(1000) * 1000)}px`
    MyDiv.style.left=`${Math.round(Math.random(1000) * 1000)}px`
    MyDiv.style.backgroundColor=`rgb(${Math.round(Math.random() * 256)},${Math.round(Math.random() * 256)},${Math.round(Math.random() * 256)})`
    
    return homeworkContainer.appendChild(MyDiv)

}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    function GetCords() {
        var cords = target.getBoundingClientRect()
        
        return { top: cords.top+pageYOffset, left: cords.left + pageXOffset }

    }
    target.addEventListener('mousedown', e =>{
        var Coordinate = GetCords()
        var ShiftX = e.pageX-Coordinate.left
        var ShiftY = e.pageY-Coordinate.top

        target.style.zIndex=1000
        document.onmousemove=e =>{
            target.style.top=e.pageY-ShiftY+'px'
            target.style.left=e.pageX-ShiftX+'px'
        }
        document.onmouseup=e =>{
            document.onmousemove=null
        }
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
