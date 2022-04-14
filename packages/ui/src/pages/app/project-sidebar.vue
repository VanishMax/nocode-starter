<template>
  <aside
    class="h-full overflow-hidden flex flex-col py-3 px-2 border-r border-r-gray-200
    bg-gray-100 dark:bg-gray-900 dark:border-r-transparent transition-colors"
  >
    <div>
      <button
        type="button"
        class="flex items-center justify-between w-full h-12 px-3 mt-2 rounded
        text-gray-700 hover:text-gray-900 hover:bg-gray-300 transition-colors
        dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <span class="flex items-center">
          <TemplateIcon class="h-5 w-5" />
          <span class="ml-2 text-sm font-medium">Components</span>
        </span>
        <ChevronDownIcon class="h-4 w-4" />
      </button>

      <div class="flex flex-col w-full py-2">
        <ItemShowcase
          v-for="(block, i) in blocks"
          :key="i"
          :block="block"
          class="mb-2"
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { TemplateIcon, ChevronDownIcon } from '@heroicons/vue/outline';
import { getShowcaseBlocks } from '@nocode/core';
import { ItemShowcase } from '~/features/canvas';

const blocks = getShowcaseBlocks();
</script>
