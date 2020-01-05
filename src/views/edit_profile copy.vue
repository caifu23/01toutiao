<template>
  <div class="editprofile">
    <!-- 顶部栏 -->
    <!-- $router.back() 可以返回当前页面的上一页 -->
    <hmheader title="编辑资料" @click="$router.back()">
      <span class="iconfont iconjiantou2" slot="left"></span>
    </hmheader>
    <div class="imgUser">
      <img :src="'http://localhost:3000' + currentUser.head_img" alt />
      <!-- 文件上传 -->
      <van-uploader :after-read="afterRead" />
    </div>

    <!-- ----  -->
    <hmcell title="昵称" :desc="currentUser.nickname" @click="showNick = !showNick"></hmcell>
    <!-- 昵称弹出框 -->
    <van-dialog v-model="showNick" title="修改昵称" show-cancel-button @confirm="nickClick">
      <van-field
        ref="nickname"
        :value="currentUser.nickname"
        placeholder="请输入用户名"
        required
        label="昵称"
      />
    </van-dialog>
    <!-- 密码 -->
    <hmcell title="密码" desc="currentUser.password" @click="showPwd = !showPwd"></hmcell>
    <!-- 密码弹出框 -->
    <van-dialog
      v-model="showPwd"
      title="修改密码"
      show-cancel-button
      @confirm="pwdClick"
      :before-close="cancelClose"
    >
      <van-field
        ref="oldPwd"
        type="password"
        label="旧密码"
        placeholder="请输入旧密码"
        required
        @blur="checkPwd"
      />
      <van-field ref="newPwd" type="password" label="新密码" placeholder="请输入新密码" required />
    </van-dialog>
    <!-- 性别 -->
    <hmcell title="性别" :desc="currentUser.gender === 1 ? '男' : '女'"
    @click="showGender = !showGender"></hmcell>
    <!-- 性别弹出框 -->
    <van-dialog v-model="showGender" title="性别" show-cancel-button @confirm="genderClick">
      <van-picker :columns="columns" @change="onChange" 
      :default-index="currentUser.gender" />
    </van-dialog>
  </div>
</template>

<script>
import hmcell from "@/components/hmcell";
import hmheader from "@/components/hmheader";
import { uploadFile } from "@/apis/upload";
import { editUserInfo, getUserInfo } from "@/apis/user";

