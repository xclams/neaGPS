(function(){Ext.ns("Curriki.module.organize");Ext.ns("Curriki.data.organize");var A=Curriki.module.organize;var B=Curriki.data.organize;var C=Curriki.ui;A.init=function(){C.treeLoader.Organize=function(D){C.treeLoader.Organize.superclass.constructor.call(this)};Ext.extend(C.treeLoader.Organize,C.treeLoader.Base,{setFullRollover:true,setAllowDrag:true});A.mainDlg=Ext.extend(C.dialog.Messages,{initComponent:function(){Ext.apply(this,{id:"OrganizeDialogueWindow",title:_("organize.dialog_header"),cls:"organize resource resource-edit",autoScroll:false,width:634,items:[{xtype:"panel",id:"guidingquestion-container",cls:"guidingquestion-container",items:[{xtype:"box",autoEl:{tag:"div",html:_("organize.dialog.guidingquestion_text"),cls:"guidingquestion"}},{xtype:"box",autoEl:{tag:"div",html:_("organize.dialog.instruction_text"),cls:"instruction"}}]},{xtype:"panel",id:"organize-panel",cls:"organize-panel",bbar:[{text:_("organize.dialog.remove_button"),id:"removebutton",cls:"button remove",listeners:{click:{fn:function(){this.close();if(Ext.isIE){window.location.reload()}},scope:this}}},"->",{text:_("organize.dialog.cancel_button"),id:"cancelbutton",cls:"button cancel",listeners:{click:{fn:function(){this.close();if(Ext.isIE){window.location.reload()}},scope:this}}},{text:_("organize.dialog.done_button"),id:"donebutton",cls:"button done",listeners:{click:{fn:function(){var D=[];console.log("Organizing",D);var E=this;var F=function(G){console.log("Organize callback",G);E.close();window.location.reload()}},scope:this}}}],items:[{xtype:"treepanel",loader:new C.treeLoader.Organize(),id:"organize-tree-cmp",autoScroll:true,useArrows:true,border:false,hlColor:"93C53C",hlDrop:false,cls:"organize-tree",animate:true,enableDD:true,ddScroll:true,containerScroll:true,rootVisible:true,listeners:{nodedragover:{fn:function(G){var E=G.dropNode.attributes.assetName;var D=G.target;if(G.point!=="append"){D=D.parentNode;if(Ext.isEmpty(D)){return false}}if(!Ext.isEmpty(D.attributes.disallowDropping)&&(D.attributes.disallowDropping===true)){G.cancel=true;return false}var F=false;while(!Ext.isEmpty(D)&&!F){if(D.id===E){F=true;G.cancel=true;return false}else{D=D.parentNode}}},scope:this},expandnode:{fn:function(E){var D=this;D.fireEvent("afterlayout",D,D.getLayout())},scope:this},beforeclick:function(D,E){D.toggle();return false}},root:B.root}]}]});A.mainDlg.superclass.initComponent.call(this)}});Ext.reg("organizeDialog",A.mainDlg);A.msgComplete=Ext.extend(C.dialog.Messages,{});A.confirmDlg=Ext.extend(C.dialog.Messages,{initComponent:function(){Ext.apply(this,{id:"ConfirmOrganizeDialogueWindow",title:_("organize.intention.dialog_title"),cls:"organize resource resource-edit",autoScroll:false,bbar:[{text:_("organize.intention.message.continue_button"),id:"continuebutton",cls:"button continue",listeners:{click:{fn:function(E,D){C.show("organizeDialog");this.close()},scope:this}}},{text:_("organize.dialog.cancel_button"),id:"closebutton",cls:"button cancel",listeners:{click:{fn:function(E,D){this.close()},scope:this}}}],items:[{xtype:"box",autoEl:{tag:"div",html:_("organize.intention.message_text",B.title,B.creatorName)}}]});A.confirmDlg.superclass.initComponent.call(this)}});Ext.reg("confirmOrganizeDialog",A.confirmDlg);A.display=function(){if(B.creator==Curriki.global.username||Curriki.global.isAdmin){C.show("organizeDialog")}else{C.show("confirmOrganizeDialog")}};A.startMetadata=function(D){Curriki.assets.GetMetadata(D,function(E){console.log("returned",E);E.fwItems=E.fw_items;E.levels=E.educational_level;E.ict=E.instructional_component;E.displayTitle=E.title;E.rights=E.rightsList;E.leaf=false;E.allowDrag=false;E.allowDrop=true;E.expanded=true;var F=new C.treeLoader.Organize();B.root=F.createNode(E);console.log("created",B.root);B.root.addListener("beforecollapse",function(){return false});B.resource=D;Ext.onReady(function(){A.display()})})};return true};A.start=function(D){if(A.init()){if(undefined===D||undefined===D.assetPage){alert("No resource to organize given.");return false}B.resource=D.assetPage;if(undefined===D.title||undefined==D.creator||undefined==D.creatorName){Curriki.assets.GetAssetInfo(B.resource,function(E){A.start(E)});return false}else{B.title=D.title;B.creator=D.creator;B.creatorName=D.creatorName;A.startMetadata(B.resource)}}else{alert("ERROR: Could not start Organize.")}}})();