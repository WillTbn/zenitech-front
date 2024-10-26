<template>
  <div class="row justify-center">
    <div class="col-12 text-end self-end">
      <q-btn to="/created" label="cria usuário" color="positive"></q-btn>
    </div>

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
    <div class="row text-center q-gutter-sm q-mt-sm">
      <q-btn
        v-for="(item, index) in pagination.pages"
        :key="index"
        :class="{ 'bg-info ': item.current }"
        @click.prevent="getListUsers(item.page)"
      >
        {{ item.page }}
      </q-btn>
    </div>
    <q-dialog v-model="deleteUserDialog">
      <q-card>
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
    </q-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";
import useTableUser from "src/composables/Helpers/useTableUser";
import useUsers from "src/composables/Requests/useUsers";

const { columnsUser, btnActions, handlerAction } = useTableUser();
const filter = ref("");
const deleteUserDialog = ref(false);
const user = ref();
const storeUser = useUserStore();
const { list, pagination } = storeToRefs(storeUser);
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
const setDelete = async () => {
  await deleteUser(user.value.id);
  deleteUserDialog.value = false;
};
</script>
<style lang=""></style>
