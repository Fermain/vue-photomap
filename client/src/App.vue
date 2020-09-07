<template>
  <div class="fermain" id="app">
    <fermain-map />
    <fermain-header />
    <fermain-pangol />
    <div class="fermain-logo">
      <h1>Fermain</h1>
    </div>
    <main class="scroller">
      <search-history v-show="showHistory" />
      <div class="image-grid">
        <flickr-image v-for="(value, index) in results" :key="index" :photo="value" />
      </div>
    </main>
    <div class="sidebar-icons">
      <div class="sidebar-icon" @click="myLocation()">
        <i class="material-icons" v-if="locationEnabled">location_on</i>
        <i class="material-icons" v-else>location_off</i>
      </div>
      <div class="sidebar-icon" @click="toggleHistory()">
        <i class="material-icons">history</i>
      </div>
      <div class="sidebar-icon" @click="clearResults()">
        <i class="material-icons">autorenew</i>
      </div>
    </div>
    <div class="sidebar-items">
      <div class="sidebar-item" @click="myLocation()">My Location</div>
      <div class="sidebar-item" @click="toggleHistory()">My History</div>
      <div class="sidebar-item" @click="clearResults()">View Map</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import FermainHeader from './components/ui/header/header.vue';
import FermainPangol from './components/branding/pangol.vue';
import FermainMap from './components/map/FermainMap.vue';
import FlickrImage from './components/photo/FlickrImage.vue';
import SearchHistory from './components/photo/SearchHistory.vue';

import { FlickrService, GmapService, GeoService } from './services';
import { FlickrPhoto } from './services/flickr/photo';
import { mapState } from 'vuex';

@Component({
  components: {
    FermainHeader,
    FermainPangol,
    FermainMap,
    FlickrImage,
    SearchHistory,
  },
})
export default class App extends Vue {
  public get defaultPosition(): google.maps.LatLngLiteral {
    return this.$store.state.defaultPosition;
  }

  public get showHistory(): boolean {
    return this.$store.state.showHistory;
  }

  public get locationEnabled() {
    return this.geoService.enabled;
  }
  public geoService = new GeoService();
  public gmapService!: GmapService;

  public results: FlickrPhoto[] = [];
  public flickrService = new FlickrService();

  public mounted() {
    this.setupMap();
  }

  public myLocation() {
    this.clearResults();
    this.geoService.request((position: Position) => {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      } as google.maps.LatLngLiteral;

      this.gmapService.setCenter(center);
      this.imageSearch(center.lat, center.lng);
      this.$store.dispatch('addHistoryItem', 'My Location');
      this.$store.dispatch('updateDefaultPosition', center);
    });
  }

  public imageSearch(lat: number, lon: number) {
    this.flickrService
      .search({
        lat,
        lon,
      })
      .then((results: FlickrPhoto[]) => {
        this.clearResults();
        if (results) {
          this.results = results;
        }
      });
  }

  public clearResults() {
    this.results = [];
  }

  public toggleHistory() {
    this.$store.dispatch('toggleHistory');
  }

  public updateHistory(record: string) {
    this.$store.dispatch('addHistoryItem', record);
  }

  private setupMap() {
    const mapElement = document.querySelector('.fermain-map') as HTMLElement;
    const searchElement = document.querySelector(
      'input.fermain-map-search',
    ) as HTMLInputElement;

    if (searchElement && mapElement) {
      this.gmapService = new GmapService(
        mapElement,
        this.defaultPosition,
        searchElement,
        (place: google.maps.places.PlaceResult) => {
          if (place !== undefined) {
            const lat = place?.geometry?.location?.lat();
            const lon = place?.geometry?.location?.lng();
            this.imageSearch(lat as number, lon as number);
            this.updateHistory(place.name);
          }
        },
      );
    }
  }
}
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
  background: $dark;
}

.fermain {
  display: grid;
  grid-template-columns: 1fr 3rem 7rem;
  grid-template-rows: 3rem 1fr;
  grid-template-areas:
    "header pangol fermain"
    "main sidebar-icons sidebar-items";
  gap: 1px 1px;
  min-height: 100vh;
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

  &-map {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;

    &-search {
      height: 100%;
      width: 100%;
      border: 0;
      text-align: center;
      border-radius: 0;
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
  display: flex;
  flex-direction: column;
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
    // font-size: 3rem;
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
    color: $dark;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    font-size: 90%;
    cursor: pointer;
  }
}

.scroller {
  max-height: calc(100vh - 3rem);
  height: 100%;
  overflow: auto;
  flex: 1;
}

.image-grid {
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: 15rem;
  grid-gap: 1px;

  &-item {
    background-color: white;
    background-position: center center;
    background-size: cover;
  }
}

.history {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-auto-rows: 3rem;
  grid-gap: 1px;
  margin-bottom: 1px;

  &-item {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $light;
    color: $dark;
  }
}
</style>