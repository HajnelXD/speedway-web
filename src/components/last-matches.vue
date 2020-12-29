<template>
  <div>
    <table class="table-border">
      <tr>
        <th class="header-cell left-cell size">
          Miejsce
        </th>
        <th class="header-cell size-name-cell">
          Przeciwnik
        </th>
        <th class="header-cell right-cell size">
          Wynik
        </th>
      </tr>
      <tr
        v-for="match in matches"
        :key="match.id"
      >
        <td
          v-if="match.home_team.id===teamId"
          class="cell"
        >
          Dom
        </td>
        <td
          v-else
          class="cell"
        >
          Wyjazd
        </td>
        <td
          v-if="match.home_team.id===teamId"
          class="cell"
        >
          {{ match.guest_team.team_name }}
        </td>
        <td
          v-else
          class="cell"
        >
          {{ match.home_team.team_name }}
        </td>
        <td class="cell result-cell">
          {{ match.home_team_points }} : {{ match.guest_team_points }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default {
  name: 'last-matches',

  data() {
    return {
      matches: [],
    };
  },

  props: [
    'teamId',
  ],

  computed: {
    year() {
      return this.$store.getters.getYear;
    },
  },

  methods: {
    async getData() {
      if (this.year) {
        this.matches = (await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/season_matches/${this.year.year}`,
        )).data.filter((match) => (match.isFinished && (
          match.home_team.id === this.teamId
          || match.guest_team.id === this.teamId
        )));
      }
    },
  },

  created() {
    this.getData();
  },

  watch: {
    year() {
      if (this.year) {
        this.getData();
      }
    },
    teamId() {
      this.getData();
    },
  },
};
</script>

<style scoped>
  .cell {
    padding: 5px 5px 5px 5px;
  }

  .size {
    height: 34px;
    width: 80px;
  }

  .size-name-cell {
    width: 200px;
  }

  .header-cell {
    background-color: #0C5D79;
    border-collapse: collapse;
    color: #FFFFFF;
  }

  .left-cell {
    border-radius: 20px 0 0 0;
  }

  .right-cell {
    border-radius: 0 20px 0 0;
  }

  .table-border {
    border: none;
    border-collapse: collapse;
  }

  .result-cell {
    text-align: center;
  }
</style>
