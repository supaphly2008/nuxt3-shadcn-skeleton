<template>
  <div class="w-full">
    <!-- Calendar Header -->
    <div class="flex items-center justify-between border-b bg-muted/50 p-4">
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" @click="previousMonth">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <h2 class="text-xl font-medium">{{ currentMonthYear }}</h2>
        <Button variant="outline" size="sm" @click="nextMonth">
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
      <Button variant="outline" size="sm" @click="goToToday">Today</Button>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7">
      <!-- Day Headers -->
      <div
        v-for="day in weekDays"
        :key="day"
        class="border-b border-r bg-muted/30 p-3 text-center text-sm font-medium"
      >
        {{ day }}
      </div>

      <!-- Calendar Days -->
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="relative min-h-[100px] border-b border-r p-2 transition-colors hover:bg-muted/20"
        :class="{
          'bg-muted/10': !day.isCurrentMonth,
          'bg-blue-50 dark:bg-blue-950/20': day.isToday
        }"
        @click="onDateClick(day.date)"
      >
        <!-- Day Number -->
        <div class="mb-2 text-sm font-medium">
          {{ day.dayNumber }}
        </div>

        <!-- Events -->
        <div class="space-y-1">
          <div
            v-for="event in getEventsForDay(day.date)"
            :key="event.id"
            class="cursor-pointer rounded p-1 text-xs transition-colors hover:opacity-80"
            :class="getEventColor(event.type)"
            @click.stop="onEventClick(event)"
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
          class="absolute bottom-1 right-1 h-6 w-6 p-0 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100"
          @click.stop="onAddEvent(day.date)"
        >
          <Plus class="h-3 w-3" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-vue-next'

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: string
  description?: string
}

interface CalendarDay {
  date: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
}

interface Props {
  events: CalendarEvent[]
  currentDate?: Date
}

interface Emits {
  (e: 'date-click', date: string): void
  (e: 'event-click', event: CalendarEvent): void
  (e: 'add-event', date: string): void
  (e: 'previous-month'): void
  (e: 'next-month'): void
  (e: 'go-today'): void
}

const props = withDefaults(defineProps<Props>(), {
  currentDate: () => new Date()
})

const emit = defineEmits<Emits>()

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentDate = ref(props.currentDate)

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

  const days: CalendarDay[] = []
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

const getEventsForDay = (date: string) => {
  return props.events.filter(event => event.date === date)
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

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  emit('previous-month')
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  emit('next-month')
}

const goToToday = () => {
  currentDate.value = new Date()
  emit('go-today')
}

const onDateClick = (date: string) => {
  emit('date-click', date)
}

const onEventClick = (event: CalendarEvent) => {
  emit('event-click', event)
}

const onAddEvent = (date: string) => {
  emit('add-event', date)
}
</script>
