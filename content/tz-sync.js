function go() {

var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
addressUrl = prefs.getCharPref("abname")      
host = prefs.getCharPref("host")
USER = prefs.getCharPref("user")
PASSWORD = prefs.getCharPref("password")
SSL = prefs.getBoolPref("https")
if (SSL == true){SERVER = "https://" + host + "/Microsoft-Server-ActiveSync"}
else{SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"}
deviceType = 'Thunderbird'
synckey = prefs.getCharPref("synckey")
if (synckey == '')
    {GetFolderId()
    fromzpush()
    tozpush()}

else {fromzpush()
      tozpush()}


//new Date()
LastSyncTime = Date.now()
prefs.setCharPref("LastSyncTime",LastSyncTime)
// alert(LastSyncTime)
}