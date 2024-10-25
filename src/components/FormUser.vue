<template>
  <q-form
    class="FormUser row justify-center q-gutter-lg"
    @submit.prevent="onSubmit"
  >
    <div class="col-12">
      <q-input standout v-model="userEdit.name" label="Name" />
    </div>
    <div class="col-12">
      <q-input standout v-model="userEdit.email" label="Email" type="email" />
    </div>
    <div class="col-12">
      <q-input
        standout
        v-model="userEdit.date_of_birth"
        type="date"
        label="Data de nascimento"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />
    </div>
    <div class="row justfy-end">
      <div class="col-2">
        <q-btn type="submit" label="Update" color="primary" />
      </div>
    </div>
  </q-form>
</template>
<script setup>
import { storeToRefs } from "pinia";
import useUsers from "src/composables/Requests/useUsers";
import { useUserStore } from "src/stores/user";

const storeUser = useUserStore();
const { userEdit } = storeToRefs(storeUser);
const { updateOrCreateUser } = useUsers();
const onSubmit = async () => {
  await updateOrCreateUser(userEdit.value.id, userEdit.value);
};
</script>
<style lang=""></style>
