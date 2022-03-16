<template>
  <main class="flex flex-col justify-between px-12 py-10">
    <MainSlide class="main-slide" />
    <div class="small-slides w-full flex mt-8">
      <SmallSlide />
    </div>
  </main>
</template>

<script setup lang="ts">
import MainSlide from '~/widgets/project/main-slide.vue';
import SmallSlide from '~/widgets/project/small-slide.vue';
</script>

<style scoped>
.main-slide {
  height: 70%;
}

.small-slides {
  height: 20%;
}
</style>
