<template>
  <el-button
      type="danger"
      @click="deleteMenu"
      icon="el-icon-delete"
      size="mini"
  ></el-button>
</template>

<script>
export default {
  name: "DelMenu",
  props: {
    menuId: String
  },
  methods: {
    deleteMenu() {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(async () => {
            const {data} = await this.axios.delete("/admin/index/del/" + this.menuId);
            if (data.code == 1) {
              this.$notify.success({
                title: "删除成功！",
                message: "已成功删除一条菜单信息!页面将在3S之后刷新！"
              });
              this.$emit("delSuccess")
            } else {
              this.$notify.error({
                title: "删除失败！",
                message: "删除菜单信息失败!"
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