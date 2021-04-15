<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <AddMenu @addSuccess="addSuccess($event)"/>
        </el-col>
      </el-row>
      <el-table :data="menuList" border stripe style="width: 100%" height="700" @expand-change="expandChange">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.menuItems" border stripe style="width: 100%">
              <el-table-column prop="name" label="菜单名称"></el-table-column>
              <el-table-column prop="path" label="菜单路由"></el-table-column>
              <el-table-column label="菜单状态">
                <template v-slot="scope">
                  <el-switch
                      active-color="#13ce66"
                      inactive-color="red"
                      v-model="scope.row.status"
                      :active-value="activeValue"
                      :inactive-value="inactiveValue"
                      @change="adminMenuStateChanged(scope.row)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                  <!-- 编辑菜单 -->
                  <EditMenu style="float: left;margin-left: 10px" :menu-id="scope.row.id" @editSuccess="editSuccess($event)"/>
                  <!-- 删除菜单 -->
                  <DelMenu style="float: left;margin-left: 10px" :menu-id="scope.row.id" @delSuccess="delSuccess($event)"/>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="菜单名称"></el-table-column>
        <el-table-column label="菜单状态">
          <template v-slot="scope">
            <el-switch
                active-color="#13ce66"
                inactive-color="red"
                v-model="scope.row.status"
                :active-value="activeValue"
                :inactive-value="inactiveValue"
                @change="adminMenuStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <AddMenuitem style="float: left" :parent-name="scope.row.name" :parent-id="scope.row.id" @addSuccess="addSuccess($event)"/>
            <!-- 编辑菜单 -->
            <EditMenu style="float: left;margin-left: 10px" :menu-id="scope.row.id" @editSuccess="editSuccess($event)"/>
            <!-- 删除菜单 -->
            <DelMenu style="float: left;margin-left: 10px" :menu-id="scope.row.id" @delSuccess="delSuccess($event)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import AddMenu from "@/components/adminMenu/addMenu/AddMenu";
import EditMenu from "@/components/adminMenu/editMenu/EditMenu";
import DelMenu from "@/components/adminMenu/delMenu/DelMenu";
import AddMenuitem from "@/components/adminMenu/addMenu/AddMenuitem";
export default {
  components: {AddMenuitem, DelMenu, EditMenu, AddMenu},
  data() {
    return {
      activeValue: 1,
      inactiveValue: 0,
      menuList: []
    };
  },
  methods: {
    async getMenuList() {
      const { data } = await this.axios.get("/admin/index/manageAdminMenu");
      this.menuList = data.data;
    },
    async adminMenuStateChanged(adminmenu) {
      const { data } = await this.axios.get("/admin/index/updateMenuStatus", {params:{id: adminmenu.id,status: adminmenu.status}})
      if (data.code == 1) {
        this.$notify.success({
          title: "更新成功！",
          message: "更新菜单@"+adminmenu.name+"状态成功！"
        })
        this.reloadPage()
      }else{
        this.$notify.error({
          title: "更新失败！",
          message: "更新菜单@"+adminmenu.name+"状态失败！"
        })
      }
    },
    addSuccess(){
      setTimeout(this.reloadPage,3000)
    },
    editSuccess(){
      setTimeout(this.reloadPage,3000)
    },
    delSuccess(){
      setTimeout(this.reloadPage,3000)
    },
    reloadPage(){
      location.reload()
    }
  },
  created() {
    this.getMenuList()
  }
};
</script>

<style lang="less" scoped></style>
