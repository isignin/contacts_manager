ContactManager.module("Entities", function(Entities, ContactManager,Backbone, Marionette, $, _){
	Entities.Contact = Backbone.Model.extend({
		urlRoot: "contacts",
		defaults: {
		   firstName: "",
		   lastName: "",  
		   phoneNumber: ""
	      }
	});

	Entities.configureStorage(ContactManager.Entities.Contact);
	
	Entities.ContactCollection = Backbone.Collection.extend({
		url: "contacts",
		model: Entities.Contact,
		comparator: function(Model){
		      var fullname = Model.get('firstName')+" "+Model.get('lastName');
		      return fullname;
	    }
	});

	Entities.configureStorage(ContactManager.Entities.ContactCollection);
	
	var initializeContacts = function(){
		var contacts = new Entities.ContactCollection([
			{id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "123-456-7890"},
			{id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "123-456-7890"},
			{id: 3, firstName: "Alice", lastName: "Campbell", phoneNumber: "123-456-7890"},
			{id: 4, firstName: "Charlie", lastName: "Campbell", phoneNumber: "123-456-7890"}
		]);
		contacts.forEach(function(contact){
		   contact.save();	
		});
		return contacts;
	};
	
	var API = {
	    getContactEntities: function(){
		   var contacts = new Entities.ContactCollection();
		   contacts.fetch();
		   if(contacts.length === 0){
			 return initializeContacts;
		   };
		   return contacts;
	    },
	
	    getContactEntity: function(contactId){
	       var contact = new Entities.Contact({id: contactId});
	       contact.fectch();
	       return contact;
	   }	
	};
	
	ContactManager.reqres.setHandler("contact:entities",function(){
	    return API.getContactEntities();	
	});
	
	ContactManager.reqres.setHandler("contact:entity",function(id){
	    return API.getContactEntity(id);	
	});
});
