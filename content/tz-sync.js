/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */

function onopen() {
    updateprefs()
    document.getElementById('passbox').value = PASSWORD
}
function onclose() {
 setpassword()
 auto()
}
function autobut() {
 setpassword()
 auto()
}

var event = {
  notify: function(timer) {
    go();
  }
}


function auto() {
        
       
     synctime = prefs.getCharPref("autosync") * 1000 * 60
     timer.cancel()
     if (prefs.getCharPref("autosync") != 0 ) {         
         timer.initWithCallback(event,synctime,3);
            }
         
                }
                
function startgo() {
        if (prefs.getCharPref("autosync") != 0 ) {
        auto()
        go() ;
                }
               
}
function getpassword() {
        var myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
        getService(Components.interfaces.nsILoginManager);
       
      var logins = myLoginManager.findLogins({}, hthost, SERVER, null);
       password = ''
       for (var i = 0; i < logins.length; i++) {
        if (logins[i].username == USER) {
            password = logins[i].password;
            break;
        }
       
    }
return password
}

function setpassword() {
   if (document.getElementById('passbox').value != PASSWORD) {
        NEWPASSWORD = document.getElementById('passbox').value
 var nsLoginInfo = new Components.Constructor(
    "@mozilla.org/login-manager/loginInfo;1",
    Components.interfaces.nsILoginInfo,
    "init");
    var loginInfo = new nsLoginInfo(hthost,SERVER,null,USER,PASSWORD,"USER","PASSWORD");
    var updateloginInfo = new nsLoginInfo(hthost,SERVER,null,USER,NEWPASSWORD,"USER","PASSWORD");
    var myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
        getService(Components.interfaces.nsILoginManager);
if (PASSWORD != ''){
myLoginManager.removeLogin(loginInfo)}
myLoginManager.addLogin(updateloginInfo);
    }
}

function updateprefs() {
addressUrl = prefs.getCharPref("abname")
SSL = prefs.getBoolPref("https")
host = prefs.getCharPref("host")
if (SSL == true){hthost = "https://" + host}
else{hthost = "http://" + host}
if (SSL == true){SERVER = "https://" + host + "/Microsoft-Server-ActiveSync"}
else{SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"}
USER = prefs.getCharPref("user")
PASSWORD = getpassword()
deviceType = 'Thunderbird'
deviceId = prefs.getCharPref("deviceId")
if (deviceId == "")
{deviceId = Date.now();
prefs.setCharPref("deviceId",deviceId)}
polkey = prefs.getCharPref("polkey")
synckey = prefs.getCharPref("synckey")    
}

function setandgo() {
    setpassword()
    auto()
    go()
}
function go() {
    time = prefs.getCharPref("LastSyncTime") / 1000
   time2 = Date.now() / 1000
updateprefs()
if (prefs.getBoolPref("prov"))
{
PolKey()
}
else {
if (synckey == '')
    {GetFolderId()
    //fromzpush()
    //tozpush()
    }

else {fromzpush()
     // tozpush()
     // senddel()
     }

}



}


