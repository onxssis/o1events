<template>
  <div class="relative flex flex-col">
    <GmapMap
      ref="mapRef"
      :center="{ lat: latitude, lng: longitude }"
      :zoom="zoom"
      :style="`width: ${width}; height: ${height};`"
      :options="{
        zoomControl: zoomControl,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }"
      @dragend="dragged = true"
    >
      <GmapMarker
        v-for="(m, index) in mapMarkers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :animation="4"
        :icon="{ url: require('~/assets/images/icons/marker.svg') }"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class EventMap extends Vue {
  @Prop({ type: Number, required: true }) lng!: number
  @Prop({ type: Number, required: true }) lat!: number
  @Prop({ type: Number, default: 8 }) zoom!: number
  @Prop({ type: Array, default: () => [] }) events!: any
  @Prop({ type: String, default: '100%' }) width!: string
  @Prop({ type: String, default: '100%' }) height!: string
  @Prop({ type: Boolean, default: true }) zoomControl!: boolean

  map = null
  mapMarkers = []
  dragged = false
  mode = 'null'

  get latitude() {
    return Number(this.lat)
  }

  get longitude() {
    return Number(this.lng)
  }

  @Watch('events', {
    immediate: true,
  })
  markersChanged(newVal: any) {
    this.mapMarkers = newVal.map((event: { lat: number; lng: number }) => {
      return {
        position: {
          lat: Number(event.lat),
          lng: Number(event.lng),
        },
      }
    })
  }

  mounted() {
    ;(this.$refs.mapRef as any).$mapPromise.then((map: any) => {
      this.map = map

      // if (this.map !== null) {
      //   this.map!.panTo({ lat: this.latitude, lng: this.longitude })
      // }
    })
  }
}
</script>

<style scoped>
/* .search-button {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  margin: 1em 0;
  font-family: inherit;

  button {
    padding: 0 1em;
    font-size: 1em;
    height: 45px;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid #f05337;
    background: #fff;
    transition: all 0.3s;
    position: relative;

    &:hover {
      background: darken($color: #fff, $amount: 2);
      border-color: #e33311;
    }

    &:focus,
    &:active {
      outline: none;
    }

    &:active {
      top: 4px;
    }
  }
}

.switch {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
}

@media (min-width: 1024px) {
  .switch {
    padding: 0;
  }
} */

.event-map {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

::v-deep .vue-map-hidden {
  display: block !important;
}
</style>
