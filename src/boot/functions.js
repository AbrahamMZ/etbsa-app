// import Swal from 'sweetalert2';
// import { nextTick } from '@vue/runtime-core';
import axios from "axios";
import { Notify } from "quasar";
import { useAuthStore } from "src/stores/auth";


export function show_notify(msj, icon, color, focus) {
  if (focus !== "") {
    nextTick(() => focus.value.focus());
  }
  Notify.create({
    message: msj,
    icon: icon,
    color: color,
  });
}

const sleep = (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
};


// export function confirmation(name,url,redirect){
//     const alert = Swal.mixin({buttonsStyling:true});
//     alert.fire({
//         title:'Are you sure delete '+name+' ?',
//         icon:'question',showCancelButton:true,
//         confirmButtonText:'<i class="fa-solid fa-check"></i> Yes, delete',
//         cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancel'
//     }).then( (result) =>{
//         if(result.isConfirmed){
//             sendRequest('DELETE',{},url,redirect);
//         }
//     });

// }
// export async function sendRequest(method, params, url, redirect = "") {
//   const authStore = useAuthStore();
//   axios.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${authStore.authToken}`;
//   let res;
//   await axios({ method: method, url: url, data: params })
//     .then(({ data }) => {
//       res = data;
//       // Notify.create(data.message);
//       show_notify("Datos cargados con exito", "check", "green", "");
//       setTimeout(
//         () => (redirect !== "" ? (window.location.href = redirect) : ""),
//         2000
//       );
//     })
//     .catch((errors) => {
//       let desc = "";
//       res = errors.response.data;
//       // errors.response.data.errors.map((e) => {
//       //   desc = desc + " " + e;
//       // });
//       // Notify.create({ color: "negative", message: desc });
//       // // show_alerta(desc, "error","red", "");
//     });
//   return res;
// }

export async function sendRequest(method, params, url, redirect = "") {
  const authStore = useAuthStore();
  axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;
  try {
    const response = await axios({ method: method, url: url, data: params });
    const data = response.data;
    show_notify("Datos cargados con éxito", "check", "green", "");
    if (!!redirect) {
      await sleep(2000);
      window.location.href = redirect;
    }
    return data;
  } catch (err) {
    const errorMessage = err.response.data;
    if (typeof errorMessage === 'object' && errorMessage !== null) {
      let errorMessages = [];
      for (const key in errorMessage) {
        if (Object.hasOwnProperty.call(errorMessage, key)) {
          const error = errorMessage[key];
          errorMessages.push(`Error en ${key}: ${error}`);
        }
      }
      show_notify(errorMessages.join('\n'), "check", "red", "");
    } else {
      show_notify('Error desconocido: ' + errorMessage, "check", "red", "");
    }
    throw err;
  }
}

