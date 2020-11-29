<template>
  <div
    class="select"
  >
    <v-select
      v-if="years.length"
      :options="years"
      :label="'year'"
      :clearable="false"
      :searchable="false"
      v-model="selected"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);
Vue.use(VueAxios, axios);

export default {
  name: 'select-year',

  data() {
    return {
      years: [],
      selected: null,
    };
  },

  props: [
    'value',
  ],

  methods: {
    get_years() {
      Vue.axios.get(`${process.env.VUE_APP_BACKEND_URL}teams/years`)
        .then((response) => {
          this.years = response.data;
          this.sortYears();
          [this.selected] = response.data;
        });
    },

    sortYears() {
      if (this.years) {
        this.years.sort(this.compareYears);
      }
    },

    compareYears(first, second) {
      return second.year - first.year;
    },
  },

  created() {
    this.selected = this.value;
    this.get_years();
  },

  watch: {
    selected() {
      this.$store.commit('updateYear', this.selected);
      // this.$emit('input', this.selected);
    },
  },
};
</script>

<style scoped>
  .select {
    width: 100px;
    padding-top: 20px;
    padding-left: 20px;
  }

  .v-select {
    background-color: #B8E4F3;
  }

  >>> .vs__dropdown-toggle {
    padding: 0;
    border: none;
  }

  >>> .vs__selected {
    color: #3B3F39;
  }

  >>> .vs__dropdown-menu {
    background-color: #B8E4F3;
    min-width: 100px;

  }

  >>> .vs__dropdown-option {
    color: #3B3F39;
  }

  >>> .vs__actions {
    padding-top: 0;
  }

  >>> .vs__open-indicator {
    fill: #0C5D79;
  }

</style>
