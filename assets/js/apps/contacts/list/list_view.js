ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
	List.Layout = Marionette.LayoutView.extend({
	   template: "#contact-list-layout",
	   regions: {
	     panelRegion: "#panel-region",
	     contactsRegion: "#contacts-region"	
	   }	
	});
	List.Panel = Marionette.ItemView.extend({
	    template: "#contact-list-panel",
	    triggers: {
		   "click button.js-new": "contact:new"
  	    },
		events: {
			"submit #filter-form": "filterContacts"
		},
		filterContacts: function(e){
			e.preventDefault();
			var criterion = this.$(".js-filter-criterion").val();
			this.trigger("contacts:filter", criterion);
		}
	});
	
	List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",
		events: {
		    "click": "highlightName",
		    "click td a.js-show": "showClicked",
		    "click td a.js-edit": "editClicked",
		    "click button.js-delete": "deleteClicked"
	      },
	      highlightName: function(e){
		     this.$el.toggleClass("warning");
	      },
	      showClicked: function(e){
		     e.preventDefault();
		     e.stopPropagation();
		     this.trigger("contact:show", this.model);
	      },
	      editClicked: function(e){
		     e.preventDefault();
		     e.stopPropagation();
		     this.trigger("contact:edit",this.model);
	      },
	      deleteClicked: function(e){
		    e.stopPropagation();
		    this.trigger("contact:delete", this.model);
	      },
	      // fading effect when deleting model
	      remove: function(){
		     var self = this;
		     this.$el.fadeOut(function(){
			   Marionette.ItemView.prototype.remove.call(self);
		     });
	      },
	      flash: function(cssClass){
		    var $view = this.$el;
		    $view.hide().toggleClass(cssClass).fadeIn(800,function(){
			    setTimeout(function(){
				   $view.toggleClass(cssClass)
				}, 500);
		    });
	      }
	});
	
	List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: '#contact-list',
		childView: List.Contact,
		childViewController: "tbody"
	});
});