(function(){Ext.ns("Curriki.module.search");var a=Curriki.module.search;a.settings={gridWidth:(Ext.isIE6?620:"auto")};
a.stateProvider=new Ext.state.CookieProvider({});Ext.state.Manager.setProvider(a.stateProvider);
a.sessionProvider=new Ext.state.CookieProvider({expires:null});Curriki.module.search.outerResources={prefix:"http://www.curriki.org/xwiki/bin/view/",suffix:"?comingFrom="+location.host,target:"currikiResources",ratingsPrefix:"http://www.curriki.org/xwiki/bin/view/",ratingsSuffix:"?viewer=comments"}
})();(function(){Ext.ns("Curriki.module.search.util");var a=Curriki.module.search;
var b=a.util;b.init=function(){console.log("search util: init");b.logFilterList={outerResource:["subject","level","language","ict","review","special","other","sort","dir"],resource:["subject","level","language","ict","review","special","other","sort","dir"],group:["subject","level","language","policy","other","sort","dir"],member:["subject","member_type","country","other","sort","dir"],blog:["other","sort","dir"],curriki:["other","sort","dir"]};
b.registerTabTitleListener=function(c){Ext.StoreMgr.lookup("search-store-"+c).addListener("datachanged",function(i){var h=false;
var k=0;var j=i.getTotalCount();if(!Ext.isEmpty(i.reader.jsonData)&&!Ext.isEmpty(i.reader.jsonData.totalResults)){k=parseInt(i.reader.jsonData.totalResults)
}if(k>j){h=true}var e=Ext.getCmp("search-"+c+"-tab");if(!Ext.isEmpty(e)){var g=_("search.tab.title.results");
if(h&&(_("search.tab.title.resultsmax_exceeds")!=="search.tab.title.resultsmax_exceeds")){g=_("search.tab.title.resultsmax_exceeds")
}e.setTitle(String.format(g,_("search."+c+".tab.title"),j,k))}var f=Ext.getCmp("search-pager-"+c);
if(!Ext.isEmpty(f)){var d=_("search.pagination.afterpage");if(h&&(_("search.pagination.afterpage_resultsmax_exceeds")!=="search.pagination.afterpage_resultsmax_exceeds")){d=_("search.pagination.afterpage_resultsmax_exceeds")
}f.afterPageText=String.format(d,"{0}",k);var l=_("search.pagination.displaying."+c);
if(h&&(_("search.pagination.displaying."+c+"_resultsmax_exceeds")!=="search.pagination.displaying."+c+"_resultsmax_exceeds")){l=_("search.pagination.displaying."+c+"_resultsmax_exceeds")
}f.displayMsg=String.format(l,"{0}","{1}","{2}",k)}});Ext.StoreMgr.lookup("search-store-"+c).addListener("beforeload",function(f,g){var e=Ext.StoreMgr.lookup("search-store-"+c);
var d=Ext.getCmp("search-pager-"+c);e.baseParams.rows=d.pageSize;return true});Ext.StoreMgr.lookup("search-store-"+c).addListener("load",function(k,g,m){var f=m.params||{};
var e=f.module;var h=escape(f.terms||"");var j=Ext.getCmp("search-advanced-"+e);var l=(j&&!j.collapsed)?"advanced":"simple";
var i="";if(f.start){if(f.start!=="0"){i="/start/"+f.start}}var d="";Ext.each(b.logFilterList[e],function(n){if(!Ext.isEmpty(f[n],false)){d+="/"+n+"/"+escape(f[n])
}});if(Curriki.module.search.util.isInEmbeddedMode()){Curriki.module.search.util.sendResizeMessageToEmbeddingWindow();
Curriki.logView("/features/embeddedsearch/"+e+"/"+h+"/"+l+d+i)}else{Curriki.logView("/features/search/"+e+"/"+h+"/"+l+d+i)
}});Ext.StoreMgr.lookup("search-store-"+c).addListener("exception",Curriki.notifyException)
};b.doSearch=function(h,i){console.log("Doing search",h,i);var f={};var e=Ext.getCmp("search-termPanel");
if(!Ext.isEmpty(e)){var g=e.getForm();if(!Ext.isEmpty(g)){Ext.apply(f,g.getValues(false))
}}var c=h;if(c=="outerResource"){c="resource"}if(c=="curriki"){c="discussions"}Ext.apply(f,{module:c});
e=Ext.getCmp("search-filterPanel-"+h);if(!Ext.isEmpty(e)){var g=e.getForm();if(!Ext.isEmpty(g)){Ext.apply(f,g.getValues(false))
}}if(f.terms&&f.terms===_("search.text.entry.label")){f.terms=""}console.log("Applying search filters",f);
Ext.apply(Ext.StoreMgr.lookup("search-store-"+h).baseParams||{},f);var d=Ext.getCmp("search-pager-"+h);
if(!Ext.isEmpty(d)){console.log("Searching",f);d.doLoad(Ext.num(i,0))}console.log("Done util.doSearch",f)
};b.createTermPanel=function(d,c){return{xtype:"panel",labelAlign:"left",id:"search-termPanel-"+d,cls:"term-panel",border:false,items:[{layout:"column",border:false,defaults:{border:false},items:[{layout:"form",id:"search-termPanel-"+d+"-form",cls:"search-termPanel-form",items:[{xtype:"textfield",id:"search-termPanel-"+d+"-terms",cls:"search-termPanel-terms",fieldLabel:_("search.text.entry.label"),name:"terms",hideLabel:true,emptyText:_("search.text.entry.label"),listeners:{specialkey:{fn:function(g,f){if(f.getKey()===Ext.EventObject.ENTER){f.stopEvent();
if("resource"==d&&Ext.StoreMgr.lookup("search-store-resource").sortInfo){Ext.StoreMgr.lookup("search-store-resource").sortInfo.field="score";
Ext.StoreMgr.lookup("search-store-resource").sortInfo.direction="DESC"}a.doSearch(d,true)
}}}}}]},{layout:"form",id:"search-termPanel-buttonColumn-"+d,cls:"search-termPanel-buttonColumn",items:[{xtype:"button",id:"search-termPanel-button-"+d,cls:"search-termPanel-button",text:_("search.text.entry.button"),listeners:{click:{fn:function(){if("resource"==d&&Ext.StoreMgr.lookup("search-store-resource").sortInfo){Ext.StoreMgr.lookup("search-store-resource").sortInfo.field="score";
Ext.StoreMgr.lookup("search-store-resource").sortInfo.direction="DESC"}a.doSearch(d,true)
}}}}]},{xtype:"box",id:"search-termPanel-tips-"+d,cls:"search-termPanel-tips",autoEl:{html:'<a href="/xwiki/bin/view/Search/Tips?xpage=popup" target="search_tips" onclick="{var popup=window.open(this.href, \'search_tips\', \'width=725,height=400,status=no,toolbar=no,menubar=no,location=no,resizable=yes\'); popup.focus();} return false;">'+_("search.text.entry.help.button")+"</a>"}}]},{xtype:"hidden",name:"other",id:"search-termPanel-other-"+d,value:(!Ext.isEmpty(a.restrictions)?a.restrictions:"")}]}
};b.fieldsetPanelSave=function(c,d){if(Ext.isEmpty(d)){d={}}if(!c.collapsed){d.collapsed=c.collapsed
}else{d=null}console.log("fieldset Panel Save state:",d);a.sessionProvider.set(c.stateId||c.id,d)
};b.fieldsetPanelRestore=function(c,d){if(!Ext.isEmpty(d)&&!Ext.isEmpty(d.collapsed)&&!d.collapsed){c.expand(false)
}};b.isInEmbeddedMode=function(){return !(typeof Curriki.module.search.embeddingPartnerUrl==="undefined")
};b.sendResizeMessageToEmbeddingWindow=function(){var c=document.body.scrollHeight+25;
console.log("search: sending resource view height to embedding window ("+c+"px)");
var d="resize:height:"+c+"px;";window.parent.postMessage(d,"*")};b.sendResourceUrlToEmbeddingWindow=function(c){console.log("search: sending resource url to embedding window ("+c+")");
var d="resourceurl:"+c;window.parent.postMessage(d,"*")};b.registerSearchLogging=function(c){}
};Ext.onReady(function(){b.init()})})();(function(){var a=["outerResource","resource"];
for(var b=0;b<2;b++){var c=a[b];Ext.ns("Curriki.module.search.data."+c);Curriki.module.search.data[c].init=function(g){var e=Curriki.module.search.data[g];
console.log("data."+g+": init");e.filter={};var d=e.filter;d.data={};d.data.subject={mapping:Curriki.data.fw_item.fwMap["FW_masterFramework.WebHome"],list:[],data:[["",_("CurrikiCode.AssetClass_fw_items_FW_masterFramework.UNSPECIFIED")]]};
d.data.subject.mapping.each(function(f){d.data.subject.list.push(f.id)});d.data.subject.list.push("UNCATEGORIZED");
d.data.subject.list.each(function(f){d.data.subject.data.push([f,_("CurrikiCode.AssetClass_fw_items_"+f)])
});d.data.subsubject={mapping:Curriki.data.fw_item.fwMap,data:[]};d.data.subject.mapping.each(function(f){d.data.subsubject.data.push([f.id,_("CurrikiCode.AssetClass_fw_items_"+f.id+".UNSPECIFIED"),f.id]);
d.data.subsubject.mapping[f.id].each(function(h){d.data.subsubject.data.push([h.id,_("CurrikiCode.AssetClass_fw_items_"+h.id),f.id])
})});d.data.level={list:Curriki.data.el.list,data:[["",_("CurrikiCode.AssetClass_educational_level_UNSPECIFIED")]]};
d.data.level.list.each(function(f){d.data.level.data.push([f,_("CurrikiCode.AssetClass_educational_level_"+f)])
});d.data.ict={fullList:Curriki.data.ict.list,parentList:{},list:[],data:[["",_("CurrikiCode.AssetClass_instructional_component_UNSPECIFIED","   ")]]};
d.data.ict.fullList.each(function(h){var f=h.replace(/_.*/,"");d.data.ict.parentList[f]=f
});Object.keys(d.data.ict.parentList).each(function(h){var f=_("CurrikiCode.AssetClass_instructional_component_"+h);
if(h==="other"){f="zzz"}d.data.ict.data.push([h,_("CurrikiCode.AssetClass_instructional_component_"+h),f])
});d.data.subict={list:Curriki.data.ict.list,parents:{},data:[]};d.data.subict.list.each(function(i){var f=i.replace(/_.*/,"");
if(f!==i){if(Ext.isEmpty(d.data.subict.parents[f])){d.data.subict.data.push([f+"*",_("CurrikiCode.AssetClass_instructional_component_"+f+"_UNSPECIFIED"),f,"   "]);
d.data.subict.parents[f]=f}var h=_("CurrikiCode.AssetClass_instructional_component_"+i);
if(i==="other"){h="zzz"}d.data.subict.data.push([i,_("CurrikiCode.AssetClass_instructional_component_"+i),f,h])
}});d.data.language={list:Curriki.data.language.list,data:[["",_("CurrikiCode.AssetClass_language_UNSPECIFIED")]]};
d.data.language.list.each(function(f){d.data.language.data.push([f,_("CurrikiCode.AssetClass_language_"+f)])
});d.data.category={list:Curriki.data.category.list,data:[["",_("CurrikiCode.AssetClass_category_UNSPECIFIED"),"   "]]};
d.data.category.list.each(function(h){var f=_("CurrikiCode.AssetClass_category_"+h);
if(h==="unknown"){f="zzz"}if(h!=="collection"){d.data.category.data.push([h,_("CurrikiCode.AssetClass_category_"+h),f])
}});d.data.review={list:["partners","highest_rated","members.highest_rated"],data:[["",_("search.resource.review.selector.UNSPECIFIED")]]};
d.data.review.list.each(function(f){d.data.review.data.push([f,_("search.resource.review.selector."+f)])
});d.data.special={list:typeof(Curriki.userinfo.userName)=="undefined"||Curriki.userinfo.userName=="XWiki.XWikiGuest"||g=="outerResource"?["collections","updated","info-only"]:["contributions","collections","updated","info-only"],data:[["",_("search.resource.special.selector.UNSPECIFIED")]]};
d.data.special.list.each(function(f){d.data.special.data.push([f,_("search.resource.special.selector."+f)])
});d.store={subject:new Ext.data.SimpleStore({fields:["id","subject"],data:d.data.subject.data,id:0}),subsubject:new Ext.data.SimpleStore({fields:["id","subject","parentItem"],data:d.data.subsubject.data,id:0}),level:new Ext.data.SimpleStore({fields:["id","level"],data:d.data.level.data,id:0}),ict:new Ext.data.SimpleStore({fields:["id","ict","sortValue"],sortInfo:{field:"sortValue",direction:"ASC"},data:d.data.ict.data,id:0}),subict:new Ext.data.SimpleStore({fields:["id","ict","parentICT","sortValue"],sortInfo:{field:"sortValue",direction:"ASC"},data:d.data.subict.data,id:0}),language:new Ext.data.SimpleStore({fields:["id","language"],data:d.data.language.data,id:0}),category:new Ext.data.SimpleStore({fields:["id","category","sortValue"],sortInfo:{field:"sortValue",direction:"ASC"},data:d.data.category.data,id:0}),review:new Ext.data.SimpleStore({fields:["id","review"],data:d.data.review.data,id:0}),special:new Ext.data.SimpleStore({fields:["id","special"],data:d.data.special.data,id:0})};
e.store={};e.store.record=new Ext.data.Record.create([{name:"title"},{name:"assetType"},{name:"category"},{name:"subcategory"},{name:"ict"},{name:"ictText"},{name:"ictIcon"},{name:"contributor"},{name:"contributorName"},{name:"rating",mapping:"review"},{name:"memberRating",mapping:"rating"},{name:"ratingCount"},{name:"description"},{name:"fwItems"},{name:"levels"},{name:"parents"},{name:"lastUpdated"},{name:"updated"},{name:"score"}]);
e.store.results=new Ext.data.Store({storeId:"search-store-"+g,proxy:new Ext.data.HttpProxy({url:document.location.pathname.endsWith("Old")?"/xwiki/bin/view/Search/Resources":(g=="outerResource"?"/outerCurrikiExtjs":"/currikiExtjs"),method:"GET"}),baseParams:{xpage:"plain"},reader:new Ext.data.JsonReader({root:"rows",totalProperty:"resultCount",id:"page"},e.store.record),remoteSort:true});
if(Curriki.userinfo.userGroups){e.store.results.baseParams.groupsId=Curriki.userinfo.userGroups
}if(Curriki.userinfo.userName){e.store.results.baseParams.userId=Curriki.userinfo.userName
}if(Curriki.userinfo.isAdmin){e.store.results.baseParams.isAdmin=true}if(Curriki.isISO8601DateParsing()){e.store.results.baseParams.dateFormat="ISO8601"
}e.store.results.setDefaultSort("score","desc");e.renderer={title:function(s,r,j,q,u,t){console.log("render title "+s);
if(typeof(s)!="string"){title=""}var o=j.id.replace(/\./,"/");var k=Ext.util.Format.stripTags(j.data.description);
k=Ext.util.Format.ellipsis(k,256);k=Ext.util.Format.htmlEncode(k);var i=Curriki.data.fw_item.getRolloverDisplay(j.data.fwItems||[]);
var p=Curriki.data.el.getRolloverDisplay(j.data.levels||[]);var n=j.data.lastUpdated||"";
var m="{1}<br />{0}<br /><br />";if(n!==""){m=m+"{7}<br />{6}<br /><br />"}m=m+"{3}<br />{2}<br />{5}<br />{4}";
k=String.format(m,k,_("global.title.popup.description"),i,_("global.title.popup.subject"),p,_("global.title.popup.educationlevel"),n,_("global.title.popup.last_updated"));
var l=j.data.assetType;var f=j.data.category;var h=j.data.subcategory;r.css=String.format("resource-{0} category-{1} subcategory-{1}_{2}",l,f,h);
var w=_(f+"."+h);if(w===f+"."+h){w=_("unknown.unknown")}if(Curriki.module.search.util.isInEmbeddedMode()){return String.format('<img class="x-tree-node-icon assettype-icon" src="{3}" ext:qtip="{4}" /><a  target="_blank" href="'+Curriki.module.search.resourceDisplay+'?resourceurl=/xwiki/bin/view/{0}" class="asset-title" ext:qtip="{2}">{1}</a>',escape(o+"?"+Curriki.module.search.embedViewMode),Ext.util.Format.ellipsis(s,80),k,Ext.BLANK_IMAGE_URL,w)
}else{if(g=="outerResource"){var v=Curriki.module.search.outerResources;return String.format('<img class="x-tree-node-icon assettype-icon" src="{0}" ext:qtip="{1}" /><a href="{2}{3}{4}" target="{5}" class="asset-title" ext:qtip="{1}">{6}</a>',Ext.BLANK_IMAGE_URL,k,v.prefix,o,v.suffix,v.target,s)
}else{return String.format('<img class="x-tree-node-icon assettype-icon" src="{3}" ext:qtip="{4}" /><a href="/xwiki/bin/view/{0}" class="asset-title" ext:qtip="{2}">{1}</a>',o,Ext.util.Format.ellipsis(s,80),k,Ext.BLANK_IMAGE_URL,w)
}}},ict:function(n,m,j,l,p,o){var k;var h;var i=j.data.ict;console.log("render ict "+n);
if(!Ext.isEmpty(i)){var f=i.replace(/_.*/,"");k="ict-"+f;if(f!==i){k=k+" ict-"+i}h=i.replace(/_/,".")
}else{k="ict-unknown";h="unknown"}m.css=k;return String.format('<img class="ict-icon" src="{1}" /><span class="ict-title">{0}</span>',_("search.resource.ict."+h),Ext.BLANK_IMAGE_URL)
},contributor:function(m,k,f,n,i,h){var l=m.replace(/\./,"/");console.log("render contributor "+m);
if(typeof("value")!="string"){m=""}if(Curriki.module.search.util.isInEmbeddedMode()){return String.format('<a href="/xwiki/bin/view/{0}" target="_blank">{1}</a>',l,f.data.contributorName)
}else{if(g=="outerResource"){var j=Curriki.module.search.outerResources;return String.format('<a href="{0}{1}{2}" target="{3}">{4}</a>',j.prefix,l,j.suffix,j.target,f.data.contributorName)
}else{return String.format('<a href="/xwiki/bin/view/{0}">{1}</a>',l,f.data.contributorName)
}}},rating:function(m,k,f,n,i,h){console.log("render rating "+m);if(typeof(m)=="string"&&m!=""){var l=f.id.replace(/\./,"/");
k.css=String.format("crs-{0}",m);if(Curriki.module.search.util.isInEmbeddedMode()){return String.format('<a href="/xwiki/bin/view/{3}?viewer=comments" target="_blank"><img class="crs-icon" alt="" src="{2}" /><span class="crs-text">{1}</span></a>',m,_("search.resource.review."+m),Ext.BLANK_IMAGE_URL,l)
}else{if(g=="outerResource"){var j=Curriki.module.search.outerResources;return String.format('<a "{0}{1}{2}" target="{3}"><img class="crs-icon" alt="" src="{4}" /><span class="crs-text">{5}</span></a>',j.ratingsPrefix,l,j.ratingsSuffix,j.target,Ext.BLANK_IMAGE_URL,_("search.resource.review."+m))
}else{return String.format('<a href="/xwiki/bin/view/{3}?viewer=comments"><img class="crs-icon" alt="" src="{2}" /><span class="crs-text">{1}</span></a>',m,_("search.resource.review."+m),Ext.BLANK_IMAGE_URL,l)
}}}else{return String.format("")}},memberRating:function(l,k,h,j,n,m){console.log("render memberRating "+l);
if(typeof(l)=="string"&&l!=""&&l!="0"&&l!=0){var i=h.id.replace(/\./,"/");var f=h.data.ratingCount;
if(f!=""&&f!="0"&&f!=0){k.css=String.format("rating-{0}",l);if(Curriki.module.search.util.isInEmbeddedMode()){return String.format('<a href="/xwiki/bin/view/{2}?viewer=comments" target="_blank"><img class="rating-icon" src="{4}" ext:qtip="{3}" /></a><a href="/xwiki/bin/view/{2}?viewer=comments" ext:qtip="{3}" target="_blank"> ({1})</a>',l,f,i,_("search.resource.rating."+l),Ext.BLANK_IMAGE_URL)
}else{if(g=="outerResource"){var o=Curriki.module.search.outerResources;return String.format('<a href="{0}{1}{2}"><img class="rating-icon" src="{3}" ext:qtip="{4}" /></a><a href="{0}{1}{2}" ext:qtip="{4}"> ({5})</a>',o.ratingsPrefix,i,o.ratingsSuffix,Ext.BLANK_IMAGE_URL,_("search.resource.rating."+l),f)
}else{return String.format('<a href="/xwiki/bin/view/{2}?viewer=comments"><img class="rating-icon" src="{4}" ext:qtip="{3}" /></a><a href="/xwiki/bin/view/{2}?viewer=comments" ext:qtip="{3}"> ({1})</a>',l,f,i,_("search.resource.rating."+l),Ext.BLANK_IMAGE_URL)
}}}else{return String.format("")}}else{return String.format("")}},updated:function(l,j,f,m,i,h){console.log("render updated "+l);
if(typeof("value")!="string"){return""}var k=Ext.util.Format.date(l,"M-d-Y");if(typeof(k)!="string"){return""
}return String.format("{0}",k)},score:function(k,j,f,l,i,h){if(typeof(k)!="number"){k=0
}return k}};console.log("Finished initting data for "+g+".")}}})();Ext.onReady(function(){Curriki.module.search.data.outerResource.init("outerResource");
Curriki.module.search.data.resource.init("resource")});Ext.ns("Curriki.module.search");
var Search=Curriki.module.search;(function(){var a=["outerResource","resource"];for(var b=0;
b<2;b++){var c=a[b];Ext.ns("Curriki.module.search.form."+c);Search.form[c].init=function(h){var e=Search.form[h];
var g=Search.data[h];console.log("form."+h+": init");var j=140;var d=250;e.ictCombo=function(k){Ext.apply(this,k)
};var i=$("curriki-searchbox");if(!Ext.isEmpty(i)){i.setValue("...");i.setAttribute("curriki:deftxt","...");
i.disable()}var f=$("searchbtn");if(!Ext.isEmpty(f)){f.innerHTML=""}Ext.extend(e.ictCombo,Ext.util.Observable,{init:function(k){Ext.apply(k,{tpl:'<tpl for="."><div class="x-combo-list-item ict-icon-combo-item ict-{'+k.valueField+'}"><img class="ict-icon" src="'+Ext.BLANK_IMAGE_URL+'"/><span class="ict-title">{'+k.displayField+"}</span></div></tpl>",onRender:k.onRender.createSequence(function(m,l){this.wrap.applyStyles({position:"relative"});
this.el.addClass("ict-icon-combo-input");this.icon=Ext.DomHelper.append(this.el.up("div.x-form-field-wrap"),{tag:"div",style:"position:absolute",children:{tag:"div",cls:"ict-icon"}})
}),setIconCls:function(){var l=this.store.query(this.valueField,this.getValue()).itemAt(0);
if(l){this.icon.className="ict-icon-combo-icon ict-"+l.get(this.valueField)}},setValue:k.setValue.createSequence(function(l){this.setIconCls()
})})}});e.categoryCombo=function(k){Ext.apply(this,k)};Ext.extend(e.categoryCombo,Ext.util.Observable,{init:function(k){Ext.apply(k,{tpl:'<tpl for="."><div class="x-combo-list-item category-icon-combo-item category-{'+k.valueField+'}"><img class="category-icon" src="'+Ext.BLANK_IMAGE_URL+'"/><span class="category-title">{'+k.displayField+"}</span></div></tpl>",onRender:k.onRender.createSequence(function(m,l){this.wrap.applyStyles({position:"relative"});
this.el.addClass("category-icon-combo-input");this.icon=Ext.DomHelper.append(this.el.up("div.x-form-field-wrap"),{tag:"div",style:"position:absolute",children:{tag:"div",cls:"category-icon"}})
}),setIconCls:function(){var l=this.store.query(this.valueField,this.getValue()).itemAt(0);
if(l){this.icon.className="category-icon-combo-icon category-"+l.get(this.valueField)
}},setValue:k.setValue.createSequence(function(l){this.setIconCls()})})}});e.termPanel=Search.util.createTermPanel(h,e);
e.filterPanel={xtype:"form",labelAlign:"left",id:"search-filterPanel-"+h,formId:"search-filterForm-"+h,border:false,items:[e.termPanel,{xtype:"fieldset",title:"",id:"search-advanced-"+h,autoHeight:true,collapsible:false,collapsed:false,animCollapse:false,border:true,stateful:true,stateEvents:["expand","collapse"],listeners:{statesave:{fn:Search.util.fieldsetPanelSave},staterestore:{fn:Search.util.fieldsetPanelRestore},expand:{fn:function(k){Ext.getCmp("search-results-"+h).getView().refresh();
Ext.select(".x-form-field-wrap",false,"search-advanced-"+h).setWidth(j);Ext.getCmp("search-termPanel-"+h).el.repaint()
}},collapse:{fn:function(k){Ext.getCmp("search-results-"+h).getView().refresh();Ext.getCmp("search-termPanel-"+h).el.repaint()
}}},items:[{layout:"column",border:false,defaults:{border:false,hideLabel:true},items:[{columnWidth:0.33,layout:"form",defaults:{hideLabel:true},items:[{xtype:"combo",id:"combo-subject-"+h,fieldLabel:"Subject",hiddenName:"subjectparent",width:j,listWidth:d,mode:"local",store:g.filter.store.subject,displayField:"subject",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("CurrikiCode.AssetClass_fw_items_FW_masterFramework.UNSPECIFIED"),selectOnFocus:true,forceSelection:true,listeners:{select:{fn:function(m,l){var k=Ext.getCmp("combo-subsubject-"+h);
if(m.getValue()===""){k.clearValue();k.hide()}else{if(m.getValue()==="UNCATEGORIZED"){k.show();
k.clearValue();k.store.filter("parentItem",m.getValue());k.setValue(m.getValue());
k.hide()}else{k.show();k.clearValue();k.store.filter("parentItem",m.getValue());k.setValue(m.getValue())
}}}}}},{xtype:"combo",fieldLabel:"Sub Subject",id:"combo-subsubject-"+h,hiddenName:"subject",width:j,listWidth:d,mode:"local",store:g.filter.store.subsubject,displayField:"subject",valueField:"id",typeAhead:true,triggerAction:"all",selectOnFocus:true,forceSelection:true,lastQuery:"",hidden:true,hideMode:"visibility"},{xtype:"combo",id:"combo-category-"+h,fieldLabel:"Category",hiddenName:"category",width:j,listWidth:d,mode:"local",store:g.filter.store.category,displayField:"category",valueField:"id",plugins:new e.categoryCombo(),typeAhead:true,triggerAction:"all",emptyText:_("CurrikiCode.AssetClass_category_UNSPECIFIED"),selectOnFocus:true,forceSelection:true}]},{columnWidth:0.33,layout:"form",defaults:{hideLabel:true},items:[{xtype:"combo",id:"combo-level-"+h,fieldLabel:"Level",mode:"local",width:j,listWidth:d,store:g.filter.store.level,hiddenName:"level",displayField:"level",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("CurrikiCode.AssetClass_educational_level_UNSPECIFIED"),selectOnFocus:true,forceSelection:true},{xtype:"combo",id:"combo-language-"+h,fieldLabel:"Language",hiddenName:"language",width:j,listWidth:d,mode:"local",store:g.filter.store.language,displayField:"language",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("CurrikiCode.AssetClass_language_UNSPECIFIED"),selectOnFocus:true,forceSelection:true},{xtype:"combo",id:"combo-review-"+h,fieldLabel:"Review",hiddenName:"review",width:j,listWidth:d,mode:"local",store:g.filter.store.review,displayField:"review",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("search.resource.review.selector.UNSPECIFIED"),selectOnFocus:true,forceSelection:true}]},{columnWidth:0.34,layout:"form",defaults:{hideLabel:true},items:[{xtype:"combo",id:"combo-ictprfx-"+h,fieldLabel:"Instructional Type",hiddenName:"ictprfx",width:j,listWidth:d,mode:"local",store:g.filter.store.ict,displayField:"ict",valueField:"id",plugins:new e.ictCombo(),typeAhead:true,triggerAction:"all",emptyText:_("CurrikiCode.AssetClass_instructional_component_UNSPECIFIED"),selectOnFocus:true,forceSelection:true,listeners:{select:{fn:function(n,k){var m=Ext.getCmp("combo-subICT-"+h);
if(n.getValue()===""){m.clearValue();m.hide()}else{m.clearValue();m.store.filter("parentICT",n.getValue());
var l=m.store.getById(n.getValue()+"*");if(Ext.isEmpty(l)){m.setValue(n.getValue());
m.hide()}else{m.setValue(n.getValue()+"*");m.show()}}}}}},{xtype:"combo",fieldLabel:"Sub ICT",hiddenName:"ict",width:j,listWidth:d,id:"combo-subICT-"+h,mode:"local",store:g.filter.store.subict,displayField:"ict",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:"Select a Sub ICT...",selectOnFocus:true,forceSelection:true,lastQuery:"",hidden:true,hideMode:"visibility"},{xtype:"combo",id:"combo-special-"+h,fieldLabel:"Special Filters",hiddenName:"special",width:j,listWidth:d,mode:"local",store:g.filter.store.special,displayField:"special",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("search.resource.special.selector.UNSPECIFIED"),selectOnFocus:true,forceSelection:true}]}]}]}]};
e.rowExpander=new Ext.grid.RowExpander({tpl:new Ext.XTemplate(_("search.resource.resource.expanded.title"),"<ul>",'<tpl for="parents">','<li class="resource-{assetType} category-{category} subcategory-{category}_{subcategory}">','<a target="{[this.getLinkTarget(values)]}" href="{[this.getParentURL(values)]}" ext:qtip="{[this.getQtip(values)]}">',"{title}","</a>","</li>","</tpl>","</ul>",{getParentURL:function(k){var l=k.page||false;
if(l){if(Curriki.module.search.util.isInEmbeddedMode()){return Curriki.module.search.resourceDisplay+"?resourceurl=/xwiki/bin/view/"+escape(l.replace(/\./,"/")+"?"+Curriki.module.search.embedViewMode)
}else{return"/xwiki/bin/view/"+l.replace(/\./,"/")}}else{return""}},getQtip:function(k){var n=Curriki.module.search.data[h].filter;
var o=Ext.util.Format.stripTags(k.description||"");o=Ext.util.Format.ellipsis(o,256);
o=Ext.util.Format.htmlEncode(o);var m=Curriki.data.fw_item.getRolloverDisplay(k.fwItems||[]);
var l=Curriki.data.el.getRolloverDisplay(k.levels||[]);return String.format("{1}<br />{0}<br /><br />{3}<br />{2}<br />{5}<br />{4}",o,_("global.title.popup.description"),m,_("global.title.popup.subject"),l,_("global.title.popup.educationlevel"))
},getLinkTarget:function(k){if(Curriki.module.search.util.isInEmbeddedMode()){return"_blank"
}else{return"_self"}}})});e.rowExpander.renderer=function(m,n,l){var k;if(l.data.parents&&l.data.parents.size()>0){n.cellAttr='rowspan="2"';
k="x-grid3-row-expander";return String.format('<img class="{0}" src="{1}" ext:qtip="{2}" />',k,Ext.BLANK_IMAGE_URL,_("search.resource.icon.plus.rollover"))
}else{k="x-grid3-row-expander-empty";return String.format('<img class="{0}" src="{1}" />',k,Ext.BLANK_IMAGE_URL)
}};e.rowExpander.on("expand",function(p,m,l,k){var o=p.grid.view.getRow(k);var n=Ext.DomQuery.selectNode("img[class*=x-grid3-row-expander]",o);
Ext.fly(n).set({"ext:qtip":_("search.resource.icon.minus.rollover")});if(Curriki.module.search.util.isInEmbeddedMode()){Curriki.module.search.util.sendResizeMessageToEmbeddingWindow()
}});e.rowExpander.on("collapse",function(p,m,l,k){var o=p.grid.view.getRow(k);var n=Ext.DomQuery.selectNode("img[class*=x-grid3-row-expander]",o);
Ext.fly(n).set({"ext:qtip":_("search.resource.icon.plus.rollover")});if(Curriki.module.search.util.isInEmbeddedMode()){Curriki.module.search.util.sendResizeMessageToEmbeddingWindow()
}});e.columnModel=new Ext.grid.ColumnModel([Ext.apply(e.rowExpander,{id:"score",tooltip:_("search.resource.column.header.score.tooltip"),header:" ",dataIndex:"score",width:30,sortable:true}),{id:"title",header:_("search.resource.column.header.title"),width:164,dataIndex:"title",sortable:true,hideable:false,renderer:g.renderer.title},{id:"ict",width:108,header:_("search.resource.column.header.ict"),dataIndex:"ictText",sortable:true,renderer:g.renderer.ict},{id:"contributor",width:110,header:_("search.resource.column.header.contributor"),dataIndex:"contributor",sortable:true,renderer:g.renderer.contributor},{id:"rating",width:88,header:_("search.resource.column.header.rating"),dataIndex:"rating",sortable:true,renderer:g.renderer.rating},{id:"memberRating",width:105,header:_("search.resource.column.header.member.rating"),dataIndex:"memberRating",sortable:true,renderer:g.renderer.memberRating},{id:"updated",width:80,header:_("search.resource.column.header.updated"),dataIndex:"updated",hidden:true,sortable:true,renderer:g.renderer.updated}]);
e.resultsPanel={xtype:"grid",id:"search-results-"+h,border:false,autoHeight:true,width:Search.settings.gridWidth,autoExpandColumn:"title",stateful:true,frame:false,stripeRows:true,viewConfig:{forceFit:true,enableRowBody:true,showPreview:true,scrollOffset:0},columnsText:_("search.columns.menu.columns"),sortAscText:_("search.columns.menu.sort_ascending"),sortDescText:_("search.columns.menu.sort_descending"),store:g.store.results,sm:new Ext.grid.RowSelectionModel({selectRow:Ext.emptyFn}),cm:e.columnModel,loadMask:false,plugins:e.rowExpander,bbar:new Ext.PagingToolbar({id:"search-pager-"+h,plugins:new Ext.ux.Andrie.pPageSize({variations:[10,25,50],beforeText:_("search.pagination.pagesize.before"),afterText:_("search.pagination.pagesize.after"),addBefore:_("search.pagination.pagesize.addbefore"),addAfter:_("search.pagination.pagesize.addafter")}),pageSize:25,store:g.store.results,displayInfo:true,displayMsg:_("search.pagination.displaying."+h),emptyMsg:_("search.find.no.results"),beforePageText:_("search.pagination.beforepage"),afterPageText:_("search.pagination.afterpage"),firstText:_("search.pagination.first"),prevText:_("search.pagination.prev"),nextText:_("search.pagination.next"),lastText:_("search.pagination.last"),refreshText:_("search.pagination.refresh")})};
e.mainPanel={xtype:"panel",id:"search-panel-"+h,autoHeight:true,items:[e.filterPanel,e.resultsPanel]};
e.doSearch=function(){Search.util.doSearch(h)};Search.util.registerTabTitleListener(h);
console.log("Finished initting form for "+h+".");console.log("Now get: Curriki.module.search.form['otherResource']: "+Curriki.module.search.form.otherResource)
}}Ext.onReady(function(){for(var d=0;d<2;d++){var e=a[d];Search.form[e].init(e)}})
})();(function(){var b="group";Ext.ns("Curriki.module.search.data."+b);var a=Curriki.module.search.data.group;
a.init=function(){console.log("data."+b+": init");a.filter={};var c=a.filter;c.data={};
c.data.subject={mapping:Curriki.data.fw_item.fwMap["FW_masterFramework.WebHome"],list:[],data:[["",_("XWiki.CurrikiSpaceClass_topic_FW_masterFramework.WebHome.UNSPECIFIED")]]};
c.data.subject.mapping.each(function(d){c.data.subject.list.push(d.id)});c.data.subject.list.each(function(d){c.data.subject.data.push([d,_("XWiki.CurrikiSpaceClass_topic_"+d)])
});c.data.subsubject={mapping:Curriki.data.fw_item.fwMap,data:[]};c.data.subject.mapping.each(function(d){c.data.subsubject.data.push([d.id,_("XWiki.CurrikiSpaceClass_topic_"+d.id+".UNSPECIFIED"),d.id]);
c.data.subsubject.mapping[d.id].each(function(e){c.data.subsubject.data.push([e.id,_("XWiki.CurrikiSpaceClass_topic_"+e.id),d.id])
})});c.data.level={list:Curriki.data.el.list,data:[["",_("XWiki.CurrikiSpaceClass_educationLevel_UNSPECIFIED")]]};
c.data.level.list.each(function(d){c.data.level.data.push([d,_("XWiki.CurrikiSpaceClass_educationLevel_"+d)])
});c.data.policy={list:["open","closed"],data:[["",_("search.XWiki.SpaceClass_policy_UNSPECIFIED")]]};
c.data.policy.list.each(function(d){c.data.policy.data.push([d,_("search.XWiki.SpaceClass_policy_"+d)])
});c.data.language={list:Curriki.data.language.list,data:[["",_("XWiki.CurrikiSpaceClass_language_UNSPECIFIED")]]};
c.data.language.list.each(function(d){c.data.language.data.push([d,_("XWiki.CurrikiSpaceClass_language_"+d)])
});c.store={subject:new Ext.data.SimpleStore({fields:["id","subject"],data:c.data.subject.data,id:0}),subsubject:new Ext.data.SimpleStore({fields:["id","subject","parentItem"],data:c.data.subsubject.data,id:0}),level:new Ext.data.SimpleStore({fields:["id","level"],data:c.data.level.data,id:0}),policy:new Ext.data.SimpleStore({fields:["id","policy"],data:c.data.policy.data,id:0}),language:new Ext.data.SimpleStore({fields:["id","language"],data:c.data.language.data,id:0})};
a.store={};a.store.record=new Ext.data.Record.create([{name:"title"},{name:"url"},{name:"policy"},{name:"description"},{name:"updated"}]);
a.store.results=new Ext.data.Store({storeId:"search-store-"+b,proxy:new Ext.data.HttpProxy({url:document.location.pathname.endsWith("Old")?"/xwiki/bin/view/Search/Groups":"/currikiExtjs",method:"GET"}),baseParams:{xpage:"plain",_dc:(new Date().getTime())},reader:new Ext.data.JsonReader({root:"rows",totalProperty:"resultCount",id:"page"},a.store.record),remoteSort:true});
if(Curriki.isISO8601DateParsing()){a.store.results.baseParams.dateFormat="ISO8601"
}a.store.results.setDefaultSort("title","asc");a.renderer={title:function(h,g,d,i,f,e){return String.format('<a href="{0}">{1}</a>',d.data.url,h)
},policy:function(h,g,d,j,f,e){if(h!==""){g.css="policy-"+h}var i=_("search.group.icon."+h);
return String.format('<span ext:qtip="{1}">{0}</span>',i,_("search.group.icon."+h+".rollover"))
},description:function(h,g,d,j,f,e){var i=Ext.util.Format.htmlDecode(h);i=Ext.util.Format.stripScripts(h);
i=Ext.util.Format.stripTags(i);i=Ext.util.Format.ellipsis(i,128);i=Ext.util.Format.htmlEncode(i);
i=Ext.util.Format.trim(i);return String.format("{0}",i)},updated:function(i,g,d,j,f,e){if(typeof("value")!="string"){return""
}var h=Ext.util.Format.date(i,"M-d-Y");if(typeof(h)!="string"){return""}return String.format("{0}",h)
}}};Ext.onReady(function(){a.init()})})();(function(){var d="group";Ext.ns("Curriki.module.search.form."+d);
var a=Curriki.module.search;var b=a.form[d];var c=a.data[d];b.init=function(){console.log("form."+d+": init");
var f=140;var e=250;b.termPanel=a.util.createTermPanel(d,b);b.filterPanel={xtype:"form",labelAlign:"left",id:"search-filterPanel-"+d,formId:"search-filterForm-"+d,border:false,items:[b.termPanel,{xtype:"fieldset",title:_("search.advanced.search.button"),id:"search-advanced-"+d,autoHeight:true,collapsible:true,collapsed:true,animCollapse:false,border:true,stateful:true,stateEvents:["expand","collapse"],listeners:{statesave:{fn:a.util.fieldsetPanelSave},staterestore:{fn:a.util.fieldsetPanelRestore},expand:{fn:function(g){Ext.getCmp("search-results-"+d).getView().refresh();
Ext.select(".x-form-field-wrap",false,"search-advanced-"+d).setWidth(f);Ext.getCmp("search-termPanel-"+d).el.repaint()
}},collapse:{fn:function(g){Ext.getCmp("search-results-"+d).getView().refresh();Ext.getCmp("search-termPanel-"+d).el.repaint()
}}},items:[{layout:"column",border:false,defaults:{border:false,hideLabel:true},items:[{columnWidth:0.33,layout:"form",defaults:{hideLabel:true},items:[{xtype:"combo",fieldLabel:"Subject",id:"combo-subject-"+d,hiddenName:"subjectparent",width:f,listWidth:e,mode:"local",store:c.filter.store.subject,displayField:"subject",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("XWiki.CurrikiSpaceClass_topic_FW_masterFramework.WebHome.UNSPECIFIED"),selectOnFocus:true,forceSelection:true,listeners:{select:{fn:function(i,h){var g=Ext.getCmp("combo-subsubject-"+d);
if(i.getValue()===""){g.clearValue();g.hide()}else{g.show();g.clearValue();g.store.filter("parentItem",i.getValue());
g.setValue(i.getValue())}}}}},{xtype:"combo",fieldLabel:"Sub Subject",id:"combo-subsubject-"+d,hiddenName:"subject",width:f,listWidth:e,mode:"local",store:c.filter.store.subsubject,displayField:"subject",valueField:"id",typeAhead:true,triggerAction:"all",selectOnFocus:true,forceSelection:true,lastQuery:"",hidden:true,hideMode:"visibility"}]},{columnWidth:0.33,layout:"form",defaults:{hideLabel:true},items:[{xtype:"combo",id:"combo-level-"+d,fieldLabel:"Level",mode:"local",width:f,listWidth:e,store:c.filter.store.level,hiddenName:"level",displayField:"level",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("XWiki.CurrikiSpaceClass_educationLevel_UNSPECIFIED"),selectOnFocus:true,forceSelection:true},{xtype:"combo",id:"combo-language-"+d,fieldLabel:"Language",hiddenName:"language",mode:"local",width:f,listWidth:e,store:c.filter.store.language,displayField:"language",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("XWiki.CurrikiSpaceClass_language_UNSPECIFIED"),selectOnFocus:true,forceSelection:true}]},{columnWidth:0.34,layout:"form",defaults:{hideLabel:true},items:[{xtype:"combo",id:"combo-policy-"+d,fieldLabel:"Membership Policy",hiddenName:"policy",mode:"local",width:f,listWidth:e,store:c.filter.store.policy,displayField:"policy",valueField:"id",typeAhead:true,triggerAction:"all",emptyText:_("search.XWiki.SpaceClass_policy_UNSPECIFIED"),selectOnFocus:true,forceSelection:true}]}]}]}]};
b.columnModel=new Ext.grid.ColumnModel([{id:"policy",header:_("search.group.column.header.policy"),width:62,dataIndex:"policy",sortable:true,renderer:c.renderer.policy},{id:"title",header:_("search.group.column.header.name"),width:213,dataIndex:"title",sortable:true,hideable:false,renderer:c.renderer.title},{id:"description",width:225,header:_("search.group.column.header.description"),dataIndex:"description",sortable:false,renderer:c.renderer.description},{id:"updated",width:96,header:_("search.group.column.header.updated"),dataIndex:"updated",sortable:true,renderer:c.renderer.updated}]);
b.resultsPanel={xtype:"grid",id:"search-results-"+d,border:false,autoHeight:true,width:a.settings.gridWidth,autoExpandColumn:"description",stateful:true,frame:false,stripeRows:true,viewConfig:{forceFit:true,enableRowBody:true,showPreview:true,scrollOffset:0},columnsText:_("search.columns.menu.columns"),sortAscText:_("search.columns.menu.sort_ascending"),sortDescText:_("search.columns.menu.sort_descending"),store:c.store.results,sm:new Ext.grid.RowSelectionModel({selectRow:Ext.emptyFn}),cm:b.columnModel,loadMask:false,plugins:b.rowExpander,bbar:new Ext.PagingToolbar({id:"search-pager-"+d,plugins:new Ext.ux.Andrie.pPageSize({variations:[10,25,50],beforeText:_("search.pagination.pagesize.before"),afterText:_("search.pagination.pagesize.after"),addBefore:_("search.pagination.pagesize.addbefore"),addAfter:_("search.pagination.pagesize.addafter")}),pageSize:25,store:c.store.results,displayInfo:true,displayMsg:_("search.pagination.displaying."+d),emptyMsg:_("search.find.no.results"),beforePageText:_("search.pagination.beforepage"),afterPageText:_("search.pagination.afterpage"),firstText:_("search.pagination.first"),prevText:_("search.pagination.prev"),nextText:_("search.pagination.next"),lastText:_("search.pagination.last"),refreshText:_("search.pagination.refresh")})};
b.mainPanel={xtype:"panel",id:"search-panel-"+d,autoHeight:true,items:[b.filterPanel,b.resultsPanel]};
b.doSearch=function(){a.util.doSearch(d)};a.util.registerTabTitleListener(d)};Ext.onReady(function(){b.init()
})})();(function(){var b="member";Ext.ns("Curriki.module.search.data."+b);var a=Curriki.module.search.data.member;
a.init=function(){console.log("data."+b+": init");a.filter={};var c=a.filter;c.data={};
c.data.subject={mapping:Curriki.data.fw_item.fwMap["FW_masterFramework.WebHome"],list:[],data:[["",_("XWiki.XWikiUsers_topics_FW_masterFramework.WebHome.UNSPECIFIED")]]};
c.data.subject.mapping.each(function(d){c.data.subject.list.push(d.id)});c.data.subject.list.each(function(d){c.data.subject.data.push([d,_("XWiki.XWikiUsers_topics_"+d)])
});c.data.subsubject={mapping:Curriki.data.fw_item.fwMap,data:[]};c.data.subject.mapping.each(function(d){c.data.subsubject.data.push([d.id,_("XWiki.XWikiUsers_topics_"+d.id+".UNSPECIFIED"),d.id]);
c.data.subsubject.mapping[d.id].each(function(e){c.data.subsubject.data.push([e.id,_("XWiki.XWikiUsers_topics_"+e.id),d.id])
})});c.data.country={list:"AD|AE|AF|AG|AI|AL|AM|AN|AO|AQ|AR|AS|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EE|EG|EH|ER|ES|ET|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MG|MH|MK|ML|MM|MN|MO|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SV|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TR|TT|TV|TW|TZ|UA|UG|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|ZA|ZM|ZW".split("|"),data:[["",_("XWiki.XWikiUsers_country_UNSPECIFIED")]]};
c.data.country.list.each(function(d){c.data.country.data.push([d,_("XWiki.XWikiUsers_country_"+d)])
});c.data.member_type={list:["student","teacher","parent","professional","administration","nonprofit","nonprofit_education","corporation"],data:[["",_("XWiki.XWikiUsers_member_type_UNSPECIFIED")]]};
c.data.member_type.list.each(function(d){c.data.member_type.data.push([d,_("XWiki.XWikiUsers_member_type_"+d)])
});c.store={subject:new Ext.data.SimpleStore({fields:["id","subject"],data:c.data.subject.data,id:0}),subsubject:new Ext.data.SimpleStore({fields:["id","subject","parentItem"],data:c.data.subsubject.data,id:0}),member_type:new Ext.data.SimpleStore({fields:["id","member_type"],data:c.data.member_type.data,id:0}),country:new Ext.data.SimpleStore({fields:["id","country"],data:c.data.country.data,id:0})};
a.store={};a.store.record=new Ext.data.Record.create([{name:"name1"},{name:"name2"},{name:"url"},{name:"bio"},{name:"picture"},{name:"contributions"}]);
a.store.results=new Ext.data.Store({storeId:"search-store-"+b,proxy:new Ext.data.HttpProxy({url:document.location.pathname.endsWith("Old")?"/xwiki/bin/view/Search/Members":"/currikiExtjs",method:"GET"}),baseParams:{xpage:"plain",_dc:(new Date().getTime())},reader:new Ext.data.JsonReader({root:"rows",totalProperty:"resultCount",id:"page"},a.store.record),remoteSort:true});
if(Curriki.isISO8601DateParsing()){a.store.results.baseParams.dateFormat="ISO8601"
}a.store.results.setDefaultSort("name1","asc");a.renderer={name1:function(h,g,d,i,f,e){return String.format('<a href="{1}">{0}</a>',h,d.data.url)
},name2:function(h,g,d,i,f,e){return String.format('<a href="{1}">{0}</a>',h,d.data.url)
},picture:function(h,g,d,i,f,e){return String.format('<a href="{2}"><img src="{0}" alt="{1}" class="member-picture" style="width:88px" /></a>',h,_("search.member.column.picture.alt.text"),d.data.url)
},contributions:function(h,g,d,i,f,e){return String.format("{0}",h)},bio:function(h,g,d,j,f,e){var i=Ext.util.Format.htmlDecode(h);
i=Ext.util.Format.stripScripts(h);i=Ext.util.Format.stripTags(i);i=Ext.util.Format.ellipsis(i,128);
i=Ext.util.Format.htmlEncode(i);i=Ext.util.Format.trim(i);return String.format("{0}",i)
}}};Ext.onReady(function(){a.init()})})();(function(){var d="member";Ext.ns("Curriki.module.search.form."+d);
var a=Curriki.module.search;var b=a.form[d];var c=a.data[d];b.init=function(){console.log("form."+d+": init");
var f=140;var e=250;b.termPanel=a.util.createTermPanel(d,b);b.filterPanel={xtype:"form",labelAlign:"left",id:"search-filterPanel-"+d,formId:"search-filterForm-"+d,border:false,items:[b.termPanel]};
b.columnModelList=[{id:"picture",header:_("search.member.column.header.picture"),width:116,dataIndex:"picture",sortable:false,resizable:false,menuDisabled:true,renderer:c.renderer.picture},{id:"name1",header:_("search.member.column.header.name1"),width:120,dataIndex:"name1",sortable:true,hideable:false,renderer:c.renderer.name1},{id:"name2",width:120,header:_("search.member.column.header.name2"),dataIndex:"name2",sortable:true,hideable:false,renderer:c.renderer.name2},{id:"bio",width:120,header:_("search.member.column.header.bio"),dataIndex:"bio",sortable:false,renderer:c.renderer.bio},{id:"contributions",width:120,header:_("search.member.column.header.contributions"),dataIndex:"contributions",sortable:false,renderer:c.renderer.contributions}];
b.columnModel=new Ext.grid.ColumnModel(b.columnModelList);b.resultsPanel={xtype:"grid",id:"search-results-"+d,border:false,autoHeight:true,width:a.settings.gridWidth,autoExpandColumn:"bio",stateful:true,frame:false,stripeRows:true,viewConfig:{forceFit:true,enableRowBody:true,showPreview:true,scrollOffset:0},columnsText:_("search.columns.menu.columns"),sortAscText:_("search.columns.menu.sort_ascending"),sortDescText:_("search.columns.menu.sort_descending"),store:c.store.results,sm:new Ext.grid.RowSelectionModel({selectRow:Ext.emptyFn}),cm:b.columnModel,loadMask:false,plugins:b.rowExpander,bbar:new Ext.PagingToolbar({id:"search-pager-"+d,plugins:new Ext.ux.Andrie.pPageSize({variations:[10,25,50],beforeText:_("search.pagination.pagesize.before"),afterText:_("search.pagination.pagesize.after"),addBefore:_("search.pagination.pagesize.addbefore"),addAfter:_("search.pagination.pagesize.addafter")}),pageSize:25,store:c.store.results,displayInfo:true,displayMsg:_("search.pagination.displaying."+d),emptyMsg:_("search.find.no.results"),beforePageText:_("search.pagination.beforepage"),afterPageText:_("search.pagination.afterpage"),firstText:_("search.pagination.first"),prevText:_("search.pagination.prev"),nextText:_("search.pagination.next"),lastText:_("search.pagination.last"),refreshText:_("search.pagination.refresh")})};
b.mainPanel={xtype:"panel",id:"search-panel-"+d,autoHeight:true,items:[b.filterPanel,b.resultsPanel]};
b.doSearch=function(){a.util.doSearch(d)};a.util.registerTabTitleListener(d)};Ext.onReady(function(){b.init()
})})();(function(){var b="blog";Ext.ns("Curriki.module.search.data."+b);var a=Curriki.module.search.data.blog;
a.init=function(){console.log("data."+b+": init");a.store={};a.store.record=new Ext.data.Record.create([{name:"name"},{name:"title"},{name:"text"},{name:"comments"},{name:"updated"},{name:"memberUrl"},{name:"blogUrl"}]);
a.store.results=new Ext.data.Store({storeId:"search-store-"+b,proxy:new Ext.data.HttpProxy({url:document.location.pathname.endsWith("Old")?"/xwiki/bin/view/Search/Blogs":"/currikiExtjs",method:"GET"}),baseParams:{xpage:"plain",_dc:(new Date().getTime())},reader:new Ext.data.JsonReader({root:"rows",totalProperty:"resultCount",id:"page"},a.store.record),remoteSort:true});
if(Curriki.isISO8601DateParsing()){a.store.results.baseParams.dateFormat="ISO8601"
}a.store.results.setDefaultSort("updated","desc");a.renderer={name:function(g,f,c,h,e,d){return String.format('<a href="{1}">{0}</a>',g,c.data.memberUrl)
},text:function(g,f,c,i,e,d){var h=Ext.util.Format.htmlDecode(g);h=Ext.util.Format.stripScripts(g);
h=Ext.util.Format.stripTags(h);h=Ext.util.Format.trim(h);h=Ext.util.Format.ellipsis(h,128);
return String.format('<a href="{2}" class="search-blog-title">{1}</a><br /><br />{0}',h,c.data.title,c.data.blogUrl)
},comments:function(g,f,c,h,e,d){return String.format("{0}",g)},updated:function(h,f,c,i,e,d){if(typeof("value")!="string"){return""
}var g=Ext.util.Format.date(h,"M-d-Y");if(typeof(g)!="string"){return""}return String.format("{0}",g)
}}};Ext.onReady(function(){a.init()})})();(function(){var d="blog";Ext.ns("Curriki.module.search.form."+d);
var a=Curriki.module.search;var b=a.form[d];var c=a.data[d];b.init=function(){console.log("form."+d+": init");
b.termPanel=a.util.createTermPanel(d,b);b.filterPanel={xtype:"form",labelAlign:"left",id:"search-filterPanel-"+d,formId:"search-filterForm-"+d,border:false,items:[b.termPanel]};
b.columnModel=new Ext.grid.ColumnModel([{id:"name",header:_("search.blog.column.header.name"),width:160,dataIndex:"name",sortable:true,renderer:c.renderer.name},{id:"text",header:_("search.blog.column.header.text"),width:260,dataIndex:"text",sortable:false,renderer:c.renderer.text},{id:"comments",header:_("search.blog.column.header.comments"),width:80,dataIndex:"comments",sortable:false,renderer:c.renderer.comments},{id:"updated",width:96,header:_("search.blog.column.header.updated"),dataIndex:"updated",sortable:true,renderer:c.renderer.updated}]);
b.resultsPanel={xtype:"grid",id:"search-results-"+d,border:false,autoHeight:true,width:a.settings.gridWidth,autoExpandColumn:"text",stateful:true,frame:false,stripeRows:true,viewConfig:{forceFit:true,enableRowBody:true,showPreview:true,scrollOffset:0},columnsText:_("search.columns.menu.columns"),sortAscText:_("search.columns.menu.sort_ascending"),sortDescText:_("search.columns.menu.sort_descending"),store:c.store.results,sm:new Ext.grid.RowSelectionModel({selectRow:Ext.emptyFn}),cm:b.columnModel,loadMask:false,bbar:new Ext.PagingToolbar({id:"search-pager-"+d,plugins:new Ext.ux.Andrie.pPageSize({variations:[10,25,50],beforeText:_("search.pagination.pagesize.before"),afterText:_("search.pagination.pagesize.after"),addBefore:_("search.pagination.pagesize.addbefore"),addAfter:_("search.pagination.pagesize.addafter")}),pageSize:25,store:c.store.results,displayInfo:true,displayMsg:_("search.pagination.displaying."+d),emptyMsg:_("search.find.no.results"),beforePageText:_("search.pagination.beforepage"),afterPageText:_("search.pagination.afterpage"),firstText:_("search.pagination.first"),prevText:_("search.pagination.prev"),nextText:_("search.pagination.next"),lastText:_("search.pagination.last"),refreshText:_("search.pagination.refresh")})};
b.mainPanel={xtype:"panel",id:"search-panel-"+d,autoHeight:true,items:[b.filterPanel,b.resultsPanel]};
b.doSearch=function(){a.util.doSearch(d)};a.util.registerTabTitleListener(d)};Ext.onReady(function(){b.init()
})})();(function(){var b="curriki";Ext.ns("Curriki.module.search.data."+b);var a=Curriki.module.search.data.curriki;
a.init=function(){console.log("data."+b+": init");a.store={};a.store.record=new Ext.data.Record.create([{name:"name"},{name:"updated"},{name:"url"},{name:"score"}]);
a.store.results=new Ext.data.Store({storeId:"search-store-"+b,proxy:new Ext.data.HttpProxy({url:document.location.pathname.endsWith("Old")?"/xwiki/bin/view/Search/Curriki":"/currikiExtjs",method:"GET"}),baseParams:{xpage:"plain",_dc:(new Date().getTime())},reader:new Ext.data.JsonReader({root:"rows",totalProperty:"resultCount"},a.store.record),remoteSort:true});
if(Curriki.userinfo.userGroups){a.store.results.baseParams.groupsId=Curriki.userinfo.userGroups
}if(Curriki.userinfo.userName){a.store.results.baseParams.userId=Curriki.userinfo.userName
}if(Curriki.userinfo.isAdmin){a.store.results.baseParams.isAdmin=true}if(Curriki.isISO8601DateParsing()){a.store.results.baseParams.dateFormat="ISO8601"
}a.store.results.setDefaultSort("score","desc");a.renderer={name:function(g,f,c,h,e,d){return String.format('<a href="{1}">{0}</a>',g,c.data.url)
},updated:function(h,f,c,i,e,d){if(typeof("value")!="string"){return""}var g=Ext.util.Format.date(h,"M-d-Y");
if(typeof(g)!="string"){return""}return String.format("{0}",g)},score:function(g,f,c,h,e,d){if(typeof(g)!="number"){g=0
}return g}}};Ext.onReady(function(){a.init()})})();(function(){var d="curriki";Ext.ns("Curriki.module.search.form."+d);
var a=Curriki.module.search;var b=a.form[d];var c=a.data[d];b.init=function(){console.log("form."+d+": init");
b.termPanel=a.util.createTermPanel(d,b);b.filterPanel={xtype:"form",labelAlign:"left",id:"search-filterPanel-"+d,formId:"search-filterForm-"+d,border:false,items:[b.termPanel]};
b.columnModel=new Ext.grid.ColumnModel([{id:"name",header:_("search.curriki.column.header.name"),width:500,dataIndex:"name",sortable:true,renderer:c.renderer.name},{id:"updated",width:96,header:_("search.curriki.column.header.updated"),dataIndex:"updated",sortable:true,renderer:c.renderer.updated}]);
b.resultsPanel={xtype:"grid",id:"search-results-"+d,border:false,autoHeight:true,width:a.settings.gridWidth,autoExpandColumn:"name",stateful:true,frame:false,stripeRows:true,viewConfig:{forceFit:true,enableRowBody:true,showPreview:true,scrollOffset:0},columnsText:_("search.columns.menu.columns"),sortAscText:_("search.columns.menu.sort_ascending"),sortDescText:_("search.columns.menu.sort_descending"),store:c.store.results,sm:new Ext.grid.RowSelectionModel({selectRow:Ext.emptyFn}),cm:b.columnModel,loadMask:false,bbar:new Ext.PagingToolbar({id:"search-pager-"+d,plugins:new Ext.ux.Andrie.pPageSize({variations:[10,25,50],beforeText:_("search.pagination.pagesize.before"),afterText:_("search.pagination.pagesize.after"),addBefore:_("search.pagination.pagesize.addbefore"),addAfter:_("search.pagination.pagesize.addafter")}),pageSize:25,store:c.store.results,displayInfo:true,displayMsg:_("search.pagination.displaying."+d),emptyMsg:_("search.find.no.results"),beforePageText:_("search.pagination.beforepage"),afterPageText:_("search.pagination.afterpage"),firstText:_("search.pagination.first"),prevText:_("search.pagination.prev"),nextText:_("search.pagination.next"),lastText:_("search.pagination.last"),refreshText:_("search.pagination.refresh")})};
b.mainPanel={xtype:"panel",id:"search-panel-"+d,autoHeight:true,items:[b.filterPanel,b.resultsPanel]};
b.doSearch=function(){a.util.doSearch(d)};a.util.registerTabTitleListener(d)};Ext.onReady(function(){b.init()
})})();(function(){Ext.ns("Curriki.module.search.form");var b=Curriki.module.search;
var a=b.form;var c="No concurrent searches on same tab.";b.init=function(){console.log("search: init");
if(Ext.isEmpty(b.initialized)){if(Ext.isEmpty(b.tabList)){b.tabList=["resource","outerResource","group","member","curriki"]
}var e=140;b.doSearch=function(m,i,j){var g={};if(Ext.getCmp("search-termPanel")&&Ext.getCmp("search-termPanel").getForm){g.all=Ext.getCmp("search-termPanel").getForm().getValues(false)
}var q=$("search-termPanel-"+m+"-terms").getValue();if(q==_("search.text.entry.label")){q=""
}if(document.savedTitle&&q!=""){document.title=document.savedTitle}else{if(typeof(document.savedTitle)=="undefined"){document.savedTitle=document.title
}document.title=_("search.window.title."+m,[q])}try{var k=$("curriki-searchbox");
if(typeof(k)=="object"&&typeof(k.style)=="object"){k.style.color="lightgrey";k.value=q
}}catch(l){console.log("search: curriki-searchbox not found. (Ok in embedded mode)");
console.log("EmbeddedMode: "+Curriki.module.search.util.isInEmbeddedMode())}var n={};
var f={};Ext.each(b.tabList,function(w){var v=a[w];if(!Ext.isEmpty(v)&&!Ext.isEmpty(v.doSearch)){var u=Ext.getCmp("search-filterPanel-"+w);
if(!Ext.isEmpty(u)){var x=u.getForm();if(!Ext.isEmpty(x)){g[w]=x.getValues(false);
if("undefined"!==typeof g[w]["terms"]&&g[w]["terms"]===_("search.text.entry.label")){delete (g[w]["terms"])
}if("undefined"!==typeof g[w]["other"]&&g[w]["other"]===""){delete (g[w]["other"])
}if(Ext.StoreMgr.lookup("search-store-"+w).sortInfo){g[w]["sort"]=new Object();g[w]["sort"].field=Ext.StoreMgr.lookup("search-store-"+w).sortInfo.field;
g[w]["sort"].dir=Ext.StoreMgr.lookup("search-store-"+w).sortInfo.direction}}}var s=Ext.getCmp("search-advanced-"+w);
if(!Ext.isEmpty(s)){if(!s.collapsed){f[w]={a:true}}}var t=Ext.getCmp("search-pager-"+w);
if(!Ext.isEmpty(t)){var y={};y.c=(("undefined"===typeof i)||(i!==true))?t.cursor:0;
y.s=t.pageSize;n[w]=y}if((("undefined"===typeof j)||(j=false))&&(Ext.isEmpty(m)||m===w)){if(Curriki.numSearches>10){return
}Curriki.numSearches++;console.log("now util.doSearch ("+window.numSearches+")",w,n);
b.util.doSearch(w,(("undefined"!==typeof n[w])?n[w].c:0))}}});Curriki.numSearches=0;
var r={};r.s=Ext.isEmpty(m)?"all":m;r.f=g;r.p=n;if(Ext.getCmp("search-tabPanel").getActiveTab){r.t=Ext.getCmp("search-tabPanel").getActiveTab().id
}r.a=f;var o=new Ext.state.Provider();var p=o.encodeValue(r);console.log("Saving History: "+p);
if(b.history.lastHistoryToken||window.currikiHistoryStarted){b.history.setLastToken(p);
var h=Ext.History.add(p,true);if(h){console.log("-- created a new history frame.")
}}else{window.currikiHistoryStarted=true;b.history.setLastToken(p);if(!Curriki.module.search.util.isInEmbeddedMode()){window.top.location.replace(window.location.pathname+"#"+p)
}else{location.replace(window.location.pathname+location.search+"#"+p)}console.log("-- rather replaced history.")
}};b.tabPanel={xtype:(b.tabList.size()>1?"tab":"")+"panel",id:"search-tabPanel",activeTab:0,deferredRender:false,autoHeight:true,layoutOnTabChange:true,frame:false,border:false,plain:true,defaults:{autoScroll:false,border:false},listeners:{tabchange:function(i,h){var g=h.id.replace(/(^search-|-tab$)/g,"");
Curriki.logView("/features/search/"+g);var f=Ext.getCmp("search-advanced-"+g);if(!Ext.isEmpty(f)){if(!f.collapsed){Ext.select(".x-form-field-wrap",false,"search-advanced-"+g).setWidth(e)
}}}},items:[]};Ext.each(b.tabList,function(f){panel={title:_("search."+f+".tab.title"),id:"search-"+f+"-tab",cls:"search-"+f,autoHeight:true};
module=a[f];if(!Ext.isEmpty(module)&&!Ext.isEmpty(module.mainPanel)){panel.items=[module.mainPanel];
b.tabPanel.items.push(panel)}else{console.log("Dropping "+f+" (module Curriki.module.search.form["+f+"] is empty).")
}});b.mainPanel={el:"search-div",border:false,height:"600px",defaults:{border:false},cls:"search-module",items:[b.tabPanel]};
Ext.ns("Curriki.module.search.history");var d=b.history;d.lastHistoryToken=false;
d.historyChange=function(f){if(f){if(f==d.lastHistoryToken){}else{d.updateFromHistory(f)
}}else{}};d.setLastToken=function(f){d.lastHistoryToken=f};d.updateFromHistory=function(g){var k=new Ext.state.Provider();
var f=k.decodeValue(g);if(d.lastHistoryToken==g||escape(d.lastHistoryToken)==g){return
}console.log("Got History: "+g,{values:f});if(!Ext.isEmpty(f)){var j=f.f;if(!Ext.isEmpty(j)&&j.all&&Ext.getCmp("search-termPanel")&&Ext.getCmp("search-termPanel").getForm){Ext.getCmp("search-termPanel").getForm().setValues(j.all)
}var h=f.p;var i=f.a;if(f.t){if(Ext.getCmp("search-tabPanel").setActiveTab){Ext.getCmp("search-tabPanel").setActiveTab(f.t)
}}Ext.each(b.tabList,function(m){console.log("Updating "+m);var l=b.form[m];if(!Ext.isEmpty(l)&&!Ext.isEmpty(l.doSearch)&&!Ext.isEmpty(j)&&!Ext.isEmpty(j[m])){var r=Ext.getCmp("search-filterPanel-"+m);
if(!Ext.isEmpty(r)){var n=r.getForm();if(!Ext.isEmpty(n)){try{n.setValues(j[m]);var p=Ext.getCmp("combo-subject-"+m);
if(p){p.fireEvent("select",p,p.getValue());if(!Ext.isEmpty(j[m].subject)){if(Ext.getCmp("combo-subsubject-"+m)){Ext.getCmp("combo-subsubject-"+m).setValue(j[m].subject)
}}}p=Ext.getCmp("combo-ictprfx-"+m);if(p){p.fireEvent("select",p,p.getValue());if(!Ext.isEmpty(j[m].ict)){if(Ext.getCmp("combo-subICT-"+m)){Ext.getCmp("combo-subICT-"+m).setValue(j[m].ict)
}}}if(j[m]["sort"]){var t=j[m]["sort"];if(t.field){Ext.StoreMgr.lookup("search-store-"+m).sortInfo.field=t.field
}if(t.dir){Ext.StoreMgr.lookup("search-store-"+m).sortInfo.direction=t.dir}}}catch(o){console.log("ERROR Updating "+m,o)
}}}if(!Ext.isEmpty(i)&&!Ext.isEmpty(i[m])&&i[m].a){var q=Ext.getCmp("search-advanced-"+m);
if(!Ext.isEmpty(q)){q.expand(false)}}var s=Ext.getCmp("search-pager-"+m);if(!Ext.isEmpty(s)&&!Ext.isEmpty(h)){if(h[m]){try{if(h[m]["c"]){s.cursor=h[m]["c"]
}if(h[m]["s"]){if(s.pageSize!=h[m]["s"]){s.setPageSize(h[m]["s"])}}}catch(o){console.log("ERROR Updating "+m,o)
}}}}});if(f.s){console.log("Starting search");if(f.s==="all"){b.doSearch()}else{b.doSearch(f.s)
}}d.setLastToken(g)}};d.init=function(){if(Ext.isEmpty(d.initialized)){var f=Ext.History.getToken();
Ext.History.init(function(){Ext.History.on("change",d.historyChange);if(f){d.historyChange(f)
}});d.initialized=true}};b.initialized=true;console.log("search: init done")}};b.display=function(){b.init();
var d=new Ext.Panel(b.mainPanel);d.render();if(Curriki.module.search.util.isInEmbeddedMode()){Curriki.module.search.util.sendResizeMessageToEmbeddingWindow()
}b.history.init()};b.start=function(){Ext.onReady(function(){b.display()})}})();