<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
              placeholder="请输入内容"
              clearable
              @clear="getGoodsList"
              v-model="query"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <AddGoods @addSuccess="getGoodsList($event)"/>
        </el-col>
      </el-row>
      <el-table :data="goodsList" stripe border style="width: 100%" height="640">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="图片">
          <template v-slot="scope">
            <el-image
                style="width: 140px; height: 100px;margin: auto"
                :src="imgServerPath+scope.row.image.url"
                fit="contain"
                :preview-src-list=[imgServerPath+scope.row.image.url]
            ></el-image>
          </template>

        </el-table-column>

        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="category.categoryName" label="商品类别"></el-table-column>
        <el-table-column
            prop="oriprice"
            label="商品原价（元）"
            width="95px"
        ></el-table-column>
        <el-table-column
            prop="nowprice"
            label="商品现价（元）"
            width="95px"
        ></el-table-column>
        <el-table-column
            label="创建时间"
        >
          <template v-slot="scope">
            <span>{{ scope.row.createtime | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
            prop="lastupdatetime"
            label="上次更新时间"
        >
          <template v-slot="scope">
            <span>{{ scope.row.lastupdatetime | formatDate }}</span>
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
                @change="goodsStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="salesVolume"
            label="销量"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <EditGoods @editSuccess="getGoodsList($event)" style="float: left" :goods-id="scope.row.id"/>
            <DelGoods @delSuccess="getGoodsList($event)" style="float: left;margin-left: 10px"
                      :goods-id="scope.row.id"/>
          </template>
        </el-table-column>
      </el-table>
      <Pageinfo :total="total" @updatePageInfo="updatePageInfo($event)"/>
    </el-card>
  </div>
</template>

<script>
import Pageinfo from "@/components/pageInfo/pageinfo";
import DelGoods from "@/components/goods/delGoods/DelGoods";
import AddGoods from "@/components/goods/addGoods/AddGoods";
import EditGoods from "@/components/goods/editGoods/EditGoods";

export default {
  components: {EditGoods, AddGoods, DelGoods, Pageinfo},
  data() {
    return {
      imgServerPath: this.$GLOBAL.imgServerPath,
      pageInfo: {},
      query: '',
      goodsList: [],
      total: 0,
      activeValue: 1,
      inactiveValue: 0,
    };
  },
  methods: {
    updatePageInfo(pageInfo) {
      this.pageInfo = pageInfo;
      this.getGoodsList()
    },
    async getGoodsList() {
      const {data} = await this.axios.post("/admin/goods/getAll" + this.query, this.pageInfo);
      if (data.code == 1) {
        this.goodsList = data.data.list
        this.total = data.data.total;
      } else {
        this.$notify.error({
          title: "失败！",
          message: "获取商品信息失败！"
        })
      }
    },
    async goodsStateChanged(goodsinfo) {
      const {data} = await this.axios.get("/admin/goods/updateGoodsStatus", {
        params: {
          goodsId: goodsinfo.id,
          status: goodsinfo.status
        }
      })
      if (data.code == 1) {
        this.$notify.success({
          title: "更新成功！",
          message: "更新商品@" + goodsinfo.name + "状态成功！"        })
      } else {
        this.$notify.error({
          title: "更新失败！",
          message: "更新商品@" + goodsinfo.name + "状态失败！"
        })
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
