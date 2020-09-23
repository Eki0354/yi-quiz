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
    const rectTarget = [...rect]
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
    // 重绘延迟时间
    const delay = 50
    // 毫秒每帧，控制渲染频率
    const tpf = 15
    // 标识是否仍处于重绘阶段
    let isRenderring = false
    const minSpeed = 1
    const maxSpeed = 3
    let speed = 0
    // 加速度
    const acceleration = 0.1
    let renderTimer = null

    // 绑定事件，鼠标离开canvas后无意义，所以不绑在window上
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

    // 开启循环渲染
    function startRender () {
      if (renderTimer || isRenderring) return
      isRenderring = true
      setTimeout(() => {
        renderTimer = setInterval(() => initRect() ? render() : stopRender(), tpf)
      }, delay - tpf)
    }

    // 停止循环渲染
    function stopRender () {
      clearInterval(renderTimer)
      renderTimer = null
      isRenderring = false
      speed = 0
    }

    // 主渲染函数
    function render () {
      context.clearRect(0, 0, canvas.width, canvas.height)
      drawBg()
      drawRect()
      getCornerCoords()
      drawCorner()
    }

    // 动态刷新方框参数
    function initRect () {
      // 当前参数与目标参数已匹配，返回false停止渲染
      if (rect.every((v, i) => v === rectTarget[i])) return false
      // 否则进行动态计算

      // 自由落体，初始速度为0，可用于判断
      speed < maxSpeed && (speed += (speed ? minSpeed : acceleration))
      rect.forEach((v, i) => {
        if (v < rectTarget[i]) {
          if (v + speed < rectTarget[i]) {
            rect[i] += speed
          } else {
            rect[i] = rectTarget[i]
          }
        } else if (v > rectTarget[i]) {
          if (v - speed > rectTarget[i]) {
            rect[i] -= speed
          } else {
            rect[i] = rectTarget[i]
          }
        }
      })
      return true
    }

    function drawBg () {
      context.fillStyle = 'rgba(0, 0, 0, .1)'
      context.fillRect(0, 0, canvas.width, canvas.height)
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
      initX = x
      initY = y
      if (isScale) {
        switch (scaleIndex) {
          case 1:
            rectTarget[0] += mX
            rectTarget[1] += mY
            rectTarget[2] -= mX
            rectTarget[3] -= mY
            break
          case 2:
            rectTarget[2] += mX
            rectTarget[1] += mY
            rectTarget[3] -= mY
            break
          case 3:
            rectTarget[0] += mX
            rectTarget[2] -= mX
            rectTarget[3] += mY
            break
          case 4:
            rectTarget[2] += mX
            rectTarget[3] += mY
            break
        }
        startRender()
      }
      if (isDrag) {
        rect[0] += mX
        rect[1] += mY
        render()
      }
    }

    function onmouseup (e) {
      isScale = false
      isDrag = false
    }
  }
}
</script>
