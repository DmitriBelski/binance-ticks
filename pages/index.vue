<template>
  <div class="main">
    <div class="title">
      <h1>{{symbol}}</h1>
    </div>
    
    <div class="table">
      <div class="table__column">

        <div class="table__header">
          <div :data-type="`${index}`" v-for="(label, index) in labels" :key="index" class="table__cell">
            {{label}}
          </div>
        </div>

        <div class="table__body">
          <div v-for="(b, index) in bids" :key="index" class="table__row">
            <div class="table__cell">
              {{b.amount}}
            </div>
            <div class="table__cell">
              {{b.price}}
            </div>
            <div data-type="total" class="table__cell">
              {{b.total}}
            </div>
          </div>
        </div>
      </div>

      <div class="table__column">

        <div class="table__header">
          <div :data-type="`${index}`" v-for="(label, index) in labels" :key="index" class="table__cell">
            {{label}}
          </div>
        </div>

        <div class="table__body">
          <div v-for="(a, index) in asks" :key="index" class="table__row">
            <div class="table__cell">
              {{a.amount}}
            </div>
            <div class="table__cell">
              {{a.price}}
            </div>
            <div data-type="total" class="table__cell">
              {{a.total}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labels: ['Amount', 'Price', 'Total'],
      lastUpdateId: null,
      bids: [],
      asks: []
    }
  },
  computed: {
    symbol () {
      return this.$store.getters['store/symbol']
    }
  },
  methods: {
    setData(stakan) {
      if (stakan) {
        this.lastUpdateId = stakan.lastUpdateId
        stakan.bids.forEach(b => {
          this.bids.push({amount: b[1], price: b[0], total: this.calcTotal(b[0], b[1])})
        })
        stakan.asks.forEach(a => {
          this.asks.push({amount: a[1], price: a[0], total: this.calcTotal(a[0], a[1])})
        })
      }
    },
    calcTotal(price, amount) {
      return (price*amount).toFixed(8)
    },
    handleTicks(ticks) {
      let data = JSON.parse(ticks.data)
      if (data.u > this.lastUpdateId + 1) {
        data.b.forEach(b => {
          if (Number(b[1]) !== 0) {
            this.bids.push({amount: b[1], price: b[0], total: this.calcTotal(b[0], b[1])})
          }
        })
        data.a.forEach(a => {
          if (Number(a[1]) !== 0) {
            this.asks.push({amount: a[1], price: a[0], total: this.calcTotal(a[0], a[1])})
          }
        })
      }
    }
  },
  async mounted() {
    let symbol = this.$store.getters['store/symbol']

    let vm = this
    const data = {
      sym: symbol,
      fn: function(ticks) {
        vm.handleTicks(ticks)
      }
    }

    this.$store.dispatch('store/unsubscribe')
    await this.$store.dispatch('store/subscribe', data)

    await this.$store.dispatch('store/download', symbol)
    let stakan = this.$store.getters['store/stakan']
    this.setData(stakan)
  }
}

</script>

<style>
@media (max-width: 1000px) {
  [data-type="total"] {
    display: none;
  }
  [data-type="2"] {
    display: none;
  }
}
.title {
  margin: 10px auto;
}
.table {
  display: flex;
}
.table__column {
  display: flex;
  flex-direction: column;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  margin: 0 5px;
  padding: 10px;
}
.table__header {
  display: flex;
  border-bottom: 1px solid #ebebeb;
  font-weight: bold;
  color: #999;
  padding-right: 5%;
}
.table__body{
  overflow-y: scroll;
  max-height: calc(100vh - 230px);
}

.table__body::-webkit-scrollbar {
  width: 15px;
  background-color: transparent;
}
.table__body::-webkit-scrollbar-thumb {
  border-radius: 15px;
  height: 50px;
  background-color: transparent;
}
.table__body::-webkit-scrollbar-track {
  border-radius: 15px;
  background-color: transparent;
}
.table__body:hover::-webkit-scrollbar {
  width: 15px;
  background-color: #f9f9fd;
}
.table__body:hover::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #3b99fc;
}
.table__body:hover::-webkit-scrollbar-track {
  border-radius: 15px;
  background-color: #f9f9fd;
}

.table__row {
  display: flex;
  border-bottom: 1px solid #ebebeb;
  border-radius: 4px;
}
.table__row:hover {
  background-color: #ebeef5;
}
.table__cell {
  color: #606060;
  flex-basis: 50%;
  padding: 5px;
  margin: 5px;
  text-align: center;
}
</style>
