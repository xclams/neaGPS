package org.curriki.xwiki.plugin.curriki;

import java.io.*;
import java.util.*;

import org.apache.commons.httpclient.methods.GetMethod;
import org.curriki.xwiki.plugin.asset.Asset;
import org.curriki.xwiki.plugin.asset.Util;
import org.curriki.xwiki.plugin.asset.composite.RootCollectionCompositeAsset;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.XWikiException;
import com.xpn.xwiki.plugin.zipexplorer.ZipExplorerPlugin;
import com.xpn.xwiki.api.Api;
import com.xpn.xwiki.api.Property;
import com.xpn.xwiki.api.Document;

import javax.management.timer.Timer;

/**
 */
public class CurrikiPluginApi extends Api {
    private CurrikiPlugin plugin;

    public CurrikiPluginApi(XWikiContext context) {
        super(context);
    }

    public CurrikiPluginApi(CurrikiPlugin plugin, XWikiContext context) {
        this(context);
        this.plugin = plugin;
    }

    /* Hopefully we can make sure this is not needed
   public CurrikiPlugin getPlugin() {
       return (hasProgrammingRights() ? plugin : null);
   }
    */

    public List<String> fetchCollectionsList(String forEntity) throws XWikiException {
        return plugin.fetchCollectionsList(forEntity, context);
    }

    public Map<String,Object> fetchCollectionsInfo(String forEntity) throws XWikiException {
        return plugin.fetchCollectionsInfo(forEntity, context);
    }

    public List<String> fetchUserCollectionsList() throws XWikiException {
        return fetchUserCollectionsList(context.getUser());
    }

    public List<String> fetchUserCollectionsList(String forUser) throws XWikiException {
        return fetchCollectionsList(forUser);
    }

    public Map<String,Object> fetchUserCollectionsInfo() throws XWikiException {
        return fetchUserCollectionsInfo(context.getUser());
    }

    public Map<String,Object> fetchUserCollectionsInfo(String forUser) throws XWikiException {
        return fetchCollectionsInfo(forUser);
    }

    public Map<String,Object> fetchUserGroups() {
        return fetchUserGroups(context.getUser());
    }

    public Map<String,Object> fetchUserGroups(String forUser) {
        return plugin.fetchUserGroups(forUser, context);
    }

    public List<String> fetchGroupCollectionsList(String forGroup) throws XWikiException {
        return fetchCollectionsList(forGroup);
    }

    public Map<String,Object> fetchGroupCollectionsInfo(String forGroup) throws XWikiException {
        return fetchCollectionsInfo(forGroup);
    }

    public Asset createAsset(String parentAsset) throws XWikiException {
        return plugin.createAsset(parentAsset, context);
    }

    public Asset createAsset(String parentAsset, String publishSpace) throws XWikiException {
        return plugin.createAsset(parentAsset, publishSpace, context);
    }

    public Asset copyAsset(String copyOf) throws XWikiException {
        return plugin.copyAsset(copyOf, context);
    }

    public Asset copyAsset(String copyOf, String publishSpace) throws XWikiException {
        return plugin.copyAsset(copyOf, publishSpace, context);
    }

    public String createAssetName(String parentAsset) throws XWikiException {
        return createAsset(parentAsset).getFullName();
    }

    public String createAssetName(String parentAsset, String publishSpace) throws XWikiException {
        return createAsset(parentAsset, publishSpace).getFullName();
    }

    public Asset fetchAsset(String assetName) throws XWikiException {
        return plugin.fetchAsset(assetName, context);
    }

    public Asset fetchAssetOrNull(String assetName) {
        try {
            return plugin.fetchAsset(assetName, context);
        } catch (XWikiException e) {
            return null;
        }
    }

    public Asset fetchAssetAs(String assetName, Class<? extends Asset> classType) throws XWikiException {
        return plugin.fetchAssetAs(assetName, classType, context);
    }

    public Asset fetchAssetSubclassAs(String assetName, Class<? extends Asset> classType) throws XWikiException {
        return plugin.fetchAssetSubclassAs(assetName, classType, context);
    }

    public List<Property> fetchAssetMetadata(String assetName) throws XWikiException {
        return plugin.fetchAssetMetadata(assetName, context);
    }

    public Map<String, Object> fetchUserInfo() {
        return plugin.fetchUserInfo(context);
    }

    public RootCollectionCompositeAsset fetchRootCollection() throws XWikiException {
        return fetchRootCollection(context.getUser());
    }

    public RootCollectionCompositeAsset fetchRootCollection(String forEntity) throws XWikiException {
        return plugin.fetchRootCollection(forEntity, context);
    }


