<template>
  <div class="image-grid-item" :style="styleObject">
    <!-- <img class="flickr-image" :src="photo.url" :title="photo.title" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FlickrPhoto } from '../../services/flickr/photo';

@Component
export default class FlickrImage extends Vue {
  @Prop() public photo!: FlickrPhoto;

  public styleObject = {
    backgroundImage: `url(${this.photo.url})`,
  };
}
</script>
