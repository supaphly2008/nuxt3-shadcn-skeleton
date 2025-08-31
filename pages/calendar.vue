<template>
  <div class="mx-auto max-w-6xl space-y-6">
    <!-- Calendar Header -->
    <section class="space-y-2">
      <h1 class="text-2xl font-semibold">Calendar</h1>
      <p class="text-muted-foreground">Manage your schedule and events.</p>
    </section>

    <!-- Calendar Controls -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Button variant="outline" size="sm" @click="previousMonth">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <h2 class="text-xl font-medium">{{ currentMonthYear }}</h2>
        <Button variant="outline" size="sm" @click="nextMonth">
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" @click="goToToday"> Today </Button>
      </div>

      <div class="flex items-center gap-2">
        <Button
          v-for="view in views"
          :key="view.key"
          :variant="currentView === view.key ? 'default' : 'outline'"
          size="sm"
          @click="currentView = view.key"
        >
          {{ view.label }}
        </Button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="rounded-lg border">
      <!-- Calendar Header -->
      <div class="grid grid-cols-7 border-b bg-muted/50">
        <div v-for="day in weekDays" :key="day" class="p-3 text-center text-sm font-medium">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7">
        <div
          v-for="day in calendarDays"
          :key="day.date"
          class="relative min-h-[120px] border-b border-r p-2"
          :class="{
            'bg-muted/30': !day.isCurrentMonth,
            'bg-blue-50 dark:bg-blue-950/20': day.isToday
          }"
        >
          <!-- Day Number -->
          <div class="mb-1 text-sm font-medium">
            {{ day.dayNumber }}
          </div>

          <!-- Events -->
          <div class="space-y-1">
            <div
              v-for="event in getEventsForDay(day.date)"
              :key="event.id"
              class="cursor-pointer rounded p-1 text-xs transition-colors"
              :class="getEventColor(event.type)"
              @click="selectEvent(event)"
            >
              <div class="truncate font-medium">{{ event.title }}</div>
              <div class="text-xs opacity-75">{{ event.time }}</div>
            </div>
          </div>

          <!-- Add Event Button -->
          <Button
            v-if="day.isCurrentMonth"
            variant="ghost"
            size="sm"
            class="absolute bottom-1 right-1 h-6 w-6 p-0 opacity-0 transition-opacity hover:opacity-100"
            @click="addEvent(day.date)"
          >
            <Plus class="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Upcoming Events -->
    <section class="space-y-4">
      <h3 class="text-lg font-medium">Upcoming Events</h3>
      <div class="grid gap-3">
        <div
          v-for="event in upcomingEvents"
          :key="event.id"
          class="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
          @click="selectEvent(event)"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-3 w-3 rounded-full"
              :class="getEventColor(event.type).replace('bg-', 'bg-').replace('text-', '')"
            ></div>
            <div>
              <div class="font-medium">{{ event.title }}</div>
              <div class="text-sm text-muted-foreground">
                {{ formatEventDate(event.date) }} at {{ event.time }}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>

    <!-- Event Dialog -->
    <Dialog v-model:open="isEventDialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ editingEvent ? 'Edit Event' : 'Add Event' }}</DialogTitle>
          <DialogDescription>
            {{ editingEvent ? 'Update your event details.' : 'Create a new event.' }}
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="eventTitle">Title</Label>
            <Input id="eventTitle" v-model="eventForm.title" placeholder="Event title" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="eventDate">Date</Label>
              <Input id="eventDate" v-model="eventForm.date" type="date" />
            </div>
            <div class="space-y-2">
              <Label for="eventTime">Time</Label>
              <Input id="eventTime" v-model="eventForm.time" type="time" />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="eventType">Type</Label>
            <select id="eventType" v-model="eventForm.type" class="w-full rounded-md border p-2">
              <option value="meeting">Meeting</option>
              <option value="deadline">Deadline</option>
              <option value="reminder">Reminder</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div class="space-y-2">
            <Label for="eventDescription">Description</Label>
            <Textarea
              id="eventDescription"
              v-model="eventForm.description"
              placeholder="Event description"
              rows="3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="isEventDialogOpen = false"> Cancel </Button>
          <Button @click="saveEvent">
            {{ editingEvent ? 'Update' : 'Create' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/composables/useToast'
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-vue-next'

// Calendar state
const currentDate = ref(new Date())
const currentView = ref('month')

const views = [
  { key: 'month', label: 'Month' },
  { key: 'week', label: 'Week' },
  { key: 'day', label: 'Day' }
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Events
const events = ref([
  {
    id: '1',
    title: 'Contract Review Meeting',
    date: '2024-01-15',
    time: '10:00',
    type: 'meeting',
    description: 'Review the new contract terms with the legal team.'
  },
  {
    id: '2',
    title: 'Document Deadline',
    date: '2024-01-20',
    time: '17:00',
    type: 'deadline',
    description: 'Submit final contract documents.'
  },
  {
    id: '3',
    title: 'Client Call',
    date: '2024-01-18',
    time: '14:30',
    type: 'meeting',
    description: 'Discuss contract modifications with client.'
  }
])

// Event dialog
const isEventDialogOpen = ref(false)
const editingEvent = ref<any>(null)
const eventForm = ref({
  title: '',
  date: '',
  time: '',
  type: 'meeting',
  description: ''
})

const { toast } = useToast()

// Computed
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const today = new Date()

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    days.push({
      date: date.toISOString().split('T')[0],
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString()
    })
  }

  return days
})

const upcomingEvents = computed(() => {
  const today = new Date()
  return events.value
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
})

// Methods
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

const getEventsForDay = (date: string) => {
  return events.value.filter(event => event.date === date)
}

const getEventColor = (type: string) => {
  const colors = {
    meeting: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    deadline: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    reminder: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    contract: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
  return colors[type as keyof typeof colors] || colors.meeting
}

const formatEventDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const addEvent = (date: string) => {
  editingEvent.value = null
  eventForm.value = {
    title: '',
    date: date,
    time: '',
    type: 'meeting',
    description: ''
  }
  isEventDialogOpen.value = true
}

const selectEvent = (event: any) => {
  editingEvent.value = event
  eventForm.value = { ...event }
  isEventDialogOpen.value = true
}

const saveEvent = () => {
  if (!eventForm.value.title.trim()) {
    toast.error('Validation Error', 'Please enter an event title')
    return
  }

  if (editingEvent.value) {
    // Update existing event
    const index = events.value.findIndex(e => e.id === editingEvent.value.id)
    if (index !== -1) {
      events.value[index] = { ...editingEvent.value, ...eventForm.value }
    }
    toast.success('Event Updated', 'Your event has been updated successfully')
  } else {
    // Create new event
    const newEvent = {
      id: Date.now().toString(),
      ...eventForm.value
    }
    events.value.push(newEvent)
    toast.success('Event Created', 'Your event has been created successfully')
  }

  isEventDialogOpen.value = false
  editingEvent.value = null
}

// Initialize
onMounted(() => {
  eventForm.value.date = new Date().toISOString().split('T')[0]
})
</script>
