// Obtener referencias a mis monedas
var firstMoneySelect = document.getElementById('first-money');
var secondMoneySelect = document.getElementById('second-money');

// mi link de api
var milinkdeapi = 'https://open.er-api.com/v6/latest/USD';

/* Hacer la solicitud a la API para obtener las tasas de cambio aqui encontramos la respuesta a mi dolor de cabeza 
https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch*/
fetch(milinkdeapi)
    .then(response => response.json()) // esto lo conviente en Json
    .then(data => {
        //seleciona las tasas de cambio en la respuesta
        var rates = data.rates;

        // Añadir opciones al primer selector de moneda
        for (var currency in rates) {
            var option = document.createElement('option'); // Crear una opcion
            option.value = currency; // agraga el valor de moneda
            option.textContent = currency; // agrega la moneda
            firstMoneySelect.appendChild(option); // añada al selecctor 
        }
        //copia de arriba para mi segundo seleccionador
        for (var currency in rates) {
            var option = document.createElement('option'); 
            option.value = currency; 
            option.textContent = currency; 
            secondMoneySelect.appendChild(option); 
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error); //ve los errores
    });

// mi botos de convercion
document.getElementById('convert-button').addEventListener('click', function() {
    // se refleja el valor ingresado
    var cantidad = document.getElementById('cantidad').value;

    // las moneda que se seleccionan
    var BaseDatos = firstMoneySelect.value;
    var targetCurrency = secondMoneySelect.value;

    // Construir la URL de la API para obtener las tasas de conversión
    var convertmilinkdeapi = `https://open.er-api.com/v6/latest/${BaseDatos}`;

    // Hacer la solicitud a la API para obtener la tasa de conversión específica
    fetch(convertmilinkdeapi)
        .then(response => response.json()) 
        .then(data => {
            // mi resultado de converssion de moneda
            var exchangeRate = data.rates[targetCurrency];
            
            // la calculasao
            var result = cantidad * exchangeRate;
            
            // se muestra el resultado en result y lo borra 
            document.getElementById('result').textContent = `${cantidad} ${BaseDatos} = ${result.toFixed(2)} ${targetCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error); 
        });
});
