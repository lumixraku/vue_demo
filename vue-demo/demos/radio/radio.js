var template = '<input type="radio" :id="id" :value="id" v-model="srStatus"/>';


var CheckBox = Vue.extend({
    template: template,
    props: [
        // 'checked',
        'id',
        'srStatus',
        'handlername',
        // 'name'
    ],
    data: function() {
        return {
        }
    },
    methods: {
        // radioClick: function(){
        //     this.$dispatch('onRadioClick', {
        //         'id': this.id,
        //         'name': this.name,
        //         'onClick': this.checked,
        //         'item': this.item
        //     });
        // }
    },
    computed: {

    },
    watch: {
        'srStatus': function(val, oldVal) {
            console.log('checked', val, '--', oldVal);
            if (!this.handlername) {
                return;
            }
            this.$dispatch(this.handlername, val);
        }
    }
});

Vue.component('radio', CheckBox);
