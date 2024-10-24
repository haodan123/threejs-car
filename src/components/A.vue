<template>
  <div>aaaaa</div>
</template>

<script setup>
import { onMounted } from 'vue'
import emitter from '@/utils/mitt.js'

// onMounted(() => {
// listen to an event
emitter.on('foo', e => console.log('foo', e))
// })
</script>

<style scoped></style>
