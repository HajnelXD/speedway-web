<template>
  <div
    id="app"
    class="basic"
  >
    <team-results-table
      class="position"
    />
  </div>
</template>

<script>
import TeamResultsTable from '@/components/team-results-table.vue';

export default {
  components: { TeamResultsTable },
};
</script>

<style>
.basic {
  align-items: center;
  justify-content: center;
  font-family: Helvetica;
  background-color: #3B3F39;
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
}

.position {
  width: 40%;
  height: 50%;
}
</style>
