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

  samples: ISample[] = [];

  scale: ITimeScale[] | ILinearScale[] = [
    {
      type: "time",
      dataKey: "t",
      min: 0,
      max: (60 * 1000) / 10,
      formatter: (t: number): string =>
        Duration.fromMillis(t * 10).toFormat("hh:mm:ss.SSS"),
    },
    {
      type: "linear",
      dataKey: "v",
      alias: "电压",
      min: 0,
      formatter: (v: number): string => `${v.toFixed(4)} V`,
    },
    {
      type: "linear",
      dataKey: "a",
      alias: "电流",
      min: 0,
      formatter: (a: number): string => `${a.toFixed(4)} A`,
    },
  ];

  @Watch("data")
  onNewData(data?: IYZXMessage | null): void {
    if (data) {
      if (this.samples.length == 0) {
        const scale = this.scale;
        scale[0] = {
          ...scale[0],
          min: data.t,
          max: data.t + (60 * 1000) / 10,
        };
        this.scale = scale;
      }

      this.samples.push({
        ...data,
        w: data.a * data.v,
      });
    }
  }
}
</script>
