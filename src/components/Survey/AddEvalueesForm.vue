<template>
  <q-item>
    <q-item-section>
      <q-select
        v-model="formFilter.sucursal_id"
        :options="sucursales"
        label="Sucursal"
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
      />
    </q-item-section>
    <q-item-section>
      <q-select
        v-model="formFilter.linea_id"
        :options="lineas"
        label="Linea"
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
      />
    </q-item-section>
    <q-item-section>
      <q-select
        v-model="formFilter.departamento_id"
        :options="departamentos"
        label="Departamentos"
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
      />
    </q-item-section>
    <q-item-section>
      <q-select
        v-model="formFilter.puesto_id"
        :options="puestos"
        label="Puestos"
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
      />
    </q-item-section>
    <q-item-section>
      <q-btn
        color="primary"
        icon="search"
        label="Buscar"
        dense
        filled
        @click="filter"
      />
    </q-item-section>
  </q-item>
  <q-separator />
  <q-item v-for="evaluee in evaluees" :key="evaluee.id">
    <q-item-section>
      <q-toggle
        color="blue"
        :label="
          evaluee.nombre +
          ' ' +
          evaluee.apellido_paterno +
          ' ' +
          evaluee.apellido_materno
        "
        v-model="selectedEvaluee"
        :val="evaluee.user_id"
      />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { sendRequest } from "src/boot/functions";

const { survey } = defineProps(["survey"]);
const evaluees = ref([]);
const selectedEvaluee = ref([]);
const sucursales = ref([]);
const lineas = ref([]);
const departamentos = ref([]);
const puestos = ref([]);

const formFilter = ref({
  sucursal_id: null,
  linea_id: null,
  departamento_id: null,
  puesto_id: null,
});

const filter = async () => {
  const final = { ...formFilter.value };
  let res = await sendRequest("POST", final, "/api/empleado/filter", "");
  const evalueesConUserId = res.filter((empleado) => empleado.user_id);
  evaluees.value = evalueesConUserId;
};

const getSucursales = async () => {
  let res = await sendRequest("GET", null, "/api/sucursal/all", "");
  sucursales.value = res;
};

const getLineas = async () => {
  let res = await sendRequest("GET", null, "/api/linea/all", "");
  lineas.value = res;
};

const getDepartamentos = async () => {
  let res = await sendRequest("GET", null, "/api/departamento/all", "");
  departamentos.value = res;
};

const getPuestos = async () => {
  let res = await sendRequest("GET", null, "/api/puesto/all", "");
  puestos.value = res;
};

const marcarToggles = () => {
  // Verificar si existe la propiedad evaluee en survey y si tiene usuarios asociados
  if (survey.evaluee) {
    // Recorrer los usuarios asociados a survey.evaluee
    for (const usuario of survey.evaluee) {
      // Agregar el ID del usuario al array selectedEvaluee
      selectedEvaluee.value.push(usuario.id);
    }
  }
};

const getAll = async () => {
  let res = await sendRequest("GET", null, "/api/empleado/negocios", "");
  sucursales.value = res.sucursales;
  lineas.value = res.lineas;
  departamentos.value = res.departamentos;
  puestos.value = res.puestos;
  const evalueesConUserId = res.empleados.filter(
    (empleado) => empleado.user_id
  );
  evaluees.value = evalueesConUserId;
};

onMounted(() => {
  // getSucursales();
  // getLineas();
  // getDepartamentos();
  // getPuestos();
  getAll();
  marcarToggles();
});

defineExpose({
  selectedEvaluee,
});
</script>
