var baseURL = 'https://vue-demo.firebaseIO.com/'
var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

var Vue = require('vue');

// var Users = new Firebase(baseURL + 'users')

// Users.on('child_added', function (snapshot) {
//   var item = snapshot.val()
//   item.id = snapshot.key()
//   app.users.push(item)
// })

// Users.on('child_removed', function (snapshot) {
//   var id = snapshot.key()
//   app.users.some(function (user) {
//     if (user.id === id) {
//       app.users.$remove(user)
//       return true
//     }
//   })
// })

var app = new Vue({

  // element to mount to
  el: '#app',

  // initial data
  data: {
    users: [],
    newUser: {
      name: '',
      email: ''
    }
  },

  // computed property for form validation state
  computed: {
    validation: function () {
      // console.log(this.newUser.name, !!this.newUser.name);
      return {
        name: !!('' + this.newUser.name.trim()),
        email: emailRE.test('' + this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation;
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },

  // methods
  methods: {
    addUser: function () {
      if (this.isValid) {
        this.users.push({
          name: this.newUser.name,
          email: this.newUser.email
        })
        this.newUser.name = ''
        this.newUser.email = ''
      }
    },
    removeUser: function (idx) {
      this.users.splice(idx,1);
    }
  }
})