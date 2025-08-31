<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Page Header -->
    <section class="space-y-2">
      <h1 class="text-2xl font-semibold">Projects</h1>
      <p class="text-muted-foreground">Manage your contract projects and workflows.</p>
    </section>

    <!-- Project Actions -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="space-y-2">
          <h2 class="text-xl font-medium">Active Projects</h2>
          <p class="text-sm text-muted-foreground">Your ongoing contract processing projects.</p>
        </div>
        <Button>
          <Plus class="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="space-y-6">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="cursor-pointer rounded-lg border p-6 transition-shadow hover:shadow-md">
          <div class="mb-4 flex items-start justify-between">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900"
            >
              <span class="font-semibold text-blue-600 dark:text-blue-400">SA</span>
            </div>
            <span
              class="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              Active
            </span>
          </div>
          <h3 class="mb-2 font-semibold">Service Agreement</h3>
          <p class="mb-4 text-sm text-muted-foreground">Client service agreement for Q1 2024</p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Progress</span>
            <span class="font-medium">75%</span>
          </div>
          <div class="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div class="h-2 rounded-full bg-blue-600" style="width: 75%"></div>
          </div>
        </div>

        <div class="cursor-pointer rounded-lg border p-6 transition-shadow hover:shadow-md">
          <div class="mb-4 flex items-start justify-between">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900"
            >
              <span class="font-semibold text-green-600 dark:text-green-400">PA</span>
            </div>
            <span
              class="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            >
              Review
            </span>
          </div>
          <h3 class="mb-2 font-semibold">Partnership Agreement</h3>
          <p class="mb-4 text-sm text-muted-foreground">Strategic partnership with TechCorp</p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Progress</span>
            <span class="font-medium">90%</span>
          </div>
          <div class="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div class="h-2 rounded-full bg-green-600" style="width: 90%"></div>
          </div>
        </div>

        <div class="cursor-pointer rounded-lg border p-6 transition-shadow hover:shadow-md">
          <div class="mb-4 flex items-start justify-between">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900"
            >
              <span class="font-semibold text-purple-600 dark:text-purple-400">EC</span>
            </div>
            <span
              class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              Draft
            </span>
          </div>
          <h3 class="mb-2 font-semibold">Employment Contract</h3>
          <p class="mb-4 text-sm text-muted-foreground">New employee onboarding contract</p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Progress</span>
            <span class="font-medium">45%</span>
          </div>
          <div class="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div class="h-2 rounded-full bg-purple-600" style="width: 45%"></div>
          </div>
        </div>

        <div class="cursor-pointer rounded-lg border p-6 transition-shadow hover:shadow-md">
          <div class="mb-4 flex items-start justify-between">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900"
            >
              <span class="font-semibold text-orange-600 dark:text-orange-400">NDA</span>
            </div>
            <span
              class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-200"
            >
              Pending
            </span>
          </div>
          <h3 class="mb-2 font-semibold">Non-Disclosure Agreement</h3>
          <p class="mb-4 text-sm text-muted-foreground">Confidentiality agreement for vendors</p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Progress</span>
            <span class="font-medium">25%</span>
          </div>
          <div class="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div class="h-2 rounded-full bg-orange-600" style="width: 25%"></div>
          </div>
        </div>

        <div class="cursor-pointer rounded-lg border p-6 transition-shadow hover:shadow-md">
          <div class="mb-4 flex items-start justify-between">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900"
            >
              <span class="font-semibold text-red-600 dark:text-red-400">LC</span>
            </div>
            <span
              class="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              Completed
            </span>
          </div>
          <h3 class="mb-2 font-semibold">License Contract</h3>
          <p class="mb-4 text-sm text-muted-foreground">Software licensing agreement</p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Progress</span>
            <span class="font-medium">100%</span>
          </div>
          <div class="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div class="h-2 rounded-full bg-red-600" style="width: 100%"></div>
          </div>
        </div>

        <div
          class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400"
        >
          <div class="text-center">
            <Plus class="mx-auto mb-2 h-8 w-8 text-gray-400" />
            <p class="text-sm font-medium text-gray-600">Create New Project</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'

// Projects page logic can be added here
</script>
