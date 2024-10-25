const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    props: true,
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("pages/IndexPage.vue"),
        props: true,
      },
      {
        name: "Editando usuário",
        path: ":id",
        component: () => import("pages/users/EditUsersPage.vue"),
        props: true,
      },
      {
        name: "Criando usuário",
        path: "created",
        component: () => import("pages/users/CreatedUsersPage.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
