 var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
        abManager = Components.classes["@mozilla.org/abmanager;1"] 
		.getService(Components.interfaces.nsIAbManager);
        allAddressBooks = abManager.directories;
        
var tzpush = {
  onLoad: function() {
   // autosync = prefs.getCharPref("autosync")
   // if (autosync != 0) {
   // interval = window.setInterval(go, autosync*60*1000)
    //}
  },

  onMenuItemCommand: function() {
    window.open(
		"chrome://tzpush/content/pref.xul",
		"", 
		"chrome,centerscreen,modal,toolbar", 
		null, null
	);
    
  },
  
  onSync: function() {
    go();
  }
};
