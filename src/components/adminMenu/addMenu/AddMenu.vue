<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">添加菜单</el-button>
    <!-- 添加用户对话框 -->
    <el-dialog
        title="添加菜单"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="destroyonclose"
    >
      <el-form
          :status-icon="status_icon"
          label-position="right"
          :model="menu" :rules="rules" ref="menu" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menu.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('menu')">立即添加</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddMenu",
  data(){
    return{
      destroyonclose:true,
      dialogVisible: false,
      status_icon: true,
      menu: {
        name: '',
        type: 1
      },
      rules: {
        name: {required: true, min: 2, max: 10, message: '请输入菜单名称,长度在2到10个字符', trigger: 'blur'}
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/admin/index/add', this.menu)
              .then((res) => {
                if (res.data.code == 1) {
                  this.$notify.success({
                    title: "添加成功",
                    message: "已成功添加了一条菜单信息！3S之后将刷新页面！"
                  })
                  this.dialogVisible = false
                  this.$emit('addSuccess')
                } else {
                  this.$notify.error({
                    title: "添加失败",
                    message: "添加菜单信息失败！"
                  })
                }
              })
        } else {
          this.$message.error('请检查所填写的菜单信息！')
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>