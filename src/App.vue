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
        <select-year/>
        <team-results-table
          :year="year"
        />
      </div>
      <div class="right">
        <timetable
          v-if="!selected"
          :year="year"
        />
        <team-details
          v-else
          :year="year"
          :team-id="selected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TeamResultsTable from '@/components/team-results-table.vue';
import PageHeader from '@/components/header.vue';
import SelectYear from '@/components/select-year.vue';
import Timetable from '@/components/timetable.vue';
import TeamDetails from '@/components/team-details.vue';

export default {
  components: {
    Timetable, PageHeader, SelectYear, TeamResultsTable, TeamDetails,
  },

  computed: {
    year() {
      return this.$store.getters.getYear;
    },

    selected() {
      return this.$store.getters.getSelectedTeam;
    },
  },
};
</script>

<style>
  .basic {
    font-family: Helvetica;
    background-color: #B8E4F3;
    height: 100%;
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
