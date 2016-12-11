var template = '<table><tbody><tr><td><radio id="111" :sr-status.sync="choosed" name="select" handlername="onRadioClick"/></td><td>111</td></tr><tr><td><radio id="222" :sr-status.sync="choosed"  name="select" " handlername="onRadioClick"/></td><td>222</td></tr><tr><td><radio id="333" :sr-status.sync="choosed"  name="select"  handlername="onRadioClick"/></td><td>ha3333ah</td></tr></tbody></table>';



var TableFieldData = Vue.extend({
    template: template,
    props: {},
    data: function() {
        return {
            list: ['111', '222', '333'],
            //被选中的
            choosed: '111', //默认
        }
    },
    methods: {
        onRadioClick: function(item) {
            this.$dispatch('selectChoosed', item);
        }
    },
    events: {
        onRadioClick: function(radioIdx){
            this.choosed = radioIdx;
            radioIdx = +radioIdx;
            // console.log(radioIdx);
        }
    },
    watch: {
        // 'choosed': function(val, oldVal){
        //     // console.log('this.choosedSelect', oldVal, '--', val);
        //     console.log(oldVal == val);
        // }
    }
});

Vue.component('table-data', TableFieldData);
