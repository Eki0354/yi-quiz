export default {
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  mounted () {
    if (!this.onResize) return
    this.resize = function (e) {
      this.width = e.offsetWidth
      this.height = e.offsetHight
      this.onResize && this.onResize()
    }
    this.$el.addEventListener('resize', this.resize)
    this.$once('destroyed', () => this.$el.removeEventListener('resize', this.resize))
  }
}
