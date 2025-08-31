<template>
  <div class="mx-auto max-w-4xl space-y-6 px-4 sm:px-0">
    <!-- Calendar Header -->
    <section class="space-y-2">
      <h1 class="text-2xl font-semibold">Calendar</h1>
      <p class="text-muted-foreground">Manage your schedule and events.</p>
    </section>

    <!-- Custom Calendar -->
    <section class="space-y-4">
      <div class="rounded-lg border bg-card">
        <CustomCalendar
          :events="events"
          :current-date="currentDate"
          @date-click="onDateClick"
          @event-click="onEventClick"
          @add-event="onAddEvent"
          @previous-month="previousMonth"
          @next-month="nextMonth"
          @go-today="goToToday"
        />
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="space-y-4">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Upcoming Events</h2>
        <p class="text-sm text-muted-foreground">Your next scheduled events and deadlines.</p>
      </div>

      <div class="space-y-3">
        <div
          v-for="event in upcomingEvents"
          :key="event.id"
          class="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
          @click="selectEvent(event)"
        >
          <div class="flex min-w-0 flex-1 items-center gap-3">
            <div
              class="h-3 w-3 flex-shrink-0 rounded-full"
              :class="getEventColor(event.type).replace('bg-', 'bg-').replace('text-', '')"
            ></div>
            <div class="min-w-0 flex-1">
              <div class="truncate font-medium">{{ event.title }}</div>
              <div class="truncate text-sm text-muted-foreground">
                {{ formatEventDate(event.date) }} at {{ event.time }}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" class="flex-shrink-0">
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

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

import CustomCalendar from '@/components/CustomCalendar.vue'
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
import { MoreHorizontal } from 'lucide-vue-next'

// Calendar state
const currentDate = ref(new Date())

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

const onDateClick = (date: string) => {
  addEvent(date)
}

const onEventClick = (event: any) => {
  selectEvent(event)
}

const onAddEvent = (date: string) => {
  addEvent(date)
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
