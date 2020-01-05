<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="'http://127.0.0.1:3000' + currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: Boolean(currentUser.gender == 1),
                iconxingbienv: !Boolean(currentUser.gender == 1)
              }"
            ></span>
            {{ currentUser.nickname }}
          </div>
          <div class="time">{{ currentUser.create_date }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频"></hmcell>
    <hmcell title="设置"></hmcell>
    <hmbtn>退出</hmbtn>
  </div>
</template>

<script>
import hmcell from "@/components/hmcell";
import hmbtn from "@/components/hmbtn";
import { getUserInfo } from "@/apis/user";
export default {
  data() {
    return {
      currentUser: {}
    };
  },
  components: {
    hmcell,
    hmbtn
  },
  async mounted() {
    let id = this.$route.params.id;
    // console.log(id)
    let res = await getUserInfo(id);
    console.log(res);
    if (res.data.message === "获取成功") {
      this.currentUser = res.data.data;
    }
    // 用户验证失败由响应拦截器处理
  }
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
      &.iconxingbienv {
        color: hotpink;
      }
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn {
  margin: 20px auto;
  background-color: red;
}
</style>
