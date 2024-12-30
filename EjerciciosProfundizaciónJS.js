/* Ejercicio 1 
Dado un array de objetos, obtener el objeto con el id 3 */

const arrNames = [
    {id: 1, name: 'Pepe'},
    {id: 2, name: 'Juan'},
    {id: 3, name: 'Alba'},
    {id: 4, name: 'Toby'},
    {id: 5, name: 'Lala'}
];

const objWithId3 = arrNames.find(obj => obj.id ===3);
console.log(objWithId3);

/* Ejercicio 2 
Dado un array de valores, devolver un array 'truthy' (sin valores null, NaN, undefined o false) */

const arrDirty = [NaN, 0, 5, false, -1, '', undefined, 3, null, 'test'];

const filteredArr = arrDirty.filter(value => value);
const filteredArr2 = arrDirty.filter(value => Boolean(value));

console.log(filteredArr);
console.log(filteredArr2);

/* Ejercicio 3
Dado un array de ciudades, sacar las ciudades de España que no sean capitales */

const arrCities = [
    {city: 'Logroño', country: 'Spain', capital: false},
    {city: 'Paris', country: 'France', capital: true},
    {city: 'Madrid', country: 'Spain', capital: true},
    {city: 'Rome', country: 'Italy', capital: true},
    {city: 'Oslo', country: 'Norway', capital: true},
    {city: 'Jaén', country: 'Spain', capital: false}
];

const spanishNonCapitals = arrCities.filter(city => city.country === 'Spain' && !city.capital);

console.log(spanishNonCapitals);

/* Ejercicio 4
Dados tres arrays de números, sacar en un nuevo array la intersección de estos */

const arrNumber1 = [1, 2, 3];
const arrNumber2 = [1, 2, 3, 4, 5];
const arrNumber3 = [1, 4, 7, 2];

function intersectArr(arr1, arr2, arr3) {
    return arr1.filter(num => arr2.includes(num) && arr3.includes(num));
 };

console.log(intersectArr(arrNumber1, arrNumber2, arrNumber3));

/* Ejercicio 5
Dado un array de ciudades, sacar en un nuevo array las ciudades no capitales con unos nuevos
parámetros que sean city e isSpain. El valor de isSpain será un booleano indicando si es
una ciudad de España*/

const arrCities2 = [
    {city: 'Logroño', country: 'Spain', capital: false},
    {city: 'Bordeaux', country: 'France', capital: false},
    {city: 'Madrid', country: 'Spain', capital: true},
    {city: 'Florence', country: 'Italy', capital: false},
    {city: 'Oslo', country: 'Norway', capital: true},
    {city: 'Jaén', country: 'Spain', capital: false}
];

const nonCapitalCities = arrCities2
  .filter(city => !city.capital) // Filtramos las no capitales
  .map(city => ({
    city: city.city, // Añadimos la propiedad 'city'
    isSpain: city.country === 'Spain' // Añadimos la propiedad 'isSpain'
  }));

console.log(nonCapitalCities)

/* Ejercicio 6 
Crear una función que redondee un número float a un número específico de decimales.
La función debe tener dos parámetros:
    -Primer parámetro es un float con x decimales
    -Segundo parámetro es un int que indique el número de decimales al que redondear
    -Evitar usar el método toFixed()*/

function roundTo(float, int) {
    const factor = Math.pow(10, int); // Desplazamos los decimales 10^int lugares
    return Math.round(float * factor) / factor; // Redondeamos y volvemos a dividir 
  };

console.log(roundTo(2.1234, 3));

/* Ejercicio 7
Crea una función que retorne los campos de un objeto que equivalgan a un valor 'falsy' 
después de ser ejecutados por una función específica.
La función debe tener dos parámetros:
    -Primer parámetro es un objeto con x número de campos y valores
    -Segundo parámetro es una función que retorne un booleano, que se tiene que aplicar
    al objeto del primer parámetro. */

function returnFalsyValues(obj, func) {
    const result = [];
    for (const key in obj) {
        if (!func(obj[key])){
            result[key] = obj[key]; // Guardamos los campos 'falsy' en el nuevo objeto
        }
    }
    return result;
};

