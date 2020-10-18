<template>
  <div class="card"></div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>
