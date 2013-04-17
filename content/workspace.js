PASSWORD="demo1"
USER="demo1"
host="capeproject.org.uk"
hthost = "http://" + host
SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"
 var nsLoginInfo = new Components.Constructor(
    "@mozilla.org/login-manager/loginInfo;1",
    Components.interfaces.nsILoginInfo,
    "init");

var loginInfo = new nsLoginInfo(hthost,SERVER,null,USER,PASSWORD,"USER","PASSWORD");
 var myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
        getService(Components.interfaces.nsILoginManager);
      // myLoginManager.removeLogin(loginInfo)
alert("removed")
      var logins = myLoginManager.findLogins({}, hthost, SERVER, null);
//myLoginManager.removeLogin(loginInfo)
for (var i = 0; i < logins.length; i++) {
        if (logins[i].username == USER) {
            password = logins[i].password;
            break;
        }}

if (typeof password === 'undefined') {alert("gone")}
else{
alert(password)
}