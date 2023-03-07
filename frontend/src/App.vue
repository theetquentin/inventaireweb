<template>
  <div id="app">
    <Inventaire />
  </div>
</template>

<script>
import Inventaire from './components/Inventaire'

var bg = document.getElementsByTagName('body')
bg[0].style.backgroundColor = '#31373a'
// console.log(test[0])

export default {
  name: 'App',
  components: {
    Inventaire
  },
  data () {
    return {}
  },
  methods: {
    async Database () {
      let url = 'http://localhost:3000/bdd'
      this.$http.get(url).then(response => {
        console.log(response.body)
        this.ordinateur = response.body
      }, reponse => {
        // error callback
      }
      )
    }
  },
  created () {
    this.Database()
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>
