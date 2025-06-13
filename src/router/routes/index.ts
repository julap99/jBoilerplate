import { RouteRecordRaw } from "vue-router";
import { authRoutes } from "./auth-routes";
import { commonRoutes } from "./common-routes";
import { publicRoutes } from "./public-routes";
import { superadminRoutes } from "./superadmin-routes";
import { studioRoutes } from "./studio-routes";

// Combine all route groups into a single array
export const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  ...superadminRoutes,
  ...commonRoutes,
  ...studioRoutes,
  // Catch-all / 404 route should be at the end
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/not-found.vue"),
    meta: {
      requiresAuth: false,
      layout: "blank",
      title: "Page Not Found",
    },
  },
];
