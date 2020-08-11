<template>
  <canvas id="canvas-eki" width="800" height="600"></canvas>
</template>

<script>
export default {
  mounted () {
    const canvas = document.getElementById('canvas-eki')
    const context = canvas.getContext('2d')
    // 方框的绘图坐标
    const rect = [100, 100, 200, 200]
    // 四个角的绘图坐标
    let corners = []
    // 角的边长
    const cornerWidth = 16
    render()
    // 是否缩放模式
    let isScale = false
    // 标识哪个角被抓起
    let scaleIndex = -1
    // 是否拖动模式
    let isDrag = false
    // 鼠标按下时的初始位置
    let initX = 0
    let initY = 0
    canvas.onmousedown = onmousedown
    canvas.onmousemove = onmousemove
    canvas.onmouseup = onmouseup

    // 根据方框的坐标计算四个角的坐标列表
    function getCornerCoords () {
      const halfWidth = cornerWidth / 2
      corners = [
        [
          rect[0] - halfWidth,
          rect[1] - halfWidth,
          cornerWidth,
          cornerWidth
        ],
        [
          rect[0] + rect[2] - halfWidth,
          rect[1] - halfWidth,
          cornerWidth,
          cornerWidth
        ],
        [
          rect[0] - halfWidth,
          rect[1] + rect[3] - halfWidth,
          cornerWidth,
          cornerWidth
        ],
        [
          rect[0] + rect[2] - halfWidth,
          rect[1] + rect[3] - halfWidth,
          cornerWidth,
          cornerWidth
        ]
      ]
    }

    // 主渲染函数
    function render () {
      context.clearRect(0, 0, canvas.width, canvas.height)
      drawBg()
      drawRect()
      getCornerCoords()
      drawCorner()
    }

    function drawBg () {
      context.fillStyle = 'rgba(0, 0, 0, .1)'
      context.fillRect(0, 0, 500, 400)
    }

    function drawRect () {
      context.fillStyle = 'rgba(0, 0, 0, .7)'
      context.fillRect(...rect)
    }

    function drawCorner () {
      context.fillStyle = 'rgba(0, 0, 0, 1)'
      corners.forEach(coord => context.fillRect(...coord))
    }

    function onmousedown (e) {
      const x = e.layerX
      const y = e.layerY
      // 判定时可给出2~3px的误差，否则误操作率高
      isScale = corners.some((c, i) => x >= c[0] && x <= c[0] + c[2] && y >= c[1] && y <= c[1] + c[3] && (scaleIndex = i + 1))
      const l = Math.min(rect[0], rect[0] + rect[2])
      const r = Math.max(rect[0], rect[0] + rect[2])
      const t = Math.min(rect[1], rect[1] + rect[3])
      const b = Math.max(rect[1], rect[1] + rect[3])
      isScale || (isDrag = x >= l && x <= r && y >= t && y <= b)
      if (!isScale && !isDrag) return
      initX = x
      initY = y
    }

    function onmousemove (e) {
      if (!isScale && !isDrag) return
      const x = e.layerX
      const y = e.layerY
      const mX = x - initX
      const mY = y - initY
      if (isScale) {
        switch (scaleIndex) {
          case 1:
            rect[0] += mX
            rect[1] += mY
            rect[2] -= mX
            rect[3] -= mY
            break
          case 2:
            rect[2] += mX
            rect[1] += mY
            rect[3] -= mY
            break
          case 3:
            rect[0] += mX
            rect[2] -= mX
            rect[3] += mY
            break
          case 4:
            rect[2] += mX
            rect[3] += mY
            break
        }
      }
      if (isDrag) {
        rect[0] += mX
        rect[1] += mY
      }
      initX = x
      initY = y
      render()
    }

    function onmouseup (e) {
      isScale = false
      isDrag = false
    }
  }
}
</script>
