/* Copyright (c) 2006 YourNameHere
   See the file LICENSE.txt for licensing information. */
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
function toxml(wbxml)
{AirSync = ({
0x05:'<Sync>',
0x06:'<Responses>', 
0x07:'<Add>', 
0x08:'<Change>', 
0x09:'<Delete>', 
0x0A:'<Fetch>', 
0x0B:'<SyncKey>', 
0x0C:'<ClientId>', 
0x0D:'<ServerId>', 
0x0E:'<Status>', 
0x0F:'<Collection>', 
0x10:'<Class>', 
0x12:'<CollectionId>', 
0x13:'<GetChanges>', 
0x14:'<MoreAvailable>', 
0x15:'<WindowSize>', 
0x16:'<Commands>', 
0x17:'<Options>', 
0x18:'<FilterType>', 
0x1B:'<Conflict>', 
0x1C:'<Collections>', 
0x1D:'<ApplicationData>', 
0x1E:'<DeletesAsMoves>', 
0x20:'<Supported>', 
0x21:'<SoftDelete>', 
0x22:'<MIMESupport>', 
0x23:'<MIMETruncation>', 
0x24:'<Wait>', 
0x25:'<Limit>', 
0x26:'<Partial>', 
0x27:'<ConversationMode>', 
0x28:'<MaxItems>', 
0x29:'<HeartbeatInterval>' 

})

FolderHierarachy = ({
0x07:'<DisplayName>',
0x08:'<ServerId>',
0x09:'<ParentId>',
0x0A:'<Type>',
0x0C:'<Status>',
0x0E:'<Changes>',
0x0F:'<Add>',
0x10:'<Delete>',
0x11:'<Update>',
0x12:'<SyncKey>',
0x13:'<FolderCreate>',
0x14:'<FolderDelete>',
0x15:'<FolderUpdate>',
0x16:'<FolderSync>',
0x17:'<Count>'
})

Contacts = ({
0x05:'<Anniversary>',
0x06:'<AssistantName>',
0x07:'<AssistantPhoneNumber>',
0x08:'<Birthday>',
0x0C:'<Business2PhoneNumber>',
0x0D:'<BusinessAddressCity>',
0x0E:'<BusinessAddressCountry>',
0x0F:'<BusinessAddressPostalCode>',
0x10:'<BusinessAddressState>',
0x11:'<BusinessAddressStreet>',
0x12:'<BusinessFaxNumber>',
0x13:'<BusinessPhoneNumber>',
0x14:'<CarPhoneNumber>',
0x15:'<Categories>',
0x16:'<Category>',
0x17:'<Children>',
0x18:'<Child>',
0x19:'<CompanyName>',
0x1A:'<Department>',
0x1B:'<Email1Address>',
0x1C:'<Email2Address>',
0x1D:'<Email3Address>',
0x1E:'<FileAs>',
0x1F:'<FirstName>',
0x20:'<Home2PhoneNumber>',
0x21:'<HomeAddressCity>',
0x22:'<HomeAddressCountry>',
0x23:'<HomeAddressPostalCode>',
0x24:'<HomeAddressState>',
0x25:'<HomeAddressStreet>',
0x26:'<HomeFaxNumber>',
0x27:'<HomePhoneNumber>',
0x28:'<JobTitle>',
0x29:'<LastName>',
0x2A:'<MiddleName>',
0x2B:'<MobilePhoneNumber>',
0x2C:'<OfficeLocation>',
0x2D:'<OtherAddressCity>',
0x2E:'<OtherAddressCountry>',
0x2F:'<OtherAddressPostalCode>',
0x30:'<OtherAddressState>',
0x31:'<OtherAddressStreet>',
0x32:'<PagerNumber>',
0x33:'<RadioPhoneNumber>',
0x34:'<Spouse>',
0x35:'<Suffix>',
0x36:'<Title>',
0x37:'<WebPage>',
0x38:'<YomiCompanyName>',
0x39:'<YomiFirstName>',
0x3A:'<YomiLastName>',
0x3C:'<Picture>',
0x3D:'<Alias>',
0x3E:'<WeightedRank>',
})

Code = ({0x07:FolderHierarachy, 0x01:Contacts, 0x00:AirSync})


CodePage = Code[0]
var stack = new Array();
num = 4
xml = ''
//alert(wbxml.length)
while (num < wbxml.length){
        token = wbxml.substr(num,1);
        tokencontent = token.charCodeAt(0) & 0xbf
         if (token || tokencontent in Code){
            if (token == String.fromCharCode(0x00)) { 
                num = num + 1
                x = (wbxml.substr(num,1)).charCodeAt(0)

                CodePage = Code[x] }             
            else if (token == String.fromCharCode(0x03)){ 
                xml = xml + (wbxml.substring(num + 1, wbxml.indexOf(String.fromCharCode(0x00),num))) 
                num = wbxml.indexOf(String.fromCharCode(0x00),num)
             }
                       
             else if (token == String.fromCharCode(0x01)){
               xml = xml + (stack.pop())}
             else if (tokencontent in CodePage){
                  xml = xml + (CodePage[tokencontent])
                  stack.push((CodePage[tokencontent]).replace('<','</'))}
             else if (token in CodePage) {
                  xml = xml + (CodePage[tokencontent])}
             else{
                  alert('unknown wbzml')
                }}
       num = num + 1
            }
            return xml
}
USER = 'mark'
PASSWORD = 'Sirius_1723'
command ='Sync'
SERVER = 'http://capeproject.org.uk/Microsoft-Server-ActiveSync'
deviceType = 'Thunderbird'

