<template>
  <div class="history">
    <div class="history-item" v-for="(value, index) in history" :key="index">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState(['history']),
})
export default class SearchHistory extends Vue {
}
</script>
