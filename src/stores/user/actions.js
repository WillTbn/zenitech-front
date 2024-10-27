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
  setSendAvatarButton(payload) {
    this.sendAvatarButton = payload;
  },
  setPhotoUpload(payload) {
    this.userEdit.photo = payload;
  },
  setSelectFile(payload) {
    this.selectFile = payload;
  },
};
export default { ...actions };
