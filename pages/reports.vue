<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Page Header -->
    <section class="space-y-2">
      <h1 class="text-2xl font-semibold">Reports</h1>
      <p class="text-muted-foreground">View analytics and insights from your contract data.</p>
    </section>

    <!-- Reports Overview -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Analytics Overview</h2>
        <p class="text-sm text-muted-foreground">Key metrics and performance indicators.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="rounded-lg border p-6">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900"></div>
            <div>
              <p class="text-sm font-medium">Total Contracts</p>
              <p class="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>

        <div class="rounded-lg border p-6">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900"></div>
            <div>
              <p class="text-sm font-medium">Processed</p>
              <p class="text-2xl font-bold">18</p>
            </div>
          </div>
        </div>

        <div class="rounded-lg border p-6">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900"></div>
            <div>
              <p class="text-sm font-medium">Pending</p>
              <p class="text-2xl font-bold">6</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Activity -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Recent Activity</h2>
        <p class="text-sm text-muted-foreground">Latest contract processing activities.</p>
      </div>

      <div class="space-y-4">
        <div class="rounded-lg border p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Contract Analysis Completed</p>
              <p class="text-sm text-muted-foreground">Service Agreement v2.1</p>
            </div>
            <span class="text-sm text-muted-foreground">2 hours ago</span>
          </div>
        </div>

        <div class="rounded-lg border p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Document Uploaded</p>
              <p class="text-sm text-muted-foreground">Partnership Agreement</p>
            </div>
            <span class="text-sm text-muted-foreground">1 day ago</span>
          </div>
        </div>

        <div class="rounded-lg border p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Data Extraction Started</p>
              <p class="text-sm text-muted-foreground">Employment Contract</p>
            </div>
            <span class="text-sm text-muted-foreground">3 days ago</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Reports page logic can be added here
</script>
