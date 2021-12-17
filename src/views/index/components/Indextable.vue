<template>
  <div class="indexTable">
    <el-table
      :data="tableData"
      element-loading-text="Loading"
      :row-style="rowStyle"
      height="210px"
      :header-row-style="getRowClass"
      :header-cell-style="getRowClass"
    >
      <el-table-column prop="projectName" label="项目名称" />
      <el-table-column prop="taskProductionType" label="生产类型" />
      <el-table-column prop="taskSupplyTime" label="供货时间" />
      <el-table-column prop="taskPlannedQuantity" label="供货数量" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.taskStatus == 0">未排成</div>
          <div v-if="scope.row.taskStatus == 1">已排程</div>
          <div v-if="scope.row.taskStatus == 2">正供</div>
          <div v-if="scope.row.taskStatus == 3">已完成</div>
          <div v-if="scope.row.taskStatus == 4">审核中</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from "@/api/table";

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  watch: {
    arr() {
      this.tableData = this.arr.mTask
    }
  },
  methods: {
    getRowClass() {
      return { background: 'transparent', lineHeight: '35px' }
    },
    rowStyle({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return {
          background: 'linear-gradient(90deg,rgba(48,129,192,0) 0%,rgba(48,129,192,1) 50%,rgba(48,129,192,0) 100%) !important',
          borderCollapse: 'collapse'
        }
      } else {
        return { background: 'rgba(255, 255, 255, 0.03) !important',
          display: 'table-row',
          padding: '0 0 10px 0' }
      }
    }
  }
}
</script>

<style lang="scss">
.indexTable{
.app-container {
  width: 100%;
  height: 100%;
}
.el-table {
  width: 545px;
}

.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
.el-table th {
  border-bottom: 1px solid transparent;
  padding: 0;
  height: 20px;
  color: rgba(255, 255, 255, 1);
  background-color: transparent !important;
}
.el-table tr {
  background-color: transparent;
}
.el-table tr td {
  padding: 0;
  height: 30px;
  line-height: 25px;
  background-color: transparent;
}
.el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  border: none;
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-size: 12px;
  text-align: center;
}
.el-table th > .cell {
  color: rgba(255, 255, 255, 1);
  font-weight: 700;
}
.el-table::before {
  //去除底部白线
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

// <!-- 鼠标移入需要改变样式-->
.el-table tbody tr:hover > td {
  background-color: transparent !important;
}

// 表格颜色
.el-table td,
.el-table th.is-leaf {
  border: 0 !important;
  font-family: ArialMT;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: rgba(255, 255, 255, 1);
}
.el-table td, .el-table th.is-leaf{
 border-bottom: 0 !important;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
}
// 分页器颜色

.el-pagination .el-input__inner,
.el-pagination__jump,
.el-pagination__total {
  background-color: transparent !important;
  color: #fff;
}
.el-pagination .btn-next,
.el-pagination .btn-prev,
.el-dialog,
.el-pager li {
  background: transparent;
}
.operation {
  display: flex;
  div > {
    width: 60px;
    cursor: pointer;
    color: rgba(179, 179, 179, 1);
  }
  div:hover > {
    width: 60px;
    cursor: pointer;
    color: rgba(217, 245, 255, 1);
  }
}

.el-form-item {
  display: flex;
}
.el-form-item__label {
  width: 70px;
}
.el-form-item__content {
  width: 80%;
}
}
</style>
