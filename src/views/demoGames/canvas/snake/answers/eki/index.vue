<template>
  <canvas :id="canvasId"></canvas>
</template>

<script>
export default {
  name: 'SnakeCanvas',
  data () {
    return {
      canvasId: 'canvas_snake',
      canvas: null
    }
  },
  mounted () {
    this.canvas = window[this.canvasId]
  },
  methods: {
    onResize () {

    }
  }
}
</script>
