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
        <select-year
          v-model="year"
        />
        <team-results-table
          :year="year"
        />
      </div>
      <div class="right">
      </div>
    </div>
  </div>
</template>

<script>
import TeamResultsTable from '@/components/team-results-table.vue';
import PageHeader from '@/components/header.vue';
import SelectYear from '@/components/select-year.vue';

export default {
  components: { PageHeader, SelectYear, TeamResultsTable },

  data() {
    return {
      year: null,
    };
  },
};
</script>

<style>
  .basic {
    font-family: Helvetica;
    background-color: #3B3F39;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .page {
    display: flex;
  }

  .left {
    width: 960px;
  }
  .right {
    width: 960px;
  }
</style>
