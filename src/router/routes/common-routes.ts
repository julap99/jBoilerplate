import type { RouteRecordRaw } from "vue-router";

export const commonRoutes: RouteRecordRaw[] = [
  {
    path: "/notifications",
    name: "notifications",
    component: () => import("@/pages/notifications/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["superadmin", "studio", "affiliate", "photographer"],
      layout: "dashboard",
      title: "Notifications",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/pages/profile/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["superadmin", "studio", "affiliate", "photographer"],
      layout: "dashboard",
      title: "Notifications",
    },
  },
  {
    path: "/advanced-settings",
    name: "advanced-settings",
    component: () => import("@/pages/advanced-settings/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["superadmin", "studio", "affiliate", "photographer"],
      layout: "dashboard",
      title: "Advanced Settings",
      breadcrumb: [
        {
          count: 1,
          label: "Advanced Settings",
          href: "/studio/advanced-settings",
          action: false,
        },
      ],
    },
  },
];
