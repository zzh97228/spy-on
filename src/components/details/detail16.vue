<template>
  <div class="spy-row spy-image spy-row--column">
    <div class="spy-title">例外情况</div>
    <ol>
      <li v-for="(item, i) in list" class="spy-text" :key="i">{{ item }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Detail16',
  data() {
    return {
      list: [
        '事先获得用户的明确授权',
        '根据有关的法律法规的要求',
        '按照相关政府主管部门的要求',
        '为维护社会公众的利益',
        '为维护软件的合法权益',
        '可能会与第三方合作向用户提供相关服务',
        '用户了解并同意，在不透露单个用户隐私资料的前提下，软件有权对整个用户数据库进行分析并对用户数据库进行商业上的利用'
      ]
    }
  }
}
</script>