<template>
  <div>
    <h4>编写代码实现一下要求：画一个矩形，拖拽矩形4个角中的一个，可以使矩形基于这个角进行缩放，在矩形内其他区域按住拖动可以移动该矩形的位置</h4>
    <div class="content">
      <div class="rect">
        <div class="c c-1"></div>
        <div class="c c-2"></div>
        <div class="c c-3"></div>
        <div class="c c-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  width: 200px;
  height: 200px;
  .rect {
    position: relative;
    width: 160px;
    height: 160px;
    border: 1px solid #333;

    .c {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #fff;
      border: 1px solid #000;
    }

    .c-1 {
      left: -5px;
      top: -5px;
    }

    .c-2 {
      right: -5px;
      top: -5px;
    }

    .c-3 {
      left: -5px;
      bottom: -5px;
    }

    .c-4 {
      right: -5px;
      bottom: -5px;
    }
  }
}
</style>
