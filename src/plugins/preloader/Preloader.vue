<template>
  <div
    v-if="isActive"
    class="preloader-background"
  >
    <div
      class="circle"
    >
    </div>
  </div>
</template>

<script>
import Bus from '@/bus';

export default {
  name: 'BasePreloader',
  data() {
    return {
      timer: null,
      isActive: false,
      isDelayOut: false,
    };
  },
  created() {
    Bus.$on('preloader:active', this.activate);
    Bus.$on('preloader:deactive', this.deactivate);
  },
  beforeDestroy() {
    Bus.$off('preloader:active', this.activate);
    Bus.$off('preloader:deactive', this.deactivate);
  },
  methods: {
    activate() {
      if (this.isActive) {
        clearTimeout(this.timer);
      } else {
        this.isActive = true;
      }
      this.isDelayOut = false;
      
      this.timer = setTimeout(() => {
        this.deactivate();
      }, 500);

    },
    deactivate() {
      if (this.isDelayOut) {
        this.isActive = false;
        this.isDelayOut = false;
      } else {
        this.isDelayOut = true;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@keyframes preloader-bounce {
  100% {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}
.preloader-background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.4;
}
.circle {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-color: $gray;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: preloader-bounce 0.8s infinite linear;
}
</style>