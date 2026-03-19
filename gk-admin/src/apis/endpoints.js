const endpoints = {
  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh"
  },
 roles: {
  list: "/admin/roles",
  create: "/admin/roles",
  get: (id) => `/admin/roles/${id}`,
  update: (id) => `/admin/roles/${id}`,
},
regions: {
    list: "/admin/regions",
    create: "/admin/regions",
   update: (id) => `/admin/regions/${id}`,
    get: (id) => `/admin/regions/${id}`,
  },
   clusters: {
    list: "/admin/clusters",
    create: "/admin/clusters",
    update: (id) => `/admin/clusters/${id}`,
    get: (id) => `/admin/clusters/${id}`,
  },
branches: {
  list: "/admin/branches",
  create: "/admin/branches",
  get: (id) => `/admin/branches/${id}`,
  update: (id) => `/admin/branches/${id}`, // PATCH
}
}

export default endpoints