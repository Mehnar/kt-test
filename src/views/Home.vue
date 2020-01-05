<template>
  <div class="home">
    <router-view/>
    <preloader/>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background: url('../assets/wood-background.jpg') center;
  display: flex;
  justify-content: center;
  align-items: baseline;
  min-height: 268px;
}
</style>
