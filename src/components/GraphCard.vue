<template>
  <a-card v-bind:bordered="false">
    <v-chart
      v-bind:force-fit="true"
      v-bind:height="600"
      v-bind:data="samples"
      v-bind:scale="scale"
      padding="auto"
    >
      <v-tooltip />
      <v-axis dataKey="t" />
      <v-line position="t*v" color="darkcyan" />
      <v-line position="t*a" color="orange" />
    </v-chart>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { ILinearScale, ITimeScale } from "viser/es/typed/IScale";

import { IYZXMessage } from "../YZX";

@Component
export default class GraphCard extends Vue {
  @Prop() data?: IYZXMessage | null;

  samples: IYZXMessage[] = [];

  scale: ITimeScale[] | ILinearScale[] = [
    {
      type: "time",
      dataKey: "t",
    },
    {
      type: "linear",
      dataKey: "v",
      min: 0,
    },
    {
      type: "linear",
      dataKey: "a",
      min: 0,
    },
  ];

  @Watch("data")
  onNewData(data?: IYZXMessage | null) {
    if (data) {
      this.samples.push(data);
    }
  }
}
</script>
