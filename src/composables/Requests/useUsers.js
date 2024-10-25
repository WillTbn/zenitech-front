import { storeToRefs } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import useNotify from "src/composables/Helpers/useNotify";
import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";

export default function useUsers() {
  const loading = ref(false);
  const router = useRouter();
  const storeUser = useUserStore();
  // const { list } = storeToRefs(storeUser);
  const {
    errorNotify,
    infoNotify,
    showLoading,
    hideLoading,
    successNotify,
    multError,
  } = useNotify();
  /**
   * Request get all list customer
   * @param {string|Number} page pagination
   */
  const getListUsers = async (page = 2) => {
    showLoading("Loading....", "bg-transparent", "positive");
    const url = page == 1 ? "v1/users" : `v1/users?page=${page}`;
    await api
      .get(`${url}`)
      .then((resp) => {
        storeUser.setList(resp.data.users);
        storeUser.setPagination(resp.data.pagination);
      })
      .catch((e) => {
        infoNotify("erro na requisição");
      })
      .finally(() => {
        hideLoading();
      });
  };
  const getOne = async (id) => {
    showLoading("Loading....", "bg-transparent", "positive");
    await api
      .get(`v1/user/${id}`)
      .then((resp) => {
        storeUser.setUserEdit(resp.data.user);
      })
      .catch((e) => {
        infoNotify("erro na requisição");
      })
      .finally(() => {
        hideLoading();
      });
  };
  /**
   *
   * @param {string|int} id do usuário
   * @param {Object|Array} user novos dados do usuário
   */
  const updateOrCreateUser = async (id, user) => {
    showLoading("Atualizando usuário....", "bg-transparent", "positive");
    const url = id ? `v1/user/${id}` : "v1/user";
    // console.log("aquiiii->", data);
    await api
      .post(`${url}`, { ...user })
      .then((resp) => {
        successNotify(resp.data.message);
        if (url == "v1/user") {
          getListUsers();
          router.replace("/");
        }
      })
      .catch((e) => {
        errorNotify(e.response.data.message);
        // multError(e.response.data.errors, 2);
      })
      .finally(() => {
        hideLoading();
      });
  };
  const deleteUser = async (id) => {
    showLoading("Deletando usuário....", "bg-transparent", "positive");
    // console.log("aquiiii->", data);
    await api
      .delete(`v1/user/${id}`)
      .then((resp) => {
        successNotify(resp.data.message);
        getListUsers();
      })
      .catch((e) => {
        errorNotify(e.response.data.message);
      })
      .finally(() => {
        hideLoading();
      });
  };
  return {
    getListUsers,
    updateOrCreateUser,
    deleteUser,
    getOne,
    loading,
  };
}
