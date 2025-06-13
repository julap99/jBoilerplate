import { defineStore } from "pinia";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import type { Component } from "vue";
import {
  LayoutDashboard,
  Users,
  Settings,
  Cog,
  ServerCog,
  Shield,
  KeyRound,
  Database,
  Mail,
  BookOpen,
  FileText,
  Code,
  Info,
  Menu,
  Palette,
  Brush,
  SearchCode,
  Activity,
  FileCode,
  FolderKanban,
  Calendar,
} from "lucide-vue-next";

/**
 * Navigation item interface
 */
interface NavigationItem {
  title: string;
  url: string;
  icon: Component;
  isActive: boolean;
  items?: NavigationItem[];
}

/**
 * Navigation group interface
 */
interface NavigationGroup {
  title: string;
  menu: NavigationItem[];
}

/**
 * Navigation store
 * Manages the application navigation menu structure
 */
export const useNavigationStore = defineStore("navigation", () => {
  const authStore = useAuthStore();

  /**
   * Superadmin navigation menu structure
   */
  const superadminNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Dashboard",
          url: "/superadmin/dashboard",
          icon: LayoutDashboard,
          isActive: false,
        },
      ],
    },
    {
      title: "System",
      menu: [
        {
          title: "Users & Roles",
          url: "/superadmin/users",
          icon: Users,
          isActive: false,
          items: [
            {
              title: "Users",
              url: "/superadmin/users",
              icon: Users,
              isActive: false,
            },
            {
              title: "Roles",
              url: "/superadmin/roles",
              icon: Shield,
              isActive: false,
            },
          ],
        },
        {
          title: "Navigation Editor",
          url: "/superadmin/navigation",
          icon: Menu,
          isActive: false,
        },
        {
          title: "Branding & UI",
          url: "/superadmin/branding",
          icon: Brush,
          isActive: false,
        },
        {
          title: "Theme & Appearance",
          url: "/superadmin/theme",
          icon: Palette,
          isActive: false,
        },
        {
          title: "Email Settings",
          url: "/superadmin/email-settings",
          icon: Mail,
          isActive: false,
        },
        {
          title: "SEO & Meta",
          url: "/superadmin/seo",
          icon: SearchCode,
          isActive: false,
        },
        {
          title: "Core Configuration",
          url: "/superadmin/config",
          icon: Cog,
          isActive: false,
        },
        {
          title: "Developer Tools",
          url: "/superadmin/dev-tools",
          icon: Code,
          isActive: false,
          items: [
            {
              title: "Scripts",
              url: "/superadmin/dev-tools/scripts",
              icon: FileCode,
              isActive: false,
            },
            {
              title: "Maintenance Mode",
              url: "/superadmin/dev-tools/maintenance",
              icon: ServerCog,
              isActive: false,
            },
            {
              title: "API Keys",
              url: "/superadmin/dev-tools/api-keys",
              icon: KeyRound,
              isActive: false,
            },
            {
              title: "Environment Variables",
              url: "/superadmin/dev-tools/env",
              icon: FileCode,
              isActive: false,
            },
          ],
        },
        {
          title: "Logs & Activity",
          url: "/superadmin/logs",
          icon: Activity,
          isActive: false,
        },
      ],
    },
    {
      title: "Development",
      menu: [
        {
          title: "Documentation",
          url: "/superadmin/documentation",
          icon: BookOpen,
          isActive: false,
        },
        {
          title: "About",
          url: "/about",
          icon: Info,
          isActive: false,
        },
      ],
    },
  ];

  const studioNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Home",
          url: "/studio/home",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Projects",
          url: "/studio/projects",
          icon: FolderKanban,
          isActive: true,
        },
        {
          title: "Forms",
          url: "/studio/forms",
          icon: FileText,
          isActive: true,
        },
        {
          title: "Contacts",
          url: "/studio/contacts",
          icon: Users,
          isActive: true,
        },
        {
          title: "Affiliates",
          url: "/studio/affiliates",
          icon: Users,
          isActive: true,
        },
        {
          title: "Photographers",
          url: "/studio/photographers",
          icon: Users,
          isActive: true,
        },
      ],
    },
    {
      title: "Other",
      menu: [
        {
          title: "Sessions",
          url: "/studio/sessions",
          icon: Database,
          isActive: true,
        },
        {
          title: "Add Ons",
          url: "/studio/addons",
          icon: Database,
          isActive: true,
        },
        {
          title: "Calendar",
          url: "/studio/calendar",
          icon: Calendar,
          isActive: true,
        },
        {
          title: "Settings",
          url: "/studio/settings",
          icon: Settings,
          isActive: true,
        },
      ],
    },
  ];

  const photographerNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Home",
          url: "/photographer/home",
          icon: LayoutDashboard,
          isActive: true,
        },
      ],
    },
  ];

  const affiliateNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Home",
          url: "/affiliate/home",
          icon: LayoutDashboard,
          isActive: true,
        },
      ],
    },
  ];

  /**
   * Get the navigation menu for the current user
   */
  const navigation = computed(() => {
    const userType = authStore.user?.user_type;

    switch (userType) {
      case "superadmin":
        return superadminNavigation;
      case "studio":
        return studioNavigation;
      case "photographer":
        return photographerNavigation;
      case "affiliate":
        return affiliateNavigation;
      default:
        return [];
    }
  });

  return {
    navigation,
  };
});
