import test from "node:test";
import assert from "node:assert";

//definiar los requestData
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1OTQzNTk5LCJleHAiOjE2OTU5Nzk1OTl9.kOafndlSmj_6sIF6taAZbDBOTksYnDGiIeRfbfGLlpk";

const dataCliente = {
  nombre_completo: "Juan Pére",
  fecha_nacimiento: "1995-05-15",
  nit: "1234348111",
  dpi: "1234567890876",
  direccion: "456 Avenida Principal",
  telefono: "98765432",
  contrasenia_agencia_virtual: "",
  correo: "jua90@example.com",
  contrasenia_correo: "clavesecr_277",
  firma_electronica: "",
  usuario_contraloria: "",
  numero_cuenta: "",
  usuario_mineduc: "",
  contrasenia_mineduc: "",
  referencia_personal: "Referencia Personal 1",
  honorarios: 1500.75,
  comentarios: "Comentario adicional 1",
  id_tipo_cliente: 1,
};

const dataClienteCompleto = {
  nombre_completo: "Elias Xeron de la Cruz",
  fecha_nacimiento: "1998-05-15",
  nit: "123466111",
  dpi: "1234512120088",
  direccion: "456 Avenida Principal",
  telefono: "98712165",
  contrasenia_agencia_virtual: "passAgenciA",
  correo: "edgarx@example.com",
  contrasenia_correo: "clavesecr_277",
  firma_electronica: "ssdflskdfjlks",
  usuario_contraloria: "UserContraloria",
  numero_cuenta: "234238479",
  usuario_mineduc: "UserMineduc",
  contrasenia_mineduc: "añslkfj",
  referencia_personal: "Referencia Personal 1",
  honorarios: 1500.75,
  comentarios: "Comentario adicional 1",
  id_tipo_cliente: 2,
};

const dataClienteObligatorio = {
  nombre_completo: "",
  fecha_nacimiento: "",
  nit: "",
  dpi: "",
  direccion: "",
  telefono: "",
  contrasenia_agencia_virtual: "",
  correo: "edgarx@example.com",
  contrasenia_correo: "clavesecr_277",
  firma_electronica: "",
  usuario_contraloria: "",
  numero_cuenta: "",
  usuario_mineduc: "",
  contrasenia_mineduc: "",
  referencia_personal: "Referencia Personal 1",
  honorarios: 1500.75,
  comentarios: "Comentario adicional 1",
  id_tipo_cliente: 2,
};

const dataServicio = {
  nombre: "",
  tipo_servicio: "",
  precio: 0,
  id_categoria: 1,
};

const dataServicioCompleto = {
  nombre: "Nombre del servicio",
  tipo_servicio: "Trámite",
  precio: 110,
  id_categoria: 1,
  requisitos: [
    {
      nombre: "Requisito 1",
    },
    {
      nombre: "Requisito 2",
    },
    {
      nombre: "Requisito 3",
    },
  ],
};

test("login", async () => {
  try {
    const response = await fetch("http:localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: "samines@gmail.com",
        contrasenia: "Admin#123",
      }),
    });
    const data = await response.json();
    assert.equal(data.usuario.correo, "samines@gmail.com");
    console.log("Correo que viene de la petición: ", data.usuario.correo);
  } catch (error) {
    throw new Error("Algo salio mal");
  }
});

test("Crear cliente, petición sin token de autorización", async () => {
  try {
    const response = await fetch("http:localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // token: token,
      },
      body: JSON.stringify(dataCliente),
    });
    const status = response.status;
    console.log("status de la petición", status);
    assert.equal(status, 401); //código 401 Unauthorized
  } catch (error) {
    throw new Error("Algo salio mal");
  }
});

test("Crear cliente, con duplicidad de datos", async () => {
  try {
    const response = await fetch("http:localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(dataCliente),
    });
    const dataResponse = await response.json();
    const { error } = dataResponse;
    console.log("Error de la petición: ", error);
    const status = response.status;
    console.log("status de la petición", status);
    assert.equal(status, 400); //código 400 bad request
    assert.equal(error, "Ya existe un cliente con estos datos únicos."); //Camparar el mensaje de error
  } catch (error) {
    throw new Error("Algo salio mal");
  }
});

test("Crear cliente, con todos los datos proporcionados", async () => {
  try {
    const response = await fetch("http:localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(dataClienteCompleto),
    });
    const dataResponse = await response.json();
    const status = response.status;
    console.log("status de la petición", status);
    assert.equal(status, 201); //código 400 bad request
    assert.equal(dataResponse.nombre_completo, "Elias Xeron de la Cruz");
  } catch (error) {
    throw new Error("Algo salio mal");
  }
});

test("Crear cliente, sin campos obligatorios", async () => {
  try {
    const response = await fetch("http:localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(dataClienteObligatorio),
    });
    const dataResponse = await response.json();
    const { error } = dataResponse;
    const status = response.status;
    console.log("status de la petición", status);
    assert.equal(status, 400); //código 400 bad request
    assert.equal(
      error,
      "Los siguientes campos son obligatorios y no pueden estar vacíos: nombre_completo, fecha_nacimiento, nit, dpi, direccion, telefono"
    ); //Camparar el mensaje de error
  } catch (error) {
    throw new Error("Algo salio mal");
  }
});

test("Registro de servicio", async () => {
  try {
    const response = await fetch("http:localhost:3000/crear-servicio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(dataServicio),
    });
    const dataResponse = await response.json();
    const { error } = dataResponse;
    const status = response.status;
    console.log("status de la petición", status);
    assert.equal(status, 400); //código 400 bad request
    assert.equal(
      error,
      "Los siguientes campos son obligatorios y no pueden estar vacíos: nombre, tipo_servicio, precio"
    ); //Camparar el mensaje de error
  } catch (error) {
    throw new Error("Algo salio mal");
  }
});

test("Registro de servicio", async () => {
  try {
    const response = await fetch("http:localhost:3000/crear-servicio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(dataServicioCompleto),
    });
    const dataResponse = await response.json();
    const { message } = dataResponse;
    const status = response.status;
    console.log("status de la petición", status);
    assert.equal(status, 201);
    assert.equal(message, "Servicio creado con requisitos"); //Camparar el mensaje de error
  } catch (error) {
    throw new Error("Algo salio mal");
  }
});
