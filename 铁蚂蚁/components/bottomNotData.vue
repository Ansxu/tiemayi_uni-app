<template>
  <div class="emptybox" >
      <div class="tips noData" v-if="list.length<1">暂无数据！</div>
      <div class="tips" v-if="showNotData">已经到底了哦</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
        type: Array,
		default: []
    },
    showNotData: {
        type: Boolean,
        default: false 
    }
  },
  onShow() {
    
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang='scss' scoped>
  .emptybox div{
    font-size:14px;
    text-align:center;
    color: #999;
  }
  .tips{
    height:40px;
    line-height:40px;
  }
  .noData{
    height:80px;
    line-height:80px;
  }
</style>

