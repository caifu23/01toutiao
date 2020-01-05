<template>
  <div class="header" @click="handlerClick">
      <!-- 顶部栏 -->
      <div class="left">
          <slot name="left"></slot>
      </div>
      <div class="center">
          {{ title }}
      </div>
      <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props: ['title'],
    methods: {
        handlerClick (event) {
            this.$emit('click', event)
        }
    }
}
</script>

<style lang="less">
.header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > .center {
        color: #000;
        font-size: 14px;
        font-weight: bold;
    }
    > .left {
        font-weight: bold;
    }
}
</style>