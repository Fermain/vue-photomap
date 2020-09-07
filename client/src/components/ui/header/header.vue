<template>
  <header>
    <fermain-map-search/>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FermainMapSearch from '../../map/FermainMapSearch.vue';

@Component({
  components: {
    FermainMapSearch,
  },
})
export default class FermainHeader extends Vue {
}
</script>
