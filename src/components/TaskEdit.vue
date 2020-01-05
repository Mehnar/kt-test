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
import Bus from '@/bus';
import * as types from '@/store/types';

async function routeHook(id) {
  try {
    const task = await store.dispatch(types.FETCH_TASK_BY_ID, id);
    return !!task;
  } catch (e) {
    console.error(e);
    this.$message.error('An error occured, see the console.');
    return false;
  }
}

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
    Bus.$emit('preloader:active');
    if (await routeHook(to.params.id)) {
      next();
      Bus.$emit('preloader:deactive');
      this.$refs.textarea.focus();
      return;
    }
    if (to.query.page) {
      next(`/page/${to.query.page}`);
    } else {
      next('/page/1');
    }
    Bus.$emit('preloader:deactive');
  },
  async beforeRouteUpdate(to, from, next) {
    Bus.$emit('preloader:active');
    if (await routeHook(to.params.id)) {
      next();
      Bus.$emit('preloader:deactive');
      return;
    }
    if (to.query.page) {
      next(`/page/${to.query.page}`);
    } else {
      next('/page/1');
    }
    Bus.$emit('preloader:deactive');
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
    async save() {
      this.$preloader.active();
      try {
        await this.$store.dispatch(this.$types.UPDATE_TASK, {
          id: this.currentTask.id,
          task: {
            text: this.currentTask.text,
            completed: this.currentTask.completed,
          }
        });
        this.$message({
          message: 'Successfully edited.',
          type: 'success',
          duration: 2000,
          showClose: true,
        });
        this.cancel();
      } catch (e) {
        console.error(e);
        this.$message.error('An error occured, see the console.');
      }
      this.$preloader.deactive();
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