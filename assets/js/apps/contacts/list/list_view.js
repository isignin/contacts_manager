ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
	List.Contact = Marionette.ItemView.extend({
		tagName: "li",
		template: "#contact-list-item",
		events: {
		    "click span": "showPhoneNumberAlert"
	      },
	      showPhoneNumberAlert: function(){
		     alert(this.model.escape("phoneNumber"));
	      }
	});
	
	List.Contacts = Marionette.CollectionView.extend({
		tagName: "ul",
		childView: List.Contact
	});
});