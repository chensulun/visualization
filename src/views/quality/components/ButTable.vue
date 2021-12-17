<template>
  <div class="ButTable">
    <el-table
      :data="tableData"
      element-loading-text="Loading"
      :row-style="rowStyle"
      height="365px"
      :header-row-style="getRowClass"
      :header-cell-style="getRowClass"
    >
      <el-table-column prop="one_S" label="仓1">
        <template slot-scope="scope">
          <div
            v-html="createHtml(scope.row.one_S, 'one_S', 'oneMin', 'oneMax')"
          />
        </template>
      </el-table-column>
      <el-table-column prop="two_S" label="仓2">
        <template slot-scope="scope">
          <div
            v-html="createHtml(scope.row.two_S, 'two_S', 'twoMin', 'twoMax')"
          />
        </template>
      </el-table-column>
      <el-table-column prop="three_S" label="仓3">
        <template slot-scope="scope">
          <div
            v-html="
              createHtml(scope.row.three_S, 'three_S', 'threeMin', 'threeMax')
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="four_S" label="仓4">
        <template slot-scope="scope">
          <div
            v-html="
              createHtml(scope.row.four_S, 'four_S', 'fourMin', 'fourMax')
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="five_S" label="仓5">
        <template slot-scope="scope">
          <div
            v-html="
              createHtml(scope.row.five_S, 'five_S', 'fiveMin', 'fiveMax')
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="six_1_S" label="仓6">
        <template slot-scope="scope">
          <div
            v-html="
              createHtml(scope.row.six_1_S, 'six_1_S', 'sixMin', 'sixMax')
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="zsl" label="仓7">
        <template slot-scope="scope">
          <div v-html="createHtml(scope.row.zsl, 'zsl', 'zslMin', 'zslMax')" />
        </template>
      </el-table-column>
      <el-table-column prop="six_S" label="粉1">
        <template slot-scope="scope">
          <div
            v-html="createHtml(scope.row.six_S, 'six_S', 'sixMin', 'sixMax')"
          />
        </template>
      </el-table-column>
      <el-table-column prop="seven_S" label="粉2">
        <template slot-scope="scope">
          <div
            v-html="
              createHtml(scope.row.seven_S, 'seven_S', 'sevenMin', 'sevenMax')
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="eight" label="沥青">
        <template slot-scope="scope">
          <div
            v-html="
              createHtml(scope.row.eight_S, 'eight_S', 'eightMin', 'eightMax')
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="ysb" label="油石比">
        <template slot-scope="scope">
          <div v-html="createHtml(scope.row.ysb, 'ysb', 'ysbMin', 'ysbMax')" />
        </template>
      </el-table-column>
      <el-table-column prop="dateTime" label="时间" width="120px" />
      <el-table-column prop="guanci" label="盘次" />
    </el-table>
  </div>
</template>

<script>
// import { getList } from "@/api/table";
let that;
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object,
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    arr() {
      console.log(this.arr);
      this.tableData = this.arr.practicals;
      console.log(this.tableData[7]);
    },
  },
  created() {
    this.$nextTick(() => {
      that = this;
    });
  },
  methods: {
    createHtml(value, name, min, max) {
      if (that.arr.qualityParameters == undefined) {
        return value
      } else {
        const data = that.arr.designs[0]
        // console.log(that.arr.qualityParameters[max])
        // console.log(that.arr.qualityParameters[min])
        const num = value - data[name]
        if (num > that.arr.qualityParameters[max]) {
          return `<div style="color:red">${value}</div>`
        } else if (num < that.arr.qualityParameters[min]) {
          return `<div style="color:Lime">${value}</div>`
        } else {
          return `<div>${value}</div>`
        }
      }
    },
    getRowClass() {
      return { background: "transparent", lineHeight: "35px" };
    },
    rowStyle({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return {
          background:
            " linear-gradient(90deg,rgba(48,129,192,0) 0%,rgba(48,129,192,1) 50%,rgba(48,129,192,0) 100%) !important",
          borderCollapse: "collapse",
        };
      } else {
        return {
          background: "rgba(255, 255, 255, 0.03) !important",
          display: "table-row",
          padding: "0 0 10px 0",
        };
      }
    },
  },
};
</script>

<style lang="scss">
.ButTable {
  .app-container {
    width: 100%;
    height: 100%;
  }
  .el-table {
    width: 1100px;
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
  .el-table td,
  .el-table th.is-leaf {
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
