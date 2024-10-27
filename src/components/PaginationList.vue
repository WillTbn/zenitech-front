<template>
  <q-btn
    v-for="(item, index) in pagination.pages"
    :key="index"
    :class="{ 'bg-info ': item.current }"
    @click.prevent="getUsers(item.page)"
  >
    {{ item.page }}
  </q-btn>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "src/stores/user";

import useUsers from "src/composables/Requests/useUsers";

const storeUser = useUserStore();
const { pagination, searchByName } = storeToRefs(storeUser);

const { getListUsers, getListByName } = useUsers();

const getUsers = (page) => {
  searchByName.value
    ? getListByName(searchByName.value, page)
    : getListUsers(page);
};
</script>
<style lang=""></style>
