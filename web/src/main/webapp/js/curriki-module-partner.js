Ext.ns("Curriki.module.partner");Curriki.module.partner.confirm=function(){Ext.Msg.show({title:_("curriki.crs.review.partnerconfirmtitle"),msg:_("curriki.crs.review.partnerconfirmmessage"),buttons:Ext.Msg.OKCANCEL,fn:function(A){if(A=="ok"){var B=Ext.get("assetFullName").dom.value;Curriki.assets.PartnerAsset(B,function(C){window.location.pathname="xwiki/bin/view/CRS/Reviews"})}else{document.getElementById("partner").checked=false}},icon:Ext.MessageBox.QUESTION})};