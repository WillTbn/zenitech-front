<template>
  <q-card class="DeleteUsers justify-center text-center">
    <q-card-section>
      <q-avatar size="10rem" class="avatar-control q-ma-sm" square>
        <img :src="user.photo" />
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-lg">
      <b> {{ user.email }}</b>
    </q-card-section>
    <q-card-section class="q-pt-lg">
      <b> {{ user.name }}</b>
    </q-card-section>
    <q-card-section class="q-pt-lg">
      <b> {{ user.date_of_birth }}</b>
    </q-card-section>
  </q-card>
</template>
<script setup>
import useUsers from "src/composables/Requests/useUsers";
const { deleteUser, getListUsers } = useUsers();
const props = defineProps({ user: { type: Object } });
</script>
<style lang=""></style>
