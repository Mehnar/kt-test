<template>
  <div class="position-list">
    <el-radio
      v-model="orderOfSorting"
      label="asc"
    >
      From new to old
    </el-radio>
    <el-radio
      v-model="orderOfSorting"
      label="desc"
    >
      From old to new
    </el-radio>
  </div>
</template>

<script>
export default {
  name: 'DeskHeaderSettings',
  computed: {
    orderOfSorting: {
      get() {
        return this.$store.state.orderOfSorting;
      },
      set(newValue) {
        this.$store.commit(this.$types.SET_ORDER_OF_SORTING, newValue);
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