<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    <!-- 添加用户对话框 -->
    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="destroyonclose"
    >
        <el-form
            :status-icon="status_icon"
            label-position="right"
            :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
          <el-form-item label="昵称" prop="name">
            <el-input v-model="user.name" placeholder="请输入用户名或者电话号码"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名(此用户名用于登录)" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" placeholder="请输入密码" :show-password='showPassword' autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="user.phone"  placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <upload-user-avatar @submitUserAvatar="acceptUserAvatar($event)"></upload-user-avatar>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="user.sex">
              <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('user')">立即添加</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadUserAvatar from "@/utils/uploadUserAvatar";
export default {
  name: "AddUser",
  components:{uploadUserAvatar},
  data(){
    return{
      destroyonclose:true,
      dialogVisible: false,
      status_icon: true,
      showPassword: true,
      user: {
        name: '',
        username: '',
        password: '',
        sex: '',
        avatar: '',
        phone: '',
        email: ''
      },
      rules: {
        name: [{required: true, min: 3, max: 10, message: '请输入昵称,长度在3到10个字符', trigger: 'blur'}],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 20, message: '长度在 5 到 20 个字符,推荐使用邮箱', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        phone: [
          {required: true,message: '请输入电话号码', trigger: 'blur'},
          {
            pattern: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        avatar: [
          {required: true, message: '请选择头像', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    //接收上传头像组件上传的头像对象
    acceptUserAvatar(data) {
      this.user.avatar = data;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/login/userRegister', this.user)
              .then((res) => {
                if (res.data.code == 1) {
                  this.$notify.success({
                    title: "添加成功",
                    message: "已成功添加了一条用户信息！"
                  })
                  this.dialogVisible = false
                  this.$emit('addSuccess')
                } else {
                  this.$message.error(res.data.msg)
                }
              })
        } else {
          this.$message.error('请检查所填写的用户信息！')
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>