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
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <div
              type="link"
              v-bind:style="{ cursor: 'pointer' }"
              v-on:click="() => (this.mv = !this.mv)"
            >
              <a-statistic
                title="电压"
                v-bind:value="mv ? v * 1000 : v"
                v-bind:suffix="mv ? 'mV' : 'V'"
                v-bind:precision="mv ? 1 : 4"
              />
            </div>
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <div
              type="link"
              v-bind:style="{ cursor: 'pointer' }"
              v-on:click="() => (this.ma = !this.ma)"
            >
              <a-statistic
                title="电流"
                v-bind:value="ma ? a * 1000 : a"
                v-bind:suffix="ma ? 'mA' : 'A'"
                v-bind:precision="ma ? 1 : 4"
              />
            </div>
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <div
              type="link"
              v-bind:style="{ cursor: 'pointer' }"
              v-on:click="() => (this.mw = !this.mw)"
            >
              <a-statistic
                title="功率"
                v-bind:value="mw ? w * 1000 : w"
                v-bind:suffix="mw ? 'mW' : 'W'"
                v-bind:precision="mw ? 1 : 4"
              />
            </div>
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <a-statistic
              title="容量"
              v-bind:value="data ? data.ah : 0"
              suffix="Ah"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <a-statistic
              title="能量"
              v-bind:value="data ? data.wh : 0"
              suffix="Wh"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <a-statistic
              title="D+"
              v-bind:value="data ? data.dp : 0"
              suffix="V"
              v-bind:precision="3"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <a-statistic
              title="D-"
              v-bind:value="data ? data.dn : 0"
              suffix="V"
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
import { IYZXMessage } from "../YZX";

@Component
export default class RealtimeCard extends Vue {
  @Prop() data?: IYZXMessage | null;
  @Prop() state?: "closed" | "opening" | "opened";

  mv = false;
  ma = false;
  mw = false;

  get v(): number {
    return this.data ? this.data.v : 0;
  }

  get a(): number {
    return this.data ? this.data.a : 0;
  }

  get w(): number {
    return this.data ? this.data.a * this.data.v : 0;
  }
}
</script>
