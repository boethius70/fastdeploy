/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:4,patch:2,flag:"",revision:Number("$Rev: 7616 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_e,_f){
if(typeof _e!="string"){
return dojo.global();
}
if(_e.indexOf(".")==-1){
return dojo.evalProp(_e,dojo.global(),_f);
}
var ref=dojo.parseObjPath(_e,dojo.global(),_f);
if(ref){
return dojo.evalProp(ref.prop,ref.obj,_f);
}
return null;
};
dojo.errorToString=function(_11){
if(!dj_undef("message",_11)){
return _11.message;
}else{
if(!dj_undef("description",_11)){
return _11.description;
}else{
return _11;
}
}
};
dojo.raise=function(_12,_13){
if(_13){
_12=_12+": "+dojo.errorToString(_13);
}else{
_12=dojo.errorToString(_12);
}
try{
if(djConfig.isDebug){
dojo.hostenv.println("FATAL exception raised: "+_12);
}
}
catch(e){
}
throw _13||Error(_12);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_15){
return dj_global.eval?dj_global.eval(_15):eval(_15);
}
dojo.unimplemented=function(_16,_17){
var _18="'"+_16+"' not implemented";
if(_17!=null){
_18+=" "+_17;
}
dojo.raise(_18);
};
dojo.deprecated=function(_19,_1a,_1b){
var _1c="DEPRECATED: "+_19;
if(_1a){
_1c+=" "+_1a;
}
if(_1b){
_1c+=" -- will be removed in version: "+_1b;
}
dojo.debug(_1c);
};
dojo.render=(function(){
function vscaffold(_1d,_1e){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1d};
for(var i=0;i<_1e.length;i++){
tmp[_1e[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _21={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,delayMozLoadingFix:false,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_21;
}else{
for(var _22 in _21){
if(typeof djConfig[_22]=="undefined"){
djConfig[_22]=_21[_22];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _25=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _26={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_27,_28){
this.modulePrefixes_[_27]={name:_27,value:_28};
},moduleHasPrefix:function(_29){
var mp=this.modulePrefixes_;
return Boolean(mp[_29]&&mp[_29].value);
},getModulePrefix:function(_2b){
if(this.moduleHasPrefix(_2b)){
return this.modulePrefixes_[_2b].value;
}
return _2b;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2c in _26){
dojo.hostenv[_2c]=_26[_2c];
}
})();
dojo.hostenv.loadPath=function(_2d,_2e,cb){
var uri;
if(_2d.charAt(0)=="/"||_2d.match(/^\w+:/)){
uri=_2d;
}else{
uri=this.getBaseScriptUri()+_2d;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return !_2e?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2e,cb);
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return true;
}
var _33=this.getText(uri,null,true);
if(!_33){
return false;
}
this.loadedUris[uri]=true;
if(cb){
_33="("+_33+")";
}
var _34=dj_eval(_33);
if(cb){
cb(_34);
}
return true;
};
dojo.hostenv.loadUriAndCheck=function(uri,_36,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return Boolean(ok&&this.findModule(_36,false));
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3d){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3d]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_40){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_40]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if(this.loadUriStack.length==0&&this.getTextStack.length==0){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"||(djConfig["useXDomain"]&&dojo.render.html.opera)){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_42){
var _43=_42.split(".");
for(var i=_43.length;i>0;i--){
var _45=_43.slice(0,i).join(".");
if((i==1)&&!this.moduleHasPrefix(_45)){
_43[0]="../"+_43[0];
}else{
var _46=this.getModulePrefix(_45);
if(_46!=_45){
_43.splice(0,i,_46);
break;
}
}
}
return _43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_47,_48,_49){
if(!_47){
return;
}
_49=this._global_omit_module_check||_49;
var _4a=this.findModule(_47,false);
if(_4a){
return _4a;
}
if(dj_undef(_47,this.loading_modules_)){
this.addedToLoadingCount.push(_47);
}
this.loading_modules_[_47]=1;
var _4b=_47.replace(/\./g,"/")+".js";
var _4c=_47.split(".");
var _4d=this.getModuleSymbols(_47);
var _4e=((_4d[0].charAt(0)!="/")&&!_4d[0].match(/^\w+:/));
var _4f=_4d[_4d.length-1];
var ok;
if(_4f=="*"){
_47=_4c.slice(0,-1).join(".");
while(_4d.length){
_4d.pop();
_4d.push(this.pkgFileName);
_4b=_4d.join("/")+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,!_49?_47:null);
if(ok){
break;
}
_4d.pop();
}
}else{
_4b=_4d.join("/")+".js";
_47=_4c.join(".");
var _51=!_49?_47:null;
ok=this.loadPath(_4b,_51);
if(!ok&&!_48){
_4d.pop();
while(_4d.length){
_4b=_4d.join("/")+".js";
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
_4d.pop();
_4b=_4d.join("/")+"/"+this.pkgFileName+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
}
}
if(!ok&&!_49){
dojo.raise("Could not load '"+_47+"'; last tried '"+_4b+"'");
}
}
if(!_49&&!this["isXDomain"]){
_4a=this.findModule(_47,false);
if(!_4a){
dojo.raise("symbol '"+_47+"' is not defined after loading '"+_4b+"'");
}
}
return _4a;
};
dojo.hostenv.startPackage=function(_52){
var _53=String(_52);
var _54=_53;
var _55=_52.split(/\./);
if(_55[_55.length-1]=="*"){
_55.pop();
_54=_55.join(".");
}
var _56=dojo.evalObjPath(_54,true);
this.loaded_modules_[_53]=_56;
this.loaded_modules_[_54]=_56;
return _56;
};
dojo.hostenv.findModule=function(_57,_58){
var lmn=String(_57);
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_58){
dojo.raise("no loaded module named '"+_57+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_5a){
var _5b=_5a["common"]||[];
var _5c=_5a[dojo.hostenv.name_]?_5b.concat(_5a[dojo.hostenv.name_]||[]):_5b.concat(_5a["default"]||[]);
for(var x=0;x<_5c.length;x++){
var _5e=_5c[x];
if(_5e.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_5e);
}else{
dojo.hostenv.loadModule(_5e);
}
}
};
dojo.require=function(_5f){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(_60,_61){
var _62=arguments[0];
if((_62===true)||(_62=="common")||(_62&&dojo.render[_62].capable)){
var _63=[];
for(var i=1;i<arguments.length;i++){
_63.push(arguments[i]);
}
dojo.require.apply(dojo,_63);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(_65){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_66,_67){
return dojo.hostenv.setModulePrefix(_66,_67);
};
if(typeof djConfig["useXDomain"]=="undefined"){
djConfig.useXDomain=true;
}
dojo.registerModulePath("dojo","http://o.aolcdn.com/dojo/0.4.2/src");
if(djConfig["modulePaths"]){
for(var param in djConfig["modulePaths"]){
dojo.registerModulePath(param,djConfig["modulePaths"][param]);
}
}
dojo.setModulePrefix=function(_68,_69){
dojo.deprecated("dojo.setModulePrefix(\""+_68+"\", \""+_69+"\")","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_68,_69);
};
dojo.exists=function(obj,_6b){
var p=_6b.split(".");
for(var i=0;i<p.length;i++){
if(!obj[p[i]]){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.hostenv.normalizeLocale=function(_6e){
var _6f=_6e?_6e.toLowerCase():dojo.locale;
if(_6f=="root"){
_6f="ROOT";
}
return _6f;
};
dojo.hostenv.searchLocalePath=function(_70,_71,_72){
_70=dojo.hostenv.normalizeLocale(_70);
var _73=_70.split("-");
var _74=[];
for(var i=_73.length;i>0;i--){
_74.push(_73.slice(0,i).join("-"));
}
_74.push(false);
if(_71){
_74.reverse();
}
for(var j=_74.length-1;j>=0;j--){
var loc=_74[j]||"ROOT";
var _78=_72(loc);
if(_78){
break;
}
}
};
dojo.hostenv.localesGenerated;
dojo.hostenv.registerNlsPrefix=function(){
dojo.registerModulePath("nls","nls");
};
dojo.hostenv.preloadLocalizations=function(){
if(dojo.hostenv.localesGenerated){
dojo.hostenv.registerNlsPrefix();
function preload(_79){
_79=dojo.hostenv.normalizeLocale(_79);
dojo.hostenv.searchLocalePath(_79,true,function(loc){
for(var i=0;i<dojo.hostenv.localesGenerated.length;i++){
if(dojo.hostenv.localesGenerated[i]==loc){
dojo["require"]("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
preload();
var _7c=djConfig.extraLocale||[];
for(var i=0;i<_7c.length;i++){
preload(_7c[i]);
}
}
dojo.hostenv.preloadLocalizations=function(){
};
};
dojo.requireLocalization=function(_7e,_7f,_80,_81){
dojo.hostenv.preloadLocalizations();
var _82=dojo.hostenv.normalizeLocale(_80);
var _83=[_7e,"nls",_7f].join(".");
var _84="";
if(_81){
var _85=_81.split(",");
for(var i=0;i<_85.length;i++){
if(_82.indexOf(_85[i])==0){
if(_85[i].length>_84.length){
_84=_85[i];
}
}
}
if(!_84){
_84="ROOT";
}
}
var _87=_81?_84:_82;
var _88=dojo.hostenv.findModule(_83);
var _89=null;
if(_88){
if(djConfig.localizationComplete&&_88._built){
return;
}
var _8a=_87.replace("-","_");
var _8b=_83+"."+_8a;
_89=dojo.hostenv.findModule(_8b);
}
if(!_89){
_88=dojo.hostenv.startPackage(_83);
var _8c=dojo.hostenv.getModuleSymbols(_7e);
var _8d=_8c.concat("nls").join("/");
var _8e;
dojo.hostenv.searchLocalePath(_87,_81,function(loc){
var _90=loc.replace("-","_");
var _91=_83+"."+_90;
var _92=false;
if(!dojo.hostenv.findModule(_91)){
dojo.hostenv.startPackage(_91);
var _93=[_8d];
if(loc!="ROOT"){
_93.push(loc);
}
_93.push(_7f);
var _94=_93.join("/")+".js";
_92=dojo.hostenv.loadPath(_94,null,function(_95){
var _96=function(){
};
_96.prototype=_8e;
_88[_90]=new _96();
for(var j in _95){
_88[_90][j]=_95[j];
}
});
}else{
_92=true;
}
if(_92&&_88[_90]){
_8e=_88[_90];
}else{
_88[_90]=_8e;
}
if(_81){
return true;
}
});
}
if(_81&&_82!=_84){
_88[_82.replace("-","_")]=_88[_84.replace("-","_")];
}
};
(function(){
var _98=djConfig.extraLocale;
if(_98){
if(!_98 instanceof Array){
_98=[_98];
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_9c,_9d){
req(m,b,_9c,_9d);
if(_9c){
return;
}
for(var i=0;i<_98.length;i++){
req(m,b,_98[i],_9d);
}
};
}
})();
dojo.hostenv.resetXd=function(){
this.isXDomain=djConfig.useXDomain||false;
this.xdTimer=0;
this.xdInFlight={};
this.xdOrderedReqs=[];
this.xdDepMap={};
this.xdContents=[];
this.xdDefList=[];
};
dojo.hostenv.resetXd();
dojo.hostenv.createXdPackage=function(_9f,_a0,_a1){
var _a2=[];
var _a3=/dojo.(require|requireIf|requireAll|provide|requireAfterIf|requireAfter|kwCompoundRequire|conditionalRequire|hostenv\.conditionalLoadModule|.hostenv\.loadModule|hostenv\.moduleLoaded)\(([\w\W]*?)\)/mg;
var _a4;
while((_a4=_a3.exec(_9f))!=null){
_a2.push("\""+_a4[1]+"\", "+_a4[2]);
}
var _a5=[];
_a5.push("dojo.hostenv.packageLoaded({\n");
if(_a2.length>0){
_a5.push("depends: [");
for(var i=0;i<_a2.length;i++){
if(i>0){
_a5.push(",\n");
}
_a5.push("["+_a2[i]+"]");
}
_a5.push("],");
}
_a5.push("\ndefinePackage: function(dojo){");
_a5.push(_9f);
_a5.push("\n}, resourceName: '"+_a0+"', resourcePath: '"+_a1+"'});");
return _a5.join("");
};
dojo.hostenv.loadPath=function(_a7,_a8,cb){
var _aa=_a7.indexOf(":");
var _ab=_a7.indexOf("/");
var uri;
var _ad=false;
if(_aa>0&&_aa<_ab){
uri=_a7;
this.isXDomain=_ad=true;
}else{
uri=this.getBaseScriptUri()+_a7;
_aa=uri.indexOf(":");
_ab=uri.indexOf("/");
if(_aa>0&&_aa<_ab&&(!location.host||uri.indexOf("http://"+location.host)!=0)){
this.isXDomain=_ad=true;
}
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return ((!_a8||this.isXDomain)?this.loadUri(uri,cb,_ad,_a8):this.loadUriAndCheck(uri,_a8,cb));
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb,_b0,_b1){
if(this.loadedUris[uri]){
return 1;
}
if(this.isXDomain){
if(uri.indexOf("__package__")!=-1){
_b1+=".*";
}
this.xdOrderedReqs.push(_b1);
if(_b0){
this.xdInFlight[_b1]=true;
this.inFlightCount++;
}
if(!this.xdTimer){
this.xdTimer=setInterval("dojo.hostenv.watchInFlightXDomain();",100);
}
this.xdStartTime=(new Date()).getTime();
}
if(_b0){
var _b2=uri.lastIndexOf(".");
if(_b2<=0){
_b2=uri.length-1;
}
var _b3=uri.substring(0,_b2)+".xd";
if(_b2!=uri.length-1){
_b3+=uri.substring(_b2,uri.length);
}
var _b4=document.createElement("script");
_b4.type="text/javascript";
_b4.src=_b3;
if(!this.headElement){
this.headElement=document.getElementsByTagName("head")[0];
if(!this.headElement){
this.headElement=document.getElementsByTagName("html")[0];
}
}
this.headElement.appendChild(_b4);
}else{
var _b5=this.getText(uri,null,true);
if(_b5==null){
return 0;
}
if(this.isXDomain&&uri.indexOf("/nls/")==-1){
var pkg=this.createXdPackage(_b5,_b1,uri);
dj_eval(pkg);
}else{
if(cb){
_b5="("+_b5+")";
}
var _b7=dj_eval(_b5);
if(cb){
cb(_b7);
}
}
}
this.loadedUris[uri]=true;
return 1;
};
dojo.hostenv.packageLoaded=function(pkg){
var _b9=pkg.depends;
var _ba=null;
var _bb=null;
var _bc=[];
if(_b9&&_b9.length>0){
var dep=null;
var _be=0;
var _bf=false;
for(var i=0;i<_b9.length;i++){
dep=_b9[i];
if(dep[0]=="provide"||dep[0]=="hostenv.moduleLoaded"){
_bc.push(dep[1]);
}else{
if(!_ba){
_ba=[];
}
if(!_bb){
_bb=[];
}
var _c1=this.unpackXdDependency(dep);
if(_c1.requires){
_ba=_ba.concat(_c1.requires);
}
if(_c1.requiresAfter){
_bb=_bb.concat(_c1.requiresAfter);
}
}
var _c2=dep[0];
var _c3=_c2.split(".");
if(_c3.length==2){
dojo[_c3[0]][_c3[1]].apply(dojo[_c3[0]],dep.slice(1));
}else{
dojo[_c2].apply(dojo,dep.slice(1));
}
}
var _c4=this.xdContents.push({content:pkg.definePackage,resourceName:pkg["resourceName"],resourcePath:pkg["resourcePath"],isDefined:false})-1;
for(var i=0;i<_bc.length;i++){
this.xdDepMap[_bc[i]]={requires:_ba,requiresAfter:_bb,contentIndex:_c4};
}
for(var i=0;i<_bc.length;i++){
this.xdInFlight[_bc[i]]=false;
}
}
};
dojo.hostenv.xdLoadFlattenedBundle=function(_c5,_c6,_c7,_c8){
_c7=_c7||"root";
var _c9=dojo.hostenv.normalizeLocale(_c7).replace("-","_");
var _ca=[_c5,"nls",_c6].join(".");
var _cb=dojo.hostenv.startPackage(_ca);
_cb[_c9]=_c8;
var _cc=[_c5,_c9,_c6].join(".");
var _cd=dojo.hostenv.xdBundleMap[_cc];
if(_cd){
for(var _ce in _cd){
_cb[_ce]=_c8;
}
}
};
dojo.hostenv.xdBundleMap={};
dojo.xdRequireLocalization=function(_cf,_d0,_d1,_d2){
var _d3=_d2.split(",");
var _d4=dojo.hostenv.normalizeLocale(_d1);
var _d5="";
for(var i=0;i<_d3.length;i++){
if(_d4.indexOf(_d3[i])==0){
if(_d3[i].length>_d5.length){
_d5=_d3[i];
}
}
}
var _d7=_d5.replace("-","_");
var _d8=dojo.evalObjPath([_cf,"nls",_d0].join("."));
if(_d8&&_d8[_d7]){
bundle[_d4.replace("-","_")]=_d8[_d7];
}else{
var _d9=[_cf,(_d7||"root"),_d0].join(".");
var _da=dojo.hostenv.xdBundleMap[_d9];
if(!_da){
_da=dojo.hostenv.xdBundleMap[_d9]={};
}
_da[_d4.replace("-","_")]=true;
dojo.require(_cf+".nls"+(_d5?"."+_d5:"")+"."+_d0);
}
};
(function(){
var _db=djConfig.extraLocale;
if(_db){
if(!_db instanceof Array){
_db=[_db];
}
dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(m,b,_de,_df){
dojo._xdReqLoc(m,b,_de,_df);
if(_de){
return;
}
for(var i=0;i<_db.length;i++){
dojo._xdReqLoc(m,b,_db[i],_df);
}
};
}
})();
dojo.hostenv.unpackXdDependency=function(dep){
var _e2=null;
var _e3=null;
switch(dep[0]){
case "requireIf":
case "requireAfterIf":
case "conditionalRequire":
if((dep[1]===true)||(dep[1]=="common")||(dep[1]&&dojo.render[dep[1]].capable)){
_e2=[{name:dep[2],content:null}];
}
break;
case "requireAll":
dep.shift();
_e2=dep;
dojo.hostenv.flattenRequireArray(_e2);
break;
case "kwCompoundRequire":
case "hostenv.conditionalLoadModule":
var _e4=dep[1];
var _e5=_e4["common"]||[];
var _e2=(_e4[dojo.hostenv.name_])?_e5.concat(_e4[dojo.hostenv.name_]||[]):_e5.concat(_e4["default"]||[]);
dojo.hostenv.flattenRequireArray(_e2);
break;
case "require":
case "requireAfter":
case "hostenv.loadModule":
_e2=[{name:dep[1],content:null}];
break;
}
if(dep[0]=="requireAfterIf"||dep[0]=="requireIf"){
_e3=_e2;
_e2=null;
}
return {requires:_e2,requiresAfter:_e3};
};
dojo.hostenv.xdWalkReqs=function(){
var _e6=null;
var req;
for(var i=0;i<this.xdOrderedReqs.length;i++){
req=this.xdOrderedReqs[i];
if(this.xdDepMap[req]){
_e6=[req];
_e6[req]=true;
this.xdEvalReqs(_e6);
}
}
};
dojo.hostenv.xdEvalReqs=function(_e9){
while(_e9.length>0){
var req=_e9[_e9.length-1];
var pkg=this.xdDepMap[req];
if(pkg){
var _ec=pkg.requires;
if(_ec&&_ec.length>0){
var _ed;
for(var i=0;i<_ec.length;i++){
_ed=_ec[i].name;
if(_ed&&!_e9[_ed]){
_e9.push(_ed);
_e9[_ed]=true;
this.xdEvalReqs(_e9);
}
}
}
var _ef=this.xdContents[pkg.contentIndex];
if(!_ef.isDefined){
var _f0=_ef.content;
_f0["resourceName"]=_ef["resourceName"];
_f0["resourcePath"]=_ef["resourcePath"];
this.xdDefList.push(_f0);
_ef.isDefined=true;
}
this.xdDepMap[req]=null;
var _ec=pkg.requiresAfter;
if(_ec&&_ec.length>0){
var _ed;
for(var i=0;i<_ec.length;i++){
_ed=_ec[i].name;
if(_ed&&!_e9[_ed]){
_e9.push(_ed);
_e9[_ed]=true;
this.xdEvalReqs(_e9);
}
}
}
}
_e9.pop();
}
};
dojo.hostenv.clearXdInterval=function(){
clearInterval(this.xdTimer);
this.xdTimer=0;
};
dojo.hostenv.watchInFlightXDomain=function(){
var _f1=(djConfig.xdWaitSeconds||15)*1000;
if(this.xdStartTime+_f1<(new Date()).getTime()){
this.clearXdInterval();
var _f2="";
for(var _f3 in this.xdInFlight){
if(this.xdInFlight[_f3]){
_f2+=_f3+" ";
}
}
dojo.raise("Could not load cross-domain packages: "+_f2);
}
for(var _f3 in this.xdInFlight){
if(this.xdInFlight[_f3]){
return;
}
}
this.clearXdInterval();
this.xdWalkReqs();
var _f4=this.xdDefList.length;
for(var i=0;i<_f4;i++){
var _f6=dojo.hostenv.xdDefList[i];
if(djConfig["debugAtAllCosts"]&&_f6["resourceName"]){
if(!this["xdDebugQueue"]){
this.xdDebugQueue=[];
}
this.xdDebugQueue.push({resourceName:_f6.resourceName,resourcePath:_f6.resourcePath});
}else{
_f6(dojo);
}
}
for(var i=0;i<this.xdContents.length;i++){
var _f7=this.xdContents[i];
if(_f7.content&&!_f7.isDefined){
_f7.content(dojo);
}
}
this.resetXd();
if(this["xdDebugQueue"]&&this.xdDebugQueue.length>0){
this.xdDebugFileLoaded();
}else{
this.xdNotifyLoaded();
}
};
dojo.hostenv.xdNotifyLoaded=function(){
this.inFlightCount=0;
this.callLoaded();
};
dojo.hostenv.flattenRequireArray=function(_f8){
if(_f8){
for(var i=0;i<_f8.length;i++){
if(_f8[i] instanceof Array){
_f8[i]={name:_f8[i][0],content:null};
}else{
_f8[i]={name:_f8[i],content:null};
}
}
}
};
dojo.hostenv.xdHasCalledPreload=false;
dojo.hostenv.xdRealCallLoaded=dojo.hostenv.callLoaded;
dojo.hostenv.callLoaded=function(){
if(this.xdHasCalledPreload||dojo.hostenv.getModulePrefix("dojo")=="src"||!this.localesGenerated){
this.xdRealCallLoaded();
this.xdHasCalledPreload=true;
}else{
if(this.localesGenerated){
this.registerNlsPrefix=function(){
dojo.registerModulePath("nls",dojo.hostenv.getModulePrefix("dojo")+"/../nls");
};
this.preloadLocalizations();
}
this.xdHasCalledPreload=true;
}
};
}
if(typeof window!="undefined"){
(function(){
if(djConfig.allowQueryConfig){
var _fa=document.location.toString();
var _fb=_fa.split("?",2);
if(_fb.length>1){
var _fc=_fb[1];
var _fd=_fc.split("&");
for(var x in _fd){
var sp=_fd[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _101=document.getElementsByTagName("script");
var _102=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_101.length;i++){
var src=_101[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_102);
if(m){
var root=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
root+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=root;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=root;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _10e=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_10e>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_10e+6,_10e+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var tdoc=window["document"];
var tdi=tdoc["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}else{
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var http=null;
var _115=null;
try{
http=new XMLHttpRequest();
}
catch(e){
}
if(!http){
for(var i=0;i<3;++i){
var _117=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
http=new ActiveXObject(_117);
}
catch(e){
_115=e;
}
if(http){
dojo.hostenv._XMLHTTP_PROGIDS=[_117];
break;
}
}
}
if(!http){
return dojo.raise("XMLHTTP not available",_115);
}
return http;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_119,_11a){
if(!_119){
this._blockAsync=true;
}
var http=this.getXmlhttpObject();
function isDocumentOk(http){
var stat=http["status"];
return Boolean((!stat)||((200<=stat)&&(300>stat))||(stat==304));
}
if(_119){
var _11e=this,_11f=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
http.onreadystatechange=function(){
if(_11f){
gbl.clearTimeout(_11f);
_11f=null;
}
if(_11e._blockAsync||(xhr&&xhr._blockAsync)){
_11f=gbl.setTimeout(function(){
http.onreadystatechange.apply(this);
},10);
}else{
if(4==http.readyState){
if(isDocumentOk(http)){
_119(http.responseText);
}
}
}
};
}
http.open("GET",uri,_119?true:false);
try{
http.send(null);
if(_119){
return null;
}
if(!isDocumentOk(http)){
var err=Error("Unable to load "+uri+" status:"+http.status);
err.status=http.status;
err.responseText=http.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_11a)&&(!_119)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return http.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(line){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(line);
}else{
try{
var _124=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_124){
_124=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(line));
_124.appendChild(div);
}
catch(e){
try{
document.write("<div>"+line+"</div>");
}
catch(e2){
window.status=line;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(node,_127,fp){
var _129=node["on"+_127]||function(){
};
node["on"+_127]=function(){
fp.apply(node,arguments);
_129.apply(node,arguments);
};
return true;
}
function dj_load_init(e){
var type=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(type!="domcontentloaded"&&type!="load")){
return;
}
arguments.callee.initialized=true;
if(typeof (_timer)!="undefined"){
clearInterval(_timer);
delete _timer;
}
var _12c=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_12c();
dojo.hostenv.modulesLoaded();
}else{
dojo.hostenv.modulesLoadedListeners.unshift(_12c);
}
}
if(document.addEventListener){
if(dojo.render.html.opera||(dojo.render.html.moz&&(djConfig["enableMozDomContentLoaded"]===true))){
document.addEventListener("DOMContentLoaded",dj_load_init,null);
}
window.addEventListener("load",dj_load_init,null);
}
if(dojo.render.html.ie&&dojo.render.os.win){
document.attachEvent("onreadystatechange",function(e){
if(document.readyState=="complete"){
dj_load_init();
}
});
}
if(/(WebKit|khtml)/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dj_load_init();
}
},10);
}
if(dojo.render.html.ie){
dj_addNodeEvtHdlr(window,"beforeunload",function(){
dojo.hostenv._unloading=true;
window.setTimeout(function(){
dojo.hostenv._unloading=false;
},0);
});
}
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
if((!dojo.render.html.ie)||(dojo.render.html.ie&&dojo.hostenv._unloading)){
dojo.hostenv.unloaded();
}
});
dojo.hostenv.makeWidgets=function(){
var sids=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
sids=sids.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
sids=sids.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(sids.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _12f=new dojo.xml.Parse();
if(sids.length>0){
for(var x=0;x<sids.length;x++){
var _131=document.getElementById(sids[x]);
if(!_131){
continue;
}
var frag=_12f.parseElement(_131,null,true);
dojo.widget.getParser().createComponents(frag);
}
}else{
if(djConfig.parseWidgets){
var frag=_12f.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(frag);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
if(!doc){
doc=dj_currentDocument;
}
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
eles=doc.all[id];
if(eles){
if(eles.length){
for(var i=0;i<eles.length;i++){
if(eles[i].id==id){
ele=eles[i];
break;
}
}
}else{
ele=eles;
}
}
}
return ele;
}
return id;
};
dojo.setContext=function(_137,_138){
dj_currentContext=_137;
dj_currentDocument=_138;
};
dojo._fireCallback=function(_139,_13a,_13b){
if((_13a)&&((typeof _139=="string")||(_139 instanceof String))){
_139=_13a[_139];
}
return (_13a?_139.apply(_13a,_13b||[]):_139());
};
dojo.withGlobal=function(_13c,_13d,_13e,_13f){
var rval;
var _141=dj_currentContext;
var _142=dj_currentDocument;
try{
dojo.setContext(_13c,_13c.document);
rval=dojo._fireCallback(_13d,_13e,_13f);
}
finally{
dojo.setContext(_141,_142);
}
return rval;
};
dojo.withDoc=function(_143,_144,_145,_146){
var rval;
var _148=dj_currentDocument;
try{
dj_currentDocument=_143;
rval=dojo._fireCallback(_144,_145,_146);
}
finally{
dj_currentDocument=_148;
}
return rval;
};
}
dojo.requireIf((djConfig["isDebug"]||djConfig["debugAtAllCosts"]),"dojo.debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&!djConfig["useXDomain"],"dojo.browser_debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&djConfig["useXDomain"],"dojo.browser_debug_xd");
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_149,_14a){
if(!dojo.lang.isFunction(_14a)){
dojo.raise("dojo.inherits: superclass argument ["+_14a+"] must be a function (subclass: ["+_149+"']");
}
_149.prototype=new _14a();
_149.prototype.constructor=_149;
_149.superclass=_14a.prototype;
_149["super"]=_14a.prototype;
};
dojo.lang._mixin=function(obj,_14c){
var tobj={};
for(var x in _14c){
if((typeof tobj[x]=="undefined")||(tobj[x]!=_14c[x])){
obj[x]=_14c[x];
}
}
if(dojo.render.html.ie&&(typeof (_14c["toString"])=="function")&&(_14c["toString"]!=obj["toString"])&&(_14c["toString"]!=tobj["toString"])){
obj.toString=_14c.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_150){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_153,_154){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_153.prototype,arguments[i]);
}
return _153;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_157,_158,_159,_15a){
if(!dojo.lang.isArrayLike(_157)&&dojo.lang.isArrayLike(_158)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var temp=_157;
_157=_158;
_158=temp;
}
var _15c=dojo.lang.isString(_157);
if(_15c){
_157=_157.split("");
}
if(_15a){
var step=-1;
var i=_157.length-1;
var end=-1;
}else{
var step=1;
var i=0;
var end=_157.length;
}
if(_159){
while(i!=end){
if(_157[i]===_158){
return i;
}
i+=step;
}
}else{
while(i!=end){
if(_157[i]==_158){
return i;
}
i+=step;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_160,_161,_162){
return dojo.lang.find(_160,_161,_162,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_163,_164){
return dojo.lang.find(_163,_164)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it&&it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
return (it instanceof Function||typeof it=="function");
};
(function(){
if((dojo.render.html.capable)&&(dojo.render.html["safari"])){
dojo.lang.isFunction=function(it){
if((typeof (it)=="function")&&(it=="[object NodeList]")){
return false;
}
return (it instanceof Function||typeof it=="function");
};
}
})();
dojo.lang.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((typeof (it)=="undefined")&&(it==undefined));
};
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_16f,_170){
var fcn=(dojo.lang.isString(_170)?_16f[_170]:_170)||function(){
};
return function(){
return fcn.apply(_16f,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_172,_173,_174){
var nso=(_173||dojo.lang.anon);
if((_174)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_172){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_172;
return ret;
};
dojo.lang.forward=function(_178){
return function(){
return this[_178].apply(this,arguments);
};
};
dojo.lang.curry=function(_179,func){
var _17b=[];
_179=_179||dj_global;
if(dojo.lang.isString(func)){
func=_179[func];
}
for(var x=2;x<arguments.length;x++){
_17b.push(arguments[x]);
}
var _17d=(func["__preJoinArity"]||func.length)-_17b.length;
function gather(_17e,_17f,_180){
var _181=_180;
var _182=_17f.slice(0);
for(var x=0;x<_17e.length;x++){
_182.push(_17e[x]);
}
_180=_180-_17e.length;
if(_180<=0){
var res=func.apply(_179,_182);
_180=_181;
return res;
}else{
return function(){
return gather(arguments,_182,_180);
};
}
}
return gather([],_17b,_17d);
};
dojo.lang.curryArguments=function(_185,func,args,_188){
var _189=[];
var x=_188||0;
for(x=_188;x<args.length;x++){
_189.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[_185,func].concat(_189));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_18f,_190){
if(!farr.length){
if(typeof _190=="function"){
_190();
}
return;
}
if((typeof _18f=="undefined")&&(typeof cb=="number")){
_18f=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_18f){
_18f=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_18f,_190);
},_18f);
};
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(e){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _192=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_192.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_194,_195){
var node=_194.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_195&&node&&node.tagName&&node.tagName.toLowerCase()!=_195.toLowerCase()){
node=dojo.dom.nextElement(node,_195);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_197,_198){
var node=_197.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_198&&node&&node.tagName&&node.tagName.toLowerCase()!=_198.toLowerCase()){
node=dojo.dom.prevElement(node,_198);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_19b){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_19b&&_19b.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_19b);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_19d){
if(!node){
return null;
}
if(_19d){
_19d=_19d.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_19d&&_19d.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_19d);
}
return node;
};
dojo.dom.moveChildren=function(_19e,_19f,trim){
var _1a1=0;
if(trim){
while(_19e.hasChildNodes()&&_19e.firstChild.nodeType==dojo.dom.TEXT_NODE){
_19e.removeChild(_19e.firstChild);
}
while(_19e.hasChildNodes()&&_19e.lastChild.nodeType==dojo.dom.TEXT_NODE){
_19e.removeChild(_19e.lastChild);
}
}
while(_19e.hasChildNodes()){
_19f.appendChild(_19e.firstChild);
_1a1++;
}
return _1a1;
};
dojo.dom.copyChildren=function(_1a2,_1a3,trim){
var _1a5=_1a2.cloneNode(true);
return this.moveChildren(_1a5,_1a3,trim);
};
dojo.dom.replaceChildren=function(node,_1a7){
var _1a8=[];
if(dojo.render.html.ie){
for(var i=0;i<node.childNodes.length;i++){
_1a8.push(node.childNodes[i]);
}
}
dojo.dom.removeChildren(node);
node.appendChild(_1a7);
for(var i=0;i<_1a8.length;i++){
dojo.dom.destroyNode(_1a8[i]);
}
};
dojo.dom.removeChildren=function(node){
var _1ab=node.childNodes.length;
while(node.hasChildNodes()){
dojo.dom.removeNode(node.firstChild);
}
return _1ab;
};
dojo.dom.replaceNode=function(node,_1ad){
return node.parentNode.replaceChild(_1ad,node);
};
dojo.dom.destroyNode=function(node){
if(node.parentNode){
node=dojo.dom.removeNode(node);
}
if(node.nodeType!=3){
if(dojo.evalObjPath("dojo.event.browser.clean",false)){
dojo.event.browser.clean(node);
}
if(dojo.render.html.ie){
node.outerHTML="";
}
}
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_1b1,_1b2){
var _1b3=[];
var _1b4=(_1b1&&(_1b1 instanceof Function||typeof _1b1=="function"));
while(node){
if(!_1b4||_1b1(node)){
_1b3.push(node);
}
if(_1b2&&_1b3.length>0){
return _1b3[0];
}
node=node.parentNode;
}
if(_1b2){
return null;
}
return _1b3;
};
dojo.dom.getAncestorsByTag=function(node,tag,_1b7){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_1b7);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_1bc,_1bd){
if(_1bd&&node){
node=node.parentNode;
}
while(node){
if(node==_1bc){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _1c0=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _1c1=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_1c1.length;i++){
try{
doc=new ActiveXObject(_1c1[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_1c0.implementation)&&(_1c0.implementation.createDocument)){
doc=_1c0.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_1c4){
if(!_1c4){
_1c4="text/xml";
}
if(!dj_undef("DOMParser")){
var _1c5=new DOMParser();
return _1c5.parseFromString(str,_1c4);
}else{
if(!dj_undef("ActiveXObject")){
var _1c6=dojo.dom.createDocument();
if(_1c6){
_1c6.async=false;
_1c6.loadXML(str);
return _1c6;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _1c7=dojo.doc();
if(_1c7.createElement){
var tmp=_1c7.createElement("xml");
tmp.innerHTML=str;
if(_1c7.implementation&&_1c7.implementation.createDocument){
var _1c9=_1c7.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_1c9.importNode(tmp.childNodes.item(i),true);
}
return _1c9;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_1cc){
if(_1cc.firstChild){
_1cc.insertBefore(node,_1cc.firstChild);
}else{
_1cc.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_1cf){
if((_1cf!=true)&&(node===ref||node.nextSibling===ref)){
return false;
}
var _1d0=ref.parentNode;
_1d0.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_1d3){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_1d3!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_1d3);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_1d7){
if((!node)||(!ref)||(!_1d7)){
return false;
}
switch(_1d7.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_1d9,_1da){
var _1db=_1d9.childNodes;
if(!_1db.length||_1db.length==_1da){
_1d9.appendChild(node);
return true;
}
if(_1da==0){
return dojo.dom.prependChild(node,_1d9);
}
return dojo.dom.insertAfter(node,_1db[_1da-1]);
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _1de=dojo.doc();
dojo.dom.replaceChildren(node,_1de.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _1df="";
if(node==null){
return _1df;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_1df+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_1df+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _1df;
}
};
dojo.dom.hasParent=function(node){
return Boolean(node&&node.parentNode&&dojo.dom.isNode(node.parentNode));
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_1e5,_1e6,_1e7){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_1e5,_1e6,_1e7);
}else{
var _1e8=elem.ownerDocument;
var _1e9=_1e8.createNode(2,_1e6,_1e5);
_1e9.nodeValue=_1e7;
elem.setAttributeNode(_1e9);
}
};
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
var isIE=((dojo.render.html.capable)&&(dojo.render.html.ie));
function getTagName(node){
try{
return node.tagName.toLowerCase();
}
catch(e){
return "";
}
}
function getDojoTagName(node){
var _1ed=getTagName(node);
if(!_1ed){
return "";
}
if((dojo.widget)&&(dojo.widget.tags[_1ed])){
return _1ed;
}
var p=_1ed.indexOf(":");
if(p>=0){
return _1ed;
}
if(_1ed.substr(0,5)=="dojo:"){
return _1ed;
}
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
return node.scopeName.toLowerCase()+":"+_1ed;
}
if(_1ed.substr(0,4)=="dojo"){
return "dojo:"+_1ed.substring(4);
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
djt=node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type");
if(djt){
return "dojo:"+djt.toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((dj_global["djConfig"])&&(!djConfig["ignoreClassNames"])){
var _1f0=node.className||node.getAttribute("class");
if((_1f0)&&(_1f0.indexOf)&&(_1f0.indexOf("dojo-")!=-1)){
var _1f1=_1f0.split(" ");
for(var x=0,c=_1f1.length;x<c;x++){
if(_1f1[x].slice(0,5)=="dojo-"){
return "dojo:"+_1f1[x].substr(5).toLowerCase();
}
}
}
}
return "";
}
this.parseElement=function(node,_1f5,_1f6,_1f7){
var _1f8=getTagName(node);
if(isIE&&_1f8.indexOf("/")==0){
return null;
}
try{
var attr=node.getAttribute("parseWidgets");
if(attr&&attr.toLowerCase()=="false"){
return {};
}
}
catch(e){
}
var _1fa=true;
if(_1f6){
var _1fb=getDojoTagName(node);
_1f8=_1fb||_1f8;
_1fa=Boolean(_1fb);
}
var _1fc={};
_1fc[_1f8]=[];
var pos=_1f8.indexOf(":");
if(pos>0){
var ns=_1f8.substring(0,pos);
_1fc["ns"]=ns;
if((dojo.ns)&&(!dojo.ns.allow(ns))){
_1fa=false;
}
}
if(_1fa){
var _1ff=this.parseAttributes(node);
for(var attr in _1ff){
if((!_1fc[_1f8][attr])||(typeof _1fc[_1f8][attr]!="array")){
_1fc[_1f8][attr]=[];
}
_1fc[_1f8][attr].push(_1ff[attr]);
}
_1fc[_1f8].nodeRef=node;
_1fc.tagName=_1f8;
_1fc.index=_1f7||0;
}
var _200=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
var ctn=getDojoTagName(tcn)||getTagName(tcn);
if(!_1fc[ctn]){
_1fc[ctn]=[];
}
_1fc[ctn].push(this.parseElement(tcn,true,_1f6,_200));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_1fc[ctn][_1fc[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
_200++;
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_1fc[_1f8].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _1fc;
};
this.parseAttributes=function(node){
var _205={};
var atts=node.attributes;
var _207,i=0;
while((_207=atts[i++])){
if(isIE){
if(!_207){
continue;
}
if((typeof _207=="object")&&(typeof _207.nodeValue=="undefined")||(_207.nodeValue==null)||(_207.nodeValue=="")){
continue;
}
}
var nn=_207.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_207.nodeName;
_205[nn]={value:_207.nodeValue};
}
return _205;
};
};
dojo.provide("dojo.lang.array");
dojo.lang.mixin(dojo.lang,{has:function(obj,name){
try{
return typeof obj[name]!="undefined";
}
catch(e){
return false;
}
},isEmpty:function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _20e=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_20e++;
break;
}
}
return _20e==0;
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
},map:function(arr,obj,_212){
var _213=dojo.lang.isString(arr);
if(_213){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_212)){
_212=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_212){
var _214=obj;
obj=_212;
_212=_214;
}
}
if(Array.map){
var _215=Array.map(arr,_212,obj);
}else{
var _215=[];
for(var i=0;i<arr.length;++i){
_215.push(_212.call(obj,arr[i]));
}
}
if(_213){
return _215.join("");
}else{
return _215;
}
},reduce:function(arr,_218,obj,_21a){
var _21b=_218;
if(arguments.length==2){
_21a=_218;
_21b=arr[0];
arr=arr.slice(1);
}else{
if(arguments.length==3){
if(dojo.lang.isFunction(obj)){
_21a=obj;
obj=null;
}
}else{
if(dojo.lang.isFunction(obj)){
var tmp=_21a;
_21a=obj;
obj=tmp;
}
}
}
var ob=obj||dj_global;
dojo.lang.map(arr,function(val){
_21b=_21a.call(ob,_21b,val);
});
return _21b;
},forEach:function(_21f,_220,_221){
if(dojo.lang.isString(_21f)){
_21f=_21f.split("");
}
if(Array.forEach){
Array.forEach(_21f,_220,_221);
}else{
if(!_221){
_221=dj_global;
}
for(var i=0,l=_21f.length;i<l;i++){
_220.call(_221,_21f[i],i,_21f);
}
}
},_everyOrSome:function(_224,arr,_226,_227){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[_224?"every":"some"](arr,_226,_227);
}else{
if(!_227){
_227=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _22a=_226.call(_227,arr[i],i,arr);
if(_224&&!_22a){
return false;
}else{
if((!_224)&&(_22a)){
return true;
}
}
}
return Boolean(_224);
}
},every:function(arr,_22c,_22d){
return this._everyOrSome(true,arr,_22c,_22d);
},some:function(arr,_22f,_230){
return this._everyOrSome(false,arr,_22f,_230);
},filter:function(arr,_232,_233){
var _234=dojo.lang.isString(arr);
if(_234){
arr=arr.split("");
}
var _235;
if(Array.filter){
_235=Array.filter(arr,_232,_233);
}else{
if(!_233){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_233=dj_global;
}
_235=[];
for(var i=0;i<arr.length;i++){
if(_232.call(_233,arr[i],i,arr)){
_235.push(arr[i]);
}
}
}
if(_234){
return _235.join("");
}else{
return _235;
}
},unnest:function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
},toArray:function(_23a,_23b){
var _23c=[];
for(var i=_23b||0;i<_23a.length;i++){
_23c.push(_23a[i]);
}
return _23c;
}});
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_23f){
var _240=window,_241=2;
if(!dojo.lang.isFunction(func)){
_240=func;
func=_23f;
_23f=arguments[2];
_241++;
}
if(dojo.lang.isString(func)){
func=_240[func];
}
var args=[];
for(var i=_241;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_240,args);
},_23f);
};
dojo.lang.clearTimeout=function(_244){
dojo.global().clearTimeout(_244);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_24d,_24e,_24f){
with(dojo.parseObjPath(_24d,_24e,_24f)){
return dojo.evalProp(prop,obj,_24f);
}
};
dojo.lang.setObjPathValue=function(_250,_251,_252,_253){
dojo.deprecated("dojo.lang.setObjPathValue","use dojo.parseObjPath and the '=' operator","0.6");
if(arguments.length<4){
_253=true;
}
with(dojo.parseObjPath(_250,_252,_253)){
if(obj&&(_253||(prop in obj))){
obj[prop]=_251;
}
}
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_254,_255,init,_257){
if((dojo.lang.isFunction(_257))||((!_257)&&(!dojo.lang.isFunction(init)))){
var temp=_257;
_257=init;
init=temp;
}
var _259=[];
if(dojo.lang.isArray(_255)){
_259=_255;
_255=_259.shift();
}
if(!init){
init=dojo.evalObjPath(_254,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_255?_255.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _255();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_259;
for(var i=0,l=_259.length;i<l;i++){
dojo.lang.extend(ctor,_259[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_254;
if(dojo.lang.isArray(_257)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_257));
}else{
dojo.lang.extend(ctor,(_257)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare._common);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
var _25e=dojo.parseObjPath(_254,null,true);
_25e.obj[_25e.prop]=ctor;
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this._inherited("constructor",arguments);
}else{
this._contextMethod(s,"constructor",arguments);
}
}
var ms=(self.constructor.mixins)||([]);
for(var i=0,m;(m=ms[i]);i++){
(((m.prototype)&&(m.prototype.initializer))||(m)).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare._common={_getPropContext:function(){
return (this.___proto||this);
},_contextMethod:function(_264,_265,args){
var _267,_268=this.___proto;
this.___proto=_264;
try{
_267=_264[_265].apply(this,(args||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=_268;
}
return _267;
},_inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._contextMethod(p,prop,args):p[prop]);
},inherited:function(prop,args){
dojo.deprecated("'inherited' method is dangerous, do not up-call! 'inherited' is slated for removal in 0.5; name your super class (or use superclass property) instead.","0.5");
this._inherited(prop,args);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.ns");
dojo.ns={namespaces:{},failed:{},loading:{},loaded:{},register:function(name,_26f,_270,_271){
if(!_271||!this.namespaces[name]){
this.namespaces[name]=new dojo.ns.Ns(name,_26f,_270);
}
},allow:function(name){
if(this.failed[name]){
return false;
}
if((djConfig.excludeNamespace)&&(dojo.lang.inArray(djConfig.excludeNamespace,name))){
return false;
}
return ((name==this.dojo)||(!djConfig.includeNamespace)||(dojo.lang.inArray(djConfig.includeNamespace,name)));
},get:function(name){
return this.namespaces[name];
},require:function(name){
var ns=this.namespaces[name];
if((ns)&&(this.loaded[name])){
return ns;
}
if(!this.allow(name)){
return false;
}
if(this.loading[name]){
dojo.debug("dojo.namespace.require: re-entrant request to load namespace \""+name+"\" must fail.");
return false;
}
var req=dojo.require;
this.loading[name]=true;
try{
if(name=="dojo"){
req("dojo.namespaces.dojo");
}else{
if(!dojo.hostenv.moduleHasPrefix(name)){
dojo.registerModulePath(name,"../"+name);
}
req([name,"manifest"].join("."),false,true);
}
if(!this.namespaces[name]){
this.failed[name]=true;
}
}
finally{
this.loading[name]=false;
}
return this.namespaces[name];
}};
dojo.ns.Ns=function(name,_278,_279){
this.name=name;
this.module=_278;
this.resolver=_279;
this._loaded=[];
this._failed=[];
};
dojo.ns.Ns.prototype.resolve=function(name,_27b,_27c){
if(!this.resolver||djConfig["skipAutoRequire"]){
return false;
}
var _27d=this.resolver(name,_27b);
if((_27d)&&(!this._loaded[_27d])&&(!this._failed[_27d])){
var req=dojo.require;
req(_27d,false,true);
if(dojo.hostenv.findModule(_27d,false)){
this._loaded[_27d]=true;
}else{
if(!_27c){
dojo.raise("dojo.ns.Ns.resolve: module '"+_27d+"' not found after loading via namespace '"+this.name+"'");
}
this._failed[_27d]=true;
}
}
return Boolean(this._loaded[_27d]);
};
dojo.registerNamespace=function(name,_280,_281){
dojo.ns.register.apply(dojo.ns,arguments);
};
dojo.registerNamespaceResolver=function(name,_283){
var n=dojo.ns.namespaces[name];
if(n){
n.resolver=_283;
}
};
dojo.registerNamespaceManifest=function(_285,path,name,_288,_289){
dojo.registerModulePath(name,path);
dojo.registerNamespace(name,_288,_289);
};
dojo.registerNamespace("dojo","dojo.widget");
dojo.provide("dojo.event.common");
dojo.event=new function(){
this._canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_28b){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false,maxCalls:-1};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _28e=dl.nameAnonFunc(args[2],ao.adviceObj,_28b);
ao.adviceFunc=_28e;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _28e=dl.nameAnonFunc(args[0],ao.srcObj,_28b);
ao.srcFunc=_28e;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _28e=dl.nameAnonFunc(args[1],dj_global,_28b);
ao.srcFunc=_28e;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _28e=dl.nameAnonFunc(args[3],dj_global,_28b);
ao.adviceObj=dj_global;
ao.adviceFunc=_28e;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
ao.maxCalls=(!isNaN(parseInt(args[11])))?args[11]:-1;
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _28e=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_28b);
ao.aroundFunc=_28e;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _290={};
for(var x in ao){
_290[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_290.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_290));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _298;
if((arguments.length==1)&&(typeof a1=="object")){
_298=a1;
}else{
_298={srcObj:a1,srcFunc:a2};
}
_298.adviceFunc=function(){
var _299=[];
for(var x=0;x<arguments.length;x++){
_299.push(arguments[x]);
}
dojo.debug("("+_298.srcObj+")."+_298.srcFunc,":",_299.join(", "));
};
this.kwConnect(_298);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this.connectRunOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.maxCalls=1;
return this.connect(ao);
};
this._kwConnectImpl=function(_2a1,_2a2){
var fn=(_2a2)?"disconnect":"connect";
if(typeof _2a1["srcFunc"]=="function"){
_2a1.srcObj=_2a1["srcObj"]||dj_global;
var _2a4=dojo.lang.nameAnonFunc(_2a1.srcFunc,_2a1.srcObj,true);
_2a1.srcFunc=_2a4;
}
if(typeof _2a1["adviceFunc"]=="function"){
_2a1.adviceObj=_2a1["adviceObj"]||dj_global;
var _2a4=dojo.lang.nameAnonFunc(_2a1.adviceFunc,_2a1.adviceObj,true);
_2a1.adviceFunc=_2a4;
}
_2a1.srcObj=_2a1["srcObj"]||dj_global;
_2a1.adviceObj=_2a1["adviceObj"]||_2a1["targetObj"]||dj_global;
_2a1.adviceFunc=_2a1["adviceFunc"]||_2a1["targetFunc"];
return dojo.event[fn](_2a1);
};
this.kwConnect=function(_2a5){
return this._kwConnectImpl(_2a5,false);
};
this.disconnect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(!ao.adviceFunc){
return;
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.disconnect(ao);
}
ao.srcFunc="onkeypress";
}
if(!ao.srcObj[ao.srcFunc]){
return null;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc,true);
mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
return mjp;
};
this.kwDisconnect=function(_2a8){
return this._kwConnectImpl(_2a8,true);
};
};
dojo.event.MethodInvocation=function(_2a9,obj,args){
this.jp_=_2a9;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_2b1){
this.object=obj||dj_global;
this.methodname=_2b1;
this.methodfunc=this.object[_2b1];
this.squelch=false;
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_2b3){
if(!obj){
obj=dj_global;
}
var ofn=obj[_2b3];
if(!ofn){
ofn=obj[_2b3]=function(){
};
if(!obj[_2b3]){
dojo.raise("Cannot set do-nothing method on that object "+_2b3);
}
}else{
if((typeof ofn!="function")&&(!dojo.lang.isFunction(ofn))&&(!dojo.lang.isAlien(ofn))){
return null;
}
}
var _2b5=_2b3+"$joinpoint";
var _2b6=_2b3+"$joinpoint$method";
var _2b7=obj[_2b5];
if(!_2b7){
var _2b8=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_2b8=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_2b5,_2b6,_2b3]);
}
}
var _2b9=ofn.length;
obj[_2b6]=ofn;
_2b7=obj[_2b5]=new dojo.event.MethodJoinPoint(obj,_2b6);
if(!_2b8){
obj[_2b3]=function(){
return _2b7.run.apply(_2b7,arguments);
};
}else{
obj[_2b3]=function(){
var args=[];
if(!arguments.length){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _2b7.run.apply(_2b7,args);
};
}
obj[_2b3].__preJoinArity=_2b9;
}
return _2b7;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{squelch:false,unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _2bf=[];
for(var x=0;x<args.length;x++){
_2bf[x]=args[x];
}
var _2c1=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _2c3=marr[0]||dj_global;
var _2c4=marr[1];
if(!_2c3[_2c4]){
dojo.raise("function \""+_2c4+"\" does not exist on \""+_2c3+"\"");
}
var _2c5=marr[2]||dj_global;
var _2c6=marr[3];
var msg=marr[6];
var _2c8=marr[7];
if(_2c8>-1){
if(_2c8==0){
return;
}
marr[7]--;
}
var _2c9;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _2c3[_2c4].apply(_2c3,to.args);
}};
to.args=_2bf;
var _2cb=parseInt(marr[4]);
var _2cc=((!isNaN(_2cb))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _2cf=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event._canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_2c1(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_2c6){
_2c5[_2c6].call(_2c5,to);
}else{
if((_2cc)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_2c3[_2c4].call(_2c3,to);
}else{
_2c3[_2c4].apply(_2c3,args);
}
},_2cb);
}else{
if(msg){
_2c3[_2c4].call(_2c3,to);
}else{
_2c3[_2c4].apply(_2c3,args);
}
}
}
};
var _2d2=function(){
if(this.squelch){
try{
return _2c1.apply(this,arguments);
}
catch(e){
dojo.debug(e);
}
}else{
return _2c1.apply(this,arguments);
}
};
if((this["before"])&&(this.before.length>0)){
dojo.lang.forEach(this.before.concat(new Array()),_2d2);
}
var _2d3;
try{
if((this["around"])&&(this.around.length>0)){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_2d3=mi.proceed();
}else{
if(this.methodfunc){
_2d3=this.object[this.methodname].apply(this.object,args);
}
}
}
catch(e){
if(!this.squelch){
dojo.debug(e,"when calling",this.methodname,"on",this.object,"with arguments",args);
dojo.raise(e);
}
}
if((this["after"])&&(this.after.length>0)){
dojo.lang.forEach(this.after.concat(new Array()),_2d2);
}
return (this.methodfunc)?_2d3:null;
},getArr:function(kind){
var type="after";
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
type="before";
}else{
if(kind=="around"){
type="around";
}
}
if(!this[type]){
this[type]=[];
}
return this[type];
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"],args["maxCalls"]);
},addAdvice:function(_2d8,_2d9,_2da,_2db,_2dc,_2dd,once,_2df,rate,_2e1,_2e2){
var arr=this.getArr(_2dc);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_2d8,_2d9,_2da,_2db,_2df,rate,_2e1,_2e2];
if(once){
if(this.hasAdvice(_2d8,_2d9,_2dc,arr)>=0){
return;
}
}
if(_2dd=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_2e5,_2e6,_2e7,arr){
if(!arr){
arr=this.getArr(_2e7);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _2e6=="object")?(new String(_2e6)).toString():_2e6;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_2e5)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_2ed,_2ee,_2ef,once){
var arr=this.getArr(_2ef);
var ind=this.hasAdvice(_2ed,_2ee,_2ef,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_2ed,_2ee,_2ef,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_2f3){
if(!this.topics[_2f3]){
this.topics[_2f3]=new this.TopicImpl(_2f3);
}
return this.topics[_2f3];
};
this.registerPublisher=function(_2f4,obj,_2f6){
var _2f4=this.getTopic(_2f4);
_2f4.registerPublisher(obj,_2f6);
};
this.subscribe=function(_2f7,obj,_2f9){
var _2f7=this.getTopic(_2f7);
_2f7.subscribe(obj,_2f9);
};
this.unsubscribe=function(_2fa,obj,_2fc){
var _2fa=this.getTopic(_2fa);
_2fa.unsubscribe(obj,_2fc);
};
this.destroy=function(_2fd){
this.getTopic(_2fd).destroy();
delete this.topics[_2fd];
};
this.publishApply=function(_2fe,args){
var _2fe=this.getTopic(_2fe);
_2fe.sendMessage.apply(_2fe,args);
};
this.publish=function(_300,_301){
var _300=this.getTopic(_300);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_300.sendMessage.apply(_300,args);
};
};
dojo.event.topic.TopicImpl=function(_304){
this.topicName=_304;
this.subscribe=function(_305,_306){
var tf=_306||_305;
var to=(!_306)?dj_global:_305;
return dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_309,_30a){
var tf=(!_30a)?_309:_30a;
var to=(!_30a)?null:_309;
return dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this._getJoinPoint=function(){
return dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage");
};
this.setSquelch=function(_30d){
this._getJoinPoint().squelch=_30d;
};
this.destroy=function(){
this._getJoinPoint().disconnect();
};
this.registerPublisher=function(_30e,_30f){
dojo.event.connect(_30e,_30f,this,"sendMessage");
};
this.sendMessage=function(_310){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_313){
var na;
var tna;
if(_313){
tna=_313.all||_313.getElementsByTagName("*");
na=[_313];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _317={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
try{
if(el&&el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
catch(e){
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
if(dojo.widget){
for(var name in dojo.widget._templateCache){
if(dojo.widget._templateCache[name].node){
dojo.dom.destroyNode(dojo.widget._templateCache[name].node);
dojo.widget._templateCache[name].node=null;
delete dojo.widget._templateCache[name].node;
}
}
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _31c=0;
this.normalizedEventName=function(_31d){
switch(_31d){
case "CheckboxStateChange":
case "DOMAttrModified":
case "DOMMenuItemActive":
case "DOMMenuItemInactive":
case "DOMMouseScroll":
case "DOMNodeInserted":
case "DOMNodeRemoved":
case "RadioStateChange":
return _31d;
break;
default:
var lcn=_31d.toLowerCase();
return (lcn.indexOf("on")==0)?lcn.substr(2):lcn;
break;
}
};
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_322){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_322.length;x++){
node.__clobberAttrs__.push(_322[x]);
}
};
this.removeListener=function(node,_325,fp,_327){
if(!_327){
var _327=false;
}
_325=dojo.event.browser.normalizedEventName(_325);
if(_325=="key"){
if(dojo.render.html.ie){
this.removeListener(node,"onkeydown",fp,_327);
}
_325="keypress";
}
if(node.removeEventListener){
node.removeEventListener(_325,fp,_327);
}
};
this.addListener=function(node,_329,fp,_32b,_32c){
if(!node){
return;
}
if(!_32b){
var _32b=false;
}
_329=dojo.event.browser.normalizedEventName(_329);
if(_329=="key"){
if(dojo.render.html.ie){
this.addListener(node,"onkeydown",fp,_32b,_32c);
}
_329="keypress";
}
if(!_32c){
var _32d=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_32b){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_32d=fp;
}
if(node.addEventListener){
node.addEventListener(_329,_32d,_32b);
return _32d;
}else{
_329="on"+_329;
if(typeof node[_329]=="function"){
var _330=node[_329];
node[_329]=function(e){
_330(e);
return _32d(e);
};
}else{
node[_329]=_32d;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_329]);
}
return _32d;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(obj)&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_333,_334){
if(typeof _333!="function"){
dojo.raise("listener not a function: "+_333);
}
dojo.event.browser.currentEvent.currentTarget=_334;
return _333.call(_334,dojo.event.browser.currentEvent);
};
this._stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this._preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_CLEAR:12,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_HELP:47,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_NUMPAD_0:96,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,KEY_NUMPAD_MULTIPLY:106,KEY_NUMPAD_PLUS:107,KEY_NUMPAD_ENTER:108,KEY_NUMPAD_MINUS:109,KEY_NUMPAD_PERIOD:110,KEY_NUMPAD_DIVIDE:111,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_F13:124,KEY_F14:125,KEY_F15:126,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_337){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if(evt["type"]=="keydown"&&dojo.render.html.ie){
switch(evt.keyCode){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_LEFT_WINDOW:
case evt.KEY_RIGHT_WINDOW:
case evt.KEY_SELECT:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
case evt.KEY_NUMPAD_0:
case evt.KEY_NUMPAD_1:
case evt.KEY_NUMPAD_2:
case evt.KEY_NUMPAD_3:
case evt.KEY_NUMPAD_4:
case evt.KEY_NUMPAD_5:
case evt.KEY_NUMPAD_6:
case evt.KEY_NUMPAD_7:
case evt.KEY_NUMPAD_8:
case evt.KEY_NUMPAD_9:
case evt.KEY_NUMPAD_PERIOD:
break;
case evt.KEY_NUMPAD_MULTIPLY:
case evt.KEY_NUMPAD_PLUS:
case evt.KEY_NUMPAD_ENTER:
case evt.KEY_NUMPAD_MINUS:
case evt.KEY_NUMPAD_DIVIDE:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
case evt.KEY_PAGE_UP:
case evt.KEY_PAGE_DOWN:
case evt.KEY_END:
case evt.KEY_HOME:
case evt.KEY_LEFT_ARROW:
case evt.KEY_UP_ARROW:
case evt.KEY_RIGHT_ARROW:
case evt.KEY_DOWN_ARROW:
case evt.KEY_INSERT:
case evt.KEY_DELETE:
case evt.KEY_F1:
case evt.KEY_F2:
case evt.KEY_F3:
case evt.KEY_F4:
case evt.KEY_F5:
case evt.KEY_F6:
case evt.KEY_F7:
case evt.KEY_F8:
case evt.KEY_F9:
case evt.KEY_F10:
case evt.KEY_F11:
case evt.KEY_F12:
case evt.KEY_F12:
case evt.KEY_F13:
case evt.KEY_F14:
case evt.KEY_F15:
case evt.KEY_CLEAR:
case evt.KEY_HELP:
evt.key=evt.keyCode;
break;
default:
if(evt.ctrlKey||evt.altKey){
var _339=evt.keyCode;
if(_339>=65&&_339<=90&&evt.shiftKey==false){
_339+=32;
}
if(_339>=1&&_339<=26&&evt.ctrlKey){
_339+=96;
}
evt.key=String.fromCharCode(_339);
}
}
}else{
if(evt["type"]=="keypress"){
if(dojo.render.html.opera){
if(evt.which==0){
evt.key=evt.keyCode;
}else{
if(evt.which>0){
switch(evt.which){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
evt.key=evt.which;
break;
default:
var _339=evt.which;
if((evt.ctrlKey||evt.altKey||evt.metaKey)&&(evt.which>=65&&evt.which<=90&&evt.shiftKey==false)){
_339+=32;
}
evt.key=String.fromCharCode(_339);
}
}
}
}else{
if(dojo.render.html.ie){
if(!evt.ctrlKey&&!evt.altKey&&evt.keyCode>=evt.KEY_SPACE){
evt.key=String.fromCharCode(evt.keyCode);
}
}else{
if(dojo.render.html.safari){
switch(evt.keyCode){
case 25:
evt.key=evt.KEY_TAB;
evt.shift=true;
break;
case 63232:
evt.key=evt.KEY_UP_ARROW;
break;
case 63233:
evt.key=evt.KEY_DOWN_ARROW;
break;
case 63234:
evt.key=evt.KEY_LEFT_ARROW;
break;
case 63235:
evt.key=evt.KEY_RIGHT_ARROW;
break;
case 63236:
evt.key=evt.KEY_F1;
break;
case 63237:
evt.key=evt.KEY_F2;
break;
case 63238:
evt.key=evt.KEY_F3;
break;
case 63239:
evt.key=evt.KEY_F4;
break;
case 63240:
evt.key=evt.KEY_F5;
break;
case 63241:
evt.key=evt.KEY_F6;
break;
case 63242:
evt.key=evt.KEY_F7;
break;
case 63243:
evt.key=evt.KEY_F8;
break;
case 63244:
evt.key=evt.KEY_F9;
break;
case 63245:
evt.key=evt.KEY_F10;
break;
case 63246:
evt.key=evt.KEY_F11;
break;
case 63247:
evt.key=evt.KEY_F12;
break;
case 63250:
evt.key=evt.KEY_PAUSE;
break;
case 63272:
evt.key=evt.KEY_DELETE;
break;
case 63273:
evt.key=evt.KEY_HOME;
break;
case 63275:
evt.key=evt.KEY_END;
break;
case 63276:
evt.key=evt.KEY_PAGE_UP;
break;
case 63277:
evt.key=evt.KEY_PAGE_DOWN;
break;
case 63302:
evt.key=evt.KEY_INSERT;
break;
case 63248:
case 63249:
case 63289:
break;
default:
evt.key=evt.charCode>=evt.KEY_SPACE?String.fromCharCode(evt.charCode):evt.keyCode;
}
}else{
evt.key=evt.charCode>0?String.fromCharCode(evt.charCode):evt.keyCode;
}
}
}
}
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_337?_337:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _33b=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_33b.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_33b.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this._stopPropagation;
evt.preventDefault=this._preventDefault;
}
return evt;
};
this.stopEvent=function(evt){
if(window.event){
evt.cancelBubble=true;
evt.returnValue=false;
}else{
evt.preventDefault();
evt.stopPropagation();
}
};
};
dojo.kwCompoundRequire({common:["dojo.event.common","dojo.event.topic"],browser:["dojo.event.browser"],dashboard:["dojo.event.browser"]});
dojo.provide("dojo.event.*");
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _33d={};
var _33e=[];
this.getUniqueId=function(_33f){
var _340;
do{
_340=_33f+"_"+(_33d[_33f]!=undefined?++_33d[_33f]:_33d[_33f]=0);
}while(this.getWidgetById(_340));
return _340;
};
this.add=function(_341){
this.widgets.push(_341);
if(!_341.extraArgs["id"]){
_341.extraArgs["id"]=_341.extraArgs["ID"];
}
if(_341.widgetId==""){
if(_341["id"]){
_341.widgetId=_341["id"];
}else{
if(_341.extraArgs["id"]){
_341.widgetId=_341.extraArgs["id"];
}else{
_341.widgetId=this.getUniqueId(_341.ns+"_"+_341.widgetType);
}
}
}
if(this.widgetIds[_341.widgetId]){
dojo.debug("widget ID collision on ID: "+_341.widgetId);
}
this.widgetIds[_341.widgetId]=_341;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_343){
if(dojo.lang.isNumber(_343)){
var tw=this.widgets[_343].widgetId;
delete this.topWidgets[tw];
delete this.widgetIds[tw];
this.widgets.splice(_343,1);
}else{
this.removeById(_343);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var _34a=(type.indexOf(":")<0?function(x){
return x.widgetType.toLowerCase();
}:function(x){
return x.getNamespacedType();
});
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_34a(x)==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_34f,_350){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_34f(x)){
ret.push(x);
if(_350){
return false;
}
}
return true;
});
return (_350?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _356={};
var _357=["dojo.widget"];
for(var i=0;i<_357.length;i++){
_357[_357[i]]=true;
}
this.registerWidgetPackage=function(_359){
if(!_357[_359]){
_357[_359]=true;
_357.push(_359);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_357,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_35b,_35c,_35d,ns){
var impl=this.getImplementationName(_35b,ns);
if(impl){
var ret=_35c?new impl(_35c):new impl();
return ret;
}
};
function buildPrefixCache(){
for(var _361 in dojo.render){
if(dojo.render[_361]["capable"]===true){
var _362=dojo.render[_361].prefixes;
for(var i=0;i<_362.length;i++){
_33e.push(_362[i].toLowerCase());
}
}
}
}
var _364=function(_365,_366){
if(!_366){
return null;
}
for(var i=0,l=_33e.length,_369;i<=l;i++){
_369=(i<l?_366[_33e[i]]:_366);
if(!_369){
continue;
}
for(var name in _369){
if(name.toLowerCase()==_365){
return _369[name];
}
}
}
return null;
};
var _36b=function(_36c,_36d){
var _36e=dojo.evalObjPath(_36d,false);
return (_36e?_364(_36c,_36e):null);
};
this.getImplementationName=function(_36f,ns){
var _371=_36f.toLowerCase();
ns=ns||"dojo";
var imps=_356[ns]||(_356[ns]={});
var impl=imps[_371];
if(impl){
return impl;
}
if(!_33e.length){
buildPrefixCache();
}
var _374=dojo.ns.get(ns);
if(!_374){
dojo.ns.register(ns,ns+".widget");
_374=dojo.ns.get(ns);
}
if(_374){
_374.resolve(_36f);
}
impl=_36b(_371,_374.module);
if(impl){
return (imps[_371]=impl);
}
_374=dojo.ns.require(ns);
if((_374)&&(_374.resolver)){
_374.resolve(_36f);
impl=_36b(_371,_374.module);
if(impl){
return (imps[_371]=impl);
}
}
dojo.deprecated("dojo.widget.Manager.getImplementationName","Could not locate widget implementation for \""+_36f+"\" in \""+_374.module+"\" registered to namespace \""+_374.name+"\". "+"Developers must specify correct namespaces for all non-Dojo widgets","0.5");
for(var i=0;i<_357.length;i++){
impl=_36b(_371,_357[i]);
if(impl){
return (imps[_371]=impl);
}
}
throw new Error("Could not locate widget implementation for \""+_36f+"\" in \""+_374.module+"\" registered to namespace \""+_374.name+"\"");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _377=this.topWidgets[id];
if(_377.checkSize){
_377.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_37c,_37d){
dw[(_37d||_37c)]=h(_37c);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _37f=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _37f[n];
}
return _37f;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.moduleUri=function(_381,uri){
var loc=dojo.hostenv.getModuleSymbols(_381).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _384=loc.indexOf(":");
var _385=loc.indexOf("/");
if(loc.charAt(0)!="/"&&(_384==-1||_384>_385)){
loc=dojo.hostenv.getBaseScriptUri()+loc;
}
return new dojo.uri.Uri(loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _388=new dojo.uri.Uri(arguments[i].toString());
var _389=new dojo.uri.Uri(uri.toString());
if((_388.path=="")&&(_388.scheme==null)&&(_388.authority==null)&&(_388.query==null)){
if(_388.fragment!=null){
_389.fragment=_388.fragment;
}
_388=_389;
}else{
if(_388.scheme==null){
_388.scheme=_389.scheme;
if(_388.authority==null){
_388.authority=_389.authority;
if(_388.path.charAt(0)!="/"){
var path=_389.path.substring(0,_389.path.lastIndexOf("/")+1)+_388.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_388.path=segs.join("/");
}
}
}
}
uri="";
if(_388.scheme!=null){
uri+=_388.scheme+":";
}
if(_388.authority!=null){
uri+="//"+_388.authority;
}
uri+=_388.path;
if(_388.query!=null){
uri+="?"+_388.query;
}
if(_388.fragment!=null){
uri+="#"+_388.fragment;
}
}
this.uri=uri.toString();
var _38d="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_38d));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_38d="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_38d));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.kwCompoundRequire({common:[["dojo.uri.Uri",false,false]]});
dojo.provide("dojo.uri.*");
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _391=dojo.global();
var _392=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_392.documentElement.clientWidth;
h=_391.innerHeight;
}else{
if(!dojo.render.html.opera&&_391.innerWidth){
w=_391.innerWidth;
h=_391.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_392,"documentElement.clientWidth")){
var w2=_392.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_392.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _396=dojo.global();
var _397=dojo.doc();
var top=_396.pageYOffset||_397.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_396.pageXOffset||_397.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _39c=dojo.doc();
var _39d=dojo.byId(node);
type=type.toLowerCase();
while((_39d)&&(_39d.nodeName.toLowerCase()!=type)){
if(_39d==(_39c["body"]||_39c["documentElement"])){
return null;
}
_39d=_39d.parentNode;
}
return _39d;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _3a5={x:0,y:0};
if(e.pageX||e.pageY){
_3a5.x=e.pageX;
_3a5.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_3a5.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_3a5.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _3a5;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie&&!dojo.render.html.ie70){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _3aa=dojo.doc().createElement("script");
_3aa.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_3aa);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_3ad,_3ae,args,_3b0,_3b1){
dojo.deprecated("dojo.html."+_3ad,"replaced by dojo.html."+_3ae+"("+(_3b0?"node, {"+_3b0+": "+_3b0+"}":"")+")"+(_3b1?"."+_3b1:""),"0.5");
var _3b2=[];
if(_3b0){
var _3b3={};
_3b3[_3b0]=args[1];
_3b2.push(args[0]);
_3b2.push(_3b3);
}else{
_3b2=args;
}
var ret=dojo.html[_3ae].apply(dojo.html,args);
if(_3b1){
return ret[_3b1];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.a11y");
dojo.a11y={imgPath:dojo.uri.moduleUri("dojo.widget","templates/images"),doAccessibleCheck:true,accessible:null,checkAccessible:function(){
if(this.accessible===null){
this.accessible=false;
if(this.doAccessibleCheck==true){
this.accessible=this.testAccessible();
}
}
return this.accessible;
},testAccessible:function(){
this.accessible=false;
if(dojo.render.html.ie||dojo.render.html.mozilla){
var div=document.createElement("div");
div.style.backgroundImage="url(\""+this.imgPath+"/tab_close.gif\")";
dojo.body().appendChild(div);
var _3b6=null;
if(window.getComputedStyle){
var _3b7=getComputedStyle(div,"");
_3b6=_3b7.getPropertyValue("background-image");
}else{
_3b6=div.currentStyle.backgroundImage;
}
var _3b8=false;
if(_3b6!=null&&(_3b6=="none"||_3b6=="url(invalid-url:)")){
this.accessible=true;
}
dojo.body().removeChild(div);
}
return this.accessible;
},setCheckAccessible:function(_3b9){
this.doAccessibleCheck=_3b9;
},setAccessibleMode:function(){
if(this.accessible===null){
if(this.checkAccessible()){
dojo.render.html.prefixes.unshift("a11y");
}
}
return this.accessible;
}};
dojo.provide("dojo.widget.Widget");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,disabled:false,isContainer:false,widgetId:"",widgetType:"Widget",ns:"dojo",getNamespacedType:function(){
return (this.ns?this.ns+":"+this.widgetType:this.widgetType).toLowerCase();
},toString:function(){
return "[Widget "+this.getNamespacedType()+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.disabled=false;
},disable:function(){
this.disabled=true;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _3bb=this.children[i];
if(_3bb.onResized){
_3bb.onResized();
}
}
},create:function(args,_3bd,_3be,ns){
if(ns){
this.ns=ns;
}
this.satisfyPropertySets(args,_3bd,_3be);
this.mixInProperties(args,_3bd,_3be);
this.postMixInProperties(args,_3bd,_3be);
dojo.widget.manager.add(this);
this.buildRendering(args,_3bd,_3be);
this.initialize(args,_3bd,_3be);
this.postInitialize(args,_3bd,_3be);
this.postCreate(args,_3bd,_3be);
return this;
},destroy:function(_3c0){
if(this.parent){
this.parent.removeChild(this);
}
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_3c0);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _3c1;
var i=0;
while(this.children.length>i){
_3c1=this.children[i];
if(_3c1 instanceof dojo.widget.Widget){
this.removeChild(_3c1);
_3c1.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_3c4){
var ret=[];
var _3c6=dojo.lang.isFunction(type);
if(!_3c6){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_3c6){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_3c4){
ret=ret.concat(this.children[x].getChildrenOfType(type,_3c4));
}
}
return ret;
},getDescendants:function(){
var _3c8=[];
var _3c9=[this];
var elem;
while((elem=_3c9.pop())){
_3c8.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_3c9.push(elem);
});
}
}
return _3c8;
},isFirstChild:function(){
return this===this.parent.children[0];
},isLastChild:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _3d0;
var _3d1=dojo.widget.lcArgsCache[this.widgetType];
if(_3d1==null){
_3d1={};
for(var y in this){
_3d1[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_3d1;
}
var _3d3={};
for(var x in args){
if(!this[x]){
var y=_3d1[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_3d3[x]){
continue;
}
_3d3[x]=true;
if((typeof this[x])!=(typeof _3d0)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.kwConnect({srcObj:this,srcFunc:x,adviceObj:this,adviceFunc:tn});
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=dojo.uri.dojoUri(args[x]);
}else{
var _3d5=args[x].split(";");
for(var y=0;y<_3d5.length;y++){
var si=_3d5[y].indexOf(":");
if((si!=-1)&&(_3d5[y].length>si)){
this[x][_3d5[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_3d5[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(args,frag,_3d9){
},initialize:function(args,frag,_3dc){
return false;
},postInitialize:function(args,frag,_3df){
return false;
},postCreate:function(args,frag,_3e2){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(args,frag,_3e5){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},addedTo:function(_3e6){
},addChild:function(_3e7){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_3e8){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_3e8){
this.children.splice(x,1);
_3e8.parent=null;
break;
}
}
return _3e8;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
dojo.deprecated("addParseTreeHandler",". ParseTreeHandlers are now reserved for components. Any unfiltered DojoML tag without a ParseTreeHandler is assumed to be a widget","0.5");
};
dojo.widget.tags["dojo:propertyset"]=function(_3ed,_3ee,_3ef){
var _3f0=_3ee.parseProperties(_3ed["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_3f1,_3f2,_3f3){
var _3f4=_3f2.parseProperties(_3f1["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_3f7,_3f8,_3f9,_3fa){
dojo.a11y.setAccessibleMode();
var _3fb=type.split(":");
_3fb=(_3fb.length==2)?_3fb[1]:type;
var _3fc=_3fa||_3f7.parseProperties(frag[frag["ns"]+":"+_3fb]);
var _3fd=dojo.widget.manager.getImplementation(_3fb,null,null,frag["ns"]);
if(!_3fd){
throw new Error("cannot find \""+type+"\" widget");
}else{
if(!_3fd.create){
throw new Error("\""+type+"\" widget object has no \"create\" method and does not appear to implement *Widget");
}
}
_3fc["dojoinsertionindex"]=_3f9;
var ret=_3fd.create(_3fc,frag,_3f8,frag["ns"]);
return ret;
};
dojo.widget.defineWidget=function(_3ff,_400,_401,init,_403){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_406,_407,_408,init,_40a){
var _40b=_406.split(".");
var type=_40b.pop();
var regx="\\.("+(_407?_407+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_406.search(new RegExp(regx));
_40b=(r<0?_40b.join("."):_406.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_40b);
var pos=_40b.indexOf(".");
var _410=(pos>-1)?_40b.substring(0,pos):_40b;
_40a=(_40a)||{};
_40a.widgetType=type;
if((!init)&&(_40a["classConstructor"])){
init=_40a.classConstructor;
delete _40a.classConstructor;
}
dojo.declare(_406,_408,init,_40a);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_411){
this.propertySetsList=[];
this.fragment=_411;
this.createComponents=function(frag,_413){
var _414=[];
var _415=false;
try{
if(frag&&frag.tagName&&(frag!=frag.nodeRef)){
var _416=dojo.widget.tags;
var tna=String(frag.tagName).split(";");
for(var x=0;x<tna.length;x++){
var ltn=tna[x].replace(/^\s+|\s+$/g,"").toLowerCase();
frag.tagName=ltn;
var ret;
if(_416[ltn]){
_415=true;
ret=_416[ltn](frag,this,_413,frag.index);
_414.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_413,frag.index);
if(ret){
_415=true;
_414.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_415){
_414=_414.concat(this.createSubComponents(frag,_413));
}
return _414;
};
this.createSubComponents=function(_41b,_41c){
var frag,_41e=[];
for(var item in _41b){
frag=_41b[item];
if(frag&&typeof frag=="object"&&(frag!=_41b.nodeRef)&&(frag!=_41b.tagName)&&(!dojo.dom.isNode(frag))){
_41e=_41e.concat(this.createComponents(frag,_41c));
}
}
return _41e;
};
this.parsePropertySets=function(_420){
return [];
};
this.parseProperties=function(_421){
var _422={};
for(var item in _421){
if((_421[item]==_421.tagName)||(_421[item]==_421.nodeRef)){
}else{
var frag=_421[item];
if(frag.tagName&&dojo.widget.tags[frag.tagName.toLowerCase()]){
}else{
if(frag[0]&&frag[0].value!=""&&frag[0].value!=null){
try{
if(item.toLowerCase()=="dataprovider"){
var _425=this;
this.getDataProvider(_425,frag[0].value);
_422.dataProvider=this.dataProvider;
}
_422[item]=frag[0].value;
var _426=this.parseProperties(frag);
for(var _427 in _426){
_422[_427]=_426[_427];
}
}
catch(e){
dojo.debug(e);
}
}
}
switch(item.toLowerCase()){
case "checked":
case "disabled":
if(typeof _422[item]!="boolean"){
_422[item]=true;
}
break;
}
}
}
return _422;
};
this.getDataProvider=function(_428,_429){
dojo.io.bind({url:_429,load:function(type,_42b){
if(type=="load"){
_428.dataProvider=_42b;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_42c){
for(var x=0;x<this.propertySetsList.length;x++){
if(_42c==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_42e){
var _42f=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl.componentClass||cpl.componentType||null;
var _433=this.propertySetsList[x]["id"][0].value;
if(cpcc&&(_433==cpcc[0].value)){
_42f.push(cpl);
}
}
return _42f;
};
this.getPropertySets=function(_434){
var ppl="dojo:propertyproviderlist";
var _436=[];
var _437=_434.tagName;
if(_434[ppl]){
var _438=_434[ppl].value.split(" ");
for(var _439 in _438){
if((_439.indexOf("..")==-1)&&(_439.indexOf("://")==-1)){
var _43a=this.getPropertySetById(_439);
if(_43a!=""){
_436.push(_43a);
}
}else{
}
}
}
return this.getPropertySetsByType(_437).concat(_436);
};
this.createComponentFromScript=function(_43b,_43c,_43d,ns){
_43d.fastMixIn=true;
var ltn=(ns||"dojo")+":"+_43c.toLowerCase();
if(dojo.widget.tags[ltn]){
return [dojo.widget.tags[ltn](_43d,this,null,null,_43d)];
}
return [dojo.widget.buildWidgetFromParseTree(ltn,_43d,this,null,null,_43d)];
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_442,_443,_444){
var _445=false;
var _446=(typeof name=="string");
if(_446){
var pos=name.indexOf(":");
var ns=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _449=name.toLowerCase();
var _44a=ns+":"+_449;
_445=(dojo.byId(name)&&!dojo.widget.tags[_44a]);
}
if((arguments.length==1)&&(_445||!_446)){
var xp=new dojo.xml.Parse();
var tn=_445?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_44d,name,_44f,ns){
_44f[_44a]={dojotype:[{value:_449}],nodeRef:_44d,fastMixIn:true};
_44f.ns=ns;
return dojo.widget.getParser().createComponentFromScript(_44d,name,_44f,ns);
}
_442=_442||{};
var _451=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_443){
_451=true;
_443=tn;
if(h){
dojo.body().appendChild(_443);
}
}else{
if(_444){
dojo.dom.insertAtPosition(tn,_443,_444);
}else{
tn=_443;
}
}
var _453=fromScript(tn,name.toLowerCase(),_442,ns);
if((!_453)||(!_453[0])||(typeof _453[0].widgetType=="undefined")){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
try{
if(_451&&_453[0].domNode.parentNode){
_453[0].domNode.parentNode.removeChild(_453[0].domNode);
}
}
catch(e){
dojo.debug(e);
}
return _453[0];
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_459){
return (new RegExp("(^|\\s+)"+_459+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_45b){
_45b+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_45b);
};
dojo.html.addClass=function(node,_45d){
if(dojo.html.hasClass(node,_45d)){
return false;
}
_45d=(dojo.html.getClass(node)+" "+_45d).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_45d);
};
dojo.html.setClass=function(node,_45f){
node=dojo.byId(node);
var cs=new String(_45f);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_45f);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_462,_463){
try{
if(!_463){
var _464=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_462+"(\\s+|$)"),"$1$2");
}else{
var _464=dojo.html.getClass(node).replace(_462,"");
}
dojo.html.setClass(node,_464);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_466,_467){
dojo.html.removeClass(node,_467);
dojo.html.addClass(node,_466);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_468,_469,_46a,_46b,_46c){
_46c=false;
var _46d=dojo.doc();
_469=dojo.byId(_469)||_46d;
var _46e=_468.split(/\s+/g);
var _46f=[];
if(_46b!=1&&_46b!=2){
_46b=0;
}
var _470=new RegExp("(\\s|^)(("+_46e.join(")|(")+"))(\\s|$)");
var _471=_46e.join(" ").length;
var _472=[];
if(!_46c&&_46d.evaluate){
var _473=".//"+(_46a||"*")+"[contains(";
if(_46b!=dojo.html.classMatchType.ContainsAny){
_473+="concat(' ',@class,' '), ' "+_46e.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_46b==2){
_473+=" and string-length(@class)="+_471+"]";
}else{
_473+="]";
}
}else{
_473+="concat(' ',@class,' '), ' "+_46e.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _474=_46d.evaluate(_473,_469,null,XPathResult.ANY_TYPE,null);
var _475=_474.iterateNext();
while(_475){
try{
_472.push(_475);
_475=_474.iterateNext();
}
catch(e){
break;
}
}
return _472;
}else{
if(!_46a){
_46a="*";
}
_472=_469.getElementsByTagName(_46a);
var node,i=0;
outer:
while(node=_472[i++]){
var _478=dojo.html.getClasses(node);
if(_478.length==0){
continue outer;
}
var _479=0;
for(var j=0;j<_478.length;j++){
if(_470.test(_478[j])){
if(_46b==dojo.html.classMatchType.ContainsAny){
_46f.push(node);
continue outer;
}else{
_479++;
}
}else{
if(_46b==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_479==_46e.length){
if((_46b==dojo.html.classMatchType.IsOnly)&&(_479==_478.length)){
_46f.push(node);
}else{
if(_46b==dojo.html.classMatchType.ContainsAll){
_46f.push(node);
}
}
}
}
return _46f;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_47b){
var arr=_47b.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_47f){
return _47f.replace(/([A-Z])/g,"-$1").toLowerCase();
};
if(dojo.render.html.ie){
dojo.html.getComputedStyle=function(node,_481,_482){
node=dojo.byId(node);
if(!node||!node.style){
return _482;
}
return node.currentStyle[dojo.html.toCamelCase(_481)];
};
dojo.html.getComputedStyles=function(node){
return node.currentStyle;
};
}else{
dojo.html.getComputedStyle=function(node,_485,_486){
node=dojo.byId(node);
if(!node||!node.style){
return _486;
}
var s=document.defaultView.getComputedStyle(node,null);
return (s&&s[dojo.html.toCamelCase(_485)])||"";
};
dojo.html.getComputedStyles=function(node){
return document.defaultView.getComputedStyle(node,null);
};
}
dojo.html.getStyleProperty=function(node,_48a){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_48a)]:undefined);
};
dojo.html.getStyle=function(node,_48c){
var _48d=dojo.html.getStyleProperty(node,_48c);
return (_48d?_48d:dojo.html.getComputedStyle(node,_48c));
};
dojo.html.setStyle=function(node,_48f,_490){
node=dojo.byId(node);
if(node&&node.style){
var _491=dojo.html.toCamelCase(_48f);
node.style[_491]=_490;
}
};
dojo.html.setStyleText=function(_492,text){
try{
_492.style.cssText=text;
}
catch(e){
_492.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_494,_495){
if(!_495.style.cssText){
_494.setAttribute("style",_495.getAttribute("style"));
}else{
_494.style.cssText=_495.style.cssText;
}
dojo.html.addClass(_494,dojo.html.getClass(_495));
};
dojo.html.getUnitValue=function(node,_497,_498){
var s=dojo.html.getComputedStyle(node,_497);
if((!s)||((s=="auto")&&(_498))){
return {value:0,units:"px"};
}
var _49a=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_49a){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_49a[1]),units:_49a[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
if(dojo.render.html.ie){
dojo.html.toPixelValue=function(_49b,_49c){
if(!_49c){
return 0;
}
if(_49c.slice(-2)=="px"){
return parseFloat(_49c);
}
var _49d=0;
with(_49b){
var _49e=style.left;
var _49f=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_49c||0;
_49d=style.pixelLeft;
style.left=_49e;
runtimeStyle.left=_49f;
}
catch(e){
}
}
return _49d;
};
}else{
dojo.html.toPixelValue=function(_4a0,_4a1){
return (_4a1&&(_4a1.slice(-2)=="px")?parseFloat(_4a1):0);
};
}
dojo.html.getPixelValue=function(node,_4a3,_4a4){
return dojo.html.toPixelValue(node,dojo.html.getComputedStyle(node,_4a3));
};
dojo.html.setPositivePixelValue=function(node,_4a6,_4a7){
if(isNaN(_4a7)){
return false;
}
node.style[_4a6]=Math.max(0,_4a7)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_4a8,_4a9,_4aa){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_4aa=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_4aa=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_4a8+" { "+_4a9+" }";
return dojo.html.styleSheet.insertRule(rule,_4aa);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_4a8,_4a9,_4aa);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_4ac){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_4ac){
_4ac=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_4ac);
}
}else{
if(document.styleSheets[0]){
if(!_4ac){
_4ac=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_4ac);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_4af,_4b0){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _4b1=dojo.hostenv.getText(URI,false,_4b0);
if(_4b1===null){
return;
}
_4b1=dojo.html.fixPathsInCssText(_4b1,URI);
if(_4af){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_4b1)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _4b6=doc.getElementsByTagName("style");
for(var i=0;i<_4b6.length;i++){
if(_4b6[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _4b7=dojo.html.insertCssText(_4b1,doc);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_4b1,"nodeRef":_4b7});
if(_4b7&&djConfig.isDebug){
_4b7.setAttribute("dbgHref",URI);
}
return _4b7;
};
dojo.html.insertCssText=function(_4b8,doc,URI){
if(!_4b8){
return;
}
if(!doc){
doc=document;
}
if(URI){
_4b8=dojo.html.fixPathsInCssText(_4b8,URI);
}
var _4bb=doc.createElement("style");
_4bb.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_4bb);
}
if(_4bb.styleSheet){
var _4bd=function(){
try{
_4bb.styleSheet.cssText=_4b8;
}
catch(e){
dojo.debug(e);
}
};
if(_4bb.styleSheet.disabled){
setTimeout(_4bd,10);
}else{
_4bd();
}
}else{
var _4be=doc.createTextNode(_4b8);
_4bb.appendChild(_4be);
}
return _4bb;
};
dojo.html.fixPathsInCssText=function(_4bf,URI){
if(!_4bf||!URI){
return;
}
var _4c1,str="",url="",_4c4="[\\t\\s\\w\\(\\)\\/\\.\\\\'\"-:#=&?~]+";
var _4c5=new RegExp("url\\(\\s*("+_4c4+")\\s*\\)");
var _4c6=/(file|https?|ftps?):\/\//;
regexTrim=new RegExp("^[\\s]*(['\"]?)("+_4c4+")\\1[\\s]*?$");
if(dojo.render.html.ie55||dojo.render.html.ie60){
var _4c7=new RegExp("AlphaImageLoader\\((.*)src=['\"]("+_4c4+")['\"]");
while(_4c1=_4c7.exec(_4bf)){
url=_4c1[2].replace(regexTrim,"$2");
if(!_4c6.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_4bf.substring(0,_4c1.index)+"AlphaImageLoader("+_4c1[1]+"src='"+url+"'";
_4bf=_4bf.substr(_4c1.index+_4c1[0].length);
}
_4bf=str+_4bf;
str="";
}
while(_4c1=_4c5.exec(_4bf)){
url=_4c1[1].replace(regexTrim,"$2");
if(!_4c6.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_4bf.substring(0,_4c1.index)+"url("+url+")";
_4bf=_4bf.substr(_4c1.index+_4c1[0].length);
}
return str+_4bf;
};
dojo.html.setActiveStyleSheet=function(_4c8){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_4c8){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
var drh=dojo.render.html;
var _4d4={dj_ie:drh.ie,dj_ie55:drh.ie55,dj_ie6:drh.ie60,dj_ie7:drh.ie70,dj_iequirks:drh.ie&&drh.quirks,dj_opera:drh.opera,dj_opera8:drh.opera&&(Math.floor(dojo.render.version)==8),dj_opera9:drh.opera&&(Math.floor(dojo.render.version)==9),dj_khtml:drh.khtml,dj_safari:drh.safari,dj_gecko:drh.mozilla};
for(var p in _4d4){
if(_4d4[p]){
dojo.html.addClass(node,p);
}
}
};
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),dojoWidgetModuleUri:dojo.uri.moduleUri("dojo.widget"),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.fillFromTemplateCache=function(obj,_4d7,_4d8,_4d9){
var _4da=_4d7||obj.templatePath;
var _4db=dojo.widget._templateCache;
if(!_4da&&!obj["widgetType"]){
do{
var _4dc="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_4db[_4dc]);
obj.widgetType=_4dc;
}
var wt=_4da?_4da.toString():obj.widgetType;
var ts=_4db[wt];
if(!ts){
_4db[wt]={"string":null,"node":null};
if(_4d9){
ts={};
}else{
ts=_4db[wt];
}
}
if((!obj.templateString)&&(!_4d9)){
obj.templateString=_4d8||ts["string"];
}
if(obj.templateString){
obj.templateString=this._sanitizeTemplateString(obj.templateString);
}
if((!obj.templateNode)&&(!_4d9)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_4da)){
var _4df=this._sanitizeTemplateString(dojo.hostenv.getText(_4da));
obj.templateString=_4df;
if(!_4d9){
_4db[wt]["string"]=_4df;
}
}
if((!ts["string"])&&(!_4d9)){
ts.string=obj.templateString;
}
};
dojo.widget._sanitizeTemplateString=function(_4e0){
if(_4e0){
_4e0=_4e0.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _4e1=_4e0.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_4e1){
_4e0=_4e1[1];
}
}else{
_4e0="";
}
return _4e0;
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole","namespace":"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState","namespace":"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_4e5){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_4e5);
}else{
node.setAttributeNS(this[ns]["namespace"],attr,this[ns].prefix+_4e5);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns]["namespace"],attr);
}
},removeAttr:function(node,ns,attr){
var _4ec=true;
if(dojo.render.html.ie){
_4ec=node.removeAttribute(this[ns].alias+":"+attr);
}else{
node.removeAttributeNS(this[ns]["namespace"],attr);
}
return _4ec;
}};
dojo.widget.attachTemplateNodes=function(_4ed,_4ee,_4ef){
var _4f0=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_4ed){
_4ed=_4ee.domNode;
}
if(_4ed.nodeType!=_4f0){
return;
}
var _4f2=_4ed.all||_4ed.getElementsByTagName("*");
var _4f3=_4ee;
for(var x=-1;x<_4f2.length;x++){
var _4f5=(x==-1)?_4ed:_4f2[x];
var _4f6=[];
if(!_4ee.widgetsInTemplate||!_4f5.getAttribute("dojoType")){
for(var y=0;y<this.attachProperties.length;y++){
var _4f8=_4f5.getAttribute(this.attachProperties[y]);
if(_4f8){
_4f6=_4f8.split(";");
for(var z=0;z<_4f6.length;z++){
if(dojo.lang.isArray(_4ee[_4f6[z]])){
_4ee[_4f6[z]].push(_4f5);
}else{
_4ee[_4f6[z]]=_4f5;
}
}
break;
}
}
var _4fa=_4f5.getAttribute(this.eventAttachProperty);
if(_4fa){
var evts=_4fa.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _4fc=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _4fe=tevt.split(":");
tevt=trim(_4fe[0]);
_4fc=trim(_4fe[1]);
}
if(!_4fc){
_4fc=tevt;
}
var tf=function(){
var ntf=new String(_4fc);
return function(evt){
if(_4f3[ntf]){
_4f3[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_4f5,tevt,tf,false,true);
}
}
for(var y=0;y<_4ef.length;y++){
var _502=_4f5.getAttribute(_4ef[y]);
if((_502)&&(_502.length)){
var _4fc=null;
var _503=_4ef[y].substr(4);
_4fc=trim(_502);
var _504=[_4fc];
if(_4fc.indexOf(";")>=0){
_504=dojo.lang.map(_4fc.split(";"),trim);
}
for(var z=0;z<_504.length;z++){
if(!_504[z].length){
continue;
}
var tf=function(){
var ntf=new String(_504[z]);
return function(evt){
if(_4f3[ntf]){
_4f3[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_4f5,_503,tf,false,true);
}
}
}
}
var _507=_4f5.getAttribute(this.templateProperty);
if(_507){
_4ee[_507]=_4f5;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_4f5.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_4f5,wai.name,"role",val);
}else{
var _50b=val.split("-");
dojo.widget.wai.setAttr(_4f5,wai.name,_50b[0],_50b[1]);
}
}
},this);
var _50c=_4f5.getAttribute(this.onBuildProperty);
if(_50c){
eval("var node = baseNode; var widget = targetObj; "+_50c);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].length<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,widgetsInTemplate:false,addChild:function(_514,_515,pos,ref,_518){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_518==undefined){
_518=this.children.length;
}
this.addWidgetAsDirectChild(_514,_515,pos,ref,_518);
this.registerChild(_514,_518);
}
return _514;
},addWidgetAsDirectChild:function(_519,_51a,pos,ref,_51d){
if((!this.containerNode)&&(!_51a)){
this.containerNode=this.domNode;
}
var cn=(_51a)?_51a:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_51d){
_51d=0;
}
_519.domNode.setAttribute("dojoinsertionindex",_51d);
if(!ref){
cn.appendChild(_519.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_519.domNode,ref.parentNode,_51d);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_519.domNode);
}else{
dojo.dom.insertAtPosition(_519.domNode,cn,pos);
}
}
}
},registerChild:function(_51f,_520){
_51f.dojoInsertionIndex=_520;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<=_520){
idx=i;
}
}
this.children.splice(idx+1,0,_51f);
_51f.parent=this;
_51f.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_51f.widgetId];
},removeChild:function(_523){
dojo.dom.removeNode(_523.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_523);
},getFragNodeRef:function(frag){
if(!frag){
return null;
}
if(!frag[this.getNamespacedType()]){
dojo.raise("Error: no frag for widget type "+this.getNamespacedType()+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag[this.getNamespacedType()]["nodeRef"];
},postInitialize:function(args,frag,_527){
var _528=this.getFragNodeRef(frag);
if(_527&&(_527.snarfChildDomOutput||!_528)){
_527.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_528);
}else{
if(_528){
if(this.domNode&&(this.domNode!==_528)){
this._sourceNodeRef=dojo.dom.replaceNode(_528,this.domNode);
}
}
}
if(_527){
_527.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.widgetsInTemplate){
var _529=new dojo.xml.Parse();
var _52a;
var _52b=this.domNode.getElementsByTagName("*");
for(var i=0;i<_52b.length;i++){
if(_52b[i].getAttribute("dojoAttachPoint")=="subContainerWidget"){
_52a=_52b[i];
}
if(_52b[i].getAttribute("dojoType")){
_52b[i].setAttribute("isSubWidget",true);
}
}
if(this.isContainer&&!this.containerNode){
if(_52a){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,_52a);
frag["dojoDontFollow"]=true;
}
}else{
dojo.debug("No subContainerWidget node can be found in template file for widget "+this);
}
}
var _52e=_529.parseElement(this.domNode,null,true);
dojo.widget.getParser().createSubComponents(_52e,this);
var _52f=[];
var _530=[this];
var w;
while((w=_530.pop())){
for(var i=0;i<w.children.length;i++){
var _532=w.children[i];
if(_532._processedSubWidgets||!_532.extraArgs["issubwidget"]){
continue;
}
_52f.push(_532);
if(_532.isContainer){
_530.push(_532);
}
}
}
for(var i=0;i<_52f.length;i++){
var _533=_52f[i];
if(_533._processedSubWidgets){
dojo.debug("This should not happen: widget._processedSubWidgets is already true!");
return;
}
_533._processedSubWidgets=true;
if(_533.extraArgs["dojoattachevent"]){
var evts=_533.extraArgs["dojoattachevent"].split(";");
for(var j=0;j<evts.length;j++){
var _536=null;
var tevt=dojo.string.trim(evts[j]);
if(tevt.indexOf(":")>=0){
var _538=tevt.split(":");
tevt=dojo.string.trim(_538[0]);
_536=dojo.string.trim(_538[1]);
}
if(!_536){
_536=tevt;
}
if(dojo.lang.isFunction(_533[tevt])){
dojo.event.kwConnect({srcObj:_533,srcFunc:tevt,targetObj:this,targetFunc:_536});
}else{
alert(tevt+" is not a function in widget "+_533);
}
}
}
if(_533.extraArgs["dojoattachpoint"]){
this[_533.extraArgs["dojoattachpoint"]]=_533;
}
}
}
if(this.isContainer&&!frag["dojoDontFollow"]){
dojo.widget.getParser().createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _53c=args["templateCssPath"]||this.templateCssPath;
if(_53c&&!dojo.widget._cssFiles[_53c.toString()]){
if((!this.templateCssString)&&(_53c)){
this.templateCssString=dojo.hostenv.getText(_53c);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_53c.toString()]=true;
}
if((this["templateCssString"])&&(!dojo.widget._cssStrings[this.templateCssString])){
dojo.html.insertCssText(this.templateCssString,null,_53c);
dojo.widget._cssStrings[this.templateCssString]=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _53f=false;
if(args["templatepath"]){
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_53f);
var ts=dojo.widget._templateCache[this.templatePath?this.templatePath.toString():this.widgetType];
if((ts)&&(!_53f)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _541=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_541=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_541){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_541.length;i++){
var key=_541[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _548;
if((kval)||(dojo.lang.isString(kval))){
_548=new String((dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval);
while(_548.indexOf("\"")>-1){
_548=_548.replace("\"","&quot;");
}
tstr=tstr.replace(_541[i],_548);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_53f){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_541)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_541){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes();
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_54a,_54b){
if(!_54a){
_54a=this.domNode;
}
if(!_54b){
_54b=this;
}
return dojo.widget.attachTemplateNodes(_54a,_54b,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
dojo.dom.destroyNode(this.domNode);
delete this.domNode;
}
catch(e){
}
if(this._sourceNodeRef){
try{
dojo.dom.destroyNode(this._sourceNodeRef);
}
catch(e){
}
}
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_54d,_54e){
node=dojo.byId(node);
_54e(node,!_54d(node));
return _54d(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_553){
dojo.html[(_553?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_559){
dojo.html.setStyle(node,"display",((_559 instanceof String||typeof _559=="string")?_559:(_559?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_55d){
dojo.html.setStyle(node,"visibility",((_55d instanceof String||typeof _55d=="string")?_55d:(_55d?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_561,_562){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_562){
if(_561>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_561=0.999999;
}
}else{
if(_561<0){
_561=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_561*100+")";
}
}
node.style.filter="Alpha(Opacity="+_561*100+")";
}else{
if(h.moz){
node.style.opacity=_561;
node.style.MozOpacity=_561;
}else{
if(h.safari){
node.style.opacity=_561;
node.style.KhtmlOpacity=_561;
}else{
node.style.opacity=_561;
}
}
}
};
dojo.html.clearOpacity=function(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _56e=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_56e+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _56e;
};
dojo.html.setStyleAttributes=function(node,_571){
node=dojo.byId(node);
var _572=_571.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_572.length;i++){
var _574=_572[i].split(":");
var name=_574[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _576=_574[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_576);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_576});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_576});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_576});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_576});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_576;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_578,_579){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_579){
_579=bs.CONTENT_BOX;
}
var _57c=2;
var _57d;
switch(_579){
case bs.MARGIN_BOX:
_57d=3;
break;
case bs.BORDER_BOX:
_57d=2;
break;
case bs.PADDING_BOX:
default:
_57d=1;
break;
case bs.CONTENT_BOX:
_57d=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_57c=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _581;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_581=db;
}else{
_581=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _583=node;
do{
var n=_583["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_583["offsetTop"];
ret.y+=isNaN(m)?0:m;
_583=_583.offsetParent;
}while((_583!=_581)&&(_583!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_578){
var _586=dojo.html.getScroll();
ret.y+=_586.top;
ret.x+=_586.left;
}
var _587=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_57c>_57d){
for(var i=_57d;i<_57c;++i){
ret.y+=_587[i](node,"top");
ret.x+=_587[i](node,"left");
}
}else{
if(_57c<_57d){
for(var i=_57d;i>_57c;--i){
ret.y-=_587[i-1](node,"top");
ret.x-=_587[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_58b,_58c){
var _58d=0;
for(var x=0;x<_58b.length;x++){
_58d+=dojo.html.getPixelValue(node,_58b[x],_58c);
}
return _58d;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _59a=dojo.html.getBorder(node);
return {width:pad.width+_59a.width,height:pad.height+_59a.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if(((h.ie)||(h.opera))&&node.nodeName.toLowerCase()!="img"){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _59f;
if(!h.ie){
_59f=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_59f){
_59f=dojo.html.getStyle(node,"box-sizing");
}
}
return (_59f?_59f:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _5a4=dojo.html.getBorder(node);
return {width:box.width-_5a4.width,height:box.height-_5a4.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _5a6=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_5a6.width,height:node.offsetHeight-_5a6.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _5a9=0;
var _5aa=0;
var isbb=dojo.html.isBorderBox(node);
var _5ac=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!="undefined"){
_5a9=args.width+_5ac.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_5a9);
}
if(typeof args.height!="undefined"){
_5aa=args.height+_5ac.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_5aa);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _5af=dojo.html.getBorderBox(node);
var _5b0=dojo.html.getMargin(node);
return {width:_5af.width+_5b0.width,height:_5af.height+_5b0.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _5b3=0;
var _5b4=0;
var isbb=dojo.html.isBorderBox(node);
var _5b6=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _5b7=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!="undefined"){
_5b3=args.width-_5b6.width;
_5b3-=_5b7.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_5b3);
}
if(typeof args.height!="undefined"){
_5b4=args.height-_5b6.height;
_5b4-=_5b7.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_5b4);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_5bc,_5bd,_5be){
if(_5bc instanceof Array||typeof _5bc=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_5bc.length<4){
_5bc.push(0);
}
while(_5bc.length>4){
_5bc.pop();
}
var ret={left:_5bc[0],top:_5bc[1],width:_5bc[2],height:_5bc[3]};
}else{
if(!_5bc.nodeType&&!(_5bc instanceof String||typeof _5bc=="string")&&("width" in _5bc||"height" in _5bc||"left" in _5bc||"x" in _5bc||"top" in _5bc||"y" in _5bc)){
var ret={left:_5bc.left||_5bc.x||0,top:_5bc.top||_5bc.y||0,width:_5bc.width||0,height:_5bc.height||0};
}else{
var node=dojo.byId(_5bc);
var pos=dojo.html.abs(node,_5bd,_5be);
var _5c2=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_5c2.width,height:_5c2.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_5c4){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_5c7){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_5c9){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_5cb){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_5cd){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_5cf){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_5d9){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_5db){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_5dc){
return dojo.html.getDocumentWindow(_5dc.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _5e4=dojo.html.getCursorPosition(e);
with(dojo.html){
var _5e5=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _5e7=_5e5.x+(bb.width/2);
var _5e8=_5e5.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_5e4.x<_5e7?WEST:EAST)|(_5e4.y<_5e8?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_5e9,e){
_5e9=dojo.byId(_5e9);
var _5eb=dojo.html.getCursorPosition(e);
var bb=dojo.html.getBorderBox(_5e9);
var _5ed=dojo.html.getAbsolutePosition(_5e9,true,dojo.html.boxSizing.BORDER_BOX);
var top=_5ed.y;
var _5ef=top+bb.height;
var left=_5ed.x;
var _5f1=left+bb.width;
return (_5eb.x>=left&&_5eb.x<=_5f1&&_5eb.y>=top&&_5eb.y<=_5ef);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _5f3="";
if(node==null){
return _5f3;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _5f5="unknown";
try{
_5f5=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_5f5){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_5f3+="\n";
_5f3+=dojo.html.renderedTextContent(node.childNodes[i]);
_5f3+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_5f3+="\n";
}else{
_5f3+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _5f7="unknown";
try{
_5f7=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_5f7){
case "capitalize":
var _5f8=text.split(" ");
for(var i=0;i<_5f8.length;i++){
_5f8[i]=_5f8[i].charAt(0).toUpperCase()+_5f8[i].substring(1);
}
text=_5f8.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_5f7){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_5f3)){
text.replace(/^\s/,"");
}
break;
}
_5f3+=text;
break;
default:
break;
}
}
return _5f3;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _5fc="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_5fc="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_5fc="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_5fc="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _5fd=null;
switch(_5fc){
case "cell":
_5fd=tn.getElementsByTagName("tr")[0];
break;
case "row":
_5fd=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_5fd=tn.getElementsByTagName("table")[0];
break;
default:
_5fd=tn;
break;
}
var _5fe=[];
for(var x=0;x<_5fd.childNodes.length;x++){
_5fe.push(_5fd.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.html.destroyNode(tn);
return _5fe;
};
dojo.html.placeOnScreen=function(node,_601,_602,_603,_604,_605,_606){
if(_601 instanceof Array||typeof _601=="array"){
_606=_605;
_605=_604;
_604=_603;
_603=_602;
_602=_601[1];
_601=_601[0];
}
if(_605 instanceof String||typeof _605=="string"){
_605=_605.split(",");
}
if(!isNaN(_603)){
_603=[Number(_603),Number(_603)];
}else{
if(!(_603 instanceof Array||typeof _603=="array")){
_603=[0,0];
}
}
var _607=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _609=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_609;
if(!(_605 instanceof Array||typeof _605=="array")){
_605=["TL"];
}
var _60d,_60e,_60f=Infinity,_610;
for(var _611=0;_611<_605.length;++_611){
var _612=_605[_611];
var _613=true;
var tryX=_601-(_612.charAt(1)=="L"?0:w)+_603[0]*(_612.charAt(1)=="L"?1:-1);
var tryY=_602-(_612.charAt(0)=="T"?0:h)+_603[1]*(_612.charAt(0)=="T"?1:-1);
if(_604){
tryX-=_607.x;
tryY-=_607.y;
}
if(tryX<0){
tryX=0;
_613=false;
}
if(tryY<0){
tryY=0;
_613=false;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_613=false;
}else{
x=tryX;
}
x=Math.max(_603[0],x)+_607.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_613=false;
}else{
y=tryY;
}
y=Math.max(_603[1],y)+_607.y;
if(_613){
_60d=x;
_60e=y;
_60f=0;
_610=_612;
break;
}else{
var dist=Math.pow(x-tryX-_607.x,2)+Math.pow(y-tryY-_607.y,2);
if(_60f>dist){
_60f=dist;
_60d=x;
_60e=y;
_610=_612;
}
}
}
if(!_606){
node.style.left=_60d+"px";
node.style.top=_60e+"px";
}
return {left:_60d,top:_60e,x:_60d,y:_60e,dist:_60f,corner:_610};
};
dojo.html.placeOnScreenPoint=function(node,_61a,_61b,_61c,_61d){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_61a,_61b,_61c,_61d,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_61f,_620,_621,_622,_623){
var best,_625=Infinity;
_61f=dojo.byId(_61f);
var _626=_61f.style.display;
_61f.style.display="";
var mb=dojo.html.getElementBox(_61f,_621);
var _628=mb.width;
var _629=mb.height;
var _62a=dojo.html.getAbsolutePosition(_61f,true,_621);
_61f.style.display=_626;
for(var _62b in _622){
var pos,_62d,_62e;
var _62f=_622[_62b];
_62d=_62a.x+(_62b.charAt(1)=="L"?0:_628);
_62e=_62a.y+(_62b.charAt(0)=="T"?0:_629);
pos=dojo.html.placeOnScreen(node,_62d,_62e,_620,true,_62f,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(_625>pos.dist){
_625=pos.dist;
best=pos;
}
}
}
if(!_623){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<=node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _631=node.parentNode;
var _632=_631.scrollTop+dojo.html.getBorderBox(_631).height;
var _633=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_632<_633){
_631.scrollTop+=(_633-_632);
}else{
if(_631.scrollTop>node.offsetTop){
_631.scrollTop-=(_631.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.gfx.color");
dojo.gfx.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.gfx.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.gfx.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.gfx.color.Color.fromArray=function(arr){
return new dojo.gfx.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.extend(dojo.gfx.color.Color,{toRgb:function(_63a){
if(_63a){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.gfx.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_63b,_63c){
var rgb=null;
if(dojo.lang.isArray(_63b)){
rgb=_63b;
}else{
if(_63b instanceof dojo.gfx.color.Color){
rgb=_63b.toRgb();
}else{
rgb=new dojo.gfx.color.Color(_63b).toRgb();
}
}
return dojo.gfx.color.blend(this.toRgb(),rgb,_63c);
}});
dojo.gfx.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],lime:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.gfx.color.blend=function(a,b,_640){
if(typeof a=="string"){
return dojo.gfx.color.blendHex(a,b,_640);
}
if(!_640){
_640=0;
}
_640=Math.min(Math.max(-1,_640),1);
_640=((_640+1)/2);
var c=[];
for(var x=0;x<3;x++){
c[x]=parseInt(b[x]+((a[x]-b[x])*_640));
}
return c;
};
dojo.gfx.color.blendHex=function(a,b,_645){
return dojo.gfx.color.rgb2hex(dojo.gfx.color.blend(dojo.gfx.color.hex2rgb(a),dojo.gfx.color.hex2rgb(b),_645));
};
dojo.gfx.color.extractRGB=function(_646){
var hex="0123456789abcdef";
_646=_646.toLowerCase();
if(_646.indexOf("rgb")==0){
var _648=_646.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_648.splice(1,3);
return ret;
}else{
var _64a=dojo.gfx.color.hex2rgb(_646);
if(_64a){
return _64a;
}else{
return dojo.gfx.color.named[_646]||[255,255,255];
}
}
};
dojo.gfx.color.hex2rgb=function(hex){
var _64c="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_64c+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_64c.indexOf(rgb[i].charAt(0))*16+_64c.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.gfx.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.lfx.Animation");
dojo.lfx.Line=function(_655,end){
this.start=_655;
this.end=end;
if(dojo.lang.isArray(_655)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_655;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
if((dojo.render.html.khtml)&&(!dojo.render.html.safari)){
dojo.lfx.easeDefault=function(n){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
};
}else{
dojo.lfx.easeDefault=function(n){
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
};
}
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:10,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_665,_666){
if(!_666){
_666=_665;
_665=this;
}
_666=dojo.lang.hitch(_665,_666);
var _667=this[evt]||function(){
};
this[evt]=function(){
var ret=_667.apply(this,arguments);
_666.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_66b){
this.repeatCount=_66b;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_66c,_66d,_66e,_66f,_670,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_66c)||(!_66c&&_66d.getValue)){
rate=_670;
_670=_66f;
_66f=_66e;
_66e=_66d;
_66d=_66c;
_66c=null;
}else{
if(_66c.getValue||dojo.lang.isArray(_66c)){
rate=_66f;
_670=_66e;
_66f=_66d;
_66e=_66c;
_66d=null;
_66c=null;
}
}
if(dojo.lang.isArray(_66e)){
this.curve=new dojo.lfx.Line(_66e[0],_66e[1]);
}else{
this.curve=_66e;
}
if(_66d!=null&&_66d>0){
this.duration=_66d;
}
if(_670){
this.repeatCount=_670;
}
if(rate){
this.rate=rate;
}
if(_66c){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_66c[item]){
this.connect(item,_66c[item]);
}
},this);
}
if(_66f&&dojo.lang.isFunction(_66f)){
this.easing=_66f;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_673,_674){
if(_674){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_673>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_674);
}),_673);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _676=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_676]);
this.fire("onBegin",[_676]);
}
this.fire("handler",["play",_676]);
this.fire("onPlay",[_676]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _677=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_677]);
this.fire("onPause",[_677]);
return this;
},gotoPercent:function(pct,_679){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_679){
this.play();
}
return this;
},stop:function(_67a){
clearTimeout(this._timer);
var step=this._percent/100;
if(_67a){
step=1;
}
var _67c=this.curve.getValue(step);
this.fire("handler",["stop",_67c]);
this.fire("onStop",[_67c]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _67f=this.curve.getValue(step);
this.fire("handler",["animate",_67f]);
this.fire("onAnimate",[_67f]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(_680){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _681=arguments;
if(_681.length==1&&(dojo.lang.isArray(_681[0])||dojo.lang.isArrayLike(_681[0]))){
_681=_681[0];
}
dojo.lang.forEach(_681,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_683,_684){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_683>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_684);
}),_683);
return this;
}
if(_684||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_684);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_685){
this.fire("onStop");
this._animsCall("stop",_685);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_686){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _689=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_686](args);
},_689);
return this;
}});
dojo.lfx.Chain=function(_68b){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _68c=arguments;
if(_68c.length==1&&(dojo.lang.isArray(_68c[0])||dojo.lang.isArrayLike(_68c[0]))){
_68c=_68c[0];
}
var _68d=this;
dojo.lang.forEach(_68c,function(anim,i,_690){
this._anims.push(anim);
if(i<_690.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_691,_692){
if(!this._anims.length){
return this;
}
if(_692||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _693=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_691>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_692);
}),_691);
return this;
}
if(_693){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_693.play(null,_692);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _694=this._anims[this._currAnim];
if(_694){
if(!_694._active||_694._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _695=this._anims[this._currAnim];
if(_695){
_695.stop();
this.fire("onStop",[this._currAnim]);
}
return _695;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(_696){
var _697=arguments;
if(dojo.lang.isArray(arguments[0])){
_697=arguments[0];
}
if(_697.length==1){
return _697[0];
}
return new dojo.lfx.Combine(_697);
};
dojo.lfx.chain=function(_698){
var _699=arguments;
if(dojo.lang.isArray(arguments[0])){
_699=arguments[0];
}
if(_699.length==1){
return _699[0];
}
return new dojo.lfx.Chain(_699);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _69b;
do{
_69b=dojo.html.getStyle(node,"background-color");
if(_69b.toLowerCase()=="rgba(0, 0, 0, 0)"){
_69b="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_69b));
if(_69b=="transparent"){
_69b=[255,255,255,0];
}else{
_69b=dojo.gfx.color.extractRGB(_69b);
}
return _69b;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_69c){
if(!_69c){
return [];
}
if(dojo.lang.isArrayLike(_69c)){
if(!_69c.alreadyChecked){
var n=[];
dojo.lang.forEach(_69c,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _69c;
}
}else{
var n=[];
n.push(dojo.byId(_69c));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_69f,_6a0,_6a1,_6a2,_6a3){
_69f=dojo.lfx.html._byId(_69f);
var _6a4={"propertyMap":_6a0,"nodes":_69f,"duration":_6a1,"easing":_6a2||dojo.lfx.easeDefault};
var _6a5=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _6a9 in pm){
pm[_6a9].property=_6a9;
parr.push(pm[_6a9]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _6ab=function(_6ac){
var _6ad=[];
dojo.lang.forEach(_6ac,function(c){
_6ad.push(Math.round(c));
});
return _6ad;
};
var _6af=function(n,_6b1){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _6b1){
try{
if(s=="opacity"){
dojo.html.setOpacity(n,_6b1[s]);
}else{
n.style[s]=_6b1[s];
}
}
catch(e){
dojo.debug(e);
}
}
};
var _6b3=function(_6b4){
this._properties=_6b4;
this.diffs=new Array(_6b4.length);
dojo.lang.forEach(_6b4,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.gfx.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _6bb=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.gfx.color.Color){
_6bb=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_6bb+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_6bb+=")";
}else{
_6bb=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_6bb;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_6a5(_6a4);
anim.curve=new _6b3(_6a4.propertyMap);
},onAnimate:function(_6be){
dojo.lang.forEach(_6a4.nodes,function(node){
_6af(node,_6be);
});
}},_6a4.duration,null,_6a4.easing);
if(_6a3){
for(var x in _6a3){
if(dojo.lang.isFunction(_6a3[x])){
anim.connect(x,anim,_6a3[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_6c1){
var _6c2=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_6c1)){
dojo.lang.forEach(_6c1,_6c2);
}else{
_6c2(_6c1);
}
};
dojo.lfx.html.fade=function(_6c4,_6c5,_6c6,_6c7,_6c8){
_6c4=dojo.lfx.html._byId(_6c4);
var _6c9={property:"opacity"};
if(!dj_undef("start",_6c5)){
_6c9.start=_6c5.start;
}else{
_6c9.start=function(){
return dojo.html.getOpacity(_6c4[0]);
};
}
if(!dj_undef("end",_6c5)){
_6c9.end=_6c5.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_6c4,[_6c9],_6c6,_6c7);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_6c4);
});
if(_6c8){
anim.connect("onEnd",function(){
_6c8(_6c4,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_6cb,_6cc,_6cd,_6ce){
return dojo.lfx.html.fade(_6cb,{end:1},_6cc,_6cd,_6ce);
};
dojo.lfx.html.fadeOut=function(_6cf,_6d0,_6d1,_6d2){
return dojo.lfx.html.fade(_6cf,{end:0},_6d0,_6d1,_6d2);
};
dojo.lfx.html.fadeShow=function(_6d3,_6d4,_6d5,_6d6){
_6d3=dojo.lfx.html._byId(_6d3);
dojo.lang.forEach(_6d3,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_6d3,_6d4,_6d5,_6d6);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_6d3)){
dojo.lang.forEach(_6d3,dojo.html.show);
}else{
dojo.html.show(_6d3);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_6d9,_6da,_6db,_6dc){
var anim=dojo.lfx.html.fadeOut(_6d9,_6da,_6db,function(){
if(dojo.lang.isArrayLike(_6d9)){
dojo.lang.forEach(_6d9,dojo.html.hide);
}else{
dojo.html.hide(_6d9);
}
if(_6dc){
_6dc(_6d9,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_6de,_6df,_6e0,_6e1){
_6de=dojo.lfx.html._byId(_6de);
var _6e2=[];
dojo.lang.forEach(_6de,function(node){
var _6e4={};
var _6e5,_6e6,_6e7;
with(node.style){
_6e5=top;
_6e6=left;
_6e7=position;
top="-9999px";
left="-9999px";
position="absolute";
display="";
}
var _6e8=dojo.html.getBorderBox(node).height;
with(node.style){
top=_6e5;
left=_6e6;
position=_6e7;
display="none";
}
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:1,end:function(){
return _6e8;
}}},_6df,_6e0);
anim.connect("beforeBegin",function(){
_6e4.overflow=node.style.overflow;
_6e4.height=node.style.height;
with(node.style){
overflow="hidden";
height="1px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_6e4.overflow;
height=_6e4.height;
}
if(_6e1){
_6e1(node,anim);
}
});
_6e2.push(anim);
});
return dojo.lfx.combine(_6e2);
};
dojo.lfx.html.wipeOut=function(_6ea,_6eb,_6ec,_6ed){
_6ea=dojo.lfx.html._byId(_6ea);
var _6ee=[];
dojo.lang.forEach(_6ea,function(node){
var _6f0={};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:1}},_6eb,_6ec,{"beforeBegin":function(){
_6f0.overflow=node.style.overflow;
_6f0.height=node.style.height;
with(node.style){
overflow="hidden";
}
dojo.html.show(node);
},"onEnd":function(){
dojo.html.hide(node);
with(node.style){
overflow=_6f0.overflow;
height=_6f0.height;
}
if(_6ed){
_6ed(node,anim);
}
}});
_6ee.push(anim);
});
return dojo.lfx.combine(_6ee);
};
dojo.lfx.html.slideTo=function(_6f2,_6f3,_6f4,_6f5,_6f6){
_6f2=dojo.lfx.html._byId(_6f2);
var _6f7=[];
var _6f8=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_6f3)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_6f3={top:_6f3[0],left:_6f3[1]};
}
dojo.lang.forEach(_6f2,function(node){
var top=null;
var left=null;
var init=(function(){
var _6fd=node;
return function(){
var pos=_6f8(_6fd,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_6f8(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_6f8(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_6fd,true);
dojo.html.setStyleAttributes(_6fd,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_6f3.top||0)},"left":{start:left,end:(_6f3.left||0)}},_6f4,_6f5,{"beforeBegin":init});
if(_6f6){
anim.connect("onEnd",function(){
_6f6(_6f2,anim);
});
}
_6f7.push(anim);
});
return dojo.lfx.combine(_6f7);
};
dojo.lfx.html.slideBy=function(_701,_702,_703,_704,_705){
_701=dojo.lfx.html._byId(_701);
var _706=[];
var _707=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_702)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_702={top:_702[0],left:_702[1]};
}
dojo.lang.forEach(_701,function(node){
var top=null;
var left=null;
var init=(function(){
var _70c=node;
return function(){
var pos=_707(_70c,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_707(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_707(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_70c,true);
dojo.html.setStyleAttributes(_70c,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_702.top||0)},"left":{start:left,end:left+(_702.left||0)}},_703,_704).connect("beforeBegin",init);
if(_705){
anim.connect("onEnd",function(){
_705(_701,anim);
});
}
_706.push(anim);
});
return dojo.lfx.combine(_706);
};
dojo.lfx.html.explode=function(_710,_711,_712,_713,_714){
var h=dojo.html;
_710=dojo.byId(_710);
_711=dojo.byId(_711);
var _716=h.toCoordinateObject(_710,true);
var _717=document.createElement("div");
h.copyStyle(_717,_711);
if(_711.explodeClassName){
_717.className=_711.explodeClassName;
}
with(_717.style){
position="absolute";
display="none";
var _718=h.getStyle(_710,"background-color");
backgroundColor=_718?_718.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
}
dojo.body().appendChild(_717);
with(_711.style){
visibility="hidden";
display="block";
}
var _719=h.toCoordinateObject(_711,true);
with(_711.style){
display="none";
visibility="visible";
}
var _71a={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_71a[type]={start:_716[type],end:_719[type]};
});
var anim=new dojo.lfx.propertyAnimation(_717,_71a,_712,_713,{"beforeBegin":function(){
h.setDisplay(_717,"block");
},"onEnd":function(){
h.setDisplay(_711,"block");
_717.parentNode.removeChild(_717);
}});
if(_714){
anim.connect("onEnd",function(){
_714(_711,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_71d,end,_71f,_720,_721){
var h=dojo.html;
_71d=dojo.byId(_71d);
end=dojo.byId(end);
var _723=dojo.html.toCoordinateObject(_71d,true);
var _724=dojo.html.toCoordinateObject(end,true);
var _725=document.createElement("div");
dojo.html.copyStyle(_725,_71d);
if(_71d.explodeClassName){
_725.className=_71d.explodeClassName;
}
dojo.html.setOpacity(_725,0.3);
with(_725.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_71d,"background-color").toLowerCase();
}
dojo.body().appendChild(_725);
var _726={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_726[type]={start:_723[type],end:_724[type]};
});
var anim=new dojo.lfx.propertyAnimation(_725,_726,_71f,_720,{"beforeBegin":function(){
dojo.html.hide(_71d);
dojo.html.show(_725);
},"onEnd":function(){
_725.parentNode.removeChild(_725);
}});
if(_721){
anim.connect("onEnd",function(){
_721(_71d,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_729,_72a,_72b,_72c,_72d){
_729=dojo.lfx.html._byId(_729);
var _72e=[];
dojo.lang.forEach(_729,function(node){
var _730=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _732=dojo.html.getStyle(node,"background-image");
var _733=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_730.length>3){
_730.pop();
}
var rgb=new dojo.gfx.color.Color(_72a);
var _735=new dojo.gfx.color.Color(_730);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_735}},_72b,_72c,{"beforeBegin":function(){
if(_732){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_732){
node.style.backgroundImage=_732;
}
if(_733){
node.style.backgroundColor="transparent";
}
if(_72d){
_72d(node,anim);
}
}});
_72e.push(anim);
});
return dojo.lfx.combine(_72e);
};
dojo.lfx.html.unhighlight=function(_737,_738,_739,_73a,_73b){
_737=dojo.lfx.html._byId(_737);
var _73c=[];
dojo.lang.forEach(_737,function(node){
var _73e=new dojo.gfx.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.gfx.color.Color(_738);
var _740=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_73e,end:rgb}},_739,_73a,{"beforeBegin":function(){
if(_740){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_73e.toRgb().join(",")+")";
},"onEnd":function(){
if(_73b){
_73b(node,anim);
}
}});
_73c.push(anim);
});
return dojo.lfx.combine(_73c);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.kwCompoundRequire({browser:["dojo.lfx.html"],dashboard:["dojo.lfx.html"]});
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_743,_744,_745){
dojo.html.show(node);
if(dojo.lang.isFunction(_745)){
_745();
}
},hide:function(node,_747,_748,_749){
dojo.html.hide(node);
if(dojo.lang.isFunction(_749)){
_749();
}
}};
dojo.lfx.toggle.fade={show:function(node,_74b,_74c,_74d){
dojo.lfx.fadeShow(node,_74b,_74c,_74d).play();
},hide:function(node,_74f,_750,_751){
dojo.lfx.fadeHide(node,_74f,_750,_751).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_753,_754,_755){
dojo.lfx.wipeIn(node,_753,_754,_755).play();
},hide:function(node,_757,_758,_759){
dojo.lfx.wipeOut(node,_757,_758,_759).play();
}};
dojo.lfx.toggle.explode={show:function(node,_75b,_75c,_75d,_75e){
dojo.lfx.explode(_75e||{x:0,y:0,width:0,height:0},node,_75b,_75c,_75d).play();
},hide:function(node,_760,_761,_762,_763){
dojo.lfx.implode(node,_763||{x:0,y:0,width:0,height:0},_760,_761,_762).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_76a){
try{
if(this.bgIframe){
this.bgIframe.remove();
delete this.bgIframe;
}
if(!_76a&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
dojo.widget.HtmlWidget.superclass.destroyRendering.call(this);
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isShowing()){
this.hide();
}else{
this.show();
}
},show:function(){
if(this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
if(!this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _76e=w||wh.width;
var _76f=h||wh.height;
if(this.width==_76e&&this.height==_76f){
return false;
}
this.width=_76e;
this.height=_76f;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isShowing()){
this.onResized();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_772){
if(_772.checkSize){
_772.checkSize();
}
});
}});
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _773=dojo.global();
var _774=dojo.doc();
try{
if(_773["getSelection"]){
if(dojo.render.html.safari){
_773.getSelection().collapse();
}else{
_773.getSelection().removeAllRanges();
}
}else{
if(_774.selection){
if(_774.selection.empty){
_774.selection.empty();
}else{
if(_774.selection.clear){
_774.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_775){
_775=dojo.byId(_775)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_775.style.MozUserSelect="none";
}else{
if(h.safari){
_775.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_775.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_777){
_777=dojo.byId(_777)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_777.style.MozUserSelect="";
}else{
if(h.safari){
_777.style.KhtmlUserSelect="";
}else{
if(h.ie){
_777.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_779){
dojo.deprecated("dojo.html.selectElement","replaced by dojo.html.selection.selectElementChildren",0.5);
};
dojo.html.selectInputText=function(_77a){
var _77b=dojo.global();
var _77c=dojo.doc();
_77a=dojo.byId(_77a);
if(_77c["selection"]&&dojo.body()["createTextRange"]){
var _77d=_77a.createTextRange();
_77d.moveStart("character",0);
_77d.moveEnd("character",_77a.value.length);
_77d.select();
}else{
if(_77b["getSelection"]){
var _77e=_77b.getSelection();
_77a.setSelectionRange(0,_77a.value.length);
}
}
_77a.focus();
};
dojo.html.isSelectionCollapsed=function(){
dojo.deprecated("dojo.html.isSelectionCollapsed","replaced by dojo.html.selection.isCollapsed",0.5);
return dojo.html.selection.isCollapsed();
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc()["selection"]){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _77f=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _781=oSel.getRangeAt(0);
if(_781.startContainer==_781.endContainer&&(_781.endOffset-_781.startOffset)==1&&_781.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_77f=dojo.html.selectionType.CONTROL;
}
}
return _77f;
}
},isCollapsed:function(){
var _782=dojo.global();
var _783=dojo.doc();
if(_783["selection"]){
return _783.selection.createRange().text=="";
}else{
if(_782["getSelection"]){
var _784=_782.getSelection();
if(dojo.lang.isString(_784)){
return _784=="";
}else{
return _784.isCollapsed||_784.toString()=="";
}
}
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc()["selection"]){
var _785=dojo.doc().selection.createRange();
if(_785&&_785.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _786=dojo.global().getSelection();
return _786.anchorNode.childNodes[_786.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc()["selection"]){
return dojo.doc().selection.createRange().parentElement();
}else{
var _788=dojo.global().getSelection();
if(_788){
var node=_788.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},getSelectedText:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().text;
}else{
var _78a=dojo.global().getSelection();
if(_78a){
return _78a.toString();
}
}
},getSelectedHtml:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().htmlText;
}else{
var _78b=dojo.global().getSelection();
if(_78b&&_78b.rangeCount){
var frag=_78b.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML;
}
return null;
}
},hasAncestorElement:function(_78e){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_78f){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_794){
var _795=dojo.global();
var _796=dojo.doc();
_794=dojo.byId(_794);
if(_796.selection&&dojo.body().createTextRange){
try{
var _797=dojo.body().createControlRange();
_797.addElement(_794);
_797.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_794);
}
}else{
if(_795["getSelection"]){
var _798=_795.getSelection();
if(_798["removeAllRanges"]){
var _797=_796.createRange();
_797.selectNode(_794);
_798.removeAllRanges();
_798.addRange(_797);
}
}
}
},selectElementChildren:function(_799){
var _79a=dojo.global();
var _79b=dojo.doc();
_799=dojo.byId(_799);
if(_79b.selection&&dojo.body().createTextRange){
var _79c=dojo.body().createTextRange();
_79c.moveToElementText(_799);
_79c.select();
}else{
if(_79a["getSelection"]){
var _79d=_79a.getSelection();
if(_79d["setBaseAndExtent"]){
_79d.setBaseAndExtent(_799,0,_799,_799.innerText.length-1);
}else{
if(_79d["selectAllChildren"]){
_79d.selectAllChildren(_799);
}
}
}
}
},getBookmark:function(){
var _79e;
var _79f=dojo.doc();
if(_79f["selection"]){
var _7a0=_79f.selection.createRange();
_79e=_7a0.getBookmark();
}else{
var _7a1;
try{
_7a1=dojo.global().getSelection();
}
catch(e){
}
if(_7a1){
var _7a0=_7a1.getRangeAt(0);
_79e=_7a0.cloneRange();
}else{
dojo.debug("No idea how to store the current selection for this browser!");
}
}
return _79e;
},moveToBookmark:function(_7a2){
var _7a3=dojo.doc();
if(_7a3["selection"]){
var _7a4=_7a3.selection.createRange();
_7a4.moveToBookmark(_7a2);
_7a4.select();
}else{
var _7a5;
try{
_7a5=dojo.global().getSelection();
}
catch(e){
}
if(_7a5&&_7a5["removeAllRanges"]){
_7a5.removeAllRanges();
_7a5.addRange(_7a2);
}else{
dojo.debug("No idea how to restore selection for this browser!");
}
}
},collapse:function(_7a6){
if(dojo.global()["getSelection"]){
var _7a7=dojo.global().getSelection();
if(_7a7.removeAllRanges){
if(_7a6){
_7a7.collapseToStart();
}else{
_7a7.collapseToEnd();
}
}else{
dojo.global().getSelection().collapse(_7a6);
}
}else{
if(dojo.doc().selection){
var _7a8=dojo.doc().selection.createRange();
_7a8.collapse(_7a6);
_7a8.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _7a9=dojo.doc().selection;
if(_7a9.type.toUpperCase()!="NONE"){
_7a9.clear();
}
return _7a9;
}else{
var _7a9=dojo.global().getSelection();
for(var i=0;i<_7a9.rangeCount;i++){
_7a9.getRangeAt(i).deleteContents();
}
return _7a9;
}
}});
dojo.provide("dojo.widget.PageContainer");
dojo.widget.defineWidget("dojo.widget.PageContainer",dojo.widget.HtmlWidget,{isContainer:true,doLayout:true,templateString:"<div dojoAttachPoint='containerNode'></div>",selectedChild:"",fillInTemplate:function(args,frag){
var _7ad=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_7ad);
dojo.widget.PageContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
if(this.children.length){
dojo.lang.forEach(this.children,this._setupChild,this);
var _7b0;
if(this.selectedChild){
this.selectChild(this.selectedChild);
}else{
for(var i=0;i<this.children.length;i++){
if(this.children[i].selected){
this.selectChild(this.children[i]);
break;
}
}
if(!this.selectedChildWidget){
this.selectChild(this.children[0]);
}
}
}
},addChild:function(_7b2){
dojo.widget.PageContainer.superclass.addChild.apply(this,arguments);
this._setupChild(_7b2);
this.onResized();
if(!this.selectedChildWidget){
this.selectChild(_7b2);
}
},_setupChild:function(page){
page.hide();
page.domNode.style.position="relative";
dojo.event.topic.publish(this.widgetId+"-addChild",page);
},removeChild:function(page){
dojo.widget.PageContainer.superclass.removeChild.apply(this,arguments);
if(this._beingDestroyed){
return;
}
dojo.event.topic.publish(this.widgetId+"-removeChild",page);
this.onResized();
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this.children.length>0){
this.selectChild(this.children[0],true);
}
}
},selectChild:function(page,_7b6){
page=dojo.widget.byId(page);
this.correspondingPageButton=_7b6;
if(this.selectedChildWidget){
this._hideChild(this.selectedChildWidget);
}
this.selectedChildWidget=page;
this.selectedChild=page.widgetId;
this._showChild(page);
page.isFirstChild=(page==this.children[0]);
page.isLastChild=(page==this.children[this.children.length-1]);
dojo.event.topic.publish(this.widgetId+"-selectChild",page);
},forward:function(){
var _7b7=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[_7b7+1]);
},back:function(){
var _7b8=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[_7b8-1]);
},onResized:function(){
if(this.doLayout&&this.selectedChildWidget){
with(this.selectedChildWidget.domNode.style){
top=dojo.html.getPixelValue(this.containerNode,"padding-top",true);
left=dojo.html.getPixelValue(this.containerNode,"padding-left",true);
}
var _7b9=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_7b9.width,_7b9.height);
}
},_showChild:function(page){
if(this.doLayout){
var _7bb=dojo.html.getContentBox(this.containerNode);
page.resizeTo(_7bb.width,_7bb.height);
}
page.selected=true;
page.show();
},_hideChild:function(page){
page.selected=false;
page.hide();
},closeChild:function(page){
var _7be=page.onClose(this,page);
if(_7be){
this.removeChild(page);
page.destroy();
}
},destroy:function(){
this._beingDestroyed=true;
dojo.event.topic.destroy(this.widgetId+"-addChild");
dojo.event.topic.destroy(this.widgetId+"-removeChild");
dojo.event.topic.destroy(this.widgetId+"-selectChild");
dojo.widget.PageContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.PageController",dojo.widget.HtmlWidget,{templateString:"<span wairole='tablist' dojoAttachEvent='onKey'></span>",isContainer:true,containerId:"",buttonWidget:"PageButton","class":"dojoPageController",fillInTemplate:function(){
dojo.html.addClass(this.domNode,this["class"]);
dojo.widget.wai.setAttr(this.domNode,"waiRole","role","tablist");
},postCreate:function(){
this.pane2button={};
var _7bf=dojo.widget.byId(this.containerId);
if(_7bf){
dojo.lang.forEach(_7bf.children,this.onAddChild,this);
}
dojo.event.topic.subscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.subscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.subscribe(this.containerId+"-selectChild",this,"onSelectChild");
},destroy:function(){
dojo.event.topic.unsubscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.unsubscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.unsubscribe(this.containerId+"-selectChild",this,"onSelectChild");
dojo.widget.PageController.superclass.destroy.apply(this,arguments);
},onAddChild:function(page){
var _7c1=dojo.widget.createWidget(this.buttonWidget,{label:page.label,closeButton:page.closable});
this.addChild(_7c1);
this.domNode.appendChild(_7c1.domNode);
this.pane2button[page]=_7c1;
page.controlButton=_7c1;
var _7c2=this;
dojo.event.connect(_7c1,"onClick",function(){
_7c2.onButtonClick(page);
});
dojo.event.connect(_7c1,"onCloseButtonClick",function(){
_7c2.onCloseButtonClick(page);
});
},onRemoveChild:function(page){
if(this._currentChild==page){
this._currentChild=null;
}
var _7c4=this.pane2button[page];
if(_7c4){
_7c4.destroy();
}
this.pane2button[page]=null;
},onSelectChild:function(page){
if(this._currentChild){
var _7c6=this.pane2button[this._currentChild];
_7c6.clearSelected();
}
var _7c7=this.pane2button[page];
_7c7.setSelected();
this._currentChild=page;
},onButtonClick:function(page){
var _7c9=dojo.widget.byId(this.containerId);
_7c9.selectChild(page,false,this);
},onCloseButtonClick:function(page){
var _7cb=dojo.widget.byId(this.containerId);
_7cb.closeChild(page);
},onKey:function(evt){
if((evt.keyCode==evt.KEY_RIGHT_ARROW)||(evt.keyCode==evt.KEY_LEFT_ARROW)){
var _7cd=0;
var next=null;
var _7cd=dojo.lang.find(this.children,this.pane2button[this._currentChild]);
if(evt.keyCode==evt.KEY_RIGHT_ARROW){
next=this.children[(_7cd+1)%this.children.length];
}else{
next=this.children[(_7cd+(this.children.length-1))%this.children.length];
}
dojo.event.browser.stopEvent(evt);
next.onClick();
}
}});
dojo.widget.defineWidget("dojo.widget.PageButton",dojo.widget.HtmlWidget,{templateString:"<span class='item'>"+"<span dojoAttachEvent='onClick' dojoAttachPoint='titleNode' class='selectButton'>${this.label}</span>"+"<span dojoAttachEvent='onClick:onCloseButtonClick' class='closeButton'>[X]</span>"+"</span>",label:"foo",closeButton:false,onClick:function(){
this.focus();
},onCloseButtonMouseOver:function(){
dojo.html.addClass(this.closeButtonNode,"closeHover");
},onCloseButtonMouseOut:function(){
dojo.html.removeClass(this.closeButtonNode,"closeHover");
},onCloseButtonClick:function(evt){
},setSelected:function(){
dojo.html.addClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","0");
},clearSelected:function(){
dojo.html.removeClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","-1");
},focus:function(){
if(this.titleNode.focus){
this.titleNode.focus();
}
}});
dojo.lang.extend(dojo.widget.Widget,{label:"",selected:false,closable:false,onClose:function(){
return true;
}});
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_7d6,_7d7){
var out="";
for(var i=0;i<_7d6;i++){
out+=str;
if(_7d7&&i<_7d6-1){
out+=_7d7;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_7e5,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _7e5.replace(/\%\{(\w+)\}/g,function(_7e8,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _7eb=str.split(" ");
for(var i=0;i<_7eb.length;i++){
_7eb[i]=_7eb[i].charAt(0).toUpperCase()+_7eb[i].substring(1);
}
return _7eb.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _7f0=escape(str);
var _7f1,re=/%u([0-9A-F]{4})/i;
while((_7f1=_7f0.match(re))){
var num=Number("0x"+_7f1[1]);
var _7f4=escape("&#"+num+";");
ret+=_7f0.substring(0,_7f1.index)+_7f4;
_7f0=_7f0.substring(_7f1.index+_7f1[0].length);
}
ret+=_7f0.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_7f9){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_7f9){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}
return str.substring(0,len).replace(/\.+$/,"")+"...";
};
dojo.string.endsWith=function(str,end,_802){
if(_802){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_806,_807){
if(_807){
str=str.toLowerCase();
_806=_806.toLowerCase();
}
return str.indexOf(_806)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_80d){
if(_80d=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_80d=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n").replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_80f){
var _810=[];
for(var i=0,_812=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_80f){
_810.push(str.substring(_812,i));
_812=i+1;
}
}
_810.push(str.substr(_812));
return _810;
};
dojo.provide("dojo.widget.html.layout");
dojo.widget.html.layout=function(_813,_814,_815){
dojo.html.addClass(_813,"dojoLayoutContainer");
_814=dojo.lang.filter(_814,function(_816,idx){
_816.idx=idx;
return dojo.lang.inArray(["top","bottom","left","right","client","flood"],_816.layoutAlign);
});
if(_815&&_815!="none"){
var rank=function(_819){
switch(_819.layoutAlign){
case "flood":
return 1;
case "left":
case "right":
return (_815=="left-right")?2:3;
case "top":
case "bottom":
return (_815=="left-right")?3:2;
default:
return 4;
}
};
_814.sort(function(a,b){
return (rank(a)-rank(b))||(a.idx-b.idx);
});
}
var f={top:dojo.html.getPixelValue(_813,"padding-top",true),left:dojo.html.getPixelValue(_813,"padding-left",true)};
dojo.lang.mixin(f,dojo.html.getContentBox(_813));
dojo.lang.forEach(_814,function(_81d){
var elm=_81d.domNode;
var pos=_81d.layoutAlign;
with(elm.style){
left=f.left+"px";
top=f.top+"px";
bottom="auto";
right="auto";
}
dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
if((pos=="top")||(pos=="bottom")){
dojo.html.setMarginBox(elm,{width:f.width});
var h=dojo.html.getMarginBox(elm).height;
f.height-=h;
if(pos=="top"){
f.top+=h;
}else{
elm.style.top=f.top+f.height+"px";
}
if(_81d.onResized){
_81d.onResized();
}
}else{
if(pos=="left"||pos=="right"){
var w=dojo.html.getMarginBox(elm).width;
if(_81d.resizeTo){
_81d.resizeTo(w,f.height);
}else{
dojo.html.setMarginBox(elm,{width:w,height:f.height});
}
f.width-=w;
if(pos=="left"){
f.left+=w;
}else{
elm.style.left=f.left+f.width+"px";
}
}else{
if(pos=="flood"||pos=="client"){
if(_81d.resizeTo){
_81d.resizeTo(f.width,f.height);
}else{
dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
}
}
}
}
});
};
dojo.html.insertCssText(".dojoLayoutContainer{ position: relative; display: block; overflow: hidden; }\n"+"body .dojoAlignTop, body .dojoAlignBottom, body .dojoAlignLeft, body .dojoAlignRight { position: absolute; overflow: hidden; }\n"+"body .dojoAlignClient { position: absolute }\n"+".dojoAlignClient { overflow: auto; }\n");
dojo.provide("dojo.widget.TabContainer");
dojo.widget.defineWidget("dojo.widget.TabContainer",dojo.widget.PageContainer,{labelPosition:"top",closeButton:"none",templateString:null,templateString:"<div id=\"${this.widgetId}\" class=\"dojoTabContainer\">\n\t<div dojoAttachPoint=\"tablistNode\"></div>\n\t<div class=\"dojoTabPaneWrapper\" dojoAttachPoint=\"containerNode\" dojoAttachEvent=\"onKey\" waiRole=\"tabpanel\"></div>\n</div>\n",templateCssString:".dojoTabContainer {\n\tposition : relative;\n}\n\n.dojoTabPaneWrapper {\n\tborder : 1px solid #6290d2;\n\t_zoom: 1; /* force IE6 layout mode so top border doesnt disappear */\n\tdisplay: block;\n\tclear: both;\n\toverflow: hidden;\n}\n\n.dojoTabLabels-top {\n\tposition : relative;\n\ttop : 0px;\n\tleft : 0px;\n\toverflow : visible;\n\tmargin-bottom : -1px;\n\twidth : 100%;\n\tz-index: 2;\t/* so the bottom of the tab label will cover up the border of dojoTabPaneWrapper */\n}\n\n.dojoTabNoLayout.dojoTabLabels-top .dojoTab {\n\tmargin-bottom: -1px;\n\t_margin-bottom: 0px; /* IE filter so top border lines up correctly */\n}\n\n.dojoTab {\n\tposition : relative;\n\tfloat : left;\n\tpadding-left : 9px;\n\tborder-bottom : 1px solid #6290d2;\n\tbackground : url(images/tab_left.gif) no-repeat left top;\n\tcursor: pointer;\n\twhite-space: nowrap;\n\tz-index: 3;\n}\n\n.dojoTab div {\n\tdisplay : block;\n\tpadding : 4px 15px 4px 6px;\n\tbackground : url(images/tab_top_right.gif) no-repeat right top;\n\tcolor : #333;\n\tfont-size : 90%;\n}\n\n.dojoTab .close {\n\tdisplay : inline-block;\n\theight : 12px;\n\twidth : 12px;\n\tpadding : 0 12px 0 0;\n\tmargin : 0 -10px 0 10px;\n\tcursor : default;\n\tfont-size: small;\n}\n\n.dojoTab .closeImage {\n\tbackground : url(images/tab_close.gif) no-repeat right top;\n}\n\n.dojoTab .closeHover {\n\tbackground-image : url(images/tab_close_h.gif);\n}\n\n.dojoTab.current {\n\tpadding-bottom : 1px;\n\tborder-bottom : 0;\n\tbackground-position : 0 -150px;\n}\n\n.dojoTab.current div {\n\tpadding-bottom : 5px;\n\tmargin-bottom : -1px;\n\tbackground-position : 100% -150px;\n}\n\n/* bottom tabs */\n\n.dojoTabLabels-bottom {\n\tposition : relative;\n\tbottom : 0px;\n\tleft : 0px;\n\toverflow : visible;\n\tmargin-top : -1px;\n\twidth : 100%;\n\tz-index: 2;\n}\n\n.dojoTabNoLayout.dojoTabLabels-bottom {\n\tposition : relative;\n}\n\n.dojoTabLabels-bottom .dojoTab {\n\tborder-top :  1px solid #6290d2;\n\tborder-bottom : 0;\n\tbackground : url(images/tab_bot_left.gif) no-repeat left bottom;\n}\n\n.dojoTabLabels-bottom .dojoTab div {\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\n}\n\n.dojoTabLabels-bottom .dojoTab.current {\n\tborder-top : 0;\n\tbackground : url(images/tab_bot_left_curr.gif) no-repeat left bottom;\n}\n\n.dojoTabLabels-bottom .dojoTab.current div {\n\tpadding-top : 4px;\n\tbackground : url(images/tab_bot_right_curr.gif) no-repeat right bottom;\n}\n\n/* right-h tabs */\n\n.dojoTabLabels-right-h {\n\toverflow : visible;\n\tmargin-left : -1px;\n\tz-index: 2;\n}\n\n.dojoTabLabels-right-h .dojoTab {\n\tpadding-left : 0;\n\tborder-left :  1px solid #6290d2;\n\tborder-bottom : 0;\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\n\tfloat : none;\n}\n\n.dojoTabLabels-right-h .dojoTab div {\n\tpadding : 4px 15px 4px 15px;\n}\n\n.dojoTabLabels-right-h .dojoTab.current {\n\tborder-left :  0;\n\tborder-bottom :  1px solid #6290d2;\n}\n\n/* left-h tabs */\n\n.dojoTabLabels-left-h {\n\toverflow : visible;\n\tmargin-right : -1px;\n\tz-index: 2;\n}\n\n.dojoTabLabels-left-h .dojoTab {\n\tborder-right :  1px solid #6290d2;\n\tborder-bottom : 0;\n\tfloat : none;\n\tbackground : url(images/tab_top_left.gif) no-repeat left top;\n}\n\n.dojoTabLabels-left-h .dojoTab.current {\n\tborder-right : 0;\n\tborder-bottom :  1px solid #6290d2;\n\tpadding-bottom : 0;\n\tbackground : url(images/tab_top_left.gif) no-repeat 0 -150px;\n}\n\n.dojoTabLabels-left-h .dojoTab div {\n\tbackground : 0;\n\tborder-bottom :  1px solid #6290d2;\n}\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/TabContainer.css"),selectedTab:"",postMixInProperties:function(){
if(this.selectedTab){
dojo.deprecated("selectedTab deprecated, use selectedChild instead, will be removed in","0.5");
this.selectedChild=this.selectedTab;
}
if(this.closeButton!="none"){
dojo.deprecated("closeButton deprecated, use closable='true' on each child instead, will be removed in","0.5");
}
dojo.widget.TabContainer.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
this.tablist=dojo.widget.createWidget("TabController",{id:this.widgetId+"_tablist",labelPosition:this.labelPosition,doLayout:this.doLayout,containerId:this.widgetId},this.tablistNode);
dojo.widget.TabContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
dojo.widget.TabContainer.superclass.postCreate.apply(this,arguments);
this.onResized();
},_setupChild:function(tab){
if(this.closeButton=="tab"||this.closeButton=="pane"){
tab.closable=true;
}
dojo.html.addClass(tab.domNode,"dojoTabPane");
dojo.widget.TabContainer.superclass._setupChild.apply(this,arguments);
},onResized:function(){
if(!this.doLayout){
return;
}
var _825=this.labelPosition.replace(/-h/,"");
var _826=[{domNode:this.tablist.domNode,layoutAlign:_825},{domNode:this.containerNode,layoutAlign:"client"}];
dojo.widget.html.layout(this.domNode,_826);
if(this.selectedChildWidget){
var _827=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_827.width,_827.height);
}
},selectTab:function(tab,_829){
dojo.deprecated("use selectChild() rather than selectTab(), selectTab() will be removed in","0.5");
this.selectChild(tab,_829);
},onKey:function(e){
if(e.keyCode==e.KEY_UP_ARROW&&e.ctrlKey){
var _82b=this.correspondingTabButton||this.selectedTabWidget.tabButton;
_82b.focus();
dojo.event.browser.stopEvent(e);
}else{
if(e.keyCode==e.KEY_DELETE&&e.altKey){
if(this.selectedChildWidget.closable){
this.closeChild(this.selectedChildWidget);
dojo.event.browser.stopEvent(e);
}
}
}
},destroy:function(){
this.tablist.destroy();
dojo.widget.TabContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabController",dojo.widget.PageController,{templateString:"<div wairole='tablist' dojoAttachEvent='onKey'></div>",labelPosition:"top",doLayout:true,"class":"",buttonWidget:"TabButton",postMixInProperties:function(){
if(!this["class"]){
this["class"]="dojoTabLabels-"+this.labelPosition+(this.doLayout?"":" dojoTabNoLayout");
}
dojo.widget.TabController.superclass.postMixInProperties.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabButton",dojo.widget.PageButton,{templateString:"<div class='dojoTab' dojoAttachEvent='onClick'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<span dojoAttachPoint='closeButtonNode' class='close closeImage' style='${this.closeButtonStyle}'"+"\tdojoAttachEvent='onMouseOver:onCloseButtonMouseOver; onMouseOut:onCloseButtonMouseOut; onClick:onCloseButtonClick'></span>"+"</div>"+"</div>",postMixInProperties:function(){
this.closeButtonStyle=this.closeButton?"":"display: none";
dojo.widget.TabButton.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.titleNode);
dojo.widget.TabButton.superclass.fillInTemplate.apply(this,arguments);
},onCloseButtonClick:function(evt){
evt.stopPropagation();
dojo.widget.TabButton.superclass.onCloseButtonClick.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.a11y.TabButton",dojo.widget.TabButton,{imgPath:dojo.uri.moduleUri("dojo.widget","templates/images/tab_close.gif"),templateString:"<div class='dojoTab' dojoAttachEvent='onClick;onKey'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<img class='close' src='${this.imgPath}' alt='[x]' style='${this.closeButtonStyle}'"+"\tdojoAttachEvent='onClick:onCloseButtonClick'>"+"</div>"+"</div>"});
dojo.provide("dojo.string");
dojo.provide("dojo.io.common");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_82e,_82f,_830){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_82e){
this.mimetype=_82e;
}
if(_82f){
this.transport=_82f;
}
if(arguments.length>=4){
this.changeUrl=_830;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,_833,_834){
},error:function(type,_836,_837,_838){
},timeout:function(type,_83a,_83b,_83c){
},handle:function(type,data,_83f,_840){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_841){
if(_841["url"]){
_841.url=_841.url.toString();
}
if(_841["formNode"]){
_841.formNode=dojo.byId(_841.formNode);
}
if(!_841["method"]&&_841["formNode"]&&_841["formNode"].method){
_841.method=_841["formNode"].method;
}
if(!_841["handle"]&&_841["handler"]){
_841.handle=_841.handler;
}
if(!_841["load"]&&_841["loaded"]){
_841.load=_841.loaded;
}
if(!_841["changeUrl"]&&_841["changeURL"]){
_841.changeUrl=_841.changeURL;
}
_841.encoding=dojo.lang.firstValued(_841["encoding"],djConfig["bindEncoding"],"");
_841.sendTransport=dojo.lang.firstValued(_841["sendTransport"],djConfig["ioSendTransport"],false);
var _842=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_841[fn]&&_842(_841[fn])){
continue;
}
if(_841["handle"]&&_842(_841["handle"])){
_841[fn]=_841.handle;
}
}
dojo.lang.mixin(this,_841);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_849){
if(!(_849 instanceof dojo.io.Request)){
try{
_849=new dojo.io.Request(_849);
}
catch(e){
dojo.debug(e);
}
}
var _84a="";
if(_849["transport"]){
_84a=_849["transport"];
if(!this[_84a]){
dojo.io.sendBindError(_849,"No dojo.io.bind() transport with name '"+_849["transport"]+"'.");
return _849;
}
if(!this[_84a].canHandle(_849)){
dojo.io.sendBindError(_849,"dojo.io.bind() transport with name '"+_849["transport"]+"' cannot handle this type of request.");
return _849;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_849))){
_84a=tmp;
break;
}
}
if(_84a==""){
dojo.io.sendBindError(_849,"None of the loaded transports for dojo.io.bind()"+" can handle the request.");
return _849;
}
}
this[_84a].bind(_849);
_849.bindSuccess=true;
return _849;
};
dojo.io.sendBindError=function(_84d,_84e){
if((typeof _84d.error=="function"||typeof _84d.handle=="function")&&(typeof setTimeout=="function"||typeof setTimeout=="object")){
var _84f=new dojo.io.Error(_84e);
setTimeout(function(){
_84d[(typeof _84d.error=="function")?"error":"handle"]("error",_84f,null,_84d);
},50);
}else{
dojo.raise(_84e);
}
};
dojo.io.queueBind=function(_850){
if(!(_850 instanceof dojo.io.Request)){
try{
_850=new dojo.io.Request(_850);
}
catch(e){
dojo.debug(e);
}
}
var _851=_850.load;
_850.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_851.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _853=_850.error;
_850.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_853.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_850);
dojo.io._dispatchNextQueueBind();
return _850;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_856,last){
var enc=/utf/i.test(_856||"")?encodeURIComponent:dojo.string.encodeAscii;
var _859=[];
var _85a=new Object();
for(var name in map){
var _85c=function(elt){
var val=enc(name)+"="+enc(elt);
_859[(last==name)?"push":"unshift"](val);
};
if(!_85a[name]){
var _85f=map[name];
if(dojo.lang.isArray(_85f)){
dojo.lang.forEach(_85f,_85c);
}else{
_85c(_85f);
}
}
}
return _859.join("&");
};
dojo.io.setIFrameSrc=function(_860,src,_862){
try{
var r=dojo.render.html;
if(!_862){
if(r.safari){
_860.location=src;
}else{
frames[_860.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_860.contentWindow.document;
}else{
if(r.safari){
idoc=_860.document;
}else{
idoc=_860.contentWindow;
}
}
if(!idoc){
_860.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:(!dj_undef("window"))?window.location.href:"",initialHash:(!dj_undef("window"))?window.location.hash:"",moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState=this._createState(this.initialHref,args,this.initialHash);
},addToHistory:function(args){
this.forwardStack=[];
var hash=null;
var url=null;
if(!this.historyIframe){
if(djConfig["useXDomain"]&&!djConfig["dojoIframeHistoryUrl"]){
dojo.debug("dojo.undo.browser: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
if(this.historyStack.length==0&&this.initialState.urlHash==hash){
this.initialState=this._createState(url,args,hash);
return;
}else{
if(this.historyStack.length>0&&this.historyStack[this.historyStack.length-1].urlHash==hash){
this.historyStack[this.historyStack.length-1]=this._createState(url,args,hash);
return;
}
}
this.changingUrl=true;
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
url=this._loadIframeHistory();
var _869=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_86b){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_869.apply(this,[_86b]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
var _86c=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_86e){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_86c){
_86c.apply(this,[_86e]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}else{
url=this._loadIframeHistory();
}
this.historyStack.push(this._createState(url,args,hash));
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_871){
if(!dojo.render.html.opera){
var _872=this._getUrlQuery(_871.href);
if(_872==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_872==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_872==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _873=this.historyStack.pop();
if(!_873){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_873);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_createState:function(url,args,hash){
return {"url":url,"kwArgs":args,"urlHash":hash};
},_getUrlQuery:function(url){
var _87a=url.split("?");
if(_87a.length<2){
return null;
}else{
return _87a[1];
}
},_loadIframeHistory:function(){
var url=(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
return url;
}};
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _87d=false;
var _87e=node.getElementsByTagName("input");
dojo.lang.forEach(_87e,function(_87f){
if(_87d){
return;
}
if(_87f.getAttribute("type")=="file"){
_87d=true;
}
});
return _87d;
};
dojo.io.formHasFile=function(_880){
return dojo.io.checkChildrenForFile(_880);
};
dojo.io.updateNode=function(node,_882){
node=dojo.byId(node);
var args=_882;
if(dojo.lang.isString(_882)){
args={url:_882};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_889,_88a,_88b){
if((!_889)||(!_889.tagName)||(!_889.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_88b){
_88b=dojo.io.formFilter;
}
var enc=/utf/i.test(_88a||"")?encodeURIComponent:dojo.string.encodeAscii;
var _88d=[];
for(var i=0;i<_889.elements.length;i++){
var elm=_889.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_88b(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_88d.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_88d.push(name+"="+enc(elm.value));
}
}else{
_88d.push(name+"="+enc(elm.value));
}
}
}
var _893=_889.getElementsByTagName("input");
for(var i=0;i<_893.length;i++){
var _894=_893[i];
if(_894.type.toLowerCase()=="image"&&_894.form==_889&&_88b(_894)){
var name=enc(_894.name);
_88d.push(name+"="+enc(_894.value));
_88d.push(name+".x=0");
_88d.push(name+".y=0");
}
}
return _88d.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _89a=form.getElementsByTagName("input");
for(var i=0;i<_89a.length;i++){
var _89b=_89a[i];
if(_89b.type.toLowerCase()=="image"&&_89b.form==form){
this.connect(_89b,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _8a2=false;
if(node.disabled||!node.name){
_8a2=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_8a2=node==this.clickedButton;
}else{
_8a2=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _8a2;
},connect:function(_8a3,_8a4,_8a5){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_8a3,_8a4,this,_8a5);
}else{
var fcn=dojo.lang.hitch(this,_8a5);
_8a3[_8a4]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _8a8=this;
var _8a9={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_8ab,_8ac){
return url+"|"+_8ab+"|"+_8ac.toLowerCase();
}
function addToCache(url,_8ae,_8af,http){
_8a9[getCacheKey(url,_8ae,_8af)]=http;
}
function getFromCache(url,_8b2,_8b3){
return _8a9[getCacheKey(url,_8b2,_8b3)];
}
this.clearCache=function(){
_8a9={};
};
function doLoad(_8b4,http,url,_8b7,_8b8){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_8b4.method.toLowerCase()=="head"){
var _8ba=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _8ba;
};
var _8bb=_8ba.split(/[\r\n]+/g);
for(var i=0;i<_8bb.length;i++){
var pair=_8bb[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_8b4.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_8b4.mimetype=="text/json"||_8b4.mimetype=="application/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_8b4.mimetype=="application/xml")||(_8b4.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_8b8){
addToCache(url,_8b7,_8b4.method,http);
}
_8b4[(typeof _8b4.load=="function")?"load":"handle"]("load",ret,http,_8b4);
}else{
var _8be=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_8b4[(typeof _8b4.error=="function")?"error":"handle"]("error",_8be,http,_8b4);
}
}
function setHeaders(http,_8c0){
if(_8c0["headers"]){
for(var _8c1 in _8c0["headers"]){
if(_8c1.toLowerCase()=="content-type"&&!_8c0["contentType"]){
_8c0["contentType"]=_8c0["headers"][_8c1];
}else{
http.setRequestHeader(_8c1,_8c0["headers"][_8c1]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_8a8._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _8c5=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_8c5,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _8c6=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_8c7){
return _8c6&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json","application/json"],(_8c7["mimetype"].toLowerCase()||""))&&!(_8c7["formNode"]&&dojo.io.formHasFile(_8c7["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_8c8){
if(!_8c8["url"]){
if(!_8c8["formNode"]&&(_8c8["backButton"]||_8c8["back"]||_8c8["changeUrl"]||_8c8["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_8c8);
return true;
}
}
var url=_8c8.url;
var _8ca="";
if(_8c8["formNode"]){
var ta=_8c8.formNode.getAttribute("action");
if((ta)&&(!_8c8["url"])){
url=ta;
}
var tp=_8c8.formNode.getAttribute("method");
if((tp)&&(!_8c8["method"])){
_8c8.method=tp;
}
_8ca+=dojo.io.encodeForm(_8c8.formNode,_8c8.encoding,_8c8["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_8c8["file"]){
_8c8.method="post";
}
if(!_8c8["method"]){
_8c8.method="get";
}
if(_8c8.method.toLowerCase()=="get"){
_8c8.multipart=false;
}else{
if(_8c8["file"]){
_8c8.multipart=true;
}else{
if(!_8c8["multipart"]){
_8c8.multipart=false;
}
}
}
if(_8c8["backButton"]||_8c8["back"]||_8c8["changeUrl"]){
dojo.undo.browser.addToHistory(_8c8);
}
var _8cd=_8c8["content"]||{};
if(_8c8.sendTransport){
_8cd["dojo.transport"]="xmlhttp";
}
do{
if(_8c8.postContent){
_8ca=_8c8.postContent;
break;
}
if(_8cd){
_8ca+=dojo.io.argsFromMap(_8cd,_8c8.encoding);
}
if(_8c8.method.toLowerCase()=="get"||!_8c8.multipart){
break;
}
var t=[];
if(_8ca.length){
var q=_8ca.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_8c8.file){
if(dojo.lang.isArray(_8c8.file)){
for(var i=0;i<_8c8.file.length;++i){
var o=_8c8.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_8c8.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_8ca=t.join("\r\n");
}
}while(false);
var _8d3=_8c8["sync"]?false:true;
var _8d4=_8c8["preventCache"]||(this.preventCache==true&&_8c8["preventCache"]!=false);
var _8d5=_8c8["useCache"]==true||(this.useCache==true&&_8c8["useCache"]!=false);
if(!_8d4&&_8d5){
var _8d6=getFromCache(url,_8ca,_8c8.method);
if(_8d6){
doLoad(_8c8,_8d6,url,_8ca,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_8c8);
var _8d8=false;
if(_8d3){
var _8d9=this.inFlight.push({"req":_8c8,"http":http,"url":url,"query":_8ca,"useCache":_8d5,"startTime":_8c8.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_8a8._blockAsync=true;
}
if(_8c8.method.toLowerCase()=="post"){
if(!_8c8.user){
http.open("POST",url,_8d3);
}else{
http.open("POST",url,_8d3,_8c8.user,_8c8.password);
}
setHeaders(http,_8c8);
http.setRequestHeader("Content-Type",_8c8.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_8c8.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_8ca);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_8c8,{status:404},url,_8ca,_8d5);
}
}else{
var _8da=url;
if(_8ca!=""){
_8da+=(_8da.indexOf("?")>-1?"&":"?")+_8ca;
}
if(_8d4){
_8da+=(dojo.string.endsWithAny(_8da,"?","&")?"":(_8da.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_8c8.user){
http.open(_8c8.method.toUpperCase(),_8da,_8d3);
}else{
http.open(_8c8.method.toUpperCase(),_8da,_8d3,_8c8.user,_8c8.password);
}
setHeaders(http,_8c8);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_8c8,{status:404},url,_8ca,_8d5);
}
}
if(!_8d3){
doLoad(_8c8,http,url,_8ca,_8d5);
_8a8._blockAsync=false;
}
_8c8.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_8dc,days,path,_8df,_8e0){
var _8e1=-1;
if((typeof days=="number")&&(days>=0)){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_8e1=d.toGMTString();
}
_8dc=escape(_8dc);
document.cookie=name+"="+_8dc+";"+(_8e1!=-1?" expires="+_8e1+";":"")+(path?"path="+path:"")+(_8df?"; domain="+_8df:"")+(_8e0?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _8e5=document.cookie.substring(idx+name.length+1);
var end=_8e5.indexOf(";");
if(end==-1){
end=_8e5.length;
}
_8e5=_8e5.substring(0,end);
_8e5=unescape(_8e5);
return _8e5;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_8ec,_8ed,_8ee){
if(arguments.length==5){
_8ee=_8ec;
_8ec=null;
_8ed=null;
}
var _8ef=[],_8f0,_8f1="";
if(!_8ee){
_8f0=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!_8f0){
_8f0={};
}
for(var prop in obj){
if(obj[prop]==null){
delete _8f0[prop];
}else{
if((typeof obj[prop]=="string")||(typeof obj[prop]=="number")){
_8f0[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in _8f0){
_8ef.push(escape(prop)+"="+escape(_8f0[prop]));
}
_8f1=_8ef.join("&");
}
dojo.io.cookie.setCookie(name,_8f1,days,path,_8ec,_8ed);
};
dojo.io.cookie.getObjectCookie=function(name){
var _8f4=null,_8f5=dojo.io.cookie.getCookie(name);
if(_8f5){
_8f4={};
var _8f6=_8f5.split("&");
for(var i=0;i<_8f6.length;i++){
var pair=_8f6[i].split("=");
var _8f9=pair[1];
if(isNaN(_8f9)){
_8f9=unescape(pair[1]);
}
_8f4[unescape(pair[0])]=_8f9;
}
}
return _8f4;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _8fa=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_8fa=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.kwCompoundRequire({common:["dojo.io.common"],rhino:["dojo.io.RhinoIO"],browser:["dojo.io.BrowserIO","dojo.io.cookie"],dashboard:["dojo.io.BrowserIO","dojo.io.cookie"]});
dojo.provide("dojo.io.*");
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
this._styleNodes=[];
this._onLoadStack=[];
this._onUnloadStack=[];
this._callOnUnload=false;
this._ioBindObj;
this.scriptScope;
this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,scriptSeparation:true,loadingMessage:"Loading...",isLoaded:false,postCreate:function(args,frag,_8fd){
if(this.handler!==""){
this.setHandler(this.handler);
}
if(this.isShowing()||this.preload){
this.loadContents();
}
},show:function(){
if(this.refreshOnShow){
this.refresh();
}else{
this.loadContents();
}
dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
this.isLoaded=false;
this.loadContents();
},loadContents:function(){
if(this.isLoaded){
return;
}
if(dojo.lang.isFunction(this.handler)){
this._runHandler();
}else{
if(this.href!=""){
this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
}
}
},setUrl:function(url){
this.href=url;
this.isLoaded=false;
if(this.preload||this.isShowing()){
this.loadContents();
}
},abort:function(){
var bind=this._ioBindObj;
if(!bind||!bind.abort){
return;
}
bind.abort();
delete this._ioBindObj;
},_downloadExternalContent:function(url,_901){
this.abort();
this._handleDefaults(this.loadingMessage,"onDownloadStart");
var self=this;
this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",handler:function(type,data,xhr){
delete self._ioBindObj;
if(type=="load"){
self.onDownloadEnd.call(self,url,data);
}else{
var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
self._handleDefaults.call(self,e,"onDownloadError");
self.onLoad();
}
}},_901));
},_cacheSetting:function(_907,_908){
for(var x in this.bindArgs){
if(dojo.lang.isUndefined(_907[x])){
_907[x]=this.bindArgs[x];
}
}
if(dojo.lang.isUndefined(_907.useCache)){
_907.useCache=_908;
}
if(dojo.lang.isUndefined(_907.preventCache)){
_907.preventCache=!_908;
}
if(dojo.lang.isUndefined(_907.mimetype)){
_907.mimetype="text/html";
}
return _907;
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnLoad:function(e){
dojo.deprecated(this.widgetType+".onUnLoad, use .onUnload (lowercased load)",0.5);
},onUnload:function(e){
this._runStack("_onUnloadStack");
delete this.scriptScope;
if(this.onUnLoad!==dojo.widget.ContentPane.prototype.onUnLoad){
this.onUnLoad.apply(this,arguments);
}
},_runStack:function(_90d){
var st=this[_90d];
var err="";
var _910=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_910);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_90d]=[];
if(err.length){
var name=(_90d=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError","debug");
}
},addOnLoad:function(obj,func){
this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnload:function(obj,func){
this._pushOnStack(this._onUnloadStack,obj,func);
},addOnUnLoad:function(){
dojo.deprecated(this.widgetType+".addOnUnLoad, use addOnUnload instead. (lowercased Load)",0.5);
this.addOnUnload.apply(this,arguments);
},_pushOnStack:function(_917,obj,func){
if(typeof func=="undefined"){
_917.push(obj);
}else{
_917.push(function(){
obj[func]();
});
}
},destroy:function(){
this.onUnload();
dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
data=this.splitAndFixPaths(data,url);
this.setContent(data);
},_handleDefaults:function(e,_921,_922){
if(!_921){
_921="onContentError";
}
if(dojo.lang.isString(e)){
e={text:e};
}
if(!e.text){
e.text=e.toString();
}
e.toString=function(){
return this.text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_921](e);
if(e.returnValue){
switch(_922){
case true:
case "alert":
alert(e.toString());
break;
case "debug":
dojo.debug(e.toString());
break;
default:
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=false;
if(arguments.callee._loopStop){
dojo.debug(e.toString());
}else{
arguments.callee._loopStop=true;
this._setContent(e.toString());
}
}
}
arguments.callee._loopStop=false;
},splitAndFixPaths:function(s,url){
var _925=[],_926=[],tmp=[];
var _928=[],_929=[],attr=[],_92b=[];
var str="",path="",fix="",_92f="",tag="",_931="";
if(!url){
url="./";
}
if(s){
var _932=/<title[^>]*>([\s\S]*?)<\/title>/i;
while(_928=_932.exec(s)){
_925.push(_928[1]);
s=s.substring(0,_928.index)+s.substr(_928.index+_928[0].length);
}
if(this.adjustPaths){
var _933=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
var _934=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
var _935=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
while(tag=_933.exec(s)){
str+=s.substring(0,tag.index);
s=s.substring((tag.index+tag[0].length),s.length);
tag=tag[0];
_92f="";
while(attr=_934.exec(tag)){
path="";
_931=attr[3];
switch(attr[1].toLowerCase()){
case "src":
case "href":
if(_935.exec(_931)){
path=_931;
}else{
path=(new dojo.uri.Uri(url,_931).toString());
}
break;
case "style":
path=dojo.html.fixPathsInCssText(_931,url);
break;
default:
path=_931;
}
fix=" "+attr[1]+"="+attr[2]+path+attr[2];
_92f+=tag.substring(0,attr.index)+fix;
tag=tag.substring((attr.index+attr[0].length),tag.length);
}
str+=_92f+tag;
}
s=str+s;
}
_932=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
while(_928=_932.exec(s)){
if(_928[1]&&_928[1].toLowerCase()=="style"){
_92b.push(dojo.html.fixPathsInCssText(_928[2],url));
}else{
if(attr=_928[3].match(/href=(['"]?)([^'">]*)\1/i)){
_92b.push({path:attr[2]});
}
}
s=s.substring(0,_928.index)+s.substr(_928.index+_928[0].length);
}
var _932=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _936=/src=(['"]?)([^"']*)\1/i;
var _937=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
var _938=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
var _939=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix|registerModulePath)|defineNamespace)\((['"]).*?\1\)\s*;?/;
while(_928=_932.exec(s)){
if(this.executeScripts&&_928[1]){
if(attr=_936.exec(_928[1])){
if(_937.exec(attr[2])){
dojo.debug("Security note! inhibit:"+attr[2]+" from  being loaded again.");
}else{
_926.push({path:attr[2]});
}
}
}
if(_928[2]){
var sc=_928[2].replace(_938,"");
if(!sc){
continue;
}
while(tmp=_939.exec(sc)){
_929.push(tmp[0]);
sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
}
if(this.executeScripts){
_926.push(sc);
}
}
s=s.substr(0,_928.index)+s.substr(_928.index+_928[0].length);
}
if(this.extractContent){
_928=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_928){
s=_928[1];
}
}
if(this.executeScripts&&this.scriptSeparation){
var _932=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*?\S=)((['"])[^>]*scriptScope[^>]*>)/;
var _93b=/([\s'";:\(])scriptScope(.*)/;
str="";
while(tag=_932.exec(s)){
tmp=((tag[3]=="'")?"\"":"'");
fix="";
str+=s.substring(0,tag.index)+tag[1];
while(attr=_93b.exec(tag[2])){
tag[2]=tag[2].substring(0,attr.index)+attr[1]+"dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope"+attr[2];
}
str+=tag[2];
s=s.substr(tag.index+tag[0].length);
}
s=str+s;
}
}
return {"xml":s,"styles":_92b,"titles":_925,"requires":_929,"scripts":_926,"url":url};
},_setContent:function(cont){
this.destroyChildren();
for(var i=0;i<this._styleNodes.length;i++){
if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
}
}
this._styleNodes=[];
try{
var node=this.containerNode||this.domNode;
while(node.firstChild){
dojo.html.destroyNode(node.firstChild);
}
if(typeof cont!="string"){
node.appendChild(cont);
}else{
node.innerHTML=cont;
}
}
catch(e){
e.text="Couldn't load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},setContent:function(data){
this.abort();
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=true;
if(!data||dojo.html.isNode(data)){
this._setContent(data);
this.onResized();
this.onLoad();
}else{
if(typeof data.xml!="string"){
this.href="";
data=this.splitAndFixPaths(data);
}
this._setContent(data.xml);
for(var i=0;i<data.styles.length;i++){
if(data.styles[i].path){
this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path,dojo.doc(),false,true));
}else{
this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
}
}
if(this.parseContent){
for(var i=0;i<data.requires.length;i++){
try{
eval(data.requires[i]);
}
catch(e){
e.text="ContentPane: error in package loading calls, "+(e.description||e);
this._handleDefaults(e,"onContentError","debug");
}
}
}
var _941=this;
function asyncParse(){
if(_941.executeScripts){
_941._executeScripts(data.scripts);
}
if(_941.parseContent){
var node=_941.containerNode||_941.domNode;
var _943=new dojo.xml.Parse();
var frag=_943.parseElement(node,null,true);
dojo.widget.getParser().createSubComponents(frag,_941);
}
_941.onResized();
_941.onLoad();
}
if(dojo.hostenv.isXDomain&&data.requires.length){
dojo.addOnLoad(asyncParse);
}else{
asyncParse();
}
}
},setHandler:function(_945){
var fcn=dojo.lang.isFunction(_945)?_945:window[_945];
if(!dojo.lang.isFunction(fcn)){
this._handleDefaults("Unable to set handler, '"+_945+"' not a function.","onExecError",true);
return;
}
this.handler=function(){
return fcn.apply(this,arguments);
};
},_runHandler:function(){
var ret=true;
if(dojo.lang.isFunction(this.handler)){
this.handler(this,this.domNode);
ret=false;
}
this.onLoad();
return ret;
},_executeScripts:function(_948){
var self=this;
var tmp="",code="";
for(var i=0;i<_948.length;i++){
if(_948[i].path){
dojo.io.bind(this._cacheSetting({"url":_948[i].path,"load":function(type,_94e){
dojo.lang.hitch(self,tmp=";"+_94e);
},"error":function(type,_950){
_950.text=type+" downloading remote script";
self._handleDefaults.call(self,_950,"onExecError","debug");
},"mimetype":"text/plain","sync":true},this.cacheContent));
code+=tmp;
}else{
code+=_948[i];
}
}
try{
if(this.scriptSeparation){
delete this.scriptScope;
this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
}else{
var djg=dojo.global();
if(djg.execScript){
djg.execScript(code);
}else{
var djd=dojo.doc();
var sc=djd.createElement("script");
sc.appendChild(djd.createTextNode(code));
(this.containerNode||this.domNode).appendChild(sc);
}
}
}
catch(e){
e.text="Error running scripts from content:\n"+e.description;
this._handleDefaults(e,"onExecError","debug");
}
}});
dojo.provide("dojo.widget.SplitContainer");
dojo.widget.defineWidget("dojo.widget.SplitContainer",dojo.widget.HtmlWidget,function(){
this.sizers=[];
},{isContainer:true,templateCssString:".dojoSplitContainer{\n\tposition: relative;\n\toverflow: hidden;\n\tdisplay: block;\n}\n\n.dojoSplitPane{\n\tposition: absolute;\n}\n\n.dojoSplitContainerSizerH,\n.dojoSplitContainerSizerV {\n\tfont-size: 1px;\n\tcursor: move;\n\tcursor: w-resize;\n\tbackground-color: ThreeDFace;\n\tborder: 1px solid;\n\tborder-color: ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight;\n\tmargin: 0;\n}\n\n.dojoSplitContainerSizerV {\n\tcursor: n-resize;\n}\n\n.dojoSplitContainerVirtualSizerH,\n.dojoSplitContainerVirtualSizerV {\n\tfont-size: 1px;\n\tcursor: move;\n\tcursor: w-resize;\n\tbackground-color: ThreeDShadow;\n\t-moz-opacity: 0.5;\n\topacity: 0.5;\n\tfilter: Alpha(Opacity=50);\n\tmargin: 0;\n}\n\n.dojoSplitContainerVirtualSizerV {\n\tcursor: n-resize;\n}\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/SplitContainer.css"),activeSizing:false,sizerWidth:15,orientation:"horizontal",persist:true,postMixInProperties:function(){
dojo.widget.SplitContainer.superclass.postMixInProperties.apply(this,arguments);
this.isHorizontal=(this.orientation=="horizontal");
},fillInTemplate:function(){
dojo.widget.SplitContainer.superclass.fillInTemplate.apply(this,arguments);
dojo.html.addClass(this.domNode,"dojoSplitContainer");
if(dojo.render.html.moz){
this.domNode.style.overflow="-moz-scrollbars-none";
}
var _954=dojo.html.getContentBox(this.domNode);
this.paneWidth=_954.width;
this.paneHeight=_954.height;
},onResized:function(e){
var _956=dojo.html.getContentBox(this.domNode);
this.paneWidth=_956.width;
this.paneHeight=_956.height;
this._layoutPanels();
},postCreate:function(args,_958,_959){
dojo.widget.SplitContainer.superclass.postCreate.apply(this,arguments);
for(var i=0;i<this.children.length;i++){
with(this.children[i].domNode.style){
position="absolute";
}
dojo.html.addClass(this.children[i].domNode,"dojoSplitPane");
if(i==this.children.length-1){
break;
}
this._addSizer();
}
if(typeof this.sizerWidth=="object"){
try{
this.sizerWidth=parseInt(this.sizerWidth.toString());
}
catch(e){
this.sizerWidth=15;
}
}
this.virtualSizer=document.createElement("div");
this.virtualSizer.style.position="absolute";
this.virtualSizer.style.display="none";
this.virtualSizer.style.zIndex=10;
this.virtualSizer.className=this.isHorizontal?"dojoSplitContainerVirtualSizerH":"dojoSplitContainerVirtualSizerV";
this.domNode.appendChild(this.virtualSizer);
dojo.html.disableSelection(this.virtualSizer);
if(this.persist){
this._restoreState();
}
this.resizeSoon();
},_injectChild:function(_95b){
with(_95b.domNode.style){
position="absolute";
}
dojo.html.addClass(_95b.domNode,"dojoSplitPane");
},_addSizer:function(){
var i=this.sizers.length;
this.sizers[i]=document.createElement("div");
this.sizers[i].style.position="absolute";
this.sizers[i].className=this.isHorizontal?"dojoSplitContainerSizerH":"dojoSplitContainerSizerV";
var self=this;
var _95e=(function(){
var _95f=i;
return function(e){
self.beginSizing(e,_95f);
};
})();
dojo.event.connect(this.sizers[i],"onmousedown",_95e);
this.domNode.appendChild(this.sizers[i]);
dojo.html.disableSelection(this.sizers[i]);
},removeChild:function(_961){
if(this.sizers.length>0){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_961){
var i=this.sizers.length-1;
this.domNode.removeChild(this.sizers[i]);
this.sizers.length=i;
break;
}
}
}
dojo.widget.SplitContainer.superclass.removeChild.call(this,_961,arguments);
this.onResized();
},addChild:function(_964){
dojo.widget.SplitContainer.superclass.addChild.apply(this,arguments);
this._injectChild(_964);
if(this.children.length>1){
this._addSizer();
}
this._layoutPanels();
},_layoutPanels:function(){
if(this.children.length==0){
return;
}
var _965=this.isHorizontal?this.paneWidth:this.paneHeight;
if(this.children.length>1){
_965-=this.sizerWidth*(this.children.length-1);
}
var _966=0;
for(var i=0;i<this.children.length;i++){
_966+=this.children[i].sizeShare;
}
var _968=_965/_966;
var _969=0;
for(var i=0;i<this.children.length-1;i++){
var size=Math.round(_968*this.children[i].sizeShare);
this.children[i].sizeActual=size;
_969+=size;
}
this.children[this.children.length-1].sizeActual=_965-_969;
this._checkSizes();
var pos=0;
var size=this.children[0].sizeActual;
this._movePanel(this.children[0],pos,size);
this.children[0].position=pos;
pos+=size;
for(var i=1;i<this.children.length;i++){
this._moveSlider(this.sizers[i-1],pos,this.sizerWidth);
this.sizers[i-1].position=pos;
pos+=this.sizerWidth;
size=this.children[i].sizeActual;
this._movePanel(this.children[i],pos,size);
this.children[i].position=pos;
pos+=size;
}
},_movePanel:function(_96c,pos,size){
if(this.isHorizontal){
_96c.domNode.style.left=pos+"px";
_96c.domNode.style.top=0;
_96c.resizeTo(size,this.paneHeight);
}else{
_96c.domNode.style.left=0;
_96c.domNode.style.top=pos+"px";
_96c.resizeTo(this.paneWidth,size);
}
},_moveSlider:function(_96f,pos,size){
if(this.isHorizontal){
_96f.style.left=pos+"px";
_96f.style.top=0;
dojo.html.setMarginBox(_96f,{width:size,height:this.paneHeight});
}else{
_96f.style.left=0;
_96f.style.top=pos+"px";
dojo.html.setMarginBox(_96f,{width:this.paneWidth,height:size});
}
},_growPane:function(_972,pane){
if(_972>0){
if(pane.sizeActual>pane.sizeMin){
if((pane.sizeActual-pane.sizeMin)>_972){
pane.sizeActual=pane.sizeActual-_972;
_972=0;
}else{
_972-=pane.sizeActual-pane.sizeMin;
pane.sizeActual=pane.sizeMin;
}
}
}
return _972;
},_checkSizes:function(){
var _974=0;
var _975=0;
for(var i=0;i<this.children.length;i++){
_975+=this.children[i].sizeActual;
_974+=this.children[i].sizeMin;
}
if(_974<=_975){
var _977=0;
for(var i=0;i<this.children.length;i++){
if(this.children[i].sizeActual<this.children[i].sizeMin){
_977+=this.children[i].sizeMin-this.children[i].sizeActual;
this.children[i].sizeActual=this.children[i].sizeMin;
}
}
if(_977>0){
if(this.isDraggingLeft){
for(var i=this.children.length-1;i>=0;i--){
_977=this._growPane(_977,this.children[i]);
}
}else{
for(var i=0;i<this.children.length;i++){
_977=this._growPane(_977,this.children[i]);
}
}
}
}else{
for(var i=0;i<this.children.length;i++){
this.children[i].sizeActual=Math.round(_975*(this.children[i].sizeMin/_974));
}
}
},beginSizing:function(e,i){
this.paneBefore=this.children[i];
this.paneAfter=this.children[i+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[i];
this.originPos=dojo.html.getAbsolutePosition(this.children[0].domNode,true,dojo.html.boxSizing.MARGIN_BOX);
if(this.isHorizontal){
var _97a=(e.layerX?e.layerX:e.offsetX);
var _97b=e.pageX;
this.originPos=this.originPos.x;
}else{
var _97a=(e.layerY?e.layerY:e.offsetY);
var _97b=e.pageY;
this.originPos=this.originPos.y;
}
this.startPoint=this.lastPoint=_97b;
this.screenToClientOffset=_97b-_97a;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){
this._showSizingLine();
}
dojo.event.connect(document.documentElement,"onmousemove",this,"changeSizing");
dojo.event.connect(document.documentElement,"onmouseup",this,"endSizing");
dojo.event.browser.stopEvent(e);
},changeSizing:function(e){
this.lastPoint=this.isHorizontal?e.pageX:e.pageY;
if(this.activeSizing){
this.movePoint();
this._updateSize();
}else{
this.movePoint();
this._moveSizingLine();
}
dojo.event.browser.stopEvent(e);
},endSizing:function(e){
if(!this.activeSizing){
this._hideSizingLine();
}
this._updateSize();
this.isSizing=false;
dojo.event.disconnect(document.documentElement,"onmousemove",this,"changeSizing");
dojo.event.disconnect(document.documentElement,"onmouseup",this,"endSizing");
if(this.persist){
this._saveState(this);
}
},movePoint:function(){
var p=this.lastPoint-this.screenToClientOffset;
var a=p-this.dragOffset;
a=this.legaliseSplitPoint(a);
p=a+this.dragOffset;
this.lastPoint=p+this.screenToClientOffset;
},legaliseSplitPoint:function(a){
a+=this.sizingSplitter.position;
this.isDraggingLeft=(a>0)?true:false;
if(!this.activeSizing){
if(a<this.paneBefore.position+this.paneBefore.sizeMin){
a=this.paneBefore.position+this.paneBefore.sizeMin;
}
if(a>this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin))){
a=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
}
}
a-=this.sizingSplitter.position;
this._checkSizes();
return a;
},_updateSize:function(){
var pos=this.lastPoint-this.dragOffset-this.originPos;
var _982=this.paneBefore.position;
var _983=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=pos-_982;
this.paneAfter.position=pos+this.sizerWidth;
this.paneAfter.sizeActual=_983-this.paneAfter.position;
for(var i=0;i<this.children.length;i++){
this.children[i].sizeShare=this.children[i].sizeActual;
}
this._layoutPanels();
},_showSizingLine:function(){
this._moveSizingLine();
if(this.isHorizontal){
dojo.html.setMarginBox(this.virtualSizer,{width:this.sizerWidth,height:this.paneHeight});
}else{
dojo.html.setMarginBox(this.virtualSizer,{width:this.paneWidth,height:this.sizerWidth});
}
this.virtualSizer.style.display="block";
},_hideSizingLine:function(){
this.virtualSizer.style.display="none";
},_moveSizingLine:function(){
var pos=this.lastPoint-this.startPoint+this.sizingSplitter.position;
if(this.isHorizontal){
this.virtualSizer.style.left=pos+"px";
}else{
var pos=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
this.virtualSizer.style.top=pos+"px";
}
},_getCookieName:function(i){
return this.widgetId+"_"+i;
},_restoreState:function(){
for(var i=0;i<this.children.length;i++){
var _988=this._getCookieName(i);
var _989=dojo.io.cookie.getCookie(_988);
if(_989!=null){
var pos=parseInt(_989);
if(typeof pos=="number"){
this.children[i].sizeShare=pos;
}
}
}
},_saveState:function(){
for(var i=0;i<this.children.length;i++){
var _98c=this._getCookieName(i);
dojo.io.cookie.setCookie(_98c,this.children[i].sizeShare,null,null,null,null);
}
}});
dojo.lang.extend(dojo.widget.Widget,{sizeMin:10,sizeShare:10});
dojo.widget.defineWidget("dojo.widget.SplitContainerPanel",dojo.widget.ContentPane,{});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_98d){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_98d))||dojo.html.iframeContentDocument(_98d).__parent__||(_98d.name&&document.frames[_98d.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_98f){
var doc=_98f.contentDocument||((_98f.contentWindow)&&(_98f.contentWindow.document))||((_98f.name)&&(document.frames[_98f.name])&&(document.frames[_98f.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe src='javascript:false'"+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _993=dojo.html.getMarginBox(this.domNode);
if(_993.width==0||_993.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_993.width+"px";
this.iframe.style.height=_993.height+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _995=dojo.html.toCoordinateObject(node,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_995.width+"px";
height=_995.height+"px";
left=_995.left+"px";
top=_995.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(this.iframe){
this.iframe.style.display="block";
}
},hide:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},remove:function(){
if(this.iframe){
dojo.html.removeNode(this.iframe,true);
delete this.iframe;
this.iframe=null;
}
}});
dojo.provide("dojo.widget.Dialog");
dojo.declare("dojo.widget.ModalDialogBase",null,{isContainer:true,focusElement:"",bgColor:"black",bgOpacity:0.4,followScroll:true,closeOnBackgroundClick:false,trapTabs:function(e){
if(e.target==this.tabStartOuter){
if(this._fromTrap){
this.tabStart.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabStart){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabEndOuter){
if(this._fromTrap){
this.tabEnd.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}else{
if(e.target==this.tabEnd){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}
}
}
}
},clearTrap:function(e){
var _999=this;
setTimeout(function(){
_999._fromTrap=false;
},100);
},postCreate:function(){
with(this.domNode.style){
position="absolute";
zIndex=999;
display="none";
overflow="visible";
}
var b=dojo.body();
b.appendChild(this.domNode);
this.bg=document.createElement("div");
this.bg.className="dialogUnderlay";
with(this.bg.style){
position="absolute";
left=top="0px";
zIndex=998;
display="none";
}
b.appendChild(this.bg);
this.setBackgroundColor(this.bgColor);
this.bgIframe=new dojo.html.BackgroundIframe();
if(this.bgIframe.iframe){
with(this.bgIframe.iframe.style){
position="absolute";
left=top="0px";
zIndex=90;
display="none";
}
}
if(this.closeOnBackgroundClick){
dojo.event.kwConnect({srcObj:this.bg,srcFunc:"onclick",adviceObj:this,adviceFunc:"onBackgroundClick",once:true});
}
},uninitialize:function(){
this.bgIframe.remove();
dojo.html.removeNode(this.bg,true);
},setBackgroundColor:function(_99b){
if(arguments.length>=3){
_99b=new dojo.gfx.color.Color(arguments[0],arguments[1],arguments[2]);
}else{
_99b=new dojo.gfx.color.Color(_99b);
}
this.bg.style.backgroundColor=_99b.toString();
return this.bgColor=_99b;
},setBackgroundOpacity:function(op){
if(arguments.length==0){
op=this.bgOpacity;
}
dojo.html.setOpacity(this.bg,op);
try{
this.bgOpacity=dojo.html.getOpacity(this.bg);
}
catch(e){
this.bgOpacity=op;
}
return this.bgOpacity;
},_sizeBackground:function(){
if(this.bgOpacity>0){
var _99d=dojo.html.getViewport();
var h=_99d.height;
var w=_99d.width;
with(this.bg.style){
width=w+"px";
height=h+"px";
}
var _9a0=dojo.html.getScroll().offset;
this.bg.style.top=_9a0.y+"px";
this.bg.style.left=_9a0.x+"px";
var _99d=dojo.html.getViewport();
if(_99d.width!=w){
this.bg.style.width=_99d.width+"px";
}
if(_99d.height!=h){
this.bg.style.height=_99d.height+"px";
}
}
this.bgIframe.size(this.bg);
},_showBackground:function(){
if(this.bgOpacity>0){
this.bg.style.display="block";
}
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},placeModalDialog:function(){
var _9a1=dojo.html.getScroll().offset;
var _9a2=dojo.html.getViewport();
var mb;
if(this.isShowing()){
mb=dojo.html.getMarginBox(this.domNode);
}else{
dojo.html.setVisibility(this.domNode,false);
dojo.html.show(this.domNode);
mb=dojo.html.getMarginBox(this.domNode);
dojo.html.hide(this.domNode);
dojo.html.setVisibility(this.domNode,true);
}
var x=_9a1.x+(_9a2.width-mb.width)/2;
var y=_9a1.y+(_9a2.height-mb.height)/2;
with(this.domNode.style){
left=x+"px";
top=y+"px";
}
},_onKey:function(evt){
if(evt.key){
var node=evt.target;
while(node!=null){
if(node==this.domNode){
return;
}
node=node.parentNode;
}
if(evt.key!=evt.KEY_TAB){
dojo.event.browser.stopEvent(evt);
}else{
if(!dojo.render.html.opera){
try{
this.tabStart.focus();
}
catch(e){
}
}
}
}
},showModalDialog:function(){
if(this.followScroll&&!this._scrollConnected){
this._scrollConnected=true;
dojo.event.connect(window,"onscroll",this,"_onScroll");
}
dojo.event.connect(document.documentElement,"onkey",this,"_onKey");
this.placeModalDialog();
this.setBackgroundOpacity();
this._sizeBackground();
this._showBackground();
this._fromTrap=true;
setTimeout(dojo.lang.hitch(this,function(){
try{
this.tabStart.focus();
}
catch(e){
}
}),50);
},hideModalDialog:function(){
if(this.focusElement){
dojo.byId(this.focusElement).focus();
dojo.byId(this.focusElement).blur();
}
this.bg.style.display="none";
this.bg.style.width=this.bg.style.height="1px";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
dojo.event.disconnect(document.documentElement,"onkey",this,"_onKey");
if(this._scrollConnected){
this._scrollConnected=false;
dojo.event.disconnect(window,"onscroll",this,"_onScroll");
}
},_onScroll:function(){
var _9a8=dojo.html.getScroll().offset;
this.bg.style.top=_9a8.y+"px";
this.bg.style.left=_9a8.x+"px";
this.placeModalDialog();
},checkSize:function(){
if(this.isShowing()){
this._sizeBackground();
this.placeModalDialog();
this.onResized();
}
},onBackgroundClick:function(){
if(this.lifetime-this.timeRemaining>=this.blockDuration){
return;
}
this.hide();
}});
dojo.widget.defineWidget("dojo.widget.Dialog",[dojo.widget.ContentPane,dojo.widget.ModalDialogBase],{templateString:"<div id=\"${this.widgetId}\" class=\"dojoDialog\" dojoattachpoint=\"wrapper\">\n\t<span dojoattachpoint=\"tabStartOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\"\ttabindex=\"0\"></span>\n\t<span dojoattachpoint=\"tabStart\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\n\t<div dojoattachpoint=\"containerNode\" style=\"position: relative; z-index: 2;\"></div>\n\t<span dojoattachpoint=\"tabEnd\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\n\t<span dojoattachpoint=\"tabEndOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\n</div>\n",blockDuration:0,lifetime:0,closeNode:"",postMixInProperties:function(){
dojo.widget.Dialog.superclass.postMixInProperties.apply(this,arguments);
if(this.closeNode){
this.setCloseControl(this.closeNode);
}
},postCreate:function(){
dojo.widget.Dialog.superclass.postCreate.apply(this,arguments);
dojo.widget.ModalDialogBase.prototype.postCreate.apply(this,arguments);
},show:function(){
if(this.lifetime){
this.timeRemaining=this.lifetime;
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
if(this.blockDuration&&this.closeNode){
if(this.lifetime>this.blockDuration){
this.closeNode.style.visibility="hidden";
}else{
this.closeNode.style.display="none";
}
}
if(this.timer){
clearInterval(this.timer);
}
this.timer=setInterval(dojo.lang.hitch(this,"_onTick"),100);
}
this.showModalDialog();
dojo.widget.Dialog.superclass.show.call(this);
},onLoad:function(){
this.placeModalDialog();
dojo.widget.Dialog.superclass.onLoad.call(this);
},fillInTemplate:function(){
},hide:function(){
this.hideModalDialog();
dojo.widget.Dialog.superclass.hide.call(this);
if(this.timer){
clearInterval(this.timer);
}
},setTimerNode:function(node){
this.timerNode=node;
},setCloseControl:function(node){
this.closeNode=dojo.byId(node);
dojo.event.connect(this.closeNode,"onclick",this,"hide");
},setShowControl:function(node){
node=dojo.byId(node);
dojo.event.connect(node,"onclick",this,"show");
},_onTick:function(){
if(this.timer){
this.timeRemaining-=100;
if(this.lifetime-this.timeRemaining>=this.blockDuration){
if(this.closeNode){
this.closeNode.style.visibility="visible";
}
}
if(!this.timeRemaining){
clearInterval(this.timer);
this.hide();
}else{
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
}
}
}});
dojo.provide("dojo.widget.TreeSelector");
dojo.widget.defineWidget("dojo.widget.TreeSelector",dojo.widget.HtmlWidget,function(){
this.eventNames={};
this.listenedTrees=[];
},{widgetType:"TreeSelector",selectedNode:null,dieWithTree:false,eventNamesDefault:{select:"select",destroy:"destroy",deselect:"deselect",dblselect:"dblselect"},initialize:function(){
for(name in this.eventNamesDefault){
if(dojo.lang.isUndefined(this.eventNames[name])){
this.eventNames[name]=this.widgetId+"/"+this.eventNamesDefault[name];
}
}
},destroy:function(){
dojo.event.topic.publish(this.eventNames.destroy,{source:this});
return dojo.widget.HtmlWidget.prototype.destroy.apply(this,arguments);
},listenTree:function(tree){
dojo.event.topic.subscribe(tree.eventNames.titleClick,this,"select");
dojo.event.topic.subscribe(tree.eventNames.iconClick,this,"select");
dojo.event.topic.subscribe(tree.eventNames.collapse,this,"onCollapse");
dojo.event.topic.subscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.subscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.subscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
this.listenedTrees.push(tree);
},unlistenTree:function(tree){
dojo.event.topic.unsubscribe(tree.eventNames.titleClick,this,"select");
dojo.event.topic.unsubscribe(tree.eventNames.iconClick,this,"select");
dojo.event.topic.unsubscribe(tree.eventNames.collapse,this,"onCollapse");
dojo.event.topic.unsubscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.unsubscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.unsubscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
for(var i=0;i<this.listenedTrees.length;i++){
if(this.listenedTrees[i]===tree){
this.listenedTrees.splice(i,1);
break;
}
}
},onTreeDestroy:function(_9af){
this.unlistenTree(_9af.source);
if(this.dieWithTree){
this.destroy();
}
},onCollapse:function(_9b0){
if(!this.selectedNode){
return;
}
var node=_9b0.source;
var _9b2=this.selectedNode.parent;
while(_9b2!==node&&_9b2.isTreeNode){
_9b2=_9b2.parent;
}
if(_9b2.isTreeNode){
this.deselect();
}
},select:function(_9b3){
var node=_9b3.source;
var e=_9b3.event;
if(this.selectedNode===node){
if(e.ctrlKey||e.shiftKey||e.metaKey){
this.deselect();
return;
}
dojo.event.topic.publish(this.eventNames.dblselect,{node:node});
return;
}
if(this.selectedNode){
this.deselect();
}
this.doSelect(node);
dojo.event.topic.publish(this.eventNames.select,{node:node});
},onMoveFrom:function(_9b6){
if(_9b6.child!==this.selectedNode){
return;
}
if(!dojo.lang.inArray(this.listenedTrees,_9b6.newTree)){
this.deselect();
}
},onRemoveNode:function(_9b7){
if(_9b7.child!==this.selectedNode){
return;
}
this.deselect();
},doSelect:function(node){
node.markSelected();
this.selectedNode=node;
},deselect:function(){
var node=this.selectedNode;
this.selectedNode=null;
node.unMarkSelected();
dojo.event.topic.publish(this.eventNames.deselect,{node:node});
}});
dojo.kwCompoundRequire({common:["dojo.html.common","dojo.html.style"]});
dojo.provide("dojo.html.*");
dojo.provide("dojo.widget.TreeNode");
dojo.widget.defineWidget("dojo.widget.TreeNode",dojo.widget.HtmlWidget,function(){
this.actionsDisabled=[];
},{widgetType:"TreeNode",loadStates:{UNCHECKED:"UNCHECKED",LOADING:"LOADING",LOADED:"LOADED"},actions:{MOVE:"MOVE",REMOVE:"REMOVE",EDIT:"EDIT",ADDCHILD:"ADDCHILD"},isContainer:true,lockLevel:0,templateString:("<div class=\"dojoTreeNode\"> "+"<span treeNode=\"${this.widgetId}\" class=\"dojoTreeNodeLabel\" dojoAttachPoint=\"labelNode\"> "+"\t\t<span dojoAttachPoint=\"titleNode\" dojoAttachEvent=\"onClick: onTitleClick\" class=\"dojoTreeNodeLabelTitle\">${this.title}</span> "+"</span> "+"<span class=\"dojoTreeNodeAfterLabel\" dojoAttachPoint=\"afterLabelNode\">${this.afterLabel}</span> "+"<div dojoAttachPoint=\"containerNode\" style=\"display:none\"></div> "+"</div>").replace(/(>|<)\s+/g,"$1"),childIconSrc:"",childIconFolderSrc:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/closed.gif"),childIconDocumentSrc:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/document.gif"),childIcon:null,isTreeNode:true,objectId:"",afterLabel:"",afterLabelNode:null,expandIcon:null,title:"",object:"",isFolder:false,labelNode:null,titleNode:null,imgs:null,expandLevel:"",tree:null,depth:0,isExpanded:false,state:null,domNodeInitialized:false,isFirstChild:function(){
return this.getParentIndex()==0?true:false;
},isLastChild:function(){
return this.getParentIndex()==this.parent.children.length-1?true:false;
},lock:function(){
return this.tree.lock.apply(this,arguments);
},unlock:function(){
return this.tree.unlock.apply(this,arguments);
},isLocked:function(){
return this.tree.isLocked.apply(this,arguments);
},cleanLock:function(){
return this.tree.cleanLock.apply(this,arguments);
},actionIsDisabled:function(_9ba){
var _9bb=this;
var _9bc=false;
if(this.tree.strictFolders&&_9ba==this.actions.ADDCHILD&&!this.isFolder){
_9bc=true;
}
if(dojo.lang.inArray(_9bb.actionsDisabled,_9ba)){
_9bc=true;
}
if(this.isLocked()){
_9bc=true;
}
return _9bc;
},getInfo:function(){
var info={widgetId:this.widgetId,objectId:this.objectId,index:this.getParentIndex(),isFolder:this.isFolder};
return info;
},initialize:function(args,frag){
this.state=this.loadStates.UNCHECKED;
for(var i=0;i<this.actionsDisabled.length;i++){
this.actionsDisabled[i]=this.actionsDisabled[i].toUpperCase();
}
this.expandLevel=parseInt(this.expandLevel);
},adjustDepth:function(_9c1){
for(var i=0;i<this.children.length;i++){
this.children[i].adjustDepth(_9c1);
}
this.depth+=_9c1;
if(_9c1>0){
for(var i=0;i<_9c1;i++){
var img=this.tree.makeBlankImg();
this.imgs.unshift(img);
dojo.html.insertBefore(this.imgs[0],this.domNode.firstChild);
}
}
if(_9c1<0){
for(var i=0;i<-_9c1;i++){
this.imgs.shift();
dojo.html.removeNode(this.domNode.firstChild);
}
}
},markLoading:function(){
this._markLoadingSavedIcon=this.expandIcon.src;
this.expandIcon.src=this.tree.expandIconSrcLoading;
},unMarkLoading:function(){
if(!this._markLoadingSavedIcon){
return;
}
var im=new Image();
im.src=this.tree.expandIconSrcLoading;
if(this.expandIcon.src==im.src){
this.expandIcon.src=this._markLoadingSavedIcon;
}
this._markLoadingSavedIcon=null;
},setFolder:function(){
dojo.event.connect(this.expandIcon,"onclick",this,"onTreeClick");
this.expandIcon.src=this.isExpanded?this.tree.expandIconSrcMinus:this.tree.expandIconSrcPlus;
this.isFolder=true;
},createDOMNode:function(tree,_9c6){
this.tree=tree;
this.depth=_9c6;
this.imgs=[];
for(var i=0;i<this.depth+1;i++){
var img=this.tree.makeBlankImg();
this.domNode.insertBefore(img,this.labelNode);
this.imgs.push(img);
}
this.expandIcon=this.imgs[this.imgs.length-1];
this.childIcon=this.tree.makeBlankImg();
this.imgs.push(this.childIcon);
dojo.html.insertBefore(this.childIcon,this.titleNode);
if(this.children.length||this.isFolder){
this.setFolder();
}else{
this.state=this.loadStates.LOADED;
}
dojo.event.connect(this.childIcon,"onclick",this,"onIconClick");
for(var i=0;i<this.children.length;i++){
this.children[i].parent=this;
var node=this.children[i].createDOMNode(this.tree,this.depth+1);
this.containerNode.appendChild(node);
}
if(this.children.length){
this.state=this.loadStates.LOADED;
}
this.updateIcons();
this.domNodeInitialized=true;
dojo.event.topic.publish(this.tree.eventNames.createDOMNode,{source:this});
return this.domNode;
},onTreeClick:function(e){
dojo.event.topic.publish(this.tree.eventNames.treeClick,{source:this,event:e});
},onIconClick:function(e){
dojo.event.topic.publish(this.tree.eventNames.iconClick,{source:this,event:e});
},onTitleClick:function(e){
dojo.event.topic.publish(this.tree.eventNames.titleClick,{source:this,event:e});
},markSelected:function(){
dojo.html.addClass(this.titleNode,"dojoTreeNodeLabelSelected");
},unMarkSelected:function(){
dojo.html.removeClass(this.titleNode,"dojoTreeNodeLabelSelected");
},updateExpandIcon:function(){
if(this.isFolder){
this.expandIcon.src=this.isExpanded?this.tree.expandIconSrcMinus:this.tree.expandIconSrcPlus;
}else{
this.expandIcon.src=this.tree.blankIconSrc;
}
},updateExpandGrid:function(){
if(this.tree.showGrid){
if(this.depth){
this.setGridImage(-2,this.isLastChild()?this.tree.gridIconSrcL:this.tree.gridIconSrcT);
}else{
if(this.isFirstChild()){
this.setGridImage(-2,this.isLastChild()?this.tree.gridIconSrcX:this.tree.gridIconSrcY);
}else{
this.setGridImage(-2,this.isLastChild()?this.tree.gridIconSrcL:this.tree.gridIconSrcT);
}
}
}else{
this.setGridImage(-2,this.tree.blankIconSrc);
}
},updateChildGrid:function(){
if((this.depth||this.tree.showRootGrid)&&this.tree.showGrid){
this.setGridImage(-1,(this.children.length&&this.isExpanded)?this.tree.gridIconSrcP:this.tree.gridIconSrcC);
}else{
if(this.tree.showGrid&&!this.tree.showRootGrid){
this.setGridImage(-1,(this.children.length&&this.isExpanded)?this.tree.gridIconSrcZ:this.tree.blankIconSrc);
}else{
this.setGridImage(-1,this.tree.blankIconSrc);
}
}
},updateParentGrid:function(){
var _9cd=this.parent;
for(var i=0;i<this.depth;i++){
var idx=this.imgs.length-(3+i);
var img=(this.tree.showGrid&&!_9cd.isLastChild())?this.tree.gridIconSrcV:this.tree.blankIconSrc;
this.setGridImage(idx,img);
_9cd=_9cd.parent;
}
},updateExpandGridColumn:function(){
if(!this.tree.showGrid){
return;
}
var _9d1=this;
var icon=this.isLastChild()?this.tree.blankIconSrc:this.tree.gridIconSrcV;
dojo.lang.forEach(_9d1.getDescendants(),function(node){
node.setGridImage(_9d1.depth,icon);
});
this.updateExpandGrid();
},updateIcons:function(){
this.imgs[0].style.display=this.tree.showRootGrid?"inline":"none";
this.buildChildIcon();
this.updateExpandGrid();
this.updateChildGrid();
this.updateParentGrid();
dojo.profile.stop("updateIcons");
},buildChildIcon:function(){
if(this.childIconSrc){
this.childIcon.src=this.childIconSrc;
}
this.childIcon.style.display=this.childIconSrc?"inline":"none";
},setGridImage:function(idx,src){
if(idx<0){
idx=this.imgs.length+idx;
}
this.imgs[idx].style.backgroundImage="url("+src+")";
},updateIconTree:function(){
this.tree.updateIconTree.call(this);
},expand:function(){
if(this.isExpanded){
return;
}
if(this.children.length){
this.showChildren();
}
this.isExpanded=true;
this.updateExpandIcon();
dojo.event.topic.publish(this.tree.eventNames.expand,{source:this});
},collapse:function(){
if(!this.isExpanded){
return;
}
this.hideChildren();
this.isExpanded=false;
this.updateExpandIcon();
dojo.event.topic.publish(this.tree.eventNames.collapse,{source:this});
},hideChildren:function(){
this.tree.toggleObj.hide(this.containerNode,this.toggleDuration,this.explodeSrc,dojo.lang.hitch(this,"onHide"));
if(dojo.exists(dojo,"dnd.dragManager.dragObjects")&&dojo.dnd.dragManager.dragObjects.length){
dojo.dnd.dragManager.cacheTargetLocations();
}
},showChildren:function(){
this.tree.toggleObj.show(this.containerNode,this.toggleDuration,this.explodeSrc,dojo.lang.hitch(this,"onShow"));
if(dojo.exists(dojo,"dnd.dragManager.dragObjects")&&dojo.dnd.dragManager.dragObjects.length){
dojo.dnd.dragManager.cacheTargetLocations();
}
},addChild:function(){
return this.tree.addChild.apply(this,arguments);
},doAddChild:function(){
return this.tree.doAddChild.apply(this,arguments);
},edit:function(_9d6){
dojo.lang.mixin(this,_9d6);
if(_9d6.title){
this.titleNode.innerHTML=this.title;
}
if(_9d6.afterLabel){
this.afterLabelNode.innerHTML=this.afterLabel;
}
if(_9d6.childIconSrc){
this.buildChildIcon();
}
},removeNode:function(){
return this.tree.removeNode.apply(this,arguments);
},doRemoveNode:function(){
return this.tree.doRemoveNode.apply(this,arguments);
},toString:function(){
return "["+this.widgetType+" Tree:"+this.tree+" ID:"+this.widgetId+" Title:"+this.title+"]";
}});
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_9d7){
this.pairs=[];
this.returnWrappers=_9d7||false;
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_9d9,wrap,_9db,_9dc){
var type=(_9dc)?"unshift":"push";
this.pairs[type]([name,_9d9,wrap,_9db]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.json");
dojo.json={jsonRegistry:new dojo.AdapterRegistry(),register:function(name,_9e4,wrap,_9e6){
dojo.json.jsonRegistry.register(name,_9e4,wrap,_9e6);
},evalJson:function(json){
try{
return eval("("+json+")");
}
catch(e){
dojo.debug(e);
return json;
}
},serialize:function(o){
var _9e9=typeof (o);
if(_9e9=="undefined"){
return "undefined";
}else{
if((_9e9=="number")||(_9e9=="boolean")){
return o+"";
}else{
if(o===null){
return "null";
}
}
}
if(_9e9=="string"){
return dojo.string.escapeString(o);
}
var me=arguments.callee;
var _9eb;
if(typeof (o.__json__)=="function"){
_9eb=o.__json__();
if(o!==_9eb){
return me(_9eb);
}
}
if(typeof (o.json)=="function"){
_9eb=o.json();
if(o!==_9eb){
return me(_9eb);
}
}
if(_9e9!="function"&&typeof (o.length)=="number"){
var res=[];
for(var i=0;i<o.length;i++){
var val=me(o[i]);
if(typeof (val)!="string"){
val="undefined";
}
res.push(val);
}
return "["+res.join(",")+"]";
}
try{
window.o=o;
_9eb=dojo.json.jsonRegistry.match(o);
return me(_9eb);
}
catch(e){
}
if(_9e9=="function"){
return null;
}
res=[];
for(var k in o){
var _9f0;
if(typeof (k)=="number"){
_9f0="\""+k+"\"";
}else{
if(typeof (k)=="string"){
_9f0=dojo.string.escapeString(k);
}else{
continue;
}
}
val=me(o[k]);
if(typeof (val)!="string"){
continue;
}
res.push(_9f0+":"+val);
}
return "{"+res.join(",")+"}";
}};
dojo.provide("dojo.dnd.DragAndDrop");
dojo.declare("dojo.dnd.DragSource",null,{type:"",onDragEnd:function(evt){
},onDragStart:function(evt){
},onSelected:function(evt){
},unregister:function(){
dojo.dnd.dragManager.unregisterDragSource(this);
},reregister:function(){
dojo.dnd.dragManager.registerDragSource(this);
}});
dojo.declare("dojo.dnd.DragObject",null,{type:"",register:function(){
var dm=dojo.dnd.dragManager;
if(dm["registerDragObject"]){
dm.registerDragObject(this);
}
},onDragStart:function(evt){
},onDragMove:function(evt){
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragEnd:function(evt){
},onDragLeave:dojo.lang.forward("onDragOut"),onDragEnter:dojo.lang.forward("onDragOver"),ondragout:dojo.lang.forward("onDragOut"),ondragover:dojo.lang.forward("onDragOver")});
dojo.declare("dojo.dnd.DropTarget",null,{acceptsType:function(type){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
if(!dojo.lang.inArray(this.acceptedTypes,type)){
return false;
}
}
return true;
},accepts:function(_9fb){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
for(var i=0;i<_9fb.length;i++){
if(!dojo.lang.inArray(this.acceptedTypes,_9fb[i].type)){
return false;
}
}
}
return true;
},unregister:function(){
dojo.dnd.dragManager.unregisterDropTarget(this);
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragMove:function(evt){
},onDropStart:function(evt){
},onDrop:function(evt){
},onDropEnd:function(){
}},function(){
this.acceptedTypes=[];
});
dojo.dnd.DragEvent=function(){
this.dragSource=null;
this.dragObject=null;
this.target=null;
this.eventStatus="success";
};
dojo.declare("dojo.dnd.DragManager",null,{selectedSources:[],dragObjects:[],dragSources:[],registerDragSource:function(_a02){
},dropTargets:[],registerDropTarget:function(_a03){
},lastDragTarget:null,currentDragTarget:null,onKeyDown:function(){
},onMouseOut:function(){
},onMouseMove:function(){
},onMouseUp:function(){
}});
dojo.provide("dojo.dnd.HtmlDragManager");
dojo.declare("dojo.dnd.HtmlDragManager",dojo.dnd.DragManager,{disabled:false,nestedTargets:false,mouseDownTimer:null,dsCounter:0,dsPrefix:"dojoDragSource",dropTargetDimensions:[],currentDropTarget:null,previousDropTarget:null,_dragTriggered:false,selectedSources:[],dragObjects:[],dragSources:[],dropTargets:[],currentX:null,currentY:null,lastX:null,lastY:null,mouseDownX:null,mouseDownY:null,threshold:7,dropAcceptable:false,cancelEvent:function(e){
e.stopPropagation();
e.preventDefault();
},registerDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _a07=dp+"Idx_"+(this.dsCounter++);
ds.dragSourceId=_a07;
this.dragSources[_a07]=ds;
ds.domNode.setAttribute(dp,_a07);
if(dojo.render.html.ie){
dojo.event.browser.addListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},unregisterDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _a0a=ds.dragSourceId;
delete ds.dragSourceId;
delete this.dragSources[_a0a];
ds.domNode.setAttribute(dp,null);
if(dojo.render.html.ie){
dojo.event.browser.removeListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},registerDropTarget:function(dt){
this.dropTargets.push(dt);
},unregisterDropTarget:function(dt){
var _a0d=dojo.lang.find(this.dropTargets,dt,true);
if(_a0d>=0){
this.dropTargets.splice(_a0d,1);
}
},getDragSource:function(e){
var tn=e.target;
if(tn===dojo.body()){
return;
}
var ta=dojo.html.getAttribute(tn,this.dsPrefix);
while((!ta)&&(tn)){
tn=tn.parentNode;
if((!tn)||(tn===dojo.body())){
return;
}
ta=dojo.html.getAttribute(tn,this.dsPrefix);
}
return this.dragSources[ta];
},onKeyDown:function(e){
},onMouseDown:function(e){
if(this.disabled){
return;
}
if(dojo.render.html.ie){
if(e.button!=1){
return;
}
}else{
if(e.which!=1){
return;
}
}
var _a13=e.target.nodeType==dojo.html.TEXT_NODE?e.target.parentNode:e.target;
if(dojo.html.isTag(_a13,"button","textarea","input","select","option")){
return;
}
var ds=this.getDragSource(e);
if(!ds){
return;
}
if(!dojo.lang.inArray(this.selectedSources,ds)){
this.selectedSources.push(ds);
ds.onSelected();
}
this.mouseDownX=e.pageX;
this.mouseDownY=e.pageY;
e.preventDefault();
dojo.event.connect(document,"onmousemove",this,"onMouseMove");
},onMouseUp:function(e,_a16){
if(this.selectedSources.length==0){
return;
}
this.mouseDownX=null;
this.mouseDownY=null;
this._dragTriggered=false;
e.dragSource=this.dragSource;
if((!e.shiftKey)&&(!e.ctrlKey)){
if(this.currentDropTarget){
this.currentDropTarget.onDropStart();
}
dojo.lang.forEach(this.dragObjects,function(_a17){
var ret=null;
if(!_a17){
return;
}
if(this.currentDropTarget){
e.dragObject=_a17;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_a17.domNode){
e.dropTarget=e.dropTarget.nextSibling;
}
}else{
e.dropTarget=this.currentDropTarget.domNode;
}
if(this.dropAcceptable){
ret=this.currentDropTarget.onDrop(e);
}else{
this.currentDropTarget.onDragOut(e);
}
}
e.dragStatus=this.dropAcceptable&&ret?"dropSuccess":"dropFailure";
dojo.lang.delayThese([function(){
try{
_a17.dragSource.onDragEnd(e);
}
catch(err){
var _a1a={};
for(var i in e){
if(i=="type"){
_a1a.type="mouseup";
continue;
}
_a1a[i]=e[i];
}
_a17.dragSource.onDragEnd(_a1a);
}
},function(){
_a17.onDragEnd(e);
}]);
},this);
this.selectedSources=[];
this.dragObjects=[];
this.dragSource=null;
if(this.currentDropTarget){
this.currentDropTarget.onDropEnd();
}
}else{
}
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
this.currentDropTarget=null;
},onScroll:function(){
for(var i=0;i<this.dragObjects.length;i++){
if(this.dragObjects[i].updateDragOffset){
this.dragObjects[i].updateDragOffset();
}
}
if(this.dragObjects.length){
this.cacheTargetLocations();
}
},_dragStartDistance:function(x,y){
if((!this.mouseDownX)||(!this.mouseDownX)){
return;
}
var dx=Math.abs(x-this.mouseDownX);
var dx2=dx*dx;
var dy=Math.abs(y-this.mouseDownY);
var dy2=dy*dy;
return parseInt(Math.sqrt(dx2+dy2),10);
},cacheTargetLocations:function(){
dojo.profile.start("cacheTargetLocations");
this.dropTargetDimensions=[];
dojo.lang.forEach(this.dropTargets,function(_a23){
var tn=_a23.domNode;
if(!tn||!_a23.accepts([this.dragSource])){
return;
}
var abs=dojo.html.getAbsolutePosition(tn,true);
var bb=dojo.html.getBorderBox(tn);
this.dropTargetDimensions.push([[abs.x,abs.y],[abs.x+bb.width,abs.y+bb.height],_a23]);
},this);
dojo.profile.end("cacheTargetLocations");
},onMouseMove:function(e){
if((dojo.render.html.ie)&&(e.button!=1)){
this.currentDropTarget=null;
this.onMouseUp(e,true);
return;
}
if((this.selectedSources.length)&&(!this.dragObjects.length)){
var dx;
var dy;
if(!this._dragTriggered){
this._dragTriggered=(this._dragStartDistance(e.pageX,e.pageY)>this.threshold);
if(!this._dragTriggered){
return;
}
dx=e.pageX-this.mouseDownX;
dy=e.pageY-this.mouseDownY;
}
this.dragSource=this.selectedSources[0];
dojo.lang.forEach(this.selectedSources,function(_a2a){
if(!_a2a){
return;
}
var tdo=_a2a.onDragStart(e);
if(tdo){
tdo.onDragStart(e);
tdo.dragOffset.y+=dy;
tdo.dragOffset.x+=dx;
tdo.dragSource=_a2a;
this.dragObjects.push(tdo);
}
},this);
this.previousDropTarget=null;
this.cacheTargetLocations();
}
dojo.lang.forEach(this.dragObjects,function(_a2c){
if(_a2c){
_a2c.onDragMove(e);
}
});
if(this.currentDropTarget){
var c=dojo.html.toCoordinateObject(this.currentDropTarget.domNode,true);
var dtp=[[c.x,c.y],[c.x+c.width,c.y+c.height]];
}
if((!this.nestedTargets)&&(dtp)&&(this.isInsideBox(e,dtp))){
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}else{
var _a2f=this.findBestTarget(e);
if(_a2f.target===null){
if(this.currentDropTarget){
this.currentDropTarget.onDragOut(e);
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget=null;
}
this.dropAcceptable=false;
return;
}
if(this.currentDropTarget!==_a2f.target){
if(this.currentDropTarget){
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget.onDragOut(e);
}
this.currentDropTarget=_a2f.target;
e.dragObjects=this.dragObjects;
this.dropAcceptable=this.currentDropTarget.onDragOver(e);
}else{
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}
}
},findBestTarget:function(e){
var _a31=this;
var _a32=new Object();
_a32.target=null;
_a32.points=null;
dojo.lang.every(this.dropTargetDimensions,function(_a33){
if(!_a31.isInsideBox(e,_a33)){
return true;
}
_a32.target=_a33[2];
_a32.points=_a33;
return Boolean(_a31.nestedTargets);
});
return _a32;
},isInsideBox:function(e,_a35){
if((e.pageX>_a35[0][0])&&(e.pageX<_a35[1][0])&&(e.pageY>_a35[0][1])&&(e.pageY<_a35[1][1])){
return true;
}
return false;
},onMouseOver:function(e){
},onMouseOut:function(e){
}});
dojo.dnd.dragManager=new dojo.dnd.HtmlDragManager();
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.connect(d,"onkeydown",dm,"onKeyDown");
dojo.event.connect(d,"onmouseover",dm,"onMouseOver");
dojo.event.connect(d,"onmouseout",dm,"onMouseOut");
dojo.event.connect(d,"onmousedown",dm,"onMouseDown");
dojo.event.connect(d,"onmouseup",dm,"onMouseUp");
dojo.event.connect(window,"onscroll",dm,"onScroll");
})();
dojo.provide("dojo.dnd.HtmlDragAndDrop");
dojo.declare("dojo.dnd.HtmlDragSource",dojo.dnd.DragSource,{dragClass:"",onDragStart:function(){
var _a3a=new dojo.dnd.HtmlDragObject(this.dragObject,this.type);
if(this.dragClass){
_a3a.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_a3a.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _a3a;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},constrainTo:function(_a3d){
this.constrainToContainer=true;
if(_a3d){
this.constrainingContainer=_a3d;
}
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragSource(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(dojo.byId(arguments[i]));
}
}},function(node,type){
node=dojo.byId(node);
this.dragObjects=[];
this.constrainToContainer=false;
if(node){
this.domNode=node;
this.dragObject=node;
this.type=(type)||(this.domNode.nodeName.toLowerCase());
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("dojo.dnd.HtmlDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,disableX:false,disableY:false,createDragNode:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
var ltn=node.tagName.toLowerCase();
var isTr=(ltn=="tr");
if((isTr)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _a47=doc.createElement("table");
if(isTr){
var _a48=doc.createElement("tbody");
_a47.appendChild(_a48);
_a48.appendChild(node);
}else{
_a47.appendChild(node);
}
var _a49=((isTr)?this.domNode:this.domNode.firstChild);
var _a4a=((isTr)?node:node.firstChild);
var _a4b=_a49.childNodes;
var _a4c=_a4a.childNodes;
for(var i=0;i<_a4b.length;i++){
if((_a4c[i])&&(_a4c[i].style)){
_a4c[i].style.width=dojo.html.getContentBox(_a4b[i]).width+"px";
}
}
node=_a47;
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
top="0px";
left="0px";
}
var _a4e=document.createElement("div");
_a4e.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(_a4e);
_a4e.appendChild(this.bgIframe.iframe);
node=_a4e;
}
node.style.zIndex=999;
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _a50=dojo.html.getViewport();
var _a51=_a50.width;
var _a52=_a50.height;
var _a53=dojo.html.getScroll().offset;
var x=_a53.x;
var y=_a53.y;
}else{
var _a56=dojo.html.getContentBox(this.constrainingContainer);
_a51=_a56.width;
_a52=_a56.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+_a51-mb.width,maxY:y+_a52-mb.height};
},updateDragOffset:function(){
var _a58=dojo.html.getScroll().offset;
if(_a58.y!=this.scrollOffset.y){
var diff=_a58.y-this.scrollOffset.y;
this.dragOffset.y+=diff;
this.scrollOffset.y=_a58.y;
}
if(_a58.x!=this.scrollOffset.x){
var diff=_a58.x-this.scrollOffset.x;
this.dragOffset.x+=diff;
this.scrollOffset.x=_a58.x;
}
},onDragMove:function(e){
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
this.setAbsolutePosition(x,y);
dojo.event.topic.publish("dragMove",{source:this});
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
},onDragEnd:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _a60=dojo.html.getAbsolutePosition(this.dragClone,true);
var _a61={left:this.dragStartPosition.x+1,top:this.dragStartPosition.y+1};
var anim=dojo.lfx.slideTo(this.dragClone,_a61,300);
var _a63=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.html.removeNode(_a63.dragClone);
_a63.dragClone=null;
});
anim.play();
break;
}
dojo.event.topic.publish("dragEnd",{source:this});
},constrainTo:function(_a65){
this.constrainToContainer=true;
if(_a65){
this.constrainingContainer=_a65;
}else{
this.constrainingContainer=this.domNode.parentNode;
}
}},function(node,type){
this.domNode=dojo.byId(node);
this.type=type;
this.constrainToContainer=false;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("dojo.dnd.HtmlDropTarget",dojo.dnd.DropTarget,{vertical:false,onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.childBoxes=[];
for(var i=0,_a6a;i<this.domNode.childNodes.length;i++){
_a6a=this.domNode.childNodes[i];
if(_a6a.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(_a6a,true);
var _a6c=dojo.html.getBorderBox(_a6a);
this.childBoxes.push({top:pos.y,bottom:pos.y+_a6c.height,left:pos.x,right:pos.x+_a6c.width,height:_a6c.height,width:_a6c.width,node:_a6a});
}
return true;
},_getNodeUnderMouse:function(e){
for(var i=0,_a6f;i<this.childBoxes.length;i++){
with(this.childBoxes[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
if(this.vertical){
borderLeftWidth="1px";
borderLeftColor="black";
borderLeftStyle="solid";
height=dojo.html.getBorderBox(this.domNode).height+"px";
top=dojo.html.getAbsolutePosition(this.domNode,true).y+"px";
}else{
borderTopWidth="1px";
borderTopColor="black";
borderTopStyle="solid";
width=dojo.html.getBorderBox(this.domNode).width+"px";
left=dojo.html.getAbsolutePosition(this.domNode,true).x+"px";
}
}
},onDragMove:function(e,_a71){
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
var _a73=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
var hide=false;
if(i<0){
if(this.childBoxes.length){
var _a75=(dojo.html.gravity(this.childBoxes[0].node,e)&_a73);
if(_a75){
hide=true;
}
}else{
var _a75=true;
}
}else{
var _a76=this.childBoxes[i];
var _a75=(dojo.html.gravity(_a76.node,e)&_a73);
if(_a76.node===_a71[0].dragSource.domNode){
hide=true;
}else{
var _a77=_a75?(i>0?this.childBoxes[i-1]:_a76):(i<this.childBoxes.length-1?this.childBoxes[i+1]:_a76);
if(_a77.node===_a71[0].dragSource.domNode){
hide=true;
}
}
}
if(hide){
this.dropIndicator.style.display="none";
return;
}else{
this.dropIndicator.style.display="";
}
this.placeIndicator(e,_a71,i,_a75);
if(!dojo.html.hasParent(this.dropIndicator)){
dojo.body().appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_a79,_a7a,_a7b){
var _a7c=this.vertical?"left":"top";
var _a7d;
if(_a7a<0){
if(this.childBoxes.length){
_a7d=_a7b?this.childBoxes[0]:this.childBoxes[this.childBoxes.length-1];
}else{
this.dropIndicator.style[_a7c]=dojo.html.getAbsolutePosition(this.domNode,true)[this.vertical?"x":"y"]+"px";
}
}else{
_a7d=this.childBoxes[_a7a];
}
if(_a7d){
this.dropIndicator.style[_a7c]=(_a7b?_a7d[_a7c]:_a7d[this.vertical?"right":"bottom"])+"px";
if(this.vertical){
this.dropIndicator.style.height=_a7d.height+"px";
this.dropIndicator.style.top=_a7d.top+"px";
}else{
this.dropIndicator.style.width=_a7d.width+"px";
this.dropIndicator.style.left=_a7d.left+"px";
}
}
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
},onDrop:function(e){
this.onDragOut(e);
var i=this._getNodeUnderMouse(e);
var _a81=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&_a81){
return this.insert(e,this.childBoxes[0].node,"before");
}else{
return this.insert(e,this.childBoxes[this.childBoxes.length-1].node,"after");
}
}
return this.insert(e,this.domNode,"append");
}
var _a82=this.childBoxes[i];
if(dojo.html.gravity(_a82.node,e)&_a81){
return this.insert(e,_a82.node,"before");
}else{
return this.insert(e,_a82.node,"after");
}
},insert:function(e,_a84,_a85){
var node=e.dragObject.domNode;
if(_a85=="before"){
return dojo.html.insertBefore(node,_a84);
}else{
if(_a85=="after"){
return dojo.html.insertAfter(node,_a84);
}else{
if(_a85=="append"){
_a84.appendChild(node);
return true;
}
}
}
return false;
}},function(node,_a88){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(_a88&&dojo.lang.isString(_a88)){
_a88=[_a88];
}
this.acceptedTypes=_a88||[];
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.provide("dojo.dnd.TreeDragAndDrop");
dojo.dnd.TreeDragSource=function(node,_a8a,type,_a8c){
this.controller=_a8a;
this.treeNode=_a8c;
dojo.dnd.HtmlDragSource.call(this,node,type);
};
dojo.inherits(dojo.dnd.TreeDragSource,dojo.dnd.HtmlDragSource);
dojo.lang.extend(dojo.dnd.TreeDragSource,{onDragStart:function(){
var _a8d=dojo.dnd.HtmlDragSource.prototype.onDragStart.call(this);
_a8d.treeNode=this.treeNode;
_a8d.onDragStart=dojo.lang.hitch(_a8d,function(e){
this.savedSelectedNode=this.treeNode.tree.selector.selectedNode;
if(this.savedSelectedNode){
this.savedSelectedNode.unMarkSelected();
}
var _a8f=dojo.dnd.HtmlDragObject.prototype.onDragStart.apply(this,arguments);
var _a90=this.dragClone.getElementsByTagName("img");
for(var i=0;i<_a90.length;i++){
_a90.item(i).style.backgroundImage="url()";
}
return _a8f;
});
_a8d.onDragEnd=function(e){
if(this.savedSelectedNode){
this.savedSelectedNode.markSelected();
}
return dojo.dnd.HtmlDragObject.prototype.onDragEnd.apply(this,arguments);
};
return _a8d;
},onDragEnd:function(e){
var res=dojo.dnd.HtmlDragSource.prototype.onDragEnd.call(this,e);
return res;
}});
dojo.dnd.TreeDropTarget=function(_a95,_a96,type,_a98){
this.treeNode=_a98;
this.controller=_a96;
dojo.dnd.HtmlDropTarget.apply(this,[_a95,type]);
};
dojo.inherits(dojo.dnd.TreeDropTarget,dojo.dnd.HtmlDropTarget);
dojo.lang.extend(dojo.dnd.TreeDropTarget,{autoExpandDelay:1500,autoExpandTimer:null,position:null,indicatorStyle:"2px black solid",showIndicator:function(_a99){
if(this.position==_a99){
return;
}
this.hideIndicator();
this.position=_a99;
if(_a99=="before"){
this.treeNode.labelNode.style.borderTop=this.indicatorStyle;
}else{
if(_a99=="after"){
this.treeNode.labelNode.style.borderBottom=this.indicatorStyle;
}else{
if(_a99=="onto"){
this.treeNode.markSelected();
}
}
}
},hideIndicator:function(){
this.treeNode.labelNode.style.borderBottom="";
this.treeNode.labelNode.style.borderTop="";
this.treeNode.unMarkSelected();
this.position=null;
},onDragOver:function(e){
var _a9b=dojo.dnd.HtmlDropTarget.prototype.onDragOver.apply(this,arguments);
if(_a9b&&this.treeNode.isFolder&&!this.treeNode.isExpanded){
this.setAutoExpandTimer();
}
return _a9b;
},accepts:function(_a9c){
var _a9d=dojo.dnd.HtmlDropTarget.prototype.accepts.apply(this,arguments);
if(!_a9d){
return false;
}
var _a9e=_a9c[0].treeNode;
if(dojo.lang.isUndefined(_a9e)||!_a9e||!_a9e.isTreeNode){
dojo.raise("Source is not TreeNode or not found");
}
if(_a9e===this.treeNode){
return false;
}
return true;
},setAutoExpandTimer:function(){
var _a9f=this;
var _aa0=function(){
if(dojo.dnd.dragManager.currentDropTarget===_a9f){
_a9f.controller.expand(_a9f.treeNode);
}
};
this.autoExpandTimer=dojo.lang.setTimeout(_aa0,_a9f.autoExpandDelay);
},getDNDMode:function(){
return this.treeNode.tree.DNDMode;
},getAcceptPosition:function(e,_aa2){
var _aa3=this.getDNDMode();
if(_aa3&dojo.widget.Tree.prototype.DNDModes.ONTO&&!(!this.treeNode.actionIsDisabled(dojo.widget.TreeNode.prototype.actions.ADDCHILD)&&_aa2.parent!==this.treeNode&&this.controller.canMove(_aa2,this.treeNode))){
_aa3&=~dojo.widget.Tree.prototype.DNDModes.ONTO;
}
var _aa4=this.getPosition(e,_aa3);
if(_aa4=="onto"||(!this.isAdjacentNode(_aa2,_aa4)&&this.controller.canMove(_aa2,this.treeNode.parent))){
return _aa4;
}else{
return false;
}
},onDragOut:function(e){
this.clearAutoExpandTimer();
this.hideIndicator();
},clearAutoExpandTimer:function(){
if(this.autoExpandTimer){
clearTimeout(this.autoExpandTimer);
this.autoExpandTimer=null;
}
},onDragMove:function(e,_aa7){
var _aa8=_aa7[0].treeNode;
var _aa9=this.getAcceptPosition(e,_aa8);
if(_aa9){
this.showIndicator(_aa9);
}
},isAdjacentNode:function(_aaa,_aab){
if(_aaa===this.treeNode){
return true;
}
if(_aaa.getNextSibling()===this.treeNode&&_aab=="before"){
return true;
}
if(_aaa.getPreviousSibling()===this.treeNode&&_aab=="after"){
return true;
}
return false;
},getPosition:function(e,_aad){
var node=dojo.byId(this.treeNode.labelNode);
var _aaf=e.pageY||e.clientY+dojo.body().scrollTop;
var _ab0=dojo.html.getAbsolutePosition(node).y;
var _ab1=dojo.html.getBorderBox(node).height;
var relY=_aaf-_ab0;
var p=relY/_ab1;
var _ab4="";
if(_aad&dojo.widget.Tree.prototype.DNDModes.ONTO&&_aad&dojo.widget.Tree.prototype.DNDModes.BETWEEN){
if(p<=0.3){
_ab4="before";
}else{
if(p<=0.7){
_ab4="onto";
}else{
_ab4="after";
}
}
}else{
if(_aad&dojo.widget.Tree.prototype.DNDModes.BETWEEN){
if(p<=0.5){
_ab4="before";
}else{
_ab4="after";
}
}else{
if(_aad&dojo.widget.Tree.prototype.DNDModes.ONTO){
_ab4="onto";
}
}
}
return _ab4;
},getTargetParentIndex:function(_ab5,_ab6){
var _ab7=_ab6=="before"?this.treeNode.getParentIndex():this.treeNode.getParentIndex()+1;
if(this.treeNode.parent===_ab5.parent&&this.treeNode.getParentIndex()>_ab5.getParentIndex()){
_ab7--;
}
return _ab7;
},onDrop:function(e){
var _ab9=this.position;
this.onDragOut(e);
var _aba=e.dragObject.treeNode;
if(!dojo.lang.isObject(_aba)){
dojo.raise("TreeNode not found in dragObject");
}
if(_ab9=="onto"){
return this.controller.move(_aba,this.treeNode,0);
}else{
var _abb=this.getTargetParentIndex(_aba,_ab9);
return this.controller.move(_aba,this.treeNode.parent,_abb);
}
}});
dojo.dnd.TreeDNDController=function(_abc){
this.treeController=_abc;
this.dragSources={};
this.dropTargets={};
};
dojo.lang.extend(dojo.dnd.TreeDNDController,{listenTree:function(tree){
dojo.event.topic.subscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.subscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.subscribe(tree.eventNames.moveTo,this,"onMoveTo");
dojo.event.topic.subscribe(tree.eventNames.addChild,this,"onAddChild");
dojo.event.topic.subscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.subscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
},unlistenTree:function(tree){
dojo.event.topic.unsubscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.unsubscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.unsubscribe(tree.eventNames.moveTo,this,"onMoveTo");
dojo.event.topic.unsubscribe(tree.eventNames.addChild,this,"onAddChild");
dojo.event.topic.unsubscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.unsubscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
},onTreeDestroy:function(_abf){
this.unlistenTree(_abf.source);
},onCreateDOMNode:function(_ac0){
this.registerDNDNode(_ac0.source);
},onAddChild:function(_ac1){
this.registerDNDNode(_ac1.child);
},onMoveFrom:function(_ac2){
var _ac3=this;
dojo.lang.forEach(_ac2.child.getDescendants(),function(node){
_ac3.unregisterDNDNode(node);
});
},onMoveTo:function(_ac5){
var _ac6=this;
dojo.lang.forEach(_ac5.child.getDescendants(),function(node){
_ac6.registerDNDNode(node);
});
},registerDNDNode:function(node){
if(!node.tree.DNDMode){
return;
}
var _ac9=null;
var _aca=null;
if(!node.actionIsDisabled(node.actions.MOVE)){
var _ac9=new dojo.dnd.TreeDragSource(node.labelNode,this,node.tree.widgetId,node);
this.dragSources[node.widgetId]=_ac9;
}
var _aca=new dojo.dnd.TreeDropTarget(node.labelNode,this.treeController,node.tree.DNDAcceptTypes,node);
this.dropTargets[node.widgetId]=_aca;
},unregisterDNDNode:function(node){
if(this.dragSources[node.widgetId]){
dojo.dnd.dragManager.unregisterDragSource(this.dragSources[node.widgetId]);
delete this.dragSources[node.widgetId];
}
if(this.dropTargets[node.widgetId]){
dojo.dnd.dragManager.unregisterDropTarget(this.dropTargets[node.widgetId]);
delete this.dropTargets[node.widgetId];
}
}});
dojo.provide("dojo.widget.TreeBasicController");
dojo.widget.defineWidget("dojo.widget.TreeBasicController",dojo.widget.HtmlWidget,{widgetType:"TreeBasicController",DNDController:"",dieWithTree:false,initialize:function(args,frag){
if(this.DNDController=="create"){
this.DNDController=new dojo.dnd.TreeDNDController(this);
}
},listenTree:function(tree){
dojo.event.topic.subscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.subscribe(tree.eventNames.treeClick,this,"onTreeClick");
dojo.event.topic.subscribe(tree.eventNames.treeCreate,this,"onTreeCreate");
dojo.event.topic.subscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
if(this.DNDController){
this.DNDController.listenTree(tree);
}
},unlistenTree:function(tree){
dojo.event.topic.unsubscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.unsubscribe(tree.eventNames.treeClick,this,"onTreeClick");
dojo.event.topic.unsubscribe(tree.eventNames.treeCreate,this,"onTreeCreate");
dojo.event.topic.unsubscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
},onTreeDestroy:function(_ad0){
var tree=_ad0.source;
this.unlistenTree(tree);
if(this.dieWithTree){
this.destroy();
}
},onCreateDOMNode:function(_ad2){
var node=_ad2.source;
if(node.expandLevel>0){
this.expandToLevel(node,node.expandLevel);
}
},onTreeCreate:function(_ad4){
var tree=_ad4.source;
var _ad6=this;
if(tree.expandLevel){
dojo.lang.forEach(tree.children,function(_ad7){
_ad6.expandToLevel(_ad7,tree.expandLevel-1);
});
}
},expandToLevel:function(node,_ad9){
if(_ad9==0){
return;
}
var _ada=node.children;
var _adb=this;
var _adc=function(node,_ade){
this.node=node;
this.expandLevel=_ade;
this.process=function(){
for(var i=0;i<this.node.children.length;i++){
var _ae0=node.children[i];
_adb.expandToLevel(_ae0,this.expandLevel);
}
};
};
var h=new _adc(node,_ad9-1);
this.expand(node,false,h,h.process);
},onTreeClick:function(_ae2){
var node=_ae2.source;
if(node.isLocked()){
return false;
}
if(node.isExpanded){
this.collapse(node);
}else{
this.expand(node);
}
},expand:function(node,sync,_ae6,_ae7){
node.expand();
if(_ae7){
_ae7.apply(_ae6,[node]);
}
},collapse:function(node){
node.collapse();
},canMove:function(_ae9,_aea){
if(_ae9.actionIsDisabled(_ae9.actions.MOVE)){
return false;
}
if(_ae9.parent!==_aea&&_aea.actionIsDisabled(_aea.actions.ADDCHILD)){
return false;
}
var node=_aea;
while(node.isTreeNode){
if(node===_ae9){
return false;
}
node=node.parent;
}
return true;
},move:function(_aec,_aed,_aee){
if(!this.canMove(_aec,_aed)){
return false;
}
var _aef=this.doMove(_aec,_aed,_aee);
if(!_aef){
return _aef;
}
if(_aed.isTreeNode){
this.expand(_aed);
}
return _aef;
},doMove:function(_af0,_af1,_af2){
_af0.tree.move(_af0,_af1,_af2);
return true;
},canRemoveNode:function(_af3){
if(_af3.actionIsDisabled(_af3.actions.REMOVE)){
return false;
}
return true;
},removeNode:function(node,_af5,_af6){
if(!this.canRemoveNode(node)){
return false;
}
return this.doRemoveNode(node,_af5,_af6);
},doRemoveNode:function(node,_af8,_af9){
node.tree.removeNode(node);
if(_af9){
_af9.apply(dojo.lang.isUndefined(_af8)?this:_af8,[node]);
}
},canCreateChild:function(_afa,_afb,data){
if(_afa.actionIsDisabled(_afa.actions.ADDCHILD)){
return false;
}
return true;
},createChild:function(_afd,_afe,data,_b00,_b01){
if(!this.canCreateChild(_afd,_afe,data)){
return false;
}
return this.doCreateChild.apply(this,arguments);
},doCreateChild:function(_b02,_b03,data,_b05,_b06){
var _b07=data.widgetType?data.widgetType:"TreeNode";
var _b08=dojo.widget.createWidget(_b07,data);
_b02.addChild(_b08,_b03);
this.expand(_b02);
if(_b06){
_b06.apply(_b05,[_b08]);
}
return _b08;
}});
dojo.provide("dojo.widget.Tree");
dojo.widget.defineWidget("dojo.widget.Tree",dojo.widget.HtmlWidget,function(){
this.eventNames={};
this.tree=this;
this.DNDAcceptTypes=[];
this.actionsDisabled=[];
},{widgetType:"Tree",eventNamesDefault:{createDOMNode:"createDOMNode",treeCreate:"treeCreate",treeDestroy:"treeDestroy",treeClick:"treeClick",iconClick:"iconClick",titleClick:"titleClick",moveFrom:"moveFrom",moveTo:"moveTo",addChild:"addChild",removeNode:"removeNode",expand:"expand",collapse:"collapse"},isContainer:true,DNDMode:"off",lockLevel:0,strictFolders:true,DNDModes:{BETWEEN:1,ONTO:2},DNDAcceptTypes:"",templateCssString:"\n.dojoTree {\n\tfont: caption;\n\tfont-size: 11px;\n\tfont-weight: normal;\n\toverflow: auto;\n}\n\n\n.dojoTreeNodeLabelTitle {\n\tpadding-left: 2px;\n\tcolor: WindowText;\n}\n\n.dojoTreeNodeLabel {\n\tcursor:hand;\n\tcursor:pointer;\n}\n\n.dojoTreeNodeLabelTitle:hover {\n\ttext-decoration: underline;\n}\n\n.dojoTreeNodeLabelSelected {\n\tbackground-color: Highlight;\n\tcolor: HighlightText;\n}\n\n.dojoTree div {\n\twhite-space: nowrap;\n}\n\n.dojoTree img, .dojoTreeNodeLabel img {\n\tvertical-align: middle;\n}\n\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/Tree.css"),templateString:"<div class=\"dojoTree\"></div>",isExpanded:true,isTree:true,objectId:"",controller:"",selector:"",menu:"",expandLevel:"",blankIconSrc:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_blank.gif"),gridIconSrcT:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_t.gif"),gridIconSrcL:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_l.gif"),gridIconSrcV:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_v.gif"),gridIconSrcP:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_p.gif"),gridIconSrcC:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_c.gif"),gridIconSrcX:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_x.gif"),gridIconSrcY:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_y.gif"),gridIconSrcZ:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_z.gif"),expandIconSrcPlus:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_expand_plus.gif"),expandIconSrcMinus:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_expand_minus.gif"),expandIconSrcLoading:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_loading.gif"),iconWidth:18,iconHeight:18,showGrid:true,showRootGrid:true,actionIsDisabled:function(_b09){
var _b0a=this;
return dojo.lang.inArray(_b0a.actionsDisabled,_b09);
},actions:{ADDCHILD:"ADDCHILD"},getInfo:function(){
var info={widgetId:this.widgetId,objectId:this.objectId};
return info;
},initializeController:function(){
if(this.controller!="off"){
if(this.controller){
this.controller=dojo.widget.byId(this.controller);
}else{
this.controller=dojo.widget.createWidget("TreeBasicController",{DNDController:(this.DNDMode?"create":""),dieWithTree:true});
}
this.controller.listenTree(this);
}else{
this.controller=null;
}
},initializeSelector:function(){
if(this.selector!="off"){
if(this.selector){
this.selector=dojo.widget.byId(this.selector);
}else{
this.selector=dojo.widget.createWidget("TreeSelector",{dieWithTree:true});
}
this.selector.listenTree(this);
}else{
this.selector=null;
}
},initialize:function(args,frag){
var _b0e=this;
for(name in this.eventNamesDefault){
if(dojo.lang.isUndefined(this.eventNames[name])){
this.eventNames[name]=this.widgetId+"/"+this.eventNamesDefault[name];
}
}
for(var i=0;i<this.actionsDisabled.length;i++){
this.actionsDisabled[i]=this.actionsDisabled[i].toUpperCase();
}
if(this.DNDMode=="off"){
this.DNDMode=0;
}else{
if(this.DNDMode=="between"){
this.DNDMode=this.DNDModes.ONTO|this.DNDModes.BETWEEN;
}else{
if(this.DNDMode=="onto"){
this.DNDMode=this.DNDModes.ONTO;
}
}
}
this.expandLevel=parseInt(this.expandLevel);
this.initializeSelector();
this.initializeController();
if(this.menu){
this.menu=dojo.widget.byId(this.menu);
this.menu.listenTree(this);
}
this.containerNode=this.domNode;
},postCreate:function(){
this.createDOMNode();
},createDOMNode:function(){
dojo.html.disableSelection(this.domNode);
for(var i=0;i<this.children.length;i++){
this.children[i].parent=this;
var node=this.children[i].createDOMNode(this,0);
this.domNode.appendChild(node);
}
if(!this.showRootGrid){
for(var i=0;i<this.children.length;i++){
this.children[i].expand();
}
}
dojo.event.topic.publish(this.eventNames.treeCreate,{source:this});
},destroy:function(){
dojo.event.topic.publish(this.tree.eventNames.treeDestroy,{source:this});
return dojo.widget.HtmlWidget.prototype.destroy.apply(this,arguments);
},addChild:function(_b12,_b13){
var _b14={child:_b12,index:_b13,parent:this,domNodeInitialized:_b12.domNodeInitialized};
this.doAddChild.apply(this,arguments);
dojo.event.topic.publish(this.tree.eventNames.addChild,_b14);
},doAddChild:function(_b15,_b16){
if(dojo.lang.isUndefined(_b16)){
_b16=this.children.length;
}
if(!_b15.isTreeNode){
dojo.raise("You can only add TreeNode widgets to a "+this.widgetType+" widget!");
return;
}
if(this.isTreeNode){
if(!this.isFolder){
this.setFolder();
}
}
var _b17=this;
dojo.lang.forEach(_b15.getDescendants(),function(elem){
elem.tree=_b17.tree;
});
_b15.parent=this;
if(this.isTreeNode){
this.state=this.loadStates.LOADED;
}
if(_b16<this.children.length){
dojo.html.insertBefore(_b15.domNode,this.children[_b16].domNode);
}else{
this.containerNode.appendChild(_b15.domNode);
if(this.isExpanded&&this.isTreeNode){
this.showChildren();
}
}
this.children.splice(_b16,0,_b15);
if(_b15.domNodeInitialized){
var d=this.isTreeNode?this.depth:-1;
_b15.adjustDepth(d-_b15.depth+1);
_b15.updateIconTree();
}else{
_b15.depth=this.isTreeNode?this.depth+1:0;
_b15.createDOMNode(_b15.tree,_b15.depth);
}
var _b1a=_b15.getPreviousSibling();
if(_b15.isLastChild()&&_b1a){
_b1a.updateExpandGridColumn();
}
},makeBlankImg:function(){
var img=document.createElement("img");
img.style.width=this.iconWidth+"px";
img.style.height=this.iconHeight+"px";
img.src=this.blankIconSrc;
img.style.verticalAlign="middle";
return img;
},updateIconTree:function(){
if(!this.isTree){
this.updateIcons();
}
for(var i=0;i<this.children.length;i++){
this.children[i].updateIconTree();
}
},toString:function(){
return "["+this.widgetType+" ID:"+this.widgetId+"]";
},move:function(_b1d,_b1e,_b1f){
var _b20=_b1d.parent;
var _b21=_b1d.tree;
this.doMove.apply(this,arguments);
var _b1e=_b1d.parent;
var _b22=_b1d.tree;
var _b23={oldParent:_b20,oldTree:_b21,newParent:_b1e,newTree:_b22,child:_b1d};
dojo.event.topic.publish(_b21.eventNames.moveFrom,_b23);
dojo.event.topic.publish(_b22.eventNames.moveTo,_b23);
},doMove:function(_b24,_b25,_b26){
_b24.parent.doRemoveNode(_b24);
_b25.doAddChild(_b24,_b26);
},removeNode:function(_b27){
if(!_b27.parent){
return;
}
var _b28=_b27.tree;
var _b29=_b27.parent;
var _b2a=this.doRemoveNode.apply(this,arguments);
dojo.event.topic.publish(this.tree.eventNames.removeNode,{child:_b2a,tree:_b28,parent:_b29});
return _b2a;
},doRemoveNode:function(_b2b){
if(!_b2b.parent){
return;
}
var _b2c=_b2b.parent;
var _b2d=_b2c.children;
var _b2e=_b2b.getParentIndex();
if(_b2e<0){
dojo.raise("Couldn't find node "+_b2b+" for removal");
}
_b2d.splice(_b2e,1);
dojo.html.removeNode(_b2b.domNode);
if(_b2c.children.length==0&&!_b2c.isTree){
_b2c.containerNode.style.display="none";
}
if(_b2e==_b2d.length&&_b2e>0){
_b2d[_b2e-1].updateExpandGridColumn();
}
if(_b2c instanceof dojo.widget.Tree&&_b2e==0&&_b2d.length>0){
_b2d[0].updateExpandGrid();
}
_b2b.parent=_b2b.tree=null;
return _b2b;
},markLoading:function(){
},unMarkLoading:function(){
},lock:function(){
!this.lockLevel&&this.markLoading();
this.lockLevel++;
},unlock:function(){
if(!this.lockLevel){
dojo.raise("unlock: not locked");
}
this.lockLevel--;
!this.lockLevel&&this.unMarkLoading();
},isLocked:function(){
var node=this;
while(true){
if(node.lockLevel){
return true;
}
if(node instanceof dojo.widget.Tree){
break;
}
node=node.parent;
}
return false;
},flushLock:function(){
this.lockLevel=0;
this.unMarkLoading();
}});
dojo.provide("dojo.widget.LinkPane");
dojo.widget.defineWidget("dojo.widget.LinkPane",dojo.widget.ContentPane,{templateString:"<div class=\"dojoLinkPane\"></div>",fillInTemplate:function(args,frag){
var _b32=this.getFragNodeRef(frag);
this.label+=_b32.innerHTML;
var _b32=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_b32);
}});
dojo.provide("dojo.widget.LayoutContainer");
dojo.widget.defineWidget("dojo.widget.LayoutContainer",dojo.widget.HtmlWidget,{isContainer:true,layoutChildPriority:"top-bottom",postCreate:function(){
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},addChild:function(_b33,_b34,pos,ref,_b37){
dojo.widget.LayoutContainer.superclass.addChild.call(this,_b33,_b34,pos,ref,_b37);
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},removeChild:function(pane){
dojo.widget.LayoutContainer.superclass.removeChild.call(this,pane);
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},onResized:function(){
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},show:function(){
this.domNode.style.display="";
this.checkSize();
this.domNode.style.display="none";
this.domNode.style.visibility="";
dojo.widget.LayoutContainer.superclass.show.call(this);
}});
dojo.lang.extend(dojo.widget.Widget,{layoutAlign:"none"});
