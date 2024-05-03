
 
const mongoose= require('mongoose')
const {model,Schema} = mongoose

const connectionString= process.env.MONGO_DB_URI

mongoose.connect(connectionString,{

}).then(() => {
    console.log('database connect')
}).catch(err => {
    console.log(err)
})



/*
const personSchema = new Schema({
    name:String,
    number:String,
     
  })

  const Person = model('Person', personSchema)
*/
/*
  Person.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
  })
*/

/*
  const person= new Person({
    name:'Ada Lovelace',
    number:040-1231236
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
    