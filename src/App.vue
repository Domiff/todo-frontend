<script setup lang="ts">
    import Navbar from "@/components/Navbar.vue"
</script>

<template>
    <v-app>
        <Navbar />

        <v-main>
            <RouterView class="bg-purple-lighten-5" />
        </v-main>
    </v-app>
</template>
