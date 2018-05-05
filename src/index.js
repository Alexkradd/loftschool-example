/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i=0; i < array.length; i++) { // for(const result of array)
        fn(array[i], i, array) //  fn(result)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var arr = []

    for (var i=0; i < array.length; i++) { 
        arr.push(fn(array[i], i, array))
    }
    
    return arr
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var j = 0

    if (initial === undefined) {
        initial = array[0]
        j++
    }
    for (var i=j; i < array.length; i++) { 
        initial = fn(initial, array[i], i, array)
    }
    
    return initial
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return Object.keys(obj).map(function(elem) {
        return elem.toUpperCase()
    })
}
/* 
function upperProps(obj) {
  const Keys = []
  for (var K of Object.keys(obj) ){
    Keys.push(K.toUpperCase())
  }
  return Keys
} 
*/

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from=0, to=array.length) {
    var result = []
  
    if (from<0) {
        from=0
    }
  
    if (to>array.length) {
        to=array.length
    }

    if (to < 0 && to > -array.length) {
        to = array.length + to
    }
  
    for (var i=from; i < to; i++) { 
        result.push(array[i])        
    }
  
    return result
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop]= value*value
            
            return true
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
