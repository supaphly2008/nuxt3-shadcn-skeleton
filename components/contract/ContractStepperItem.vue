<template>
  <StepperItem class="relative flex w-full items-start gap-6" :step="step" v-slot="{ state }">
    <StepperSeparator
      v-if="showSeparator"
      class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
    />

    <StepperTrigger as-child>
      <Button
        :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
        size="icon"
        class="z-10 shrink-0 rounded-full"
        :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
      >
        <Check v-if="state === 'completed'" class="size-5" />
        <Circle v-if="state === 'active'" />
        <Dot v-if="state === 'inactive'" />
      </Button>
    </StepperTrigger>

    <div class="flex w-full flex-col gap-4">
      <div class="flex flex-col gap-1">
        <StepperTitle
          :class="[state === 'active' && 'text-primary']"
          class="text-sm font-semibold transition"
        >
          {{ title }}
        </StepperTitle>
        <StepperDescription
          :class="[state === 'active' && 'text-primary']"
          class="sr-only text-xs text-muted-foreground transition md:not-sr-only"
        >
          {{ description }}
        </StepperDescription>
      </div>

      <slot />
    </div>
  </StepperItem>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
import { Check, Circle, Dot } from 'lucide-vue-next'

interface Props {
  step: number
  title: string
  description: string
  showSeparator?: boolean
}

withDefaults(defineProps<Props>(), {
  showSeparator: true
})
</script>
