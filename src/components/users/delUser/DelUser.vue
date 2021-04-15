<template>
  <el-button
      type="danger"
      @click="deleteUser()"
      icon="el-icon-delete"
      size="mini"
  ></el-button>
</template>

<script>
export default {
  name: "DelUser",
  props: {
    userId: String
  },
  methods: {
    deleteUser() {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(async () => {
            const {data} = await this.axios.delete("/admin/user/del/" + this.userId);
            if (data.code == 1) {
              this.$notify.success({
                title: "删除成功！",
                message: "已成功删除一条用户信息!"
              });
              this.$emit("delSuccess")
            } else {
              this.$notify.error({
                title: "删除失败！",
                message: "删除用户信息失败!"
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
    },
  }
}
</script>

<style scoped>

</style>