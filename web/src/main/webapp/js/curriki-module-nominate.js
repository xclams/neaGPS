Ext.ns("Curriki.module.nominate");Curriki.module.nominate.init=function(){if(Ext.isEmpty(Curriki.module.nominate.initialized)){var A=Curriki.module.nominate;A.ie_size_shift=10;A.EnableNext=function(){Ext.getCmp("nextbutton").enable()};A.DisableNext=function(){Ext.getCmp("nextbutton").disable()};A.NominateDialogueId="nominate-resource-dialogue";A.NominateResource=Ext.extend(Curriki.ui.dialog.Actions,{initComponent:function(){Ext.apply(this,{title:_("curriki.crs.nominate"),cls:"title",id:A.NominateDialogueId,items:[{xtype:"panel",items:[{xtype:"box",autoEl:{tag:"div",html:_("curriki.crs.nominate.nominatefollowingresourceforreview")+" "+Curriki.current.assetTitle,cls:"guidingquestion"}}]},{xtype:"form",id:"nominateResourcePanel",formId:"nominateResourceForm",cls:"form-container",labelWidth:25,autoScroll:true,border:false,defaults:{labelSeparator:"",hideLabel:true,name:"nominateResource"},bbar:["->",{text:_("curriki.crs.nominate.cancel"),id:"cancelbutton",cls:"button cancel",listeners:{click:{fn:function(){this.close();window.location.href=Curriki.current.cameFrom},scope:this}}},{text:_("curriki.crs.nominate.submit"),id:"submitbutton",cls:"submitbutton button next",listeners:{click:{fn:function(){var B=this.findByType("form")[0].getForm();if(B.isValid()){var C=(B.getValues(false))["nominate-comments"];A.Nominate(C)}else{alert("Invalid Form")}},scope:this}}}],monitorValid:true,listeners:{render:function(B){B.ownerCt.on("bodyresize",function(D,E,C){if(C==="auto"){B.setHeight("auto")}else{B.setHeight(D.getInnerHeight()-(D.findByType("panel")[0].getBox().height+(Ext.isIE?A.ie_size_shift:0)))}})}},items:[{xtype:"box",autoEl:{tag:"div",html:_("curriki.crs.nominate.comments"),cls:"guidingquestion"}},{xtype:"box",autoEl:{tag:"div",html:_("curriki.crs.nominate.commentstext"),cls:"commentstext"}},{xtype:"textarea",id:"nominate-comments",name:"nominate-comments",width:"80%"},{xtype:"box",autoEl:{tag:"div",html:_("curriki.crs.nominate.commentsfootertext"),cls:"commentstext"}}]}]});A.NominateResource.superclass.initComponent.call(this)}});Ext.reg("nominateResourceDialog",A.NominateResource);A.Nominate=function(B){Curriki.assets.NominateAsset(Curriki.current.assetName,B,function(C){this.close();window.location.href=Curriki.current.cameFrom})};Curriki.module.nominate.initialized=true}};Curriki.module.nominate.nominateResource=function(A){Curriki.module.nominate.initAndStart(function(){Curriki.ui.show("nominateResourceDialog")},A)};Curriki.module.nominate.initAndStart=function(C,A){var B=Curriki.current;if(!Ext.isEmpty(A)){B.assetName=A.assetName||B.assetName;B.parentAsset=A.parentAsset||B.parentAsset;B.publishSpace=A.publishSpace||B.publishSpace;B.cameFrom=A.cameFrom||B.cameFrom;B.assetTitle=A.assetTitle||B.assetTitle;B.assetType=A.assetType||B.assetType;B.parentTitle=A.parentTitle||B.parentTitle}Curriki.init(function(){if(Ext.isEmpty(Curriki.data.user.me)||"XWiki.XWikiGuest"===Curriki.data.user.me.username){window.location.href="/xwiki/bin/login/XWiki/XWikiLogin?xredirect="+window.location.href;return }Curriki.module.nominate.init();var F=function(){C()};var D;if(!Ext.isEmpty(B.parentAsset)&&Ext.isEmpty(B.parentTitle)){D=function(){Curriki.assets.GetAssetInfo(B.parentAsset,function(G){Curriki.current.parentTitle=G.title;F()})}}else{D=function(){F()}}var E;if(!Ext.isEmpty(B.assetName)&&(Ext.isEmpty(B.assetTitle)||Ext.isEmpty(B.assetType))){E=function(){Curriki.assets.GetAssetInfo(B.assetName,function(G){Curriki.current.assetTitle=G.title;Curriki.current.assetType=G.assetType;D()})}}else{E=function(){D()}}E()})};Curriki.module.nominate.loaded=true;Ext.ns("Curriki.current");Curriki.current={init:function(){Ext.apply(this,{assetName:null,parentAsset:null,publishSpace:null,cameFrom:null,flow:null,flowFolder:"",assetTitle:null,assetType:null,parentTitle:null,asset:null,metadata:null,selected:null,fileName:null,videoId:null,linkUrl:null,sri1:null,sri1fillin:null,sri2fillin:null,submitToTemplate:null,drop:null})}};Curriki.current.init();