console.log(returnFalsyValues({a: 1, b: '2', c: 3}, x => typeof x === 'string'));

/* Ejercicio 8
Crea una función que convierta un número de bytes en un formato con valores
legibles ('B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB')
La función debe tener 2 parámetros:
    -Primer parámetro debe ser el número de bytes
    -Segundo parámetro debe ser un número especificando la cantidad de
    dígitos a los que se debe truncar el resultado (esto se puede hacer
    con Number.prototype.toPrecision()). Por defecto, este parámetro debe
    de tener un valor de 3. */

function fromBytesToFormattedSizeUnits(bytes, precision = 3) {
    // Validamos que los bytes pasados sean un número
    if (isNaN(bytes)) {
        return "Invalid input";
    }
    
    // Si los bytes son 0, devolvemos "0 B"
    if (bytes === 0) {
        return `0 B`;
    }
    
    // Unidades de medida
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    // Trabajamos con el valor absoluto para los cálculos
    const isNegative = bytes < 0; // Verificar si el número es negativo
    bytes = Math.abs(bytes);
    
    // Convertimos bytes a la unidad adecuada solo si es mayor o igual a 1024
    let index = 0;
    while (bytes >= 1024 && index < units.length - 1) {
        bytes /= 1024;
        index++;
    }
    
    // Aplicamos la precisión (para las conversiones con decimales)
    bytes = Number(bytes.toPrecision(precision));
    
    // Si el valor es menor a 1 KB y la unidad no ha cambiado (es decir, sigue en B), entonces aseguramos que la unidad sea KB
    if (index === 0 && bytes >= 1 && bytes < 1024) {
        bytes = 1;
        index = 1; // Cambiar a KB
    }
    
    // Agregar el signo negativo si el número original era negativo
    return `${isNegative ? '-' : ''}${bytes} ${units[index]}`;
};
    
const result1 = fromBytesToFormattedSizeUnits(1000);
console.log('result 1: ' + result1); // "1 KB"
    
const result2 = fromBytesToFormattedSizeUnits(123456789);
console.log('result 2: ' + result2); // "118 MB"
    
const result3 = fromBytesToFormattedSizeUnits(-12145489451.5932, 5);
console.log('result 3: ' + result3); // "-11.311 GB"

/* Ejercicio 9
Crea una función que a partir de un objeto de entrada, retorne un objeto
asegurándose que las claves del objeto estén en lowercase.
La función debe tener un objeto como único parámetro. */

function toLowercaseKeys(obj) {
    const newObj = {}; // Creamos un nuevo objeto vacío
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // Verificamos que sea una propiedad propia
            newObj[key.toLowerCase()] = obj[key]; // Añadimos al nuevo objeto con la clave en minúsculas
        }
    }
    return newObj;
};

const myObject = { NamE: 'Charles', ADDress: 'Home Street' };
const myObjLowercase = toLowercaseKeys(myObject);
console.log(myObjLowercase); // { name: 'Charles', address: 'Home Street' }

/* Ejercicio 10
Crea una función que elimine las etiquetas html o xml de un string.
La función debe tener un string como único parámetro. */

function removeHTMLTags(string) {
    let regex = /<[^>]+>/g;
    return string.replace(regex, '');
}

console.log(removeHTMLTags('<div><span>lorem</span> <strong>ipsum</strong></div>')); // lorem ipsum

/* Ejercicio 11
Crea una función que tome un array como parametro y lo divida en arrays
nuevos con tantos elementos como sean especificados.
La función debe tener dos parámetros:
    -El primer parámetro es el array entero que se quiere dividir.
    -El segundo parámetro es el número de elementos que deben tener los
    arrays en los que se divida el array original del primer parámetro. */

function splitArrayIntoChunks(arr, size) {
    const newArr = []; // Array para almacenar los trozos divididos
    for (let i = 0; i < arr.length; i+=size) { // Bucle para generar números a usar como índices para hacer el slice adecuadamente
        newArr.push(arr.slice(i, i+size)); // Pusheamos en el nuevo array los trozos divididos
    }
    return newArr;
}

console.log(splitArrayIntoChunks([1, 2, 3, 4, 5, 6, 7], 3)); // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7 ] ]