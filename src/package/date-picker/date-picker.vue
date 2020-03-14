<template>
  <div class="wz-date-picker" v-click-outside="handleBlur">
    <wz-input suffix-icon="rili" @focus="handleFocus" :value="formateDate"></wz-input>
    <div class="wz-date-content" v-if="isVisible">
      <div class="wz-date-picker-head">
        <wz-icon icon="prev"></wz-icon>
        <wz-icon icon="left"></wz-icon>

        <span>{{tempTime.year}}年{{tempTime.month+1}}月</span>

        <wz-icon icon="right"></wz-icon>
        <wz-icon icon="next"></wz-icon>
      </div>
      <div class="wz-date-picker-content">
        <template v-if="mode==='dates'">
          <div>
            <span v-for="week in weeks" :key="week" class="cell">{{week}}</span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span v-for="j in 7" :key="`col_${j}`" class="cell">1</span>
          </div>
        </template>
        <template v-if="mode==='years'">years</template>
        <template v-if="mode=='months'">months</template>
      </div>
    </div>
  </div>
</template>

<script>
import clickOutSide from "v-click-outside";
function getYearMonthDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return [year, month, day];
}
export default {
  name: "wz-date-picker",
  directives: {
    clickOutside: clickOutSide.directive
  },
  data() {
    let [year, month, day] = getYearMonthDay(this.value || new Date());
    return {
      isVisible: false,
      mode: "dates",
      time: {
        year,
        month,
        day
      },
      tempTime: {
        year,
        month,
        day
      },
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    };
  },
  props: {
    value: {
      type: [String, Date],
      default: () => new Date()
    }
  },
  computed: {
    formateDate() {
      if (this.value) {
        let { year, month, day } = this.time;
        return `${year}年${month + 1}月${day}日`;
      }
    }
  },
  methods: {
    handleFocus() {
      this.isVisible = true;
    },
    handleBlur() {
      this.isVisible = false;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.wz-date-picker {
  display: inline-block;
  .wz-date-content {
    position: absolute;
    z-index: 10;
    user-select: none;
    width: 280px;
    background: #fff;
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
    .wz-date-picker-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
    }
  }
  .cell {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }
}
</style>