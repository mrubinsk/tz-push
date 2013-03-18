function auto() {
    //alert("inauto")
 var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
        synctime = prefs.getCharPref("autosync") * 1000 * 60
        if (synctime != 0 ) {window.setInterval(go,synctime)}
}
function poppop() {alert("timer")}
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
deviceId = prefs.getCharPref("deviceId")
if (deviceId == "")
{deviceId = Date.now();
prefs.setCharPref("deviceId",deviceId)}
polkey = prefs.getCharPref("polkey")
synckey = prefs.getCharPref("synckey")
if (prefs.getBoolPref("prov"))
{
PolKey()
}
if (deviceId == "")
{}
if (synckey == '')
    {GetFolderId()
    fromzpush()
    tozpush()}

else {fromzpush()
      tozpush()
      senddel()}


//new Date()
LastSyncTime = Date.now()
prefs.setCharPref("LastSyncTime",LastSyncTime)
// alert(LastSyncTime)
}
 var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
if (prefs.getCharPref("autosync") != 0 ) {go()}

