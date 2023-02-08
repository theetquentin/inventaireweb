<template>
  <div id="app">
    <Inventaire/>
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
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>
