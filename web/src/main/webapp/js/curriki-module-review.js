Ext.ns("Curriki.module.review");Curriki.module.review.validateCRS=function(d,j,a){var b=Ext.select('input[type="radio"][name='+d+"]").elements;var e=Ext.select('input[type="radio"][name='+j+"]").elements;var h=Ext.select('input[type="radio"][name='+a+"]").elements;for(i=0;i<b.length;i++){if(b[i].checked==true){break}if(b[i].checked==false&&i==b.length-1){alert(_("curriki.crs.review.mustSelectAValueInAllCategories"));return false}}for(i=0;i<e.length;i++){if(e[i].checked==true){break}if(e[i].checked==false&&i==e.length-1){alert(_("curriki.crs.review.mustSelectAValueInAllCategories"));return false}}for(i=0;i<h.length;i++){if(h[i].checked==true){break}if(h[i].checked==false&&i==h.length-1){alert(_("curriki.crs.review.mustSelectAValueInAllCategories"));return false}}var f=Ext.select('input[type="radio"][name='+d+'][value="0"]').first().dom;var g=Ext.select('input[type="radio"][name='+j+'][value="0"]').first().dom;var c=Ext.select('input[type="radio"][name='+a+'][value="0"]').first().dom;if(f.checked&&g.checked&&c.checked){return true}if(!f.checked&&(g.checked||c.checked)){alert(_("curriki.crs.review.notValidNotRatedCategorySelection"));return false}if(f.checked&&((g.checked&&!c.checked)||(!g.checked&&c.checked))){alert(_("curriki.crs.review.notValidNotRatedCategorySelection"));return false}return true};