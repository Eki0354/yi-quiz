<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>工作需求实例</template>
            <el-menu-item-group title="CSS类">
              <el-menu-item index="1-1">DataTable样式</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <data-table :sourceData.sync="sourceData" :columns="columns"></data-table>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import DataTable from '../components/DataTable'

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
.el-aside {
  color: #333;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

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
