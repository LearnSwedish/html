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
                "label": "Chrome: aviseringsinställningar",
                "url": "chrome://settings/content/notifications",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.google.com%2Fchrome%2F"
            },
            {
                "type": "app",
                "label": "Gmail",
                "url": "https://mail.google.com/mail/u/0/?pli=1#inbox",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fmail.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Analytics",
                "url": "https://www.google.com/analytics/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fanalytics.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Apps Script",
                "url": "https://script.google.com/home",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fscript.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google aviseringar",
                "url": "https://accounts.google.com/ServiceLogin?hl=sv&continue=https://www.google.se/alerts&service=alerts",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.google.com%2Falerts"
            },
            {
                "type": "app",
                "label": "Google Böcker",
                "url": "http://books.google.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fbooks.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Böcker på svenska",
                "url": "https://books.google.com/?hl=sv",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fbooks.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Calc",
                "url": "https://docs.google.com/spreadsheets/u/0/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2F"
            },
            {
                "type": "app",
                "label": "Google Dokument",
                "url": "https://docs.google.com/document/u/0/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fdocs.google.com%2Fdocument%2F"
            },
            {
                "type": "app",
                "label": "Google Drive",
                "url": "https://drive.google.com/drive/my-drive",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fdrive.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Formulär",
                "url": "https://docs.google.com/forms/u/0/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fdocs.google.com%2Fforms%2F"
            },
            {
                "type": "app",
                "label": "Google Foto",
                "url": "https://photos.google.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fphotos.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Foto: resesökning",
                "url": "https://photos.google.com/search/_tra_",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fphotos.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Hangouts",
                "url": "https://hangouts.google.com/?&",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fhangouts.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google hitta min telefon",
                "url": "https://myaccount.google.com/find-your-phone",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fmyaccount.google.com%2Ffind-your-phone"
            },
            {
                "type": "app",
                "label": "Google Kalender",
                "url": "http://www.google.com/calendar/render?tab=mc",
                "icon": "calendar",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fcalendar.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google kampanjadressbyggare",
                "url": "https://ga-dev-tools.appspot.com/campaign-url-builder/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fga-dev-tools.google%2Fcampaign-url-builder%2F"
            },
            {
                "type": "app",
                "label": "Google Kartor",
                "url": "http://maps.google.se/",
                "icon": "map",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fmaps.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Keep",
                "url": "https://keep.google.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fkeep.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Kontakter",
                "url": "https://contacts.google.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fcontacts.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Pay: aktivitet",
                "url": "https://pay.google.com/gp/w/u/1/home/activity?sctid=5239843754942519",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fpay.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google Presentationer",
                "url": "https://docs.google.com/presentation/u/0/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fpowerpoint.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "Google Search Console",
                "url": "https://www.google.com/webmasters/tools/home?hl=sv&pli=1",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fsearch.google.com%2Fsearch-console%2F"
            },
            {
                "type": "app",
                "label": "Google Street View",
                "url": "https://www.google.com/maps/views/streetview?gl=us",
                "icon": "map",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.google.com%2Fstreetview%2F"
            },
            {
                "type": "app",
                "label": "Google URL-förkortare",
                "url": "https://goo.gl/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fgoo.gl%2F"
            },
            {
                "type": "app",
                "label": "Google Översätt",
                "url": "http://translate.google.se/#",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Ftranslate.google.com%2F"
            },
            {
                "type": "app",
                "label": "Google-konto",
                "url": "https://accounts.google.com/ServiceLogin?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&followup=https%3A%2F%2Faccounts.google.com%2FManageAccount#identifier",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fmyaccount.google.com%2F"
            },
            {
                "type": "app",
                "label": "Meet",
                "url": "https://meet.google.com/landing",
                "icon": "calendar",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fmeet.google.com%2F"
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
                "label": "Adresser (Kulturen)",
                "url": "http://www.kulturen.com/kontakta-oss/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Alla dokument",
                "url": "https://kulturen.sharepoint.com/sites/ledningsgruppen/Delade%20dokument/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2Fledningsgruppen%2FDelade%20dokument&viewpath=%2Fsites%2Fledningsgruppen%2FDelade%20dokument%2FForms%2FAllItems%2Easpx",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Alla sidor",
                "url": "https://www.facebook.com/bookmarks/pages?ref_type=logout_gear",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.facebook.com%2F"
            },
            {
                "type": "app",
                "label": "Anslagstavlan - Home",
                "url": "https://kulturen.sharepoint.com/sites/frontinfo",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "ASPX-sida",
                "url": "https://kulturen.sharepoint.com/sites/Intranet/ASPX/Forms/AllItems.aspx",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Behörigheter: VP2022",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/user.aspx?obj=%7BDD24716A%2D0500%2D46B3%2D8537%2D02FD3C4B61C5%7D,list&List=%7BDD24716A%2D0500%2D46B3%2D8537%2D02FD3C4B61C5%7D",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Bemanning Diabasen",
                "url": "https://kultpub.github.io/site/diabasen.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Beredningsgruppen",
                "url": "https://kulturen-my.sharepoint.com/personal/onedrive_utstallningsprojekt_kulturen_com/_layouts/15/onedrive.aspx?csf=1&web=1&e=5AOBVc&cid=ddf78295-3012-40ab-a412-25dd06d11f79&FolderCTID=0x012000FB203F96ED691C459C9E428B5A60EC39&id=%2Fpersonal%2Fonedrive_utstallningsprojekt_kulturen_com%2FDocuments%2FUtst%C3%A4llningsprojekt%2FBEREDNINGSGRUPP",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Besöksstatistik",
                "url": "https://kultpub.github.io/site/besoksdata.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Billing history | MailChimp",
                "url": "https://us10.admin.mailchimp.com/account/billing-history/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fmailchimp.com%2F"
            },
            {
                "type": "app",
                "label": "Bosjöklosters mölla",
                "url": "https://www.kulturen.com/vara-besoksmal/bosjoklosters-molla/",
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
                "label": "Dagsrapporter",
                "url": "https://kultpub.github.io/site/dagsrapporter.html",
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
                "label": "E-postsignatur",
                "url": "https://kulturen.sharepoint.com/SiteAssets/Forms/AllItems.aspx?id=%2FSiteAssets%2FSitePages%2FE%2Dpostsignatur&viewid=c063134a%2D207b%2D411e%2Dbe7f%2Dade24ccf0150",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
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
                "label": "Excel | Microsoft 365",
                "url": "https://www.office.com/launch/excel?auth=2",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fexcel.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "Facebook",
                "url": "https://www.facebook.com/kulturenilund/insights/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.facebook.com%2F"
            },
            {
                "type": "app",
                "label": "Favoriter",
                "url": "https://kulturen-my.sharepoint.com/favorites?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "FB Kulturen i Lund",
                "url": "https://www.facebook.com/kulturenilund/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.facebook.com%2F"
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
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft365.com%2F"
            },
            {
                "type": "app",
                "label": "Forskning – webbsida på SharePoint",
                "url": "https://kulturen.sharepoint.com/sites/forskning",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
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
                "label": "Friluftsmuseet",
                "url": "https://www.kulturen.com/vara-besoksmal/kulturen-i-lund/friluftsmuseet/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "GDPR på Kulturen",
                "url": "https://kulturen.sharepoint.com/SiteAssets/Forms/AllItems.aspx?id=%2FSiteAssets%2FSitePages%2FGDPR%5FKulturen&viewid=c063134a%2D207b%2D411e%2Dbe7f%2Dade24ccf0150",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "GitHub - kultpub/site",
                "url": "https://github.com/kultpub/site",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Hämtade filer",
                "url": "https://kulturen-my.sharepoint.com/my?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FDownloads&login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Händer på Kulturen",
                "url": "https://kulturen.sharepoint.com/Lists/Kalender/PersonalViews.aspx?PageView=Personal&ShowWebPart={0344FC77-34E5-49F0-B6B7-EE1E91D93779}",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Hitta Facebook-ID",
                "url": "https://findmyfbid.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.facebook.com%2F"
            },
            {
                "type": "app",
                "label": "Hökeriet",
                "url": "https://www.kulturen.com/vara-besoksmal/hokeriet/",
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
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Instagram",
                "url": "https://www.instagram.com/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Inställningar för lista",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/listedit.aspx?List=%7Bdd24716a-0500-46b3-8537-02fd3c4b61c5%7D",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Instruktion: Process Årsbok",
                "url": "https://kultpub.github.io/site/process-arsbok.html",
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
                "label": "karlin",
                "url": "https://archive.org/stream/arkivfrnordiskf08unkngoog/arkivfrnordiskf08unkngoog_djvu.txt",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fstream.microsoft.com%2F"
            },
            {
                "type": "app",
                "label": "Kommunikation",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FKommunikation",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Kulturen",
                "url": "https://www.facebook.com/kulturenilund/insights/?section=navLikes",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.facebook.com%2F"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund: Besöksmål",
                "url": "https://www.kulturen.com/wp-admin/post.php?post=24883905&action=edit",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwordpress.org%2F"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund: Öppettider",
                "url": "https://www.kulturen.com/wp-admin/post.php?post=24876158&action=edit",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwordpress.org%2F"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund: Startsida",
                "url": "https://www.kulturen.com/wp-admin/admin.php?page=int_options&tab=opt-tab-int_opening_hours_kulturen_i_lund",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwordpress.org%2F"
            },
            {
                "type": "app",
                "label": "Kulturen i Lund - verksamhetsbesök",
                "url": "https://apps.moreflo.com/report/Default.aspx",
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
                "label": "kulturenilund Stacks - Issuu",
                "url": "https://issuu.com/kulturenilund/stacks",
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
                "label": "Kulturens årsbok - Startsida",
                "url": "https://kulturen.sharepoint.com/sites/arsbok",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Kulturens klassifikationer i Carlotta",
                "url": "https://kulturen.sharepoint.com/ASPX/klassifikation.aspx",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Kulturens Östarp",
                "url": "https://www.kulturen.com/vara-besoksmal/kulturens-ostarp/",
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
                "label": "Kulturmiljö på webben",
                "url": "https://www.kulturen.com/kulturmiljo/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Ladda ner / upp BESÖKSSTATISTIK.xlsm",
                "url": "https://kulturen.sharepoint.com/ASPX/Forms/AllItems.aspx?id=%2FASPX%2FBes%C3%B6ksstatistik&viewid=83506c63-6013-44a7-a3e7-e369c389b085",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fexcel.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "Läs mer-knapp på FB-sidan Kulturen",
                "url": "https://www.kulturen.com/fbstart/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Lista – forskningsaktiviteter",
                "url": "https://kulturen.sharepoint.com/sites/forskning/Lists/Forskning%20Kulturen/AllItems.aspx?env=WebViewList",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Lista och Summering",
                "url": "https://kulturen.sharepoint.com/:x:/r/sites/ledningsgruppen/_layouts/15/Doc.aspx?sourcedoc=%7B1396CDF5-F7CD-4EFC-8A46-E71B9E0C8494%7D&file=VP2022%20visual.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&login_hint=johan.hofvendahl%40kulturen.com&ct=1664278944475&wdOrigin=OFFICECOM-WEB.START.EDGEWORTH&cid=37f4bca3-dcc8-4ada-9162-ebb13aa3b52d",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fexcel.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "Listor",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/Lists.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Livets museum",
                "url": "https://www.kulturen.com/vara-besoksmal/livets-museum/",
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
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft365.com%2F"
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
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Mailchimp | Nyhetsbrev",
                "url": "https://login.mailchimp.com/?_ga=1.197779503.1029677756.1427873869",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fmailchimp.com%2F"
            },
            {
                "type": "app",
                "label": "Mallar till Office och skyltar",
                "url": "https://kulturen.sharepoint.com/SiteAssets/Forms/AllItems.aspx?id=%2FSiteAssets%2FSitePages%2FMallar%2Dtill%2DOffice%2Doch%2Dskyltar&viewid=c063134a%2D207b%2D411e%2Dbe7f%2Dade24ccf0150",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Månadens besök",
                "url": "https://kultpub.github.io/site/reg-manad.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Mediabanken",
                "url": "https://kulturen-my.sharepoint.com/personal/kulturen_kommunikation_kulturen_com/_layouts/15/onedrive.aspx?csf=1&web=1&e=QVGZMR&cid=74bdf475-be35-4c20-b4ab-3703b0c9a426&id=%2fpersonal%2fkulturen_kommunikation_kulturen_com%2fDocuments%2fMediabank&FolderCTID=0x0120004BD11A2D1BDC3A49BB25CA5A3C2B1E65",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Meta Business Suite",
                "url": "https://business.facebook.com/latest/home?nav_ref=bm_home_redirect&asset_id=107978955794",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.facebook.com%2F"
            },
            {
                "type": "app",
                "label": "Min jobb-OneDrive",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Min privata OneDrive",
                "url": "https://onedrive.live.com/?id=root&cid=99D047043D1DC47A",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fonedrive.live.com%2F"
            },
            {
                "type": "app",
                "label": "Musikföremål",
                "url": "https://kultpub.github.io/site/musik-index.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Nordenstedtska seminariet",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FKommunikation%2FNordenstedtska%20seminariet&view=0",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Norlindmuseet",
                "url": "https://www.kulturen.com/vara-besoksmal/norlindmuseet/",
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
                "label": "OneDrive",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Öppettider och entré",
                "url": "https://www.kulturen.com/vara-besoksmal/kulturen-i-lund/oppettider-och-entre/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Outlook",
                "url": "https://outlook.office.com/mail/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Foutlook.office.com%2F"
            },
            {
                "type": "app",
                "label": "Outlook Kalender",
                "url": "https://outlook.cloud.microsoft/calendar/view/month",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Foutlook.office.com%2F"
            },
            {
                "type": "app",
                "label": "Personal (Kulturen)",
                "url": "http://www.kulturen.com/kontakta-oss/kulturens-personal/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Personalinformation",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?login_hint=johan%2Ehofvendahl%40kulturen%2Ecom&id=%2Fsites%2Fledningsgruppen%2FDelade%20dokument%2FPersonalinformation&listurl=https%3A%2F%2Fkulturen%2Esharepoint%2Ecom%2Fsites%2Fledningsgruppen%2FDelade%20dokument&viewid=4846e5d6-3859-434e-b4a9-8801750d4ddd&view=0",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "PhotoStation",
                "url": "https://kult-nas01/photo/#!Albums/album_427967676e61646572/album_427967676e616465722f4b756c747572656e/album_427967676e616465722f4b756c747572656e2f4c696e64666f72736b61206875736574",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Power Automate",
                "url": "https://emea.flow.microsoft.com/sv-se/",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "PowerPoint",
                "url": "https://powerpoint.cloud.microsoft/?wdOrigin=DOCUMENTS.SHELL%2CAPPHOME-WEB.UNAUTH%2CAPPHOME-WEB.SHELL.SIGNIN",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fpowerpoint.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "Prenumerationer och tjänster",
                "url": "https://pay.google.com/gp/w/u/1/home/subscriptionsandservices",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Program på webben",
                "url": "https://www.kulturen.com/program/?&start-date=8%20Dec,%202017&end-date=&intervaro_event_type__select=&filters=kulturen-i-lund-17,andra-besoksmal",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "ProjektCenter - Startsida",
                "url": "https://kulturen.sharepoint.com/sites/Projektcenter",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Publiceringsverktyget",
                "url": "https://www.facebook.com/kulturenilund/publishing_tools/?section=PUBLISHED_POSTS",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.facebook.com%2F"
            },
            {
                "type": "app",
                "label": "Redigera BESÖKSSTATISTIK.xlsm",
                "url": "https://kulturen.sharepoint.com/:x:/r/_layouts/15/Doc.aspx?sourcedoc=%7B9C1B5404-DC33-432D-8A35-34A9FF5D07A8%7D&file=BES%C3%96KSSTATISTIK.xlsm&action=default&mobileredirect=true",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fexcel.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "Registrera dag",
                "url": "https://kultpub.github.io/site/reg-dag.html",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Samlingar på webben",
                "url": "https://www.kulturen.com/samlingar/",
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
                "label": "Skola på webben",
                "url": "https://www.kulturen.com/skola/",
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
                "label": "Skrivbordet",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fjohan_hofvendahl_kulturen_com%2FDocuments%2FSkrivbordet",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Skyltmax",
                "url": "https://skyltmax.se/",
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
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Spåra förändringar",
                "url": "https://kulturen.sharepoint.com/:x:/r/statistik/_layouts/15/Doc.aspx?sourcedoc=%7B4D42B490-8DBC-4CAB-A16D-1870B7A24C7C%7D&file=Sp%C3%A5ra%20f%C3%B6r%C3%A4ndringar%20i%20SharePoint-lista%20f%C3%B6r%20VP2023.xlsx&action=default&mobileredirect=true",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fexcel.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "Split PDF",
                "url": "https://www.ilovepdf.com/split_pdf",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Start",
                "url": "http://www.kulturen.com/",
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
                "label": "Sydsvenskans E-tidning",
                "url": "https://account.sydsvenskan.se/login?appId=sydsvenskan.se&lc=sv&callback=https%3A%2F%2Fwww.sydsvenskan.se%2Fauth%3FreturnTo%3D%2Fe-tidningen",
                "icon": "work"
            },
            {
                "type": "app",
                "label": "Tegnérmuseet",
                "url": "https://www.kulturen.com/vara-besoksmal/tegnermuseet/",
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
                "label": "Utställningar på webben",
                "url": "https://www.kulturen.com/utstallningar/?&filters=kulturen-i-lund-17,andra-besoksmal,kommande-8,bas-7,tillfallig-6",
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
                "label": "Vår historia",
                "url": "https://kulturen.sharepoint.com/SitePages/V%C3%A5r-historia.aspx?web=1",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "Verksamhetsplanering",
                "url": "https://kulturen.sharepoint.com/sites/ledningsgruppen/Delade%20dokument/Forms/AllItems.aspx?CT=1764230906972&OR=OWA-NT-Mail&CID=adf04d74-cf90-2b10-8208-3a7737078788&e=5%3A734c5f380d2b422ca33490e5218d2adf&sharingv2=true&fromShare=true&at=9&clickParams=eyJYLUFwcE5hbWUiOiJNaWNyb3NvZnQgT3V0bG9vayBXZWIgQXBwIiwiWC1BcHBWZXJzaW9uIjoiMjAyNTExMTQwMDEuMTkiLCJPUyI6IldpbmRvd3MgMTEifQ%3D%3D&cidOR=Client&FolderCTID=0x012000A7BC43D02B88CF4BA141D42FA2D9A595&id=%2Fsites%2Fledningsgruppen%2FDelade%20dokument%2FVerksamhetsplanering",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "VP2022",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/Lists/VP2022/AllItems.aspx?env=WebViewList",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "VP2023",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/Lists/VP2023/AllItems.aspx?env=WebViewList",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "VP2024",
                "url": "https://kulturen.sharepoint.com/sites/ledningsgruppen/Lists/VP2024?viewid=1cb89069%2Dbedc%2D4362%2D8d8b%2De7da856f9e53&env=WebViewList",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "VP2025",
                "url": "https://kulturen-my.sharepoint.com/personal/johan_hofvendahl_kulturen_com/Lists/VP2025/AllItems.aspx?viewid=afde5644-2760-4293-bf46-03cfae17e04e&env=WebViewList",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "VP2026",
                "url": "https://kulturen.sharepoint.com/sites/Ledningssystem/Lists/VP2026/AllItems.aspx?env=WebViewList",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
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
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fword.cloud.microsoft%2F"
            },
            {
                "type": "app",
                "label": "WordPress Kulturen",
                "url": "http://www.kulturen.com/wp-admin/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwordpress.org%2F"
            }
        ]
    },
    {
        "type": "group",
        "label": "AI",
        "icon": "folder",
        "items": [
            {
                "type": "app",
                "label": "AI-gruppen",
                "url": "https://kultpub.github.io/site/AI-gruppen.html",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fkultpub.github.io%2Fsite%2FAI-gruppen.html"
            },
            {
                "type": "app",
                "label": "AI Image Generator",
                "url": "https://pixlr.com/se/image-generator/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fpixlr.com%2Fse%2Fimage-generator%2F"
            },
            {
                "type": "app",
                "label": "AI på Kulturen",
                "url": "https://kulturen.sharepoint.com/teams/ai/Lists/renden%20AIgruppen/AllItems.aspx?viewid=acdc857f-c67c-4336-8894-836c45d4fd98&env=WebViewList&npsAction=createList",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.microsoft.com%2Fmicrosoft-365%2Fsharepoint%2Fcollaboration"
            },
            {
                "type": "app",
                "label": "ChatGPT",
                "url": "https://chat.openai.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fchat.openai.com%2F"
            },
            {
                "type": "app",
                "label": "ChatGPT - Translator Expert",
                "url": "https://chat.openai.com/g/g-b83og3RUi-translator-expert",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fchat.openai.com%2Fg%2Fg-b83og3RUi-translator-expert"
            },
            {
                "type": "app",
                "label": "Claude",
                "url": "https://claude.ai/new",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fclaude.ai%2Fnew"
            },
            {
                "type": "app",
                "label": "Copilot",
                "url": "https://m365.cloud.microsoft/chat/?fromCode=cmcv2&redirectId=0E444C3A80254F64988F0B244AA118CC&login_hint=johan.hofvendahl%40kulturen.com&internalredirect=CCM&client-request-id=50a80f56-d509-4f2f-a620-2be956a1ecc2&origindomain=CCM",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fm365.cloud.microsoft%2Fchat%2F%3FfromCode%3Dcmcv2%26redirectId%3D0E444C3A80254F64988F0B244AA118CC%26login_hint%3Djohan.hofvendahl%2540kulturen.com%26internalredirect%3DCCM%26client-request-id%3D50a80f56-d509-4f2f-a620-2be956a1ecc2%26origindomain%3DCCM"
            },
            {
                "type": "app",
                "label": "DALL·E",
                "url": "https://labs.openai.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flabs.openai.com%2F"
            },
            {
                "type": "app",
                "label": "docAnalyzer.ai | AI that works with your documents",
                "url": "https://docanalyzer.ai/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fdocanalyzer.ai%2F"
            },
            {
                "type": "app",
                "label": "Gemini",
                "url": "https://gemini.google.com/app?hl=sv",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fgemini.google.com%2Fapp%3Fhl%3Dsv"
            },
            {
                "type": "app",
                "label": "Google NotebookLM",
                "url": "https://notebooklm.google.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fnotebooklm.google.com%2F"
            },
            {
                "type": "app",
                "label": "Klang AI AB Fakturering",
                "url": "https://billing.stripe.com/p/session/live_YWNjdF8xTWhzc2RCVDhQa3l0YVQ2LF9UOWY2R1Y0MEN1dm1iV0xCNXFJNkFvWjFPNXdHN2VO0100tzRavGbM",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fbilling.stripe.com%2Fp%2Fsession%2Flive_YWNjdF8xTWhzc2RCVDhQa3l0YVQ2LF9UOWY2R1Y0MEN1dm1iV0xCNXFJNkFvWjFPNXdHN2VO0100tzRavGbM"
            },
            {
                "type": "app",
                "label": "Klang.ai | Hem",
                "url": "https://app.klang.ai/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fapp.klang.ai%2F"
            },
            {
                "type": "app",
                "label": "Klang.ai - kvitto",
                "url": "https://app.klang.ai/settings/workspace/admin",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fapp.klang.ai%2Fsettings%2Fworkspace%2Fadmin"
            },
            {
                "type": "app",
                "label": "OpenAI, LLC Fakturering",
                "url": "https://pay.openai.com/p/session/live_YWNjdF8xSE9yU3dDNmgxbnhHb0kzLF9RTUNiWGphN2VTMG5oekFlN1Y4REhDbU5iMXppRGoy0100Ftqyj2gE",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fpay.openai.com%2Fp%2Fsession%2Flive_YWNjdF8xSE9yU3dDNmgxbnhHb0kzLF9RTUNiWGphN2VTMG5oekFlN1Y4REhDbU5iMXppRGoy0100Ftqyj2gE"
            },
            {
                "type": "app",
                "label": "Text to Video AI(Best and Free)",
                "url": "https://deevid.ai/text-to-video?utm_source=google&utm_medium=cpc&utm_campaign=d-video-ac&utm_term=generator&utm_content=pc&gad_source=1&gad_campaignid=22739661800&gbraid=0AAAAAq898mN_ge1Mjko_4EApSwjiWtQfT&gclid=Cj0KCQjw9obIBhCAARIsAGHm1mSduPIs1DUCQ8TOSLCjo3Vf-IX3l46tTIcH4RVOHD2fIZz7ELA-rB4aAht2EALw_wcB",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fdeevid.ai%2Ftext-to-video%3Futm_source%3Dgoogle%26utm_medium%3Dcpc%26utm_campaign%3Dd-video-ac%26utm_term%3Dgenerator%26utm_content%3Dpc%26gad_source%3D1%26gad_campaignid%3D22739661800%26gbraid%3D0AAAAAq898mN_ge1Mjko_4EApSwjiWtQfT%26gclid%3DCj0KCQjw9obIBhCAARIsAGHm1mSduPIs1DUCQ8TOSLCjo3Vf-IX3l46tTIcH4RVOHD2fIZz7ELA-rB4aAht2EALw_wcB"
            },
            {
                "type": "app",
                "label": "There's An AI For That",
                "url": "https://theresanaiforthat.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Ftheresanaiforthat.com%2F"
            },
            {
                "type": "app",
                "label": "TurboScribe",
                "url": "https://turboscribe.ai/dashboard",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fturboscribe.ai%2Fdashboard"
            },
            {
                "type": "app",
                "label": "VanceAI",
                "url": "https://vanceai.com/increase-resolution/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fvanceai.com%2Fincrease-resolution%2F"
            }
        ]
    },
    {
        "type": "group",
        "label": "Socialt",
        "icon": "folder",
        "items": [
            {
                "type": "app",
                "label": "Facebook",
                "url": "https://sv-se.facebook.com/login/",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 666.66668 666.66717\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M666.667 333.334C666.667 149.239 517.428 0 333.333 0S0 149.239 0 333.334c0 156.327 107.62 287.496 252.808 323.517V435.195h-68.736V333.334h68.736v-43.892c0-113.456 51.344-166.043 162.731-166.043 21.117 0 57.556 4.14 72.462 8.282v92.339c-7.868-.828-21.532-1.243-38.509-1.243-54.657 0-75.776 20.704-75.776 74.533v36.024h108.879l-18.704 101.861h-90.175v229.031c165.048-19.934 292.951-160.466 292.951-330.892z\" fill=\"#0866ff\"/><path d=\"m463.891 435.195 18.704-101.861H373.716V297.31c0-53.829 21.119-74.533 75.776-74.533 16.977 0 30.641.415 38.509 1.243v-92.339c-14.906-4.142-51.345-8.282-72.462-8.282-111.387 0-162.731 52.587-162.731 166.043v43.892h-68.736v101.861h68.736v221.656c25.79 6.397 52.758 9.816 80.525 9.816 13.673 0 27.144-.843 40.383-2.441V435.195h90.175z\" fill=\"#fff\"/></svg>"
            },
            {
                "type": "app",
                "label": "Facebook Messenger",
                "url": "https://www.facebook.com/messages/t/100011551478099",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.messenger.com%2F"
            },
            {
                "type": "app",
                "label": "Google Messages",
                "url": "https://messages.google.com/web/conversations",
                "icon": "work",
                "iconSvg": "<svg fill=\"#1A73E8\" role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>Google Messages</title><path d=\"M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM4.911 7.089h11.456a2.197 2.197 0 0 1 2.165 2.19v5.863a2.213 2.213 0 0 1-2.177 2.178H8.04c-1.174 0-2.04-.99-2.04-2.178v-4.639L4.503 7.905c-.31-.42-.05-.816.408-.816zm3.415 2.19c-.347 0-.68.21-.68.544 0 .334.333.544.68.544h7.905c.346 0 .68-.21.68-.544 0-.334-.334-.545-.68-.545zm0 2.177c-.347 0-.68.21-.68.544 0 .334.333.544.68.544h7.905c.346 0 .68-.21.68-.544 0-.334-.334-.544-.68-.544zm-.013 2.19c-.346 0-.68.21-.68.544 0 .334.334.544.68.544h5.728c.347 0 .68-.21.68-.544 0-.334-.333-.545-.68-.545z\"/></svg>"
            },
            {
                "type": "app",
                "label": "LinkedIn",
                "url": "https://www.linkedin.com/uas/login",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 72h56c4.418 0 8-3.582 8-8V8c0-4.418-3.582-8-8-8H8C3.582 0 0 3.582 0 8v56c0 4.418 3.582 8 8 8z\" fill=\"#007EBB\"/><path d=\"M62 62H51.316V43.802c0-4.989-1.896-7.777-5.845-7.777-4.296 0-6.541 2.902-6.541 7.777V62H28.633V27.333H38.93v4.67s3.096-5.729 10.453-5.729C56.736 26.274 62 30.764 62 40.051V62zM16.349 22.794C12.842 22.794 10 19.93 10 16.397S12.842 10 16.349 10c3.508 0 6.348 2.864 6.348 6.397s-2.84 6.397-6.348 6.397zM11.033 62h10.736V27.333H11.033V62z\" fill=\"#fff\"/></svg>"
            },
            {
                "type": "app",
                "label": "WhatsApp",
                "url": "https://web.whatsapp.com/",
                "icon": "work",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fwww.whatsapp.com%2F"
            }
        ]
    },
    {
        "type": "group",
        "label": "Swedish",
        "icon": "folder",
        "items": [
            {
                "type": "app",
                "label": "01 Kanalparken öppnar – Stadsbladet",
                "url": "https://learnswedish.github.io/html/tidningsartikel-01.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftidningsartikel-01.html"
            },
            {
                "type": "app",
                "label": "02 Nytt nattåg rullar norrut – Stadsbladet",
                "url": "https://learnswedish.github.io/html/tidningsartikel-02.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftidningsartikel-02.html"
            },
            {
                "type": "app",
                "label": "03 Här lånar grannarna verktyg – Stadsbladet",
                "url": "https://learnswedish.github.io/html/tidningsartikel-03.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftidningsartikel-03.html"
            },
            {
                "type": "app",
                "label": "3rd person possessives | menu",
                "url": "https://learnswedish.github.io/html/3rd-pers-possessives-menu.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2F3rd-pers-possessives-menu.html"
            },
            {
                "type": "app",
                "label": "Adjective – comparative of irregular",
                "url": "https://learnswedish.github.io/html/adjectives.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fadjectives.html"
            },
            {
                "type": "app",
                "label": "Adjective – odd adjectives: input",
                "url": "https://learnswedish.github.io/html/unconventional-adjectives-write.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Funconventional-adjectives-write.html"
            },
            {
                "type": "app",
                "label": "Adjective – odd adjectives: pick",
                "url": "https://learnswedish.github.io/html/unconventional-adjectives-pick.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Funconventional-adjectives-pick.html"
            },
            {
                "type": "app",
                "label": "Adjective – regular and some irregular: pick",
                "url": "https://learnswedish.github.io/html/practice-adjective-form.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fpractice-adjective-form.html"
            },
            {
                "type": "app",
                "label": "Agreement at a Distance | Predicative Adjectives",
                "url": "https://learnswedish.github.io/html/adj-dist-agreement.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fadj-dist-agreement.html"
            },
            {
                "type": "app",
                "label": "Agreement – Pick the correct item",
                "url": "https://learnswedish.github.io/html/Agreement-pick-correct-item.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2FAgreement-pick-correct-item.html"
            },
            {
                "type": "app",
                "label": "Agreement – Practise agreement",
                "url": "https://learnswedish.github.io/html/agreement.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fagreement.html"
            },
            {
                "type": "app",
                "label": "att ha | to have: input",
                "url": "https://learnswedish.github.io/html/att-ha-skriv.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fatt-ha-skriv.html"
            },
            {
                "type": "app",
                "label": "att ha | to have: pick",
                "url": "https://learnswedish.github.io/html/att-ha.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fatt-ha.html"
            },
            {
                "type": "app",
                "label": "att vara | to be: input",
                "url": "https://learnswedish.github.io/html/att-vara-to-be-skriv.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fatt-vara-to-be-skriv.html"
            },
            {
                "type": "app",
                "label": "att vara | to be: pick",
                "url": "https://learnswedish.github.io/html/att-vara-to-be.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fatt-vara-to-be.html"
            },
            {
                "type": "app",
                "label": "Attributive or Predicative",
                "url": "https://learnswedish.github.io/html/menu-adj-attr-pred.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fmenu-adj-attr-pred.html"
            },
            {
                "type": "app",
                "label": "Booking",
                "url": "https://learnswedish.github.io/html/booking.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fbooking.html"
            },
            {
                "type": "app",
                "label": "Clause – Pick the Main Clause",
                "url": "https://learnswedish.github.io/html/pick-the-main-clause.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fpick-the-main-clause.html"
            },
            {
                "type": "app",
                "label": "Clause – Spot the Subclause",
                "url": "https://learnswedish.github.io/html/subclause.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsubclause.html"
            },
            {
                "type": "app",
                "label": "Conjugations 1–3",
                "url": "https://learnswedish.github.io/html/verb-konjugationer-1-3.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fverb-konjugationer-1-3.html"
            },
            {
                "type": "app",
                "label": "Definite plural – input",
                "url": "https://learnswedish.github.io/html/plural-definite-b.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fplural-definite-b.html"
            },
            {
                "type": "app",
                "label": "Definite plural – pick",
                "url": "https://learnswedish.github.io/html/plural-definite.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fplural-definite.html"
            },
            {
                "type": "app",
                "label": "Definite singular – pick",
                "url": "https://learnswedish.github.io/html/el-er-or.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fel-er-or.html"
            },
            {
                "type": "app",
                "label": "Duration and Temporal distance: om | för | i | på",
                "url": "https://learnswedish.github.io/html/om-pa-i-for.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fom-pa-i-for.html"
            },
            {
                "type": "app",
                "label": "Eight high-frequency verbs",
                "url": "https://learnswedish.github.io/html/8-verbs.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2F8-verbs.html"
            },
            {
                "type": "app",
                "label": "få – The Linguistic Swiss Army Knife",
                "url": "https://learnswedish.github.io/html/fa.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ffa.html"
            },
            {
                "type": "app",
                "label": "False and True Friends Quiz",
                "url": "https://learnswedish.github.io/html/true-friends-false-friends.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftrue-friends-false-friends.html"
            },
            {
                "type": "app",
                "label": "Flashcards work – Holländska / Svenska",
                "url": "https://learnswedish.github.io/html/job-interview-flashcard-se-nl.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fjob-interview-flashcard-se-nl.html"
            },
            {
                "type": "app",
                "label": "Flip 725 – most important words",
                "url": "https://learnswedish.github.io/html/flip725.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fflip725.html"
            },
            {
                "type": "app",
                "label": "fönster | fönstret",
                "url": "https://learnswedish.github.io/html/fonstret.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ffonstret.html"
            },
            {
                "type": "app",
                "label": "Från presens till preteritum",
                "url": "https://learnswedish.github.io/html/fr%C3%A5n-presens-till-preteritum.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ffr%25C3%25A5n-presens-till-preteritum.html"
            },
            {
                "type": "app",
                "label": "Från preteritum till presens",
                "url": "https://learnswedish.github.io/html/fr%C3%A5n-preteritum-till-presens.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ffr%25C3%25A5n-preteritum-till-presens.html"
            },
            {
                "type": "app",
                "label": "från | till | hos | vid",
                "url": "https://learnswedish.github.io/html/hos-vid-fran-till.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhos-vid-fran-till.html"
            },
            {
                "type": "app",
                "label": "Frequency: två gånger {om dagen; i veckan}",
                "url": "https://learnswedish.github.io/html/frekvens.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ffrekvens.html"
            },
            {
                "type": "app",
                "label": "Future tense: ska | kommer att",
                "url": "https://learnswedish.github.io/html/ska-kommer-att.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fska-kommer-att.html"
            },
            {
                "type": "app",
                "label": "G - Pronunciation guide",
                "url": "https://learnswedish.github.io/html/swe-g.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fswe-g.html"
            },
            {
                "type": "app",
                "label": "Gender & Definiteness",
                "url": "https://learnswedish.github.io/html/swedish_genus_drill",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fswedish_genus_drill"
            },
            {
                "type": "app",
                "label": "Gender – Do you know the gender?",
                "url": "https://learnswedish.github.io/html/do-you-know-the-gender.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fdo-you-know-the-gender.html"
            },
            {
                "type": "app",
                "label": "Gender – en-ord och ett-ord",
                "url": "https://learnswedish.github.io/html/non-neuter-and-neuter-nouns",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fnon-neuter-and-neuter-nouns"
            },
            {
                "type": "app",
                "label": "Genitive – S-genitive Exercise",
                "url": "https://learnswedish.github.io/html/S-genitive.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2FS-genitive.html"
            },
            {
                "type": "app",
                "label": "Grammar Run CEFR A1",
                "url": "https://learnswedish.github.io/html/grammar-run-A1.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fgrammar-run-A1.html"
            },
            {
                "type": "app",
                "label": "Grammar Run First Words",
                "url": "https://learnswedish.github.io/html/grammar-run-first.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fgrammar-run-first.html"
            },
            {
                "type": "app",
                "label": "Hörförståelse 1",
                "url": "https://learnswedish.github.io/html/horforstaelse-sudyu5uysteeew.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhorforstaelse-sudyu5uysteeew.html"
            },
            {
                "type": "app",
                "label": "Hörförståelse 2",
                "url": "https://learnswedish.github.io/html/horforstaelse-ssydf5yusydgq1.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhorforstaelse-ssydf5yusydgq1.html"
            },
            {
                "type": "app",
                "label": "Hörförståelse 3",
                "url": "https://learnswedish.github.io/html/horforstaelse-sdhcvgsk2716eksa.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhorforstaelse-sdhcvgsk2716eksa.html"
            },
            {
                "type": "app",
                "label": "Hörförståelse 4",
                "url": "https://learnswedish.github.io/html/horforstaelse-ssu6sdjygjahsgadg.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhorforstaelse-ssu6sdjygjahsgadg.html"
            },
            {
                "type": "app",
                "label": "Hörförståelse 5",
                "url": "https://learnswedish.github.io/html/horforstaelse-qpfjueyegduay5.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhorforstaelse-qpfjueyegduay5.html"
            },
            {
                "type": "app",
                "label": "Idiomatisk svenska - dropdownövning",
                "url": "https://learnswedish.github.io/html/idiomovning.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fidiomovning.html"
            },
            {
                "type": "app",
                "label": "Imperative",
                "url": "https://learnswedish.github.io/html/imperative.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fimperative.html"
            },
            {
                "type": "app",
                "label": "Indefinite article + adjective agreement",
                "url": "file:///C:/Users/johan/Downloads/en-ett-adj-substantiv.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=file%3A%2F%2F%2FC%3A%2FUsers%2Fjohan%2FDownloads%2Fen-ett-adj-substantiv.html"
            },
            {
                "type": "app",
                "label": "Indefinite article agreement",
                "url": "https://learnswedish.github.io/html/en-ett-substantiv.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fen-ett-substantiv.html"
            },
            {
                "type": "app",
                "label": "Indefinite inflection – types",
                "url": "https://learnswedish.github.io/html/adjective-explain-types.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fadjective-explain-types.html"
            },
            {
                "type": "app",
                "label": "Initial observations",
                "url": "https://learnswedish.github.io/html/initial-observations.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Finitial-observations.html"
            },
            {
                "type": "app",
                "label": "Introduce yourself",
                "url": "https://learnswedish.github.io/html/Introduce-yourself.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2FIntroduce-yourself.html"
            },
            {
                "type": "app",
                "label": "Inversion",
                "url": "https://learnswedish.github.io/html/inversion.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Finversion.html"
            },
            {
                "type": "app",
                "label": "Irregular plurals",
                "url": "https://learnswedish.github.io/html/spindel-spindlar.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fspindel-spindlar.html"
            },
            {
                "type": "app",
                "label": "LearnSwedish/html",
                "url": "https://github.com/LearnSwedish/html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fgithub.com%2FLearnSwedish%2Fhtml"
            },
            {
                "type": "app",
                "label": "Lediga lektionstider",
                "url": "https://docs.google.com/spreadsheets/d/12oEFEC9L0wa-ggh4EK8mynNTjeb8WpBMCoiZRygATE4/edit?gid=0#gid=0",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F12oEFEC9L0wa-ggh4EK8mynNTjeb8WpBMCoiZRygATE4%2Fedit%3Fgid%3D0%23gid%3D0"
            },
            {
                "type": "app",
                "label": "Mind maps – Seven mind maps",
                "url": "https://learnswedish.github.io/html/learngender7mindmaps.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Flearngender7mindmaps.html"
            },
            {
                "type": "app",
                "label": "mindre – lite – få – färre – mycket – många",
                "url": "https://learnswedish.github.io/html/f%C3%A5-f%C3%A4rre-lite-mindre-mycket-m%C3%A5nga.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ff%25C3%25A5-f%25C3%25A4rre-lite-mindre-mycket-m%25C3%25A5nga.html"
            },
            {
                "type": "app",
                "label": "Modal verbs in Swedish – and short answers",
                "url": "https://learnswedish.github.io/html/short-answers.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fshort-answers.html"
            },
            {
                "type": "app",
                "label": "Några svenska sifferuttryck",
                "url": "https://learnswedish.github.io/html/sifferuttryck.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsifferuttryck.html"
            },
            {
                "type": "app",
                "label": "Nouns – definite to indefinite",
                "url": "https://learnswedish.github.io/html/noun-def-to-indef.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fnoun-def-to-indef.html"
            },
            {
                "type": "app",
                "label": "Nouns – indefinite to definite",
                "url": "https://learnswedish.github.io/html/noun-indef-to-def.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fnoun-indef-to-def.html"
            },
            {
                "type": "app",
                "label": "Object – Pick Object Types",
                "url": "https://learnswedish.github.io/html/pick-object.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fpick-object.html"
            },
            {
                "type": "app",
                "label": "Ord på HP-nivå",
                "url": "https://learnswedish.github.io/html/hp-level.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhp-level.html"
            },
            {
                "type": "app",
                "label": "Ordinal – Choose the Correct Ordinal",
                "url": "https://learnswedish.github.io/html/ordinals-exercise.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fordinals-exercise.html"
            },
            {
                "type": "app",
                "label": "Participle",
                "url": "https://learnswedish.github.io/html/participle.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fparticiple.html"
            },
            {
                "type": "app",
                "label": "Pick the correct conjunction",
                "url": "https://learnswedish.github.io/html/link.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Flink.html"
            },
            {
                "type": "app",
                "label": "Pick the correct subjunction",
                "url": "https://learnswedish.github.io/html/sub.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsub.html"
            },
            {
                "type": "app",
                "label": "Pitch accent – flip-card exercise",
                "url": "https://learnswedish.github.io/html/pitch-accent.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fpitch-accent.html"
            },
            {
                "type": "app",
                "label": "Plural Challenge – irregular and regular",
                "url": "https://learnswedish.github.io/html/spindel-spindlar-next-level.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fspindel-spindlar-next-level.html"
            },
            {
                "type": "app",
                "label": "Plural Exercise",
                "url": "https://learnswedish.github.io/html/plural.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fplural.html"
            },
            {
                "type": "app",
                "label": "Plural prediction",
                "url": "https://learnswedish.github.io/html/plural-prediction.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fplural-prediction.html"
            },
            {
                "type": "app",
                "label": "Pluralisation in Swedish",
                "url": "https://learnswedish.github.io/html/pluralisation.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fpluralisation.html"
            },
            {
                "type": "app",
                "label": "Preply",
                "url": "https://preply.com/en/login?source_page=home&source_element=header&_gl=1*12otrpq*_up*MQ..&gclid=CjwKCAjwkY2qBhBDEiwAoQXK5SCxo4DsVy5BtX18hFvo-W3dLFHI7liMx6QLZ9evbtmTeFo5SMZPEBoCTsAQAvD_BwE",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fpreply.com%2Fen%2Flogin%3Fsource_page%3Dhome%26source_element%3Dheader%26_gl%3D1%2A12otrpq%2A_up%2AMQ..%26gclid%3DCjwKCAjwkY2qBhBDEiwAoQXK5SCxo4DsVy5BtX18hFvo-W3dLFHI7liMx6QLZ9evbtmTeFo5SMZPEBoCTsAQAvD_BwE"
            },
            {
                "type": "app",
                "label": "Preposition: i | på",
                "url": "https://learnswedish.github.io/html/i-pa.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fi-pa.html"
            },
            {
                "type": "app",
                "label": "Preposition: i somras | under sommaren etc.",
                "url": "https://learnswedish.github.io/html/i-somras-etc.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fi-somras-etc.html"
            },
            {
                "type": "app",
                "label": "Present tense or infinitive?",
                "url": "https://learnswedish.github.io/html/present-tense-or-infinitive.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fpresent-tense-or-infinitive.html"
            },
            {
                "type": "app",
                "label": "Pronoun – Hans, sitt, hennes, deras?",
                "url": "https://learnswedish.github.io/html/hans-sitt-hennes-sina.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fhans-sitt-hennes-sina.html"
            },
            {
                "type": "app",
                "label": "Pronoun - Object pronouns",
                "url": "https://learnswedish.github.io/html/objective-pronoun.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fobjective-pronoun.html"
            },
            {
                "type": "app",
                "label": "Pronoun – Pronoun Case Exercise",
                "url": "https://learnswedish.github.io/html/subjective%20and%20objective%20cases.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsubjective%2520and%2520objective%2520cases.html"
            },
            {
                "type": "app",
                "label": "Rearrange the Jumbled Words",
                "url": "https://learnswedish.github.io/html/jumbledwords.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fjumbledwords.html"
            },
            {
                "type": "app",
                "label": "Repeat or Adjust | Modality and Perspective | Short answers",
                "url": "https://learnswedish.github.io/html/echo-and-align.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fecho-and-align.html"
            },
            {
                "type": "app",
                "label": "Saga: Stadsmusikanterna i Bremen",
                "url": "https://learnswedish.github.io/html/saga-stadsmusikanterna.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsaga-stadsmusikanterna.html"
            },
            {
                "type": "app",
                "label": "Seasons – Training area",
                "url": "https://learnswedish.github.io/html/seasons.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fseasons.html"
            },
            {
                "type": "app",
                "label": "Sentence Adverbial",
                "url": "https://learnswedish.github.io/html/sentence-adverbial.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsentence-adverbial.html"
            },
            {
                "type": "app",
                "label": "Sentence Adverbial – in Main Clauses",
                "url": "https://learnswedish.github.io/html/sentenceadverbials.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsentenceadverbials.html"
            },
            {
                "type": "app",
                "label": "Sentence Adverbial – in Subclauses",
                "url": "https://learnswedish.github.io/html/sentenceadverbialssubclauses.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsentenceadverbialssubclauses.html"
            },
            {
                "type": "app",
                "label": "Sentence adverbial – ju, väl, nog, däremot",
                "url": "https://learnswedish.github.io/html/ju-val-nog-daremot.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fju-val-nog-daremot.html"
            },
            {
                "type": "app",
                "label": "Some phrasal verbs with \"tänka\"",
                "url": "https://learnswedish.github.io/html/tanka3.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftanka3.html"
            },
            {
                "type": "app",
                "label": "Spatial adverbs",
                "url": "https://learnswedish.github.io/html/rumsadverb.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Frumsadverb.html"
            },
            {
                "type": "app",
                "label": "Stil- och register",
                "url": "https://learnswedish.github.io/html/spr%C3%A5kniv%C3%A5.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fspr%25C3%25A5kniv%25C3%25A5.html"
            },
            {
                "type": "app",
                "label": "Stress pattern exercise",
                "url": "https://learnswedish.github.io/html/stress-patterns.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fstress-patterns.html"
            },
            {
                "type": "app",
                "label": "Stress Shift in Words – 64 groups, 165 examples",
                "url": "https://learnswedish.github.io/html/stress-exercise.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fstress-exercise.html"
            },
            {
                "type": "app",
                "label": "Svenska verb – konjugationsanalys",
                "url": "https://learnswedish.github.io/html/check-verb.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fcheck-verb.html"
            },
            {
                "type": "app",
                "label": "Swedish Adjective Exercises",
                "url": "https://learnswedish.github.io/html/adjective-exercises.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fadjective-exercises.html"
            },
            {
                "type": "app",
                "label": "Swedish Verb Booster",
                "url": "https://learnswedish.github.io/html/verb-boost.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fverb-boost.html"
            },
            {
                "type": "app",
                "label": "Swedish verbs - conjugation analysis",
                "url": "https://learnswedish.github.io/html/check-verb-eng.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fcheck-verb-eng.html"
            },
            {
                "type": "app",
                "label": "Tala, säga, berätta",
                "url": "https://learnswedish.github.io/html/p%C3%A5peka-s%C3%A4ga-rapportera.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fp%25C3%25A5peka-s%25C3%25A4ga-rapportera.html"
            },
            {
                "type": "app",
                "label": "tänka – The Brain-Work Verb",
                "url": "https://learnswedish.github.io/html/tanka.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftanka.html"
            },
            {
                "type": "app",
                "label": "Temporal deictic expressions: day, week, month",
                "url": "https://i.imgur.com/2kyTc92.png",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fi.imgur.com%2F2kyTc92.png"
            },
            {
                "type": "app",
                "label": "Temporal deictic expressions: morning, lunch, evening",
                "url": "https://i.imgur.com/XtVyUrJ.png",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Fi.imgur.com%2FXtVyUrJ.png"
            },
            {
                "type": "app",
                "label": "The Subordinate Clause Laboratory",
                "url": "https://learnswedish.github.io/html/sub-trainer.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fsub-trainer.html"
            },
            {
                "type": "app",
                "label": "The verb \"få\" | 5 senses",
                "url": "https://learnswedish.github.io/html/5-faa.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2F5-faa.html"
            },
            {
                "type": "app",
                "label": "The verb \"tänka\" | 4 senses",
                "url": "https://learnswedish.github.io/html/tanka2.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftanka2.html"
            },
            {
                "type": "app",
                "label": "The verbs \"åka\", \"resa\", \"köra\", \"gå\", \"vandra\"",
                "url": "https://learnswedish.github.io/html/resa-vandra-ga.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fresa-vandra-ga.html"
            },
            {
                "type": "app",
                "label": "Time adverbial goes first",
                "url": "https://learnswedish.github.io/html/time-adverbial-in-beginning.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftime-adverbial-in-beginning.html"
            },
            {
                "type": "app",
                "label": "Time – Tell the time",
                "url": "https://learnswedish.github.io/html/tell-the-time.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Ftell-the-time.html"
            },
            {
                "type": "app",
                "label": "Värre eller sämre?",
                "url": "https://learnswedish.github.io/html/v%C3%A4rre-s%C3%A4mre.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fv%25C3%25A4rre-s%25C3%25A4mre.html"
            },
            {
                "type": "app",
                "label": "Verb – 25 important verbs",
                "url": "https://learnswedish.github.io/html/25%20important%20verbs.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2F25%2520important%2520verbs.html"
            },
            {
                "type": "app",
                "label": "Verb – 25 important verbs in present tense",
                "url": "https://learnswedish.github.io/html/25%20important%20verbs%20in%20present%20tense.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2F25%2520important%2520verbs%2520in%2520present%2520tense.html"
            },
            {
                "type": "app",
                "label": "Verbs – Swedish core verbs",
                "url": "https://learnswedish.github.io/html/swedish-core-verbs.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fswedish-core-verbs.html"
            },
            {
                "type": "app",
                "label": "Verbs - tense - Dave's hell",
                "url": "https://learnswedish.github.io/html/verb-tense-daves-hell.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fverb-tense-daves-hell.html"
            },
            {
                "type": "app",
                "label": "Vocabulary Mastery",
                "url": "https://learnswedish.github.io/html/vocabulary-training.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fvocabulary-training.html"
            },
            {
                "type": "app",
                "label": "Weekdays – Training area",
                "url": "https://learnswedish.github.io/html/weekdays.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fweekdays.html"
            },
            {
                "type": "app",
                "label": "What's the problem?",
                "url": "https://learnswedish.github.io/html/whats-the-problem.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fwhats-the-problem.html"
            },
            {
                "type": "app",
                "label": "What's your CEFR level (vocabulary)?",
                "url": "https://learnswedish.github.io/html/cefr-test.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fcefr-test.html"
            },
            {
                "type": "app",
                "label": "Word Order Lab",
                "url": "https://learnswedish.github.io/html/word-order-lab.html",
                "icon": "work",
                "iconSvg": "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\"><circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"rgb(0,106,167)\"/><path d=\"M35.917 0.917c-6.654 1.364-12.77 4.199-18 8.147v26.968H0.896C0.31 38.931 0 41.929 0 45c0 3.094.313 6.114.908 9.032h17.01v26.903c5.23 3.948 11.346 6.783 18 8.147V54.037h53.174C89.687 51.118 90 48.096 90 45c0-3.069-.31-6.066-.895-8.963H35.917V0.917z\" fill=\"rgb(254,204,0)\"/></g></svg>",
                "iconUrl": "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Flearnswedish.github.io%2Fhtml%2Fword-order-lab.html"
            }
        ]
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
    #${id} .tf-icon-img { width: 26px; height: 26px; display: block; object-fit: contain; }
    #${id} .tf-stage .tf-icon-img, #${id} .tf-result-app .tf-icon-img, #${id} .tf-result-group .tf-icon-img { width: 22px; height: 22px; }
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
    #${id} .tf-result-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
    #${id} .tf-result-app, #${id} .tf-result-group { border: 1px solid rgba(148,163,184,.22); background: rgba(255,255,255,.76); color: #334155; display: grid; grid-template-columns: 42px minmax(0,1fr); justify-items: start; align-items: center; gap: 12px; cursor: pointer; font-size: 12px; font-weight: 620; min-width: 0; min-height: 62px; padding: 10px 12px; border-radius: 16px; text-align: left; box-shadow: 0 8px 18px rgba(15,23,42,.05); }
    #${id} .tf-result-app .tf-icon, #${id} .tf-result-group .tf-icon { width: 42px; height: 42px; border-radius: 13px; font-size: 18px; }
    #${id} .tf-result-app .tf-label, #${id} .tf-result-group .tf-label { max-width: none; width: 100%; }
    #${id} .tf-result-group .tf-icon { background: linear-gradient(145deg,#ffffff,#eaf2ff); color: #1d4ed8; border: 1px solid rgba(148,163,184,.32); }
    #${id} .tf-result-app:hover .tf-icon, #${id} .tf-result-group:hover .tf-icon { transform: translateY(-3px) scale(1.045); box-shadow: 0 16px 32px rgba(37,99,235,.22); }
    #${id} .tf-result-url { display: none; }
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

  function iconHtml(item) {
    if (item?.iconSvg) {
      return item.iconSvg;
    }
    if (item?.iconUrl) {
      return `<img class="tf-icon-img" src="${escapeAttr(item.iconUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer">`;
    }
    return icons[item?.icon] || icons.folder;
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
          ${groupMatches.map(({ item, path: itemPath }) => `<button class="tf-result-group" data-path="${itemPath.join(",")}" title="${escapeAttr(item.label)}"><span class="tf-icon">${iconHtml(item)}</span><span class="tf-label">${escapeHtml(item.label)}</span></button>`).join("")}
        </div>
      </div>
    ` : "";

    const appSectionsHtml = [...appSections.entries()].map(([label, entries]) => `
      <div class="tf-result-section">
        <div class="tf-result-path">${escapeHtml(label)}</div>
        <div class="tf-result-grid">
          ${entries.map(({ item }) => `<button class="tf-result-app" data-url="${escapeAttr(item.url)}" title="${escapeAttr(item.label)}"><span class="tf-icon">${iconHtml(item)}</span><span class="tf-label">${escapeHtml(item.label)}</span><span class="tf-result-url">${escapeHtml(hostLabel(item.url))}</span></button>`).join("")}
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
          const search = escapeAttr(normalizeSearch(searchText(item)));
          if (item.type === "group") {
            return `<button class="tf-sub" data-index="${index}" data-search="${search}" title="${item.label}"><span class="tf-icon">${iconHtml(item)}</span><span class="tf-label">${item.label}</span></button>`;
          }
          return `<button class="tf-app" data-url="${item.url}" data-search="${search}" title="${item.label}"><span class="tf-icon">${iconHtml(item)}</span><span class="tf-label">${item.label}</span></button>`;
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
