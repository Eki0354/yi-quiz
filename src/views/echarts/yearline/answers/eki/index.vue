<template>
  <div class="regional-supply-chain-factoring-graph">
    <el-card>
      <template slot="header">
        <div class="text-right">
          <el-radio-group v-model="formData.issuerId" size="medium">
            <el-radio-button label="0">合计</el-radio-button>
            <el-radio-button label="1">渠道1</el-radio-button>
            <el-radio-button label="2">渠道2</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <div id="echarts_rscf" style="height: 600px; width: 1280px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import Yearline from './yearline'
export default {
  extends: new Yearline({
    echartsField: 'echarts',
    size: 5,
    min: 2013,
    currentIndex: 0
  }),
  data () {
    return {
      formData: {
        issuerId: '0'
      },
      echarts: null,
      sourceData: [],
      xAxisData: [],
      option: {
        baseOption: {
          tooltip: {},
          grid: {
            bottom: 100,
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: params => params.value.replace('\n', '')
                }
              }
            }
          },
          calculable: true,
          legend: {
            right: '20px',
            orient: 'vertical',
            data: ['余量', '累计', '存量']
          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0 },
            data: this.xAxisData
          },
          yAxis: [
            {
              type: 'value',
              name: '（元）'
            }
          ],
          series: [
            {
              name: '余量',
              type: 'bar',
              color: ['#d1c0b7'],
              barMaxWidth: 40
            },
            {
              name: '累计',
              type: 'bar',
              color: ['#d3727d'],
              barMaxWidth: 40
            },
            {
              name: '存量',
              type: 'bar',
              color: ['#7ed3f8'],
              barMaxWidth: 40
            }
          ]
        },
        options: []
      }
    }
  },
  mounted () {
    const echartsEle = document.getElementById('echarts_rscf')
    this.echarts = echarts.init(echartsEle)
    this.initData()
    this.issuerChange()
  },
  methods: {
    initData () {
      this.sourceData = [
        {
          id: 1,
          issuerName: '渠道1',
          region: '东北',
          subtotal: 54825.4389,
          subRatio: 0.34,
          subOrderCount: 433,
          lastYearRest: 64325.4389,
          thisYearSubtotal: 54325.4389,
          thisYearSubRatio: 0.43,
          thisYearOrderCount: 43,
          thisYearRepaymentSubtotal: 44325.4389,
          restAmount: 34325.4389,
          restRatio: 0.20,
          restOrderCount: 44,
          lastYearRestRank: 1,
          thisYearSubtotalRank: 5,
          subtotalRank: 5,
          restAmoutRank: 6,
          children: [
            {
              id: 101,
              issuerName: '渠道1',
              region: '沈阳',
              subtotal: 24825.4389,
              subRatio: 0.34,
              subOrderCount: 433,
              lastYearRest: 44325.4389,
              thisYearSubtotal: 34325.4389,
              thisYearSubRatio: 0.43,
              thisYearOrderCount: 43,
              thisYearRepaymentSubtotal: 24325.4389,
              restAmount: 34325.4389,
              restRatio: 0.20,
              restOrderCount: 44
            },
            {
              id: 102,
              issuerName: '渠道1',
              region: '长春',
              subtotal: 34825.4389,
              subRatio: 0.34,
              subOrderCount: 433,
              lastYearRest: 24325.4389,
              thisYearSubtotal: 44325.4389,
              thisYearSubRatio: 0.43,
              thisYearOrderCount: 43,
              thisYearRepaymentSubtotal: 34325.4389,
              restAmount: 14325.4389,
              restRatio: 0.20,
              restOrderCount: 44
            }
          ]
        },
        {
          id: 2,
          issuerName: '渠道2',
          region: '东北',
          subtotal: 41225.4389,
          subRatio: 0.34,
          subOrderCount: 433,
          lastYearRest: 33025.4389,
          thisYearSubtotal: 25025.4389,
          thisYearSubRatio: 0.43,
          thisYearOrderCount: 43,
          thisYearRepaymentSubtotal: 24325.4389,
          restAmount: 28325.4389,
          restRatio: 0.20,
          restOrderCount: 44,
          lastYearRestRank: 2,
          thisYearSubtotalRank: 4,
          subtotalRank: 3,
          restAmoutRank: 5
        }
      ]
    },
    initOption () {
      let resData = []
      // 集团
      if (this.formData.issuerId === '0') {
        resData = this.sourceData.filter(i => i.issuerName === '渠道2')
        const sz = this.sourceData.find(i => i.issuerName === '渠道1')
        if (sz) resData.push(sz)
        this.xAxisData = resData.map(i => i.issuerName)
      } else
      // 商置
      if (this.formData.issuerId === '1') {
        const sz = this.sourceData.find(i => i.issuerName === '渠道1')
        if (sz) resData = sz.children
        this.xAxisData = resData.map(i => i.region)
      } else
      // 住宅
      if (this.formData.issuerId === '2') {
        resData = this.sourceData.filter(i => i.issuerName === '渠道2')
        this.xAxisData = resData.map(i => i.region)
      }
      this.xAxisData.push('总计')
      this.option.options = new Array(5).fill().map((v, i) => {
        return {
          title: { text: `${this.yearlineMin + i}年数据汇总表` },
          series: new Array(3).fill().map(i => ({ data: resData.map(i => (Math.random() * 60000 + 10000).toFixed(2)) }))
        }
      })
      this.option.options.forEach(option => {
        option.series.forEach(serie => {
          serie.data.push(serie.data.reduce((p, c) => (p += Number(c)), 0))
        })
      })
    },
    issuerChange () {
      this.initOption()
      this.echarts.setOption(this.option)
      this.refreshYearline()
    },
    importAndUpdateData () {},
    exportData () {}
  },
  watch: {
    'formData.issuerId': {
      handler: function (val) {
        this.issuerChange()
      }
    }
  }
}
</script>
