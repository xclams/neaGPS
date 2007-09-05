package com.xpn.xwiki.render.groovy;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.XWikiException;
import com.xpn.xwiki.doc.XWikiDocument;
import com.xpn.xwiki.doc.XWikiAttachment;

import java.net.URLClassLoader;
import java.net.URL;
import java.net.URLStreamHandlerFactory;
import java.util.List;
import java.util.ArrayList;

/**
 * Copyright 2006,XpertNet SARL,and individual contributors as indicated
 * by the contributors.txt.
 * <p/>
 * This is free software;you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation;either version2.1of
 * the License,or(at your option)any later version.
 * <p/>
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY;without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the GNU
 * Lesser General Public License for more details.
 * <p/>
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software;if not,write to the Free
 * Software Foundation,Inc.,51 Franklin St,Fifth Floor,Boston,MA
 * 02110-1301 USA,or see the FSF site:http://www.fsf.org.
 *
 * @author ldubost
 */

public class XWikiPageClassLoader extends URLClassLoader {

    public XWikiPageClassLoader(URL[] urls, ClassLoader parent) {
        super(urls, parent);
    }

    public XWikiPageClassLoader(URL[] urls) {
        super(urls);
    }

    public XWikiPageClassLoader(URL[] urls, ClassLoader parent, URLStreamHandlerFactory factory) {
        super(urls, parent, factory);
    }

    public XWikiPageClassLoader(String jarWikiPage, XWikiContext context) throws XWikiException {
        this(jarWikiPage, Thread.currentThread().getContextClassLoader(), context);
    }

    public XWikiPageClassLoader(String jarWikiPage, ClassLoader parent, XWikiContext context) throws XWikiException {
        super(new URL[0], parent);
        XWikiDocument doc = context.getWiki().getDocument(jarWikiPage, context);
        List urlList = new ArrayList();
        if (!doc.isNew()) {
            List attachList = doc.getAttachmentList();
            for (int i=0;i<attachList.size();i++) {
                XWikiAttachment attach = (XWikiAttachment) attachList.get(i);
                String filename = attach.getFilename();
                if (filename.endsWith(".jar")) {
                    try{
                        urlList.add(new URL(doc.getExternalAttachmentURL(filename, "download", context)));
                    } catch (Exception e) {};
                }
            }
        }
        if (urlList.size()>0) {
            for (int i=0;i<urlList.size();i++) {
                addURL((URL) urlList.get(i));
            }
        }
    }
}
