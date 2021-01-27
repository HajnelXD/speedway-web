<template>
  <div>
  <table class="table-border">
    <tr>
      <th
        v-for="header in headers"
        :key="header"
        style="padding: 0"
      >
        <div
          :class="header_class(header)"
        >
          {{ header }}
        </div>
      </th>
    </tr>
    <tr
      v-for="stat in stats"
      :key="stat.rider.id"
    >
      <td
        class="cell"
        @click="selectRider(stat.rider.id)"
        style="cursor: pointer"
      >
        {{ stat.rider.last_name }} {{ stat.rider.first_name }}
      </td>
      <td class="cell text_position">{{ stat.matches }}</td>
      <td class="cell text_position">{{ stat.points_sum }}</td>
      <td class="cell text_position">{{ stat.bonuses }}</td>
      <td class="cell text_position">{{ stat.match_average }}</td>
      <td class="cell text_position">{{ stat.runs }}</td>
      <td class="cell text_position">{{ stat.runs_average }}</td>
    </tr>
  </table>
  <div v-if="!stats.length">
    <div class="message">
      Brak danych
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'riders-stats-table',
  data() {
    return {
      headers: ['Zawodnik', 'M', 'P', 'B', 'Śr. M', 'Bi', 'Śr. Bi'],
      stats: [],
    };
  },

  computed: {
    year() {
      return this.$store.getters.getYear;
    },
  },

  props: ['teamId', 'homeTeamId', 'type'],

  methods: {
    header_class(header) {
      let usedClass = 'header-cell size';
      if (header === this.headers[0]) usedClass = 'header-cell left-cell rider-cell';
      else if (header === this.headers[this.headers.length - 1]) {
        usedClass = 'header-cell right-cell size';
      }
      return usedClass;
    },

    async getRidersStats() {
      if (this.year && !this.homeTeamId) {
        this.stats = (await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/team_riders_points/
          ${this.teamId}/${this.year.year}`,
        )).data;
      } else if (this.year) {
        this.stats = (await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/rider_stas_vs/
          ${this.homeTeamId}/${this.teamId}/${this.year.year}`,
        )).data;
      }
    },

    selectRider(riderId) {
      if (this.type === 'host') {
        this.$store.commit('updateSelectedHostRider', riderId);
      } else {
        this.$store.commit('updateSelectedGuestRider', riderId);
      }
    },
  },

  created() {
    this.getRidersStats();
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
    homeTeamId() {
      this.getData();
    },
  },
};
</script>

<style scoped>
  .header-cell {
    background-color: #0C5D79;
    border-collapse: collapse;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
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

  .size {
    height: 36px;
    width: 58px;
  }

  .rider-cell {
    width: 200px;
    height: 36px;
  }

  .cell {
    padding: 5px 5px 5px 5px;
  }

  .text_position {
    text-align: center;
  }

  .message {
    font-size: 20px;
    color: #3B3F39;
    font-weight: bold;
    padding-top: 150px;
    padding-bottom: 150px;
    text-align: center;
    width: 553px;
  }

</style>
