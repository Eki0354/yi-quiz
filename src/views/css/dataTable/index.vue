<template>
  <div class="data-table">
    <h5>说明：</h5>
    <p>
      1. 表单在无数据（绑定数据对象为空数组）时，默认显示“暂无数据”的提示信息
    </p>
    <p>
      2. 提示信息以表单总宽度计算，始终在居中位置（x和y方向）
    </p>
    <h5>要求：</h5>
    <p>
      1. 实现提示信息以表单可视宽度（即当前可见宽度）计算，始终在居中位置
    </p>
    <p>
      2. 仅更改CSS样式
    </p>
    <data-table :sourceData.sync="sourceData" :columns="columns"></data-table>
    <br>
    <h5>示例图：</h5>
    <img style="width: 100%;" :src="require('../../../assets/css/dataTable/temp.gif')" alt="">
  </div>
</template>

<script>
import DataTable from '../../../components/DataTable'

export default {
  components: {
    DataTable
  },
  data () {
    return {
      sourceData: [],
      columns: [
        {
          prop: 'name',
          label: '姓名',
          width: '160px'
        },
        {
          prop: 'age',
          label: '年龄',
          width: '160px'
        },
        {
          prop: 'gender',
          label: '性别',
          width: '160px'
        },
        {
          prop: 'occupation',
          label: '职业',
          width: '160px'
        },
        {
          prop: 'birthday',
          label: '出生日期',
          width: '160px'
        },
        {
          prop: 'salary',
          label: '月薪',
          width: '160px'
        },
        {
          prop: 'test1',
          label: '测试列1',
          width: '160px'
        },
        {
          prop: 'test2',
          label: '测试列2',
          width: '160px'
        },
        {
          prop: 'test3',
          label: '测试列3',
          width: '160px'
        },
        {
          prop: 'test4',
          label: '测试列4',
          width: '160px'
        },
        {
          prop: 'test5',
          label: '固定列',
          width: '160px',
          fixed: 'right'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  .data-table {
    width: 100%;
    /deep/ .el-table__header {
      th {
        background-color: #ddd;
      }
    }
  }
}
</style>
