<template>
  <q-form class="q-gutter-y-sm" ref="myForm" greedy>
    <q-item>
      <q-item-section style="max-width: 800px">
        <q-input
          v-model="formPermission.name"
          filled
          dense
          label="Nombre"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
        />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
const myForm = ref(null);

const validate = async () => {
  return await myForm.value.validate();
};

const formPermission = ref({
  name: null
});

defineExpose({
  formPermission,
  validate
});
</script>
