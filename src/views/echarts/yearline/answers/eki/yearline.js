export default class Yearline {
  constructor ({
    // 扩展Yearline的组件中echarts对象的字段名称
    echartsField = 'echarts',
    // 显示长度
    size = 5,
    // 初始最小年份
    min = (new Date()).getFullYear() - size + 1,
    // 最大年份（默认当前日期年份）
    max = (new Date()).getFullYear(),
    // 初始被选中选项的下标
    currentIndex = 0,
    // 除loop和currentIndex属性外，都可以用原生属性覆盖
    defaultOption = {}
  }) {
    const config = {
      computed: {
        yearlineOption () {
          const baseOption = {
            axisType: 'category',
            autoPlay: false,
            controlStyle: {
              showPlayBtn: false,
              itemGap: 36
            },
            data: new Array(this.yearlineSize).fill().map((v, i) => this.yearlineMin + i)
          }
          const forceOption = {
            loop: this.yearlineLoop,
            currentIndex: this.currentYearlineIndex
          }
          return { timeline: Object.assign(baseOption, defaultOption, forceOption) }
        }
      },
      data () {
        const validCurrentIndex = Math.max(Math.min(currentIndex, size - 1), 0)
        return {
          currentYearlineIndex: validCurrentIndex,
          yearlineLoop: validCurrentIndex === 0 || validCurrentIndex === size - 1,
          yearlineSize: size,
          yearlineMin: min,
          yearlineMax: max,
          isYearlineSliderClick: true
        }
      },
      methods: {
        initYearline () {
          this[echartsField].on('timelinechanged', this.yearlineChanged)
          this[echartsField].on('click', 'timeline', this.yearlineClick)
        },
        yearlineChanged ({ currentIndex }) {
          setTimeout(() => {
            if (!this.isYearlineSliderClick) {
              this.currentYearlineIndex = currentIndex
              this.isYearlineSliderClick = true
            } else {
              // 未超出最大年份（否则执行操作，强制刷新）
              if (this.yearlineMin + this.currentYearlineIndex < this.yearlineMax || currentIndex < this.currentYearlineIndex) {
                // 将选中最大年份时，禁止循环播放，防止递增返回头部
                if (currentIndex === this.yearlineSize - 1 && this.currentYearlineIndex === this.yearlineSize - 2) {
                  if (this.yearlineMin + currentIndex === this.yearlineMax) {
                    this.yearlineLoop = false
                  }
                  this.currentYearlineIndex = currentIndex
                } else {
                  this.yearlineLoop = true
                  // 年份阶段增加
                  if (currentIndex === 0 && this.currentYearlineIndex === this.yearlineSize - 1) {
                    this.yearlineMin += this.yearlineSize
                    if (this.yearlineMin <= this.yearlineMax - this.yearlineSize) {
                      this.currentYearlineIndex = 0
                    } else {
                      this.yearlineMin = this.yearlineMax - this.yearlineSize + 1
                      // 刚好跨越一个年份阶段时跳转头部
                      if (this.currentYearlineIndex + this.yearlineMin === this.yearlineMax) {
                        this.currentYearlineIndex = 0
                      } else {
                        // 否则跳转到下一个节点
                        this.currentYearlineIndex = this.yearlineMax - this.yearlineMin
                      }
                    }
                  } else
                  // 年份阶段减少
                  if (currentIndex === this.yearlineSize - 1 && this.currentYearlineIndex === 0) {
                    this.yearlineMin -= this.yearlineSize
                    this.currentYearlineIndex = this.yearlineSize - 1
                  } else {
                    // 范围内递增/递减或直接选择
                    this.currentYearlineIndex = currentIndex
                  }
                }
              }
            }
            this.refreshYearline()
          }, 0)
        },
        yearlineClick (params) {
          this.isYearlineSliderClick = false
        },
        refreshYearline () {
          this[echartsField].setOption(this.yearlineOption)
        }
      },
      watch: {}
    }

    // 监听echarts绑定对象的改变，值有效时对其进行初始化
    config.watch[echartsField] = function (newVal, oldVal) {
      if (!oldVal && newVal) {
        this.initYearline()
      }
    }

    return config
  }
}
