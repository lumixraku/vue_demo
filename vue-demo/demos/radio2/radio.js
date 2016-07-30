var template = '<div><input type="radio" :id="id"  v-model="srStatus" :name="name" :value="id" /><label :for="id" :class="{checked: srStatus==id}"><span v-show="checked"><i class="fa fa-check" aria-hidden="true"></i></span>ii</label></div>';

// <label :for="id" :class="{checked: srStatus==id}"><span v-show="checked"><i class="fa fa-check" aria-hidden="true"></i></span></label>

var CheckBox = Vue.extend({
    template: template,
    props: [
        // 'checked',
        'srStatus', // 必须有一个外层的全局变量  用于记住当前选中项
        'id',
        'handlername',
        'name'
    ],
    data: function() {
        return {
        }
    },
    methods: {
        // radioClick: function(id){
        //     this.$dispatch('onRadioClick', id);
        // }
    },
    computed: {

    },
    watch: {
        'srStatus': function(val, oldVal) {
            console.log('watch', val);
            this.$dispatch(this.handlername, val);
        }
    }
});

Vue.component('radio', CheckBox);
