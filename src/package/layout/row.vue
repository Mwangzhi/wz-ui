<template>
  <div class="wz-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "wz-row",
    props: {
      gutter: {
        type: Number,
        default: 0
      },
      justify: {
        type: String,
        validator(type) {
          let value = ['start', 'end', 'space-between', 'space-around', 'center'];
          if (type && !value.includes(type)) {
            console.err('类型必须是:' + value.join(','))
          }
          return true;
        }
      }
    },
    mounted() {
      this.$children.forEach(child => {
        child.gutter = this.gutter;
      })
    },
    computed: {
      rowStyle() {
        let style = {};
        if (this.gutter) {
          style = {
            ...style,
            marginLeft: -this.gutter / 2 + 'px',
            marginRight: -this.gutter / 2 + 'px'
          }
        }
        if (this.justify) {
          let key = ['start', 'end'].includes(this.justify) ? 'flex-' + this.justify : this.justify;
          style = {
            ...style,
            justifyContent: key
          }
        }
        return style;
      }
    }
  };
</script>

<style lang="scss">
  .wz-row {
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
  }
</style>