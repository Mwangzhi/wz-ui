
<template>
  <div class="wz-upload">
    <uploadDragger v-if="drag" :accept="accept" @file="uploadFile"></uploadDragger>
    <template v-else>
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
    </template>
    <div>
      <slot name="tip"></slot>
    </div>
    <ul>
      <li v-for="file in files" :key="file.uid">
        <div class="list-item">
          <wz-icon icon="file"></wz-icon>
          <img :src="file.url" width="200px" height="200px"/>
          {{file.name}}
          <wz-progress
            v-if="file.status==='uploading'"
            :percentage="file.percentage"
            color="purple"
          ></wz-progress>
          {{file.status}}
          <wz-icon icon="cha"></wz-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ajax from "./ajax.js";
import uploadDragger from "./upload-dragger";
export default {
  name: "wz-upload",
  data() {
    return {
      tempIndex: 1,
      files: [],
      reqs: {}
    };
  },
  components: { uploadDragger },
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
    httpRequest: {
      type: Function,
      default: ajax
    },
    drag: {
      type: Boolean,
      default: false
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
        raw: rawFile,
        url:URL.createObjectURL(rawFile)
      };
    //   file.url = URL.createObjectURL(rawFile);
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
      const uid = rawFile.uid;
      const options = {
        file: rawFile,
        filename: this.name,
        action: this.action,
        onProgress: ev => {
          this.handleProgress(ev, rawFile);
        },
        onSuccess: res => {
          this.handleSuccess(res, rawFile);
        },
        onError: err => {
          this.handleError(err, rawFile);
        }
      };
      let req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    getFile(rawFile) {
      return this.files.find(file => file.uid == rawFile.uid);
    },
    handleProgress(ev, rawFile) {
      let file = this.getFile(rawFile);
      file.status = "uploading";
      file.percentage = ev.percent || 0;
      this.onProgress(ev, rawFile);
    },
    handleSuccess(res, rawFile) {
      let file = this.getFile(rawFile);
      file.status = "success";
      this.onSuccess(res, rawFile);
      this.onChange(file);
    },
    handleError(err, rawFile) {
      let file = this.getFile(rawFile);
      file.status = "fail";
      this.onError(err, rawFile);
      this.onChange(file);
      delete this.reqs[file.uid];
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