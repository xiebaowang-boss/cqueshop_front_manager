<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            clearable
            @clear="getUserList"
            v-model="query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <AddUser @addSuccess="getUserList($event)"/>
        </el-col>
      </el-row>
      <el-table :data="userlist" border stripe style="width: 100%" height="640">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="头像" width="80">
          <template v-slot="scope">
            <el-avatar slot="reference" size="large" :src="imageServerPath+scope.row.avatar.url"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色">
          <template v-slot="scope">
            <span v-if="scope.row.role == 1">用户</span>
            <span v-else>管理员</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="scope">
            <span>{{scope.row.createtime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
                active-color="#13ce66"
                inactive-color="red"
              v-model="scope.row.status"
                :active-value="activeValue"
                :inactive-value="inactiveValue"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
              <!-- 编辑用户 -->
              <edit-user style="float: left" @editSuccess="getUserList($event)" :user-id="scope.row.id"/>
              <!-- 删除用户 -->
              <del-user style="float: left;margin-left: 10px" @delSuccess="getUserList($event)" :user-id="scope.row.id"/>
          </template>
        </el-table-column>
      </el-table>
      <Pageinfo :total="total" @updatePageInfo="updatePageInfo($event)"/>
    </el-card>

  </div>
</template>

<script>
import AddUser from "@/components/users/addUser/AddUser";
import EditUser from "@/components/users/editUser/EditUser";
import Pageinfo from "@/components/pageInfo/pageinfo";
import DelUser from "@/components/users/delUser/DelUser";
export default {
  components: {DelUser, Pageinfo, EditUser, AddUser},
  data() {
    return {
      activeValue: 1,
      inactiveValue: 0,
      imageServerPath: this.$GLOBAL.imgServerPath,
      userlist: [],
      total: 0,
      pageInfo: {},
      query: ''
    };
  },
  methods: {
    async getUserList() {
      const { data } = await this.axios.post("/admin/user/getAll"+this.query, this.pageInfo);
      this.userlist = data.data.list;
      this.total = data.data.total;
    },
    async userStateChanged(userinfo) {
      const { data } = await this.axios.post("/admin/user/updateUserStatus", {id: userinfo.id,status: userinfo.status})
      if (data.code == 1) {
        this.$notify.success({
          title: "更新成功！",
          message: "更新用户@"+userinfo.name+"状态成功！"
        })
      }else{
        this.$notify.error({
          title: "更新失败！",
          message: "更新用户@"+userinfo.name+"状态失败！"
        })
      }
    },
    updatePageInfo(pageInfo) {
      this.pageInfo = pageInfo
      this.getUserList()
    }
  }
};
</script>

<style lang="less" scoped></style>
