
function testRequest() {
    console.log("Llamando a la API...");

    fetch("http://localhost:9090/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => {
        if (result.status === 200) {
            result.json().then(json => {
                console.log("API respondió con éxito:");
                console.log(json);

                // compile the template
                const usersScriptHTML = document.getElementById('usersTemplate').innerHTML;


                let template = Handlebars.compile(usersScriptHTML);



                // execute the compiled template and print the output to the console
                var compiledData = template(json);
                console.log(compiledData);
                document.getElementById("content").innerHTML = compiledData;
            });
        } else {
            console.log("Error al conectar con la API:");
            console.log(result);
        }
    })

}