<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-6">
      <div class="flex items-center justify-between mb-6">
        <div class="space-y-2">
          <Skeleton class="h-8 w-48" />
          <Skeleton class="h-4 w-64" />
        </div>
        <div class="flex gap-3">
          <Skeleton class="h-10 w-32" />
          <Skeleton class="h-10 w-32" />
          <Skeleton class="h-10 w-32" />
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <Skeleton class="h-[200px]" />
          <Skeleton class="h-[150px]" />
          <Skeleton class="h-[300px]" />
        </div>
        <div class="space-y-6">
          <Skeleton class="h-[200px]" />
          <Skeleton class="h-[150px]" />
          <Skeleton class="h-[300px]" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-12"
    >
      <AlertCircle class="h-12 w-12 text-destructive mb-4" />
      <h3 class="text-lg font-semibold mb-2">Error Loading Contact</h3>
      <p class="text-muted-foreground mb-4">{{ error }}</p>
      <Button @click="loadContact">Try Again</Button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Page Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="text-2xl font-semibold text-foreground">
            {{ contact?.name }}
          </h1>
          <p class="text-sm text-muted-foreground mt-1">
            Contact details and project history
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button
            variant="outline"
            @click="sendEmail"
            :disabled="!contact?.email"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send Email
          </Button>
          <Button
            variant="outline"
            @click="sendWhatsApp"
            :disabled="!contact?.phone"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            WhatsApp
          </Button>
          <Button @click="editContact" disabled>
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Contact
          </Button>
        </div>
      </div>

      <!-- Contact Information Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Contact Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information Card -->
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-muted-foreground"
                    >Full Name</label
                  >
                  <p class="text-foreground mt-1">{{ contact?.name }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-muted-foreground"
                    >Email</label
                  >
                  <p class="text-foreground mt-1">{{ contact?.email }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-muted-foreground"
                    >Phone</label
                  >
                  <p class="text-foreground mt-1">
                    {{ contact?.phone || "Not provided" }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-muted-foreground"
                    >Company</label
                  >
                  <p class="text-foreground mt-1">
                    {{ contact?.company || "Individual" }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-muted-foreground"
                    >Source</label
                  >
                  <p class="text-foreground mt-1 capitalize">
                    {{ contact?.source || "Unknown" }}
                  </p>
                </div>
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-muted-foreground"
                    >Status</label
                  >
                  <div>
                    <Badge class="mt-1 capitalize">{{ contact?.status }}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Notes Card -->
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                {{ contact?.notes || "No notes available." }}
              </p>
            </CardContent>
          </Card>

          <!-- Contact History -->
          <Card>
            <CardHeader>
              <CardTitle>Contact History</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div
                  v-for="history in contactHistory"
                  :key="history.id"
                  class="flex items-start space-x-3 p-3 border border-muted-foreground rounded-lg"
                >
                  <div class="flex-shrink-0">
                    <div
                      class="w-8 h-8 bg-background rounded-full flex items-center justify-center"
                    >
                      <svg
                        v-if="history.type === 'email'"
                        class="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <svg
                        v-else-if="history.type === 'call'"
                        class="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-4 h-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-medium capitalize">
                        {{ history.type }} {{ history.direction }}
                      </h4>
                      <span class="text-xs text-gray-500">{{
                        formatDate(history.date)
                      }}</span>
                    </div>
                    <p class="text-sm text-muted-foreground mt-1">
                      {{ history.description }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="contactHistory.length === 0"
                  class="text-center py-4 text-gray-500"
                >
                  No contact history available.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground"
                  >Total Projects</span
                >
                <span class="font-medium">{{
                  contact?.projectsCount || 0
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Total Value</span>
                <span class="font-medium"
                  >MYR {{ (contact?.totalValue || 0).toLocaleString() }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Client Since</span>
                <span class="font-medium">{{
                  formatDate(contact?.createdAt)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Last Contact</span>
                <span class="font-medium">{{
                  contact?.lastContactDate
                    ? formatDate(contact.lastContactDate)
                    : "Never"
                }}</span>
              </div>
            </CardContent>
          </Card>

          <!-- Tags -->
          <Card v-if="contact?.tags && contact.tags.length > 0">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="tag in contact.tags"
                  :key="tag.id"
                  variant="secondary"
                >
                  {{ tag.name }}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <!-- Recent Projects -->
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Button variant="outline" size="sm" @click="viewAllProjects">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div
                  v-for="project in recentProjects"
                  :key="project.id"
                  class="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  @click="viewProject(project.id)"
                >
                  <div>
                    <h4 class="text-sm font-medium">{{ project.name }}</h4>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(project.date) }}
                    </p>
                  </div>
                  <Badge
                    :variant="
                      project.status === 'completed' ? 'default' : 'outline'
                    "
                    class="text-xs"
                  >
                    {{ project.status }}
                  </Badge>
                </div>
                <div
                  v-if="recentProjects.length === 0"
                  class="text-center py-4 text-gray-500 text-sm"
                >
                  No projects yet.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-vue-next";
import type { Contact } from "@/types/contact";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const error = ref<string | null>(null);
const contact = ref<Contact | null>(null);

// Mock contact history data
const contactHistory = ref([
  {
    id: "1",
    type: "email",
    direction: "sent",
    description: "Sent project proposal for wedding photography",
    date: new Date("2024-02-01"),
  },
  {
    id: "2",
    type: "call",
    direction: "received",
    description: "Client called to discuss wedding details and timeline",
    date: new Date("2024-01-28"),
  },
  {
    id: "3",
    type: "whatsapp",
    direction: "sent",
    description: "Shared sample photos and portfolio",
    date: new Date("2024-01-25"),
  },
]);

// Mock recent projects data
const recentProjects = ref([
  {
    id: "1",
    name: "Sarah & John Wedding",
    date: new Date("2024-03-15"),
    status: "in-progress",
  },
  {
    id: "2",
    name: "Engagement Photos",
    date: new Date("2024-01-20"),
    status: "completed",
  },
]);

const formatDate = (date: Date | undefined) => {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const loadContact = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock contact data - in real app, fetch from API using route.params.id
    contact.value = {
      id: route.params.id as string,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+60123456789",
      company: "Johnson & Associates",
      status: "client",
      source: "website",
      createdAt: new Date("2024-01-15"),
      lastContactDate: new Date("2024-02-01"),
      projectsCount: 3,
      totalValue: 15000,
      tags: [
        { id: "vip", name: "VIP", color: "purple" },
        { id: "wedding", name: "Wedding", color: "pink" },
      ],
      notes:
        "High-value client, prefers premium packages. Very detail-oriented and has specific requirements for lighting and angles.",
    };
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to load contact";
    console.error("Error loading contact:", err);
  } finally {
    isLoading.value = false;
  }
};

const editContact = () => {
  router.push(`/studio/contacts/${route.params.id}/edit`);
};

const sendEmail = () => {
  if (!contact.value?.email) return;
  router.push(`/studio/contacts/${route.params.id}/email`);
};

const sendWhatsApp = () => {
  if (!contact.value?.phone) return;
  router.push(`/studio/contacts/${route.params.id}/whatsapp`);
};

const viewAllProjects = () => {
  router.push(`/studio/contacts/${route.params.id}/projects`);
};

const viewProject = (projectId: string) => {
  router.push(`/studio/projects/${projectId}`);
};

onMounted(() => {
  loadContact();
});
</script>

<style scoped></style>
