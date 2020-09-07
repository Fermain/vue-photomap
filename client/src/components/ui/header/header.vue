<template>
  <header>

  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FermainHeader extends Vue {
  @Prop() private example!: string;
}
</script>
