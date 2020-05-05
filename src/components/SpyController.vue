<template>
  <footer class="spy-controller__wrapper">
    <div class="spy-controller">
      <div class="spy-controller--logo"></div>
      <div class="spy-controller--content"></div>
      <div class="spy-controller--actions">
        <div v-for="i in 4" :key="i" class="spy-controller--icon">
          <i class="spy-icon fa fas fa-image"></i>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'spy-controller'
}
</script>