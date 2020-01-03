<template>
  <input type="text" class="hminput" 
  @input="handlerInput"
  :class="{'success':statu, 'error':!statu}">
</template>

<script>
export default {
    props: ['rules', 'msg'],
    data () {
        return {
            statu: true,
        }
    },
    methods: {
        handlerInput(event) {
            let value = event.target.value;
            if(this.rules && this.rules.test(value)) {
                this.statu = true;
            }else {
                this.statu = false;
                this.msg ? console.log(this.msg) : console.log('输入不正确')
            }
            // 给父组件发出input事件，并传递输入数据
            this.$emit('input', value);
        }
    }
}
</script>

<style lang="less" scoped>
    .hminput {
        width: (318-30)/360*100vw;
        padding: 0 15px;
        height: 40px;
        border: none;
        border-bottom: 3px solid #ccc;
        outline: none;
        line-height: 40px;
        font-size: 18px;
    }
    .success {
        border-bottom-color: green;
    }
    .error {
        border-bottom-color: #f00;
    }
</style>