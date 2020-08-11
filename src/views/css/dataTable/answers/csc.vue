<template>
  <div class="data-table">
    <data-table :sourceData.sync="sourceData" :columns="columns"></data-table>
  </div>
</template>

<script>
import DataTable from '../../../../components/DataTable'

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

/deep/ .el-table__empty-block {
  justify-content: inherit;
  /deep/ .el-table__empty-text {
    position: sticky;
    left: 50%;
    width: 60px;
  }
}
</style>
