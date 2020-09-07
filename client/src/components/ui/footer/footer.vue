<template>
  <footer>
    <fermain-pangol />
    <h1>Fermain (Pty) Ltd {{ romanYear }}</h1>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FermainPangol from "@/components/branding/pangol.vue";

@Component({
  components: {
    FermainPangol,
  },
})
export default class FermainFooter extends Vue {
  public date: Date = new Date();
  public year = this.date.getFullYear();
  public romanYear = this.romanize(this.year);

  private romanize(num: number): string {
    const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    } as {
      [key: string]: number
    };

    let str = "";

    for (let i of Object.keys(roman)) {
      const q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }

    return str;
  }
}
</script>
