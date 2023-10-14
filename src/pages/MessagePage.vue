<script setup lang="ts">
import { ref, onMounted } from 'vue';
import autoAnimate from '@formkit/auto-animate';
import { useStore } from 'vuex';

const list = ref();

const listDiv = ref();

const newMsg: string[] = ['aaa@bbb', 'bbb@ccc', 'ccc@ddd', 'ddd@eee'];

const msg: Ref<string[]> = ref([]);

const addMsg = (name: string, data: string) => {
  newMsg.push(name + '@' + data);
};

const store = useStore();

const loop = () => {
  const data = newMsg.shift();
  if (data !== undefined) {
    msg.value.push(data);
    loop();
  } else {
    setTimeout(() => loop(), store.state.autoplaySpeed * 100);
    if (window.scrollY >= 50) return;
    if (list.value.clientHeight < listDiv.value.clientHeight) return;
    if (msg.value.length <= 1) return;
    const last = msg.value.pop();
    if (last != undefined) {
      setTimeout(() => msg.value.unshift(last), 400);
    }
  }
};

onMounted(() => {
  autoAnimate(list.value);
  loop();
});
</script>

<template>
  <q-page class="row">
    <div ref="listDiv" class="q-ma-md">
      <div ref="list" class="q-gutter-md">
        <div v-for="item in msg" :key="item" class="row">
          <q-card>
            <q-card-section class="bg-white" style="padding: 0 8px 0 8px"
              ><a
                class="text-primary"
                :style="'font-size: ' + this.$store.state.nameSize + 'px'"
                >{{ (item as string).split('@')[0] }}家长</a
              ><a
                class="text-grey"
                :style="
                  'font-size: ' +
                  this.$store.state.timestampSize +
                  'px; padding-left: 8px'
                "
                >{{ (item as string).split('@')[0] }}</a
              >
            </q-card-section>
            <q-card-section>
              <div
                v-html="(item as string).split('@')[1].replace(/<script>/g, '&lt;script&gt;')"
                :style="'font-size: ' + this.$store.state.messageSize + 'px'"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="50"
      :offset="[18, 18]"
    >
      <q-btn round size="xs" icon="keyboard_arrow_up" color="blue" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return {};
  },
});
</script>
