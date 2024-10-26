import { ref } from "vue";

export default function useTableUser() {
  const columnsUser = [
    // {
    //   name: "id",
    //   required: true,
    //   label: "ID",
    //   align: "left",
    //   field: (row) => row.id,
    //   format: (val) => `#${val}`,
    //   sortable: true,
    //   required: true,

    // },
    {
      name: "photo",
      required: true,
      label: "#",
      align: "left",
      field: (row) => row.photo,
      format: (val) => `${val}`,
      sortable: true,
      required: true,
    },
    {
      name: "name",
      align: "left",
      label: "Nome",
      field: "name",
      sortable: true,
    },
    {
      name: "email",
      align: "left",
      label: "Email",
      field: "email",
      sortable: true,
    },
    {
      name: "date_of_birth",
      align: "left",
      label: "Data de nascimento",
      field: "date_of_birth",
      sortable: true,
    },
    {
      name: "actions",
      label: "Ações",
      align: "center",
      field: "action",
    },
  ];

  const columnsAdms = [
    // {
    //   name: "id",
    //   required: true,
    //   label: "ID",
    //   align: "left",
    //   field: (row) => row.id,
    //   format: (val) => `#${val}`,
    //   sortable: true,
    //   required: true,

    // },
    {
      name: "photo",
      required: true,
      label: "#",
      align: "left",
      field: (row) => `${urlAvatar}${row.photo}`,
      format: (val) => `${urlAvatar}${val}`,
      sortable: true,
      required: true,
    },
    {
      name: "email",
      align: "left",
      label: "E-mail",
      field: "email",
      sortable: true,
    },
    // {
    //   name: "balance",
    //   align: "left",
    //   label: "Saldo",
    //   field: "balance",
    //   sortable: true,
    // },
    // {
    //   name: "loan",
    //   align: "left",
    //   label: "Saldo devedor",
    //   field: "loan",
    //   sortable: true,
    // },
    {
      name: "actions",
      label: "Ações",
      align: "center",
      field: "action",
    },
  ];
  const roleControl = ref(false);
  const controlIncome = ref(false);
  const viewExtract = ref(false);
  const userEdit = ref();
  const block = ref(false);

  const actions = {
    // editIncome: (e) => {
    //   controlIncome.value = true;
    //   userEdit.value = e;
    // },
    unlockCompany: async (e) => {
      console.log("extractView", e.id);
    },
    blockCompany: (e) => {
      console.log("vamos ver", e);
      // roleControl.value = true;
      // userEdit.value = e;
    },
  };
  const btnActions = [
    {
      icon: "fa-solid fa-user-clock",
      tooltipText: "Bloquear",
      action: "blockCompany",
      label: "Bloquear",
    },
    {
      color: "green",
      icon: "fa-solid fa-cash-register",
      tooltipText: "Ver extrato do usuário",
      action: "",
    },
    // {
    //   color: "green",
    //   icon: "fa-solid fa-money-bill-trend-up",
    //   tooltipText: "Editar rendimentos",
    //   action: "editIncome",
    // },
  ];
  const handlerAction = (name, row) => {
    actions[name](row);
  };
  return {
    columnsUser,
    columnsAdms,
    actions,
    btnActions,
    roleControl,
    controlIncome,
    userEdit,
    viewExtract,
    block,
    handlerAction,
  };
}
