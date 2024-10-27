<template>
  <q-form
    class="FormUser row justify-center q-gutter-lg q-mr-lg q-ml-sm"
    @submit.prevent="onSubmit"
  >
    <div class="col-12">
      <user-avatar />
    </div>
    <div class="col-12">
      <q-input standout v-model="userEdit.name" label="Name" />
    </div>
    <div class="col-12">
      <q-input
        standout
        v-model="userEdit.email"
        label="Email"
        type="email"
        :disable="route.name == 'Editando usuário'"
      />
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
      <div class="col-12">
        <q-btn type="submit" :label="nameBtn" color="primary" no-caps />
      </div>
    </div>
  </q-form>
</template>
<script setup>
import { storeToRefs } from "pinia";
import useUsers from "src/composables/Requests/useUsers";
import { useUserStore } from "src/stores/user";
import { useRoute } from "vue-router";
import UserAvatar from "src/components/UserAvatar.vue";
const storeUser = useUserStore();
const { userEdit } = storeToRefs(storeUser);
const { updateOrCreateUser } = useUsers();
const route = useRoute();
const nameBtn = route.name == "Editando usuário" ? "Update" : "Criar usuário";
const onSubmit = async () => {
  await updateOrCreateUser(userEdit.value.id, userEdit.value);
};
</script>
<style lang=""></style>
