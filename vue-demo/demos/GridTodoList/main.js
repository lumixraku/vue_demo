var Vue = require('vue');

new Vue({
  el:'#demo',
  data:{
    searchQuery: '',
    gridColumns: ['name', 'power'],
    gridData: [
      { name: 'Chuck Norris', power: Infinity },
      { name: 'Bruce Lee', power: 9000 },
      { name: 'Jackie Chan', power: 7000 },
      { name: 'Jet Li', power: 8000 }
    ],
    sortKey:'',
    sortOrders: function(){
      var sortOrders = {};
      this.gridColumns.forEach(function (key) {
        sortOrders[key] = 1;
      });
      return sortOrders;
    }
  },
  methods: {
    sortBy: function (key) {
      console.log('sort by');
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  }
});