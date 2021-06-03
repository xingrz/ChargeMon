<template>
  <div
    type="link"
    v-bind:style="{ cursor: 'pointer' }"
    v-on:click="() => (this.milli = !this.milli)"
  >
    <a-statistic
      v-bind:title="title"
      v-bind:value="milli ? value * 1000 : value"
      v-bind:suffix="milli ? suffixMilli : suffix"
      v-bind:precision="milli ? precision - 3 : precision"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class MilliData extends Vue {
  @Prop() title?: string;
  @Prop() suffix?: string;
  @Prop() suffixMilli?: string;
  @Prop({ default: 0 }) value!: number;
  @Prop({ default: 0 }) precision!: number;

  milli = false;
}
</script>
