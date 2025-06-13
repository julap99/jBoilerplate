import type { RouteRecordRaw } from "vue-router";

export const studioRoutes: RouteRecordRaw[] = [
  {
    path: "/studio/home",
    name: "studio-home",
    component: () => import("@/pages/studio/home/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Home",
      breadcrumb: [
        {
          count: 1,
          label: "Home",
          href: "/studio/home",
          action: false,
        },
      ],
    },
  },

  // Projects
  {
    path: "/studio/projects",
    name: "studio-projects",
    component: () => import("@/pages/studio/projects/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Projects",
      breadcrumb: [
        {
          count: 1,
          label: "Projects",
          href: "/studio/projects",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/projects/:id",
    name: "studio-project-detail",
    component: () => import("@/pages/studio/projects/[id]/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Project Detail",
      breadcrumb: [
        {
          count: 1,
          label: "Projects",
          href: "/studio/projects",
          action: true,
        },
        {
          count: 2,
          label: "Project Detail",
          href: "/studio/projects/:id",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/projects/:id/invoice",
    name: "studio-project-invoice",
    component: () => import("@/pages/studio/projects/[id]/invoice/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Project Invoice",
      breadcrumb: [
        {
          count: 1,
          label: "Projects",
          href: "/studio/projects",
          action: true,
        },
        {
          count: 2,
          label: "Project Detail",
          href: "/studio/projects/:id",
          action: true,
        },
        {
          count: 3,
          label: "Invoice",
          href: "/studio/projects/:id/invoice",
          action: false,
        },
      ],
    },
  },

  // Forms
  {
    path: "/studio/forms",
    name: "studio-forms",
    component: () => import("@/pages/studio/forms/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Forms",
      breadcrumb: [
        {
          count: 1,
          label: "Forms",
          href: "/studio/forms",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/forms/:id",
    name: "studio-form-workspace",
    component: () => import("@/pages/studio/forms/[id]/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Workspace",
    },
  },
  {
    path: "/studio/forms/:id/title",
    name: "studio-form-title",
    component: () => import("@/pages/studio/forms/[id]/title/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Title",
    },
  },
  {
    path: "/studio/forms/:id/sessions",
    name: "studio-form-session",
    component: () => import("@/pages/studio/forms/[id]/sessions/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Session",
    },
  },
  {
    path: "/studio/forms/:id/addons",
    name: "studio-form-addons",
    component: () => import("@/pages/studio/forms/[id]/addons/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Addons",
    },
  },
  {
    path: "/studio/forms/:id/field-builder",
    name: "studio-form-field-builder",
    component: () =>
      import("@/pages/studio/forms/[id]/field-builder-3/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Field Builder",
    },
  },
  {
    path: "/studio/forms/:id/terms-conditions",
    name: "studio-form-terms-conditions",
    component: () => import("@/pages/studio/forms/[id]/terms/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Terms & Conditions",
    },
  },
  {
    path: "/studio/forms/:id/whatsapp",
    name: "studio-form-whatsapp",
    component: () => import("@/pages/studio/forms/[id]/whatsapp/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Whatsapp",
    },
  },
  {
    path: "/studio/forms/:id/preview",
    name: "studio-form-preview",
    component: () => import("@/pages/studio/forms/[id]/preview/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Preview",
    },
  },
  {
    path: "/studio/forms/:id/publish",
    name: "studio-form-publish",
    component: () => import("@/pages/studio/forms/[id]/publish/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "forms",
      title: "Studio Form Publish",
    },
  },
  {
    path: "/studio/forms/:id/responses",
    name: "studio-form-publish",
    component: () => import("@/pages/studio/forms/[id]/responses/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Form Responses",
      breadcrumb: [
        {
          count: 1,
          label: "Forms",
          href: "/studio/forms",
          action: true,
        },
        {
          count: 1,
          label: "Responses",
          href: "/studio/forms/:id/responses",
          action: false,
        },
      ],
    },
  },

  // Contacts
  {
    path: "/studio/contacts",
    name: "studio-contacts",
    component: () => import("@/pages/studio/contacts/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Contacts",
      breadcrumb: [
        {
          count: 1,
          label: "Contacts",
          href: "/studio/contacts",
          action: true,
        },
      ],
    },
  },
  {
    path: "/studio/contacts/:id",
    name: "studio-contact-details",
    component: () => import("@/pages/studio/contacts/[id]/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Contact Detail",
      breadcrumb: [
        {
          count: 1,
          label: "Contacts",
          href: "/studio/contacts",
          action: true,
        },
        {
          count: 2,
          label: "Details",
          href: "/studio/contacts/:id",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/contacts/:id/email",
    name: "studio-contact-email",
    component: () => import("@/pages/studio/contacts/[id]/email.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Contact Detail",
      breadcrumb: [
        {
          count: 1,
          label: "Contacts",
          href: "/studio/contacts",
          action: true,
        },
        {
          count: 2,
          label: "Send Email",
          href: "/studio/contacts/:id/email",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/contacts/:id/whatsapp",
    name: "studio-contact-email",
    component: () => import("@/pages/studio/contacts/[id]/whatsapp.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Contact Whatsapp",
      breadcrumb: [
        {
          count: 1,
          label: "Contacts",
          href: "/studio/contacts",
          action: true,
        },
        {
          count: 2,
          label: "Send Whatsapp",
          href: "/studio/contacts/:id/whatsapp",
          action: false,
        },
      ],
    },
  },

  // Affiliates
  {
    path: "/studio/affiliates",
    name: "studio-affiliates",
    component: () => import("@/pages/studio/affiliates/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Affiliates",
      breadcrumb: [
        {
          count: 1,
          label: "Affiliate",
          href: "/studio/affiliates",
          action: true,
        },
      ],
    },
  },
  {
    path: "/studio/affiliates/settings",
    name: "studio-affiliates-settings",
    component: () => import("@/pages/studio/affiliates/settings.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Affiliates Settings",
      breadcrumb: [
        {
          count: 1,
          label: "Affiliate",
          href: "/studio/affiliates",
          action: true,
        },
        {
          count: 2,
          label: "Settings",
          href: "/studio/affiliates/settings",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/affiliates/:id",
    name: "studio-affiliates-details",
    component: () => import("@/pages/studio/affiliates/[id]/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Affiliates Details",
      breadcrumb: [
        {
          count: 1,
          label: "Affiliate",
          href: "/studio/affiliates",
          action: true,
        },
        {
          count: 2,
          label: "Details",
          href: "/studio/affiliates/:id",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/affiliates/:id/edit",
    name: "studio-affiliates-edit",
    component: () => import("@/pages/studio/affiliates/[id]/edit.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Affiliates Edit",
      breadcrumb: [
        {
          count: 1,
          label: "Affiliate",
          href: "/studio/affiliates",
          action: true,
        },
        {
          count: 2,
          label: "Edit",
          href: "/studio/affiliates/:id/edit",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/affiliates/:id/commissions",
    name: "studio-affiliate-commissions",
    component: () => import("@/pages/studio/affiliates/[id]/commissions.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Affiliate Commissions",
      breadcrumb: [
        {
          count: 1,
          label: "Affiliate",
          href: "/studio/affiliates",
          action: true,
        },
        {
          count: 2,
          label: "Commissions",
          href: "/studio/affiliates/:id/commissions",
          action: false,
        },
      ],
    },
  },

  // Photographers
  {
    path: "/studio/photographers",
    name: "studio-photographers",
    component: () => import("@/pages/studio/photographers/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Photographers",
      breadcrumb: [
        {
          count: 1,
          label: "Photographers",
          href: "/studio/photographers",
          action: false,
        },
      ],
    },
  },
  {
    path: "/studio/photographers/new",
    name: "studio-photographers-new",
    component: () => import("@/pages/studio/photographers/new.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Photographers New",
      breadcrumb: [
        {
          count: 1,
          label: "Photographers",
          href: "/studio/photographers",
          action: true,
        },
        {
          count: 2,
          label: "New",
          href: "/studio/photographers/new",
          action: false,
        },
      ],
    },
  },

  // Sessions
  {
    path: "/studio/sessions",
    name: "studio-sessions",
    component: () => import("@/pages/studio/sessions/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Sessions",
      breadcrumb: [
        {
          count: 1,
          label: "Sessions",
          href: "/studio/sessions",
          action: false,
        },
      ],
    },
  },

    // Addons
    {
      path: "/studio/addons",
      name: "studio-addons",
      component: () => import("@/pages/studio/addons/index.vue"),
      meta: {
        requiresAuth: true,
        roles: ["studio"],
        layout: "dashboard",
        title: "Studio Addons",
        breadcrumb: [
          {
            count: 1,
            label: "Addons",
            href: "/studio/addons",
            action: false,
          },
        ],
      },
    },

  // Calendar
  {
    path: "/studio/calendar",
    name: "studio-calendar",
    component: () => import("@/pages/studio/calendar/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Calendar",
      breadcrumb: [
        {
          count: 1,
          label: "Calendar",
          href: "/studio/calendar",
          action: false,
        },
      ],
    },
  },

  // Settings
  {
    path: "/studio/settings",
    name: "studio-settings",
    component: () => import("@/pages/studio/settings/index.vue"),
    meta: {
      requiresAuth: true,
      roles: ["studio"],
      layout: "dashboard",
      title: "Studio Settings",
      breadcrumb: [
        {
          count: 1,
          label: "Settings",
          href: "/studio/settings",
          action: false,
        },
      ],
    },
  },
];
