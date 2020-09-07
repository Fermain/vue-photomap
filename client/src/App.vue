<template>
  <div class="fermain" id="app">
    <fermain-header />
    <fermain-pangol />
    <div class="fermain-logo">
      <h1>Fermain</h1>
    </div>
    <main></main>
    <div class="sidebar-icons">
      <div class="sidebar-icon"></div>
      <div class="sidebar-icon"></div>
      <div class="sidebar-icon"></div>
    </div>
    <div class="sidebar-items">
      <div class="sidebar-item">Menu Item</div>
      <div class="sidebar-item">Menu Item</div>
      <div class="sidebar-item">Menu Item</div>
    </div>
    <fermain-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import FermainHeader from "./components/ui/header/header.vue";
import FermainFooter from "./components/ui/footer/footer.vue";
import FermainPangol from "./components/branding/pangol.vue";

@Component({
  components: {
    FermainHeader,
    FermainFooter,
    FermainPangol,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
$light: #ffffff;
$dark: #121618;

* {
  box-sizing: inherit;

  &:before,
  &:after {
    box-sizing: inherit;
  }
}

html {
  // font-size: 32px;
  box-sizing: border-box;
}

body {
  margin: 0;
}

.fermain {
  display: grid;
  grid-template-columns: 1fr 3rem 7rem;
  grid-template-rows: 3rem 1fr 5rem;
  grid-template-areas:
    "header pangol fermain"
    "main sidebar-icons sidebar-items"
    "footer footer footer";
  gap: 1px 1px;
  min-height: 100vh;
  background: $dark;
  color: $light;
  padding-right: 0.5rem;
  padding-top: 0.5rem;

  font-family: "Montserrat", sans-serif;

  & > .pangol {
    grid-area: pangol;
    background: $light;
    color: $dark;
  }

  &-logo {
    grid-area: fermain;
    display: flex;
    align-items: center;
    background: $light;
    color: $dark;
    position: relative;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    & h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    &:before {
      content: "";
      position: absolute;
      left: -1px;
      top: 0;
      bottom: 0;
      border-right: 1px solid $light;
    }
  }
}

.pangol {
  padding: 0.5rem;

  & > svg {
    & path[style] {
      fill: currentColor !important;
    }
  }
}

header {
  background: $light;
  color: $dark;
  grid-area: header;
}

main {
  grid-area: main;
  background: transparentize($color: $light, $amount: 0.5);
}

footer {
  color: $light;
  grid-area: footer;
  display: flex;
  align-items: center;
  overflow: hidden;

  & .pangol {
    flex: 0 0 5rem;
  }

  & h1 {
    font-size: 3rem;
    line-height: 1;
  }
}

.sidebar {
  &-icons {
    grid-area: sidebar-icons;
    display: grid;
    grid-auto-rows: 3rem;
    grid-gap: 1px 0px;
  }

  &-icon {
    background: $light;
  }

  &-items {
    grid-area: sidebar-items;
    display: grid;
    grid-auto-rows: 3rem;
    grid-gap: 1px 0px;
  }

  &-item {
    height: 3rem;
    background: $light;
    color: $dark;
    background: linear-gradient(
      90deg,
      transparentize($light, 0.1) 0%,
      $light 100%
    );
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
}
</style>