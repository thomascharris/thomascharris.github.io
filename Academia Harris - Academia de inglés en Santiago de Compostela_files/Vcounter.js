(function() {
  var _ = {empid:null, type:null, registerPhones:true, registerWhatsApp:true, registerShares:true, registerSubmit:true, registerSubmitDefaultID:"env\u00edo formulario", product:"web"};
  var Init = function() {
    if (!AssociateParams()) {
      throw new Error("Faltan par\u00e1metros. Ejecuci\u00f3n detenida.");
    }
    if (IsRobot()) {
      return;
    }
    LoadIntersectionObserver().then(function() {
      SetObserver();
      CheckAndSet();
      EventHandler();
    });
  };
  var AssociateParams = function() {
    var target = document.querySelector('script[data-empid][src$="Vcounter.js"]');
    if (target === null) {
      target = document.querySelector('script[data-empid][src$="Vcounter.original.js"]');
    }
    if (target === null) {
      return false;
    }
    _.empid = target.getAttribute("data-empid");
    if (_.empid === null) {
      return false;
    }
    var regphones = target.getAttribute("data-regphones");
    if (regphones !== null) {
      _.registerPhones = regphones.toLowerCase() === "true";
    }
    var whatsapp = target.getAttribute("data-regwhatsapp");
    if (whatsapp !== null) {
      _.whatsapp = whatsapp.toLowerCase() === "true";
    }
    var regshares = target.getAttribute("data-regshares");
    if (regshares !== null) {
      _.registerShares = regshares.toLowerCase() === "true";
    }
    var regsubmit = target.getAttribute("data-regsubmit");
    if (regsubmit !== null) {
      _.registerSubmit = regsubmit.toLowerCase() === "true";
    }
    var product = target.getAttribute("data-product");
    if (product !== null) {
      _.product = product.toLowerCase();
    }
    return true;
  };
  var IsRobot = function() {
    var result = false;
    var userua = navigator.userAgent;
    var ualist = [{alexa:["ia_archiver", "ia_archiver-web.archive.org", "ia_archiver (+http://www.alexa.com/site/help/webmasters; crawler@alexa.com)", "ia_archiver(OS-Wayback)"]}, {yahoo:["Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)", "Mozilla/5.0 (compatible; Yahoo! Slurp/3.0; http://help.yahoo.com/help/us/ysearch/slurp)", "YahooMailProxy; https://help.yahoo.com/kb/yahoo-mail-proxy-SLN28749.html", "Yahoo-MMCrawler/3.x (mms dash mmcrawler dash support at yahoo dash inc dot com)", 
    "Mozilla/5.0 (compatible; Yahoo! Slurp China; http://misc.yahoo.com.cn/help.html)", "Y!J-ASR/0.1 crawler (http://www.yahoo-help.jp/app/answers/detail/p/595/a_id/42716/)", "Mozilla/5.0 (Yahoo-MMCrawler/4.0; mailto:vertical-crawl-support@yahoo-inc.com)", "GeoHasher/Nutch-1.0 (GeoHasher Web Search Engine; geohasher.gotdns.org; geo_hasher at yahoo * com)", "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit (KHTML, like Gecko) Mobile (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)", 
    "Yahoo Pipes 1.0", "Mozilla/5.0 (compatible; Yahoo! DE Slurp; http://help.yahoo.com/help/us/ysearch/slurp)", "Mozilla/5.0 (linux; u; android 4.1.1; ja-jp; sgpt12 build/tjs0166) applewebkit/534.30 (khtml, like gecko) version/4.0 safari/534.30 yjapp-android jp.co.yahoo.android.yjtop/2.1.8 evaliant", "Mozilla/5.0 (compatible; Yahoo Link Preview; https://help.yahoo.com/kb/mail/yahoo-link-preview-SLN23615.html)", "Y!J-ASR/1.0 crawler (https://www.yahoo-help.jp/app/answers/detail/p/595/a_id/42716/)", 
    "Mozilla/5.0 (linux; u; android 4.1.1; ja-jp; sgpt12 build/tjs0166) applewebkit/534.30 (khtml, like gecko) version/4.0 safari/534.30 yjapp-android jp.co.yahoo.android.yjtop/2.1.8", "Mozilla/5.0 (compatible; Yahoo! Slurp/3.0; http://help.yahoo.com/help/us/ysearch/slurp) NOT Firefox/3.5", "Nokia6682/2.0 (3.01.1) SymbianOS/8.0 Series60/2.6 Profile/MIDP-2.0 configuration/CLDC-1.1 UP.Link/6.3.0.0.0 (compatible;YahooSeeker/M1A1-R2D2; http://help.yahoo.com/help/us/ysearch/crawling/crawling-01.html)", 
    "Yahoo! Slurp China", "YahooMobile/1.0 (Resource; Server; 1.0.0)", "Mozilla/4.0 (Add Catalog; Windows NT 5.1; infobot.4942@yahoo.com)", "//help.yahoo.com/help/us/ysearch/slurp)", "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 YJApp-IOS jp.co.yahoo.ipn.appli/4.10.4", "Jeffrey's Exif Viewer(http://regex.info/exif)"]}, {duckduckgo:"Mozilla/5.0 (compatible; DuckDuckGo-Favicons-Bot/1.0; +http://duckduckgo.com)"}, {ask:"Mozilla/2.0 (compatible; Ask Jeeves/Teoma; +http://sp.ask.com/docs/about/tech_crawling.html); Mozilla/2.0 (compatible; Ask Jeeves/Teoma; +http://about.ask.com/en/docs/about/webmasters.shtml); Mozilla/2.0 (compatible; Ask Jeeves/Teoma)"}, 
    {bing:["Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0;  http://www.bing.com/bingbot.htm)", "Mozilla/5.0 (compatible; bingbot/3.0-alpha; +http://www.bing.com/bingbot.htm)", 
    "Mozilla/5.0 (compatible;bingbot/2.0;+http://www.bing.com/bingbot.htm)", "Mozilla/5.0 (compatible; bingbot/2.0;  http://www.bing.com/bingbot.htm)", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534+ (KHTML, like Gecko) BingPreview/1.0b", "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 BingPreview/1.0b"]}, {google:["Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", 
    "Googlebot-Image/1.0", "Googlebot/2.1 (+http://www.google.com/bot.html)", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36", "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", 
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; Google Web Preview Analytics) Chrome/41.0.2272.118 Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; Google Web Preview Analytics) Chrome/27.0.1453 Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Googlebot/2.1 (+http://www.googlebot.com/bot.html)", "OnPageBot (compatible; Googlebot 2.1; +https://bot.onpage.org/)", "Mozilla/5.0 (compatible; Googlebot/2.1;  http://www.google.com/bot.html)", 
    "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 (compatible; Googlebot/2.1; startmebot/1.0; +https://start.me/bot)", "Googlebot-Video/1.0", "Mozilla/5.0 (compatible& Googlebot/2.1& +http://www.google.com/bot.html)", "Googlebot/2.1 ( http://www.googlebot.com/bot.html)", "Googlebot/Nutch-1.7", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/537.36 (KHTML, like Gecko; Google Web Preview Analytics) Chrome/41.0.2272.118 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", 
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://import.io)", "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko; Google Page Speed Insights) Chrome/27.0.1453 Safari/537.36 GoogleBot/2.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0_1 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko; Google Page Speed Insights) Version/6.0 Mobile/10A525 Safari/8536.25 GoogleBot/2.1", 
    "Googlebot (gocrawl v0.4)", "Mozilla/5.0 (compatible;acapbot/0.1;treat like Googlebot)", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://enlite.ai)", "Googlebot/2.1 (+http://www.googlebawt.com/bot.html)", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html"]}];
    ualist.forEach(function(ua) {
      for (var $jscomp$iter$0 = $jscomp.makeIterator(Object.entries(ua)), $jscomp$key$$jscomp$destructuring$var0 = $jscomp$iter$0.next(); !$jscomp$key$$jscomp$destructuring$var0.done; $jscomp$key$$jscomp$destructuring$var0 = $jscomp$iter$0.next()) {
        var $jscomp$destructuring$var0 = $jscomp$key$$jscomp$destructuring$var0.value;
        {
          var $jscomp$destructuring$var1 = $jscomp.makeIterator($jscomp$destructuring$var0);
          var a = $jscomp$destructuring$var1.next().value;
          var b = $jscomp$destructuring$var1.next().value;
          {
            if (Array.isArray(b)) {
              b.forEach(function(row) {
                if (row === userua) {
                  CountIt("type=bot&url=" + GetThisUri());
                  result = true;
                }
              });
            } else {
              if (b === userua) {
                CountIt("type=bot&url=" + GetThisUri());
                result = true;
              }
            }
          }
        }
      }
    });
    return result;
  };
  var LoadIntersectionObserver = function() {
    return new Promise(function(resolve) {
      if (!"IntersectionObserver" in window) {
        var script = document.createElement("script");
        script.async = true;
        script.onload = function() {
          return resolve();
        };
        script.src = "https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver";
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  };
  var SetObserver = function() {
    var options = {threshold:function() {
      var arr = [];
      for (var i = 0; i <= 1.0; i += 0.10) {
        arr.push(i);
      }
      return arr;
    }()};
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.intersectionRatio > 0.75) {
          observer.unobserve(entry.target);
          entry.target.classList.add("vc-shown");
        }
      });
    }, options);
    document.querySelectorAll('[data-regvp="true"]').forEach(function(el) {
      return observer.observe(el);
    });
  };
  var CheckAndSet = function() {
    var data = GetCookie("v__uniq");
    _.type = data === false ? "visita" : "pagina";
    RegisterVisit(_.type);
    UpdateCookie();
  };
  var RegisterVisit = function(type) {
    var params = "type=" + type + "&url=" + GetThisUri();
    CountIt(params);
  };
  var RegisterPhone = function(el) {
    var phone = function() {
      var href = el.getAttribute("href");
      return href.substring(href.lastIndexOf("/") + 1, href.length);
    }();
    var params = "type=telf&telf=" + phone + "&url=" + GetThisUri();
    CountIt(params);
  };
  var RegisterWhatsApp = function(el) {
    var phone = function() {
      var target = el.href.match(/\d{6,}/g);
      return target ? target : "";
    }();
    var params = "type=whatsapp&telf=" + phone + "&url=" + GetThisUri();
    CountIt(params);
  };
  var RegisterViewport = function(el) {
    el.setAttribute("data-shown", "true");
    var id = el.getAttribute("data-regid");
    var params = "type=view&id=" + id + "&url=" + GetThisUri();
    CountIt(params);
  };
  var RegisterFormSubmit = function(el) {
    var id = el.getAttribute("data-regid");
    var params = "type=email&id=" + id + "&url=" + GetThisUri();
    CountIt(params);
  };
  var RegisterCustom = function(el) {
    var id = el.getAttribute("data-regid");
    var params = "type=perso&id=" + id + "&url=" + GetThisUri();
    CountIt(params);
  };
  var CountIt = function(parameters) {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", "https://stats.administrarweb.es/registerStats.ashx?" + encodeURIComponent("empId=" + _.empid + "&" + parameters));
    xhr.onerror = function() {
      console.error("network error");
    };
    xhr.send();
  };
  var RegisterShare = function(button) {
    var data = {type:"register", empid:_.empid, dominio:location.hostname, vista:function() {
      var pn = location.pathname.substr(1, location.pathname.length - 1);
      if (!pn.length) {
        pn = "index";
      }
      return pn;
    }(), button:button};
    var xhr = new XMLHttpRequest;
    xhr.onload = function() {
      var result = JSON.parse(xhr.responseText);
      if (result.success === false) {
        console.error(result.error);
        return;
      }
      var target = document.querySelector("#ShareCorporativasButtons").querySelector(".icon." + button).querySelector(".counter");
      if (target) {
        target.innerHTML = +target.innerHTML + 1;
      }
    };
    xhr.open("POST", "https://stats.administrarweb.es/sharesHandler.ashx");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(Parameterize(data));
  };
  var GetThisUri = function() {
    return location.href;
  };
  var GetCookie = function(name) {
    name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
  };
  var SetCookie = function(name, value, expires, options) {
    expires = expires === undefined ? null : expires;
    var defaults = {expireFormat:"days", maxAge:null, domain:null, path:"/", secure:false, httpOnly:false, sameSite:"lax"};
    if (options !== undefined) {
      Object.assign(defaults, options);
    }
    var date = new Date;
    var cookie = name + "=" + value + "; ";
    if (expires) {
      if (defaults.expireFormat === "days") {
        date.setDate(date.getDate() + expires);
      } else {
        date.setTime(date.getTime() + expires * 60 * 1000);
      }
      cookie += "Expires=" + date.toUTCString() + "; ";
    }
    if (defaults.maxAge) {
      cookie += "Max-Age=" + defaults.maxAge + "; ";
    }
    if (defaults.domain) {
      cookie += "Domain=" + defaults.domain + "; ";
    }
    cookie += "Path=" + defaults.path + "; ";
    if (defaults.secure) {
      cookie += "Secure; ";
    }
    if (defaults.httpOnly) {
      cookie += "HttpOnly; ";
    }
    cookie += "SameSite=" + defaults.sameSite;
    document.cookie = cookie;
  };
  var UpdateCookie = function() {
    return SetCookie("v__uniq", "1", 30, {expireFormat:"days"});
  };
  var IsElementInViewport = function(el) {
    return el.classList.contains("vc-shown");
  };
  var Parameterize = function(object) {
    return Object.keys(object).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(object[k]);
    }).join("&");
  };
  var EventHandler = function() {
    document.addEventListener("click", function(ev) {
      var el = ev.target;
      if (_.registerPhones === true) {
        var match = 'a[href^="tel:"]';
        if (el.matches(match)) {
          RegisterPhone(el);
        } else {
          var parent = el;
          while (parent !== null) {
            if (parent.matches(match)) {
              RegisterPhone(parent);
              break;
            }
            parent = parent.parentElement;
          }
        }
      }
      if (_.registerWhatsApp === true) {
        var match1 = 'a[href*="api.whatsapp.com"]';
        var match2 = 'a[href*="wa.me"]';
        if (el.matches(match1) || el.matches(match2)) {
          RegisterWhatsApp(el);
        } else {
          var parent$1 = el;
          while (parent$1 !== null) {
            if (parent$1.matches(match1) || parent$1.matches(match2)) {
              RegisterWhatsApp(parent$1);
              break;
            }
            parent$1 = parent$1.parentElement;
          }
        }
      }
      if (_.registerShares === true) {
        var parent$2 = el;
        while (parent$2 !== null) {
          if (parent$2.matches("#ShareCorporativasButtons")) {
            parent$2 = el;
            while (parent$2 !== null) {
              if (parent$2.dataset.icon !== undefined) {
                RegisterShare(parent$2.dataset.icon);
                break;
              }
              parent$2 = parent$2.parentElement;
            }
            break;
          }
          parent$2 = parent$2.parentElement;
        }
      }
      var customMatch = '[data-regcustom="true"]';
      if (el.matches(customMatch)) {
        RegisterCustom(el);
      } else {
        var parent$3 = el;
        while (parent$3 !== null) {
          if (parent$3.matches(customMatch)) {
            RegisterCustom(parent$3);
            break;
          }
          parent$3 = parent$3.parentElement;
        }
      }
    });
    document.addEventListener("submit", function(ev) {
      var el = ev.target;
      if (_.registerSubmit === true && _.product !== "tienda") {
        if (document.activeElement && document.activeElement.dataset.noreg) {
          ev.preventDefault();
          return false;
        }
        if (el.getAttribute("data-regid") === null) {
          el.setAttribute("data-regid", _.registerSubmitDefaultID);
        }
        RegisterFormSubmit(el);
      }
      if (el.matches('[data-regsubmit="true"]')) {
        if (_.registerSubmit === true && _.product !== "tienda") {
          return;
        }
        if (document.activeElement && document.activeElement.dataset.noreg) {
          ev.preventDefault();
          return false;
        }
        RegisterFormSubmit(el);
      }
    });
    document.addEventListener("scroll", function(ev) {
      document.querySelectorAll('[data-regvp="true"]').forEach(function(el) {
        if (!el.hasAttribute("data-shown") && IsElementInViewport(el)) {
          RegisterViewport(el);
        }
      });
    });
  };
  window.VcounterAPI = function() {
    return {GetThisUri:GetThisUri, RegisterFormSubmit:RegisterFormSubmit};
  };
  if (document.readyState === "complete") {
    Init();
  } else {
    window.addEventListener("load", function() {
      return Init();
    });
  }
})();

