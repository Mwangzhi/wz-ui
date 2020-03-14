
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
      this.$refs.input.value='';
      this.$refs.input.click();
    },
    handleChange(e){
        const files=e.target.files;
    }
  }
};
</script>

<style lang="scss">
.wz-upload {
  .wz-upload-btn {
    display: inline-block;
  }
}
</style>