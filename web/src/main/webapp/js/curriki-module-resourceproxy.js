(function(){Ext.ns("Curriki.module.resourceproxy");var a=Curriki.module.resourceproxy;a.settings={proxyUrl:"http://current.dev.curriki.org"};a.run=function(){console.log("resourceproxy: starting");var b=a.getResourceUrlFromParams();a.renderPage(b)};a.getResourceUrlFromParams=function(){var b=Ext.urlDecode(location.search.substring(1));if(!(typeof b.resourceurl==="undefined")){return b.resourceurl}else{document.write("Proxy Error: No ressourceurl defined");throw"Proxy Error: No ressourceurl defined"}};a.renderPage=function(b){Ext.DomHelper.append(Ext.getBody(),{tag:"iframe",src:a.settings.proxyUrl+unescape(b),width:"100%",height:"100%",scrolling:"auto",frameborder:"0",allowtransparency:"true"},false)};Ext.onReady(function(){a.run()})})();