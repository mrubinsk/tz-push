/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */


function writewbxml(wbxml) {
            Components.utils.import("resource://gre/modules/FileUtils.jsm");
 			var dir = FileUtils.getDir("ProfD", ["wbxml"], true);
			var file = FileUtils.getFile("ProfD", ["wbxml"]);
                        file.append("wbxml-output")
              file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, FileUtils.PERMS_FILE);	
			
				
			
			var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
				.createInstance(Components.interfaces.nsIFileOutputStream);
			//var file = Components.classes["@mozilla.org/file/directory_service;1"]
			//			         .getService(Components.interfaces.nsIProperties)
			//			         .get("ProfD", Components.interfaces.nsIFile);
			//file.append("wbxml");
			//file.append(filewbxml); 
			foStream.init(file, 0x02 | 0x08 | 0x20, 0600, 0);   // write, create, truncate
				var binary = wbxml;
				foStream.write(binary, binary.length);
			foStream.close();}
                        
  function myDump(aMessage,what) {
  var consoleService = Components.classes["@mozilla.org/consoleservice;1"]
                                 .getService(Components.interfaces.nsIConsoleService);
  consoleService.logStringMessage(what + aMessage); }                     

function toxml(wbxml){
AirSyncBase = ({
0x05:'<BodyPreference>',
0x06:'<Type>',
0x07:'<TruncationSize>',
0x08:'<AllOrNone>',
0x0A:'<Body>',
0x0B:'<Data>',
0x0C:'<EstimatedDataSize>',
0x0D:'<Truncated>',
0x0E:'<Attachments>',
0x0F:'<Attachment>',
0x10:'<DisplayName>',
0x11:'<FileReference>',
0x12:'<Method>',
0x13:'<ContentId>',
0x14:'<ContentLocation>',
0x15:'<IsInline>',
0x16:'<NativeBodyType>',
0x17:'<ContentType>',
0x18:'<Preview>',
0x19:'<BodyPartPreference>',
0x1A:'<BodyPart>',
0x1B:'<Status>'        
})

AirSync = ({
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
0x09:'<body>',
0x0A:'<BodySize>',
0x0B:'<BodyTruncated>',
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

Provision=({
0x05:'<Provision>',
0x06:'<Policies>',
0x07:'<Policy>',
0x08:'<PolicyType>',
0x09:'<PolicyKey>',
0x0A:'<Data>',
0x0B:'<Status>',
0x0C:'<RemoteWipe>',
0x0D:'<EASProvisionDoc>',
0x0E:'<DevicePasswordEnabled>',
0x0F:'<AlphanumericDevicePasswordRequired>',
0x10:'<DeviceEncryptionEnabled>',
// 0x10:'<RequireStorageCardEncryption>',
0x11:'<PasswordRecoveryEnabled>',
0x13:'<AttachmentsEnabled>',
0x14:'<MinDevicePasswordLength>',
0x15:'<MaxInactivityTimeDeviceLock>',
0x16:'<MaxDevicePasswordFailedAttempts>',
0x17:'<MaxAttachmentSize>',
0x18:'<AllowSimpleDevicePassword>',
0x19:'<DevicePasswordExpiration>',
0x1A:'<DevicePasswordHistory>',
0x1B:'<AllowStorageCard>',
0x1C:'<AllowCamera>',
0x1D:'<RequireDeviceEncryption>',
0x1E:'<AllowUnsignedApplications>',
0x1F:'<AllowUnsignedInstallationPackages>',
0x20:'<MinDevicePasswordComplexCharacters>',
0x21:'<AllowWiFi>',
0x22:'<AllowTextMessaging>',
0x23:'<AllowPOPIMAPEmail>',
0x24:'<AllowBluetooth>',
0x25:'<AllowIrDA>',
0x26:'<RequireManualSyncWhenRoaming>',
0x27:'<AllowDesktopSync>',
0x28:'<MaxCalendarAgeFilter>',
0x29:'<AllowHTMLEmail>',
0x2A:'<MaxEmailAgeFilter>',
0x2B:'<MaxEmailBodyTruncationSize>',
0x2C:'<MaxEmailHTMLBodyTruncationSize>',
0x2D:'<RequireSignedSMIMEMessages>',
0x2E:'<RequireEncryptedSMIMEMessages>',
0x2F:'<RequireSignedSMIMEAlgorithm>',
0x30:'<RequireEncryptionSMIMEAlgorithm>',
0x31:'<AllowSMIMEEncryptionAlgorithmNegotiation>',
0x32:'<AllowSMIMESoftCerts>',
0x33:'<AllowBrowser>',
0x34:'<AllowConsumerEmail>',
0x35:'<AllowRemoteDesktop>',
0x36:'<AllowInternetSharing>',
0x37:'<UnapprovedInROMApplicationList>',
0x38:'<ApplicationName>',
0x39:'<ApprovedApplicationList>',
0x3A:'<Hash>',    
})

Code = ({0x07:FolderHierarachy, 0x01:Contacts, 0x00:AirSync, 0x0E:Provision, 0x11:AirSyncBase})


CodePage = Code[0]
var stack = new Array();
num = 4
xml = ''
while (num < wbxml.length){
        token = wbxml.substr(num,1);
        tokencontent = token.charCodeAt(0) & 0xbf
         if (token || tokencontent in Code){
            if (token == String.fromCharCode(0x00)) { 
                num = num + 1
                x = (wbxml.substr(num,1)).charCodeAt(0)

      
                CodePage = Code[x] 
                
                }
            else if (token == String.fromCharCode(0x03)){ 
                xml = xml + (wbxml.substring(num + 1, wbxml.indexOf(String.fromCharCode(0x00,0x01),num))) 
                num = wbxml.indexOf(String.fromCharCode(0x00,0x01),num)
             }
                       
             else if (token == String.fromCharCode(0x01)){
               xml = xml + (stack.pop())}
             else if (tokencontent in CodePage) {
               // alert(tokencontent)
                  xml = xml + (CodePage[tokencontent])
                  stack.push((CodePage[tokencontent]).replace('<','</'))}
             else if (token in CodePage) {
                  xml = xml + (CodePage[tokencontent])}
             else{
                  
                }}
                //alert(xml)
       num = num + 1
            }

            return xml
        
}