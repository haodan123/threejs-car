<template>
  <div @click="onClick">bbbbbb</div>
</template>

<script setup>
import emitter from '@/utils/mitt.js'


const onClick = () => {
  console.log('click')
  // listen to an event
  emitter.emit('foo', { a: 'b' })
}
</script>

<style scoped></style>
