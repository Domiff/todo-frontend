<script setup lang="ts">
    import Navbar from "@/core/components/Navbar.vue"
</script>

<template>
    <v-app>
        <v-main class="app-main">
            <Navbar />
            <RouterView />
        </v-main>
    </v-app>
</template>

<style>
    html,
    body,
    #app {
        min-height: 100%;
    }

    .app-main {
        background:
            radial-gradient(
                circle at 15% 0%,
                color-mix(in srgb, rgb(var(--v-theme-primary)) 14%, transparent) 0%,
                transparent 45%
            ),
            radial-gradient(
                circle at 85% 100%,
                color-mix(in srgb, rgb(var(--v-theme-secondary)) 10%, transparent) 0%,
                transparent 45%
            ),
            rgb(var(--v-theme-background));
    }

    .v-card {
        border: 1px solid color-mix(in srgb, rgb(var(--v-theme-primary)) 12%, transparent);
        box-shadow: 0 12px 32px color-mix(in srgb, rgb(var(--v-theme-background)) 50%, #000 14%);
    }

    .v-btn {
        letter-spacing: 0.02em;
        text-transform: none;
        font-weight: 600;
    }

    .v-card-title {
        color: rgb(var(--v-theme-text-primary));
        font-weight: 700;
        letter-spacing: 0.01em;
    }

    .v-card-text {
        color: rgb(var(--v-theme-text-secondary));
        line-height: 1.55;
    }
</style>
