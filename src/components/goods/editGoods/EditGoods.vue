<template>
  <div>
    <el-button
        type="primary"
        icon="el-icon-edit"
        @click="uploadGoodsFormVisible = true"
        size="mini"
    ></el-button>
    <el-dialog title="修改商品信息" :visible.sync="uploadGoodsFormVisible" @open="openDialog">
      <el-form :model="goodsInfo" :rules="rules" ref="goodsInfo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input v-model="goodsInfo.desc"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="goodsInfo.category.id" @change="selectChange" placeholder="请选择商品分类">
            <el-option v-for="(category,index) in categoryList" :key="index" :label="category.categoryName"
                       :value="category.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="商品原价" prop="oriprice">
          <el-input type="number" v-model="goodsInfo.oriprice"></el-input>
        </el-form-item>
        <el-form-item label="商品现价" prop="oriprice">
          <el-input type="number" v-model="goodsInfo.oriprice"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('goodsInfo')">立即保存</el-button>
          <el-button @click="uploadGoodsFormVisible=false">取  消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditGoods",
  props: {
    goodsId: String
  },
  data() {
    return {
      destroyonclose: true,
      uploadGoodsFormVisible: false,
      categoryList: [],
      goodsInfo: {
        name: '',
        desc: '',
        image: null,
        oriprice: '',
        category: {
          id: ''
        }
      },
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        oriprice: [
          {required: true, message: '请输入商品价格', trigger: 'change'}
        ],
        category: [
          {required: true, message: '请选择商品类别', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请输入商品描述', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    acceptGoodsImage(data) {
      this.goodsInfo.image = data
    },
    getAllCategory() {
      this.axios.get("/category/getAllEnabled")
          .then(res => {
            this.categoryList = res.data.data;
          })
    },
    openDialog() {
      this.getAllCategory()
      this.getGoods()
    },
    getGoods() {
      this.axios.get("/goods/" + this.goodsId)
          .then(res => {
            if (res.data.code == 1) {
              this.goodsInfo = res.data.data
            } else {
              this.$message.error("未获取到商品！")
            }
          })
    },
    selectChange() {
      this.$forceUpdate()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/admin/goods/update", this.goodsInfo)
              .then(res => {
                console.log(res.data.code)
                this.uploadGoodsFormVisible = false
                if (res.data.code == 1) {
                  this.$notify.success({
                    title: "修改成功",
                    message: "成功保存了一条商品信息！"
                  })
                  this.$emit("editSuccess")
                } else {
                  this.$notify.error({
                    title: "修改失败",
                    message: "修改商品信息失败！"
                  })
                }
              })
        } else {
          this.$message.warning("请检查所填写的商品信息！")
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>