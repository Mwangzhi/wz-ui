<template>
  <div id="app">
    <wz-button>默认按钮</wz-button>
    <wz-button type="primary">默认按钮</wz-button>
    <wz-button type="warning">警告按钮</wz-button>
    <wz-button type="danger">危险按钮</wz-button>
    <wz-button type="success">成功按钮</wz-button>
    <wz-button type="info">信息按钮</wz-button>
    <br />
    <wz-button type="success" icon="sousuo">带图标按钮</wz-button>
    <br />
    <wz-button type="success" icon="sousuo" icon-position="right">图标位置</wz-button>
    <br />

    <br />
    <wz-icon icon="sousuo"></wz-icon>
    <wz-icon icon="edit"></wz-icon>
    <br />
    <wz-button type="primary" :loading="true">加载中</wz-button>
    <br />
    <wz-button type="primary" @click="fn">加载中</wz-button>
    <br>
    <wz-button-group>
      <wz-button icon="left"  icon-position="left">上一页</wz-button>
      <wz-button icon="right" icon-position="right">下一页</wz-button>
    </wz-button-group>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    fn(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
</style>
