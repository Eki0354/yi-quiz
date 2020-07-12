<template>
  <el-submenu :index="item.id">
    <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
    <el-menu-item-group :title="subItem.title" v-for="subItem in item.data" :key="subItem.id">
      <el-menu-item :index="menu.path" v-for="menu in subItem.menus" :key="menu.id">{{menu.title}}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuItemGroup',

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>

</style>
