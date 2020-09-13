<template>
  <div class="main">

    <div class="select">
      <select class="select__body" v-model="select"> 
        <option v-for="(item, index) in options" :key="index">
          {{item.value}}
        </option>
      </select>
    </div>

    <div class="list">
      <ul>
        <li v-for="(d, index) in diff" :key="index">{{d}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: 'BTCUSDT',
        label: 'BTCUSDT'
      }, {
        value: 'BNBBTC',
        label: 'BNBBTC'
      }, {
        value: 'ETHBTC',
        label: 'ETHBTC'
      }],
      select: '',
    }
  },
  computed: {
    diff () {
      return this.$store.getters['store/diff']
    }
  },
  watch: {
    value() {
      this.select = this.value
    },
    select() {
      this.$store.dispatch('store/symbolChanged', this.select)
    }
  },
  mounted() {
    this.select = this.$store.getters['store/symbol']
  }
}
</script>

<style>
.select {
  width: 400px;
  margin: 0 auto;
}
.select__body { 
  display: block; 
  font-size: 16px; 
  font-family: sans-serif; 
  font-weight: 700; 
  color: #444; 
  line-height: 1.3; 
  padding: .6em 1.4em .5em .8em; width: 100%; 
  max-width: 100%; 
  box-sizing: border-box; 
  margin: 25px auto; 
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04); 
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff; 
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%; 
} 
.select__body::-ms-expand { display: none; } 
.select__body:hover { border-color: #888; } 
.select__body:focus { border-color: #aaa; 
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring; 
  color: #222;
  outline: none; 
} 
.select__body option { 
  font-weight: normal;
}
.list {
  margin: 0 auto;
}
.list ul {
  list-style: none;
  margin-top: 20px;
  padding: 0;
  margin: 0;
}
.list li {
  padding: 5px;
  text-align: center;
}
</style>