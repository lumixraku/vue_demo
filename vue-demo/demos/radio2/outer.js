var template = '<table><tbody><tr><td><radio id="111" :radio-choosed="choosed" name="select" handlername="onRadioClick"/></td><td>111</td></tr><tr><td><radio id="222" :radio-choosed="choosed"  name="select" " handlername="onRadioClick"/></td><td>222</td></tr><tr><td><radio id="333" :radio-choosed="choosed"  name="select"  handlername="onRadioClick"/></td><td>ha3333ah</td></tr></tbody></table>';



var TableFieldData = Vue.extend({
    template: template,
    props: {},
    data: function() {
        return {
            list: ['111', '222', '333'],
            //被选中的
            choosed: '111', //默认值
        }
    },
    methods: {
    },
    events: {
        onRadioClick: function(radioIdx){
            console.log('click', radioIdx);
            this.choosed = radioIdx;
            radioIdx = +radioIdx;
            // console.log(radioIdx);
        }
    },
    watch: {
    }
});

Vue.component('table-data', TableFieldData);
