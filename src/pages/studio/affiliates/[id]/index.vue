<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <!-- <LoadingPage v-if="isLoading" /> -->

    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-foreground">
            {{ affiliate?.name }}
          </h1>
          <div class="flex items-center gap-2 mt-1">
            <p class="text-sm text-muted-foreground">
              Affiliate ID: {{ affiliate?.referralCode }}
            </p>
            <Badge
              v-if="affiliate"
              :variant="getAffiliateStatusVariant(affiliate.status)"
              class="capitalize"
            >
              {{ affiliate.status }}
            </Badge>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button
          @click="viewCommissions"
          variant="outline"
          class="flex items-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
          View Commissions
        </Button>
        <Button @click="editAffiliate" class="flex items-center gap-2">
          <svg
            class="w-4 h-4"
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
          Edit Affiliate
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Total Referrals
              </p>
              <p class="text-2xl font-bold text-blue-600 mt-1">
                {{ affiliate?.totalReferrals || 0 }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                Last 30 days: {{ affiliate?.lastMonthReferrals || 0 }}
              </p>
            </div>
            <div
              class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Total Earnings
              </p>
              <p class="text-2xl font-bold text-green-600 mt-1">
                RM
                {{ affiliate?.totalCommissionsEarned?.toLocaleString() || 0 }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                Lifetime earnings
              </p>
            </div>
            <div
              class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Pending Payout
              </p>
              <p class="text-2xl font-bold text-orange-600 mt-1">
                RM {{ affiliate?.unpaidCommissions?.toLocaleString() || 0 }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                Available for withdrawal
              </p>
            </div>
            <div
              class="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Commission Rate
              </p>
              <p class="text-2xl font-bold text-purple-600 mt-1">
                {{
                  affiliate?.commissionType === "percentage"
                    ? `${affiliate?.commissionRate}%`
                    : `RM ${affiliate?.commissionRate}`
                }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                {{
                  affiliate?.commissionType === "percentage"
                    ? "Per sale"
                    : "Fixed rate"
                }}
              </p>
            </div>
            <div
              class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Affiliate Information -->
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Email</Label
                >
                <p class="text-foreground flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-muted-foreground"
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
                  {{ affiliate?.email || "Not provided" }}
                </p>
              </div>
              <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Phone</Label
                >
                <p class="text-foreground flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-muted-foreground"
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
                  {{ affiliate?.phone || "Not provided" }}
                </p>
              </div>
              <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Join Date</Label
                >
                <p class="text-foreground flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{
                    affiliate?.joinDate
                      ? formatDate(affiliate.joinDate)
                      : "Not available"
                  }}
                </p>
              </div>
              <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Last Activity</Label
                >
                <p class="text-foreground flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{
                    affiliate?.lastActivity
                      ? formatDate(affiliate.lastActivity)
                      : "Never"
                  }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card v-if="affiliate?.bankDetails">
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Bank Name</Label
                >
                <p class="text-foreground">
                  {{ affiliate.bankDetails.bankName }}
                </p>
              </div>
              <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Account Holder</Label
                >
                <p class="text-foreground">
                  {{ affiliate.bankDetails.accountHolder }}
                </p>
              </div>
              <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Account Number</Label
                >
                <p class="text-foreground font-mono">
                  {{ affiliate.bankDetails.accountNumber }}
                </p>
              </div>
              <div v-if="affiliate.bankDetails.swiftCode" class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground"
                  >SWIFT Code</Label
                >
                <p class="text-foreground font-mono">
                  {{ affiliate.bankDetails.swiftCode }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card v-if="affiliate?.notes">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground whitespace-pre-wrap">
              {{ affiliate.notes }}
            </p>
          </CardContent>
        </Card>
      </div>

      <!-- Quick Actions & Performance -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <Button
              @click="viewCommissions"
              variant="outline"
              class="w-full justify-start"
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              View Commissions
            </Button>
            <Button
              @click="editAffiliate"
              variant="outline"
              class="w-full justify-start"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Details
            </Button>
            <Button
              v-if="
                affiliate?.unpaidCommissions && affiliate.unpaidCommissions > 0
              "
              @click="markForPayout"
              variant="outline"
              class="w-full justify-start"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Process Payout
            </Button>
            <Button
              @click="sendEmail"
              variant="outline"
              class="w-full justify-start"
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Conversion Rate</span>
              <span class="font-medium">
                {{ affiliate ? calculateConversionRate(affiliate) : "0" }}%
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Avg. Commission</span>
              <span class="font-medium">
                RM {{ affiliate ? calculateAvgCommission(affiliate) : "0" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Total Paid</span>
              <span class="font-medium text-green-600">
                RM {{ affiliate?.paidCommissions.toLocaleString() || "0" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Success Rate</span>
              <span class="font-medium">
                {{ affiliate ? calculateSuccessRate(affiliate) : "0" }}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Affiliate } from "@/types/affiliate";

const router = useRouter();
const route = useRoute();

// Loading state
const isLoading = ref(true);

// Affiliate data
const affiliate = ref<Affiliate | null>(null);

// Mock affiliate data (in real app, this would be fetched from API)
const mockAffiliateData: Record<string, Affiliate> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+60123456789",
    joinDate: new Date("2024-01-15"),
    status: "active",
    commissionRate: 15,
    commissionType: "percentage",
    totalReferrals: 12,
    totalCommissionsEarned: 4500,
    unpaidCommissions: 850,
    paidCommissions: 3650,
    referralCode: "SAR001",
    lastActivity: new Date("2024-02-01"),
    lastMonthReferrals: 5,
    bankDetails: {
      bankName: "Maybank",
      accountNumber: "1234567890",
      accountHolder: "Sarah Johnson",
      swiftCode: "MBBEMYKL",
    },
    notes:
      "High-performing affiliate with excellent conversion rates. Specializes in corporate events and weddings.",
  },
  "2": {
    id: "2",
    name: "Ahmad Hassan",
    email: "ahmad.hassan@email.com",
    phone: "+60187654321",
    joinDate: new Date("2024-01-10"),
    status: "active",
    commissionRate: 50,
    commissionType: "fixed",
    totalReferrals: 8,
    totalCommissionsEarned: 2800,
    unpaidCommissions: 400,
    paidCommissions: 2400,
    referralCode: "AHM002",
    lastActivity: new Date("2024-01-28"),
    lastMonthReferrals: 3,
    bankDetails: {
      bankName: "CIMB Bank",
      accountNumber: "9876543210",
      accountHolder: "Ahmad Hassan",
    },
  },
};

// Utility functions
const getAffiliateStatusVariant = (status: Affiliate["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "pending":
      return "secondary";
    case "suspended":
      return "destructive";
    default:
      return "default";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const calculateConversionRate = (affiliate: Affiliate) => {
  // Mock calculation - in real app, this would be based on actual conversion data
  return ((affiliate.totalReferrals / 100) * 100).toFixed(1);
};

const calculateAvgCommission = (affiliate: Affiliate) => {
  if (affiliate.totalReferrals === 0) return "0";
  return (
    affiliate.totalCommissionsEarned / affiliate.totalReferrals
  ).toLocaleString();
};

const calculateSuccessRate = (affiliate: Affiliate) => {
  // Mock calculation - in real app, this would be based on actual success data
  return ((affiliate.totalReferrals / 150) * 100).toFixed(1);
};

const editAffiliate = () => {
  router.push(`/studio/affiliates/${route.params.id}/edit`);
};

const viewCommissions = () => {
  router.push(`/studio/affiliates/${route.params.id}/commissions`);
};

const markForPayout = () => {
  // TODO: Implement payout marking functionality
  console.log("Mark for payout:", affiliate.value?.id);
};

const sendEmail = () => {
  // TODO: Implement email functionality
  console.log("Send email to:", affiliate.value?.email);
};

// Fetch affiliate data
const fetchAffiliate = async () => {
  try {
    isLoading.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const affiliateId = route.params.id as string;
    affiliate.value = mockAffiliateData[affiliateId] || null;

    if (!affiliate.value) {
      // Redirect to 404 or affiliates list if not found
      router.push("/studio/affiliates");
    }
  } catch (error) {
    console.error("Error fetching affiliate:", error);
    router.push("/studio/affiliates");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAffiliate();
});
</script>
