<template>
  <div class="table-tree-expand-from-next">
    <h3>题目：</h3>
    <p>以下为element-ui官网有关Table组件展示树状结构数据的例子。</p>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <h3>要求：</h3>
    <p>表格组件在展示树状数据时，似乎永远在第一列添加展开和收起操作，尝试阅读源码，用最简单的方式实现在任意一列添加展开/收起图标。</p>
    <h3>扩展：</h3>
    <p>既然可以将图标添加在第一列以后，那么对其他列来个行合并怎么样？尽量使用最简单直接的算法。</p>
    <h4>参考效果：</h4>
    <img :src="img" alt="">
  </div>
</template>

<script>
import img from '@/assets/element-ui/tableTreeExpandFromNext.png'
export default {
  name: 'tableTreeExpandFromNext',
  data () {
    return {
      img,
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        children: [{
          id: 21,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 22,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 221,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 222,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }]
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.table-tree-expand-from-next {
  width: 800px;
}
</style>
