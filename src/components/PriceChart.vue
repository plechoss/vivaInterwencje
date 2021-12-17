
<script>
import { Bar, mixins } from "vue-chartjs";

const { reactiveProp } = mixins;

export default {
  extends: Bar,

  mixins: [reactiveProp],

  props: ["chartData"],

  data() {
    return {
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
          mode: "single",
          callbacks: {
            label: function (tooltipItems) {
              return tooltipItems.yLabel + " PLN";
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200,
      },
    };
  },

  computed: {},

  methods: {
    render() {
      this.renderChart(this.chartData, this.options);
    },
  },

  mounted() {
    this.render();
  },
};
</script>

<style scoped>
</style>