ContactManager.module("Common.Views",function(Views, ContactManager, Backbone, Marinette, $, _){
   Views.Loading = Marionette.ItemView.extend({
	   template: "#loading-view",
	   onShow: function(){
	     var opts = {
		   lines: 13,
		   length: 20,
		   width: 10,
		   radius: 30,
		   corners: 1,
		   rotate: 0,
		   direction: 1,
		   color: "#3387CC",
		   speed: 1,
		   trail: 60,
		   shadow: false,
		   hwaccel: false,
		   className: "spinner",
		   zIndex: 2e9,
		   top: "50%",
		   left: "50%"
	      }	;
	      $("#spinner").spin(opts);
	   }
   });	
});