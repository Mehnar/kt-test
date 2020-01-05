<template>
  <div class="header">
    <p class="title">Tasks</p>
    <base-icon-button
      v-popover:popover
      :icon="'el-icon-more'"
      class="header-button"
    />
    <el-popover
      ref="popover"
      placement="right"
      title="Order of sorting"
      width="150"
      trigger="click"
    >
      <template
        v-slot="content"
      >
        <desk-header-settings/>
      </template>
    </el-popover>
  </div>
</template>

<script>
import BaseIconButton from '@/base/BaseIconButton';
import DeskHeaderSettings from '@/components/DeskHeaderSettings';

export default {
  name: 'DeskHeader',
  components: {
    BaseIconButton,
    DeskHeaderSettings,
  }
}
</script>

<style lang="scss" scoped>
.header {
  @include header;
}
.header-button {
  height: 32px;
  width: 32px;
  margin-left: auto;
}
</style>