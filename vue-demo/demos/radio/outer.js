var template = '<table><tbody><tr><td><radio id="111" :sr-status.sync="choosed" handlername="onRadioClick"/></td><td>111</td></tr><tr><td><radio id="222" :sr-status.sync="choosed" handlername="onRadioClick"/></td><td>222</td></tr><tr><td><radio id="333" :sr-status.sync="choosed" handlername="onRadioClick"/></td><td>ha3333ah</td></tr></tbody></table>';



var TableFieldData = Vue.extend({
    template: template,
    props: {
    },
    data: function() {
        return {
            list: ['111', '222', '333'],
            //被选中的
            choosed: '111',
        }
    },
    methods: {
        previewTree: function(item){
            this.$dispatch('previewTree', item);
        },
        onItemDeleteClick: function(id, rowIndex){
            this.$dispatch('deleteSelect',id);
        },
        onRadioClick: function(item){
            this.$dispatch('selectChoosed',item);
        }
    },
    events: {
        // onRadioClick: function(radioId){
        //     console.log(radioId);
        //     this.choosed = radioId;
        //     // this.$dispatch('selectChoosed', action);
        // }
    },
    watch: {
        // 'choosedSelect': function(){
        //     // console.log('this.choosedSelect', this.choosedSelect);
        // }
    }
});

Vue.component('table-data', TableFieldData);
