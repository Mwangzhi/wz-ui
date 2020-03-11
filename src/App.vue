<template>
  <div id="app">
    <wz-button>默认按钮</wz-button>
    <wz-button type="primary">默认按钮</wz-button>
    <wz-button type="warning">警告按钮</wz-button>
    <wz-button type="danger">危险按钮</wz-button>
    <wz-button type="success">成功按钮</wz-button>
    <wz-button type="info">信息按钮</wz-button>


    <wz-button type="success" icon="sousuo">带图标按钮</wz-button>


    <wz-button type="success" icon="sousuo" icon-position="right">图标位置</wz-button>
 
 
    <wz-icon icon="sousuo"></wz-icon>
    <wz-icon icon="edit"></wz-icon>


    <wz-button type="primary" :loading="true">加载中</wz-button>


    <wz-button type="primary" @click="fn">加载中</wz-button>


    <wz-button-group>
      <wz-button icon="left" icon-position="left">上一页</wz-button>
      <wz-button icon="right" icon-position="right">下一页</wz-button>
    </wz-button-group>

    <Boundary/>

    <wz-row>
      <wz-col :span="12">
        <div>aaa</div>
      </wz-col>
      <wz-col :span="12">
        <div>bbb</div>
      </wz-col>
      
    </wz-row>
    <wz-row>
      <wz-col :span="24">
        <div>ccc</div>
      </wz-col>
    </wz-row>

    <Boundary />
    
    <wz-row>
      <wz-col :span="6">
        <div>aaa</div>
      </wz-col>
      <wz-col :span="6" :offset="12">
        <div>bbb</div>
      </wz-col>
    </wz-row>

    <Boundary />

    <wz-row :gutter="20">
      <wz-col :span="8">
        <div>aaa</div>
      </wz-col>
      <wz-col :span="8">
        <div>bbb</div>
      </wz-col>
      <wz-col :span="8">
        <div>ccc</div>
      </wz-col>
    </wz-row>

    <Boundary />

    <wz-row justify="space-around">
      <wz-col :span="3">
        <div class="">ddd</div>
      </wz-col>
      <wz-col :span="3">
        <div class="">eee</div>
      </wz-col>
    </wz-row>
  </div>

</template>

<script>
import Boundary from './package/boundary'
export default {
  name: "App",
  components: {Boundary},
  methods: {
    fn(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
</style>
