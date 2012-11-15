function go() {
function FindFolder(wbxml)
{
start = 0
contact = wbxml.indexOf('Contacts')
//tmp = wbxml.indexOf(String.fromCharCode(0x48,0x03)
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

function Send()
{
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
        return wbxml;
}


function GetFolderId()
{
command = 'FolderSync'
wbxml = String.fromCharCode(0x03,0x01,0x6a,0x00,0x00,0x07,0x56,0x52,0x03,0x30,0x00,0x01,0x01)
//var request = new XMLHttpRequest();


wbxml = Send()
synckey = FindKey(wbxml)
folderID = FindFolder(wbxml)

wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x30,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('Id2Replace',folderID)
//what = FindFolder(wbxml)
//alert(wbxml)
command = 'Sync'
wbxml = Send()
synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)
prefs.setCharPref("folderID", folderID)
}

function Addressbook(){
Contacts2 = {
0x5F:'FirstName',
0x69:'LastName',
0x5E:'DisplayName', 
//'Nickname':'
0x5B:'PrimaryEmail',
0x5C:'SecondEmail',
//'Screen Name':'
0x53:'WorkPhone',
0x67:'HomePhone',
0x66:'FaxNumber',
//'PagerNumber':'
0x6B:'CellularNumber',
0x65:'HomeAddress',
//'HomeAddress2':'
0x61:'HomeCity',
0x64:'HomeState',
0x63:'HomeZipCode',
0x62:'HomeCountry',
0x51:'WorkAddress',
//'WorkAddress2':'
0x4D:'WorkCity',
0x50:'WorkState',
0x4F:'WorkZipCode',
0x4E:'WorkCountry',
0x68:'JobTitle',
0x5A:'Department',
0x59:'Organisation',
0x77:'WebPage1',
//'WebPage2':'
//'BirthYear':'
//'BirthMonth':'
//'BirthDay':'
//'Custom1':'
//'Custom2':'
//'Custom3':'
//'Custom4':'
//'Notes':'
}
card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);    
moreavilable = 1
while (moreavilable == 1) {   
wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x1E,0x13,0x55,0x03,0x31,0x30,0x30,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x01,0x01,0x01)
folderID = prefs.getCharPref("folderID")
synckey = prefs.getCharPref("synckey")
wbxml = wbxml.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)

command = "Sync"
wbxml = Send()
synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)

abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory("moz-abmdbdirectory://abook.mab");
//alert("about to start")
// CodePage = Code[0]
var stack = new Array();
num = 4
xml = ''
data = ''
var x = 0
popval = 2
moreavilable = 0
while (num < wbxml.length){
        token = wbxml.substr(num,1);
        tokencontent = token.charCodeAt(0) & 0xbf
            if (token == String.fromCharCode(0x00))
         { 
                num = num + 1
                x = (wbxml.substr(num,1)).charCodeAt(0)
   //             CodePage = Code[x]
              //  writeln('codepage = ' + x)
          }             
            else if (token == String.fromCharCode(0x03) )
          {      temptoken = (wbxml.substr(num - 1,1)).charCodeAt(0) // & 0xbf
                data = (wbxml.substring(num + 1, wbxml.indexOf(String.fromCharCode(0x00),num))) 
                num = wbxml.indexOf(String.fromCharCode(0x00),num)
                if (x === 0x01) {                
                 propname = Contacts2[temptoken]
                 //alert(propname + ' ' + data)
                card.setProperty(propname, data)}
                if (x == 0 && temptoken == 0x4D) {card.setProperty('ServerId',data)};
                //alert('ServerId = ' + data)}
             }
                
         
                       
            else if (token == String.fromCharCode(0x01))
         {
             popval = stack.pop()
            if (popval === 500) {                
             var newCard = addressBook.addCard(card);
            //alert(FirstName +' '+ LastName +' '+ CellularNumber +' '+ PrimaryEmail);
             card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);
                }
              else if (popval === 600)
              {card = addressBook.getCardFromProperty("ServerId",data,false);
               // alert(data)
               cardsToDelete = Components.classes["@mozilla.org/array;1"]
                         .createInstance(Components.interfaces.nsIMutableArray);
                        // alert(card.getProperty("ServerId",""))
                        // alert(card.getProperty("FirstName",""))        
               cardsToDelete.appendElement(card,"");
               addressBook.deleteCards(cardsToDelete)
               }
          }
             else if (tokencontent == 7 & x == 0 )
         {        
                //  alert(x)
                  // prepare addressbook ie if codepage =1 and email
                  stack.push(500)
                  // writeln(CodePage[tokencontent])
          }
          
              else if (tokencontent == 9 & x == 0 )
         {        
                //  alert(x)
                  // prepare addressbook ie if codepage =1 and email
                  stack.push(600)
                  // writeln(CodePage[tokencontent])
          }
          
          else if (token.charCodeAt(0) === 0x14 & x == 0) {
           //alert("MoreAvailable")
           moreavilable = 1} 
       
          
             else if (tokencontent)
         {
                  stack.push(tokencontent)
          }
           
          
             else{}
             num = num + 1
             //alert(token.charCodeAt(0))
          }}
          }
         


