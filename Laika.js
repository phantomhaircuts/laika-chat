Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Template.body.helpers({
    messages: function () {
      return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

    Template.body.events({
    "submit .new-message": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a Message into the collection
      Messages.insert({
        text: text,
        createdAt: new Date(), // current time
        username: Meteor.user().username,
        owner: Meteor.user().username
      });

      // Clear form
      event.target.text.value = "";
    }
  });
  Template.message.events({
  "click .delete": function () {
    Messages.remove(this._id);
  }
});
  Accounts.ui.config({
   passwordSignupFields: "USERNAME_ONLY"
  });
}
