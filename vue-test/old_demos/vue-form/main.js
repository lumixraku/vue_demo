var Vue = require('vue');


new Vue({
    el: '#example1',
    data: {
        checkedNames: []
    }
})

new Vue({
    el: '#example11',
    data: {
        checkboxs: [
            { text: 'Mike!!', value: 'mike' },
            { text: 'john!', value: 'john' },
            { text: 'j!ack', value: 'jack' }
        ],
        checkedNames: ['mike']
    }
})




new Vue({
    el: '#example2',
    data: {
        picked: ''
    }
})

new Vue({
    el: '#example3',
    data: {
        selected: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' }
        ]
    }
})


var vm5 = new Vue({
    el: '#example5',
    data: {
        msg: ''
    }
})
vm5.$watch('msg', function(newVal, oldVal) {
    console.log(newVal, oldVal);
    vm5.msg = newVal;
});
