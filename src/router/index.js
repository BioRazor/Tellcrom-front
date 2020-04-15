import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import store from "@/store";

//local Components
import Login from "@/views/Login.vue";
import ProjectsTable from "@/views/projects/ProjectsTable.vue";
import ProjectCreate from "@/views/projects/Create.vue";

//Contracts
import Contracts from "@/views/contracts/Contracts.vue";
import CreateContract from "@/views/contracts/CreateContract.vue";
import TheTarget from "@/views/contracts/TheTarget.vue";
import TheContract from "@/views/contracts/TheContract.vue";
import TheProducts from "@/views/contracts/TheProducts.vue";
import TheConfirmation from "@/views/contracts/TheConfirmation.vue";

//Users
import Users from "@/views/users/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { isPublic: false }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsTable,
    meta: { isPublic: false }
  },
  {
    path: "/projects/create",
    name: "ProjectCreate",
    component: ProjectCreate,
    meta: { isPublic: false }
  },
  {
    path: "/contracts",
    name: "Contracts",
    component: Contracts,
    meta: { isPublic: false }
  },
  {
    path: "/contracts/create",
    component: CreateContract,
    meta: { isPublic: false },
    children: [
      {
        path: "",
        component: TheTarget,
        name: "CreateContract",
        meta: { isPublic: false }
      },
      {
        path: "/contracts/contract",
        component: TheContract,
        name: " TheContract",
        meta: { isPublic: false }
      },
      {
        path: "/contracts/products",
        component: TheProducts,
        name: "TheProducts",
        meta: { isPublic: false }
      },
      {
        path: "/contracts/confirmation",
        component: TheConfirmation,
        name: "TheConfirmation",
        meta: { isPublic: false }
      }
    ]
  },
  {
    path: "/users",
    component: Users,
    name: "Users",
    meta: { isPublic: false, is_superuser: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//NAV GUARD

const isAuthenticated = () => {
  return store.getters.isAuthenticated;
};

const isSuperUser = () => {
  return store.getters.user.is_superuser;
};

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !isAuthenticated()) {
    return next({ name: "Login" });
  }

  if (to.meta.is_superuser && !isSuperUser) {
    return next({ name: "Dashboard" });
  }

  if (to.name == "Login" && isAuthenticated()) {
    return next({ name: "Dashboard" });
  }

  return next();
});

export default router;
