<script setup>
const props = defineProps(["error"])
</script>

<template>
  <div class="main">
    <h1>{{props.error.statusCode}} Иди нахуй</h1>
  </div>
</template>

<style scoped>

</style>