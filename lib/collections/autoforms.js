webInquiry = new Mongo.Collection("webInquiry");
webInquiry.attachSchema(new SimpleSchema({
  mobilephone: {
    type: String,
    label: " ",
    min: 11,
    max: 11
  },
  randomStr: {
    type: String,
    optional: true,
    label: "",
    autoValue: function() {
      var result = Meteor.call("randomStr");
      return result;
    }
  },
  createTime: {
    type: Date,
    label: "44444444444444",
    autoValue: function() {
      return new Date();
    }
  },
  isCalled: {
    type: Boolean,
    label: "",
    defaultValue: false
  }
}));


//webInquiry.allow({
//  insert: function () {
//    return true;
//  }
//});

webCallback = new Mongo.Collection("webCallback");

SeoCollection = new Mongo.Collection("SeoCollection");