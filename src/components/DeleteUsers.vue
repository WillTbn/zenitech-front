<template>
  <q-card class="DeleteUsers">
    <q-card-section>
      <div class="text-h6">Você vai delete o {{ user.name }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      Tem certeza que quer excluir o usuário de e-mail
      <b> {{ user.email }}</b>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        flat
        label="Confirmar exclução"
        color="negative"
        v-close-popup
        @click.prevent="setDelete()"
      />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import useUsers from "src/composables/Requests/useUsers";
const { deleteUser, getListUsers } = useUsers();
const props = defineProps({ user: { type: Object } });
const setDelete = async () => {
  // console.log(props.user);
  await deleteUser(props.user.id);
  // deleteUserDialog.value = false;
};
</script>
<style lang=""></style>
