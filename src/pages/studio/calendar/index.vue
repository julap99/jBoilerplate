<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Calendar</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Manage your schedule and appointments
        </p>
      </div>
      <div class="flex gap-3">
        <Button
          variant="outline"
          class="flex items-center gap-2"
          @click="refreshCalendar"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </Button>
        <Button class="flex items-center gap-2" @click="showEventDialog = true">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Event
        </Button>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Total Events
              </p>
              <p class="text-2xl font-bold text-primary">
                {{ statistics.total }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-primary"
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Upcoming</p>
              <p class="text-2xl font-bold text-success">
                {{ statistics.upcoming }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-success/10 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-success"
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">This Week</p>
              <p class="text-2xl font-bold text-accent">
                {{ statistics.thisWeek }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Completed</p>
              <p class="text-2xl font-bold text-muted-foreground">
                {{ statistics.completed }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-muted rounded-lg flex items-center justify-center"
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Calendar View -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Calendar -->
      <div class="col-span-12 lg:col-span-8">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Calendar</CardTitle>
              <div class="flex items-center gap-2">
                <Button variant="outline" size="sm" @click="previousMonth">
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Button>
                <h3 class="text-lg font-semibold min-w-[200px] text-center">
                  {{ currentMonthYear }}
                </h3>
                <Button variant="outline" size="sm" @click="nextMonth">
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 mb-4">
              <div
                v-for="day in daysOfWeek"
                :key="day"
                class="p-2 text-center text-sm font-medium text-muted-foreground"
              >
                {{ day }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1">
              <div
                v-for="date in calendarDates"
                :key="`${date.date}-${date.month}`"
                class="aspect-square p-1"
              >
                <div
                  class="w-full h-full rounded-lg p-1 text-sm cursor-pointer transition-colors"
                  :class="[
                    date.isCurrentMonth
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                    date.isToday
                      ? 'bg-primary/10 text-primary font-semibold'
                      : '',
                    date.events.length > 0
                      ? 'bg-success/5'
                      : 'hover:bg-accent/5',
                  ]"
                  @click="selectDate(date)"
                >
                  <div class="font-medium">{{ date.date }}</div>
                  <div
                    v-for="event in date.events.slice(0, 2)"
                    :key="event.id"
                    class="text-xs p-1 mt-1 rounded truncate cursor-pointer"
                    :style="{
                      backgroundColor: event.color + '20',
                      color: event.color,
                    }"
                    @click="handleEventClick(event, $event)"
                  >
                    {{ event.title }}
                  </div>
                  <div
                    v-if="date.events.length > 2"
                    class="text-xs text-muted-foreground mt-1"
                  >
                    +{{ date.events.length - 2 }} more
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- Quick Actions -->
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <Button
                class="w-full justify-start"
                variant="outline"
                @click="showEventDialog = true"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Event
              </Button>
              <Button
                class="w-full justify-start"
                variant="outline"
                :disabled="!selectedEvent"
                @click="selectedEvent && handleDeleteEvent(selectedEvent.id)"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Event
              </Button>
              <Button
                class="w-full justify-start"
                variant="outline"
                @click="refreshCalendar"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Upcoming Events -->
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="event in upcomingEvents"
                :key="event.id"
                class="flex items-start space-x-4 p-3 bg-accent/5 rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                @click="
                  () => {
                    selectedEvent = event;
                    showEventDialog = true;
                  }
                "
              >
                <div
                  class="h-12 w-12 flex-shrink-0 rounded-lg flex items-center justify-center"
                  :style="{ backgroundColor: event.color + '20' }"
                >
                  <span :style="{ color: event.color }" class="font-semibold">
                    {{ new Date(event.startDate).getDate() }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-foreground truncate">
                    {{ event.title }}
                  </p>
                  <p class="text-sm text-muted-foreground">
                    {{
                      new Date(event.startDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                    -
                    {{
                      new Date(event.endDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ event.location || "No location" }}
                  </p>
                </div>
              </div>

              <div
                v-if="upcomingEvents.length === 0"
                class="text-center text-muted-foreground py-4"
              >
                No upcoming events
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Event Dialog -->
    <EventDialog
      v-model:open="showEventDialog"
      :event="selectedEvent"
      @submit="handleEventSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventDialog from "@/components/calendar/EventDialog.vue";
import { useCalendarStore } from "@/stores/calendar";
import type { CalendarEvent } from "@/types/calendar";

interface CalendarDate {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

interface Statistics {
  total: number;
  upcoming: number;
  thisWeek: number;
  completed: number;
}

const currentDate = ref(new Date());
const showEventDialog = ref(false);
const selectedEvent = ref<CalendarEvent | undefined>();
const calendarStore = useCalendarStore();

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
});

const calendarDates = computed((): CalendarDate[] => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const today = new Date();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const dates: CalendarDate[] = [];
  const current = new Date(startDate);

  // Generate 6 weeks of dates
  for (let i = 0; i < 42; i++) {
    const isCurrentMonth = current.getMonth() === month;
    const isToday = current.toDateString() === today.toDateString();

    const events = calendarStore.getEventsByDay(current);

    dates.push({
      date: current.getDate(),
      month: current.getMonth(),
      year: current.getFullYear(),
      isCurrentMonth,
      isToday,
      events,
    });

    current.setDate(current.getDate() + 1);
  }

  return dates;
});

const statistics = computed((): Statistics => {
  const now = new Date();
  const events = calendarStore.events;

  return {
    total: events.length,
    upcoming: events.filter((e: CalendarEvent) => new Date(e.startDate) > now)
      .length,
    thisWeek: events.filter((e: CalendarEvent) => {
      const eventDate = new Date(e.startDate);
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return eventDate >= weekStart && eventDate <= weekEnd;
    }).length,
    completed: events.filter((e: CalendarEvent) => new Date(e.endDate) < now)
      .length,
  };
});

const upcomingEvents = computed(() => {
  const now = new Date();
  return calendarStore.events
    .filter((e: CalendarEvent) => new Date(e.startDate) > now)
    .sort(
      (a: CalendarEvent, b: CalendarEvent) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 3);
});

function previousMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  currentDate.value = newDate;
}

function nextMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  currentDate.value = newDate;
}

function selectDate(date: CalendarDate) {
  const newEvent = {
    startDate: new Date(date.year, date.month, date.date),
    endDate: new Date(date.year, date.month, date.date),
  };
  selectedEvent.value = undefined;
  showEventDialog.value = true;
}

function handleEventSubmit(eventData: Partial<CalendarEvent>) {
  if (selectedEvent.value) {
    calendarStore.updateEvent(selectedEvent.value.id, eventData);
  } else {
    calendarStore.addEvent(eventData as CalendarEvent);
  }
}

function handleEventClick(event: CalendarEvent, e: Event) {
  e.stopPropagation();
  selectedEvent.value = event;
  showEventDialog.value = true;
}

function handleDeleteEvent(id: string) {
  if (confirm("Are you sure you want to delete this event?")) {
    calendarStore.deleteEvent(id);
  }
}

function refreshCalendar() {
  // In a real app, this would fetch events from the backend
  console.log("Refreshing calendar...");
}
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: hsl(var(--border));
  border-radius: var(--radius);
  overflow: hidden;
}

.calendar-day {
  background-color: hsl(var(--background));
  aspect-ratio: 1;
  padding: 0.5rem;
}

.calendar-day:hover {
  background-color: hsl(var(--accent));
}

/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: hsl(var(--muted));
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground));
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.8);
}

/* Dark mode scrollbar */
.dark .scrollbar-thin::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground));
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.8);
}

/* Custom animations for better UX */
.transition-colors {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
