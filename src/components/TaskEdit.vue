<template>
  <div class="desk">
    <div class="header">
      <p class="title">
        Task editing
      </p>
    </div>
    <textarea
      v-model="currentTask.text"
      ref="textarea"
      class="textarea"
      placeholder="Enter a title for this card..."
      rows="3"
      spellcheck="false"
      @keydown.enter.prevent
      @keyup.enter.prevent="save"
    />
    <el-checkbox
      v-model="currentTask.completed"
      class="checkbox"
    >
      Completed
    </el-checkbox>
    <div
      class="button-row"
    >
      <button
        class="save-button"
        @click="save"
      >
        Save
      </button>
      <button
        class="cancel-button"
        @click="cancel"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import pick from 'lodash/pick';
import store from '@/store';
import * as types from '@/store/types';

export default {
  name: 'TaskEdit',
  data() {
    return {
      currentTask: {
        completed: false,
        text: '',
        id: null,
      },
    }
  },
  async beforeRouteEnter(to, from, next) {
    const id = to.params.id;
    const task = store.getters[types.GET_TASK_BY_ID](id);
    if (task) {
      store.commit(types.SET_CURRENT_TASK, task);
      next();
      return;
    }
    if (to.query.page) {
      next(`/page/${to.query.page}`);
    } else {
      next('/page/1');
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    const task = store.getters[types.GET_TASK_BY_ID](id);
    if (task) {
      store.commit(types.SET_CURRENT_TASK, task);
      next();
      return;
    }
    if (to.query.page) {
      next(`/page/${to.query.page}`);
    } else {
      next('/page/1');
    }
  },
  mounted() {
    this.$refs.textarea.focus();
  },
  watch: {
    '$store.state.Task.currentTask': {
      handler: function (newVal) {
        this.currentTask = pick(newVal, Object.keys(newVal));
      },
      immediate: true,
    }
  },
  methods: {
    save() {
      this.$store.dispatch(this.$types.UPDATE_TASK, {
        id: this.$route.params.id,
        task: {
          text: this.currentTask.text,
          completed: this.currentTask.completed,
        }
      }).then(() => {
        this.$message({
          message: 'Successfully edited.',
          type: 'success',
          duration: 2000,
          showClose: true,
        });
      });
      this.cancel();
    },
    cancel() {
      const page = this.$route.query.page;
      if (page) {
        this.$router.push(`/page/${page}`);
        return;
      }
      this.$router.push(`/page/1`);
    },
  },
}
</script>

<style lang="scss" scoped>
.desk {
  @include desk;
}
.header {
  @include header;
}
.textarea {
  @include textarea;
  margin-bottom: 8px;
}
.checkbox {
  margin-bottom: 8px;
}
.button-row {
  display: flex;
  justify-content: center;
}
.save-button {
  @include action-button;
  background-color: $green;
  color: #fff;
  margin-right: 4px;

  &:hover {
    background-color: $light-green;
  }
}
.cancel-button {
  @include action-button;
  background-color: $gray;
  color: #fff;

  &:hover {
    background-color: $dark-gray;
  }
}
</style>