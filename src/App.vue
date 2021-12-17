<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row>
        <v-col>
          <span class="text-h6">Viva! Interwencje</span>
        </v-col>
        <v-col class="text-right">
          <v-btn
            href="https://allegro.pl/uzytkownik/Viva_Interwencje"
            target="_blank"
            text
          >
            <span class="mr-2">Aukcje</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container mt-8>
        <v-row>
          <v-col>
            <span class="text-h5"> Total: {{ total }} PLN </span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="12" md="12" lg="10" xl="8">
            <price-chart
              v-if="isChartReady"
              :chartData="chartData"
            ></price-chart>
          </v-col>
        </v-row>
        <v-row v-if="false" class="mt-4" justify="center">
          <v-btn @click="getAllegroData">refresh</v-btn>
        </v-row>
        <v-row v-if="false" class="mt-4" justify="center">
          {{ chartData }}
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
import PriceChart from "./components/PriceChart";
import axios from "axios";
import Vue from "vue";

export default {
  name: "App",

  components: {
    PriceChart,
  },

  data: () => ({
    allegroData: null,
    chartData: { datasets: [], labels: [] },
    CLIENT_ID: "cc8c81263a534b61ac72a64498688613",
    CLIENT_SECRET:
      "HtAXopcFIa8V4RX2ctmkhx4v1VqOxq6IwoE8nERWvDQcmpAAZepblwwSEi2GSY7E",
  }),

  computed: {
    total() {
      if (!!!this.allegroData) return 0;
      let total = this.allegroData
        .map((el) => el.price)
        .reduce((pv, cv) => pv + cv, 0);
      total = Math.round(total * 100) / 100;
      return total;
    },

    isChartReady() {
      return !!this.chartData.datasets[0];
    },
  },

  created() {
    this.getAllegroData();
  },

  methods: {
    getAllegroData() {
      let url = "https://allegro.pl/uzytkownik/Viva_Interwencje";
      return axios.get(url).then((res) => {
        this.allegroData = this.parseResponse(res);
        console.log(res);
      });
    },
    parseResponse(data) {
      let parsedRes = Object.values(
        data.data["pagination top"].collection.elements
      )
        .splice(1)
        .map((auction) => {
          return {
            name: auction.name,
            price: Number(auction.sellingMode.auction.price.amount),
            url: auction.seo.url,
          };
        });

      parsedRes = parsedRes.sort((a, b) => (a.price > b.price ? -1 : 1));
      let datasetsAndLabels = this.getChartDataFromAllegro(parsedRes);
      Vue.set(this.chartData, "datasets", datasetsAndLabels.datasets);
      Vue.set(this.chartData, "labels", datasetsAndLabels.labels);
      return parsedRes;
    },

    getChartDataFromAllegro(allegroData) {
      let labels = allegroData.map((el) => el.name.split(/(\s+)/).slice(0,3));
      let prices = allegroData.map((el) => el.price);
      let datasets = [
        {
          label: "Ceny",
          backgroundColor: "#f87979",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: prices,
        },
      ];

      return { labels, datasets };
    },

    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>
