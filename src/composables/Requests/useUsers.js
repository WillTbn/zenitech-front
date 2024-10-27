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
  const { selectFile } = storeToRefs(storeUser);
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
  const getListUsers = async (page = 1) => {
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
    // showLoading("Atualizando usuário....", "bg-transparent", "positive");
    api.defaults.headers.common["Accept"] = "form-data";
    api.defaults.headers.common["Content-Type"] = "multipart/form-data";

    const url = id ? `v1/user/${id}` : "v1/user";
    let formData = new FormData();

    if (selectFile.value) {
      formData.append("photo", selectFile.value, selectFile.value.name);
    }
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("date_of_birth", user.date_of_birth);

    await api
      .post(`${url}`, formData)
      .then((resp) => {
        successNotify(resp.data.message);
        if (url == "v1/user") {
          getListUsers();
          router.replace("/");
        }
      })
      .catch((e) => {
        multError(e.response.data, 2);
      })
      .finally(() => {
        hideLoading();
        api.defaults.headers.common["Accept"] = "application/json";
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
