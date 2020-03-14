<template>
  <div
    class="wz-upload-dragger"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <wz-icon icon="shangchuan" class="icon"></wz-icon>
    <span>将文件拖拽到此区域</span>
  </div>
</template>

<script>
export default {
  name: "wz-dragger",
  methods: {
    onDrop(e) {
      if (!this.accept) {
        this.$emit("file", e.dataTransfer.files);
      } else {
        // [...e.dataTransfer.files].filter(file=>file.name.endsWith())
        this.$emit("file", e.dataTransfer.files);
      }
    }
  }
};
</script>

<style lang="scss">
.wz-upload-dragger {
  background: #eee;
  border: 1px solid #aaa;
  width: 360px;
  height: 180px;
  line-height: 180px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .icon {
    width: 65px;
    height: 65px;
    margin: 65px auto 10px;
  }
}
</style>