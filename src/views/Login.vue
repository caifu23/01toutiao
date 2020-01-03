<template>
  <div class="login">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <!-- <input placeholder="请输入手机号" class="input" /> -->
          <hminput placeholder="请输入用户名/手机号" 
          v-model="users.username"
          :rules="/^((\d{5,6})|(\d{11}))$/"
          msg='输入的用户名/手机号不正确'></hminput>
          <hminput placeholder="请输入密码" 
          v-model="users.password"
          :rules="/^\S{3,11}$/"
          msg="请输入3-16的密码"></hminput>
        </div>
        <p class="tips">
          没有账号？
          <a href="#/register" class>去注册</a>
        </p>
         <!-- 使用按钮组件 -->
         <hmbutton @click="login">登录</hmbutton>
      </div>
  </div>
</template>

<script>
// 引入按钮组件
import hmbutton from '../components/hmbtn'
// 引入input输入框组件
import hminput from '../components/hminput'

export default {
  data () {
    return {
      users: {
        username: '10086',
        password: ''
      }
    }
  },
  // 注册组件
  components: {
    hmbutton,hminput
  },
  methods: {
    login() {
      console.log(this.users)
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>