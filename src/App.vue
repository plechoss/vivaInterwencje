<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row>
        <v-col>
          <span class="text-h5">Viva! Interwencje</span>
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
        <v-row justify="center">
          <v-col cols="10" sm="12" md="12" lg="10" xl="8">
            <price-chart></price-chart>
          </v-col>
        </v-row>
        <v-row class="mt-4" justify="center">
          <v-btn @click="getAllegroData">getAllegroData</v-btn>
        </v-row>
        <v-row class="mt-4" justify="center">
          {{ allegroData }}
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PriceChart from "./components/PriceChart";
import axios from "axios";

export default {
  name: "App",

  components: {
    PriceChart,
  },

  data: () => ({
    allegroData: "testing",
    CLIENT_ID: "cc8c81263a534b61ac72a64498688613",
    CLIENT_SECRET:
      "HtAXopcFIa8V4RX2ctmkhx4v1VqOxq6IwoE8nERWvDQcmpAAZepblwwSEi2GSY7E",
  }),

  mounted() {},

  methods: {
    getAllegroData() {
      //let url = "https://api.allegro.pl/sale/categories/2";
      let encodedSecret = btoa(this.CLIENT_ID + ":" + this.CLIENT_SECRET);

      let urlAuthorization = "https://allegro.pl/auth/oauth/token";
      return axios
        .post(
          urlAuthorization,
          { grant_type: "client_credentials" },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
              'Authorization': "Basic " + encodedSecret,
            },
          }
        )
        .then((res) => (this.allegroData = res));
    },
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>
