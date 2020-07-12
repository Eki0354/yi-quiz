<template>
  <div>
    <div style="margin-bottom: 10px;" v-if="toolMenuFlag">
      <div v-if="headTitleFlag" style="text-align: center;font-size: 16px;color: #6e778f;clear: both;margin-bottom: 4px;font-weight: bold;">
        <span>{{headTitle}}</span>
      </div>
      <div style="display: flex;position: relative;">
        <div style="flex: 1">
          <slot name="headButton">
          </slot>
        </div>
        <div v-if="menuFlag" style="padding-left: 10px">
          <el-dropdown :hide-on-click="false" trigger="click" class="ycDataTableDropdown">
            <el-button size="medium" icon="iconfont iconycmore" class="ycMoreCss"></el-button>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(column, index) in columns">
                <el-dropdown-item  :key="index">
                  <el-checkbox v-model="columnMenus[column.prop]" :disabled="!columnDisable[column.prop]" @change="checkboxChange">{{column.label}}</el-checkbox>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <el-table :data="tableDatas"
              v-loading="vLoading"
              :element-loading-text="elementLoadingText"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 1)"
              @selection-change="selectionChange"
              :border="border"
              fit
              @row-click="rowClick"
              highlight-current-row
              tooltip-effect="dark"
              ref="vueTable"
              :id="tableId"
              :style="currentStyle"
              v-bind="$attrs"
              v-on="$listeners"
              :cellClassName="cellClassName"
              header-cell-class-name="common-table-header">
      <el-table-column v-if="showSelection"
                       :type="type"
                       align="center"
                       :label="typeLabel"
                       :selectable="selectTable"
                       width="55"></el-table-column>
      <slot name="index"></slot>
      <template v-for="(column) in columns">
        <el-table-column  v-if="columnMenus[column.prop]" :align="column.align" header-align="center" :label="column.label" :prop="column.prop" :min-width="column.width" :fixed="column.fixed" :sortable="column.sortable" :show-overflow-tooltip="column.showOverflowTooltip" :key="column.prop" :resizable="column.resizable">
          <slot v-if="column.columnSlot" :name="column.prop+'Column'"></slot>
          <template :slot="backHeadname(column)" slot-scope="scope" >
            <slot :name="column.prop+'head'" :data="scope"></slot>
          </template>
          <template slot-scope="scope">
            <!-- 如果有格式化，处理格式化数据 -->
            <span v-if="columnMenus[column.prop] && !column.slot">{{column.format?column.format(scope.row):scope.row[column.prop]}}</span>
            <slot :name="column.prop" v-if="column.slot" :data="scope"></slot>
          </template>
          <template v-if="column.child" >
            <template v-for="(columnChild) in column.child">
              <el-table-column  :align="columnChild.align" header-align="center" :label="columnChild.label" :prop="columnChild.prop" :width="columnChild.width" :key="columnChild.prop">
              <template slot-scope="scope">
                <!-- 处理child里面的格式化数据，如果有格式化，处理格式化数据 -->
                <span>{{columnChild.format?columnChild.format(scope.row):scope.row[columnChild.prop]}}</span>
              </template>
            </el-table-column>
            </template>
          </template>
        </el-table-column>
      </template>
      <slot>
      </slot>
      <template slot="append">
        <slot name="append"></slot>
      </template>
    </el-table>
    <div class="pagination-container">
      <div style="flex: 1">
        <slot name="paginationLeft">
        </slot>
      </div>
      <div v-if="showPage"
           :style="paginationStyle">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="queryParas.pageIndex"
                       :page-sizes="pageSizes"
                       :page-size="queryParas.pageSize"
                       :layout="pageLayout"
                       prev-text="上一页"
                       next-text="下一页"
                       :pager-count="pagerCount"
                       :total="currentTotal">
          <span style="text-align: center">{{queryParas.pageIndex}}</span>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// const V = 'V' // 查看
