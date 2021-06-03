<template>
  <a-card v-bind:bordered="false">
    <a-row v-bind:gutter="[16, 16]" type="flex" align="middle">
      <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
        <a-button
          v-if="state == 'opened'"
          v-on:click="() => this.$emit('close')"
          >关闭设备</a-button
        >
        <a-button
          v-else
          v-bind:loading="state == 'opening'"
          v-on:click="() => this.$emit('open')"
          type="primary"
          >连接设备</a-button
        >
      </a-col>
      <a-col v-bind:xs="24" v-bind:md="21">
        <a-row v-bind:gutter="[16, 16]" type="flex" align="middle">
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="4">
            <a-statistic
              title="计时"
              v-bind:value="(data || {}).t"
              v-bind:formatter="formatTime"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <MilliData
              title="电压"
              suffix="V"
              suffixMilli="mV"
              v-bind:value="(data || {}).v"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <MilliData
              title="电流"
              suffix="A"
              suffixMilli="mA"
              v-bind:value="(data || {}).a"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <MilliData
              title="功率"
              suffix="W"
              suffixMilli="mW"
              v-bind:value="(data || {}).w"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <MilliData
              title="容量"
              suffix="Ah"
              suffixMilli="mAh"
              v-bind:value="(data || {}).ah"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <MilliData
              title="能量"
              suffix="Wh"
              suffixMilli="mWh"
              v-bind:value="(data || {}).wh"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="2">
            <MilliData
              title="D+"
              suffix="V"
              suffixMilli="mV"
              v-bind:value="(data || {}).dp"
              v-bind:precision="3"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="2">
            <MilliData
              title="D-"
              suffix="V"
              suffixMilli="mV"
              v-bind:value="(data || {}).dn"
              v-bind:precision="3"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Duration } from "luxon";
import { IYZXMessage } from "../YZX";

import MilliData from "./MilliData.vue";

@Component({
  components: {
    MilliData,
  },
})
export default class RealtimeCard extends Vue {
  @Prop() data?: IYZXMessage | null;
  @Prop() state?: "closed" | "opening" | "opened";

  get w(): number {
    return this.data ? this.data.a * this.data.v : 0;
  }

  formatTime({ value }: { value: number }): string {
    return Duration.fromMillis(value * 10).toFormat("hh:mm:ss.SSS");
  }
}
</script>
