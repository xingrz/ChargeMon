<template>
  <a-layout class="layout">
    <a-layout-content style="padding: 16px">
      <a-row v-bind:gutter="[16, 16]">
        <a-col v-bind:span="24">
          <RealtimeCard
            v-bind:state="state"
            v-bind:data="data"
            v-on:open="open"
            v-on:close="close"
          />
        </a-col>
      </a-row>
      <a-row v-bind:gutter="[16, 16]">
        <a-col v-bind:span="24">
          <GraphCard v-bind:data="data" />
        </a-col>
      </a-row>
    </a-layout-content>

    <a-layout-footer class="footer">
      <div>© 2021 XiNGRZ</div>
      <div>
        <a href="https://github.com/xingrz/ChargeMon">Fork me on GitHub</a>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RealtimeCard from "./components/RealtimeCard.vue";
import GraphCard from "./components/GraphCard.vue";

import YZX, { IYZXMessage } from "./YZX";

@Component({
  components: {
    RealtimeCard,
    GraphCard,
  },
})
export default class App extends Vue {
  meter?: YZX;
  state: "closed" | "opening" | "opened" = "closed";
  data: IYZXMessage | null = null;

  async open(): Promise<void> {
    try {
      this.state = "opening";

      this.meter = await YZX.open("wsa://default");
      this.meter.on("data", (data: IYZXMessage) => {
        this.data = data;
      });

      this.state = "opened";
    } catch (e) {
      this.state = "closed";
      console.warn("Failed opening device", e);
    }
  }

  async close(): Promise<void> {
    if (this.meter) {
      await this.meter.close();
      this.data = null;
      this.state = "closed";
    }
  }
}
</script>

<style>
body,
.layout {
  background: #f0f2f5;
}
</style>
