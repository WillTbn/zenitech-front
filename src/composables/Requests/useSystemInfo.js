import { api } from "src/boot/axios";
import { useSystemStore } from "src/stores/system";
import { useRouter } from "vue-router";

export default function useSystemInfo() {
  const storeSystem = useSystemStore();
  const getInfo = async () => {
    // showLoading("Loading....", "bg-transparent", "positive");
    await api
      .get(`v1`)
      .then((resp) => {
        console.log(resp);
        storeSystem.setData(resp.data);
      })
      .catch((e) => {
        console.log("erro requisição");
      })
      .finally(() => {
        // hideLoading();
      });
  };
  return { getInfo };
}
