<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <span class="rounded-full bg-indigo-600 px-4 py-1 text-white uppercase text-sm">
        Features
      </span>
    </div>

    <h1 class="text-4xl font-bold text-gray-700 text-center mt-6 dark:text-white">
      A template for your no-code platform
    </h1>
    <p class="text-center mt-6 text-lg font-light text-gray-500 dark:text-gray-200">
      The time is now for it to be okay to be great. For being a bright color. For
      standing out.
    </p>
  </div>

  <div class="container mx-auto mt-8 px-8 grid grid-cols-1 md:grid-cols-3">
    <FeatureBlock
      title="Collaboration"
      description="The template provides first-class support for collaboration between multiple users using Websockets communication and CRDT algorithms for managing in Mongo DB storage"
      letter="N"
      letter-color="indigo"
    />

    <FeatureBlock
      title="Cloud and Self-hosted support"
      description="Use the template either in Cloud as a website or install it with NPX or Docker to your own server"
      letter="C"
      letter-color="lime"
    />

    <FeatureBlock
      title="Enhanced Developer Experience"
      description="Enjoy the comfort and power that TypeScript brings to the app. The template has a monorepo architecture with the most modern tools and technologies used to assist you in developing the most advanced no-code platforms."
      letter="S"
      letter-color="red"
    />
  </div>
</template>

<script lang="ts" setup>
import FeatureBlock from '~/pages/home/feature-block.vue';
</script>
