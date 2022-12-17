import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const useToast = () => {
  const navigate = useNavigate();

  const useToast = (type: string, message: string) => {
    if (type && type === 'error') {
      return toast.error(message, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else if (type && type === 'success') {
      return toast.success(message, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const notify = (type: string, message: string, redirect = true) => {
    const toast = useToast(type, message);
    setTimeout(() => {
      toast;
    }, 2000);

    redirect === true && navigate('/');
  };

  return { notify };
};
