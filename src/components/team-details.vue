<template>
  <div>
    <div>
      <img src="@/assets/icons/arrow.svg" class="icon" @click="back"/>
    </div>
    <div
      class="outside"
    >
      <div
        v-for="rider in teamList"
        :key="rider.rider.id"
        class="tile"
      >
        <img src="@/assets/placeholders/rider_placeholder.jpeg" width="200" height="200">
        <div class="text">
          {{ rider.rider.first_name }} {{ rider.rider.last_name }}
        </div>
        <div class="text">
          {{ rider.rider.birthday }} {{ rider.rider.nationality }}
        </div>
        <div v-if="junior_status(rider)" class="text">
          Junior
        </div>
      </div>
      <div
        v-if="!teamList.length"
        class="message"
      >
        Brak składów
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default {
  name: 'team-details',

  props: {
    year: null,
    teamId: null,
  },

  data() {
    return {
      teamList: [],
    };
  },

  methods: {
    async getData() {
      if (this.year && this.teamId) {
        this.teamList = (await Vue.axios.get(
          `${process.env.VUE_APP_BACKEND_URL}riders/ridersinfo/${this.year.year}/${this.teamId}`,
        )).data;
      }
    },

    junior_status(rider) {
      const d = new Date();
      const year = d.getFullYear();
      const riderYear = new Date(rider.rider.birthday);
      if (rider.junior === 'T' || (
        rider.rider.nationality === 'Polska' && year - riderYear.getFullYear() <= 21
      )) {
        return true;
      }
      return false;
    },

    back() {
      console.log(this.teamList);
      this.$store.commit('updateSelectedTeam', null);
    },
  },

  watch: {
    teamId() {
      this.getData();
    },

    year() {
      this.getData();
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
  .outside {
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 20px;
    display: flex;
    max-width: 920px;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .tile {
    flex-direction: column;
    text-align: center;

  }

  .text {
    padding: 5px;
    color: #3B3F39;
  }

  .icon {
    height: 40px;
    width: 40px;
    cursor: pointer;
    padding-left: 40px;
    padding-right: 20px;
    padding-top: 20px;
  }

  .message {
    font-size: 20px;
    color: #3B3F39;
    font-weight: bold;
    padding-top: 300px;
  }

</style>
