// Declaración de la llave para el consumo de API
const API_KEY = '2060adb416c22f1df2cfccd2d81236f4'

// Elementos del DOM
const inputCity = document.getElementById('inptCity')
const btnAsk = document.getElementById('btnAsk')
const labelAlert = document.getElementById('lblAlert')
const divResult = document.getElementById('divResult')

// Declaración de variables
let cityToAsk = ""
let latitudeCity = ''
let longitudCity = ''


// Función principal para obtener el clima
let obtenerClima = (city) => {
    // Endpoint para obtener la Longitud y Longitud por la busqueda de Ciudad
    let urlAPICity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`

    // Consulta de ciudad 
    fetch(`${urlAPICity}`).then(res => res.json())
    .then(data => {
        if (data.length > 0) {
            latitudeCity = data[0]['lat']
            longitudCity = data[0]['lon']
            
            let urlAPIClima = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeCity}&lon=${longitudCity}&appid=${API_KEY}&lang=es&units=metric`
        
            return fetch(`${urlAPIClima}`)
        } else {
            labelAlert.innerHTML = 'NO EXISTEN DATOS PARA LA CONSULTA, REVISE O INTENTE CON OTRA CIUDAD'
        }
    }).then(res => res.json())
    .then(data => {
        console.log(data.weather[0].main);   
        divResult.innerHTML = `<h2>Ciudad: ${cityToAsk}</h2><br />`+
                            `<p>Clima: ${data.weather[0].main}</p> <p>Descripcion: ${data.weather[0].description}</p>` 
    }).catch((err) => console.error('La consulta fallo debido a: ', err))
    

}


// Función para detectar el evento de buscar
btnAsk.addEventListener('click', (event) => {
    cityToAsk = inputCity.value
    // Limpiar los resultados y alertas
    labelAlert.innerHTML = ''
    divResult.innerHTML = ''
    
    obtenerClima(cityToAsk)
})

