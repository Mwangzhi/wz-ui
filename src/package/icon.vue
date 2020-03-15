<template>
  <svg class="wz-icon" aria-hidden="true" @click="$emit('click',$event)">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
import "../styles/icon";
export default {
  name: "wz-icon",
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.wz-icon {
  width: 25px;
  height: 16px;
  vertical-align: middle;
}
</style>