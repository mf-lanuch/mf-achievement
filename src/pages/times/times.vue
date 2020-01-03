<template>
    <div class="app-container">
        <el-table :data="records" style="width: 100%">
            <el-table-column type="index" align="center" label="序号"></el-table-column>
            <el-table-column prop="magValue" align="center" label="倍率"></el-table-column>
            <el-table-column align="center" label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.workDateType === 3">节假日</span>
                    <span v-if="scope.row.workDateType === 2">周末</span>
                    <span v-if="scope.row.workDateType === 1">工作日</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <span @click="handleClick(scope.row)" class='option'>管理</span>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改倍率" :visible.sync="dialogVisible" width="30%">
            <el-input v-model="detail.magValue" placeholder="请输入倍率"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateMfMagnification">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {listMfMagnification, updateMfMagnification} from '../../api/index'
export default {
  name: 'times',
  data () {
    return {
      records: [],
      dialogVisible: false,
      detail: {}
    }
  },
  methods: {
    listMfMagnification () {
      let that = this
      listMfMagnification().then(response => {
        that.records = response.data.object
      })
    },
    updateMfMagnification () {
      let that = this
      updateMfMagnification(this.detail).then(response => {
        that.dialogVisible = false
        that.listMfMagnification()
      })
    },
    handleClick (obj) {
      console.log(obj)
      this.dialogVisible = true
      this.detail = obj
    }
  },
  created () {
    this.listMfMagnification()
  }
}
</script>
<style lang='scss' scoped>
.option {
    color: #32BBFF;
    cursor: pointer;
}
</style>
