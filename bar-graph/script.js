Vue.component("graphBar", {
    props: ["labels", "values", "type"],
    template: '<canvas width="400" height="200"></canvas>',
    mounted: function() {
        new Chart(this.$el, {
            type: this.type,
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: "# of Votes",
                        data: this.values,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });
    }
});

new Vue({
    el: "#app",
    data: {
        message: "Vue.js & Chart.js",
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        votes: [12, 19, 3, 5, 2, 15]
    }
});