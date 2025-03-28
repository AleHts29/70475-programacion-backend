function testRequest() {
    fetch('http://localhost:8080/test', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            if (result.status === 200) {
                result.json()
                    .then(data => console.log(data));
            } else {
                console.log(result);
                alert("Error al conectar con el API.");
            }
        })
}