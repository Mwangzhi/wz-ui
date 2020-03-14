<template>
  <div id="app">
    <wz-upload
      name="avatar"
      action="http://localhost:3000/upload"
      :limit="3"
      accept="image/jpeg"
      :multiple="true"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :file-list="fileList"
    >
      <wz-button icon="shangchuan" type="primary">点击上传</wz-button>
      <div slot="tip">只能上传jpg文件，且大小不能超过500k</div>
    </wz-upload>
  </div>
</template>

<script>
import Boundary from "./package/boundary";
export default {
  name: "App",
  data() {
    return {
      fileList: [
        { url: "xxx", name: "wangzhi" },
        { url: "xxx", name: "wangzhi" }
      ]
    };
  },
  components: { Boundary },
  methods: {
    handleExceed(files,fileList) {
      console.log(files,fileList);
    },
    handleChange() {},
    handleSuccess() {},
    handleError() {},
    handleProgress() {}
  }
};
</script>

<style lang="scss">
</style>
