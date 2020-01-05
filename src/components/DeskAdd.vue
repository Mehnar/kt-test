<template>
  <div class="edit-block">
    <div
      v-if="isEditorOpened"
    >
      <textarea
        v-model="editorText"
        class="textarea"
        placeholder="Enter a title for this card..."
        rows="3"
        spellcheck="false"
        @keydown.enter.prevent
        @keyup.enter.prevent="createTask"
      />
      <div
        class="button-row"
      >
        <a
          class="add-button"
          @click="createTask"
        >
          Add card
        </a>
        <base-icon-button
          class="cross-button"
          :icon="'el-icon-close'"
          :hover-background="false"
          hover-icon
          @click="toggleEditing"
        />
        <base-icon-button
          v-popover:popover
          :icon="'el-icon-more'"
          class="action-button"
        />
        <el-popover
          ref="popover"
          placement="right"
          title="Editor position"
          width="150"
          trigger="click"
        >
          <template
            v-slot="content"
          >
            <desk-add-settings/>
          </template>
        </el-popover>
      </div>
    </div>
    <div
      v-else
      class="button-row"
    >
      <base-icon-button
        hover-icon
        class="text-button"
        @click="toggleEditing"
      >
        <span>
          <i class="el-icon-plus"/>
          Add one more card
        </span>
      </base-icon-button>
      <base-icon-button
        v-popover:popover
        :icon="'el-icon-more'"
        class="action-button"
      />
      <el-popover
        ref="popover"
        placement="right"
        title="Editor position"
        width="150"
        trigger="click"
      >
        <template
          v-slot="content"
        >
          <desk-add-settings/>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import BaseIconButton from '@/base/BaseIconButton';
import DeskAddSettings from '@/components/DeskAddSettings';

export default {
  name: 'DeskAdd',
  components: {
    BaseIconButton,
    DeskAddSettings,
  },
  computed: {
    isEditorOpened: {
      get() {
        return this.$store.state.isEditorOpened;
      },
      set(newVal) {
        this.$store.commit(this.$types.SET_EDITOR_STATUS, newVal);
      }
    },
    editorText: {
      get() {
        return this.$store.state.Task.editorText;
      },
      set(newVal) {
        this.$store.commit(this.$types.SET_EDITOR_TEXT, newVal);
      },
    },
    currentPage() {
      return Number(this.$route.params.page);
    },
  },
  methods: {
    toggleEditing() {
      this.isEditorOpened = !this.isEditorOpened;
    },
    async createTask() {
      if (!this.editorText) return;
      this.$preloader.active();
      try {
        await this.$store.dispatch(this.$types.CREATE_TASK, this.editorText);
        if (this.currentPage === 1) {
          await this.$store.dispatch(this.$types.FETCH_ALL_TASKS);
        } else {
          this.$router.push('/page/1');
        }
        this.editorText = '';
        this.$message({
          message: 'Successfully added.',
          type: 'success',
          duration: 2000,
        });
      } catch (e) {
        console.error(e);
        this.$message.error('An error occured, see the console.');
      }
      this.$preloader.deactive();
    },
  }
}
</script>

<style lang="scss" scoped>
.edit-block {
  margin-top: 8px;
}
.textarea {
  @include textarea;
  margin-bottom: 8px;
}
.button-row {
  display: flex;
}
.add-button {
  @include action-button;
  background-color: $green;
  color: #fff;
  margin-right: 4px;

  &:hover {
    background-color: $light-green;
  }
}
.cross-button {
  font-size: 24px;
  line-height: 32px;
}
.action-button {
  margin-left: auto;
}
.text-button {
  width: auto;
  padding: 0 8px;
}
</style>