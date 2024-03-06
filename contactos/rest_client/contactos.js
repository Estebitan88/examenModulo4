const IP = "192.168.1.162";
const PORT = 3001;
const URL = "http://" + IP + ":" + +PORT + "/";

export const getAllContacts = (fnRefreshList) => {
  console.log("getAllContacts ..");
  fetch(URL + "contactos")
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      fnRefreshList(body);
    });
};
//g
export const saveContactRest = (contact, fnShowMessage) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: contact.nombre,
      apellido: contact.apellido,
      celular: contact.celular,
    }),
  };
  fetch(URL + "contactos", config)
    .then((response) => response.json())
    .then((body) => {
      fnShowMessage("Se ha creado el contacto");
      console.log(body);
    });
};

export const updateContactRest = (contact, fnShowMessage) => {
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //id: contact.id,
      nombre: contact.name,
      apellido: contact.surname,
      celular: contact.phoneNumber,
    }),
  };
  fetch(URL + "contactos/" + contact.id, config)
    .then((response) => response.json())
    .then((body) => {
      fnShowMessage("Contacto actualizado");
      console.log(body);
    });
};

export const deleteContactRest = (contact, fnShowMessage) => {
  const config = {
    method: "DELETE",
  };
  fetch(URL + "contactos/" + contact.id, config)
    .then((response) => response.json())
    .then((body) => {
      fnShowMessage("Se ha eliminado el contacto");
      console.log(body);
    });
};
