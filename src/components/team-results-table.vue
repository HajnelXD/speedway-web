<template>
  <table class="table table-border">
    <tr>
      <th
        v-for="header in headers"
        :key="header"
        :class="header !== 'Team' ? 'header-cell' : 'header-name-cell'"
      >
        {{ header }}
      </th>
    </tr>
    <tr
      v-for="team in values"
      :key="team.name"
    >
      <td class="cell"> {{ values.indexOf(team) + 1 }} </td>
      <td class="name-cell"> {{ team.name }}</td>
      <td class="cell"> {{ team.matches }} </td>
      <td class="cell"> {{ team.points }} </td>
      <td class="cell"> {{ team.bonus }} </td>
      <td class="cell"> {{ team.small_points }} </td>
      <td class="cell"> {{ team.wins }} </td>
      <td class="cell"> {{ team.draws }}</td>
      <td class="cell"> {{ team.losers }}</td>
    </tr>
  </table>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default {
  name: 'team-results-table',
  data() {
    return {
      headers: ['Lp.', 'Drużyna', 'Mecze', 'Punkty', 'Bonusy', '+/-', 'Wygrane', 'Remisy', 'Porażki'],
      year: 2020,
      values: null,
    };
  },

  methods: {
    get_data() {
      Vue.axios.get(`${process.env.VUE_APP_BACKEND_URL}summary/${this.year}`)
        .then((response) => {
          this.values = response.data;
          this.tableValues();
          console.log(this.values);
        });
    },

    tableValues() {
      if (this.values) {
        this.values.sort(this.compareResults);
      }
    },

    compareResults(first, second) {
      return second.points - first.points;
    },
  },

  created() {
    this.get_data();
  },
};
</script>

<style scoped>

.table {

}

.table-border {
  border: none;
  border-collapse: collapse;
}

.cell {
  background-color: #B8E4F3;
  border-bottom: 1px solid #0C5D79;
  text-align: center;
  font-size: 18px;
  color: #3B3F39;
}

.name-cell {
  background-color: #B8E4F3;
  border-bottom: 1px solid #0C5D79;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  min-width: 200px;
  color: #3B3F39;
}

.header-cell {
  background-color: #0C5D79;
  border-collapse: collapse;
  text-align: center;
  font-size: 18px;
  color: #FFFFFF;
}

.header-name-cell {
  background-color: #0C5D79;
  border-collapse: collapse;
  text-align: center;
  font-size: 18px;
  color: #FFFFFF;
}
</style>
