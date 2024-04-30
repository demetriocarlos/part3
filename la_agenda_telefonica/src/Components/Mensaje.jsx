 

// eslint-disable-next-line react/prop-types
export const Mensaje = ({mensaje,setMensaje,texto}) => {

    const mensajeExito = () => {
        if (mensaje !== null) {
             
              // eslint-disable-next-line react/prop-types
              return `${texto} : ${mensaje.name}`
        }

        return null;
    };

    setTimeout(() => {
        setMensaje(null);
         
    }, 5000);

  return (
    <div className='add'>
        {
             mensajeExito()
        }
    </div>
  )
}
