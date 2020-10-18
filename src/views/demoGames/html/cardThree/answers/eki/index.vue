<template>
  <div class="card-three-eki">
    <div>上一次牌组排序：</div>
    <div class="card-box">
      <div class="dynamic-card-box">
        <template v-for="(list, li) in fixedLastCards">
          <div class="card-list" :key="li">
            <div :key="'caption' + li" class="caption">第{{li + 1}}组</div>
            <template v-for="(card, ci) in list">
              <div :key="ci" :class="getCardClass(card, 0, ci * 3 + li, true)">
                <div class="title">
                  <span class="type">{{card.type}}</span>
                  <span class="value">{{card.value}}</span>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="static-card-box">
        <template v-for="(list, li) in cards">
          <div class="card-list" :key="li">
            <div :key="'caption' + li" class="caption">{{cardListCaption(li)}}</div>
            <template v-for="(card, ci) in list.list" >
              <div :key="'sep' + ci" class="separator" v-if="ci % 7 === 0"></div>
              <div :key="ci" :class="getCardClass(card, li, ci, false)" @click="choose(ci)">
                <div class="title">
                  <span class="type">{{card.type}}</span>
                  <span class="value">{{card.value}}</span>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="btn-box">
      <el-button type="primary" size="mini" :disabled="cards[0].selectedIndex < 0 || hasDecide" @click="decide">选定</el-button>
      <el-button type="success" size="mini" :disabled="!hasDecide" @click="deal">再次发牌</el-button>
      <el-button type="danger" size="mini" :disabled="!hasDecide" @click="reset">重置</el-button>
      <span>（鼠标点击原牌组中的牌进行选择）</span>
    </div>
  </div>
</template>

<script>
const TYPES = '♠♣♥♦'
const VALUES = 'A23456789XJQK'
export default {
  name: 'CardThreeEki',
  computed: {
    currentCards () {
      return this.cards.length ? this.cards[this.cards.length - 1] : { list: [], selectedIndex: -1 }
    },
    fixedCards () {
      return this.currentCards.list.reduce((p, c, i) => p[i % 3].push(c) && p, [[], [], []])
    },
    lastCards () {
      return this.cards.length > 1 ? this.cards[this.cards.length - 2] : { list: [], selectedIndex: -1 }
    },
    fixedLastCards () {
      return this.lastCards.list.reduce((p, c, i) => p[i % 3].push(c) && p, [[], [], []])
    }
  },
  data () {
    return {
      cardCount: 21,
      cards: [],
      hasDecide: false
    }
  },
  created () {
    this.getInitCardList()
  },
  methods: {
    getInitCardList () {
      const res = []
      for (let i = this.cardCount; i--;) {
        let card = this.getRandomCard()
        while (res.some(i => this.isSameCard(i, card))) {
          card = this.getRandomCard()
        }
        res.push(card)
      }
      this.cards = [{
        list: res,
        selectedIndex: -1
      }]
    },
    getRandomCard () {
      return {
        type: TYPES[Math.floor(Math.random() * 4)],
        value: VALUES[Math.floor(Math.random() * 13)]
      }
    },
    isSameCard (a, b) {
      return a.type === b.type && a.value === b.value
    },
    getCardClass (card, li, ci, isDynamic) {
      let res = 'card'
      if (card.type === '♥' || card.type === '♦') res += ' is-red'
      if (ci === (isDynamic ? this.lastCards.selectedIndex : this.cards[li].selectedIndex)) res += ' is-actived'
      return res
    },
    cardListCaption (li) {
      return li < 1 ? '原牌组' : `第${li}次`
    },
    choose (ci) {
      if (!this.hasDecide) this.cards[0].selectedIndex = ci
    },
    decide () {
      this.hasDecide = true
    },
    deal () {
      const selectedCard = this.cards[0].list[this.cards[0].selectedIndex]
      const li = this.currentCards.list.findIndex(card => this.isSameCard(card, selectedCard)) % 3
      let list = []
      switch (li) {
        case 0:
          list = [
            ...this.fixedCards[1],
            ...this.fixedCards[0],
            ...this.fixedCards[2]
          ]
          break
        case 1:
          list = [
            ...this.fixedCards[0],
            ...this.fixedCards[1],
            ...this.fixedCards[2]
          ]
          break
        case 2:
          list = [
            ...this.fixedCards[0],
            ...this.fixedCards[2],
            ...this.fixedCards[1]
          ]
          break
      }
      this.cards.push({
        list,
        selectedIndex: list.findIndex(i => this.isSameCard(i, selectedCard))
      })
    },
    reset () {
      this.getInitCardList()
      this.hasDecide = false
    }
  }
}
</script>

<style lang="less" scoped>
@red: #f50000;
@black: #000;
@white: #fff;

.card-three-eki {
  .card-box {
    overflow: hidden;
    .dynamic-card-box {
      float: left;
      display: flex;
      justify-content: space-around;

      .card-list {
        +.card-list {
          margin-left: 10px;
        }
        .caption {
          text-align: center;
        }
        .card {
          width: 60px;
          height: 80px;

          +.card {
            margin-top: 10px;
          }

          .title {
            padding-left: 3px;
            .type {
              font-size: 20px;
            }
          }
        }
      }
    }

    .static-card-box {
      margin-left: 30px;
      float: right;
      display: flex;
      justify-content: space-around;

      .card-list {
        +.card-list {
          margin-left: 10px;
        }
        .separator {
          height: 3px;
          background-color: #000;
          margin-top: 2px;
          margin-bottom: 2px;
        }
        .card {
          width: 40px;
          height: 20px;

          +.card {
            margin-top: 3px;
          }

          .title {
            padding-left: 3px;
            .type {
              font-size: 16px;
            }
            .value {
              font-size: 12px;
            }
          }
        }
      }

      .card-list:nth-child(1) {
        .card {
          &:hover {
            background-color: @black;
            color: @white;
          }

          &.is-red:hover {
            background-color: @red;
            color: @white;
          }
        }
      }
    }
  }

  .btn-box {
    margin-top: 10px;
  }
}

.card {
  border: 2px solid @black;
  border-radius: 5px;
  cursor: pointer;

  &.is-red {
    color: @red;
  }

  &.is-actived {
    color: @white;
    background-color: @black;

    &.is-red {
      background-color: @red;
    }
  }
}
</style>
