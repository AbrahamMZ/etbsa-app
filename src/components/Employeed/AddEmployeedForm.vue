<template>
  <q-form class="q-gutter-y-sm" ref="myForm" greedy>
    <!-- <q-item>
      <q-item-section>
        <q-file
          filled
          dense
          bottom-slots
          v-model="formEmployee.fotografia"
          label="Fotografia"
          max-file-size="2048"
          clearable
          accept=".jpg"
          max-files="1"
        >
          <template v-slot:before>
            <q-avatar
              color="primary"
              text-color="white"
              caption
              icon="photo_camera"
            >
            </q-avatar>
          </template>

          <template v-slot:hint>(Opcional)</template>

          <template v-slot:after>
            <q-btn round dense flat icon="send" />
          </template>
        </q-file>
      </q-item-section>
    </q-item> -->
    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.nombre"
          filled
          dense
          label="Primer Nombre"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
        />
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.segundo_nombre"
          filled
          dense
          label="Segundo Nombre"
          hint="(opcional)"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.apellido_paterno"
          filled
          dense
          label="Apellido paterno"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
        />
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.apellido_materno"
          filled
          dense
          label="Apellido materno"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.telefono"
          filled
          dense
          label="Telefono"
          mask="##########"
          lazy-rules
          hint
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.telefono_institucional"
          filled
          dense
          label="Telefono Institucional"
          mask="##########"
          hint="Opcional"
          :rules="[
            (val) =>
              !val || (val && /^\d{10}$/.test(val)) || 'Debe tener 10 dígitos',
          ]"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.correo_institucional"
          filled
          dense
          label="Correo institucional"
          hint="Opcional"
          lazy-rules
          :rules="[
            (v) => !v || /.+@.+\..+/.test(v) || 'Formato de correo inválido',
          ]"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.calle"
          lazy-rules
          label="Calle"
          hint
        />
      </q-item-section>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.numero_exterior"
          label="# Exterior"
          lazy-rules
          hint
        />
      </q-item-section>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.numero_interior"
          label="# Interior"
          hint="Opcional"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.colonia"
          lazy-rules
          label="Colonia"
          hint
        />
      </q-item-section>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.codigo_postal"
          label="Codigo postal"
          mask="#####"
          lazy-rules
          hint
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.ciudad"
          lazy-rules
          hint
          label="Ciudad"
        />
      </q-item-section>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.estado"
          lazy-rules
          label="Estado"
          hint
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          filled
          dense
          v-model="formEmployee.fecha_de_nacimiento"
          mask="date"
          label="Fecha de Nacimiento"
          lazy-rules
          hint
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="formEmployee.fecha_de_nacimiento">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="gray" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.curp"
          filled
          dense
          label="CURP"
          lazy-rules
          hint
        />
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.rfc"
          filled
          dense
          label="RFC"
          lazy-rules
          hint
          :rules="[
            (val) => !!val || 'Este campo es obligatorio',
            (val) =>
              (val && val.length === 13) ||
              'El RFC debe tener exactamente 13 dígitos',
          ]"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.ine"
          filled
          dense
          label="INE"
          lazy-rules
          mask="##########"
          hint
        />
        <!-- :rules="[
            (val) => !!val || 'Este campo es obligatorio',
            (val) => (val && val.length === 10) || 'El INE debe tener exactamente 10 dígitos'
          ]" -->
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.licencia_de_manejo"
          filled
          dense
          label="Licencia de manejo"
          hint="(opcional)"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.passaporte"
          filled
          dense
          label="Pasaporte"
          hint="(opcional)"
        />
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.visa"
          filled
          dense
          label="Visa"
          hint="(opcional)"
          mask="################"
          :rules="[
            (val) =>
              !val || (val && /^\d{16}$/.test(val)) || 'Debe tener 16 dígitos',
          ]"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-select
          v-model="formEmployee.escolaridad_id"
          :options="escolaridades"
          label="Escolaridad"
          option-value="id"
          option-label="nombre"
          option-disable="inactive"
          emit-value
          map-options
          transition-show="jump-up"
          transition-hide="jump-up"
          clearable
          filled
          dense
          hint
        />
      </q-item-section>
    </q-item>
    <q-item v-if="[4, 5, 6].includes(formEmployee.escolaridad_id)">
      <q-item-section>
        <q-input
          v-model="formEmployee.cedula_profecional"
          filled
          dense
          label="Cedula Profesional"
          hint
        />
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.carrera"
          filled
          dense
          label="Carrera"
          hint
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.nss"
          filled
          dense
          label="Numero de seguridad social"
          mask="###########"
          lazy-rules
          hint
        />
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.hijos"
          filled
          dense
          label="Numero de hijos"
          mask="###"
          hint="Opcional"
        />
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="formEmployee.dependientes_economicos"
          filled
          dense
          label="Numero de dependientes economicos"
          mask="###"
          hint="Opcional"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-select
          v-model="formEmployee.estado_civil_id"
          :options="estadosCiviles"
          label="Estado civil"
          option-value="id"
          option-label="nombre"
          option-disable="inactive"
          emit-value
          map-options
          transition-show="jump-up"
          transition-hide="jump-up"
          clearable
          filled
          dense
          hint
        />
      </q-item-section>
      <q-item-section>
        <q-select
          v-model="formEmployee.tipo_de_sangre_id"
          :options="tiposDeSangre"
          label="Tipo de sangre"
          option-value="id"
          option-label="nombre"
          option-disable="inactive"
          emit-value
          map-options
          transition-show="jump-up"
          transition-hide="jump-up"
          clearable
          filled
          dense
          hint
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-input
          v-model="formEmployee.cuenta_bancaria"
          filled
          dense
          label="Numero de cuenta bancarias"
          mask="##################"
          lazy-rules
          hint
        />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { sendRequest } from "src/boot/functions";

