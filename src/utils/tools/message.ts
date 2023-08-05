import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const BarterSwal = Swal.mixin({
  color: '#fff',
  background: '#071426',
  customClass: {
    container: 'w-[90%] mx-auto first:text-[18px]',
    title: 'font-bold titleClass',
    htmlContainer: 'swal2-htmlContainer',
    confirmButton: 'p-button p-component w-full p-button-outlined',
    cancelButton: 'p-button p-component w-full p-button-outlined',
    denyButton: 'p-button p-component w-full p-button-outlined',
    actions: 'flex gap-4',
  },
  buttonsStyling: false,
});

const MySwal = withReactContent(BarterSwal);

const triggerError = (error: string, title = 'Error!') => {
  return MySwal.fire({
    title: title,
    text: error,
    icon: 'error',
  });
};

const triggerLoading = (loading: string, title = 'Cargando...') => {
  return MySwal.fire({
    title: title,
    text: loading,
    icon: 'info',
  });
};

const triggerSuccess = (success: string, title = 'Todo correcto!') => {
  return MySwal.fire({
    title: title,
    text: success,
    icon: 'success',
  });
};

const triggerWarning = (warning: string, title = 'Alerta!') => {
  return MySwal.fire({
    title: title,
    text: warning,
    icon: 'warning',
  });
};

export { triggerError, triggerLoading, triggerSuccess, triggerWarning };
export default MySwal;
