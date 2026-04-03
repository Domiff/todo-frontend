<script setup lang="ts">
    import Navbar from "@/core/components/Navbar.vue"
</script>

<template>
    <v-app>
        <v-main>
            <Navbar />
            <RouterView />
        </v-main>
    </v-app>
</template>