// const E = 'E' // 编辑
// const D = 'D' // 删除
// const U = 'U' // 上传
const C = 'C' // 新建
const B = 'B' // 批量删除
export default {
  props: {
    // 所属菜单Code-->全局唯一
    menuCode: {
      type: String,
      default: null
    },
    // 新增按钮权限标识
    createPerms: {
      type: String,
      default: null
    },
    // 批量删除按钮权限标识
    delsPerms: {
      type: String,
      default: null
    },
    // 查看按钮权限标识
    viewPerms: {
      type: String,
      default: null
    },
    // 编辑按钮权限标识
    editPerms: {
      type: String,
      default: null
    },
    // 上传按钮权限标识
    uploadPerms: {
      type: String,
      default: null
    },
    // 删除按钮权限标识
    delPerms: {
      type: String,
      default: null
    },
    // 分页控件显示按钮个数
    pagerCount: {
      type: Number,
      default: function () {
        return 7
      }
    },
    // 表格下拉菜单显示开关
    menuFlag: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 表格数据源
    sourceData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 表格列定义数据
    columns: {
      type: Array,
      default: () => []
    },
    // 表格数据后端获取接口api
    api: {
      type: Object
    },
    // 表格数据加载提示语
    elementLoadingText: {
      type: String,
      default: function () {
        return '拼命加载中'
      }
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    // 表格上方按钮操作区域是否显示
    toolMenuFlag: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 表格style自定义
    styles: {
      type: String,
      default: function () {
        return 'width: 100%'
      }
    },
    // 是否显示表格选择列
    showSelection: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // 设置表格选择列的类型，不推荐设置，要使用index/expand类型建议单独自定义
    type: {
      type: String,
      default: function () {
        return 'selection'
      }
    },
    // 设置表格选择列的标题
    typeLabel: {
      type: String,
      default: function () {
        return '#'
      }
    },
    // 是否分页显示
    showPage: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    // 分页组件布局，根据后端是否是真实分页来传值，默认后端是真分页
    pageAll: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 分页显示个数选择器设置
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 30, 40, 50]
      }
    },
    // 共通操作按钮配置
    operateBtnLayout: {
      type: String,
      default: function () {
        return ''
      }
    },
    // 分页组件显示位置，默认居右
    pagePosition: {
      type: String,
      validator: function (value) {
        return value === 'right' || value === 'left' || value === 'center'
      },
      default: function () {
        return 'right'
      }
    },
    // 表格api查询参数
    queryParas: {
      type: Object,
      default: function () {
        return {
          pageIndex: 1,
          pageSize: 10,
          keys: null
        }
      }
    },
    // 用来触发查询方法，一般自加1
    loadCount: {
      type: Number,
      default: function () {
        return 0
      }
    },
    // 删除按钮提示语
    delAlertMsg: {
      type: String,
      default: function () {
        return '此操作会删除该条数据，是否继续？'
      }
    },
    // 分页查询调用的api字符串
    loadPage: {
      type: String,
      default: function () {
        return 'getPage'
      }
    },
    // 列表查询调用的api字符串
    loadList: {
      type: String,
      default: function () {
        return 'getList'
      }
    },
    // 删除按钮api
    deleteApi: {
      type: Object
    },
    // 操作列宽度
    operatWidth: {
      type: [String]
    },
    // 删除按钮是否自定义删除方法
    autoDel: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 选择框禁用条件方法
    selectTable: {
      type: Function,
      default: function () {
        return function ({ row, index }) {
          return true
        }
      }
    },
    // table标题是否显示
    headTitleFlag: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // table标题
    headTitle: {
      type: String,
      default: ''
    },
    // 加载提示flag，自定义查询方法的情况需要设置，触发加载提示
    loadingFlag: {
      type: Boolean,
      default: false
    },
    // 是否开启鉴权，默认关闭
    openPerms: {
      type: Boolean,
      default () {
        return false
      }
    },
    // dataTable的id属性设置
    tableId: {
      type: String,
      default: function () {
        return 'data-table'
      }
    },
    // 单元格的className，使用共通配置，一般不需要设置
    cellClassName: {
      type: String,
      default: function () {
        return 'common-table-cell'
      }
    },
    // 后端分页表格数据返回字段
    datasField: {
      type: String,
      default: function () {
        return 'datas'
      }
    },
    // 后端分页总行数返回字段
    totalRowField: {
      type: String,
      default: function () {
        return 'totalRow'
      }
    }
  },
  data () {
    return {
      currentTotal: 0,
      tableDatas: this.sourceData,
      vLoading: false,
      columnMenus: {},
      columnDisable: {},
      selectionData: [],
      tableData: [],
      setDatasource: this.sourceData && this.sourceData.length > 0
    }
  },
  mounted () {
  },
  created: function () {
    this.columns.forEach(it => {
      this.$set(this.columnMenus, it.prop, it.columnMenusFlag === undefined ? true : it.columnMenusFlag)
      this.$set(this.columnDisable, it.prop, true)
    })
  },
  computed: {
    btnCreate: function () {
      const layout = this.operateBtnLayout
      return layout !== null && layout !== '' && layout.indexOf(C) !== -1
    },
    btnDels: function () {
      const layout = this.operateBtnLayout
      return layout !== null && layout !== '' && layout.indexOf(B) !== -1
    },
    operateBtn: function () {
      return this.btnCreate || this.btnDels
    },
    currentStyle: function () {
      return this.styles
    },
    paginationStyle: function () {
      return { 'text-align': this.pagePosition }
    },
    pageLayout () {
      return this.pageAll ? 'total, sizes, prev, pager, next, jumper' : 'sizes, prev, slot, next'
    }
  },
  watch: {
    // 监听表格数据，调用构造表格方法
    sourceData: {
      deep: true,
      handler (value, old) {
        if (!this.UtilJs.isEmpty(this.currentTotal)) {
          this.buildTableData(value, this.currentTotal)
        } else {
          this.buildTableData(value)
        }
      }
    },
    // 监听loadCount参数，变化时触发加载表格数据方法
    loadCount: function (value) {
      try {
        if (this.queryParas.pageIndex !== 1) {
          this.queryParas.pageIndex = 1
        }
        this.loadTableData()
      } finally {
        this.$emit('update:loadCount', value)
      }
    },
    // 监听loadingFlag参数，用来打开关闭表格加载提示
    loadingFlag: function (value) {
      this.vLoading = value
    }
  },
  methods: {
    backHeadname (column) {
      return column.headslot ? 'header' : ''
    },
    rowClick (row, column, event) {
      this.$emit('onMouseOver', row, column, event)
    },
    // 加载表格数据方法，可以传入api组件内部加载数据，也可以自定义
    loadTableData: function () {
      const $this = this
      $this.vLoading = true
      if (this.setDatasource) {
        this.buildTableData(this.sourceData)
        $this.vLoading = false
        return
      }
      if (!this.api) {
        $this.vLoading = false
        return
      }
      // 分页查询逻辑
      if (this.showPage) {
        this.api[this.loadPage](this.queryParas).then(res => {
          if (res.success) {
            if (res.data && res.data[this.datasField]) {
              $this.buildTableData(res.data[this.datasField], res.data[this.totalRowField])
              $this.$emit('getTableData', res.data[this.datasField])
              $this.vLoading = false
            } else {
              $this.vLoading = false
            }
          } else {
            $this.error(res.errmsg || '获取数据失败')
            $this.vLoading = false
          }
        }).catch(function () {
          $this.$emit('handleFilterFailed')
          $this.vLoading = false
        })
      // 列表查询逻辑
      } else {
        this.api[this.loadList](this.queryParas).then(res => {
          if (res.success) {
            $this.buildTableData(res.data)
            $this.$emit('getTableData', res.data)
            $this.vLoading = false
          } else {
            $this.error(res.errmsg || '获取数据失败')
            $this.vLoading = false
          }
        }).catch(function () {
          $this.$emit('handleFilterFailed')
          $this.vLoading = false
        })
      }
    },
    // 选择项发生变化时会触发该事件
    selectionChange: function (selection) {
      this.selectionData = selection
      this.$emit('update:selectedRows', selection)
      this.$emit('selectRowChange', selection)
    },
    // 构造表格数据方法，如果自定义查询方法，可以外部调用此方法，传入表格数据和数据总条数
    buildTableData: function (data, total = null) {
      if (!data || data.length < 0) {
        return
      }
      this.currentTotal = total || data.length
      this.tableDatas = data
      this.$emit('update:sourceData', data)
    },
    // pageSize改变时会触发该事件
    handleSizeChange: function (value) {
      this.queryParas.pageSize = value
      this.queryParas.pageIndex = 1
      this.$emit('sizeChange', this.queryParas.pageIndex, this.queryParas.pageSize)
      this.loadTableData()
    },
    // currentPage改变时会触发该事件
    handleCurrentChange: function (value) {
      this.queryParas.pageIndex = value
      this.$emit('currentChange', this.queryParas.pageIndex, this.queryParas.pageSize)
      this.loadTableData()
    },
    // 新增按钮click触发事件
    showCreate: function () {
      this.$emit('onCreateRow')
    },
    // 批量删除按钮click触发事件
    showDels: function () {
      const $this = this
      if (this.selectionData.length === 0) {
        $this.warning('请先勾选要删除的数据!')
        return
      }
      $this.$confirm('此操作会删除选中数据，是否继续？', '提示', {
        type: 'warning'
      }).then(() => {
        $this.$emit('onDelsRow', this.selectionData)
      })
    },
    // 查询方法，兼容老代码，不推荐使用，外部建议调用loadTableData方法来代替
    handleFilter: function () {
      this.loadCount = this.loadCount + 1
    },
    // 操作列按钮click触发事件
    operateBtnClick (returnData) {
      this.$emit('onEditRow', returnData.rowIndex, returnData.rowData, returnData.clickType)
    },
    // 列下拉菜单change事件，组件内部维护
    checkboxChange (val) {
      let count = 0
      let keyVal = ''
      for (const key in this.columnMenus) {
        if (this.columnMenus[key]) {
          keyVal = key
          count++
        }
      }
      if (count === 1) {
        this.$set(this.columnDisable, keyVal, false)
      } else {
        for (const key in this.columnDisable) {
          this.$set(this.columnDisable, key, true)
        }
      }
    }
  }
}
</script>
