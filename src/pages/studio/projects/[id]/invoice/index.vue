<template>
  <div class="space-y-6 max-w-7xl mx-auto">
    <!-- Page Header -->
    <Card class="p-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-foreground mb-2">
            Create Invoice - {{ project?.name }}
          </h1>
          <p class="text-muted-foreground">
            Generate a professional invoice for this photography project.
          </p>
        </div>
        <div class="flex gap-2 w-full sm:w-auto">
          <Button
            @click="previewInvoice"
            variant="outline"
            :disabled="isSubmitting || !isFormValid"
            class="flex-1 sm:flex-none"
          >
            <EyeIcon class="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            @click="generateInvoice" 
            :disabled="isSubmitting || !isFormValid"
            class="flex-1 sm:flex-none"
          >
            <Loader2Icon v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
            <FileTextIcon v-else class="w-4 h-4 mr-2" />
            {{ isSubmitting ? 'Generating...' : 'Generate Invoice' }}
          </Button>
        </div>
      </div>
    </Card>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Invoice Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Invoice Details -->
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="invoice-number" class="text-sm font-medium">Invoice Number</Label>
                <Input
                  id="invoice-number"
                  v-model="invoiceData.invoiceNumber"
                  placeholder="INV-2024-001"
                  :class="{ 'border-red-500': errors.invoiceNumber }"
                />
                <p v-if="errors.invoiceNumber" class="text-sm text-red-500">{{ errors.invoiceNumber }}</p>
              </div>
              <div class="space-y-2">
                <Label for="due-date" class="text-sm font-medium">Due Date</Label>
                <Input
                  id="due-date"
                  v-model="invoiceData.dueDate"
                  type="date"
                  :class="{ 'border-red-500': errors.dueDate }"
                />
                <p v-if="errors.dueDate" class="text-sm text-red-500">{{ errors.dueDate }}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="space-y-2">
                <Label for="currency" class="text-sm font-medium">Currency</Label>
                <Select v-model="invoiceData.currency">
                  <SelectTrigger id="currency">
                    <SelectValue :placeholder="selectedCurrency?.name || 'Select Currency'" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="currency in CURRENCIES" :key="currency.code" :value="currency.code">
                      {{ currency.name }} ({{ currency.symbol }})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-2">
                <Label for="payment-terms" class="text-sm font-medium">Payment Terms</Label>
                <Select v-model="invoiceData.paymentTerms">
                  <SelectTrigger id="payment-terms">
                    <SelectValue :placeholder="invoiceData.paymentTerms || 'Select Payment Terms'" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="term in PAYMENT_TERMS" :key="term" :value="term">
                      {{ term }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p v-if="errors.paymentTerms" class="text-sm text-red-500">{{ errors.paymentTerms }}</p>
              </div>
              <div class="space-y-2">
                <Label for="tax-rate" class="text-sm font-medium">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  v-model.number="invoiceData.taxRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  :class="{ 'border-red-500': errors.taxRate }"
                />
                <p v-if="errors.taxRate" class="text-sm text-red-500">{{ errors.taxRate }}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label class="text-sm font-medium">Early Payment Discount</Label>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <Label for="discount-percentage" class="text-xs">Percentage</Label>
                    <Input
                      id="discount-percentage"
                      v-model.number="invoiceData.earlyPaymentDiscount!.percentage"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label for="discount-days" class="text-xs">Days</Label>
                    <Input
                      id="discount-days"
                      v-model.number="invoiceData.earlyPaymentDiscount!.days"
                      type="number"
                      min="1"
                      max="90"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Invoice Items -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              Invoice Items
              <div class="flex gap-2">
                <Button
                  @click="addTemplateItems"
                  size="sm"
                  variant="outline"
                  class="flex items-center gap-2"
                >
                  <FileTextIcon class="w-4 h-4" />
                  Add Templates
                </Button>
                <Button
                  @click="addInvoiceItem"
                  size="sm"
                  class="flex items-center gap-2"
                >
                  <PlusIcon class="w-4 h-4" />
                  Add Item
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-3">
              <div
                v-for="(item, index) in invoiceData.items"
                :key="index"
                class="grid grid-cols-12 gap-2 items-end p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div class="col-span-4">
                  <Label :for="`item-description-${index}`" class="text-sm font-medium">Description</Label>
                  <Input
                    :id="`item-description-${index}`"
                    v-model="item.description"
                    placeholder="Photography session"
                    :class="{ 'border-red-500': errors.items?.[index]?.description }"
                  />
                  <p v-if="errors.items?.[index]?.description" class="text-sm text-red-500">
                    {{ errors.items[index].description }}
                  </p>
                </div>
                <div class="col-span-2">
                  <Label :for="`item-category-${index}`" class="text-sm font-medium">Category</Label>
                  <Select v-model="item.category">
                    <SelectTrigger :id="`item-category-${index}`">
                      <SelectValue :placeholder="item.category || 'Select Category'" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="category in ITEM_CATEGORIES" :key="category" :value="category">
                        {{ category }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p v-if="errors.items?.[index]?.category" class="text-sm text-red-500">
                    {{ errors.items[index].category }}
                  </p>
                </div>
                <div class="col-span-1">
                  <Label :for="`item-quantity-${index}`" class="text-sm font-medium">Qty</Label>
                  <Input
                    :id="`item-quantity-${index}`"
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    :class="{ 'border-red-500': errors.items?.[index]?.quantity }"
                  />
                  <p v-if="errors.items?.[index]?.quantity" class="text-sm text-red-500">
                    {{ errors.items[index].quantity }}
                  </p>
                </div>
                <div class="col-span-2">
                  <Label :for="`item-price-${index}`" class="text-sm font-medium">Price</Label>
                  <Input
                    :id="`item-price-${index}`"
                    v-model.number="item.price"
                    type="number"
                    step="0.01"
                    min="0"
                    :class="{ 'border-red-500': errors.items?.[index]?.price }"
                  />
                  <p v-if="errors.items?.[index]?.price" class="text-sm text-red-500">
                    {{ errors.items[index].price }}
                  </p>
                </div>
                <div class="col-span-1">
                  <p class="text-sm font-medium text-muted-foreground">Total</p>
                  <p class="text-sm font-medium">
                    {{ formatCurrency(item.quantity * item.price) }}
                  </p>
                </div>
                <div class="col-span-2 flex gap-1">
                  <Button
                    @click="moveItem(index, 'up')"
                    variant="ghost"
                    size="sm"
                    :disabled="index === 0"
                  >
                    <ChevronUpIcon class="w-4 h-4" />
                  </Button>
                  <Button
                    @click="moveItem(index, 'down')"
                    variant="ghost"
                    size="sm"
                    :disabled="index === invoiceData.items.length - 1"
                  >
                    <ChevronDownIcon class="w-4 h-4" />
                  </Button>
                  <Button
                    @click="removeInvoiceItem(index)"
                    variant="ghost"
                    size="sm"
                    class="text-destructive hover:text-destructive/90"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <!-- Add transport cost if exists -->
            <div
              v-if="project?.transportCost"
              class="grid grid-cols-12 gap-2 items-end bg-muted/50 p-3 rounded-lg"
            >
              <div class="col-span-4">
                <p class="text-sm font-medium">Transport Cost</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">1</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">{{ formatCurrency(project.transportCost) }}</p>
              </div>
              <div class="col-span-1">
                <p class="text-sm font-medium">
                  {{ formatCurrency(project.transportCost) }}
                </p>
              </div>
              <div class="col-span-3"></div>
            </div>

            <!-- Apply discount if exists -->
            <div
              v-if="project?.discount"
              class="grid grid-cols-12 gap-2 items-end bg-muted/50 p-3 rounded-lg"
            >
              <div class="col-span-4">
                <p class="text-sm font-medium text-green-700">
                  Discount
                  <span
                    v-if="project.discount.reason"
                    class="text-xs text-green-600"
                  >
                    ({{ project.discount.reason }})
                  </span>
                </p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">1</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm text-green-700">
                  -{{
                    project.discount.type === "percentage"
                      ? `${project.discount.value}%`
                      : formatCurrency(project.discount.value)
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="text-sm font-medium text-green-700">
                  -{{ formatCurrency(discountAmount) }}
                </p>
              </div>
              <div class="col-span-3"></div>
            </div>

            <!-- Tax -->
            <div
              v-if="invoiceData.taxRate > 0"
              class="grid grid-cols-12 gap-2 items-end bg-muted/50 p-3 rounded-lg"
            >
              <div class="col-span-4">
                <p class="text-sm font-medium">Tax ({{ invoiceData.taxRate }}%)</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">1</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">{{ formatCurrency(taxAmount) }}</p>
              </div>
              <div class="col-span-1">
                <p class="text-sm font-medium">
                  {{ formatCurrency(taxAmount) }}
                </p>
              </div>
              <div class="col-span-3"></div>
            </div>

            <!-- Early Payment Discount -->
            <div
              v-if="invoiceData.earlyPaymentDiscount?.percentage > 0"
              class="grid grid-cols-12 gap-2 items-end bg-muted/50 p-3 rounded-lg"
            >
              <div class="col-span-4">
                <p class="text-sm font-medium text-green-700">
                  Early Payment Discount
                  <span class="text-xs text-green-600">
                    ({{ invoiceData.earlyPaymentDiscount?.percentage }}% within {{ invoiceData.earlyPaymentDiscount?.days }} days)
                  </span>
                </p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">1</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm text-green-700">
                  -{{ invoiceData.earlyPaymentDiscount?.percentage }}%
                </p>
              </div>
              <div class="col-span-1">
                <p class="text-sm font-medium text-green-700">
                  -{{ formatCurrency(earlyPaymentDiscountAmount) }}
                </p>
              </div>
              <div class="col-span-3"></div>
            </div>

            <!-- Total -->
            <div class="border-t pt-4">
              <div class="flex justify-between items-center">
                <p class="text-lg font-semibold">Total Amount</p>
                <p class="text-xl font-bold">{{ formatCurrency(finalTotal) }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Notes -->
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              v-model="invoiceData.notes"
              placeholder="Payment terms, additional instructions..."
              rows="4"
              class="resize-none"
            />
          </CardContent>
        </Card>
      </div>

      <!-- Right Column - Client Information -->
      <div class="space-y-6">
        <!-- Client Information -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <UserIcon class="w-5 h-5" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Name</p>
              <p class="text-sm">{{ project?.client.name }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Email</p>
              <p class="text-sm">{{ project?.client.email }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Phone</p>
              <p class="text-sm">
                {{ project?.client.phone || "Not provided" }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Project Type</p>
              <p class="text-sm capitalize">{{ project?.type }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- Project Summary -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <CameraIcon class="w-5 h-5" />
              Project Summary
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Project Name</p>
              <p class="text-sm">{{ project?.name }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Event Date</p>
              <p class="text-sm">
                {{
                  project?.eventDate
                    ? formatDate(project.eventDate)
                    : "Not scheduled"
                }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Location</p>
              <p class="text-sm">
                {{ project?.location || "Not specified" }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">Sessions</p>
              <p class="text-sm">
                {{ project?.sessions?.length || 0 }} session(s)
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- Invoice Summary -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <FileTextIcon class="w-5 h-5" />
              Invoice Summary
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-muted-foreground">Subtotal:</span>
              <span class="text-sm font-medium">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div v-if="transportTotal > 0" class="flex justify-between">
              <span class="text-sm text-muted-foreground">Transport:</span>
              <span class="text-sm font-medium">{{ formatCurrency(transportTotal) }}</span>
            </div>
            <div
              v-if="discountAmount > 0"
              class="flex justify-between text-green-600"
            >
              <span class="text-sm">Discount:</span>
              <span class="text-sm font-medium">-{{ formatCurrency(discountAmount) }}</span>
            </div>
            <div class="border-t pt-2 flex justify-between">
              <span class="font-semibold">Total:</span>
              <span class="font-bold text-lg">{{ formatCurrency(finalTotal) }}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import {
  PlusIcon,
  TrashIcon,
  UserIcon,
  CameraIcon,
  FileTextIcon,
  EyeIcon,
  Loader2Icon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Project } from "@/types/project";

// Types
interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  category: string;
  unit: string;
  notes?: string;
}

interface InvoiceData {
  invoiceNumber: string;
  dueDate: string;
  items: InvoiceItem[];
  notes: string;
  paymentTerms: string;
  currency: string;
  taxRate: number;
  earlyPaymentDiscount: {
    percentage: number;
    days: number;
  };
}

interface FormErrors {
  invoiceNumber?: string;
  dueDate?: string;
  items?: {
    [key: number]: {
      description?: string;
      quantity?: string;
      price?: string;
      category?: string;
    };
  };
  paymentTerms?: string;
  taxRate?: string;
}

// Constants
const CURRENCIES = [
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
];

const ITEM_CATEGORIES = [
  'Photography',
  'Videography',
  'Equipment',
  'Travel',
  'Printing',
  'Digital Delivery',
  'Other',
];

const PAYMENT_TERMS = [
  'Due on receipt',
  'Net 7',
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
];

const ITEM_TEMPLATES = {
  'wedding': [
    {
      description: 'Full Day Wedding Coverage',
      quantity: 1,
      price: 0,
      category: 'Photography',
      unit: 'day',
    },
    {
      description: 'Engagement Session',
      quantity: 1,
      price: 0,
      category: 'Photography',
      unit: 'session',
    },
    {
      description: 'Wedding Album',
      quantity: 1,
      price: 0,
      category: 'Printing',
      unit: 'piece',
    },
  ],
  'portrait': [
    {
      description: 'Portrait Session',
      quantity: 1,
      price: 0,
      category: 'Photography',
      unit: 'session',
    },
    {
      description: 'Digital Images',
      quantity: 1,
      price: 0,
      category: 'Digital Delivery',
      unit: 'package',
    },
  ],
  'event': [
    {
      description: 'Event Coverage',
      quantity: 1,
      price: 0,
      category: 'Photography',
      unit: 'day',
    },
    {
      description: 'Digital Images',
      quantity: 1,
      price: 0,
      category: 'Digital Delivery',
      unit: 'package',
    },
  ],
};

// Composables
const route = useRoute();
const router = useRouter();

// State
const isLoading = ref(true);
const isSubmitting = ref(false);
const project = ref<Project | null>(null);
const errors = ref<FormErrors>({});

const invoiceData = ref<InvoiceData>({
  invoiceNumber: '',
  dueDate: '',
  items: [],
  notes: '',
  paymentTerms: 'Net 30',
  currency: 'MYR',
  taxRate: 0,
  earlyPaymentDiscount: {
    percentage: 2,
    days: 7,
  },
});

// Computed
const projectId = computed(() => route.params.id as string);

const selectedCurrency = computed(() => {
  return CURRENCIES.find(c => c.code === invoiceData.value.currency) || CURRENCIES[0];
});

const subtotal = computed(() => {
  return invoiceData.value.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
});

const transportTotal = computed(() => {
  return project.value?.transportCost || 0;
});

const taxAmount = computed(() => {
  return subtotal.value * (invoiceData.value.taxRate / 100);
});

const discountAmount = computed(() => {
  if (!project.value?.discount) return 0;

  const baseAmount = subtotal.value + transportTotal.value;
  if (project.value.discount.type === "percentage") {
    return baseAmount * (project.value.discount.value / 100);
  } else {
    return project.value.discount.value;
  }
});

const earlyPaymentDiscountAmount = computed(() => {
  if (!invoiceData.value.earlyPaymentDiscount) return 0;
  const baseAmount = subtotal.value + taxAmount.value;
  return baseAmount * (invoiceData.value.earlyPaymentDiscount.percentage / 100);
});

const finalTotal = computed(() => {
  return Math.max(
    0,
    subtotal.value + 
    taxAmount.value + 
    transportTotal.value - 
    discountAmount.value - 
    earlyPaymentDiscountAmount.value
  );
});

const isFormValid = computed(() => {
  return (
    invoiceData.value.invoiceNumber &&
    invoiceData.value.dueDate &&
    invoiceData.value.items.length > 0 &&
    invoiceData.value.items.every(
      (item) => item.description && item.quantity > 0 && item.price >= 0
    )
  );
});

// Utility functions
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: invoiceData.value.currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

const generateInvoiceNumber = (project: Project) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const type = project.type.toUpperCase().slice(0, 3);
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `INV-${type}-${year}${month}-${random}`;
};

// Form validation
const validateForm = () => {
  const newErrors: FormErrors = {};

  if (!invoiceData.value.invoiceNumber) {
    newErrors.invoiceNumber = 'Invoice number is required';
  }

  if (!invoiceData.value.dueDate) {
    newErrors.dueDate = 'Due date is required';
  }

  if (!invoiceData.value.paymentTerms) {
    newErrors.paymentTerms = 'Payment terms are required';
  }

  if (invoiceData.value.taxRate < 0 || invoiceData.value.taxRate > 100) {
    newErrors.taxRate = 'Tax rate must be between 0 and 100';
  }

  const itemErrors: { [key: number]: any } = {};
  invoiceData.value.items.forEach((item, index) => {
    const itemError: any = {};
    if (!item.description) {
      itemError.description = 'Description is required';
    }
    if (!item.quantity || item.quantity <= 0) {
      itemError.quantity = 'Quantity must be greater than 0';
    }
    if (item.price < 0) {
      itemError.price = 'Price cannot be negative';
    }
    if (!item.category) {
      itemError.category = 'Category is required';
    }
    if (Object.keys(itemError).length > 0) {
      itemErrors[index] = itemError;
    }
  });

  if (Object.keys(itemErrors).length > 0) {
    newErrors.items = itemErrors;
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

// Invoice item functions
const addInvoiceItem = (template?: InvoiceItem) => {
  invoiceData.value.items.push({
    description: template?.description || '',
    quantity: template?.quantity || 1,
    price: template?.price || 0,
    category: template?.category || ITEM_CATEGORIES[0],
    unit: template?.unit || 'item',
    notes: template?.notes || '',
  });
};

const addTemplateItems = () => {
  if (!project.value?.type) return;
  const templates = ITEM_TEMPLATES[project.value.type as keyof typeof ITEM_TEMPLATES] || [];
  templates.forEach(template => addInvoiceItem(template));
};

const removeInvoiceItem = (index: number) => {
  invoiceData.value.items.splice(index, 1);
  validateForm();
};

const moveItem = (index: number, direction: 'up' | 'down') => {
  const newIndex = direction === 'up' ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= invoiceData.value.items.length) return;
  
  const items = [...invoiceData.value.items];
  const [item] = items.splice(index, 1);
  items.splice(newIndex, 0, item);
  invoiceData.value.items = items;
};

// Actions
const previewInvoice = () => {
  if (!validateForm()) {
    toast.error("Please fix the form errors before previewing");
    return;
  }
  toast.info("Invoice preview would open in a new window");
};

const generateInvoice = async () => {
  if (!project.value || !validateForm()) {
    toast.error("Please fix the form errors before generating");
    return;
  }

  isSubmitting.value = true;
  try {
    // Simulate API call to generate invoice
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const invoiceObject = {
      ...invoiceData.value,
      project: project.value,
      subtotal: subtotal.value,
      transportCost: transportTotal.value,
      discount: discountAmount.value,
      total: finalTotal.value,
      generatedAt: new Date(),
    };

    toast.success("Invoice generated successfully!");
    router.push(`/studio/projects/${projectId.value}`);
  } catch (error) {
    console.error("Error generating invoice:", error);
    toast.error("Failed to generate invoice");
  } finally {
    isSubmitting.value = false;
  }
};

// Watch for project changes to populate initial data
watch(
  () => project.value,
  (newProject) => {
    if (newProject) {
      // Generate invoice number
      invoiceData.value.invoiceNumber = generateInvoiceNumber(newProject);

      // Set due date based on payment terms
      const dueDate = new Date();
      const terms = invoiceData.value.paymentTerms;
      if (terms.startsWith('Net ')) {
        const days = parseInt(terms.split(' ')[1]);
        dueDate.setDate(dueDate.getDate() + days);
      }
      invoiceData.value.dueDate = dueDate.toISOString().split('T')[0];

      // Add template items based on project type
      addTemplateItems();

      // Set default notes
      invoiceData.value.notes = `Payment is due ${invoiceData.value.paymentTerms.toLowerCase()}. ${
        invoiceData.value.earlyPaymentDiscount 
          ? `Early payment discount of ${invoiceData.value.earlyPaymentDiscount.percentage}% available if paid within ${invoiceData.value.earlyPaymentDiscount.days} days. ` 
          : ''
      }Thank you for choosing our photography services!`;
    }
  },
  { immediate: true }
);

// Load project data
const loadProject = async () => {
  try {
    isLoading.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock project data (in real app, fetch from API)
    const mockProject: Project = {
      id: projectId.value,
      name: "Sarah & John Wedding",
      description: "Full wedding photography package for outdoor ceremony",
      type: "wedding",
      status: "in-progress",
      client: {
        id: "c1",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+60123456789",
      },
      budget: 8500,
      eventDate: new Date("2024-03-15"),
      deliveryDate: new Date("2024-04-15"),
      createdAt: new Date("2024-01-15"),
      convertedFromFormId: "form_1",
      convertedFromResponseId: "resp_1",
      location: "Kuala Lumpur Garden Resort",
      photographer: {
        id: "p1",
        name: "Alex Smith",
      },
      sessions: [
        {
          id: "s1",
          title: "Ceremony",
          time: "2024-03-15T14:00",
          venue: "Garden Pavilion, KL Garden Resort",
          notes: "Outdoor ceremony, backup indoor location available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "s2",
          title: "Reception",
          time: "2024-03-15T18:00",
          venue: "Grand Ballroom, KL Garden Resort",
          notes: "Evening reception with 200 guests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      assignedShooters: [
        {
          id: "1",
          name: "Alex Smith",
          email: "alex@example.com",
          role: "main",
          specialties: ["Wedding", "Portrait"],
          dailyRate: 800,
          isActive: true,
        },
      ],
      internalTags: [
        { id: "vip", name: "VIP", color: "purple", priority: "high" },
        { id: "premium", name: "Premium", color: "yellow", priority: "medium" },
      ],
      transportCost: 150,
      internalNotes: "High-profile client, ensure extra attention to detail",
      notes: "Client prefers natural lighting and candid shots",
      discount: {
        type: "percentage",
        value: 10,
        reason: "Early bird discount",
        appliedAt: new Date("2024-01-20"),
      },
    };

    project.value = mockProject;
  } catch (error) {
    console.error("Error loading project:", error);
    toast.error("Failed to load project details");
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  loadProject();
});
</script>
