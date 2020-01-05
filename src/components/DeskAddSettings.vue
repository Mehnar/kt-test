<template>
  <div class="position-list">
    <el-radio
      v-model="editorPosition"
      label="up"
    >
      Up
    </el-radio>
    <el-radio
      v-model="editorPosition"
      label="down"
    >
      Down
    </el-radio>
  </div>
</template>

<script>
export default {
  name: 'DeskAddSettings',
  computed: {
    editorPosition: {
      get() {
        return this.$store.state.editorPosition;
      },
      set(newValue) {
        this.$store.commit(this.$types.SET_EDITOR_POSITION, newValue);
      },
    }
  },
};
</script>

<style lang="scss" scoped>
.position-list {
  display: flex;
  flex-direction: column;
}
</style>