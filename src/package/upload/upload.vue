
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
    <div>
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "wz-upload",
  data(){
      return{
          tempIndex:1
      }
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
    fileList: {
      type: Array,
      default: () => []
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
          return this.onExceed && this.onExceed(files,this.fileList);
      }
      [...files].forEach(rawFile=>{
          this.handleStart(rawFile);
          this.upload(rawFile);
      })
    },
    handleStart(rawFile){
        rawFile.uid=Math.random()+this.tempIndex++;
        let file={
            status:'ready',
            name:rawFile.name,
            size:rawFilesize
        }
    },
    upload(rawFile){

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