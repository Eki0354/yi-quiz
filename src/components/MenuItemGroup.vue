<template>
  <el-submenu :index="item.id">
    <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
    <el-menu-item-group :title="type.title" v-for="type in item.data" :key="type.id">
      <el-submenu :index="menu.id" :key="menu.id" v-for="menu in type.data">
        <template slot="title"><i :class="menu.icon"></i>{{menu.title}}</template>
        <template v-for="menu in type.data">
          <el-menu-item :index="menu.path" :key="menu.id">
            <i class="el-icon-question"></i>
            <span slot="title">原题</span>
          </el-menu-item>
          <!-- <el-menu-item-group title="个人答案" :key="menu.id + 'answers'">
            <el-menu-item :index="aMenu.path" v-for="aMenu in menu.answers" :key="aMenu.id">{{aMenu.title}}</el-menu-item>
          </el-menu-item-group> -->
          <el-submenu v-if="hasAnswers(menu)" :index="menu.id + 'answers'" :key="menu.id + 'answers'">
            <template slot="title"><i class="el-icon-unlock"></i>个人答案</template>
            <el-menu-item :index="aMenu.path" v-for="aMenu in menu.answers" :key="aMenu.id">{{aMenu.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-submenu>
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
  },

  methods: {
    hasAnswers (item) {
      console.log(item)
      return item.answers && item.answers.length > 0
    }
  }
}
</script>

<style>

</style>
