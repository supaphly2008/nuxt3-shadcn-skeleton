<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Search Header -->
    <section class="space-y-2">
      <h1 class="text-2xl font-semibold">Search</h1>
      <p class="text-muted-foreground">Find contracts, documents, and more.</p>
    </section>

    <!-- Search Input -->
    <div class="flex gap-4">
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="Search contracts, documents, or keywords..."
          class="h-12 text-sm"
          @keyup.enter="performSearch"
        />
      </div>
      <Button @click="performSearch" class="h-12 px-6">
        <Search class="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-4">
      <Label class="text-sm font-medium">Filters:</Label>
      <div class="flex gap-2">
        <Button
          v-for="filter in filters"
          :key="filter.key"
          :variant="activeFilters.includes(filter.key) ? 'default' : 'outline'"
          size="sm"
          @click="toggleFilter(filter.key)"
        >
          {{ filter.label }}
        </Button>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchResults.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-sm text-muted-foreground">
          {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }} found
        </p>
        <Button variant="outline" size="sm" @click="clearSearch"> Clear Search </Button>
      </div>

      <div class="space-y-3">
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50"
          @click="selectResult(result)"
        >
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <h3 class="font-medium">{{ result.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ result.description }}</p>
              <div class="flex gap-2 text-xs text-muted-foreground">
                <span>{{ result.type }}</span>
                <span>•</span>
                <span>{{ result.date }}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Search class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="hasSearched" class="py-12 text-center">
      <Search class="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <h3 class="mb-2 text-xl font-medium">No results found</h3>
      <p class="text-muted-foreground">
        Try adjusting your search terms or filters to find what you're looking for.
      </p>
    </div>

    <!-- Recent Searches -->
    <div v-if="!hasSearched && recentSearches.length > 0" class="space-y-4">
      <h3 class="text-xl font-medium">Recent Searches</h3>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="search in recentSearches"
          :key="search"
          variant="outline"
          size="sm"
          @click="
            () => {
              searchQuery = search
              performSearch()
            }
          "
        >
          {{ search }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/composables/useToast'
import { Search } from 'lucide-vue-next'

// Search state
const searchQuery = ref('')
const hasSearched = ref(false)
const activeFilters = ref<string[]>([])

// Mock data
const recentSearches = ref(['contract analysis', 'PDF extraction', 'legal documents'])

const filters = [
  { key: 'contracts', label: 'Contracts' },
  { key: 'documents', label: 'Documents' },
  { key: 'recent', label: 'Recent' },
  { key: 'archived', label: 'Archived' }
]

// Mock search results
const searchResults = ref<
  Array<{
    id: string
    title: string
    description: string
    type: string
    date: string
  }>
>([])

const { toast } = useToast()

// Methods
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    toast.error('Search Error', 'Please enter a search term')
    return
  }

  hasSearched.value = true

  // Add to recent searches if not already there
  if (!recentSearches.value.includes(searchQuery.value)) {
    recentSearches.value.unshift(searchQuery.value)
    if (recentSearches.value.length > 5) {
      recentSearches.value.pop()
    }
  }

  // Mock search results
  searchResults.value = [
    {
      id: '1',
      title: 'Contract Analysis Report',
      description: 'Detailed analysis of contract terms and conditions with extracted data points.',
      type: 'Contract',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Legal Document Review',
      description: 'Comprehensive review of legal documents with highlighted key sections.',
      type: 'Document',
      date: '2024-01-14'
    },
    {
      id: '3',
      title: 'PDF Extraction Results',
      description: 'Successfully extracted data from uploaded PDF contract files.',
      type: 'Report',
      date: '2024-01-13'
    }
  ].filter(
    result =>
      result.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  toast.success(
    'Search Complete',
    `Found ${searchResults.value.length} results for "${searchQuery.value}"`
  )
}

const toggleFilter = (filterKey: string) => {
  const index = activeFilters.value.indexOf(filterKey)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(filterKey)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  hasSearched.value = false
  activeFilters.value = []
}

const selectResult = (result: any) => {
  toast.success('Result Selected', `Selected: ${result.title}`)
  // Here you would typically navigate to the result or open it
}
</script>
