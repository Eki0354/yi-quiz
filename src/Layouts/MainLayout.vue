<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="[]" router>
          <menu-item-group :item="item" v-for="item in menus" :key="item.id"></menu-item-group>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuItemGroup from '../components/MenuItemGroup'
import menus from '../const/menus'

export default {
  components: {
    MenuItemGroup
  },

  data () {
    return {
      menus
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
</style>
