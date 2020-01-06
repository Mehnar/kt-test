<template>
  <div class="home">
    <router-view/>
  </div>
</template>

<script>
import store from '@/store';
import Bus from '@/bus';
import * as types from '@/store/types';


export default {
  name: 'home',
  async beforeRouteEnter(to, from, next) {
    Bus.$emit('preloader:active');
    await store.dispatch(types.BIND_TASKS);
    Bus.$emit('preloader:deactive');
    next();
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background: url('../assets/wood-background.jpg') center;
  display: flex;
  justify-content: center;
  align-items: baseline;
  min-height: 268px;
}
</style>
