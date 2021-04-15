<template>
  <div>
    <div style="text-align: center;margin-top: 50px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageinfo.currentPage"
          :page-sizes="[5,10,20]"
          background
          :page-size="pageinfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageinfo",
  props:{
    total:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageinfo:{
        currentPage:1,
        pageSize:5
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageinfo.pageSize = val
      this.updatePageInfo()
    },
    handleCurrentChange(val) {
      this.pageinfo.currentPage = val
      this.updatePageInfo()
    },
    updatePageInfo(){
        this.$emit("updatePageInfo",this.pageinfo)
    }
  },
  created() {
    this.updatePageInfo()
  }
}
</script>

<style scoped>

</style>