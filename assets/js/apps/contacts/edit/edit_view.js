ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionnette, $, _){
	Edit.Contact = Marionette.ItemView.extend({
		template: "#contact-form", 
		events:  {
			"click button.js-submit": "submitClicked"
	   },
	   submitClicked: function(e){
	     e.preventDefault();
	     console.log("Edit contact");	
	   }
    });
});