
require('dotenv').config()
require('./mongo')
const express = require('express')

const cors = require('cors');
const morgan= require('morgan')

const Person = require('./models/person')
const handleErrors = require('./Middleware/handleErrors')

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

 

const  getCurrentTimeGMT = () => {
  const now = new Date();
  return now.toUTCString();
};


app.get('/api/persons', (request, response) => {
     
    Person.find({}).then(pers => {
      response.json(pers)
    })
  })


app.get('/info', (request, response) => {
  // Obtener la hora actual en GMT
  const horaActualGMT = getCurrentTimeGMT()

   Person.countDocuments()
   .then(numEntradas =>{
    // Crear la respuesta HTML
    const respuestaHTML = `
    <p>Phonebook has info for ${numEntradas} people</p>
    <br/>
    <p>Hora de la solicitud en GMT: ${horaActualGMT}</p>
   
  `;
  // Enviar la respuesta
  response.send(respuestaHTML);

   })
   .catch(error => {
    console.error('Error al obtener información:', error);
    response.status(500).send('Error interno del servidor');
  });
  
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findById(request.params.id).then(result => {
    response.json(result)
  })
 
})

app.put('/api/persons/:id', (request,response, next) => {
  const {id} = request.params

  const person = request.body

  const newPersonInfo = {
          name: person.name,
          number: person.number
  }
  console.log("optiene el id")
  //actualizar resultado utilizando la id  
  Person.findByIdAndUpdate(id, newPersonInfo, { new: true })
          .then(result => {
                  response.json(result)
                  console.log(result)
          })

          console.log('actualisando el user')
})

 
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))


})



app.post('/api/persons', (request,response,next) => {
  const people = request.body
 
  if(!people || !people.name){
    return response.status(400).json({
       error:'people is missing'
    })
}
  const newPerson = new Person({
    name:people.name,
    number:people.number
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
    console.log(savedPerson)
  })
  .catch((error) => {
    // Si se produce un error durante la validación, captura la excepción
    if (error.name === 'ValidationError') {
      // El error de validación se envía con un código de estado 400 Bad Request
      // junto con un mensaje de error que explica la razón del error
      return response.status(400).json({ error: error.message });
    }

    // Si se produce otro tipo de error, devuelve un código de estado 500 Internal Server Error
    // y un mensaje de error genérico
    console.error('Error al crear una nueva persona:', error);
    response.status(500).json({ error: 'Ha ocurrido un error al procesar la solicitud.' });
  })

}) 


app.use(handleErrors)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})