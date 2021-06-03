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
import { Duration } from "luxon";

import { IYZXMessage } from "../YZX";

interface ISample extends IYZXMessage {
  w: number;
}

@Component
export default class GraphCard extends Vue {
  @Prop() data?: IYZXMessage | null;

  startTime = 0;
  samples: ISample[] = [];

  scale: ITimeScale[] | ILinearScale[] = [
    {
      type: "time",
      dataKey: "t",
      min: 0,
      max: (60 * 1000) / 10,
      formatter: (t: number) =>
        Duration.fromMillis(t * 10).toFormat("hh:mm:ss.SSS"),
    },
    {
      type: "linear",
      dataKey: "v",
      min: 0,
      formatter: (v: number) => v.toFixed(4),
    },
    {
      type: "linear",
      dataKey: "a",
      min: 0,
      formatter: (a: number) => a.toFixed(4),
    },
  ];

  @Watch("data")
  onNewData(data?: IYZXMessage | null) {
    if (data) {
      if (this.samples[0]) {
        data.t = data.t - this.startTime;
      } else {
        this.startTime = data.t;
        data.t = 0;
      }

      this.samples.push({
        ...data,
        w: data.a * data.v,
      });
    }
  }
}
</script>
