<template>
  <div class="outside">
    <table class="table-border">
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          class="cell header-cell"
          :class="header === 'Team' ? 'name-cell' : 'cell-size'"
        >
          {{ header }}
        </th>
      </tr>
      <tr
        v-for="team in values"
        :key="team.name"
      >
        <td class="cell data-cell"> {{ values.indexOf(team) + 1 }} </td>
        <td class="cell data-cell name-cell"> {{ team.name }}</td>
        <td class="cell data-cell"> {{ team.matches }} </td>
        <td class="cell data-cell"> {{ team.points }} </td>
        <td class="cell data-cell"> {{ team.bonus }} </td>
        <td class="cell data-cell"> {{ team.small_points }} </td>
        <td class="cell data-cell"> {{ team.wins }} </td>
        <td class="cell data-cell"> {{ team.draws }}</td>
        <td class="cell data-cell"> {{ team.losers }}</td>
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

  .outside {
    height: 100%;
    width: 100%;
  }

  .table-border {
    height: 100%;
    border: none;
    border-collapse: collapse;
  }

  .cell {
    text-align: center;
    font-size: 18px;
  }

  .cell-size {
    width: 5%;
  }

  .data-cell {
    background-color: #B8E4F3;
    border-bottom: 1px solid #0C5D79;
    color: #3B3F39;
  }

  .header-cell {
    background-color: #0C5D79;
    border-collapse: collapse;
    color: #FFFFFF;
  }

  .name-cell {
    min-width: 200px;
    font-weight: bold;
  }
</style>
