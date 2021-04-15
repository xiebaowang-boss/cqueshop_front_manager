<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <AddCategory @addSuccess="getCategoryList($event)"/>
        </el-col>
      </el-row>
      <el-table :data="categoryList" border stripe style="width: 100%" height="640">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
                active-color="#13ce66"
                inactive-color="red"
                v-model="scope.row.status"
                :active-value="activeValue"
                :inactive-value="inactiveValue"
                @change="categoryStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 编辑用户 -->
            <EditCategory style="float: left" :category-id="scope.row.id" @editSuccess="getCategoryList($event)"/>
            <!-- 删除用户 -->
            <DelCategory style="float: left;margin-left: 10px" :category-id="scope.row.id" @delSuccess="getCategoryList($event)"/>
          </template>
        </el-table-column>
      </el-table>
      <Pageinfo :total="total" @updatePageInfo="updatePageInfo($event)"/>
    </el-card>

  </div>
</template>

<script>
import Pageinfo from "@/components/pageInfo/pageinfo";
import EditCategory from "@/components/category/editCategory/EditCategory";
import DelCategory from "@/components/category/delCategory/DelCategory";
import AddCategory from "@/components/category/addCategory/AddCategory";
export default {
  components: {AddCategory, DelCategory, EditCategory, Pageinfo},
  data() {
    return {
      activeValue: 1,
      inactiveValue: 0,
      imageServerPath: this.$GLOBAL.imgServerPath,
      categoryList: [],
      total: 0,
      pageInfo: {},
      query: ''
    };
  },
  methods: {
    async getCategoryList() {
      const { data } = await this.axios.get("/admin/category/getAll", {params:{ pageSize: this.pageInfo.pageSize,currentPage: this.pageInfo.currentPage}});
      this.categoryList = data.data.list;
      this.total = data.data.total;
    },
    async categoryStateChanged(category) {
      const { data } = await this.axios.get("/admin/category/updateStatus", {params:{catId: category.id,status: category.status}})
      if (data.code == 1) {
        this.$notify.success({
          title: "更新成功！",
          message: "更新商品分类@"+category.categoryName+"状态成功！"
        })
      }else{
        this.$notify.error({
          title: "更新失败！",
          message: "更新商品分类@"+category.categoryName+"状态失败！"
        })
      }
    },
    updatePageInfo(pageInfo) {
      this.pageInfo = pageInfo
      this.getCategoryList()
    }
  }
};
</script>

<style lang="less" scoped></style>
