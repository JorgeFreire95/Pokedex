import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

const BackButtonHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let listener = null;

    const registerListener = async () => {
      listener = await CapacitorApp.addListener('backButton', () => {
        // Si estamos en la raíz del proyecto, salimos de la app
        if (location.pathname === '/') {
          CapacitorApp.exitApp();
        } else {
          // De lo contrario, volvemos a la pantalla anterior en React Router
          navigate(-1);
        }
      });
    };

    registerListener();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [navigate, location.pathname]);

  return null;
};

export default BackButtonHandler;
