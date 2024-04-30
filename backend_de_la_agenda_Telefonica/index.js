
const express = require('express')

const cors = require('cors');
const morgan= require('morgan')

const app = express()
app.use(cors());
// Configuración de Morgan para registrar mensajes en la consola con el formato "tiny"
app.use(morgan('tiny'))
app.use(express.json());

// Middleware para registrar los datos enviados en las solicitudes HTTP POST
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('Data sent in POST request:', req.body);
  }
  next();
});


const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const  getCurrentTimeGMT = () => {
  const now = new Date();
  return now.toUTCString();
};


app.get('/api/persons', (request, response) => {
    response.json(persons)
  })


app.get('/info', (request, response) => {
  
  const horaActualGMT = getCurrentTimeGMT();

  const numEntradas = persons.length;

  const respuestaHTML = `
    <h1>Captura de pantalla de 3.2</h1>
    <p>Phonebook has info for ${numEntradas} people</p>
    <br/>
    <p>Hora de la solicitud en GMT: ${horaActualGMT}</p>
   
  `;
  response.send(respuestaHTML);
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

/*
app.delete('/api/persons/:id', (request, response,) => {
  const { id } = Number(request.params);

  persons.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).end(); // Envía la respuesta después de eliminar con éxito
      } else {
        response.status(404).json({ error: "Person not found" }); // Si no se encuentra la persona
      }
    })
    .catch(error => (error));
});
*/

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
    persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) 
    : 0

  const person = request.body
  person.id = maxId + 1

  // Verificar si falta el nombre o el número
  if (!person.name) {
    return response.status(400).json({ 
      error: 'name  are required' 
    })
  }

  //Verificar si el nombre ya existe en la agenda
  if (persons.some(existingPerson => existingPerson.name === person.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  persons.concat(person)
  response.json(person)

  console.log(person)
})





const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})