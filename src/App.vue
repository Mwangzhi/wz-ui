<template>
  <div id="app">
    <wz-upload
      name="avatar"
      action="http://localhost:3000/upload"
      :limit="3"
      accept="image/jpeg"
      :multiple="true"
      :drag="true"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <wz-button icon="shangchuan" type="primary">点击上传</wz-button>
      <div slot="tip">只能上传jpg文件，且大小不能超过500k</div>
    </wz-upload>
    <Boundary />
    <div style="margin:0 auto; width:200px">
      <wz-date-picker v-model="value1"></wz-date-picker>
    </div>
    <!-- <wz-date-range-picker v-model="value2"></wz-date-range-picker> -->
  </div>
</template>

<script>
import Boundary from "./package/boundary";
export default {
  name: "App",
  data() {
    return {
      fileList: [
        // { url: "xxx", name: "wangzhi" }
      ],
      value1: '',
      value2: []
    };
  },
  components: { Boundary },
  methods: {
    handleExceed(files, fileList) {
      console.log(files, fileList);
    },
    handleChange(file) {
      console.log(file);
    },
    handleSuccess() {},
    handleError() {},
    handleProgress() {},
    beforeUpload(rawFile) {
      let limitSize = rawFile.size / 1024 / 500 > 500;
      if (limitSize) {
        console.log("当前超过了最大限制");
        return false;
      } else if (!rawFile.name.endsWith(".jpg")) {
        console.log("文件类型不对");
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss">
</style>

