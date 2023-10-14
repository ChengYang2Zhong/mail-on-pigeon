import { boot } from 'quasar/wrappers';
import { createStore, Store } from 'vuex';
import { Cookies } from 'quasar';
import { A } from 'app/dist/spa/assets/index.e3fdb473';

declare module '@vue/runtime-core' {
  interface State {
    count: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

const AUTOPLAY_SPEED = 'autoplaySpeed';
const NAME_SIZE = 'nameSize';
const TIMESTAMP_SIZE = 'timestampSize';
const MESSAGE_SIZE = 'messageSize'

function getNumberSettings(name: string, defaultVal: number): number {
  const cookieValue = Cookies.get(name);
  if (cookieValue !== null) {
    const numericValue = parseInt(cookieValue);
    if (!isNaN(numericValue)) return numericValue;
  }
  Cookies.set(name, defaultVal.toString(), cookiesOptions);
  return defaultVal;
}

const cookiesOptions = {
  expires: '1000d',
  path: '/',
};

const store = createStore({
  state() {
    return {
      autoplaySpeed: getNumberSettings(AUTOPLAY_SPEED, 30),
      nameSize: getNumberSettings(NAME_SIZE, 20),
      timestampSize: getNumberSettings(TIMESTAMP_SIZE, 12),
      messageSize: getNumberSettings(MESSAGE_SIZE, 24),
    };
  },
  mutations: {
    autoplaySpeed(state, newValue) {
      state.autoplaySpeed = newValue;
      Cookies.set(AUTOPLAY_SPEED, newValue.toString(), cookiesOptions);
    },
    nameSize(state, newValue) {
      state.nameSize = newValue;
      Cookies.set(NAME_SIZE, newValue.toString(), cookiesOptions);
    },
    timestampSize(state, newValue) {
      state.timestampSize = newValue;
      Cookies.set(TIMESTAMP_SIZE, newValue.toString(), cookiesOptions);
    },
    messageSize(state, newValue) {
      state.messageSize = newValue;
      Cookies.set(MESSAGE_SIZE, newValue.toString(), cookiesOptions);
    },
  },
});

export default boot(({ app }) => {
  app.use(store);
});
