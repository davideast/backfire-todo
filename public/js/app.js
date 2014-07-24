$(function() {

  // A simple todo model
  var Todo = Backbone.Model.extend({
    defaults: { title: 'New Todo' }
  });

  // The Firebase specific collection
  var TodoList = Backbone.Firebase.Collection.extend({
    model: Todo,
    firebase: "https://webapi.firebaseio.com"
  });

  // A view for an individual todo item
  var TodoView = Backbone.View.extend({
    tagName:  "li",
    template: _.template("<%= title %>"),
    initialize: function() {
      // by listening to when the model changes we can re-render
      // the individual view in realtime
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  // The view for the entire application
  var AppView = Backbone.View.extend({
    el: $('#todoapp'),
    events: {
      'click #add-todo': 'createTodo'
    },
    initialize: function() {
      this.input = this.$("#new-todo");
      this.addBt = this.$('#add-todo');
      this.todos = new TodoList();
      // by listening to when the collection changes we
      // can add new items in realtime
      this.listenTo(this.todos, 'add', this.addOne);
    },
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },
    createTodo: function(e) {
      if (!this.input.val()) { return; }
      this.todos.create({title: this.input.val()});
      this.input.val('');
    }
  });

  var AppView = new AppView();

});
