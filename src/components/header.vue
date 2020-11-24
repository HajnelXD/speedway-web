<template>
  <div class="header">
    <p class="text">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  data() {
    return {
      text: 'Aplikacja do wizualizacji i analizy wyników meczów żużlowych',
    };
  },
};
</script>

<style scoped>
  .header {
    background-color: #0C5D79;
    border-bottom: #B8E4F3;
    display: flex;
    align-items: center;
    height: 100px;
    padding-left: 40px;
  }

  .text {
    color: #FFFFFF;
    font-size: 40px;
  }
</style>