    /**
     * Verificate if a user is in Group
     * @param groupName
     * @return
     * @throws XWikiException
     */
    public Boolean isMember(String groupName) throws XWikiException
    {
    	return plugin.isMember(groupName, context);
    }


    public List<String> getAssetICT(String assetName) throws XWikiException {
    	return plugin.getAssetICT(assetName,context);
    }

    /**
     * change the date format from a date string.
     * @param date
     * @param currentPattern
     * @param newPattern
     * @param delim
     * @return
     */
    public String changeFormatDate(String date,String currentPattern,String newPattern,String delim)throws XWikiException {
    	return plugin.changeFormatDate(date,currentPattern,newPattern,delim);
    }

    public String formatDate(String pattern) throws XWikiException {
        return formatDate(new Date(), pattern);
    }

    public String formatDate(Date date,String pattern) throws XWikiException
    {
    	return plugin.formatDate(date,pattern);
    }

    public Date getDateMinusDays(String days) {
        return new Date((new Date()).getTime() - Long.parseLong(days) * Timer.ONE_DAY);
    }


    /**
     * Builds a map with the number of resources in each status given the criteria used in the BFCS queue filter
     * @param baseHql
     * @return
     * @throws XWikiException
     */
    public Map getSeeCountsByStatus(String baseHql) throws XWikiException {
    	return plugin.getSeeCountsByStatus(baseHql,context);
    }

    /**
     * Get class property values as a list. This code was extracted from FieldResource.represent
     * @param className
     * @param fieldName
     * @return
     * @throws XWikiException
     */
    public List getValues(String className, String fieldName) throws XWikiException{
    	return plugin.getValues(className, fieldName,context);

    }

    /**
     * Wrapping the getFileList call to manage exception thrown on corrupt assets
     * @param document
     * @param filename
     * @return List of files
     */
    public List getFileList(Document document, String filename) {
        ZipExplorerPlugin zeplugin = (ZipExplorerPlugin) context.getWiki().getPlugin("zipexplorer", context);
        if (zeplugin==null)
            return null;
        try {
            return zeplugin.getFileList(document, filename, context);
        } catch (Exception e) {
            context.put("exception", e);
            return null;
        }
    }

    /**
     * Wrapping the getFileTreeList call to manage exception thrown on corrupt assets
     * @param document
     * @param filename
     * @return List of files
     */
    public List getFileTreeList(Document document, String filename) {
        ZipExplorerPlugin zeplugin = (ZipExplorerPlugin) context.getWiki().getPlugin("zipexplorer", context);
        if (zeplugin==null)
            return null;
        try {
            return zeplugin.getFileTreeList(document, filename, context);
        } catch (Exception e) {
            context.put("exception", e);
            return null;
        }
    }

    public String escapeForJS(String origtext) {
        if (origtext==null)
          return "";
        else
          return Util.escapeForJS(origtext);
    }


    // this code is not meant to stay here but is expected

    public String solrGetSingleValue(String query, String fieldName) throws IOException {
        return plugin.solrGetSingleValue(query, fieldName);
    }
    public GetMethod solrCreateQueryGetMethod(String query, String fieldNames) throws IOException {
        return plugin.solrCreateQueryGetMethod(query, fieldNames, 0, 10);
    }
    public GetMethod solrCreateQueryGetMethod(String query, String fieldNames, int start, int rows) throws IOException {
        return plugin.solrCreateQueryGetMethod(query, fieldNames, start, rows);
    }

    public boolean checkSolrIsUp() {
        return plugin.solrCheckIsUp();
    }

    public int countDocsSolrCatchAll(String query) {
        try {
            return plugin.solrCountDocs(query);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public int countDocsSolr(String query) {
        return plugin.solrCountDocs(query);
    }

    public List<String> listDocNamesSolr(String query, int start, int num) {
        return plugin.solrListDocNames(query, start, num);
    }

    public void startMethod(GetMethod g) {
        plugin.startSolrMethod(g);
    }

    public void solrCollectResultsFromQueryWithSort(String query, String fields, String sortParam, int start, int max, CurrikiPlugin.SolrResultCollector collector){
        if(!hasProgrammingRights()) return;
        plugin.solrCollectResultsFromQueryWithSort(query, fields, sortParam, start, max, collector);
    }

    public void solrCollectResultsFromQuery(String query, String fields, int start, int max, CurrikiPlugin.SolrResultCollector collector){
        this.solrCollectResultsFromQueryWithSort(query, fields, null, start, max, collector);
    }


    public void feedFieldFromXmlStream(GetMethod g, final Writer out, final String elementName) throws IOException {
        plugin.feedFieldFromXmlStream(g, out, elementName);
    }

    public String getPublicCurrikiConfig(String name, String defaultVal) {
        return plugin.getPublicCurrikiConfig(name,defaultVal, context);
    }
}
