/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const coock = new class Coock {
    constructor () {
        this.items = []
        filterNameInput.addEventListener('keyup', e => {
            const val = e.target.value

            this.filter(val)
        })
    
        addButton.addEventListener('click', () => {
            const nameVal = addNameInput.value
            const valVal = addValueInput.value

            this.createCoock(nameVal, valVal)
        })

        listTable.addEventListener('click', e => {
            const targ = e.target

            if (targ.classList.contains('delete')) {
                const id = targ.getAttribute('data-id')

                this.deleteCookie(id)
            }
        })

    }

    createCoock (name = 'userName', value = 'vasya') {
        if ((name && name !== '') && (value && value !== '')) {
            document.cookie = `${name}=${value}`
            this.render()
            this.filter(filterNameInput.value)
        }
    }

    getCookie () {
        if (!document.cookie) {
            return
        }

        const cookie = document.cookie.split('; ')

        this.items.length = 0
        for (let item of cookie) {
            const cook = item.split('=')

            this.items.push({
                name: cook[0],
                val: cook[1]
            })
        }
    }

    render (arr = this.items) {
        const container = document.createDocumentFragment()

        this.getCookie()
        
        for (let item of arr) {
            const id = Math.round(Math.random() * 1000)
            const tr = document.createElement('tr')
            const table = `
              <td data-id="${id}" class="name">${item.name}</td>
              <td>${item.val}</td>
              <td><button data-id="${id}" class="delete">delete</button></td>
          `

            tr.innerHTML = table
            container.appendChild(tr)
        }

        listTable.innerHTML = ''
        listTable.appendChild(container)
    }

    filter (chunk) {
        const resArr = []

        for (let item of this.items) {
            if (item.name.toLowerCase().includes(chunk.toLowerCase())
            || item.val.toLowerCase().includes(chunk.toLowerCase())) {
                resArr.push(item)
            }
        }

        this.render(resArr)
    }

    deleteCookie (id) {
        const names = document.querySelectorAll('.name')
        const cookieDate = new Date()

        cookieDate.setTime(cookieDate.getTime() -1)

        for (let name of names) {
            const dataId = name.getAttribute('data-id')

            if (dataId === id) {
                this.items.forEach((el, i) => {
                    if (name.textContent === el.name) {
                        this.items.splice(i, 1)
                        document.cookie = el.name + '=; expires=' + cookieDate.toGMTString()
                    }
                })
            }
        }

        this.render()
    }
}

