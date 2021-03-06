<template>
  <div class="outside">
    <div v-if="values">
      <table class="table-border">
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            class="cell header-cell"
            :class="changeClass(header)"
          >
            {{ header }}
          </th>
        </tr>
        <tr
           v-for="team in values"
          :key="team.name.id"
           @click="showDetails(team.name.id)"
        >
          <td class="cell data-cell"> {{ values.indexOf(team) + 1 }} </td>
          <td class="cell data-cell name-cell"> {{ team.name.team_name }} </td>
          <td class="cell data-cell"> {{ team.matches }} </td>
          <td class="cell data-cell"> {{ team.points }} </td>
          <td class="cell data-cell"> {{ team.bonus }} </td>
          <td class="cell data-cell"> {{ team.small_points }} </td>
          <td class="cell data-cell"> {{ team.wins }} </td>
          <td class="cell data-cell"> {{ team.draws }} </td>
          <td class="cell data-cell"> {{ team.losers }} </td>
        </tr>
      </table>
    </div>
    <div
      v-else
      class="error_message"
    >
      Brak danych z tego roku.
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default {
  name: 'team-results-table',

  computed: {
    year() {
      return this.$store.getters.getYear;
    },
  },
  data() {
    return {
      headers: ['Lp.', 'Drużyna', 'Mecze', 'Punkty', 'Bonusy', '+/-', 'Wygrane', 'Remisy', 'Porażki'],
      values: null,
      selected: null,
    };
  },

  methods: {
    getData() {
      Vue.axios.get(`${process.env.VUE_APP_BACKEND_URL}summary/${this.year.year}`)
        .then((response) => {
          this.values = response.data;
          this.tableValues();
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

    changeClass(header) {
      let returnedClass;
      if (header === this.headers[1]) returnedClass = 'name-cell';
      else {
        returnedClass = 'cell-size';
        if (header === this.headers[0]) returnedClass += ' left-cell';
        else if (header === this.headers[8]) returnedClass += ' right-cell';
      }
      return returnedClass;
    },

    showDetails(teamId) {
      this.$store.commit('updateSelectedTeam', teamId);
    },
  },

  watch: {
    year() {
      if (this.year) {
        this.getData();
      }
    },
  },
  mounted() {
    if (this.year) {
      this.getData();
    }
  },
};
</script>

<style scoped>

  .outside {
    padding-left: 20px;
    padding-top: 20px;
  }

  .table-border {
    border: none;
    border-collapse: collapse;
  }

  .cell {
    text-align: center;
    font-size: 18px;
    height: 80px;
  }

  .cell-size {
    width: 78px;
  }

  .data-cell {
    background-color: #B8E4F3;
    border-bottom: 1px solid #0C5D79;
    color: #3B3F39;
    cursor: pointer;
  }

  .header-cell {
    background-color: #0C5D79;
    border-collapse: collapse;
    color: #FFFFFF;
  }

  .name-cell {
    font-weight: bold;
    width: 278px;
  }

  .error_message {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 40px;
    height: 720px;
  }

  .left-cell {
    border-radius: 20px 0 0 0;
  }

  .right-cell {
    border-radius: 0 20px 0 0;
  }

</style>
