<template>
  <div class="outside">
    <div class="buttons">
      <img
        v-if="queue !== 1"
        src="@/assets/icons/arrow.svg"
        class="icon"
        @click="previousQueue"/>
      <img
        v-if="queue !== lastQueueValue"
        src="@/assets/icons/arrow.svg"
        class="icon inverted-icon right-icon"
        @click="nextQueue"/>
    </div>
    <table
      v-if="year"
      class="table-border"
    >
      <tr
        v-for="match in queueMatches"
        :key="match.id"
        @click="goToMatchStatistics(match)"
      >
        <td class="cell date-cell data-cell">
          {{ match.date }}
        </td>
        <td class="cell name-cell data-cell">
          <div class="team">
            <img
              :src=logo(match.home_team.team_photo)
              height="70"
              width="70"
            >
            <div>
              {{ match.home_team.team_name }}
            </div>
          </div>
        </td>
        <td class="cell cell-size data-cell">
          {{ match.home_team_points }}
        </td>
        <td class="cell cell-size data-cell">
          {{ match.guest_team_points }}
        </td>
        <td class="cell name-cell data-cell">
          <div class="team">
            <img
              :src=logo(match.guest_team.team_photo)
              height="70" width="70"
            >
            <div>
              {{ match.guest_team.team_name }}
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import image from '@/assets/placeholders/logo_placeholder.png';

Vue.use(VueAxios, axios);

export default {
  name: 'timetable',

  props: {
    year: {
      default: null,
    },
  },

  data() {
    return {
      seasonMatches: {},
      queue: 0,
      lastQueueValue: 0,
    };
  },

  computed: {
    queueMatches() {
      return this.selectedQueueMatches(this.queue);
    },
  },

  methods: {
    async getData() {
      if (this.year) {
        this.seasonMatches = (await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/season_matches/${this.year.year}`,
        )).data;
        this.queue = this.currentQueueValue();
      }
      this.lastQueueValue = this.lastQueue();
    },

    currentQueueValue() {
      const startedQueue = this.seasonMatches.filter((match) => match.isFinished === true);
      const queue = startedQueue.map((queValue) => queValue.queue);
      return Math.max.apply(null, queue);
    },

    selectedQueueMatches(queue) {
      let matches;
      if (queue) matches = this.seasonMatches.filter((match) => match.queue === queue);
      else matches = 0;
      return matches;
    },

    previousQueue() {
      if (this.queue > 1) this.queue -= 1;
    },

    nextQueue() {
      if (this.queue < this.lastQueue()) this.queue += 1;
    },

    lastQueue() {
      if (this.seasonMatches.length) {
        const queue = this.seasonMatches.map((queValue) => queValue.queue);
        return Math.max.apply(null, queue);
      }
      return 0;
    },

    goToMatchStatistics(match) {
      this.$router.push({
        name: 'match-stats',
        params: {
          homeId: match.home_team.id,
          guestId: match.guest_team.id,
        },
      });
    },

    logo(logoName) {
      let img = image;
      if (logoName) {
        img = `./logos/${logoName}.jpg`;
      }
      return img;
    },
  },

  created() {
    this.getData();
  },

  mounted() {
    this.getData();
  },

  watch: {
    year() {
      if (this.year) {
        this.getData();
      }
    },
  },

};
</script>

<style scoped>

  .icon {
    height: 40px;
    width: 40px;
    cursor: pointer;
  }

  .right-icon {
    position: absolute;
    right: 40px;
    align-items: flex-end;
  }

  .inverted-icon {
    transform: rotate(180deg);
  }

  .buttons{
    display: flex;
    width: 880px;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 6px;
  }

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
    font-size: 22px;
    height: 183px;
  }

  .cell-size {
    width: 88px;
  }

  .data-cell {
    background-color: #B8E4F3;
    border-bottom: 1px solid #0C5D79;
    color: #3B3F39;
  }

  .name-cell {
    font-weight: bold;
    width: 298px;
  }

  .date-cell {
    width: 138px;
  }

  .team {
    flex-direction: column;
  }
</style>
