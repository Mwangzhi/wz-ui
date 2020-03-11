<template>
  <div class="wz-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "wz-col",
    data() {
      return { gutter: 0 }
    },
    props: {
      span: {
        type: Number,
        default: 24
      },
      offset: {
        type: Number,
        default: null
      }
    },
    computed: {
      colClass() {
        let classes = [];
        classes.push(`wz-col-${this.span}`);
        if (this.offset) {
          classes.push(`wz-col-offset-${this.offset}`);
        }
        return classes;
      },
      colStyle() {
        let style = {};
        if (this.gutter) {
          style = {
            ...style,
            paddingLeft: this.gutter / 2 + 'px',
            paddingRight: this.gutter / 2 + 'px'
          }
        }
        return style;
      }
    }
  };
</script>

<style lang="scss">
  @for $i from 1 through 24 {
    .wz-col-#{$i} {
      width: $i/24*100%;
    }

    .wz-col-offset-#{$i} {
      margin-left: $i/24*100%;
    }
  }
</style>