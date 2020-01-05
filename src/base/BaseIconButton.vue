<template>
  <a
    class="button"
    :class="{
      'hover-background': hoverBackground,
      'hover-icon': hoverIcon
    }"
    @click="onclick"
  >
    <slot>
      <i :class="[ icon ]"/>
    </slot>
  </a>
</template>

<script>
export default {
  name: 'BaseIconButton',
  props: {
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hoverBackground: {
      type: Boolean,
      default: true,
    },
    hoverIcon: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onclick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  width: 32px;
  height: 32px;
  background-color: transparent;
  transition: background-color .3s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
}
.hover-background {
  &:hover {
    background-color: rgba(9,30,66,.08);
  }
}
.hover-icon {
  color: $gray;

  &:hover {
    color: #172b4d;
  }
}
</style>