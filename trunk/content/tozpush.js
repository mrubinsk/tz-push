/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */
function mycallback1(returnedwbxml) {
wbxml=returnedwbxml

synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)


cId = String.fromCharCode(0x4c,0x03) // 0x0C:'<ClientId>', 
sId = String.fromCharCode(0x4d,0x03) // 0x0D:'<ServerId>'
start = 0
for (var i=0; i< newcards; i++){
start = wbxml.indexOf(cId,start)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ClientId = wbxml.substring(start + 2,end)

start = wbxml.indexOf(sId,end)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ServerId = wbxml.substring(start +2,end)

addressBook = abManager.getDirectory(addressUrl);
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){

if (card.localId === ClientId){ 
card.setProperty('ServerId', ServerId)
addressBook.modifyCard(card)
}}}
}
senddel()
}

function tozpush()
{
//time = prefs.getCharPref("LastSyncTime") / 1000

        
wbxmlouter = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x56,0x72,0x65,0x70,0x6C,0x61,0x63,0x65,0x68,0x65,0x72,0x65,0x01,0x01,0x01,0x01)



wbxml= ''
abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory(addressUrl);
count = 0
numofcards = 0
var cardArr = new Array();
mbd = 0
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){
if (card.getProperty('ServerId','') == ''){
numofcards = numofcards + 1    
wbxml = wbxml + String.fromCharCode(0x47,0x4C,0x03) + card.localId + String.fromCharCode(0x00,0x01,0x5D,0x00,0x01)
for (x in Contacts2){
     
     if (card.getProperty(x,"") != '')
     { 
	  if (x == 'BirthYear' || x == 'BirthMonth' || x == 'BirthDay'){
	       
	  if (x == 'BirthYear')
	  {
	       birthy = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	   else if (x == 'BirthMonth')
	  {		  
	       birthm = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  
	  else if (x == 'BirthDay')
	  {
	       birthd = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  if (mbd == 3){birthymd = birthy + "-" + birthm + "-" + birthd + "T00:00:00.000Z";
	  mbd = 0
	  if (prefs.getBoolPref("birthday") == true){
	  wbxml = wbxml + String.fromCharCode(0x48) + String.fromCharCode(0x03) + birthymd +String.fromCharCode(0x00,0x01)
	  }
	  }}
 else {wbxml = wbxml + String.fromCharCode(Contacts2[x]) + String.fromCharCode(0x03) + card.getProperty(x,'') +String.fromCharCode(0x00,0x01)}
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
     
if (card.getProperty("LastModifiedDate","") > time && card.getProperty("LastModifiedDate","") < time2 ) {
    numofcards = numofcards + 1     
name = card.getProperty("FirstName","")

 
wbxml = wbxml + String.fromCharCode(0x48,0x4D,0x03) + card.getProperty("ServerId","") + String.fromCharCode(0x00,0x01,0x5D,0x00,0x01)
for (x in Contacts2){
     if (card.getProperty(x,"") != '') {
if (x == 'BirthYear' || x == 'BirthMonth' || x == 'BirthDay'){
	       
	  if (x == 'BirthYear')
	  {
	       birthy = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	   else if (x == 'BirthMonth')
	  {		  
	       birthm = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  
	  else if (x == 'BirthDay')
	  {
	       birthd = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  if (mbd == 3){birthymd = birthy + "-" + birthm + "-" + birthd + "T00:00:00.000Z";
	  mbd = 0
	  if (prefs.getBoolPref("birthday") == true){
	  wbxml = wbxml + String.fromCharCode(0x48) + String.fromCharCode(0x03) + birthymd +String.fromCharCode(0x00,0x01)
	  }
	  }}
	  else {
wbxml = wbxml + String.fromCharCode(Contacts2[x]) + String.fromCharCode(0x03) + card.getProperty(x,'') +String.fromCharCode(0x00,0x01)
	  }
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


wbxml = Send(wbxml,mycallback1)


}
else {senddel()}

}
