<template>
  <q-form class="GetByNameForm q-mt-md" @submit.prevent="onSubmit">
    <q-input
      standout
      v-model="searchByName"
      input-class="text-right"
      class="q-ml-md"
      label="Pesquisa por nome"
    >
      <template v-slot:append>
        <q-btn v-if="searchByName === ''" flat>
          <q-icon name="search" />
        </q-btn>
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="searchByName = ''"
        />
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
const { getListByName } = useUsers();
// const getName = ref("");
const onSubmit = async () => {
  await getListByName(searchByName.value);
};
</script>
<style lang=""></style>
