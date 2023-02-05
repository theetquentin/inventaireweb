<template>
  <div id="app">
    <Inventaire/>
  </div>
</template>

<script>
import Inventaire from './components/Inventaire'

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
  color: #2c3e50;
  margin-top: 60px;
}

</style>
