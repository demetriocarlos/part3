
const mongoose= require('mongoose')
const {model,Schema} =require('mongoose')


const personSchema = new mongoose.Schema({
    name:{
      type: String, 
      minlength: 3
    },
    number:{
      type: String,
      validate: {
        validator: function(v) {
          // Validar el número de teléfono con el formato requerido
          return /^\d{2,3}-\d{6,}$/.test(v);
        },
        message: props => `${props.value} no es un número de teléfono válido. Debe tener el formato XX-XXXXXXXX.`
      },
      required: true
    },
})    
    

personSchema.set('toJSON', {    
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Person = model('Person', personSchema)

 

/*
const person= new Person({
  name:'Ada Lovelace',
  number:'040-1231236'
})

person.save()
  .then(result =>{
      console.log(result)
      mongoose.connection.close()
  })
  .catch(err =>{
      console.log(err)
  })
*/

module.exports = Person