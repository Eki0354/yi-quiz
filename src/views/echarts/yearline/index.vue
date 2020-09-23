<template>
  <div class="year-line">
    <h5>题目：</h5>
    Echarts中有一个组件叫做timeline，提供了在多个 ECharts option 间进行切换、播放等操作的功能。以下为官方例子：
    <templateCase />

    <h5>要求：</h5>对timeline的属性进行配置和改造，实现以下效果：
    <p>1. 禁止自动播放；</p>
    <p>2. 数据阶段性呈现，如当前呈现2010-2014年数据，选中2010年数据状态下，点击向左按钮，跳转至最右一项，但同时呈现2005-2009年数据，即跳转选中2009年数据；</p>
    <p>3. 阶段性数据可以限制范围（请注意阶段性跳转有可能越过范围）；</p>
    <p>4. 可以画一个空的echarts图，呈现出此组件所需效果即可；</p>
    <h5>效果图：</h5>（如果不好理解请参考本题 [答案>eki] 页面）
    <img style="width: 100%;" :src="require('../../../assets/echarts/yearline/yearline.gif')" alt="">

    <h5>加强需求：</h5>
    <p>将以上功能提取成单独组件、混入、继承或者任何合适的形式，使其可自定义且方便地使用在任一页面的任一echarts对象上</p>
  </div>
</template>

<script>
import templateCase from './templateCase'
export default {
  components: {
    templateCase
  }
}
</script>
