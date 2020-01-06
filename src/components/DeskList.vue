<template>
  <div class="list">
    <div
      class="items"
    >
      <template
        v-if="tasks.length"
      >
        <task-item
          v-for="(item, idx) in tasks"
          :key="idx"
          :task="item"
          :index="idx"
        />
      </template>
      <span
        v-else
      >
        There is no tasks yet...
      </span>
    </div>
    <el-pagination
      :hide-on-single-page="false"
      :page-size="MAX_PAGE_SIZE"
      :total="countOfTasks"
      :current-page="currentPage"
      layout="prev, pager, next"
      background
      small
      @current-change="changePage"
    />
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem';
import { MAX_PAGE_SIZE } from '@/utils';
export default {
  name: 'DeskList',
  data() {
    return {
      MAX_PAGE_SIZE,
      currentPageStart: null,
    }
  },
  components: {
    TaskItem,
  },
  computed: {
    tasks() {
      return this.$store.getters[this.$types.GET_SHOWING_TASKS](this.currentPage, this.$store.state.orderOfSorting);
    },
    countOfTasks() {
      return this.$store.state.Task.tasks.length;
    },
    currentPage() {
      return Number(this.$route.params.page);
    },
  },
  methods: {
    changePage(count) {
      this.$router.push(`/page/${count}`);
    }
  },
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: 8px;
}
.items {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 309px);
  margin-bottom: 8px;

  @media screen and (max-height: 450px) {
    min-height: 67px;
    max-height: calc(100vh - 201px);
  }
}
</style>