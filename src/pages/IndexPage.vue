<template>
  <q-page class="flex flex-center">
    <table-users style="min-height: 70%" />
  </q-page>
</template>

<script setup>
import TableUsers from "src/components/TableUsers.vue";
import useUsers from "src/composables/Requests/useUsers";
import { onMounted } from "vue";

const { getListUsers } = useUsers();

onMounted(async () => {
  await getListUsers();
});
defineOptions({
  name: "IndexPage",
});
</script>