export default {
  data() {
    return {
      // 当前用户对象
      currentUser: {},
      // 昵称弹出框是否显示
      showNick: false,
      showPwd: false,
      showGender: false,
      // 性别选择
      columns: ['女','男'],
      // 存储用户性别选择
      selectDg: ''
    };
  },
  components: {
    hmcell,
    hmheader
  },
  async mounted() {
    let res = await getUserInfo(this.$route.params.id);
    // console.log(res)
    if (res.data.message === "获取成功") {
      this.currentUser = res.data.data;
    }
    // 如果当前返回数据没有 图片路径，提供个默认值
    if (!this.currentUser.head_img) {
      this.currentUser.head_img = "/uploads/image/default.png";
    }
  },
  methods: {
    // 文件上传
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      // 上传图片到服务器
      let fd = new FormData();
      fd.append("file", file.file);
      let res = await uploadFile(fd);
      console.log(res);
      if (res.data.message === "文件上传成功") {
        // 文件上传成功
        // 实现文件预览
        this.currentUser.head_img = res.data.data.url;
        // 数据库同步更新信息
        let resUpdate = await editUserInfo(this.currentUser.id, {
          head_img: res.data.data.url
        });
        // console.log(resUpdate)
        if (resUpdate.data.message === "修改成功") {
          this.$toast.success("修改成功");
        } else {
          this.$toast.fail("修改失败");
        }
      }
    },
    // 点击昵称 弹出框的确认
    async nickClick() {
      // 获取当前输入框的值
      // 发起修改昵称请求
      // 由于使用外部组件的原因，this.$refs.nickname 取到的不是当前输入框的值，而是当前组件
      let name = this.$refs.nickname.$refs.input.value;
      let res = await editUserInfo(this.currentUser.id, { nickname: name });
      console.log(res);
      if (res.data.message === "修改成功") {
        // 更新当前页面的值
        this.currentUser.nickname = name;
        // 显示修改成功
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    // 点击密码 弹出框的确认
    pwdClick() {
      // let oldPwdValue = this.$refs.oldPwd.$refs.input.value
      // let newPwdValue = this.$refs.newPwd.$refs.input.value
      // console.log(oldPwdValue)
      // console.log(newPwdValue)
      // 判断当前输入的旧密码是否正确，如果正确再修改密码
      // if(oldPwdValue === this.currentUser.password) {
      //   console.log('旧密码输入正确')
      // } else {
      // 提示用户输入旧密码错误
      // 此时是否阻止弹窗关闭？？？？
      // this.$toast.fail('输入的旧密码错误，请重新输入')
      // this.$dialog
      // }
    },
    // 旧密码框输入失焦后，判断旧密码是否正确（安全性）
    checkPwd() {
      let oldPwdValue = this.$refs.oldPwd.$refs.input.value;
      // 判断当前输入的旧密码是否正确，如果正确再修改密码
      if (oldPwdValue !== this.currentUser.password) {
        // 提示用户输入旧密码错误，
        // 并清除错误密码， 光标聚焦回旧密码（移动端是否生效）
        // this.$toast.fail('输入的旧密码错误，请重新输入')
        // this.$refs.oldPwd.$refs.input.value = ''
        // this.$refs.oldPwd.$refs.input.focus();
      }
    },
    // 弹窗关闭前的回调函数
    async cancelClose(action, done) {
      // before-close 是prop属性，在弹窗关闭前方法
      // action 是操作行为：取消或确认,
      // done()  是关闭弹窗， done(false) 阻止弹窗关闭
      // 如果用户点击了取消则 关闭弹窗，不做任何操作
      if (action === "cancel") {
        done();
      } else if (action === "confirm") {
        // 点击了确认，阻止弹窗关闭
        done(false);
        let oldPwdValue = this.$refs.oldPwd.$refs.input.value;
        // 判断当前输入的旧密码是否正确，如果正确再修改密码
        if (oldPwdValue.trim() == "") {
          this.$toast.fail("没有输入旧密码");
        } else if (oldPwdValue !== this.currentUser.password) {
          // 提示用户输入旧密码错误，
          // 并清除错误密码， 光标聚焦回旧密码（移动端是否生效）
          this.$toast.fail("输入的旧密码错误，请重新输入");
          this.$refs.oldPwd.$refs.input.value = "";
          this.$refs.oldPwd.$refs.input.focus();
        } else {
          let newPwdValue = this.$refs.newPwd.$refs.input.value;
          if (newPwdValue.trim() == "") {
            // 如果没有新密码输入，提示用户
            this.$toast.fail("没有输入新密码");
          } else {
            // 关闭弹窗
            this.showPwd = false;
            // 有新密码，发起修改密码请求 (新旧密码一致 ？)
            let res = await editUserInfo(this.currentUser.id, {
              password: newPwdValue
            });
            if (res.data.message === "修改成功") {
              this.$toast.success("修改成功");
            }
          }
        }
      }
    },
    // 性别选择
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
      // 男索引：1，女索引：0
      this.selectDg = index
    },
    // 性别确认
    async genderClick() {
      // 获取是否选择性别
      if(this.selectDg && this.selectDg != this.currentUser.gender) {
        // 发起修改请求
        console.log(this.selectDg)
        console.log('用户id'+this.currentUser.id)
        console.log(this.currentUser.gender)
        let res = await editUserInfo(this.currentUser.id, {gender: this.selectDg})
        console.log(res)
      }else {
        // 没有选择性别 或者修改任一样
        this.$toast.success('您没有更改性别选择')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.imgUser {
  position: relative;
  height: 150px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    border-radius: 50%;
  }

  /deep/.van-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__upload {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    border-radius: 50%;
    opacity: 0;
  }
}
</style>
