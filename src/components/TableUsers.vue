<template>
  <div class="TableUser">
    <div class="row justify-center">
      <div class="col-12 text-end self-end">
        <q-btn to="/created" label="cria usuário" color="positive"></q-btn>
      </div>
      <div class="col-12" style="justify-items: flex-end">
        <get-by-name-form />
      </div>
      <div class="col-12"></div>
      <div class="col-12 q-mt-lg" v-if="list">
        <q-table
          :rows="list"
          :columns="columnsUser"
          :filter="filter"
          no-data-label="Não encontrei nenhum usuário para exibir."
          no-results-label="Esse filtro não encontrou nenhum resultado"
          row-key="name"
          :key="list"
          hide-pagination
        >
          <template v-slot:body-cell-photo="props">
            <q-td :props="props">
              <q-avatar size="md">
                <img :src="props.row.photo" />
              </q-avatar>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="row justify-center q-gutter-md">
                <q-btn
                  color="accent"
                  icon="fa-solid fa-eye"
                  no-caps
                  @click.prevent="goSeeUser(props.row)"
                />
                <q-btn
                  color="primary"
                  icon="fa-solid fa-user-pen"
                  no-caps
                  @click.prevent="goEditUser(props.row)"
                />
                <q-btn
                  color="negative"
                  icon="fa-solid fa-user-xmark"
                  no-caps
                  @click.prevent="goDelete(props.row)"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
    <div class="row justify-end text-end" v-if="searchByName">
      <p class="">Filtrando por: {{ searchByName }}</p>
    </div>
    <div class="row text-center justify-center q-gutter-sm q-mt-sm">
      <pagination-list />
    </div>
    <q-dialog v-model="deleteUserDialog">
      <delete-users :user="user" />
    </q-dialog>
    <q-dialog v-model="seeDialog"> <details-user :user="user" /></q-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";
import useTableUser from "src/composables/Helpers/useTableUser";
import useUsers from "src/composables/Requests/useUsers";
import GetByNameForm from "./GetByNameForm.vue";
import PaginationList from "./PaginationList.vue";
import DeleteUsers from "./DeleteUsers.vue";
import DetailsUser from "./DetailsUser.vue";
const { columnsUser, btnActions, handlerAction } = useTableUser();
const filter = ref("");
const deleteUserDialog = ref(false);
const seeDialog = ref(false);
const user = ref();
const storeUser = useUserStore();
const { list, pagination, searchByName } = storeToRefs(storeUser);
const { deleteUser, getListUsers } = useUsers();
const router = useRouter();
const goEditUser = (row) => {
  storeUser.setUserEdit(row);
  router.replace({ path: `/${row.id}` });
};
const goDelete = (row) => {
  user.value = row;
  deleteUserDialog.value = true;
};
const goSeeUser = (row) => {
  user.value = row;
  seeDialog.value = true;
};
</script>
<style lang=""></style>
