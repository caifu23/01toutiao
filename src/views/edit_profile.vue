<template>
  <div class="edit">
    <!-- 顶部栏 -->
    <hmheader title="用户编辑" @click="$router.back()">
      <span class="iconfont iconjiantou2" slot="left"></span>
    </hmheader>
    <!-- 信息编辑栏 -->
    <hmcell title="昵称" desc="火星网友" @click="changeNick"></hmcell>
    <hmcell title="密码" desc="******"></hmcell>
    <hmcell title="性别" desc="男"></hmcell>
  </div>
</template>

<script>
import hmheader from '../components/hmheader'
import hmcell from '../components/hmcell'
import { getUserInfo, editUserInfo } from '../apis/user'

export default {
  data () {
    return {
      currentUser: {}
    }
  },
  components: {
    hmheader, hmcell
  },
  async mounted () {
    // 发起请求用户数据请求
    let res = await getUserInfo(this.$route.params.id)
    console.log(res)
    if(res.data.message === '获取成功') {
      this.currentUser = res.data.data
    }
  },
  methods: {
    async changeNick () {
      console.log(this.currentUser.id)
      let res = await editUserInfo(this.currentUser.id, {})
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>