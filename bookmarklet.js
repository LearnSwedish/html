(function () {
  const id = "takeover-folder-bookmarklet";
  document.getElementById(id)?.remove();

  const icons = {
    folder: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M64 96c-35.3 0-64 28.7-64 64v256c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H267.9c-17 0-33.3-6.7-45.3-18.7L205.3 92c-12-12-28.3-18.7-45.3-18.7H64z"/></svg>',
    hotel: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M0 32C0 14.3 14.3 0 32 0h256c17.7 0 32 14.3 32 32v160h112c44.2 0 80 35.8 80 80v208c0 17.7-14.3 32-32 32s-32-14.3-32-32v-32H64v32c0 17.7-14.3 32-32 32S0 497.7 0 480V32zm64 352h384V272c0-8.8-7.2-16-16-16H320v128h-64V256H64v128zM96 64v64h64V64H96zm128 0v64h64V64h-64zM96 160v64h64v-64H96zm128 0v64h64v-64h-64z"/></svg>',
    plane: '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64H365.7L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1h-56.2c-10.6 0-18.3-10.2-15.4-20.4L214.9 320H112l-43.2 57.6C62.8 385.6 53.4 390.4 43.4 390.4H16.1c-10.9 0-18.6-10.7-15.2-21.1L37.7 256L.9 142.7c-3.4-10.4 4.3-21.1 15.2-21.1h27.3c10 0 19.4 4.7 25.4 12.8L112 192h102.9L165.8 20.4C162.9 10.2 170.6 0 181.2 0h56.2c11.5 0 22.1 6.2 27.8 16.1L365.7 192h116.6z"/></svg>',
    map: '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M384 476.1l-192-54.9V35.9l192 54.9v385.3zM416 88.7l127.1-50.8C558.9 31.6 576 43.2 576 60.2v334.4c0 9.8-6 18.6-15.1 22.3L416 474.8V88.7zM15.1 95.1L160 37.2v386.1L32.9 474.1C17.1 480.4 0 468.8 0 451.8V117.4c0-9.8 6-18.6 15.1-22.3z"/></svg>',
    taxi: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M135.2 117.4L109.1 192h293.8l-26.1-74.6C372.3 104.3 360 96 346.1 96H165.9c-13.9 0-26.2 8.3-30.7 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32h181.2c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5C496 207.3 512 230.8 512 258v94c0 17.7-14.3 32-32 32h-16v64c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-64H144v64c0 17.7-14.3 32-32 32H80c-17.7 0-32-14.3-32-32v-64H32c-17.7 0-32-14.3-32-32v-94c0-27.2 16-50.7 39.6-61.2zM128 296a40 40 0 1 0-80 0a40 40 0 1 0 80 0zm296 40a40 40 0 1 0 0-80a40 40 0 1 0 0 80z"/></svg>',
    food: '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M416 0c-16 0-128 32-128 176v112c0 35.3 28.7 64 64 64h32v128c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32zM64 16C64 7.2 56.8 0 48 0S32 7.2 32 16v144c0 17.7 14.3 32 32 32v288c0 17.7 14.3 32 32 32s32-14.3 32-32V192c17.7 0 32-14.3 32-32V16c0-8.8-7.2-16-16-16s-16 7.2-16 16v144h-16V16c0-8.8-7.2-16-16-16S80 7.2 80 16v144H64V16z"/></svg>',
    coffee: '<svg viewBox="0 0 640 512"><path fill="currentColor" d="M96 64h384c17.7 0 32 14.3 32 32v16h32c53 0 96 43 96 96s-43 96-96 96h-32v32c0 61.9-50.1 112-112 112H192c-61.9 0-112-50.1-112-112V96c0-17.7 14.3-32 32-32zm416 176h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32v64zM32 480h512c17.7 0 32-14.3 32-32H0c0 17.7 14.3 32 32 32z"/></svg>',
    work: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M184 48h144c4.4 0 8 3.6 8 8v40H176V56c0-4.4 3.6-8 8-8zm-56 8v40H64c-35.3 0-64 28.7-64 64v96h512v-96c0-35.3-28.7-64-64-64h-64V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zm384 232H320v32c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-32H0v128c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V288z"/></svg>',
    calendar: '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48C0 85.5 21.5 64 48 64h48V32c0-17.7 14.3-32 32-32zM0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192z"/></svg>',
  };

  const data = [
    {
        "type": "group",
        "label": "Google",
        "icon": "folder",
        "items": [
            {
                "type": "app",
                "label": "Chrome Notifications Settings",
                "url": "chrome://settings/content/notifications",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Gmail",
                "url": "https://mail.google.com/mail/u/0/?pli=1#inbox",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Account",
                "url": "https://accounts.google.com/ServiceLogin?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&followup=https%3A%2F%2Faccounts.google.com%2FManageAccount#identifier",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Ads Billing",
                "url": "https://ads.google.com/aw/billing/summary?ocid=728552315&ascid=728552315&euid=276346496&__u=7051455104&uscid=728552315&__c=3026990435&authuser=0&subid=se-sv-ha-aw-bk-c-bau%21o3~Cj0KCQjwqKuKBhCxARIsACf4XuEmNioxl4etWawgSm4BSgvUPeQIn9uv2RUQsCxHFgrPhyyR3TaJMiIaAjrrEALw_wcB~115370913036~kwd-94527731~11850094506~486557404026",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Alerts",
                "url": "https://accounts.google.com/ServiceLogin?hl=sv&continue=https://www.google.se/alerts&service=alerts",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Analytics",
                "url": "https://www.google.com/analytics/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Apps Script",
                "url": "https://script.google.com/home",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Books",
                "url": "http://books.google.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Books (Swedish)",
                "url": "https://books.google.com/?hl=sv",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Calendar",
                "url": "http://www.google.com/calendar/render?tab=mc",
                "icon": "calendar"
            },
            {
                "type": "app",
                "label": "Google Campaign URL Builder",
                "url": "https://ga-dev-tools.appspot.com/campaign-url-builder/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Contacts",
                "url": "https://contacts.google.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Custom Search (du_gqqjvbx0)",
                "url": "http://www.google.com/cse/home?cx=011660862191675632273:du_gqqjvbx0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Custom Search (gy_spdgtd0w)",
                "url": "http://www.google.se/cse/home?cx=011660862191675632273:gy_spdgtd0w",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Docs",
                "url": "https://docs.google.com/document/u/0/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Drive",
                "url": "https://drive.google.com/drive/my-drive",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Find My Phone",
                "url": "https://myaccount.google.com/find-your-phone",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Forms",
                "url": "https://docs.google.com/forms/u/0/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Hangouts",
                "url": "https://hangouts.google.com/?&",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Jamboard",
                "url": "https://jamboard.google.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Maps",
                "url": "http://maps.google.se/",
                "icon": "map"
            },
            {
                "type": "app",
                "label": "Google Meet",
                "url": "https://meet.google.com/landing",
                "icon": "calendar"
            },
            {
                "type": "app",
                "label": "Google Messages",
                "url": "https://messages.google.com/web/conversations",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Pay Activity",
                "url": "https://pay.google.com/gp/w/u/1/home/activity?sctid=5239843754942519",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Photos",
                "url": "https://photos.google.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Photos Travel Search",
                "url": "https://photos.google.com/search/_tra_",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Search Console",
                "url": "https://www.google.com/webmasters/tools/home?hl=sv&pli=1",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Sheets",
                "url": "https://docs.google.com/spreadsheets/u/0/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Slides",
                "url": "https://docs.google.com/presentation/u/0/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Street View",
                "url": "https://www.google.com/maps/views/streetview?gl=us",
                "icon": "map"
            },
            {
                "type": "app",
                "label": "Google Translate",
                "url": "http://translate.google.se/#",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google URL Shortener",
                "url": "https://goo.gl/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Local Guides Connect - Street View Gear 360",
                "url": "https://www.localguidesconnect.com/t5/Photography/Street-View-SAMSUNG-GEAR-360-2017/td-p/329767/page/2",
                "icon": "map"
            }
        ]
    },
    {
        "type": "group",
        "label": "Kulturen",
        "icon": "folder",
        "items": [
            {
                "type": "app",
                "label": "#hashtag • Foton och filmklipp på Instagram",
                "url": "https://www.instagram.com/explore/tags/hashtag/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "#kulturenilund hashtagg",
                "url": "https://www.instagram.com/explore/tags/kulturenilund/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": ":: Kulturmiljö",
                "url": "https://www.kulturen.com/kulturmiljo/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": ":: Program",
                "url": "https://www.kulturen.com/program/?&start-date=8%20Dec,%202017&end-date=&intervaro_event_type__select=&filters=kulturen-i-lund-17,andra-besoksmal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": ":: Samlingar",
                "url": "https://www.kulturen.com/samlingar/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": ":: Skola",
                "url": "https://www.kulturen.com/skola/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": ":: Utställningar",
                "url": "https://www.kulturen.com/utstallningar/?&filters=kulturen-i-lund-17,andra-besoksmal,kommande-8,bas-7,tillfallig-6",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "@kulturenilund",
                "url": "https://www.instagram.com/kulturenilund/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "@kulturens_arkeologer",
                "url": "https://www.instagram.com/kulturens_arkeologer/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "@kulturensostarp",
                "url": "https://www.instagram.com/kulturensostarp/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Ads Manager (business.facebook.com)",
                "url": "https://business.facebook.com/adsmanager/manage/campaigns?act=112136915993732&business_id&date=2017-03-27_2019-12-12%2Clifetime",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Ads Manager (facebook.com)",
                "url": "https://www.facebook.com/ads/manager/billing/transactions/?act=112136915993732&pid=p1",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "AI på Kulturen - Ärenden AI-gruppen - Alla objekt",
                "url": "https://kulturen.sharepoint.com/teams/ai/Lists/renden%20AIgruppen/AllItems.aspx?viewid=acdc857f-c67c-4336-8894-836c45d4fd98&env=WebViewList&npsAction=createList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "AI-gruppen",
                "url": "https://kultpub.github.io/site/AI-gruppen.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Alla dokument",
                "url": "https://kulturen.sharepoint.com/sites/ledningsgruppen/Delade%20dokument/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2Fledningsgruppen%2FDelade%20dokument&viewpath=%2Fsites%2Fledningsgruppen%2FDelade%20dokument%2FForms%2FAllItems%2Easpx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Alla inlägg och händelser",
                "url": "https://business.facebook.com/latest/posts/published_posts?asset_id=107978955794&nav_ref=bm_home_redirect",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Alla sidor",
                "url": "https://www.facebook.com/bookmarks/pages?ref_type=logout_gear",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Analytics",
                "url": "https://analytics.google.com/analytics/web/?hl=sv&pli=1#/report/trafficsources-campaigns/a23687185w46352970p46592915/_u.date00=20220401&_u.date01=20220401&explorer-segmentExplorer.segmentId=analytics.campaign&explorer-table.plotKeys=%5B%5D/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Annonscenter",
                "url": "https://www.facebook.com/kulturenilund/ad_center/?refSource=pages_manager_bar",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Annonsplan (kulturen-my.sharepoint.com)",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/Lists/Kommunikationsplan?env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Anslagstavlan - Home",
                "url": "https://kulturen.sharepoint.com/sites/frontinfo",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "ASPX-sida",
                "url": "https://kulturen.sharepoint.com/sites/Intranet/ASPX/Forms/AllItems.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Behörigheter: VP2022",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/user.aspx?obj=%7BDD24716A%2D0500%2D46B3%2D8537%2D02FD3C4B61C5%7D,list&List=%7BDD24716A%2D0500%2D46B3%2D8537%2D02FD3C4B61C5%7D",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Beredningsgruppen",
                "url": "https://kulturen-my.sharepoint.com/personal/onedrive_utstallningsprojekt_kulturen_com/_layouts/15/onedrive.aspx?csf=1&web=1&e=5AOBVc&cid=ddf78295-3012-40ab-a412-25dd06d11f79&FolderCTID=0x012000FB203F96ED691C459C9E428B5A60EC39&id=%2Fpersonal%2Fonedrive_utstallningsprojekt_kulturen_com%2FDocuments%2FUtst%C3%A4llningsprojekt%2FBEREDNINGSGRUPP",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Besöksenkät 2017 – enkät",
                "url": "https://docs.google.com/forms/d/e/1FAIpQLSeCArwQTQ8kmN-BLZkKrqqWLjkFMTbM9PlIA7jyG0Og0QYHDg/viewform",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Besöksenkät 2017 – svar",
                "url": "https://docs.google.com/forms/d/1L0PZXLifMvcinLs9jmC8gRqH4EOtG0NpVgJDB79cSCM/edit#responses",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Besöksstatistik (kultpub.github.io)",
                "url": "https://kultpub.github.io/site/besoksdata.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Besöksstatistik (kulturen.sharepoint.com)",
                "url": "https://kulturen.sharepoint.com/SitePages/Bes%C3%B6ksstatistik.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Betalningar Google Ads",
                "url": "https://ads.google.com/aw/billing/documents?ocid=728552315&billingId=6598839332&euid=276346496&__u=7051455104&uscid=728552315&__c=3026990435&authuser=0&sf=awn&subid=se-sv-ha-aw-bk-c-bau%21o3~CjwKCAiAg6yRBhBNEiwAeVyL0NBl2m4TX32pVtgGFe3QTlUxFr8rkM8C60IK1FHhrMwrC_DChZrwKRoC1loQAvD_BwE~115370913036~kwd-94527731~11850094506~486557404023",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Betalningar kontot",
                "url": "https://pay.google.com/gp/w/u/1/home/activity?sctid=5239843754942519",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Billing history | MailChimp",
                "url": "https://us10.admin.mailchimp.com/account/billing-history/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Bosjöklosters mölla (facebook.com)",
                "url": "https://www.facebook.com/Bosj%C3%B6klosters-m%C3%B6lla-1167610603303293/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Bosjöklosters mölla (facebook.com) 2",
                "url": "https://www.facebook.com/pg/Bosj%C3%B6klosters-m%C3%B6lla-1167610603303293/reviews/?ref=page_internal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Bosjöklosters mölla (kulturen.com)",
                "url": "https://www.kulturen.com/vara-besoksmal/bosjoklosters-molla/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Bosjöklosters mölla (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g1026486-d11732250-Bosjokloster_Post_Mill-Hoor_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Butiksförsäljning",
                "url": "https://kultpub.github.io/site/butiksforsaljning.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Carlotta - Inloggning",
                "url": "https://carl.kulturen.com/web/signon",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Creator Studio - alla inlägg",
                "url": "https://business.facebook.com/creatorstudio/?mode=facebook&content_table=POSTED_POSTS&post_status=ALL&tab=content_posts&post_type=ALL&collection_id=free_form_collection",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Dagsrapporter",
                "url": "https://kultpub.github.io/site/dagsrapporter.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Dashboard // Twitonomy",
                "url": "http://www.twitonomy.com/dashboard.php",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Digitala skärmarna",
                "url": "https://butikstv.centrumkanalen.com/status",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Digitalt bibliotek",
                "url": "https://kulturen-my.sharepoint.com/my?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FKommunikation%2FDigitalt%20bibliotek&sortField=LinkFilename&isAscending=true&login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Digitalt bibliotek | Kulturen",
                "url": "https://www.kulturen.com/digitalt-bibliotek/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Digitalt bibliotek – OneDrive",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fpersonal%2Fjohan%5Fhofvendahl%5Fkulturen%5Fcom%2FDocuments%2FKommunikation%2FDigitalt%20bibliotek&view=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "E-postsignatur",
                "url": "https://kulturen.sharepoint.com/SiteAssets/Forms/AllItems.aspx?id=%2FSiteAssets%2FSitePages%2FE%2Dpostsignatur&viewid=c063134a%2D207b%2D411e%2Dbe7f%2Dade24ccf0150",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Eco-Visio",
                "url": "https://www.eco-visio.net/Ecovisio/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Entréintäkter",
                "url": "https://kultpub.github.io/site/entreintakter.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Evensi - Events for me",
                "url": "https://www.evensi.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Eventbrite - Discover Great Events or Create Your Own & Sell Tickets",
                "url": "https://www.eventbrite.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Excel | Microsoft 365",
                "url": "https://www.office.com/launch/excel?auth=2",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Facebook",
                "url": "https://www.facebook.com/kulturenilund/insights/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Favoriter",
                "url": "https://kulturen-my.sharepoint.com/favorites?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "FB Kulturen i Lund",
                "url": "https://www.facebook.com/kulturenilund/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Flex HRM",
                "url": "https://connect.visma.com/?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DE380D68D-E8F6-4BFB-8F01-115F6654EB45%26redirect_uri%3Dhttps%253A%252F%252Fweb.flexhrm.com%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access%26code_challenge%3DrsPEAeLgtMsPA33sdnPRIsmaBUb2oU0a_-wUoQ5Wi9g%26code_challenge_method%3DS256%26response_mode%3Dform_post%26nonce%3D639002754046093452.YTM3MDM2ODQtZmUwMC00MWY1LWJkMmQtY2NjMTNmMjU2NmZhMGE4MTQxNGUtNjY3ZC00ZTg1LWEwNmQtNjdhOGUzOTY4ZjVj%26state%3DCfDJ8LdLShhL2PxBtuiCq_pW5Te0aHsuAmbBXYnB0EqNEayTCAxnnRl0FfrRUTd-uOp0BrXbPyol9-lbhajAjOPKNf1mG3acZdsOJWT63kLPv0iFGqrcMu4Wfza0P97_Mn6lIZISXnBe1CUhYQQauq0OREaOYBhx7Q2Mi4ZQ5LmFSj3DRSfkXBLBv-BVpic5NigoGqbxyQhK1ayFZT0hgNZTbRsZUwntcxaSzJqg2vUR9XhLsADu-Q6nN7YsJszKUcbPbasTs11GGh8q_8ySraYSb2ZBnAECVMxfYKUUfQBYnmAKjxuYUrB2LykVPgI_f77DHaXD9disuozleSyydVgoJzhRx7tE6IWVT14L-ni4oB08cSA4YrxhcpahIpNGaJKc0Q%26x-client-SKU%3DID_NET8_0%26x-client-ver%3D8.3.1.0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Forms",
                "url": "https://www.office.com/launch/forms?auth=2",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Forskning – webbsida på SharePoint",
                "url": "https://kulturen.sharepoint.com/sites/forskning",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Forskningsgruppen",
                "url": "https://kultpub.github.io/site/forskning-at-kulturen.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Fortnox",
                "url": "https://apps.fortnox.se/fs/fs/login.php",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Foursquare | Kulturen in Lund",
                "url": "https://foursquare.com/login?continue=%2F&clicked=true",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Free instagram stats and analytics from Socialbakers",
                "url": "https://www.socialbakers.com/free-tools/tracker/result/57d16e8b0838e0066f285c70",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Friluftsmuseet",
                "url": "https://www.kulturen.com/vara-besoksmal/kulturen-i-lund/friluftsmuseet/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Förköp passerade evenemang",
                "url": "https://www.kulturen.com/wp-admin/edit.php?post_status=passed&post_type=intervaro_event&tribe-has-tickets=1&paged=1",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "GDPR på Kulturen",
                "url": "https://kulturen.sharepoint.com/SiteAssets/Forms/AllItems.aspx?id=%2FSiteAssets%2FSitePages%2FGDPR%5FKulturen&viewid=c063134a%2D207b%2D411e%2Dbe7f%2Dade24ccf0150",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "GitHub - kultpub/site",
                "url": "https://github.com/kultpub/site",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google Analytics",
                "url": "https://www.google.com/analytics/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Google My Business Insights",
                "url": "https://business.google.com/u/0/b/105688949148197464468/insights/l/17375422537590453010?hl=sv",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Guide Lund",
                "url": "https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fapi.helsingborg.se%2Fevent%2Fwp-admin%2Fedit.php%3Fpost_type%3Dguide&data=01%7C01%7Cmaria.bohlin%40kulturen.com%7C8722d60c43e341f2abcf08d86f89ecad%7C0754340e08ad4b00b7d4e3148b26cca5%7C0&sdata=4ooDxe3l0DAyYqpkbXTGXG4k51g5UxGyyCeKlUgaG9M%3D&reserved=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Gör Quiz",
                "url": "https://app.involve.me/projects",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hitta Facebook-ID",
                "url": "https://findmyfbid.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hubben – Planner",
                "url": "https://tasks.office.com/kulturen.com/sv-SE/Home/Planner/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hämtade filer",
                "url": "https://kulturen-my.sharepoint.com/my?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FDownloads&login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hämtningar - OneDrive",
                "url": "https://kulturen-my.sharepoint.com/my?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FDownloads&viewid=2a95014d-605e-48d8-b73c-c98a4858538e",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Händer på Kulturen",
                "url": "https://kulturen.sharepoint.com/Lists/Kalender/PersonalViews.aspx?PageView=Personal&ShowWebPart={0344FC77-34E5-49F0-B6B7-EE1E91D93779}",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hökeriet (facebook.com)",
                "url": "https://www.facebook.com/H%C3%B6keriet-1757654967827369/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hökeriet (facebook.com) 2",
                "url": "https://www.facebook.com/pg/H%C3%B6keriet-1757654967827369/reviews/?ref=page_internal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hökeriet (kulturen.com)",
                "url": "https://www.kulturen.com/vara-besoksmal/hokeriet/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hökeriet (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g189838-d9997849-Hokeriet-Lund_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Inloggning Flex HRM",
                "url": "https://kulturen.flexhosting.se/HRM/Login?SSO=false",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Inrapportering besöksstatistik",
                "url": "https://kulturen.sharepoint.com/Lists/Inrapportering%20besksstatistik/AllItems.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Instagram (gabstats.com)",
                "url": "http://gabstats.com/#/user?date.from=1448924400000&date.to=1480546800000",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Instagram (instagram.com)",
                "url": "https://www.instagram.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Instruktion: Process Årsbok",
                "url": "https://kultpub.github.io/site/process-arsbok.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Inställningar för lista",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/listedit.aspx?List=%7Bdd24716a-0500-46b3-8537-02fd3c4b61c5%7D",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "ISSUU",
                "url": "https://issuu.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "kalender.ystadsallehanda.se/add/",
                "url": "http://kalender.ystadsallehanda.se/add/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "karlin",
                "url": "https://archive.org/stream/arkivfrnordiskf08unkngoog/arkivfrnordiskf08unkngoog_djvu.txt",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Klang AI AB Fakturering",
                "url": "https://billing.stripe.com/p/session/live_YWNjdF8xTWhzc2RCVDhQa3l0YVQ2LF9UOWY2R1Y0MEN1dm1iV0xCNXFJNkFvWjFPNXdHN2VO0100tzRavGbM",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Klicka på t.ex. \"Direktsvar\" för att ändra",
                "url": "https://www.facebook.com/kulturenilund/automated_responses/away_message/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kommunikation",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FKommunikation",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Krisgruppen",
                "url": "https://kulturen.sharepoint.com/teams/krisgruppen/Delade%20dokument/Forms/AllItems.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen (facebook.com)",
                "url": "https://www.facebook.com/kulturenilund/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen (facebook.com) 2",
                "url": "https://www.facebook.com/pg/kulturenilund/reviews/?ref=page_internal#",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund (business.google.com)",
                "url": "https://business.google.com/posts/l/17375422537590453010?hl=sv",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund (kulturen.com)",
                "url": "https://www.kulturen.com/vara-besoksmal/kulturen-i-lund/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g189838-d267409-Kulturen_in_Lund_Museum_of_Cultural_History_and_Open_Air_Museum-Lund_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund - verksamhetsbesök",
                "url": "https://apps.moreflo.com/report/Default.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund – Messenger",
                "url": "https://www.facebook.com/kulturenilund/inbox",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund: Besöksmål",
                "url": "https://www.kulturen.com/wp-admin/post.php?post=24883905&action=edit",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund: Startsida",
                "url": "https://www.kulturen.com/wp-admin/admin.php?page=int_options&tab=opt-tab-int_opening_hours_kulturen_i_lund",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund: Öppettider",
                "url": "https://www.kulturen.com/wp-admin/post.php?post=24876158&action=edit",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "kulturenilund Stacks - Issuu (issuu.com)",
                "url": "https://issuu.com/kulturenilund/stacks",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens klassifikationer i Carlotta",
                "url": "https://kulturen.sharepoint.com/ASPX/klassifikation.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens årsbok",
                "url": "https://kulturen-my.sharepoint.com/shared?id=%2Fsites%2Farsbok%2FDelade%20dokument&listurl=https%3A%2F%2Fkulturen%2Esharepoint%2Ecom%2Fsites%2Farsbok%2FDelade%20dokument",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens årsbok - 2025 - Alla dokument",
                "url": "https://kulturen.sharepoint.com/sites/arsbok/Delade%20dokument/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2Farsbok%2FDelade%20dokument&viewpath=%2Fsites%2Farsbok%2FDelade%20dokument%2FForms%2FAllItems%2Easpx&id=%2Fsites%2Farsbok%2FDelade%20dokument%2F2025&viewid=449972a6%2Dd655%2D4a50%2Daf7f%2D9261352c39e8",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens årsbok - Startsida",
                "url": "https://kulturen.sharepoint.com/sites/arsbok",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens Östarp (facebook.com)",
                "url": "https://www.facebook.com/kulturensostarp/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens Östarp (facebook.com) 2",
                "url": "https://www.facebook.com/pg/kulturensostarp/reviews/?ref=page_internal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens Östarp (kulturen.com)",
                "url": "https://www.kulturen.com/vara-besoksmal/kulturens-ostarp/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Kulturens Östarp (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g1954093-d11702192-Kulturen_s_Ostarp-Blentarp_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Ladda ner / upp BESÖKSSTATISTIK.xlsm",
                "url": "https://kulturen.sharepoint.com/ASPX/Forms/AllItems.aspx?id=%2FASPX%2FBes%C3%B6ksstatistik&viewid=83506c63-6013-44a7-a3e7-e369c389b085",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Landningssida",
                "url": "https://www.kulturen.com/vara-besoksmal/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Ledningsgruppen",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fsites%2Fledningsgruppen%2FDelade%20dokument&listurl=https%3A%2F%2Fkulturen%2Esharepoint%2Ecom%2Fsites%2Fledningsgruppen%2FDelade%20dokument&view=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Ledningsgruppen - alla dokument",
                "url": "https://kulturen.sharepoint.com/sites/ledningsgruppen/SitePages/EventPlanHome.aspx?env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "LinkedIn Analys",
                "url": "https://www.linkedin.com/company/kulturen/analytics?trk=top_nav_analytics",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Linking - Twingly BRM",
                "url": "https://app.twingly.com/linking?siteUuid=95b05b73-c084-4553-9691-831b1a85ad55&range=2014-09-09:2015-09-09",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Lista och Summering",
                "url": "https://kulturen.sharepoint.com/:x:/r/sites/ledningsgruppen/_layouts/15/Doc.aspx?sourcedoc=%7B1396CDF5-F7CD-4EFC-8A46-E71B9E0C8494%7D&file=VP2022%20visual.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&login_hint=johan.hofvendahl%40kulturen.com&ct=1664278944475&wdOrigin=OFFICECOM-WEB.START.EDGEWORTH&cid=37f4bca3-dcc8-4ada-9162-ebb13aa3b52d",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Lista – forskningsaktiviteter",
                "url": "https://kulturen.sharepoint.com/sites/forskning/Lists/Forskning%20Kulturen/AllItems.aspx?env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Listor",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/Lists.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Livets museum (facebook.com)",
                "url": "https://www.facebook.com/livetsmuseum/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Livets museum (facebook.com) 2",
                "url": "https://www.facebook.com/pg/livetsmuseum/reviews/?ref=page_internal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Livets museum (kulturen.com)",
                "url": "https://www.kulturen.com/vara-besoksmal/livets-museum/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Livets museum (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g189838-d9984402-The_Museum_of_Life-Lund_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Livets museum (wordpress.com)",
                "url": "https://wordpress.com/stats/month/livetsmuseum.wordpress.com",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Local Guides Connect",
                "url": "https://www.localguidesconnect.com/?lang=sv&link_loc=cta",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Log In - QR.io",
                "url": "https://qr.io/login",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Logga in",
                "url": "https://www.office.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Logga in på ditt konto",
                "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid+profile&state=OpenIdConnect.AuthenticationProperties%3duFR23XHaXCl0ZEOotMQgwhZGt3QrbPjlnEzMv6N_Ky5JbMsmDtlqnLmq8gkesA3ExQV6Ki8h55inFhCGfzgAhGB9yN6wtBp7Mtfdm7JR34g3lReWef6tuDDH1tIHZv3lKpKIj50y78-64YKq6bpX6WQOh-UVXwevbXawREmNHAE&nonce=636626195932552075.MmYxMTUyNTAtNjhmZi00ZTYzLTg1MmQtOTY5YmM1YWRjYTViMGI3ZDVmNzUtMWNiOC00NzU3LWEyMGMtOGU0NmI5NzAxMTQ2&redirect_uri=https%3a%2f%2fportal.office.com%2flanding&ui_locales=sv-SE&mkt=sv-SE&client-request-id=fa18ecf7-fd23-41ca-8f73-26c3f37e3679&sso_reload=true",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Logotyp och typsnitt",
                "url": "https://kulturen.sharepoint.com/SiteAssets/Forms/AllItems.aspx?id=%2FSiteAssets%2FSitePages%2FLogotyp%2Doch%2Dtypsnitt&viewid=c063134a%2D207b%2D411e%2Dbe7f%2Dade24ccf0150",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Lunds evenemangskalender - Hoodin",
                "url": "https://cc.hoodin.com/login",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Läs mer-knapp på FB-sidan Kulturen",
                "url": "https://www.kulturen.com/fbstart/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Mailchimp | Nyhetsbrev",
                "url": "https://login.mailchimp.com/?_ga=1.197779503.1029677756.1427873869",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Mallar till Office och skyltar",
                "url": "https://kulturen.sharepoint.com/SiteAssets/Forms/AllItems.aspx?id=%2FSiteAssets%2FSitePages%2FMallar%2Dtill%2DOffice%2Doch%2Dskyltar&viewid=c063134a%2D207b%2D411e%2Dbe7f%2Dade24ccf0150",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Maps Connect",
                "url": "https://mapsconnect.apple.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Mediabanken",
                "url": "https://kulturen-my.sharepoint.com/personal/kulturen_kommunikation_kulturen_com/_layouts/15/onedrive.aspx?csf=1&web=1&e=QVGZMR&cid=74bdf475-be35-4c20-b4ab-3703b0c9a426&id=%2fpersonal%2fkulturen_kommunikation_kulturen_com%2fDocuments%2fMediabank&FolderCTID=0x0120004BD11A2D1BDC3A49BB25CA5A3C2B1E65",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Medicinhistoriska museet i Helsingborg",
                "url": "https://www.facebook.com/medmuseet/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Medicin­historiska museet",
                "url": "https://www.kulturen.com/vara-besoksmal/medicinhistoriska-museet/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Medmuseet (facebook.com)",
                "url": "https://www.facebook.com/pg/medmuseet/reviews/?ref=page_internal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Medmuseet (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g189836-d11732249-The_Museum_of_Medical_History-Helsingborg_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Meta Business Suite",
                "url": "https://business.facebook.com/latest/home?nav_ref=bm_home_redirect&asset_id=107978955794",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Min jobb-OneDrive",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Min privata OneDrive",
                "url": "https://onedrive.live.com/?id=root&cid=99D047043D1DC47A",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Musikföremål",
                "url": "https://kultpub.github.io/site/musik-index.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Månadens besök",
                "url": "https://kultpub.github.io/site/reg-manad.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Nordens äldsta författarmuseum :: Tegnérmuseet",
                "url": "https://tegnermuseet.webnode.se/nordens-aldsta-forfattarmuseum/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Nordenstedtska seminariet",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FKommunikation%2FNordenstedtska%20seminariet&view=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Norlindmuseet (facebook.com)",
                "url": "https://www.facebook.com/Norlindmuseet-636402093199869/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Norlindmuseet (facebook.com) 2",
                "url": "https://www.facebook.com/pg/Norlindmuseet-636402093199869/reviews/?ref=page_internal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Norlindmuseet (kulturen.com)",
                "url": "https://www.kulturen.com/vara-besoksmal/norlindmuseet/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Norlindmuseet (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g3576623-d11726734-Norlindmuseet-Bjarred_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Notified",
                "url": "https://go.notified.com/login",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Nyhetscenter – alla objekt",
                "url": "https://kulturen.sharepoint.com/sites/Nyhetscenter/SitePages/Forms/CreatedByMe.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "OBJCDE-lista",
                "url": "https://kultpub.github.io/site/klassifikation.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "OneDrive (kulturen-my.sharepoint.com)",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&view=1",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "OneDrive (kulturen-my.sharepoint.com) 2",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "OpenAI, LLC Fakturering",
                "url": "https://pay.openai.com/p/session/live_YWNjdF8xSE9yU3dDNmgxbnhHb0kzLF9RTUNiWGphN2VTMG5oekFlN1Y4REhDbU5iMXppRGoy0100Ftqyj2gE",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Outlook (outlook.office.com)",
                "url": "https://outlook.office.com/mail/?realm=kulturen.com&login_hint=johan.hofvendahl@kulturen.com",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Outlook (outlook.office.com) 2",
                "url": "https://outlook.office.com/mail/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Outlook (outlook.office365.com)",
                "url": "https://outlook.office365.com/owa/?realm=kulturen.com&exsvurl=1&ll-cc=1053&modurl=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Oxceed",
                "url": "https://portal.oxceed.se/Account/Login?ReturnUrl=%2F",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Personalinformation",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fsites%2Fledningsgruppen%2FDelade%20dokument%2FPersonalinformation&listurl=https%3A%2F%2Fkulturen%2Esharepoint%2Ecom%2Fsites%2Fledningsgruppen%2FDelade%20dokument&viewid=4846e5d6-3859-434e-b4a9-8801750d4ddd&view=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "PhotoStation",
                "url": "https://kult-nas01/photo/#!Albums/album_427967676e61646572/album_427967676e616465722f4b756c747572656e/album_427967676e616465722f4b756c747572656e2f4c696e64666f72736b61206875736574",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Power Automate (emea.flow.microsoft.com)",
                "url": "https://emea.flow.microsoft.com/sv-se/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Power Automate (make.powerautomate.com)",
                "url": "https://make.powerautomate.com/environments/Default-0754340e-08ad-4b00-b7d4-e3148b26cca5/home?auth_upn=johan.hofvendahl%40kulturen.com&utm_source=office&utm_medium=app_launcher&utm_campaign=office_referrals&showFeaturedTemplates=true&fromflowportal=true",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Prenumerationer och tjänster",
                "url": "https://pay.google.com/gp/w/u/1/home/subscriptionsandservices",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Press - Startsida",
                "url": "https://kulturen.sharepoint.com/sites/press",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "ProjektCenter - Startsida",
                "url": "https://kulturen.sharepoint.com/sites/Projektcenter",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Publiceringsverktyget",
                "url": "https://www.facebook.com/kulturenilund/publishing_tools/?section=PUBLISHED_POSTS",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Redigera BESÖKSSTATISTIK.xlsm",
                "url": "https://kulturen.sharepoint.com/:x:/r/_layouts/15/Doc.aspx?sourcedoc=%7B9C1B5404-DC33-432D-8A35-34A9FF5D07A8%7D&file=BES%C3%96KSSTATISTIK.xlsm&action=default&mobileredirect=true",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Registrera dag",
                "url": "https://kultpub.github.io/site/reg-dag.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Senast på nätet om Kulturen",
                "url": "https://5p4rk13.com/display/21563",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Shutterstock",
                "url": "https://www.shutterstock.com/sv/explore/sweden-stock-assets?kw=shutterstock&c3apidt=p15464081770&gclid=Cj0KCQiA9OiPBhCOARIsAI0y71CNQ8hbmCz2RhHHSW_dRoI67XBzSPEGqwPvdAv0_8exLovTS2xoy4waAgtvEALw_wcB&gclsrc=aw.ds",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Skapa tabell",
                "url": "https://kultpub.github.io/site/create-table.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Skolbesök",
                "url": "https://kultpub.github.io/site/skolbesok.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Skrivbordet (kulturen-my.sharepoint.com)",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FSkrivbordet&view=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Skrivbordet (kulturen-my.sharepoint.com) 2",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FSkrivbordet",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Skyltmax",
                "url": "https://skyltmax.se/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Skype",
                "url": "https://web.skype.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Split PDF",
                "url": "https://www.ilovepdf.com/split_pdf",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Spåra förändringar (kulturen.sharepoint.com)",
                "url": "https://kulturen.sharepoint.com/:x:/r/statistik/_layouts/15/doc2.aspx?sourcedoc=%7B17A0F31B-2E2F-40AA-857F-10EDDB0ABBBC%7D&file=Sp%C3%A5ra%20f%C3%B6r%C3%A4ndringar%20i%20SharePoint-lista%20f%C3%B6r%20VP.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&ct=1664260754740&wdOrigin=OFFICECOM-WEB.START.EDGEWORTH&cid=e9c95985-d456-4653-8db3-c2245f51405f",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Spåra förändringar (kulturen.sharepoint.com) 2",
                "url": "https://kulturen.sharepoint.com/:x:/r/statistik/_layouts/15/Doc.aspx?sourcedoc=%7B4D42B490-8DBC-4CAB-A16D-1870B7A24C7C%7D&file=Sp%C3%A5ra%20f%C3%B6r%C3%A4ndringar%20i%20SharePoint-lista%20f%C3%B6r%20VP2023.xlsx&action=default&mobileredirect=true",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Start (kulturen-my.sharepoint.com)",
                "url": "https://kulturen-my.sharepoint.com/my?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Start (kulturen.com)",
                "url": "http://www.kulturen.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Start (kulturen.sharepoint.com)",
                "url": "https://kulturen.sharepoint.com/sites/Intranet",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Statistik",
                "url": "https://www.facebook.com/kulturenilund/insights/?referrer=page_insights_tab_button",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Statistik – OneDrive",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fpersonal%2Fjohan%5Fhofvendahl%5Fkulturen%5Fcom%2FDocuments%2FKommunikation%2FStatistik&view=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Statistik-sidan i Sharepoint",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fstatistik%2FDocuments&listurl=https%3A%2F%2Fkulturen%2Esharepoint%2Ecom%2Fstatistik%2FDocuments",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "StorySpot - Signup",
                "url": "http://app.storyspot.se/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Summering VP2024",
                "url": "https://kultpub.github.io/site/vp2024-summering.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Summering VP2025",
                "url": "https://kultpub.github.io/site/vp2025-summering.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Sunfleet",
                "url": "https://booking1.sunfleet.com/login.aspx?ReturnUrl=%2f",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Sydsvenskans E-tidning",
                "url": "https://account.sydsvenskan.se/login?appId=sydsvenskan.se&lc=sv&callback=https%3A%2F%2Fwww.sydsvenskan.se%2Fauth%3FreturnTo%3D%2Fe-tidningen",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Sök i Mediearkivet",
                "url": "http://web.retriever-info.com.proxy.mah.se/services/archive.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Sök medarbetare på Kulturen",
                "url": "https://kulturen.sharepoint.com/ASPX/medarbetare.aspx",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Tegnérmuseet (facebook.com)",
                "url": "https://www.facebook.com/tegnermuseet/insights/?section=navLikes",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Tegnérmuseet (facebook.com) 2",
                "url": "https://www.facebook.com/pg/tegnermuseet/reviews/?ref=page_internal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Tegnérmuseet (kulturen.com)",
                "url": "https://www.kulturen.com/vara-besoksmal/tegnermuseet/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Tegnérmuseet (tripadvisor.se)",
                "url": "https://www.tripadvisor.se/OwnerResponse-g189838-d9750075-The_Tegner_Museum-Lund_Skane_County.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "TELAVOX",
                "url": "https://home.telavox.se/flowin.jsp",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Tele2-appen",
                "url": "https://tele2vaxel.se/login",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Test events list",
                "url": "https://www.kulturen.com/test-events-list/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Touch&Tell - Enkät",
                "url": "https://docs.google.com/spreadsheets/d/1c4oFptjD_Bc6iexeSolTCP5V7JVslzKoduBl7SskGfA/edit#gid=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Touch&Tell - Var bor du?",
                "url": "https://docs.google.com/spreadsheets/d/190nOWhvLDGOKiHQmGNDI9VD2-DJ3PwnPDlXxbEjZuFY/edit#gid=0",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Touch&Tell Control",
                "url": "http://control.touch-and-tell.se/#/collections",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "TripAdvisor",
                "url": "https://www.tripadvisor.se/Owners",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "TweetDeck",
                "url": "https://tweetdeck.twitter.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Twitter Analytics",
                "url": "https://analytics.twitter.com/user/KultureniLund/tweets",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Twitter Startsida",
                "url": "https://analytics.twitter.com/user/KultureniLund/home",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Utställningslista",
                "url": "https://kultpub.github.io/site/alla-utstallningar.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "VanceAI Image Upscaler | Increase Image Resolution Automatically with AI",
                "url": "https://vanceai.com/increase-resolution/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Verksamhetsplanering",
                "url": "https://kulturen.sharepoint.com/sites/ledningsgruppen/Delade%20dokument/Forms/AllItems.aspx?CT=1764230906972&OR=OWA-NT-Mail&CID=adf04d74-cf90-2b10-8208-3a7737078788&e=5%3A734c5f380d2b422ca33490e5218d2adf&sharingv2=true&fromShare=true&at=9&clickParams=eyJYLUFwcE5hbWUiOiJNaWNyb3NvZnQgT3V0bG9vayBXZWIgQXBwIiwiWC1BcHBWZXJzaW9uIjoiMjAyNTExMTQwMDEuMTkiLCJPUyI6IldpbmRvd3MgMTEifQ%3D%3D&cidOR=Client&FolderCTID=0x012000A7BC43D02B88CF4BA141D42FA2D9A595&id=%2Fsites%2Fledningsgruppen%2FDelade%20dokument%2FVerksamhetsplanering",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "VP2022 (kulturen-my.sharepoint.com)",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/Lists/VP2022/AllItems.aspx?env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "VP2023 (kulturen-my.sharepoint.com)",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/Lists/VP2023/AllItems.aspx?env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "VP2024 (kulturen.sharepoint.com)",
                "url": "https://kulturen.sharepoint.com/sites/ledningsgruppen/Lists/VP2024?viewid=1cb89069%2Dbedc%2D4362%2D8d8b%2De7da856f9e53&env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "VP2025",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/Lists/VP2025/AllItems.aspx?viewid=afde5644-2760-4293-bf46-03cfae17e04e&env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "VP2026",
                "url": "https://kulturen.sharepoint.com/sites/Ledningssystem/Lists/VP2026/AllItems.aspx?env=WebViewList",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Vår historia",
                "url": "https://kulturen.sharepoint.com/SitePages/V%C3%A5r-historia.aspx?web=1",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Winningtemp",
                "url": "https://app.winningtemp.com/Account/Login",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Word | Microsoft 365",
                "url": "https://www.office.com/launch/word?auth=2",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "WordPress Kulturen",
                "url": "http://www.kulturen.com/wp-admin/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Yelp för företagare",
                "url": "https://biz.yelp.se/biz_info/vhbhkumtRJaxRzrwYyFqJQ/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Yelp | Alla besöksmål",
                "url": "https://biz.yelp.com/biz_location_search/view_all/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "YouTube",
                "url": "https://www.youtube.com/analytics?o=U",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "» Adresser",
                "url": "http://www.kulturen.com/kontakta-oss/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "» Personal",
                "url": "http://www.kulturen.com/kontakta-oss/kulturens-personal/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "» Öppettider",
                "url": "https://www.kulturen.com/oppettider/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Öppettider och entré",
                "url": "https://www.kulturen.com/vara-besoksmal/kulturen-i-lund/oppettider-och-entre/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "– – – – – – – – – – (http://www./#.se)",
                "url": "http://www./#.se",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "– – – – – – – – – – (www,)",
                "url": "http://www,/#,se",
                "icon": "work"
            }
        ]
    },
    {
        "type": "group",
        "label": "AI",
        "icon": "folder",
        "items": []
    },
    {
        "type": "group",
        "label": "Socialt",
        "icon": "folder",
        "items": []
    },
    {
        "type": "group",
        "label": "Swedish",
        "icon": "folder",
        "items": []
    }
];

  dedupeItems(data);

  const css = document.createElement("style");
  css.textContent = `
    @keyframes tfFade { from { opacity: 0 } to { opacity: 1 } }
    @keyframes tfCard { from { opacity: 0; transform: scale(.96) translateY(12px) } to { opacity: 1; transform: scale(1) translateY(0) } }
    @keyframes tfPanelIn { from { opacity: 0; transform: scale(.94) translateY(10px) } to { opacity: 1; transform: scale(1) translateY(0) } }
    @keyframes tfX { from { transform: rotate(-90deg) scale(.75); opacity: 0 } to { transform: rotate(0) scale(1); opacity: 1 } }
    #${id} { position: fixed; inset: 0; background: rgba(15,23,42,.48); backdrop-filter: blur(10px); z-index: 2147483647; display: grid; place-items: center; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; animation: tfFade .18s ease-out; }
    #${id} * { box-sizing: border-box; }
    #${id} .tf-card { position: relative; background: linear-gradient(180deg,#ffffff 0%,#f8fafc 100%); color: #172033; width: min(96vw, 980px); height: min(86vh, 760px); overflow: hidden; padding: 36px 38px 34px; border-radius: 28px; text-align: center; border: 1px solid rgba(148,163,184,.34); box-shadow: 0 28px 80px rgba(15,23,42,.34), 0 1px 0 rgba(255,255,255,.9) inset; animation: tfCard .22s cubic-bezier(.2,.8,.2,1); display: flex; flex-direction: column; }
    #${id} .tf-modal-close { position: absolute; right: 20px; top: 18px; width: 36px; height: 36px; border: 1px solid rgba(148,163,184,.28); border-radius: 50%; background: rgba(255,255,255,.86); color: #172033; font-size: 0; line-height: 1; cursor: pointer; box-shadow: 0 10px 24px rgba(15,23,42,.12); animation: tfX .22s ease-out; transition: transform .16s ease, background .16s ease, box-shadow .16s ease; display: grid; place-items: center; padding: 0; }
    #${id} .tf-modal-close:hover { transform: rotate(90deg) scale(1.06); background: #eef6ff; box-shadow: 0 12px 28px rgba(37,99,235,.18); }
    #${id} .tf-roots { display: flex; justify-content: center; align-content: flex-start; gap: 24px; flex-wrap: wrap; margin-top: 26px; flex: 1 1 auto; min-height: 0; overflow: auto; padding: 4px 4px 12px; scrollbar-width: thin; }
    #${id} .tf-root { border: 0; background: transparent; display: grid; justify-items: center; gap: 10px; cursor: pointer; color: #334155; font-size: 13px; font-weight: 650; min-width: 84px; padding: 0; }
    #${id} .tf-icon { width: 66px; height: 66px; border-radius: 20px; background: #2563eb; color: #fff; display: grid; place-items: center; font-size: 26px; transition: transform .16s ease, background .16s ease, box-shadow .16s ease, color .16s ease; }
    #${id} .tf-root .tf-icon { background: linear-gradient(145deg,#ffffff,#eaf2ff); color: #1d4ed8; border: 1px solid rgba(148,163,184,.32); box-shadow: 0 12px 26px rgba(15,23,42,.10), inset 0 1px 0 rgba(255,255,255,.95); }
    #${id} .tf-root:hover .tf-icon, #${id} .tf-app:hover .tf-icon, #${id} .tf-sub:hover .tf-icon { transform: translateY(-3px) scale(1.045); box-shadow: 0 16px 32px rgba(37,99,235,.22); }
    #${id} .tf-root.tf-active .tf-icon { background: linear-gradient(145deg,#2563eb,#0f5fc9); color: #fff; border-color: rgba(37,99,235,.45); }
    #${id} svg { width: 1em; height: 1em; display: block; }
    #${id} .tf-stage { display: none; position: relative; margin: 22px auto 0; width: min(100%, 920px); min-height: 0; flex: 1 1 auto; padding: 18px 2px 4px; border-radius: 0; background: transparent; border: 0; box-shadow: none; animation: tfPanelIn .24s cubic-bezier(.2,.8,.2,1); overflow: hidden; }
    #${id}.tf-open .tf-stage { display: flex; flex-direction: column; }
    #${id}.tf-open .tf-roots { display: none; }
    #${id} .tf-stage-close { position: absolute; right: 2px; top: 14px; width: 36px; height: 36px; border: 1px solid rgba(148,163,184,.28); border-radius: 50%; background: rgba(255,255,255,.9); color: #172033; font-size: 0; line-height: 1; cursor: pointer; box-shadow: 0 10px 24px rgba(15,23,42,.12); animation: tfX .22s ease-out; transition: transform .16s ease, background .16s ease, box-shadow .16s ease; display: grid; place-items: center; padding: 0; }
    #${id} .tf-stage-close:hover { transform: rotate(90deg) scale(1.06); background: #eef6ff; box-shadow: 0 12px 28px rgba(37,99,235,.18); }
    #${id} .tf-modal-close::before, #${id} .tf-modal-close::after, #${id} .tf-stage-close::before, #${id} .tf-stage-close::after { content: ""; position: absolute; width: 14px; height: 2px; border-radius: 999px; background: currentColor; }
    #${id} .tf-modal-close::before, #${id} .tf-stage-close::before { transform: rotate(45deg); }
    #${id} .tf-modal-close::after, #${id} .tf-stage-close::after { transform: rotate(-45deg); }
    #${id} .tf-stage-head { margin: 0 50px 16px; display: grid; gap: 4px; text-align: center; flex: 0 0 auto; }
    #${id} .tf-title { font-weight: 760; font-size: 18px; color: #172033; letter-spacing: 0; }
    #${id} .tf-count { font-size: 12px; color: #64748b; font-weight: 650; }
    #${id} .tf-search { width: min(100%, 420px); height: 40px; margin: 0 auto 20px; padding: 0 14px; border-radius: 999px; border: 1px solid rgba(148,163,184,.36); background: rgba(255,255,255,.9); color: #172033; outline: 0; font: inherit; font-size: 13px; box-shadow: 0 8px 20px rgba(15,23,42,.06); }
    #${id} .tf-search:focus { border-color: rgba(37,99,235,.56); box-shadow: 0 0 0 4px rgba(37,99,235,.10), 0 8px 20px rgba(15,23,42,.06); }
    #${id} .tf-global-search { width: min(100%, 520px); height: 44px; margin: 22px auto 0; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(148,163,184,.40); background: rgba(255,255,255,.94); color: #172033; outline: 0; font: inherit; font-size: 14px; box-shadow: 0 10px 24px rgba(15,23,42,.07); flex: 0 0 auto; }
    #${id} .tf-global-search:focus { border-color: rgba(37,99,235,.58); box-shadow: 0 0 0 4px rgba(37,99,235,.11), 0 10px 24px rgba(15,23,42,.07); }
    #${id} .tf-results { display: none; margin: 24px auto 0; width: min(100%, 860px); flex: 1 1 auto; min-height: 0; overflow: auto; padding: 4px 6px 12px; text-align: left; scrollbar-width: thin; }
    #${id}.tf-searching .tf-roots, #${id}.tf-searching .tf-stage { display: none; }
    #${id}.tf-searching .tf-results { display: block; }
    #${id} .tf-result-section { margin: 0 0 22px; }
    #${id} .tf-result-path { margin: 0 0 12px; color: #64748b; font-size: 12px; font-weight: 760; text-align: left; }
    #${id} .tf-result-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 18px 16px; }
    #${id} .tf-result-app, #${id} .tf-result-group { border: 0; background: transparent; color: #334155; display: grid; justify-items: center; gap: 9px; cursor: pointer; font-size: 12px; font-weight: 620; min-width: 0; padding: 0; text-align: center; }
    #${id} .tf-result-group .tf-icon { background: linear-gradient(145deg,#ffffff,#eaf2ff); color: #1d4ed8; border: 1px solid rgba(148,163,184,.32); }
    #${id} .tf-result-app:hover .tf-icon, #${id} .tf-result-group:hover .tf-icon { transform: translateY(-3px) scale(1.045); box-shadow: 0 16px 32px rgba(37,99,235,.22); }
    #${id} .tf-result-url { max-width: 92px; color: #64748b; font-size: 10px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #${id} .tf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; align-items: start; overflow: auto; padding: 4px 6px 10px; scrollbar-width: thin; flex: 1 1 auto; min-height: 0; }
    #${id} .tf-empty { display: none; margin: auto; color: #64748b; font-size: 13px; font-weight: 650; }
    #${id} .tf-empty.tf-show { display: block; }
    #${id} .tf-app, #${id} .tf-sub { border: 0; background: transparent; color: #334155; display: grid; justify-items: center; gap: 9px; cursor: pointer; font-size: 12px; font-weight: 620; min-width: 0; padding: 0; }
    #${id} .tf-stage .tf-app, #${id} .tf-stage .tf-sub { grid-template-columns: 42px minmax(0,1fr); justify-items: start; align-items: center; gap: 12px; width: 100%; min-height: 62px; padding: 10px 12px; border-radius: 16px; border: 1px solid rgba(148,163,184,.22); background: rgba(255,255,255,.76); text-align: left; box-shadow: 0 8px 18px rgba(15,23,42,.05); }
    #${id} .tf-stage .tf-icon { width: 42px; height: 42px; border-radius: 13px; font-size: 18px; }
    #${id} .tf-stage .tf-label { max-width: none; width: 100%; }
    #${id} .tf-sub .tf-icon { background: linear-gradient(145deg,#ffffff,#eaf2ff); color: #1d4ed8; border: 1px solid rgba(148,163,184,.32); }
    #${id} .tf-label { max-width: 86px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: 0; }
    @media (max-width: 720px) { #${id} .tf-card { width: 96vw; height: 86vh; padding: 34px 22px 24px; border-radius: 24px; } #${id} .tf-roots { gap: 18px; } #${id} .tf-stage { padding-left: 0; padding-right: 0; } #${id} .tf-grid { grid-template-columns: 1fr; } #${id} .tf-stage-head { margin-left: 42px; margin-right: 42px; } }
    @media (max-width: 520px) { #${id} .tf-card { height: 88vh; padding: 32px 18px 22px; border-radius: 22px; } #${id} .tf-icon { width: 60px; height: 60px; border-radius: 18px; } #${id} .tf-stage .tf-icon { width: 42px; height: 42px; border-radius: 13px; } }
  `;
  document.head.appendChild(css);

  let path = [];
  let stage;

  function normalizeUrl(value) {
    try {
      const url = new URL(value);
      url.hash = "";
      url.hostname = url.hostname.replace(/^www\./, "").toLowerCase();
      url.pathname = url.pathname.replace(/\/+$/, "");
      return url.toString().toLowerCase();
    } catch {
      return normalizeSearch(value);
    }
  }

  function dedupeItems(items, seenApps = { labels: new Set(), urls: new Set() }) {
    const groupLabels = new Set();

    for (let index = items.length - 1; index >= 0; index -= 1) {
      const item = items[index];

      if (item.type === "group") {
        const groupKey = normalizeSearch(item.label);
        if (groupKey && groupLabels.has(groupKey)) {
          items.splice(index, 1);
          continue;
        }
        groupLabels.add(groupKey);
        dedupeItems(item.items || [], seenApps);
        continue;
      }

      const labelKey = normalizeSearch(item.label);
      const urlKey = normalizeUrl(item.url);
      if ((labelKey && seenApps.labels.has(labelKey)) || (urlKey && seenApps.urls.has(urlKey))) {
        items.splice(index, 1);
        continue;
      }
      if (labelKey) seenApps.labels.add(labelKey);
      if (urlKey) seenApps.urls.add(urlKey);
    }
  }

  function getNode() {
    let list = data;
    let node = null;
    for (const index of path) {
      node = list[index];
      list = node.items || [];
    }
    return node;
  }

  function currentItems() {
    return getNode()?.items || [];
  }

  function normalizeSearch(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function escapeAttr(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function searchText(item) {
    if (item.type === "group") return item.label || "";
    return `${item.label || ""} ${item.url || ""}`;
  }

  function hostLabel(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url || "";
    }
  }

  function termsFrom(query) {
    return normalizeSearch(query).split(/\s+/).filter(Boolean);
  }

  function matchesTerms(value, terms) {
    const haystack = normalizeSearch(value);
    return terms.every((term) => haystack.includes(term));
  }

  function collectSearchResults(items, terms, parentPath = [], parentLabels = [], results = []) {
    items.forEach((item, index) => {
      const itemPath = [...parentPath, index];
      if (item.type === "group") {
        if (matchesTerms(item.label, terms)) {
          results.push({ type: "group", item, path: itemPath, parentLabels });
        }
        collectSearchResults(item.items || [], terms, itemPath, [...parentLabels, item.label], results);
        return;
      }

      if (matchesTerms(`${item.label || ""} ${item.url || ""}`, terms)) {
        results.push({ type: "app", item, path: itemPath, parentPath, parentLabels });
      }
    });
    return results;
  }

  function pathKey(labels) {
    return labels.length ? labels.join(" / ") : "Huvudniv\u00e5";
  }

  function setActiveRoot() {
    modal.querySelectorAll(".tf-root").forEach((button) => {
      button.classList.toggle("tf-active", Number(button.dataset.index) === path[0]);
    });
  }

  function openPath(nextPath) {
    path = nextPath;
    modal.classList.add("tf-open");
    modal.classList.remove("tf-searching");
    const globalSearch = modal.querySelector(".tf-global-search");
    if (globalSearch) globalSearch.value = "";
    setActiveRoot();
    renderStage();
  }

  function renderGlobalResults(query) {
    const resultsNode = modal.querySelector(".tf-results");
    const terms = termsFrom(query);

    if (!terms.length) {
      modal.classList.remove("tf-searching");
      resultsNode.innerHTML = "";
      return;
    }

    modal.classList.add("tf-searching");
    const results = collectSearchResults(data, terms);

    if (!results.length) {
      resultsNode.innerHTML = '<div class="tf-empty tf-show">Inga tr\u00e4ffar</div>';
      return;
    }

    const groupMatches = results.filter((result) => result.type === "group");
    const appMatches = results.filter((result) => result.type === "app");
    const appSections = new Map();

    appMatches.forEach((result) => {
      const key = pathKey(result.parentLabels);
      if (!appSections.has(key)) appSections.set(key, []);
      appSections.get(key).push(result);
    });

    const groupSection = groupMatches.length ? `
      <div class="tf-result-section">
        <div class="tf-result-path">Grupper</div>
        <div class="tf-result-grid">
          ${groupMatches.map(({ item, path: itemPath }) => `<button class="tf-result-group" data-path="${itemPath.join(",")}" title="${escapeAttr(item.label)}"><span class="tf-icon">${icons[item.icon] || icons.folder}</span><span class="tf-label">${escapeHtml(item.label)}</span></button>`).join("")}
        </div>
      </div>
    ` : "";

    const appSectionsHtml = [...appSections.entries()].map(([label, entries]) => `
      <div class="tf-result-section">
        <div class="tf-result-path">${escapeHtml(label)}</div>
        <div class="tf-result-grid">
          ${entries.map(({ item }) => `<button class="tf-result-app" data-url="${escapeAttr(item.url)}" title="${escapeAttr(item.label)}"><span class="tf-icon">${icons[item.icon] || icons.folder}</span><span class="tf-label">${escapeHtml(item.label)}</span><span class="tf-result-url">${escapeHtml(hostLabel(item.url))}</span></button>`).join("")}
        </div>
      </div>
    `).join("");

    resultsNode.innerHTML = groupSection + appSectionsHtml;
  }

  function filterStage(query) {
    const terms = termsFrom(query);
    const tiles = [...stage.querySelectorAll(".tf-app, .tf-sub")];
    let visible = 0;

    tiles.forEach((tile) => {
      const haystack = tile.dataset.search || "";
      const match = !terms.length || terms.every((term) => haystack.includes(term));
      tile.hidden = !match;
      if (match) visible += 1;
    });

    const count = stage.querySelector(".tf-visible-count");
    if (count) count.textContent = String(visible);

    const empty = stage.querySelector(".tf-empty");
    if (empty) empty.classList.toggle("tf-show", visible === 0);
  }

  function renderStage() {
    const node = getNode();
    const items = currentItems();
    stage.innerHTML = `
      <button class="tf-stage-close" title="St\u00e4ng">&times;</button>
      <div class="tf-stage-head">
        <div class="tf-title">${node?.label || ""}</div>
        <div class="tf-count"><span class="tf-visible-count">${items.length}</span> av ${items.length} objekt</div>
      </div>
      <div class="tf-grid">
        ${items.map((item, index) => {
          const icon = icons[item.icon] || icons.folder;
          const search = escapeAttr(normalizeSearch(searchText(item)));
          if (item.type === "group") {
            return `<button class="tf-sub" data-index="${index}" data-search="${search}" title="${item.label}"><span class="tf-icon">${icon}</span><span class="tf-label">${item.label}</span></button>`;
          }
          return `<button class="tf-app" data-url="${item.url}" data-search="${search}" title="${item.label}"><span class="tf-icon">${icon}</span><span class="tf-label">${item.label}</span></button>`;
        }).join("")}
      </div>
      <div class="tf-empty">Inga tr\u00e4ffar i den h\u00e4r gruppen</div>
    `;
  }

  const modal = document.createElement("div");
  modal.id = id;
  modal.innerHTML = `
    <div class="tf-card">
      <button class="tf-modal-close" title="St\u00e4ng">&times;</button>
      <h2 style="margin:6px 0 6px;font-size:18px">Mina genv\u00e4gar</h2>
      <p style="margin:0;color:#555;font-size:15px">\u00d6ppna en grupp eller filtrera allt</p>
      <input class="tf-global-search" type="search" placeholder="Filtrera grupper och URL:er" autocomplete="off">
      <div class="tf-roots">
        ${data.map((group, index) => `<button class="tf-root" data-index="${index}" title="${group.label}"><span class="tf-icon">${icons[group.icon] || icons.folder}</span><span class="tf-label">${group.label}</span></button>`).join("")}
      </div>
      <div class="tf-stage"></div>
      <div class="tf-results"></div>
    </div>
  `;
  document.body.appendChild(modal);
  stage = modal.querySelector(".tf-stage");

  modal.querySelector(".tf-modal-close").onclick = () => modal.remove();

  modal.addEventListener("click", (event) => {
    const root = event.target.closest(".tf-root");
    const sub = event.target.closest(".tf-sub");
    const app = event.target.closest(".tf-app");
    const resultApp = event.target.closest(".tf-result-app");
    const resultGroup = event.target.closest(".tf-result-group");
    const close = event.target.closest(".tf-stage-close");

    if (root) {
      path = [Number(root.dataset.index)];
      modal.classList.add("tf-open");
      setActiveRoot();
      renderStage();
    }

    if (sub) {
      path.push(Number(sub.dataset.index));
      renderStage();
    }

    if (resultGroup) {
      openPath(resultGroup.dataset.path.split(",").map(Number));
    }

    if (close) {
      if (path.length > 1) {
        path.pop();
        renderStage();
      } else {
        path = [];
        modal.classList.remove("tf-open");
        modal.querySelectorAll(".tf-root").forEach((button) => button.classList.remove("tf-active"));
        stage.innerHTML = "";
      }
    }

    if (app) {
      window.open(app.dataset.url, "_blank", "noopener");
    }

    if (resultApp) {
      window.open(resultApp.dataset.url, "_blank", "noopener");
    }
  });

  modal.addEventListener("input", (event) => {
    const search = event.target.closest(".tf-search");
    if (search) filterStage(search.value);

    const globalSearch = event.target.closest(".tf-global-search");
    if (globalSearch) renderGlobalResults(globalSearch.value);
  });
})();
