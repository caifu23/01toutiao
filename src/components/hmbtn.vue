<template>
  <div class="btn" @click="handlerClick">
    <!-- 按钮 -->
      <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handlerClick (event) {
      // 告诉父组件我被点击了
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less" scoped >
  .btn {
    width: 318/360*100vw;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    // background-color: #f00;
    background-color: green;
  }
</style>