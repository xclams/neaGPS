import com.xpn.xwiki.api.Document
import com.xpn.xwiki.api.XWiki
import com.xpn.xwiki.plugin.activitystream.api.ActivityEvent
import org.curriki.plugin.activitystream.plugin.CurrikiActivityStreamPluginApi
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.text.SimpleDateFormat

public class DigestEmailSender {

    /**
     * LOGGER
     */
    private static final Logger LOG = LoggerFactory.getLogger(DigestEmailSender.class);

    /**
     * The xwiki object of the running curriki instance
     */
    private XWiki wiki;
    private Long sinceHowLong = 24*60*60*1000;

    public void init(XWiki xwiki) {
        this.wiki = xwiki;
        LOG.warn("Inited DigestEmailSender");
    }

    public int sendDigestEmailForGroup(String groupName, List<String> groupAdminsUserNames){
        List<ActivityEvent> activityEvents = getActivityEventsForGroup(groupName);

        if(groupAdminsUserNames == null || groupAdminsUserNames.size() == 0){
            groupAdminsUserNames = wiki.csm.getAdmins(groupName);
        }

        wiki.context.put("GROUPNAME", groupName);
        wiki.context.put("EVENTS", activityEvents);

        Document emailDoc = wiki.getDocument("Groups.DigestEmailMailTemplate");
        String subject = wiki.renderText(emailDoc.title, emailDoc);
        String from = wiki.getXWikiPreference("admin_email");
        String text = emailDoc.getRenderedContent();

        LOG.warn("Events ###  " + activityEvents);
        LOG.warn("Groupadmins ###  " + groupAdminsUserNames);
        for (groupAdminUserName in groupAdminsUserNames) {
            Document groupAdminUserDoc = wiki.getDocument(groupAdminUserName);
            com.xpn.xwiki.api.Object userObj = groupAdminUserDoc.getObject("XWiki.XWikiUsers", true);
            if(userObj==null || userObj.getProperty("email")==null) continue;
            String to = userObj.getProperty("email").getValue();
            LOG.warn("Sending mail to " + to);
            sendMail(from, to, subject, text);
        }
        return groupAdminsUserNames.size();
    }

    private List<ActivityEvent> getActivityEventsForGroup(String groupName) {
        CurrikiActivityStreamPluginApi activityStream = wiki.activitystream;
        String streamName = activityStream.getStreamName(groupName);
        SimpleDateFormat isoFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        isoFormat.setTimeZone(TimeZone.getTimeZone("PST"));
        Date date = new Date(new Date().getTime() - sinceHowLong);
        String dateStr = isoFormat.format(date);
        LOG.warn("Selecting events from stream \"" + streamName + "\" with date > " + dateStr);
        return activityStream.searchEvents("act.stream='"+ streamName+"'  and act.date > ${dateStr} and act.type!='update' and (act.param3!='comment' or act.type!='create')", false, 25, 0)
    }

    private void sendMail(String from, String to, String subject, String text){
        wiki.mailsender.sendHtmlMessage(from, to, null, null, subject, text, text.replaceAll("<[^>]*>",""), []);
    }

}