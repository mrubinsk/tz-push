/* Copyright (c) 2006 YourNameHere
   See the file LICENSE.txt for licensing information. */
function FindFolder(wbxml)
{
start = 0
contact = wbxml.indexOf('Contacts')
while (wbxml.indexOf(String.fromCharCode(0x48,0x03),start) < contact)
{
start = wbxml.indexOf(String.fromCharCode(0x48,0x03),start) + 2
end = wbxml.indexOf(String.fromCharCode(0x00),start)
folderID = wbxml.substring(start,end)
}
return folderID
}

function FindKey(wbxml)
{
x = String.fromCharCode(0x4b,0x03) //<SyncKey> Code Page 0
if (wbxml.substr(5,1) == String.fromCharCode(0x07))
{
x = String.fromCharCode(0x52,0x03) //<SyncKey> Code Page 7
}
start = wbxml.indexOf(x) + 2
end = wbxml.indexOf(String.fromCharCode(0x00),start)
synckey = wbxml.substring(start,end)
return synckey

}

function Send(wbxml)
{
// alert(toxml(wbxml))  
var req = new XMLHttpRequest(); 
	req.mozBackgroundRequest = true; 
	req.open("POST", SERVER +'?Cmd=' + command +'&User='+ USER +'&DeviceId=TZ-PUSH', false);
	req.overrideMimeType('application/vnd.ms-sync.wbxml'); 
	req.setRequestHeader("User-Agent", deviceType+' ActiveSync');
	req.setRequestHeader("Content-Type", 'application/vnd.ms-sync.wbxml');
	req.setRequestHeader("Authorization", 'Basic '+btoa(USER+':'+PASSWORD));
	req.setRequestHeader("MS-ASProtocolVersion", '2.5');
	req.setRequestHeader("Content-Length", wbxml.length);
        req.sendAsBinary(wbxml);
        wbxml = req.responseText;
//        alert(toxml(wbxml))
        return wbxml;
}

function GetFolderId()
{
 var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");   
command = 'FolderSync'
wbxml = String.fromCharCode(0x03,0x01,0x6a,0x00,0x00,0x07,0x56,0x52,0x03,0x30,0x00,0x01,0x01)

wbxml = Send(wbxml)
synckey = FindKey(wbxml)
folderID = FindFolder(wbxml)

wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x30,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('Id2Replace',folderID)
//what = FindFolder(wbxml)
//alert(wbxml)
command = 'Sync'
wbxml = Send(wbxml)
synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)
prefs.setCharPref("folderID", folderID)
}


