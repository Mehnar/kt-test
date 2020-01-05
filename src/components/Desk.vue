<template>
   <div class="desk">
      <desk-header/>
      <template
        v-for="(component, idx) in computedComponentsList"
      >
        <component
          :key="idx"
          :is="component"
        />
      </template>
    </div>
</template>

<script>
import DeskHeader from '@/components/DeskHeader';
import DeskList from '@/components/DeskList';
import DeskAdd from '@/components/DeskAdd';
import store from '@/store';
import Bus from '@/bus';
import * as types from '@/store/types';


async function routeHook(page) {
  try {
    const tasks = await store.dispatch(types.FETCH_ALL_TASKS, page);
    return (!!tasks.length || (Number(page) === 1));
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default {
  name: 'Desk',
  components: {
    DeskHeader,
    DeskList,
    DeskAdd,
  },
  data() {
    return {
      componentsList: [
        'DeskList',
        'DeskAdd',
      ],
    }
  },
  async beforeRouteEnter(to, from, next) {
    Bus.$emit('preloader:active');
    if (await routeHook(to.params.page)) {
      next();
      Bus.$emit('preloader:deactive');
      return;
    }
    next('/page/1');
    Bus.$emit('preloader:deactive');
  },
  async beforeRouteUpdate(to, from, next) {
    Bus.$emit('preloader:active');
    if (await routeHook(to.params.page)) {
      next();
      Bus.$emit('preloader:deactive');
      return;
    }
    next('/page/1');
    Bus.$emit('preloader:deactive');
  },
  computed: {
    editorPosition() {
      return this.$store.state.editorPosition;
    },
    computedComponentsList() {
      if (this.editorPosition === 'down') {
        return this.componentsList;
      }
      return [...this.componentsList].reverse();
    },
  }
}
</script>

<style lang="scss" scoped>
.desk {
  @include desk;
}
</style>