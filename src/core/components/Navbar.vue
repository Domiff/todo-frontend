<script setup lang="ts">
    import { computed } from "vue"
    import { useTheme } from "vuetify/framework"

    const theme = useTheme()

    function toggleTheme() {
        theme.global.name.value = theme.global.current.value.dark ? "lightPurple" : "darkPurple"
    }
    const isDark = computed(() => {
        return theme.global.current.value.dark ? "🌞️" : "🌚"
    })
</script>

<template>
    <v-navigation-drawer width="280" permanent elevation="4" app>
        <div class="pa-6 pb-4">
            <div class="d-flex justify-space-between gap-3">
                <div>
                    <div class="text-h5 font-weight-bold text-purple-lighten-3">ToDo</div>
                    <div class="text-caption text-purple-lighten-3">Stay organized</div>
                </div>
                <v-btn elevation="0" icon="mdi-account" size="small" @click="toggleTheme" hover>
                    {{ isDark }}
                </v-btn>
            </div>
        </div>

        <v-divider color="purple-lighten-1" class="mx-6 opacity-50" />

        <div class="px-4 py-6">
            <div class="text-uppercase text-xs font-weight-medium text-purple-lighten-3 mb-3 px-4">
                Main
            </div>

            <div class="d-flex flex-column ga-1">
                <v-btn
                    to="/"
                    variant="text"
                    prepend-icon="mdi-home"
                    class="justify-start text-purple-lighten-3 nav-btn"
                    rounded="lg"
                    active-color="purple-lighten-1"
                >
                    Home
                </v-btn>

                <v-btn
                    to="/tasks"
                    variant="text"
                    prepend-icon="mdi-format-list-checks"
                    class="justify-start text-purple-lighten-3 nav-btn"
                    rounded="lg"
                    active-color="purple-lighten-1"
                >
                    Tasks
                </v-btn>
            </div>

            <v-divider color="purple-lighten-1" class="my-8 mx-4 opacity-30" />

            <div class="text-uppercase text-xs font-weight-medium text-purple-lighten-3 mb-3 px-4">
                Account
            </div>

            <div class="d-flex flex-column ga-1">
                <v-btn
                    to="/register"
                    variant="text"
                    prepend-icon="mdi-account-plus"
                    class="justify-start text-purple-lighten-5 nav-btn"
                    rounded="lg"
                    active-color="purple-lighten-1"
                >
                    Registration
                </v-btn>

                <v-btn
                    to="/login"
                    variant="text"
                    prepend-icon="mdi-login-variant"
                    class="justify-start text-purple-lighten-5 nav-btn"
                    rounded="lg"
                    active-color="purple-lighten-1"
                >
                    Login
                </v-btn>

                <v-btn
                    to="/logout"
                    variant="text"
                    prepend-icon="mdi-login-variant"
                    class="justify-start text-purple-lighten-5 nav-btn"
                    rounded="lg"
                    active-color="purple-lighten-1"
                >
                    Logout
                </v-btn>
            </div>
        </div>

        <template #append>
            <div class="pa-6">
                <v-divider color="purple-lighten-1" class="mb-4 opacity-50" />
                <div class="text-center">
                    <span class="text-purple-lighten-3 text-caption"> © 2026 ToDo App </span>
                </div>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped>
    .nav-btn {
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
    }

    .nav-btn:hover {
        transform: translateX(8px);
        background-color: rgba(255, 255, 255, 0.08) !important;
    }

    .nav-btn.v-btn--active {
        background-color: rgba(255, 255, 255, 0.12) !important;
        font-weight: 600;
    }

    .v-btn--active::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 28px;
        background-color: rgb(255, 255, 255);
        border-top-right-radius: 9999px;
        border-bottom-right-radius: 9999px;
    }
</style>
