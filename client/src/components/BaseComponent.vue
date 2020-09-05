<template>
  <div class="base-component"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseComponent extends Vue {
  @Prop() private example!: string;
}
</script>
