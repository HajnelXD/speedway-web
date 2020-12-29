<template>
  <div
    id="app"
    class="basic"
  >
    <page-header />
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from '@/components/header.vue';

export default {
  components: {
    PageHeader,
  },
};
</script>

<style>
  .basic {
    font-family: Helvetica;
    background-color: #B8E4F3;
    min-height: 100%;
    position: absolute;
    width: 100%;
  }

  .page {
    display: flex;
  }

  .left {
    width: 50%;
  }
  .right {
    width: 50%;
  }
</style>
