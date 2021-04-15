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
        title="编辑商品分类信息"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="destroyonclose"
        @open="getCategoryinfo"
    >
      <el-form
          :status-icon="status_icon"
          label-position="right"
          :model="category" :rules="rules" ref="category" label-width="200px" class="demo-ruleForm">
        <el-form-item label="商品分类名称" prop="categoryName">
          <el-input v-model="category.categoryName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('category')">保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditCategory",
  props: {
    categoryId: String
  },
  data() {
    return {
      status_icon: true,
      dialogVisible: false,
      destroyonclose: true,
      category: {
        categoryName: '',
      },
      rules: {
        categoryName: {required: true, min: 2, max: 10, message: '请输入名称,长度在2到10个字符', trigger: 'blur'}
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/admin/category/update', this.category)
              .then((res) => {
                if (res.data.code == 1) {
                  this.$notify.success({
                    title: "修改成功",
                    message: "已成功保存了一条商品分类信息！"
                  })
                  this.dialogVisible = false
                  this.$emit("editSuccess")
                } else {
                  this.$message.error(res.data.msg)
                }
              })
        } else {
          this.$message.error('请检查所填写的商品分类信息！')
          return false;
        }
      });
    },
    async getCategoryinfo() {
      this.axios.get("/admin/category/get/" + this.categoryId)
          .then(res => {
            if (res.data.code == 1){
              this.category = res.data.data
            }else{
              this.$message.error("获取商品分类信息失败！")
            }
          })
    }
  }
}
</script>

<style scoped>

</style>