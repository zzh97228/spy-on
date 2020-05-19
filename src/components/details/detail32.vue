<template>
  <div class="spy-row spy-row---column" style="min-width: 600px">
    <div class="spy-title">(2)用户被动收取的信息</div>
    <ol>
      <li class="spy-text" v-for="(l, i) in list" :key="i">{{ l }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Detail32',
  data() {
    return {
      list: [
        '设备信息（例如硬件型号、MAC地址、IMEI、IMSI、必要的软件列表）',
        '浏览器型号、日志信息、浏览记录、点赞/分享/评论/互动的对象、搜索的字词、位置(个人敏感信息)',
        '个人喜好、操作习惯',
        '资信状况，财务状况，其他与评定用户金融额度及付款能力有关信息'
      ]
    }
  }
}
</script>