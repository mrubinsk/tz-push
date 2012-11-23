/* Copyright (c) 2006 YourNameHere
   See the file LICENSE.txt for licensing information. */

function tozpush()
{
var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
time = prefs.getCharPref("LastSyncTime") / 1000	
        
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
 
wbxml = wbxml + String.fromCharCode(Contacts2[x]) + String.fromCharCode(0x03) + card.getProperty(x,'') +String.fromCharCode(0x00,0x01)
}

}

cardArr.push(card) 


wbxml = wbxml + String.fromCharCode(0x01,0x01,0x00,0x00)
}
}

newcards = numofcards }
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){
if (card.getProperty("LastModifiedDate","") > time ) {
numofcards = numofcards + 1     
name = card.getProperty("FirstName","")
// alert(name + " " +card.getProperty("LastModifiedDate",""))
 
wbxml = wbxml + String.fromCharCode(0x48,0x4D,0x03) + card.getProperty("ServerId","") + String.fromCharCode(0x00,0x01,0x5D,0x00,0x01)
for (x in Contacts2){
     if (card.getProperty(x,"") != '') {

wbxml = wbxml + String.fromCharCode(Contacts2[x]) + String.fromCharCode(0x03) + card.getProperty(x,'') +String.fromCharCode(0x00,0x01)
}

}
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
wbxml = Send(wbxml)
synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)
//xml = toxml(wbxml)
//alert(xml)

cId = String.fromCharCode(0x4c,0x03) // 0x0C:'<ClientId>', 
sId = String.fromCharCode(0x4d,0x03) // 0x0D:'<ServerId>'
start = 0
for (var i=0; i< newcards; i++){
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
card.setProperty('ServerId', ServerId)
addressBook.modifyCard(card)
}}}
}

}
//synckey = FindKey(wbxml)
//alert(toxml(wbxml))
}