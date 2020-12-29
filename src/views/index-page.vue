<template>
  <div>
    <div
      class="page"
    >
      <div class="left">
        <select-year/>
        <team-results-table />
      </div>
      <div class="right">
        <timetable
          v-if="!selectedTeam"
          :year="year"
        />
        <team-details
          v-else
          :year="year"
          :team-id="selectedTeam"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TeamResultsTable from '@/components/team-results-table.vue';
import SelectYear from '@/components/select-year.vue';
import Timetable from '@/components/timetable.vue';
import TeamDetails from '@/components/team-details.vue';

export default {
  name: 'IndexPage',
  components: {
    Timetable,
    SelectYear,
    TeamResultsTable,
    TeamDetails,
  },

  computed: {
    year() {
      return this.$store.getters.getYear;
    },

    selectedTeam() {
      return this.$store.getters.getSelectedTeam;
    },
  },
};
</script>

<style scoped>
</style>
