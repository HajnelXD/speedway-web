<template>
  <div
    id="app"
    class="basic"
  >
    <page-header />
    <div
      class="page"
    >
      <div class="left">
        <team-results-table />
      </div>
      <div class="right">
      </div>
    </div>
  </div>
</template>

<script>
import TeamResultsTable from '@/components/team-results-table.vue';
import PageHeader from '@/components/header.vue';

export default {
  components: { PageHeader, TeamResultsTable },
};
</script>

<style>
  .basic {
    display: block;
    align-items: center;
    justify-content: center;
    font-family: Helvetica;
    background-color: #3B3F39;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .page {
    display: flex;
    height: 90%;
    width: 100%;
    position: fixed;
  }

  .left {
    padding: 2% 1% 2% 2%;
    width: 48%;
    height: 91%;
  }
  .right {
    padding: 2% 2% 2% 1%;
    width: 48%;
    height: 91%;
  }
</style>
