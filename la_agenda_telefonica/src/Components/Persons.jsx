
 import axios from "axios";

// eslint-disable-next-line react/prop-types
export const Persons = ({person, onDelete}) => {

   
  const handleDelete = async () => {
    // Mostrar un cuadro de diálogo para confirmar la eliminación
    const confirmDelete = window.confirm(`Are you sure you want to delete: ${person.name}?`);
    
    if (confirmDelete) { 
    try {
      // Realizar la solicitud DELETE al servidor
      // eslint-disable-next-line react/prop-types
      await axios.delete(`http://localhost:3001/persons/${person.id}`);
      // Llamar a la función onDelete para actualizar la lista de personas después de eliminar
      // eslint-disable-next-line react/prop-types
      onDelete(person.id);
    } catch (error) {
      console.error('Error deleting person:', error);
       
    }
  }

  };


  return (
    <div> 
      
    <div>
      <p>  </p>
      <p> {person.name}: {person.number}  </p>

      <button onClick={handleDelete}>Delete</button>
    </div>

       
    </div>
  )
}
