<template>
  <div>
    <button v-on:click="open">OPEN</button>
    <button v-on:click="close">CLOSE</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import YZX, { IYZXMessage } from "./YZX";

@Component
export default class App extends Vue {
  meter?: YZX;

  async open(): Promise<void> {
    try {
      this.meter = await YZX.open("wsa://default");
      this.meter.on("data", (data: IYZXMessage) => {
        console.log(data);
      });
    } catch (e) {
      console.warn("Failed opening device", e);
    }
  }

  async close(): Promise<void> {
    if (this.meter) {
      await this.meter.close();
    }
  }
}
</script>
