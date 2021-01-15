<template>
  <div>
    <div class="button-header">
      <img src="@/assets/icons/arrow.svg" class="icon" @click="back"/>
      <div class="team-names">
        <div
          v-if="!selectedGuestRider"
          class="text position-team-name"
        >
          {{ home_team.team_name }}
        </div>
        <div
          v-if="!selectedHostRider"
          class="text position-team-name"
        >
          {{ guest_team.team_name }}
        </div>
      </div>
    </div>
    <div
      class="page"
    >
      <div class="left">
        <div
          v-if="!selectedGuestRider"
          style="display: flex"
        >
          <div style="padding-right: 5px">
            <div class="text">
              Mecze w obecnym sezonie
            </div>
            <last-matches
              :team-id="home_team_id"
            />
          </div>
          <div style="padding-left: 5px">
            <div class="text">
              Statystyki zawodników
            </div>
            <RiderStatsTable
              :team-id="home_team_id"
              type="host"
            />
            <div class="text" style="padding-top: 5px" >
              Statystyki zawodników na tym stadionie
            </div>
            <RiderStatsTable
              :team-id="home_team_id"
              :home-team-id="home_team_id"
              type="host"
            />
          </div>
        </div>
        <div v-else>
          <rider-details
            :rider-id="selectedGuestRider"
          />
        </div>
      </div>
      <div class="right">
        <div
          v-if="!selectedHostRider"
          style="display: flex"
        >
          <div style="padding-right: 5px">
            <div class="text">
              Mecze w obecnym sezonie
            </div>
            <last-matches
              :team-id="guest_team_id"
            />
          </div>
          <div style="padding-left: 5px">
            <div class="text">
              Statystyki zawodników
            </div>
            <RiderStatsTable
              :team-id="guest_team_id"
              type="guest"
            />
            <div class="text" style="padding-top: 5px" >
              Statystyki zawodników na tym stadionie
            </div>
            <RiderStatsTable
              :team-id="guest_team_id"
              :home-team-id="home_team_id"
              type="guest"
            />
          </div>
        </div>
        <div v-else>
          <rider-details
            :rider-id="selectedHostRider"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import RiderDetails from '@/components/rider-details.vue';
import LastMatches from '@/components/last-matches.vue';
import RiderStatsTable from '@/components/riders-stats-table.vue';

export default {
  name: 'match_statistics',
  components: { RiderDetails, LastMatches, RiderStatsTable },
  data() {
    return {
      home_team_id: this.$route.params.homeId,
      guest_team_id: this.$route.params.guestId,
      home_team: {},
      guest_team: {},
    };
  },

  computed: {
    selectedGuestRider() { return this.$store.getters.getSelectedGuestRider; },
    selectedHostRider() { return this.$store.getters.getSelectedHostRider; },
  },

  methods: {
    back() {
      this.$store.commit('updateSelectedHostRider', null);
      this.$store.commit('updateSelectedGuestRider', null);
      this.$router.push('/');
    },

    async getData() {
      const teams = await Vue.axios.get(
        `${process.env.VUE_APP_BACKEND_URL}teams/teams`,
      );
      [this.home_team] = teams.data.filter((team) => team.id === this.home_team_id);
      [this.guest_team] = teams.data.filter((team) => team.id === this.guest_team_id);
    },
  },

  mounted() {
    if (!this.$route.params.homeId || !this.$route.params.guestId) this.back();
    else this.getData();
  },
};
</script>

<style scoped>
  .icon {
    padding: 20px;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }

  .left {
    padding: 0 10px 20px 20px;
    display: flex;
  }

  .right {
    padding: 0 20px 20px 10px;
    display: flex;
  }

  .text {
    color: #3B3F39;
    font-size: 24px;
    font-weight: bold;
  }

  .button-header {
    width: 100%;
    display: flex;
  }

  .team-names {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .position-team-name {
    padding-top: 28px;
  }
</style>
