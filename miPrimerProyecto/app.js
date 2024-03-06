const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const puerto = 3001;
const { Client } = require("pg");
//contacto: id, nombre,apellido, celular

app.use(bodyParser.json());

app.use("/contactos", (request, response, next) => {
  console.log("ingresa a midlerware");
  console.log("headers: ", request.headers);
  console.log("body: ", request.body);
  next();
});

app.get("/contactos", (request, response) => {
  const client = new Client({
    user: "postgres",
    host: "192.168.1.162",
    database: "pruebas",
    password: "Andypandy",
    port: 5432,
  });
  client.connect();
  client
    .query("select * from contactos")
    .then((responseQuery) => {
      console.log(responseQuery.rows);
      client.end();
      response.send(responseQuery.rows);
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
  /*const contactos = [
    { id: 1, nombre: "Andrés", apellido: "Guaña", celular: "0984741869" },
    { id: 2, nombre: "Maira", apellido: "Hidalgo", celular: "0981241869" },
    { id: 3, nombre: "Martha", apellido: "Chico", celular: "098434869" },
    { id: 4, nombre: "Maritza", apellido: "Chico", celular: "0984541869" },
  ];*/
  console.log("ingresa al get");
  //response.send(contactos);
});

/*app.post("/contactos", (req, resp) => {
  req.body.id = 99;
  resp.send(req.body);
});*/

app.post("/contactos", (req, resp) => {
  const client = new Client({
    user: "postgres",
    host: "192.168.1.162",
    database: "pruebas",
    password: "Andypandy",
    port: 5432,
  });

  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const celular = req.body.celular;

  client.connect();
  client
    .query("insert into contactos (nombre,apellido,celular)")
    .then((responseQuery) => {
      console.log(responseQuery.rows);
      client.end();
      response.send(responseQuery.rows);
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });

  resp.send(req.body);
});

app.put("/contactos/:idParam", (req, resp) => {
  const id = req.params.idParam;
  const client = new Client({
    user: "postgres",
    host: "192.168.1.162",
    database: "pruebas",
    password: "Andypandy",
    port: 5432,
  });
  client.connect();
  client
    .query("update contactos set nombre where id")
    .then((responseQuery) => {
      console.log(responseQuery.rows);
      client.end();
      response.send(responseQuery.rows);
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
  resp.send(req.body);

  /*resp.send(req.body);
  const id = req.params.idParam;
  console.log("id", id);
  resp.send(req.body);*/
});

app.delete("/contactos/:id", (req, resp) => {
  const client = new Client({
    user: "postgres",
    host: "192.168.1.162",
    database: "pruebas",
    password: "Andypandy",
    port: 5432,
  });
  client.connect();
  client
    .query("delete from contactos where id")
    .then((responseQuery) => {
      console.log(responseQuery.rows);
      client.end();
      response.send(responseQuery.rows);
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });

  resp.send(req.body);
  const id = req.params.idParam;
  console.log("id", id);
  resp.send(req.body);
});

app.listen(3001, () => {
  console.log("Servidor listo en el puerto: " + puerto);
});
