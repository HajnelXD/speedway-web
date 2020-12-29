<template>
  <div>
    <div class="button-header">
      <img src="@/assets/icons/arrow.svg" class="icon" @click="back"/>
      <div class="team-names">
        <div class="text position-team-name">
          {{ home_team.team_name }}
        </div>
        <div class="text position-team-name">
          {{ guest_team.team_name }}
        </div>
      </div>
    </div>
    <div
      class="page"
    >
      <div class="left">
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
          />
        </div>
      </div>
      <div class="right">
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LastMatches from '@/components/last-matches.vue';
import RiderStatsTable from '@/components/riders-stats-table.vue';
import Vue from 'vue';

export default {
  name: 'match_statistics',
  components: { LastMatches, RiderStatsTable },
  data() {
    return {
      home_team_id: this.$route.params.homeId,
      guest_team_id: this.$route.params.guestId,
      home_team: {},
      guest_team: {},
    };
  },

  methods: {
    back() {
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
