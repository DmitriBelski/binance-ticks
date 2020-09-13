<template>
  <div class="container">

    <div class="header">
      <div class="header__button" @click="clickHandler('/')">Стакан</div>
      <div class="header__button" @click="clickHandler('/symbol')">Символ</div>
    </div>
    
    <div v-if="error" class="error">{{error}}</div>

    <div class="main">
      <nuxt />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    error () {
      return this.$store.getters['error']
    }
  },
  methods: {
    clickHandler(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 18px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.error {
  background-color: red;
  color: #fff;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column
}
.header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #3b99fc;
}
.header__button {
  margin: 10px 5px;
  display: inline-block;
  vertical-align: center;
  border-radius: 4px;
  border: 1px solid #3b99fc;
  color: #3b99fc;
  text-decoration: none;
  padding: 10px 30px;
}
.header__button:hover {
  color: #3b99fc;
  background-color: rgba(59, 153, 252, 0.15);
}
.header__button:active {
  color: #fff;
  background-color: #3b99fc;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
