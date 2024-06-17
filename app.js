document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('conversionForm');
    const selectMoneda = document.getElementById('selectMoneda');
    const resultadoConversion = document.getElementById('resultadoConversion');

    // Obtener los tipos de cambio de la API
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(response => response.json())
        .then(data => {
            const monedas = data.rates;
            for (const moneda in monedas) {
                const option = document.createElement('option');
                option.value = moneda;
                option.textContent = `${moneda} - ${monedas[moneda]}`;
                selectMoneda.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar las monedas:', error));

    // Manejar el envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const montoUSD = document.getElementById('montoUSD').value;
        const monedaSeleccionada = selectMoneda.value;

        // Realizar la conversión usando la API
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(response => response.json())
            .then(data => {
                if (monedaSeleccionada in data.rates) {
                    const tipoCambio = data.rates[monedaSeleccionada];
                    const montoConvertido = montoUSD * tipoCambio;
                    resultadoConversion.innerHTML = `
                        <p>${montoUSD} USD equivalen a ${montoConvertido.toFixed(2)} ${monedaSeleccionada}</p>
                    `;
                } else {
                    resultadoConversion.textContent = `No se encontró el tipo de cambio para ${monedaSeleccionada}`;
                }
            })
            .catch(error => {
                console.error('Error al realizar la conversión:', error);
                resultadoConversion.textContent = 'Error al realizar la conversión';
            });
    });
});
