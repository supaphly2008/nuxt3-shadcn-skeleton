<template>
  <div class="mx-auto max-w-4xl space-y-8">
    <!-- Settings Header -->
    <section class="space-y-2">
      <h1 class="text-2xl font-semibold">Settings</h1>
      <p class="text-muted-foreground">Manage your profile and preferences.</p>
    </section>

    <!-- Profile Settings -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Profile</h2>
        <p class="text-sm text-muted-foreground">Update your personal information.</p>
      </div>

      <div class="grid gap-6">
        <div class="flex items-center gap-4">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <span class="text-2xl font-semibold">{{ userInitials }}</span>
          </div>
          <div class="space-y-2">
            <Button variant="outline" size="sm">Change Avatar</Button>
            <p class="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="firstName">First Name</Label>
            <Input id="firstName" v-model="profile.firstName" placeholder="Enter your first name" />
          </div>
          <div class="space-y-2">
            <Label for="lastName">Last Name</Label>
            <Input id="lastName" v-model="profile.lastName" placeholder="Enter your last name" />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="profile.email" type="email" placeholder="Enter your email" />
        </div>

        <div class="space-y-2">
          <Label for="company">Company</Label>
          <Input id="company" v-model="profile.company" placeholder="Enter your company name" />
        </div>
      </div>
    </section>

    <Separator />

    <!-- Preferences -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Preferences</h2>
        <p class="text-sm text-muted-foreground">Customize your experience.</p>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <Label>Dark Mode</Label>
            <p class="text-sm text-muted-foreground">Toggle dark mode appearance</p>
          </div>
          <ThemeToggle />
        </div>

        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <Label>Email Notifications</Label>
            <p class="text-sm text-muted-foreground">Receive email updates about your contracts</p>
          </div>
          <Button
            :variant="preferences.emailNotifications ? 'default' : 'outline'"
            size="sm"
            @click="preferences.emailNotifications = !preferences.emailNotifications"
          >
            {{ preferences.emailNotifications ? 'On' : 'Off' }}
          </Button>
        </div>

        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <Label>Auto-save</Label>
            <p class="text-sm text-muted-foreground">Automatically save your work</p>
          </div>
          <Button
            :variant="preferences.autoSave ? 'default' : 'outline'"
            size="sm"
            @click="preferences.autoSave = !preferences.autoSave"
          >
            {{ preferences.autoSave ? 'On' : 'Off' }}
          </Button>
        </div>
      </div>
    </section>

    <Separator />

    <!-- Security -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Security</h2>
        <p class="text-sm text-muted-foreground">Manage your account security.</p>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <Label>Two-Factor Authentication</Label>
            <p class="text-sm text-muted-foreground">Add an extra layer of security</p>
          </div>
          <Button
            :variant="preferences.twoFactor ? 'default' : 'outline'"
            size="sm"
            @click="preferences.twoFactor = !preferences.twoFactor"
          >
            {{ preferences.twoFactor ? 'Enabled' : 'Disabled' }}
          </Button>
        </div>

        <Button variant="outline" size="sm"> Change Password </Button>
      </div>
    </section>

    <Separator />

    <!-- Data & Privacy -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Data & Privacy</h2>
        <p class="text-sm text-muted-foreground">Manage your data and privacy settings.</p>
      </div>

      <div class="space-y-4">
        <Button variant="outline" size="sm"> Export My Data </Button>
        <Button variant="outline" size="sm" class="text-destructive"> Delete Account </Button>
      </div>
    </section>

    <!-- Save Button -->
    <div class="flex justify-end gap-4">
      <Button variant="outline" @click="resetSettings"> Reset </Button>
      <Button @click="saveSettings"> Save Changes </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import ThemeToggle from '@/components/ThemeToggle.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/composables/useToast'

// Profile data
const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  company: 'Acme Corp'
})

// Preferences
const preferences = ref({
  emailNotifications: true,
  autoSave: true,
  twoFactor: false
})

const { toast } = useToast()

// Computed
const userInitials = computed(() => {
  return `${profile.value.firstName.charAt(0)}${profile.value.lastName.charAt(0)}`.toUpperCase()
})

// Methods
const saveSettings = () => {
  toast.success('Settings Saved', 'Your settings have been updated successfully.')
}

const resetSettings = () => {
  profile.value = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Acme Corp'
  }
  preferences.value = {
    emailNotifications: true,
    autoSave: true,
    twoFactor: false
  }
  toast.success('Settings Reset', 'Your settings have been reset to default values.')
}
</script>
