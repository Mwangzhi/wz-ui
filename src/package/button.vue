<template>
  <button class="wz-button" :class="btnClass" :disabled="loading" @click="$emit('click',$event)">
    <!-- 普通icon -->
    <wz-icon :icon="icon" v-if="icon" class="icon"></wz-icon>
    <!-- loading的icon -->
    <wz-icon icon="loading" v-if="loading" class="icon"></wz-icon>
    <!-- 文本内容 -->
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "wz-button",
  props: {
    type: {
      type: String,
      default: "",
      validator(type) {
        if (
          type &&
          !["warning", "success", "danger", "primary", "info"].includes(type)
        ) {
          console.error(
            "type类型必须为:" +
              ["warning", "success", "danger", "primary", "info"].join("、")
          );
        }
        return true;
      }
    },
    icon: {
      type: String,
      default: ""
    },
    iconPosition: {
      type: String,
      default: "left",
      validator(type) {
        if (!["left", "right"].includes(type)) {
          console.error("icon-position的属性必须为:left|right");
        }
        return true;
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      let classes = [];
      if (this.type) {
        classes.push(`wz-button-${this.type}`);
      }
      if (this.iconPosition) {
        classes.push(`wz-button-${this.iconPosition}`);
      }
      return classes;
    }
  }
};
</script>

<style lang="scss">
@import "../styles/_var.scss";
$height: 42px;
$font-size: 16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;
.wz-button {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  height: $height;
  font-size: $font-size;
  cursor: pointer;
  line-height: 1;
  padding: 12px 20px;
  display: inline-flex;
  justify-content: center;
  vertical-align: center;
  user-select: none;
  // box-sizing: border-box;
  &:hover {
    border-color: $border-color;
    background-color: $border-color;
  }
  &:focus,
  &:active {
    color: $active-color;
    border: 1px solid $active-color;
    outline: none;
    background-color: $background;
  }
  @each $type,
    $color
      in (
        primary: $primary,
        success: $success,
        info: $info,
        warning: $warning,
        danger: $danger
      )
  {
    &-#{$type} {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
      fill: #fff;
    }
  }
  @each $type,
    $color
      in (
        primary: $primary-hover,
        success: $success-hover,
        info: $info-hover,
        warning: $warning-hover,
        danger: $danger-hover
      )
  {
    &-#{$type}:hover {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  @each $type,
    $color
      in (
        primary: $primary-active,
        success: $success-active,
        info: $info-active,
        warning: $warning-active,
        danger: $danger-active
      )
  {
    &-#{$type}:active,
    &-#{$type}:focus {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  .icon {
    width: 16px;
    height: 16px;
  }
  .icon + span {
    margin-left: 4px;
  }
  &-left {
    span {
      order: 2;
    }
    svg {
      order: 1;
    }
  }
  &-right {
    span {
      order: 1;
      margin-left: 0px;
      margin-right: 4px;
    }
    svg {
      order: 2;
    }
  }
  &[disabled] {
    cursor: not-allowed;
  }
}
</style>