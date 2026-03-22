import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript"
import { globalIgnores } from "eslint/config"
import skipFormatting from "eslint-config-prettier/flat"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import pluginVue from "eslint-plugin-vue"

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: "app/files-to-lint",
        files: ["**/*.{vue,ts,mts,tsx}"],
    },

    globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

    ...pluginVue.configs["flat/essential"],
    vueTsConfigs.recommended,
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "vue/multi-word-component-names": "off",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
    },
    skipFormatting,
)
