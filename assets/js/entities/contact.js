ContactManager.module("Entities", function(Entities, ContactManager,Backbone, Marionette, $, _){
	Entities.Contact = Backbone.Model.extend({
		defaults: {
		     phoneNumber: "No Phone Number Available"
	      }
	});
	
	Entities.ContactCollection = Backbone.Collection.extend({
		model: Entities.Contact,
		comparator: function(Model){
		      var fullname = Model.get('firstName')+" "+Model.get('lastName');
		      return fullname;
	    }
	});
	var contacts;
	var initializeContacts = function(){
		contacts = new Entities.ContactCollection([
			{id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "123-456-7890"},
			{id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "123-456-7890"},
			{id: 3, firstName: "Alice", lastName: "Campbell", phoneNumber: "123-456-7890"},
			{id: 4, firstName: "Charlie", lastName: "Campbell", phoneNumber: "123-456-7890"}
		]);
	};
	
	var API = {
	    getContactEntities: function(){
		   if(contacts === undefined){
		      initializeContacts();	
		   }
		   return contacts;
	    }	
	};
	
	ContactManager.reqres.setHandler("contact:entities",function(){
	    return API.getContactEntities();	
	});
});