wbxmlouter = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x56,0x72,0x65,0x70,0x6C,0x61,0x63,0x65,0x68,0x65,0x72,0x65,0x01,0x01,0x01,0x01)
Contacts2 = ({
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

// wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x56,0x47,0x4C,0x03,0x43,0x6C,0x69,0x65,0x6E,0x74,0x49,0x44,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x5D,0x00,0x01,0x5E,0x03,0x44,0x69,0x73,0x70,0x6C,0x61,0x79,0x4E,0x61,0x6D,0x65,0x00,0x01,0x5F,0x03,0x46,0x69,0x72,0x73,0x74,0x4E,0x61,0x6D,0x65,0x00,0x01,0x69,0x03,0x4C,0x61,0x73,0x74,0x4E,0x61,0x6D,0x65,0x00,0x01,0x6B,0x03,0x4D,0x6F,0x62,0x69,0x6C,0x65,0x50,0x68,0x6F,0x6E,0x65,0x00,0x01,0x01,0x01,0x01,0x01,0x01,0x01)
wbxml= ''
// need a wbxml containg only <add> balh blah </add>
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
//wbxml = wbxml + String.fromCharCode(0x47,0x00,0x01)
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
synckey = '{ba39ef92-363b-40b4-a443-9358c66e0da1}6'
folderID ='03a9bfb7a32e440f92d8e2162fcc7e266b01000000000000'
wbxml = wbxml.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)

alert(numofcards)

xml = toxml(wbxml)
alert(xml)
//wbxml = Send()
xml = toxml(wbxml)
alert(xml)

cId = String.fromCharCode(0x4c,0x03) // 0x0C:'<ClientId>', 
sId = String.fromCharCode(0x4d,0x03) // 0x0D:'<ServerId>'
start = 0
for (var i=0; i<numofcards; i++){
start = wbxml.indexOf(cId,start)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ClientId = wbxml.substring(start + 2,end)
alert('ClientId = ' + ClientId)
start = wbxml.indexOf(sId,end)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ServerId = wbxml.substring(start +2,end)
alert('ServerId = ' +  ServerId)
alert(start + ' ' + end)
addressBook = abManager.getDirectory("moz-abmdbdirectory://abook.mab");
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){
alert(card.localId)
if (card.localId === ClientId){ 
card.setProperty('ServerId', 'ServerId')
addressBook.modifyCard(card)
}}}
}
}

