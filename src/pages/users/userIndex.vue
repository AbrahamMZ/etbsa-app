<template>
  <div class="q-pa-md">
    <q-btn
      label="Registrar usuario"
      color="primary"
      @click="showAdd = true"
      icon="add_circle"
    />

    <div><br /></div>

    <q-input
      outlined
      class="boton"
      color="gray-9"
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
      title="Users"
      :rows="filteredUsers"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
      dense
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Users</div>

        <q-dialog
          v-model="showAdd"
          transition-show="rotate"
          transition-hide="rotate"
        >
          <q-card style="max-width: 1000px">
            <q-card-section class="d-flex justify-between items-center">
              <div class="text-h6">Registrar Usuario</div>
              <q-card-actions align="right">
                <q-btn label="Cerrar" color="red" v-close-popup />
                <q-btn label="Registrar" color="blue" @click="crearUser" />
              </q-card-actions>
            </q-card-section>
            <q-separator />

            <q-separator />
            <q-card style="max-height: 1000px" class="q-pa-none scroll" flat>
              <q-tab-panels v-model="tab" animated keep-alive>
                <q-tab-panel name="tab_form_one">
                  <add-user-form ref="form_1"></add-user-form>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
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
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template v-slot:body-cell-name="props">
        <q-td @click="onRowClick(props.row)">
          <q-item class="q-my-none" dense>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">{{
                props.row.name.charAt(0).toUpperCase()
              }}</q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.row.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-td>
      </template>

      <template v-slot:body-cell-role="props">
        <q-td>
          <q-btn
            @click="onRowClickFile(props.row)"
            flat
            round
            color="primary"
            icon="shield"
          />
          <q-btn
            @click="onRowClickPermissions(props.row)"
            flat
            round
            color="primary"
            icon="key"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog
      v-model="showDetails"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card style="max-width: 1000px">
        <q-card-section class="d-flex justify-between items-center">
          <div class="text-h6">Actualizar usuario</div>
          <q-card-actions align="right">
            <q-btn label="Cerrar" color="red" v-close-popup />
            <q-btn label="Actualizar" color="blue" @click="actualizarUser()" />
          </q-card-actions>
        </q-card-section>
        <q-separator />

        <q-separator />
        <q-card style="max-height: 1000px" class="q-pa-none scroll" flat>
          <q-tab-panels v-model="tab" animated keep-alive>
            <q-tab-panel name="tab_form_one">
              <edit-user-form
                ref="edit_1"
                :user="selectedUser"
              ></edit-user-form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="showRoles"
      transition-show="rotate"
      transition-hide="rotate"
      persistent
    >
      <q-card>
        <q-card-section class="d-flex justify-between items-center">
          <div class="text-h6">Roles de {{ selectedUser.name }}</div>
          <q-card-actions align="right">
            <q-btn label="Cerrar" color="red" v-close-popup />
            <q-btn
              label="Actualizar roles"
              color="blue"
              @click="asignRolUser()"
            />
          </q-card-actions>
        </q-card-section>
        <q-separator />
        <q-card class="q-pa-none scroll" flat>
          <q-tab-panels v-model="tab2" animated keep-alive>
            <q-tab-panel name="tab_form_two">
              <add-role-user-form ref="edit" :user="selectedUser" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="showPermissions"
      transition-show="rotate"
      transition-hide="rotate"
      persistent
    >
      <q-card>
        <q-card-section class="d-flex justify-between items-center">
          <div class="text-h6">Permisos de {{ selectedUser.name }}</div>
          <q-card-actions align="right">
            <q-btn label="Cerrar" color="red" v-close-popup />
            <q-btn
              label="Actualizar permisos"
              color="blue"
              @click="asignPermissionUser()"
            />
          </q-card-actions>
        </q-card-section>
        <q-separator />
        <q-card class="q-pa-none scroll" flat>
          <q-tab-panels v-model="tab3" animated keep-alive>
            <q-tab-panel name="tab_form_three">
              <add-permission-user-form ref="edit2" :user="selectedUser" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AddUserForm from "src/components/User/AddUserForm.vue";
