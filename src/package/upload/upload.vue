
<template>
  <div class="wz-upload">
    <div @click="handleClick" class="wz-upload-btn">
      <slot></slot>
    </div>
    <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
      :name="name"
      ref="input"
    />
    {{files.length}}
    <div>
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script>
import ajax from './ajax.js'
export default {
  name: "wz-upload",
  data() {
    return {
      tempIndex: 1,
      files: []
    };
  },
  props: {
    name: {
      type: String,
      default: "file"
    },
    action: {
      type: String,
      require: true
    },
    accept: String,
    limit: Number,
    multiple: Boolean,
    onExceed: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    beforeUpload: Function,
    fileList: {
      type: Array,
      default: () => []
    },
    httpRequest:{
        type:Function,
        default:ajax
    }
  },
  methods: {
    handleClick() {
      this.$refs.input.value = "";
      this.$refs.input.click();
    },
    handleChange(e) {
      const files = e.target.files;
      this.uploadFile(files);
    },
    uploadFile(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList);
      }
      [...files].forEach(rawFile => {
        this.handleStart(rawFile);
        this.upload(rawFile);
      });
    },
    handleStart(rawFile) {
      rawFile.uid = Math.random() + this.tempIndex++;
      let file = {
        status: "ready",
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };
      this.files.push(file);
      this.onChange && this.onChange(file);
    },
    upload(rawFile) {
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      let flag = this.beforeUpload(rawFile);
      if (flag) {
        this.post(rawFile);
      }
    },
    post(rawFile) {
        
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        this.files = fileList.map(item => {
          item.id = Date.now() + this.tempIndex++;
          item.status = "success";
          return item;
        });
      }
    }
  }
};
</script>

<style lang="scss">
.wz-upload {
  .wz-upload-btn {
    display: inline-block;
  }
  input {
    display: none;
  }
}
</style>