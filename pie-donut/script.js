var vm = new Vue({
    el: "#app",
    data: {
        values: [ 10, 5, 5, 5 ],
        names: [ 'Apple', 'Google', 'MS', 'Facebook' ]
    },
    methods: {
        dataFormat: function(a, b) {
            if(b) return b + "%";
            return a;
        }
    }
});