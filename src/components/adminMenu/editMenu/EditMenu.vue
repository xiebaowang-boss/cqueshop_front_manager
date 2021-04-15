<template>
  <div>
    <el-button
        type="primary"
        icon="el-icon-edit"
        @click="dialogVisible = true"
        size="mini"
    ></el-button>
    <!-- 编辑用户对话框 -->
    <el-dialog
        title="编辑菜单信息"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="destroyonclose"
        @open="getMenuinfo"
    >
      <el-form
          :status-icon="status_icon"
          label-position="right"
          :model="menu" :rules="rules" ref="menu" label-width="150px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menu.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="menu.path" placeholder="请输入菜单路径"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('menu')">保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditMenu",
  props: {
    menuId: String
  },
  data() {
    return {
      status_icon: true,
      dialogVisible: false,
      destroyonclose: true,
      menu: {
        name: '',
        path:''
      },
      rules: {
        name: {required: true, min: 2, max: 10, message: '请输入名称,长度在2到10个字符', trigger: 'blur'},
        path: {required: true, min: 3, max: 30, message: '请输入路径,长度在3到30个字符', trigger: 'blur'}

      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/admin/index/update', this.menu)
              .then((res) => {
                if (res.data.code == 1) {
                  this.$notify.success({
                    title: "修改成功",
                    message: "已成功保存了一条商品分类信息！页面将在3S后刷新！"
                  })
                  this.dialogVisible = false
                  this.$emit("editSuccess")
                } else {
                  this.$message.error(res.data.msg)
                }
              })
        } else {
          this.$message.error('请检查所填写的菜单信息！')
          return false;
        }
      });
    },
    async getMenuinfo() {
      this.axios.get("/admin/index/get/" + this.menuId)
          .then(res => {
            if (res.data.code == 1) {
              this.menu = res.data.data
            } else {
              this.$message.error("获取菜单信息失败！")
            }
          })
    }
  }
}
</script>

<style scoped>

</style>