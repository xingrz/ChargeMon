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
            <a-statistic
              title="电压"
              v-bind:value="data ? data.v : 0"
              suffix="V"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <a-statistic
              title="电流"
              v-bind:value="data ? data.a : 0"
              suffix="A"
              v-bind:precision="4"
            />
          </a-col>
          <a-col v-bind:xs="12" v-bind:sm="8" v-bind:lg="3">
            <a-statistic
              title="功率"
              v-bind:value="data ? data.a * data.v : 0"
              suffix="W"
              v-bind:precision="4"
            />
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
}
</script>
