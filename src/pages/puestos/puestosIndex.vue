<template>
  <div class="q-pa-md">
    <q-btn
      label="Registrar puesto"
      color="primary"
      @click="showAdd = true"
      icon="add_circle"
    />

    <div><br /></div>

    <q-input
      outlined
      class="boton"
      color="green-9"
      v-model="searchTerm"
      label="Buscar"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <br />

    <q-table
      flat
      bordered
      title="Puestos"
      :rows="filteredPuestos"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
      dense
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Puestos</div>

        <q-dialog
          v-model="showAdd"
          transition-show="rotate"
          transition-hide="rotate"
        >
          <q-card style="max-width: 400px">
            <q-card-section>
              <div class="text-h6">Registrar Puesto</div>
            </q-card-section>
            <q-separator />

            <q-separator />
            <q-card style="max-height: 400px" class="q-pa-none scroll" flat>
              <q-tab-panels v-model="tab" animated keep-alive>
                <q-tab-panel name="tab_form_one">
                  <add-puesto-form ref="form_1"></add-puesto-form>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>

            <q-separator />

            <q-card-actions align="right">
              <q-btn label="Cancelar" color="red" v-close-popup />
              <q-btn flat label="Registrar" color="blue" @click="crearPuesto" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-space />

        <q-select
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          style="min-width: 150px"
          option-value="name"
        />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template v-slot:body-cell-nombre="props">
        <q-td @click="onRowClick(props.row)">
          <q-item class="q-my-none" dense>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">{{
                props.row.nombre.charAt(0).toUpperCase()
              }}</q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.row.nombre }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-td>
      </template>
    </q-table>

    <q-dialog
      v-model="showDetails"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card style="max-width: 400px">
        <q-card-section>
          <div class="text-h6">Actualizar puesto</div>
        </q-card-section>
        <q-separator />

        <q-separator />
        <q-card style="max-height: 400px" class="q-pa-none scroll" flat>
          <q-tab-panels v-model="tab" animated keep-alive>
            <q-tab-panel name="tab_form_one">
              <edit-puesto-form
                ref="edit_1"
                :puesto="selectedPuesto"
              ></edit-puesto-form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="red" v-close-popup />
          <q-btn
            flat
            label="Actualizar"
            color="blue"
            @click="actualizarPuesto()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AddPuestoForm from "src/components/Puesto/AddPuestoForm.vue";
import EditPuestoForm from "src/components/Puesto/EditPuestoForm.vue";

import { sendRequest } from "src/boot/functions";
import { useQuasar } from "quasar";

const form_1 = ref(null);
const edit_1 = ref(null);

const $q = useQuasar();

const showDetails = ref(false);
const selectedPuesto = ref(null);

const visibleColumns = ref(["id", "nombre"]);

const tab = ref("tab_form_one");
const searchTerm = ref("");
const showAdd = ref(false);
const puestos = ref([]);

const onRowClick = (row) => {
  selectedPuesto.value = row;
  showDetails.value = true;
};

const crearPuesto = async () => {
  const form1_valid = await form_1.value.validate();
  if (!form1_valid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Por favor completa todos los campos obligatorios"
    });
    return;
  }
  const final = {
    ...form_1.value.formPuesto
  };
  try {
    let res = await sendRequest("POST", final, "/api/puesto", "");

    showAdd.value = false;
    getPuestos();
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
};

const actualizarPuesto = async () => {
  const edit1_valid = await edit_1.value.validate();
  if (!edit1_valid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Por favor completa todos los campos obligatorios"
    });
    return;
  }
  const final = {
    ...edit_1.value.formPuesto
  };
  try {
    let res = await sendRequest("PUT", final, "/api/puesto/" + final.id, "");

    showDetails.value = false;
    getPuestos();
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
};

const getPuestos = async () => {
  let res = await sendRequest("GET", null, "/api/puesto/all", "");
  puestos.value = res;
};

const columns = [
  { name: "id", label: "ID", align: "left", field: "id", sortable: true },
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true
  }
];

const filteredPuestos = computed(() => {
  return puestos.value.filter((puesto) => {
    return puesto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

onMounted(() => {
  getPuestos();
});
</script>

<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
