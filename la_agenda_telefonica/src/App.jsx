import { useEffect, useState } from "react";
import { Filter } from "./Components/Filter";
import { PersonForm } from "./Components/PersonForm";
import { Persons } from "./Components/Persons";
import { Mensaje } from "./Components/Mensaje.jsx";
import { MensajeError } from "./Components/MensajeError.jsx";

import personService from "./services/Person.jsx";

function App() {
  const [persons, setPersons] = useState([]);

  const [personData, setPersonData] = useState({
    name: "",
    number: "",
  });

  const [mensajeUpdate, setMensajeUpdate] = useState(null);
  const [mensajeAdd, setMensajeAdd] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showMessage = (text, type) => {
    setMessageError({ text, type });
    setTimeout(() => {
      setMessageError(null);
    }, 3000); // Ocultar el mensaje después de 3 segundos
  };

  const addPerson = async (e) => {
    e.preventDefault();
    //no se podra crear un nuevo nombre si ya exixste
    /*if (persons.some(person => person.name === personData.name)) {
    alert(`${personData.name} : is already added to phonebook`);
    return;
  }*/

    try {
      // Verificar si el número ya existe en la lista de personas
      const existingPerson = persons.find(
        (person) => person.name === personData.name
      );

      if (existingPerson) {
        // Mostrar un cuadro de confirmación al usuario antes de realizar la actualización
        const confirmUpdate = window.confirm(
          `The number ${personData.name} already exists. Do you want to update it?`
        );

        if (confirmUpdate) {
          // Si el número ya existe, actualizar la información de la persona existente con el nuevo número
          personService
            .update(existingPerson.id, personData)
            .then((response) => {
              // Actualizar el estado con la persona actualizada
              setPersons(
                persons.map((person) =>
                  person.id === response.id ? response : person
                )
              );

              setMensajeUpdate(response);
            });
        } else {
          // Si el usuario cancela la actualización, salir de la función sin hacer nada
          return;
        }
      } else {
        if (!personData.name || personData.name.length < 3) {
          setCreateError(
            `Person validation failed:name:path 'name' (${personData.name}) is shorter than the minimum allowed length (3)`
          );
        } else {
          personService
            // Si el número no existe, agregar una nueva persona
            .create(personData)
            .then((response) => {
              // Actualizar el estado con la nueva persona
              setPersons(persons.concat(response.data));

              setMensajeAdd(response.data);
            })
            .catch((error) => {
              //console.log(error.response.data.error); // Muestra el error completo si no se puede acceder a la propiedad 'data'
              /*setCreateError(
                `Person validation failed:name:path 'name' (${personData.name}) is shorter than the minimum allowed length (3)`
              );*/
              setCreateError(error.response.data.error);
            });
        }
      }

      // Limpiar los campos del formulario después de agregar o actualizar la persona
      setPersonData({
        name: "",
        number: "",
      });
    } catch (error) {
      showMessage("An error occurred. Please try again later.", "error");
      console.error("Error creating or updating person:", error);
    }
  };

  const handleDelete = (deletedId) => {
    // Filtrar la lista de personas para excluir la persona eliminada
    setPersons((prevPersons) =>
      prevPersons.filter((person) => person.id !== deletedId)
    );
  };

  //console.log(createError);
  return (
    <>
      <div>
        <h2>Phonebook</h2>

        <MensajeError
          createError={createError}
          setCreateError={setCreateError}
        />

        <Mensaje
          setMensaje={setMensajeUpdate}
          mensaje={mensajeUpdate}
          texto={"Update"}
        />

        <Mensaje
          setMensaje={setMensajeAdd}
          mensaje={mensajeAdd}
          texto={"Add"}
        />

        {messageError && (
          <div className={`message ${messageError.type}`}>
            {messageError.text}
          </div>
        )}

        <Filter persons={persons} />

        <br />

        <h2>add a new</h2>

        <PersonForm
          handleChange={handleChange}
          addPerson={addPerson}
          personData={personData}
        />

        <br />

        <h2>Numbers</h2>
        {persons.map((person) => (
          <Persons key={person.id} person={person} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default App;
