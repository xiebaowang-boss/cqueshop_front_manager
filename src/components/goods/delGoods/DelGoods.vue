<template>
  <el-button
      type="danger"
      icon="el-icon-delete"
      @click="removeGoods"
      size="mini"
  ></el-button>
</template>

<script>
export default {
  name: "delGoods",
  props: {
    goodsId: String
  },
  methods: {
    removeGoods() {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(async () => {
            const {data} = await this.axios.delete(`/admin/goods/del/${this.goodsId}`);
            if (data.code == 1) {
              this.$emit("delSuccess")
              return this.$notify.success({
                title: "删除成功！",
                message: "成功删除了一条商品信息！"
              });
            } else {
              this.$notify.error({
                title: "删除失败",
                message: "删除商品信息失败!"
              })
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