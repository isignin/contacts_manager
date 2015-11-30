ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
	List.Controller = {
		listContacts: function(criterion){
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.regions.main.show(loadingView);
			
			var fetchingContacts = ContactManager.request("contact:entities");
			var contactsListLayout = new List.Layout();
			var contactsListPanel = new List.Panel();
			
			$.when(fetchingContacts).done(function(contacts){
				var filteredContacts = ContactManager.Entities.FilteredCollection({
					collection: contacts,
					filterFunction: function(filterCriterion){
						var criterion = filterCriterion.toLowerCase();
						return function(contact){
							if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1
							|| contact.get("lastName").toLowerCase().indexOf(criterion) !== -1
							|| contact.get("phoneNumber").toLowerCase().indexOf(criterion) !== -1){
								return contact;
							}
						};		
					}
				});
				
				if(criterion){
					filteredContacts.filter(criterion);
					contactsListPanel.once("show", function(){
						contactsListPanel.triggerMethod("set:filter:criterion", criterion);
					});
				}
				
				var contactsListView = new List.Contacts({
					collection: filteredContacts
				});
				contactsListPanel.on("contacts:filter", function(filterCriterion){
					filteredContacts.filter(filterCriterion);
					ContactManager.trigger("contacts:filter", filterCriterion);
				});
				contactsListLayout.on("show", function(){
				   contactsListLayout.panelRegion.show(contactsListPanel);
				   contactsListLayout.contactsRegion.show(contactsListView);
				}); 
				
				contactsListPanel.on("contact:new", function(){
					var newContact = new ContactManager.Entities.Contact();
					var view = new ContactManager.ContactsApp.New.Contact({
						model: newContact,
					});
					view.on("form:submit", function(data){
						var highestId = contacts.max(function(c){ return c.id; }).get("id");
						data.id = highestId + 1;
						if(newContact.save(data)){
							contacts.add(newContact);
							view.trigger("dialog:close");
							var newContactView = contactsListView.children.findByModel(newContact);
							if(newContactView){
								newContactView.flash("success");
							}
						} else {
							view.triggerMethod("form:data:invalid", newContact.validationError);
						}
					});
					ContactManager.regions.dialog.show(view);
				});
				
				contactsListView.on("childview:contact:show", function(childView, model){
				   ContactManager.trigger("contact:show",model.get("id"));		
				});
				contactsListView.on("childview:contact:edit", function(childView, model){
				    var view= new ContactManager.ContactsApp.Edit.Contact({
					    model: model,
				    });	
				    view.on("form:submit", function(data){
					  if(model.save(data)){
					    childView.render();
					    view.trigger("dialog:close");
					    childView.flash("Success");	
					  } else {
					     view.triggerMethod("form:data:invalid", model.validationError);	
					  }
				    });
				    ContactManager.regions.dialog.show(view);
				});
				contactsListView.on("childview:contact:delete", function(childView,model){
					model.destroy();
				});
				ContactManager.regions.main.show(contactsListLayout);
			});
			
		}
	}
});