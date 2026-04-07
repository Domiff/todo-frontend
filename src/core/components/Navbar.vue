<script setup lang="ts">
    import { computed } from "vue"
    import { useTheme } from "vuetify/framework"

    import MoonIcon from "@/core/components/icons/MoonIcon.vue"
    import SunIcon from "@/core/components/icons/SunIcon.vue"
    import { useAuthStore } from "@/modules/auth/store"

    const theme = useTheme()
    const auth = useAuthStore()

    function toggleTheme() {
        theme.toggle(["lightPurple", "darkPurple"])
    }

    const currentIcon = computed(() => {
        return theme.global.current.value.dark ? SunIcon : MoonIcon
    })

    const isAuthenticated = computed(() => {
        return !!auth.isAuthenticated
    })
</script>

<template>
    <v-navigation-drawer max-width="280" permanent elevation="4" app class="navbar-drawer">
        <div class="pa-6 pb-4">
            <div class="d-flex justify-space-between gap-3">
                <div>
                    <div class="text-h5 font-weight-bold nav-title">ToDo</div>
                    <div class="text-caption nav-subtitle">Stay organized</div>
                </div>
                <v-btn
                    elevation="0"
                    icon="mdi-theme-light-dark"
                    size="small"
                    color="primary"
                    variant="tonal"
                    class="theme-switch-btn"
                    v-on:click="toggleTheme"
                >
                    <component v-bind:is="currentIcon" />
                </v-btn>
            </div>
        </div>

        <v-divider class="mx-6 opacity-50 nav-divider" />

        <div class="px-4 py-6">
            <div class="text-uppercase text-xs font-weight-medium nav-group mb-3 px-4">Main</div>

            <div class="d-flex flex-column ga-1">
                <v-btn
                    to="/"
                    variant="text"
                    prepend-icon="mdi-home"
                    class="justify-start nav-btn"
                    rounded="lg"
                    active-color="primary"
                >
                    Home
                </v-btn>

                <v-btn
                    to="/tasks"
                    variant="text"
                    prepend-icon="mdi-format-list-checks"
                    class="justify-start nav-btn"
                    rounded="lg"
                    active-color="primary"
                    v-if="isAuthenticated"
                >
                    Tasks
                </v-btn>
            </div>

            <v-divider class="my-8 mx-4 opacity-30 nav-divider" />

            <div class="text-uppercase text-xs font-weight-medium nav-group mb-3 px-4">Account</div>

            <div class="d-flex flex-column ga-1">
                <v-btn
                    to="/register"
                    variant="text"
                    prepend-icon="mdi-account-plus"
                    class="justify-start nav-btn"
                    rounded="lg"
                    active-color="primary"
                    v-if="!isAuthenticated"
                >
                    Registration
                </v-btn>

                <v-btn
                    to="/login"
                    variant="text"
                    prepend-icon="mdi-login-variant"
                    class="justify-start nav-btn"
                    rounded="lg"
                    active-color="primary"
                    v-if="!isAuthenticated"
                >
                    Login
                </v-btn>

                <v-btn
                    to="/logout"
                    variant="text"
                    prepend-icon="mdi-login-variant"
                    class="justify-start nav-btn"
                    rounded="lg"
                    active-color="primary"
                    v-if="isAuthenticated"
                >
                    Logout
                </v-btn>
            </div>
        </div>

        <template v-slot:append>
            <div class="pa-6">
                <v-divider class="mb-4 opacity-50 nav-divider" />
                <div class="text-center">
                    <span class="text-caption nav-footer"> © 2026 ToDo App </span>
                </div>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped>
    .navbar-drawer {
        background: color-mix(
            in srgb,
            rgb(var(--v-theme-surface)) 92%,
            rgb(var(--v-theme-background)) 8%
        );
        color: rgb(var(--v-theme-text-primary));
    }

    .nav-title {
        color: rgb(var(--v-theme-text-primary));
    }

    .nav-subtitle,
    .nav-group,
    .nav-footer {
        color: rgb(var(--v-theme-text-secondary));
    }

    .nav-divider {
        border-color: color-mix(in srgb, rgb(var(--v-theme-primary)) 24%, transparent);
    }

    .theme-switch-btn {
        min-width: 36px;
    }

    .nav-btn {
        color: rgb(var(--v-theme-text-primary));
        font-weight: 600;
    }

    .nav-btn :deep(.v-icon) {
        color: color-mix(in srgb, rgb(var(--v-theme-primary)) 86%, white 14%);
    }

    .nav-btn:hover {
        background: color-mix(in srgb, rgb(var(--v-theme-primary)) 12%, transparent);
    }
</style>
