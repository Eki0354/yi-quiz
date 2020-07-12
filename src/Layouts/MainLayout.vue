<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>工作需求实例</template>
            <el-menu-item-group title="CSS类">
              <el-menu-item index="/css/dataTable">DataTable样式</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
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
</style>
