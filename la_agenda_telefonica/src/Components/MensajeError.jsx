import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const MensajeError = ({ createError, setCreateError }) => {
  useEffect(() => {
    // Programa la eliminación del mensaje después de 5 segundos si existe
    if (createError) {
      const timer = setTimeout(() => {
        setCreateError(null);
      }, 5000);

      // Limpia el temporizador cuando el componente se desmonta o cuando createError cambia
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createError]);

  return (
    <div>{createError && <p className="createError">{createError}</p>}</div>
  );
};