import EditUserForm from "src/components/User/EditUserForm.vue";
import AddRoleUserForm from "src/components/User/AddRoleUserForm.vue";
import AddPermissionUserForm from "src/components/User/AddPermissionUserForm.vue";
import {
  sendRequest,
  getNamesRoles,
  getNamesPermissions,
} from "src/boot/functions";
import { useQuasar } from "quasar";

const form_1 = ref(null);
const edit_1 = ref(null);
const edit = ref(null);
const edit2 = ref(null);

const $q = useQuasar();

const showDetails = ref(false);
const selectedUser = ref(null);

const visibleColumns = ref(["id", "name", "email", "role"]);

const tab = ref("tab_form_one");
const tab2 = ref("tab_form_two");
const tab3 = ref("tab_form_three");
const searchTerm = ref("");
const showAdd = ref(false);
const users = ref([]);
const showRoles = ref(false);
const showPermissions = ref(false);

const onRowClick = (row) => {
  selectedUser.value = row;
  showDetails.value = true;
};

const onRowClickFile = (row) => {
  selectedUser.value = row;
  showRoles.value = true;
};

const onRowClickPermissions = (row) => {
  selectedUser.value = row;
  showPermissions.value = true;
};

const crearUser = async () => {
  const form1_valid = await form_1.value.validate();
  if (!form1_valid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Por favor completa todos los campos obligatorios",
    });
    return;
  }
  if (
    form_1.value.formUser.password !== form_1.value.formUser.confirmPassword
  ) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "La contraseña y la confirmación de la contraseña no coinciden",
    });
    return;
  }
  const final = {
    ...form_1.value.formUser,
  };
  let res = await sendRequest("POST", final, "/api/user", "");
  showAdd.value = false;
  getUsers();
};

const actualizarUser = async () => {
  const edit1_valid = await edit_1.value.validate();
  if (!edit1_valid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Por favor completa todos los campos obligatorios",
    });
    return;
  }
  if (edit_1.value.formUser.password === "") {
    edit_1.value.formUser.password = null;
    edit_1.value.formUser.confirmPassword = null;
  }
  if (
    edit_1.value.formUser.password !== edit_1.value.formUser.confirmPassword
  ) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "La contraseña y la confirmación de la contraseña no coinciden",
    });
    return;
  }
  const final = {
    ...edit_1.value.formUser,
  };
  let res = await sendRequest("PUT", final, "/api/user/" + final.id, "");
  showDetails.value = false;
  getUsers();
};

const asignRolUser = async () => {
  if (edit.value.selectedRolesNames.length > 0) {
    const final = { roles: edit.value.selectedRolesNames };
    let res = await sendRequest(
      "POST",
      final,
      "/api/user/role/" + selectedUser.value.id
    );
    showRoles.value = false;
    getUsers();
  } else {
    const name = { roles: getNamesRoles(selectedUser.value) };
    let res = await sendRequest(
      "DELETE",
      name,
      "/api/user/role/" + selectedUser.value.id
    );
    showRoles.value = false;
    getUsers();
  }
};

const asignPermissionUser = async () => {
  if (edit2.value.selectedPermissionsNames.length > 0) {
    const final = { permissions: edit2.value.selectedPermissionsNames };
    let res = await sendRequest(
      "POST",
      final,
      "/api/user/permission/" + selectedUser.value.id
    );
    showPermissions.value = false;
    getUsers();
  } else {
    const name = { permissions: getNamesPermissions(selectedUser.value) };
    let res = await sendRequest(
      "DELETE",
      name,
      "/api/user/permission/" + selectedUser.value.id
    );
    showPermissions.value = false;
    getUsers();
  }
};

const getUsers = async () => {
  let res = await sendRequest("GET", null, "/api/user/all", "");
  users.value = res;
};

const columns = [
  { name: "id", label: "ID", align: "left", field: "id", sortable: true },
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "email_verified_at",
    label: "Email_verified_at",
    align: "left",
    field: "email_verified_at",
    sortable: true,
  },
  {
    name: "role",
    label: "Access",
    align: "left",
    sortable: true,
  },
];

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
});

onMounted(() => {
  getUsers();
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
