<template>
  <div class="spy-row spy-image spy-row--column">
    <div class="spy-title">(1)用户主动收取信息：</div>
    <ol>
      <li class="spy-text" v-for="(l,i) in list" :key="i">{{ l }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Detail31',
  data() {
    return {
      list : [
        '个人信息',
        '权限',
        '第三方信息',
        '身份信息',
        '地址',
        '订单信息'
      ]
    }
  }
}
</script>