<template>
  <q-layout view="hHh lpR fFf">
    <q-dialog v-model="settings">
      <q-card style="width: 256px">
        <q-card-section class="row" style="align-items: center;padding-bottom: 0">
          <div class="col text-h6">设置</div>
          <div class="col" />
          <q-btn
            class="col"
            style="min-width: 24px; max-width: 42px"
            flat
            round
            @click="settings = false"
            color="black"
            icon="close"
          />
        </q-card-section>
        <q-card-section style="padding-top: 0">
          <q-input
            v-model.number="this.$store.state.autoplaySpeed"
            @update:model-value="
              (value) => this.$store.commit('autoplaySpeed', value)
            "
            type="number"
            debounce="500"
            label="自动滚动速度"
            stack-label
          />
          <q-input
            v-model.number="this.$store.state.messageSize"
            @update:model-value="
              (value) => this.$store.commit('messageSize', value)
            "
            type="number"
            debounce="500"
            label="信息字体大小"
            stack-label
          />
          <q-input
            v-model.number="this.$store.state.nameSize"
            @update:model-value="
              (value) => this.$store.commit('nameSize', value)
            "
            type="number"
            debounce="500"
            label="名称字体大小"
            stack-label
          />
          <q-input
            v-model.number="this.$store.state.timestampSize"
            @update:model-value="
              (value) => this.$store.commit('timestampSize', value)
            "
            type="number"
            debounce="500"
            label="时间戳字体大小"
            stack-label
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar rounded>
            <img
              src="/author.jpg"
              alt=""
            />
          </q-avatar>
          飞鸽传书
        </q-toolbar-title>
        <q-btn flat round dense icon="help" />
        <q-btn flat round dense icon="settings" @click="openSettings" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-light-blue-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';

function openSettings() {
  settings.value = true;
}

const settings = ref(false);
</script>
