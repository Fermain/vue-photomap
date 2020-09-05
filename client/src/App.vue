<template>
  <div id="app">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
$rem = 16px

html {
  box-sizing border-box
  font-size $rem
}

* {
  box-sizing inherit
  &:before, &:after {
    box-sizing inherit
  }
}

body {
  margin: 0;
}
</style>
