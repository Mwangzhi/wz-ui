<template>
  <div class="wz-date-picker" v-click-outside="handleBlur">
    <wz-input suffix-icon="rili" @focus="handleFocus" :value="formateDate" @change="handleChange"></wz-input>
    <div class="wz-date-content" v-if="isVisible">
      <div class="wz-date-picker-head">
        <wz-icon icon="prev" @click="changeYear(-1)"></wz-icon>
        <wz-icon icon="left" @click="changeMonth(-1)"></wz-icon>

        <span>{{tempTime.year}}年{{tempTime.month+1}}月</span>

        <wz-icon icon="right" @click="changeMonth(1)"></wz-icon>
        <wz-icon icon="next" @click="changeYear(1)"></wz-icon>
      </div>
      <div class="wz-date-picker-content">
        <template v-if="mode==='dates'">
          <div>
            <span v-for="week in weeks" :key="week" class="cell">{{week}}</span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span
              v-for="j in 7"
              :key="`col_${j}`"
              class="cell cell-dates"
              @click="selectDate(getCurrentDate(i,j))"
              :class="{isNotCurrentMonth:!isCurrentMonth(getCurrentDate(i,j)),
              isToday:isToday(getCurrentDate(i,j)),
              isSelect:isSelect(getCurrentDate(i,j))
              }"
            >{{getCurrentDate(i,j).getDate()}}</span>
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
        return `${year}-${String(month + 1).padStart(2, 0)}-${String(
          day
        ).padStart(2, 0)}`;
      }
    },
    visibleData() {
      let firstDay = new Date(this.tempTime.year, this.tempTime.month, 1);
      let weekDay = firstDay.getDay();
      weekDay = weekDay === 0 ? 7 : weekDay;
      let start = firstDay - weekDay * 60 * 60 * 24 * 1000;
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    }
  },
  methods: {
    handleFocus() {
      this.isVisible = true;
    },
    handleBlur() {
      this.isVisible = false;
    },
    getCurrentDate(i, j) {
      return this.visibleData[(i - 1) * 7 + (j - 1)];
    },
    isCurrentMonth(date) {
      let { year, month } = this.tempTime;
      let [y, m] = getYearMonthDay(date);
      return year === y && month === m;
    },
    isToday(date) {
      let [y, m, d] = getYearMonthDay(new Date(date));
      let [year, month, day] = getYearMonthDay(new Date());
      return year == y && month === m && day === d;
    },
    selectDate(date) {
      this.$emit("input", date);
      this.handleBlur();
    },
    isSelect(date) {
      let { year, month, day } = this.time;
      let [y, m, d] = getYearMonthDay(date);
      return year === y && m === month && d === day;
    },
    changeMonth(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() + count);
      let [year, month] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    },
    changeYear(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count);
      let [year] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
    },
    handleChange(e) {
      let newValue = e.target.value;
      let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      if (newValue.match(regExp)) {
        this.$emit("input", new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3));
      } else {
        e.target.value = this.formateDate;
      }
      this.handleBlur();
    }
  },
  watch: {
    value(newValue) {
      let [year, month, day] = getYearMonthDay(newValue);
      this.time = { year, month, day };
      this.tempTime = { ...this.time };
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
    font-weight: 200;
  }
  .isNotCurrentMonth {
    color: #ccc;
  }
  .cell-dates:hover:not(.isNotCurrentMonth):not(.isSelect) {
    color: $primary;
  }
  .isToday {
    color: $primary;
    font-weight: bold;
    border-radius: 50%;
  }
  .isSelect {
    color: #fff;
    background: $primary;
    border-radius: 50px;
  }
}
</style>