<template>
  <div
    class="item-wrapper"
    @mouseenter="setMouseEnter(true)"
    @mouseleave="setMouseEnter(false)"
  >
    <transition name="checkbox">
      <el-checkbox
        v-model="localStatus"
        v-show="mouseEnter || localStatus"
        class="checkbox"
        @change="onchange"
      />
    </transition>
    <div
      class="item"
    >
      <p
        class="item-text"
        @click.self="onclickTask(task.id)"
      >
        {{ `${task.index}) ${task.text}` }}
      </p>
      <transition name="edit-button">
        <base-icon-button
          v-show="mouseEnter"
          :icon="'el-icon-close'"
          class="edit-button"
          @click="deleteTask"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import Debounce from 'lodash/debounce';
import BaseIconButton from '@/base/BaseIconButton';

export default {
  name: 'TaskItem',
  components: {
    BaseIconButton,
  },
  props: {
    task: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      mouseEnter: false,
      localStatus: this.task.completed,
    }
  },
  watch: {
    'task.completed'(newVal) {
      this.localStatus = newVal;
    },
  },
  created() {
    this.debouncedSetStatus = Debounce(this.setStatus, 500);
  },
  beforeDestroy() {
    this.debouncedSetStatus.cancel();
  },
  methods: {
    setMouseEnter(val) {
      this.mouseEnter = val;
    },
    async deleteTask() {
      this.$preloader.active();
      try {
        await this.$store.dispatch(this.$types.DELETE_TASK, this.task.id);
        await this.$store.dispatch(this.$types.FETCH_ALL_TASKS);
        this.$message({
          message: 'Successfully deleted.',
          type: 'success',
          duration: 2000,
        });
        const page = Number(this.$route.params.page);
        const tasks = this.$store.getters[this.$types.GET_SHOWING_TASKS](page, this.$store.state.orderOfSorting);
        if (tasks.length === 0 && page !== 1) {
          this.$router.push(`/page/${page - 1}`);
        }
      } catch (e) {
        console.error(e);
        this.$message.error('An error occured, see the console.');
      }
      this.$preloader.deactive();
    },
    async setStatus(event) {
      this.$preloader.active();
      try {
        await this.$store.dispatch(this.$types.UPDATE_TASK_STATUS, {
          id: this.task.id,
          status: event,
        });
        await this.$store.dispatch(this.$types.FETCH_ALL_TASKS);
        this.$message({
          message: 'Successfully changed status.',
          type: 'success',
          duration: 2000,
        });
      } catch (e) {
        console.error(e);
        this.$message.error('An error occured, see the console.');
      }
      this.$preloader.deactive();
    },
    onchange(event) {
      this.debouncedSetStatus(event);
    },
    onclickTask(id) {
      this.$router.push({ path: `/${id}/edit`, query: { page: this.$route.params.page }});
    }
  },
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.checkbox {
  margin-right: 6px;

  &-enter-active,
  &-leave-active {
    transition: all .3s ease;
  }
  &-enter,
  &-leave-to {
    transform: translateX(-10px);
    opacity: 0;
    width: 0;
  }
}
.item {
  flex-grow: 1;
  background-color: #fff;
  transition: background-color .3s linear;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: #f4f5f7;
  }

  & .item-text {
    width: 100%;
    margin: 0;
    padding: 8px;
    white-space: pre-wrap;
    text-align: left;
    box-sizing: border-box;
  }

  & .edit-button {
    margin-right: 2px;

    &-enter-active,
    &-leave-active {
      transition: all .3s ease;
    }
    &-enter,
    &-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }
  }
}
</style>