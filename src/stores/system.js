import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
  state: () => ({
    data: {},
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    setData(payload) {
      this.data = payload;
    },
  },
});