function fromzpush()
{
wbxmlouter = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x56,0x72,0x65,0x70,0x6C,0x61,0x63,0x65,0x68,0x65,0x72,0x65,0x01,0x01,0x01,0x01)
Contacts2= ({
'FirstName':0x5F,
'LastName':0x69,
'DisplayName':0x5E, 
//'Nickname':'
'PrimaryEmail':0x5B,
'SecondEmail':0x5C,
//'Screen Name':'
'WorkPhone':0x53,
'HomePhone':0x67,
'FaxNumber':0x66,
//'PagerNumber':'
'CellularNumber':0x6B,
'HomeAddress':0x65,
//'HomeAddress2':'
'HomeCity':0x61,
'HomeState':0x64,
'HomeZipCode':0x63,
'HomeCountry':0x62,
'WorkAddress':0x61,
//'WorkAddress2':'
'WorkCity':0x4D,
'WorkState':0x50,
'WorkZipCode':0x4F,
'WorkCountry':0x50,
'JobTitle':0x68,
'Department':0x5A,
'Organisation':0x59,
'WebPage1':0x77,
//'WebPage2':'
//'BirthYear':'
//'BirthMonth':'
//'BirthDay':'
//'Custom1':'
//'Custom2':'
//'Custom3':'
//'Custom4':'
//'Notes':'
})


wbxml= ''
abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory("moz-abmdbdirectory://abook.mab");
count = 0
numofcards = 0
var cardArr = new Array();
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){
if (card.getProperty('ServerId','') == ''){
numofcards = numofcards + 1    
wbxml = wbxml + String.fromCharCode(0x47,0x4C,0x03) + card.localId + String.fromCharCode(0x00,0x01,0x5D,0x00,0x01)
for (x in Contacts2){
     if (card.getProperty(x,"") != '') {
// alert(card.getProperty(x,''))
// alert(Contacts2[x])
// alert(card.localId)
// alert(card.directoryId)
// alert(card.uuid)
wbxml = wbxml + String.fromCharCode(Contacts2[x]) + String.fromCharCode(0x03) + card.getProperty(x,'') +String.fromCharCode(0x00,0x01)
}

}

cardArr.push(card) 


wbxml = wbxml + String.fromCharCode(0x01,0x01,0x00,0x00)
}
}
}
if (numofcards != 0){
wbxmlinner = wbxml
wbxml = wbxmlouter.replace('replacehere',wbxmlinner)
wbxml = wbxml.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)

//alert(numofcards)

//xml = toxml(wbxml)
//alert(xml)
wbxml = Send()
//xml = toxml(wbxml)
//alert(xml)

cId = String.fromCharCode(0x4c,0x03) // 0x0C:'<ClientId>', 
sId = String.fromCharCode(0x4d,0x03) // 0x0D:'<ServerId>'
start = 0
for (var i=0; i<numofcards; i++){
start = wbxml.indexOf(cId,start)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ClientId = wbxml.substring(start + 2,end)
//alert('ClientId = ' + ClientId)
start = wbxml.indexOf(sId,end)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ServerId = wbxml.substring(start +2,end)
//alert('ServerId = ' +  ServerId)
//alert(start + ' ' + end)
addressBook = abManager.getDirectory("moz-abmdbdirectory://abook.mab");
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){
//alert(card.localId)
if (card.localId === ClientId){ 
card.setProperty('ServerId', 'ServerId')
addressBook.modifyCard(card)
}}}
}
}
prefs.setCharPref("synckey",synckey) }

var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
        
host = prefs.getCharPref("host")
USER = prefs.getCharPref("user")
PASSWORD = prefs.getCharPref("password")
SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"
deviceType = 'Thunderbird'
synckey = prefs.getCharPref("synckey")
if (synckey == ''){
    GetFolderId()
    Addressbook()
    fromzpush()
}
else {Addressbook()
	fromzpush()}

synckey = FindKey(wbxml)
//prefs.setCharPref("synckey",synckey)
//new Date()
LastSyncTime = Date.now()
prefs.setCharPref("LastSyncTime",LastSyncTime)
// alert(LastSyncTime)
}