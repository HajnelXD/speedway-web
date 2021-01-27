<template>
  <div class="area">
    <spinner
      v-if="spinner"
      class="component"
      line-bg-color="#FFFFFF"
      line-fg-color="#0C5D79"
      :line-size="8"
      size="64"
    />
    <div v-else>
      <div style="display: flex">
        <div class="back-button">
          <img src="@/assets/icons/arrow.svg" class="icon" @click="back"/>
        </div>
        <div class="rider-name">
          {{ rider[0].first_name }} {{ rider[0].last_name }}
        </div>
      </div>
      <div>
        <VueFrappe
          v-if="runs"
          id="run"
          :labels="getYears()"
          title="Statystyki biegów"
          :data-sets="runsData()"
          type="axis-mixed"
          :height="300"
          :tooltip-options="tooltip()"
          :colors="colors"
          :bar-options="bar()"
        />
      </div>
      <div>
        <VueFrappe
          v-if="runs"
          id="run"
          :labels="getYears()"
          title="Statystyki biegów"
          :data-sets="runsData()"
          type="axis-mixed"
          :height="300"
          :tooltip-options="tooltip()"
          :colors="colors"
          :bar-options="bar()"
        />
      </div>
      <div>
        <VueFrappe
          v-if="points"
          id="points"
          :labels="getYears()"
          title="Statystyki zdobytych punktów"
          :data-sets="pointsData()"
          type="axis-mixed"
          :height="300"
          :tooltip-options="tooltip()"
          :colors="colors"
          :bar-options="bar()"
        />
      </div>
      <div>
        <VueFrappe
          v-if="places"
          id="place"
          :labels="getYears()"
          title="Statystyki zajętych miejsc"
          :data-sets="placesData()"
          type="axis-mixed"
          :height="300"
          :tooltip-options="tooltip()"
          :colors="colors"
          :bar-options="bar()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Spinner from 'vue-simple-spinner';
import { VueFrappe } from 'vue2-frappe';

export default {
  components: { Spinner, VueFrappe },
  name: 'rider-details',

  data() {
    return {
      rider: null,
      riderRunsStats: [],
      riderPointsStats: [],
      riderPlacesStats: [],
      riderPlaceInRunStats: [],
      spinner: false,
      runs: [
        'first_run', 'second_run', 'third_run', 'fourth_run', 'fifth_run', 'sixth_run', 'seventh_run',
      ],
      runs_pl: [
        'Pierwszy bieg', 'Drugi bieg', 'Trzeci bieg', 'Czwarty bieg', 'Piąty bieg', 'Szósty bieg',
        'Siódmy bieg',
      ],
      points: [
        'points_in_first_run', 'points_in_second_run', 'points_in_third_run', 'points_in_fourth_run',
        'points_in_fifth_run', 'points_in_sixth_run', 'points_in_seventh_run',
      ],
      places: [
        'first_places', 'second_places', 'third_places', 'fourth_places', 'other_events',
      ],
      places_pl: [
        'Pierwsze miejsca', 'Drugie miejsca', 'Trzecie miejsca', 'Czwarte miejsca', 'Nieukończone',
      ],
      colors: ['#031b24', '#063140', '#094557', '#0C5D79', '#1183ab', '#16a8db', '#14bafa'],
    };
  },

  props: ['riderId'],

  computed: {
    year() {
      return this.$store.getters.getYear;
    },
  },

  methods: {
    async getRidersStats() {
      this.spinner = true;
      this.rider = (
        await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}riders/riders/${this.riderId}`,
        )).data;
      this.riderRunsStats = (
        await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/rider_run_stats/${this.riderId}`,
        )).data;
      this.riderPointsStats = (
        await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/rider_points_stats/${this.riderId}`,
        )).data;
      this.riderPlacesStats = (
        await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/rider_places_stats/${this.riderId}`,
        )).data;
      this.riderPlaceInRunStats = (
        await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}matches/rider_place_runs_stats/${this.riderId}`,
        )).data;
      this.spinner = false;
    },

    tooltip() {
      return {
        formatTooltipX: (d) => (`${d}`).toUpperCase(),
        formatTooltipY: (d) => d,
      };
    },

    getYears() {
      return this.riderRunsStats.map((run) => run.year);
    },

    runsData() {
      const data = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.runs.length; i++) {
        data.push({
          name: this.runs_pl[i],
          chartType: 'bar',
          values: this.riderRunsStats.map((run) => run[this.runs[i]]),
        });
      }
      return data;
    },

    placesData() {
      const data = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.places.length; i++) {
        data.push({
          name: this.places_pl[i],
          chartType: 'bar',
          values: this.riderPlacesStats.map((run) => run[this.places[i]]),
        });
      }
      return data;
    },

    pointsData() {
      const data = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.points.length; i++) {
        data.push({
          name: this.runs_pl[i],
          chartType: 'bar',
          values: this.riderPointsStats.map((run) => run[this.points[i]]),
        });
      }
      return data;
    },

    bar() {
      return {
        height: 20,
        depth: 2,
        spaceRatio: 0.3,
        stacked: 0,
      };
    },

    back() {
      this.$store.commit('updateSelectedGuestRider', null);
      this.$store.commit('updateSelectedHostRider', null);
    },

  },

  created() {
    this.getRidersStats();
  },

  watch: {
    riderId() {
      this.getRidersStats();
    },
  },
};
</script>

<style scoped>
  .area {
    width: 920px;
    height: 100%;
  }

  .component {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .back-button {
    height: 40px;
    width: 40px;
    cursor: pointer;
  }

  .rider-name {
    color: #3B3F39;
    font-size: 24px;
    font-weight: bold;
    padding-top: 7px;
    padding-left: 20px;
  }

  >>> .title {
    font-size: 20px;
    fill: #3B3F39;
  }

  >>> .legend-dataset-text {
    fill: #3B3F39;
  }
  >>> .axis {
    fill: #3B3F39;
  }

  >>> .line-horizontal {
    stroke: #3B3F39 !important;
  }

  >>> .line-vertical {
    stroke: #3B3F39 !important;
  }

</style>