const estadosCiviles = ref(null);
const tiposDeSangre = ref([]);
const escolaridades = ref([]);
const myForm = ref(null);

const formEmployee = ref({
  nombre: null,
  segundo_nombre: null,
  apellido_paterno: null,
  apellido_materno: null,
  telefono: null,
  telefono_institucional: null,
  fecha_de_nacimiento: null,
  curp: null,
  rfc: null,
  ine: null,
  passaporte: null,
  visa: null,
  licencia_de_manejo: null,
  nss: null,
  hijos: null,
  dependientes_economicos: null,
  escolaridad_id: null,
  cedula_profecional: null,
  carrera: null,
  numero_exterior: null,
  numero_interior: null,
  calle: null,
  colonia: null,
  codigo_postal: null,
  ciudad: null,
  estado: null,
  cuenta_bancaria: null,
  estado_civil_id: null,
  tipo_de_sangre_id: null,
  correo_institucional: null,
});

const getEstadosCiviles = async () => {
  let res = await sendRequest("GET", null, "/api/estadoCivil/all", "");
  estadosCiviles.value = res;
};

const getTiposDeSangre = async () => {
  let res = await sendRequest("GET", null, "/api/tipoDeSangre/all", "");
  tiposDeSangre.value = res;
};

const getEscolaridades = async () => {
  let res = await sendRequest("GET", null, "/api/escolaridad/all", "");
  escolaridades.value = res;
};

const getAll = async () => {
  let res = await sendRequest("GET", null, "/api/empleado/personal", "");
  estadosCiviles.value = res.estados_civiles;
  tiposDeSangre.value = res.tipos_de_sangre;
  escolaridades.value = res.escolaridades;
};

const validate = async () => {
  return await myForm.value.validate();
};

onMounted(() => {
  // getEstadosCiviles();
  // getTiposDeSangre();
  // getEscolaridades();
  getAll();
});

defineExpose({
  formEmployee,
  validate,
});
</script>
