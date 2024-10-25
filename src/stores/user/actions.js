const actions = {
  setList(payload) {
    this.list = payload;
  },
  setUserEdit(payload) {
    this.userEdit = payload;
  },
  setPagination(payload) {
    this.pagination = payload;
  },
};
export default { ...actions };
