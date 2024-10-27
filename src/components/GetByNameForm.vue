<template>
  <q-form class="GetByNameForm q-mt-md" @submit.prevent="onSubmit">
    <q-input
      standout
      v-model="getName"
      input-class="text-right"
      class="q-ml-md"
      label="Pesquisa por nome"
    >
      <template v-slot:append>
        <q-btn v-if="getName === ''" flat>
          <q-icon name="search" />
        </q-btn>
        <q-icon v-else name="clear" class="cursor-pointer" @click="closed" />
      </template>
    </q-input>
    <!-- <q-input standout v-model="userEdit.name" label="Name" /> -->
  </q-form>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";

import useUsers from "src/composables/Requests/useUsers";

const storeUser = useUserStore();
const { searchByName } = storeToRefs(storeUser);
const { getListByName, getListUsers } = useUsers();
const getName = ref("");
const onSubmit = async () => {
  storeUser.setSearchByName(getName.value);
  await getListByName(searchByName.value);
};
const closed = async () => {
  getName.value = "";
  await getListUsers();
};
</script>
<style lang=""></style>
