<template>
  <q-page class="flex flex-center">
    <form-user v-if="userEdit" />
  </q-page>
</template>

<script setup>
import useUsers from "src/composables/Requests/useUsers";
import { storeToRefs } from "pinia";
import { useUserStore } from "src/stores/user";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import FormUser from "src/components/FormUser.vue";

const { getOne } = useUsers();
defineComponent({ name: "EditUsersPage" });

const storeUser = useUserStore();
const { userEdit } = storeToRefs(storeUser);
const user = ref("");
const route = useRoute();
onMounted(async () => {
  if (!userEdit.value) {
    await getOne(route.params.id);
  }
  // user.value = route.params.id;
});
defineOptions({
  name: "IndexPage",
});
</script>
