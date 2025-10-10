"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
      var g = function (p, h) {
        g =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (f, b) {
              f.__proto__ = b;
            }) ||
          function (f, b) {
            for (var d in b)
              Object.prototype.hasOwnProperty.call(b, d) && (f[d] = b[d]);
          };
        return g(p, h);
      };
      return function (p, h) {
        function f() {
          this.constructor = p;
        }
        if ("function" !== typeof h && null !== h)
          throw new TypeError(
            "Class extends value " +
              String(h) +
              " is not a constructor or null",
          );
        g(p, h);
        p.prototype =
          null === h
            ? Object.create(h)
            : ((f.prototype = h.prototype), new f());
      };
    })(),
  __spreadArray =
    (this && this.__spreadArray) ||
    function (g, p, h) {
      if (h || 2 === arguments.length)
        for (var f = 0, b = p.length, d; f < b; f++)
          (!d && f in p) ||
            (d || (d = Array.prototype.slice.call(p, 0, f)), (d[f] = p[f]));
      return g.concat(d || Array.prototype.slice.call(p));
    },
  m;
(function (g) {
  var p = (function () {
    function h(f) {
      this.isOffW = !1;
      this._currents = [];
      this._isSave = this._isAb = this.loseChgOk = this._isReloading = !1;
      this.vA = f;
      this.init(f);
    }
    h.prototype.init = function (f) {
      var b = this;
      this.log = f.log;
      this.url = f.url;
      this.allow = new g.allow(this);
      this.initView(this, this.allow);
      this.initBoard(this);
      ui.on(window, "keydown", function (d) {
        return g.onKeyPress(d, b);
      });
      window.onbeforeunload = function () {
        return b.beforeUnload();
      };
      ui.click(f.el, function (d) {
        return b.closeMenus();
      });
      ui.addClass(f.el, "cursor");
      this.log.cmd.add(function (d) {
        return b.cmd(d);
      });
      this.contextMenu();
      f.events.userChange.add(function () {
        return b.onUserChange();
      });
      f.events.hashIdChange.add(function (d) {
        return b.onHashIdChg(d);
      });
      f.events.hashChange.add(function (d) {
        return b.onHashChange(d);
      });
      if (void 0 !== f.events.hashDiff) this.onHashChange(f.events.hashDiff);
      this.onHashChange(f.hash.pairs);
      this.exp();
      f.layout.opener.mrg.add(function (d, k) {
        return b.onMerge(d, k);
      });
      if (f.isSOnCl) this.onSaveNeed();
      f.events.saveNeed.add(function () {
        return b.onSaveNeed();
      });
      f.title.change.add(function () {
        return b.onTitleChange();
      });
      this.onTitleChange();
      this.checkDemoLogin();
      ui.click(f.titleEl, function (d) {
        return b.onTitleClick();
      });
      window.addEventListener(
        "message",
        function (d) {
          return b.onMsg(d);
        },
        !1,
      );
      f.events.helpChange.add(function (d, k) {
        return b.openHelp(d, k);
      });
      f.events.helpPageChange.add(function (d, k, f) {
        return b.openHelpPage(d, k, f);
      });
      a.checkHelp(f, f.hash.pairs);
      a.checkPage(f, f.hash.pairs);
      this.initAfter(this);
      this.log.onChg.add(function (d, k) {
        return b.onlineChange(d, k);
      });
      if (f.is1Loaded) this.onTimetableChange(this._t(), e.openType.open);
      f.events.timetableChange.add(function (d, k) {
        return b.onTimetableChange(d, k);
      });
      this.checkBrowser();
    };
    h.prototype.checkBrowser = function () {
      ui.isIE11() &&
        this.vA.isMaker() &&
        this.vA.inf.mandatory(
          "Please use modern browser like Chrome, Firefox, Edge, Safari, Opera or similar. " +
            ui.linkMessage("#requirements", "Read system requirements"),
        );
    };
    h.prototype.initView = function (f, b) {
      var d = this,
        k = (f._v = f.vA.v);
      k.isMakerLoaded = !0;
      this.setIsDragOn(k, b);
      k.g.menuX.add(function (b) {
        return d.closeMenus(b);
      });
      k.dayTap.add(function (b, d) {
        return f.dayTap(d);
      });
      k.periodTap.add(function (b, d) {
        return f.periodTap(d);
      });
      k.rightCornerTap.add(function (b) {
        f.onTitleClick();
      });
      k.g.markV.add(function (b, d, k) {
        return f.onMarkPanel(b, d, k);
      });
      k.manageViews.add(function (b) {
        return d.views().open();
      });
      f.viewEvents = new g.viewEvents(f);
    };
    h.prototype.setIsDragOn = function (f, b) {
      f.isDragOn = !e.isViewer(this.user()) || b.isDemo();
    };
    h.prototype.initBoard = function (f) {
      f.play = new g.play(f);
      f.memory = new g.memory(f);
      f.tools = new g.tools(f);
      f.profile();
    };
    h.prototype.initAfter = function (f) {
      c.timeout(function () {
        return f.status();
      }, 100);
      c.timeout(function () {
        return f.menu();
      }, 1500);
      c.timeout(function () {
        return f.dataView().init(!0);
      }, 2e3);
      c.timeout(function () {
        return f.docsView().loadFiles(!0);
      }, 3e3);
    };
    h.prototype.onTitleChange = function () {
      var f = this.vA.titleEl;
      if (this.vA.isWeb()) (ui.deleteClass(f, "abs"), (f.style.width = "auto"));
      else {
        var b = ui.getBoxWidth(this.vA.hiddenTitle);
        if (0 !== b) {
          b += 8;
          var d =
              num.toInt(ui.computedStyle(this.memory.el, "left")) +
              ui.getBoxWidth(this.memory.el),
            k = this.vA.isMaker()
              ? this.vA.v.size.window.width
              : c.windowWidth(),
            q = k - 2 * d,
            l = b > q;
          q = Math.min(b, l ? k - d - 77 - 20 : q);
          ui.setLeft(f, l ? d + 10 : Math.floor((k - b) / 2));
          ui.addClass(f, "abs");
          ui.setWidth(f, q);
        }
      }
    };
    h.prototype.onTitleClick = function () {
      this.allow.canSaveTimetable(!0) &&
        this.allow.creatorOrOwnerCheck(!0) &&
        (this.setCurrent(e.file, this._t()),
        (this.docView().mode = g.docMode.edit),
        this.docView().open());
    };
    h.prototype.onSaveNeed = function () {
      this.vA.isMaker() &&
        (this.log.w("save client t"), new g.saveM(this).save());
    };
    h.prototype.exp = function () {
      this.vA.isMaker() &&
        this.vA.config.exp.msg &&
        this.vA.inf.mandatory(
          this.vA.config.exp.msg +
            " " +
            g.profilePanel.getBuyMessage(this._t()) +
            " to extend subscription" +
            (this.allow.isPurchased()
              ? "."
              : " or " +
                ui.linkMessage("#contact", "contact us") +
                " to extend evaluation period."),
        );
    };
    h.prototype.onUserChange = function () {
      var f = this;
      this.checkDemoLogin();
      this.profile().onUserChange();
      this._v.g.vs.forEach(function (b) {
        return f.setIsDragOn(b, f.allow);
      });
    };
    h.prototype.onHashChange = function (f) {
      this.chkAD(f);
      this.checkWebHashes(f);
      this.printView().onHashChange();
    };
    h.prototype.checkWebHashes = function (f) {
      c.hasHash(f, "contact")
        ? this.contactView().open()
        : c.hasHash(f, "login")
          ? this.loginView().open()
          : c.hasHash(f, "basic")
            ? this.profile().signUp(e.planType.basic)
            : c.hasHash(f, "premium")
              ? this.profile().signUp(e.planType.premium)
              : c.hasHash(f, "forget") && this.forgetView().open();
    };
    h.prototype.openHelp = function (f, b) {
      this.menu().onHelp(f, b);
    };
    h.prototype.openHelpPage = function (f, b, d) {
      this.helpView().go(b, d);
      this.log.w("#" + f);
    };
    h.prototype.onHelpClosed = function () {
      var f = c.findHashKeys(
        this.vA.hash.pairs,
        a.helpHashes.concat(a.pageHashes),
      );
      f && this.vA.hash.dels([f[0]]);
      this.helpView().postClosedMessage();
    };
    h.prototype.onMsg = function (f) {
      f = f.data;
      if ("esc" === f) this.helpView().win.close();
      else if (ui.iOS() && str.startsWith(f, "scr:"))
        ((f = num.toInt(f.substring(4))), this.helpView().iOsScrTo(f));
      else if ("contact" === f) this.profile().onContactClick(!1);
      else
        "signUp" === f &&
          (this.helpView().win.close(), this.profile().onPlans());
    };
    h.prototype.chkAD = function (f) {
      var b = c.findHashKeys(f, ["app", "demo"], !1);
      if (
        b &&
        null === b[1] &&
        this.vA.isMaker() &&
        !c.hasAnyHash(f, a.appHashes.concat(a.appHashes, a.helpHashes))
      )
        this.switchToWeb();
      else {
        b = -1;
        for (var d = 0, k = g.dateHashes; d < k.length; d++) {
          var q = k[d];
          ++b;
          c.hasHash(f, q) &&
            (this.switchToMaker(),
            this.isOffW || this.docsView().openFilter(b));
        }
        if (c.hasHash(f, "app-options")) {
          if ((this.switchToMaker(), !this.isOffW)) this.menu().onOptions();
        } else if (c.hasHash(f, "profile")) {
          if ((this.switchToMaker(), !this.isOffW))
            this.menu().onProfileClick();
        } else if (c.hasHash(f, "info")) {
          if ((this.switchToMaker(), !this.isOffW)) this.onTitleClick();
        } else if (c.hasHash(f, "days"))
          (this.switchToMaker(), this.isOffW || this.daysView().open());
        else if (c.hasHash(f, "periods"))
          (this.switchToMaker(), this.isOffW || this.periodsView().open());
        else if (c.hasHash(f, "data"))
          (this.switchToMaker(), this.isOffW || this.dataView().open());
        else if (c.hasHash(f, "subjects")) {
          if ((this.switchToMaker(), !this.isOffW)) this.menu().onSubjects();
        } else if (c.hasHash(f, "rooms")) {
          if ((this.switchToMaker(), !this.isOffW)) this.menu().onRooms();
        } else if (c.hasHash(f, "teachers")) {
          if ((this.switchToMaker(), !this.isOffW)) this.menu().onTeachers();
        } else if (c.hasHash(f, "classes")) {
          if ((this.switchToMaker(), !this.isOffW)) this.menu().onClasses();
        } else if (c.hasHash(f, "activities")) {
          if ((this.switchToMaker(), !this.isOffW)) this.menu().onActivities();
        } else if (
          c.hasHash(f, "about") &&
          (this.switchToMaker(), !this.isOffW)
        )
          this.menu().onAbout();
        this.vA.isWeb() &&
          (c.hasHash(f, "app")
            ? (this.log.w("go app"),
              this.switchToMaker(),
              this.checkDemoLogin())
            : c.hasHash(f, "demo") &&
              (this.log.w("go demo"),
              e.isDemoUser(this.user())
                ? (this.switchToMaker(), this.checkDemoLogin())
                : this.loginView().loginDemo()));
      }
    };
    h.prototype.checkDemoLogin = function () {
      e.isDemoUser(this.user()) &&
        this.vA.isMaker() &&
        g.memory.logInOrCreateAccountMsg(this.vA);
    };
    h.prototype.onHashIdChg = function (f) {
      new g.saveM(this).loseChg(!1)
        ? ((f = new a.openOptions(f, void 0, a.openM.o)),
          new a.opener(this.vA).open(f))
        : a.changeIdAndTitle(f, this.vA);
    };
    h.prototype.onTimetableChange = function (f, b) {
      this.reset();
      g.purge({
        mA: this,
        updateType:
          g.openUpdateTypes[
            g.openTypes.findIndex(function (d) {
              return d === b;
            })
          ],
        historyStates: this.vA.config.user.historyStates,
      });
    };
    h.prototype.reset = function () {
      this._v.g.resetSelection();
      this.viewEvents.extraViews.delIndividuals();
      this._currents = [];
      this.periodsView().filter.reset();
    };
    h.prototype.onlineChange = function (f, b) {
      f
        ? (this.isOffW && this.offlineView().win.close(),
          this.vA.isMaker() && this.vA.inf.add("Internet connection restored."),
          this.log.w(
            "Online after " + date.formatTime(new Date(b)),
            e.logType.warn,
          ))
        : this.vA.isMaker() &&
          ((f = "No Internet connection. "),
          this.allow.purchasedCheck()
            ? (f +=
                "Changes will be saved on this device only. The other option is to choose Save as > Local File.")
            : ((this.isOffW = !0), this.offlineView().open()),
          this.vA.inf.add(f));
    };
    h.prototype.onDataViewInit = function () {
      var f = this;
      this.dataView().win.closed.add(function (b) {
        return f.onDataViewClosed();
      });
    };
    h.prototype.switchToMaker = function () {
      var f = this,
        b = this.vA;
      b.isMaker() ||
        (this._isAb
          ? this.abrMsg()
          : (b.wA.leave(),
            ui.show(b.v.el),
            (b.mode = e.aM.m),
            b.hash.dels(a.webHashes),
            this.changeMode(),
            this.checkBrowser(),
            this._v.set(new r.upd(r.updTy.r)),
            b.el.focus(),
            c.timeout(function () {
              return f.onAnim();
            }, 150),
            this.log.w("Go to app")));
    };
    h.prototype.switchToWeb = function (f) {
      var b = this;
      void 0 === f && (f = !0);
      var d = this.vA;
      d.hash.dels(a.appHashes);
      d.mode = e.aM.w;
      this.memory.hide();
      this.menu().hide();
      this.profile().hide();
      this.closeNonModalWindows();
      ui.hide(this.status().el);
      this.changeMode();
      d.wA.back(f);
      c.timeout(function () {
        return b.onAnim();
      }, 150);
      this.log.w("Going to web");
    };
    h.prototype.changeMode = function () {
      this.vA.setElMode();
      this.vA.layout.onResize();
      this.onAppModeChange(this.vA);
    };
    h.prototype.closeNonModalWindows = function () {
      this.dataView().xOnOk();
      this.cardStyles().xOnOk();
      this.daysView().xOnOk();
      this.periodsView().xOnOk();
      this.optionsView().xOnOk();
      this.docView().win.close();
    };
    h.prototype.onAppModeChange = function (f) {
      this._v.setOverflow();
      this.vA.title.set();
    };
    h.prototype.onAnim = function () {
      this.vA.isMaker()
        ? (this.memory.show(), this.vA.title.set(!0))
        : (ui.setHeight(this.vA.el, 0),
          ui.hide(this.vA.v.el),
          ui.hide(this.status().el),
          this.memory.hide());
    };
    h.prototype.closeMenus = function (f) {
      f !== this.menu() && this.menu().hide();
      f !== this.profile() && this.profile().hide();
      f !== this.tools.zoom && this.tools.zoom.show(!1);
      this.tools.markPick.hide();
      this._v.g.onCtxX();
      this.marksPanel().win.close();
    };
    h.prototype.onMerge = function (f, b) {
      g.merge(this._t(), f, this);
    };
    h.prototype.setCurrent = function (f, b) {
      f = f.type;
      var d = this.findCurrent(f);
      d ? (d.entity = b) : this._currents.push({ type: f, entity: b });
    };
    h.prototype.getCurrent = function (f) {
      return (f = this.findCurrent(f.type)) && f.entity;
    };
    h.prototype.findCurrent = function (f) {
      return this._currents.find(function (b) {
        return b.type === f;
      });
    };
    h.prototype.resetCurrent = function (f) {
      this.setCurrent(f, void 0);
    };
    h.prototype.dayTap = function (f) {
      this.setCurrent(
        e.day,
        this._t().days.find(function (b) {
          return b.position === f + 1;
        }),
      );
      this.daysView().open();
    };
    h.prototype.periodTap = function (f) {
      this.setCurrent(
        e.period,
        e.getDefaultPeriods(this._t()).find(function (b) {
          return b.position === f;
        }),
      );
      this.periodsView().open();
    };
    h.prototype.onMarkPanel = function (f, b, d) {
      (this.marksPanel().ve === b && this.marksPanel().isOpen()) ||
        this.marksPanel().set(f, b, d);
    };
    h.prototype.onDataViewClosed = function () {
      this.vA.hash.dels(
        "data subjects rooms teachers classes activities".split(" "),
      );
    };
    h.prototype.confirm = function (f) {
      return ui.confirm(f, this.log);
    };
    h.prototype.alert = function (f) {
      return this.vA.alert(f);
    };
    h.prototype.beforeUnload = function () {
      var f = this.vA.isSave()
        ? this.vA.loc.get(
            "WaitToFinishSavingChangesConfirm",
            "Please wait a second to finish saving timetable changes and then click OK.",
          )
        : new g.saveM(this).loseChgMsg(!0);
      f && this.log.w(f, e.logType.warn);
      return f;
    };
    h.prototype.cmd = function (f) {
      f === http.cmds.ver || f === http.cmds.web
        ? this.vA.isPublish() ||
          this._isReloading ||
          ((this._isReloading = this.loseChgOk = !0),
          f === http.cmds.ver
            ? (this.vA.inf.add(
                "A newer version of " +
                  this.vA.title.appName +
                  " is available. The page will be refreshed in 20 seconds...",
              ),
              c.timeout(function () {
                return c.reload();
              }, 2e4))
            : (c.location().href = this.url.getPage("")))
        : f === http.cmds.abort
          ? this.abr()
          : f !== http.cmds.save ||
            this._isSave ||
            ((this._isSave = !0), new g.saveM(this).save());
    };
    h.prototype.abr = function () {
      this._isAb = !0;
      this.vA.isMaker() && (this.switchToWeb(), this.abrMsg());
    };
    h.prototype.abrMsg = function () {
      this.vA.inf.mandatory(
        "Access denied due to abusing our terms of service. " +
          ui.linkMessage("#troubleshooting", "Troubleshooting"),
      );
    };
    h.prototype.user = function () {
      return this.vA.config.user;
    };
    h.prototype.profile = function () {
      this._profile || (this._profile = new g.profilePanel(this));
      return this._profile;
    };
    h.prototype.status = function () {
      this._sb || (this._sb = new g.statusBar(this));
      return this._sb;
    };
    h.prototype.menu = function () {
      this._me || (this._me = new g.menu(this));
      return this._me;
    };
    h.prototype.dataView = function () {
      var f = this;
      this._dataView ||
        ((this._dataView = new g.dataView(this, "dataView")),
        (this._dataView.initialized = function () {
          return f.onDataViewInit();
        }));
      return this._dataView;
    };
    h.prototype.activityView = function () {
      this._actV || (this._actV = new g.activityView(this, "lessonView"));
      return this._actV;
    };
    h.prototype.docView = function () {
      this._dv || (this._dv = new g.docView(this, "docView"));
      return this._dv;
    };
    h.prototype.docsView = function () {
      this._dsv || (this._dsv = new g.docsView(this, "docsView"));
      return this._dsv;
    };
    h.prototype.daysView = function () {
      this._dav || (this._dav = new g.daysView(this, "daysView"));
      return this._dav;
    };
    h.prototype.periodsView = function () {
      this._pev || (this._pev = new g.periodsView(this, "periodsView"));
      return this._pev;
    };
    h.prototype.groupView = function () {
      this._groupView ||
        ((this._groupView = new g.groupView(this, "groupView")),
        (this._groupView.options = {
          ctx: this._groupView,
          mA: this,
          desc: e.group,
        }));
      return this._groupView;
    };
    h.prototype.selector = function () {
      this._selV || (this._selV = new g.selectorView(this, "selectorView"));
      return this._selV;
    };
    h.prototype.cardStyles = function () {
      this._cd || (this._cd = new g.cardStyles(this, "cardDesigner"));
      return this._cd;
    };
    h.prototype.sharesView = function () {
      this._ssv || (this._ssv = new g.sharesView(this, "sharesView"));
      return this._ssv;
    };
    h.prototype.shareView = function () {
      this._sv || (this._sv = new g.shareView(this, "shareView"));
      return this._sv;
    };
    h.prototype.publishView = function () {
      this._pv || (this._pv = new g.publishView(this, "publishView"));
      return this._pv;
    };
    h.prototype.printView = function () {
      this._printV || (this._printV = new g.printView(this, "printView"));
      return this._printV;
    };
    h.prototype.optionsView = function () {
      this._ov || (this._ov = new g.optionsView(this, "optionsView"));
      return this._ov;
    };
    h.prototype.contactView = function () {
      this._cv || (this._cv = new g.contactView(this, "contactView"));
      return this._cv;
    };
    h.prototype.forgetView = function () {
      this._forV || (this._forV = new g.forgetView(this, "forgetView"));
      return this._forV;
    };
    h.prototype.offlineView = function () {
      this._offV || (this._offV = new g.offlineView(this, "offV"));
      return this._offV;
    };
    h.prototype.contextMenu = function () {
      this._cMenu || (this._cMenu = new g.contextMenu(this));
      return this._cMenu;
    };
    h.prototype.uploadView = function () {
      this._uploadView ||
        (this._uploadView = new g.uploadView(this, "fileView"));
      return this._uploadView;
    };
    h.prototype.marksPanel = function () {
      this._mp || (this._mp = new g.marksPanel(this, "markView"));
      return this._mp;
    };
    h.prototype.loginView = function () {
      this._lv || (this._lv = new g.loginView(this, "loginView"));
      return this._lv;
    };
    h.prototype.htmlView = function () {
      this._htmlV || (this._htmlV = new g.htmlView(this, "htmlView"));
      return this._htmlV;
    };
    h.prototype.csvView = function () {
      this._csvV || (this._csvV = new g.csvView(this, "csvView"));
      return this._csvV;
    };
    h.prototype.views = function () {
      this._views || (this._views = new g.views(this, "viewsView"));
      return this._views;
    };
    h.prototype.helpView = function () {
      var f = this;
      this._hlpV ||
        ((this._hlpV = new g.helpView(this, "browser")),
        this._hlpV.win.closed.add(function (b) {
          return f.onHelpClosed();
        }));
      return this._hlpV;
    };
    h.prototype.aboutView = function () {
      this._aboutView || (this._aboutView = new g.aboutView(this, "aboutView"));
      return this._aboutView;
    };
    h.prototype._t = function () {
      return this.vA.t;
    };
    return h;
  })();
  g.mA = p;
  g.gotoPage = function (h, f) {
    try {
      new g.saveM(f).loseChg(!0) && (h ? f.vA.url.gotoPage(h) : c.reload());
    } catch (b) {
      f.vA.error.on(b);
    }
  };
})(m || (m = {}));
(function (g) {
  function p(f, b) {
    b = obj.merge({ monthFirst: h() }, b);
    return date.format(f, b);
  }
  function h() {
    var f = window.navigator ? navigator.language : void 0;
    f = f ? f.toLowerCase() : f;
    return (
      !!f &&
      ("en-us" === f ||
        "fa-ir" === f ||
        "sw-ke" === f ||
        "es-pa" === f ||
        "en-029" === f ||
        "en-zw" === f ||
        "en-ph" === f ||
        "rw-rw" === f ||
        "moh-ca" === f ||
        "fil-ph" === f ||
        "ne-np" === f)
    );
  }
  g.getDateTime = function (f) {
    return p(f, { includeDayName: !0, includeTime: !0 });
  };
  g.getDate = function (f) {
    return p(f, { includeDayName: !0 });
  };
  g.getShortDate = function (f) {
    return p(f, { removeCurrentYear: !0 });
  };
})(m || (m = {}));
(function (g) {
  g.getFilesFromStorage = function (g) {
    g = g.storage.get(p, !0);
    void 0 !== g && obj.preps(g, e.file);
    return g;
  };
  g.saveFilesInStorage = function (g, f) {
    f = obj.cloneAndMinifyArray(f, e.file);
    g.storage.set(p, f, !0);
  };
  g.clearStorageOnLogout = function (g) {
    g.timetableStorage.removeTimetables(!0);
    g.storage.removeKeys([p, c.infoKey, "messageHistory"]);
  };
  var p = "timetables";
})(m || (m = {}));
(function (g) {
  function p(f, b) {
    var d = !!f;
    return (
      " ".concat(ui.linkMessage(b, "Read more")) +
      "&nbsp; " +
      (d
        ? "".concat(
            ui.linkMessage(
              "https://www.youtube.com/watch?v=" + f,
              "Watch video",
            ),
          )
        : "")
    );
  }
  var h = (function () {
    function f(b) {
      this.mA = b;
    }
    f.prototype.viewer = function () {
      return this.mA.vA;
    };
    f.prototype.web = function () {
      return this.viewer().wA;
    };
    f.prototype.user = function () {
      return this.mA.user();
    };
    f.prototype._t = function () {
      return this.mA._t();
    };
    f.prototype.loc = function () {
      return this.viewer().loc;
    };
    f.prototype.log = function () {
      return this.mA.log;
    };
    f.prototype.inf = function () {
      return this.viewer().inf;
    };
    f.prototype.allow = function () {
      return this.mA.allow;
    };
    f.prototype.find = function (b) {
      return ui.find(b, this.viewer().el);
    };
    f.prototype.mainView = function () {
      return this.mA._v;
    };
    return f;
  })();
  g.baseView = h;
  g.onCopyToOver = function (f) {
    ui.addClass(ui.findParentClass(ui.target(f), "formRegion"), "over");
  };
  g.onCopyToOut = function (f) {
    ui.deleteClass(ui.findParentClass(ui.target(f), "formRegion"), "over");
  };
  g.videoGuide = p;
  g.guide = function (f) {
    return p("", f);
  };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      var k = h.call(this, b) || this;
      k._isCancel = !0;
      k.className = d;
      var f = (k.win = new c.win(b.vA, d));
      f.resize.add(function () {
        return k.onResize();
      });
      f.opened.add(function () {
        return k.onOpen();
      });
      f.beforeClose.add(function (b) {
        return k.beforeClose();
      });
      f.closed.add(function (b) {
        return k.onClose();
      });
      ui.on(k.win.el, "keydown", function (b) {
        return k.onKeyDown(b);
      });
      f.titleChange.add(function (b) {
        return k.onTitleChg(b);
      });
      f.focused.add(function () {
        return k.onTitleChg(f.title());
      });
      return k;
    }
    __extends(f, h);
    f.prototype.title = function (b) {
      this.win.title(b);
    };
    f.prototype.open = function () {
      this._isCancel = !0;
      this.mA.closeMenus(void 0);
      var b = this.win.isOpen;
      this.win.open();
      this.mA.log.w(this.className);
      if (!b) this.onResize();
    };
    f.prototype.onResize = function () {
      if (this.options && this.options.grid) this.options.grid.onResize();
    };
    f.prototype.onOpen = function () {
      this.onTitleChg(this.win.title());
    };
    f.prototype.onTitleChg = function (b) {
      if (this.win.isOpen) this.viewer().title.onWindowTitleChange(b);
    };
    f.prototype.onListResize = function (b) {
      var d = this.win.content,
        k = ui.getComputedWidth(d);
      d = ui.getComputedHeight(d) - 20;
      ui.setWidthHeight(b.el, k - 15, d);
      ui.setHeight(b.barEl, d);
    };
    f.prototype.beforeClose = function () {
      if (this._isCancel) this.onCancel();
      this.viewer().title.onWindowTitleChange("");
    };
    f.prototype.xOnOk = function () {
      this._isCancel = !1;
      this.win.close();
    };
    f.prototype.isOpen = function () {
      return this.win.isOpen;
    };
    f.prototype.onCancel = function () {
      this.options &&
        this.options.grid &&
        g.isNewEntity(this.options) &&
        this.mA.setCurrent(this.options.desc, this.options.grid.lastSelected());
    };
    f.prototype.onClose = function () {};
    f.prototype.find = function (b) {
      return ui.find(b, this.win.content);
    };
    f.prototype.onKeyDown = function (b) {
      if (void 0 !== this.ok && void 0 === this.preventEnter)
        keys.enter(b) && (this.ok(), ui.stopDefaultPropagation(b));
      else if (this.options && this.options.grid)
        this.options.grid.onKeyDown(b);
    };
    f.prototype.getColorPicker = function () {
      var b = e.isA(this.user());
      return new c.cPick({
        el: this.viewer().el,
        pickEl: this.find(".colorPicker"),
        win: this.win,
        addHtmlInput: b,
      });
    };
    f.prototype.bindArbitrary = function (b, d, k, f) {
      void 0 === f && (f = 0);
      b.bind(
        this.getArbitraryPairs(this.mA, f, d),
        void 0 === k ? "-1" : k + "",
      );
    };
    f.prototype.getArbitraryPairs = function (b, d, k) {
      return [["-1", "Arbitrary"]].concat(
        arr.range(d, k).map(function (b) {
          return [b + "", b + ""];
        }),
      );
    };
    f.prototype.setCurrent = function (b) {
      this.mA.setCurrent(this.options.desc, b);
    };
    f.prototype.current = function () {
      return this.mA.getCurrent(this.options.desc);
    };
    f.prototype.forceGrid = function () {
      this.options.grid.isDirty = !0;
      g.bindGrid(this.options);
    };
    f.prototype.getMore = function (b, d, k) {
      var f = this;
      k || (k = {});
      k.svgDef = this.mA.vA.svgDef;
      b = c.getMore(b, d, k);
      b.expander.change.add(function (b) {
        return f.onExpanderChange();
      });
      return b;
    };
    f.prototype.onExpanderChange = function () {
      this.win.setContentSize(!0);
    };
    f.prototype.isNew = function () {
      return g.isNewEntity(this.options);
    };
    f.prototype.isEdit = function () {
      return !this.isNew();
    };
    f.prototype.newColumn = function (b, d, k) {
      return new c.gridColumn(b, d, k);
    };
    return f;
  })(g.baseView);
  g.windowView = p;
  g.setCustomId = function (g, f) {
    f = new c.input(ui.find("." + f, g));
    g = ui.find(".customIdHint", g);
    ui.hint(g, "Used when exporting timetable to custom file", c.hintPos.left);
    return f;
  };
  g.setText = function (g, f) {
    g.setValue(f ? str.htmlDecode(f) : "");
  };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b) {
      return h.call(this, b, "") || this;
    }
    __extends(f, h);
    f.prototype.setPasteMode = function (b) {
      g.setPasteMode(this.options, b);
    };
    f.prototype.isOpen = function () {
      return this.mA.dataView().isTabOpen(this);
    };
    f.prototype.open = function () {};
    f.prototype.onKeyDown = function (b) {
      return this.options.grid.onKeyDown(b);
    };
    return f;
  })(g.windowView);
  g.tabView = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function h(f, b, d, k) {
      this.xClk = [!1];
      this.subItems = [];
      this.isSvg = !1;
      this.text = f;
      this.description = b;
      this.icon = d;
      this.options = k;
      this.el = (f = this.isLink()) ? ui.getTag("a") : ui.getDiv();
      f &&
        ((f = this.el),
        (f.href = k.url),
        k.target && (f.target = k.target),
        k.rel && (f.rel = k.rel));
    }
    h.prototype.isLink = function () {
      return !!this.options && !!this.options.url;
    };
    h.svg = function (f, b, d, k) {
      f = new g.menuItem(f, b, d, k);
      f.isSvg = !0;
      return f;
    };
    h.prototype.set = function (f, b) {
      var d = this;
      this.menu = f;
      this.i = b;
      this.iconEl = this.isSvg
        ? svg.tag("svg", "svgIcon")
        : ui.getDiv("icon " + this.icon);
      this.isSvg &&
        ((f = svg.tag("use")),
        svg.setXlink(f, this.icon + "D"),
        this.iconEl.appendChild(f));
      this.textEl = ui.setText(ui.getDiv("name"), this.text);
      ui.appends([this.iconEl, this.textEl], this.el);
      this.isTop()
        ? ((this.arrEl = ui.getDiv("arrow")),
          ui.append(
            this.arrEl,
            ui.addClass(ui.dat(this.el, "index", b.toString()), "top"),
          ))
        : ((this.descEl = ui.setText(ui.getDiv("desc"), this.description)),
          ui.append(this.descEl, ui.addClass(this.el, "sub")));
      this.isLink() ||
        ui.click(this.el, function (b) {
          return d.onClk(b);
        });
      ui.on(this.el, "mouseover", function (b) {
        return d.onOver(b);
      });
      ui.on(this.el, "mouseout", function (b) {
        return d.onOut(b);
      });
    };
    h.prototype.addSubItems = function (f, b) {
      var d;
      this.ctx = f;
      for (var k = 0; k < b.length; k++) {
        var q = b[k];
        q.parent = this;
        q.ctx = f;
      }
      (d = this.subItems).push.apply(d, b);
    };
    h.prototype.onClk = function (f) {
      var b = keys.ctrlAltShift(f);
      if (!this.isTop()) {
        var d = this.ctx;
        b && (d.freeze = !d.freeze);
        d.freeze || d.hide(200);
      }
      ui.call(this.click, this.ctx, f);
      return !0;
    };
    h.prototype.onOver = function (f) {
      ui.addClass(this.el, "over");
      this.isTop() ||
        this.menu.lastOver === this.parent ||
        ((this.menu.lastOver = this.parent), this.menu.afterMainOver());
      ui.call(this.over, this.menu, this);
    };
    h.prototype.onOut = function (f) {
      this.isTop() || keys.ctrlAltShift(f) || ui.deleteClass(this.el, "over");
      ui.call(this.out, this.menu, this);
    };
    h.prototype.isOver = function () {
      return ui.hasClass(this.el, "over");
    };
    h.prototype.isTop = function () {
      return void 0 === this.parent;
    };
    return h;
  })();
  g.menuItem = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b) {
      var d = h.call(this, b) || this;
      d.mainOverTo = -1;
      d.is2Clk = !1;
      d.subMenus = [];
      d.mis = [];
      d.isOpen = !1;
      d.hideTo = 0;
      d.freeze = !1;
      d.init();
      d.render();
      b = b.vA.owl.el;
      ui.click(b, function (b) {
        return d.onOwlClick(b);
      });
      ui.on(b, "mouseover", function (b) {
        return d.owIn();
      });
      ui.on(b, "mouseout", function (b) {
        return d.owOut();
      });
      return d;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this,
        d = g.menuItem.svg("Open", "", "open"),
        k = g.menuItem.svg("New Timetable", "Create a new timetable", "new"),
        f = g.menuItem.svg(
          "Open Timetable",
          "Open your timetable",
          "timetable",
        ),
        l = g.menuItem.svg(
          "Open Examples",
          "Explore automatically generated timetables",
          "example",
        ),
        n = g.menuItem.svg(
          "Open from File",
          "Open timetable from a file",
          "uploadFile",
        ),
        t = g.menuItem.svg(
          "Timetable Info",
          "Set basic info, school name and year",
          "home",
        ),
        h = g.menuItem.svg(
          "Merge Timetables",
          "Merge data and resources with same names",
          "merge",
        );
      d.addSubItems(this, [k, f, l, n, t, h]);
      var u = g.menuItem.svg("Manage", "", "manage"),
        x = g.menuItem.svg("Days", "Manage days", "days"),
        y = g.menuItem.svg("Periods", "Manage periods", "timetable"),
        z = g.menuItem.svg("Subjects", "Manage subjects/courses", "subject"),
        A = g.menuItem.svg("Rooms", "Manage rooms", "room"),
        B = g.menuItem.svg("Teachers", "Manage teachers", "teacher"),
        p = g.menuItem.svg(
          "Classes",
          "Manage classes and their groups/students",
          "class",
        ),
        I = g.menuItem.svg(
          "Activities",
          "Manage activities, filter and export statistics",
          "lesson",
        );
      u.addSubItems(this, [x, y, z, A, B, p, I]);
      var F = g.menuItem.svg("Import", "", "import"),
        C = g.menuItem.svg(
          "Days",
          "Import/merge days using copy & paste",
          "days",
        ),
        G = g.menuItem.svg(
          "Periods",
          "Import/merge periods using copy & paste",
          "timetable",
        ),
        H = g.menuItem.svg(
          "Subjects",
          "Import subjects using copy & paste",
          "subject",
        ),
        D = g.menuItem.svg("Rooms", "Import rooms using copy & paste", "room"),
        J = g.menuItem.svg(
          "Teachers",
          "Import teachers using copy & paste",
          "teacher",
        ),
        L = g.menuItem.svg(
          "Classes",
          "Import classes using copy & paste",
          "class",
        ),
        K = g.menuItem.svg(
          "Activities",
          "Import activities using copy & paste",
          "lesson",
        );
      F.addSubItems(this, [C, G, H, D, J, L, K]);
      var P = g.menuItem.svg("Save as", "", "saveAs"),
        R = g.menuItem.svg(
          "Copy of Timetable",
          "Create a timetable copy",
          "timetable",
        ),
        O = g.menuItem.svg(
          "Local File",
          "Save timetable as a file",
          "download",
        ),
        M = g.menuItem.svg(
          "Custom File",
          "Export timetable to other software formats",
          "csv",
        ),
        Q = g.menuItem.svg(
          "Spreadsheet(s)",
          "Export timetable(s) and availability to Excel",
          "html",
        );
      P.addSubItems(this, [R, O, M, Q]);
      var U = g.menuItem.svg("Share", "", "share"),
        N = g.menuItem.svg(
          "Share with Others",
          "Manage staff with access to timetables",
          "key",
        ),
        W = g.menuItem.svg(
          "Publish to the Web",
          "Teachers and students view their timetable online",
          "web",
        ),
        S = g.menuItem.svg(
          "Embed Timetable",
          "Add timetable to the school website",
          "home",
        );
      U.addSubItems(this, [N, W, S]);
      var Z = g.menuItem.svg("Print", "", "print"),
        X = g.menuItem.svg(
          "Print Timetable",
          "Print the current timetable view",
          "timetable",
        ),
        da = g.menuItem.svg(
          "Print Individuals",
          "Print individual timetables for the current view",
          "timetable1",
        ),
        Y = g.menuItem.svg(
          "Customize Cards",
          "Set text & styles for each master/individual view",
          "designer",
        );
      Z.addSubItems(this, [X, da, Y]);
      var T = g.menuItem.svg("Help", "", "help"),
        V = g.menuItem.svg(
          "Options",
          "Choose skin, period format, default view...",
          "options",
        ),
        ea = ui.iOS(),
        aa = ea
          ? { url: this.mA.url.getFull("help"), target: "_blank" }
          : void 0;
      aa = g.menuItem.svg("User Guide", "Explore User Guide", "guide", aa);
      var ka = g.menuItem.svg(
          "Introductory Videos",
          "Get started quickly by watching short videos",
          "video",
          { url: e.introVideos, target: "_blank", rel: "noopener" },
        ),
        ia = g.menuItem.svg("Home Page", "Check Plans & Pricing", "homePage", {
          url: "#intro",
        }),
        la = g.menuItem.svg("About", "What's new, report an issue", "info"),
        ma = g.menuItem.svg(
          "Contact Us",
          "Send feedback and contact support",
          "email10",
        );
      T.addSubItems(this, [V, aa, ka, ia, la, ma]);
      this.mis = [d, u, F, P, U, Z, T];
      k.click = function (d) {
        return b.onNew();
      };
      f.click = function (d) {
        return b.onOpen();
      };
      l.click = function (d) {
        return b.onOpenExamples();
      };
      n.click = function (d) {
        return b.onOpenFile();
      };
      t.click = function (d) {
        return b.mA.onTitleClick();
      };
      h.click = function (d) {
        return b.onMerge();
      };
      x.click = function (d) {
        return b.onDays();
      };
      y.click = function (d) {
        return b.onPeriods();
      };
      z.click = function (d) {
        return b.onSubjects();
      };
      A.click = function (d) {
        return b.onRooms();
      };
      B.click = function (d) {
        return b.onTeachers();
      };
      p.click = function (d) {
        return b.onClasses();
      };
      I.click = function (d) {
        return b.onActivities();
      };
      C.click = function (d) {
        return b.mA.daysView().open(!0);
      };
      G.click = function (d) {
        return b.mA.periodsView().open(!0);
      };
      H.click = function (d) {
        return b.openTab(0, !0);
      };
      D.click = function (d) {
        return b.openTab(1, !0);
      };
      J.click = function (d) {
        return b.openTab(2, !0);
      };
      L.click = function (d) {
        return b.openTab(3, !0);
      };
      K.click = function (d) {
        return b.openTab(4, !0);
      };
      R.click = function (d) {
        return b.onSaveAs();
      };
      O.click = function (d) {
        return b.onSaveJson();
      };
      M.click = function (d) {
        return b.onSaveCsv(d);
      };
      Q.click = function (d) {
        return b.onSaveHtml();
      };
      X.click = function (d) {
        return b.onPrintView();
      };
      da.click = function (d) {
        return b.onPrintIndividuals();
      };
      Y.click = function (d) {
        return b.onCustomize();
      };
      N.click = function (d) {
        return b.onShare();
      };
      W.click = function (d) {
        return b.onPublish();
      };
      S.click = function (d) {
        return b.onPublish(g.publishType.embed);
      };
      V.click = function (d) {
        return b.onOptions();
      };
      ea ||
        (aa.click = function (d) {
          return b.onHelp();
        });
      la.click = function (d) {
        return b.onAbout();
      };
      ma.click = function (d) {
        return b.mA.profile().onContactClick();
      };
    };
    f.prototype.onOwlClick = function (b) {
      if (!this.viewer().isMaker()) return !1;
      ui.stopDefaultPropagation(b);
      this.onClk();
      this.clearTime();
      return !0;
    };
    f.prototype.owIn = function () {
      this.viewer().isMaker() && this.clearTime();
    };
    f.prototype.owOut = function () {
      this.viewer().isMaker() && this.setHideTout();
    };
    f.prototype.setHideTout = function () {
      var b = this;
      this.clearTime();
      this.hideTo = c.timeout(function () {
        return b.onTout();
      }, 700);
    };
    f.prototype.clearTime = function () {
      clearTimeout(this.hideTo);
    };
    f.prototype.onTout = function () {
      this.hide(100);
    };
    f.prototype.onNew = function () {
      this.allow().creatorOrOwnerCheck(!0) &&
        ((this.mA.docView().mode = g.docMode._new), this.mA.docView().open());
    };
    f.prototype.onOpen = function () {
      this.mA.docsView().openMode(g.openMode.open);
    };
    f.prototype.onOpenExamples = function () {
      this.mA.docsView().openMode(g.openMode.examples);
    };
    f.prototype.onOpenFile = function () {
      this.log().w("Open from json");
      this.allow().paidCheck(!0) &&
        this.allow().creatorOrOwnerCheck(!0) &&
        this.mA.uploadView().open();
    };
    f.prototype.onMerge = function () {
      this.allow().creatorOrOwnerCheck(!0) &&
        this.mA.docsView().openMode(g.openMode.merge);
    };
    f.prototype.onDays = function () {
      this.mA.daysView().open();
    };
    f.prototype.onPeriods = function () {
      this.mA.periodsView().open();
    };
    f.prototype.onSubjects = function () {
      this.openTab(0);
    };
    f.prototype.onRooms = function () {
      this.openTab(1);
    };
    f.prototype.onTeachers = function () {
      this.openTab(2);
    };
    f.prototype.onClasses = function () {
      this.openTab(3);
    };
    f.prototype.onActivities = function () {
      this.openTab(4);
    };
    f.prototype.openTab = function (b, d) {
      void 0 === d && (d = !1);
      this.mA.dataView().openTab(b, d);
    };
    f.prototype.onSaveAs = function () {
      this.log().w("Save as");
      this.allow().freeOrPurchasedCheck(!0) &&
        this.allow().creatorOrOwnerCheck(!0) &&
        ((this.mA.docView().mode = g.docMode.saveAs), this.mA.docView().open());
    };
    f.prototype.onSaveJson = function () {
      this.log().w("Save as Json");
      if (this.allow().freeOrPurchasedCheck(!0)) {
        var b = this.viewer().getApiUrl(
          "timetables/" + this._t().id + "/download",
        );
        this.inf().add(
          "If the download doesn't start shortly ".concat(
            ui.linkMessage(b, "click here"),
          ),
        );
        b = obj.cloneAndMinify(this._t(), e.timetable);
        (b = c.stringify(b, !0)) && ui.download(this._t().name + ".json", b);
      }
    };
    f.prototype.onSaveCsv = function (b) {
      this.log().w("Save as CSV");
      this.mA.csvView().open();
    };
    f.prototype.onSaveHtml = function () {
      this.log().w("Save as Html");
      this.mA.htmlView().open();
    };
    f.prototype.onPrintView = function () {
      this.log().w("Print");
      this.allow().paidOrExampleCheck() && this.mA.printView().openWindow(!1);
    };
    f.prototype.onPrintIndividuals = function () {
      this.log().w("Print inidividuals");
      this.allow().paidOrExampleCheck() && this.mA.printView().openWindow(!0);
    };
    f.prototype.onCustomize = function () {
      var b = g.getCustomizedVc(this.mainView());
      b
        ? this.mA.cardStyles().openVc(b)
        : this.inf().add(
            this.loc().get(
              "ChooseManageLessonsFirst",
              "Choose 'Manage > Activities' to add activities, first",
            ),
          );
    };
    f.prototype.onShare = function () {
      this.mA.sharesView().open();
    };
    f.prototype.onPublish = function (b) {
      void 0 === b && (b = g.publishType.publish);
      this.mA.publishView().open(b);
    };
    f.prototype.onProfileClick = function () {
      this.log().w("Profile");
      this.mA.setCurrent(e.clientUser, this.user());
      var b = this.mA.shareView();
      b.options = {
        ctx: b,
        mA: this.mA,
        isAdd: !1,
        isCopy: !1,
        desc: e.clientUser,
        grid: void 0,
        state: !0,
      };
      b.open();
    };
    f.prototype.onOptions = function () {
      this.mA.optionsView().open();
    };
    f.prototype.onAbout = function () {
      this.mA.aboutView().open();
    };
    f.prototype.onHelp = function (b, d, k) {
      void 0 === k && (k = !1);
      var f = "";
      b
        ? (f = b + (d ? "&q=" + d : ""))
        : this.viewer().hash.updatePairs([["help", ""]]);
      this.mA.helpView().go("/help/?embed=1#" + f, "User guide", k);
      this.log().w("help#" + f);
    };
    f.prototype.render = function () {
      var b = this;
      this.el = ui.hide(ui.getDiv("menuPanel"));
      this.fA = new c.fA([this.el], 200);
      this.menuBrd = ui.getDiv("menuBorder");
      this.mainMenu = ui.getDiv("mainMenu");
      ui.append(this.menuBrd, this.el);
      ui.append(this.mainMenu, this.menuBrd);
      for (var d = 0; d < this.mis.length; d++) {
        var k = this.mis[d],
          f = k.subItems,
          l = f.length;
        k.set(this, d);
        var g = ui.getDiv("subMenu");
        ui.on(g, "mouseenter", function (d) {
          return b.afterMainOver();
        });
        ui.on(g, "mouseleave", function (d) {
          return b.onSubMenuOut(d);
        });
        for (var t = 0; t < l; t++) {
          var h = f[t];
          h.set(this, t);
          ui.append(h.el, g);
        }
        this.subMenus[d] = g;
        1 !== d && ui.hide(g);
        ui.append(k.el, this.mainMenu);
        ui.append(g, this.menuBrd);
        k.over = function (d) {
          return b.onMainOver(d);
        };
        k.out = function (d) {
          return b.onMainOut(d);
        };
        k.click = function (d) {
          return b.onMainClk(d);
        };
        if (1 === d) this.onMainOver(k);
      }
      ui.on(this.el, "mouseenter", function (d) {
        return b.onOver();
      });
      ui.on(this.el, "mouseleave", function (d) {
        return b.onOut(d);
      });
      ui.click(this.el, function (d) {
        return b.onMenuClick(d);
      });
      ui.append(this.el, this.viewer().el);
      ui.on(this.menuBrd, "mouseenter", function (d) {
        return b.onOver();
      });
      ui.on(this.menuBrd, "mouseleave", function (d) {
        return b.onBorderOut(d);
      });
    };
    f.prototype.onMenuClick = function (b) {
      ui.isIE11() || ui.stopPropagation(b);
    };
    f.prototype.onOver = function () {
      this.clearTime();
    };
    f.prototype.onSubMenuOut = function (b) {
      ui.stopPropagation(b);
    };
    f.prototype.onBorderOut = function (b) {
      ui.stopPropagation(b);
    };
    f.prototype.onOut = function (b) {
      this.setHideTout();
    };
    f.prototype.onMainClk = function (b) {
      b = ui._datN(ui.target(b), "index");
      this.lastOver = this.mis[b];
      this.afterMainOver();
    };
    f.prototype.onMainOver = function (b) {
      var d = this;
      this.lastOver = b;
      this.mainOverTo = c.timeout(function () {
        return d.afterMainOver();
      }, 200);
      this.clearTime();
      for (var k = 0, f = this.mis; k < f.length; k++) {
        var l = f[k];
        l !== b && ui.deleteClass(l.el, "over");
      }
    };
    f.prototype.onMainOut = function (b) {
      clearTimeout(this.mainOverTo);
    };
    f.prototype.afterMainOver = function () {
      for (var b = 0; b < this.mis.length; b++) {
        var d = this.mis[b],
          k = this.subMenus[b];
        b === this.lastOver.i
          ? (ui.addClass(d.el, "over"), ui.show(k))
          : (ui.deleteClass(d.el, "over"), ui.hide(k));
      }
    };
    f.prototype.onClk = function () {
      var b = this;
      c.timeout(function () {
        return b.onClkExp();
      }, ui.clickTimeout);
      this.is2Clk ||
        ((this.is2Clk = !0), this.isOpen ? this.hide(200) : this.show());
    };
    f.prototype.onClkExp = function () {
      this.is2Clk = !1;
    };
    f.prototype.show = function () {
      this.isOpen = !0;
      ui.setZIndex(this.el, ++c.win.zIndex);
      this.fA.toIn(0);
      this.viewer().owl.over();
      this.mA.closeMenus(this);
    };
    f.prototype.hide = function (b) {
      this.freeze ||
        ((this.isOpen = !1),
        this.fA.toOut(void 0 === b ? 0 : b),
        this.viewer().owl.out());
    };
    return f;
  })(g.baseView);
  g.menu = p;
})(m || (m = {}));
var c;
(function (g) {
  var p = (function () {
    function f(b) {
      this.addHtmlInput = this.is2Clk = this.isO = !1;
      this.el = b.el;
      this.pickEl = b.pickEl;
      this.win = b.win;
      this.addHtmlInput = b.addHtmlInput;
      this.go();
    }
    f.prototype.go = function () {
      var b = this;
      ui.on(this.win.el, "click", function (d) {
        return b.x(-1);
      });
      this.win.closed.add(function (d) {
        return b.x(-1);
      });
      ui.click(this.pickEl, function (d) {
        return b.onClk(d);
      });
      ui.on(this.pickEl, "keydown", function (d) {
        return b.pickKey(d);
      });
      ui.over(this.pickEl, function (d, k) {
        return ui.toggleClass(b.pickEl, "over", k);
      });
      this.colorsDiv = ui.getDiv("colorsPanel");
      var d = ui.getFragment();
      this.colEls = [];
      for (var k = e.getColors(), f = 0, l = k.length; f < l; f++) {
        var n = this.getColEl(k[f]);
        this.colEls.push(n);
        d.appendChild(n);
      }
      g.hasColInp() &&
        ((this.customColor = ui.getDiv("customColor")),
        (f = ui.getTag("label")),
        ui.setText(f, "Pick color"),
        (k = this.inputColor = ui.getTag("input")),
        ui.addClass(k, "inputColor"),
        ui.setAttribute(k, "type", "color"),
        (f = [f, k]),
        this.addHtmlInput &&
          ((l = this.htmlColor = ui.getTag("input")),
          ui.addClass(l, "htmlColor textBox"),
          ui.setAttribute(l, "type", "text"),
          ui.on(l, "keydown", function (d) {
            return b.onHtmlKey(d);
          }),
          f.push(l)),
        ui.appends(f, this.customColor),
        ui.on(k, "change", function (d) {
          return b.onCustomChg(d);
        }),
        d.appendChild(this.customColor));
      ui.append(d, this.colorsDiv);
      ui.hide(this.colorsDiv);
      ui.append(this.colorsDiv, this.el);
      ui.over(this.colorsDiv, function (d, k) {
        return k ? b.onDivMIn() : b.onDivMOut();
      });
      ui.click(this.colorsDiv, function (b) {
        return ui.stopPropagation(b);
      });
      ui.on(this.colorsDiv, "keydown", function (d) {
        return b.key(d);
      });
      this.oA = new g.fA([this.colorsDiv], 200);
      this.oA.ea = g.eaTy.oQuad;
      this.oA.xed.add(function () {
        return b.onFX();
      });
    };
    f.prototype.getColEl = function (b) {
      var d = this,
        k = ui.getDiv("pickColor");
      k.style.backgroundColor = b;
      ui.dat(k, "color", b);
      ui.click(k, function (b) {
        return d.onColClk(b);
      });
      ui.over(k, function (b, k) {
        return k ? d.onColOver(b) : d.onColOut(b);
      });
      return k;
    };
    f.prototype.setCol = function (b) {
      b
        ? g.hasColInp() && this.addHtmlInput && (this.htmlColor.value = b)
        : (b = e.getRandomColor());
      this.col = new r.color(b, !0);
      this.pickEl.style.backgroundColor = this.col.html();
      this.isO && this.setSel();
    };
    f.prototype.getCol = function () {
      return this.col.html();
    };
    f.prototype.onClk = function (b) {
      var d = this;
      g.timeout(function () {
        return (d.is2Clk = !1);
      }, ui.clickTimeout);
      this.is2Clk ||
        ((this.is2Clk = !0),
        ui.stopPropagation(b),
        this.isO ? this.x() : this.o());
    };
    f.prototype.o = function () {
      this.isO = !0;
      var b = ui.offset(this.pickEl),
        d = b.y + ui.getComputedHeight(this.pickEl) + 4;
      ui.setLeftTop(this.colorsDiv, b.x, d);
      ui.setZIndex(this.colorsDiv, ++g.win.zIndex);
      this.oA.toIn(200, 1);
      ui.show(this.colorsDiv, "block");
      this.setSel();
    };
    f.prototype.x = function (b) {
      void 0 === b && (b = 1);
      var d = this.isO;
      this.isO = !1;
      0 >= b ? this.hide() : this.oA.toOut(1 === b ? 100 : 400, 0);
      d && !this.oA.isGo() && 0 <= b && ui.setFocus(this.pickEl);
    };
    f.prototype.onFX = function () {
      this.isO || this.hide();
    };
    f.prototype.hide = function () {
      ui.hide(this.colorsDiv);
      ui.setOpacity(this.colorsDiv, 0);
    };
    f.prototype.setSel = function () {
      var b = this.col;
      if (b) {
        for (var d = !1, k = 0; k < this.colEls.length; k++) {
          var f = this.colEls[k],
            l = new r.color(ui._dat(f, "color"), !0);
          l.b === b.b && l.r === b.r && l.g === b.g
            ? ((d = !0), ui.addClass(f, "select"))
            : ui.deleteClass(f, "select");
        }
        d ||
          ((f = this.getColEl(b.html())),
          ui.addClass(f, "select"),
          this.colEls.push(f),
          g.hasColInp()
            ? this.colorsDiv.insertBefore(f, this.customColor)
            : ui.append(f, this.colorsDiv));
      }
    };
    f.prototype.onColClk = function (b) {
      b = ui._dat(ui.target(b), "color");
      this.setCol(b);
      this.x(0);
    };
    f.prototype.onCustomChg = function (b) {
      this.setCol(this.inputColor.value);
      this.x(0);
    };
    f.prototype.key = function (b) {
      this.chkEsc(b);
    };
    f.prototype.chkEsc = function (b) {
      return keys.esc(b) && this.isO
        ? (ui.stopDefaultPropagation(b), this.x(0), !0)
        : !1;
    };
    f.prototype.pickKey = function (b) {
      this.chkEsc(b) ||
        (keys.tab(b)
          ? g.hasColInp() &&
            this.isO &&
            (ui.stopDefaultPropagation(b), ui.setFocus(this.inputColor))
          : keys.space(b) && (ui.stopDefaultPropagation(b), this.tog()));
    };
    f.prototype.tog = function () {
      this.isO ? this.x(0) : this.o();
    };
    f.prototype.onHtmlKey = function (b) {
      keys.enter(b) &&
        (ui.stopDefaultPropagation(b),
        (b = this.htmlColor.value),
        this.setCol(b),
        g.hasColInp() && (this.inputColor.value = b),
        this.x(0));
    };
    f.prototype.onDivMIn = function () {
      clearTimeout(this.mOut);
      this.isO || this.o();
    };
    f.prototype.onDivMOut = function () {
      this.x(2);
    };
    f.prototype.onColOver = function (b) {
      ui.addClass(ui.target(b), "over");
    };
    f.prototype.onColOut = function (b) {
      ui.stopPropagation(b);
      ui.deleteClass(ui.target(b), "over");
    };
    return f;
  })();
  g.cPick = p;
  var h = -1;
  g.hasColInp = function () {
    if (-1 === h) {
      var f = document.createElement("input"),
        b,
        d = g.documentElement();
      ui.setAttribute(f, "type", "color");
      if ((b = "text" !== f.type))
        ((f.value = ":)"),
          (f.style.cssText = "position:absolute;visibility:hidden;"),
          d.appendChild(f),
          (b = ":)" !== f.value),
          d.removeChild(f));
      h = b ? 1 : 0;
    }
    return 1 === h;
  };
})(c || (c = {}));
(function (g) {
  function p(f, b) {
    return (
      !keys.ctrl(f) &&
      !keys.shift(f) &&
      !keys.alt(f) &&
      (keys.space(f) ||
        (47 < b && 59 > b) ||
        (64 < b && 91 > b) ||
        -1 !== [188, 189, 190, 191].indexOf(b))
    );
  }
  var h = (function () {
    function f(b) {
      this._invalid = !0;
      this._fixNr = 0;
      this.touchIndex = -1;
      this.selectedTimeout = 50;
      this._pasteItems = -1;
      this.headerHeight = 40;
      this.viewPortHeight = this.bodyHeight = 0;
      this.data = [];
      this.selectedItems = [];
      this.selectedRows = [];
      this.colWs = [];
      this._scrollTop = 0;
      this.isDirty = !0;
      this.showNoItems = this.canPaste = !1;
      this._importText = "";
      this.typeTimeout = -1;
      this.isTyping = !1;
      this.typing = "";
      this.enableSort = !0;
      this.options = obj.merge(
        { fixedHeight: !1, handleKeys: !0, multiSelect: !0 },
        b,
      );
      b.el && this.setEl(b.el);
      this.add = g.callback();
      this.edit = g.callback();
      this.remove = g.callback();
      this.selectionChange = g.callback();
      this.paste = g.callback();
      this.afterSort = g.callback();
      this.move = g.callback();
      this.afterRender = g.callback();
    }
    f.prototype.setEl = function (b) {
      var d = this;
      this.el = b;
      ui.addClass(b, "gridControl");
      if (this.options.handleKeys)
        ui.on(b, "keydown", function (b) {
          return d.onKeyDown(b);
        });
      this.options.fixedHeight && ui.addClass(b, "fixedHeight");
      ui.setTabIndex(this.el, 0);
      this.header = new g.table(this);
      ui.addClass(this.header.el, "gridHeader");
      this.body = ui.getDiv("bodyScroll");
      ui.on(this.body, "scroll", function (b) {
        return d.onScroll(b);
      });
      this.scrollAnimation = new g.scrA([this.body], 120);
      this.scrollAnimation.ea = g.eaTy.oQuint;
      this.table = new g.table(this);
      ui.addClass(this.table.el, "grid");
      if (this.options.windowResize)
        ui.on(window, "resize orientationchange", function (b) {
          return d.onResize();
        });
    };
    f.prototype.bind = function (b, d) {
      this._invalid = !0;
      this._selectedItem = d;
      this.selectedRows = [];
      this.selectedItems = [];
      this.data = b;
      this.isSort() && this.sort();
      this.render(this.setSelectionAfterBind);
      this.isDirty = !1;
    };
    f.prototype.getRows = function (b) {
      for (var d = [], k = this.table.rows(), f = k.length, l = 0; l < f; l++) {
        var g = k[l];
        arr.has(b, g.data) && d.push(g);
      }
      return d;
    };
    f.prototype.updateRow = function (b, d) {
      b.data = d;
      for (var k = 0; k < b.cells.length; k++)
        this.dataColumns[k].setCellHtml(b.cells[k], d);
    };
    f.prototype.render = function (b) {
      this.renderHeader();
      this.renderRows(b);
    };
    f.prototype.renderHeader = function () {
      var b = this;
      this.renderHeader = g.no;
      var d = this.header.thead.rows;
      d.length = 0;
      d[0] = new g.tr(this.header);
      this.header.thead.rows = d;
      for (var k = 0; k < this.dataColumns.length; k++) {
        var f = this.dataColumns[k],
          l = new g.th(d[0], f);
        l.columnIndex = k;
        ui.dat(l.el, "i", k + "");
        f.setHeaderContent(l);
        f.isSortEnabled &&
          (ui.click(l.el, function (d) {
            return b.onHeaderCellClick(d, b.headerCellByEv(d));
          }),
          ui.on(l.el, "mouseover", function (d) {
            return b.onHeaderCellOver(d);
          }),
          ui.on(l.el, "mouseleave", function (d) {
            return b.onHeaderCellOut(d);
          }),
          k === this.dataColumns.length - 1 && ui.addClass(l.el, "last"));
        ui.toggleClass(l.el, "sortHand", f.isSortEnabled);
        d[0].cells[k] = l;
        ui.append(l.el, d[0].el);
      }
      ui.append(d[0].el, this.header.thead.el);
      ui.setHeight(this.header.el, this.headerHeight);
      ui.append(this.header.thead.el, this.header.el);
      this.options.fixedHeight && ui.setHeight(this.body, this.bodyHeight);
      ui.appends(
        [
          ui.getDiv("topBorder"),
          ui.getDiv("bottomBorder"),
          this.header.el,
          this.body,
        ],
        this.el,
      );
      this.setViewPortHeight(this.viewPortHeight);
    };
    f.prototype.renderRows = function (b) {
      var d = this,
        k = this.data.length;
      0 !== k && this.emptyPanel && ui.hide(this.emptyPanel);
      this.pastePanel && ui.hide(this.pastePanel);
      this.table.tbody.rows = [];
      ui.empty(ui.find("tbody", this.table.el));
      var f = Math.min(11, k - 1);
      this._invalid = !1;
      this.renderRowsPart(0, f);
      ui.append(this.table.tbody.el, this.table.el);
      ui.append(this.table.el, this.body);
      this.setHeaderCellWidthsInterval();
      f < this.data.length - 1
        ? g.timeout(function () {
            d.renderRowsPart(f + 1, k - 1, b);
          }, 100)
        : ui.call(b, this, void 0);
    };
    f.prototype.renderRowsPart = function (b, d, k) {
      for (var f = this, l = ui.getFragment(); b < d + 1; b++) {
        if (this._invalid) return;
        var n = this.data[b];
        if (!n) return;
        var t = new g.tr(this.table);
        ui.dat(t.el, "i", b + "");
        t.rowIndex = b;
        t.data = n;
        ui.addClass(t.el, 0 === b % 2 ? "even" : "odd");
        this.table.rows().push(t);
        for (var h = t.cells, u = 0; u < this.dataColumns.length; u++) {
          var x = this.dataColumns[u],
            y = new g.td(t);
          y.columnIndex = u;
          x.setCellHtml(y, n);
          void 0 !== this.colWs[u] && (y.el.style.width = this.colWs[u]);
          h[u] = y;
          u === this.dataColumns.length - 1 && ui.addClass(y.el, "last");
          ui.append(y.el, t.el);
          t.cells[u] = y;
        }
        ui.tap(t.el, function (b) {
          return f.onRowTap(b, f.rowByEv(b));
        });
        ui.click(t.el, function (b) {
          return f.onRowClick(b, f.rowByEv(b));
        });
        ui.on(t.el, "dblclick", function (b) {
          return f.onRowDoubleClick(b, f.rowByEv(b));
        });
        ui.over(t.el, function (b, d) {
          return f.onRowOver(b, d);
        });
        l.appendChild(t.el);
      }
      ui.append(l, this.table.tbody.el);
      this.setHeaderCellWidthsInterval();
      k && ui.call(k, this, void 0);
    };
    f.prototype.onAfterRender = function () {
      this.checkIfEmpty();
      this.afterRender.fire();
    };
    f.prototype.checkIfEmpty = function () {
      var b = this;
      if (this.showNoItems && 0 === this.data.length) {
        if (!this.emptyPanel) {
          this.emptyPanel = ui.getDiv("emptyPanel");
          var d = ui.getDiv("emptyInfo");
          ui.setText(d, "- No items -");
          var k = ui.getDiv("importInfo");
          ui.setText(k, "Import items");
          ui.click(k, function (d) {
            return b.onImportClick(d);
          });
          ui.appends([d, k], this.emptyPanel);
          ui.append(this.emptyPanel, this.el);
        }
        ui.show(this.emptyPanel, "block");
        this.setPanelSizes();
      }
    };
    f.prototype.getViewPortHeight = function () {
      return (
        ui.getComputedHeight(this.el) - ui.getComputedHeight(this.header.el) + 2
      );
    };
    f.prototype.setViewPortHeight = function (b) {
      this.viewPortHeight = b;
      this.el &&
        ((this.bodyHeight = Math.max(
          b - (this.header.el.clientHeight || this.headerHeight),
          0,
        )),
        this.options.fixedHeight && ui.setHeight(this.body, this.bodyHeight),
        this.setPanelSizes());
    };
    f.prototype.onResize = function () {
      var b = ui.getComputedHeight(this.el);
      this.setViewPortHeight(b);
      this.setHeaderCellWidthsInterval();
    };
    f.prototype.setHeaderCellWidthsInterval = function () {
      var b = this;
      clearInterval(this._fixColInter);
      this.setHeaderCellWidths();
      this._fixColInter = setInterval(function () {
        return b.setHeaderCellWidths();
      }, 200);
    };
    f.prototype.setHeaderCellWidths = function () {
      this._fixNr++;
      if (10 < this._fixNr)
        (clearInterval(this._fixColInter), (this._fixNr = 0));
      else {
        var b = this.table.rows();
        if (0 !== b.length) {
          var d = b[0],
            k = this.header.headerRows()[0];
          b = function (b, q) {
            var l = d.cells[b],
              n = l.el.style.width;
            l = n
              ? num.toFloat(n)
              : num.toFloat(ui.computedStyle(l.el, "width"));
            var t = Math.max(
              0,
              l +
                (b === q - 1 &&
                f.options.fixedHeight &&
                ui.hasVerticalScroll(f.body)
                  ? g.scrollWidth()
                  : 0),
            );
            if (1 > t) return "continue";
            b = k.cells[b].el;
            q = ui.all(".headerText", b);
            ui.setWidth(b, t);
            q.forEach(function (b) {
              return ui.setWidth(b, t);
            });
          };
          for (var f = this, l = 0, n = d.cells.length; l < n; l++) b(l, n);
        }
      }
    };
    f.prototype.onRowOver = function (b, d) {
      (b = this.rowByEv(b)) && ui.toggleClass(b.el, "over", d);
    };
    f.prototype.rowByEv = function (b) {
      return this.table.rows()[num.toInt(ui._dat(ui.target(b), "i"))];
    };
    f.prototype.headerCellByEv = function (b) {
      return this.header.headerRows()[0].cells[
        num.toInt(ui._dat(ui.target(b), "i"))
      ];
    };
    f.prototype.onRowTap = function (b, d) {
      var k = this;
      "mousedown" !== (b ? b.type : "") &&
        (this.touchIndex === d.rowIndex
          ? ((this.touchIndex = -1), this.onRowDoubleClick(b, d, !0))
          : ((this.touchIndex = d.rowIndex),
            g.timeout(function () {
              return k.onTouchOut();
            }, ui.touchTimeout)));
    };
    f.prototype.onRowClick = function (b, d) {
      if ((!keys.shift(b) && !keys.ctrl(b)) || !this.options.multiSelect)
        (this.deselectRows([d]), this.selectRow(d));
      else if (keys.ctrl(b) && !keys.shift(b))
        d.isSelected ? this.deselectRow(d) : this.selectRow(d);
      else if (keys.shift(b) && 0 < this.selectedRows.length) {
        b = this.table.rows();
        var k = arr.last(this.selectedRows),
          f = Math.min(k.rowIndex, d.rowIndex);
        d = Math.max(k.rowIndex, d.rowIndex);
        for (k = 0; k < b.length; k++) {
          var l = b[k];
          l.rowIndex >= f && l.rowIndex <= d && this.selectRow(l);
        }
      }
      this.selectionChange.fire(this.selectedItems);
    };
    f.prototype.onRowDoubleClick = function (b, d, k) {
      void 0 === k && (k = !1);
      k && this.deselectRows();
      this.selectRow(d);
      this.edit.fire(b, d.data);
    };
    f.prototype.onHeaderCellOver = function (b) {
      b = this.headerCellByEv(b);
      ui.deleteClass(b.el, "over");
    };
    f.prototype.onHeaderCellOut = function (b) {
      b = this.headerCellByEv(b);
      ui.deleteClass(b.el, "over");
    };
    f.prototype.onScroll = function (b) {
      this._scrollTop = this.body.scrollTop;
    };
    f.prototype.onRemove = function (b) {
      if (0 !== this.selectedItems.length) {
        var d = this.nextSelection(this.selectedRows);
        this.remove.fire(b, this.selectedItems, d);
        b.preventDefault();
      }
    };
    f.prototype.onTouchOut = function () {
      this.touchIndex = -1;
    };
    f.prototype.setSelectedItems = function (b) {
      var d = this;
      this.selectedItems = [];
      this.selectedRows = [];
      b = this.getRows(b);
      this.deselectRows(b);
      for (var k = 0; k < b.length; k++) this.selectRow(b[k]);
      g.timeout(function () {
        return d.scrollToLastSelected();
      }, this.selectedTimeout);
      this.selectionChange.fire(this.selectedItems);
    };
    f.prototype.setSelectionAfterBind = function () {
      this._selectedItem
        ? arr.isArray(this._selectedItem)
          ? this.setSelectedItems(this._selectedItem)
          : this.setSelectedItems([this._selectedItem])
        : this.setSelectedItems([]);
      this.onAfterRender();
    };
    f.prototype.selectAll = function () {
      var b = this;
      this.table.rows().forEach(function (d) {
        return b.selectRow(d);
      });
      this.selectionChange.fire(this.selectedItems);
    };
    f.prototype.selectDeselectRows = function (b, d) {
      for (var k = 0, f = this.table.rows(); k < f.length; k++) {
        var l = f[k];
        arr.has(b, l) || (d ? this.selectRow(l) : this.deselectRow(l));
      }
    };
    f.prototype.deselectRows = function (b) {
      void 0 === b && (b = []);
      this.selectDeselectRows(b, !1);
    };
    f.prototype.selectRow = function (b) {
      this.selectedRows.some(function (d) {
        return d.data === b.data;
      }) ||
        ((b.isSelected = !0),
        this.selectedRows.push(b),
        this.selectedItems.push(b.data),
        ui.addClass(b.el, "select"));
    };
    f.prototype.deselectRow = function (b) {
      b.isSelected &&
        ((b.isSelected = !1),
        arr.remove(this.selectedRows, b),
        arr.remove(this.selectedItems, b.data),
        ui.deleteClass(b.el, "select"));
    };
    f.prototype.lastSelectedRow = function () {
      return arr.last(this.selectedRows);
    };
    f.prototype.lastSelected = function () {
      var b = this.lastSelectedRow();
      return b ? b.data : void 0;
    };
    f.prototype.hasSelection = function () {
      return 0 < this.selectedRows.length;
    };
    f.prototype.nextSelection = function (b) {
      var d = b.map(function (b) {
          return b.rowIndex;
        }),
        k = Math.max.apply(Math, d);
      b = -1;
      k < this.data.length - 1
        ? (b = k + 1)
        : ((d = Math.min.apply(Math, d)), 0 < d && (b = d - 1));
      if (-1 < b) {
        b = Math.min(this.data.length - 1, b);
        var f = this.table.rows()[b].data;
      }
      return f;
    };
    f.prototype.focusAndScroll = function (b) {
      void 0 === b && (b = !0);
      this._scrollTop !== this.body.scrollTop &&
        this.scrollTo(this._scrollTop, !1);
      b && this.setFocus();
      this.setHeaderCellWidthsInterval();
    };
    f.prototype.scrollToLastSelected = function () {
      var b = arr.last(this.selectedRows);
      b && this.scrollToRow(b);
    };
    f.prototype.onPageUpDown = function (b, d) {
      ui.stopDefaultPropagation(b);
      if (0 !== this.table.rows().length) {
        var k = this.table.rows()[0].el.clientHeight;
        k = Math.floor(this.getViewPortHeight() / k);
        0 === k && k++;
        this.selectUpDown(b, (d ? -1 : 1) * k);
      }
    };
    f.prototype.selectUpDown = function (b, d) {
      var k = this.lastSelectedRow();
      if (k) {
        var f = Math.min(this.data.length - 1, Math.max(0, k.rowIndex + d)),
          l = this.table.rows()[f];
        this.onRowClick(b, l);
        ui.preventDefault(b);
        f = f === k.rowIndex;
        b = 0 > d;
        f = ui.getPos(l.el).y + (f || b ? 0 : l.el.clientHeight);
        if ((!b && f >= this.getViewPortHeight()) || (b && 0 > f))
          1 === Math.abs(d)
            ? this.scrollRow(k, b)
            : this.scrollToRow(l, !0, 8 > Math.abs(d));
      }
    };
    f.prototype.scrollRow = function (b, d) {
      this.scrollTo(this.body.scrollTop + b.el.clientHeight * (d ? -1 : 1), !1);
    };
    f.prototype.scrollToRow = function (b, d, k) {
      void 0 === d && (d = !1);
      void 0 === k && (k = !0);
      var f = b.el.offsetTop;
      b = d
        ? 0
        : this.getViewPortHeight() / 2 - Math.floor(b.el.clientHeight / 2);
      this.scrollTo(f - b, k);
    };
    f.prototype.scrollTo = function (b, d) {
      void 0 === d && (d = !0);
      this.scrollAnimation.to(b, d);
    };
    f.prototype.setFocus = function () {
      ui.setFocus(this.el);
    };
    f.prototype.onHeaderCellClick = function (b, d) {
      b.preventDefault();
      if (this.enableSort) {
        b = this.dataColumns[d.columnIndex].sortProp;
        var k = "-" + b;
        b =
          this.activeSort === b || this.activeSort === k
            ? str.startsWith(this.activeSort, "-")
              ? b
              : k
            : b;
        this.sortBy(b, d.columnIndex);
        this.renderRows(this.afterRenderAndSort);
      }
    };
    f.prototype.afterRenderAndSort = function () {
      this.setSelectedItems(this.selectedItems);
      this.onAfterRender();
    };
    f.prototype.isSort = function () {
      return !!this.activeSort;
    };
    f.prototype.sort = function () {
      var b = this.activeSort;
      str.startsWith(b, "-") && (b = str.trim1(b, "-"));
      var d = this.dataColumns.find(function (d) {
          return d.sortProp === b;
        }),
        k = this.header.headerRows()[0].cells.find(function (b) {
          return b.dataColumn === d;
        });
      k && this.sortBy(this.activeSort, k.columnIndex);
    };
    f.prototype.sortBy = function (b, d) {
      this.activeSort = b;
      b = !str.startsWith(this.activeSort, "-");
      var k = this.dataColumns[d];
      this.showSortArrow(d, b);
      this.data = k.sortFunc
        ? k.sortFunc(this.data, b)
        : this.data.sort(this.sortByProp(this.activeSort));
      this.afterSort.fire(k, b);
    };
    f.prototype.showSortArrow = function (b, d) {
      var k = this.header.headerRows();
      if (0 !== k.length) {
        k = k[0].cells;
        for (var f = 0; f < k.length; f++) {
          var l = k[f];
          f === b ? l.showSort(d) : l.hideSort();
        }
      }
    };
    f.prototype.resetSort = function () {
      this.showSortArrow(-1, !0);
      this.activeSort = "";
    };
    f.prototype.sortByProp = function (b) {
      var d = 1;
      "-" === b[0] && ((d = -1), (b = b.substr(1, b.length - 1)));
      return function (k, f) {
        return d * arr.sort(k[b], f[b]);
      };
    };
    f.prototype.onKeyDown = function (b) {
      var d = this,
        k = keys.keyCode(b),
        f = ui.getChar(b),
        l = this.table.rows(),
        n = l.length;
      n = [1, -1, n, -n];
      var t = keys.indexOf(b, [40, 38, 35, 36]);
      if (-1 !== t)
        return (
          0 < l.length &&
            ((k = n[t]),
            keys.alt(b) && 1 === Math.abs(k)
              ? this.move.fire(b, k)
              : this.selectUpDown(b, k)),
          ui.stopDefaultPropagation(b),
          !1
        );
      if (34 === k) return (this.onPageUpDown(b, !1), !1);
      if (33 === k) return (this.onPageUpDown(b, !0), !1);
      if (keys.enter(b)) {
        k = this.lastSelectedRow();
        if (!k) return !0;
        ui.stopDefaultPropagation(b);
        this.edit.fire(b, k.data);
        return !1;
      }
      return ((107 === k || 45 === k) && !keys.ctrlOrAltOrShift(b)) ||
        (keys.shift(b) && 187 === k && !keys.ctrlAlt(b))
        ? (ui.stopDefaultPropagation(b), this.add.fire(b), !1)
        : 46 === k || 8 === k
          ? (this.onRemove(b), ui.stopDefaultPropagation(b), !1)
          : keys.ctrl(b) && "a" === f && this.options.multiSelect
            ? (this.selectAll(), ui.stopDefaultPropagation(b), !1)
            : keys.ctrl(b) && "v" === f
              ? (this.onCtrlV(), ui.stopDefaultPropagation(b), !1)
              : this.typingFunc && p(b, k)
                ? (ui.stopDefaultPropagation(b),
                  (this.typing += keys.fromKeyCode(k).toLowerCase()),
                  this.isTyping
                    ? clearTimeout(this.typeTimeout)
                    : (this.isTyping = !0),
                  (this.typeTimeout = g.timeout(function () {
                    return d.clearTyping();
                  }, 500)),
                  this.selectByTyping(),
                  !1)
                : !0;
    };
    f.prototype.selectByTyping = function () {
      var b = this.findTypingRow();
      if (!b && 1 < this.typing.length) {
        var d = this.typing[0];
        this.typing.split("").every(function (b) {
          return b === d;
        }) && ((this.typing = d), (b = this.findTypingRow()));
      }
      b && (this.onRowClick(void 0, b), this.scrollToRow(b, !1, !1));
    };
    f.prototype.findTypingRow = function () {
      for (var b = [], d = 0, k = this.table.tbody.rows; d < k.length; d++) {
        var f = k[d];
        this.typingFunc &&
          this.typingFunc.call(this, f.data, this.typing) &&
          b.push(f);
      }
      d = b.length;
      if (0 !== d && (k = this.lastSelectedRow()))
        return (
          (k = b.indexOf(k)),
          -1 === k || k === d - 1 || 1 < this.typing.length ? b[0] : b[k + 1]
        );
    };
    f.prototype.clearTyping = function () {
      this.isTyping = !1;
      this.typing = "";
    };
    f.prototype.onImportClick = function (b) {
      this.onCtrlV();
    };
    f.prototype.onCtrlV = function () {
      var b = this;
      if (this.canPaste) {
        var d = this.pasteInput;
        if (void 0 === this.pastePanel) {
          this.pastePanel = ui.getDiv("pastePanel");
          ui.on(this.pastePanel, "keydown", function (d) {
            return b.onPasteKeyDown(d);
          });
          var k = ui.getTag("h2"),
            f = ui.setAttribute(ui.getTag("a"), "href", "#import-data");
          ui.addClass(ui.setText(f, "Need help?"), "importHelp");
          ui.setHtml(k, "Paste items you want to import");
          var l = ui.addClass(ui.getTag("textarea"), "pasteArea");
          d = this.pasteInput = new g.input(l, { enableTab: !0 });
          d.setValue(this._importText);
          d.change.add(function (d) {
            return b.onPasteInputChange();
          });
          this.pasteDetect = ui.getDiv("pasteDetect");
          var n = g.button.svg({
              el: ui.getDiv("okButton"),
              svgClass: "importSvg icon",
              useId: "importD",
              text: "Import",
              logger: this.options.logger,
            }),
            t = ui.getDiv("cancelLink linkButton");
          ui.setText(t, "Cancel");
          ui.click(t, function (d) {
            return b.onPasteCancel(d);
          });
          n.setTabIndex(0);
          n.click.add(function (d) {
            return b.onPasteOk(d);
          });
          ui.appends([k, f, l, t, this.pasteDetect, n.el], this.pastePanel);
          ui.append(this.pastePanel, this.el);
        }
        this.setPanelSizes();
        ui.show(this.pastePanel, "block");
        d.select();
        d.setFocus();
      }
    };
    f.prototype.setPanelSizes = function () {
      var b = ui.getComputedWidth(this.body),
        d = ui.getComputedHeight(this.body) - 2;
      this.pastePanel &&
        (ui.setWidthHeight(this.pastePanel, b, d),
        ui.setWidthHeight(this.pasteInput.el, b - 30, Math.max(d - 80, 0)));
      this.emptyPanel && ui.setWidthHeight(this.emptyPanel, b, d);
    };
    f.prototype.onPasteInputChange = function () {
      for (
        var b = str.trimN(this.pasteInput.getValue(), "\n"), d = 0, k = 0;
        k < b.length;
        k++
      )
        d += "\n" === b[k] ? 1 : 0;
      b = "" === b ? 0 : d + 1;
      b !== this._pasteItems &&
        (ui.setText(this.pasteDetect, "".concat(b, " rows detected")),
        (this._pasteItems = b));
    };
    f.prototype.onPasteKeyDown = function (b) {
      keys.esc(b) && (ui.stopPropagation(b), this.onPasteCancel(b));
    };
    f.prototype.onPasteOk = function (b) {
      this.onPasteCancel(b);
      var d = str.trimN(this.pasteInput.getValue(), "\n");
      this.paste.fire(b, d);
    };
    f.prototype.onPasteCancel = function (b) {
      this.pastePanel && (ui.hide(this.pastePanel), this.setFocus());
    };
    return f;
  })();
  g.grid = h;
  h = (function () {
    function f(b, d, k) {
      this.grid = b;
      this.headerText = d;
      this.propName = k;
      this.isSortEnabled = !0;
      this.sortProp = this.propName;
    }
    f.prototype.setCellHtml = function (b, d) {
      ui.empty(b.el);
      if (!this.setCellFunc || this.setCellFunc(b, d))
        ((d = d[this.propName]),
          (d = void 0 === d || null === d ? "" : d + "") || (d = "&nbsp;"),
          (b.el.innerHTML = d));
    };
    f.prototype.setHeaderContent = function (b) {
      g.gridColumn.setHeaderHtml(b, this.headerText);
      void 0 !== this.setHeaderFunc && this.setHeaderFunc(b, this);
    };
    f.setHeaderHtml = function (b, d) {
      var k = ui.addClass(ui.getTag("span"), "headerText");
      k.innerHTML = d;
      ui.append(k, b.el);
      b.el.title = g.convertBrsToSpaces(d);
    };
    return f;
  })();
  g.gridColumn = h;
  h = (function () {
    return function (f) {
      this.name = f;
      this.el = ui.getTag(f);
    };
  })();
  g.tag = h;
  h = (function (f) {
    function b(b) {
      b = f.call(this, b) || this;
      b.rowSpan = 1;
      b.colSpan = 1;
      return b;
    }
    __extends(b, f);
    return b;
  })(g.tag);
  g.cell = h;
  h = (function (f) {
    function b(b, k) {
      var d = f.call(this, "th") || this;
      d.tr = b;
      d.dataColumn = k;
      return d;
    }
    __extends(b, f);
    b.prototype.showSort = function (b) {
      b
        ? ui.switchClass(this.el, "sortDesc", "sortAsc")
        : ui.switchClass(this.el, "sortAsc", "sortDesc");
    };
    b.prototype.hideSort = function () {
      ui.deleteClass(this.el, "sortAsc sortDesc");
    };
    return b;
  })(g.cell);
  g.th = h;
  h = (function (f) {
    function b(b) {
      var d = f.call(this, "td") || this;
      d.tr = b;
      return d;
    }
    __extends(b, f);
    b.prototype.dataItem = function () {
      return this.tr.data;
    };
    return b;
  })(g.cell);
  g.td = h;
  h = (function (f) {
    function b(b) {
      var d = f.call(this, "tr") || this;
      d.cells = [];
      d.isSelected = !1;
      d.table = b;
      return d;
    }
    __extends(b, f);
    return b;
  })(g.tag);
  g.tr = h;
  h = (function (f) {
    function b(b) {
      var d = f.call(this, "thead") || this;
      d.rows = [];
      d.table = b;
      return d;
    }
    __extends(b, f);
    return b;
  })(g.tag);
  g.thead = h;
  h = (function (f) {
    function b(b) {
      var d = f.call(this, "tbody") || this;
      d.rows = [];
      d.table = b;
      return d;
    }
    __extends(b, f);
    return b;
  })(g.tag);
  g.tbody = h;
  h = (function (f) {
    function b(b) {
      var d = f.call(this, "table") || this;
      d.grid = b;
      d.thead = new g.thead(d);
      d.tbody = new g.tbody(d);
      return d;
    }
    __extends(b, f);
    b.prototype.rows = function () {
      return this.tbody.rows;
    };
    b.prototype.headerRows = function () {
      return this.thead.rows;
    };
    return b;
  })(g.tag);
  g.table = h;
  g.canKeySelect = p;
  g.setLimitedCell = function (f, b, d) {
    var k = b || "&nbsp;";
    b = b && b.length > d ? ' title="'.concat(k, '"') : "";
    d = "<span".concat(b, ">") + str.ellipses(k, d) + "</span>";
    ui.setHtml(f.el, d);
    return !1;
  };
})(c || (c = {}));
(function (g) {
  var p = (function () {
    function f(b, d) {
      var k = this;
      this.xClk = [!1];
      this.left = this.top = 0;
      this._minHeight = this._minWidth = 80;
      this.isModal = !0;
      this._isInit = this.isOpen = !1;
      this.resizable = this.center = !0;
      this.isResized = this.isResizing = !1;
      this.draggable = !0;
      this.isDragged = !1;
      this.addCloseButton = this.closeOnEsc = !0;
      this.is1DragMove = !1;
      this.dragEls = [];
      this.anim = this.autoFocus = this.returnFocus = !0;
      this._zIndex = 1;
      this.id = 0;
      this.cA = b;
      this.className = d;
      this.id = ++g.win.id;
      this.opened = g.callback();
      this.beforeClose = g.callback();
      this.closed = g.callback();
      this.resize = g.callback();
      this.titleChange = g.callback();
      this.focused = g.callback();
      this.dragEnd = g.callback();
      this.el = ui.getDiv("win");
      this.fadeAnim = new g.fA([this.el]);
      this.fadeAnim.fps(30);
      this.scaleAnim = new g.dA([this.el]);
      this.scaleAnim.fps(30);
      this.fadeAnim.ea = this.scaleAnim.ea = g.eaTy.oQuad;
      this.storyboard = new g.sb([this.fadeAnim, this.scaleAnim]);
      this.scaleAnim.chg.add(function (b) {
        return k.onScaleChange(b);
      });
      this.storyboard.xed.add(function (b) {
        return k.onStoryboardEnd();
      });
    }
    f.prototype.init = function () {
      var b = this,
        d = this.el;
      if (!this._isInit) {
        this.content = this.className
          ? ui.find("." + this.className, this.cA.el)
          : ui.getDiv(this.id + "");
        ui.setTabIndex(d, -1);
        this.titleBar = ui.getDiv("titleBar");
        var k = ui.getTag("h1");
        k.innerHTML = this.title();
        this.titleEl = k;
        ui.append(this.titleEl, this.titleBar);
        ui.append(this.titleBar, d);
        this.setDrag(this.dragEls.length ? this.dragEls : [this.titleBar]);
        k = this.closeEl = ui.getTag("button");
        ui.addClass(k, "closeWin noSelect");
        k.innerHTML =
          '<svg class="svgIcon closeSvg"><use xlink:href="#closeD" /></svg>';
        ui.click(k, function (d) {
          return b.onCloseClick(d);
        });
        ui.setTabIndex(k, 0);
        this.addCloseButton && ui.append(k, d);
        ui.append(this.content, d);
        this.resizable &&
          ((this.resizer = ui.getDiv("resizer")),
          ui.hint(this.resizer, "Drag to resize window", g.hintPos.left),
          ui.append(this.resizer, d),
          (k = new ui.drag(this.resizer)),
          (k.moveElement = g.no),
          k.start.add(function (b, k) {
            return ui.addClass(d, "resizing");
          }),
          k.move.add(function (d, k) {
            return b.onResize(d);
          }),
          k.end.add(function (b, k) {
            return ui.deleteClass(d, "resizing");
          }));
        this.overlay = ui.getDiv("overlay");
        this.isModal &&
          (ui.append(this.overlay, this.cA.el),
          ui.setTabIndex(this.overlay, -1),
          ui.on(this.overlay, "keydown", function (d) {
            return b.onKeyDown(d);
          }),
          ui.click(this.overlay, function (d) {
            return b.onOverlayClick(d);
          }));
        ui.append(d, this.cA.el);
        ui.on(d, "keydown", function (d) {
          return b.onKeyDown(d);
        });
        ui.on(d, "focusin", function (d) {
          return b.onFocusIn(d);
        });
        ui.click(d, function (d) {
          return b.onClick(d);
        });
        this.setSize();
        this._isInit = !0;
        ui.on(window, "resize orientationchange", function (d) {
          return b.onBrowserResize(d);
        });
      }
    };
    f.prototype.open = function () {
      this.isOpen
        ? this._zIndex !== f.zIndex && this.bringToTop()
        : ((this.isOpen = !0),
          (this.prevFocus = document.activeElement),
          (this.focusedEl = void 0),
          this.init(),
          this.setSize(),
          this.bringToTop(),
          this.isModal && ui.show(this.overlay, "block"),
          this._anim() &&
            (this.storyboard.isGo()
              ? this.storyboard.stop()
              : ((this.fadeAnim._1 = 0.85),
                (this.fadeAnim.dur = 150),
                (this.scaleAnim._1 = 0.95),
                (this.scaleAnim.dur = 150),
                (this.fadeAnim.ea = this.scaleAnim.ea = g.eaTy.oQuint)),
            (this.fadeAnim._n = this.scaleAnim._n = 1),
            this.storyboard.play()),
          this.onStoryboardEnd(),
          ui.show(this.content),
          this.setContentSize(),
          this.setPosition(),
          this.focusTabbable(),
          this.fireOpen());
    };
    f.prototype.close = function (b) {
      b && ui.stopDefaultPropagation(b);
      if (this.isOpen) {
        this.beforeClose.fire(b);
        this.isOpen = !1;
        this.isModal && ui.hide(this.overlay);
        if (this._anim())
          ((this.fadeAnim.ea = this.scaleAnim.ea = g.eaTy.oQuint),
            (this.scaleAnim._n = 0),
            (this.scaleAnim.dur = 400),
            (this.fadeAnim._n = 0),
            (this.fadeAnim.dur = 400),
            this.storyboard.play());
        else this.onStoryboardEnd();
        try {
          this.returnFocus && this.prevFocus.focus();
        } catch (d) {}
        this.closed.fire(b);
      }
    };
    f.prototype.toggle = function () {
      this.isOpen ? this.close() : this.open();
    };
    f.prototype.show = function () {
      this.isModal && ui.show(this.overlay);
      ui.show(this.el);
    };
    f.prototype.hide = function () {
      this.isModal && ui.hide(this.overlay);
      ui.hide(this.el);
    };
    f.prototype.setSizePosition = function (b) {
      void 0 === b && (b = !0);
      var d = this.setSize();
      this.setContentSize();
      this.setPosition(d);
      b && this.resize.fire();
    };
    f.prototype.maxWidth = function () {
      return g.windowWidth() - ui.getPaddingBorderMarginWidth(this.el);
    };
    f.prototype.maxHeight = function () {
      return g.windowHeight() - ui.getPaddingBorderMarginHeight(this.el);
    };
    f.prototype.onBrowserResize = function (b) {
      this.setSizePosition();
    };
    f.prototype.setSize = function () {
      var b = this.minWidth,
        d = h.no;
      void 0 !== b &&
        (b > this.maxWidth() && (b = this.maxWidth()),
        (this.el.style.minWidth = g.px(b)));
      b = this.minHeight;
      void 0 !== b &&
        (b > this.maxHeight() && (b = this.maxHeight()),
        (this.el.style.minHeight = g.px(b)));
      void 0 === this.width ||
        this.isResized ||
        (this.maxWidth() < this.width &&
          ((this.width = this.maxWidth()), (d = h.width)),
        this.setWidth(this.width));
      void 0 === this.height ||
        this.isResized ||
        (this.maxHeight() < this.height &&
          ((this.height = this.maxHeight()),
          (d = d === h.no ? h.height : h.both)),
        this.setHeight(this.height));
      return d;
    };
    f.prototype.setContentSize = function (b) {
      void 0 === b && (b = !1);
      void 0 !== this.width &&
        ui.setWidth(this.content, ui.getComputedWidth(this.el));
      void 0 !== this.height &&
        ui.setHeight(
          this.content,
          ui.getComputedHeight(this.el) - this.titleBarHeight(),
        );
      b = b ? this.top : 0;
      ui.getBoxHeight(this.el) + b > g.windowHeight() &&
        (this.content.style.maxHeight = g.px(
          this.maxHeight() - this.titleBarHeight() - b,
        ));
    };
    f.prototype.titleBarHeight = function () {
      return void 0 !== this.titleBar && ui.isVisible(this.titleBar)
        ? ui.getBoxHeight(this.titleBar, !0)
        : 0;
    };
    f.prototype.getContentWidth = function () {
      return ui.getComputedWidth(this.content);
    };
    f.prototype.getContentHeight = function () {
      return ui.getComputedHeight(this.el) - this.titleBarHeight();
    };
    f.prototype.setPosition = function (b) {
      void 0 === b && (b = h.no);
      var d = this.el;
      !this.isDragged &&
        this.center &&
        ((this.left = Math.max(
          Math.ceil((this.maxWidth() - ui.getComputedWidth(d)) / 2),
          0,
        )),
        (this.top = Math.max(
          Math.ceil((this.maxHeight() - ui.getComputedHeight(d)) / 2),
          0,
        )));
      if (b === h.width || b === h.both) this.left = 0;
      if (b === h.height || b === h.both) this.top = 0;
      void 0 === this.right
        ? ui.setLeft(d, this.left)
        : ui.setRight(d, this.right);
      ui.setTop(this.el, this.top);
    };
    f.prototype.fireOpen = function () {
      this.opened.fire();
    };
    f.prototype.bringToTop = function () {
      this.isModal && ui.setZIndex(this.overlay, ++g.win.zIndex);
      this._zIndex = ++g.win.zIndex;
      ui.setZIndex(this.el, this._zIndex);
    };
    f.prototype.onClick = function (b) {
      ui.isIE11() ||
        (ui.stopPropagation(b),
        this._zIndex !== g.win.zIndex &&
          (this.bringToTop(), this.focusTabbable()));
    };
    f.prototype.onOverlayClick = function (b) {
      ui.stopPropagation(b);
      this.scaleAnim.isGo() || this.fadeAnim.isGo() || this.close(b);
    };
    f.prototype.focusTabbable = function () {
      if (this.autoFocus) {
        var b = this.focusedEl;
        b || (b = arr.first(ui.getTabElements(this.content)));
        b || (b = this.el);
        try {
          b.focus();
        } catch (d) {}
      }
    };
    f.prototype.onCloseClick = function (b) {
      this.close(b);
    };
    f.prototype.onKeyDown = function (b) {
      if (
        (keys.esc(b) && this.closeOnEsc) ||
        (keys.space(b) && ui.hasFocus(this.closeEl))
      )
        (ui.stopDefaultPropagation(b), this.onCloseClick(b));
      else if (keys.tab(b)) {
        var d = keys.shift(b),
          k = ui.getTabElements(this.el),
          f = arr.first(k),
          l = arr.last(k),
          g = b.target;
        (g !== l && g !== this.el) || d
          ? (g !== f && g !== this.el) || !d
            ? ((f = k.indexOf(g)),
              -1 !== f &&
                (k[f + (d ? -1 : 1)].focus(), ui.stopDefaultPropagation(b)))
            : (l.focus(), ui.stopDefaultPropagation(b))
          : (f.focus(), ui.stopDefaultPropagation(b));
      }
    };
    f.prototype.onFocusIn = function (b) {
      this.focusedEl = b.target;
      this.focused.fire();
    };
    f.prototype.onResize = function (b) {
      if (0 !== b.dx) {
        var d = Math.max(num.toInt(this.el.style.minWidth), this._minWidth),
          k = ui.getComputedWidth(this.el) + b.dx;
        k >= d && k < this.maxWidth() && this.setWidth(k);
      }
      0 !== b.dy &&
        ((d = Math.max(num.toInt(this.el.style.minHeight), this._minHeight)),
        (b = ui.getComputedHeight(this.el) + b.dy),
        b >= d && b < this.maxHeight() && this.setHeight(b));
      this.setContentSize();
      this.resize.fire();
    };
    f.prototype.setWidth = function (b) {
      this.width = b;
      ui.setWidth(this.el, b);
      ui.setWidth(this.content, b);
    };
    f.prototype.setHeight = function (b) {
      this.height = b;
      ui.setHeight(this.el, b);
    };
    f.prototype.setDrag = function (b) {
      var d = this;
      if (this.draggable && !ui.hasClasses(b, "winDragHandle")) {
        this.dragEls = b;
        ui.addClasses(b, "winDragHandle");
        for (var k = 0; k < b.length; k++) {
          var f = new ui.drag(b[k]);
          f.setLeft = f.setTop = g.no;
          f.start.add(function (b, k) {
            return ui.addClass(d.el, "drag");
          });
          f.move.add(function (b, k) {
            return d.onDragMove(b);
          });
          f.end.add(function (b, k) {
            return d.onDragEnd();
          });
        }
      }
    };
    f.prototype.onDragMove = function (b) {
      var d = this.el;
      this.isDragged = !0;
      0 !== b.dx &&
        (void 0 === this.right
          ? ui.setLeft(d, (this.left = ui.getLeft(d) + b.dx))
          : ui.setRight(d, (this.right = ui.getRight(d) - b.dx)));
      if (0 !== b.dy) {
        var k = ui.getTop(d) + b.dy;
        1 > b.dy
          ? (this.top = Math.max(k, -10))
          : 1 < b.dy && (this.top = Math.min(k, g.windowHeight() - 20));
        ui.setTop(d, this.top);
      }
    };
    f.prototype.onDragEnd = function () {
      ui.deleteClass(this.el, "drag");
      this.dragEnd.fire();
    };
    f.prototype.title = function (b) {
      if (void 0 === b) return this._title || "";
      this._title = b;
      void 0 !== this.titleEl &&
        ((this.titleEl.innerHTML = this._title),
        this.titleChange.fire(this._title));
      return this._title;
    };
    f.prototype.setHelp = function (b) {
      var d = this.helpEl,
        k = ui.iOS();
      void 0 === d &&
        ((d = ui.addClass(ui.getTag("a"), "helpWin noSelect")),
        (d.innerHTML =
          '<svg class="svgIcon helpSvg"><use xlink:href="#helpD" /></svg>'),
        k && ui.setAttribute(d, "target", "_blank"),
        (this.helpEl = d),
        ui.append(d, this.el));
      b
        ? (ui.setAttribute(d, "href", (k ? "/help/" : "") + b),
          ui.setTabIndex(d, -1))
        : ui.hide(d);
    };
    f.prototype.addOpenInNewWindow = function (b) {
      var d = this;
      this.openInNewWindowEl ||
        ((this.openInNewWindowEl = ui.addClass(
          ui.getTag("a"),
          "maxWin noSelect",
        )),
        ui.setAttribute(this.openInNewWindowEl, "target", "_blank"),
        (this.openInNewWindowEl.innerHTML =
          '<svg class="svgIcon maxSvg"><use xlink:href="#maxD" /></svg>'),
        ui.append(this.openInNewWindowEl, this.el),
        ui.hint(this.openInNewWindowEl, "Open in new window", g.hintPos.left),
        ui.click(this.openInNewWindowEl, function (b) {
          return d.close();
        }));
      ui.setAttribute(this.openInNewWindowEl, "href", b);
    };
    f.prototype.onScaleChange = function (b) {
      ui.setTransform(b.hEl(), ui.getScale(b.val));
    };
    f.prototype.onStoryboardEnd = function () {
      this.isOpen
        ? ui.switchClass(this.el, "closed", "opened")
        : ui.switchClass(this.el, "opened", "closed");
    };
    f.prototype._anim = function () {
      return this.anim;
    };
    f.zIndex = 1e5;
    f.id = 0;
    return f;
  })();
  g.win = p;
  var h = { no: 0, width: 1, height: 2, both: 3 };
})(c || (c = {}));
(function (g) {
  var p = (function () {
    function h(f, b, d, k) {
      this.isResource = this.enableReord = !1;
      this.mA = f;
      this.el = b;
      this.grid = d;
      this.desc = k;
      f = k.type;
      this.isResource =
        e.isViewEntityType(f) ||
        e.isDayOrPeriodType(f) ||
        f === e.type.group ||
        f === e.type.groupSet ||
        f === e.type.student ||
        f === e.type.activity ||
        f === e.type.user ||
        f === e.type.view;
      this.initialize(f);
    }
    h.prototype.initialize = function (f) {
      var b = this;
      this.barEl = ui.getDiv("toolbarPanel");
      ui.append(ui.getDiv("infoPanel"), this.barEl);
      this.initializeButtons();
      this.gridEl = ui.getDiv("gridContainer");
      ui.appends([this.barEl, this.gridEl], this.el);
      this.addClick = c.callback();
      this.editClick = c.callback();
      this.deleteClick = c.callback();
      this.copyClick = c.callback();
      this.openClick = c.callback();
      this.renameClick = c.callback();
      this.mergeClick = c.callback();
      this.groupsClick = c.callback();
      this.studentsClick = c.callback();
      this.grid.setEl(this.gridEl);
      this.grid.add.add(function (d) {
        return b.addClick.fire(d);
      });
      this.grid.edit.add(function (d, f) {
        return b.editClick.fire(d, f);
      });
      this.grid.remove.add(function (d, f, g) {
        return b.deleteClick.fire(d, f, g);
      });
      this.grid.paste.add(function (d, f) {
        return b.onPaste(d, f);
      });
      var d =
        "English language\tEng\nGerman language\tGer\nFrench language\tFre\nPainting\tPai\nMusic\tMus\nHistory\tHis\nGeography\tGeo\nPhysics\tPhy\nMathematics\tMat\nBiology\tBio\nChemistry\tChe\nTechnical works\tTW\nPhysical education\tPE";
      f === e.type.teacher
        ? (d =
            "Emma Willard\tEmma\nJaime Escalante\tJaime\nMaya Angelou\tMaya\nClara Barton\tClara\nAlexander Graham\tAlex\nDan Blocker\tDan\nBilly Crystal\tBilly\nWilliam McGuffey\tWilliam\nMaria Montessori\tMaria\nAnne Sullivan\tAnne\nJohn Keating\tJohn\nGreg Graffin\tGreg\nAndy Griffith\tAndy\nEdith Head\tEdith\nHugh Jackman\tHugh\nStephen King\tStephen")
        : f === e.type.room
          ? (d =
              "101\n102\n103\n104\n105\n106\n201\n202\n203\n204\n205\n206\nSport Hall 1\tSH1\nSport Hall 2\tSH2\nTechnical Works\tTW")
          : f === e.type.class
            ? (d =
                "Grade 5A\t5a\nGrade 5B\t5b\nGrade 5C\t5c\nGrade 5D\t5d\nGrade 7A\t7a\nGrade 7B\t7b\nGrade 7C\t7c\nGrade 7D\t7d\nGrade 7E\t7e\tFrench,German|Art,Chemistry,Music")
            : f === e.type.activity
              ? (d =
                  "Mathematics\tRoberta\t7E\t\t3\t1\tRoom 1\tRoom 2, Room 3\nEnglish {Eng}\tMaya,Dan\t8A\tG1\t1\t2\tRoom 4\tRoom 1, Room 2")
              : f === e.type.day
                ? ((f = date.now().getFullYear()),
                  (d =
                    "Saturday\tSat\nSunday\tSun\n2/9/" +
                    f +
                    "\tMo\n3/9/" +
                    f +
                    "\tTu\n4/9/" +
                    f +
                    "\tWe\n5/9/" +
                    f +
                    "\tTh"))
                : f === e.type.period
                  ? (d =
                      "08:25\t09:15\n09:20\t10:10\n10:30\t11:20\n11:25\t12:15\n12:15\t13:10\tLunch\tLunch\n13:10\t14:00\n14:05\t15:00\n15:10\t16:10\n16:10\t17:00\tAfter school\tAfter")
                  : f === e.type.student &&
                    (d =
                      "Jena Cornman\tJena\nTony Carpenter\tTony\nVictor Harper\tVictor\tGroup 1, Boys\nLinda Harper\tLinda\tGroup 2, Girls\nAlice Toole\tAlice\tGroup 1, Girls\nBrian Sternberg\tBrian\tGroup 1, Boys\nSteve Mclachlan\tSteve\tGroup 1, Boys\nGlennie Barkley\tGlen\tGroup 1, Girls");
      this.grid._importText = d;
    };
    h.prototype.initializeButtons = function () {
      var f = this,
        b = (this.buttons = []);
      this.removeButton = this.svgBtn("Delete", "remove");
      var d = this.desc.type;
      d === e.type.file
        ? ((this.openButton = this.svgBtn("Open", "open", "open18")),
          (this.renameButton = c.button.svg({
            el: ui.getDiv("renameButton"),
            text: "Edit",
            svgClass: "renameSvg icon",
            useId: "editD",
            logger: this.mA.vA.log,
          })),
          (this.mergeButton = this.svgBtn("Merge", "merge")),
          b.push(
            this.openButton,
            this.renameButton,
            this.removeButton,
            this.mergeButton,
          ))
        : this.isResource &&
          ((this.addButton = this.svgBtn("Add", "add")),
          b.push(this.addButton),
          (this.editButton = this.svgBtn("Edit", "edit")),
          b.push(this.editButton),
          b.push(this.removeButton),
          e.isDayOrPeriodType(d) ||
            d === e.type.user ||
            d === e.type.group ||
            ((this.copyButton = this.svgBtn("Copy", "copy")),
            b.push(this.copyButton)),
          d === e.type.class &&
            ((this.groupsButton = this.svgBtn("Groups", "divisions")),
            (this.studentsButton = this.svgBtn("Students", "studentsButton")),
            b.push(this.groupsButton, this.studentsButton)));
      for (var k = 0; k < b.length; k++) {
        var q = b[k];
        q.setTabIndex(0);
        ui.append(q.el, this.barEl);
        q.click.add(function (b) {
          return f.onButtonClick(b);
        });
      }
      if (
        (this.enableReord =
          e.isViewEntityType(d) ||
          e.isDayOrPeriodType(d) ||
          d === e.type.groupSet ||
          d === e.type.group ||
          d === e.type.student ||
          d === e.type.view)
      )
        ((this.upButton = c.button.el(
          ui.title(ui.getDiv("moveUp"), "Move up"),
          void 0,
          !0,
          this.mA.vA.log,
        )),
          (this.downButton = c.button.el(
            ui.title(ui.getDiv("moveDown"), "Move down"),
            void 0,
            !0,
            this.mA.vA.log,
          )),
          ui.appends([this.upButton.el, this.downButton.el], this.barEl),
          this.upButton.click.add(function (b) {
            return f.onMoveUp(b);
          }),
          this.downButton.click.add(function (b) {
            return f.onMoveDown(b);
          }),
          this.grid.move.add(function (b, d) {
            if (1 === d) f.onMoveDown(b);
            else f.onMoveUp(b);
          }),
          this.grid.afterSort.add(function (b, d) {
            return f.afterSort(b, d);
          }));
    };
    h.prototype.onButtonClick = function (f) {
      ui.stopPropagation(f);
      var b = ui.target(f);
      if (this.addButton && b === this.addButton.el) this.addClick.fire(f);
      else {
        var d = this.grid && this.grid.lastSelected();
        if (this.editButton && b === this.editButton.el)
          this.editClick.fire(f, d);
        else if (this.removeButton && b === this.removeButton.el)
          if (this.grid) this.grid.onRemove(f);
          else this.deleteClick.fire(f, d);
        else
          this.copyButton && b === this.copyButton.el
            ? this.copyClick.fire(f, d)
            : this.openButton && b === this.openButton.el
              ? this.openClick.fire(f, d)
              : this.renameButton && b === this.renameButton.el
                ? this.renameClick.fire(f, d)
                : this.mergeButton && b === this.mergeButton.el
                  ? this.mergeClick.fire(f, d)
                  : this.groupsButton && b === this.groupsButton.el
                    ? this.groupsClick.fire(f, d)
                    : this.studentsButton &&
                      b === this.studentsButton.el &&
                      this.studentsClick.fire(f, d);
      }
    };
    h.prototype.svgBtn = function (f, b, d) {
      return c.button.svg({
        el: ui.getDiv(b + "Button"),
        text: f,
        svgClass: b + "Svg icon",
        useId: (d ? d : b) + "D",
        logger: this.mA.vA.log,
      });
    };
    h.prototype.onMoveUp = function (f) {
      this.reorder(!0);
    };
    h.prototype.onMoveDown = function (f) {
      this.reorder(!1);
    };
    h.prototype.afterSort = function (f, b) {
      if (e.hasPos(this.desc.props)) {
        var d = this.grid.data;
        f = g.newUpdateState(this.desc, [], {
          mA: this.mA,
          changedProps: [e.posProp()],
          updateType: g.updateType.sort,
        });
        f.name = b ? "Sort ascending" : "Sort descending";
        f.icon = b ? "sortAsc" : "sortDesc";
        f.tag = g.updateType.sort;
        var k = this.mA._t();
        b = f.actions;
        var q = b[0],
          l = this.desc === e.period,
          n = this.desc === e.day,
          t = this.desc === e.view ? obj.notDel(k.views) : [],
          h = l ? e.customPeriods(k.periods) : [],
          u = [],
          x = [],
          y = [],
          z = [],
          A = 0;
        k = function (b) {
          if (l && e.isCustomPeriod(b)) return "continue";
          if (b.position !== ++A) {
            if (g.isAddedDeletedView(b, A, y, z, t)) return "continue";
            g.addUndoCopies(q, [b]);
            l &&
              u.push([
                h.filter(function (d) {
                  return d.position === b.position;
                }),
                A,
              ]);
            (n || l) && x.push([b.position, A]);
            b.position = A;
          }
        };
        for (var B = 0; B < d.length; B++) k(d[B]);
        for (d = 0; d < u.length; d++)
          ((k = u[d]), this.changeCustomPos(q, k[0], k[1]));
        0 < x.length && b.push.apply(b, this.moveMarks(x, n, this.mA));
        g.addViewActions(b, y, z, this.mA, !1, !1);
        0 < q.entities.length && g.addState(f, { mA: this.mA });
      }
    };
    h.prototype.moveMarks = function (f, b, d) {
      for (
        var k = d._t(),
          q = [],
          l = 0,
          n = [e.subject, e.room, e.teacher, e._class];
        l < n.length;
        l++
      ) {
        var t = n[l],
          h = obj.notDel(k[t.arrayName]).filter(function (b) {
            return 0 < b.marks.length;
          });
        if (0 < h.length && ((h = this.getMovedMarks(h, f, b)), 0 < h.length)) {
          var u = h.map(function (b) {
            return b[0];
          });
          t = g.newUpdateAction(t, u, { mA: d, changedProps: [e.marks] });
          h.forEach(function (b) {
            return (b[0].marks = b[1]);
          });
          g.doUpdate(t);
          q.push(t);
        }
      }
      return q;
    };
    h.prototype.getMovedMarks = function (f, b, d) {
      for (var k = [], q = 0; q < f.length; q++) {
        for (
          var g = f[q],
            n = g.marks,
            t = void 0,
            h = function (k) {
              var f = n[k],
                q = f[0],
                l = f[1];
              if (
                (f = b.find(function (b) {
                  return d ? q === b[0] : l === b[0];
                }))
              )
                (t || (t = obj.getMarksCopy(g)),
                  d ? (t[k][0] = f[1]) : (t[k][1] = f[1]));
            },
            u = 0;
          u < n.length;
          u++
        )
          h(u);
        t && k.push([g, t]);
      }
      return k;
    };
    h.prototype.reorder = function (f) {
      var b = this,
        d = this.grid.data.length;
      if (2 > d) this.mA.vA.inf.add("Add more items so you can reorder them");
      else if (this.grid.hasSelection()) {
        var k = this.grid.selectedRows.slice().sort(function (b, d) {
          return arr.sort(b.rowIndex, d.rowIndex);
        });
        if (
          !(
            (f && 0 === k[0].rowIndex) ||
            (!f && arr.last(k).rowIndex === d - 1)
          )
        ) {
          var q = this.mA._t(),
            l = this.desc === e.period,
            n = this.desc === e.day,
            t = this.desc === e.view,
            h = t ? obj.notDel(q.views) : [],
            u = l ? e.maxPerNum(q.periods) : d,
            x = l ? e.customPeriods(q.periods) : [],
            y = l && 0 < x.length,
            z = l ? e.getDefaultPeriods(q) : [],
            A = [],
            B = f ? -1 : 1,
            p = k.slice();
          f || p.reverse();
          d = g.newUpdateState(this.desc, [], {
            mA: this.mA,
            changedProps: [e.posProp()],
            updateType: g.updateType.reorder,
          });
          d.name = f ? "Move up" : "Move down";
          d.icon = f ? "moveUp" : "moveDown";
          d.tag = g.updateType.reorder;
          k = d.actions;
          var I = k[0],
            F = [];
          q = function (b) {
            var d = C.grid.table.rows()[b.rowIndex],
              k = d.data,
              q = k.position;
            if (y) {
              if (
                (f && 1 === q) ||
                (!f && q === u) ||
                (e.isCustomPeriod(k) &&
                  p.find(function (b) {
                    return b.data.position === q && e.isDefaultPeriod(b.data);
                  }))
              )
                return "continue";
              if (e.isDefaultPeriod(k)) {
                var h = f ? q - 1 : q + 1;
                b = z.find(function (b) {
                  return b.position === h;
                });
                g.addUndoCopies(I, [k, b]);
                A.push([k.position, b.position], [b.position, q]);
                k.position = h;
                b.position = q;
                C.switchCustomPos(I, x, k.position, b.position);
              } else
                ((d = k.groupedPeriods),
                  g.addUndoCopies(I, d),
                  d.forEach(function (b) {
                    return (b.position += B);
                  }));
            } else {
              var w = C.grid.table.rows()[b.rowIndex + B];
              b = w.data;
              var E = b.position,
                H = [];
              if (t) {
                var G = k.isDefault,
                  D = b.isDefault,
                  J = F.map(function (b) {
                    return b[0];
                  });
                G && !arr.has(J, k) && F.push([k, q]);
                D && !arr.has(J, b) && F.push([b, E]);
                G || H.push(k);
                D || H.push(b);
              } else H.push(k, b);
              g.addUndoCopies(I, H);
              (l || n) && A.push([k.position, E], [b.position, q]);
              k.position = E;
              b.position = q;
              C.grid.data[d.rowIndex] = b;
              C.grid.data[d.rowIndex + B] = k;
              C.grid.updateRow(d, b);
              C.grid.updateRow(w, k);
            }
          };
          for (var C = this, G = 0; G < p.length; G++) q(p[G]);
          0 < A.length && k.push.apply(k, this.moveMarks(A, n, this.mA));
          q = [];
          G = [];
          for (var H = 0; H < F.length; H++) {
            var D = F[H],
              J = D[0],
              L = J.position;
            g.isAddedDeletedView(J, L, q, G, h, D[1]) ||
              (g.addUndoCopies(I, [J]), (J.position = L));
          }
          h = this.grid.selectedItems.slice();
          this.grid.resetSort();
          g.addViewActions(k, q, G, this.mA, !1, !1);
          g.addState(d, { mA: this.mA });
          var K = y ? [] : h;
          if (y)
            for (
              this.grid.isDirty = !0,
                this.mA.periodsView().bindPeriods(),
                d = 0;
              d < h.length;
              d++
            )
              ((k = h[d]),
                e.isDefaultPeriod(k)
                  ? K.push(k)
                  : (k = this.mA.periodsView().findCustom(k, this.grid.data)) &&
                    K.push(k));
          else if (t) {
            var P = this.grid.data;
            h = function (b) {
              var d = K[b];
              if (d.isDefault && !arr.has(P, d)) {
                var k = P.find(function (b) {
                  return b.isDefault && b.entityType === d.entityType;
                });
                k && arr.replaceAt(K, b, k);
              }
            };
            for (d = 0; d < K.length; d++) h(d);
          }
          c.timeout(function () {
            return b.grid.setSelectedItems(K);
          }, 2 * this.grid.selectedTimeout);
        }
      }
    };
    h.prototype.checkViews = function (f, b, d, k) {
      f &&
        ((f = k.find(function (d) {
          return d.id === b.id;
        }))
          ? f.isDefault && obj.isUnchanged(f) && obj.setAdd(f)
          : (arr.addUnique(d.views, b), obj.setAdd(b)));
    };
    h.prototype.switchCustomPos = function (f, b, d, k) {
      var q = 0;
      for (
        b = b.filter(function (b) {
          return b.position === d || b.position === k;
        });
        q < b.length;
        q++
      ) {
        var l = b[q];
        g.addUndoCopies(f, [l]);
        l.position = l.position === d ? k : d;
      }
    };
    h.prototype.changeCustomPos = function (f, b, d) {
      for (var k = 0; k < b.length; k++) {
        var q = b[k];
        g.addUndoCopies(f, [q]);
        q.position = d;
      }
    };
    h.prototype.onPaste = function (f, b) {
      this.desc.type === e.type.activity
        ? g.importActivities(f, b, this.desc, this.mA)
        : ((f = g.getImportedEntities(f, b, this.desc, this.grid, this.mA)),
          0 !== f.entities.length && this.paste && this.paste(f));
    };
    return h;
  })();
  g.gridToolbar = p;
})(m || (m = {}));
(function (g) {
  var p = (function (f) {
    function b(b) {
      var d = f.call(this, b) || this;
      d.vcs = [];
      d.cs = [];
      d.mrgCs = [];
      d.mis = [];
      d.isO = !1;
      d._unclip = !1;
      d._clip = !1;
      d.is1o = !0;
      d.el = ui.hide(ui.getDiv("contextMenu"));
      ui.disableContextMenu([d.el]);
      ui.append(d.el, d.viewer().el);
      d.editActivityItem = new h("Edit activity", "", "lessonD");
      d.editCardItem = new h("Edit card", "", "editD");
      d.customizeItem = new h("Customize", "", "designerD");
      d.pinItem = new h("", "", "pinD");
      d.removeItem = new h("Clear", "", "spongeD");
      d.deleteItem = new h("Delete", "", "removeD");
      d.mergeItem = new h("Merge", "", "mergeCardsD");
      d.splitItem = new h("Split", "", "splitD");
      d.clipItem = new h("Clip", "", "clipD");
      d.copyItem = new h("Copy", "", "copyD");
      d.pasteItem = new h("Paste", "", "pasteD");
      d.editCardItem.setVis = d.editCardVisibility;
      d.editActivityItem.setVis = d.editActivityVisibility;
      d.customizeItem.setVis = function () {
        d.customizeItem.toggle(d.isVc());
      };
      d.editCardItem.setTxt = function (b) {
        return d.cardTxt(b);
      };
      d.pinItem.setTxt = function (b) {
        return d.pinTxt(b);
      };
      d.pinItem.setVis = d.pinVisibility;
      d.removeItem.setVis = d.removeVisibility;
      d.deleteItem.setVis = d.deleteVisibility;
      d.mergeItem.setVis = d.mergeVisibility;
      d.splitItem.setVis = d.splitVisibility;
      d.clipItem.setVis = d.clipVisibility;
      d.clipItem.setTxt = function (b) {
        return d.clipText(b);
      };
      d.copyItem.setVis = d.copyVisibility;
      d.pasteItem.setVis = d.pasteVisibility;
      d.mis = [
        d.editActivityItem,
        d.editCardItem,
        d.customizeItem,
        d.pinItem,
        d.mergeItem,
        d.splitItem,
        d.clipItem,
        d.copyItem,
        d.pasteItem,
        d.removeItem,
        d.deleteItem,
      ];
      d.editActivityItem.clk = function (b) {
        return d.editActivityClick(b);
      };
      d.editCardItem.clk = function (b) {
        return d.editCardClick(b);
      };
      d.customizeItem.clk = function (b) {
        return d.customizeClick(b);
      };
      d.pinItem.clk = function (b) {
        return d.pinClick(b);
      };
      d.removeItem.clk = function (b) {
        return d.removeClick(b);
      };
      d.deleteItem.clk = function (b) {
        return d.deleteClick(b);
      };
      d.mergeItem.clk = function (b) {
        return d.mergeClick(b);
      };
      d.splitItem.clk = function (b) {
        return d.splitClick(b);
      };
      d.clipItem.clk = function (b) {
        return d.clipClick(b);
      };
      d.copyItem.clk = function (b) {
        return d.copyClick(b);
      };
      d.pasteItem.clk = function (b) {
        return d.pasteClick(b);
      };
      b = d.mainView().g;
      b.ctx.add(function (b, k) {
        return d.o(b, k);
      });
      b.ctxX.add(function () {
        return d.x();
      });
      b.copyChg.add(function (b) {
        return d
          .viewer()
          .inf.add(
            b.length +
              " card(s) copied to the clipboard. Right-click day, period or resource name to paste them.",
          );
      });
      return d;
    }
    __extends(b, f);
    b.prototype.isVc = function () {
      return this.type.object instanceof v.vc;
    };
    b.prototype.isDay = function () {
      return !!this.type.isDay;
    };
    b.prototype.isPer = function () {
      return !!this.type.isPeriod;
    };
    b.prototype.isRow = function () {
      return !!this.type.isEntity;
    };
    b.prototype.cardTxt = function (b) {
      ui.setText(b, 1 < v.toCs(this.vcs).length ? "Edit cards" : "Edit card");
    };
    b.prototype.editCardVisibility = function () {
      var b = this.isVc()
        ? 1 === this.cs.length
          ? 1 !== this.cs[0].parent.cards.length
          : !0
        : !1;
      this.editCardItem.toggle(b);
    };
    b.prototype.editActivityVisibility = function () {
      var b = this.isVc() ? 1 === this.cs.length : !1;
      this.editActivityItem.toggle(b);
    };
    b.prototype.pinVisibility = function () {
      this.pinItem.toggle(0 < this.vcs.length);
    };
    b.prototype.pinTxt = function (b) {
      ui.setText(b, v.shouldPin(this.vcs) ? "Pin" : "Unpin");
    };
    b.prototype.removeVisibility = function () {
      this.removeItem.toggle(0 < v.ins(this.vcs).length);
    };
    b.prototype.deleteVisibility = function () {
      var b = v.out(this.vcs).length;
      this.deleteItem.toggle(b === this.vcs.length && 0 < b);
    };
    b.prototype.mergeVisibility = function () {
      this.mergeOptions = { mA: this.mA, view: this.view, mergeCards: [] };
      this.mergeItem.toggle(
        this.isVc() && g.canMerge(this.vcs, this.mergeOptions),
      );
    };
    b.prototype.splitVisibility = function () {
      var b = this.isVc()
        ? !this.vcs.some(function (b) {
            b = b.activity();
            return 2 > b.groupIds.length && 2 > b.teacherIds.length;
          })
        : !1;
      this.splitItem.toggle(b);
    };
    b.prototype.copyVisibility = function () {
      this.copyItem.toggle(0 < this.vcs.length);
    };
    b.prototype.pasteVisibility = function () {
      var b = !this.isVc() && this.mainView().g.hasCopy();
      this.isRow() && this.type.view.is1() && (b = !1);
      this.pasteItem.toggle(b);
    };
    b.prototype.clipVisibility = function () {
      var b = this.isVc() ? g.canClip(this.vcs) : [!1, !1];
      this._clip = b[0];
      this._unclip = b[1];
      this.clipItem.toggle(this._clip || this._unclip);
    };
    b.prototype.clipText = function (b) {
      ui.setText(b, this._clip ? "Clip" : "Unclip");
    };
    b.prototype.o = function (b, k) {
      this.type = k;
      var d = (this.view = k.view);
      k = k.object;
      if (this.isVc()) {
        d = this.mainView().g;
        var f = d.cs;
        this.vc = k;
        this.vcs = arr.has(f, k.card()) ? d.vcs.slice() : [k];
        this.cs = v.toCs(this.vcs);
      } else
        this.isDay()
          ? ((f = r.getDayPosition(d, k) - 1),
            (k = r.getColumnsPerDayCount(d.data.periodsCount, d.is1())),
            (f *= k),
            (this.vcs = v.scheduledColumnRange(d.vcs, f, f + k - 1)))
          : this.isPer()
            ? ((k = k.colI), (this.vcs = v.scheduledColumnRange(d.vcs, k, k)))
            : this.isRow() &&
              (this.vcs = v.scheduledRowRange(
                d.vcs,
                r.getRowPosition(d, k) - 1,
              ));
      this.go();
      if (
        (this.isVc() || 0 !== this.vcs.length || this.mainView().g.hasCopy()) &&
        !this.mis.every(function (b) {
          return !b.isVisible;
        })
      ) {
        this.isO = !0;
        b = ui.getTouchPoint(b);
        d = this.el;
        k = c.windowWidth();
        f = c.windowHeight();
        ui.setLeftTop(d, -1e3, -1e3);
        ui.show(d);
        var g = ui.getComputedHeight(d) + 10,
          t = ui.getComputedWidth(d) + 4;
        ui.setLeftTop(
          d,
          b.x + t > k ? k - t : b.x,
          b.y + g > f ? f - g - 10 : b.y,
        );
      }
    };
    b.prototype.go = function () {
      for (var b = this.mis.length, k = 0; k < b; k++) {
        var f = this.mis[k];
        f.set(this, k);
        this.is1o && ui.append(f.el, this.el);
      }
      this.is1o = !1;
    };
    b.prototype.x = function () {
      this.isO = !1;
      ui.hide(this.el);
    };
    b.prototype.editActivityClick = function (b) {
      this.itClk(this.editActivityItem, b);
      this.mA.setCurrent(e.activity, this.vc.activity());
      this.mA.dataView().openTab(4);
      this.log().w("context -> activity");
    };
    b.prototype.editCardClick = function (b) {
      this.itClk(this.editActivityItem, b);
      var d = v.toCs(this.vcs),
        f = d[0].parent;
      d.every(function (b) {
        return b.parent === f;
      }) && d.length === obj.notDel(f.cards).length
        ? this.editActivityClick(b)
        : ((b = this.mA.activityView()),
          (b.selectedCards = d),
          (b.options = {
            ctx: b,
            mA: this.mA,
            isAdd: !1,
            isCopy: !1,
            state: g.activityMode.editCards,
            desc: e.activity,
            grid: void 0,
          }),
          b.open());
    };
    b.prototype.itClk = function (b, k) {
      ui.stopDefaultPropagation(k);
      b.onOv(void 0, !1);
      this.x();
    };
    b.prototype.customizeClick = function (b) {
      this.itClk(this.customizeItem, b);
      this.mA.cardStyles().openVc(this.vc);
      this.log().w("context -> customize");
    };
    b.prototype.pinClick = function (b) {
      this.itClk(this.pinItem, b);
      this.mainView().vEv.vcM.pinVcs(this.vcs);
      this.log().w("context -> (un)pin");
    };
    b.prototype.removeClick = function (b) {
      this.itClk(this.removeItem, b);
      keys.shift(b)
        ? this.deleteClick(b)
        : (this.xVcs(this.vcs), this.log().w("context -> remove"));
    };
    b.prototype.xVcs = function (b) {
      this.mainView().vEv.vcM.x(b.slice());
    };
    b.prototype.deleteClick = function (b) {
      this.itClk(this.removeItem, b);
      this.delVcs(this.vcs);
    };
    b.prototype.delVcs = function (b) {
      g.deleteEntities(e.card, v.toCs(b), { mA: this.mA });
      this.crdChg("context -> delete");
    };
    b.prototype.mergeClick = function (b) {
      this.itClk(this.removeItem, b);
      b = [];
      g.mergeCards(this.mergeOptions, b);
      this.sel(b);
      this.crdChg("context -> merge", !1);
    };
    b.prototype.splitClick = function (b) {
      this.itClk(this.removeItem, b);
      g.split(this.vcs, this.mA);
      this.crdChg("context -> split");
    };
    b.prototype.crdChg = function (b, k) {
      void 0 === k && (k = !0);
      k && this.mainView().g.resetSelection();
    };
    b.prototype.sel = function (b) {
      if (0 !== b.length) {
        var d = this.mainView().g;
        d.resetSelection();
        arr.addUniques(d.cs, b.slice());
      }
    };
    b.prototype.clipClick = function (b) {
      this.itClk(this.removeItem, b);
      g.clip(this.vcs, {
        mA: this.mA,
        _v: this.mainView(),
        isClip: this._clip,
      }) &&
        this._clip &&
        (this.viewer().inf.addTip(
          "Clipped cards will be scheduled and dragged all together." +
            g.videoGuide("blBEL8DTLvQ", "#clip"),
        ),
        this.log().w("context -> clip"));
    };
    b.prototype.copyClick = function (b) {
      this.itClk(this.removeItem, b);
      var d = this.vcs.slice();
      v.addClips(d, 0);
      this.mainView().g.onCopy(b, v.toCs(d));
      this.log().w("context -> copy");
    };
    b.prototype.pasteClick = function (b) {
      this.itClk(this.removeItem, b);
      this.mainView().g.hasCopy() &&
        (g.paste({ view: this.view, mA: this.mA, type: this.type }),
        this.crdChg("context -> paste", !1));
    };
    return b;
  })(g.baseView);
  g.contextMenu = p;
  var h = (function () {
    function f(b, d, k) {
      var f = this;
      this.isVisible = !1;
      this.subs = [];
      this.txt = b;
      this.desc = d;
      this.ic = k;
      this.el = ui.getDiv();
      ui.click(this.el, function (b) {
        return f.onClk(b);
      });
      ui.disableContextMenu([this.el]);
      ui.over(this.el, function (b, d) {
        return f.onOv(b, d);
      });
      this.icEl = svg.getIcon(void 0, "svgIcon icon", k).svg;
      this.txtEl = ui.getDiv("text");
      this.isTop() && ui.addClass(this.el, "top");
      ui.appends([this.icEl, this.txtEl], this.el);
    }
    f.prototype.set = function (b, d) {
      this.menu = b;
      this.setVis && this.setVis.call(b);
      this.setTxt
        ? this.setTxt.call(b, this.txtEl)
        : ui.setText(this.txtEl, this.txt);
    };
    f.prototype.toggle = function (b) {
      ui.toggle(this.el, b);
      this.isVisible = b;
    };
    f.prototype.onClk = function (b) {
      ui.call(this.clk, this.menu, b);
      return !0;
    };
    f.prototype.onOv = function (b, d) {
      ui.toggleClass(this.el, "over", d);
      ui.call(d ? this.over : this.out, this.menu, this);
    };
    f.prototype.isTop = function () {
      return void 0 === this.parent;
    };
    f.prototype.addSubs = function (b) {
      for (var d, k = b.length, f = 0; f < k; f++) b[f].parent = this;
      (d = this.subs).push.apply(d, b);
    };
    return f;
  })();
  g.contextItem = h;
})(m || (m = {}));
(function (g) {
  g.getSelector = function (h) {
    return new g.selector(h);
  };
  g.getUseId = function (g) {
    return r.getViewClassName(g - 1) + "D";
  };
  var p = (function () {
    function g(f) {
      var b = this;
      this.sorted = [];
      this.selected = [];
      this.options = f;
      this.mA = f.mA;
      this.combo = f.combo;
      this.change = c.callback();
      this.moreButton = c.button.svg({
        el: f.moreButtonElement,
        text: "More...",
        useId: f.useId,
        svgClass: "icon moreSvg",
        logger: f.mA.vA.log,
      });
      ui.addClass(this.moreButton.el, "moreButton");
      this.setMoreText("More...");
      this.moreButton.click.add(function (d) {
        return b.onMoreClick(d);
      });
      this.desc = f.desc;
      this.combo &&
        this.combo.change.add(function (d, k) {
          return b.onComboChange(d, k);
        });
    }
    g.prototype.setMoreText = function (f) {
      this.moreText = f;
      this.moreButton.setText(f);
    };
    g.prototype.bind = function (f, b, d) {
      var k = this;
      this.sorted = f.slice();
      this.selected = d.slice();
      var g = !!this.options.classesAndGroups,
        l =
          2 > d.length &&
          !(
            g &&
            1 === d.length &&
            !e.isEntire(d[0]) &&
            !filter.isCurrent(d[0])
          );
      if (this.combo) {
        this.emptyPair = b;
        f =
          this.desc === e.group && g
            ? f.filter(function (b) {
                return e.isEntire(b);
              })
            : f;
        b = filter.getOptions(this.desc, f, { emptyPair: b });
        f = 0 === d.length ? void 0 : filter.findValueById(b, arr.first(d).id);
        this.combo.bind(b, f);
        if (l && 0 < b.length) this.onComboChange(null, this.combo.getValue());
        this.combo.el.style.display = l ? "" : "none";
      } else l = 0 === d.length;
      this.moreButton.setText(
        l
          ? this.moreText
          : arr.joinCommaSpace(
              this.desc === e.period
                ? d.map(function (b) {
                    return e.getPeriodName(b, !1);
                  })
                : this.desc === e.group
                  ? d.map(function (b) {
                      return filter.isCurrent(b)
                        ? b.name
                        : k.options.classesAndGroups
                          ? e.groupName(b)
                          : b.name + " (" + b.shortName + ")";
                    })
                  : e.names(d),
            ),
      );
    };
    g.prototype.onMoreClick = function (f) {
      var b = this;
      ui.stopPropagation(f);
      this.mA.selector().onDone(function (d) {
        return b.onMultiChange(d);
      });
      this.mA
        .selector()
        .openWindow(
          this.selected.slice(),
          this.sorted,
          this.desc,
          this.options,
        );
    };
    g.prototype.onMultiChange = function (f) {
      this.bind(this.sorted, this.emptyPair, f);
      this.onChange();
    };
    g.prototype.onComboChange = function (f, b) {
      f = filter.getTypeAndId(b)[1];
      this.selected = e.byIds(this.sorted, [f]);
      this.onChange();
    };
    g.prototype.onChange = function () {
      this.change.fire(this.selected);
    };
    return g;
  })();
  g.selector = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.sorted = [];
      b.source = [];
      b.filteredSource = [];
      b.selected = [];
      b.isTabPressed = !1;
      b.sourceKeyIndex = 0;
      b.selectionKeyIndex = 0;
      b.typeTimeout = -1;
      b.isTyping = !1;
      b.typing = "";
      b.init();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this,
        d = this.win;
      d.width = d.minWidth = 650;
      d.minHeight = 240;
      d.resizable = !0;
      d.init();
      this.win.setHelp("#multi-selector");
      this.done = c.callback();
      this.selectorTable = this.find(".selectorTable");
      this.selectorTitleRow = this.find(".selectorTitleRow");
      this.sourceTitle = this.find(".sourceTitle");
      this.selectionTitle = this.find(".selectionTitle");
      this.filterCombo = new c.combo(this.find(".selFilter"));
      this.filterCombo.change.add(function (d, f) {
        return b.onFilterChange();
      });
      this.sourceTitleCell = this.find(".sourceTitleCell");
      this.noSource = this.find(".noSource");
      this.sourceEl = this.find(".sourceContainer");
      this.selectTitleCell = this.find(".selectTitleCell");
      this.selectionTitleCell = this.find(".selectionTitleCell");
      this.noSelection = this.find(".noSelection");
      this.selectionEl = this.find(".selectionContainer");
      this.selectAllButton = c.button.svg({
        el: this.find(".selectAllButton"),
        text: "Select all",
        svgClass: "selectSvg icon",
        useId: "selectAllD",
        logger: this.log(),
      });
      this.removeAllButton = c.button.svg({
        el: this.find(".removeAllButton"),
        text: "Remove all",
        svgClass: "removeAllSvg icon",
        useId: "removeAllD",
        logger: this.log(),
      });
      this.submitRow = this.find(".selectorSubmitRow");
      this.selectAllButton.click.add(function (d) {
        return b.onSelectAll();
      });
      this.removeAllButton.click.add(function (d) {
        return b.onRemoveAll();
      });
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.setType(g.subType.ok);
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
      d.resize.add(function () {
        return b.onResize();
      });
      this.onResize();
      ui.on(this.sourceEl, "keydown", function (d) {
        return b.onListKeyDown(d, !0);
      });
      ui.on(this.selectionEl, "keydown", function (d) {
        return b.onListKeyDown(d, !1);
      });
      ui.on(this.sourceEl, "focus", function (d) {
        return b.onFocus(!0);
      });
      ui.on(this.sourceEl, "blur", function (d) {
        return b.onBlur(!0);
      });
      ui.on(this.selectionEl, "focus", function (d) {
        return b.onFocus(!1);
      });
      ui.on(this.selectionEl, "blur", function (d) {
        return b.onBlur(!1);
      });
      this.sourceScroll = new c.scrA([this.sourceEl], 120);
      this.sourceScroll.ea = c.eaTy.oQuint;
      this.selectionScroll = new c.scrA([this.selectionEl], 120);
      this.selectionScroll.ea = c.eaTy.oQuint;
    };
    f.prototype.openWindow = function (b, d, f, g) {
      var k = this;
      this.selected = b;
      this.sorted = d;
      this.desc = f;
      this.selector = g;
      this.setTitle();
      b = this.hasFilter(f);
      ui.toggle(this.sourceTitle, !b);
      ui.toggle(this.filterCombo.el, b);
      b &&
        this.filterCombo.bind(
          this.getFilters(f),
          filter.getPreviousValue(f.type),
        );
      this.source = this.getSourceEntities();
      this.resetKeyIndexes();
      this.bind();
      c.timeout(function () {
        return k.scrollToTop(!0);
      }, 50);
      c.timeout(function () {
        return k.scrollToTop(!1);
      }, 50);
      this.open();
      this.sourceEl.focus();
      this.onFocus(!0, !0);
      window.addEventListener("focus", function (b) {
        return k.onWindowFocus();
      });
    };
    f.prototype.onWindowFocus = function () {
      if (ui.hasFocus(this.sourceEl)) this.onFocus(!0, !0);
      else if (ui.hasFocus(this.selectionEl)) this.onFocus(!1, !0);
    };
    f.prototype.setTitle = function () {
      var b,
        d = this.desc,
        f = null === (b = this.selector) || void 0 === b ? void 0 : b.title;
      this.title(
        f
          ? f
          : d === e.subject
            ? "Select subjects"
            : d === e.room
              ? "Select rooms"
              : d === e.teacher
                ? "Select teachers"
                : d === e._class
                  ? "Select classes"
                  : d === e.group
                    ? this.isClassesAndGroups()
                      ? "Select classes/groups"
                      : "Select groups"
                    : d === e.student
                      ? "Select students"
                      : d === e.day
                        ? "Select days"
                        : d === e.period
                          ? "Select periods"
                          : "Select items",
      );
    };
    f.prototype.hasFilter = function (b) {
      return e.isViewEntity(b) || (b === e.group && this.isClassesAndGroups());
    };
    f.prototype.getFilters = function (b) {
      var d = filter.getFilters(this.mA, b);
      this.isClassesAndGroups() &&
        filter.insertOption(
          d,
          filter.type.showOnlyClasses,
          "Show only classes",
        );
      filter.addEmptyFilterByTags(b, d);
      return d;
    };
    f.prototype.isClassesAndGroups = function () {
      return !!this.selector && !!this.selector.classesAndGroups;
    };
    f.prototype.bind = function () {
      this.bindList(!0);
      this.bindList(!1);
    };
    f.prototype.bindList = function (b) {
      var d = this.getList(b),
        f = b ? this.source : this.selected;
      b && (this.filteredSource = []);
      for (
        var g = ui.getFragment(), l = -1, n = void 0, t, h = 0;
        h < f.length;
        h++
      ) {
        var u = f[h];
        (b && this.isClassesAndGroups() && this.skipGroup(u)) ||
          (++l,
          (t = l >= f.length - 1 ? void 0 : f[l + 1]),
          (t = this.getItem(b, u, l, n, t)),
          (n = u),
          g.appendChild(t),
          b && this.filteredSource.push(u));
      }
      ui.empty(d);
      ui.append(g, d);
      d = 0 === f.length;
      ui.toggleClass(b ? this.noSource : this.noSelection, "on", d);
      b ? this.selectAllButton.enable(!d) : this.removeAllButton.enable(!d);
    };
    f.prototype.skipGroup = function (b) {
      return e.isEntire(b) ||
        filter.isCurrent(b) ||
        !arr.has(this.selected, e.entireGroup(e.getClass(b)))
        ? !1
        : !0;
    };
    f.prototype.getItem = function (b, d, f, g, l) {
      var k = this,
        q = ui.getDiv("selectorItem");
      if (e.hasColor(this.desc.props) || this.isClassesAndGroups()) {
        var h =
          !this.isClassesAndGroups() ||
          filter.isCurrent(d) ||
          (!filter.isEntire(d) && b)
            ? d.color
            : e.getClass(d).color;
        if (h) {
          var u = ui.getDiv("entityColor");
          u.style.backgroundColor = new r.color(h).html();
          ui.append(u, q);
        }
      }
      0 !== f % 2 && ui.addClass(q, "odd");
      f = ui.getDiv("selectorName" + this.getSourceGroupClassNames(b, d, g, l));
      g =
        this.desc === e.period
          ? e.getPeriodComboName(d)
          : this.desc === e.group
            ? this.getGroupName(d, b, this.isClassesAndGroups())
            : d.name;
      ui.setHtml(f, g);
      ui.appends([f], q);
      ui.dat(q, "id", d.id);
      ui.on(q, "mouseover", function (b) {
        return k.onItemOver(b);
      });
      ui.on(q, "mouseout", function (b) {
        return k.onItemOut(b);
      });
      ui.click(q, function (d) {
        return k.onItemClick(d, b);
      });
      return q;
    };
    f.prototype.getNamedEntity = function (b) {
      return this.isClassesAndGroups() && filter.isEntire(b)
        ? e.getClass(b)
        : b;
    };
    f.prototype.getSourceGroupClassNames = function (b, d, f, g) {
      if (
        this.desc !== e.group ||
        !b ||
        filter.isEntire(d) ||
        filter.isCurrent(d)
      )
        return "";
      b = this.getGroupSetPos(f, d, g);
      d = b[1];
      f = b[2];
      g = ["groupSet"];
      d !== b[0]
        ? g.push(d === f ? "first" : "only")
        : g.push(d === f ? "middle" : "last");
      this.isClassesAndGroups() && g.push("classes");
      return " " + arr.join(g, " ");
    };
    f.prototype.getGroupSetPos = function (b, d, f) {
      return [
        b ? b.parent.position : -1,
        d.parent.position,
        f ? f.parent.position : -1,
      ];
    };
    f.prototype.getGroupName = function (b, d, f) {
      return filter.isCurrent(b)
        ? b.name
        : e.isEntire(b)
          ? e.getClass(b).name
          : (d ? b.name : f ? e.getClass(b).name : b.name) +
            (!d && f ? " (" + b.name + ")" : "");
    };
    f.prototype.onFilterChange = function () {
      this.source = this.getSourceEntities();
      this.bindList(!0);
      filter.remember(this.desc.type, this.filterCombo.getValue());
      this.resetKeyIndexes(!0, !1);
    };
    f.prototype.getSourceEntities = function () {
      for (
        var b = this.filterCombo.getValue(),
          d = filter.getTypeAndId(b)[1],
          f = this.hasFilter(this.desc),
          g = [],
          l = 0,
          n = this.sorted;
        l < n.length;
        l++
      ) {
        var t = n[l];
        arr.has(this.selected, t) ||
          (this.isClassesAndGroups() &&
            !e.isEntire(t) &&
            !filter.isCurrent(t) &&
            arr.has(this.selected, e.entireGroup(e.getClass(t)))) ||
          (f && !filter.isCurrent(t) && d
            ? filter.addEq(g, this.desc.type, t, b)
            : g.push(t));
      }
      return g;
    };
    f.prototype.onItemClick = function (b, d) {
      this.onElementClick(b, ui.target(b), d);
    };
    f.prototype.onElementClick = function (b, d, f) {
      var k,
        g = ui._dat(d, "id");
      g = e.byId(f ? this.source : this.selected, g);
      d = ui.getParentIndex(d);
      b = this.getChange(g, f, b);
      arr.removes(this.selected, b.removeFromSelection);
      (k = this.selected).push.apply(k, b.addToSelection);
      this.source = this.getSourceEntities();
      this.bind();
      this.setKeyIndex(f, d);
      this.onFocus(f, !0);
      f || this.resetKeyIndexes(!0, !1);
    };
    f.prototype.getChange = function (b, d, f) {
      var k = [b];
      if (this.isClassesAndGroups() && filter.isEntire(b)) {
        var g = e.getGroups(e.getClass(b), !1, !1);
        k.push.apply(k, g);
      }
      var n = d ? k.slice() : [];
      k = d ? [] : k.slice();
      if (this.isClassesAndGroups() && !filter.isCurrent(b)) {
        var t = e.getClass(b);
        if (filter.isEntire(b) && d)
          ((n = [b]),
            (k = this.selected.filter(function (b) {
              return !filter.isCurrent(b) && e.getClass(b) === t;
            })));
        else if (
          0 < n.length &&
          ((g = b.parent),
          !e.isEntire(g) &&
            !keys.ctrl(f) &&
            ((g = e.getGroupsForGroupSets([g])),
            arr.remove(g, b),
            arr.hasAll(this.selected, g)))
        )
          return (
            (n = e.entireGroup(t)),
            (b = e.byId(this.source, n.id)),
            this.getChange(b, d, f)
          );
      }
      return { addToSelection: n, removeFromSelection: k };
    };
    f.prototype.onResize = function () {
      var b = ui.getComputedWidth(this.selectTitleCell),
        d =
          this.win.getContentWidth() -
          ui.getPaddingBorderMarginWidth(this.selectorTable);
      b = (d - b) / 2;
      var f = ui.getPaddingBorderMarginHeight(this.selectorTable);
      f = this.win.getContentHeight() - f - 6;
      var g = ui.getBoxHeight(this.selectorTitleRow),
        l = ui.getBoxHeight(this.submitRow);
      g = f - g - l;
      ui.setWidthHeight(this.selectorTable, d, f);
      ui.setWidth(this.sourceTitleCell, b);
      ui.setWidth(this.selectionTitleCell, b);
      ui.setHeight(this.sourceEl, g);
      ui.setHeight(this.selectionEl, g);
      ui.setWidthHeight(
        this.noSource,
        ui.getComputedWidth(this.sourceEl),
        ui.getComputedHeight(this.sourceEl),
      );
      ui.setWidthHeight(
        this.noSelection,
        ui.getComputedWidth(this.selectionEl),
        ui.getComputedHeight(this.selectionEl),
      );
    };
    f.prototype.onSelectAll = function () {
      var b;
      if (this.isClassesAndGroups()) {
        var d = this.source.filter(function (b) {
          return e.isEntire(b) || filter.isCurrent(b);
        });
        var f = d
          .filter(function (b) {
            return filter.isEntire(b);
          })
          .map(function (b) {
            return e.getClass(b);
          });
        this.selected = this.selected.filter(function (b) {
          return filter.isCurrent(b) || !arr.has(f, e.getClass(b));
        });
        (b = this.selected).push.apply(b, d);
      } else (d = this.selected).push.apply(d, this.source);
      this.source = [];
      this.bind();
    };
    f.prototype.onRemoveAll = function () {
      this.selected = [];
      this.source = this.getSourceEntities();
      this.bind();
    };
    f.prototype.onKeyDown = function (b) {
      var d = this;
      if (keys.ctrl(b)) {
        var f = keys.keyCode(b);
        if (65 === f) {
          this.onSelectAll();
          ui.preventDefault(b);
          return;
        }
        if (88 === f) {
          this.onRemoveAll();
          return;
        }
      }
      keys.tab(b) &&
        ((this.isTabPressed = !0),
        c.timeout(function () {
          return (d.isTabPressed = !1);
        }, 500));
      h.prototype.onKeyDown.call(this, b);
    };
    f.prototype.onListKeyDown = function (b, d) {
      var f = this,
        g = this.getList(d),
        l = d ? this.sourceKeyIndex : this.selectionKeyIndex,
        n = keys.keyCode(b);
      if (keys.space(b) && !this.isTyping)
        return (
          (g = ui.children(g)),
          g.length >= l + 1 &&
            (this.onElementClick(b, g[l], d),
            this.onFocus(d, !0),
            ui.stopDefaultPropagation(b)),
          !1
        );
      var t = keys.ctrl(b) || keys.alt(b);
      l = keys.indexOf(b, [40, 38, 35, 36]);
      if (t || -1 === l) {
        if (34 === n) return (this.onPageUpDown(d, b, !1), !1);
        if (33 === n) return (this.onPageUpDown(d, b, !0), !1);
        if (c.canKeySelect(b, n))
          return (
            ui.stopDefaultPropagation(b),
            (this.typing += keys.fromKeyCode(n).toLowerCase()),
            this.isTyping
              ? clearTimeout(this.typeTimeout)
              : (this.isTyping = !0),
            (this.typeTimeout = c.timeout(function () {
              return f.clearTyping();
            }, 500)),
            this.selectByTyping(d),
            !1
          );
        if (!d && t && ((b = keys.indexOf(b, [40, 38])), -1 !== b))
          return (this.reorder(1 === b), !1);
      } else
        return (
          (g = ui.children(g)),
          (n = g.length),
          (t = [1, -1, n, -n]),
          0 < n && this.selectUpDown(b, t[l], g, d),
          ui.stopDefaultPropagation(b),
          !1
        );
      return !0;
    };
    f.prototype.reorder = function (b) {
      var d = this.selected.length,
        f = this.selectionKeyIndex;
      if (!(2 > d || (b && 0 === f) || (!b && f === d - 1))) {
        var g = this.selected[f];
        d = f + (b ? -1 : 1);
        this.selected[f] = this.selected[d];
        this.selected[d] = g;
        g = ui.children(this.selectionEl);
        this.swapElements(g[f + (b ? 0 : 1)]);
        this.selectionKeyIndex = d;
        this.onFocus(!1, !0);
        this.scrollToEl(!1, g[this.selectionKeyIndex]);
      }
    };
    f.prototype.swapElements = function (b) {
      var d = this.findPreviousSibling(b);
      d && b.parentNode.insertBefore(b, d);
    };
    f.prototype.findPreviousSibling = function (b) {
      do b = b.previousSibling;
      while (b && 1 != b.nodeType);
      return b;
    };
    f.prototype.selectByTyping = function (b) {
      var d = this.findTypingElement(b);
      if (!d && 1 < this.typing.length) {
        var f = this.typing[0];
        this.typing.split("").every(function (b) {
          return b === f;
        }) && ((this.typing = f), (d = this.findTypingElement(b)));
      }
      d && this.setKeySelect(b, d, !0);
    };
    f.prototype.findTypingElement = function (b) {
      var d = b ? this.filteredSource : this.selected;
      if (0 !== d.length) {
        var f = [],
          g = this.getList(b);
        g = ui.children(g);
        for (var l = -1, n = 0; n < d.length; n++) {
          var t = d[n];
          ++l;
          t = this.getNamedEntity(t);
          str.startsWith(t.name.toLowerCase(), this.typing) && f.push(g[l]);
        }
        d = f.length;
        if (
          0 !== d &&
          (b = g[b ? this.sourceKeyIndex : this.selectionKeyIndex])
        )
          return (
            (b = f.indexOf(b)),
            -1 === b || b === d - 1 || 1 < this.typing.length ? f[0] : f[b + 1]
          );
      }
    };
    f.prototype.clearTyping = function () {
      this.isTyping = !1;
      this.typing = "";
    };
    f.prototype.selectUpDown = function (b, d, f, g) {
      var k = this.getList(g),
        q = g ? this.sourceKeyIndex : this.selectionKeyIndex,
        t = Math.min(f.length - 1, Math.max(0, q + d));
      f = f[t];
      t = t === q;
      if (!t) {
        this.setKeySelect(g, f);
        q = 0 > d;
        t = ui.getPos(f).y - ui.getPos(k).y + (t || q ? 0 : f.clientHeight);
        var h = ui.getComputedHeight(k);
        if ((!q && t >= h) || (q && 0 > t))
          1 === Math.abs(d)
            ? this.scrollOneRow(k, f, q, g)
            : this.scrollToEl(g, f, !0, 8 > Math.abs(d));
      }
      ui.preventDefault(b);
    };
    f.prototype.setKeyIndex = function (b, d) {
      b ? (this.sourceKeyIndex = d) : (this.selectionKeyIndex = d);
    };
    f.prototype.onPageUpDown = function (b, d, f) {
      var k = this.getList(b),
        g = ui.children(k);
      ui.stopDefaultPropagation(d);
      if (0 !== g.length) {
        var n = g[0].clientHeight;
        k = Math.floor(ui.getComputedHeight(k) / n);
        0 === k && k++;
        this.selectUpDown(d, (f ? -1 : 1) * k, g, b);
      }
    };
    f.prototype.setKeySelect = function (b, d, f) {
      void 0 === f && (f = !1);
      var k = this.getList(b),
        g = -1,
        n = 0;
      for (k = ui.children(k); n < k.length; n++) {
        var t = k[n];
        ++g;
        var h = t === d;
        ui.toggleClass(t, "select", h);
        h && this.setKeyIndex(b, g);
      }
      d && f && this.scrollToEl(b, d, !1, !1);
    };
    f.prototype.scrollOneRow = function (b, d, f, g) {
      this.scrollTo(g, b.scrollTop + (d.clientHeight + 0.5) * (f ? -1 : 1), !1);
    };
    f.prototype.scrollToEl = function (b, d, f, g) {
      void 0 === f && (f = !1);
      void 0 === g && (g = !0);
      var k = this.getList(b),
        q = d.offsetTop - k.offsetTop;
      d = f ? 0 : ui.getComputedHeight(k) / 2 - Math.floor(d.clientHeight / 2);
      this.scrollTo(b, q - d, g);
    };
    f.prototype.scrollTo = function (b, d, f) {
      void 0 === f && (f = !0);
      b ? this.sourceScroll.to(d, f) : this.selectionScroll.to(d, f);
    };
    f.prototype.scrollToTop = function (b) {
      this.scrollTo(b, 0, !1);
    };
    f.prototype.onBlur = function (b) {
      this.setKeySelect(b, void 0);
    };
    f.prototype.onFocus = function (b, d) {
      void 0 === d && (d = !1);
      if (d || this.isTabPressed) {
        d = b ? this.sourceKeyIndex : this.selectionKeyIndex;
        var f = ui.children(this.getList(b));
        0 !== f.length &&
          (d >= f.length && (d = f.length - 1), this.setKeySelect(b, f[d], !0));
      }
    };
    f.prototype.getList = function (b) {
      return b ? this.sourceEl : this.selectionEl;
    };
    f.prototype.resetKeyIndexes = function (b, d) {
      void 0 === b && (b = !0);
      void 0 === d && (d = !0);
      b && (this.sourceKeyIndex = 0);
      d && (this.selectionKeyIndex = 0);
    };
    f.prototype.onItemOver = function (b) {
      ui.addClass(ui.target(b), "over");
    };
    f.prototype.onItemOut = function (b) {
      ui.deleteClass(ui.target(b), "over");
    };
    f.prototype.ok = function () {
      this.done.fire(this.selected.slice());
      this.win.close();
    };
    f.prototype.onDone = function (b) {
      this.done.empty();
      this.done.add(b);
    };
    return f;
  })(g.windowView);
  g.selectorView = p;
})(m || (m = {}));
(function (g) {
  var p;
  (function (f) {
    f[(f.ok = 0)] = "ok";
    f[(f.add = 1)] = "add";
    f[(f.edit = 2)] = "edit";
  })((p = g.subType || (g.subType = {})));
  var h = (function () {
    function f(b, d) {
      this.mA = b;
      this.el = d;
      this.go();
    }
    f.prototype.go = function () {
      var b = this;
      this.okClick = c.callback();
      this.okBtn = c.button.svg({
        el: ui.getDiv(),
        text: "",
        svgClass: "addSvg icon",
        useId: "addD",
        logger: this.mA.vA.log,
      });
      this.okBtn.setTabIndex(0);
      ui.prepend(this.okBtn.el, this.el);
      this.setOkBtn(p.add);
      this.okBtn.click.add(function (d) {
        return b.onOkClick(d);
      });
    };
    f.prototype.setType = function (b) {
      this.setOkBtn(b);
    };
    f.prototype.setAddOrEdit = function (b) {
      this.setType(b ? p.add : p.edit);
    };
    f.prototype.setOkBtn = function (b) {
      this.okBtn.setText(
        b === g.subType.add ? "Add" : b === g.subType.edit ? "Edit" : "Ok",
      );
      this.okBtn.changeClass(
        b === g.subType.add
          ? "addButton"
          : b === g.subType.edit
            ? "editButton"
            : "okButton",
      );
      this.okBtn.changeUseId(
        b === g.subType.add ? "addD" : b === g.subType.edit ? "editD" : "okD",
      );
      this.okBtn.changeIconClass(
        b === g.subType.add
          ? "addSvg icon"
          : b === g.subType.edit
            ? "editSvg icon"
            : "okSvg icon",
      );
    };
    f.prototype.onOkClick = function (b) {
      this.okClick.fire(b);
    };
    return f;
  })();
  g.submitToolbar = h;
})(m || (m = {}));
(function (g) {
  function p(b) {
    var d = b.grid,
      f = new c.gridColumn(d, "", "color");
    f.setCellFunc = function (b, d) {
      var f = ui.getDiv("entityColor");
      f.style.backgroundColor = new r.color(d.color).html();
      ui.setWidth(b.el, 16);
      ui.append(f, b.el);
    };
    f.sortFunc = function (b, d) {
      return b.slice().sort(function (b, f) {
        return (d ? -1 : 1) * (h(b.color) - h(f.color));
      });
    };
    var k = new c.gridColumn(d, "Name", "name");
    b.desc.type === e.type.subject &&
      (k.setCellFunc = function (b, d) {
        ui.setHtml(b.el, g.wrapCell(d, d.name));
      });
    var l = new c.gridColumn(d, "Short", "shortName"),
      q = new c.gridColumn(d, "Marks", "");
    q.setHeaderFunc = function (b) {
      ui.addClass(b.el, "center");
    };
    q.sortFunc = function (b, d) {
      return b.slice().sort(function (b, f) {
        return (d ? 1 : -1) * b.marks.length - f.marks.length;
      });
    };
    q.setCellFunc = function (d, f) {
      ui.addClass(d.el, "noSelect");
      g.setMarks(b, d);
    };
    d.showNoItems = !0;
    d.canPaste = !b.mA.allow.isDisabled();
    d = b.mA._t();
    d = 21 > e.daysCount(d) && 61 > e.periodsCount(d);
    f = [f, k, l];
    d && f.push(q);
    return f;
  }
  function h(b) {
    b = new r.color(b, !0);
    return (b.r + b.g + b.b) / 3;
  }
  function f(b) {
    var d = b.desc,
      f = b.getEntities,
      k = b.ctx,
      g = b.mA;
    f = (b = void 0 !== f) ? f.call(k) : obj.getParentArray(d, g._t());
    return b ? f : e.hasPos(d.props) ? e.sortNotDel(f) : obj.notDel(f);
  }
  function b(b) {
    return b.isGridVisible
      ? b.isGridVisible.call(b.ctx)
      : b.ctx.isOpen.call(b.ctx);
  }
  function d(b, d, f) {
    void 0 === f && (f = !1);
    return e.byId(b, d) || (f ? arr.last(b) : arr.first(b));
  }
  function k(d) {
    if (
      0 === d.grid.data.length &&
      b(d) &&
      (d.grid.setPanelSizes(), d.getNoItemsMessage)
    ) {
      var f = d.getNoItemsMessage();
      f && d.mA.vA.inf.addTip(f);
    }
  }
  function q(b) {
    return b.mA.getCurrent(b.desc);
  }
  g.setManageForm = function (d) {
    var f = (d.grid = new c.grid(
        obj.merge(
          { logger: d.mA.log, fixedHeight: !0, handleKeys: !1 },
          d.gridOptions,
        ),
      )),
      k = d.desc,
      q = k.type,
      l = d.ctx;
    d.getColumns &&
      ((l = d.getColumns.call(l, d, f)),
      e.isViewEntityType(q) && (l = p(d).concat(l)),
      (f.dataColumns = l));
    d.typing
      ? (f.typingFunc = d.typing)
      : e.hasName(k.props) &&
        (f.typingFunc = function (b, d) {
          return str.startsWith(b.name.toLowerCase(), d);
        });
    f = d.gridBar = new g.gridToolbar(d.mA, d.el, f, k);
    f.addClick.add(function (b) {
      return g.onAdd(b, d);
    });
    f.editClick.add(function (b, f) {
      return g.onEdit(d, b, f);
    });
    f.deleteClick.add(function (b, f, k) {
      a: {
        var q = d.mA,
          l = d.desc,
          n = d.grid,
          h = d.beforeDelete;
        if (!n || n.hasSelection()) {
          if (h) {
            b = h.call(d.ctx, b, d, f, k);
            if (!b.continue) {
              var t = void 0;
              break a;
            }
            b.items && ((t = f.length), (f = b.items));
          }
          g.deleteEntities(l, f, {
            mA: q,
            deletedCount: t,
            needConfirm: l !== e.view,
          });
        }
        t = void 0;
      }
      return t;
    });
    f.copyClick.add(function (b, f) {
      return g.onCopy(b, d);
    });
    if (e.isViewEntityType(q) || e.isDayOrPeriodType(q) || q === e.type.student)
      f.paste = function (b) {
        return g.onImport(d, b);
      };
    g.descChange.add(function (f) {
      var k = f.changeType,
        q = f.isHistory;
      f = f.desc.type;
      var l = d.desc.type,
        n = f === e.type.group && l === e.type.groupSet;
      (f === l ||
        (e.isViewEntityType(l) && f === e.type.viewEntity) ||
        (f === e.type.class && l === e.type.activity) ||
        n) &&
        (n || (k !== g.updateType.reorder && k !== g.updateType.sort) || q) &&
        d.grid &&
        ((k === g.updateType.sort && !q) ||
          l === e.type.activity ||
          d.grid.resetSort(),
        (d.grid.isDirty = !0),
        b(d) && g.bindGrid(d, { focus: !q }));
    });
  };
  g.wrapCell = function (b, d) {
    if (e.isExcludedFromGenerator(b) || e.isExcludedFromStats(b)) {
      var f = [],
        k = "";
      e.isExcludedFromGenerator(b) &&
        (f.push("ignored"), (k = "Excluded from the generator/notifications"));
      e.isExcludedFromStats(b) &&
        (f.push("ignoredStats"),
        (k += k ? " and statistics" : "Excluded from statistics"));
      return '<span title="'
        .concat(k, '" class="')
        .concat(arr.join(f, " "), '">')
        .concat(d, "</span>");
    }
    return d;
  };
  g.getViewEntityColumns = p;
  g.getTagsColumn = function (b) {
    b = new c.gridColumn(b, "Tags", "tags");
    b.sortFunc = function (b, d) {
      return b.slice().sort(function (b, f) {
        return (
          (d ? 1 : -1) * arr.sort(b.tags, f.tags) || arr.sort(b.name, f.name)
        );
      });
    };
    return b;
  };
  g.setArbCellF = function (b, d) {
    b.el.style.textAlign = "center";
    ui.setText(b.el, -1 === d ? e.minus : d + "");
  };
  g.bindGrid = function (l, n) {
    var h = l.desc,
      w = l.grid,
      u = l.getSelectedId,
      x = l.ctx,
      y = l.selectLast,
      z = l.beforeBind,
      A = l.afterBind;
    n = obj.merge({ fireBefore: !0, fireAfter: !0, focus: !0 }, n);
    var B = [],
      p = !1;
    u = u ? ((p = !0), (B = f(l)), u.call(x, B)) : (u = q(l)) && u.id;
    var I = l.grid,
      F = I.isDirty;
    if (!F && u) {
      var C = e.byId(I.selectedItems, u);
      C || ((C = e.byId(I.data, u)) && l.grid.setSelectedItems([C]));
    }
    if (!F) return (b(l) && (w.focusAndScroll(n.focus), k(l)), !1);
    n.fireBefore && z && z.call(x);
    e.hasMarks(h.props) && g.prepMarks(l);
    p || (B = f(l));
    w.bind(B, d(B, u, y));
    w.focusAndScroll(n.focus);
    k(l);
    n.fireAfter && A && A.call(x);
    return !0;
  };
  g.getSelectedItem = d;
  g.getCurrent = q;
  g.setCurrent = function (b, d) {
    b.mA.setCurrent(b.desc, d);
  };
  g.isNewEntity = function (b) {
    return !!b.isAdd || !!b.isCopy;
  };
  g.setPasteMode = function (b, d) {
    if (b)
      if (d) b.grid.onCtrlV();
      else b.grid.onPasteCancel(void 0);
  };
})(m || (m = {}));
(function (g) {
  function p(f, b, d) {
    b.mA.setCurrent(b.desc, d);
    g.isNewEntity(b) &&
      b.grid &&
      e.hasPos(b.desc.props) &&
      ((d = b.grid.lastSelected()),
      (g.getCurrent(b).position = h(d ? obj.getArray(b.desc, d) : [], d)));
    if (!b.beforeEditForm || b.beforeEditForm.call(b.ctx, f))
      if ((f = b.editWindow))
        ((f.options && f.options.grid) || (f.options = b), f.open());
  }
  function h(f, b) {
    if (b) return b.position + 1;
    f = obj.notDel(f);
    return 0 === f.length ? 1 : e.maxPos(f) + 1;
  }
  g.onAdd = function (f, b) {
    b.isAdd = !0;
    b.isCopy = !1;
    (b.beforeAddForm && !b.beforeAddForm.call(b.ctx)) ||
      p(
        f,
        b,
        b.getNew ? b.getNew.call(b.ctx) : obj.newChildToUse(b.desc, b.mA._t()),
      );
  };
  g.onEdit = function (f, b, d) {
    if (!f.grid || f.grid.hasSelection())
      ((f.isAdd = f.isCopy = !1), p(b, f, d));
  };
  g.onCopy = function (f, b) {
    if (
      b.grid &&
      b.grid.hasSelection() &&
      ((b.isCopy = !0),
      (b.isAdd = !1),
      !b.beforeCopyForm || b.beforeCopyForm.call(b.ctx))
    ) {
      var d = b.grid.lastSelected();
      p(f, b, obj.newChildCloneToUse(d, b.desc, d.parent));
    }
  };
  g.showEditForm = p;
  g.getNewPos = h;
  g.submit = function (f, b, d) {
    var k = f.options,
      q = g.isNewEntity(k),
      l = k.mA,
      n = k.desc;
    k = g.getCurrent(k);
    var h = q ? obj.keysToProps(n, obj.keys(b)) : e.getChangedProps(n, k, b),
      w = q || 0 !== h.length;
    d = obj.merge({ mA: l }, d);
    w &&
      ((d = q
        ? g.newAddState(n, [k], d)
        : g.newUpdateState(n, [k], { mA: l, changedProps: h })),
      obj.copyValuesTo(b, k, n, {
        deep: !1,
        propFunc: function (b) {
          return h;
        },
      }),
      (d.name = (q ? "Add" : "Update") + " " + g.getStateName(n, k ? [k] : [])),
      g.addState(d, { mA: l }));
    f.xOnOk();
  };
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function h(f, b) {
      var d = this;
      this.isNewName = !1;
      this.name = f;
      this.short = b;
      this.name.change.add(function (b) {
        return d.onChg(b);
      });
      this.upd();
    }
    h.prototype.onChg = function (f) {
      var b = this.name.getValue(),
        d = this.short,
        k = d.getValue();
      if (
        "keyup" === f.type &&
        ((f = keys.keyCode(f)), 46 > f && 8 !== f && 32 !== f)
      )
        return;
      this.isNewName && !k && 0 < b.length
        ? d.setValue(b.charAt(0))
        : 1 === k.length &&
          1 < b.length &&
          ((k = b.charAt(b.length - 1)),
          " " !== k &&
            ((isNaN(num.toNum(k)) &&
              k !== k.toUpperCase() &&
              " " !== b.charAt(b.length - 2)) ||
              d.setValue(d.getValue() + k)));
      0 === b.length && d.setValue("");
      this.upd();
    };
    h.prototype.set = function (f, b) {
      g.setText(this.name, f);
      g.setText(this.short, b);
      this.upd();
    };
    h.prototype.upd = function () {
      this.isNewName = !this.name.getValue();
    };
    return h;
  })();
  g.shortUpd = p;
})(m || (m = {}));
(function (g) {
  g.prepMarks = function (f) {
    f.periods = e.getSortedDefaultPeriods(f.mA._t());
    f.days = e.sortNotDel(f.mA._t().days);
    f.marksMesh = void 0;
  };
  g.setMarks = function (f, b) {
    ui.empty(b.el);
    var d = b.dataItem(),
      k = f.days.length,
      g = f.periods.length,
      l = g * (p + 1) + 1,
      n = k * (h + 1) + 1;
    if (f.marksMesh) var t = f.marksMesh.cloneNode(!0);
    else {
      t = ui.getDiv("marks");
      ui.setWidthHeight(t, l, n);
      for (var w = ui.getFragment(), u = 0; u < k + 1; u++) {
        var x = ui.getDiv("mHorLine");
        ui.setWidth(x, l);
        ui.setLeftTop(x, 0, u * (h + 1));
        w.appendChild(x);
      }
      for (u = 0; u < g + 1; u++)
        ((k = ui.getDiv("mVerLine")),
          ui.setHeight(k, n),
          ui.setLeftTop(k, u * (p + 1), 0),
          w.appendChild(k));
      ui.append(w, t);
      void 0 === f.marksMesh && (f.marksMesh = t.cloneNode(!0));
    }
    ui.append(t, b.el);
    c.timeout(function () {
      var b = t,
        f = d.marks;
      if (0 !== f.length) {
        for (var k = ui.getFragment(), g = 0; g < f.length; g++) {
          var q = f[g],
            l = ui.getDiv("mCell"),
            n = q[2];
          n === e.markTy.f
            ? ui.addClass(l, "forbidden")
            : n === e.markTy.u
              ? ui.addClass(l, "unwanted")
              : n === e.markTy.m && ui.addClass(l, "mandatory");
          ui.setLeftTop(l, (q[1] - 1) * (p + 1) + 1, (q[0] - 1) * (h + 1) + 1);
          k.appendChild(l);
        }
        ui.append(k, b);
      }
    }, 100);
  };
  var p = 3,
    h = 2;
})(m || (m = {}));
(function (g) {
  function p(g, f) {
    g && ui.stopDefaultPropagation(g);
  }
  g.onKeyPress = function (h, f) {
    if (
      !(f.vA.isWeb() || f.printView().onKey(h) || f._v.handleSwitchViewKeys(h))
    ) {
      var b = ui.getChar(h),
        d = keys.keyCode(h);
      if (keys.ctrl(h) || keys.ctrlShift(h)) {
        if ("s" === b) {
          p(h, "ctrl+s");
          f.memory.saveIc.onClick(h);
          return;
        }
        if ("o" === b) {
          p(h, "ctrl+o");
          if (keys.ctrlAltShift(h))
            f.isOffW || f.docsView().openMode(g.openMode.examples);
          else if (keys.alt(h)) f.isOffW || f.optionsView().open();
          else if (keys.shift(h)) {
            if (!f.isOffW) f.menu().onOpenFile();
          } else f.isOffW || f.docsView().openMode(g.openMode.open);
          return;
        }
      }
      keys.ctrlShift(h) && "v" === b && f.views().open();
      if (keys.ctrl(h)) {
        if ("d" === b) {
          if (keys.alt(h)) {
            if ((p(h, "ctrl+alt+d"), !f.isOffW)) f.menu().onDays();
          } else (p(h, "ctrl+d"), f.isOffW || f.dataView().open());
          return;
        }
        if ("z" === b) {
          p(h, "ctrl+z");
          f.memory.undo();
          return;
        }
        if ("p" === b) {
          if (keys.shift(h))
            if (keys.alt(h)) {
              if ((p(h, "ctrl+shift+alt+p"), !f.isOffW)) f.menu().onPublish();
            } else {
              if ((p(h, "ctrl+shift+p"), !f.isOffW))
                f.menu().onPrintIndividuals();
            }
          else if (keys.alt(h)) {
            if ((p(h, "ctrl+alt+p"), !f.isOffW)) f.menu().onPeriods();
          } else if ((p(h, "ctrl+p"), !f.isOffW)) f.menu().onPrintView();
          return;
        }
        if ("y" === b) {
          p(h, "ctrl+y");
          f.memory.redo();
          return;
        }
        if (" " === b) {
          if ((p(h, "ctrl+space"), !f.isOffW)) f.play.onPlay(h);
        } else if (77 === d)
          if ((p(h, "ctrl+m"), keys.alt(h))) f.menu().onMerge();
          else f.tools.togMark();
        else if (190 === d) (p(h, "ctrl+."), f.tools.pinClk(h));
        else if (46 === d || 8 === d) {
          p(h, "ctrl+del");
          var k = f._v.g.vcs;
          0 < v.ins(k).length
            ? f.contextMenu().xVcs(k)
            : f.contextMenu().delVcs(k);
        } else if ("u" === b)
          if ((p(h, "ctrl+u"), keys.shift(h)))
            f.isOffW || f.sharesView().open();
          else {
            if (!f.isOffW) f.menu().onProfileClick();
          }
        else
          107 === d && (keys.shift(h) || keys.alt(h))
            ? (p(h, "ctrl++"), f.tools.zoom.onZoomKeyChg(h, keys.shift(h), !0))
            : 109 === d && (keys.shift(h) || keys.alt(h))
              ? (p(h, "ctrl+-"),
                f.tools.zoom.onZoomKeyChg(h, keys.shift(h), !1))
              : 48 === d &&
                ((k = keys.alt(h) ? h : void 0),
                p(k, "ctrl+0"),
                f.tools.zoom.onZX(k, !keys.alt(h)));
      }
      if (keys.esc(h))
        f.viewEvents.dropTool()
          ? ui.stopDefaultPropagation(h)
          : f._v.vIn.is1()
            ? (p(h, "Go to master"),
              f._v.viewType().toMaster(f._v.vIn.viewIndex()),
              f._v.changeView())
            : f.menu().isOpen
              ? (ui.stopDefaultPropagation(h), f.menu().hide())
              : f.memory.histV().isOpen()
                ? (ui.stopDefaultPropagation(h), f.memory.histV().x())
                : f.contextMenu().isO
                  ? (ui.stopDefaultPropagation(h), f.contextMenu().x())
                  : f.profile().isOpen
                    ? (ui.stopDefaultPropagation(h), f.profile().hide())
                    : f.tools.zoom.isOpen
                      ? (ui.stopDefaultPropagation(h), f.tools.zoom.show(!1))
                      : (f._v.g.resetSelection(),
                        f.tools.markPick.hide(),
                        f.play.closePanel());
      else {
        if (keys.ctrlAlt(h)) {
          k = arr.range(1, 9).map(function (b) {
            return b + "";
          });
          var q = k.indexOf(b);
          -1 !== q
            ? (p(h, "ctrl+alt+" + k[q]),
              (b = e.findSwitcherView(
                f._t(),
                q,
                f._v.isPublish()
                  ? e.viewVisibility.visibleOnWeb
                  : e.viewVisibility.visibleInApp,
              )) && f.viewEvents.extraViews.toggleView(b))
            : "n" === b
              ? (p(h, "ctrl+alt+n"), f.play.togglePanel(h))
              : "i" === b
                ? (p(h, "ctrl+alt+i"), f.onTitleClick())
                : "h" === b
                  ? keys.shift(h)
                    ? (p(h, "ctrl+shift+alt+h"),
                      g.purge({
                        mA: f,
                        updateType: g.updateType.purge,
                        removeDel: !0,
                        first: { hasChanges: g.hasHistoryChange() },
                      }))
                    : (p(h, "ctrl+alt+h"),
                      (b = f.memory.histV()),
                      b.isOpen() ? b.x() : b.open())
                  : "f" === b
                    ? (p(h, "ctrl+alt+f"), f.menu().onHelp(void 0, void 0, !0))
                    : "r" === b &&
                      e.isAS(f.vA.config) &&
                      g.gotoPage("admin?userId=" + f.user().id, f);
        }
        112 === d && (ui.stopDefaultPropagation(h), f.menu().onHelp());
      }
    }
  };
})(m || (m = {}));
(function (g) {
  g.getIdControl = function (g, f) {
    return new p(g, f);
  };
  var p = (function () {
    function g(f, b) {
      this.id = "";
      this.mA = f;
      this.options = b;
      this.init();
    }
    g.prototype.init = function () {
      var f = this,
        b = this.options,
        d = b.container,
        k = b.idLabel;
      b = ui.getDiv("formRow");
      var g = ui.getTag("label");
      ui.setText(g, k);
      this.idValue = ui.getDiv("rightLabel idLabel");
      k = ui.getTag("button");
      ui.addClass(k, "copyToButton copyIdButton");
      k.style.float = "none";
      ui.setAttribute(k, "role", "button");
      c.button
        .svg({
          el: k,
          svgClass: "icon",
          useId: "copyD",
          text: "Copy",
          logger: this.mA.log,
        })
        .click.add(function (b) {
          return f.onCopyClick();
        });
      ui.appends([g, this.idValue, k], b);
      ui.append(b, d);
    };
    g.prototype.setId = function (f) {
      ui.setText(this.idValue, f);
      this.id = f;
    };
    g.prototype.onCopyClick = function () {
      var f = c.copyToClipboard(this.id);
      this.mA.vA.inf.add(
        f ? "Id copied to clipboard" : "Copying id to clipboard failed",
      );
    };
    return g;
  })();
  g.idControl = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.minWidth = 320;
      d.minHeight = 280;
      d.width = 640;
      d.height = 400;
      d.resizable = !0;
      d.isModal = !1;
      this.title("Manage days");
      d.init();
      d.setHelp("#day");
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.find(".dayGridToolbar"),
          desc: e.day,
          getColumns: this.getColumns,
          selectLast: !0,
          beforeBind: this.beforeBind,
          beforeDelete: this.beforeDelete,
          editWindow: new g.dayView(this.mA, "dayView"),
        }),
      );
      this.options.grid.canPaste = !this.mA.allow.isDisabled();
      d.resize.add(function () {
        return b.onResize();
      });
      this.daysContainer = this.find(".daysNumber");
      this.daysCombo = new c.combo(ui.find(".daysCombo", this.daysContainer));
      this.daysCombo.change.add(function (d, f) {
        return b.onDaysChange(num.toInt(f));
      });
      this.bindCombo(124);
    };
    f.prototype.getColumns = function (b, d) {
      d = new c.gridColumn(b.grid, "Pos.", "position");
      d.setHeaderFunc = function (b) {
        ui.setWidth(b.el, 26);
      };
      d.setCellFunc = function (b, d) {
        ui.setText(b.el, d.position + ".");
        ui.setWidth(b.el, 26);
      };
      var f = new c.gridColumn(b.grid, "Name", "name");
      f.setHeaderFunc = f.setCellFunc = function (b, d) {
        return !0;
      };
      b = new c.gridColumn(b.grid, "Short name", "shortName");
      b.setHeaderFunc = b.setCellFunc = function (b, d) {
        return !0;
      };
      return [d, f, b];
    };
    f.prototype.open = function (b) {
      void 0 === b && (b = !1);
      this.init();
      h.prototype.open.call(this);
      g.bindGrid(this.options);
      g.setPasteMode(this.options, b);
    };
    f.prototype.beforeBind = function () {
      this.setDayNumber();
    };
    f.prototype.setDayNumber = function () {
      var b = e.daysCount(this._t());
      31 < b &&
        this.inf().addTip(
          "It's recommended to create separate 1-month schedules and merge them later. Otherwise, use horizontal zoom in the bottom right corner. " +
            ui.linkMessage("#day", "More about days"),
        );
      b > this.daysCombo.length()
        ? this.bindCombo(b, b)
        : this.daysCombo.setNumberValue(b);
      this.previousDayCount = b;
    };
    f.prototype.bindCombo = function (b, d) {
      for (var f = [], g = 1; g <= b; g++) {
        var l = g + "";
        f.push([l, l]);
      }
      this.daysCombo.bind(f, void 0 === d ? void 0 : d + "");
    };
    f.prototype.onDaysChange = function (b) {
      var d = obj.notDel(this._t().cards).filter(function (d) {
        return d.day && d.day.position > b;
      });
      g.confirmRemove(d, this.mA)
        ? ((d = e.daysCount(this._t())),
          b < d
            ? ((d = e.sortNotDel(this._t().days).filter(function (d) {
                return d.position - 1 >= b;
              })),
              g.deleteEntities(e.day, d, { mA: this.mA, needConfirm: !1 }))
            : b > d && g.addDays(this._t(), b - d, this.mA),
          (this.previousDayCount = b))
        : this.daysCombo.setValue(this.previousDayCount + "");
    };
    f.prototype.beforeDelete = function (b, d, f, q) {
      if (f.length === obj.notDel(this.mA._t().days).length)
        return (
          this.mA.confirm(
            this.mA.vA.loc.get(
              "DayRequiredAlert",
              "At least one day is required.",
            ),
          ),
          { continue: !1 }
        );
      var k = e.ids(f);
      b = this.mA._t().cards.filter(function (b) {
        return arr.has(k, b.dayId);
      });
      return { continue: g.confirmRemove(b, this.mA) };
    };
    f.prototype.onResize = function () {
      this.onSizeChanged(
        ui.getComputedWidth(this.win.content),
        ui.getComputedHeight(this.win.content),
      );
      h.prototype.onResize.call(this);
    };
    f.prototype.onSizeChanged = function (b, d) {
      d = d - this.filterHeight() - 20;
      this.options.grid.setViewPortHeight(d);
      ui.setWidthHeight(this.options.gridBar.el, b - 15, d);
      ui.setHeight(this.options.gridBar.barEl, d);
    };
    f.prototype.filterHeight = function () {
      return ui.getBoxHeight(this.daysContainer, !0);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["days"]);
    };
    return f;
  })(g.windowView);
  g.daysView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.init();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.win.minWidth = 520;
      this.win.resizable = !1;
      this.win.init();
      this.win.setHelp("#day");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      var b = this.day();
      this.title(
        this.isNew()
          ? this.loc().get("AddDayWindow", "Add day")
          : this.loc().get("EditDayWindow", "Edit day"),
      );
      h.prototype.open.call(this);
      this.shortUpd.set(b.name, b.shortName);
      this.bar.setAddOrEdit(this.isNew());
    };
    f.prototype.ok = function () {
      var b = {
        name: this.name.getValue(),
        shortName: this.shortName.getValue(),
      };
      g.submit(this, b);
    };
    f.prototype.day = function () {
      return this.current();
    };
    return f;
  })(g.windowView);
  g.dayView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.filter = new g.periodFilter();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.win.minWidth = 640;
      this.win.minHeight = 280;
      this.win.width = 780;
      this.win.height = 400;
      this.win.init();
      this.win.isModal = !1;
      this.win.setHelp("#period");
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.find(".periodGridToolbar"),
          desc: e.period,
          getColumns: this.getColumns,
          getEntities: this.getEntities,
          getSelectedId: this.getSelectedId,
          typing: this.typing,
          selectLast: !0,
          beforeBind: this.beforeBind,
          beforeDelete: this.beforeDelete,
          beforeEditForm: this.beforeEdit,
          editWindow: new g.periodView(this.mA, "periodView"),
        }),
      );
      this.options.grid.canPaste = !this.mA.allow.isDisabled();
      this.filterEl = this.find(".periodFilter");
      this.title("Manage periods");
      this.win.resize.add(function () {
        return b.onResize();
      });
      this.periodsContainer = this.find(".periodsPerDay");
      this.periodsCombo = new c.combo(
        ui.find(".periodsCombo", this.periodsContainer),
      );
      this.periodsCombo.change.add(function (d, f) {
        return b.onPeriodsChange(num.toInt(f));
      });
      this.bindCombo(144);
      this.customDaysCombo = new c.combo(this.find(".customDaysCombo"));
      this.customDaysCombo.change.add(function (d, f) {
        return b.onFiltersChange();
      });
      this.customEntityCombo = new c.combo(this.find(".customEntityCombo"));
      this.customEntityCombo.change.add(function (d) {
        return b.onFiltersChange();
      });
      this.toggleCustomCheck = new c.checkbox(this.find(".showCustomCheck"));
      this.toggleCustomCheck.change.add(function (d, f) {
        return b.onToggleCustomChange(f);
      });
    };
    f.prototype.typing = function (b, d) {
      var f = num.toNum(d);
      return isNaN(f)
        ? str.startsWith(b.name.toLowerCase(), d)
        : b.position === f;
    };
    f.prototype.getColumns = function (b, d) {
      var f = this;
      b = new c.gridColumn(d, "Pos.", "position");
      b.setHeaderFunc = function (b) {
        ui.setWidth(b.el, 26);
      };
      b.setCellFunc = function (b, d) {
        f.setColumnText(b, d.position + ".", d);
        ui.setWidth(b.el, 26);
      };
      var g = new c.gridColumn(d, "Start time", "startTime");
      g.setCellFunc = function (b, d) {
        f.setColumnText(b, date.time(d.startHour, d.startMinute), d);
      };
      g.sortFunc = function (b, d) {
        return b.slice().sort(function (b, f) {
          return (
            (d ? 1 : -1) *
            (e.startMin(b) - e.startMin(f) || e.endMin(b) - e.endMin(f))
          );
        });
      };
      var l = new c.gridColumn(d, "End time", "endTime");
      l.setCellFunc = function (b, d) {
        f.setColumnText(b, date.time(d.endHour, d.endMinute), d);
      };
      l.sortFunc = function (b, d) {
        return b.slice().sort(function (b, f) {
          return (
            (d ? 1 : -1) *
            (e.endMin(b) - e.endMin(f) || e.startMin(b) - e.startMin(f))
          );
        });
      };
      var n = new c.gridColumn(d, "Name", "name");
      n.setCellFunc = function (b, d) {
        f.setColumnText(b, d.name, d);
      };
      var h = new c.gridColumn(d, "Short name", "shortName");
      h.setCellFunc = function (b, d) {
        f.setColumnText(b, d.shortName, d);
      };
      d = new c.gridColumn(d, "Custom periods", "customText");
      d.setCellFunc = function (b, d) {
        f.setColumnText(b, d.customText, d);
      };
      return [b, g, l, n, h, d];
    };
    f.prototype.setColumnText = function (b, d, f) {
      e.isDefaultPeriod(f) && (d = "<b>" + d + "</b>");
      b.el.innerHTML = d;
    };
    f.prototype.setPeriodsPerDay = function () {
      var b = e.periodsCount(this._t());
      72 < b &&
        this.inf().addTip(
          "It's recommended to create separate schedules for morning and afternoon shifts and merge them later. Otherwise, use horizontal zoom in the bottom right corner. " +
            ui.linkMessage("#period", "More about periods"),
        );
      b > this.periodsCombo.length()
        ? this.bindCombo(b, b)
        : this.periodsCombo.setNumberValue(b);
      this.previousPeriodCount = b;
    };
    f.prototype.bindCombo = function (b, d) {
      for (var f = [], g = 1; g <= b; g++) {
        var l = g + "";
        f.push([l, l]);
      }
      this.periodsCombo.bind(f, void 0 === d ? void 0 : d + "");
    };
    f.prototype.open = function (b) {
      void 0 === b && (b = !1);
      this.init();
      g.bindGrid(this.options);
      h.prototype.open.call(this);
      this.options.grid.setFocus();
      g.setPasteMode(this.options, b);
    };
    f.prototype.beforeBind = function () {
      this.bindFilters();
      this.setPeriodsPerDay();
    };
    f.prototype.bindPeriods = function () {
      g.bindGrid(this.options, { fireBefore: !1 });
    };
    f.prototype.bindFilters = function () {
      var b = e.customPeriods(this._t().periods),
        d = arr.unique(
          b.map(function (b) {
            return b.dayId;
          }),
        ),
        f = 0 < b.length;
      ui.toggle(this.filterEl, f);
      if (f) {
        f = e.sortNotDel(this._t().days).filter(function (b) {
          return arr.has(d, b.id);
        });
        var g = this.filter.dayId;
        this.customDaysCombo.bind(
          filter.getOptions(e.day, f, { emptyPair: ["", "All days"] }),
          g,
        );
        b = this.getCustomEs(b);
        f = this.filter.eId;
        this.customEntityCombo.bind(
          filter.getOptions(e.viewEntity, b, {
            emptyPair: ["", "All resources"],
          }),
          f,
        );
        this.setFilters();
      }
    };
    f.prototype.getCustomEs = function (b) {
      var d = [],
        f,
        g = [],
        l = function (b) {
          if (
            d.some(function (d) {
              return d.id === b.entityId;
            })
          )
            return "continue";
          b.entityType !== f &&
            ((f = b.entityType), (g = e.getViewEntities(n._t(), f)));
          var k = g.find(function (d) {
            return d.id === b.entityId;
          });
          k && d.push(k);
        },
        n = this,
        h = 0;
      for (
        b = b.slice().sort(function (b, d) {
          return (
            arr.sort(b.entityType, d.entityType) ||
            arr.sort(b.startHour, d.startHour) ||
            arr.sort(b.startMinute, d.startMinute) ||
            arr.sort(b.endHour, d.endHour) ||
            arr.sort(b.endMinute, d.endMinute) ||
            arr.sort(b.name, d.name) ||
            arr.sort(b.shortName, d.shortName)
          );
        });
        h < b.length;
        h++
      )
        l(b[h]);
      return d;
    };
    f.prototype.onToggleCustomChange = function (b) {
      this.customDaysCombo.enable(b);
      this.customEntityCombo.enable(b);
      this.onFiltersChange();
    };
    f.prototype.setFilters = function () {
      this.filter.showCustom = this.toggleCustomCheck.isChecked();
      var b = this.customDaysCombo.getValue();
      b = filter.getTypeAndId(b)[1];
      this.filter.dayId = b ? b : void 0;
      b = this.customEntityCombo.getValue();
      b = filter.getTypeAndId(b)[1];
      this.filter.eId = b ? b : void 0;
    };
    f.prototype.onFiltersChange = function () {
      this.setFilters();
      this.options.grid.isDirty = !0;
      this.bindPeriods();
    };
    f.prototype.getSelectedId = function (b) {
      var d = this.current();
      return d
        ? e.isDefaultPeriod(d)
          ? d.id
          : this.findCustomId(d, b)
        : void 0;
    };
    f.prototype.findCustomId = function (b, d) {
      return (b = this.findCustom(b, d)) ? b.id : void 0;
    };
    f.prototype.findCustom = function (b, d) {
      return d.find(function (d) {
        return (
          e.isCustomPeriod(d) &&
          arr.has(
            d.groupedPeriods.map(function (b) {
              return b.id;
            }),
            b.id,
          )
        );
      });
    };
    f.prototype.getEntities = function () {
      return g.getPeriods(this.filter, this.mA);
    };
    f.prototype.beforeDelete = function (b, d, f, q) {
      var k = this.getDeleted(f);
      b = e.getDefaultPeriods(this._t());
      if (
        k.filter(function (b) {
          return e.isDefaultPeriod(b);
        }).length === b.length
      )
        return (
          this.mA.alert(
            this.loc().get(
              "PeriodRequiredAlert",
              "At least one period is required.",
            ),
          ),
          { continue: !1 }
        );
      b = obj.notDel(this._t().cards).filter(function (b) {
        return k.some(function (d) {
          return d.id === b.periodId;
        });
      });
      return { continue: g.confirmRemove(b, this.mA), items: k };
    };
    f.prototype.getDeleted = function (b) {
      for (
        var d = [],
          f = e.customPeriods(this._t().periods),
          g = function (b) {
            e.isCustomPeriod(b)
              ? d.push.apply(d, b.groupedPeriods)
              : (d.push(b),
                d.push.apply(
                  d,
                  f.filter(function (d) {
                    return d.position === b.position;
                  }),
                ));
          },
          l = 0;
        l < b.length;
        l++
      )
        g(b[l]);
      return arr.unique(d);
    };
    f.prototype.onPeriodsChange = function (b) {
      var d = obj.notDel(this._t().cards).filter(function (d) {
        return d.period && d.period.position > b;
      });
      if (g.confirmRemove(d, this.mA)) {
        d = e.periodsCount(this._t());
        if (b < d) {
          var f = obj.notDel(this._t().periods).filter(function (d) {
            return d.position > b;
          });
          g.deleteEntities(e.period, f, { mA: this.mA, needConfirm: !1 });
        } else b > d && g.addNewPeriods(this._t(), b - d, this.mA);
        this.previousPeriodCount = d;
      } else this.periodsCombo.setValue(this.previousPeriodCount + "");
    };
    f.prototype.beforeEdit = function () {
      if (this.options.isAdd) {
        var b = e.getSortedDefaultPeriods(this._t()),
          d = this.options.grid.lastSelected() || arr.last(b);
        g.setNextTimePos(d, this.current(), b);
      }
      return !0;
    };
    f.prototype.onResize = function () {
      this.onSizeChanged(
        ui.getComputedWidth(this.win.content),
        ui.getComputedHeight(this.win.content),
      );
      h.prototype.onResize.call(this);
    };
    f.prototype.onSizeChanged = function (b, d) {
      d = d - this.filterHeight() - 20;
      this.options.grid.setViewPortHeight(d);
      ui.setWidthHeight(this.options.gridBar.el, b - 15, d);
      ui.setHeight(this.options.gridBar.barEl, d);
    };
    f.prototype.filterHeight = function () {
      return ui.getBoxHeight(this.periodsContainer, !0);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["periods"]);
    };
    return f;
  })(g.windowView);
  g.periodsView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.selectedEntities = [];
      b.selectedDays = [];
      b.isCustomShownForNew = !1;
      b.init();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.win.minWidth = 720;
      this.win.width = 680;
      this.win.init();
      this.win.setHelp("#period");
      for (var d = [], f = 0; 24 > f; f++) {
        var q = date._0(f);
        d.push([f + "", q]);
      }
      q = [];
      for (f = 0; 60 > f; f++) {
        var l = date._0(f);
        q.push([f + "", l]);
      }
      this.startHourCombo = new c.combo(this.find(".startHourCombo"));
      this.startMinuteCombo = new c.combo(this.find(".startMinuteCombo"));
      this.endHourCombo = new c.combo(this.find(".endHourCombo"));
      this.endMinuteCombo = new c.combo(this.find(".endMinuteCombo"));
      this.startHourCombo.bind(d);
      this.startMinuteCombo.bind(q);
      this.endHourCombo.bind(d.slice());
      this.endMinuteCombo.bind(q.slice());
      this.startMinuteCombo._pageKeyStep = this.endMinuteCombo._pageKeyStep = 5;
      this.nameBox = new c.input(this.find(".name"));
      this.shortNameBox = new c.input(this.find(".short"));
      this.shortUpdater = new g.shortUpd(this.nameBox, this.shortNameBox);
      this.customPanel = this.find(".customPanel");
      this.more = this.getMore(this.find(".more"), this.customPanel, {
        moreText: "Custom period",
      });
      this.moreRegion = this.find(".moreRegion");
      this.more.expander.change.add(function (d) {
        return (b.isCustomShownForNew = d);
      });
      this.typeLabel = this.find(".typeLabel");
      this.typeCombo = new c.combo(this.find(".typeCombo"));
      this.typeCombo.bind([
        [num.defaultValue + "", "Default period"],
        [e.type.class + "", "Class custom period"],
        [e.type.teacher + "", "Teacher custom period"],
        [e.type.room + "", "Room custom period"],
        [e.type.subject + "", "Subject custom period"],
      ]);
      this.typeCombo.change.add(function (d, f) {
        return b.onTypeChange(f);
      });
      this.actionLabel = this.find(".actionLabel");
      d = [];
      d.push(
        [num.noValue + "", "Drag related cards to specified interval"],
        [
          num.defaultValue + "",
          "Show custom period instead of default in individual view",
        ],
      );
      this.actionCombo = new c.combo(this.find(".actionCombo"));
      this.actionCombo.bind(d);
      this.actionCombo.change.add(function (d, f) {
        return b.onActionChange(f);
      });
      this.entitiesLabel = this.find(".entitiesLabel");
      this.entitiesCombo = new c.combo(this.find(".entityCombo"));
      this.moreEntitiesButton = this.find(".moreEntityButton");
      this.entitiesSelector = g.getSelector({
        mA: this.mA,
        combo: this.entitiesCombo,
        moreButtonElement: this.moreEntitiesButton,
        useId: "classD",
        desc: e._class,
      });
      this.entitiesSelector.change.add(function (d) {
        return b.onEntitiesChange(d);
      });
      this.daysRow = this.find(".daysRow");
      this.daysLabel = this.find(".daysLabel");
      this.daysCombo = new c.combo(this.find(".daysCombo"));
      this.moreDaysButton = this.find(".moreDaysButton");
      this.daysSelector = g.getSelector({
        mA: this.mA,
        combo: this.daysCombo,
        moreButtonElement: this.moreDaysButton,
        useId: "daysD",
        desc: e.day,
      });
      this.daysSelector.change.add(function (d) {
        return b.onDaysChange(d);
      });
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
      this.startHourCombo.change.add(function (d, f) {
        return b.onStartHourChange(d, f);
      });
      this.endHourCombo.change.add(function (d, f) {
        return b.onEndHourChange(d, f);
      });
    };
    f.prototype.open = function () {
      this.setTitle();
      ui.toggle(this.moreRegion, this.isNew());
      ui.toggleClass(
        this.customPanel,
        "on",
        (this.isNew() && this.isCustomShownForNew) ||
          (!this.isNew() && e.isCustomPeriod(this.lastSelectedGridPeriod())),
      );
      this.setIntervals();
      var b = this.period(),
        d = b.entityType,
        f = b.showCustom;
      this.shortUpdater.set(b.name, b.shortName);
      this.typeCombo.setValue(d + "");
      this.bindCustom(d);
      b = (f ? num.defaultValue : num.noValue) + "";
      this.actionCombo.setValue(b);
      this.onActionChange(b);
      this.bar.setAddOrEdit(this.isNew());
      h.prototype.open.call(this);
    };
    f.prototype.setTitle = function (b) {
      void 0 === b && (b = e.isCustomPeriod(this.period()));
      var d = this.isNew() ? "Add period" : "Edit period";
      if (b) {
        var f = this.lastSelectedGridPeriod().position;
        b = e.getDefaultPeriods(this._t()).find(function (b) {
          return b.position === f;
        });
        d =
          (this.isNew() ? "Add custom period" : "Edit custom period") +
          " for period " +
          " ".concat(f, " (").concat(e.interval(b), ")");
      }
      this.title(d);
    };
    f.prototype.setIntervals = function () {
      var b = this.period(),
        d = b.startMinute,
        f = b.endHour,
        g = b.endMinute;
      this.startHourCombo.setValue(b.startHour + "");
      this.startMinuteCombo.setValue(d + "");
      this.endHourCombo.setValue(f + "");
      this.endMinuteCombo.setValue(g + "");
    };
    f.prototype.bindCustom = function (b) {
      void 0 === b && (b = this.typeCombo.getNumberValue());
      this.typeCombo.enable(this.isNew());
      var d = this.period().groupedPeriods,
        f = b !== num.defaultValue,
        q = f ? b : e.type.class;
      this.enableCustomPanel(f);
      f = ["", this.getAllText(q)];
      this.entitiesSelector.moreButton.changeUseId(g.getUseId(q));
      this.entitiesSelector.desc = e.getViewEntityDesc(b) || e._class;
      b = e.getViewEntities(this._t(), q);
      this.selectedEntities = e.getCustomEntities(this._t(), q, d);
      this.entitiesSelector.bind(b, f, this.selectedEntities);
      this.selectedDays = e.customDays(this._t(), d);
      this.daysSelector.bind(
        e.sortNotDel(this._t().days),
        ["", "All days"],
        this.selectedDays,
      );
    };
    f.prototype.getAllText = function (b) {
      var d = "All classes";
      b === e.type.teacher
        ? (d = "All teachers")
        : b === e.type.room
          ? (d = "All rooms")
          : b === e.type.subject && (d = "All subjects");
      return d;
    };
    f.prototype.enableCustomPanel = function (b) {
      this.daysSelector.moreButton.enable(b);
      this.entitiesSelector.moreButton.enable(b);
      ui.enables(
        [
          this.entitiesLabel,
          this.entitiesCombo.el,
          this.daysLabel,
          this.daysCombo.el,
          this.actionLabel,
          this.actionCombo.el,
        ],
        b,
      );
    };
    f.prototype.onStartHourChange = function (b, d) {
      3 > num.toInt(d) && this.show24Hour(!1);
    };
    f.prototype.onEndHourChange = function (b, d) {
      num.toInt(d) < this.startHourCombo.getNumberValue() &&
        this.show24Hour(!0);
    };
    f.prototype.show24Hour = function (b) {
      this.viewer().inf.add(
        (b ? this.invalidIntervalMessage() : "") +
          "Use 24-hour clock here, e.g. instead of 01:15 set 13:15, and then choose 'Owl > Help > Options > Period format > 12-hour clock'.",
      );
    };
    f.prototype.invalidIntervalMessage = function () {
      return "End time is less than start time. ";
    };
    f.prototype.checkTime = function () {
      var b = this.startHourCombo.getNumberValue(),
        d = this.startMinuteCombo.getNumberValue(),
        f = this.endHourCombo.getNumberValue(),
        g = this.endMinuteCombo.getNumberValue();
      return f < b || (f === b && g < d)
        ? this.viewer().confirm(
            this.invalidIntervalMessage() +
              "Are you sure you want to continue?",
          )
        : !0;
    };
    f.prototype.onTypeChange = function (b) {
      (b = num.toInt(b) !== num.defaultValue) &&
        this.inf().addTip(
          "Period interval or card size can vary for selected resources and days " +
            ui.linkMessage("#custom", "More about custom periods"),
        );
      b || this.actionCombo.setValue(num.noValue + "");
      this.bindCustom();
      this.setTitle(b);
    };
    f.prototype.onEntitiesChange = function (b) {
      this.selectedEntities = b;
    };
    f.prototype.onActionChange = function (b) {
      ui.toggle(this.daysRow, b === num.noValue + "");
    };
    f.prototype.onDaysChange = function (b) {
      this.selectedDays = b;
    };
    f.prototype.ok = function () {
      if (this.checkTime()) {
        var b = this.typeCombo.getNumberValue();
        b !== num.defaultValue
          ? this.updateCustomPeriods(b) && this.xOnOk()
          : ((b = {}),
            this.setNameInterval(b),
            (b.showCustom = !1),
            g.submit(this, b));
      }
    };
    f.prototype.updateCustomPeriods = function (b) {
      b = this.getCustomOptions(b);
      if (!this.isValid(b)) return !1;
      this.setCustomPeriods(b);
      this.setDeletedPeriodsAndCardsMovedToDefault(b);
      this.confirmMovingDefaultToCustom(b);
      this.addCustomState(b);
      this.addWarningMessages(b);
      return !0;
    };
    f.prototype.getCustomOptions = function (b) {
      var d = this.actionCombo.getNumberValue() === num.defaultValue,
        f = this.period().groupedPeriods,
        q = d
          ? f.filter(function (b) {
              return !b.showCustom;
            })
          : [],
        l = d && 0 < q.length,
        n =
          !d &&
          f.some(function (b) {
            return !!b.showCustom;
          });
      return {
        entityType: b,
        defaultPosition: this.lastSelectedGridPeriod().position,
        groupedPeriods: f,
        showCustom: d,
        previouslyDragPeriods: q,
        dragToShowCustom: l,
        showCustomToDrag: n,
        addedPeriods: [],
        deletedPeriods: [],
        updatedPeriodsAction: g.newUpdateAction(e.period, [], { mA: this.mA }),
        cardsMovedToDefaultAction: g.newUpdateAction(e.card, [], {
          mA: this.mA,
          changedProps: [e.cardPeriodId],
        }),
        cardsMovedToCustomPeriodId: [],
        cardsMovedToCustomAction: g.newUpdateAction(e.card, [], {
          mA: this.mA,
          changedProps: [e.cardPeriodId],
        }),
      };
    };
    f.prototype.isValid = function (b) {
      var d = obj.notDel(this._t().days),
        f =
          0 === this.selectedDays.length ||
          this.selectedDays.length === d.length ||
          b.showCustom;
      f && (this.selectedDays = d);
      d = e.getViewEntities(this._t(), b.entityType);
      var g =
        0 === this.selectedEntities.length ||
        this.selectedEntities.length === d.length;
      g && (this.selectedEntities = d);
      return g && f && !b.showCustom
        ? (this.mA.vA.inf.add(
            "Custom periods should only be applied to specific resources/days. Otherwise, update the default period, instead.",
          ),
          !1)
        : g && b.showCustom
          ? (this.mA.vA.inf.add(
              "Custom periods should only be applied to specific resources. Otherwise, update the default period, instead.",
            ),
            !1)
          : !0;
    };
    f.prototype.setCustomPeriods = function (b) {
      b.showCustom
        ? this.setShowCustomPeriods(b)
        : this.setDragCustomPeriods(b);
    };
    f.prototype.setDragCustomPeriods = function (b) {
      var d = this,
        f = b.entityType,
        q = b.groupedPeriods,
        l = b.defaultPosition,
        n = b.addedPeriods,
        h = b.updatedPeriodsAction,
        w = b.cardsMovedToCustomPeriodId,
        u = b.showCustomToDrag,
        x = this.isNew() || u,
        y = x
          ? this._t().cards.filter(function (b) {
              return (
                e.isIn(b) &&
                b.period.position === l &&
                e.isDefaultPeriod(b.period) &&
                d.selectedDays.some(function (d) {
                  return d.id === b.dayId;
                })
              );
            })
          : [];
      u = function (d) {
        for (
          var k = x
              ? y.filter(function (b) {
                  return b.dayId === d.id;
                })
              : [],
            l = function (l) {
              var t = q.find(function (b) {
                  return d.id === b.dayId && l.id === b.entityId;
                }),
                u = t || obj.newChildToUse(e.period, z._t());
              t ? g.addUndoCopies(h, [u]) : n.push(u);
              z.updatePeriod(u, l, d, b);
              if (x) {
                var y = !1;
                t = function (b) {
                  var d = e.getEntities(b, f);
                  (y = arr.has(d, l)) &&
                    !w.some(function (d) {
                      return d[0] === b;
                    }) &&
                    w.push([b, u.id]);
                };
                for (var A = 0; A < k.length; A++) t(k[A]);
              }
            },
            t = 0,
            u = z.selectedEntities;
          t < u.length;
          t++
        )
          l(u[t]);
      };
      for (var z = this, A = 0, B = this.selectedDays; A < B.length; A++)
        u(B[A]);
    };
    f.prototype.setShowCustomPeriods = function (b) {
      for (
        var d = b.groupedPeriods,
          f = b.addedPeriods,
          q = b.updatedPeriodsAction,
          l = b.dragToShowCustom,
          n = function (k) {
            var n = l
                ? []
                : d.filter(function (b) {
                    return k.id === b.entityId;
                  }),
              t = [];
            0 < n.length
              ? (g.addUndoCopies(q, n), (t = n.slice()))
              : ((n = obj.newChildToUse(e.period, h._t())),
                f.push(n),
                t.push(n));
            for (n = 0; n < t.length; n++) h.updatePeriod(t[n], k, void 0, b);
          },
          h = this,
          w = 0,
          u = this.selectedEntities;
        w < u.length;
        w++
      )
        n(u[w]);
    };
    f.prototype.updatePeriod = function (b, d, f, g) {
      b.position = g.defaultPosition;
      b.entityId = d.id;
      b.entityType = g.entityType;
      b.dayId = f ? f.id : void 0;
      b.showCustom = g.showCustom;
      this.setNameInterval(b);
    };
    f.prototype.setDeletedPeriodsAndCardsMovedToDefault = function (b) {
      var d = this,
        f = b.groupedPeriods,
        q = b.deletedPeriods,
        l = b.previouslyDragPeriods,
        n = b.cardsMovedToDefaultAction,
        h = b.dragToShowCustom;
      if (b.showCustomToDrag) q.push.apply(q, f);
      else if (!this.isNew()) {
        q.push.apply(
          q,
          h
            ? f
            : f.filter(function (b) {
                return !d.selectedEntities.some(function (d) {
                  return d.id === b.entityId;
                });
              }),
        );
        b = obj.notDel(this._t().cards).filter(function (b) {
          return (
            q.some(function (d) {
              return d.id === b.periodId;
            }) ||
            l.some(function (d) {
              return d.id === b.periodId;
            })
          );
        });
        var w = e.getDefaultPeriods(this._t());
        g.addUndoCopies(n, b);
        n = function (b) {
          var d = b.period.position,
            f = w.find(function (b) {
              return b.position === d;
            });
          b.periodId = f.id;
        };
        for (f = 0; f < b.length; f++) n(b[f]);
      }
    };
    f.prototype.confirmMovingDefaultToCustom = function (b) {
      var d = b.cardsMovedToCustomPeriodId;
      b = b.cardsMovedToCustomAction;
      if (
        0 < d.length &&
        this.mA.confirm(
          this.loc().get(
            "MoveCardsOnCustomPeriod",
            "Move related cards to the custom period?",
          ),
        )
      )
        for (
          g.addUndoCopies(
            b,
            d.map(function (b) {
              return b[0];
            }),
          ),
            b = 0;
          b < d.length;
          b++
        ) {
          var f = d[b];
          f[0].periodId = f[1];
        }
    };
    f.prototype.addCustomState = function (b) {
      var d = b.addedPeriods,
        f = b.deletedPeriods,
        q = b.updatedPeriodsAction,
        l = b.cardsMovedToDefaultAction;
      b = b.cardsMovedToCustomAction;
      var n = g.newState(
        (this.isNew() ? "Add" : "Update") + " custom period",
        this.isNew() ? "add" : "edit",
      );
      g.addActions(n, [
        q,
        l,
        g.newDeleteAction(e.period, f, { mA: this.mA, needConfirm: !1 }),
        g.newAddAction(e.period, d, { mA: this.mA }),
        b,
      ]);
      this.mA.setCurrent(e.period, 0 < d.length ? d[0] : q.entities[0]);
      g.addState(n, { mA: this.mA });
    };
    f.prototype.addWarningMessages = function (b) {
      var d = b.showCustom;
      b = b.cardsMovedToDefaultAction;
      var f = this.viewer().config.user.periodFormat;
      d ||
        (f !== e.tf.lN && f !== e.tf.n) ||
        this.inf().add(
          "In order to see custom period intervals inside cards, change period format to 12-hour or 24-hour clock: " +
            ui.linkMessage("#app-options", "Change options"),
        );
      0 < b.entities.length &&
        this.inf().add(
          "Cards placed on custom periods are moved to their related default period.",
        );
    };
    f.prototype.setNameInterval = function (b) {
      b.name = this.nameBox.getValue();
      b.shortName = this.shortNameBox.getValue();
      b.startHour = this.startHourCombo.getNumberValue();
      b.startMinute = this.startMinuteCombo.getNumberValue();
      b.endHour = this.endHourCombo.getNumberValue();
      b.endMinute = this.endMinuteCombo.getNumberValue();
    };
    f.prototype.period = function () {
      return this.current();
    };
    f.prototype.lastSelectedGridPeriod = function () {
      return this.options.grid.lastSelected();
    };
    return f;
  })(g.windowView);
  g.periodView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.tabI = 0;
      b.dataChg = !1;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function (b) {
      var d = this;
      void 0 === b && (b = !1);
      this.init = c.no;
      var f = this.mA;
      this.tabControl = ui.find(".tabs", f.vA.el);
      this.tabItems = ui.all("li", this.tabControl);
      this.contentsContainer = ui.find(".tabContents", f.vA.el);
      for (var q = [], l = 0, n = this.tabItems; l < n.length; l++)
        q.push(n[l].firstElementChild);
      this.tabLinks = q;
      l = this.tabContents = ui.children(this.contentsContainer);
      n = this.win;
      n.minWidth = 320;
      n.minHeight = 380;
      n.width = 780;
      n.height = 440;
      n.dragEls = [this.tabControl];
      n.isModal = !1;
      ui.addClass(this.win.el, "dataView");
      this.title("Manage data");
      this.icTxt(q[0], "subject", "Subjects");
      this.icTxt(q[1], "room", "Rooms");
      this.icTxt(q[2], "teacher", "Teachers");
      this.icTxt(q[3], "class", "Classes");
      this.icTxt(q[4], "lesson", "Activities");
      for (n = 0; n < q.length; n++) {
        var h = q[n];
        ui.dat(h, "i", n + "");
        ui.tap(h, function (b) {
          ui.stopPropagation(b);
        });
      }
      ui.clicks(this.tabLinks, function (b) {
        return d.onTabClick(b);
      });
      ui.ons(this.tabLinks, "keydown", function (b) {
        return d.onTabKey(b);
      });
      ui.ons(this.tabItems, "mouseover", function (b) {
        return d.onTabHeadOver(b);
      });
      ui.ons(this.tabItems, "mouseout", function (b) {
        return d.onTabHeadOut(b);
      });
      this.subjectsView = new g.subjectsV(f, l[0]);
      this.roomsView = new g.roomsView(f, l[1]);
      this.teachersView = new g.teachersView(f, l[2]);
      this.classesView = new g.classesView(f, l[3]);
      this.activitiesView = new g.activitiesV(f, l[4]);
      this.tabViews = [
        this.subjectsView,
        this.roomsView,
        this.teachersView,
        this.classesView,
        this.activitiesView,
      ];
      ui.call(this.initialized, this, void 0);
      b &&
        (this.subjectsView.init(),
        this.roomsView.init(),
        this.teachersView.init(),
        this.classesView.init(),
        this.activitiesView.init());
    };
    f.prototype.onTabKey = function (b) {
      keys.enter(b) && (ui.stopDefaultPropagation(b), this.onTabClick(b));
    };
    f.prototype.onKeyDown = function (b) {
      if (this.tabViews[this.tabI].onKeyDown(b) && !keys.ctrlOrAltOrShift(b)) {
        var d = keys.indexOf(b, [37, 39]);
        if (-1 !== d) {
          d = 0 === d;
          var f = this.tabI + (d ? -1 : 1);
          d && 0 > f ? (f = 4) : !d && 4 < f && (f = 0);
          ui.stopDefaultPropagation(b);
          this.onTabIChg(f);
        }
      }
    };
    f.prototype.icTxt = function (b, d, f) {
      svg.getIcon(b, void 0, d + "D");
      d = ui.getTag("span");
      ui.setText(d, f);
      b.appendChild(d);
    };
    f.prototype.onResize = function () {
      var b = this.win.content;
      if (b) {
        var d = ui.getComputedHeight(this.tabControl) + 20;
        b = ui.getComputedHeight(b) - d;
        ui.setHeight(this.contentsContainer, b);
        ui.deleteClass(this.tabControl, "small smaller");
        b = this.win.width;
        590 < b && 710 > b
          ? ui.addClass(this.tabControl, "small")
          : 590 > b && ui.addClass(this.tabControl, "smaller");
        this.tabViews[this.tabI].onResize();
      }
    };
    f.prototype.open = function () {
      this.openTab(this.tabI);
    };
    f.prototype.openTab = function (b, d) {
      void 0 === d && (d = !1);
      this.init();
      this.win.isOpen || h.prototype.open.call(this);
      this.onTabIChg(b, d);
    };
    f.prototype.onTabClick = function (b) {
      this.onTabIChg(num.toInt(ui._dat(ui.target(b), "i")));
      ui.stopDefaultPropagation(b);
    };
    f.prototype.onTabIChg = function (b, d) {
      void 0 === d && (d = !1);
      this.tabI = b;
      for (var f = 0; f < this.tabContents.length; f++)
        ui.toggleClasses(
          [this.tabItems[f], this.tabContents[f]],
          "current",
          f === b,
        );
      this.titHelp(b);
      f = this.tabViews[b];
      f.open();
      !this.allow().freeOrPurchasedCheck() &&
        d &&
        (this.mA.checkDemoLogin(), (d = !1));
      f.setPasteMode(d);
      this.onResize();
      this.log().w("tab " + b);
    };
    f.prototype.titHelp = function (b) {
      var d = "Manage data",
        f = "subject";
      0 === b
        ? (d = "Manage subjects")
        : 1 === b
          ? ((d = "Manage rooms"), (f = "room"))
          : 2 === b
            ? ((d = "Manage teachers"), (f = "teacher"))
            : 3 === b
              ? ((d = "Manage classes"), (f = "class"))
              : 4 === b && ((d = "Manage activities"), (f = "lesson"));
      this.win.title(d);
      this.win.setHelp("#" + f);
    };
    f.prototype.isTabOpen = function (b) {
      return this.isOpen() && this.tabViews.indexOf(b) === this.tabI;
    };
    f.prototype.onTabHeadOver = function (b) {
      ui.addClass(ui.target(b), "over");
    };
    f.prototype.onTabHeadOut = function (b) {
      ui.deleteClass(ui.target(b), "over");
    };
    return f;
  })(g.windowView);
  g.dataView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b) || this;
      b.el = d;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      this.init = c.no;
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.el,
          desc: e.subject,
          getColumns: this.getColumns,
          isGridVisible: this.isOpen,
          noItemsInfo:
            "In this tab you can add subjects/courses, e.g. Math, English, Biology...",
          editWindow: new g.subjectView(this.mA, "subjectView"),
        }),
      );
    };
    f.prototype.getColumns = function (b, d) {
      b = this.newColumn(d, "Difficulty", "difficulty");
      b.setCellFunc = function (b, d) {
        var f = "Low";
        1 === d.difficulty
          ? (f = "Medium")
          : 2 === d.difficulty && (f = "High");
        ui.setText(b.el, f);
      };
      var f = this.newColumn(d, "More than once<br />a day", "allowMorePerDay");
      f.setHeaderFunc = function (b) {
        b.el.style.textAlign = "center";
      };
      f.setCellFunc = function (b, d) {
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.allowMorePerDay ? e.plus : e.minus);
      };
      var q = this.newColumn(
        d,
        "Day off on<br />2 times/cycle",
        "insertDayOff2",
      );
      q.setHeaderFunc = function (b) {
        b.el.style.textAlign = "center";
      };
      q.setCellFunc = function (b, d) {
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.insertDayOff2 ? e.plus : e.minus);
      };
      var l = this.newColumn(
        d,
        "Day off on<br />3 times/cycle",
        "insertDayOff3",
      );
      l.setHeaderFunc = function (b) {
        b.el.style.textAlign = "center";
      };
      l.setCellFunc = function (b, d) {
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.insertDayOff3 ? e.plus : e.minus);
      };
      d = g.getTagsColumn(d);
      return [b, f, q, l, d];
    };
    f.prototype.open = function () {
      this.init();
      g.bindGrid(this.options);
    };
    return f;
  })(g.tabView);
  g.subjectsV = p;
})(m || (m = {}));
(function (g) {
  var p = (function (f) {
    function b(b, k) {
      b = f.call(this, b, k) || this;
      b.difficultyPairs = [
        ["1", "Medium"],
        ["2", "High"],
        ["0", "Low"],
      ];
      b.init();
      return b;
    }
    __extends(b, f);
    b.prototype.init = function () {
      var b = this;
      this.win.minWidth = 600;
      this.win.resizable = !1;
      this.win.init();
      this.win.setHelp("#subject");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      this.color = this.getColorPicker();
      this.difficultyCombo = new c.combo(this.find(".difficultyCombo"));
      this.sameDay = new c.checkbox(this.find(".sameDay"));
      this.dayOff2 = new c.checkbox(this.find(".dayOff2"));
      this.dayOff3 = new c.checkbox(this.find(".dayOff3"));
      this.excludeStats = new c.checkbox(this.find(".excludeStats"));
      this.excludeGenerator = new c.checkbox(this.find(".excludeGenerator"));
      this.copyDayOffButton = c.button.svg({
        el: this.find(".copyOtherButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyDayOffButton.click.add(function (d) {
        return b.onCopyToClick(d, h.moreThanOnceDayOff);
      });
      this.copyDifficultyButton = c.button.svg({
        el: this.find(".copyDifficultyButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyDifficultyButton.click.add(function (d) {
        return b.onCopyToClick(d, h.difficulty);
      });
      this.tags = new c.input(this.find(".subjectTag"));
      this.tags.setPlaceholder("e.g. STEM, language");
      this.copyTagsButton = c.button.svg({
        el: this.find(".copyTagsButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyTagsButton.click.add(function (d) {
        return b.onCopyToClick(d, h.tags);
      });
      this.notes = new c.input(this.find(".notes"));
      this.copyNotesButton = c.button.svg({
        el: this.find(".copyNotesButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyNotesButton.click.add(function (d) {
        return b.onCopyToClick(d, h.notes);
      });
      this.customId = g.setCustomId(this.win.content, "subjectId");
      this.getMore(
        this.find(".moreDifficulty"),
        this.find(".moreDifficultyOptions"),
        { moreText: "Difficulty" },
      );
      this.getMore(this.find(".moreDayOff"), this.find(".moreDayOffOptions"), {
        moreText: "Day off",
      });
      this.getMore(this.find(".moreTags"), this.find(".moreTagsOptions"), {
        moreText: "More",
      });
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
      this.sameDay.anyChange.add(function (d, f) {
        return b.onSameDayChange();
      });
    };
    b.prototype.open = function () {
      var b = this.subject();
      this.title(
        this.isNew()
          ? this.loc().get("AddSubjectWindow", "Add subject")
          : this.loc().get("EditSubjectWindow", "Edit subject"),
      );
      f.prototype.open.call(this);
      this.shortUpd.set(b.name, b.shortName);
      this.color.setCol(b.color);
      this.difficultyCombo.bind(
        this.difficultyPairs,
        void 0 === b.difficulty ? e.difficulty.medium + "" : b.difficulty + "",
      );
      this.sameDay.check(b.allowMorePerDay);
      this.dayOff2.check(b.insertDayOff2);
      this.dayOff3.check(b.insertDayOff3);
      this.excludeStats.check(b.excludeStats);
      this.excludeGenerator.check(b.excludeGenerator);
      g.setText(this.tags, b.tags);
      g.setText(this.notes, b.notes);
      g.setText(this.customId, b.customId);
      this.bar.setAddOrEdit(this.isNew());
    };
    b.prototype.onSameDayChange = function () {
      var b = this.sameDay.isChecked();
      this.dayOff2.enable(!b);
      this.dayOff3.enable(!b);
    };
    b.prototype.onCopyToClick = function (b, f) {
      var d = this;
      ui.stopPropagation(b);
      this.mA.selector().onDone(function (b) {
        return d.copyTo(b, f);
      });
      this.mA
        .selector()
        .openWindow(
          this.isNew() ? [] : [this.subject()],
          e.sortNotDel(this._t().subjects),
          e.subject,
        );
    };
    b.prototype.ok = function () {
      var b = {
        name: this.name.getValue(),
        shortName: this.shortName.getValue(),
        color: this.color.getCol(),
        tags: this.tags.getValue(),
        notes: this.notes.getValue(),
        customId: this.customId.getValue(),
        difficulty: this.difficultyCombo.getNumberValue(),
        allowMorePerDay: this.sameDay.isChecked(),
        insertDayOff2: this.dayOff2.isChecked(),
        insertDayOff3: this.dayOff3.isChecked(),
        excludeStats: this.excludeStats.isChecked(),
        excludeGenerator: this.excludeGenerator.isChecked(),
      };
      g.submit(this, b);
    };
    b.prototype.copyTo = function (b, f) {
      if (0 !== b.length) {
        for (
          var d = g.newUpdateState(this.options.desc, b, {
              mA: this.mA,
              changedProps:
                f === h.difficulty
                  ? [e.difficultyProp]
                  : f === h.moreThanOnceDayOff
                    ? [
                        e.allowMorePerDayProp,
                        e.insertDayOff2Prop,
                        e.insertDayOff3Prop,
                      ]
                    : f === h.tags
                      ? [e.subjectTagsProp]
                      : [e.subjectNotesProp],
            }),
            k = 0;
          k < b.length;
          k++
        ) {
          var n = b[k];
          f === h.moreThanOnceDayOff
            ? ((n.allowMorePerDay = this.sameDay.isChecked()),
              (n.insertDayOff2 = this.dayOff2.isChecked()),
              (n.insertDayOff3 = this.dayOff3.isChecked()))
            : f === h.difficulty
              ? (n.difficulty = this.difficultyCombo.getNumberValue())
              : f === h.tags
                ? (n.tags = this.tags.getValue())
                : f === h.notes && (n.notes = this.notes.getValue());
        }
        d.name =
          f === h.difficulty
            ? "Copy difficulty"
            : f === h.moreThanOnceDayOff
              ? "Copy day off"
              : f === h.tags
                ? "Copy tags"
                : "Copy notes";
        g.addState(d, { mA: this.mA });
      }
    };
    b.prototype.subject = function () {
      return this.current();
    };
    return b;
  })(g.windowView);
  g.subjectView = p;
  var h = { difficulty: 1, moreThanOnceDayOff: 2, tags: 3, notes: 4 };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b) || this;
      b.el = d;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.el,
          desc: e.room,
          getColumns: this.getColumns,
          isGridVisible: this.isOpen,
          getNoItemsMessage: function () {
            return (
              "Here you can add rooms, labs, gym and similar" +
              b.viewer().addWatchIntroVideos()
            );
          },
          editWindow: new g.roomV(this.mA, "roomView"),
        }),
      );
    };
    f.prototype.getColumns = function (b, d) {
      b = this.newColumn(d, "Building", "building");
      var f = this.newColumn(d, "Capacity", "capacity");
      b.setHeaderFunc = b.setCellFunc = function (b) {
        return !0;
      };
      f.setHeaderFunc = function (b) {
        ui.addClass(b.el, "center");
      };
      f.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.capacity);
      };
      d = g.getTagsColumn(d);
      return [f, b, d];
    };
    f.prototype.open = function () {
      this.init();
      g.bindGrid(this.options);
    };
    return f;
  })(g.tabView);
  g.roomsView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (f) {
    function b(b, k) {
      b = f.call(this, b, k) || this;
      b.init();
      return b;
    }
    __extends(b, f);
    b.prototype.init = function () {
      var b = this,
        f = this.win;
      f.minWidth = 600;
      f.resizable = !1;
      f.init();
      f.setHelp("#room");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      this.color = this.getColorPicker();
      this.capacityCombo = new c.combo(this.find(".capacity"));
      this.capacityCombo._pageKeyStep = 10;
      this.copyCapacityButton = c.button.svg({
        el: this.find(".copyCapacity"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyCapacityButton.click.add(function (d) {
        return b.onCopyToClick(d, h.capacity);
      });
      this.building = new c.input(this.find(".building"));
      this.building.setPlaceholder("e.g. Main building");
      this.copyBuildingButton = c.button.svg({
        el: this.find(".copyBuilding"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyBuildingButton.click.add(function (d) {
        return b.onCopyToClick(d, h.building);
      });
      this.tags = new c.input(this.find(".roomTag"));
      this.tags.setPlaceholder("e.g. lab, 1st floor");
      this.copyTagsButton = c.button.svg({
        el: this.find(".copyTags"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyTagsButton.click.add(function (d) {
        return b.onCopyToClick(d, h.tags);
      });
      this.notes = new c.input(this.find(".notes"));
      this.customId = g.setCustomId(this.win.content, "roomId");
      this.copyNotesButton = c.button.svg({
        el: this.find(".copyNotesButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyNotesButton.click.add(function (d) {
        return b.onCopyToClick(d, h.notes);
      });
      this.getMore(this.find(".moreTags"), this.find(".moreTagsOptions"), {
        moreText: "More",
      });
      this.getMore(
        this.find(".moreCapacity"),
        this.find(".moreCapacityOptions"),
        { moreText: "Capacity" },
      );
      this.getMore(
        this.find(".moreBuilding"),
        this.find(".moreBuildingOptions"),
        { moreText: "Building" },
      );
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    b.prototype.open = function () {
      var b = this.room();
      this.title(this.isNew() ? "Add room" : "Edit room");
      f.prototype.open.call(this);
      this.shortUpd.set(b.name, b.shortName);
      this.color.setCol(b.color);
      g.setText(this.tags, b.tags);
      g.setText(this.notes, b.notes);
      g.setText(this.customId, b.customId);
      this.bindArbitrary(this.capacityCombo, 200, b.capacity, 1);
      this.building.setValue(b.building);
      this.bar.setAddOrEdit(this.isNew());
    };
    b.prototype.onCopyToClick = function (b, f) {
      var d = this;
      ui.stopPropagation(b);
      this.mA.selector().onDone(function (b) {
        return d.copyTo(b, f);
      });
      this.mA
        .selector()
        .openWindow(
          this.isNew() ? [] : [this.room()],
          e.sortNotDel(this._t().rooms),
          e.room,
        );
    };
    b.prototype.copyTo = function (b, f) {
      if (0 !== b.length) {
        for (
          var d = g.newUpdateState(this.options.desc, b, {
              mA: this.mA,
              changedProps:
                f === h.tags
                  ? [e.roomTagsProp]
                  : f === h.capacity
                    ? [e.capacityProp]
                    : f === h.building
                      ? [e.buildingProp]
                      : [e.roomNotesProp],
            }),
            k = 0;
          k < b.length;
          k++
        ) {
          var n = b[k];
          f === h.tags
            ? (n.tags = this.tags.getValue())
            : f === h.capacity
              ? (n.capacity = this.capacityCombo.getNumberValue())
              : f === h.building
                ? (n.building = this.building.getValue())
                : f === h.notes && (n.notes = this.notes.getValue());
        }
        d.name =
          f === h.tags
            ? "Copy tags"
            : f === h.capacity
              ? "Copy capacity"
              : f === h.building
                ? "Copy building"
                : "Copy notes";
        g.addState(d, { mA: this.mA });
      }
    };
    b.prototype.ok = function () {
      var b = {
        name: this.name.getValue(),
        shortName: this.shortName.getValue(),
        color: this.color.getCol(),
        tags: this.tags.getValue(),
        notes: this.notes.getValue(),
        customId: this.customId.getValue(),
        capacity: this.capacityCombo.getNumberValue(),
        building: this.building.getValue(),
      };
      g.submit(this, b);
    };
    b.prototype.room = function () {
      return this.current();
    };
    return b;
  })(g.windowView);
  g.roomV = p;
  var h = { capacity: 1, building: 2, tags: 3, notes: 4 };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b) || this;
      b.el = d;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.el,
          desc: e.teacher,
          getColumns: this.getColumns,
          isGridVisible: this.isOpen,
          getNoItemsMessage: function () {
            return (
              "Here you can add teachers and their constraints, e.g. max. activities in a row and gaps. " +
              b.viewer().addWatchIntroVideos()
            );
          },
          editWindow: new g.tchV(this.mA, "teacherView"),
        }),
      );
    };
    f.prototype.getColumns = function (b, d) {
      b = this.newColumn(d, "Max. activities<br />in a row", "maxInRow");
      var f = this.newColumn(d, "Max. gaps<br />per cycle", "maxGapsPerCycle"),
        q = this.newColumn(d, "Max. gaps<br />per day", "maxGapsPerDay"),
        l = this.newColumn(
          d,
          "Min. activities<br />to allow gaps",
          "allowGapsAfter",
        ),
        n = this.newColumn(d, "Max.<br />deviation", "maxDeviation"),
        h = this.newColumn(d, "Min.<br />per day", "minPerDay"),
        w = this.newColumn(d, "Max.<br />per day", "maxPerDay"),
        u = this.newColumn(d, "Building<br />moves", "maxBuildingMoves");
      b.setHeaderFunc =
        f.setHeaderFunc =
        q.setHeaderFunc =
        l.setHeaderFunc =
        n.setHeaderFunc =
        h.setHeaderFunc =
        w.setHeaderFunc =
        u.setHeaderFunc =
          function (b) {
            ui.addClass(b.el, "center");
          };
      f.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.maxGapsPerCycle);
      };
      q.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.maxGapsPerDay);
      };
      l.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.allowGapsAfter);
      };
      b.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.maxInRow);
      };
      n.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.maxDeviation);
      };
      h.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.minPerDay);
      };
      w.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.maxPerDay);
      };
      u.setCellFunc = function (b, d) {
        g.setArbCellF(b, d.maxBuildingMoves);
        -1 !== d.maxBuildingMoves &&
          d.countAllMoves &&
          (b.el.style.fontWeight = "bold");
      };
      d = g.getTagsColumn(d);
      return [b, f, q, l, n, h, w, u, d];
    };
    f.prototype.open = function () {
      this.init();
      g.bindGrid(this.options);
    };
    return f;
  })(g.tabView);
  g.teachersView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (b) {
    function d(d, g) {
      d = b.call(this, d, g) || this;
      d.moveTypeKvs = [
        [f.ignoreMoveGap + "", "Ignore move after the gap"],
        [f.countAll + "", "Count all moves"],
      ];
      d.init();
      return d;
    }
    __extends(d, b);
    d.prototype.init = function () {
      var b = this,
        d = this.win;
      d.minWidth = 600;
      d.resizable = !1;
      d.init();
      d.setHelp("#teacher");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      this.color = this.getColorPicker();
      this.gapWeekCombo = new c.combo(this.find(".gapPerWeekCombo"));
      this.gapDayCombo = new c.combo(this.find(".gapPerDayCombo"));
      this.allowGapCombo = new c.combo(this.find(".lessonGapCombo"));
      this.nInRowCmb = new c.combo(this.find(".nInRowCmb"));
      this.maxDiffCombo = new c.combo(this.find(".lessonDeviationCombo"));
      this.minPerDayCombo = new c.combo(this.find(".minPerDayCombo"));
      this.maxPerDayCombo = new c.combo(this.find(".maxPerDayCombo"));
      this.maxMovesCombo = new c.combo(this.find(".moveNumberCmb"));
      this.moveTypeCombo = new c.combo(this.find(".moveTypeCmb"));
      this.maxMovesCombo.change.add(function (d, f) {
        return b.onMaxMovesChange();
      });
      this.copyGapsButton = c.button.svg({
        el: this.find(".copyGapsButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyGapsButton.click.add(function (d) {
        return b.onCopyToClick(d, h.gaps);
      });
      this.copyLoadButton = c.button.svg({
        el: this.find(".copyLessonsButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyLoadButton.click.add(function (d) {
        return b.onCopyToClick(d, h.load);
      });
      this.copyBuildingButton = c.button.svg({
        el: this.find(".copyBuildButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyBuildingButton.click.add(function (d) {
        return b.onCopyToClick(d, h.building);
      });
      this.tags = new c.input(this.find(".teacherTag"));
      this.tags.setPlaceholder("e.g. Eng, Math");
      this.copyTagsButton = c.button.svg({
        el: this.find(".copyTagsButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyTagsButton.click.add(function (d) {
        return b.onCopyToClick(d, h.tags);
      });
      this.notes = new c.input(this.find(".notes"));
      this.copyNotesButton = c.button.svg({
        el: this.find(".copyNotesButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyNotesButton.click.add(function (d) {
        return b.onCopyToClick(d, h.notes);
      });
      this.customId = g.setCustomId(this.win.content, "teacherId");
      this.getMore(this.find(".moreGaps"), this.find(".moreGapsOptions"), {
        moreText: "Gaps",
      });
      this.getMore(this.find(".moreLoad"), this.find(".moreLoadOptions"), {
        moreText: "Load",
      });
      this.getMore(
        this.find(".moreBuilding"),
        this.find(".moreBuildingOptions"),
        { moreText: "Buildings" },
      );
      this.getMore(this.find(".moreTags"), this.find(".moreTagsOptions"), {
        moreText: "More",
      });
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    d.prototype.open = function () {
      var d = this.teacher();
      this.title(this.isNew() ? "Add teacher" : "Edit teacher");
      b.prototype.open.call(this);
      this.shortUpd.set(d.name, d.shortName);
      this.color.setCol(d.color);
      this.bindArbitrary(this.gapWeekCombo, 100, d.maxGapsPerCycle);
      this.bindArbitrary(this.gapDayCombo, 30, d.maxGapsPerDay);
      this.bindArbitrary(this.allowGapCombo, 30, d.allowGapsAfter);
      this.bindArbitrary(this.nInRowCmb, 30, d.maxInRow, 1);
      this.bindArbitrary(this.maxDiffCombo, 30, d.maxDeviation);
      this.bindArbitrary(this.minPerDayCombo, 30, d.minPerDay);
      this.bindArbitrary(this.maxPerDayCombo, 40, d.maxPerDay);
      this.bindArbitrary(this.maxMovesCombo, 10, d.maxBuildingMoves);
      this.moveTypeCombo.bind(
        this.moveTypeKvs,
        (d.countAllMoves ? f.countAll : f.ignoreMoveGap) + "",
      );
      this.onMaxMovesChange();
      g.setText(this.tags, d.tags);
      g.setText(this.notes, d.notes);
      g.setText(this.customId, d.customId);
      this.bar.setAddOrEdit(this.isNew());
    };
    d.prototype.onMaxMovesChange = function () {
      this.moveTypeCombo.enable(
        this.maxMovesCombo.getNumberValue() !== num.noValue,
      );
    };
    d.prototype.onCopyToClick = function (b, d) {
      var f = this;
      ui.stopPropagation(b);
      this.mA.selector().onDone(function (b) {
        return f.copyTo(b, d);
      });
      this.mA
        .selector()
        .openWindow(
          this.isNew() ? [] : [this.teacher()],
          e.sortNotDel(this._t().teachers),
          e.teacher,
        );
    };
    d.prototype.ok = function () {
      var b = {
        name: this.name.getValue(),
        shortName: this.shortName.getValue(),
        color: this.color.getCol(),
        tags: this.tags.getValue(),
        notes: this.notes.getValue(),
        customId: this.customId.getValue(),
        maxGapsPerCycle: this.gapWeekCombo.getNumberValue(),
        maxGapsPerDay: this.gapDayCombo.getNumberValue(),
        allowGapsAfter: this.allowGapCombo.getNumberValue(),
        maxInRow: this.nInRowCmb.getNumberValue(),
        maxDeviation: this.maxDiffCombo.getNumberValue(),
        minPerDay: this.minPerDayCombo.getNumberValue(),
        maxPerDay: this.maxPerDayCombo.getNumberValue(),
        maxBuildingMoves: this.maxMovesCombo.getNumberValue(),
        countAllMoves: this.moveTypeCombo.getNumberValue() === f.countAll,
      };
      g.submit(this, b);
    };
    d.prototype.copyTo = function (b, d) {
      if (0 !== b.length) {
        var k = (
          d === h.gaps
            ? e.gapConstraints
            : d === h.load
              ? e.loadConstraints
              : d === h.building
                ? e.buildingConstraints
                : d === h.tags
                  ? [e.teacherTagsProp]
                  : [e.teacherNotesProp]
        ).slice();
        k = g.newUpdateState(this.options.desc, b, {
          mA: this.mA,
          changedProps: k,
        });
        for (var q = 0; q < b.length; q++) {
          var t = b[q];
          d === h.gaps
            ? ((t.maxGapsPerCycle = this.gapWeekCombo.getNumberValue()),
              (t.maxGapsPerDay = this.gapDayCombo.getNumberValue()),
              (t.allowGapsAfter = this.allowGapCombo.getNumberValue()),
              (t.maxInRow = this.nInRowCmb.getNumberValue()))
            : d === h.load
              ? ((t.maxDeviation = this.maxDiffCombo.getNumberValue()),
                (t.minPerDay = this.minPerDayCombo.getNumberValue()),
                (t.maxPerDay = this.maxPerDayCombo.getNumberValue()))
              : d === h.building
                ? ((t.maxBuildingMoves = this.maxMovesCombo.getNumberValue()),
                  (t.countAllMoves =
                    this.moveTypeCombo.getNumberValue() === f.countAll))
                : d === h.tags
                  ? (t.tags = this.tags.getValue())
                  : d === h.notes && (t.notes = this.notes.getValue());
        }
        k.name =
          d === h.gaps
            ? "Copy gaps"
            : d === h.load
              ? "Copy load"
              : d === h.building
                ? "Copy buildings"
                : d === h.tags
                  ? "Copy tags"
                  : "Copy notes";
        g.addState(k, { mA: this.mA });
      }
    };
    d.prototype.teacher = function () {
      return g.getCurrent(this.options);
    };
    return d;
  })(g.windowView);
  g.tchV = p;
  var h = { gaps: 1, load: 2, building: 3, tags: 4, notes: 5 },
    f = { ignoreMoveGap: 0, countAll: 1 };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b) || this;
      b.el = d;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.el,
          desc: e._class,
          getColumns: this.getColumns,
          isGridVisible: this.isOpen,
          getNoItemsMessage: function () {
            return 'Here you can add classes like "7A", "Grade 8", "Year 9" and their groups/students.';
          },
          getNew: this.getNewClass,
          beforeEditForm: this.beforeEdit,
          editWindow: new g.classV(this.mA, "classView"),
        }),
      );
      this.groupSetsView = new g.groupSetsView(this.mA, "groupSetsView");
      this.studentsView = new g.studentsView(this.mA, "studentsView");
      this.options.gridBar.groupsClick.add(function (d, f) {
        return b.onGroupsClick(d, f);
      });
      this.options.gridBar.studentsClick.add(function (d, f) {
        return b.onStudentsClick(d, f);
      });
    };
    f.prototype.getColumns = function (b, d) {
      b = this.newColumn(d, "Start<br />on 1st period", "startOnFirstPeriod");
      var f = this.newColumn(d, "Forbid<br />gaps", "forbidGaps"),
        q = this.newColumn(
          d,
          "Groups finish<br />at the same time",
          "groupsFinishTogether",
        ),
        l = this.newColumn(d, "Allowed<br />difference", "maxDiff");
      b.setHeaderFunc =
        f.setHeaderFunc =
        q.setHeaderFunc =
        l.setHeaderFunc =
          function (b) {
            b.el.style.textAlign = "center";
          };
      b.setCellFunc = function (b, d) {
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.startOnFirstPeriod ? e.plus : e.minus);
      };
      f.setCellFunc = function (b, d) {
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.forbidGaps ? e.plus : e.minus);
      };
      q.setCellFunc = function (b, d) {
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.groupsFinishTogether ? e.plus : e.minus);
      };
      l.setCellFunc = function (b, d) {
        b.el.style.textAlign = "center";
        ui.setText(b.el, -1 === d.maxDiff ? e.minus : d.maxDiff.toString());
      };
      d = g.getTagsColumn(d);
      return [b, f, q, l, d];
    };
    f.prototype.open = function () {
      this.init();
      g.bindGrid(this.options);
    };
    f.prototype.beforeEdit = function (b) {
      var d = this.options.grid && this.options.grid.lastSelected();
      if (d && keys.enter(b) && keys.ctrl(b)) {
        if (keys.shift(b)) this.onStudentsClick(b, d);
        else this.onGroupsClick(b, d);
        return !1;
      }
      return !0;
    };
    f.prototype.onGroupsClick = function (b, d) {
      this.options.grid.hasSelection() &&
        (this.mA.setCurrent(e._class, this.options.grid.lastSelected()),
        this.groupSetsView.open());
    };
    f.prototype.onStudentsClick = function (b, d) {
      this.options.grid.hasSelection() &&
        (this.mA.setCurrent(e._class, this.options.grid.lastSelected()),
        this.studentsView.open());
    };
    f.prototype.getNewClass = function () {
      var b = obj.newChildToUse(e._class, this._t());
      g.addGroups(b, !0, !1);
      return b;
    };
    return f;
  })(g.tabView);
  g.classesView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (f) {
    function b(b, k) {
      b = f.call(this, b, k) || this;
      b.init();
      return b;
    }
    __extends(b, f);
    b.prototype.init = function () {
      var b = this,
        f = this.win;
      f.minWidth = 600;
      f.resizable = !1;
      f.init();
      f.setHelp("#class");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      this.color = this.getColorPicker();
      this.startOn1Per = new c.checkbox(this.find(".startOn1Period"));
      this.forbidGaps = new c.checkbox(this.find(".gapForbiddenCheck"));
      this.groupFinishCheck = new c.checkbox(this.find(".groupFinishCheck"));
      this.maxDiffCombo = new c.combo(this.find(".diffLessonsCombo"));
      this.copyGapsButton = c.button.svg({
        el: this.find(".copyGapsButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyGapsButton.click.add(function (d) {
        return b.onCopyToClick(d, h.gaps);
      });
      this.copyLoadButton = c.button.svg({
        el: this.find(".copyLoadButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyLoadButton.click.add(function (d) {
        return b.onCopyToClick(d, h.load);
      });
      this.forbidGaps.change.add(function (d, f) {
        return b.onForbidGapsChange(f);
      });
      this.getMore(this.find(".moreGaps"), this.find(".moreGapsOptions"), {
        moreText: "Gaps",
      });
      this.getMore(this.find(".moreLoad"), this.find(".moreLoadOptions"), {
        moreText: "Load",
      });
      this.getMore(this.find(".moreTags"), this.find(".moreTagsOptions"), {
        moreText: "More",
      });
      this.tags = new c.input(this.find(".classTag"));
      this.tags.setPlaceholder("e.g. 5th graders");
      this.copyTagsButton = c.button.svg({
        el: this.find(".copyTagsButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyTagsButton.click.add(function (d) {
        return b.onCopyToClick(d, h.tags);
      });
      this.notes = new c.input(this.find(".notes"));
      this.copyNotesButton = c.button.svg({
        el: this.find(".copyNotesButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      this.copyNotesButton.click.add(function (d) {
        return b.onCopyToClick(d, h.notes);
      });
      this.customId = g.setCustomId(this.win.content, "classId");
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    b.prototype.open = function () {
      var b = this._cls();
      this.title(this.isNew() ? "Add class" : "Edit class");
      f.prototype.open.call(this);
      this.shortUpd.set(b.name, b.shortName);
      this.color.setCol(b.color);
      this.startOn1Per.check(b.startOnFirstPeriod);
      this.forbidGaps.check(b.forbidGaps);
      this.groupFinishCheck.enable(b.forbidGaps);
      this.groupFinishCheck.check(b.groupsFinishTogether);
      this.bindArbitrary(this.maxDiffCombo, 10, b.maxDiff);
      g.setText(this.tags, b.tags);
      g.setText(this.notes, b.notes);
      g.setText(this.customId, b.customId);
      this.bar.setAddOrEdit(this.isNew());
    };
    b.prototype.onForbidGapsChange = function (b) {
      b || this.groupFinishCheck.check(!1);
      this.groupFinishCheck.enable(b);
    };
    b.prototype.onCopyToClick = function (b, f) {
      var d = this;
      ui.stopPropagation(b);
      this.mA.selector().onDone(function (b) {
        return d.copyTo(b, f);
      });
      this.mA
        .selector()
        .openWindow(
          this.isNew() ? [] : [this._cls()],
          e.sortNotDel(this._t().classes),
          e._class,
        );
    };
    b.prototype.ok = function () {
      var b = {
        name: this.name.getValue(),
        shortName: this.shortName.getValue(),
        color: this.color.getCol(),
        tags: this.tags.getValue(),
        customId: this.customId.getValue(),
        notes: this.notes.getValue(),
        startOnFirstPeriod: this.startOn1Per.isChecked(),
        forbidGaps: this.forbidGaps.isChecked(),
        groupsFinishTogether: this.groupFinishCheck.isChecked(),
        maxDiff: this.maxDiffCombo.getNumberValue(),
      };
      g.submit(this, b);
    };
    b.prototype.copyTo = function (b, f) {
      if (0 !== b.length) {
        for (
          var d = g.newUpdateState(this.options.desc, b, {
              mA: this.mA,
              changedProps:
                f === h.gaps
                  ? [
                      e.startOn1Prop,
                      e.forbidGapsProp,
                      e.groupsFinishTogetherProp,
                    ]
                  : f === h.load
                    ? [e.maxDiffProp]
                    : f === h.tags
                      ? [e.classTagsProp]
                      : [e.classNotesProp],
            }),
            k = 0;
          k < b.length;
          k++
        ) {
          var n = b[k];
          f === h.gaps
            ? ((n.startOnFirstPeriod = this.startOn1Per.isChecked()),
              (n.forbidGaps = this.forbidGaps.isChecked()),
              (n.groupsFinishTogether = this.groupFinishCheck.isChecked()))
            : f === h.load
              ? (n.maxDiff = this.maxDiffCombo.getNumberValue())
              : f === h.tags
                ? (n.tags = this.tags.getValue())
                : f === h.notes && (n.notes = this.notes.getValue());
        }
        d.name =
          f === h.gaps
            ? "Copy gaps"
            : f === h.load
              ? "Copy load"
              : f === h.tags
                ? "Copy tags"
                : "Copy notes";
        g.addState(d, { mA: this.mA });
      }
    };
    b.prototype._cls = function () {
      return this.current();
    };
    return b;
  })(g.windowView);
  g.classV = p;
  var h = { gaps: 1, load: 2, tags: 3, notes: 4 };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      this.init = c.no;
      var b = this.win;
      b.minWidth = 320;
      b.minHeight = 280;
      b.width = 640;
      b.height = 400;
      b.resizable = !0;
      b.isModal = !0;
      b.init();
      b.setHelp("#group");
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: b.content,
          desc: e.groupSet,
          getColumns: this.getColumns,
          getEntities: this.getEntities,
          selectLast: !0,
          beforeAddForm: this.beforeAdd,
          beforeDelete: this.beforeDelete,
          beforeCopyForm: this.beforeCopy,
          editWindow: new g.groupsView(this.mA, "groupsView"),
        }),
      );
    };
    f.prototype.getColumns = function (b, d) {
      b = new c.gridColumn(b.grid, "Groups per set", "position");
      b.setCellFunc = function (b, d) {
        d = e.sortNotDel(d.groups);
        d = arr.joinCommaSpace(
          d.map(function (b) {
            return ""
              .concat(b.name, ' <span class="shortGroupName">(')
              .concat(b.shortName, ")</span>");
          }),
        );
        ui.setHtml(b.el, d);
      };
      return [b];
    };
    f.prototype.open = function () {
      this.init();
      this.title("Manage group sets for " + this.currentClass().name);
      h.prototype.open.call(this);
      this.options.grid.isDirty = !0;
      g.bindGrid(this.options);
    };
    f.prototype.getEntities = function () {
      return e.getSortedGroupSets(this.currentClass(), !1);
    };
    f.prototype.beforeAdd = function () {
      this.onAdd();
      return !1;
    };
    f.prototype.beforeDelete = function (b, d, f, q) {
      b = e.getGroupsForGroupSets(f);
      d = e.getStudentsForClasses([this.currentClass()]);
      g.removeDeletedGroups(d, b, this.mA);
      return { continue: !0 };
    };
    f.prototype.beforeCopy = function () {
      var b = this;
      this.mA.selector().onDone(function (d) {
        return b.copyGroupSets(d);
      });
      this.mA.selector().openWindow(
        [],
        e.sortNotDel(this._t().classes).filter(function (d) {
          return d !== b.currentClass();
        }),
        e._class,
      );
      return !1;
    };
    f.prototype.onAdd = function () {
      var b = 0,
        d = this.currentClass(),
        f = g.newGroupSet(d, e.maxGroupSet(d) + 1);
      d = e.getSortedGroups(d);
      var q = this.getNextGroupName(d);
      q = g.newGroup(f, q, q, ++b);
      f.groups.push(q);
      d.push(q);
      d = this.getNextGroupName(d);
      b = g.newGroup(f, d, d, ++b);
      f.groups.push(b);
      this.mA.setCurrent(e.groupSet, f);
      g.addEntities(e.groupSet, [f], { mA: this.mA });
    };
    f.prototype.getNextGroupName = function (b) {
      for (var d = 1, f = !1; !f; )
        b.some(function (b) {
          return b.name === d + "";
        })
          ? d++
          : (f = !0);
      return d + "";
    };
    f.prototype.copyGroupSets = function (b) {
      if (0 !== b.length) {
        for (
          var d = this.options.grid.selectedItems,
            f = g.newState("Copy groups", "edit"),
            q = [],
            l = 0;
          l < b.length;
          l++
        )
          for (
            var n = b[l], h = e.maxGroupSet(n), w = 0, u = d;
            w < u.length;
            w++
          ) {
            var x = u[w],
              y = g.newGroupSet(n, ++h),
              z = 0,
              A = 0;
            for (x = x.groups; A < x.length; A++) {
              var B = x[A];
              B = g.newGroup(y, B.name, B.shortName, ++z);
              y.groups.push(B);
            }
            q.push(y);
          }
        f.actions.push(g.newAddAction(e.groupSet, q, { mA: this.mA }));
        g.addState(f, { mA: this.mA });
      }
    };
    f.prototype.onResize = function () {
      this.onListResize(this.options.gridBar);
      h.prototype.onResize.call(this);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["group"]);
    };
    f.prototype.currentClass = function () {
      return this.mA.getCurrent(e._class);
    };
    return f;
  })(g.windowView);
  g.groupSetsView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      this.init = c.no;
      var b = this.win;
      b.minWidth = 320;
      b.minHeight = 280;
      b.width = 540;
      b.height = 360;
      b.resizable = !0;
      b.isModal = !0;
      b.init();
      b.setHelp("#group");
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: b.content,
          desc: e.group,
          getColumns: this.getColumns,
          getNew: this.getNewGroup,
          getEntities: this.getEntities,
          selectLast: !0,
          beforeDelete: this.beforeDelete,
          editWindow: this.mA.groupView(),
          gridOptions: { handleKeys: !0 },
        }),
      );
    };
    f.prototype.getColumns = function (b, d) {
      d = new c.gridColumn(b.grid, "Name", "name");
      b = new c.gridColumn(b.grid, "Short name", "shortName");
      return [d, b];
    };
    f.prototype.open = function () {
      this.init();
      this.title("Manage groups for ".concat(this.currentClass().name));
      h.prototype.open.call(this);
      this.options.grid.isDirty = !0;
      g.bindGrid(this.options);
    };
    f.prototype.getEntities = function () {
      return e.sortNotDel(this.currentGroupSet().groups);
    };
    f.prototype.getNewGroup = function () {
      var b = this.currentGroupSet();
      return g.newGroup(b, "", "", e.maxGroup(b) + 1);
    };
    f.prototype.beforeDelete = function (b, d, f, q) {
      b = !0;
      2 >
        d.grid.data.filter(function (b) {
          return !arr.has(f, b);
        }).length &&
        (this.viewer().inf.add("At least two groups are required."), (b = !1));
      if (!b) return { continue: !1 };
      d = e.getStudentsForClasses([this.currentClass()]);
      g.removeDeletedGroups(d, f, this.mA);
      return { continue: !0 };
    };
    f.prototype.onResize = function () {
      this.onListResize(this.options.gridBar);
      h.prototype.onResize.call(this);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["group"]);
    };
    f.prototype.currentGroupSet = function () {
      return this.mA.getCurrent(e.groupSet);
    };
    f.prototype.currentClass = function () {
      return this.currentGroupSet().parent;
    };
    return f;
  })(g.windowView);
  g.groupsView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.init();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.win.minWidth = 520;
      this.win.resizable = !1;
      this.win.init();
      this.win.setHelp("#group");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      this.getMore(this.find(".moreOptionsButton"), this.find(".moreOptions"), {
        moreText: "More",
      });
      this.customId = g.setCustomId(this.win.content, "groupId");
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      var b = this.group();
      this.title(
        this.isNew()
          ? this.loc().get("AddGroupWindow", "Add group")
          : this.loc().get("EditGroupWindow", "Edit group"),
      );
      h.prototype.open.call(this);
      this.shortUpd.set(b.name, b.shortName);
      g.setText(this.customId, b.customId);
      this.bar.setAddOrEdit(this.isNew());
    };
    f.prototype.ok = function () {
      var b = {
        name: this.name.getValue(),
        shortName: this.shortName.getValue(),
        customId: this.customId.getValue(),
      };
      g.submit(this, b);
    };
    f.prototype.group = function () {
      return this.current();
    };
    return f;
  })(g.windowView);
  g.groupView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      this.init = c.no;
      var b = this.win;
      b.minWidth = 320;
      b.minHeight = 280;
      b.width = 640;
      b.height = 400;
      b.resizable = !0;
      b.isModal = !0;
      b.init();
      b.setHelp("#student");
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: b.content,
          desc: e.student,
          getColumns: this.getColumns,
          getEntities: this.getEntities,
          selectLast: !0,
          getNew: this.getNewStudent,
          editWindow: new g.studentView(this.mA, "studentView"),
        }),
      );
      b = this.options.grid;
      b.showNoItems = !0;
      b.canPaste = !this.mA.allow.isDisabled();
    };
    f.prototype.getColumns = function (b, d) {
      var f = this;
      d = new c.gridColumn(b.grid, "Pos.", "position");
      d.setHeaderFunc = function (b) {
        ui.setWidth(b.el, 26);
      };
      d.setCellFunc = function (b, d) {
        ui.setText(b.el, d.position + ".");
        ui.setWidth(b.el, 26);
      };
      var g = new c.gridColumn(b.grid, "Name", "name"),
        l = new c.gridColumn(b.grid, "Short name", "shortName");
      b = new c.gridColumn(b.grid, "Groups", "groupIds");
      b.setCellFunc = function (b, d) {
        d = e.byIds(f.groups, d.groupIds);
        ui.setHtml(b.el, e.namesStr(d));
      };
      return [d, g, l, b];
    };
    f.prototype.open = function () {
      this.init();
      this.title("Manage students for " + this.currentClass().name);
      h.prototype.open.call(this);
      this.groups = e.getGroups(this.currentClass(), !1, !1);
      this.options.grid.isDirty = !0;
      g.bindGrid(this.options);
    };
    f.prototype.getEntities = function () {
      return this.currentClass().sortedStudents;
    };
    f.prototype.getNewStudent = function () {
      return g.newStudent(this.currentClass(), "", "", 1);
    };
    f.prototype.onResize = function () {
      this.onListResize(this.options.gridBar);
      h.prototype.onResize.call(this);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["student"]);
    };
    f.prototype.currentClass = function () {
      return this.mA.getCurrent(e._class);
    };
    return f;
  })(g.windowView);
  g.studentsView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.init();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.win.minWidth = 620;
      this.win.resizable = !1;
      this.win.init();
      this.win.setHelp("#student");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      this.groupsCombo = new c.combo(this.find(".groupsCombo"));
      this.moreGroupsButton = this.find(".moreGroupsButton");
      this.groupSelector = g.getSelector({
        mA: this.mA,
        combo: this.groupsCombo,
        moreButtonElement: this.moreGroupsButton,
        useId: "divisionsD",
        desc: e.group,
      });
      this.groupSelector.change.add(function (d) {
        return b.onGroupChange(d);
      });
      var d = c.button.svg({
        el: this.find(".copyToButton"),
        text: "Copy to",
        svgClass: "copySvg icon",
        useId: "copyD",
        logger: this.log(),
      });
      ui.on(d.el, "mouseover focus", function (b) {
        return g.onCopyToOver(b);
      });
      ui.on(d.el, "mouseout blur mousedown", function (b) {
        return g.onCopyToOut(b);
      });
      d.click.add(function (d) {
        return b.copyClick(d, 0);
      });
      d.hint("Copy groups to other students", c.hintPos.left);
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      var b = this.student();
      this.title(this.isNew() ? "Add student" : "Edit student");
      h.prototype.open.call(this);
      this.shortUpd.set(b.name, b.shortName);
      var d = e.getGroups(this.class(), !1, !1);
      b = e.byIds(d, b.groupIds);
      this.groupSelector.bind(d, ["", "No group"], b);
      this.bar.setAddOrEdit(this.isNew());
    };
    f.prototype.onGroupChange = function (b) {
      this.checkSameSetGroups(b);
    };
    f.prototype.ok = function () {
      var b = this.groupSelector.selected,
        d = {
          name: this.name.getValue(),
          shortName: this.shortName.getValue(),
          groupIds: e.ids(b),
        };
      this.checkActivityFilter(this.student(), d);
      this.checkSameSetGroups(b);
      g.submit(this, d);
    };
    f.prototype.checkSameSetGroups = function (b) {
      b = this.getSameSetGroups(b);
      1 < b.length &&
        this.inf().add(
          "A student should pick only one group per group set. The following groups belong to the same group set: " +
            arr.joinCommaSpace(
              b.map(function (b) {
                return b.name;
              }),
            ),
        );
    };
    f.prototype.checkActivityFilter = function (b, d) {
      if (void 0 !== d.groupIds) {
        var f = this.mA.dataView().activitiesView.filter,
          g = filter.getTypeAndId(f.subValue),
          l = g[1];
        g[0] === e.type.student &&
          l === b.id &&
          (f.subEntityIds = [e.entireGroup(b.parent).id].concat(
            d.groupIds.slice(),
          ));
      }
    };
    f.prototype.getSameSetGroups = function (b) {
      for (
        var d = [],
          f = function (b) {
            var f = b.parent.id,
              k = d.find(function (b) {
                return b[0] === f;
              });
            k ? k[1].push(b) : d.push([f, [b]]);
          },
          g = 0;
        g < b.length;
        g++
      )
        f(b[g]);
      b = [];
      for (f = 0; f < d.length; f++)
        ((g = d[f]), 1 < g[1].length && b.push.apply(b, g[1]));
      return b;
    };
    f.prototype.copyClick = function (b, d) {
      var f = this;
      ui.stopPropagation(b);
      this.mA.selector().onDone(function (b) {
        return f.copyGroups(b);
      });
      this.openSelector();
    };
    f.prototype.openSelector = function () {
      this.mA
        .selector()
        .openWindow(
          this.isNew() ? [] : [this.student()],
          e.sortNotDel(this.class().students),
          e.student,
        );
    };
    f.prototype.copyGroups = function (b) {
      for (
        var d = e.ids(this.groupSelector.selected),
          f = g.newUpdateState(this.options.desc, b, {
            mA: this.mA,
            changedProps: [e.studentGroupIds],
          }),
          q = 0;
        q < b.length;
        q++
      ) {
        var l = b[q],
          n = d.slice();
        this.checkActivityFilter(l, { groupIds: n });
        l.groupIds = n;
      }
      f.name = "Copy to students";
      g.addState(f, { mA: this.mA });
    };
    f.prototype.student = function () {
      return this.current();
    };
    f.prototype.class = function () {
      return this.student().parent;
    };
    return f;
  })(g.windowView);
  g.studentView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b) || this;
      b.filter = {
        type: e.type.teacher,
        entityIds: [],
        value: void 0,
        subEntityIds: [],
      };
      b.isShort = !1;
      b.el = d;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.filterEl = ui.getDiv("lessonFilter");
      this.filterIconEl = ui.getDiv("entityPicker");
      this.entityIcon = svg.getIcon(this.filterIconEl, "svgIcon", "teacherD");
      ui.setTabIndex(this.entityIcon.svg, 0);
      this.entityCombo = new c.combo(
        ui.setZIndex(ui.addClass(ui.getTag("select"), "entityCombo"), 1),
      );
      this.subEntityCombo = new c.combo(
        ui.setZIndex(ui.addClass(ui.getTag("select"), "entityTypeCombo"), 2),
      );
      this.statsTxt = ui.getDiv("statsText");
      ui.title(this.statsTxt, "Switch between full and short names");
      this.txtIconEl = ui.getDiv("csvReport on");
      this.csvIcon = svg.getIcon(this.txtIconEl, "svgIcon", "txtD");
      ui.appends(
        [
          this.filterIconEl,
          this.entityCombo.el,
          this.subEntityCombo.el,
          this.statsTxt,
          this.txtIconEl,
        ],
        this.filterEl,
      );
      ui.hint(
        this.filterIconEl,
        "Cycle through different stats",
        c.hintPos.bottom,
      );
      ui.click(this.statsTxt, function (d) {
        return b.onStatsClick();
      });
      ui.click(this.filterIconEl, function (d) {
        return b.onCategoryChange();
      });
      this.entityCombo.change.add(function (d, f) {
        return b.onEntityChange(d, f);
      });
      this.subEntityCombo.change.add(function (d, f) {
        return b.onSubEntityChange(d, f);
      });
      ui.hint(
        this.txtIconEl,
        "Export stats to spreadsheet file",
        c.hintPos.bottom,
      );
      ui.click(this.txtIconEl, function (d) {
        return b.onTxtIconClick(d);
      });
      this.gridEl = ui.getDiv("lessonGrid");
      this.options = {
        ctx: this,
        mA: this.mA,
        el: this.gridEl,
        desc: e.activity,
        getColumns: this.getColumns,
        getEntities: this.getEntities,
        beforeEditForm: this.beforeEdit,
        isGridVisible: this.isOpen,
        getNoItemsMessage: function () {
          return b.filter.entityIds || b.filter.subEntityIds
            ? ""
            : "Here you can manage activities and view statistics. " +
                b.viewer().addWatchIntroVideos();
        },
        editWindow: this.mA.activityView(),
        beforeBind: this.beforeBind,
        afterBind: this.afterBind,
      };
      g.setManageForm(this.options);
      var d = this.options.grid;
      d.showNoItems = !0;
      d.canPaste = !this.mA.allow.isDisabled();
      d.typingFunc = function (d, f) {
        return (
          str.startsWith(d.subject.name.toLowerCase(), f) ||
          str.startsWith(b.getDisplay(d.teachers).toLowerCase(), f) ||
          str.startsWith(b.getDisplay(e.classes(d)).toLowerCase(), f)
        );
      };
      ui.appends([this.filterEl, this.gridEl], this.el);
      g.descChange.add(function (d) {
        return b.onChange(d);
      });
    };
    f.prototype.getColumns = function () {
      var b = this,
        d = this.options.grid,
        f = new c.gridColumn(d, "Subject", "subject");
      f.setCellFunc = function (d, f) {
        ui.setHtml(d.el, g.wrapCell(f.subject, b.getDisplay([f.subject])));
      };
      f.sortFunc = function (b, d) {
        return b.slice().sort(function (b, f) {
          return (d ? 1 : -1) * arr.sort(b.subject.name, f.subject.name);
        });
      };
      var q = new c.gridColumn(d, "Teacher(s)", "teacher");
      q.setCellFunc = function (d, f) {
        ui.setHtml(d.el, b.getDisplay(f.teachers));
      };
      q.sortFunc = function (d, f) {
        return d.slice().sort(function (d, k) {
          return (
            (f ? 1 : -1) *
            arr.sort(b.getDisplay(d.teachers), b.getDisplay(k.teachers))
          );
        });
      };
      var l = new c.gridColumn(d, "Class(es)", "_class");
      l.setCellFunc = function (d, f) {
        ui.setHtml(d.el, b.getDisplay(e.classes(f)));
      };
      l.sortFunc = function (d, f) {
        return d.slice().sort(function (d, k) {
          return (
            (f ? 1 : -1) *
            arr.sort(b.getDisplay(e.classes(d)), b.getDisplay(e.classes(k)))
          );
        });
      };
      var n = new c.gridColumn(d, "Group(s)", "groupIds");
      n.setCellFunc = function (d, f) {
        ui.setHtml(d.el, b.getGroupsDisplay(f.groups));
      };
      n.sortFunc = function (d, f) {
        return d.slice().sort(function (d, k) {
          return (
            (f ? 1 : -1) *
            arr.sort(b.getGroupsDisplay(d.groups), b.getGroupsDisplay(k.groups))
          );
        });
      };
      var h = new c.gridColumn(d, "Count", "count");
      h.setCellFunc = function (b, d) {
        ui.setText(b.el, obj.notDel(d.cards).length + "");
      };
      h.sortFunc = function (b, d) {
        return b.slice().sort(function (b, f) {
          return (
            (d ? 1 : -1) *
            arr.sort(obj.notDel(b.cards).length, obj.notDel(f.cards).length)
          );
        });
      };
      var w = new c.gridColumn(d, "Length", "length");
      w.setCellFunc = function (b, d) {
        ui.setText(b.el, d.length + "");
      };
      w.sortFunc = function (b, d) {
        return b.slice().sort(function (b, f) {
          return (d ? 1 : -1) * arr.sort(b.length, f.length);
        });
      };
      var u = new c.gridColumn(d, "Desired<br />room", "roomIds");
      u.setCellFunc = function (d, f) {
        ui.setHtml(d.el, b.getDisplay(f.rooms));
      };
      u.sortFunc = function (d, f) {
        return d.slice().sort(function (d, k) {
          return (
            (f ? 1 : -1) *
            arr.sort(b.getDisplay(d.rooms), b.getDisplay(k.rooms))
          );
        });
      };
      d = new c.gridColumn(d, "Alternative<br />rooms", "moreRoomIds");
      d.setCellFunc = function (d, f) {
        ui.setHtml(d.el, b.getDisplay(f.moreRooms));
      };
      d.sortFunc = function (d, f) {
        return d.slice().sort(function (d, k) {
          return (
            (f ? 1 : -1) *
            arr.sort(b.getDisplay(d.moreRooms), b.getDisplay(k.moreRooms))
          );
        });
      };
      return [f, q, l, n, h, w, u, d];
    };
    f.prototype.open = function () {
      this.init();
      this.setFilterEntityIds();
      g.bindGrid(this.options);
    };
    f.prototype.beforeBind = function () {
      this.bindFilters();
    };
    f.prototype.afterBind = function () {
      this.setStatsText();
    };
    f.prototype.bindGridAndStats = function () {
      this.options.grid.isDirty = !0;
      g.bindGrid(this.options, { fireBefore: !1 });
    };
    f.prototype.getEntities = function () {
      return activityFilter.getFiltered(
        obj.notDel(this._t().activities),
        this.filter,
      );
    };
    f.prototype.setStatsText = function () {
      var b = activityFilter.getTimetableTotal(
          this.options.grid.data,
          this._t(),
        ),
        d = -1 === b.total ? "" : b.total + "";
      d = "".concat(this.isShort ? "= " : "Total: ").concat(d);
      (b = activityFilter.getHoursText(b.minutes)) && (d += " (" + b + ")");
      this.statsTxt.innerHTML = d;
    };
    f.prototype.bindFilters = function () {
      var b = this.filter,
        d = b.type;
      b = b.value;
      var f = e.getViewEntities(this._t(), d),
        g = e.getViewEntityName(d, !0);
      d = e.getViewEntityDesc(d);
      var l = this.filter.entityIds;
      0 < l.length && !arr.hasOneEqual(e.ids(f), l) && this.reset(!0);
      d = filter.getFilters(this.mA, d, !0, f);
      f = f.length;
      0 === f
        ? filter.insertEmptyOption(d, "No items")
        : (c.combo.insertHR(d), filter.insertEmptyOption(d, g + ": " + f));
      filter.isEmpty(b) ||
        arr.has(
          d.map(function (b) {
            return b[0];
          }),
          b,
        ) ||
        this.reset(!0);
      this.entityCombo.bind(d, this.filter.value);
      this.bindSubEntities();
      this.toggleCsvClass();
    };
    f.prototype.bindSubEntities = function () {
      var b = this.filter,
        d = b.entityIds,
        f = b.type,
        g = b.subValue;
      b = filter.getTypeAndId(b.value)[0];
      if (
        0 === d.length ||
        f === e.type.room ||
        f === e.type.subject ||
        b === num.noValue
      )
        ui.hide(this.subEntityCombo.el);
      else {
        var l = obj.notDel(this._t().cards),
          n = [];
        b = [];
        if (f === e.type.teacher) {
          for (var h = [], w = 0; w < l.length; w++) {
            var u = l[w];
            arr.hasOneEqual(u.parent.teacherIds, d) &&
              arr.addUnique(h, u.parent.subject);
          }
          2 <= h.length &&
            ((n = filter.getOptions(e.subject, h, {
              emptyPair: ["", "All subjects"],
            })),
            b.push.apply(b, e.ids(h)));
        } else if (f === e.type.class) {
          l = [];
          h = [];
          n = 0;
          for (w = e.byIds(obj.notDel(this._t().classes), d); n < w.length; n++)
            ((u = w[n]),
              l.push.apply(l, e.getSortedGroups(u, !1)),
              h.push.apply(h, u.sortedStudents));
          n = filter.getOptions(e.group, l, {
            emptyPair: [
              "",
              0 === h.length ? "All groups" : "All groups/students",
            ],
            useClassName: !1,
            useFullName: 1 < d.length,
          });
          b.push.apply(b, e.ids(l));
          n.push.apply(n, filter.getOptions(e.student, h));
          b.push.apply(b, e.ids(h));
        }
        2 > n.length
          ? ((f !== e.type.teacher && f !== e.type.class) || this.resetSub(!0),
            ui.hide(this.subEntityCombo.el))
          : ((d = filter.getTypeAndId(g)[1]),
            filter.isEmpty(g) ||
              arr.has(b, d) ||
              (this.resetSub(!0), (this.options.grid.isDirty = !0)),
            ui.show(this.subEntityCombo.el),
            this.subEntityCombo.bind(n, g));
      }
    };
    f.prototype.onStatsClick = function () {
      this.isShort = !this.isShort;
      this.bindGridAndStats();
    };
    f.prototype.onCategoryChange = function () {
      var b = !filter.isEmpty(this.filter.value);
      activityFilter.setNextType(this.filter);
      this.reset();
      svg.setXlink(
        this.entityIcon.use,
        activityFilter.getIconId(this.filter) + "D",
      );
      this.bindFilters();
      b ? this.bindGridAndStats() : this.setStatsText();
      this.toggleCsvClass();
    };
    f.prototype.reset = function (b) {
      void 0 === b && (b = !1);
      this.filter.entityIds = [];
      this.filter.value = void 0;
      b && filter.resetCombo(this.entityCombo);
      this.resetSub(b);
      b && (this.options.grid.isDirty = !0);
      this.setFilterEntityIds();
    };
    f.prototype.resetSub = function (b) {
      void 0 === b && (b = !1);
      this.filter.subEntityIds = [];
      this.filter.subValue = void 0;
      b && filter.resetCombo(this.subEntityCombo);
    };
    f.prototype.toggleCsvClass = function () {};
    f.prototype.onEntityChange = function (b, d) {
      this.reset();
      var f = filter.getTypeAndId(d);
      b = f[0];
      f = f[1];
      (b !== filter.type.tags &&
        b !== filter.type.building &&
        b !== filter.type.capacity) ||
        filter.remember(this.filter.type, d);
      this.bindSubEntities();
      this.bindGridAndStats();
      this.toggleCsvClass();
      b === e.type.class
        ? this.mA.setCurrent(e._class, e.byId(this._t().classes, f))
        : b === e.type.teacher
          ? this.mA.setCurrent(e.teacher, e.byId(this._t().teachers, f))
          : b === e.type.room
            ? this.mA.setCurrent(e.room, e.byId(this._t().rooms, f))
            : b === e.type.subject &&
              this.mA.setCurrent(e.subject, e.byId(this._t().subjects, f));
    };
    f.prototype.setFilterEntityIds = function () {
      var b = this,
        d = this.entityCombo.getValue();
      this.filter.value = d;
      var f = filter.getTypeAndId(d),
        g = f[0];
      f = f[1];
      var l = e.getViewEntities(this._t(), this.filter.type);
      if (e.isViewEntityType(g))
        filter.isEmpty(d)
          ? (this.filter.entityIds = [])
          : arr.has(
                l.map(function (b) {
                  return b.id;
                }),
                f,
              )
            ? (this.filter.entityIds = [f])
            : ((this.filter.entityIds = []), this.reset(!0));
      else {
        var n = [];
        e.getViewEntities(this._t(), this.filter.type).forEach(function (f) {
          return filter.addEq(n, b.filter.type, f, d);
        });
        this.filter.entityIds = n.map(function (b) {
          return b.id;
        });
      }
    };
    f.prototype.onSubEntityChange = function (b, d) {
      var f = filter.getTypeAndId(d);
      b = f[0];
      f = f[1];
      var g = filter.isEmpty(d);
      this.filter.subValue = d;
      this.filter.subEntityIds = g ? [] : [f];
      if (this.filter.type === e.type.class)
        if (g) (this.resetSub(), this.mA.resetCurrent(e.group));
        else {
          d = [];
          for (
            var l = 0,
              n = e.byIds(obj.notDel(this._t().classes), this.filter.entityIds);
            l < n.length;
            l++
          )
            ((g = n[l]), d.push.apply(d, e.getGroups(g, !1, !1)));
          b === e.type.student &&
            ((g = e.getAllStudents(this._t())),
            (l = e.byId(g, f))
              ? ((g = l.parent),
                (g = e.entireGroup(g)),
                (this.filter.subEntityIds =
                  0 === l.groupIds.length ? [] : [g.id].concat(l.groupIds)))
              : (this.filter.subEntityIds = []));
          b === e.type.group && this.mA.setCurrent(e.group, e.byId(d, f));
        }
      else
        this.filter.type === e.type.teacher &&
          b === e.type.subject &&
          (filter.isEmpty(d)
            ? this.mA.resetCurrent(e.subject)
            : this.mA.setCurrent(e.subject, e.byId(this._t().subjects, f)));
      this.bindGridAndStats();
    };
    f.prototype.onChange = function (b) {
      b = b.desc.type;
      e.isViewEntityType(b) || b === e.type.group || b === e.type.student
        ? (this.setFilterEntityIds(),
          this.bindFilters(),
          this.bindGridAndStats())
        : b === e.type.card && this.setStatsText();
    };
    f.prototype.onTxtIconClick = function (b) {
      if (0 === this.options.grid.data.length)
        this.inf().addTip(
          "In order to export statistics you need to add activities, first.",
        );
      else {
        this.inf().addTip(
          "Copy/paste the content of downloaded file into Excel or Sheets to print or customize report.",
        );
        var d = g.getPeriodsForStats(this._t());
        b = g.getStats(b, this.filter, this._t(), d);
        ui.download(b.fileName + ".txt", b.content);
      }
    };
    f.prototype.onResize = function () {
      if (this.el && this.filterEl) {
        var b =
          ui.getComputedHeight(this.el) -
          ui.getBoxHeight(this.filterEl, !0) -
          2;
        this.options.grid.setViewPortHeight(b);
        ui.setWidthHeight(
          this.options.gridBar.el,
          ui.getComputedWidth(this.el),
          b,
        );
        ui.setHeight(this.options.gridBar.barEl, b);
        this.options.grid.onResize();
      }
    };
    f.prototype.beforeEdit = function () {
      this.options.state = g.activityMode.default;
      return !0;
    };
    f.prototype.getDisplay = function (b) {
      return (this.isShort ? e.shortsStr(b) : e.namesStr(b)) || e.enDash;
    };
    f.prototype.getGroupsDisplay = function (b) {
      return b.every(function (b) {
        return e.isEntire(b);
      })
        ? e.enDash
        : this.getDisplay(
            b.map(function (b) {
              return {
                name: void 0 === b.name ? e.enDash : b.name || e.emDash,
                shortName:
                  void 0 === b.shortName ? e.enDash : b.shortName || e.emDash,
              };
            }),
          );
    };
    return f;
  })(g.tabView);
  g.activitiesV = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.count = 1;
      b.mode = g.activityMode.default;
      b.groups = [];
      b.init();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.win.minWidth = 600;
      this.win.width = 680;
      this.win.init();
      this.win.setHelp("#activity");
      this.teacherCombo = new c.combo(this.find(".teacherCombo"));
      this.moreTeachersButton = this.find(".moreTeacherButton");
      this.teacherSelector = g.getSelector({
        mA: this.mA,
        combo: this.teacherCombo,
        moreButtonElement: this.moreTeachersButton,
        useId: "teacherD",
        desc: e.teacher,
      });
      this.subjectCombo = new c.combo(this.find(".subjectCombo"));
      this.classesCombo = new c.combo(this.find(".classCombo"));
      this.moreGroupsButton = c.button.svg({
        el: this.find(".moreGroupButton"),
        text: "More...",
        useId: "classD",
        svgClass: "moreSvg icon",
        logger: this.mA.vA.log,
      });
      this.groupSelector = g.getSelector({
        mA: this.mA,
        combo: this.classesCombo,
        moreButtonElement: this.moreGroupsButton.el,
        useId: "classD",
        desc: e.group,
        classesAndGroups: !0,
      });
      this.groupSelector.setMoreText("Groups");
      this.groupSelector.change.add(function (d) {
        return b.onGroupsChange(d);
      });
      this.countRow = this.find(".countRow");
      this.countCombo = new c.combo(this.find(".countCombo"));
      this.countCombo.change.add(function (d, f) {
        return (b.count = num.toInt(f));
      });
      this.countPairs = arr.range(1, 100).map(function (b) {
        return [b + "", b + ""];
      });
      this.lengthCombo = new c.combo(this.find(".lengthCombo"));
      this.lengthPairs = [
        ["1", "Single"],
        ["2", "Double"],
        ["3", "Triple"],
      ].concat(
        arr.range(4, 32).map(function (b) {
          return [b + "", b + ""];
        }),
      );
      this.desiredCombo = new c.combo(this.find(".desiredRoomCombo"));
      this.moreDesiredButton = this.find(".moreDesiredRoomsButton");
      this.roomSelector = g.getSelector({
        mA: this.mA,
        combo: this.desiredCombo,
        moreButtonElement: this.moreDesiredButton,
        useId: "roomD",
        desc: e.room,
        title: "Select desired room",
      });
      this.roomSelector.change.add(function (d) {
        return b.onRoomsChange(d);
      });
      this.addMoreRoomsButton = this.find(".addMoreRoomsButton");
      this.moreRoomSelector = g.getSelector({
        mA: this.mA,
        combo: void 0,
        moreButtonElement: this.addMoreRoomsButton,
        useId: "roomD",
        desc: e.room,
        title: "Select alternative rooms",
      });
      this.toolbar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.toolbar.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      var b = this.options;
      this.mode = b.state;
      this.title(
        b.isAdd
          ? this.loc().get("AddLessonWindow", "Add activity")
          : this.isEditCards()
            ? 1 < this.selectedCards.length
              ? "Edit cards"
              : "Edit card"
            : b.isCopy
              ? "Copy activity"
              : this.loc().get("EditLessonWindow", "Edit activity"),
      );
      ui.toggle(this.countRow, !this.isEditCards());
      this.count =
        b.isAdd || this.isEditCards()
          ? 1
          : obj.notDel(this.activity().cards).length;
      h.prototype.open.call(this);
      this.bindCombos();
      this.toolbar.setAddOrEdit(this.isNew());
    };
    f.prototype.bindCombos = function () {
      var b = this.options.isAdd
          ? this.mA.getCurrent(e.subject)
          : this.isEditCards()
            ? filter.currentO
            : this.activity().subject,
        d = e.sortNotDel(this._t().subjects);
      this.isEditCards() && arr.insert(d, b, 0);
      d = filter.getOptions(e.subject, d);
      b = b ? filter.findValueById(d, b.id) : void 0;
      this.subjectCombo.bind(d, b);
      this.setTeachers();
      this.setGroups();
      this.countCombo.bind(this.countPairs, this.getCount() + "");
      b = this.lengthPairs.slice();
      d = this.isEditCards() ? filter.currentId : this.activity().length + "";
      this.isEditCards() &&
        arr.insert(b, [filter.currentO.id, filter.currentO.name], 0);
      this.lengthCombo.bind(b, d);
      b = e.sortNotDel(this._t().rooms);
      d = filter.currentO;
      var f = this.isEditCards() ? [d] : this.activity().rooms,
        g = this.isEditCards() ? [d] : this.activity().moreRooms;
      this.isEditCards() && arr.insert(b, d, 0);
      this.roomSelector.bind(b, ["", this.loc().get("NoRoom", "No room")], f);
      this.moreRoomSelector.bind(b, void 0, g);
    };
    f.prototype.setTeachers = function () {
      var b = e.sortNotDel(this._t().teachers),
        d = ["", this.loc().get("NoTeacher", "No teacher")],
        f = this.mA.getCurrent(e.teacher);
      f = this.isEditCards()
        ? [filter.currentO]
        : this.options.isAdd && f
          ? [f]
          : this.activity().teachers;
      this.isEditCards() && arr.insert(b, filter.currentO, 0);
      this.teacherSelector.bind(b, d, f);
    };
    f.prototype.setGroups = function () {
      if (this.options.isAdd) {
        var b = this.mA.getCurrent(e._class);
        var d = [];
        if (b) {
          var f = this.mA.getCurrent(e.group);
          d = (d = e.getGroups(b, !1, !1).find(function (b) {
            return b === f;
          }))
            ? [d]
            : [e.entireGroup(b)];
        }
      } else
        d = this.isEditCards()
          ? [filter.currentO]
          : obj.notDel(this.activity().groups);
      b = e.getGroupsForClasses(obj.notDel(this._t().classes), !1, !0);
      this.isEditCards() && arr.insert(b, filter.currentO, 0);
      this.groupSelector.bind(b, ["", "No class"], d);
    };
    f.prototype.onGroupsChange = function (b) {
      g.hasMoreGroupSetsFromClass(b) &&
        this.inf().add(
          "Mixing groups from different group sets but from the same class, causes a conflict. Consider changing selected groups or revising groups.",
        );
    };
    f.prototype.onRoomsChange = function (b) {
      1 < b.length &&
        this.inf().addTip(
          "The majority of activities require only one desired room and the rest are alternative rooms. Physical Education might require more, e.g. Sports Hall and Gym. ",
        );
    };
    f.prototype.ok = function () {
      var b = this;
      if (this.isEditCards()) this.editCards();
      else {
        for (
          var d = this.activity(),
            f = this.getSelectedData(),
            q = obj.notDel(d.cards).length,
            l = this.countCombo.getNumberValue(),
            n = this.options.isAdd ? l : Math.max(l, q),
            h = [],
            w = 0;
          w < n;
          w++
        )
          if (this.options.isAdd || w > q - 1) {
            var u = obj.newChildToUse(e.card, d);
            this.isNew() ? d.cards.push(u) : h.push(u);
          }
        this.isCopy() && this.changeRooms(d, f, []);
        n = [];
        q = !this.options.isAdd && q > l ? q - l : 0;
        0 < q &&
          ((l = obj.notDel(d.cards).sort(function (d, f) {
            return arr.sort(b.getSortByPos(d), b.getSortByPos(f));
          })),
          (q = arr.take(l, q)),
          this.options.isCopy ? arr.removes(d.cards, q) : n.push.apply(n, q));
        q = this.mA;
        l = [];
        if (!this.isNew()) {
          var x = g.newUpdateAction(e.activity, [d], { mA: q });
          l.push.apply(l, obj.notDel(d.cards));
        }
        f = this.changeActivityAndUpdateRooms(d, f, h);
        this.isNew()
          ? g.addEntities(e.activity, [d], { mA: q })
          : ((w = g.newState("Update activity", "edit")),
            g.addActions(w, [
              g.newAddAction(e.card, h, { mA: q }),
              x,
              f,
              g.newDeleteAction(e.card, n, { mA: q, needConfirm: !1 }),
            ]),
            g.addState(w, { mA: q }),
            this.checkClips(w, l));
        this.setCurrents(d);
        this.xOnOk();
      }
    };
    f.prototype.checkClips = function (b, d) {
      d = g.checkClipForCards(this.mA, d);
      0 < d.length &&
        ((d = g.newDeleteAction(e.clip, d, { mA: this.mA, needConfirm: !1 })),
        g.addAfterActions(b, [d], { mA: this.mA }));
    };
    f.prototype.editCards = function () {
      var b,
        d = this.mA,
        f = this.getSelectedData();
      if (
        !obj.keys(f).every(function (b) {
          return f[b].type === g.selType.current;
        })
      ) {
        for (
          var q = g.groupChildrenByParent(this.selectedCards),
            l = [],
            n = [],
            h = [],
            w = g.newUpdateAction(e.activity, [], { mA: d }),
            u = [],
            x = 0;
          x < q.length;
          x++
        ) {
          var y = q[x],
            z = y[0],
            A = y[1];
          if (obj.notDel(z.cards).length === A.length)
            (g.addUndoCopies(w, [z]),
              (y = this.changeActivityAndUpdateRooms(z, f, [])) && h.push(y),
              u.push.apply(u, obj.notDel(z.cards)));
          else {
            var B = obj.newChildCopy(z, e.activity, d._t());
            B.cards = [];
            this.changeActivityAndUpdateRooms(B, f, []);
            y = [];
            for (var p = 0, I = A; p < I.length; p++) {
              var F = I[p];
              F = obj.newChildCloneToUse(F, e.card, B);
              y.push(F);
            }
            (b = B.cards).push.apply(b, y);
            l.push(B);
            n.push.apply(n, A);
            A = this.getFinalIds(f.roomIds, z.roomIds);
            if (z.roomIds.toString() !== A.toString())
              for (z = 0; z < y.length; z++)
                ((F = y[z]), (F.roomIds = A.slice()));
          }
        }
        b = g.newAddAction(e.activity, l, { mA: d });
        n = g.newDeleteAction(e.card, n, { mA: d, needConfirm: !1 });
        q = g.newState(
          1 === this.selectedCards.length
            ? "Update card"
            : "Update ".concat(this.selectedCards.length, " cards"),
          "edit",
        );
        g.addActions(q, __spreadArray(__spreadArray([b, w], h, !0), [n], !1));
        g.addState(q, { mA: d });
        this.checkClips(q, u);
      }
      this.xOnOk();
    };
    f.prototype.changeActivityAndUpdateRooms = function (b, d, f) {
      var k = d.subjectId.values[0],
        l = d.lenId.values[0];
      b.subjectId = k === filter.currentId ? b.subjectId : k;
      b.teacherIds = this.getFinalIds(d.teacherIds, b.teacherIds);
      b.groupIds = this.getFinalIds(d.groupIds, b.groupIds);
      d.groupIds.type === g.selType.addChange &&
        (b.groupIds = g.getFinalGroupIds(this._t(), b.groupIds));
      b.length = l === filter.currentId ? b.length : num.toInt(l);
      return this.changeRooms(b, d, f);
    };
    f.prototype.changeRooms = function (b, d, f) {
      var k = b.roomIds.slice(),
        l = b.moreRoomIds.slice(),
        n = this.getFinalIds(d.roomIds, b.roomIds),
        h = this.getFinalIds(d.moreRoomIds, b.moreRoomIds);
      arr.removes(h, n);
      var w = k.toString() !== n.toString();
      d = l.toString() !== h.toString();
      b.roomIds = n;
      b.moreRoomIds = h;
      if (w || d) {
        b = obj.notDel(b.cards);
        var u = g.newUpdateAction(e.card, b, {
          changedProps: [e.cardRoomIds],
          mA: this.mA,
        });
        var x = h.concat(n);
        d = function (b) {
          var d = [];
          if (w) d = n.slice();
          else
            for (var f = 0, k = b.roomIds; f < k.length; f++) {
              var g = k[f];
              arr.has(n, g) || arr.has(h, g)
                ? d.push(g)
                : 0 < x.length &&
                  (g = x.find(function (d) {
                    return !arr.has(b.roomIds, d);
                  })) &&
                  d.push(g);
            }
          b.roomIds = d;
        };
        for (k = 0; k < b.length; k++) d(b[k]);
      }
      f.forEach(function (b) {
        return (b.roomIds = n.slice());
      });
      return u;
    };
    f.prototype.getSelectedValues = function (b) {
      b = e.ids(b);
      var d = arr.has(b, filter.currentId)
        ? 1 < b.length
          ? g.selType.addChange
          : g.selType.current
        : g.selType.change;
      (d !== g.selType.current && d !== g.selType.addChange) ||
        arr.remove(b, filter.currentId);
      return { values: b, type: d };
    };
    f.prototype.getFinalIds = function (b, d) {
      var f = b.values;
      this.isEditCards() &&
        (b.type === g.selType.current
          ? (f = d)
          : b.type === g.selType.addChange &&
            ((f = d), arr.addUniques(f, b.values)));
      return f;
    };
    f.prototype.setCurrents = function (b) {
      this.mA.setCurrent(
        e.subject,
        e.byId(obj.notDel(this._t().subjects), b.subjectId),
      );
      0 < b.groups.length &&
        this.mA.setCurrent(e._class, e.getClass(b.groups[0]));
      0 < b.rooms.length && this.mA.setCurrent(e.room, arr.first(b.rooms));
      0 < b.teachers.length &&
        this.mA.setCurrent(e.teacher, arr.first(b.teachers));
    };
    f.prototype.getSortByPos = function (b) {
      return e.isIn(b) ? -(b.day.position + 0.1 * b.period.position) : -1e5;
    };
    f.prototype.activity = function () {
      return this.current();
    };
    f.prototype.createNewSubject = function () {
      var b = obj.newChildToUse(e.subject, this._t());
      b.name = "Subject 1";
      b.shortName = "-";
      b.color = e.getRandomColor();
      b.position = e.maxPos(obj.notDel(this._t().subjects)) + 1;
      g.addEntities(e.subject, [b], { mA: this.mA });
      return b;
    };
    f.prototype.isEditCards = function () {
      return this.mode === g.activityMode.editCards;
    };
    f.prototype.isCopy = function () {
      return !!this.options.isCopy;
    };
    f.prototype.getCount = function () {
      return this.count;
    };
    f.prototype.getSelectedData = function () {
      var b = this.subjectCombo.getValue();
      b = filter.getTypeAndId(b)[1];
      b || (b = this.createNewSubject().id);
      var d = this.lengthCombo.getValue();
      return {
        subjectId: {
          values: [b],
          type: b === filter.currentId ? g.selType.current : g.selType.change,
        },
        teacherIds: this.getSelectedValues(this.teacherSelector.selected),
        groupIds: this.getSelectedValues(this.groupSelector.selected),
        lenId: {
          values: [d],
          type: d === filter.currentId ? g.selType.current : g.selType.change,
        },
        roomIds: this.getSelectedValues(this.roomSelector.selected),
        moreRoomIds: this.getSelectedValues(this.moreRoomSelector.selected),
      };
    };
    f.prototype.emptyGroupName = function () {
      return "-";
    };
    return f;
  })(g.windowView);
  g.activityView = p;
  (function (g) {
    g[(g.onLoad = 0)] = "onLoad";
    g[(g.classChange = 1)] = "classChange";
    g[(g.moreChange = 2)] = "moreChange";
  })(g.groupMode || (g.groupMode = {}));
  g.selType = { current: 0, change: 1, addChange: 2 };
  g.activityMode = { default: 0, editCards: 1 };
})(m || (m = {}));
(function (g) {
  var p = (function (b) {
    function d(d, g) {
      d = b.call(this, d, g) || this;
      d.prepareExamples = !1;
      d.isFirstLoad = !0;
      d.lastDateFilter = h.recent;
      d.files = [];
      d.filtered = [];
      d.mode = f.open;
      d.olderFilters = [
        h.oneYearOld,
        h.twoYearsOld,
        h.threeYearsOld,
        h.fourYearsOld,
        h.fiveYearsOld,
      ];
      d.init();
      return d;
    }
    __extends(d, b);
    d.prototype.init = function () {
      var b = this;
      this.win.minWidth = 380;
      this.win.minHeight = 200;
      this.win.width = 780;
      this.win.height = 400;
      this.win.init();
      this.win.setHelp("#open");
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.find(".timetablesGridToolbar"),
          desc: e.file,
          getColumns: this.getColumns,
          gridOptions: { multiSelect: !0 },
          getEntities: this.getEntities,
          getSelectedId: this.getSelectedId,
          beforeDelete: this.beforeDelete,
        }),
      );
      var d = this.options.gridBar;
      d.openClick.add(function (d, f) {
        return b.onOpenClick(d);
      });
      d.editClick.add(function (d, f) {
        if (b.isMerge()) b.onMerge(d);
        else b.onOpenClick(d);
      });
      d.renameClick.add(function (d, f) {
        return b.onRename();
      });
      d.mergeClick.add(function (d, f) {
        return b.onMerge(d);
      });
      this.options.grid.selectionChange.add(function (d) {
        b.setButtons(d);
      });
      this.timetableFilter = this.find(".timetableFilter");
      this.dateCombo = new c.combo(ui.find(".dateCombo", this.timetableFilter));
      this.tagsCombo = new c.combo(ui.find(".tagsCombo", this.timetableFilter));
      this.countLabel = ui.find(".countLabel", this.timetableFilter);
      this.dateCombo.bind(
        [
          [h.all + "", "All timetables"],
          c.combo.hrPair,
          [h.recent + "", "Recent"],
          [h.pastYear + "", "Past year"],
          [h.oneYearOld + "", "Older than 1 year"],
          [h.twoYearsOld + "", "Older than 2 years"],
          [h.threeYearsOld + "", "Older than 3 years"],
          [h.fourYearsOld + "", "Older than 4 years"],
          [h.fiveYearsOld + "", "Older than 5 years"],
          c.combo.hrPair,
          [h.published + "", "Published"],
          [h.notPublished + "", "Not published"],
          c.combo.hrPair,
          [h.deleted + "", "Recently deleted"],
          c.combo.hrPair,
          [h.examples + "", "Examples"],
        ],
        h.recent + "",
      );
      this.bindTags(this.getTagOptions([]));
      this.dateCombo.change.add(function (d, f) {
        return b.onDateChange(num.toInt(f));
      });
      this.tagsCombo.change.add(function (d, f) {
        return b.onTagsChange(f);
      });
    };
    d.prototype.getColumns = function (b, d) {
      var f = this;
      b = new c.gridColumn(d, "", "published");
      b.setHeaderFunc = function (b) {
        ui.setWidth(b.el, 20);
      };
      b.setCellFunc = function (b, d) {
        ui.setWidth(b.el, 20);
        d = b.tr.data;
        var k = d.published,
          g = svg.tag("svg", "timetableIcon " + (k ? "publishState" : "")),
          l = svg.tag("use");
        svg.setXlink(l, k ? "webD" : "timetableD");
        g.appendChild(l);
        k = (l = k && !d.deleted) ? ui.setTabIndex(ui.getTag("a"), -1) : g;
        l &&
          (ui.setAttribute(
            ui.setAttribute(
              k,
              "href",
              f.mA.url.getPage("/publish/?id=" + d.id),
            ),
            "target",
            "_blank",
          ),
          ui.tap(k, function (b) {
            return ui.stopPropagation(b);
          }),
          ui.append(g, k));
        b.el.style.textAlign = "center";
        (d = l ? "Open published page" : "") && ui.hint(k, d, c.hintPos.right);
        ui.append(k, b.el);
      };
      var k = new c.gridColumn(d, "Name", "name");
      k.setHeaderFunc = function (b) {
        return !0;
      };
      k.setCellFunc = function (b, d) {
        var f = d.name,
          k =
            0 < d.tags.length
              ? " title='" + arr.joinCommaSpace(d.tags) + "'"
              : "",
          g = "";
        d.deleted &&
          ((f = str.wrapTag(f, "i")),
          15 <= date.diffDay(date.now(), d.updatedAt) &&
            (g = " class='profErr'"));
        if (k || g)
          f = str.wrap(f, "<span".concat(g).concat(k, ">"), "</span>");
        ui.setHtml(b.el, f);
      };
      var g = new c.gridColumn(d, "Description", "description");
      g.setHeaderFunc = function (b) {
        return !0;
      };
      g.setCellFunc = function (b, d) {
        ui.setHtml(
          b.el,
          '<div class="fileDescription">' +
            (d.description ? d.description : "&nbsp;") +
            "</div>",
        );
      };
      var q = new c.gridColumn(d, "Last modified", "updatedAt");
      q.setCellFunc = function (b, d) {
        ui.setWidth(b.el, 90);
        f.setDate(b, d.updatedAt);
      };
      q.setHeaderFunc = function (b) {
        ui.setWidth(b.el, 90);
      };
      d = new c.gridColumn(d, "Created", "createdAt");
      d.setCellFunc = function (b, d) {
        ui.setWidth(b.el, 90);
        f.setDate(b, d.createdAt);
      };
      d.setHeaderFunc = function (b) {
        ui.setWidth(b.el, 90);
      };
      return [b, k, g, q, d];
    };
    d.prototype.setDate = function (b, d) {
      var f =
        new Date(d.getTime()).setHours(0, 0, 0, 0) ===
        date.now().setHours(0, 0, 0, 0)
          ? date.formatTime(d, { removeSeconds: !0 })
          : g.getShortDate(d);
      ui.setHtml(
        b.el,
        '<span title="'.concat(g.getDateTime(d), '">').concat(f, "</span>"),
      );
    };
    d.prototype.setMode = function (b) {
      var d = this.options.gridBar,
        f = b === g.openMode.merge,
        k = b === g.openMode.examples;
      f
        ? (d.renameButton.hide(), d.removeButton.hide())
        : (d.renameButton.show(),
          d.removeButton.show(),
          d.renameButton.show(!1),
          d.removeButton.show(!1));
      d.openButton.show(!f);
      d.mergeButton.show(f);
      this.options.grid && (this.options.grid.options.multiSelect = !f && !k);
      if (b === this.mode) return !1;
      this.mode = b;
      k
        ? this.dateCombo.setValue(h.examples + "")
        : this.dateCombo.setValue(this.lastDateFilter + "");
      return (this.options.grid.isDirty = !0);
    };
    d.prototype.openMode = function (b) {
      this.setMode(b);
      this.open();
    };
    d.prototype.openFilter = function (b) {
      this.dateCombo.setValue(b + "");
      this.rememberDateFilter(b);
      this.setMode(f.open);
      this.open();
    };
    d.prototype.open = function () {
      this.title(
        this.isMerge() ? "Select a timetable to merge with" : "Open timetable",
      );
      b.prototype.open.call(this);
      this.loadFiles();
      this.bind();
      this.updateHashOnDateChange(this.dateCombo.getNumberValue());
      var d = this.viewer().hash.get("tag") || this.lastTagFilter;
      d &&
        (this.rememberTagFilter(d),
        this.removeTagHash(),
        this.viewer().hash.add([["tag", d]]));
    };
    d.prototype.getEntities = function () {
      return this.filtered;
    };
    d.prototype.bind = function (b, d) {
      void 0 === b && (b = !1);
      void 0 === d && (d = !0);
      var f = this.options.grid;
      b && (f.isDirty = !0);
      this.win.isOpen &&
        (f.isDirty && this.setFiltered(),
        g.bindGrid(this.options, { focus: d }),
        this.setButtons(f.selectedItems));
    };
    d.prototype.bindTags = function (b) {
      var d = 1 < b.length;
      this.tagsCombo.bind(b, d ? this.viewer().hash.get("tag") : "");
      ui.toggle(this.tagsCombo.el, d);
    };
    d.prototype.getTagOptions = function (b) {
      b = filter.getTagsForFiles(b).map(function (b) {
        return [b.toLowerCase(), str.htmlDecode(b)];
      });
      arr.insert(b, ["", "Filter by tags"], 0);
      return b;
    };
    d.prototype.setFiltered = function () {
      var b = this,
        d = this.getFilteredByDate();
      this.bindTags(this.getTagOptions(d));
      var f = this.tagsCombo.getValue();
      this.filtered = d.filter(function (d) {
        return b.filterByTag(d, f);
      });
      ui.setText(this.countLabel, "Count: " + this.filtered.length);
    };
    d.prototype.getFiles = function () {
      return this.files.concat(this.getExamples());
    };
    d.prototype.getFilteredByDate = function () {
      for (
        var b = this.dateCombo.getNumberValue(),
          d = this._t().id,
          f = [],
          g = [],
          t = [],
          w = 0,
          u = this.getFiles();
        w < u.length;
        w++
      ) {
        var x = u[w];
        (this.isMerge() && x.id === d) ||
          (this.filterByDate(x, b) && f.push(x),
          x.deleted ||
            (x.type === e.timetableType.example ? t.push(x) : g.push(x)));
      }
      if (b === h.recent && 3 > f.length) {
        b = date.now();
        var y = date.addDays(b, -365);
        b = g.filter(function (b) {
          return b.updatedAt > y;
        });
        f = arr.take(0 < b.length ? b : g, 3);
        0 === f.length && (f = t);
      }
      return f;
    };
    d.prototype.filterByDate = function (b, d) {
      var f = d === h.all,
        k = b.type === e.timetableType.example,
        g = e.isDemoSchool(this.viewer().schoolId());
      if (f) return (!k || g) && !b.deleted;
      if (d === h.examples) return k;
      if (d === h.deleted) return !!b.deleted;
      if ((k && !g) || b.deleted) return !1;
      if (d === h.published) return b.published;
      if (d === h.notPublished) return !b.published;
      f = [90, 365, 365, 730, 1095, 1460, 1825];
      d = [
        h.recent,
        h.pastYear,
        h.oneYearOld,
        h.twoYearsOld,
        h.threeYearsOld,
        h.fourYearsOld,
        h.fiveYearsOld,
      ].indexOf(d);
      return -1 !== d
        ? ((k = date.now()),
          (f = date.addDays(k, -f[d])),
          0 === d || 1 === d ? b.updatedAt > f : b.updatedAt < f)
        : !1;
    };
    d.prototype.filterByTag = function (b, d) {
      return "" === d
        ? !0
        : !!b.tags.find(function (b) {
            return d === b.toLowerCase();
          });
    };
    d.prototype.getSelectedId = function (b) {
      return this._t().id;
    };
    d.prototype.getExamples = function () {
      if (!this.prepareExamples) {
        for (var b = 0, d = g.examples; b < d.length; b++) {
          var f = d[b];
          f.type = e.timetableType.example;
          f.createdAt = new Date(2022, 0, 1, 0, 0, 0);
          f.updatedAt = new Date(2022, 0, 1, 0, 0, 0);
          f.published = !0;
          f.tags || (f.tags = []);
        }
        this.prepareExamples = !0;
      }
      return g.examples;
    };
    d.prototype.reset = function () {
      0 < this.files.length &&
        ((this.files = []),
        (this.filtered = []),
        (this.lastDateFilter = h.recent),
        (this.lastTagFilter = void 0),
        (this.options.grid.isDirty = !0),
        g.bindGrid(this.options, { focus: !1 }));
    };
    d.prototype.loadFiles = function (b) {
      var d = this;
      void 0 === b && (b = !1);
      if (!b || this.isFirstLoad) {
        if (this.isFirstLoad) {
          this.isFirstLoad = !1;
          var f = g.getFilesFromStorage(this.viewer());
          void 0 !== f && (this.files = f.slice());
        }
        f = "schools/" + this.user().schoolId + "/files/";
        this.viewer().get(f, {
          attempts: 5,
          done: function (f) {
            return d.onFilesReceived(f, b);
          },
        });
      }
    };
    d.prototype.onFilesReceived = function (b, d) {
      c.checkSuccess(b, this.viewer(), !d) &&
        ((b = b.data),
        obj.preps(b, e.file),
        obj.eqArr(this.files, b, e.file) ||
          (g.saveFilesInStorage(this.viewer(), b),
          (this.files = b.slice()),
          this.bind(!0)));
    };
    d.prototype.onOpenClick = function (b) {
      if (this.options.grid.hasSelection() && !this.viewer().isSave())
        if (new g.saveM(this.mA).loseChg(!1)) {
          var d = this.options.grid.lastSelected();
          this.win.close();
          d = new a.openOptions(d.id, d.updatedAt, a.openM.o);
          d.ev = b;
          this.viewer().layout.openTimetable(d);
        } else this.win.close();
    };
    d.prototype.onRename = function () {
      var b = this.options.grid;
      b.hasSelection() &&
        this.options.gridBar.renameButton.isVisible() &&
        (this.setCurrent(b.lastSelected()),
        (this.mA.docView().mode = g.docMode.quickEdit),
        this.mA.docView().open());
    };
    d.prototype.onMerge = function (b) {
      if (this.options.grid.hasSelection() && !this.viewer().isSave()) {
        var d = this.options.grid.lastSelected();
        d = new a.openOptions(d.id, d.updatedAt, a.openM.m);
        d.ev = b;
        this.win.close();
        this.viewer().layout.openTimetable(d);
      }
    };
    d.prototype.beforeDelete = function (b, d, f, g) {
      var k = this;
      b = { continue: !1 };
      if (!this.allowDel(f)) return b;
      d = this.isDeleted(f);
      g = this.options.grid.lastSelected();
      f = e.ids(f);
      if (
        !d &&
        !this.viewer().confirm(
          1 === f.length
            ? 'Are you sure you want to delete "'.concat(g.name, '" timeteble?')
            : "Are you sure you want to delete ".concat(
                f.length,
                " timetables?",
              ),
        )
      )
        return b;
      d
        ? this.viewer().post("timetables/undelete", f, {
            state: f,
            done: function (b) {
              return k.onDeletedDone(b, !0);
            },
          })
        : this.viewer().delete("timetables/", f, {
            state: f,
            done: function (b) {
              return k.onDeletedDone(b, !1);
            },
          });
      return b;
    };
    d.prototype.onDeletedDone = function (b, d) {
      if (c.checkSuccess(b, this.viewer())) {
        var f = b.state;
        (b = b.data && b.data.failedIds) &&
          0 < b.length &&
          (arr.removes(f, b),
          this.inf().err(
            "Some timetables failed to be ".concat(
              d ? "undeleted" : "deleted",
              ". ",
            ) + c.tryAgain,
          ));
        if (0 < f.length) {
          b = [];
          for (var k = 0, g = this.getFiles(); k < g.length; k++) {
            var q = g[k];
            arr.has(f, q.id) ? (q.deleted = !d) : q.deleted || b.push(q);
          }
          this.bind(!0);
          this.loadFiles();
          arr.has(f, this.viewer().t.id) &&
            ((q = d
              ? { id: this.viewer().t.id, updated: void 0 }
              : arr.first(b) || { id: str.id(), updatedAt: void 0 }),
            (d = new a.openOptions(q.id, q.updatedAt, a.openM.o)),
            (d.is1Open = !0),
            this.viewer().layout.openTimetable(d));
        }
      }
    };
    d.prototype.setButtons = function (b) {
      var d =
        (this.mode === f.open || this.mode === f.examples) && this.allowDel(b);
      b = this.isDeleted(b);
      var k = this.options.gridBar;
      k.removeButton.show(d);
      k.removeButton.setText(b ? "Undelete" : "Delete");
      k.renameButton.show(d && !b);
    };
    d.prototype.isDeleted = function (b) {
      return b.every(function (b) {
        return b.deleted;
      });
    };
    d.prototype.allowDel = function (b) {
      return 0 === b.length ||
        b.some(function (b) {
          return b.type === e.timetableType.example;
        })
        ? !1
        : this.allow().freeOrPurchasedCheck();
    };
    d.prototype.onDateChange = function (b) {
      this.rememberDateFilter(b);
      this.updateHashOnDateChange(b);
      this.tagsCombo.setValue("");
      this.removeTagHash();
      this.bind(!0);
      -1 !== this.olderFilters.indexOf(b) && 20 < this.filtered.length
        ? this.inf().add(
            "Consider deleting older timetables to improve performance, e.g. use 'Ctrl + A' to select all timetables and then click Delete.",
          )
        : b === h.deleted &&
          0 < this.filtered.length &&
          this.inf().addTip(
            "Recently deleted timetables will be permanently deleted after 1 month of no usage.",
          );
    };
    d.prototype.rememberDateFilter = function (b) {
      this.mode !== g.openMode.examples &&
        b !== h.examples &&
        (this.lastDateFilter = b);
    };
    d.prototype.updateHashOnDateChange = function (b) {
      this.removeDateHashes();
      this.addKey(g.dateHashes[b]);
    };
    d.prototype.addKey = function (b) {
      this.viewer().hash.addKey(b);
    };
    d.prototype.onTagsChange = function (b) {
      this.rememberTagFilter(b);
      this.removeTagHash();
      "" !== b && this.viewer().hash.add([["tag", b]]);
      this.bind(!0);
    };
    d.prototype.rememberTagFilter = function (b) {
      this.lastTagFilter = b;
    };
    d.prototype.onClose = function () {
      this.removeDateHashes();
      this.removeTagHash();
    };
    d.prototype.removeDateHashes = function () {
      this.viewer().hash.dels(g.dateHashes);
    };
    d.prototype.removeTagHash = function () {
      this.viewer().hash.del("tag");
    };
    d.prototype.isMerge = function () {
      return this.mode === g.openMode.merge;
    };
    d.prototype.onResize = function () {
      this.onSizeChanged(
        ui.getComputedWidth(this.win.content),
        ui.getComputedHeight(this.win.content),
      );
      b.prototype.onResize.call(this);
    };
    d.prototype.onSizeChanged = function (b, d) {
      d = d - ui.getBoxHeight(this.timetableFilter, !0) - 20;
      this.options.grid.setViewPortHeight(d);
      ui.setWidthHeight(this.options.gridBar.el, b - 15, d);
      ui.setHeight(this.options.gridBar.barEl, d);
    };
    return d;
  })(g.windowView);
  g.docsView = p;
  var h = {
    all: 0,
    recent: 1,
    pastYear: 2,
    oneYearOld: 3,
    twoYearsOld: 4,
    threeYearsOld: 5,
    fourYearsOld: 6,
    fiveYearsOld: 7,
    published: 8,
    notPublished: 9,
    deleted: 10,
    examples: 11,
  };
  g.dateHashes =
    "all recent pastyear old1 old2 old3 old4 old5 published notpublished deleted examples".split(
      " ",
    );
  var f;
  (function (b) {
    b[(b.open = 1)] = "open";
    b[(b.examples = 2)] = "examples";
    b[(b.merge = 3)] = "merge";
  })((f = g.openMode || (g.openMode = {})));
  (function (b) {
    b[(b._new = 0)] = "_new";
    b[(b.quickEdit = 1)] = "quickEdit";
    b[(b.saveAs = 2)] = "saveAs";
    b[(b.edit = 3)] = "edit";
  })(g.docMode || (g.docMode = {}));
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.win.width = 640;
      this.win.resizable = !1;
      this.win.init();
      this.name = new c.input(this.find(".name"));
      this.description = new c.input(this.find(".desc"));
      this.schoolNameRow = this.find(".schoolNameRow");
      this.yearRow = this.find(".yearRow");
      this.schoolName = new c.input(ui.find(".schoolName", this.schoolNameRow));
      var d = ui.find(".schoolNameHint", this.schoolNameRow);
      this.year = new c.input(ui.find(".schoolYear", this.yearRow));
      var f = ui.find(".schoolYearHint", this.yearRow),
        q = date.now().getFullYear();
      ui.hint(d, "Visible when printing/publishing timetable", c.hintPos.left);
      ui.hint(
        f,
        ""
          .concat("Visible when printing/publishing timetable", ", e.g. '")
          .concat(q, "/")
          .concat(q + 1, "'"),
        c.hintPos.left,
      );
      this.moreRow = this.find(".moreRow");
      this.moreOptions = this.find(".moreOptions");
      this.getMore(this.find(".more"), this.moreOptions, { moreText: "More" });
      this.idRow = ui.find(".timetableIdPanel", this.moreOptions);
      this.idControl = g.getIdControl(this.mA, {
        container: this.idRow,
        idLabel: "Timetable id",
      });
      this.htmlRow = ui.find(".htmlRow", this.moreOptions);
      this.htmlBox = new c.input(ui.find(".htmlBox", this.htmlRow));
      this.cssRow = ui.find(".cssRow", this.moreOptions);
      this.cssBox = new c.input(ui.find(".cssBox", this.cssRow));
      this.tagsRow = ui.find(".tagsRow", this.moreOptions);
      this.tagsBox = new c.input(ui.find(".tagsBox", this.tagsRow));
      this.modifiedRow = ui.find(".modifiedRow", this.moreOptions);
      this.modifiedDate = ui.find(".modifiedDate", this.modifiedRow);
      this.createdRow = ui.find(".createdRow", this.moreOptions);
      this.createdDate = ui.find(".createdDate", this.createdRow);
      d = this.find(".customHtmlHint");
      f = this.find(".customCssHint");
      ui.hint(
        d,
        "Add school logo when printing or on published web page",
        c.hintPos.left,
      );
      ui.hint(
        f,
        "Change font size, font family, colors and similar to match your school branding",
        c.hintPos.left,
      );
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.setType(g.subType.ok);
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      this.init();
      var b = this.isEditMode(),
        d = b || this.isQuickEdit(),
        f = "Create a new timetable";
      this.isSaveAs()
        ? (f = "Create a copy of timetable")
        : d && (f = "Edit timetable");
      ui.toggles(
        [this.schoolNameRow, this.yearRow, this.htmlRow, this.cssRow],
        b,
      );
      ui.toggles(
        [
          this.moreRow,
          this.moreOptions,
          this.tagsRow,
          this.idRow,
          this.modifiedRow,
          this.createdRow,
        ],
        d,
      );
      this.title(f);
      f = this.isQuickEdit() ? this.getCurrent() : this._t();
      var q = f.name;
      g.setText(
        this.name,
        this.isNew() ? q + " new" : this.isSaveAs() ? q + " copy" : q,
      );
      g.setText(this.description, this.isNew() ? "" : f.description);
      d &&
        (g.setText(this.tagsBox, arr.joinCommaSpace(f.tags)),
        ui.setText(this.modifiedDate, g.getDateTime(f.updatedAt)),
        ui.setText(this.createdDate, g.getDateTime(f.createdAt)),
        this.idControl.setId(f.id));
      b &&
        (g.setText(this.schoolName, f.schoolName),
        g.setText(this.year, f.year),
        g.setText(this.htmlBox, f.html),
        g.setText(this.cssBox, f.css));
      this.win.setHelp(
        this.isNew() ? "#new" : this.isSaveAs() ? "#copy" : "#timetable-info",
      );
      h.prototype.open.call(this);
    };
    f.prototype.ok = function () {
      var b = this;
      if (this.isValid()) {
        var d = this.name.getValue(),
          f = this.description.getValue();
        if (this.isNew() || this.isSaveAs())
          (g.createTimetable(this.mA, {
            isNew: this.isNew(),
            name: d,
            description: f,
          }),
            this.xOnOk());
        else {
          var q = this.isQuickEdit() ? this.getCurrent() : this._t();
          d = {
            name: d,
            description: f,
            tags: str.split(this.tagsBox.getValue(), ","),
          };
          if (
            this.isEditMode() &&
            ((d.schoolName = this.schoolName.getValue()),
            (d.year = this.year.getValue()),
            (d.html = this.htmlBox.getValue()),
            (d.css = this.cssBox.getValue()),
            e.isDemoSchool(q.schoolId))
          ) {
            this.saveExampleCopy(d);
            return;
          }
          this.viewer().patch("timetables/" + q.id + "/", d, {
            done: function (d) {
              return b.onEditResponse(d);
            },
            state: this.mode,
          });
        }
      }
    };
    f.prototype.onEditResponse = function (b) {
      if (c.checkSuccess(b, this.viewer())) {
        var d = b.data;
        b = b.state;
        obj.prep(d, e.file);
        obj.copyTo(d, this.getCurrent(), e.file);
        this._t().id === d.id &&
          ((this._t().name = d.name),
          (this._t().description = d.description),
          (this._t().tags = d.tags),
          this.viewer().title.set(),
          b === g.docMode.edit &&
            ((this._t().schoolName = d.schoolName),
            (this._t().year = d.year),
            (this._t().html = d.html),
            (this._t().css = d.css),
            this.mA.vA.skins.setSkin(
              this.mA.vA.config.user.skin,
              this._t(),
              void 0,
            ),
            this.mA.printView().refresh()));
        this.refreshDocsAndClose();
      }
    };
    f.prototype.refreshDocsAndClose = function () {
      var b = this.mA.docsView();
      b.bind(!0);
      b.loadFiles();
      this.xOnOk();
    };
    f.prototype.saveExampleCopy = function (b) {
      var d = e.getChangedProps(e.timetable, this._t(), b);
      if (0 < d.length) {
        var f = g.newUpdateState(
          e.timetable,
          [this._t()],
          { mA: this.mA, changedProps: d },
          "Update info",
        );
        obj.copyValuesTo(b, this._t(), e.timetable, {
          deep: !1,
          propFunc: function (b) {
            return d;
          },
        });
        g.addState(f, { mA: this.mA });
        this.mA.memory.save();
        this.xOnOk();
      }
    };
    f.prototype.isValid = function () {
      return this.name.getValue()
        ? !0
        : (this.inf().add("Timetable name is required."), !1);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["info"]);
    };
    f.prototype.getCurrent = function () {
      return this.mA.getCurrent(e.file);
    };
    f.prototype.isNew = function () {
      return this.mode === g.docMode._new;
    };
    f.prototype.isQuickEdit = function () {
      return this.mode === g.docMode.quickEdit;
    };
    f.prototype.isEditMode = function () {
      return this.mode === g.docMode.edit;
    };
    f.prototype.isSaveAs = function () {
      return this.mode === g.docMode.saveAs;
    };
    return f;
  })(g.windowView);
  g.docView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.win.width = 640;
      this.title("Open timetable from a file");
      this.win.init();
      this.win.setHelp("#file");
      this.fileUpload = new c.input(this.find(".fileUpload"));
      this.toolbar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.toolbar.setType(g.subType.ok);
      this.toolbar.okClick.add(function (d) {
        return b.ok();
      });
      this.setOkButton();
      this.toolbar.okBtn.changeUseId("uploadFileD");
      this.toolbar.okBtn.setText("Open");
      this.init = c.no;
    };
    f.prototype.open = function () {
      this.init();
      this.fileUpload.reset();
      h.prototype.open.call(this);
    };
    f.prototype.ok = function () {
      var b = this,
        d = this.fileUpload.el.files;
      if (d && 0 !== d.length) {
        for (var f = new FormData(), g = 0; g < d.length; g++) {
          var l = d[g],
            n = l.name;
          f.append(n, l, n);
        }
        d = "schools/" + this.user().schoolId + "/upload/";
        this.viewer().post(d, f, {
          el: this.toolbar.okBtn.el,
          contentType: "",
          done: function (d) {
            return b.onUploadEnd(d);
          },
        });
        this.setOkButton(!0);
      } else this.inf().add("First, choose timetable file from your disc.");
    };
    f.prototype.onUploadEnd = function (b) {
      this.setOkButton();
      if (c.checkSuccess(b, this.viewer())) {
        b = b.data;
        b.id = str.id();
        obj.each(e.timetable, b, function (b, d) {
          obj.setState(d, obj.entityState.added);
        });
        var d = date.now();
        b.createdAt = b.updatedAt = d;
        b.creatorId = b.editorId = this.user().id;
        new a.opener(this.viewer()).changeTo(b, e.openType.upload);
        this.win.close();
      }
    };
    f.prototype.setOkButton = function (b) {
      void 0 === b && (b = !1);
      this.toolbar.okBtn.enable(!b);
      this.toolbar.okBtn.setText(b ? "Opening..." : "Open");
    };
    return f;
  })(g.windowView);
  g.uploadView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.title("Save as spreadsheet(s)");
      this.win.width = 580;
      this.win.resizable = !1;
      this.win.init();
      this.win.setHelp("#save-html");
      var d = [
        [g.exportType.view + "", "Current timetable view"],
        [g.exportType.individuals + "", "All related individual timetables"],
        [g.exportType.availability + "", "Availability timetable"],
      ];
      this.typesCombo = new c.combo(this.find(".htmlCombo"));
      this.typesCombo.bind(d);
      d = this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      d.setType(g.subType.ok);
      d.okBtn.setText("Download");
      d.okBtn.setTabIndex(0);
      d.okBtn.changeClass("downloadButton");
      d.okBtn.changeUseId("downloadD");
      d.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      this.init();
      h.prototype.open.call(this);
    };
    f.prototype.ok = function () {
      var b = this;
      if (this.allow().paidOrExampleCheck()) {
        var d = this.typesCombo.getNumberValue();
        if (d === g.exportType.availability) this.downloadAvailability();
        else {
          d = d === g.exportType.view;
          var f = new g.htmlExport(this.mA, !d);
          d
            ? this.downloadHtml(
                this._t().name,
                f.getHtmlDoc(f.getTimetableContent(!1, !0)),
              )
            : (f.htmlsDone.add(function (d) {
                return b.onHtmlsDone(d);
              }),
              f.startHtmls());
          this.xOnOk();
        }
      }
    };
    f.prototype.onHtmlsDone = function (b) {
      this.downloadHtml(this._t().name, b);
    };
    f.prototype.downloadHtml = function (b, d) {
      ui.download(b + ".html", d);
      this.inf().add(
        "<ol><li>Open the downloaded HTML file</li><li>Create a rectangular marquee around the timetable(s)</li><li>Copy and paste into a spreadsheet app like Excel or Sheets</li></ol>" +
          g.guide("#save-html"),
      );
    };
    f.prototype.downloadAvailability = function () {
      ui.download(
        this._t().name + "-availability.tsv",
        g.getFreeTimetable(this.mainView()),
      );
      this.inf().add(
        "Open the downloaded file in a spreadsheet app like Excel or Sheets. " +
          g.guide("#availability-timetable"),
      );
    };
    return f;
  })(g.windowView);
  g.htmlView = p;
  g.exportType = { view: 0, individuals: 1, availability: 2 };
})(m || (m = {}));
(function (g) {
  g.formatType = {
    powerSchool: 0,
    iSAMS: 1,
    smartSchoolCSV: 2,
    siged: 3,
    stars: 4,
    smartSchool: 5,
  };
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.title("Export timetable to other software formats");
      this.win.width = 580;
      this.win.resizable = !1;
      this.win.init();
      this.win.setHelp("#save-csv");
      var d = [
        [g.formatType.powerSchool + "", "PowerSchool"],
        [g.formatType.iSAMS + "", "iSAMS"],
        [g.formatType.smartSchool + "", "SmartSchool"],
        [g.formatType.smartSchoolCSV + "", "SmartSchool CSV"],
        [g.formatType.siged + "", "Siged"],
        [g.formatType.stars + "", "Stars [Preview]"],
      ];
      this.formatCombo = new c.combo(this.find(".csvFormatCombo"));
      this.formatCombo.bind(d);
      this.includeHeaderRow = this.find(".includeHeaderRow");
      this.includeHeaderCheck = new c.checkbox(
        this.find(".includeHeaderCheck"),
      );
      this.groupRow = this.find(".groupRow");
      this.includeGroupCheck = new c.checkbox(this.find(".includeGroupCheck"));
      this.schoolIdRow = this.find(".schoolIdRow");
      this.schoolIdBox = new c.input(ui.find(".schoolIdBox", this.schoolIdRow));
      this.termIdRow = this.find(".termIdRow");
      this.termIdBox = new c.input(ui.find(".termIdBox", this.termIdRow));
      d = this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.blockPrefixRow = this.find(".blockPrefixRow");
      this.blockPrefixBox = new c.input(
        ui.find(".blockPrefixBox", this.blockPrefixRow),
      );
      this.switchSubjectRow = this.find(".switchSubjectRow");
      this.switchSubjectCheck = new c.checkbox(
        ui.find(".switchSubjectCheck", this.switchSubjectRow),
      );
      d.setType(g.subType.ok);
      var f = d.okBtn;
      f.setText("Download");
      f.changeClass("downloadButton");
      f.changeUseId("downloadD");
      d.okClick.add(function (d) {
        return b.ok(d);
      });
      this.formatCombo.change.add(function (d, f) {
        return b.onFormatChange();
      });
    };
    f.prototype.open = function () {
      this.init();
      this.onFormatChange();
      h.prototype.open.call(this);
    };
    f.prototype.onFormatChange = function () {
      var b = this.formatCombo.getNumberValue(),
        d = b === g.formatType.powerSchool,
        f = b === g.formatType.stars;
      b = b === g.formatType.smartSchool;
      ui.toggle(this.includeHeaderRow, !b);
      ui.toggle(this.groupRow, !d && !f && !b);
      ui.toggles(
        [
          this.schoolIdRow,
          this.termIdRow,
          this.blockPrefixRow,
          this.switchSubjectRow,
        ],
        d,
      );
    };
    f.prototype.ok = function (b) {
      if (this.allow().purchasedCheck(!0)) {
        var d = this.formatCombo.getNumberValue(),
          f = d === g.formatType.powerSchool,
          q = d === g.formatType.siged,
          l = d === g.formatType.smartSchool;
        b = {
          timetable: this._t(),
          type: d,
          periodCount: e.periodsCount(this._t()),
          includeHeader: this.includeHeaderCheck.isChecked(),
          includeGroupColumn: f ? !1 : this.includeGroupCheck.isChecked(),
          schoolId: this.schoolIdBox.getValue(),
          termId: this.termIdBox.getValue(),
          blockPrefix: this.blockPrefixBox.getValue(),
          includePeriodTimes: keys.ctrl(b) && q,
          includeEmptyClasses: keys.ctrl(b) && l,
          switchSubjectNameAndShortName: this.switchSubjectCheck.isChecked(),
        };
        f = f ? ".txt" : l ? ".xml" : ".csv";
        ui.download(this._t().name + f, g.getCustomFileContent(b));
        this.xOnOk();
      }
    };
    return f;
  })(g.windowView);
  g.csvView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.minWidth = 320;
      d.minHeight = 280;
      d.width = 640;
      d.height = 400;
      d.resizable = !0;
      d.isModal = !1;
      this.title("Manage views");
      d.init();
      d.setHelp("#manage-views");
      g.setManageForm(
        (this.options = {
          ctx: this,
          mA: this.mA,
          el: this.find(".viewGridToolbar"),
          desc: e.view,
          getColumns: this.getColumns,
          getEntities: this.getEntities,
          getSelectedId: this.getSelectedId,
          getNew: this.getNew,
          selectLast: !0,
          beforeDelete: this.beforeDelete,
          editWindow: new g.view(this.mA, "viewView"),
        }),
      );
      d = this.options.grid;
      d.canPaste = !1;
      d.selectionChange.add(function (d) {
        b.setButtons(d);
      });
      this.win.resize.add(function () {
        return b.onResize();
      });
      g.descChange.add(function (d) {
        return b.onChange(d);
      });
      this.inf().addTip(
        "Here you can create your own view, e.g. to display 5th graders or English teachers only.",
      );
    };
    f.prototype.getColumns = function (b, d) {
      var f = this,
        g = new c.gridColumn(b.grid, "Pos.", "position");
      g.setHeaderFunc = function (b) {
        ui.setWidth(b.el, 26);
      };
      g.setCellFunc = function (b, d) {
        f.setHiddenStyle(b.el, d);
        ui.setText(b.el, d.position + ".");
        ui.setWidth(b.el, 26);
      };
      var l = this.newColumn(d, "Type", "entityType");
      l.setHeaderFunc = function (b) {
        b.el.style.textAlign = "center";
      };
      l.setCellFunc = function (b, d) {
        ui.setWidth(b.el, 24);
        var k = ui.getTag("span");
        k.style.cursor = "pointer";
        var g = svg.tag("svg", "timetableIcon publishState"),
          l = svg.tag("use");
        svg.setXlink(l, r.getViewClassName(d.entityType - 1) + "D");
        g.appendChild(l);
        ui.append(g, k);
        ui.hint(
          k,
          "Switch to ".concat(d.name || "current view"),
          c.hintPos.right,
        );
        b.el.style.textAlign = "center";
        f.setHiddenStyle(g, d);
        ui.click(k, function (b) {
          return f.onIconClick(b, d);
        });
        ui.append(k, b.el);
      };
      var n = new c.gridColumn(b.grid, "Name", "name");
      n.setCellFunc = function (b, d) {
        f.setHiddenStyle(b.el, d);
        ui.setHtml(b.el, str.wrapTag(d.name, "b", d.isDefault));
      };
      b = new c.gridColumn(b.grid, "Short name", "shortName");
      b.setCellFunc = function (b, d) {
        f.setHiddenStyle(b.el, d);
        ui.setHtml(b.el, str.wrapTag(d.shortName, "b", d.isDefault));
      };
      var h = this.newColumn(d, "App", "hiddenInApp");
      h.setHeaderFunc = function (b) {
        b.el.style.textAlign = "center";
      };
      h.setCellFunc = function (b, d) {
        f.setHiddenStyle(b.el, d);
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.hiddenInApp ? e.minus : e.plus);
      };
      var w = this.newColumn(d, "Web", "hiddenOnWeb");
      w.setHeaderFunc = function (b) {
        b.el.style.textAlign = "center";
      };
      w.setCellFunc = function (b, d) {
        f.setHiddenStyle(b.el, d);
        b.el.style.textAlign = "center";
        ui.setText(b.el, d.hiddenOnWeb ? e.minus : e.plus);
      };
      d = this.newColumn(d, "Display", "entityIds");
      d.setCellFunc = function (b, d) {
        f.setHiddenStyle(b.el, d);
        var k = "",
          g = d.entityType,
          l = d.entityIds,
          q = d.excludedDayIds,
          n = d.excludedPeriodIds;
        d.isDefault ||
          ((d = e.getViewEntities(f._t(), g)),
          (l = e.byIds(d, l)),
          (l = e.shorts(l)),
          0 < q.length &&
            ((q = e.byIds(obj.notDel(f._t().days), q)),
            l.push.apply(
              l,
              q.map(function (b) {
                return str.wrapTag(b.shortName, "del");
              }),
            )),
          0 < n.length &&
            ((n = e.byIds(obj.notDel(f._t().periods), n)),
            l.push.apply(
              l,
              n.map(function (b) {
                return str.wrapTag(e.getPeriodShortName(b), "del");
              }),
            )),
          (k = arr.joinCommaSpace(l)));
        ui.setHtml(b.el, k);
      };
      l = [l, n, b, h, w, d];
      this.viewer().isDebug && arr.insert(l, g, 0);
      return l;
    };
    f.prototype.setHiddenStyle = function (b, d) {
      var f = d.hiddenInApp && d.hiddenOnWeb;
      b.style.opacity = f
        ? "0.4"
        : d.hiddenOnWeb
          ? "0.6"
          : d.hiddenInApp
            ? "0.8"
            : "1";
      b.style.fontStyle = f ? "italic" : "normal";
    };
    f.prototype.getEntities = function () {
      return e.getViews(this._t(), e.viewVisibility.all);
    };
    f.prototype.getSelectedId = function (b) {
      var d = this.current();
      if (d)
        return e.isPredefinedView(d)
          ? b.find(function (b) {
              return b.isDefault && b.entityType === d.entityType;
            }).id
          : d.id;
    };
    f.prototype.getNew = function () {
      var b = obj.newChildToUse(e.view, this._t());
      b.entityType = this.mainView().viewType().view.entityType;
      return b;
    };
    f.prototype.open = function () {
      this.init();
      h.prototype.open.call(this);
      g.bindGrid(this.options);
    };
    f.prototype.beforeDelete = function (b, d, f, g) {
      return f.find(function (b) {
        return e.isPredefinedView(b);
      })
        ? (this.mA.alert("Default view can't be deleted."), { continue: !1 })
        : { continue: !0, items: f };
    };
    f.prototype.setButtons = function (b) {
      b = b.filter(function (b) {
        return b.isDefault;
      });
      var d = !!b.find(function (b) {
        return e.isPredefinedView(b);
      });
      this.options.gridBar.removeButton.setVisibility(!d);
      this.options.gridBar.copyButton.setVisibility(0 === b.length);
    };
    f.prototype.onIconClick = function (b, d) {
      this.mainView().switcher.toView(d);
    };
    f.prototype.onChange = function (b) {
      b.desc === e.view && this.mainView().g.initSwitcher();
    };
    f.prototype.onResize = function () {
      this.onSizeChanged(
        ui.getComputedWidth(this.win.content),
        ui.getComputedHeight(this.win.content),
      );
      h.prototype.onResize.call(this);
    };
    f.prototype.onSizeChanged = function (b, d) {
      d -= 20;
      this.options.grid.setViewPortHeight(d);
      ui.setWidthHeight(this.options.gridBar.el, b - 15, d);
      ui.setHeight(this.options.gridBar.barEl, d);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["views"]);
    };
    return f;
  })(g.windowView);
  g.views = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.selectedEntities = [];
      b.excludedDays = [];
      b.excludedPeriods = [];
      b.init();
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.win.minWidth = 520;
      this.win.width = 680;
      this.win.resizable = !0;
      this.win.init();
      this.win.setHelp("#manage-views");
      this.name = new c.input(this.find(".name"));
      this.shortName = new c.input(this.find(".short"));
      this.shortUpd = new g.shortUpd(this.name, this.shortName);
      var d = [
        [e.viewVisibility.visible + "", "Visible"],
        [e.viewVisibility.hidden + "", "Hidden"],
        [e.viewVisibility.visibleInApp + "", "Hidden on the web"],
        [e.viewVisibility.visibleOnWeb + "", "Hidden in the app"],
      ];
      this.visibilityCombo = new c.combo(this.find(".visibilityCombo"));
      this.visibilityCombo.bind(d);
      this.typeLabel = this.find(".typeLabel");
      this.typeCombo = new c.combo(this.find(".typeCombo"));
      d = [e.type.class, e.type.teacher, e.type.room, e.type.subject].map(
        function (b) {
          return [b + "", e.getDefaultViewName(b - 1)];
        },
      );
      this.typeCombo.bind(d);
      this.typeCombo.change.add(function (d, f) {
        return b.onTypeChange(f);
      });
      this.displayLabel = this.find(".displayLabel");
      this.entitiesCombo = new c.combo(this.find(".entityCombo"));
      this.moreEntitiesButton = this.find(".moreEntityButton");
      this.entitiesSelector = g.getSelector({
        mA: this.mA,
        combo: this.entitiesCombo,
        moreButtonElement: this.moreEntitiesButton,
        useId: "classD",
        desc: e._class,
      });
      this.entitiesSelector.change.add(function (d) {
        return b.onEntitiesChange(d);
      });
      this.daysLabel = this.find(".excludedDaysLabel");
      this.daysCombo = new c.combo(this.find(".daysCombo"));
      this.moreDaysButton = this.find(".moreDaysButton");
      this.daysSelector = g.getSelector({
        mA: this.mA,
        combo: this.daysCombo,
        moreButtonElement: this.moreDaysButton,
        useId: "daysD",
        desc: e.day,
      });
      this.daysSelector.change.add(function (d) {
        return b.onDaysChange(d);
      });
      this.periodsLabel = this.find(".excludedPeriodsLabel");
      this.periodsCombo = new c.combo(this.find(".periodsCombo"));
      this.morePeriodsButton = this.find(".morePeriodsButton");
      this.periodsSelector = g.getSelector({
        mA: this.mA,
        combo: this.periodsCombo,
        moreButtonElement: this.morePeriodsButton,
        useId: "timetableD",
        desc: e.period,
      });
      this.periodsSelector.change.add(function (d) {
        return b.onPeriodsChange(d);
      });
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      var b = this.view();
      this.title(
        this.isNew()
          ? "Add view"
          : b.isDefault
            ? "Edit default view"
            : "Edit view",
      );
      this.shortUpd.set(b.name, b.shortName);
      this.bar.setAddOrEdit(this.isNew());
      this.visibilityCombo.setNumberValue(
        b.hiddenInApp && b.hiddenOnWeb
          ? e.viewVisibility.hidden
          : b.hiddenInApp || b.hiddenOnWeb
            ? b.hiddenInApp
              ? e.viewVisibility.visibleOnWeb
              : e.viewVisibility.visibleInApp
            : e.viewVisibility.visible,
      );
      var d = b.entityType;
      this.typeCombo.setValue(d + "");
      this.bindEntities(d);
      d = e.sortNotDel(this._t().days);
      this.excludedDays = e.byIds(d, this.view().excludedDayIds);
      this.daysSelector.bind(d, ["", "-"], this.excludedDays);
      d = e.defaultPeriods(this._t().periods);
      this.excludedPeriods = e.byIds(d, this.view().excludedPeriodIds);
      this.periodsSelector.bind(d, ["", "-"], this.excludedPeriods);
      ui.enables(
        [
          this.typeLabel,
          this.typeCombo.el,
          this.displayLabel,
          this.entitiesCombo.el,
          this.moreEntitiesButton,
          this.daysLabel,
          this.daysCombo.el,
          this.moreDaysButton,
          this.periodsLabel,
          this.periodsCombo.el,
          this.morePeriodsButton,
        ],
        !b.isDefault,
      );
      h.prototype.open.call(this);
    };
    f.prototype.bindEntities = function (b) {
      void 0 === b && (b = this.typeCombo.getNumberValue());
      this.entitiesSelector.moreButton.changeUseId(g.getUseId(b));
      this.entitiesSelector.desc = e.getViewEntityDesc(b) || e._class;
      b = e.getViewEntities(this._t(), b);
      this.selectedEntities = e.byIds(b, this.view().entityIds);
      var d = ["", this.view().isDefault ? "All" : "-"];
      this.entitiesSelector.bind(b, d, this.selectedEntities);
    };
    f.prototype.onTypeChange = function (b) {
      this.bindEntities();
    };
    f.prototype.onEntitiesChange = function (b) {
      this.selectedEntities = b;
    };
    f.prototype.onDaysChange = function (b) {
      this.excludedDays = e.sortNotDel(b);
    };
    f.prototype.onPeriodsChange = function (b) {
      this.excludedPeriods = e.sortNotDel(b);
    };
    f.prototype.ok = function () {
      var b = this.visibilityCombo.getNumberValue(),
        d = b === e.viewVisibility.hidden,
        f = d || b === e.viewVisibility.visibleOnWeb,
        g = d || b === e.viewVisibility.visibleInApp;
      b = this.view().isDefault;
      d = e.ids(this.selectedEntities);
      var l = e.ids(this.excludedDays),
        n = e.ids(this.excludedPeriods);
      f = {
        name: this.name.getValue(),
        shortName: this.shortName.getValue(),
        hiddenInApp: f,
        hiddenOnWeb: g,
        entityType: this.typeCombo.getNumberValue(),
        entityIds: b ? [] : d,
        excludedDayIds: b ? [] : l,
        excludedPeriodIds: b ? [] : n,
      };
      b ? this.saveDefaultChanges(f) : this.saveCustomChanges(f, d, l, n);
    };
    f.prototype.saveCustomChanges = function (b, d, f, q) {
      var k = this.isNew();
      f = 0 === f.length && 0 === q.length;
      if (
        0 !== d.length ||
        this.mA.confirm(
          "You haven't selected any resources to be displayed. Are you sure you want to continue?",
        )
      )
        (1 === d.length &&
          f &&
          this.inf().addTip(
            "Perhaps you want to switch to individual view instead? " +
              ui.linkMessage("#individual", "Read about individual views"),
          ),
          g.submit(this, b),
          k && this.mainView().switcher.toView(this.view()));
    };
    f.prototype.saveDefaultChanges = function (b) {
      b.isDefault = !0;
      b.position = this.view().position;
      var d = e.getDefaultViews(this._t()).find(function (d) {
          return d.entityType === b.entityType;
        }),
        f = e.sortNotDel(this._t().views).find(function (d) {
          return d.isDefault && d.entityType === b.entityType;
        });
      d = 0 < e.getChangedProps(e.view, d, b).length;
      f
        ? d
          ? g.submit(this, b)
          : (g.deleteEntities(
              e.view,
              [f],
              { mA: this.mA, reposition: !1 },
              "Update view",
            ),
            this.xOnOk())
        : d
          ? ((this.view().id = str.id()),
            obj.setAdd(this.view()),
            (this.options.isAdd = !0),
            g.submit(this, b, { reposition: !1 }))
          : this.xOnOk();
    };
    f.prototype.view = function () {
      return this.current();
    };
    return f;
  })(g.windowView);
  g.view = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.delIds = [];
      b.users = [];
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.minWidth = 480;
      d.minHeight = 400;
      d.width = 640;
      d.height = 400;
      this.title("Share with others");
      d.init();
      d.setHelp("#share-others");
      this.options = {
        ctx: this,
        mA: this.mA,
        el: d.content,
        desc: e.clientUser,
        getColumns: this.getColumns,
        getEntities: this.getEntities,
        getNew: this.getNew,
        beforeEditForm: this.beforeEdit,
        beforeDelete: this.beforeDelete,
        editWindow: this.mA.shareView(),
      };
      g.setManageForm(this.options);
      var f = this.options.grid;
      f.setViewPortHeight(ui.getComputedHeight(d.content));
      f.selectionChange.add(function (d) {
        b.setButtons(d);
      });
      this.loadUsers();
    };
    f.prototype.getColumns = function (b, d) {
      b = new c.gridColumn(d, "Name", "name");
      b.setCellFunc = function (b, d) {
        ui.setText(b.el, e.displayUser(d));
      };
      b.sortFunc = function (b, d) {
        return b.slice().sort(function (b, f) {
          return (d ? 1 : -1) * arr.sort(e.displayUser(b), e.displayUser(f));
        });
      };
      var f = new c.gridColumn(d, "Email", "email");
      d = new c.gridColumn(d, "Role", "role");
      d.setCellFunc = function (b, d) {
        ui.setText(b.el, e.rDisp(d));
      };
      d.sortFunc = function (b, d) {
        return e.sortByRole(b, d);
      };
      return [b, f, d];
    };
    f.prototype.open = function () {
      this.init();
      this.setButtons([]);
      h.prototype.open.call(this);
      this.loadUsers();
    };
    f.prototype.bindData = function () {
      g.bindGrid(this.options);
    };
    f.prototype.getEntities = function () {
      return this.users;
    };
    f.prototype.loadUsers = function () {
      this.viewer().get("schools/".concat(this.user().schoolId, "/users/"), {
        attempts: 5,
        done: this.onUsDone.bind(this),
      });
    };
    f.prototype.onUsDone = function (b) {
      c.checkSuccess(b, this.viewer()) &&
        ((this.users = b.data),
        obj.preps(this.users, e.clientUser),
        this.forceGrid());
    };
    f.prototype.onUpdate = function (b, d) {
      this.options &&
        ((d = e.byId(this.users, b.id))
          ? obj.copyTo(b, d, e.clientUser)
          : (this.users.push(b), this.setCurrent(b)),
        this.forceGrid());
    };
    f.prototype.onDelsDone = function (b) {
      if (c.checkSuccess(b, this.viewer())) {
        var d = b.state;
        (b = b.data && b.data.failedIds) &&
          0 < b.length &&
          (arr.removes(d, b),
          this.inf().err("Some users failed to be deleted. " + c.tryAgain));
        0 < d.length &&
          ((this.users = this.users.filter(function (b) {
            return !arr.has(d, b.id);
          })),
          this.forceGrid());
      }
    };
    f.prototype.getNew = function () {
      return obj.newEntityToUse(e.clientUser);
    };
    f.prototype.beforeEdit = function () {
      if (!this.canManage()) return !1;
      this.options.state = !1;
      this.options.isAdd && (this.current().role = e.roleType.creator);
      return !0;
    };
    f.prototype.beforeDelete = function (b, d, f, g) {
      b = { continue: !1 };
      if (
        !this.canDelete(f) ||
        !this.viewer().confirm(
          this.loc().get(
            "RemoveUserAlert",
            "Are you sure you want to remove the selected user(s)?",
          ),
        )
      )
        return b;
      f = f.map(function (b) {
        return b.id;
      });
      this.viewer().delete("schools/" + this.user().schoolId + "/users/", f, {
        state: f,
        done: this.onDelsDone.bind(this),
      });
      return b;
    };
    f.prototype.setButtons = function (b) {
      ui.toggle(this.options.gridBar.addButton.el, this.canManage());
      ui.toggle(this.options.gridBar.editButton.el, this.canManage());
      ui.toggle(this.options.gridBar.removeButton.el, this.canDelete(b));
    };
    f.prototype.canManage = function () {
      return e.isOwner(this.user()) || e.isAS(this.viewer().config);
    };
    f.prototype.canDelete = function (b) {
      var d = this.canManage();
      if (!d || 0 === b.length) return !1;
      if (
        0 ===
          this.options.grid.data.filter(function (d) {
            return !arr.has(b, d);
          }).length ||
        arr.has(e.ids(b), this.user().id)
      )
        d = !1;
      return d;
    };
    f.prototype.onResize = function () {
      this.onListResize(this.options.gridBar);
      h.prototype.onResize.call(this);
    };
    return f;
  })(g.windowView);
  g.sharesView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.isProfile = !1;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.win.width = 580;
      this.win.resizable = !1;
      this.win.init();
      this.email = new c.input(this.find(".email"));
      this.pass = new c.input(this.find(".password"));
      this.roleCombo = new c.combo(this.find(".privilegeCombo"));
      this.roles = [
        [e.roleType.owner + "", this.loc().get("OwnerRole", "Owner")],
        [e.roleType.creator + "", this.loc().get("CreatorRole", "Creator")],
        [e.roleType.viewer + "", this.loc().get("ViewerRole", "Viewer")],
      ];
      e.isA(this.user()) &&
        this.roles.push([e.roleType.a + "", "Administrator"]);
      this.first = new c.input(this.find(".firstName"));
      this.last = new c.input(this.find(".lastName"));
      this.getMore(this.find(".more"), this.find(".moreProfile"), {
        moreText: "Download and delete account",
      });
      this.createArchiveButton = c.button.svg({
        el: ui.find(".downloadMyData"),
        svgClass: "icon",
        useId: "downloadD",
        text: "",
      });
      this.setCreateArchiveText();
      this.createArchiveButton.click.add(function (d) {
        return b.createArchiveClick();
      });
      this.deleteAccount = this.find(".deleteMyAccount");
      this.deleteRow = this.find(".deleteAccountRow");
      ui.click(this.deleteAccount, function (d) {
        return b.deleteAccountClick();
      });
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.setCreateArchiveText = function () {
      this.createArchiveButton.setText("Create Archive");
    };
    f.prototype.open = function () {
      this.init();
      this.isProfile = this.options.state;
      ui.toggleClass(this.win.content, "profileView", this.isProfile);
      ui.toggle(
        this.deleteRow,
        this.isProfile && (e.isOwner(this.user()) || this.allow().isAS()),
      );
      this.win.setHelp(this.isProfile ? "#user-profile" : "#share-others");
      this.title(
        this.isProfile
          ? "Edit profile"
          : this.isNew()
            ? this.loc().get("AddShareUserWindow", "Add user")
            : this.loc().get("EditShareUserWindow", "Edit user"),
      );
      this.roleCombo.enable(
        this.isNew() ||
          e.isAS(this.viewer().config) ||
          (e.isOwner(this.user()) && this.shareU().id !== this.user().id),
      );
      this.pass.el.disabled = !(
        this.isNew() ||
        e.isAS(this.viewer().config) ||
        this.shareU().id === this.user().id
      );
      var b = this.allow().freeOrPurchasedCheck();
      this.createArchiveButton.enable(this.isProfile && b);
      this.bar.okBtn.enable(!this.allow().isDemo());
      this.email.setValue(this.shareU().email || "");
      this.isNew()
        ? this.pass.setValue("")
        : ((this.randomPassword = Math.random().toString(36).slice(-8)),
          this.pass.setValue(this.randomPassword));
      this.roleCombo.bind(this.roles, this.shareU().role.toString());
      this.first.setValue(this.shareU().firstName || "");
      this.last.setValue(this.shareU().lastName || "");
      this.bar.setAddOrEdit(this.isNew());
      h.prototype.open.call(this);
    };
    f.prototype.ok = function () {
      var b = this;
      if (!this.allow().isDemo() && this.isValid()) {
        var d = obj.clone(this.shareU(), e.clientUser),
          f = this.pass.getValue();
        d.email = this.email.getValue();
        if (this.isNew() || (!this.isNew() && f !== this.randomPassword))
          d.password = f;
        d.firstName = this.first.getValue();
        d.lastName = this.last.getValue();
        f = this.roleCombo.getNumberValue();
        d.role = f;
        this.isNew() && (d.schoolId = this.viewer().schoolId());
        this.viewer().post(
          "schools/" +
            this.user().schoolId +
            "/users/" +
            (this.isNew() ? "" : d.id),
          d,
          {
            methodType: this.isNew()
              ? http.methodType.post
              : http.methodType.put,
            done: function (d) {
              return b.onDone(d);
            },
          },
        );
      }
    };
    f.prototype.isValid = function () {
      return this.email.getValue()
        ? this.pass.getValue()
          ? !0
          : (this.inf().add(
              this.loc().get(
                "PasswordRequiredMessage",
                "Password is required.",
              ),
            ),
            !1)
        : (this.inf().add(
            this.loc().get(
              "EmailRequiredMessage",
              "Email address is required.",
            ),
          ),
          !1);
    };
    f.prototype.onDone = function (b) {
      if (c.checkSuccess(b, this.viewer())) {
        b = b.data;
        var d = b.email,
          f = this.isNew() ? obj.newEntityToUse(e.clientUser) : this.shareU();
        obj.copyTo(b, f, e.clientUser);
        this.mA.sharesView().onUpdate(f, this.isNew());
        if (this.isNew()) {
          var g = this.first.getValue();
          g && (g = " " + g);
          var l = this.user().firstName;
          l && (l = ",%0D%0A" + l);
          l =
            "mailto:" +
            d +
            "?subject=Prime Timetable account info&body=Hi"
              .concat(
                g,
                ", %0D%0A%0D%0AI have just created Prime Timetable account for you. Go to https://primetimetable.com and use your email ",
              )
              .concat(d, " and password ")
              .concat(
                this.pass.getValue(),
                " to log in.%0D%0A%0D%0ABest regards",
              )
              .concat(l);
          this.inf().add(
            "Notify ".concat(g ? g : d, " of his/her login data? ") +
              ui.linkMessage(l, "Send email now"),
          );
        }
        f.id === this.user().id &&
          (obj.copyTo(b, this.user(), e.clientUser),
          this.mA.profile().onUserChange());
        this.win.close();
      }
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["profile"]);
    };
    f.prototype.shareU = function () {
      return this.current();
    };
    f.prototype.createArchiveClick = function () {
      var b = this;
      this.createArchiveButton.enable(!1);
      this.createArchiveButton.setText("Preparing...");
      this.viewer().post(
        "users/".concat(this.user().id, "/create-archive/"),
        void 0,
        {
          el: this.createArchiveButton.el,
          done: function (d) {
            return b.onArchiveCreated(d);
          },
        },
      );
    };
    f.prototype.onArchiveCreated = function (b) {
      this.createArchiveButton.enable(!0);
      this.setCreateArchiveText();
      c.checkSuccess(b, this.viewer()) &&
        ((b = b.data),
        this.inf().mandatory(
          b.message + ui.linkMessage(b.link, "Download Now"),
        ));
    };
    f.prototype.deleteAccountClick = function () {
      var b = this;
      this.viewer().confirm(
        "Are you sure you want to proceed with deleting the whole school account including timetables, users and all related data?",
      ) &&
        this.viewer().patch(
          "schools/".concat(this.user().schoolId, "/mark/"),
          void 0,
          {
            done: function (d) {
              return b.onMarkAsDeletedDone(d);
            },
          },
        );
    };
    f.prototype.onMarkAsDeletedDone = function (b) {
      c.checkSuccess(b, this.viewer()) &&
        (this.inf().mandatory(
          "Your school account will be permanently deleted in 2 weeks. Check email for details.",
        ),
        this.win.close(),
        this.mA.loginView().logout());
    };
    return f;
  })(g.windowView);
  g.shareView = p;
})(m || (m = {}));
(function (g) {
  g.publishType = { publish: 0, embed: 1, social: 2 };
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.isInit = !1;
      b.publishedType = g.publishType.publish;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.viewer().config.user,
        f = d.skin,
        g = d.periodFormat,
        l = d.resizePeriods;
      d = d.intervalInCards;
      this.win.width = 740;
      this.win.resizable = !1;
      this.win.init();
      this.status = this.find(".status");
      this.publishButton = c.button.svg({
        el: this.find(".publishButton"),
        svgClass: "icon",
        useId: "webD",
        text: "",
        logger: this.log(),
      });
      this.copyUrlButton = c.button.svg({
        el: this.find(".copyUrlButton"),
        svgClass: "icon",
        useId: "copyD",
        text: "Copy",
        logger: this.log(),
      });
      this.copyUrlButton.click.add(function (d) {
        return b.onCopyUrlClick();
      });
      this.publishButton.click.add(function (d) {
        return b.onPublishClick(d);
      });
      this.displayedViewLabel = this.find(".displayedViewLbl");
      this.viewTypeCombo = new c.combo(this.find(".viewTypeCombo"));
      this.skinLabel = this.find(".skinLbl");
      this.skinCombo = new c.combo(this.find(".sknCmb"));
      this.skinCombo.bind(e.getSkinPairs(), f.toString());
      this.skinCombo.change.add(function (d, f) {
        return b.onSkinChange(num.toInt(f));
      });
      this.viewTypeCombo.change.add(function (d, f) {
        return b.onViewTypeChange(f);
      });
      this.periodFormatLabel = this.find(".periodFormatLbl");
      this.periodFormatCombo = new c.combo(this.find(".timeCmb"));
      this.periodFormatCombo.bind(e.getPeriodFormatPairs(), g.toString());
      this.periodFormatCombo.change.add(function (d, f) {
        return b.onPeriodFormatChange(num.toInt(f));
      });
      this.viewSwitchCheck = new c.checkbox(this.find(".viewSwitchCheck"));
      this.viewSwitchCheck.change.add(function (d, f) {
        return b.setUrl();
      });
      this.preserveZoomCheck = new c.checkbox(this.find(".preserveZoomCheck"));
      this.preserveZoomCheck.change.add(function (d, f) {
        return b.setUrl();
      });
      this.preserveZoomLabel = this.find(".preserveZoomLbl");
      this.linkLabel = this.find(".linkLbl");
      this.getMore(this.find(".more"), this.find(".moreOptions"), {
        moreText: "Advanced options",
      });
      this.resizePeriodsLabel = this.find(".resizePeriodsLabel");
      this.resizePeriodsCheck = new c.checkbox(
        this.find(".resizePeriodsCheck"),
      );
      this.resizePeriodsCheck.change.add(function (d, f) {
        return b.onResizePeriodsChange(f);
      });
      this.resizePeriodsCheck.check(l);
      this.intervalInCardsLabel = this.find(".intervalInCardsLabel");
      this.intervalInCardsCheck = new c.checkbox(
        this.find(".intervalInCardsCheck"),
      );
      this.intervalInCardsCheck.change.add(function (d, f) {
        return b.onIntervalInCardsChange(f);
      });
      this.intervalInCardsCheck.check(d);
      this.allowSwitchLabel = this.find(".allowSwitchLbl");
      this.downloadLinks = this.find(".downloadLinks");
      ui.click(this.downloadLinks, function (d) {
        return b.onDownload(d);
      });
      this.facebookLink = this.find(".fbLnk");
      this.twitterLink = this.find(".twLnk");
      this.publishedUrl = new c.input(this.find(".publishUrl"));
      this.publishedLink = this.find(".goToPublish");
    };
    f.prototype.open = function (b) {
      void 0 === b && (b = g.publishType.publish);
      var d = this.mainView();
      this.publishedType = b;
      this.viewType = r.viewType.from(d.viewType());
      this.mA.vA.skins.preload();
      this.periodFormat = d.vIn.periodFormat;
      this.resizePeriods = d.vIn.resizePeriods;
      this.intervalInCards = d.vIn.intervalInCards;
      this.init();
      b = e
        .getViews(this._t(), e.viewVisibility.visibleOnWeb)
        .map(function (b) {
          return [b.id, b.name];
        });
      d = this.viewType.id;
      this.viewType.is1() &&
        ((d = "-1"), arr.insert(b, [d + "", "Current individual view"], 0));
      this.viewTypeCombo.bind(b, d);
      this.bind();
      h.prototype.open.call(this);
    };
    f.prototype.bind = function () {
      this.isInit = !0;
      var b = this._t().published,
        d = this.isPublished();
      ui.toggleClass(this.win.content, "socialView", this.isSocial());
      this.title(
        d
          ? "Publish to the Web"
          : this.isSocial()
            ? "Share on social networks"
            : "Embed timetable",
      );
      this.win.setHelp("#publish");
      ui.setText(
        this.status,
        b
          ? this.loc().get("PublishedLabel", "Published")
          : this.loc().get("NotPublishedLabel", "Not published"),
      );
      ui.addClass(
        ui.deleteClass(this.status, "published notPublished"),
        b ? "published" : "notPublished",
      );
      this.publishButton.setText(b ? "Unpublish" : "Publish");
      this.publishButton.enable(
        !e.isExample(this._t()) && this.allow().canSaveTimetable(!1),
      );
      ui.setText(
        this.linkLabel,
        this.isEmbed() ? "Copy into your website" : "Share this link",
      );
      this.onSkinChange(this.skinCombo.getNumberValue());
      this.onViewTypeChange(this.viewTypeCombo.getValue());
      this.onPeriodFormatChange(this.periodFormatCombo.getNumberValue());
      ui.enables(
        [
          this.displayedViewLabel,
          this.viewTypeCombo.el,
          this.skinLabel,
          this.skinCombo.el,
          this.periodFormatLabel,
          this.periodFormatCombo.el,
          this.resizePeriodsLabel,
          this.resizePeriodsCheck.el,
          this.intervalInCardsLabel,
          this.intervalInCardsCheck.el,
          this.viewSwitchCheck.el,
          this.allowSwitchLabel,
          this.preserveZoomCheck.el,
          this.preserveZoomLabel,
          this.linkLabel,
          this.publishedUrl.el,
          this.downloadLinks,
          this.publishedLink,
        ],
        b,
      );
      this.copyUrlButton.enable(b);
      this.isSocial() && ui.enables([this.facebookLink, this.twitterLink], b);
      this.isInit = !1;
    };
    f.prototype.onViewTypeChange = function (b) {
      if ("-1" === b)
        this.mainView().changeViewType(this.viewType, { data: !0 });
      else if (this.mainView().viewType().id !== b || this.mainView().is1())
        ((b = e.findView(this._t(), b)), this.mainView().switcher.toView(b));
      this.setUrl();
    };
    f.prototype.onSkinChange = function (b) {
      this.mA.vA.skins.load(b);
      this.setUrl();
    };
    f.prototype.onPeriodFormatChange = function (b) {
      this.mainView().vIn.periodFormat !== b &&
        this.mainView().vIn.setPeriodFormat(b, !0);
      this.setUrl();
    };
    f.prototype.onResizePeriodsChange = function (b) {
      this.mainView().vIn.resizePeriods !== b &&
        this.mainView().vIn.setResizePeriods(b, !0);
      this.setUrl();
    };
    f.prototype.onIntervalInCardsChange = function (b) {
      this.mainView().vIn.intervalInCards !== b &&
        this.mainView().vIn.setIntervalInCards(b, !0);
      this.setUrl();
    };
    f.prototype.setUrl = function () {
      var b = this.viewTypeCombo.getValue();
      b =
        "-1" === b
          ? this.viewType.view
          : e.findView(this._t(), b, e.viewVisibility.all);
      var d = this.viewType.getStudent(),
        f = !!d;
      d = b = this.viewer().url.getPage(
        "/publish/?" + this.getQuery(b, f ? d : this.viewType.ve, f),
      );
      this.isEmbed() &&
        (d =
          '<iframe src="' +
          b +
          '" style="width:80%; height: 600px; border: 0; text-align: center; margin:0 auto; display: block;"></iframe>');
      this.publishedUrl.setValue(d);
      ui.setAttribute(this.publishedLink, "href", b);
      this.isSocial() &&
        ((d = "Schedule is published here: " + b + " via @primetimetable"),
        (b = encodeURIComponent(b)),
        (this.twitterLink.href =
          "https://twitter.com/intent/tweet?original_referer=" +
          b +
          "&ref_src=twsrc%5Etfw&text=" +
          encodeURIComponent(d) +
          "&tw_p=tweetbutton"),
        (this.facebookLink.href =
          "https://www.facebook.com/sharer/sharer.php?u=" + b));
    };
    f.prototype.getQuery = function (b, d, f) {
      void 0 === f && (f = !1);
      var k = "id=" + this._t().id,
        g = b.isDefault ? "" : "".concat(a.viewQuery.viewId, "=").concat(b.id),
        n = b.entityType - 1;
      b =
        (b.isDefault && n !== e.vMod.c) || !b.isDefault
          ? "".concat(a.viewQuery.view, "=").concat(n)
          : "";
      n = d
        ? (f ? a.viewHash.studentId : a.individualViewHashes[n]) + "=" + d.id
        : "";
      d = f ? "".concat(a.viewHash.classId, "=").concat(d.parent.id) : "";
      f = this.viewSwitchCheck.isChecked()
        ? ""
        : "".concat(a.viewHash.switchView, "=0");
      var h = this.resizePeriodsCheck.isChecked()
          ? "".concat(a.viewHash.resizePeriods, "=1")
          : "",
        w = this.intervalInCardsCheck.isChecked()
          ? "".concat(a.viewHash.intervalInCards, "=1")
          : "",
        u = this.periodFormatCombo.getNumberValue() + 1,
        x = this.skinCombo.getValue();
      k = arr.join(
        [
          k,
          g,
          b,
          d,
          n,
          h,
          w,
          f,
          u - 1 === e.tf.lN ? "" : "time=" + u,
          "1" === x ? "" : "skin=" + x,
        ],
        "&",
      );
      g = this.getHash();
      return k + g;
    };
    f.prototype.getHash = function () {
      if (!this.preserveZoomCheck.isChecked()) return "";
      var b = this.mainView().size,
        d = b.zoomX,
        f = b.zoomY;
      b = b.individualZoomY;
      d = arr.join(
        [
          100 === d ? "" : a.viewHash.zx + "=" + d,
          100 === f ? "" : a.viewHash.zy + "=" + f,
          100 === d ? "" : a.viewHash.zx1 + "=" + d,
          100 === b ? "" : a.viewHash.zy1 + "=" + b,
        ],
        "&",
      );
      return "" !== d ? "#" + d : "";
    };
    f.prototype.onPublishClick = function (b) {
      this.isInit ||
        (this.publishButton.enable(!1),
        (b = !this._t().published),
        this.publishButton.setText(b ? "Publishing..." : "Unpublishing..."),
        this.viewer().post("timetables/" + this._t().id + "/publish/", void 0, {
          el: this.publishButton.el,
          methodType: b ? http.methodType.put : http.methodType.delete,
          done: this.onDone.bind(this),
          state: b,
        }));
    };
    f.prototype.onDone = function (b) {
      this.publishButton.enable();
      c.checkSuccess(b, this.viewer()) &&
        ((this._t().published = b.state), this.bind());
    };
    f.prototype.onDownload = function (b) {
      this._t().published &&
        (ui.stopDefaultPropagation(b),
        (b = e.getSafeFileName(this._t().name) + "-links.txt"),
        ui.download(b, this.getLinks()));
    };
    f.prototype.getLinks = function () {
      for (
        var b = this._t(),
          d = 'Links to all individual timetables in "'.concat(b.name, '"\n'),
          f = function (f) {
            var k = f.name,
              l = f.isDefault,
              q = f.entityIds,
              n = e.getViewEntities(b, f.entityType);
            l ||
              arr.filter(n, function (b) {
                return arr.has(q, b.id);
              });
            d += g.getLinksForEntities(b, str.htmlDecode(k), f, n);
          },
          g = this,
          l = 0,
          n = e.getViews(b, e.viewVisibility.all);
        l < n.length;
        l++
      )
        f(n[l]);
      return d;
    };
    f.prototype.getLinksForEntities = function (b, d, f, g, l) {
      void 0 === l && (l = !1);
      if (0 === g.length) return "";
      var k = f.entityType - 1,
        q = this.mA.url.getFull("publish/?");
      k = k === e.vMod.c;
      d = "\n".concat(d, "\n\n");
      for (var h = 0, u = 0; u < g.length; u++) {
        var x = g[u];
        ++h;
        var y = "".concat(q).concat(this.getQuery(f, x, l));
        d += "".concat(str.htmlDecode(x.name), ": ").concat(y, "\n");
        k &&
          !l &&
          ((y = x.sortedStudents),
          0 !== y.length &&
            ((d += this.getLinksForEntities(
              b,
              "Students for ".concat(str.htmlDecode(x.name)),
              f,
              y,
              !0,
            )),
            h !== g.length && (d += "\n")));
      }
      return d;
    };
    f.prototype.onClose = function () {
      var b = this.viewer().config.user,
        d = this.mainView();
      b.skin !== this.mA.vA.skins.skinNumber && this.mA.vA.skins.load(b.skin);
      b = !1;
      this.periodFormat !== d.input.periodFormat &&
        (d.input.setPeriodFormat(this.periodFormat, !1), (b = !0));
      this.resizePeriods !== d.input.resizePeriods &&
        (d.input.setResizePeriods(this.resizePeriods, !1), (b = !0));
      this.intervalInCards !== d.input.intervalInCards &&
        (d.input.setIntervalInCards(this.intervalInCards, !1), (b = !0));
      (this.viewType.i === d.viewType().i &&
        this.viewType.ve === d.viewType().ve) ||
        this.mainView().changeViewType(this.viewType, { data: !0 });
      b && this.mainView().refresh();
    };
    f.prototype.onCopyUrlClick = function () {
      c.copyToClipboard(this.publishedUrl.getValue())
        ? this.inf().add(
            this.isPublished()
              ? "Link copied to your clipboard."
              : "HTML copied to your clipboard.",
          )
        : this.inf().err("Failed to copy link to your clipboard.");
    };
    f.prototype.isPublished = function () {
      return this.publishedType === g.publishType.publish;
    };
    f.prototype.isSocial = function () {
      return this.publishedType === g.publishType.social;
    };
    f.prototype.isEmbed = function () {
      return this.publishedType === g.publishType.embed;
    };
    return f;
  })(g.windowView);
  g.publishView = p;
})(m || (m = {}));
(function (g) {
  function p(f, b, d) {
    return { name: f, width: b, height: d };
  }
  var h = (function (f) {
    function b(b, k) {
      b = f.call(this, b, k) || this;
      b.isPrint = !1;
      b.previousEntities = [];
      b.previousCards = [];
      b.papers = [
        p("A2", 16.5354, 23.3858),
        p("A3", 11.6929, 16.5354),
        p("A4", 8.2677, 11.6929),
        p("A5", 5.82677, 8.2677),
        p("Letter", 8.5, 11),
      ];
      b.paperTypes = [];
      b.orientationTypes = [];
      b.colorTypes = [];
      return b;
    }
    __extends(b, f);
    b.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var f = this.win;
      f.width = 640;
      f.resizable = f.isModal = !1;
      f.init();
      f.scaleAnim.dur = f.fadeAnim.dur = 50;
      f.scaleAnim.xed.add(function (d) {
        return b.onAnimX();
      });
      this.paperTypes = this.papers.map(function (b) {
        return [b.name, b.name];
      });
      this.orientationTypes.push(["0", "Portrait"], ["1", "Landscape"]);
      this.colorTypes.push(["0", "Color"], ["1", "Black and white"]);
      this.paperSizeCombo = new c.combo(this.find(".paperCmb"));
      this.paperSizeCombo.change.add(function (d, f) {
        return b.onChange();
      });
      this.orientationCombo = new c.combo(this.find(".orientCmb"));
      this.orientationCombo.change.add(function (d, f) {
        return b.onChange();
      });
      this.colorCombo = new c.combo(this.find(".colorCmb"));
      this.colorCombo.change.add(function (d, f) {
        return b.onChange();
      });
      this.getMore(this.find(".more"), this.find(".moreOptions"), {
        moreText: "Advanced options",
      });
      var g = (this.topMargin = new c.input(this.find(".tMrg"))),
        l = (this.rightMargin = new c.input(this.find(".rMrg"))),
        n = (this.bottomMargin = new c.input(this.find(".bMrg"))),
        h = (this.leftMargin = new c.input(this.find(".lMrg")));
      g.blur.add(function (d) {
        return b.onMarginBlur(g, 0);
      });
      l.blur.add(function (d) {
        return b.onMarginBlur(l, 1);
      });
      n.blur.add(function (d) {
        return b.onMarginBlur(n, 2);
      });
      h.blur.add(function (d) {
        return b.onMarginBlur(h, 3);
      });
      this.scale = new c.input(this.find(".printScale"));
      this.scale.blur.add(function (d) {
        return b.onScaleBlur();
      });
      this.setScale = this.find(".setScale");
      ui.click(this.setScale, function (d) {
        return b.setScaleClick();
      });
      this.printButton = c.button.svg({
        el: this.find(".okButton"),
        svgClass: "okSvg icon",
        useId: "printD",
        text: "Print",
        logger: this.log(),
      });
      this.printButton.click.add(function (d) {
        return b.ok();
      });
      this.doneButton = c.button.svg({
        el: ui.find(".okButton", this.viewer().el),
        svgClass: "okSvg icon",
        useId: "okD",
        text: "Done",
        logger: this.log(),
      });
      this.doneButton.hide();
      this.doneButton.click.add(function (d) {
        return b.onPrintFinished(d);
      });
    };
    b.prototype.openWindow = function (b) {
      this.init();
      var d = this.mainView().viewType(),
        g = d.view;
      this.previousViewType = r.viewType.from(d);
      this.all = b;
      this.bind();
      var l = d.name(),
        n = g.isDefault ? g.name.toLowerCase() : g.name;
      b = b
        ? this.isStudentPrint()
          ? "Print students for " + l
          : "Print individual " + n
        : d.is1()
          ? "Print " + l + (g.isDefault ? "" : " (" + n + ")")
          : "Print " + n;
      this.title(b);
      this.win.setHelp("#printing-tips");
      this.mA.viewEvents.dropTool();
      this.mA.play.closePanel();
      this.mA.memory.histV().x();
      this.mainView().g.resetSelection();
      this.draw(!0);
      f.prototype.open.call(this);
    };
    b.prototype.isStudentPrint = function () {
      return this.all && 0 < this.previousViewType.getStudents().length;
    };
    b.prototype.draw = function (b) {
      var d = this.mainView(),
        f = this.viewer().printSettings,
        g = this.viewer(),
        n = !1;
      f.isPrint = b;
      d.paging.allIndividuals = this.all;
      d.paging.isStudentPrint = this.isStudentPrint();
      this.deletePages();
      if (b) this.setSize(f);
      else if (
        d.viewType().i !== this.previousViewType.i ||
        d.viewType().ve !== this.previousViewType.ve ||
        this.isStudentPrint()
      )
        (d.changeViewType(r.viewType.from(this.previousViewType), { data: !0 }),
          (n = !0));
      ui.toggleClass(d.g.body, "print", b);
      ui.toggleClass(
        d.g.body,
        "forceColor",
        b && f.colorMode === e.colorMode.color,
      );
      this.mA.viewEvents.extraViews.show(!b);
      this.mainView().g.onResize(void 0);
      f = r.getEntities(d);
      d.needPaging = b;
      var h = d.paging;
      b && this.all && !d.is1() && 0 < f.length
        ? ((n = r.newViewType(d.viewType().view)),
          (n.ve = f[0]),
          d.changeViewType(n, { data: !0 }))
        : b && this.isStudentPrint()
          ? ((n = r.viewType.from(this.previousViewType)),
            this.setStudent(n, 0),
            d.changeViewType(n))
          : n ||
            (d.onResize(void 0, 0), (b && h.hasMorePages()) || d.refresh());
      if (b && h.hasMorePages()) {
        this.previousEntities = d.data.entities.slice();
        this.previousCards = d.data.cards.slice();
        this.setPage(d);
        d.refresh();
        for (var w = h.totalPages, u = 2; u <= w; u++) {
          var x = new v.view(g, d.g);
          n = new r.viewType(d.viewType().view);
          this.all &&
            (this.isStudentPrint()
              ? ((n.ve = this.previousViewType.ve), this.setStudent(n, u - 1))
              : (n.ve = f[u - 1]));
          d.g.addView(x);
          var y = new v.input(g.t);
          g.layout.setVIn(y);
          var z = ui.getDiv("mainView"),
            p = ui.getDiv("pageBreak");
          ui.appends([p, z], g.el);
          y.el = z;
          y.viewType = n;
          y.viewHeightPercentage = 100;
          x.pageNumber = u;
          x.init(y);
          x.paging = d.paging;
          h.pageNumber += 1;
          this.setPage(x);
          x.refresh();
        }
      }
      if (!b) g.layout.onResize();
    };
    b.prototype.setStudent = function (b, f) {
      b.classFilters = [];
      var d = b.getStudents();
      b.addSelectedStudent(d[f]);
    };
    b.prototype.setSize = function (b) {
      var d = ui.findId("inch"),
        f = b.scale / 100,
        g = d.offsetHeight * f,
        n = b.margin;
      b.width = Math.floor(
        ((0 === b.orientation ? b.paperWidth : b.paperHeight) - n[3] - n[1]) *
          d.offsetWidth *
          f,
      );
      b.height = Math.floor(
        ((0 === b.orientation ? b.paperHeight : b.paperWidth) - n[0] - n[2]) *
          g,
      );
    };
    b.prototype.setPage = function (b) {
      if (!b.is1()) {
        var d = this.mainView().paging,
          f = d.getSkippedRows();
        d = f + d.getRowCount();
        f = this.previousEntities.slice(f, d);
        d = e.ids(f);
        for (
          var g = b.viewType().entityType(),
            n = [],
            h = 0,
            w = this.previousCards;
          h < w.length;
          h++
        ) {
          var u = w[h],
            x = e.ids(e.getEntities(u, g));
          arr.hasOneEqual(x, d) && n.push(u);
        }
        b.data.entities = f;
        b.data.cards = n;
        r.setRowsCount(b);
      }
    };
    b.prototype.deletePages = function () {
      for (
        var b = this.mainView(), f = b.g.vs, g = [], l = !1, n = 0;
        n < f.length;
        n++
      ) {
        var h = f[n];
        1 !== h.pageNumber && (ui.remove(h.el), g.push(h), (l = !0));
      }
      arr.removes(f, g);
      ui.removes(ui.all(".pageBreak", this.viewer().el));
      l &&
        ((b.data.entities = this.previousEntities),
        (b.data.cards = this.previousCards),
        r.setRowsCount(b));
    };
    b.prototype.bind = function () {
      var b = this.viewer().printSettings;
      this.paperSizeCombo.bind(this.paperTypes, this.getPaper(b).name);
      this.orientationCombo.bind(
        this.orientationTypes,
        b.orientation.toString(),
      );
      this.colorCombo.bind(this.colorTypes, b.colorMode.toString());
      var f = b.margin;
      this.topMargin.setValue(f[0].toString());
      this.rightMargin.setValue(f[1].toString());
      this.bottomMargin.setValue(f[2].toString());
      this.leftMargin.setValue(f[3].toString());
      this.scale.setValue(b.scale.toString());
      this.toggleSetScale(b);
      ui.setText(this.setScale, "Set to ".concat(this.getDeviceScale(), "%"));
    };
    b.prototype.getDeviceScale = function () {
      return num.round(100 * c.devicePixelRatio(), 0);
    };
    b.prototype.toggleSetScale = function (b) {
      b = b.scale !== this.getDeviceScale();
      ui.toggle(this.setScale, b);
    };
    b.prototype.onMarginBlur = function (b, f) {
      if (b.getValue() !== this.viewer().printSettings.margin[f].toString())
        this.onChange();
    };
    b.prototype.onScaleBlur = function () {
      if (
        this.scale.getValue() !== this.viewer().printSettings.scale.toString()
      )
        this.onChange();
    };
    b.prototype.onChange = function (b) {
      void 0 === b && (b = !0);
      b &&
        this.inf().addTip(
          "Paper size, orientation and margins should match related printer settings. " +
            ui.linkMessage("#printing-tips", "Read printing tips"),
        );
      var d = this.viewer().printSettings,
        f = this.paperSizeCombo.getValue();
      f = this.getPaperByName(f);
      d.paperWidth = f.width;
      d.paperHeight = f.height;
      f = this.orientationCombo.getNumberValue();
      var g = this.colorCombo.getNumberValue();
      d.orientation = f;
      d.colorMode = g;
      d.margin = [
        this.getInputNumber(this.topMargin),
        this.getInputNumber(this.rightMargin),
        this.getInputNumber(this.bottomMargin),
        this.getInputNumber(this.leftMargin),
      ];
      f = this.getInputNumber(this.scale, 100);
      d.scale = 0 >= f || 1e3 < f ? 100 : f;
      this.toggleSetScale(d);
      b && this.draw(!0);
    };
    b.prototype.getInputNumber = function (b, f) {
      void 0 === f && (f = 0);
      var d = parseFloat(b.getValue()),
        g = !isNaN(d);
      g || b.setValue(f + "");
      return g ? d : f;
    };
    b.prototype.ok = function () {
      this.onChange(!1);
      this.isPrint = !0;
      this.xOnOk();
    };
    b.prototype.onCancel = function () {
      this.draw(!1);
    };
    b.prototype.setScaleClick = function () {
      this.scale.setValue(this.getDeviceScale() + "");
      this.onScaleBlur();
    };
    b.prototype.print = function () {
      var b = this;
      c.timeout(function () {
        return b.afterPrint();
      }, 1e3);
      window.print();
    };
    b.prototype.afterPrint = function () {
      window.scrollTo(0, 0);
      this.doneButton.show();
      var b = this.mainView().size;
      b =
        Math.min(
          b.timetable.width + b.margin.left + b.border.left + b.border.right,
          c.windowWidth() - b.margin.right - b.border.right - c.scrollWidth(),
        ) - ui.getComputedWidth(this.doneButton.el);
      ui.setLeft(this.doneButton.el, b);
    };
    b.prototype.onKey = function (b) {
      if (this.isPrintDone() && keys.esc(b)) this.onPrintFinished(b);
      return this.mainView().isPrint();
    };
    b.prototype.isPrintDone = function () {
      return this.mainView().isPrint() && this.doneButton.isVisible();
    };
    b.prototype.onHashChange = function () {
      if (this.isPrintDone()) this.onPrintFinished(void 0);
    };
    b.prototype.onPrintFinished = function (b) {
      this.doneButton.hide();
      this.onCancel();
    };
    b.prototype.onAnimX = function () {
      var b = this;
      !this.win.isOpen &&
        this.isPrint &&
        ((this.isPrint = !1),
        c.timeout(function () {
          return b.print();
        }, 51));
    };
    b.prototype.getPaper = function (b) {
      return this.papers.find(function (d) {
        return d.width === b.paperWidth && d.height === b.paperHeight;
      });
    };
    b.prototype.getPaperByName = function (b) {
      return this.papers.find(function (d) {
        return d.name === b;
      });
    };
    b.prototype.refresh = function () {
      if (this.isOpen()) this.onChange();
    };
    return b;
  })(g.windowView);
  g.printView = h;
})(m || (m = {}));
(function (g) {
  var p = (function (g) {
    function f(b, d) {
      d = g.call(this, b, d) || this;
      d.isSearch = !1;
      d.mA = b;
      return d;
    }
    __extends(f, g);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.minWidth = 320;
      d.isModal = d.center = d.resizable = !1;
      this.onScrResize(!0);
      d.init();
      this.ifr = this.find("iframe");
      this.ifr.onload = function () {
        return b.onLoadFrame();
      };
      this.viewer().resize.add(function (d) {
        return b.onScrResize();
      });
    };
    f.prototype.onLoadFrame = function () {
      this.iOsWidth();
      this.chkSearchFocus();
    };
    f.prototype.chkSearchFocus = function () {
      this.isSearch && this.postMessage("searchFocus");
    };
    f.prototype.postClosedMessage = function () {
      this.postMessage("closed");
    };
    f.prototype.postMessage = function (b) {
      this.ifr.contentWindow.postMessage(b, "*");
    };
    f.prototype.onScrResize = function (b) {
      void 0 === b && (b = !1);
      var d = this.win,
        f = Math.max(0.33 * c.windowWidth(), d.minWidth),
        g = ui.getComputedHeight(this.viewer().top),
        l = c.windowHeight() - 2 * g - 10;
      d.width = f;
      d.height = l;
      d.top = g;
      d.left =
        c.windowWidth() - f - (this.viewer().isWeb() ? c.scrollWidth() + 5 : 0);
      b || d.setSizePosition(!1);
      this.iOsWidth();
    };
    f.prototype.iOsScrTo = function (b) {
      this.win.content.scrollTop = b;
    };
    f.prototype.iOsWidth = function () {
      ui.iOS() &&
        this.ifr &&
        this.ifr.contentDocument &&
        this.ifr.contentDocument.body &&
        ui.setWidth(this.ifr.contentDocument.body, this.win.width);
    };
    f.prototype.open = function () {
      this.init();
      g.prototype.open.call(this);
    };
    f.prototype.preventEnter = function () {};
    f.prototype.ok = function () {};
    f.prototype.go = function (b, d, f) {
      void 0 === f && (f = !1);
      this.isSearch = f;
      this.open();
      this.title(d);
      ui.setAttribute(this.ifr, "src", b);
      this.win.addOpenInNewWindow(b.replace("?embed=1", ""));
      this.iOsWidth();
      this.chkSearchFocus();
    };
    return f;
  })(g.windowView);
  g.helpView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.win.width = 480;
      this.win.resizable = !1;
      this.title("Got feedback?");
      this.win.init();
      this.emailBox = new c.input(this.find(".email"));
      this.emailBox.setPlaceholder("Enter your email here");
      this.messageBox = new c.input(this.find(".message"));
      this.messageBox.setPlaceholder("Enter your message here");
      var d = (this.submitBar = new g.submitToolbar(
        this.mA,
        this.find(".submitToolbar"),
      ));
      d.setType(g.subType.ok);
      d.okBtn.setText("Send");
      d.okBtn.setTabIndex(0);
      d.okBtn.changeClass("mailButton");
      d.okBtn.changeUseId("emailD");
      d.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      var b = this;
      this.init();
      var d = this.allow().isDemo() ? "" : this.user().email;
      this.emailBox.setValue(d);
      h.prototype.open.call(this);
      c.timeout(function () {
        d && b.messageBox.setFocus();
      }, 10);
    };
    f.prototype.preventEnter = function () {};
    f.prototype.ok = function () {
      var b = this,
        d = this.messageBox.getValue();
      if (!d || 4 > d.length)
        this.inf().add(
          this.loc().get("MessageRequiredMessage", "Message is required."),
        );
      else {
        var f = this.emailBox.getValue();
        this.log().w(
          "Feedback email: " + f + "; Feedback message: " + d,
          void 0,
          { category: e.logCategory.email },
        );
        (c.isEmailValid(f) ||
          ui.confirm(
            "It looks like the email address you provided is invalid, so we won't be able to reply to your feedback. Are you sure you want to send a message?",
          )) &&
          this.viewer().post(
            "users/feedback/",
            { message: d, email: f },
            {
              done: function (d) {
                return b.onEmailResponse(d);
              },
            },
          );
      }
    };
    f.prototype.onEmailResponse = function (b) {
      c.checkSuccess(b, this.viewer()) &&
        (this.inf().add(
          "Your message has been successfully sent. Thank you for contacting us!",
        ),
        this.messageBox.reset(),
        this.xOnOk());
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["contact"]);
    };
    return f;
  })(g.windowView);
  g.contactView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (g) {
    function f(b, d) {
      return g.call(this, b, d) || this;
    }
    __extends(f, g);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      this.win.width = 480;
      this.win.resizable = !1;
      this.title("About Prime Timetable");
      this.win.init();
      this.checkElement = this.find(".checkVersion");
      this.reportIssue = this.find(".reportIssue");
      ui.click(this.reportIssue, function (d) {
        return b.xOnOk();
      });
    };
    f.prototype.open = function () {
      this.init();
      g.prototype.open.call(this);
      this.checkVersion();
      this.viewer().hash.addKey("about");
    };
    f.prototype.checkVersion = function () {
      var b = this;
      ui.setText(this.checkElement, "Checking version...");
      this.viewer().get("version", {
        done: function (d) {
          return b.onVersion(d);
        },
      });
    };
    f.prototype.onVersion = function (b) {
      if (c.checkSuccess(b, this.viewer())) {
        b = b.data;
        var d = this.viewer().config;
        ui.setHtml(
          this.checkElement,
          b.viewer.version === a.version &&
            b.maker.version === d.maker.version &&
            b.solver.version === d.version
            ? 'Prime Timetable is up to date <svg class="svgIcon okIcon"><use xlink:href="#okD"></use></svg>'
            : 'A new version of Prime Timetable is available.<br /><a href=".">Refresh the page</a> to start using it.',
        );
      }
    };
    f.prototype.preventEnter = function () {};
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["about"]);
    };
    return f;
  })(g.windowView);
  g.aboutView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.mode = 0;
      return b;
    }
    __extends(f, h);
    f.prototype.go = function () {
      var b = this;
      this.go = c.no;
      var d = this.win;
      d.width = 480;
      d.resizable = d.returnFocus = d.autoFocus = !1;
      ui.addClass(d.el, "logWin");
      d.init();
      d.setHelp("#log-in");
      this.title("Log in to use Prime Timetable");
      this.email = new c.input(this.find(".email"));
      this.email.setPlaceholder("Enter your email/username here");
      this.password = new c.input(this.find(".password"));
      this.password.setPlaceholder("Enter your password");
      this.forgetLink = this.find(".forget");
      var f = (this.forgetAnim = new c.fA([this.forgetLink], 200));
      f.ea = c.eaTy.oQuad;
      f.dsp = "inline-block";
      f.toOut(0);
      this.password.focus.add(function (b) {
        return f.toIn(200);
      });
      this.password.blur.add(function (b) {
        return f.toOut(200);
      });
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.setType(g.subType.ok);
      this.bar.okBtn.setText("Log In");
      this.bar.okBtn.changeUseId("loginD");
      this.bar.okBtn.setTabIndex(0);
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
      (d = this.viewer().qs.get("email")) && this.email.setValue(d);
    };
    f.prototype.open = function (b) {
      var d = this;
      void 0 === b && (b = 0);
      this.mode = b;
      this.go();
      0 === b
        ? (h.prototype.open.call(this),
          c.timeout(function () {
            d.email.getValue() ? d.password.el.focus() : d.email.el.focus();
          }, 10))
        : this.signIn("demo", "demo");
    };
    f.prototype.logout = function () {
      this.open(2);
    };
    f.prototype.loginDemo = function () {
      this.open(1);
    };
    f.prototype.ok = function () {
      var b = c.input.getEmail(this.email),
        d = this.password.getValue();
      this.signIn(b, d);
    };
    f.prototype.signIn = function (b, d) {
      var f = this;
      "demo" === b.toLowerCase() && (d = "demo");
      0 === b.length || 0 === d.length
        ? this.inf().add(
            "Email and/or password is required in order to log in.",
          )
        : (this.bar.okBtn.enable(!1),
          this.bar.okBtn.setText("Logging in..."),
          this.log().w("Logging in " + b),
          2 === this.mode
            ? (this.mA.switchToWeb(), g.clearStorageOnLogout(this.viewer()))
            : this.mA.switchToMaker(),
          this.viewer().post(
            "users/sign-in/",
            { email: b, password: d },
            {
              done: function (b) {
                return f.onDone(b);
              },
            },
          ));
    };
    f.prototype.onCancel = function () {
      this.log().w("Login window cancelled");
      this.password.reset();
      this.viewer().isMaker() && 0 === this.mode
        ? this.mA.switchToWeb()
        : this.viewer().wA.focus(!0);
    };
    f.prototype.onDone = function (b) {
      if (c.checkSuccess(b, this.viewer())) {
        this.password.reset();
        this.afterSignIn(b.data);
        this.xOnOk();
        if ((b = this.viewer().qs.get("returnUrl"))) {
          this.viewer().url.goto(b.toLowerCase());
          return;
        }
        e.isA(this.mA.user()) && g.gotoPage("/admin/", this.mA);
        this.mA.exp();
      } else this.email.el.focus();
      this.onEnd();
    };
    f.prototype.onEnd = function () {
      this.bar.okBtn.setText("Log In");
      this.bar.okBtn.enable(!0);
    };
    f.prototype.afterSignIn = function (b) {
      a.prepareConfig(b);
      var d = this.viewer(),
        f = b.user,
        g = d.config.user.skin;
      d.config = b;
      g !== f.skin && this.mA.vA.skins.load(f.skin);
      g = f.defaultView;
      d.layout.setVIn(this.mainView().vIn, !0);
      this.mainView().viewType().i !== g &&
        (this.mainView().viewType().toMaster(g), this.mainView().changeView());
      this.mA.memory.reminder.setMin(f.reminder);
      this.mA.docsView().reset();
      g = new a.openOptions(b.id, new Date(b.updatedAt), a.openM.o);
      g.is1Open = !0;
      b.id === d.tId && (g.needServerCheck = !0);
      d.layout.openTimetable(g);
      b = this.mA.sharesView();
      b.options && (b.options.grid.isDirty = !0);
      d.events.onUserChange();
      d.storage.remove(c.infoKey);
      d.log.w("".concat(f.email, " logged in"));
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["login"]);
    };
    return f;
  })(g.windowView);
  g.loginView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      b = h.call(this, b, d) || this;
      b.step = 1;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.width = 480;
      d.resizable = !1;
      ui.addClass(d.el, "forgetWin");
      d.init();
      d.setHelp("#password");
      this.emDiv = this.find(".emDiv");
      this.em = new c.input(this.find(".email"));
      this.passDiv = this.find(".passDiv");
      this.codeTxt = new c.input(this.find(".code"));
      this.newPass = new c.input(this.find(".newPassword"));
      d = this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      d.setType(g.subType.ok);
      d.okBtn.setTabIndex(0);
      d.okBtn.changeClass("mailButton");
      d.okClick.add(function (d) {
        return b.ok();
      });
    };
    f.prototype.open = function () {
      this.init();
      this.mA.loginView().xOnOk();
      this.chgStep(1);
      h.prototype.open.call(this);
    };
    f.prototype.chgStep = function (b) {
      this.step = b;
      b = 1 === b;
      ui.toggle(this.emDiv, b);
      ui.toggle(this.passDiv, !b);
      this.title(b ? "Forgot password" : "Set new password");
      this.setBtnTxt();
      this.bar.okBtn.changeUseId(b ? "emailD" : "editD");
      b || this.codeTxt.setFocus();
    };
    f.prototype.setBtnTxt = function () {
      this.bar.okBtn.setText(1 === this.step ? "Send code" : "Change password");
    };
    f.prototype.ok = function () {
      var b = 1 === this.step,
        d = this.em.getValue(),
        f = this.codeTxt.getValue(),
        g = this.newPass.getValue();
      if (b) {
        if (!d) {
          this.inf().add("Email is required.");
          return;
        }
      } else {
        if (!f) {
          this.inf().add(
            "You need to copy/paste the code from the email we have just sent you",
          );
          return;
        }
        if (!g) {
          this.inf().add("Enter your new password first.");
          return;
        }
      }
      this.bar.okBtn.enable(!1);
      this.bar.okBtn.setText(b ? "Sending..." : "Changing...");
      b
        ? this.viewer().patch(
            "users/password/",
            { email: d },
            { done: this.onEmSent.bind(this) },
          )
        : this.viewer().put(
            "users/password/",
            { email: d, code: f, password: g },
            { done: this.onChgDone.bind(this) },
          );
    };
    f.prototype.onEmSent = function (b) {
      this.onEnd();
      c.checkSuccess(b, this.viewer()) ? this.chgStep(2) : this.chgStep(1);
    };
    f.prototype.onChgDone = function (b) {
      this.onEnd();
      c.checkSuccess(b, this.viewer()) &&
        (this.xOnOk(),
        this.inf().add(
          "Your password has been changed. Use the new password to log in.",
        ),
        this.mA.loginView().open());
    };
    f.prototype.onEnd = function () {
      this.bar.okBtn.enable(!0);
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["forget"]);
    };
    return f;
  })(g.windowView);
  g.forgetView = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function h(f) {
      this.mA = f;
    }
    h.prototype.isExpired = function () {
      return this.mA.vA.config.exp.expired && !this.isAS();
    };
    h.prototype.isDisabled = function () {
      return e.isDisabled(this.mA.vA.config.acc);
    };
    h.prototype.isDemo = function () {
      return e.isDemoSchool(this.mA.vA.schoolId());
    };
    h.prototype.isPurchased = function () {
      return this.mA.vA.config.pl > e.planType.free;
    };
    h.prototype.isValidPurchasedAccount = function () {
      return this.isPurchased() && !this.isExpired() && !this.isDisabled();
    };
    h.prototype.paidCheck = function (f) {
      void 0 === f && (f = !1);
      if (this.isValidPurchasedAccount() || this.isAS()) return !0;
      f &&
        this.mA.vA.inf.mandatory(
          g.profilePanel.getBuyMessage(this.mA._t()) +
            " to unlock this feature",
        );
      return !1;
    };
    h.prototype.paidOrExampleCheck = function () {
      if (e.isExample(this.mA._t()) || this.paidCheck()) return !0;
      this.mA.vA.inf.mandatory(
        g.profilePanel.getBuyMessage(this.mA._t()) +
          " to unlock this feature or " +
          ui.linkMessage("#examples", "Open Examples") +
          " to evaluate it",
      );
      return !1;
    };
    h.prototype.isDifferentSchool = function () {
      return this.isA()
        ? !1
        : !e.isExample(this.mA._t()) &&
            this.mA._t().schoolId !== this.mA.vA.schoolId();
    };
    h.prototype.isA = function () {
      return e.isA(this.mA.user());
    };
    h.prototype.isAS = function () {
      return e.isAS(this.mA.vA.config);
    };
    h.prototype.creatorOrOwnerCheck = function (f) {
      void 0 === f && (f = !1);
      var b = e.isViewer(this.mA.user());
      b && f && this.showViewerNotAllowed();
      return !b;
    };
    h.prototype.checkExpire = function (f) {
      var b = this.isExpired();
      b && f && this.showExtendSubscription();
      return !b;
    };
    h.prototype.freeOrPurchasedCheck = function (f) {
      void 0 === f && (f = !1);
      var b =
        (!this.isDemo() && !this.isExpired() && !this.isDisabled()) ||
        this.isAS();
      !b && f && this.showFreeOrPurchasedPlan();
      return b;
    };
    h.prototype.purchasedCheck = function (f) {
      void 0 === f && (f = !1);
      var b = this.isValidPurchasedAccount() || this.isAS();
      !b && f && this.showUseCommercialVersion();
      return b;
    };
    h.prototype.canSaveTimetable = function (f) {
      return (
        this.freeOrPurchasedCheck(f) &&
        this.checkExpire(f) &&
        !this.isDifferentSchool() &&
        this.creatorOrOwnerCheck()
      );
    };
    h.prototype.showFreeOrPurchasedPlan = function () {
      this.mA.vA.inf.add(
        this.mA.vA.loc.get(
          "UseFreeOrCommercialEditionMessage",
          "Use Free, Basic or Premium plan to enable this feature. " +
            g.profilePanel.getBuyMessage(this.mA._t()),
        ),
      );
    };
    h.prototype.showUseCommercialVersion = function () {
      this.mA.vA.inf.add(
        this.mA.vA.loc.get(
          "UseCommericalEditionMessage",
          "Use Basic or Premium plan to enable this feature. " +
            g.profilePanel.getBuyMessage(this.mA._t()),
        ),
      );
    };
    h.prototype.showExtendSubscription = function () {
      this.mA.vA.inf.add(
        "You need to extend your subscription. " +
          g.profilePanel.getBuyMessage(this.mA._t()),
      );
    };
    h.prototype.showViewerNotAllowed = function () {
      this.mA.vA.inf.mandatory(
        "You do not have permission to perform this action. Please contact the Account Owner for assistance. " +
          ui.linkMessage("#share", "Read about roles"),
      );
    };
    return h;
  })();
  g.allow = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b) {
      b = h.call(this, b) || this;
      b.isOpen = !1;
      b.addPanel();
      return b;
    }
    __extends(f, h);
    f.prototype.addPanel = function () {
      var b = this;
      this.icon = c.button.svg({
        el: ui.find(".profileButton", this.viewer().el),
        svgClass: "svgIcon",
        useId: "profileD",
        logger: this.log(),
      });
      e.isAS(this.mA.vA.config) && ui.addClass(this.icon.el, "support");
      this.notifier = ui.find(".profileNr", this.viewer().el);
      this.panel = ui.hide(ui.getDiv("profileMenu pointer"));
      ui.setOpacity(this.panel, 0);
      this.fA = new c.fA([this.panel], 200);
      var d = ui.getDiv("profMi");
      this.nameEmail = ui.getDiv("nameEmail");
      this.setNameEmail();
      this.editButton = c.button.svg({
        el: ui.getDiv("profButton"),
        svgClass: "svgIcon icon",
        text: "My Profile",
        useId: "editD",
        logger: this.log(),
      });
      ui.appends([this.editButton.el, this.nameEmail], d);
      var f = ui.getDiv("accMi");
      this.accountInfo = ui.getDiv("accTxt");
      this.buyButton = c.button.svg({
        el: ui.getDiv("accountButton"),
        svgClass: "svgIcon icon",
        text: "",
        useId: "purchaseD",
        logger: this.log(),
      });
      this.setAccExpire();
      ui.appends([this.buyButton.el, this.accountInfo], f);
      this.logoutButton = c.button.svg({
        el: ui.getDiv("logButton"),
        text: "",
        svgClass: "svgIcon icon",
        useId: "logoutD",
        logger: this.log(),
      });
      this.setLogBtn();
      var g = ui.getDiv("logMi");
      ui.append(this.logoutButton.el, g);
      ui.appends([d, ui.getDiv("clear"), f, ui.getDiv("clear"), g], this.panel);
      ui.append(this.panel, this.viewer().el);
      this.editButton.click.add(function (d) {
        return b.onProfile();
      });
      this.buyButton.click.add(function (d) {
        return b.onPlans();
      });
      this.logoutButton.click.add(function (d) {
        return b.logoutClick();
      });
      this.icon.click.add(function (d) {
        return b.toggle(d);
      });
      ui.click(this.panel, function (b) {
        ui.isIE11() || ui.stopDefaultPropagation(b);
      });
      this.icon.enable();
    };
    f.prototype.onProfile = function () {
      this.log().w("Profile");
      this.mA.setCurrent(e.clientUser, this.user());
      var b = this.mA.shareView();
      b.options = {
        ctx: b,
        mA: this.mA,
        isAdd: !1,
        isCopy: !1,
        desc: e.clientUser,
        state: !0,
        grid: void 0,
      };
      this.mA.shareView().open();
      this.hide();
    };
    f.prototype.onPlans = function () {
      var b = this;
      this.log().w(this.getBuyText());
      this.hide(200);
      e.isDemoSchool(this.viewer().schoolId())
        ? this.signUp(e.planType.free)
        : this.viewer().get("schools/" + this.user().schoolId + "/account/", {
            done: function (d) {
              return b.onAccDone(d);
            },
          });
    };
    f.prototype.getBuyText = function () {
      return e.isDemoSchool(this.viewer().schoolId())
        ? "Free sign up"
        : "Purchase";
    };
    f.prototype.signUp = function (b) {
      var d = this;
      this.mA.switchToWeb(!1);
      c.timeout(function () {
        d.web().onSgnUp(void 0, b);
      }, 200);
    };
    f.prototype.onAccDone = function (b) {
      if (c.checkSuccess(b, this.viewer())) {
        b = b.data;
        this.viewer().config.acc = b;
        var d =
          b.plan === e.planType.premium
            ? e.planType.premium
            : g.profilePanel.pl(this._t());
        this.signUp(d);
        this.web().signUp.fill(b);
      }
    };
    f.pl = function (b) {
      return 40 < obj.notDel(b.teachers).length
        ? e.planType.premium
        : e.planType.basic;
    };
    f.getBuyMessage = function (b) {
      b = this.pl(b);
      return ui.linkMessage(
        b === e.planType.premium ? "#premium" : "#basic",
        "Buy Now",
      );
    };
    f.prototype.logoutClick = function () {
      new g.saveM(this.mA).loseChg(!0) &&
        (e.isDemoUser(this.user())
          ? (this.log().w("Log in"), this.mA.loginView().open(), this.hide(100))
          : (this.logoutButton.setText("Logging out..."),
            this.mA.loginView().logout()));
    };
    f.prototype.onContactClick = function (b) {
      void 0 === b && (b = !0);
      b && e.isAS(this.mA.vA.config)
        ? g.gotoPage("admin?userId=" + this.user().id, this.mA)
        : (this.hide(), this.log().w("contact"), this.mA.contactView().open());
    };
    f.prototype.setNameEmail = function () {
      var b = this.user(),
        d = e.isDemoUser(this.user())
          ? "Log in or sign up for free"
          : e.displayUser(b),
        f = !!d;
      ui.setHtml(
        this.nameEmail,
        (f ? "<b>" + d + "</b><br />" : "") +
          '<span class="txt">' +
          b.email +
          "</span>" +
          (f ? "" : "<br />&nbsp;"),
      );
    };
    f.prototype.setAccExpire = function () {
      var b = e.isDemoUser(this.user()),
        d = this.viewer().config.exp;
      this.buyButton.setText(this.getBuyText());
      this.buyButton.changeUseId(b ? "rocketD" : "purchaseD");
      var f = new Date(d.expiredAt),
        h = g.getDate(f),
        l = g.getShortDate(f),
        n = "Expires on " + l;
      f = "";
      b || d.expired
        ? (ui.show(ui.setText(this.notifier, "!")),
          (n = b ? "Premium support included" : "Expired on " + l),
          b || (f = " profErr"))
        : 10 > d.expireIn
          ? (ui.show(ui.setText(this.notifier, d.expireIn + "")),
            (f = " profErr"),
            (l = 1 < Math.abs(d.expireIn) ? "days" : "day"),
            (n =
              0 === d.expireIn
                ? "Expires today"
                : 0 > d.expireIn
                  ? "Expired " + Math.abs(d.expireIn) + " " + l + " ago"
                  : "Expires in " + d.expireIn + " " + l))
          : ui.hide(this.notifier);
      d =
        '<span class="txt'.concat(f, '" title="').concat(h, '">') +
        n +
        "</span>";
      b =
        "<b>" +
        (b
          ? "Sign up for 30-day trial"
          : e.getPlanName(this.viewer().config.pl) + " plan") +
        "</b><br />" +
        d;
      ui.setHtml(this.accountInfo, b);
    };
    f.prototype.toggle = function (b) {
      ui.stopDefaultPropagation(b);
      this.isOpen ? this.hide() : this.show();
    };
    f.prototype.show = function () {
      this.isOpen = !0;
      ui.setZIndex(this.panel, ++c.win.zIndex);
      this.fA.toIn(0);
      ui.addClass(this.icon.el, "select");
      this.mA.closeMenus(this);
    };
    f.prototype.hide = function (b) {
      this.isOpen = !1;
      ui.deleteClass(this.icon.el, "select");
      void 0 !== b ? this.fA.toOut(b) : this.fA.toOut(0);
    };
    f.prototype.onUserChange = function () {
      this.setNameEmail();
      this.setAccExpire();
      this.setLogBtn();
    };
    f.prototype.setLogBtn = function () {
      var b = e.isDemoUser(this.user());
      this.logoutButton.setText(b ? "Log In" : "Log Out");
      this.logoutButton.changeUseId(b ? "loginD" : "logoutD");
    };
    return f;
  })(g.baseView);
  g.profilePanel = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      return h.call(this, b, d) || this;
    }
    __extends(f, h);
    f.prototype.go = function () {
      var b = this;
      this.go = c.no;
      var d = this.win;
      d.width = 640;
      d.resizable = d.isModal = !1;
      this.title("Options");
      d.init();
      d.setHelp("#application-options");
      this.skinCombo = new c.combo(this.find(".sknCmb"));
      this.defaultViewCombo = new c.combo(this.find(".viewTypeCombo"));
      this.periodFormatCombo = new c.combo(this.find(".timeCmb"));
      this.resizePeriodsCheck = new c.checkbox(
        this.find(".resizePeriodsCheck"),
      );
      this.intervalInCardsCheck = new c.checkbox(
        this.find(".intervalInCardsCheck"),
      );
      this.reminderCombo = new c.combo(this.find(".reminderCombo"));
      this.rotationCheck = new c.checkbox(this.find(".rotateChk"));
      this.getMore(this.find(".more"), this.find(".moreOptions"), {
        moreText: "Advanced options",
      });
      this.historyCombo = new c.combo(this.find(".historyCombo"));
      d = e.getViewTypePairs();
      this.notifierCheck = new c.checkbox(this.find(".notifyChk"));
      this.tipsCheck = new c.checkbox(this.find(".tipsChk"));
      this.reminderCombo.bind(e.getReminderPairs());
      this.reminderCombo.change.add(function (d, f) {
        return b.onReminderChange(f);
      });
      this.defaultViewCombo.bind(d);
      this.defaultViewCombo.change.add(function (d, f) {
        return b.onDefaultViewChange(f);
      });
      this.periodFormatCombo.bind(e.getPeriodFormatPairs());
      this.periodFormatCombo.change.add(function (d, f) {
        return b.onTimeFormatChange(f);
      });
      this.resizePeriodsCheck.change.add(function (d, f) {
        return b.ok();
      });
      this.intervalInCardsCheck.change.add(function (d, f) {
        return b.ok();
      });
      this.skinCombo.bind(e.getSkinPairs());
      this.skinCombo.change.add(function (d, f) {
        return b.onSkinChg(f);
      });
      this.historyCombo.bind(e.getHistoryStatePairs());
      this.historyCombo.change.add(function (d, f) {
        return b.onMaxStatesChanged(f);
      });
      this.notifierCheck.change.add(function (d, f) {
        return b.ok();
      });
      this.rotationCheck.change.add(function (d, f) {
        return b.ok();
      });
      this.tipsCheck.change.add(function (d, f) {
        return b.ok();
      });
    };
    f.prototype.onSkinChg = function (b) {
      this.ok();
      this.skinValue = b;
      this.mA.vA.skins.load(num.toInt(b));
    };
    f.prototype.onReminderChange = function (b) {
      this.ok();
    };
    f.prototype.onDefaultViewChange = function (b) {
      this.ok();
    };
    f.prototype.onTimeFormatChange = function (b) {
      this.ok();
    };
    f.prototype.onMaxStatesChanged = function (b) {
      g.onHistoryStatesChange(num.toInt(b));
      this.ok();
    };
    f.prototype.open = function () {
      this.go();
      this.mA.vA.skins.preload();
      var b = this.cfg();
      this.skinValue = b.skin.toString();
      this.skinCombo.setValue(b.skin + "");
      this.defaultViewCombo.setValue(b.defaultView + "");
      this.periodFormatCombo.setValue(b.periodFormat + "");
      this.resizePeriodsCheck.check(b.resizePeriods);
      this.intervalInCardsCheck.check(b.intervalInCards);
      this.reminderCombo.setValue(b.reminder + "");
      this.historyCombo.setValue(b.historyStates + "");
      this.notifierCheck.check(!b.hideNotifier);
      this.rotationCheck.check(!b.disableRotate);
      this.tipsCheck.check(!b.hideTips);
      h.prototype.open.call(this);
    };
    f.prototype.ok = function () {
      var b = this,
        d = this.reminderCombo.getNumberValue(),
        f = this.cfg(),
        g = this.allow().freeOrPurchasedCheck();
      d !== f.reminder &&
        g &&
        ((f.reminder = d), this.mA.memory.reminder.setMin(d));
      d = this.defaultViewCombo.getNumberValue();
      f.defaultView !== d &&
        ((f.defaultView = d),
        this.mainView().viewType().toMaster(d),
        this.mainView().changeView());
      f.periodFormat = this.periodFormatCombo.getNumberValue();
      f.resizePeriods = this.resizePeriodsCheck.isChecked();
      f.intervalInCards = this.intervalInCardsCheck.isChecked();
      f.historyStates = this.historyCombo.getNumberValue();
      d = this.notifierCheck.isChecked();
      d !== !f.hideNotifier &&
        ((f.hideNotifier = !d), this.mA.play.toggleNotifier(d));
      f.disableRotate = !this.rotationCheck.isChecked();
      f.hideTips = !this.tipsCheck.isChecked();
      this.inf().showTips = !f.hideTips;
      d = this.skinCombo.getNumberValue();
      f.skin = d;
      this.mainView().vIn.setOptions(
        !f.disableRotate,
        f.periodFormat,
        f.resizePeriods,
        f.intervalInCards,
        !0,
      );
      g &&
        this.viewer().put(
          "users/" + this.user().id + "/options/",
          obj.clone(f, e.userOptions),
          {
            done: function (d) {
              return b.onDone(d);
            },
          },
        );
    };
    f.prototype.onClose = function () {
      this.viewer().hash.dels(["app-options"]);
    };
    f.prototype.onDone = function (b) {
      c.checkSuccess(b, this.viewer());
    };
    f.prototype.cfg = function () {
      return this.viewer().config.user;
    };
    return f;
  })(g.windowView);
  g.optionsView = p;
})(m || (m = {}));
(function (g) {
  var p = (function (g) {
    function f(b, d) {
      return g.call(this, b, d) || this;
    }
    __extends(f, g);
    f.prototype.init = function () {
      this.init = c.no;
      var b = this.win;
      b.width = 320;
      b.height = 200;
      b.resizable = b.addCloseButton = b.closeOnEsc = !1;
      this.title("Check your internet connection");
      b.init();
    };
    f.prototype.open = function () {
      this.init();
    };
    return f;
  })(g.windowView);
  g.offlineView = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function h(f) {
      var b = this;
      this.mA = f;
      this.el = ui.getDiv("cardViewer");
      this.selectedText = ui.getDiv("selTxt");
      this.subjectIcon = ui.getDiv("subjectIcon icon");
      svg.getIcon(this.subjectIcon, "svgIcon", "subjectD");
      this.subjectText = ui.getDiv("sbjTxt");
      this.teacherIcon = ui.getDiv("teacherIcon icon");
      svg.getIcon(this.teacherIcon, "svgIcon", "teacherD");
      this.teacherText = ui.getDiv("tchTxt");
      this.classIcon = ui.getDiv("classIcon icon");
      svg.getIcon(this.classIcon, "svgIcon", "classD");
      this.classText = ui.getDiv("clTxt");
      this.roomIcon = ui.getDiv("roomIcon icon");
      svg.getIcon(this.roomIcon, "svgIcon", "roomD");
      this.roomText = ui.getDiv("roomTxt");
      this.activityIcon = ui.getDiv("lessonIcon icon");
      svg.getIcon(this.activityIcon, "svgIcon", "lessonD");
      ui.click(this.subjectIcon, function (d) {
        return b.onSubjectIcon(d);
      });
      ui.click(this.teacherIcon, function (d) {
        return b.onTeacherIcon(d);
      });
      ui.click(this.roomIcon, function (d) {
        return b.onRoomIcon(d);
      });
      ui.click(this.classIcon, function (d) {
        return b.onClassIcon(d);
      });
      ui.click(this.subjectText, function (d) {
        return b.onSubjectText(d);
      });
      ui.click(this.teacherText, function (d) {
        return b.onTeacherText(d);
      });
      ui.click(this.roomText, function (d) {
        return b.onRoomTxt(d);
      });
      ui.click(this.classText, function (d) {
        return b.onClassText(d);
      });
      ui.click(this.activityIcon, function (d) {
        return b.onActivity(d);
      });
      ui.appends(
        [
          this.selectedText,
          this.subjectIcon,
          this.subjectText,
          this.teacherIcon,
          this.teacherText,
          this.classIcon,
          this.classText,
          this.roomIcon,
          this.roomText,
          this.activityIcon,
        ],
        this.el,
      );
      ui.hint(this.activityIcon, "Edit activity", c.hintPos.top);
      ui.hint(this.subjectIcon, "Show/hide subject extra view", c.hintPos.top);
      ui.hint(this.teacherIcon, "Show/hide teacher extra view", c.hintPos.top);
      ui.hint(this.roomIcon, "Show/hide room extra view", c.hintPos.top);
      ui.hint(this.classIcon, "Show/hide class extra view", c.hintPos.top);
      ui.append(this.el, this.mA.vA.bott);
      this.mA.vA.resize.add(function (d) {
        return b.onResize();
      });
      this.mA._v.g.cChg.add(function (d) {
        return b.onSelectionChanged(d);
      });
      this.mA.viewEvents.extraAdd.add(function (d) {
        return b.updateExtraViews();
      });
      this.mA.viewEvents.extraRemove.add(function (d) {
        return b.updateExtraViews();
      });
      g.descChange.add(function (d) {
        return b.onDescChange(d);
      });
    }
    h.prototype.onDescChange = function (f) {
      this.needRefresh(f) && this.set(this.card);
    };
    h.prototype.needRefresh = function (f) {
      if (!this.card) return !1;
      var b = 0;
      for (f = f.done; b < f.length; b++) {
        var d = f[b],
          k = d.desc.type;
        if (d.type !== g.actionType.add) {
          var h = [],
            l = g.getActivity(this.card);
          k === e.type.card
            ? (h = [this.card])
            : k === e.type.activity
              ? (h = [l])
              : k === e.type.subject
                ? (h = [l.subject])
                : k === e.type.teacher
                  ? (h = l.teachers)
                  : k === e.type.class
                    ? (h = l.groups.map(function (b) {
                        return e.getClass(b);
                      }))
                    : k === e.type.group
                      ? (h = l.groups)
                      : k === e.type.room && (h = e.allRooms(this.card));
          if (0 < h.length && arr.hasOneEqual(h, d.entities)) return !0;
        }
      }
      return !1;
    };
    h.prototype.reset = function () {
      this.mA._v.g.resetSelection();
    };
    h.prototype.onSelectionChanged = function (f) {
      this.set(f);
    };
    h.prototype.onResize = function () {
      this.set(this.card);
    };
    h.prototype.set = function (f) {
      if ((this.card = f))
        if (obj.isDel(f)) this.reset();
        else {
          var b = this.mA._v.g.cs.length,
            d = this.card.parent.teachers,
            g = this.card.parent.groups;
          f = c.windowWidth() / 2 - 28;
          var h = 1 < b ? b + " selected" : "",
            l = this.card.parent.subject.shortName,
            n = arr.joinCommaSpace(arr.take(e.shorts(d), 3)),
            t = arr.joinCommaSpace(
              arr.take(
                g.map(function (b) {
                  return e.groupShort(b);
                }),
                4,
              ),
            );
          b = this.getRoomText(this.card);
          this.el.style.width = "auto";
          ui.show(this.el, "block");
          ui.setText(this.selectedText, h);
          ui.setText(this.subjectText, l);
          ui.setText(this.teacherText, n);
          ui.setText(this.classText, t);
          ui.setText(this.roomText, b);
          ui.toggle(this.roomText, !!b);
          ui.toggle(this.roomIcon, !!b);
          ui.hint(
            this.subjectText,
            "Edit " + this.card.parent.subject.name,
            c.hintPos.top,
          );
          0 < d.length &&
            ui.hint(
              this.teacherText,
              "Edit " +
                d[0].name +
                (1 < d.length ? " - " + arr.joinCommaSpace(e.shorts(d)) : ""),
              c.hintPos.top,
            );
          0 < g.length &&
            ui.hint(
              this.classText,
              "Edit " +
                g[0].parent.parent.name +
                (1 < g.length
                  ? " - " +
                    arr.joinCommaSpace(
                      g.map(function (b) {
                        return e.groupShort(b);
                      }),
                    )
                  : ""),
              c.hintPos.top,
            );
          d = e.allRooms(this.card);
          0 < d.length &&
            ui.hint(
              this.roomText,
              "Edit " + d[0].name + (1 < d.length ? " - " + b : ""),
              c.hintPos.top,
            );
          d = [
            this.selectedText,
            this.subjectIcon,
            this.subjectText,
            this.teacherIcon,
            this.teacherText,
            this.classIcon,
            this.classText,
            this.roomIcon,
            this.roomText,
            this.activityIcon,
          ];
          ui.hides(d);
          b || (arr.remove(d, this.roomText), arr.remove(d, this.roomIcon));
          for (g = 0; g < d.length; g++) {
            var w = (b = d[g]);
            ui.deleteClass(b, "ellipses");
            b.style.width = "auto";
            ui.show(b);
            h = ui.getComputedWidth(this.el);
            h = f - h;
            if (0 > h) {
              ui.hasClass(b, "icon")
                ? ui.hide(b)
                : ((d = ui.getComputedWidth(b) + h),
                  10 > d
                    ? ui.hide(b)
                    : (ui.setWidth(b, d), ui.addClass(b, "ellipses")));
              break;
            }
          }
          w && ui.getComputedWidth(this.el) > f && ui.hide(w);
        }
      else ui.hide(this.el);
    };
    h.prototype.getRoomText = function (f) {
      var b = arr.joinCommaSpace(e.shorts(f.rooms)),
        d = arr.joinCommaSpace(e.shorts(arr.take(f.parent.rooms, 3)));
      f = arr.joinCommaSpace(e.shorts(arr.take(f.parent.moreRooms, 2)));
      return (
        b +
        (0 !== d.length ? " [" + d + "]" : "") +
        (0 !== f.length ? " (" + f + ")" : "")
      );
    };
    h.prototype.updateExtraViews = function () {
      var f = this.mA.viewEvents.extraViews;
      ui.toggleClass(this.subjectIcon, "select", f.has(e.vMod.s));
      ui.toggleClass(this.teacherIcon, "select", f.has(e.vMod.t));
      ui.toggleClass(this.roomIcon, "select", f.has(e.vMod.r));
      ui.toggleClass(this.classIcon, "select", f.has(e.vMod.c));
    };
    h.prototype.onSubjectText = function (f) {
      this.card &&
        (this.onItem(f),
        this.setSubject(this.card),
        this.mA.menu().onSubjects());
    };
    h.prototype.onTeacherText = function (f) {
      this.card &&
        (this.onItem(f),
        this.setTeacher(this.card),
        this.mA.menu().onTeachers());
    };
    h.prototype.onRoomTxt = function (f) {
      this.card &&
        (this.onItem(f), this.setRoom(this.card), this.mA.menu().onRooms());
    };
    h.prototype.onClassText = function (f) {
      this.card &&
        (this.onItem(f), this.setClass(this.card), this.mA.menu().onClasses());
    };
    h.prototype.onActivity = function (f) {
      this.onItem(f);
      this.mA.setCurrent(e.activity, this.card.parent);
      this.mA.menu().onActivities();
    };
    h.prototype.onClassIcon = function (f) {
      this.onExtraView(e.vMod.c, f);
    };
    h.prototype.onTeacherIcon = function (f) {
      this.onExtraView(e.vMod.t, f);
    };
    h.prototype.onRoomIcon = function (f) {
      this.onExtraView(e.vMod.r, f);
    };
    h.prototype.onSubjectIcon = function (f) {
      this.onExtraView(e.vMod.s, f);
    };
    h.prototype.setTeacher = function (f) {
      0 < f.parent.teachers.length &&
        this.mA.setCurrent(e.teacher, f.parent.teachers[0]);
    };
    h.prototype.setSubject = function (f) {
      this.mA.setCurrent(
        e.subject,
        e.byId(this.mA._t().subjects, f.parent.subjectId),
      );
    };
    h.prototype.setClass = function (f) {
      f = f.parent.groups;
      0 < f.length && this.mA.setCurrent(e._class, f[0].parent.parent);
    };
    h.prototype.setRoom = function (f) {
      0 < f.rooms.length && this.mA.setCurrent(e.room, f.rooms[0]);
    };
    h.prototype.onExtraView = function (f, b) {
      this.onItem(b);
      this.mA.viewEvents.extraViews.toggle(f);
    };
    h.prototype.onItem = function (f) {
      f && ui.stopDefaultPropagation(f);
    };
    return h;
  })();
  g.statusBar = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function g(f, b, d, g, h, l, n, t) {
      void 0 === t && (t = !0);
      var k = this;
      this.dock = this._is1Open = !0;
      this.mA = f;
      this.xVs = b;
      this.vMod = d.entityType - 1;
      this.prevDockV = n;
      this.dock = t;
      b = this.win = new c.win(f.vA, "");
      var q = t ? 40 : 240,
        x = t ? 20 : 80;
      n = this.mainV();
      b.isModal = b.draggable = b.anim = !1;
      b.closeOnEsc = b.center = b.resizable = !t;
      t && (b.bringToTop = b.focusTabbable = c.no);
      b.minWidth = q;
      b.minHeight = x;
      b.height = h;
      b.width = Math.max(n.el.clientWidth, q);
      t
        ? ((b.left = 0), (b.top = Math.max(l + ui.getComputedHeight(f.vA.top))))
        : f.vA.inf.addTip(
            "Drag and resize floated window to best fit your screen. Click the first column to switch to individual view.",
          );
      ui.addClass(b.el, "extraWin" + (t ? " dock" : ""));
      b.init();
      ui.click(b.el, function (b) {
        return k.onClk(b);
      });
      ui.addClass(b.content, "extraView");
      h = new v.input(this.xVs.mA._t());
      h.mainType = r.mainType.extra;
      h.el = b.content;
      h.viewHeightPercentage = g;
      h.splitterLeft = n.size.splitterLeft;
      h.dock = t;
      f.vA.layout.setVIn(h);
      f = r.newViewType(d);
      h.viewType = f;
      f = this._v = new v.view(this.xVs.mA.vA, this.mainV().g);
      if (t) {
        var y = (this.splEl = ui.getDiv("horSpl"));
        d = this.sDrg = new ui.drag(y);
        ui.over(y, function (b, d) {
          return ui.toggleClass(y, "over", d);
        });
        ui.setWidth(y, b.width);
        ui.setLeftTop(y, 0, b.top - r.splitterHeight);
        ui.append(y, f.vA.el);
        d.setTop = d.setLeft = c.no;
        d.start.add(function (b, d) {
          return k.splt1(b);
        });
        d.move.add(function (b, d) {
          return k.spltChg(b);
        });
        d.end.add(function (b, d) {
          return k.spltN(b);
        });
      }
      b.resize.add(function () {
        return k.onResize();
      });
      b.closed.add(function (b) {
        return k.onX(b);
      });
      b.open();
      f.init(h);
      f.done.add(function (b) {
        return k.onDrawDone();
      });
      this.onOpen();
      b.opened.add(function () {
        return k.onOpen();
      });
      f.vIn.viewTypeChange.add(function (b) {
        return k.onVTyChg(b);
      });
      f.adornerChange.add(function (b) {
        return k.onAdorChg(b);
      });
      t &&
        ((t = this.floatEl = ui.getDiv("floatIcon")),
        (t.innerHTML =
          '<svg class="svgIcon floatSvg"><use xlink:href="#maxD" /></svg>'),
        ui.append(t, b.content),
        ui.hint(t, "Open in new window", c.hintPos.left),
        ui.click(t, function (b) {
          return k.openFloatView(b);
        }));
    }
    g.prototype.openFloatView = function (f) {
      this.x();
      this.xVs.add(this._v.viewType().view, !1);
    };
    g.prototype.splt1 = function (f) {
      this._v.g.onMenuX();
    };
    g.prototype.spltChg = function (f) {
      var b = this._v,
        d = f.top + f.dy;
      (0 < f.dy && this.isVHMin(b)) ||
        (0 > f.dy && this.isVHMin(this.prevDockV)) ||
        ((f.top = d),
        ui.setTop(f.el, d),
        (f = (100 * f.dy) / b.size.viewsAreaHeight),
        this.prevDockV.input.setViewHeightPercentage(
          this.prevDockV.input.viewHeightPercentage + f,
        ),
        this._v.input.setViewHeightPercentage(
          this._v.input.viewHeightPercentage - f,
        ),
        this.mA.viewEvents.updateDockPositions());
    };
    g.prototype.isVHMin = function (f) {
      return f.size.container.height < 20 + f.size.getHeaderHeight();
    };
    g.prototype.spltN = function (f) {
      f = this._v;
      ui.deleteClass(this.sDrg.el, "drag");
      f.status = r.viewStatus.default;
    };
    g.prototype.onClk = function (f) {
      this._v.g.onMenuX();
    };
    g.prototype.onResize = function () {
      this._v.onResize();
    };
    g.prototype.onVTyChg = function (f) {
      this.ve = f.ve;
    };
    g.prototype.vName = function () {
      return this._v.viewType().name() + " extra view";
    };
    g.prototype.onOpen = function () {
      this._v.refresh();
    };
    g.prototype.onDrawDone = function () {
      this._is1Open = !1;
      this._v.isFloat() &&
        ((this.win.draggable = !0),
        this.win.setDrag(
          this._v.output.dayPanels.map(function (f) {
            return f.el;
          }),
        ));
    };
    g.prototype.onAdorChg = function (f) {
      this.xVs.onAdorChg(f, this._v, !1);
    };
    g.prototype.x = function () {
      this.win.close();
    };
    g.prototype.onX = function (f) {
      this.xVs.remove(this);
      this.mA.viewEvents.onExtraRemove(this);
    };
    g.prototype.getTargetV = function (f) {
      return f ? this._v : this.mainV();
    };
    g.prototype.mainV = function () {
      return this.xVs._v;
    };
    g.prototype.loc = function () {
      return this.xVs._v.vA.loc;
    };
    return g;
  })();
  g.extraView = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function h(f, b) {
      var d = this;
      this._all = [];
      this.mA = f;
      this._v = b;
      b.adornerChange.add(function (b) {
        return d.onMainAdorChg(b);
      });
      f.vA.isPublish() ||
        b.extraRequested.add(function (b) {
          return d.onExtraRequested(b);
        });
    }
    h.prototype.onExtraRequested = function (f) {
      this.toggleView(f);
    };
    h.prototype.delIndividuals = function () {
      this._all
        .filter(function (f) {
          return f._v.is1();
        })
        .forEach(function (f) {
          return f.x();
        });
    };
    h.prototype.toggle = function (f) {
      this.close(f) || ((f = e.findViewIndex(this.mA._t(), f)), this.add(f));
    };
    h.prototype.toggleView = function (f) {
      if (f.isDefault) this.toggle(f.entityType - 1);
      else {
        var b = this._all.filter(function (b) {
          return b._v.viewType().view.id === f.id;
        });
        b.forEach(function (b) {
          return b.x();
        });
        0 === b.length && this.add(f);
      }
    };
    h.prototype.close = function (f) {
      f = this.filter(f, !0, !1);
      f.forEach(function (b) {
        return b.x();
      });
      return 0 !== f.length;
    };
    h.prototype.add = function (f, b) {
      void 0 === b && (b = !0);
      this.mA.vA.inf.addTip(
        "Drag card and follow its shadow to avoid conflicts." +
          g.videoGuide("gCeA_05Tyig", "#extra"),
      );
      for (
        var d = this._v,
          k = d.input.viewHeightPercentage,
          h = 0,
          l = this._v.g.vs;
        h < l.length;
        h++
      ) {
        var n = l[h];
        n.input.dock &&
          k < n.input.viewHeightPercentage &&
          ((k = n.input.viewHeightPercentage), (d = n));
      }
      k = (k = this._all
        .slice()
        .reverse()
        .find(function (b) {
          return b.dock;
        }))
        ? k._v
        : this._v;
      h = this._v.size.viewsAreaHeight;
      l = r.splitterHeight;
      l = Math.floor((h - this._v.size.getHeaderHeight() - 2 * l) / 3);
      n = this._v.size.getRowHeight();
      l = Math.floor(l / n) * n + (b ? 0 : this._v.size.getHeaderHeight());
      h = (100 * l) / h;
      b &&
        d.input.setViewHeightPercentage(
          d.input.viewHeightPercentage - h - this.splPrc(),
        );
      d = b ? this.mA.viewEvents.updateDockPositions() : 200;
      f = new g.extraView(this.mA, this, f, h, l, d, k, b);
      this._all.push(f);
      this._v.g.addView(f._v);
      this.mA.viewEvents.onExtraAdd(f);
    };
    h.prototype.splPrc = function () {
      return (100 * r.splitterHeight) / this.mA._v.size.viewsAreaHeight;
    };
    h.prototype.remove = function (f) {
      var b = f._v.input;
      b.dock &&
        this._v.input.setViewHeightPercentage(
          this._v.input.viewHeightPercentage +
            b.viewHeightPercentage +
            this.splPrc(),
        );
      arr.remove(this._all, f);
      arr.remove(this._v.g.vs, f._v);
      b.dock && (ui.remove(f.splEl), this.mA.viewEvents.updateDockPositions());
      f = this._v;
      b = 0;
      for (var d = this._all; b < d.length; b++) {
        var g = d[b];
        g.dock && ((g.prevDockV = f), (f = g._v));
      }
    };
    h.prototype.show = function (f) {
      for (var b = 0, d = this._all; b < d.length; b++) {
        var g = d[b];
        f ? g.win.show() : g.win.hide();
      }
    };
    h.prototype.hasXVs = function () {
      return 0 < this._all.length;
    };
    h.prototype.has = function (f) {
      return 0 !== this.filter(f, !0, !1).length;
    };
    h.prototype.filter = function (f, b, d) {
      return this._all.filter(function (g) {
        return (
          g._v.viewType().i === f &&
          (b ? !0 : !g._v.viewType().is1()) &&
          (d ? !0 : !g._v.isFloat())
        );
      });
    };
    h.prototype.onMainAdorChg = function (f) {
      if (this.hasXVs()) this.onAdorChg(f, this._v, !0);
    };
    h.prototype.onAdorChg = function (f, b, d) {
      var g = this;
      d || this.updAdor(f, this._v, d);
      this.allVs()
        .filter(function (g) {
          return d ? !0 : g !== b || f.state === v.adorState.r;
        })
        .forEach(function (b) {
          return g.updAdor(f, b, d);
        });
    };
    h.prototype.updAdor = function (f, b, d) {
      var g = this;
      b.vcs
        .filter(function (b) {
          return b.card() === f.vc.card();
        })
        .forEach(function (k) {
          return g.updateVcAdor(k, f, b, d);
        });
    };
    h.prototype.updateVcAdor = function (f, b, d, g) {
      if (b.state === v.adorState.r) f.drag.delAdor(!1);
      else if (
        (b.state === v.adorState.a && f.drag.addAdor(d.zI.dragC + 1),
        (g = f.drag.ador))
      ) {
        g = g._el;
        var k = ui.isVisible(b._el);
        ui.toggle(g, k);
        if (k) {
          k = d.size;
          b.updateVcPos();
          var l = b.newVcPos;
          b = r.getPositionIndex(-1, -1);
          var h = f.cw() - 3,
            t = f.ch() - 3,
            w = 0,
            u = d.is1();
          f = f.rowPos() - 1;
          l.isOutRight()
            ? (u && (f = 0), (d = k.timetable.width + k.splitterWidth))
            : ((w = l.getDay()),
              (l = l.getPeriod()),
              (w = r.getColumnIndex(d, w, l, d.data.periodsCount, u)),
              (d = k.columnLefts[w]),
              u && (f = l.position - 1));
          k = f * k.getRowHeight();
          ui.setWidthHeight(g, h, t);
          ui.setLeftTop(g, d, k);
          b.columnIndex = w;
          b.rowIndex = f;
        }
      }
    };
    h.prototype.allVs = function () {
      return this._all.map(function (f) {
        return f._v;
      });
    };
    return h;
  })();
  g.extraViews = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function h(f) {
      var b = this;
      this.mA = f;
      var d = f._v.g;
      this.extraViews = new g.extraViews(f, f._v);
      this.extraAdd = c.callback();
      this.extraRemove = c.callback();
      d.dockChange.add(function () {
        return b.updateDockPositions(!1);
      });
      d.markerDraw.add(function (b) {
        return g.drawMark(b);
      });
      d.markerEnd.add(function (b, d, l) {
        return g.onMarkerEnd(b, l, f);
      });
      d.pin.add(function (b, d, l) {
        return g.pin(b, d, l, { mA: f });
      });
      d.remove.add(function (b, d) {
        return g.remove(b, d, { mA: f });
      });
      d.drop.add(function (b, d) {
        return g.afterDrop(b, d, { mA: f });
      });
    }
    h.prototype.updateDockPositions = function (f) {
      void 0 === f && (f = !0);
      for (
        var b = this.mA._v.g.vs,
          d = b.length,
          g = ui.getComputedHeight(this.mA.vA.top),
          h = 0,
          l = 0;
        l < d;
        l++
      ) {
        var n = b[l];
        f && n.resize(new r.upd(r.updTy.r));
        if (n.isDockExtra()) {
          var t = this.extraViews._all[l - 1],
            w = t.win;
          w.top = h + g;
          w.setHeight(n.size.container.height);
          w.setWidth(n.size.container.width);
          w.setPosition();
          ui.setLeftTop(t.splEl, 0, w.top - r.splitterHeight);
          ui.setWidth(t.splEl, n.size.container.width);
        }
        n.input.dock && (h += n.size.container.height + r.splitterHeight);
      }
      return h;
    };
    h.prototype.dropTool = function () {
      for (var f = !1, b = this.mA._v.g, d = 0, g = b.vs; d < g.length; d++)
        b.xTool(g[d]) && (f = !0);
      return f;
    };
    h.prototype.onExtraAdd = function (f) {
      this.extraAdd.fire(f);
    };
    h.prototype.onExtraRemove = function (f) {
      this.extraRemove.fire(f);
    };
    return h;
  })();
  g.viewEvents = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b) {
      var d = h.call(this, b) || this;
      d.markTy = v.markType.forbidden;
      d.tool = void 0;
      d.el = ui.getDiv("boardTools");
      d.markIc = ui.getDiv("markerIcon forbidden");
      d.markSvg = svg.embed(
        "markerD",
        b.vA.svgDef,
        d.markIc,
        "svgIcon forbidden",
      );
      d.pinIc = ui.title(ui.getDiv("pinIcon"), "Pin or unpin cards");
      svg.getIcon(d.pinIc, "svgIcon", "pinD");
      d.spongeIc = ui.title(ui.getDiv("spongeIcon"), "Clear cards");
      svg.getIcon(d.spongeIc, "svgIcon", "spongeD");
      var f = ui.getDiv("zoomIcon");
      svg.getIcon(f, "svgIcon", "zoomD");
      d.cursEl = d.find(".customCursor");
      ui.appends([d.markIc, d.pinIc, d.spongeIc, f], d.el);
      ui.append(d.el, d.viewer().bott);
      d.markPick = new g.markPick(b, d.markIc);
      ui.click(d.markIc, function (b) {
        d.markPick.onClk(b);
      });
      ui.over(d.markIc, function (b, f) {
        return f ? d.markPick.onOver(b) : d.markPick.onOut(b);
      });
      ui.click(d.pinIc, function (b) {
        d.pinClk(b);
      });
      ui.over(d.pinIc, function (b, f) {
        return ui.toggleClass(d.pinIc, "over", f);
      });
      ui.click(d.spongeIc, function (b) {
        d.spongeClk(b);
      });
      ui.over(d.spongeIc, function (b, f) {
        return ui.toggleClass(d.spongeIc, "over", f);
      });
      d.mainView().g.toolChg.add(function (b, f) {
        return d.onToolChg(b, f);
      });
      var q = d.viewer().el;
      ui.on(q, ui.getTouchMove(), function (b) {
        return d.onMouseMov(b);
      });
      ui.on(d.cursEl, "mousedown", function (b) {
        return d.onCursorDown(b);
      });
      d.mainView().cursorMove.add(function (b) {
        return d.onCurMov(b);
      });
      d.zoom = new g.zoom(b, f);
      return d;
    }
    __extends(f, h);
    f.prototype.onCurMov = function (b) {
      this.onMouseMov(b);
    };
    f.prototype.onCursorDown = function (b) {
      ui.preventDefault(b);
      return !1;
    };
    f.prototype.onMouseMov = function (b) {
      this.chkMov(this.tool) &&
        ((b = ui.getTouchPoint(b)),
        (this.viewer().pos = b),
        this.movCurs(b, !1));
    };
    f.prototype.chkMov = function (b) {
      return !!b && !b.no() && this.isCustom();
    };
    f.prototype.isCustom = function () {
      return ui.isExplorer() || ui.isPhoneOrTablet();
    };
    f.prototype.movCurs = function (b, d) {
      void 0 === d && (d = !0);
      var f = this.tool;
      if (!d || this.chkMov(f))
        (f.isPin()
          ? b.mov(-5, -28)
          : f.isMark()
            ? f.isEraser()
              ? b.mov(-12, -27)
              : b.mov(-5, -27)
            : b.mov(-16, -18),
          (this.cursEl.style.cssText = "left:" + b.x + "px;top:" + b.y + "px"),
          ui.setLeftTop(this.cursEl, b.x, b.y));
    };
    f.prototype.onToolChg = function (b, d) {
      this.mA.marksPanel().win.close();
      this.zoom.isOpen && !d.no() && this.zoom.show(!1);
      this.chkMov(b) && ui.deleteClass(this.cursEl, b.clName());
      if (d.isMark()) {
        var f = d.markType,
          h = g.markerClasses.slice();
        ui.addClass(this.markIc, h[f]);
        arr.removeAt(h, f);
        ui.deleteClass(this.markIc, arr.join(h, " "));
        this.markTy = f;
        this.inf().addTip(this.getInf(this.markTy));
        this.log().w("".concat(d.name(), " picked"));
      }
      this.tool = d;
      this.mainView().g.chkMarkerChg(b, d);
      this.showNewTool();
    };
    f.prototype.getInf = function (b) {
      var d = "Use the red marker to draw forbidden positions.";
      b === e.markTy.a
        ? (d = "Use the eraser to erase already drawn marks.")
        : b === e.markTy.m
          ? (d = "Use the blue marker to draw mandatory positions.")
          : b === e.markTy.u &&
            (d = "Use the yellow marker to draw unwanted positions.");
      return (d += g.videoGuide("-NCOSPEJrbI", "#marker"));
    };
    f.prototype.showNewTool = function () {
      var b = this,
        d = this.tool,
        f = g.markerClasses.slice(),
        h = this.isCustom(),
        l = this.viewer().el,
        n = "tool" + (h ? " custom" : "");
      f.push("sponge", "pin");
      [this.markIc, this.pinIc, this.spongeIc].forEach(function (b) {
        return ui.deleteClass(b, "select");
      });
      d.isMark()
        ? ui.addClass(this.markIc, "select")
        : d.isSponge()
          ? ui.addClass(this.spongeIc, "select")
          : d.isPin() && ui.addClass(this.pinIc, "select");
      ui.deleteClass(l, arr.join(f, " "));
      !d || d.no()
        ? (ui.switchClass(l, n, "cursor"),
          h && ui.hide(this.cursEl),
          this.log().w("tool dropped"))
        : (ui.switchClass(l, "cursor", n),
          (f = d.clName()),
          h
            ? (ui.addClass(this.cursEl, f),
              this.movCurs(this.viewer().pos),
              ui.show(this.cursEl))
            : ui.addClass(this.viewer().el, f),
          this.log().w(f + " selected"),
          d._1.add(function () {
            return b.on();
          }),
          d._n.add(function () {
            return b.off();
          }));
    };
    f.prototype.on = function () {
      this.isCustom() && ui.addClass(this.cursEl, "working");
    };
    f.prototype.off = function () {
      this.isCustom() && ui.deleteClass(this.cursEl, "working");
    };
    f.prototype.onMarkClk = function (b, d) {
      void 0 === d && (d = !1);
      this.chkMarkerAvail() &&
        ((d = d ? this.mainView().g.tool().isMark() : !1),
        (d = new v.markerTool(
          this.mainView(),
          d ? v.toolType.none : v.toolType.marker,
        )),
        (d.markType = b),
        this.mainView().g.setTool(d));
    };
    f.prototype.togMark = function () {
      this.onMarkClk(this.markTy, !0);
    };
    f.prototype.onMarkerClick = function (b) {
      this.chkMarkerAvail() && this.mainView().g.setTool(b);
    };
    f.prototype.chkMarkerAvail = function () {
      return this.mainView().g.vs.some(function (b) {
        return 0 !== b.data.rowsCount;
      })
        ? !0
        : (this.inf().add(
            this.loc().get(
              "AddResourceMessage",
              "Add some resources first, e.g. choose 'Owl > Manage > Classes > Add'. " +
                this.viewer().addWatchIntroVideos(),
            ),
          ),
          !1);
    };
    f.prototype.pinClk = function (b) {
      this.canPinSponge(!0) &&
        (this.inf().addTip(
          this.loc().get(
            "PinUsageMessage",
            "Pinned cards won't be moved while improving timetable." +
              g.videoGuide("Etisa_ZEVsg", "#pin"),
          ),
        ),
        (b = new v.pinTool(
          this.mainView().g.tool().isPin() ? e.toolTy.n : e.toolTy.p,
        )),
        this.mainView().g.setTool(b));
    };
    f.prototype.spongeClk = function (b) {
      this.canPinSponge(!1) &&
        (keys.ctrlOrAltOrShift(b)
          ? this.mainView().vEv.vcM.xAll()
          : (this.inf().addTip(
              this.loc().get(
                "SpongeUsageMessage",
                "Use the sponge to clear cards from the timetable." +
                  g.guide("#remove-cards"),
              ),
            ),
            this.mainView().g.setTool(
              new v.spongeTool(
                this.mainView().g.tool().isSponge() ? e.toolTy.n : e.toolTy.s,
              ),
            )));
    };
    f.prototype.canPinSponge = function (b) {
      return (this.mainView().g.tool().isSponge() && !b) ||
        (this.mainView().g.tool().isPin() && b)
        ? !0
        : g.hasCards(this.mA, !0) && (b || this.hasPlacedCards());
    };
    f.prototype.hasPlacedCards = function () {
      var b = this.mA._t().cards.some(function (b) {
        return e.isIn(b);
      });
      b || this.inf().add("There are no scheduled cards to remove. ");
      return b;
    };
    f.prototype.rowH = function () {
      return this.mainView().size.getRowHeight();
    };
    return f;
  })(g.baseView);
  g.tools = p;
  p = (function (g) {
    function f(b, d) {
      var f = g.call(this, b) || this;
      f.is2Clk = !1;
      f.isClkOpen = !1;
      f.to = 0;
      f.cls = ["eraser", "mandatory", "unwanted", "forbidden"];
      f.is = [e.markTy.a, e.markTy.m, e.markTy.u, e.markTy.f];
      f.mA = b;
      f.el = d;
      f.go();
      return f;
    }
    __extends(f, g);
    f.prototype.go = function () {
      var b = this;
      this.me = ui.getDiv("markerPicker");
      for (var d = 0; 4 > d; d++) {
        var f = ui.getDiv("markerItem " + this.cls[d]);
        3 === d && ui.addClass(f, "last");
        ui.dat(f, "i", this.is[d] + "");
        svg.embed("markerD", this.viewer().svgDef, f, "svgIcon");
        var g = "Erase marks";
        1 === d
          ? (g = "Draw mandatory positions")
          : 2 === d
            ? (g = "Draw unwanted positions")
            : 3 === d && (g = "Draw forbidden positions");
        ui.hint(f, g, c.hintPos.left);
        ui.click(f, function (d) {
          return b.onItClk(d);
        });
        ui.on(f, "mouseenter", function (d) {
          return b.onItIn(d);
        });
        ui.on(f, "mouseleave", function (d) {
          return b.onItOut(d);
        });
        ui.append(f, this.me);
      }
      ui.on(this.me, "mouseenter", function (d) {
        return b.onIn(d);
      });
      this.hide();
      ui.append(this.me, this.mA.vA.el);
    };
    f.prototype.onClkExp = function () {
      this.is2Clk = !1;
    };
    f.prototype.onOver = function (b) {
      ui.addClass(this.el, "over");
      this.setX();
      this.onClk(b, !0);
      this.xTo();
    };
    f.prototype.onClk = function (b, d) {
      var f = this;
      void 0 === d && (d = !1);
      ui.stopDefaultPropagation(b);
      c.timeout(function () {
        return f.onClkExp();
      }, ui.clickTimeout);
      this.is2Clk ||
        ((this.is2Clk = !0),
        (b = ui.isVisible(this.me)),
        b || d || (this.isClkOpen = !0),
        b || this.setX(),
        ui.toggle(this.me, !b),
        this.mainView().g.tool().isMark() && this.mA.tools.togMark());
    };
    f.prototype.setX = function () {
      ui.setLeft(this.me, ui.offset(this.el).x);
    };
    f.prototype.onOut = function (b) {
      ui.deleteClass(this.el, "over");
      this.hideTo();
    };
    f.prototype.xTo = function () {
      clearTimeout(this.to);
    };
    f.prototype.hideTo = function () {
      var b = this;
      this.xTo();
      this.to = c.timeout(function () {
        return b.onToOut();
      }, 350);
    };
    f.prototype.onToOut = function () {
      this.hide();
    };
    f.prototype.hide = function () {
      ui.hide(this.me);
      this.isClkOpen = !1;
    };
    f.prototype.onIn = function (b) {
      this.xTo();
    };
    f.prototype.onMenuOut = function (b) {};
    f.prototype.onItClk = function (b) {
      this.mA.tools.onMarkClk(ui._datI(b));
      this.hide();
    };
    f.prototype.onItIn = function (b) {
      this.xTo();
      ui.addClass(ui.target(b), "over");
    };
    f.prototype.onItOut = function (b) {
      ui.deleteClass(ui.target(b), "over");
      this.hideTo();
    };
    return f;
  })(g.baseView);
  g.markPick = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function g(f, b) {
      var d = this;
      this.maxVz = 500;
      this.maxXz = 2e3;
      this.isOpen = !1;
      this.mA = f;
      this.icon = b;
      ui.over(b, function (b, f) {
        return ui.toggleClass(d.icon, "over", f);
      });
      ui.click(b, function (b) {
        return d.onZoomClick(b);
      });
    }
    g.prototype.init = function () {
      var f = this;
      this.init = c.no;
      this.panel = ui.getDiv("zoomPanel");
      this.zoomV = ui.getDiv("zoomV");
      this.zYinf = ui.getDiv("zYinf");
      this.zYreset = ui.getDiv("zYreset");
      svg.getIcon(this.zYreset, "zReset", "closeD");
      this.zYtxt = ui.getDiv("zYtxt");
      var b = (this.verSld = c.progress.el(
        this.viewer(),
        this,
        this.zoomV,
        c.progressType.vertical,
      ));
      b.setSlider(!0);
      ui.setTabIndex(b.el, 0);
      ui.addClass(b.background, "blue");
      this.zoomH = ui.getDiv("zoomH");
      this.zXinf = ui.getDiv("zXinf");
      this.zXreset = ui.getDiv("zXreset");
      svg.getIcon(this.zXreset, "zReset", "closeD");
      this.zXtxt = ui.getDiv("zXtxt");
      var d = (this.horSld = c.progress.el(
        this.viewer(),
        this,
        this.zoomH,
        c.progressType.horizontal,
      ));
      d.setSlider(!0);
      ui.setTabIndex(d.el, 0);
      ui.addClass(d.background, "blue");
      ui.hides([this.panel, this.zXreset, this.zYreset]);
      b.xChange.add(function (b, d) {
        return f.onZoomChg(!0, b, d);
      });
      d.xChange.add(function (b, d) {
        return f.onZoomChg(!1, b, d);
      });
      ui.appends([this.zYreset, this.zYtxt], this.zYinf);
      ui.appends([this.zXreset, this.zXtxt], this.zXinf);
      ui.appends([this.zYinf, this.zoomV, this.zXinf, this.zoomH], this.panel);
      ui.append(this.panel, this.viewer().el);
      this.setZoomPrc(!0, this.mA._v.size.getZoomY(), !1);
      this.setZoomPrc(!1, this.mA._v.size.getZoomX(), !1);
      ui.click(this.zYreset, function (b) {
        return f.onZX(b, !0);
      });
      ui.click(this.zXreset, function (b) {
        return f.onZX(b, !1);
      });
      ui.click(this.panel, function (b) {
        return f.onZoomPanelClk(b);
      });
      ui.on(this.panel, "keydown", function (b) {
        return f.onZoomPanelKey(b);
      });
    };
    g.prototype.onZoomClick = function (f) {
      ui.stopPropagation(f);
      this.init();
      this.toggle();
    };
    g.prototype.toggle = function () {
      this.show(!this.isOpen);
    };
    g.prototype.show = function (f) {
      void 0 === f && (f = !0);
      if (this.init === c.no || f)
        if (
          (this.init(),
          ui.toggleClass(this.icon, "select", f),
          ui.toggle(this.panel, f),
          (this.isOpen = f))
        )
          ((f = this.mA._v),
            this.setZoomPrc(!1, f.size.getZoomX(), !1),
            this.setZoomPrc(!0, f.size.getZoomY(), !1),
            ui.setFocus(this.verSld.el),
            this.mA.closeMenus(this));
    };
    g.prototype.onZoomPanelClk = function (f) {
      ui.stopDefaultPropagation(f);
    };
    g.prototype.onZoomPanelKey = function (f) {
      this.verSld.onKey(f);
      this.horSld.onKey(f);
    };
    g.prototype.onZoomChg = function (f, b, d) {
      b = this.px2Prc(f, b);
      this.setZoomPrc(f, b, d);
    };
    g.prototype.onZoomKeyChg = function (f, b, d) {
      this.init();
      if (b) this.verSld.onSldKeyCode(f, d ? 38 : 40);
      else this.horSld.onSldKeyCode(f, d ? 39 : 37);
    };
    g.prototype.setZoomPrc = function (f, b, d) {
      var g = f ? this.verSld : this.horSld;
      ui.setText(f ? this.zYtxt : this.zXtxt, b + "%");
      ui.toggle(f ? this.zYreset : this.zXreset, 100 !== b);
      var h = this.prc2px(f, b),
        l = g.getTotalPx(),
        n = Math.min(Math.max(h - g.getHalfSlider(), 0), g.getTotalPx());
      g.setPercentage(Math.floor((100 / l) * h));
      d ||
        (f
          ? (ui.setTop(g.slider, n),
            (g.sliderDrag.top = n),
            ui.setLeft(
              g.slider,
              num.round(
                -(ui.getBoxWidth(g.slider) / 2) + ui.getBoxWidth(g.el) / 2,
                0,
              ),
            ))
          : (ui.setLeft(g.slider, n),
            (g.sliderDrag.left = n),
            ui.setTop(
              g.slider,
              num.round(
                -(ui.getBoxHeight(g.slider) / 2) + ui.getBoxHeight(g.el) / 2,
                0,
              ),
            )));
      f
        ? ((f = this.mA._v.size.getDefaultRowHeight() * (b / 100)),
          this.setRowH(f, b))
        : this.setZoomX(b);
    };
    g.prototype.px2Prc = function (f, b) {
      var d = f ? this.verSld : this.horSld,
        g = d.getTotalPx();
      d = d.getHalfSlider();
      b = f ? g - (b - d) : b - d;
      d = f ? g / 2 : 0;
      if (b === d) return 100;
      b > d
        ? ((g =
            (f ? 0 : 100) +
            Math.floor(((f ? this.maxVz : this.maxXz) / (g * g)) * b * b)),
          100 === g && (g = 101))
        : ((g = Math.floor((100 / d) * b)), f && (g = Math.max(g, 2)));
      return g;
    };
    g.prototype.prc2px = function (f, b) {
      var d = f ? this.verSld : this.horSld,
        g = d.getTotalPx(),
        h = g / 2;
      d = d.getHalfSlider();
      b =
        100 === b
          ? f
            ? h
            : 0
          : 100 < b
            ? Math.round(
                Math.sqrt(
                  ((b - (f ? 0 : 100)) * g * g) / (f ? this.maxVz : this.maxXz),
                ),
              )
            : Math.floor((h / 100) * b);
      return f ? g - b + d : b + d;
    };
    g.prototype.setRowH = function (f, b) {
      var d = this.mA._v,
        g = d.g.vs.filter(function (b) {
          return b.input.dock;
        });
      d = d.is1();
      for (var h = 0; h < g.length; h++) {
        var l = g[h],
          n = l.size.setRowHeight(f, b, d);
        if (d === l.is1() && n) l.onResize(void 0, 2);
      }
    };
    g.prototype.setZoomX = function (f) {
      for (
        var b = 0,
          d = this.mA._v.g.vs.filter(function (b) {
            return b.input.dock;
          });
        b < d.length;
        b++
      ) {
        var g = d[b];
        if (g.size.setZoomX(f)) g.onResize(void 0, 1);
      }
    };
    g.prototype.onZX = function (f, b) {
      this.init();
      f && ui.stopDefaultPropagation(f);
      this.setZoomPrc(b, 100, !1);
    };
    g.prototype.viewer = function () {
      return this.mA.vA;
    };
    return g;
  })();
  g.zoom = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      var f = h.call(this, b, d) || this;
      f.mA = b;
      f.className = d;
      f.init();
      return f;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this,
        d = this.win;
      d.center = d.isModal = d.resizable = d.draggable = d.anim = !1;
      d.init();
      ui.addClass(d.el, "markWin");
      this.subTitle = this.find(".subTitle");
      this.weekRow = this.find(".weekRow");
      this.perWeekLbl = this.find(".perWeekLabel");
      this.weekCmb = new c.combo(this.find(".weekCombo"));
      this.weekCmb.change.add(function (d, f) {
        return b.onWeekChange(d, f);
      });
      this.dayRow = this.find(".dayRow");
      this.perDayLbl = this.find(".perDayLabel");
      this.dayCmb = new c.combo(this.find(".dayCombo"));
      this.dayCmb.change.add(function (d, f) {
        return b.onDayChange(d, f);
      });
      this.copyTo = c.button.svg({
        el: this.find(".copyToButton"),
        text: "Copy to",
        svgClass: "copy icon",
        useId: "copyD",
        logger: this.log(),
      });
      ui.on(this.copyTo.el, "mouseover focus", function (b) {
        return g.onCopyToOver(b);
      });
      ui.on(this.copyTo.el, "mouseout blur mousedown", function (b) {
        return g.onCopyToOut(b);
      });
      this.copyTo.click.add(function (d) {
        return b.onCopyToClick(d);
      });
    };
    f.prototype.set = function (b, d, f) {
      this._view = b;
      this.ve = d;
      ui.setText(
        this.subTitle,
        this.marker().isForbidden()
          ? "Copy marks from ".concat(d.name, " to others")
          : (this.marker().isUnwanted()
              ? this.loc().get(
                  "AllowedUnwantedLessonsForLabel",
                  "Allowed number of unwanted activities for",
                )
              : this.loc().get(
                  "AllowedMissedMandatoryLessonsForLabel",
                  "Allowed number of missed mandatory activities for",
                )) +
              " " +
              d.name,
      );
      this.log().w(
        "".concat(d.name, " ").concat(this.marker().name(), " settings"),
      );
      ui.toggles(
        [this.weekRow, this.dayRow],
        this.marker().isUnwantedOrMandatory(),
      );
      b = this.win;
      b.width = 520;
      b.left = f.x;
      b.top = f.y;
      d = c.windowHeight();
      b.open();
      var g = ui.getComputedHeight(this.win.el);
      b.top = f.y + g + 10 >= d ? d - g - 10 : f.y;
      b.setPosition();
      this.bind();
    };
    f.prototype.bind = function () {
      if (this.marker().isUnwantedOrMandatory()) {
        var b = e.periodsCount(this._t());
        this.weekCmb.bind(
          this.getArbitraryPairs(this.mA, 0, e.daysCount(this._t()) * b),
          this.perWeek().toString(),
        );
        this.dayCmb.bind(
          this.getArbitraryPairs(this.mA, 0, b),
          this.perDay().toString(),
        );
      }
      this.copyTo.el.style.marginTop = this.marker().isForbidden()
        ? c.px(20)
        : "5px";
    };
    f.prototype.isOpen = function () {
      return this.win.isOpen;
    };
    f.prototype.onDayChange = function (b, d) {
      this.change(!1, num.toInt(d));
    };
    f.prototype.onWeekChange = function (b, d) {
      this.change(!0, num.toInt(d));
    };
    f.prototype.change = function (b, d) {
      var f = this.mA,
        h = this.ve,
        l = this.marker().isUnwanted(),
        n = g.newUpdateState(e.viewEntity, [h], {
          mA: f,
          changedProps: [
            b
              ? l
                ? e.maxUnwantedPerCycle
                : e.minMandatoryPerCycle
              : l
                ? e.maxUnwantedPerDay
                : e.minMandatoryPerDay,
          ],
          updateType: g.updateType.marks,
          view: this._view,
          isMarksSettings: !0,
        });
      b
        ? l
          ? (h.maxUnwantedPerCycle = d)
          : (h.minMandatoryPerCycle = d)
        : l
          ? (h.maxUnwantedPerDay = d)
          : (h.minMandatoryPerDay = d);
      n.name = "Update marks";
      g.addState(n, { mA: f });
    };
    f.prototype.onCopyToClick = function (b) {
      var d = this;
      ui.stopPropagation(b);
      this.mA.selector().onDone(function (b) {
        return d.onCopySelected(b);
      });
      b = this._view.viewType().i + 1;
      var f = e.getViewEntities(this._t(), b);
      arr.remove(f, this.ve);
      this.mA.selector().openWindow([this.ve], f, e.getViewEntityDesc(b));
    };
    f.prototype.onCopySelected = function (b) {
      if (0 !== b.length) {
        for (
          var d = this.mA,
            f = g.newUpdateState(e.viewEntity, b, {
              mA: d,
              changedProps: e.marksProps,
              updateType: g.updateType.marks,
              view: this._view,
              isMarksCopy: !0,
            }),
            h = 0;
          h < b.length;
          h++
        )
          obj.copyTo(this.ve, b[h], e.viewEntity, {
            propFunc: function (b) {
              return e.marksProps;
            },
          });
        f.name = "Copy marks";
        g.addState(f, { mA: d });
      }
    };
    f.prototype.perWeek = function () {
      return this.marker().isUnwanted()
        ? this.ve.maxUnwantedPerCycle
        : this.ve.minMandatoryPerCycle;
    };
    f.prototype.perDay = function () {
      return this.marker().isUnwanted()
        ? this.ve.maxUnwantedPerDay
        : this.ve.minMandatoryPerDay;
    };
    f.prototype.marker = function () {
      return this._view.g.tool();
    };
    return f;
  })(g.windowView);
  g.marksPanel = p;
})(m || (m = {}));
(function (g) {
  function p(b) {
    var d = b.g.vcs.filter(function (d) {
      return d.v === b;
    });
    return 0 < d.length ? arr.last(d) : h(b);
  }
  function h(b) {
    return arr.first(
      b.vcs
        .filter(function (b) {
          return !obj.isDel(b.mc._c);
        })
        .sort(function (b, d) {
          return (
            arr.sort(b.rowPos(), d.rowPos()) ||
            arr.sort(b.mc.isOut(), d.mc.isOut()) ||
            arr.sort(b.colI(), d.colI())
          );
        }),
    );
  }
  function f(b) {
    return !!b.text || !!b.shortText;
  }
  g.getCustomizedVc = p;
  var b = (function (b) {
    function l(d, f) {
      d = b.call(this, d, f) || this;
      d.isCustomSelected = !1;
      d.comboTexts = [];
      return d;
    }
    __extends(l, b);
    l.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.width = 550;
      d.resizable = d.isModal = !1;
      d.init();
      d.setHelp("#customize-cards");
      this.initStyles();
      this.initCustomText();
      g.descChange.add(function (d) {
        return b.onChange(d);
      });
      this.mA._v.g.changeAfterRender.add(function (d) {
        return b.onChangeAfterRender(d);
      });
      this.mA._v.g.selectionChange.add(function (d, f) {
        return b.onSelectionChange(d, f);
      });
      this.mA.viewEvents.extraRemove.add(function (d) {
        return b.onExtraRemoved(d);
      });
    };
    l.prototype.initStyles = function () {
      var b = this;
      this.textComboRow = this.find(".textComboRow");
      this.textCombo = new c.combo(ui.find(".textCombo", this.textComboRow));
      this.textCombo.change.add(function (d, f) {
        return b.onTextComboChange(num.toInt(f));
      });
      this.backRow = this.find(".backRow");
      this.backCombo = new c.combo(ui.find(".backColorCombo", this.backRow));
      this.backCombo.change.add(function (d, f) {
        return b.onBackChange(num.toInt(f));
      });
      this.borderRow = this.find(".borderRow");
      this.borderCombo = new c.combo(ui.find(".borderCombo", this.borderRow));
      this.borderCombo.change.add(function (d, f) {
        return b.onBorderChange(num.toInt(f));
      });
      this.backPairs = [
        [e.vMod.c + "", this.loc().get("ClassColor", "Class color")],
        [e.vMod.t + "", this.loc().get("TeacherColor", "Teacher color")],
        [e.vMod.r + "", this.loc().get("RoomColor", "Room color")],
        [e.vMod.s + "", this.loc().get("SubjectColor", "Subject color")],
        ["-1", this.loc().get("NoColor", "No color")],
      ];
      this.borderPairs = [
        [e.borderType.rounded + "", this.loc().get("RoundBorder", "Round")],
        [e.borderType.squared + "", this.loc().get("SquareBorder", "Square")],
        [
          e.borderType.noneRounded + "",
          this.loc().get("RoundNoBorder", "Round, no border"),
        ],
        [
          e.borderType.noneSquared + "",
          this.loc().get("SquareNoBorder", "Square, no border"),
        ],
      ];
      this.customizePanel = this.find(".customizePanel");
    };
    l.prototype.initCustomText = function () {
      var b = this;
      this.textRow = this.find(".textRow");
      this.textBox = new c.input(ui.find(".textBox", this.textRow));
      var d = ui.find(".textHint", this.textRow);
      ui.hint(d, "Text is displayed in individual views", c.hintPos.left);
      this.shortRow = this.find(".shortRow");
      this.shortBox = new c.input(ui.find(".shortBox", this.shortRow));
      d = ui.find(".shortTextHint", this.shortRow);
      ui.hint(d, "Short text is displayed in master views", c.hintPos.left);
      this.submitRow = this.find(".submitRow");
      this.bar = new g.submitToolbar(this.mA, this.find(".submitToolbar"));
      this.bar.setType(g.subType.ok);
      this.bar.okClick.add(function (d) {
        return b.ok();
      });
      this.useDefaultButton = c.button.svg({
        el: ui.getDiv(),
        text: "Use default",
        svgClass: "addSvg icon",
        useId: "designerD",
        logger: this.mA.vA.log,
      });
      ui.append(this.useDefaultButton.el, this.bar.el);
      this.useDefaultButton.click.add(function (d) {
        return b.onUseDefault();
      });
    };
    l.prototype.setTitle = function () {
      if (this.isCustomText())
        this.title(
          1 === this.mA._v.g.cs.length ? "Customize card" : "Customize cards",
        );
      else {
        var b = this.relatedViewCard.v.viewType(),
          d = b.view;
        d = d.isDefault ? d.name.toLowerCase() : d.name;
        b = b.is1() ? "Customize individual " + d : "Customize " + d;
        this.title(b);
      }
    };
    l.prototype.onBeforeOpen = function () {
      var b = this.relatedViewCard;
      this.style = r.getStyle(this.mA._t(), b.v);
      this.vTy = r.viewType.from(b.v.viewType());
      var d = new r.mc(b.v, b.card(), b.mc.ve, b.mc.idE),
        f = ui.getDiv();
      this.vc = new v.dsgVc(f, d, b.v);
      ui.empty(this.customizePanel);
      ui.append(this.vc.el, this.customizePanel);
      this.bind();
      this.refreshCustomizedViewCard(!0);
      this.setTitle();
      g.setText(this.textBox, this.card().text);
      g.setText(this.shortBox, this.card().shortText);
    };
    l.prototype.onUseDefault = function () {
      this.onTextChange("", "");
      this.isCustomSelected = !1;
      this.textCombo.setValue(num.defaultValue + "");
      this.switchMode(!1);
    };
    l.prototype.openVc = function (d) {
      this.init();
      this.setVc(d);
      b.prototype.open.call(this);
    };
    l.prototype.setVc = function (b) {
      this.isOpen() || (this.isCustomSelected = !1);
      this.relatedViewCard = b;
      this.onBeforeOpen();
    };
    l.prototype.bind = function () {
      this.backCombo.bind(this.backPairs, this.style.backgroundType + "");
      this.borderCombo.bind(this.borderPairs, this.style.borderType + "");
      this.bindCardText();
      this.switchMode(this.isCustomText(), !this.isOpen());
    };
    l.prototype.isCustomText = function () {
      return this.isCustomSelected || f(this.relatedViewCard.card());
    };
    l.prototype.bindCardText = function () {
      var b = (this.comboTexts = []),
        f = this.viewer(),
        g = this.relatedViewCard.v.viewType().i,
        l = this.card();
      b.push(new d(f, 0));
      this.addCardText(
        b,
        new d(f, 1, g, l, e.lengthType.name, e.cardTextType._class),
      );
      this.addCardText(
        b,
        new d(f, 2, g, l, e.lengthType.shortName, e.cardTextType._class),
      );
      this.addCardText(
        b,
        new d(f, 3, g, l, e.lengthType.name, e.cardTextType.teacher),
      );
      this.addCardText(
        b,
        new d(f, 4, g, l, e.lengthType.shortName, e.cardTextType.teacher),
      );
      this.addCardText(
        b,
        new d(f, 5, g, l, e.lengthType.name, e.cardTextType.room),
      );
      this.addCardText(
        b,
        new d(f, 6, g, l, e.lengthType.shortName, e.cardTextType.room),
      );
      this.addCardText(
        b,
        new d(f, 7, g, l, e.lengthType.name, e.cardTextType.subject),
      );
      this.addCardText(
        b,
        new d(f, 8, g, l, e.lengthType.shortName, e.cardTextType.subject),
      );
      b.push(new d(f, k));
      b = this.comboTexts.map(function (b) {
        return [b.id + "", b.getComboText()];
      });
      this.textCombo.bind(b);
    };
    l.prototype.addCardText = function (b, d) {
      (d.entityIndex !== e.cardTextType._class &&
        this.relatedViewCard.v.viewType().i === d.entityIndex) ||
        !d.getText() ||
        (-1 === e.indexOfStyle(this.style, d.entityIndex, d.lengthType) &&
          b.push(d));
    };
    l.prototype.getSelectedCards = function () {
      var b = v.toCs(this.mA._v.g.vcs);
      return 0 === b.length ? [this.vc.card()] : b;
    };
    l.prototype.ok = function () {
      this.onTextChange(this.textBox.getValue(), this.shortBox.getValue());
    };
    l.prototype.onTextChange = function (b, d) {
      var f = this.getSelectedCards(),
        k = "" === b && "" === d ? "Remove card text" : "Update card text",
        l = this.mA;
      k = g.newUpdateState(
        e.card,
        f,
        { mA: l, changedProps: e.textShortProps() },
        k,
        "designer",
      );
      for (var h = 0; h < f.length; h++) {
        var n = f[h];
        n.text = b;
        n.shortText = d;
      }
      g.addState(k, { mA: l });
      this.log().w(b);
    };
    l.prototype.refreshCustomizedViewCard = function (b) {
      var d = this;
      void 0 === b && (b = !1);
      var f = this.vc,
        g = f.mc,
        k = f.el;
      g._cls.push("c", "design");
      g.w = g.h = 150;
      b = new r.upd(b ? r.updTy.go : r.updTy.s);
      g.setBorderStyle(b, this.style, !1);
      g._grad = r.gradSty(f.card(), this.mainView(), this.style.backgroundType);
      g.setTexts(this.style, new r.upd(r.updTy.go));
      f = g.txts;
      b = f.length;
      ui.empty(k);
      k.style.cssText = r.mcGradStr(g._grad, !1, !1);
      k.className = g.getCl();
      for (var l = 0; l < b; l++) {
        var h = f[l],
          n = ui.getDiv(h.cl + " cardRow");
        n.innerHTML = h.text;
        n.style.cssText = h.sty();
        ui.over(n, function (b, f) {
          return f ? d.onRowOver(b) : d.onRowOut(b);
        });
        ui.append(n, k);
        ui.title(n, "Delete");
        ui.click(n, function (b) {
          return d.onRowClick(b);
        });
        ui.dat(n, "tag", g.txtIds[l]);
      }
    };
    l.prototype.onRowOver = function (b) {
      ui.stopDefaultPropagation(b);
      ui.addClass(ui.target(b), "over");
      return !1;
    };
    l.prototype.onRowOut = function (b) {
      ui.stopDefaultPropagation(b);
      ui.deleteClass(ui.target(b), "over");
      return !1;
    };
    l.prototype.onRowClick = function (b) {
      if (1 === this.vc.mc.txtIds.length)
        if (f(this.vc.card())) this.onUseDefault();
        else
          this.inf().add(
            "Add some text in the card first, and then try again.",
          );
      else {
        var d = ui._dat(ui.target(b), "tag").split(",");
        b = num.toInt(d[0]);
        d = num.toInt(d[1]);
        b = e.indexOfStyle(this.style, b, d);
        -1 === b
          ? this.log().w("Card text not found", e.logType.err)
          : (e.delStyleAt(this.style, b), this.updateOnTextComboChange());
      }
    };
    l.prototype.onBackChange = function (b) {
      this.style.backgroundType = b;
      this.refreshCustomizedViewCard();
      this.changeStyle();
    };
    l.prototype.onBorderChange = function (b) {
      this.style.borderType = b;
      this.refreshCustomizedViewCard();
      this.changeStyle();
    };
    l.prototype.onTextComboChange = function (b) {
      if (b !== num.defaultValue)
        if (b === k) ((this.isCustomSelected = !0), this.switchMode(!0));
        else {
          var d = this.comboTexts.find(function (d) {
            return d.id === b;
          });
          this.addToStyle(this.style, d);
          this.updateOnTextComboChange();
        }
    };
    l.prototype.addToStyle = function (b, d) {
      b.entityTypes.push(d.entityIndex);
      b.lengthTypes.push(d.lengthType);
    };
    l.prototype.updateOnTextComboChange = function () {
      this.refreshCustomizedViewCard();
      this.bindCardText();
      this.changeStyle();
    };
    l.prototype.switchMode = function (b, d) {
      void 0 === d && (d = !0);
      ui.toggles([this.textComboRow, this.backRow, this.borderRow], !b);
      ui.toggles([this.textRow, this.shortRow, this.submitRow], b);
      b
        ? (d && this.textBox.setFocus(), this.textBox.select())
        : d && ui.setFocus(this.textCombo.el);
      this.setTitle();
    };
    l.prototype.changeStyle = function () {
      var b = this.style,
        d = this.vc.v.viewType().view,
        f = !d.isDefault;
      b.viewId = f ? d.id : "";
      d = e.getCustomFirstStyles(this._t());
      var k = d.filter(function (d) {
        return e.eqTypeIndividual(d, b);
      });
      if (0 < k.length) {
        var l = d.filter(function (d) {
          return !d.viewId && e.eqTypeIndividual(d, b, !1);
        });
        (0 !== l.length && f) ||
          ((f = r.getDefaultStyles().find(function (d) {
            return e.eqTypeIndividual(d, b, !1);
          })),
          l.push(f));
        if (
          l.some(function (d) {
            return e.eqStyle(d, b, !1);
          })
        ) {
          f = k[0];
          console.log(
            "Delete related ".concat(f.viewId ? "custom" : "default", " style"),
          );
          g.deleteEntities(e.cardStyle, [f], { mA: this.mA }, "Update style");
          return;
        }
      }
      d.find(function (d) {
        return e.eqStyle(d, b);
      }) ||
        (0 === k.length
          ? g.addEntities(
              e.cardStyle,
              [obj.newChildCloneToUse(b, e.cardStyle, b.parent)],
              { mA: this.mA },
            )
          : ((f = k[0]),
            (d = e.getChangedProps(e.cardStyle, f, b)),
            arr.filter(d, function (b) {
              return b.name !== obj.idProp().name;
            }),
            (k = g.newUpdateState(e.cardStyle, [f], {
              mA: this.mA,
              changedProps: d,
            })),
            obj.copyPropsTo(b, f, e.cardStyle, d, {}),
            (k.name = "Update style"),
            g.addState(k, { mA: this.mA })));
    };
    l.prototype.onChange = function (b) {
      this.isOpen() &&
        (b.desc !== e.cardStyle || (b.desc === e.cardStyle && b.isHistory)) &&
        (obj.isDel(this.card())
          ? this.showFirstOrClose(this.relatedViewCard.v)
          : this.setVc(this.relatedViewCard));
    };
    l.prototype.onChangeAfterRender = function (b) {
      this.isOpen() &&
        this.relatedViewCard &&
        this.relatedViewCard.v === b &&
        0 ===
          b.g.vcs.filter(function (d) {
            return d.v === b;
          }).length &&
        this.showFirstOrClose(b);
    };
    l.prototype.onSelectionChange = function (b, d) {
      this.isOpen() &&
        (d = arr.last(
          d.filter(function (d) {
            return d.v === b;
          }),
        )) &&
        d !== this.relatedViewCard &&
        this.openVc(d);
    };
    l.prototype.onExtraRemoved = function (b) {
      if (
        this.isOpen() &&
        this.relatedViewCard &&
        this.relatedViewCard.v === b._v
      ) {
        var d = this.mA._v.g.vs.filter(function (d) {
          return d !== b._v;
        });
        d = arr.last(d);
        this.vTy = r.viewType.from(d.viewType());
        this.showFirstOrClose(d);
      }
    };
    l.prototype.showFirstOrClose = function (b) {
      (b = p(b)) ? this.openVc(b) : this.xOnOk();
    };
    l.prototype.card = function () {
      return this.relatedViewCard.card();
    };
    return l;
  })(g.windowView);
  g.cardStyles = b;
  var d = (function () {
    function b(b, d, f, g, k, h) {
      this.isTextCalc = !1;
      this.cA = b;
      this.id = d;
      this.viewIndex = f;
      this.card = g;
      this.lengthType = k;
      this.entityIndex = h;
    }
    b.prototype.getText = function () {
      if (!this.isTextCalc) {
        var b = (this.namedEntity = this.getNamedEntity());
        this.text = b
          ? this.lengthType !== e.lengthType.shortName
            ? b.name
            : str.equalLowerCase(b.name, b.shortName)
              ? b.shortName + " [short]"
              : 0 === b.shortName.length
                ? b.name
                : b.shortName
          : "";
        this.isTextCalc = !0;
      }
      return this.text;
    };
    b.prototype.textSel = function () {
      return this.getComboText();
    };
    b.prototype.getComboText = function () {
      var b = this.lengthType === e.lengthType.name,
        d = this.entityIndex;
      return this.id === num.defaultValue
        ? "Choose card text..."
        : this.id === k
          ? "Set custom text"
          : d === e.cardTextType._class
            ? b
              ? "Add class name"
              : "Add class short name"
            : d === e.cardTextType.teacher
              ? b
                ? "Add teacher name"
                : "Add teacher short name"
              : d === e.cardTextType.room
                ? b
                  ? "Add room name"
                  : "Add room short name"
                : b
                  ? "Add subject name"
                  : "Add subject short name";
    };
    b.prototype.getNamedEntity = function () {
      var b = this.entityIndex,
        d = this.card,
        f = d.parent;
      return b === e.cardTextType._class
        ? this.viewIndex === e.vMod.c
          ? arr.first(f.groups)
          : 0 === f.groupIds.length
            ? void 0
            : e.getClass(arr.first(f.groups))
        : b === e.cardTextType.teacher
          ? arr.first(f.teachers)
          : b === e.cardTextType.room
            ? arr.first(e.allRooms(d))
            : f.subject;
    };
    return b;
  })();
  g.cardText = d;
  var k = 9;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b) {
      var d = h.call(this, b) || this;
      d.canUndo = !1;
      d.canRedo = !1;
      d.saveM = new g.saveM(b);
      d.save1 = c.callback();
      d.saveN = c.callback();
      d.reminder = new g.reminder(b, b.vA.config.user.reminder, d.saveN);
      new g.ping(b);
      var f = (d.el = ui.find(".memory", b.vA.el)),
        q = d.viewer(),
        l = (d.saveIc = c.button.svg({
          el: ui.find(".saveButton", f),
          svgClass: "svgIcon icon",
          useId: "saveD",
          logger: q.log,
        })),
        n = (d.undoIc = c.button.svg({
          el: ui.find(".undoButton", f),
          svgClass: "svgIcon icon",
          useId: "undoD",
          logger: q.log,
        })),
        t = (d.hisIc = c.button.svg({
          el: ui.find(".historyButton", f),
          svgClass: "svgIcon icon",
          useId: "historyD",
          logger: q.log,
        })),
        w = (d.redoIc = c.button.svg({
          el: ui.find(".redoButton", f),
          svgClass: "svgIcon icon",
          useId: "redoD",
          logger: q.log,
        })),
        u = (d.openIc = c.button.svg({
          el: ui.find(".openButton", f),
          svgClass: "svgIcon icon",
          useId: "openD",
          logger: q.log,
        }));
      d.fA = new c.fA([f]);
      l.hint("Save changes", c.hintPos.bottom);
      l.fireDisabledClick = !0;
      n.hint("Undo", c.hintPos.bottom);
      t.hint("History", c.hintPos.bottom);
      w.hint("Redo", c.hintPos.bottom);
      u.hint("Open timetable", c.hintPos.bottom);
      n.enableDoubleClick = w.enableDoubleClick = !0;
      n.pressMode = w.pressMode = !1;
      d.setSaveIc();
      d.viewer().isWeb() || d.show();
      b.vA.events.openStart.add(function () {
        return d.onOpenStarted();
      });
      b.vA.events.openDone.add(function (b) {
        return d.onOpenCompleted();
      });
      l.click.add(function (b) {
        return d.save(b);
      });
      n.click.add(function (b) {
        return d.undo();
      });
      t.click.add(function (b) {
        return d.onHisClk(b);
      });
      w.click.add(function (b) {
        return d.redo();
      });
      u.click.add(function (b) {
        return d.onOpenClk();
      });
      g.historyChange.add(function () {
        return d.onHisChg();
      });
      d.onHisChg();
      if (!q.is1Loaded) d.onOpenStarted();
      return d;
    }
    __extends(f, h);
    f.prototype.show = function () {
      ui.show(this.el, "block");
      this.fA.toIn(250);
    };
    f.prototype.hide = function () {
      this.fA.toOut(100);
    };
    f.prototype.onOpenClk = function () {
      this.mA.menu().onOpen();
    };
    f.prototype.onOpenStarted = function () {
      ui.addClass(this.openIc.el, "loading");
    };
    f.prototype.onOpenCompleted = function () {
      ui.deleteClass(this.openIc.el, "loading");
      this.setSaveIc();
    };
    f.prototype.setSaveIc = function () {
      this.saveIc.enable(g.allowSave(this.mA) && g.hasHistoryChange());
    };
    f.prototype.save = function (b) {
      this.allow().creatorOrOwnerCheck(!0) &&
        (this.saveIc.isEnabled || this.allow().freeOrPurchasedCheck()
          ? (this.log().w("Quick save"), this.saveM.save())
          : f.logInOrCreateAccountMsg(this.viewer()));
    };
    f.logInOrCreateAccountMsg = function (b) {
      b.inf.mandatory(
        "In order to save changes " +
          ui.linkMessage("#login", "Log in") +
          " or " +
          ui.linkMessage("#plans", "Register free account"),
      );
    };
    f.prototype.onSaveStart = function () {
      ui.addClass(this.saveIc.el, "saving");
      this.save1.fire();
    };
    f.prototype.onSaveDone = function () {
      ui.deleteClass(this.saveIc.el, "saving");
      this.setSaveIc();
      this.saveN.fire();
    };
    f.prototype.undo = function () {
      this.hisGo(!0);
    };
    f.prototype.hisGo = function (b) {
      var d = b ? this.undoIc : this.redoIc;
      d.press();
      g.gotoState(b ? -1 : 1, { mA: this.mA });
      d.unPress();
    };
    f.prototype.onHisClk = function (b) {
      ui.preventDefault(b);
      (b = !this.histV().isOpen()) ? this.histV().open() : this.histV().x();
      this.log().w("History ".concat(b ? "opened" : "closed"));
    };
    f.prototype.redo = function () {
      this.hisGo(!1);
    };
    f.prototype.onHisChg = function () {
      g.hasUndo() !== this.canUndo &&
        this.undoIc.enable((this.canUndo = g.hasUndo()));
      g.hasRedo() !== this.canRedo &&
        this.redoIc.enable((this.canRedo = g.hasRedo()));
      this.setSaveIc();
    };
    f.prototype.histV = function () {
      this._hView ||
        (this._hView = new g.historyPanel(this.mA, "historyView", this.hisIc));
      return this._hView;
    };
    return f;
  })(g.baseView);
  g.memory = p;
  p = (function () {
    function g(f) {
      var b = this;
      this.i = 0;
      this.ms = 6e5;
      this.mA = f;
      this.i = setInterval(function () {
        return b.tick();
      }, this.ms);
    }
    g.prototype.tick = function () {
      if (!(date.nowMs() - this.mA.log.ms < this.ms)) {
        var f = this.mA.vA.config;
        this.mA.log.w(
          "ver. "
            .concat(a.version, ", ping: ")
            .concat(f.user.id, ",")
            .concat(f.user.schoolId, "."),
        );
        clearInterval(this.i);
      }
    };
    return g;
  })();
  g.ping = p;
})(m || (m = {}));
(function (g) {
  function p(b, d, f) {
    var k = f.entities,
      l = f.format,
      h = f.isMerge;
    if (l) {
      l = l.props;
      f = l.filter(function (b) {
        return void 0 !== b;
      });
      var n = [],
        q = e.getDefaultPeriods(b._t()),
        t = l.some(function (b) {
          return !!b && b.name === O;
        }),
        w = l.some(function (b) {
          return !!b && b.name === M;
        });
      l = [];
      e.hasName(f) && l.push(e.nameProp);
      e.hasShort(f) && l.push(e.shortProp);
      h &&
        (t && l.push(e.startHourProp, e.startMinProp),
        w && l.push(e.endHourProp, e.endMinProp));
      f = d.grid.lastSelected();
      var x = h ? (f ? f.position : 1) : -1;
      f = g.newUpdateState(e.period, [], { mA: b, changedProps: l });
      var u = f.actions[0];
      l = function (b) {
        var d = [];
        h
          ? q.length >= x && ((d = [q[x - 1]]), x++)
          : (d = q.filter(function (d) {
              return g.eqInterval(d, b);
            }));
        if (0 < d.length) {
          for (var f = 0; f < d.length; f++) {
            var k = d[f];
            g.addUndoCopies(u, [k]);
            b.name && (k.name = b.name);
            b.shortName && (k.shortName = b.shortName);
            t && ((k.startHour = b.startHour), (k.startMinute = b.startMinute));
            w && ((k.endHour = b.endHour), (k.endMinute = b.endMinute));
          }
          return "continue";
        }
        f = e.sortedDefaultPeriods(
          __spreadArray(__spreadArray([], q, !0), n, !0),
        );
        g.findPeriodPos(b, f);
        n.push(b);
      };
      for (var y = 0; y < k.length; y++) l(k[y]);
      0 < u.entities.length &&
        ((f.name = "Update " + g.getStateName(e.period, u.entities)),
        g.addState(f, { mA: b }));
      if (0 !== n.length) {
        k = [];
        for (l = f = 0; l < n.length; l++) {
          y = n[l];
          var p = e.sortedDefaultPeriods(
            __spreadArray(__spreadArray([], q, !0), k, !0),
          );
          y.position = g.findPeriodPos(y, p);
          k.push(y);
          ++f === n.length && g.setCurrent(d, y);
          g.addEntities(
            e.period,
            [y],
            { mA: b, reposition: !0 },
            "Import " + g.getStateName(e.period, [y]),
            R,
          );
        }
        0 < n.length &&
          c.timeout(function () {
            return g.onDescChg({
              desc: e.period,
              done: [],
              mainActions: [],
              isHistory: !1,
            });
          }, 1e3);
      }
    }
  }
  function h(d, f, k) {
    var l,
      h = k.sourceId;
    if (h) {
      d = [];
      var n = 0,
        q = 0;
      for (h = h.split("|"); q < h.length; q++) {
        var t = b(h[q], e.getGroups(f)),
          w = t.length;
        if (!(2 > w)) {
          for (var x = g.newGroupSet(f, ++n), u = 0, y = 0; y < w; y++) {
            var p = t[y];
            p = g.newGroup(x, p.name, p.shortName, ++u);
            x.groups.push(p);
          }
          d.push(x);
        }
      }
      d.unshift(g.newEntireGroupSet(f));
      (l = f.groupSets).push.apply(l, d);
    } else g.addGroups(f, !0, !1);
    k.sourceId = void 0;
  }
  function f(b, d, f, g) {
    var k = f.sourceId;
    if (k) {
      b = e.getGroupsForClasses([b.getCurrent(e._class)], !1, !1);
      var h = [],
        n = [],
        q = 0;
      for (k = k.split(","); q < k.length; q++) {
        var t = k[q].trim(),
          w = l(b, { id: "", name: t, shortName: "" }, !0);
        if (!w || arr.has(h, w)) arr.addUnique(g, t);
        else {
          var x = w.parent.position;
          arr.has(n, x) ? arr.addUnique(g, t) : (n.push(x), h.push(w));
        }
      }
      d.groupIds = e.ids(h);
    }
    f.sourceId = void 0;
  }
  function b(b, d) {
    if (!b) return [];
    var f = -1 === b.indexOf("|") ? "," : "|",
      g = [],
      k = 0;
    for (
      b = b.split(f).map(function (b) {
        return b.trim();
      });
      k < b.length;
      k++
    )
      g.push(n(b[k], d));
    return g;
  }
  function d(b, d) {
    var f = num.toNum(b);
    if (!isNaN(f)) return b;
    f = b.split(" ");
    b = 1 < f.length ? q(f[0], 1) + q(f[1], 1) : q(b, 2);
    f = 0;
    for (var g = b; k(g, d); ) g = b + ++f;
    return g;
  }
  function k(b, d) {
    return !!d.find(function (d) {
      return str.equalLowerCase(b, d.shortName);
    });
  }
  function q(b, d) {
    return b.length > d - 1 ? b.substring(0, d) : b;
  }
  function l(b, d, f) {
    var g = f ? d.name : d.isShortGenerated ? d.name : P(d);
    return b.find(function (b) {
      return str.equalLowerCase(f ? b.name : P(b), g);
    });
  }
  function n(b, f) {
    var g = {};
    g.text = b;
    a: {
      var k = b.indexOf("{");
      if (-1 !== k) {
        var l = b.indexOf("}");
        if (-1 !== l) {
          k = b.substring(k + 1, l);
          break a;
        }
      }
      k = void 0;
    }
    g.isShortGenerated = !k;
    k
      ? ((g.name = b.substring(0, b.indexOf("{")).trim()),
        (g.shortName = k.trim()))
      : ((g.name = b.trim()), (g.shortName = d(g.name, f)));
    return g;
  }
  function t(b, d, f) {
    for (var g = -1, k, l = 0; l < b.length; l++) {
      var h = b[l];
      ++g;
      if (h) {
        var n = B(h),
          q = E(h, n);
        h = I(q);
        if (-1 !== h) {
          k = q.slice(h);
          k = w(d, k);
          d = k.ignoredProps;
          k = {
            rowIndex: g + (k.hasHeader ? 1 : 0),
            columnIndex: h,
            columnSeparator: n,
            props: k.props,
          };
          0 < d.length &&
            f.vA.inf.add(
              "The following columns are ignored: ".concat(
                arr.joinCommaSpace(d),
              ),
            );
          break;
        }
      }
    }
    k || f.log.w("Unknown format", e.logType.warn);
    return k;
  }
  function w(b, d) {
    var f = [],
      g = b.type,
      k = b.props;
    b = g === e.type.period;
    var l = g === e.type.class,
      h = g === e.type.student,
      n = g === e.type.activity,
      q = e.isViewEntityType(g);
    k = k.filter(function (b) {
      return (
        b.type === obj.propType.str ||
        b.type === obj.propType.bool ||
        (b.type === obj.propType.int && "position" !== b.name)
      );
    });
    for (var t = -1, w = !0, p = [], B = 0; B < d.length; B++) {
      var A = d[B];
      ++t;
      var E = A.trim().toLowerCase();
      if (!n) {
        if (str.equalLowerCase(E, e.nameProp.displayName)) {
          f.push(e.nameProp);
          continue;
        }
        if (str.equalLowerCase(E, e.shortProp.displayName)) {
          f.push(e.shortProp);
          continue;
        }
      }
      if (!b || !y(E, f))
        if ((l || h) && E === Q) f.push({ name: Q });
        else if (!n || !z(E, f))
          if (!q || !u(k, E, f))
            if (0 === t) {
              w = !1;
              f = x(g, d.length);
              break;
            } else (A && p.push(A), f.push(void 0));
    }
    return { props: f, hasHeader: w, ignoredProps: p };
  }
  function u(b, d, f) {
    return (b = b.find(function (b) {
      return !!b && !!b.displayName && str.equalLowerCase(b.displayName, d);
    }))
      ? (f.push(b), !0)
      : !1;
  }
  function x(b, d) {
    var f = [];
    b === e.type.activity
      ? f.push.apply(
          f,
          U.map(function (b) {
            return { name: b };
          }),
        )
      : b === e.type.period
        ? f.push({ name: O }, { name: M }, e.nameProp, e.shortProp)
        : (f.push(e.nameProp, e.shortProp),
          (b !== e.type.class && b !== e.type.student) || f.push({ name: Q }));
    return arr.take(f, d);
  }
  function y(b, d) {
    if (b === O || "start time" === b) d.push({ name: O });
    else if (b === M || "end time" === b) d.push({ name: M });
    else return !1;
    return !0;
  }
  function z(b, d) {
    for (var f = 0, g = U; f < g.length; f++) {
      var k = g[f];
      if (b === k) return (d.push({ name: k }), !0);
    }
    return !1;
  }
  function A(b, d, f, g) {
    b = obj.newChildToUse(b, d);
    b.name = f.name;
    b.shortName = f.shortName;
    b.position = g;
    b.color = e.getRandomColor();
    return b;
  }
  function B(b) {
    var d = g.columnSeparators.findIndex(function (d) {
      return -1 !== b.indexOf(d);
    });
    return -1 === d ? g.columnSeparators[0] : g.columnSeparators[d];
  }
  function E(b, d) {
    return d ? b.split(d) : [b];
  }
  function I(b) {
    return b.findIndex(function (b) {
      return !!b;
    });
  }
  function F(b, d) {
    return 0 < d ? "<li>".concat(b.format(d), "</li>") : "";
  }
  function C(b) {
    b.vA.inf.add(
      "No activities imported. Check the format of clipboard content.",
    );
  }
  function G(b, d, f) {
    for (var g = [], k = 0; k < d.length; k++)
      for (
        var l = d[k],
          h = l[1],
          n = Math.min.apply(
            Math,
            h.map(function (b) {
              return b.cards.length;
            }),
          ),
          q = 0;
        q < n;
        q++
      ) {
        for (var t = [], w = 0, x = h; w < x.length; w++) t.push(x[w].cards[q]);
        H(b, t, f) || arr.addUniqueString(g, l[0]);
      }
    return g;
  }
  function H(b, d, f) {
    if (!g.isClipValid(b, d, !1)) return !1;
    b = obj.newChildToUse(e.clip, b._t());
    b.cardIds = e.ids(d);
    f.push(b);
    return !0;
  }
  function D(b, d) {
    return !b || d.allow.isPurchased() ? !0 : !str.indexOfAny(b, []);
  }
  function J(b) {
    return "\u2013" === b || "\u2014" === b;
  }
  function L(b, d, f, g) {
    for (var k = -1, l = d.props, h = 0; h < b.length; h++) {
      var n = b[h];
      ++k;
      if (!(k < d.rowIndex || 0 === n.length)) {
        var q = E(n, B(n));
        n = obj.newChildToUse(e.period, g._t());
        for (var t = -1, w = 0; w < q.length; w++) {
          var x = q[w],
            u = l[++t];
          u &&
            (u.name === O
              ? ((x = K(x)),
                (u = x[1]),
                (n.startHour = x[0]),
                (n.startMinute = u))
              : u.name === M
                ? ((x = K(x)),
                  (u = x[1]),
                  (n.endHour = x[0]),
                  (n.endMinute = u))
                : u.name === e.nameProp.name
                  ? (n.name = x)
                  : u.name === e.shortProp.name && (n.shortName = x));
        }
        f.push(n);
      }
    }
  }
  function K(b) {
    b = b.split(":");
    return [num.toInt(b[0]), num.toInt(b[1])];
  }
  function P(b) {
    return b.customId || b.shortName;
  }
  g.onImport = function (b, k) {
    var l = b.mA,
      n = b.desc,
      q = b.grid,
      t = l._t(),
      w = k.entities,
      x = k.format,
      u = k.isMerge,
      y = n === e._class,
      B = n === e.student;
    if (n === e.period) p(l, b, k);
    else {
      var z = e.hasColor(n.props),
        A = obj.getAllNotDel(t, n);
      k = q.lastSelected();
      var E = q.lastSelectedRow(),
        F = q.data,
        I = F.length - (E ? E.rowIndex : 0),
        C = u && k ? k.position : g.getNewPos(A, k),
        G = B ? l.getCurrent(e._class) : t;
      t = [];
      k = [];
      q = [];
      x = x
        ? x.props.filter(function (b) {
            return !!b && void 0 !== b.type;
          })
        : e.nameShortProps();
      for (var H = e.hasShort(n.props), D = 0, J = 0; J < w.length; J++) {
        var L = w[J];
        D++;
        if (u && D <= I) (k.push(F[E.rowIndex + D - 1]), C++);
        else {
          for (
            var K = obj.newChildToUse(n, G), P = 0, M = x;
            P < M.length;
            P++
          ) {
            var N = M[P];
            K[N.name] = L[N.name];
          }
          y ? h(l, K, L) : B && f(l, K, L, q);
          u || !H || K.shortName || (K.shortName = d(K.name, A));
          K.position = C;
          C++;
          z && !K.color && (K.color = e.getRandomColor());
          t.push(K);
        }
      }
      if (0 < k.length) {
        u = g.newUpdateState(n, k, { mA: l, changedProps: x });
        y = -1;
        for (B = 0; B < k.length; B++)
          for (L = k[B], z = w[++y], A = 0, E = x; A < E.length; A++)
            ((N = E[A]), (L[N.name] = z[N.name]));
        u.name = "Update " + g.getStateName(n, k);
        g.addState(u, { mA: l });
      }
      0 < t.length &&
        (g.setCurrent(b, arr.last(t)),
        g.addEntities(n, t, { mA: l }, "Import " + g.getStateName(n, t), R));
      0 < q.length &&
        l.vA.inf.warn(
          "The following groups are ignored: ".concat(arr.joinCommaSpace(q)),
        );
    }
  };
  g.rowSeparator = "\n";
  g.columnSeparators = ["\t", ";"];
  g.getShort = d;
  g.importActivities = function (d, f, k, h) {
    var n = [],
      q = f.split(g.rowSeparator),
      x = t(q, k, h);
    if (x) {
      var w = x.props;
      if (D(f, h)) {
        var u = !keys.ctrl(d),
          y = h._t(),
          B = obj.notDel(y.teachers),
          p = obj.notDel(y.subjects),
          z = obj.notDel(y.classes),
          I = y.groups,
          H = obj.notDel(y.rooms),
          K = [],
          L = [],
          P = [],
          M = [],
          N = [],
          O = [],
          W = [],
          Q = p.length,
          S = H.length,
          Z = B.length,
          ra = z.length,
          na = -1,
          pa = x.columnIndex,
          ba = [];
        d = function (b) {
          var d = w.findIndex(function (d) {
            return !!d && d.name === b;
          });
          -1 !== d && (d += pa);
          ba.push(d);
        };
        k = 0;
        for (var qa = U; k < qa.length; k++) d(qa[k]);
        var sa = ba[0],
          ta = ba[1],
          ua = ba[2],
          va = ba[3],
          wa = ba[4],
          xa = ba[5],
          ya = ba[6],
          za = ba[7],
          Aa = ba[8];
        d = function (d) {
          ++na;
          if (na < x.rowIndex || 0 === d.length) return "continue";
          try {
            var f = E(d, x.columnSeparator);
            if (
              1 > f.length ||
              f.length - 1 < pa ||
              f.every(function (b) {
                return !b;
              })
            )
              return "continue";
            var k = obj.newChildToUse(e.activity, h._t()),
              q = b(f[sa], p)[0],
              t = l(p, q, u);
            t || ((t = A(e.subject, y, q, ++Q)), O.push(t), p.push(t));
            k.subjectId = t.id;
            var w = b(f[ta], B);
            k.teacherIds = [];
            for (d = 0; d < w.length; d++) {
              var F = w[d],
                C = l(B, F, u);
              if (!C) {
                if (1 === w.length && J(F.name)) continue;
                C = A(e.teacher, y, F, ++Z);
                P.push(C);
                B.push(C);
              }
              k.teacherIds.push(C.id);
            }
            var G = b(f[ua], z),
              D = b(f[va], I);
            k.groupIds = [];
            for (w = 0; w < G.length; w++) {
              var R = G[w],
                da = l(z, R, u);
              if (da) {
                if (D.length > w) {
                  var T = D[w],
                    Y = l(e.getGroups(da), T, u);
                  if (Y) {
                    k.groupIds.push(Y.id);
                    continue;
                  }
                  if (!J(T.name)) {
                    K.push(T.text);
                    continue;
                  }
                }
                k.groupIds.push(e.entireGroup(da).id);
              } else if (1 !== G.length || !J(R.name)) {
                var ha = A(e._class, y, R, ++ra);
                g.addGroups(ha, !0, !0);
                k.groupIds.push(e.entireGroup(ha).id);
                N.push(ha);
                z.push(ha);
              }
            }
            var U = num.toInt(f[wa]),
              X = num.toInt(f[xa]);
            k.length = X;
            if (0 === U || 0 === X) return (L.push(na + 1), "continue");
            var ca = b(f[ya], H);
            k.roomIds = [];
            for (G = 0; G < ca.length; G++) {
              var fa = ca[G],
                V = l(H, fa, u);
              if (!V) {
                if (1 === ca.length && J(fa.name)) continue;
                V = A(e.room, y, fa, ++S);
                M.push(V);
                H.push(V);
              }
              k.roomIds.push(V.id);
            }
            var aa = b(f[za], H);
            k.moreRoomIds = [];
            for (ca = 0; ca < aa.length; ca++) {
              var ja = aa[ca];
              V = l(H, ja, u);
              if (!V) {
                if (1 === aa.length && J(ja.name)) continue;
                V = A(e.room, y, ja, ++S);
                M.push(V);
                H.push(V);
              }
              k.moreRoomIds.push(V.id);
            }
            for (V = 0; V < U; V++) {
              var ea = obj.newChildToUse(e.card, k);
              0 < k.roomIds.length && (ea.roomIds = k.roomIds.slice());
              k.cards.push(ea);
            }
            var oa = f[Aa];
            if (oa) {
              var ia = W.find(function (b) {
                return str.equalLowerCase(b[0], oa);
              });
              ia ? ia[1].push(k) : W.push([oa, [k]]);
            }
            n.push(k);
          } catch (Ba) {
            (h.vA.error.on(Ba, "Import activities from clipboard"),
              L.push(na + 1));
          }
        };
        for (k = 0; k < q.length; k++) d(q[k]);
        g.addEntities(
          e.subject,
          O,
          { mA: h },
          1 === O.length
            ? "Import ".concat(O[0].name)
            : "Import ".concat(O.length, " subjects"),
          R,
        );
        g.addEntities(
          e.room,
          M,
          { mA: h },
          1 === M.length
            ? "Import ".concat(M[0].name)
            : "Import ".concat(M.length, " rooms"),
          R,
        );
        g.addEntities(
          e.teacher,
          P,
          { mA: h },
          1 === P.length
            ? "Import ".concat(P[0].name)
            : "Import ".concat(P.length, " teachers"),
          R,
        );
        g.addEntities(
          e._class,
          N,
          { mA: h },
          1 === N.length
            ? "Import ".concat(N[0].name)
            : "Import ".concat(N.length, " classes"),
          R,
        );
        g.addEntities(
          e.activity,
          n,
          { mA: h },
          1 < n.length
            ? "Import ".concat(n.length, " activities")
            : "Import activity",
          R,
        );
        q = [];
        d = G(h, W, q);
        if (
          0 < n.length ||
          0 < P.length ||
          0 < N.length ||
          0 < M.length ||
          0 < O.length
        )
          ((k = [
            F("{0} subjects", O.length),
            F("{0} rooms", M.length),
            F("{0} teachers", P.length),
            F("{0} classes", N.length),
            F("{0} activities", n.length),
            F("{0} clips", q.length),
          ]),
            h.vA.inf.add("<p>Imported:</p><ul>".concat(k.join(""), "</ul>")));
        g.addEntities(
          e.clip,
          q,
          { mA: h },
          "Import ".concat(q.length, " ") + (1 === q.length ? "clip" : "clips"),
          "clip",
        );
        h.log.w("Content of clipboard while copying activities ".concat(f));
        0 === n.length
          ? C(h)
          : (h.setCurrent(e.activity, arr.last(n)),
            0 < L.length &&
              h.vA.inf.err(
                "The following rows are ignored: ".concat(
                  arr.joinCommaSpace(L),
                ),
              ),
            0 < K.length &&
              h.vA.inf.warn(
                "The following groups are ignored because they don't exist: ".concat(
                  arr.joinCommaSpace(arr.unique(K)),
                ),
              ),
            0 < d.length &&
              h.vA.inf.warn(
                "The following clips don't meet clipping conditions: ".concat(
                  arr.joinCommaSpace(d),
                ),
              ));
      } else
        (C(h),
          h.vA.patch("schools/".concat(h.vA.schoolId(), "/disable/")),
          c.timeout(
            function () {
              return h.abr();
            },
            num.random(1e4, 3e4),
          ));
    }
  };
  g.getImportedEntities = function (b, d, f, k, h) {
    var n = f.type,
      q = [];
    d = d.split(g.rowSeparator);
    var w = k.data;
    k = 0 < w.length;
    b = keys.ctrl(b) && k;
    k = t(d, f, h);
    if (!k) return { entities: q, format: void 0, isMerge: b };
    var x = w.slice();
    if (n == e.type.period) L(d, k, q, h);
    else {
      var u = -1,
        y = k.columnIndex,
        p = d.length;
      w = [];
      var z = [],
        A = n === e.type.day,
        F = e.hasCustomId(f.props);
      f = e.hasColor(f.props);
      for (var I = 0; I < p; I++) {
        var C = d[I];
        ++u;
        if (!(u < k.rowIndex || 0 === C.length)) {
          var G = B(C),
            H = E(C, G);
          if (
            !(
              1 > H.length ||
              H.length - 1 < y ||
              H.every(function (b) {
                return !b;
              })
            )
          ) {
            G = -1;
            C = obj.newChildToUse(e.viewEntity, h._t());
            for (var D = 0; D < H.length; D++) {
              var J = H[D],
                K = k.props[++G];
              if (K) {
                var P = K.name,
                  M = J;
                if (K.type === obj.propType.str) {
                  if ((void 0 !== M && (M += ""), f && "color" === K.name))
                    if (e.isHexColor(M)) M = M.toLowerCase();
                    else continue;
                } else if (K.type === obj.propType.bool)
                  M = "+" === J || "1" === J || "true" === J;
                else if (K.type === obj.propType.int) {
                  if (((M = num.toNum(J)), !obj.validateValue(K, M))) continue;
                } else if (void 0 === K.type) {
                  if (P === Q && (n === e.type.class || n === e.type.student)) {
                    M && (C.sourceId = M);
                    continue;
                  }
                } else continue;
                C[K.name] = M;
              }
            }
            if (!A && C.name && l(x, C, !0)) (G = l(w, C, !0)) || w.push(C);
            else {
              if (F && C.customId && (D = l(x, C, !1))) {
                G = l(z, C, !1);
                G ||
                  ((C.sourceId = D.name + " (".concat(D.customId, ")")),
                  z.push(C));
                continue;
              }
              x.push(C);
              q.push(C);
            }
          }
        }
      }
      n = "";
      0 < w.length &&
        (n +=
          "The following items are ignored because they already exist: " +
          e.namesStr(w) +
          ". ");
      0 < z.length &&
        (n +=
          "The following items are ignored because they already have the same custom ids: " +
          arr.joinCommaSpace(
            z.map(function (b) {
              return ""
                .concat(b.name, " (")
                .concat(b.customId, ") = ")
                .concat(b.sourceId);
            }),
          ));
      n && h.vA.inf.add(n);
    }
    h.log.w("".concat(q.length, " items from clipboard"));
    return { entities: q, format: k, isMerge: b };
  };
  g.getIdsOrShorts = function (b, d) {
    void 0 === d && (d = ",");
    b = b.map(function (b) {
      return P(b);
    });
    return arr.join(b, d);
  };
  g.getIdOrShort = P;
  var R = "import",
    O = "starttime",
    M = "endtime",
    Q = "groups",
    U =
      "subject;teacher(s);class(es);group(s);count;length;desired room(s);alternative room(s);clips".split(
        ";",
      );
})(m || (m = {}));
(function (g) {
  g.createTimetable = function (p, h) {
    var f = p.allow.isDemo(),
      b = p._t(),
      d = !0,
      k = f
        ? b
        : h.isNew
          ? obj.newEntityToUse(e.timetable)
          : obj.newCloneToUse(b, e.timetable);
    k.name = h.name;
    k.description = h.description;
    if (f) {
      b = 0;
      for (var q = obj.getComplexProps(e.timetable); b < q.length; b++) {
        var l = q[b],
          n = l.desc,
          t = n.type;
        e.isDayOrPeriodType(t) ||
          t === e.type.cardStyle ||
          g.deleteEntities(n, k[l.name], { mA: p, needConfirm: !1 });
      }
      p.vA.inf.mandatory(
        "In order to save changes " +
          ui.linkMessage("#login", "Log in") +
          " or " +
          ui.linkMessage("#plans", "Register free account"),
      );
    } else
      ((k.version = e.version),
        (k.schoolId = p.vA.config.user.schoolId),
        (k.creatorId = k.editorId = p.user().id),
        (k.createdAt = k.updatedAt = new Date()),
        (k.year = e.isExample(b)
          ? new Date().getFullYear().toString()
          : b.year),
        (k.schoolName = b.schoolName),
        h.isNew
          ? ((q = { newId: !0, setAdd: !0 }),
            obj.copyArrayTo(e.sortNotDel(b.days), k, e.daysProp, q),
            obj.copyArrayTo(
              e.sortedDefaultPeriods(b.periods),
              k,
              e.periodsProp,
              q,
            ),
            obj.copyArrayTo(obj.notDel(b.cardStyles), k, e.cardStylesProp, q))
          : ((d = !1), (k.deleted = !1)));
    new a.opener(p.vA).changeTo(
      k,
      h.isNew ? e.openType.new : e.openType.copy,
      d,
    );
    f || new g.saveM(p).save();
  };
})(m || (m = {}));
(function (g) {
  function p(b, d, g, k, l, h, n, q, t, x, u, p) {
    return (d = u
      ? d.find(function (b) {
          return m.eqInterval(b, g);
        })
      : w(d, g))
      ? (p
          ? A(g, d, q) || t.push(d)
          : u
            ? (y(g, d.position, b, l, h), f(g, d, n))
            : x &&
              g.position !== d.position &&
              k.push([g.position, d.position]),
        (d.sourceId = g.id),
        !0)
      : !1;
  }
  function h(b, d, f) {
    if (0 !== d.length || 0 !== f.length) {
      var g = d.map(function (b) {
          return b[0];
        }),
        k = d.map(function (b) {
          return b[1];
        }),
        l = f.map(function (b) {
          return b[0];
        }),
        h = f.map(function (b) {
          return b[1];
        });
      for (d = 0; d < b.length; d++) {
        f = function (b) {
          var d = g.findIndex(function (d) {
            return d === b[0];
          });
          -1 !== d && (b[0] = k[d]);
          d = l.findIndex(function (d) {
            return d === b[1];
          });
          -1 !== d && (b[1] = h[d]);
        };
        for (var n = 0, q = b[d].marks; n < q.length; n++) f(q[n]);
      }
    }
  }
  function f(b, d, f) {
    e.isDefaultPeriod(b) &&
      e.isDefaultPeriod(d) &&
      b.position !== d.position &&
      f.push([b.position, d.position]);
  }
  function b(b, d, f) {
    for (
      var g = function (f) {
          var g = f[1],
            k = d.find(function (b) {
              return b.id === f[0] && b.position !== g;
            });
          if (!k) return "continue";
          var l = k.position,
            h = { position: l };
          k.position = g;
          var n = e.getChangedProps(e.period, k, h),
            q = m.newUpdateState(e.period, [k], { mA: b, changedProps: n });
          q.name = "Move period ".concat(g, " to ").concat(l);
          obj.copyValuesTo(h, k, e.period, {
            deep: !1,
            propFunc: function (b) {
              return n;
            },
          });
          m.addState(q, { mA: b });
        },
        k = 0;
      k < f.length;
      k++
    )
      g(f[k]);
  }
  function d(b, d, f) {
    for (
      var g = function (b) {
          var g = b[0];
          b = b[1];
          var k = d.find(function (b) {
            return b.id === g || b.sourceId === g;
          });
          k && k.position !== b && f.push([b, k.position]);
        },
        k = 0;
      k < b.length;
      k++
    )
      g(b[k]);
  }
  function k(b, f, g) {
    var k = [];
    d(f, e.getDefaultPeriods(b), k);
    0 < k.length &&
      (q(e.subject, obj.notDel(b.subjects), k, g),
      q(e.room, obj.notDel(b.rooms), k, g),
      q(e.teacher, obj.notDel(b.teachers), k, g),
      q(e._class, obj.notDel(b.classes), k, g));
  }
  function q(b, d, f, g) {
    for (
      var k = m.newUpdateAction(b, [], { changedProps: [e.marks], mA: g }),
        l = 0;
      l < d.length;
      l++
    )
      for (
        var h = d[l],
          n = h.marks,
          q = function (b) {
            var d = n.filter(function (d) {
              return d[1] === b[0];
            });
            0 < d.length &&
              (m.addUndoCopies(k, [h]),
              d.forEach(function (d) {
                return (d[1] = b[1]);
              }));
          },
          t = 0,
          w = f;
        t < w.length;
        t++
      )
        q(w[t]);
    0 < k.entities.length &&
      ((b = m.newState("Update " + m.getStateName(b, k.entities), "edit")),
      b.actions.push(k),
      m.addState(b, { mA: g }));
  }
  function l(b, d) {
    for (var f = 0; f < d.length; f++)
      for (var g = d[f], k = 0, l = g[1]; k < l.length; k++)
        obj.fixRefProps(b, l[k], g[0], d);
  }
  function n(b, d, f, g, k) {
    var l = g.type === e.type.view;
    return g.type === e.type.period
      ? e.getSortedDefaultPeriods(b)
      : f
        ? l
          ? e.getViews(b, e.viewVisibility.all).filter(function (b) {
              return k ? !b.isDefault : !0;
            })
          : e.sortNotDel(b[d])
        : obj.notDel(b[d]);
  }
  function t() {
    return obj.getComplexProps(e.timetable).filter(function (b) {
      return b.desc.type !== e.type.cardStyle;
    });
  }
  function w(b, d) {
    return b.find(function (b) {
      return str.equalLowerCase(str.trim(b.name), str.trim(d.name));
    });
  }
  function u(b, d, f, g) {
    d = e.sortedDefaultPeriods(
      __spreadArray(__spreadArray([], d, !0), e.defaultPeriods(f), !0),
    );
    var k = x(b, d);
    b = function (b) {
      g.filter(function (d) {
        return d.position === b.position;
      }).forEach(function (b) {
        return b.position++;
      });
      b.position++;
    };
    f = 0;
    for (
      d = d.filter(function (b) {
        return b.position >= k;
      });
      f < d.length;
      f++
    )
      b(d[f]);
    return k;
  }
  function x(b, d) {
    var f = e.startMin(b),
      g = e.endMin(b);
    return (b = d.find(function (b) {
      return f < e.startMin(b) || (f === e.startMin(b) && g < e.endMin(b));
    }))
      ? b.position
      : arr.last(d).position + 1;
  }
  function y(b, d, f, g, k) {
    var l = 0;
    for (
      g = g.filter(function (d) {
        return d.position === b.position;
      });
      l < g.length;
      l++
    ) {
      var h = g[l],
        n = obj.newChildCloneToUse(h, e.period, f);
      n.position = d;
      n.sourceId = h.id;
      k.push(n);
    }
  }
  function z(b, d, f, g) {
    for (
      var k = function (d) {
          var k = f.find(function (b) {
            return (
              d.position === b.position &&
              e.startMin(d) === e.startMin(b) &&
              e.endMin(d) === e.endMin(b) &&
              d.entityId === b.entityId &&
              d.entityType === b.entityType &&
              d.dayId === b.dayId &&
              d.showCustom === b.showCustom
            );
          });
          if (k) {
            arr.remove(b, d);
            for (
              var l = 0,
                h = g.filter(function (b) {
                  return b.periodId === d.id;
                });
              l < h.length;
              l++
            )
              h[l].periodId = k.id;
          }
        },
        l = 0;
      l < d.length;
      l++
    )
      k(d[l]);
  }
  function A(b, d, f) {
    b = e.getSortedGroups(b);
    d = e.getSortedGroups(d);
    for (var g = !0, k = 0; k < b.length; k++) {
      var l = b[k],
        h = w(d, l);
      h ? (h.sourceId = l.id) : ((g = !1), f.push(l));
    }
    return g;
  }
  g.merge = function (f, g, q) {
    for (
      var w = [],
        x = [],
        A = [],
        B = [],
        E = [],
        I,
        L,
        K = [],
        P = e.customPeriods(g.periods),
        R = e.customPeriods(f.periods),
        O = [],
        M = [],
        Q = e.getDefaultPeriods(g).map(function (b) {
          return [b.id, b.position];
        }),
        U = e.sortNotDel(f.periods).map(function (b) {
          return [b.id, b.position];
        }),
        N = function (b) {
          var d = b.desc,
            k = b.name,
            l = d.type,
            h = d.props;
          b = l === e.type.day;
          var q = l === e.type.period,
            t = l === e.type.class,
            z = l === e.type.activity;
          l = l === e.type.clip;
          var F = e.hasPos(h);
          h = e.hasName(h);
          var C = n(g, k, F, d, !0);
          k = n(f, k, F, d, !1);
          for (var H = [], G = 0; G < C.length; G++) {
            var D = C[G];
            if (!h || !p(f, k, D, K, P, O, M, x, w, b, q, t)) {
              if (z) {
                var J = obj.notDel(D.groups);
                if (arr.hasOneEqual(J, x)) {
                  A.push(D);
                  B.push.apply(B, D.cards);
                  continue;
                }
              } else if (l && arr.hasOneEqual(D.cards, B)) continue;
              J = obj.newChildCloneToUse(D, d, f, {
                type: obj.prepType.none,
                setSourceId: !0,
              });
              F && (J.position = q ? u(D, k, H, R) : k.length + H.length + 1);
              b &&
                D.position !== J.position &&
                K.push([D.position, J.position]);
              H.push(J);
              q && y(D, J.position, f, P, O);
            }
          }
          q && H.push.apply(H, O);
          if (0 < H.length)
            if ((E.push([d, H]), t)) {
              var N = [];
              H.forEach(function (b) {
                return N.push.apply(N, obj.notDel(b.groupSets));
              });
              I = [e.groupSet, N];
            } else if (z) {
              var Q = [];
              H.forEach(function (b) {
                return Q.push.apply(Q, obj.notDel(b.cards));
              });
              L = [e.card, Q];
            }
        },
        W = 0,
        S = t();
      W < S.length;
      W++
    )
      N(S[W]);
    N = E.slice();
    if (I) {
      N.push(I);
      var Z = [];
      I[1].map(function (b) {
        return Z.push.apply(Z, b.groups);
      });
      N.push([e.group, Z]);
    }
    L && N.push(L);
    l(f, N);
    obj.each(
      e.timetable,
      f,
      function (b, d) {
        return obj.deleteProperty(d, "sourceId");
      },
      {
        propFunc: function (b) {
          return b === e.timetable ? t() : obj.getComplexProps(b);
        },
      },
    );
    b(q, obj.notDel(f.periods), U);
    for (N = 0; N < E.length; N++) {
      S = E[N];
      W = S[0];
      S = S[1];
      var X = W === e.period;
      X && z(S, O, e.customPeriods(f.periods), L ? L[1] : []);
      e.isViewEntityType(W.type) && h(S, K, M);
      m.addEntities(
        W,
        S,
        { mA: q, reposition: X },
        "Import " + m.getStateName(W, S),
        "import",
      );
      X && (k(f, U, q), d(Q, e.defaultPeriods(S), M));
    }
    0 < A.length &&
      q.vA.inf.add(
        ""
          .concat(
            A.length,
            " activities ignored because the following classes have different groups: ",
          )
          .concat(
            arr.joinCommaSpace(
              w.map(function (b) {
                return b.name;
              }),
            ),
          ),
      );
  };
  g.updatePeriodsDueToInsert = b;
  g.fixTargetMarks = k;
  g.findPeriodPosAndInsert = u;
  g.findPeriodPos = x;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function h(f, b, d) {
      var k = this;
      this.id = 0;
      this.show = this.isRun = !1;
      this.mA = f;
      this.setMin(b, !1);
      g.descChange.add(function (b) {
        return k.onChg();
      });
      d.add(function () {
        return k.stop();
      });
    }
    h.prototype.onChg = function () {
      if (!this.isRun) this.startNow();
      else if (this.show) {
        this.show = !1;
        var f = this.txt();
        f && this.mA.vA.inf.add(f);
        this.stop();
        this.start();
      }
    };
    h.prototype.startNow = function () {
      this.saveMs = date.nowMs();
      this.start();
    };
    h.prototype.start = function () {
      var f = this;
      this.isRun = !0;
      this.id = setInterval(function () {
        return f.onAlert();
      }, this.ms);
    };
    h.prototype.stop = function () {
      clearInterval(this.id);
      this.isRun = !1;
    };
    h.prototype.reset = function () {
      this.show = !1;
      this.stop();
      this.startNow();
    };
    h.prototype.onAlert = function () {
      if (g.hasHistoryChange() || !g.allowSave(this.mA)) this.show = !0;
    };
    h.prototype.minNoSave = function () {
      return Math.floor((date.nowMs() - this.saveMs) / 6e4);
    };
    h.prototype.setMin = function (f, b) {
      void 0 === b && (b = !0);
      this.mA.allow.checkExpire(!1) || (f = 10);
      this.ms = 6e4 * f;
      b && this.reset();
    };
    h.prototype.txt = function () {
      var f = this.minNoSave(),
        b = this.mA.vA.loc.get(
          "SaveReminderMinuteMessage",
          "You've been working for ".concat(
            f,
            " minutes without saving changes.",
          ),
        );
      if (0 === f) return "";
      ((f = this.mA.allow.freeOrPurchasedCheck()) &&
        this.mA.allow.creatorOrOwnerCheck()) ||
        (b = "");
      f || this.mA.abr();
      return b;
    };
    return h;
  })();
  g.reminder = p;
})(m || (m = {}));
(function (g) {
  function p(b, f) {
    void 0 === f && (f = !1);
    return b.allow.canSaveTimetable(f) && !b.vA.isSave();
  }
  function h(b, f, g) {
    if (
      obj.has(f, b, function (b, d) {
        return !(obj.isUnchanged(d) || (obj.isDel(d) && g && d.updatedMs < g));
      })
    ) {
      var d = {},
        k = obj.isUnchanged(b),
        q = obj.isDel(b);
      if (k || q) d.id = b.id;
      k || (d.entityState = b.entityState);
      if (q) return d;
      q = obj.isAdd(b);
      var w = 0;
      for (
        f = obj.isChg(b)
          ? obj
              .keysToProps(f, (b.changedKeys || []).concat(obj.idProp().name))
              .concat(obj.getComplexProps(f))
          : f.props;
        w < f.length;
        w++
      ) {
        var u = f[w],
          x = u.name,
          y = b[x];
        if (obj.isArray(u))
          if (u.desc) {
            for (var p = [], A = 0; A < y.length; A++) {
              var B = h(y[A], u.desc, g);
              B && p.push(B);
            }
            0 < p.length && (d[x] = p);
          } else k || (q && (!y || 0 === y.length)) || (d[x] = y.slice());
        else k || (q && y === obj.getDefaultValue(u)) || (d[x] = y);
      }
      return d;
    }
  }
  function f(b, g, h) {
    if (!obj.isUnchanged(b))
      return obj.isDel(b) && h && b.updatedMs < h ? !1 : !0;
    var d = 0;
    for (g = obj.getComplexProps(g); d < g.length; d++) {
      var k = g[d],
        q = b[k.name];
      if (q && k.type === obj.propType.arr)
        for (var w = 0; w < q.length; w++) if (f(q[w], k.desc, h)) return !0;
    }
    return !1;
  }
  g.getSaveChange = function (b, f) {
    return p(b) ? g.getChange(b._t(), e.timetable, b._t().saveDate) : void 0;
  };
  g.allowSave = p;
  var b = (function () {
    function b(b) {
      this.isInStorage = !1;
      this.mA = b;
    }
    b.prototype.save = function () {
      var b = this.mA.vA,
        d = this.mA._t(),
        f = g.getSaveChange(this.mA, !0);
      if (f)
        if (e.isExample(d)) this.saveAsForExample(f);
        else {
          this.sWatch = new c.stopW(b);
          b.tState = a.timetableState.s;
          this.mA.memory.onSaveStart();
          var h = obj.isAdd(d);
          this.isInStorage = this.updateStorage(e.syncState.client);
          f.updatedAt = d.updatedAt;
          b.post(
            "schools/" +
              b.config.user.schoolId +
              "/timetables/" +
              (h ? "" : d.id + "/"),
            f,
            {
              methodType: h ? http.methodType.post : http.methodType.put,
              done: this.onDone.bind(this),
              state: {
                saveDate: date.nowMs(),
                change: f,
                savedState: g.currentState(),
              },
            },
          );
        }
    };
    b.prototype.saveAsForExample = function (b) {
      new g.createTimetable(this.mA, {
        isNew: !1,
        name: this.mA._t().name + (b.name ? "" : " copy"),
        description: this.mA._t().description,
      });
    };
    b.prototype.updateStorage = function (b) {
      return new a.timetableStorage({ logger: this.mA.vA.log }).updateT(
        this.mA._t(),
        !1,
        b,
      );
    };
    b.prototype.onDone = function (b) {
      if (c.checkSuccess(b, this.mA.vA)) {
        var d = b.state;
        this.onSaveEnd(b, d, !0);
        var f = b.data;
        f &&
          f.id &&
          (obj.prep(f, e.timetable),
          obj.eq(this.mA._t(), f, e.timetable) ||
            ((d = new a.openOptions(d.change.id, f.updatedAt, a.openM.os)),
            (d.isSrv = !0),
            new a.opener(this.mA.vA).onOpen({
              status: http.statusCode.ok,
              body: b.body,
              data: f,
              state: d,
            }),
            this.mA.vA.inf.add("Timetable updated with the latest changes.")));
      } else
        ((f = this.isInStorage
          ? "<p>Changes are saved in your browser's cache only. In order to avoid losing data:</p><ul><li>Check your internet connection and try saving again</li><li>Choose 'Save as > Local File' to create a copy on your disc</li></ul><p>" +
            ui.linkMessage("#prevent-data-loss", "Read more") +
            "</p>"
          : "While saving changes an error occurred. Check your internet connection and try again."),
          this.mA.vA.inf.warn(f),
          this.onSaveEnd(b, void 0, !1));
    };
    b.prototype.onSaveEnd = function (b, d, f) {
      this.sWatch.logDur("Saving changes on client");
      f && this.updateAfterSave(b, d);
      this.mA.vA.tState = a.timetableState.d;
      this.mA.memory.onSaveDone();
      arr.has(c.getErrCodes(b.errors), http.errCode.abort) &&
        this.mA.cmd(http.cmds.abort);
    };
    b.prototype.updateAfterSave = function (b, d) {
      var f = this.mA._t();
      b = b.data;
      obj.prepDates(b, e.timetable, { deep: !1 });
      b.createdAt && (f.createdAt = b.createdAt);
      f.updatedAt = b.updatedAt;
      obj.each(e.timetable, f, function (b, f) {
        b = d.saveDate;
        if (obj.isAdd(f) || obj.isChg(f))
          f.updatedMs > b
            ? obj.isAdd(f) && obj.setChg(f)
            : (obj.setUnchg(f), (f.changedKeys = void 0));
      });
      f.saveDate = d.saveDate;
      this.updateStorage(e.syncState.yes);
      g.isSaved = !0;
      g.purge({
        mA: this.mA,
        updateType: g.updateType.save,
        removeDel: !0,
        first: { isSaved: !0 },
      });
    };
    b.prototype.loseChg = function (b) {
      var d = this.loseChgMsg(b);
      if (d && !this.mA.confirm(d)) return !1;
      b && (this.mA.loseChgOk = !0);
      return !0;
    };
    b.prototype.loseChgMsg = function (b) {
      var d;
      !this.mA.loseChgOk &&
        g.allowSave(this.mA) &&
        g.hasHistoryChange() &&
        (d = this.mA.vA.loc.get(
          "ConfirmLosingChangesMessage",
          "You have unsaved timetable changes.\n\nClick Cancel and then save them. \nOtherwise, click Ok to discard changes and continue.",
        ));
      return d;
    };
    return b;
  })();
  g.saveM = b;
  g.getChange = h;
  g.hasEntityChange = f;
})(m || (m = {}));
var filter;
(function (g) {
  function p(b, d) {
    return !!(b.tags ? str.split(b.tags) : []).find(function (b) {
      return b.toLowerCase() === d;
    });
  }
  function h(b, d, g) {
    0 < d.length && c.combo.addHR(b);
    d.forEach(function (d) {
      return f(b, g, d[0], d[1]);
    });
  }
  function f(b, d, f, g, k) {
    void 0 === k && (k = !1);
    d = [d + t + f, g ? g : f];
    k ? b.unshift(d) : b.push(d);
  }
  function b(b, d, g, k) {
    f(b, d, g, k, !0);
  }
  function d(b) {
    if (!b) return [num.noValue, ""];
    b = str.split(b, t);
    return [num.toInt(b[0]), b[1]];
  }
  function k(b, d, g) {
    var k = obj.merge({ useClassName: !0 }, g);
    g = k.useClassName;
    var l = k.useFullName,
      h = k.emptyPair;
    k = [];
    if (h) {
      var q = h[0],
        t = h[1];
      k.push([q ? q : num.noValue + "", t]);
      0 < d.length && "-" !== t && c.combo.addHR(k);
    }
    h = b === e.group;
    var x = b === e.period;
    b = b.type;
    for (var w = 0; w < d.length; w++) {
      t = d[w];
      q = t.id;
      if (h) {
        var u = g,
          p = l,
          H = t.name;
        t = n(t)
          ? H
          : e.isEntire(t)
            ? u
              ? e.getClass(t).name
              : "Entire class"
            : p
              ? e.groupName(t)
              : H;
      } else t = x ? e.getPeriodComboName(t) : t.name || "";
      f(k, b, q, t);
    }
    return k;
  }
  function q(b) {
    return d(b)[0] === num.noValue;
  }
  function l(b, f, k) {
    void 0 === k && (k = !0);
    !k ||
      (b !== e.group.type && b !== e._class.type) ||
      ((k = d(f)[0]),
      (k !== filter.type.tags && k !== num.noValue) ||
        l(b === e.group.type ? e._class.type : e.group.type, f, !1));
    (k = g.valuesPerDesc.find(function (d) {
      return d[0] === b;
    }))
      ? (k[1] = f)
      : g.valuesPerDesc.push([b, f]);
  }
  function n(b) {
    return g.currentId === b.id;
  }
  g.getTagsForFiles = function (b) {
    for (var d = [], f = 0; f < b.length; f++)
      for (var g = 0, k = b[f].tags; g < k.length; g++) arr.addUnique(d, k[g]);
    d.sort();
    return d;
  };
  g.getTags = function (b) {
    for (var d = [], f = 0; f < b.length; f++) {
      var g = b[f];
      (g.tags ? str.split(g.tags) : []).forEach(function (b) {
        return arr.addUniqueString(d, b);
      });
    }
    d.sort();
    return d;
  };
  g.hasTag = p;
  g.getFilters = function (b, d, f, l) {
    void 0 === f && (f = !1);
    var n = d === e.room;
    l ||
      (l = e.isViewEntity(d)
        ? e.getViewEntities(b._t(), d.type)
        : d === e.group
          ? e.sortNotDel(b._t().classes)
          : []);
    b = filter.getTags(l);
    var q = [],
      t = [];
    if (n) {
      for (var w = 0, x = l; w < x.length; w++) {
        var u = x[w];
        n &&
          (u.capacity !== num.noValue && arr.addUnique(q, u.capacity),
          u.building && arr.addUniqueString(t, u.building));
      }
      t.sort();
      q.sort();
    }
    n = [];
    f && n.push.apply(n, k(d, l));
    h(
      n,
      b.map(function (b) {
        return [b, b];
      }),
      g.type.tags,
    );
    h(
      n,
      t.map(function (b) {
        return [b, b];
      }),
      g.type.building,
    );
    h(
      n,
      q.map(function (b) {
        return [b + "", "Capacity: " + b];
      }),
      g.type.capacity,
    );
    return n;
  };
  g.addOption = f;
  g.getValue = function (b, d) {
    return b + t + d;
  };
  g.insertOption = b;
  g.insertEmptyOption = function (d, f) {
    b(d, num.noValue, "", f);
  };
  g.addEmptyFilterByTags = function (b, d, f) {
    void 0 === f && (f = !0);
    filter.addOption(
      d,
      num.noValue,
      "",
      b === e.room ? "Filter by tags, capacity or buldings" : "Filter by tags",
      f,
    );
  };
  g.getTypeAndId = d;
  g.getOptions = k;
  g.isEmpty = q;
  g.addEq = function (b, f, g, k) {
    var l = d(k),
      h = l[0];
    l = l[1];
    var n = !1;
    q(k) || !l
      ? (n = !0)
      : e.isViewEntityType(h)
        ? (n = g.id === l)
        : h === filter.type.tags
          ? ((f = f === e.group.type ? e.getClass(g) : g),
            (n = p(f, l.toLowerCase())))
          : h === filter.type.capacity
            ? (n = g.capacity + "" === l.toLowerCase())
            : h === filter.type.building
              ? (n = g.building.toLowerCase() === l.toLowerCase())
              : h === filter.type.showOnlyClasses && (n = filter.isEntire(g));
    n && b.push(g);
  };
  g.remember = l;
  g.getPreviousValue = function (b) {
    var d = filter.valuesPerDesc.find(function (d) {
      return d[0] === b;
    });
    return d ? d[1] : void 0;
  };
  g.resetCombo = function (b) {
    b.setValue(num.noValue + t + "");
  };
  g.findValueById = function (b, f) {
    if (f)
      return (b = b.find(function (b) {
        return d(b[0])[1] === f;
      }))
        ? b[0]
        : void 0;
  };
  g.valuesPerDesc = [];
  g.isEntire = function (b) {
    return e.isEntire(b) && !n(b);
  };
  g.isCurrent = n;
  g.type = { showOnlyClasses: 50, tags: 51, capacity: 52, building: 53 };
  g.currentId = str.id();
  g.currentO = {
    id: g.currentId,
    name: "Current",
    shortName: "",
    entityState: obj.entityState.unchanged,
    sourceId: "",
  };
  var t = "#%^";
})(filter || (filter = {}));
(function (g) {
  g.addDays = function (p, h, f) {
    g.addEntities(e.day, e.getNewDays(p, h, f.vA), { mA: f });
  };
})(m || (m = {}));
(function (g) {
  function p(b, d, f) {
    var g = 0;
    for (
      b = b.filter(function (b) {
        return e.isCustomPeriod(b);
      });
      g < b.length;
      g++
    ) {
      var k = b[g],
        h = e.customDays(f._t(), k.groupedPeriods);
      k.customText =
        (h.length === d
          ? "All days"
          : 0 === h.length
            ? "Visible for"
            : arr.joinCommaSpace(e.shorts(h))) +
        ": " +
        arr.joinCommaSpace(
          e.shorts(e.getCustomEntities(f._t(), k.entityType, k.groupedPeriods)),
        );
    }
  }
  function h(b, d) {
    b = b.filter(function (b) {
      return b.position === d;
    });
    b = e.sortByPosTime(b);
    return arr.groupByMany(b, [
      new arr.groupKey("startTime", function (b) {
        return e.startMin(b);
      }),
      new arr.groupKey("endTime", function (b) {
        return e.endMin(b);
      }),
      new arr.groupKey("name", function (b) {
        return b.name;
      }),
      new arr.groupKey("shortName", function (b) {
        return b.shortName;
      }),
      new arr.groupKey("entityType", function (b) {
        return b.entityType;
      }),
      new arr.groupKey("showCustom", function (b) {
        return b.showCustom;
      }),
    ]);
  }
  g.getPeriods = function (b, d) {
    var f = d._t(),
      g = e.customPeriods(f.periods),
      l = g;
    b.showCustom &&
      void 0 !== b.dayId &&
      (l = l.filter(function (d) {
        return b.dayId === d.dayId;
      }));
    b.showCustom &&
      void 0 !== b.eId &&
      (l = l.filter(function (d) {
        return b.eId === d.entityId;
      }));
    var n = [],
      t = obj.notDel(f.days).length,
      w = function (d) {
        for (var f = [], k = 0, q = h(l, d.position); k < q.length; k++)
          for (var t = q[k], w = 0; w < t.subGroups.length; w++)
            for (var x = t.subGroups[w], u = 0; u < x.subGroups.length; u++)
              for (var p = x.subGroups[u], G = 0; G < p.subGroups.length; G++)
                for (var H = p.subGroups[G], D = 0; D < H.subGroups.length; D++)
                  for (
                    var J = H.subGroups[D], L = 0;
                    L < J.subGroups.length;
                    L++
                  )
                    for (
                      var K = arr
                          .groupByMany(J.subGroups[L].items, [
                            new arr.groupKey("dayId", function (b) {
                              return b.dayId;
                            }),
                          ])
                          .sort(function (b, d) {
                            return arr.sort(-b.items.length, -d.items.length);
                          }),
                        P = 0,
                        R = K;
                      P < R.length;
                      P++
                    ) {
                      var O = R[P];
                      if (!O.isUsed) {
                        var M = O.items,
                          Q = M[0];
                        Q.groupedPeriods = M.slice();
                        for (
                          var U = function (b) {
                              var d;
                              b = K[b];
                              if (b === O) return "continue";
                              var f = b.items;
                              M.length === f.length &&
                                M.every(function (b) {
                                  return f.some(function (d) {
                                    return b.entityId === d.entityId;
                                  });
                                }) &&
                                ((b.isUsed = !0),
                                (d = Q.groupedPeriods).push.apply(d, f));
                            },
                            N = 0;
                          N < K.length;
                          N++
                        )
                          U(N);
                        f.push(Q);
                      }
                    }
        b.isEmpty()
          ? n.push(d)
          : ((k =
              f.some(function (d) {
                return d.dayId === b.dayId;
              }) &&
              f.some(function (d) {
                return d.entityId === b.eId;
              })),
            (b.showCustom && b.dayId && b.eId && k) || n.push(d));
        d.customText = g.some(function (b) {
          return b.position === d.position;
        })
          ? e.plus
          : "";
        b.showCustom && n.push.apply(n, f);
      },
      u = 0;
    for (f = e.getSortedDefaultPeriods(f); u < f.length; u++) w(f[u]);
    n = e.sortByPosTime(n);
    p(n, t, d);
    return n;
  };
  var f = (function () {
    function b() {
      this.showCustom = !0;
    }
    b.prototype.isEmpty = function () {
      return !!this.dayId && !!this.eId;
    };
    b.prototype.reset = function () {
      this.dayId = this.eId = void 0;
      this.showCustom = !0;
    };
    return b;
  })();
  g.periodFilter = f;
  g.addNewPeriods = function (b, d, f) {
    m.addEntities(e.period, e.getNewPeriods(b, d, m.setNextTimePos), { mA: f });
  };
  g.eqInterval = function (b, d) {
    return (
      b.startHour === d.startHour &&
      b.startMinute === d.startMinute &&
      b.endHour === d.endHour &&
      b.endMinute === d.endMinute
    );
  };
})(m || (m = {}));
(function (g) {
  g.setNextTimePos = function (g, h, f) {
    for (
      var b = e.duration(g),
        d = 1,
        k = [],
        q = 0,
        l = 1,
        n = [],
        t = function (g) {
          var h = f[g];
          b = e.duration(h);
          var t = k.find(function (d) {
              return d[0] === b;
            }),
            w = 1;
          t ? ((t[1] += 1), (w = t[1])) : k.push([b, 1]);
          w > d && (d = w);
          if (0 !== g) {
            var u = e.startMin(h) - e.endMin(f[g - 1]);
            g = n.find(function (b) {
              return b[0] === u;
            });
            h = 1;
            g ? ((g[1] += 1), (h = g[1])) : n.push([u, 1]);
            h >= l && ((l = h), (q = u));
          }
        },
        w = 0;
      w < f.length;
      w++
    )
      t(w);
    w = e.endMin(g) + q;
    t = date.hm(w);
    w = date.hm(w + b);
    h.position = g.position + 1;
    h.startHour = t[0];
    h.startMinute = t[1];
    h.endHour = w[0];
    h.endMinute = w[1];
  };
})(m || (m = {}));
(function (g) {
  function p(b, f, g, l) {
    b = obj.newChildToUse(e.group, b);
    void 0 !== f && (b.name = f);
    void 0 !== g && (b.shortName = g);
    void 0 !== l && (b.position = l);
    return b;
  }
  function h(b, f) {
    b = obj.newChildToUse(e.groupSet, b);
    void 0 !== f && (b.position = f);
    b.groups = [];
    return b;
  }
  function f(b) {
    b = h(b, void 0);
    b.groups.push(p(b, void 0, void 0, void 0));
    return b;
  }
  function b(b) {
    var d = f(b),
      g = h(b, 1),
      l = p(g, "Group 1", "g1", 1),
      n = p(g, "Group 2", "g2", 2);
    g.groups.push(l, n);
    b = h(b, 2);
    l = p(b, "Boys", "Bo", 1);
    n = p(b, "Girls", "Gi", 2);
    b.groups.push(l, n);
    return [d, g, b];
  }
  g.addGroups = function (d, g, h) {
    var k;
    void 0 === h && (h = !0);
    (k = d.groupSets).push.apply(k, g ? b(d) : [f(d)]);
    h && obj.prepForUsage(d, e._class, { parent: d.parent });
  };
  g.newGroup = p;
  g.newGroupSet = h;
  g.newEntireGroupSet = f;
  g.newStudent = function (b, f, g, l) {
    b = obj.newChildToUse(e.student, b);
    b.name = f;
    b.shortName = g;
    b.position = l;
    return b;
  };
  g.removeDeletedGroups = function (b, f, h) {
    var d = e.ids(f);
    b = b.filter(function (b) {
      return arr.hasOneEqual(b.groupIds, d);
    });
    f = b.length;
    if (0 !== f) {
      f =
        1 === f
          ? "Remove group for student"
          : "Remove groups for ".concat(f, " students");
      f = g.newUpdateState(
        e.student,
        b,
        { mA: h, changedProps: [e.studentGroupIds] },
        f,
        "group",
      );
      for (var k = 0; k < b.length; k++) arr.removes(b[k].groupIds, d);
      g.addState(f, { mA: h });
    }
  };
})(m || (m = {}));
(function (g) {
  g.hasMoreGroupSetsFromClass = function (g) {
    var h = g.filter(function (b) {
        return !filter.isCurrent(b);
      }),
      f = !1;
    g = function (b) {
      for (
        var d = [],
          g = 0,
          k = h.filter(function (d) {
            return e.getClass(d) === b;
          });
        g < k.length;
        g++
      )
        arr.addUnique(d, k[g].parent);
      if (1 < d.length) return ((f = !0), "break");
    };
    for (
      var b = 0,
        d = h.map(function (b) {
          return e.getClass(b);
        });
      b < d.length && "break" !== g(d[b]);
      b++
    );
    return f;
  };
  g.getFinalGroupIds = function (g, h) {
    var f = e.byIds(g.groups, h),
      b = [];
    g = function (d) {
      if (e.isEntire(d)) return (b.push(d), "continue");
      var g = e.getClass(d);
      f.find(function (b) {
        return e.isEntire(b) && e.getClass(b) === g;
      }) || b.push(d);
    };
    for (h = 0; h < f.length; h++) g(f[h]);
    return e.ids(b);
  };
})(m || (m = {}));
(function (g) {
  g.hasDesired = function (g) {
    return 0 < g.roomIds.length;
  };
  g.getGroups = function (g) {
    return g.parent.groups;
  };
  g.getActivity = function (g) {
    return g.parent;
  };
})(m || (m = {}));
var activityFilter;
(function (g) {
  function p(b, d) {
    if (!b) return { total: -1 };
    var g = { total: 0 },
      q = [],
      l = 0;
    for (b = h(b); l < b.length; l++) {
      var n = b[l],
        t = obj.notDel(n.cards);
      g.total += t.length * n.length;
      q.push([n, t]);
    }
    if (0 === q.length) q = { isExact: !0, total: 0 };
    else {
      l = d.defaultPeriods;
      d = d.showCustoms;
      n = b = 0;
      t = !0;
      for (var w = 0; w < l.length; w++) {
        var u = e.duration(l[w]);
        b += u;
        0 !== n && n !== u && (t = !1);
        n = u;
      }
      n = [Math.floor(b / l.length), t];
      b = n[0];
      n = n[1];
      t = !1;
      for (u = w = 0; u < q.length; u++)
        for (var x = 0, y = q[u][1]; x < y.length; x++) {
          var p = y[x],
            A = p.period,
            B = p.parent.length;
          if (A) {
            if (
              ((p = e.getAllIds(p)),
              (w += f(A, d, p)),
              1 < B && !e.isCustomPeriod(A))
            ) {
              A = A.position - 1;
              for (var E = 1; E < B; E++)
                (++A >= l.length && (A = 0), (w += f(l[A], d, p)));
            }
          } else ((w += b * B), (t = !0));
        }
      q = { isExact: 0 === w || n || !t, total: w };
    }
    g.minutes = q;
    return g;
  }
  function h(b) {
    return b.filter(function (b) {
      return !e.isExcludedFromStats(b.subject);
    });
  }
  function f(b, d, f) {
    return (d = d.find(function (d) {
      return d.position === b.position && arr.has(f, d.entityId);
    }))
      ? e.duration(d)
      : e.duration(b);
  }
  g.getFiltered = function (b, d) {
    var f = d.entityIds,
      g = d.subEntityIds,
      l = d.type;
    if (filter.isEmpty(d.value)) return b;
    var h = 0 < g.length;
    return l === e.type.class
      ? b.filter(function (b) {
          return h
            ? arr.hasOneEqual(b.groupIds, g)
            : arr.hasOneEqual(
                b.groups.map(function (b) {
                  return e.getClass(b).id;
                }),
                f,
              );
        })
      : l === e.type.teacher
        ? b.filter(function (b) {
            return (
              arr.hasOneEqual(b.teacherIds, f) &&
              (h ? arr.has(g, b.subjectId) : !0)
            );
          })
        : l === e.type.room
          ? b.filter(function (b) {
              return arr.hasOneEqual(e.desiredAndMoreIds(b), f);
            })
          : l === e.type.subject
            ? b.filter(function (b) {
                return arr.has(f, b.subjectId);
              })
            : b;
  };
  g.getTotal = p;
  g.getTimetableTotal = function (b, d) {
    return p(b, m.getPeriodsForStats(d));
  };
  g.getStatsActivities = h;
  g.getHoursText = function (b) {
    var d = date.dayHourMinute(b.total),
      f = d[0],
      g = d[1];
    d = d[2];
    if (0 === f && 0 === g && 0 === d) return "";
    f = 24 * f + g;
    f = 0 === f ? "" : "".concat(f, "h");
    d = 0 === d ? "" : "".concat(d, "min");
    d = arr.join([f, d], " ");
    return "".concat(b.isExact ? "" : "approx. ").concat(d);
  };
  g.setNextType = function (b) {
    var d = b.type;
    b.type =
      d === e.type.teacher
        ? e.type.class
        : d === e.type.class
          ? e.type.room
          : d === e.type.room
            ? e.type.subject
            : e.type.teacher;
  };
  g.getIconId = function (b) {
    return ["class", "teacher", "room", "subject"][b.type - 1];
  };
})(activityFilter || (activityFilter = {}));
(function (g) {
  g.examples = [
    {
      id: "b81543c8-b64c-4411-97b1-c6794d176139",
      name: "International K-12",
      description:
        "Clipped electives, lunch as forbidden period, IB diploma programme",
      tags: ["K-12", "Electives/groups", "International school"],
    },
    {
      id: "09c6044a-1a05-4f99-b9a6-fa7f3cc8a0f9",
      name: "K-12",
      description: "5 days, 8 periods, lunch as forbidden periods",
      tags: ["K-12"],
    },
    {
      id: "accb6d1f-ec17-4d2e-b680-762771dabf58",
      name: "Elementary school",
      description: "Automatic scheduling, 15-minute intervals",
      tags: ["15-minutes", "Elementary school"],
    },
    {
      id: "5db278ee-cba5-4676-afeb-a29f90a7eaba",
      name: "K-5",
      description:
        "Custom period intervals for specific grades, lunch as pinned cards",
      tags: ["K-5", "Custom periods", "30-minutes"],
    },
    {
      id: "45379eed-79e0-48de-9abd-fad69329fe17",
      name: "PreK-8",
      description: "Teacher constraints, pinned cards and forbidden periods",
      tags: ["K-8"],
    },
    {
      id: "162241bc-5df0-43c3-afc0-511b065be252",
      name: "Canada 1",
      description: "Elementary school",
      tags: ["Elementary school"],
    },
    {
      id: "5dbfebb3-4d3e-433f-8d1a-2508828a16cc",
      name: "Canada 2",
      description: "Secondary school",
      tags: ["Secondary school"],
    },
    {
      id: "7a2c169f-b1d7-4ef7-b920-08c23cecc07a",
      name: "United Kingdom",
      description: "Primary school",
      tags: ["Primary school"],
    },
    {
      id: "21f20622-6ad8-441e-90a6-60eb52da7039",
      name: "Australia",
      description: "Australian College",
      tags: ["College"],
    },
    {
      id: "dabcc6a0-a409-45fc-9f88-467ac69584ef",
      name: "United Kingdom College",
      description: "Students added instead of classes",
      tags: ["Students instead of classes", "College"],
    },
    {
      id: "69e5bf8d-74a5-4984-b9a0-03d59c806a7d",
      name: "Example 1",
      description: "Basic constraints",
      tags: ["Middle school"],
    },
    {
      id: "b5b23304-eafe-4757-be43-326e3fef4b92",
      name: "Example 2",
      description: "Forbidden positions for part-time teachers",
      tags: ["Middle school"],
    },
    {
      id: "baf16d0a-7c71-43cc-81ef-dd161beca05b",
      name: "Example 3",
      description: "Classes divided into groups to handle electives",
      tags: ["Electives/groups", "Middle school"],
    },
    {
      id: "4c36244f-6b04-4b5f-b17d-396dae0e387c",
      name: "Brazil",
      description: "Elementary school",
      tags: ["Elementary school"],
    },
    {
      id: "86ec7af7-caaa-4812-8c9c-552e00d67dd8",
      name: "India",
      description: "India school",
    },
    {
      id: "b2978ba8-4da1-482e-bda1-9ba64f36add7",
      name: "Mexico",
      description: "Mexico school",
      tags: ["Elementary school"],
    },
    {
      id: "15ba0e62-4070-4c7a-ab75-19c33b14c76b",
      name: "Egypt",
      description: "Class divided into Art, Music and Cooking group",
      tags: ["Electives/groups"],
    },
    {
      id: "bf35cb58-4923-445b-839d-fc298f5baf16",
      name: "Greece",
      description: "Elementary school from Greece",
      tags: ["Elementary school"],
    },
    {
      id: "dfb15446-b662-4e67-960e-e4a0a981ac36",
      name: "Malaysia",
      description: "Primary and secondary school",
      tags: ["Primary & secondary"],
    },
    {
      id: "0b322c28-153b-42f2-a5dd-198ccec91c6e",
      name: "Japan",
      description: "Secondary school",
      tags: ["Secondary school"],
    },
    {
      id: "3b77746f-17ca-4efb-9d8e-8692760786c0",
      name: "Hong Kong S.A.R. 1",
      description: "Primary Chinese school",
      tags: ["Primary school"],
    },
    {
      id: "d54cc6f4-91bb-4e24-9b78-9ce96d76f31e",
      name: "Hong Kong S.A.R. 2",
      description: "Secondary Chinese school",
      tags: ["Secondary school"],
    },
    {
      id: "d913636f-55ff-4ff4-80ab-bcdbee635871",
      name: "Netherland 1",
      description: "Primary school",
      tags: ["Primary school"],
    },
    {
      id: "5ef3924c-9305-4caa-a160-535a8f98a9b6",
      name: "Netherland 2",
      description: "Secondary school",
      tags: ["Secondary school"],
    },
    {
      id: "a4ec3fa0-2011-4fcd-a444-356e22e9bd1a",
      name: "Dance school",
      description: "Manual timetabling (Belgium)",
      tags: ["Art school"],
    },
    {
      id: "c821fff0-2b7b-4d10-a598-0624cc762507",
      name: "South Africa",
      description: "Primary school",
      tags: ["Primary school"],
    },
    {
      id: "ecfdcbc5-1649-4357-9c53-5eb026101f7b",
      name: "Serbia",
      description: "Elementary school",
      tags: ["Elementary school"],
    },
  ];
})(m || (m = {}));
(function (g) {
  function p(f, b, d, k) {
    k.doType || (k.doType = g.doType._do);
    return { desc: f, entities: b.slice(), type: d, options: k, actions: [] };
  }
  function h(f) {
    var b = [];
    0 !== f.entities.length &&
      (f.type === g.actionType.add
        ? b.push.apply(b, g.doAdd(f))
        : f.type === g.actionType.update
          ? b.push.apply(b, g.doUpdate(f))
          : f.type === g.actionType.delete && b.push.apply(b, g.doDelete(f)));
    return (f.actions = b);
  }
  g.actionType = { add: 1, update: 2, delete: 3 };
  g.doType = { _do: 1, undo: 2, redo: 3 };
  g.newAction = p;
  g.dos = function (f) {
    var b = [];
    f.forEach(function (d) {
      return b.push.apply(b, h(d));
    });
    return b;
  };
  g._do = h;
  g.undoRedo = function (f) {
    var b = [],
      d = f.options.mA,
      k = f.options.doType,
      h = k === g.doType.undo,
      l = 0;
    for (f = h ? f.actions.slice().reverse() : f.actions; l < f.length; l++) {
      var n = f[l],
        t = n.type,
        w = n.desc,
        u = n.entities,
        x = n.options;
      x.doType = k;
      x = x.reposition;
      n.type === g.actionType.update
        ? b.push(g.undoRedoUpdate(n))
        : t === g.actionType.add
          ? h
            ? b.push.apply(
                b,
                g.doDelete(
                  g.newDeleteAction(w, u, {
                    mA: d,
                    needConfirm: !1,
                    doType: k,
                    reposition: x,
                  }),
                ),
              )
            : b.push.apply(b, g.doAdd(n, !1))
          : t === g.actionType.delete &&
            (h
              ? ((t = p(w, u, g.actionType.add, {
                  mA: d,
                  doType: k,
                  reposition: x,
                })),
                (t.redoStates = n.undoStates.slice()),
                b.push.apply(b, g.doAdd(t)))
              : b.push.apply(
                  b,
                  g.doDelete(
                    g.newDeleteAction(w, u, {
                      mA: d,
                      needConfirm: !1,
                      doType: k,
                      reposition: x,
                    }),
                  ),
                ));
    }
    return b;
  };
})(m || (m = {}));
(function (g) {
  function p(g, f) {
    void 0 === g && (g = "");
    void 0 === f && (f = "");
    return { actions: [], redos: [], name: g, icon: f };
  }
  g.newState = p;
  g.newUpdateState = function (h, f, b, d, k) {
    var q = p();
    q.actions.push(g.newUpdateAction(h, f, b));
    q.name = d || "";
    q.icon = k || "edit";
    return q;
  };
  g.newDeleteState = function (h, f, b) {
    var d = p();
    d.icon = "remove";
    d.actions.push(g.newDeleteAction(h, f, b));
    return d;
  };
  g.undoRedoState = function (h, f) {
    var b = [];
    (f ? h.actions.slice().reverse() : h.actions).forEach(function (d) {
      d.options.doType = f ? g.doType.undo : g.doType.redo;
      b.push.apply(b, g.undoRedo(d));
    });
    return b;
  };
  g.getStateName = function (g, f, b) {
    b = void 0 === b ? f.length : b;
    return 1 < b
      ? b + " " + e.plural(g.display)
      : 0 < b
        ? f[0].name || g.display
        : g.display;
  };
})(m || (m = {}));
(function (g) {
  function p(f, h, l) {
    void 0 !== l && (b = l);
    d = g.isSaved = !1;
    g.history = [];
    g.addState(h, { mA: f });
  }
  function h() {
    return arr.last(g.history);
  }
  function f(b, d) {
    b -= d;
    return 0 < b ? (g.history.splice(0, b), !0) : !1;
  }
  g.history = [];
  var b = e.defaultHistoryStates,
    d = !1;
  g.isSaved = !1;
  g.purge = function (b) {
    var d = b.mA,
      f = b.removeDel,
      k = b.first,
      h = b.updateType,
      w = d._t();
    f && obj.deleteEach(e.timetable, w);
    f = g.newUpdateAction(e.timetable, [], { mA: d, updateType: h });
    var u = g.firstStateTypes.findIndex(function (b) {
      return b === h;
    });
    k = obj.merge(
      {
        actions: [f],
        name: g.openNames[u],
        icon: g.openIcons[u],
        redos: [],
        notDoable: !0,
        hasChanges: obj.isAdd(w),
      },
      k,
    );
    p(d, k, b.historyStates);
  };
  g.historyChange = c.callback();
  g.addState = function (k, h) {
    var l = [];
    if (!k.notDoable && (l.push.apply(l, g.dos(k.actions)), 0 === l.length))
      return;
    d = f(g.history.length + 1, b);
    g.history.push(k);
    k.redos = [];
    g.afterStates([k], l, g.doType._do, h);
  };
  g.addAfterActions = function (b, d, f) {
    var k;
    (k = b.actions).push.apply(k, d);
    b = [];
    b.push.apply(b, g.dos(d));
    g.afterActions(d.slice(), b, g.doType._do, f);
  };
  g.gotoState = function (b, d) {
    if (0 !== b) {
      var f = 0 > b;
      b = Math.abs(b);
      b = arr.take(f ? g.history.slice().reverse() : g.currentState().redos, b);
      f && arr.remove(b, g.history[0]);
      if (0 !== b.length) {
        var k = [];
        b.forEach(function (b) {
          return k.push.apply(k, g.undoRedoState(b, f));
        });
        if (f) {
          var h = g.history.length - 1;
          for (var q = 0; q < b.length; q++) {
            var u = b[q],
              x = u.redos.slice();
            x.unshift(u);
            g.history[--h].redos = x.slice();
          }
          arr.removes(g.history, b);
        } else (h = g.history).push.apply(h, b);
        g.afterStates(b, k, f ? g.doType.undo : g.doType.redo, d);
      }
    }
  };
  g.hasUndo = function () {
    return 1 < g.history.length;
  };
  g.hasRedo = function () {
    return 0 < g.history.length && 0 < h().redos.length;
  };
  g.currentState = h;
  g.hasHistoryChange = function () {
    return (
      0 < g.history.length &&
      (g.isSaved
        ? !h().isSaved
        : (1 === g.history.length && h().hasChanges) ||
          1 < g.history.length ||
          d)
    );
  };
  g.onHistoryStatesChange = function (d) {
    var k = f(g.history.length, d);
    b = d;
    k && g.historyChange.fire();
  };
})(m || (m = {}));
(function (g) {
  function p(d, k, l, u, x) {
    var n = l !== g.doType._do;
    u = u.mA;
    for (var t = !1, w = !1, p = !1, E = !1, I = 0; I < d.length; I++) {
      var F = d[I];
      if (F.type === g.actionType.update) {
        var C = F.options.updateType;
        C === g.updateType.pin
          ? g.afterPin(F)
          : C === g.updateType.remove
            ? (g.firePerEntity([F]), g.afterRemove(F) && (E = t = !0), (p = !0))
            : C === g.updateType.drag || C === g.updateType.improve
              ? (g.firePerEntity([F]),
                g.afterImproveOrDrag(
                  F,
                  new r.upd(
                    C === g.updateType.improve ? r.updTy.s : r.updTy.drg,
                  ),
                ) ||
                  ((p = !(C === g.updateType.improve && !n)),
                  E || (E = p),
                  t || (t = p)),
                (p = !0))
              : C === g.updateType.marks
                ? g.afterMarker(F) && (w = p = !0)
                : (w = p = t = !0);
      } else
        F.desc === e.clip
          ? (g.firePerEntity([F]), g.afterClip(F, l))
          : (w = p = t = !0);
    }
    w && h(k);
    p && f(u, n, d, k);
    t && b(u, n, k, E, x);
    g.historyChange.fire();
    q(u, d, k);
  }
  function h(b) {
    for (
      var d = function (b) {
          var d = b.desc;
          d.onChange &&
            b.entities.forEach(function (f) {
              return d.onChange(f, b.type);
            });
        },
        f = 0;
      f < b.length;
      f++
    )
      d(b[f]);
  }
  function f(b, d, f, k) {
    b = [];
    if (l(f))
      b.push.apply(
        b,
        obj
          .getComplexProps(e.timetable)
          .map(function (b) {
            return b.desc;
          })
          .concat(e.timetable),
      );
    else
      for (var h = 0; h < k.length; h++) {
        var n = k[h],
          q = n.desc;
        arr.addUnique(b, q);
        var t = !0;
        n.type === g.actionType.update &&
          ((n = n.options.updateType),
          n === g.updateType.improve ||
            n === g.updateType.drag ||
            n === g.updateType.remove ||
            n === g.updateType.pin ||
            n === g.updateType.marks ||
            n === g.updateType.reorder ||
            n === g.updateType.sort) &&
          (t = !1);
        t &&
          ((t = []),
          obj.setReferenceProperties(
            e.timetable,
            q.type,
            t,
            e.findReferenceProperties,
          ),
          arr.addUniques(
            b,
            t.map(function (b) {
              return b[0];
            }),
          ));
      }
    h = 1 === f.length ? f[0].options.updateType : void 0;
    for (t = 0; t < b.length; t++)
      ((q = b[t]),
        g.onDescChg({
          desc: q,
          done: k,
          mainActions: f,
          changeType: h,
          isHistory: d,
        }));
  }
  function b(b, f, h, l, q) {
    var n = b._v.g.vs.slice();
    if (!k(b, h, n, q)) {
      q = e.changeViewType.no;
      if (l) q = e.changeViewType.view;
      else
        for (l = 0; l < h.length; l++) {
          var t = h[l];
          if (t.desc === e.view && !f && t.type === g.actionType.add) break;
          t = d(b, f, t, h);
          if (q < t && ((q = t), q === e.changeViewType.mesh)) break;
        }
      if (q === e.changeViewType.view || q === e.changeViewType.mesh) {
        f = h.every(function (b) {
          return b.desc === e.student;
        });
        for (h = 0; h < n.length; h++)
          ((q = n[h]),
            (f && !q.viewType().isIndividualClassView()) || q.refreshAll());
        f && b.vA.title.set();
      }
    }
  }
  function d(b, d, f, k) {
    d = f.desc.type;
    k = f.options.updateType;
    return k === g.updateType.improve ||
      k === g.updateType.marks ||
      k === g.updateType.pin ||
      (k === g.updateType.remove && !g.refreshAfterRemove(f)) ||
      ((k === g.updateType.drag || k === g.updateType.improve) &&
        !g.shouldRefreshView(f.entities.length)) ||
      d === e.type.clip
      ? e.changeViewType.no
      : e.isDayOrPeriodType(d)
        ? e.changeViewType.mesh
        : d === e.type.timetable
          ? b._v.isPrint()
            ? e.changeViewType.view
            : e.changeViewType.no
          : e.changeViewType.view;
  }
  function k(b, d, f, k) {
    d = d.filter(function (b) {
      return b.desc === e.view;
    });
    if (0 === d.length) return !1;
    if (k === g.updateType.reorder || k === g.updateType.sort) return !0;
    b._v.g.deleteSpots();
    k = function (d) {
      for (
        var g = f.filter(function (b) {
            return arr.has(e.ids(d.entities), b.viewType().id);
          }),
          k = 0;
        k < g.length;
        k++
      ) {
        var h = g[k],
          l = r.newViewTypeFromIndex(b._t(), h.viewType().i);
        h.switcher.toView(l.view, !0);
      }
      arr.removes(f, g);
    };
    for (
      var h = 0,
        l = d.filter(function (b) {
          return b.type === g.actionType.delete;
        });
      h < l.length;
      h++
    )
      k(l[h]);
    k = function (b) {
      for (
        var d = f.filter(function (d) {
            return arr.has(e.ids(b.entities), d.viewType().id);
          }),
          g = 0;
        g < d.length;
        g++
      ) {
        var k = d[g];
        k.switcher.toView(k.viewType().view, !0);
      }
      arr.removes(f, d);
    };
    h = 0;
    for (
      d = d.filter(function (b) {
        return b.type === g.actionType.update;
      });
      h < d.length;
      h++
    )
      k(d[h]);
    return !1;
  }
  function q(b, d, f) {
    (l(d) ||
      f.some(function (b) {
        var d = b.desc;
        b =
          d === e.day ||
          d === e.period ||
          d === e.group ||
          d === e.viewEntity ||
          d === e.activity ||
          d === e.card ||
          d === e.clip
            ? !0
            : e.isViewEntity(d)
              ? b.type !== g.actionType.add
              : !1;
        return b;
      })) &&
      b.play.revalid();
  }
  function l(b) {
    return !!b.find(function (b) {
      return g.openUpdateTypes.some(function (d) {
        return d === b.options.updateType;
      });
    });
  }
  g.afterStates = function (b, d, f, g) {
    var k = [];
    b.forEach(function (b) {
      return k.push.apply(k, b.actions);
    });
    p(k, d, f, g, 1 === b.length ? b[0].tag : void 0);
  };
  g.afterActions = p;
  g.firePerEntity = h;
  g.onDescChg = function (b) {
    g.descChange.fire(b);
  };
  g.descChange = c.callback();
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d, f) {
      b = h.call(this, b, d) || this;
      b.hasChanges = !0;
      b.items = [];
      b.icon = f;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.center = d.isModal = d.anim = !1;
      d.width = 200;
      d.height = 300;
      var f = this.getWinPos();
      d.left = f.x;
      d.top = f.y;
      ui.addClass(d.el, "historyWin");
      d.init();
      d.dragEnd.add(function () {
        return b.onPosChanged();
      });
      d.resize.add(function () {
        return b.onPosChanged();
      });
      this.el = d.content;
      f = ui.addClass(ui.getTag("a"), "help");
      ui.setAttribute(f, "href", "#history");
      svg.getIcon(f, "svgIcon", "helpD");
      ui.tap(f, function (b) {
        ui.stopPropagation(b);
      });
      ui.prepend(f, d.titleBar);
      g.historyChange.add(function () {
        return b.onChg();
      });
    };
    f.prototype.getWinPos = function () {
      var b = ui.offset(this.icon.el);
      return { x: b.x - 5, y: b.y + ui.getComputedHeight(this.icon.el) + 8 };
    };
    f.prototype.open = function () {
      this.win.title("History");
      this.init();
      this.win.open();
      this.bind();
      ui.addClass(this.icon.el, "select");
    };
    f.prototype.beforeClose = function () {
      ui.deleteClass(this.icon.el, "select");
    };
    f.prototype.x = function () {
      this.win.close();
    };
    f.prototype.bind = function () {
      if (this.hasChanges) {
        ui.empty(this.el);
        var b = ui.getFragment(),
          d = g.history.length;
        this.items = [];
        for (var f = 0, h = g.history; f < h.length; f++) {
          var l = h[f];
          l = this.getItem(l, -(--d));
          this.items.push(l);
          b.appendChild(l);
        }
        this.selected = arr.last(this.items);
        if (0 < g.history.length)
          for (f = d = 0, h = g.currentState().redos; f < h.length; f++)
            ((l = h[f]),
              (l = this.getItem(l, ++d)),
              b.appendChild(l),
              this.items.push(l));
        ui.append(b, this.el);
        this.selected.scrollIntoView(!0);
      }
    };
    f.prototype.onChg = function () {
      this.hasChanges = !0;
      this.isOpen() && this.bind();
    };
    f.prototype.getItem = function (b, d) {
      var f = this,
        g = ["item", "top"];
      0 === d ? g.push("select") : 0 < d && g.push("redo");
      g = ui.getDiv(g.join(" "));
      var h = ui.setText(ui.getDiv("text"), b.name),
        n = b.icon,
        t = ui.getDiv("icon");
      if (str.startsWith(n, "marker"))
        ((b = n.split(" ")[1]),
          ui.addClass(t, "markerIcon " + b),
          svg.embed("markerD", this.mA.vA.svgDef, t, "svgIcon " + b));
      else {
        n = svg.tag("svg", "svgIcon");
        var w = svg.tag("use");
        svg.setXlink(w, b.icon + "D");
        n.appendChild(w);
        ui.append(n, t);
      }
      ui.appends([t, h], g);
      ui.on(g, "keydown", function (b) {
        return f.onItemKeyDown(b);
      });
      ui.click(g, function (b) {
        return f.onClk(b);
      });
      return ui.dat(g, "i", d + "");
    };
    f.prototype.onClk = function (b) {
      this.gotoState(ui.target(b), b);
    };
    f.prototype.onItemKeyDown = function (b) {
      if (keys.enter(b)) this.onClk(b);
    };
    f.prototype.onKeyDown = function (b) {
      var d = [1, -1],
        f = keys.indexOf(b, [40, 38]);
      -1 !== f &&
        ((d = this.items.indexOf(this.selected) + d[f]),
        0 <= d &&
          d <= this.items.length - 1 &&
          this.gotoState(this.items[d], b));
    };
    f.prototype.gotoState = function (b, d) {
      g.gotoState(ui._datN(b, "i"), { mA: this.mA });
      ui.stopDefaultPropagation(d);
    };
    f.prototype.onPosChanged = function () {
      var b = this.win,
        d = this.getWinPos();
      ui.toggleClass(
        b.el,
        "dragged",
        b.left > d.x + 10 ||
          b.left < d.x - 10 ||
          b.top < d.y - 10 + 5 ||
          b.top > d.y + 10,
      );
    };
    return f;
  })(g.windowView);
  g.historyPanel = p;
})(m || (m = {}));
(function (g) {
  function p(b, d) {
    void 0 === d && (d = !1);
    var l = [];
    if (!b || 0 === b.entities.length) return l;
    var n = b.desc,
      q = b.entities,
      x = b.options,
      y = b.redoStates,
      z = x.mA,
      A = x.doType,
      B = e.hasPos(n.props),
      E = A === g.doType._do,
      I = y && A === g.doType.undo,
      F = n === e.view,
      C = F ? e.getViews(z._t(), e.viewVisibility.all) : void 0,
      G = -1,
      H = [];
    A = [];
    for (var D = !0, J = 0; J < q.length; J++) {
      var L = q[J];
      if (!d) {
        var K = obj.getArray(n, L);
        arr.addUnique(A, K);
        F && !1 === x.reposition && (D = !1);
        E && (B && D && h(H, F ? C : K, L, q, n, b), K.push(L));
      }
      obj.setState(L, I ? y[++G] : obj.entityState.added);
    }
    E &&
      ((y = []),
      obj.setChildrenPerDescriptions(q, n, y, !1),
      y.forEach(function (b) {
        return l.push.apply(l, p(g.getAddAction(b[0], b[1], x), !0));
      }));
    l.push(b);
    E &&
      !d &&
      (n === e.day
        ? l.push.apply(l, k(q, !0, z))
        : n === e.period &&
          ((b = e.defaultPeriods(q)),
          0 < b.length && l.push.apply(l, k(b, !1, z))));
    if (B && !d && (E && D && l.push.apply(l, f(H, n, z)), D))
      for (B = 0; B < A.length; B++) e.sortByPos(A[B]);
    d || obj.prepArrForUsage(q, n, { deep: !1, setParent: !1 });
    n.entireName && arr.addUniques(z._t()[n.entireName], q);
    return l;
  }
  function h(b, d, f, g, k, h) {
    if (k !== e.period || !e.isCustomPeriod(f)) {
      var l = f.position;
      f = e.sortNotDel(d);
      (k !== e.groupSet && k !== e.group) ||
        arr.filter(f, function (b) {
          return !e.isEntire(b);
        });
      k = f.filter(function (b) {
        return !arr.has(g, b);
      });
      if (
        !h.options.reposition ||
        k.find(function (b) {
          return b.position === l;
        })
      )
        for (
          h = function (f) {
            var g = f.position,
              k = b.find(function (b) {
                return b[0] === d;
              }),
              h = void 0;
            k &&
              (h = k[1].find(function (b) {
                return b[0] === f;
              })) &&
              (g = h[2]);
            if (g >= l) {
              var n = [f, g, g + 1];
              k
                ? h
                  ? ((h[1] = g), (h[2] = g + 1))
                  : k[1].push(n)
                : b.push([d, [n]]);
            }
          },
            f = 0;
          f < k.length;
          f++
        )
          h(k[f]);
    }
  }
  function f(f, k, h) {
    var l = [],
      n = g.newUpdateAction(k, [], { mA: h, changedProps: [e.posProp()] });
    k = k === e.view;
    for (var q = [], t = [], p = 0; p < f.length; p++)
      for (var A = 0, B = f[p][1]; A < B.length; A++) {
        var E = B[A],
          I = E[0];
        E = E[2];
        (k && b(I, E, q, t, obj.notDel(h._t().views))) ||
          (g.addUndoCopies(n, [I]), (I.position = E));
      }
    0 < n.entities.length && l.push.apply(l, g.doUpdate(n));
    d(l, q, t, h, !1, !0);
    return l;
  }
  function b(b, d, f, g, k, h) {
    void 0 === h && (h = b.position);
    if (!b.isDefault) return !1;
    b.position = d;
    if (e.isPredefinedView(b))
      return (arr.addUnique(g, b), (b.position = h), !0);
    if (
      !k.find(function (d) {
        return d.id === b.id;
      })
    )
      return (obj.setAdd(b), arr.addUnique(f, b), !0);
    b.position = h;
    return !1;
  }
  function d(b, d, f, k, h, q) {
    0 < f.length &&
      ((f = g.newDeleteAction(e.view, f, {
        mA: k,
        needConfirm: !1,
        reposition: !1,
      })),
      q ? b.push.apply(b, g.doDelete(f)) : b.push(f));
    0 < d.length &&
      ((d = g.newAddAction(e.view, d, { mA: k, reposition: h })),
      q ? b.push.apply(b, p(d)) : b.push(d));
  }
  function k(b, d, f) {
    var k = f._t();
    b = b.map(function (b) {
      return b.position;
    });
    for (
      var h = [], l = 0, n = [e.subject, e.room, e.teacher, e._class];
      l < n.length;
      l++
    ) {
      var t = n[l],
        p = obj.notDel(k[t.arrayName]).filter(function (b) {
          return 0 < b.marks.length;
        });
      if (0 < p.length && ((p = q(p, b, d)), 0 < p.length)) {
        var B = p.map(function (b) {
          return b[0];
        });
        t = g.newUpdateAction(t, B, { mA: f, changedProps: [e.marks] });
        p.forEach(function (b) {
          return (b[0].marks = b[1]);
        });
        g.doUpdate(t);
        h.push(t);
      }
    }
    return h;
  }
  function q(b, d, f) {
    for (var g = [], k = 0; k < b.length; k++) {
      for (
        var h = b[k],
          l = h.marks,
          n = void 0,
          q = function (b) {
            var g = l[b],
              k = g[0],
              q = g[1];
            g = d.filter(function (b) {
              return f ? k >= b : q >= b;
            }).length;
            0 < g &&
              (n || (n = obj.getMarksCopy(h)),
              f ? (n[b][0] += g) : (n[b][1] += g));
          },
          t = 0;
        t < l.length;
        t++
      )
        q(t);
      n && g.push([h, n]);
    }
    return g;
  }
  g.newAddAction = function (b, d, f) {
    return g.newAction(b, d, g.actionType.add, f);
  };
  g.newAddState = function (b, d, f) {
    var k = g.newState();
    b = g.newAddAction(b, d, f);
    k.actions.push(b);
    k.icon = "add";
    return k;
  };
  g.addEntities = function (b, d, f, k, h) {
    if (0 !== d.length) {
      var l = g.newAddState(b, d, f);
      l.name = k || "Add " + g.getStateName(b, d);
      l.icon = h || "add";
      g.addState(l, { mA: f.mA });
    }
  };
  g.doAdd = p;
  g.isAddedDeletedView = b;
  g.addViewActions = d;
  g.getAddAction = function (b, d, f) {
    return 0 === d.length ? void 0 : g.newAction(b, d, g.actionType.add, f);
  };
  g.addActions = function (b, d) {
    d.filter(function (b) {
      return b && 0 < b.entities.length;
    }).forEach(function (d) {
      return b.actions.push(d);
    });
  };
})(m || (m = {}));
(function (g) {
  function p(b, d, f) {
    var g;
    void 0 === f && (f = !0);
    f &&
      ((d = d.filter(function (d) {
        return !arr.has(b.entities, d);
      })),
      (g = b.entities).push.apply(g, d));
    f = [];
    for (g = 0; g < d.length; g++) {
      var k = e.newUpdateCopy(b.desc, d[g], b.options.changedProps, !0);
      b.undos.push(k);
      f.push(k);
    }
    return f;
  }
  function h(b, d, g, h) {
    d = obj.keys(d);
    arr.remove(d, obj.entityStateProp.name);
    h = b.desc;
    var k = obj.keysToProps(h, d);
    b.redos.push(f(g, h, k));
    b.newKeys.push(
      g.changedKeys
        ? d.filter(function (b) {
            return !arr.has(g.changedKeys, b);
          })
        : d.slice(),
    );
    g.changedKeys
      ? arr.addUniques(g.changedKeys, d)
      : (g.changedKeys = d.slice());
  }
  function f(b, d, f) {
    d = obj.copy(b, d, {
      propFunc: function (b) {
        return f;
      },
    });
    d.entityState = b.entityState;
    return d;
  }
  g.newUpdateAction = function (b, d, f) {
    b = g.newAction(b, d, g.actionType.update, f);
    b.undos = [];
    b.newKeys = [];
    p(b, d, !1);
    return b;
  };
  g.addUndoCopies = p;
  g.doUpdate = function (b) {
    b.redos = [];
    for (var d = 0, f = b.entities.length; d < f; d++) {
      var g = b.entities[d];
      obj.isAdd(g) ? obj.updateMs(g) : obj.update(g);
      h(b, b.undos[d], g, d);
    }
    return [b];
  };
  g.createCopy = f;
  g.undoRedoUpdate = function (b) {
    for (
      var d = b.options.doType === g.doType.undo,
        f = d ? b.undos : b.redos,
        h = 0,
        l = b.entities.length;
      h < l;
      h++
    ) {
      var n = b.entities[h],
        t = f[h];
      e.copyUpdateProps(
        b.desc,
        t,
        n,
        b.options.changedProps || obj.keysToProps(b.desc, obj.keys(t)),
        !0,
      );
      obj.updateMs(n);
      n.changedKeys &&
        (d
          ? arr.removes(n.changedKeys, b.newKeys[h])
          : arr.addUniques(n.changedKeys, b.newKeys[h]));
    }
    return b;
  };
  g.updateType = {
    reorder: 1,
    sort: 2,
    improve: 3,
    marks: 4,
    drag: 5,
    pin: 6,
    remove: 7,
    open: 8,
    new: 9,
    copy: 10,
    upload: 11,
    purge: 12,
    save: 13,
    desiredAndMore: 14,
  };
  g.openTypes = [
    e.openType.open,
    e.openType.new,
    e.openType.copy,
    e.openType.upload,
  ];
  g.openUpdateTypes = [
    g.updateType.open,
    g.updateType.new,
    g.updateType.copy,
    g.updateType.upload,
  ];
  g.firstStateTypes = g.openUpdateTypes.concat(
    g.updateType.purge,
    g.updateType.save,
  );
  g.openNames = "Open New Copy Open Purge Save".split(" ");
  g.openIcons = "open new timetable uploadFile history save".split(" ");
})(m || (m = {}));
(function (g) {
  function p(b) {
    for (
      var d = 0,
        g = b.filter(function (b) {
          return b[0].deleteParentWhenEmpty;
        });
      d < g.length;
      d++
    ) {
      var k = g[d],
        h = k[0],
        l = [],
        q = 0;
      for (k = f(k[1]); q < k.length; q++) {
        var p = k[q],
          A = p[0];
        p = p[1];
        var B = obj.notDel(obj.getParentArray(h, A));
        B.length === p.length && arr.hasAll(B, p) && l.push(A);
      }
      0 < l.length && obj.addDelete(h.parentDesc, l, b);
    }
  }
  function h(b, d, f) {
    for (
      var k = [],
        h = g.newUpdateAction(d, [], { mA: f, changedProps: [e.posProp()] }),
        l = d === e.view,
        n = [],
        q = [],
        t = 0;
      t < b.length;
      t++
    ) {
      for (
        var p = b[t],
          E = e.checkPositions(p, d, l ? !0 : void 0),
          I = -1,
          F = 0,
          C = E.fixedPositions.map(function (b) {
            return b.entity;
          });
        F < C.length;
        F++
      ) {
        var G = C[F],
          H = E.fixedPositions[++I].newPosition;
        (l && g.isAddedDeletedView(G, H, n, q, obj.notDel(f._t().views))) ||
          (g.addUndoCopies(h, [G]), (G.position = H));
      }
      e.sort(p, d);
      0 < h.entities.length && k.push.apply(k, g.doUpdate(h));
      g.addViewActions(k, n, q, f, !1, !0);
    }
    return k;
  }
  function f(b) {
    for (
      var d = [],
        f = function (b) {
          var f = d.find(function (d) {
            return d[0] === b.parent;
          });
          f ? f[1].push(b) : d.push([b.parent, [b]]);
        },
        g = 0;
      g < b.length;
      g++
    )
      f(b[g]);
    return d;
  }
  function b(b, f, k) {
    var h = k._t();
    b = b.map(function (b) {
      return b.position;
    });
    for (
      var l = [e.subject, e.room, e.teacher, e._class],
        n = e.daysCount(h),
        q = e.periodsCount(h),
        t = [],
        p = 0;
      p < l.length;
      p++
    ) {
      var B = l[p],
        E = obj.notDel(h[B.arrayName]).filter(function (b) {
          return 0 < b.marks.length;
        });
      if (0 < E.length && ((E = d(B, E, n, q, b, f)), 0 < E.length)) {
        var I = E.map(function (b) {
          return b[0];
        });
        B = g.newUpdateAction(B, I, { mA: k, changedProps: [e.marks] });
        E.forEach(function (b) {
          return (b[0].marks = b[1]);
        });
        g.doUpdate(B);
        t.push(B);
      }
    }
    return t;
  }
  function d(b, d, f, g, k, h) {
    b = [];
    for (var l = 0; l < d.length; l++) {
      for (
        var n = d[l],
          q = n.marks,
          t = void 0,
          w = !1,
          x = function (b) {
            var d = q[b],
              l = d[0],
              x = d[1];
            d = (h && arr.has(k, l)) || (!h && arr.has(k, x));
            if (!d) {
              var u = k.filter(function (b) {
                return h ? l > b : x > b;
              }).length;
              0 < u &&
                (t || (t = obj.getMarksCopy(n)),
                h ? ((t[b][0] -= u), (l -= u)) : ((t[b][1] -= u), (x -= u)),
                (w = !0));
            }
            if (d || l > f || x > g)
              (t || (t = obj.getMarksCopy(n)), t.splice(b, 1), (w = !0));
          },
          u = q.length - 1;
        0 <= u;
        u--
      )
        x(u);
      w && b.push([n, t]);
    }
    return b;
  }
  function k(b, d) {
    b = e.getViews(b, e.viewVisibility.all);
    d = d.filter(function (b) {
      return !e.isPredefinedView(b);
    });
    arr.removes(b, d);
    return b;
  }
  function q(b, d, f) {
    b = g.newAction(b, d, g.actionType.delete, f);
    b.undoStates = d.map(function (b) {
      return b.entityState;
    });
    return b;
  }
  g.doDelete = function (d) {
    var f = d.desc,
      l = d.entities,
      w = [],
      u = d.options.doType === g.doType._do,
      x = obj.merge(
        { needConfirm: !0, referencesToDelete: [], referencesToUpdate: [] },
        d.options,
      );
    d = x.mA;
    var y = x.reposition,
      z = d._t(),
      A = f === e.view,
      B = A ? k(d._t(), l) : void 0;
    u &&
      obj.setDeleteUpdateReferences(
        f,
        l,
        z,
        e.timetable,
        x.referencesToDelete,
        x.referencesToUpdate,
        e.findReferenceProperties,
        { isPrepared: !0 },
      );
    var E = x.referencesToDelete;
    if (x.needConfirm && 0 < E.length) {
      for (var I = 0, F = 0, C = 0; C < E.length; C++) {
        var G = E[C],
          H = G[0];
        G = G[1].length;
        H === e.activity || H === e.card
          ? H === e.activity && (F += G)
          : (I += G);
      }
      C = "";
      0 < F
        ? (C += "".concat(F, " activities are also going to be deleted. "))
        : 0 < I && (C += "Related items are also going to be deleted. ");
      if (!ui.confirm(C + "Are you sure you want to continue?")) return w;
      x.needConfirm = !1;
    }
    obj.addDelete(f, l, E);
    p(E);
    for (I = 0; I < E.length; I++) {
      l = E[I];
      F = l[0];
      l = l[1];
      C = e.hasPos(F.props);
      H = [];
      G = d.getCurrent(F);
      var D = q(F, l, { mA: d, reposition: y });
      w.push(D);
      D = 0;
      for (var J = l; D < J.length; D++)
        ((l = J[D]),
          obj.del(l),
          F.entireName && arr.remove(z[F.entireName], l),
          C && arr.addUnique(H, A ? B : obj.getArray(F, l)),
          G === l && d.resetCurrent(F));
      C && !1 !== y && w.push.apply(w, h(H, F, x.mA));
    }
    y = 0;
    for (z = x.referencesToUpdate; y < z.length; y++) {
      l = z[y];
      A = l[0];
      B = l[1].map(function (b) {
        return b[0];
      });
      A = g.newUpdateAction(A, [], { mA: d, changedProps: B });
      B = 0;
      for (I = l[1]; B < I.length; B++)
        for (
          l = I[B], F = l[0], C = l[2], H = -1, G = 0, D = l[1];
          G < D.length;
          G++
        )
          ((l = D[G]), g.addUndoCopies(A, [l]), (l[F.name] = C[++H]));
      w.push.apply(w, g.doUpdate(A));
    }
    x.nextSelected && d.setCurrent(f, x.nextSelected);
    u &&
      ((f = E.find(function (b) {
        return b[0] === e.day;
      })) && w.push.apply(w, b(f[1], !0, d)),
      (f = E.find(function (b) {
        return b[0] === e.period;
      })) &&
        w.push.apply(
          w,
          b(
            f[1].filter(function (b) {
              return e.isDefaultPeriod(b);
            }),
            !1,
            d,
          ),
        ));
    return w;
  };
  g.groupChildrenByParent = f;
  g.newDeleteAction = q;
  g.deleteEntities = function (b, d, f, k) {
    var h = d.length;
    if (0 !== h) {
      var l = g.newDeleteState(b, d, f);
      k =
        k || b !== e.activity
          ? k || "Delete " + g.getStateName(b, d, f.deletedCount)
          : 1 === h
            ? "Delete activity"
            : "Delete ".concat(h, " activities");
      l.name = k;
      g.addState(l, { mA: f.mA });
    }
  };
})(m || (m = {}));
(function (g) {
  function p(h, f, b) {
    var d = h.length;
    0 !== d &&
      ((b = b.mA),
      (d =
        1 === d
          ? f
            ? "Pin"
            : "Unpin"
          : f
            ? "Pin ".concat(d, " cards")
            : "Unpin ".concat(d, " cards")),
      (d = g.newUpdateState(
        e.card,
        h,
        {
          mA: b,
          changedProps: [e.cardPinned],
          updateType: g.updateType.pin,
          pin: f,
        },
        d,
        "pin",
      )),
      h.forEach(function (b) {
        b.pinned === f ? (b = !1) : ((b.pinned = f), (b = !0));
        return b;
      }),
      g.addState(d, { mA: b }));
  }
  g.pin = function (g, f, b, d) {
    v.addClips(g);
    b.g.addSel(g);
    g = v.pin(g, !f);
    p(v.toCs(g), f, d);
  };
  g.pinCards = p;
  g.afterPin = function (h) {
    var f = h.options,
      b = f.pin;
    f.doType === g.doType.undo && (b = !b);
    f = new r.upd(b ? r.updTy.p : r.updTy.up);
    g.updateViewCards(h, f);
  };
})(m || (m = {}));
(function (g) {
  function p(f, b, d, k) {
    var h = f.length;
    if (0 !== h) {
      var l = 1 === h ? "Remove" : "Remove ".concat(h, " cards"),
        n = e.cardDayPerPos;
      h = f.filter(function (b) {
        return b.pinned;
      });
      0 < h.length && n.push(e.cardPinned);
      d = g.newUpdateState(
        e.card,
        f,
        {
          mA: b,
          changedProps: n,
          updateType: d ? g.updateType.remove : void 0,
          vcs: d,
          view: k,
        },
        l,
        "sponge",
      );
      0 < h.length &&
        h.forEach(function (b) {
          return (b.pinned = !1);
        });
      f.forEach(function (b) {
        return g.changePosId(b, "", "", void 0);
      });
      g.addState(d, { mA: b });
    }
  }
  function h(f) {
    return 300 < f.entities.length;
  }
  g.remove = function (f, b, d) {
    v.addClips(f);
    b.g.addSel(f);
    d = d.mA;
    var k = v.pin(f, !0);
    if (0 < k.length) {
      var h = b.vA.confirm(
        b
          .loc()
          .get(
            "DoYouWantToRemovePinnedCards",
            "Do you want to clear pinned cards, too?",
          ),
      );
      b.g.offTool(b, null);
      if (h) g.pin(k, !1, b, { mA: d });
      else {
        k = [];
        for (h = 0; h < f.length; h++) {
          var l = f[h];
          l.card().pinned || k.push(l);
        }
        f = k;
      }
    }
    p(v.toCs(f), d, f, b);
  };
  g.removeCards = p;
  g.afterRemove = function (f) {
    if (h(f)) return !0;
    for (var b = f.options, d = 0, k = b.vcs; d < k.length; d++) {
      var q = k[d];
      q.v.zI.next();
      q.mc.mcZi(q.v.zI.dragC + 1);
      q.updZI();
    }
    g.updateViewCards(f, new r.upd(r.updTy.x));
    b.mA._v.g.syncWidths();
    return !1;
  };
  g.refreshAfterRemove = h;
  g.confirmRemove = function (f, b) {
    if (0 === f.length) return !0;
    var d = confirm(
      b.vA.loc.get(
        "RemovingCardsConfirm",
        "Some cards are going to be removed from the timetable. Are you sure you want to continue?",
      ),
    );
    d && p(f, b);
    return d;
  };
})(m || (m = {}));
(function (g) {
  function p(b, d, f, k, l) {
    if (0 !== f.length) {
      g.addUndoCopies(
        d,
        f.map(function (b) {
          return b[0];
        }),
      );
      d = function (d) {
        var f = d[0];
        d = d[1];
        var n = d.oldRoom,
          q = d.changedRoom,
          t = f.rooms.findIndex(function (b) {
            return b === n;
          });
        d = !0;
        var w = 0;
        -1 !== t
          ? (w = t)
          : ((t = f.moreRooms.findIndex(function (b) {
              return b === n;
            })),
            -1 !== t && ((d = !1), (w = t)));
        h(b, f, d, w, q);
        w = 0;
        for (
          f = obj.notDel(f.cards).filter(function (b) {
            return !arr.has(l, b);
          });
          w < f.length;
          w++
        ) {
          t = f[w];
          var x = t.rooms.indexOf(n);
          if (-1 !== x) {
            g.addUndoCopies(k, [t]);
            var u = t.roomIds.slice();
            u[x] = q.id;
            t.roomIds = u;
          }
        }
        q = d ? "Desired room updated. " : "Alternative room updated. ";
        0 < k.entities.length &&
          (q = d
            ? "Scheduled and desired rooms updated for other cards in the related activity"
            : "Scheduled and alternative rooms updated for other cards in the related activity.");
        b.vA.inf.add(q);
      };
      for (var n = 0; n < f.length; n++) d(f[n]);
    }
  }
  function h(b, d, f, g, k) {
    b = (f ? d.rooms : d.moreRooms).slice();
    b[g] = k;
    g = e.ids(b);
    f ? (d.roomIds = g) : (d.moreRoomIds = g);
  }
  function f(b, d, f, g) {
    var k = [];
    if (b.mc.clp && d.viewType().isRoom()) {
      b = function (b) {
        if (b === g) return "continue";
        var f = l(b, d),
          h = b.card();
        k.find(function (b) {
          return b[0] === h;
        }) || k.push([h, f.rooms]);
      };
      for (var h = 0; h < f.length; h++) b(f[h]);
    }
    return k;
  }
  function b(b, d) {
    var f = b.card(),
      g = b.drag.newPos,
      k = g.getDay();
    g = b.drag.customPer ? b.drag.customPer.custom : g.getPeriod();
    f = k !== f.day || g !== f.period;
    k = {
      day: k,
      period: g,
      rooms: void 0,
      hasChange: !1,
      oldRoom: void 0,
      changedRoom: void 0,
    };
    if (d.viewType().isRoom()) {
      b = l(b, d);
      if (!f && !b.rooms) return k;
      k.rooms = b.rooms;
      k.changedRoom = b.changedRoom;
      k.oldRoom = b.oldRoom;
    } else if (!f) return k;
    k.hasChange = !0;
    return k;
  }
  function d(b, d) {
    var f = d.mc.clp;
    return f
      ? ((d = b[b.length - 1]),
        d.mc.clp === f
          ? d
          : b.find(function (b) {
              return b.mc.clp === f;
            }))
      : d;
  }
  function k(b, d) {
    var f = d.mc.clp;
    return f
      ? b.filter(function (b) {
          return b.mc.clp === f;
        })
      : [d];
  }
  function q(b, d) {
    void 0 === d && (d = !1);
    return d ? 150 < b : 300 < b;
  }
  function l(b, d) {
    var f = { rooms: void 0, oldRoom: void 0, changedRoom: void 0 },
      g = b.drag.newPos;
    if (g.isOutRight()) return f;
    var k = g.getRoom();
    if (!k || d.is1() || arr.has(b.card().rooms, k)) return f;
    f.changedRoom = k;
    d = [k];
    k = b.card();
    1 < k.rooms.length &&
      d.push.apply(
        d,
        k.rooms.filter(function (d) {
          return d !== b.mc.room;
        }),
      );
    g = g.rowNumber;
    k = b.mc;
    f.oldRoom = k.room;
    k.rowPos = g;
    f.rooms = e.sortByPos(d);
    return f;
  }
  function n(b, d, f, g) {
    t(b, (d && d.id) || "", (f && f.id) || "", g ? e.ids(g) : void 0);
  }
  function t(b, d, f, g) {
    b.dayId = d;
    b.periodId = f;
    g && (b.roomIds = g);
  }
  function w(b, d) {
    var f = b.options,
      k = f.mA;
    u(
      b.entities,
      f.doType === g.doType.undo ? b.redos : b.undos,
      d,
      k,
      f.updateType !== g.updateType.pin,
    );
    d.ty === r.updTy.s && k._v.rotate(r.updTy.s);
  }
  function u(b, d, f, g, k) {
    for (var h = g._v.g.vs, l = -1, n = 0; n < b.length; n++) {
      var q = b[n],
        t = d[++l],
        w = k && e.isIn(q) && e.isOut(t);
      t = k && e.isOut(q) && e.isIn(t);
      for (var u = 0, x = h; u < x.length; u++)
        for (var p = x[u], y = 0, A = p.vcs; y < A.length; y++) {
          var B = A[y];
          B.card() === q &&
            (t && (p.outPanel.update(B.mc, f), (f.outAdded = !0)),
            w && v.removeUnscheduledCard(p, B.mc),
            B.upd(f),
            (f.outAdded = !1));
        }
    }
    g._v.g.syncWidths();
  }
  g.afterDrop = function (h, l, q) {
    var t = new r.upd(r.updTy.drg);
    q = q.mA;
    for (
      var w = [],
        u = [],
        x = g.newState("Drag", "hand"),
        y = g.newUpdateAction(e.card, [], {
          mA: q,
          changedProps: e.cardPosProps,
          updateType: g.updateType.drag,
          vcs: h,
          view: l,
        }),
        z = g.newUpdateAction(e.activity, [], {
          mA: q,
          changedProps: [e.roomIds, e.moreRoomIds],
          updateType: g.updateType.desiredAndMore,
        }),
        G = [],
        H = function (q) {
          if (
            w.find(function (b) {
              return b === q;
            })
          )
            return "continue";
          var x = d(h, q),
            p = b(x, l),
            A = k(h, q);
          w.push.apply(w, A);
          if (!p.hasChange)
            return (
              A.forEach(function (b) {
                return b.updAll(t);
              }),
              "continue"
            );
          var B = v.toCs([q]),
            z = f(q, l, A, x);
          g.addUndoCopies(y, B);
          x = function (b) {
            var d = z.find(function (d) {
                return d[0] === b;
              }),
              f = d ? d[1] : p.rooms,
              k = b.parent,
              h = g.hasDesired(k);
            !d &&
              p.changedRoom &&
              ((d = p.changedRoom),
              h &&
                !arr.has(e.desiredAndMoreIds(k), d.id) &&
                (G.find(function (b) {
                  return b[0] === k;
                }) ||
                  G.push([k, p])));
            n(b, p.day, p.period, h ? f : void 0);
          };
          for (A = 0; A < B.length; A++) x(B[A]);
          u.push.apply(u, B);
        },
        D = 0;
      D < h.length;
      D++
    )
      H(h[D]);
    0 !== y.entities.length &&
      ((H = u.length),
      1 < H && (x.name = "Drag ".concat(H, " cards")),
      (H = g.newUpdateAction(e.card, [], {
        changedProps: [e.cardRoomIds],
        mA: q,
      })),
      p(q, z, G, H, u),
      g.addActions(x, [y, H, z]),
      g.addState(x, { mA: q }));
  };
  g.afterImproveOrDrag = function (b, d) {
    if (q(b.entities.length)) return !1;
    w(b, d);
    return !0;
  };
  g.shouldRefreshView = q;
  g.changePosId = t;
  g.updateViewCards = w;
  g.updateCards = u;
})(m || (m = {}));
(function (g) {
  function p(f, b, d, g) {
    f = f.draw;
    f.xVMarksForE(b);
    b = f.getMMarks(b, d, g);
    f.drawMMarks(b);
    f.drawMarks(b);
  }
  function h(f, b, d) {
    return f.isEraser() || !d
      ? 1 === b
        ? "Erase"
        : "Erase ".concat(b, " marks")
      : 1 === b
        ? "Draw"
        : "Draw ".concat(b, " marks");
  }
  g.drawMark = function (f) {
    var b = f.view,
      d = f.getDay(),
      g = f.getPeriod(),
      h = r.getRowEntity(b, f.rowNumber - 1);
    if (
      h &&
      !b.g.affVMarks.some(function (k) {
        return (
          k.mMark.day.position === d.position &&
          (b.is1() ? !0 : k.mMark.rowPosition === f.rowNumber) &&
          k.mMark.period.position === g.position
        );
      })
    ) {
      var l = b.g.tool(),
        n = l.isMarkingMode(),
        t = h.marks.find(function (b) {
          return b[0] === d.position && b[1] === g.position;
        }),
        w = t ? t[2] : e.markTy.a,
        u = l.markType;
      if (!((w === u && n) || (!t && !n) || (!n && t && w !== u))) {
        l = l.isEraser();
        var x = n && !l,
          p = b.is1() ? r.getPeriodPosition(b, g) : r.getRowPosition(b, h);
        p = new r.mMark(h, d, g, u, p, b);
        x && b.draw.drawMMark(p);
        p = new v.vMark(p, b);
        x && b.draw.drawVMark(p);
        t && (l || (w !== u && n) || (w === u && !n)) && b.draw.xVMark(h, f);
        b.g.affVMarks.push(p);
      }
    }
  };
  g.onMarkerEnd = function (f, b, d) {
    f && f.preventDefault();
    f = b.g.tool();
    var k = f.isMarkingMode(),
      q = b.g.affVMarks,
      l = q.length;
    if (0 !== l) {
      q = q.map(function (b) {
        return b.mMark.ve;
      });
      q = g.newUpdateState(e.viewEntity, q, {
        mA: d,
        changedProps: [e.marks],
        updateType: g.updateType.marks,
        view: b,
      });
      for (
        var n = 0,
          t = arr.groupByMany(b.g.affVMarks, [
            new arr.groupKey("ve", function (b) {
              return b.mMark.ve;
            }),
          ]);
        n < t.length;
        n++
      ) {
        var w = t[n],
          u = w.key,
          x = w.items,
          p = obj.getMarksCopy(u);
        w = function (b) {
          b = b.mMark;
          var d = b.day,
            f = b.period;
          b = b.markTy;
          var g = p.findIndex(function (b) {
              return b[0] === d.position && b[1] === f.position;
            }),
            h = e.markTy.a === b;
          -1 === g
            ? h || p.push([d.position, f.position, b])
            : k && !h
              ? (p[g][2] = b)
              : arr.removeAt(p, g);
        };
        for (var z = 0; z < x.length; z++) w(x[z]);
        p.sort(function (b, d) {
          return (
            arr.sort(b[0], d[0]) || arr.sort(b[1], d[1] || arr.sort(b[2], d[2]))
          );
        });
        u.marks = p;
      }
      f.isUnwantedOrMandatory() &&
        d.vA.inf.addTip(
          f.isUnwanted()
            ? d.vA.loc.get(
                "HowToProperlySetUnwantedMarks",
                "To properly set unwanted marks one more step is required:\n &bull; Mouse over the first column.\n &bull; Set allowed number of unwanted activities per week and per day.",
              )
            : d.vA.loc.get(
                "HowToProperlySetMandatoryMarks",
                "To properly set mandatory marks one more step is required:\n &bull; Mouse over the first column.\n &bull; Set allowed number of missed mandatory activities per week and per day.",
              ),
        );
      b.g.affVMarks = [];
      f.mode = v.markMode.marking;
      q.name = h(f, l, k);
      q.icon = "marker " + f.clName();
      g.addState(q, { mA: d });
    }
  };
  g.afterMarker = function (f) {
    var b = f.options,
      d = b.view,
      k = b.isMarksCopy;
    if (b.isMarksSettings) return !1;
    var h = b.doType !== g.doType._do,
      l = r.getExcludedDayPositions(d),
      n = r.getExcludedPeriodPositions(d);
    b = function (b) {
      (h || k) && p(d, b, l, n);
      for (var f = 0, g = d.g.vs; f < g.length; f++) {
        var q = g[f];
        if (q !== d) {
          var t = r.getExcludedDayPositions(q),
            w = r.getExcludedPeriodPositions(q);
          r.getEntities(q).some(function (f) {
            return f === b || d.viewType().ve === f;
          }) && p(q, b, t, w);
        }
      }
    };
    var t = 0;
    for (f = f.entities; t < f.length; t++) b(f[t]);
    return !0;
  };
  g.markerClasses = [
    e.markerType.eraser,
    e.markerType.forbidden,
    e.markerType.unwanted,
    e.markerType.mandatory,
  ];
})(m || (m = {}));
(function (g) {
  function p(b) {
    var d = b[0].parent.length;
    return b.some(function (b) {
      return b.parent.length !== d;
    })
      ? !1
      : !0;
  }
  function h(b) {
    if (2 > b.length) return !1;
    var d = b[0]._colI;
    return !b.some(function (b) {
      return b._colI !== d;
    });
  }
  function f(b, d, f) {
    var g = v.toCs(b);
    b = 0;
    for (f = f._v.g.vs; b < f.length; b++) {
      for (
        var k = f[b],
          h = k.vcs.filter(function (b) {
            return arr.has(g, b.card());
          }),
          l = v.toMcs(h),
          n = 0,
          q = l;
        n < q.length;
        n++
      ) {
        var t = q[n];
        t.clps = d ? l : [];
        t.clp = d;
      }
      k.addClipsToCards(h, new r.upd(d ? r.updTy.c : r.updTy.uc));
    }
  }
  function b(b, f, h) {
    void 0 === h && (h = !0);
    if (2 > f.length || !p(f)) return !1;
    a: {
      var l = [];
      for (var n = 0; n < f.length; n++) {
        var t = f[n].parent.teacherIds;
        if (arr.hasOneEqual(l, t)) {
          l = !1;
          break a;
        }
        l.push.apply(l, t);
      }
      l = !0;
    }
    if (!l)
      return (
        h &&
          b.vA.inf.warn(
            "Some cards are causing teacher conflicts and can't be clipped. Consider merging cards or adding an activity for the teacher with more classes/groups included." +
              g.guide("#clip"),
          ),
        !1
      );
    a: {
      l = 0;
      n = [];
      t = f.length;
      for (var y = [], z = 0; z < t - 1; z++)
        for (var A = f[z], B = q(A, 1), E = B.length, I = 0; I < E; I++) {
          var F = B[I],
            C = [A];
          if (!arr.has(y, F)) {
            y.push(F);
            for (var G = z + 1; G < t; G++) {
              var H = f[G];
              arr.has(q(H, 1), F) && C.push(H);
            }
            1 < C.length && n.push([F, C]);
          }
        }
      for (; l < n.length; l++)
        if (((t = n[l]), !d(t[0], t[1]))) {
          l = !1;
          break a;
        }
      l = !0;
    }
    return l
      ? k(f)
        ? !0
        : (h &&
            b.vA.inf.warn(
              "There are not enough rooms to schedule all cards that should be clipped, e.g. two cards have the same desired room with no alternatives. Consider merging cards instead." +
                g.guide("#clip"),
            ),
          !1)
      : (h &&
          b.vA.inf.warn(
            "Some cards are causing class conflicts and therefore can't be clipped. Make sure that each card represents a unique group which is from the same group set." +
              g.guide("#clip"),
          ),
        !1);
  }
  function d(b, d) {
    for (var f = [], k = !0, h, l = 0; l < d.length; l++)
      for (
        var n = 0,
          q = g.getGroups(d[l]).filter(function (d) {
            return e.getClass(d) === b;
          });
        n < q.length;
        n++
      ) {
        var p = q[n];
        if (arr.has(f, p)) return !1;
        f.push(p);
        p = p.parent.position;
        if (k) ((h = p), (k = !1));
        else if (h !== p) return !1;
      }
    return !0;
  }
  function k(b) {
    b = b.filter(function (b) {
      return g.hasDesired(b.parent);
    });
    if (0 === b.length) return !0;
    for (var d = [], f = 0; f < b.length; f++)
      arr.addUniques(d, e.desiredAndMoreIds(b[f].parent));
    return b.length <= d.length;
  }
  function q(b, d) {
    b = b.parent;
    return 0 === d
      ? b.teachers
      : 1 === d
        ? e.classes(b, !0)
        : b.rooms.concat(b.moreRooms);
  }
  g.canClip = function (b) {
    var d = v.toMcs(b),
      f = [!1, !1];
    if (0 === d.length) return f;
    if (d[0].hasClp() && v.haveSameClip(b, d[0].clp)) return ((f[1] = !0), f);
    if (!h(d) && v.out(b).length !== b.length) return f;
    b = r.toCs(d);
    if (!p(b)) return f;
    f[0] = !0;
    return f;
  };
  g.isVerSel = h;
  g.clip = function (d, k) {
    var h = k.isClip,
      l = k.mA;
    k = k._v;
    v.addClips(d);
    var n = d.map(function (b) {
      return b.mc;
    });
    if (h) {
      h = v.toCs(d);
      if (!b(l, h)) return !1;
      for (var q = !0, p = !1, z = !1, A = 0; A < n.length; A++) {
        var B = n[A];
        e.isIn(B._c) && (q = !1);
        B._c.pinned ? (p = !0) : (z = !0);
      }
      q && p && z && new v.vcM(k).pinVcs(d);
      k =
        (k = n.find(function (b) {
          return b.hasClp();
        })) && k.clp;
      n = !k;
      q = void 0;
      k
        ? ((q = g.newUpdateState(e.clip, [k], {
            mA: l,
            changedProps: [e.cardIdsProp],
          })),
          (p = arr.take(h, Math.abs(h.length - k.cardIds.length))),
          (q.name =
            1 === p.length ? "Clip" : "Clip ".concat(p.length, " cards")),
          (q.icon = "clip"))
        : (k = obj.newChildToUse(e.clip, l._t()));
      k.cardIds = e.ids(h);
      n
        ? g.addEntities(
            e.clip,
            [k],
            { mA: l },
            1 === h.length ? "Clip" : "Clip ".concat(h.length, " cards"),
            "clip",
          )
        : g.addState(q, { mA: l });
    } else
      ((k = n.find(function (b) {
        return !!b.clp;
      }).clp),
        g.deleteEntities(e.clip, [k], { mA: l, needConfirm: !1 }),
        (k = void 0));
    f(d, k, l);
    return !0;
  };
  g.afterClip = function (b, d) {
    if (d !== g.doType._do) {
      var k = b.options.mA,
        h = d === g.doType.undo;
      d = function (d) {
        var l = b.entities[d],
          n = e.byIds(k._t().cards, l.cardIds);
        n = v.cs2Vcs(n, k._v.g.vs);
        if (b.type === g.actionType.add) h && (l = void 0);
        else if (b.type === g.actionType.delete) h || (l = void 0);
        else if (b.type === g.actionType.update && h) {
          var q = b.undos[d].cardIds;
          d = b.redos[d].cardIds.filter(function (b) {
            return !arr.has(q, b);
          });
          d = e.byIds(k._t().cards, d);
          d = v.cs2Vcs(d, k._v.g.vs);
          f(d, void 0, k);
        }
        f(n, l, k);
      };
      for (var l = 0; l < b.entities.length; l++) d(l);
    }
  };
  g.isClipValid = b;
  g.checkClipForCards = function (d, f) {
    var g = obj.notDel(d._t().clips),
      k = e.ids(f);
    return g
      .filter(function (b) {
        return arr.hasOneEqual(b.cardIds, k);
      })
      .filter(function (f) {
        return !b(d, f.cards, !1);
      });
  };
})(m || (m = {}));
(function (g) {
  function p(b, f) {
    var d = r.getScheduledCards(f.view.output),
      g = d.length;
    b = arr.groupByMany(b, [
      new arr.groupKey("_rowI"),
      new arr.groupKey("_colI"),
    ]);
    for (var k = b.length, t = 0, w, p; t < k; t++) {
      var x = b[t],
        y = x.subGroups.length,
        z = x.key;
      for (w = 0; w < y; w++) {
        p = x.subGroups[w];
        var A = p.key,
          B = p.items;
        for (p = 0; p < g; p++) {
          var E = d[p];
          E._rowI === z && E._colI === A && (arr.has(B, E) || B.push(E));
        }
        if (!h(B, f)) return !1;
      }
    }
    return !0;
  }
  function h(b, f) {
    b = r.toCs(b);
    if (2 > b.length) return !1;
    var d = b[0],
      g = d.parent,
      k = g.length,
      h = g.subject;
    d = e.idsStr(d.rooms);
    var w = e.idsStr(g.rooms),
      p = e.idsStr(g.moreRooms),
      x = e.idsStr(g.teachers);
    g = e.idsStr(g.groups);
    for (var y = !0, z = 1; z < b.length; z++) {
      var A = b[z],
        B = A.parent;
      if (
        h !== B.subject ||
        k !== B.length ||
        d !== e.idsStr(A.rooms) ||
        w !== e.idsStr(B.rooms) ||
        p !== e.idsStr(B.moreRooms) ||
        (x === e.idsStr(B.teachers) && g === e.idsStr(B.groups))
      ) {
        y = !1;
        break;
      }
    }
    if (!y) return !1;
    f.mergeCards.push(b.slice());
    return !0;
  }
  function f(b, f) {
    return g.isVerSel(b) ? h(b, f) : !1;
  }
  function b(b, f, g, h, n, t) {
    b = obj.newChildToUse(e.activity, b);
    var d = n.parent;
    b.subjectId = d.subjectId;
    b.length = d.length;
    b.roomIds = d.roomIds.slice();
    b.moreRoomIds = d.moreRoomIds.slice();
    b.teacherIds = f;
    b.groupIds = g;
    for (f = 0; f < t; f++)
      ((g = obj.newChildToUse(e.card, b)),
        (g.pinned = h),
        (g.dayId = n.dayId),
        (g.periodId = n.periodId),
        (g.roomIds = n.roomIds.slice()),
        b.cards.push(g));
    return b;
  }
  g.canMerge = function (b, g) {
    var d = v.toCs(b),
      k = !0,
      h = v.toMcs(b);
    if (1 < d.length) {
      var t = h[0]._rowI;
      h.some(function (b) {
        return b._rowI !== t || b.isOut();
      }) && (k = !1);
    } else
      ((b = b.filter(function (b) {
        return b.v === g.view;
      })),
        (h = v.toMcs(b)));
    return k ? p(h, g) : f(h, g);
  };
  g.mergeCards = function (d, f) {
    var k = d.mA,
      h = d.view,
      n = [],
      t = [],
      p = 0;
    for (d = d.mergeCards; p < d.length; p++) {
      for (
        var u = d[p], x = [], y = [], z = !0, A = 0, B = u;
        A < B.length;
        A++
      ) {
        var E = B[A];
        E.pinned || (z = !1);
        var I = E.parent;
        arr.addUniques(x, I.teacherIds);
        E = function (b) {
          var d = e.isEntire(b);
          y.every(function (f) {
            return f !== b && !(!d && f.parent === b.parent && e.isEntire(f));
          }) && y.push(b);
        };
        var F = 0;
        for (I = e.sortNotDel(I.groups); F < I.length; F++) E(I[F]);
      }
      x = b(k._t(), x, e.ids(y), z, u[0], 1);
      t.push(x);
      n.push.apply(n, u);
      h.g.isSel(u) && f.push.apply(f, x.cards);
    }
    f = g.newState();
    f.name = "Merge";
    f.icon = "mergeCards";
    f.actions.push(g.newDeleteAction(e.card, n, { mA: k, needConfirm: !1 }));
    f.actions.push(g.newAddAction(e.activity, t, { mA: k }));
    g.addState(f, { mA: k });
  };
  g.split = function (d, f) {
    d = v.toCs(d);
    for (var k = [], h = 0; h < d.length; h++) {
      var n = d[h],
        t = n.parent.teacherIds;
      0 === t.length && t.push("");
      var p = n.parent.groupIds;
      0 === p.length && p.push("");
      for (var u = n.pinned, x = 0; x < t.length; x++)
        for (var y = t[x], z = 0, A = p; z < A.length; z++) {
          var B = A[z];
          k.push(b(f._t(), "" === y ? [] : [y], "" === B ? [] : [B], u, n, 1));
        }
    }
    h = g.newState();
    h.name = "Split";
    h.icon = "split";
    h.actions.push(g.newDeleteAction(e.card, d, { mA: f, needConfirm: !1 }));
    h.actions.push(g.newAddAction(e.activity, k, { mA: f }));
    g.addState(h, { mA: f });
  };
})(m || (m = {}));
(function (g) {
  g.paste = function (p) {
    var h = p.view,
      f = p.mA,
      b = p.type,
      d = h.g.pasteCs.slice(),
      k = g.groupChildrenByParent(d);
    p = [];
    if (b.isEntity) {
      var q = b.object;
      h = h.viewType();
      for (var l = 0; l < k.length; l++) {
        var n = k[l];
        b = n[0];
        b = obj.newChildCopy(b, e.activity, f._t());
        b.cards = [];
        h.isClass()
          ? (b.groupIds = e.ids([e.entireGroup(q)]))
          : h.isTeacher()
            ? (b.teacherIds = e.ids([q]))
            : h.isSubject() && (b.subjectId = q.id);
        for (var t = 0, w = n[1]; t < w.length; t++)
          ((n = w[t]),
            (n = obj.newChildCopy(n, e.card, b)),
            h.isRoom() && (n.roomIds = e.ids([q])),
            b.cards.push(n));
        p.push(b);
      }
    } else {
      n = d[0];
      q = h.data.periodsCount;
      n = r.getColumnIndex(h, n.day, n.period, q, h.is1());
      for (l = 0; l < d.length; l++)
        ((t = d[l]),
          (w = r.getColumnIndex(h, t.day, t.period, q, h.is1())),
          -1 !== w && w < n && (n = w));
      t = l = void 0;
      b.isDay
        ? ((l = b.object), (t = e.sortedDefaultPeriods(h.data.periods)[0]))
        : b.isPeriod &&
          ((b = b.object),
          (l = r.getDayByColumnIndex(h.data.days, q, b.colI, h.is1())),
          (t = b.per));
      l = r.getColumnIndex(h, l, t, q, h.is1()) - n;
      for (t = 0; t < k.length; t++) {
        n = k[t];
        b = n[0];
        b = obj.newChildCopy(b, e.activity, b.parent);
        b.cards = [];
        for (var u = 0, x = n[1]; u < x.length; u++) {
          n = x[u];
          w = r.getColumnIndex(h, n.day, n.period, q, h.is1());
          w += l;
          if (0 > w) var y = (w = void 0);
          else
            ((y = r.getDayByColumnIndex(
              h.data.days,
              h.data.periodsCount,
              w,
              h.is1(),
            )),
              (w = h.is1() ? n.period : r.getMasterPeriod(h.data.periods, w)),
              (y && w) || (y = w = void 0));
          n = obj.newChildCopy(n, e.card, b);
          n.dayId = y && w ? y.id : "";
          n.periodId = y && w ? w.id : "";
          b.cards.push(n);
        }
        p.push(b);
      }
    }
    d = 1 < d.length ? "Paste ".concat(d.length, " cards") : "Paste";
    g.addEntities(e.activity, p, { mA: f }, d);
  };
})(m || (m = {}));
(function (g) {
  function p(f, b) {
    if (e.isExcludedFromGenerator(f.subject)) return [];
    var d = obj.notDel(f.cards);
    arr.filter(d, function (d) {
      return (
        !e.isOutPinned(d) &&
        !(
          b &&
          (e.isMinus(f.subject) ||
            e.hasMinus(f.teachers) ||
            e.hasMinus(e.classes(f, !0)) ||
            e.hasMinus(e.allRooms(d)) ||
            (d.period && e.isMinus(d.period)) ||
            (d.day && e.isMinus(d.day)))
        )
      );
    });
    return d;
  }
  var h = (function (f) {
    function b(b) {
      var d = f.call(this, b) || this;
      d.el = ui.getDiv("solverTools");
      var h = (d.icon = c.button.svg({
        el: ui.getDiv("playIcon"),
        svgClass: "svgIcon",
        useId: "playD",
        logger: d.log(),
      }));
      ui.addClass(h.el, "loading");
      h.fireDisabledClick = !0;
      h.hint("Improve timetable");
      ui.append(h.el, d.el);
      ui.append(d.el, b.vA.bott);
      d.setPlay();
      h.click.add(function (b) {
        return d.onPlay(b);
      });
      g.descChange.add(function (b) {
        b.mainActions.some(function (b) {
          return (
            b.desc === e.activity &&
            (b.type === g.actionType.add || b.type === g.actionType.delete)
          );
        }) && d.setPlay();
      });
      d.viewer().events.timetableChange.add(function (b, f) {
        return d.setPlay();
      });
      d.worker = g.createSolverWorker(
        d,
        d.mA.vA.config.version,
        d.mA.url,
        d.mA.log,
      );
      d.bell = new g.bell(d.mA);
      return d;
    }
    __extends(b, f);
    b.prototype.isReady = function () {
      return !!this.worker && this.worker.isReady();
    };
    b.prototype.setPlay = function () {
      this.icon.enable(this.isReady() && g.hasCards(this.mA));
    };
    b.prototype.onLoad = function () {
      this.setPlay();
      this.stopLoading();
      this.bell.icon.enable();
      this.revalid();
    };
    b.prototype.onPlay = function (b) {
      this.onIconClick(!0, this.icon, b);
    };
    b.prototype.onIconClick = function (b, f, h) {
      ui.stopPropagation(h);
      this.isLoading()
        ? this.mA.vA.inf.add(
            "The app is still loading. Wait a bit more or refresh the webpage to try again.",
          )
        : this.isReady()
          ? g.hasCards(this.mA, !0) &&
            (this.viewer().config.user.ignoreMinus &&
              this.inf().addTip(
                'Please note that items with short name set to "-" are exluded.',
              ),
            b
              ? ((b = g.getSolverCards(this.mA)),
                0 === b.length
                  ? this.inf().add(
                      "The generator can't run because all subjects are set to be ignored. Please include at least one to proceed.",
                    )
                  : b.find(function (b) {
                        return !b.pinned;
                      })
                    ? ((this.progress().cards = b),
                      keys.shift(h) &&
                        g.removeCards(
                          b.filter(function (b) {
                            return !b.pinned;
                          }),
                          this.mA,
                        ),
                      this.progress().openWindow(h))
                    : this.inf().add(
                        "Unpin at least one card to allow the generator to improve the timetable.",
                      ))
              : (ui.addClass(f.el, "select"), this.openPanel()))
          : this.installBrowserMsg();
    };
    b.prototype.start = function (b) {
      this.worker.start(b);
    };
    b.prototype.postMsg = function (b) {
      this.worker.postMsg(b);
    };
    b.prototype.getAssignments = function () {
      this.worker.getAssignments();
    };
    b.prototype.updateProgress = function (b) {
      this.progress().update(b);
    };
    b.prototype.writeAssignments = function (b) {
      this.progress().writeAssignments(b);
    };
    b.prototype.end = function () {
      this.worker.end();
    };
    b.prototype.isPanelOpen = function () {
      return this.isReady() && this.bell.panel().isOpen();
    };
    b.prototype.refreshPanel = function (b) {
      this.isReady() && this.bell.panel().refresh(b);
    };
    b.prototype.revalid = function () {
      if (this.isReady()) {
        var b = new g.SolCSV(this.mA, g.getSolverCards(this.mA));
        this.worker.validate(b._csv);
      }
    };
    b.prototype.toggleNotifier = function (b) {
      this.isReady() && this.bell.toggleNotifier(b);
    };
    b.prototype.togglePanel = function (b) {
      if (this.isReady()) this.bell.onClick(b);
    };
    b.prototype.updateNotifier = function (b) {
      this.isReady() && this.bell.updateNotifier(b);
    };
    b.prototype.openPanel = function () {
      this.isReady() && this.bell.panel().open();
    };
    b.prototype.closePanel = function () {
      this.isReady() && this.bell.panel().x();
    };
    b.prototype.noSolver = function () {
      this.installBrowserMsg();
      this.stopLoading();
    };
    b.prototype.installBrowserMsg = function () {
      this.mA.vA.inf.addTip(
        ui.linkMessage("#requirements", "Install modern browser") +
          " to enable automatic generator and real-time notifications",
      );
    };
    b.prototype.onSolverError = function () {
      this.mA.vA.inf.addTip(
        "If you are experiencing any issues try saving changes and refresh the web page " +
          ui.linkMessage("#troubleshooting", "Troubleshooting"),
      );
      this.stopLoading();
    };
    b.prototype.stopLoading = function () {
      ui.deleteClass(this.icon.el, "loading");
    };
    b.prototype.isLoading = function () {
      return ui.hasClass(this.icon.el, "loading");
    };
    b.prototype.progress = function () {
      this._pv || (this._pv = new g.progressView(this.mA, "solverView", this));
      return this._pv;
    };
    return b;
  })(g.baseView);
  g.play = h;
  g.getSolverCards = function (f) {
    var b = f.vA.config.user.ignoreMinus,
      d = [],
      g = 0;
    for (f = obj.notDel(f._t().activities); g < f.length; g++)
      d.push.apply(d, p(f[g], b));
    return d;
  };
  g.hasCards = function (f, b) {
    void 0 === b && (b = !1);
    var d = 0 < f._t().cards.length;
    !d &&
      b &&
      f.vA.inf.add(
        "Timetable is empty. Go to <i>Owl > Manage > Activities</i> to add activities first. " +
          f.vA.addWatchIntroVideos(),
      );
    return d;
  };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d, f) {
      b = h.call(this, b, d) || this;
      b.cards = [];
      b.mode = g.solveMode.start;
      b.isValidOnStart = !1;
      b.sec = 0;
      b.iteration = 0;
      b.play = f;
      return b;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.width = 640;
      d.resizable = !1;
      this.title("Improving timetable");
      d.init();
      var f = (d.scaleAnim.dur = d.fadeAnim.dur = 50);
      d.scaleAnim.xed.add(function (g) {
        d.isOpen &&
          c.timeout(function () {
            return b.onPlayClk(!0);
          }, f + 1);
      });
      d.setHelp("#generate");
      this.playBtn = c.button.svg({
        el: this.find(".playButton"),
        svgClass: "icon",
        useId: "playTriangleD",
        text: "Play",
        logger: this.log(),
      });
      this.playBtn.enableDoubleClick = !0;
      this.initProgresses();
      this.playBtn.click.add(function (d) {
        return b.onPlayClk();
      });
    };
    f.prototype.openWindow = function (b) {
      this.init();
      h.prototype.open.call(this);
      this.resetIteration();
      this.resetStatusTime();
    };
    f.prototype.onPlayClk = function (b) {
      void 0 === b && (b = !1);
      ui.isIE11() &&
        this.inf().addTip(
          ui.linkMessage("#requirements", "Install modern browser") +
            " for 100+ times faster automatic generator.",
        );
      b &&
        (this.inf().addTip(
          "Automatic generator resolves constraints and conflicts for you." +
            m.videoGuide("5erGslObl3U", "#generate"),
        ),
        (this.mode = g.solveMode.start),
        (this.isValidOnStart = 0 === this.play.bell.number),
        (this.sortedDays = e.sortNotDel(this._t().days)),
        (this.sortedDefPers = e.getSortedDefaultPeriods(this._t())),
        (this.updateState = m.newUpdateState(
          e.card,
          [],
          {
            mA: this.mA,
            changedProps: e.cardPosProps,
            updateType: m.updateType.improve,
          },
          "",
          "play",
        )),
        (this.updateAction = this.updateState.actions[0]),
        (this._fitness = -1),
        (this._stagnation = this._betterNo = 0),
        (this._solCSV = new m.SolCSV(this.mA, this.cards)),
        this.play.start(this._solCSV._csv));
      this.mode === g.solveMode.start
        ? (this.playBtn.setFocus(),
          this.changeMode(g.solveMode.stop),
          this.addStatus(date.nowTime() + " Start improving timetable"),
          this.startTimers())
        : this.mode === g.solveMode.stop
          ? (this.changeMode(g.solveMode.continue),
            this.log().w("Pause", void 0, { category: e.logCategory.solver }),
            this.changeWorkerMode("sp"),
            this.stopTimers(),
            this.getAssignments())
          : this.mode === g.solveMode.continue
            ? (this.changeMode(g.solveMode.stop),
              this.log().w("Continue", void 0, {
                category: e.logCategory.solver,
              }),
              this.changeWorkerMode("co"),
              this.startTimers())
            : this.mode === g.solveMode.done && this.xOnOk();
    };
    f.prototype.onIterationTick = function () {
      var b = (5 * ++this.iteration) % 100;
      this.iterPrg.setPercentage(0 === b ? 100 : b);
    };
    f.prototype.onTimeTick = function () {
      this.setTime(++this.sec);
      var b = this.toHHMMSS(this.sec);
      if (this._progressMeasures) {
        var d = this._fitness < this._progressMeasures[15];
        d
          ? (this._stagnation = 0)
          : (this._stagnation++,
            0 === this._stagnation % 180 &&
              this.addStatus(
                b +
                  "  " +
                  "No improvement... ".concat(
                    Math.round(this._stagnation / 60),
                    " min",
                  ),
              ));
        if (5 === this.sec || (0 === (this.sec - 5) % 10 && d))
          (0 === this._betterNo
            ? this.addStatus(
                b +
                  "  Initial solution found. Searching for better solution...",
              )
            : this.addStatus(
                b + "  Better solution No. " + this._betterNo.toString(),
              ),
            this._betterNo++,
            this.getAssignments());
      }
    };
    f.prototype.changeWorkerMode = function (b) {
      this.play.postMsg(b);
    };
    f.prototype.update = function (b) {
      this._progressCSV !== b &&
        ((this._progressCSV = b),
        (b = this._progressMeasures = b.split(",")),
        (b[14] = num.toInt(b[14])),
        (b[15] = parseFloat(b[15])),
        this.refresh());
    };
    f.prototype.refresh = function () {
      for (var b = this._progressMeasures, d = 0, f = 0, h = 0; 7 > h; h++) {
        b[h] = num.toInt(b[h]);
        var l = h + 7;
        b[l] = num.toInt(b[l]);
        4 > h ? (d += b[l]) : (f += b[l]);
      }
      h = b[14];
      1 === h &&
        (this.stopTimers(),
        this.addStatus(date.nowTime() + "  Timetable is finished!"),
        this.title("Timetable is finished!"),
        this.iterPrg.setPercentage(100),
        this.changeMode(g.solveMode.done),
        this.getAssignments(),
        this.changeWorkerMode("sp"),
        this.isValidOnStart || this.viewer().owl.happy());
      this.setProgress(this.conflictPrg, this.conflictTxt, 0);
      this.setProgress(this.forbidPrg, this.forbidTxt, 1);
      this.setProgress(this.gapsPrg, this.gapsTxt, 2);
      this.setProgress(this.sameDayPrg, this.sameDayTxt, 3);
      this.setProgress(this.unwantPrg, this.unwantTxt, 4);
      this.setProgress(this.classPrg, this.classTxt, 5);
      this.setProgress(this.tchPrg, this.tchTxt, 6);
      d =
        0 !== d || 0 !== f || 1 === h || this.isValidOnStart
          ? Math.floor(m.totalPercentage(d, f))
          : 1;
      this.prc !== d && ((this.prc = d), this.title(d + "% finished"));
      if ((d = b[18]) && "" !== d)
        for (b = 0, d = d.split("_br_"); b < d.length; b++)
          ((f = d[b]), console.log(this.toHHMMSS(this.sec) + "  " + f));
    };
    f.prototype.getAssignments = function () {
      this.play.getAssignments();
    };
    f.prototype.writeAssignments = function (b) {
      if (
        this._progressMeasures &&
        !(this._fitness >= this._progressMeasures[15])
      ) {
        this._fitness = this._progressMeasures[15];
        this._stagnation = 0;
        for (
          var d = [],
            f = [],
            g = this.sortedDays,
            h = this.sortedDefPers,
            n = this._solCSV.getRoomGuids(),
            t = b.length,
            p = 0;
          p < t;

        ) {
          for (
            var u = b[p++],
              x = g[b[p++]].id,
              y = h[b[p++]].id,
              z = b[p++],
              A = [],
              B = 0;
            B < z;
            B++
          )
            A.push(n[b[p++]]);
          this.changeCard(this.cards[u], x, y, A, f, d);
        }
        this.fixIgnoredClippedCards(f, d);
        b = d.length;
        0 < b &&
          (obj.prepArrForUsage(d, e.card, { setParent: !1 }),
          m.shouldRefreshView(b, !0)
            ? this.mA._v.g.refreshAll()
            : m.updateCards(d, f, new r.upd(r.updTy.s), this.mA, !0),
          this.mA.play.revalid());
      }
    };
    f.prototype.changeCard = function (b, d, f, g, h, n) {
      var k = g && g.toString() !== b.roomIds.toString();
      if (!b.pinned && (b.periodId !== f || b.dayId !== d || k)) {
        var l = m.addUndoCopies(this.updateAction, [b]);
        h.push(
          0 === l.length
            ? e.newUpdateCopy(
                this.updateAction.desc,
                b,
                this.updateAction.options.changedProps,
                !0,
              )
            : l[0],
        );
        m.changePosId(b, d, f, k ? g : void 0);
        n.push(b);
      }
    };
    f.prototype.fixIgnoredClippedCards = function (b, d) {
      for (
        var f = 0, g = this._solCSV._ignoredClippedCards;
        f < g.length;
        f++
      ) {
        var h = g[f],
          n = e.byId(this.mA.vA.t.cards, h.ID);
        h = this.cards[h.nonIgnoredCardIndex];
        this.changeCard(n, h.dayId, h.periodId, void 0, b, d);
      }
    };
    f.prototype.resetIteration = function () {
      this.iteration = 0;
      this.iterPrg.setPercentage(0);
      this._progressCSV = "";
      this.update("0,0,0,0,0,0,0, 0,0,0,0,0,0,0, -1, 0, 0, 0");
    };
    f.prototype.resetStatusTime = function () {
      ui.empty(this.statusList);
      this.setTime(0);
    };
    f.prototype.stopTimers = function () {
      clearInterval(this.timeInterval);
      clearInterval(this.iterationInterval);
    };
    f.prototype.startTimers = function () {
      var b = this;
      this.stopTimers();
      this.timeInterval = setInterval(function () {
        return b.onTimeTick();
      }, 1e3);
      this.iterationInterval = setInterval(function () {
        return b.onIterationTick();
      }, 500);
    };
    f.prototype.setTime = function (b) {
      this.sec = b;
      ui.setText(this.totalTime, this.toHHMMSS(b));
    };
    f.prototype.beforeClose = function () {
      this.finish();
      h.prototype.beforeClose.call(this);
    };
    f.prototype.finish = function () {
      this.resetStatusTime();
      this.stopTimers();
      this.play.end();
      var b = this.updateAction.entities.length;
      0 < b &&
        ((this.updateState.name = "Update ".concat(b, " cards")),
        m.addState(this.updateState, { mA: this.mA }));
    };
    f.prototype.changeMode = function (b) {
      this.mode = b;
      var d = "";
      b === g.solveMode.stop
        ? ((d = this.loc().get("StopButton", "Stop")),
          this.playBtn.changeUseId("pauseD"))
        : this.mode === g.solveMode.continue
          ? ((d = this.loc().get("ContinueButton", "Continue")),
            this.playBtn.changeUseId("playTriangleD"))
          : this.mode === g.solveMode.done &&
            ((d = "Done"), this.playBtn.changeUseId("okD"));
      this.playBtn.setText(d);
    };
    f.prototype.ok = function () {};
    f.prototype.initProgresses = function () {
      var b = this.mA.vA;
      this.statusList = this.find(".progressList");
      this.conflictPrg = c.progress.el(b, this, this.find(".conflictProgress"));
      ui.addClass(this.conflictPrg.bar, "red");
      this.conflictTxt = this.find(".conflictText");
      ui.addClass(this.conflictTxt, "red");
      this.forbidPrg = c.progress.el(b, this, this.find(".forbiddenProgress"));
      ui.addClass(this.forbidPrg.bar, "red");
      this.forbidTxt = this.find(".forbiddenText");
      ui.addClass(this.forbidTxt, "red");
      this.gapsPrg = c.progress.el(b, this, this.find(".windowsProgress"));
      ui.addClass(this.gapsPrg.bar, "red");
      this.gapsTxt = this.find(".windowsText");
      ui.addClass(this.gapsTxt, "red");
      this.sameDayPrg = c.progress.el(b, this, this.find(".sameDayProgress"));
      ui.addClass(this.sameDayPrg.bar, "blue");
      this.sameDayTxt = this.find(".sameDayText");
      ui.addClass(this.sameDayTxt, "blue");
      this.unwantPrg = c.progress.el(b, this, this.find(".unwantedProgress"));
      ui.addClass(this.unwantPrg.bar, "blue");
      this.unwantTxt = this.find(".unwantedText");
      ui.addClass(this.unwantTxt, "blue");
      this.classPrg = c.progress.el(
        b,
        this,
        this.find(".classWarningProgress"),
      );
      ui.addClass(this.classPrg.bar, "blue");
      this.classTxt = this.find(".classWarningText");
      ui.addClass(this.classTxt, "blue");
      this.tchPrg = c.progress.el(
        b,
        this,
        this.find(".teacherWarningProgress"),
      );
      ui.addClass(this.tchPrg.bar, "blue");
      this.tchTxt = this.find(".teacherWarningText");
      ui.addClass(this.tchTxt, "blue");
      this.iterPrg = c.progress.el(b, this, this.find(".iterationProgress"));
      ui.addClass(this.iterPrg.bar, "green");
      this.totalTime = this.find(".totalTime");
      this._progressCSV = "";
    };
    f.prototype.setProgress = function (b, d, f) {
      var g = this._progressMeasures;
      b.setPercentage(Math.min(g[f], 100));
      f = g[f + 7];
      g = b.display;
      f !== g &&
        ((b.display = f),
        0 === f
          ? (ui.addClass(d, "check"), (d.innerHTML = ui.getCheckMark()))
          : (0 === g && ui.deleteClass(d, "check"), ui.setText(d, f + "")));
    };
    f.prototype.addStatus = function (b) {
      var d = ui.getDiv("generatorStatus");
      d.innerHTML = b;
      ui.append(d, this.statusList);
      this.statusList.scrollTop = this.statusList.scrollHeight;
      this.log().w(b, void 0, { category: e.logCategory.solver });
    };
    f.prototype.toHHMMSS = function (b) {
      var d = Math.floor(b / 3600),
        f = Math.floor((b - 3600 * d) / 60);
      return arr.join(
        [d, f, b - 3600 * d - 60 * f].map(function (b) {
          return date._0(b);
        }),
        ":",
      );
    };
    return f;
  })(m.windowView);
  g.progressView = p;
  g.solveMode = { start: 0, stop: 1, continue: 2, done: 3 };
  g.totalPercentage = function (g, f) {
    return Math.floor(Math.max(100 - g - 0.2 * f, 1));
  };
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b) {
      var d = h.call(this, b) || this;
      b = d.mA.vA;
      d.icon = c.button.svg({
        el: ui.find(".bellIcon", b.el),
        svgClass: "svgIcon",
        useId: "bellD",
        logger: b.log,
      });
      d.icon.fireDisabledClick = !0;
      d.notifier = ui.find(".bellNr", b.el);
      d.icon.click.add(function (b) {
        return d.onClick(b);
      });
      return d;
    }
    __extends(f, h);
    f.prototype.updateNotifier = function (b) {
      var d = this,
        f = b[0];
      b = b[1];
      f = 0 < f ? f : 0 < b ? -b : 0;
      if (this.number !== f && !this.viewer().config.user.hideNotifier) {
        b = void 0 === this.number;
        var g = Math.abs(f),
          h = 2 < Math.abs(Math.abs(this.number || 0) - g);
        ui.toggleClass(this.notifier, "warning", 0 > f);
        var n = (0 === this.number || b) && 0 !== f;
        n
          ? ui.addClass(this.notifier, "show")
          : 0 === f && ui.deleteClass(this.notifier, "show");
        ui.addClass(this.notifier, h && !n ? "bigUpdate" : "update");
        (b && 0 === f) || ui.addClass(this.icon.el, h ? "bigRing" : "ring");
        n && ui.setText(this.notifier, g + "");
        c.timeout(function () {
          return d.afterRing(n);
        }, 125);
        this.viewer().title.setNotifier(g);
        this.number = f;
      }
    };
    f.prototype.toggleNotifier = function (b) {
      b
        ? ((this.number = void 0), this.mA.play.revalid())
        : (ui.deleteClass(this.notifier, "show"), this.viewer().title.set());
    };
    f.prototype.afterRing = function (b) {
      ui.deleteClass(this.icon.el, "bigRing ring");
      ui.deleteClass(this.notifier, "bigUpdate update");
      b ||
        ui.setHtml(
          this.notifier,
          0 === this.number || void 0 === this.number
            ? "&nbsp;"
            : Math.abs(this.number) + "",
        );
    };
    f.prototype.onClick = function (b) {
      if (this.panel().isOpen()) this.panel().xOnOk();
      else this.mA.play.onIconClick(!1, this.icon, b);
    };
    f.prototype.onPanelClose = function (b) {
      ui.deleteClass(this.icon.el, "select");
    };
    f.prototype.panel = function () {
      var b = this;
      this._panel ||
        ((this._panel = new g.notificationPanel(this.mA, "validatorView")),
        this._panel.win.closed.add(function (d) {
          return b.onPanelClose(d);
        }));
      return this._panel;
    };
    return f;
  })(g.baseView);
  g.bell = p;
})(m || (m = {}));
(function (g) {
  var p = (function (h) {
    function f(b, d) {
      var f = h.call(this, b, d) || this;
      f.rows = [];
      f.hasChanges = !0;
      f._home = -10;
      f._end = 10;
      f._pageUp = -4;
      f._pageDown = 4;
      f.init();
      ui.click(b.vA.top, function () {
        return f.x();
      });
      ui.click(b.vA.bott, function () {
        return f.x();
      });
      return f;
    }
    __extends(f, h);
    f.prototype.init = function () {
      var b = this;
      this.init = c.no;
      var d = this.win;
      d.center = d.isModal = d.anim = !1;
      d.width = 200;
      d.height = 300;
      d.top = 44;
      d.right = c.scrollWidth() + 6;
      ui.addClass(d.el, "validWin");
      d.init();
      d.dragEnd.add(function () {
        return b.onPositionChanged();
      });
      d.resize.add(function () {
        return b.onPositionChanged();
      });
      var f = ui.addClass(ui.getTag("a"), "help");
      ui.setAttribute(f, "href", "#notification");
      ui.tap(f, function (b) {
        ui.stopPropagation(b);
      });
      svg.getIcon(f, "svgIcon", "helpD");
      ui.prepend(f, d.titleBar);
      this.el = d.content;
      ui.addClass(this.el, "errorList");
      ui.setTabIndex(this.el, 0);
    };
    f.prototype.open = function () {
      this.win.title("Notifications");
      h.prototype.open.call(this);
      this.el.focus();
      this.hasChanges
        ? (ui.empty(this.el), this.mA.play.revalid())
        : this.selectRow(this._row, !0);
      1 < this.rows.length &&
        this.inf().addTip(
          "Click red or blue notification to spot the problem in the view " +
            ui.linkMessage("#notifications", "Read about notifications"),
        );
    };
    f.prototype.refresh = function (b) {
      var d = this.isOpen(),
        f = !this.viewer().config.user.hideNotifier;
      this.hasChanges = !0;
      if (f || d)
        (this.deleteSpots(),
          d && ui.empty(this.el),
          this.isOpen() && ((d = g.getErrorList(b.er, this.mA)), this.bind(d)),
          f && this.mA.play.updateNotifier(b.nn));
    };
    f.prototype.bind = function (b) {
      var d = this;
      this.hasChanges = !1;
      this.rows = [];
      this.items = b;
      for (var f = ui.getFragment(), g, h = b.length, n = 0; n < h; n++) {
        var t = b[n],
          p = t._description,
          u = ui.getDiv("errorItem");
        ui.dat(ui.addClass(u, t.getCssClass()), "i", n + "");
        t._isHeader
          ? (g && g.isItem() && ui.addClass(u, "first"),
            (p =
              (t.isOkHeader()
                ? '<span class="chkMark">' + ui.getCheckMark() + "</span>"
                : '<span class="circle ' +
                  (t.isErrHeader() ? "err" : "warn") +
                  '">!</span>') + p),
            ui.click(u, function (b) {
              return d.deleteSpots();
            }))
          : ((p = '<span class="triangle"></span>' + p),
            ui.setTabIndex(u, 0),
            ui.on(u, "keydown", function (b) {
              return d.onItemKeyDown(b);
            }),
            ui.click(u, function (b) {
              return d.onRowClick(b);
            }));
        ui.setHtml(u, p);
        this.rows.push(u);
        f.appendChild(u);
        g = t;
      }
      ui.append(f, this.el);
    };
    f.prototype.onItemKeyDown = function (b) {
      keys.enter(b) &&
        (this.selectRow(ui.target(b)), ui.stopDefaultPropagation(b));
    };
    f.prototype.onKeyDown = function (b) {
      var d = [1, -1, this._end, this._home, this._pageDown, this._pageUp],
        f = keys.indexOf(b, [40, 38, 35, 36, 34, 33]);
      -1 !== f &&
        (0 < this.rows.length && this.selectNext(d[f]),
        ui.stopDefaultPropagation(b));
    };
    f.prototype.onRowClick = function (b) {
      this.selectRow(ui.target(b));
    };
    f.prototype.selectRow = function (b, d) {
      void 0 === d && (d = !1);
      if (b) {
        this.mA.closeMenus(void 0);
        this._row = b;
        this.deleteSpots();
        var f = this.currentRow !== b,
          g = this.mainView();
        this.currentRow &&
          f &&
          ui.deleteClass(this.currentRow, "errorSelected");
        f && (ui.addClass(b, "errorSelected"), (this.currentRow = b));
        if ((f = this.getItem(b))) {
          this.log().w("".concat(f._description, " notification clicked"));
          var h = c.clone(f._spots);
          if (0 !== h.length) {
            d &&
              ((b =
                ui.getPos(b).y +
                this.el.scrollTop -
                (ui.getComputedHeight(this.el) - ui.getComputedHeight(b)) / 2),
              (this.el.scrollTop = b));
            d = this.findSpotView(
              g,
              4 === f._resourceType || 5 === f._resourceType
                ? e.vMod.c
                : f._resourceType,
              h,
            );
            b = d.spotView;
            d = d.changedView;
            h = h.filter(function (b) {
              return 0 <= b.rowIndex;
            });
            var n = d || b.viewType().view;
            n.isDefault || this.convertSpots(this._t(), h, n);
            0 < h.length &&
              ((n = d ? d.id : b.viewType().id), b.addSpots(h, f.isError(), n));
            d && g.switcher.toView(d);
          }
        } else
          this.log().w(
            "No error item for the row " + b.outerHTML,
            e.logType.warn,
          );
      }
    };
    f.prototype.findSpotView = function (b, d, f) {
      var g = this,
        k = b.g.vs.find(function (b) {
          return g.hasSpots(b.viewType().view, d, f, b.is1());
        }),
        h = k || b;
      if (!k) {
        k = e.getViews(this._t(), e.viewVisibility.all);
        b = b.g.vs.map(function (b) {
          return b.viewType().view;
        });
        arr.removes(k, b);
        var t = k.find(function (b) {
          return g.hasSpots(b, d, f, !1);
        });
      }
      return { spotView: h, changedView: t };
    };
    f.prototype.convertSpots = function (b, d, f) {
      var g = this.getViewEntities(b, f),
        k = this.getViewDays(b, f),
        h = this.getViewPeriods(b, f);
      f = function (d) {
        var f = d.rowIndex,
          l = d.columnIndex,
          n = g.find(function (b) {
            return b.position === f + 1;
          });
        n = g.indexOf(n);
        d.rowIndex = n;
        var q = e.getDefaultPeriods(b);
        n = r.getDayByColumnIndex(obj.notDel(b.days), q.length, l, !1);
        l = r.getMasterPeriod(q, l);
        n = k.indexOf(n);
        l = h.indexOf(l);
        d.columnIndex = n * h.length + l;
      };
      for (var t = 0; t < d.length; t++) f(d[t]);
    };
    f.prototype.hasSpots = function (b, d, f, g) {
      if (g || d !== b.entityType - 1) return !1;
      if (b.isDefault) return !0;
      d = arr.unique(
        f.map(function (b) {
          return b.rowIndex + 1;
        }),
      );
      var k = this.getViewEntities(this._t(), b).map(function (b) {
        return b.position;
      });
      if (
        d.find(function (b) {
          return !arr.has(k, b);
        })
      )
        return !1;
      d = b.excludedDayIds;
      b = b.excludedPeriodIds;
      if (0 < d.length) {
        g = arr.unique(
          f.map(function (b) {
            return b.columnIndex;
          }),
        );
        var h = obj.notDel(this._t().days),
          q = e.getDefaultPeriods(this._t()).length;
        g = arr
          .unique(
            g.map(function (b) {
              return r.getDayByColumnIndex(h, q, b, !1);
            }),
          )
          .map(function (b) {
            return b.id;
          });
        if (arr.hasOneEqual(d, g)) return !1;
      }
      if (0 < b.length) {
        var p = [];
        d = function (b) {
          var d = b.columnIndex;
          b = b.len;
          arr.addUnique(p, d);
          1 < b &&
            arr.range(b).forEach(function (b) {
              return arr.addUnique(p, d + b);
            });
        };
        for (g = 0; g < f.length; g++) d(f[g]);
        var u = e.getDefaultPeriods(this._t());
        f = arr
          .unique(
            p.map(function (b) {
              return r.getMasterPeriod(u, b);
            }),
          )
          .map(function (b) {
            return b.id;
          });
        if (arr.hasOneEqual(b, f)) return !1;
      }
      return !0;
    };
    f.prototype.getViewEntities = function (b, d) {
      b = e.getViewEntities(b, d.entityType);
      return e.byIds(b, d.entityIds);
    };
    f.prototype.getViewDays = function (b, d) {
      b = e.sortNotDel(b.days);
      arr.filter(b, function (b) {
        return !arr.has(d.excludedDayIds, b.id);
      });
      return b;
    };
    f.prototype.getViewPeriods = function (b, d) {
      b = e.sortedDefaultPeriods(b.periods);
      arr.filter(b, function (b) {
        return !arr.has(d.excludedPeriodIds, b.id);
      });
      return b;
    };
    f.prototype.selectNext = function (b) {
      b = this.currentRow
        ? Math.abs(b) === this._end
          ? this.find1(b === this._end ? this.rows.length : 0, -num.sign(b))
          : this.find1(ui._datN(this.currentRow, "i"), b)
        : this.find1(0, b);
      -1 !== b && this.selectRow(this.rows[b], !0);
    };
    f.prototype.find1 = function (b, d) {
      var f = 0 > d ? 0 : this.items.length - 1,
        g = num.sign(d),
        h = Math.abs(d) === this._pageDown;
      d = d === this._pageUp;
      var n = !h,
        t = -1;
      for (b += g; 1 === g ? b <= f : b >= f; b += g) {
        var p = this.items[b],
          u = p.isError() || p.isWarning();
        u && (t = b);
        if (d && n && p._isHeader && x && !x._isHeader) return t;
        var x = p;
        if (!d || !n)
          if (p._isHeader && !n) n = !0;
          else if (n && u) return b;
      }
      return h ? t : -1;
    };
    f.prototype.deleteSpots = function () {
      this.mainView().g.deleteSpots();
    };
    f.prototype.beforeClose = function () {
      this.deleteSpots();
      this.viewer().title.onWindowTitleChange("");
    };
    f.prototype.x = function () {
      this.win.close();
    };
    f.prototype.toggle = function () {
      this.win.toggle();
    };
    f.prototype.onPositionChanged = function () {
      var b = this.win;
      ui.toggleClass(
        b.el,
        "dragged",
        b.right > c.scrollWidth() + 15 ||
          b.right < c.scrollWidth() - 5 ||
          34 > b.top ||
          54 < b.top,
      );
    };
    f.prototype.getItem = function (b) {
      return this.items[ui._datN(b, "i")];
    };
    return f;
  })(g.windowView);
  g.notificationPanel = p;
})(m || (m = {}));
(function (g) {
  var p;
  (function (b) {
    b[(b.OK = -1)] = "OK";
    b[(b.FATAL = 7)] = "FATAL";
  })(p || (p = {}));
  var h;
  g.getErrorList = function (d, g) {
    h || (h = new b(g));
    var k = d.length;
    if (0 === k) {
      var l = new f(g);
      l._description = h.getText(2);
      l._headerLevel = p.OK;
      return [l];
    }
    for (var n = h._headers.length, t = Array(n), w = 0; w < n; w++) t[w] = [];
    for (w = 0; w < k; w++) {
      var u = d[w];
      l = new f(g, u);
      u = u.ht;
      if (0 === t[u].length) {
        var x = new f(g);
        x._description = h.getHeaderText(l._headerLevel);
        x._headerLevel = l._headerLevel;
        t[u].push(x);
      }
      t[u].push(l);
    }
    d = [];
    for (w = 0; w < n; w++)
      for (g = t[w], k = 0, l = g.length; k < l; k++) d.push(g[k]);
    return d;
  };
  var f = (function () {
    function b(b, d) {
      this._isHeader = !1;
      this._spots = [];
      if (d) {
        this._description = h.getFormatedText(d.et, d.ar);
        this._resourceType = d.rt;
        this._headerLevel = d.ht;
        for (var f = 0, g = d.mp.length; f < g; f++) {
          var k = d.mp[f];
          this.addMarkPos(k[0], k[1], k[2], k[3], b);
        }
      } else this._isHeader = !0;
    }
    b.prototype.getCssClass = function () {
      if (this._isHeader) {
        var b = "errorHeader ";
        b = this.isOkHeader()
          ? b + "errorOK"
          : b + (this.isErrHeader() ? "errorFatal" : "errorWarning");
      } else b = this.isError() ? "errorRed" : "errorBlue";
      return b;
    };
    b.prototype.isErrHeader = function () {
      return this._headerLevel <= p.FATAL;
    };
    b.prototype.isOkHeader = function () {
      return this._headerLevel === p.OK;
    };
    b.prototype.isError = function () {
      return !this._isHeader && this._headerLevel <= p.FATAL;
    };
    b.prototype.isWarning = function () {
      return !this._isHeader && this._headerLevel > p.FATAL;
    };
    b.prototype.isItem = function () {
      return this.isError() || this.isWarning();
    };
    b.prototype.addMarkPos = function (b, d, f, g, h) {
      h = h._t();
      var k = e.defaultPeriods(h.periods);
      0 > f ? ((g = k.length), (f = 1)) : (f = e.sortByPos(k)[f].position);
      d =
        (0 > d
          ? obj.notDel(h.days).length
          : e.sortNotDel(h.days)[d].position - 1) *
          k.length +
        f -
        1;
      this._spots.push(r.getSpot(d, b - 1, g));
    };
    return b;
  })();
  g.ErrorItem = f;
  var b = (function () {
    function b(b) {
      this._localizer = b._v.loc();
      this._errors = [];
      this.setText(0, "GeneratorUnknownError", "Unknown error.");
      this.setText(
        1,
        "GeneratorCantGenerateTimetable",
        "Timetable can't be generated.",
      );
      this.setText(
        2,
        "GeneratedTimetableSatisfiesAllRequirements",
        "Timetable satisfies all requirements.",
      );
      this.setText(
        3,
        "ChooseManageLessonsFirst",
        "Choose 'Owl > Manage > Activities' to enter activities first.",
      );
      this.setText(6, "GeneratorPeriodForbidden", "{0}, {1}, period {2}.");
      this.setText(
        8,
        "SubjectAppearsMoreThanFewTimes",
        "{0}, {1}, {2} appears {3} times.",
      );
      this._errors[9] = "{0}, {1}, {2}-{3}.";
      this.setText(
        10,
        "MoreUnwantedLessonsThanAllowed",
        "{0}, {1} unwanted lessons {2}, max. allowed {3}.",
      );
      this.setText(
        11,
        "MoreMissedMandatoryLessonsThanAllowed",
        "{0}, {1} number of missed mandatory lessons {2}, max. allowed {3}.",
      );
      this.setText(
        13,
        "LackOfLessons",
        "{0}, {1}, lack of lessons - has {2} lessons, desired is {3}.",
      );
      this.setText(
        14,
        "ExtraLessons",
        "{0}, {1}, extra lessons - has {2} lessons, desired is {3}.",
      );
      this.setText(
        15,
        "TeacherLessThanMinRequiredLessons",
        "{0}, {1}, {2} lessons, minimum {3} required.",
      );
      this.setText(
        16,
        "TeacherMoreThanMaxAllowedLessons",
        "{0}, {1}, {2} lessons, max. allowed {3}.",
      );
      this.setText(
        17,
        "TeacherLessLessonsToAllowGap",
        "{0}, {1}, min. lessons to allow window is {2}.",
      );
      this.setText(
        18,
        "TeacherMoreThanAllowedGapsDaily",
        "{0}, {1}, {2} gaps, allowed {3} daily.",
      );
      this.setText(
        19,
        "TeacherMoreThanAllowedGaps",
        "{0}, total gaps {1}, allowed {2}.",
      );
      this._errors[20] = "{0}, {1}.";
      this._errors[21] = "{0}, {1}.";
      this.setText(4, "TotalAwaitingCards", "{0}: {1} card(s).");
      this.setText(
        7,
        "NumberOfMissingGroupsOnPeriod",
        "{0}, {1}, period {2}, number of missing groups {3}.",
      );
      this.setText(12, "ResourceHasWindow", "{0}, {1}, period {2}.");
      this.setText(
        5,
        "CardConflictOnPeriod",
        "{0}, {1}, period {2}, appears {3} times.",
      );
      this.setText(
        22,
        "BuildingMoves",
        "{0}, {1}, periods: {2} \u21e8 {3}, buildings: {4} \u21e8 {5}",
      );
      this.setText(23, "nInRow", "{0}, {1}, {2} in a row");
      this._headers = [];
      this.setHeaderText(0, "UnknownErrorHeader", "General error");
      this.setHeaderText(1, "AwaitingCards", "Unscheduled cards");
      this.setHeaderText(2, "CardConflicts", "Card conflicts");
      this.setHeaderText(5, "ClassWindows", "Class gaps");
      this.setHeaderText(
        6,
        "MissingGroupsInClass",
        "Missing groups in the class(es)",
      );
      this.setHeaderText(8, "UnwantedLessons", "Unwanted lessons");
      this.setHeaderText(9, "MandatoryLessons", "Mandatory lessons");
      this.setHeaderText(
        10,
        "SubjectAppearsMoreThanOnceADay",
        "Subject taught more than once a day",
      );
      this.setHeaderText(
        11,
        "SubjectAppearsOnConsequestDays",
        "Subject taught on consequent days",
      );
      this.setHeaderText(12, "TeacherWindows", "Teacher gaps");
      this.setHeaderText(
        13,
        "UnderloadOverloadLessonsPerDay",
        "Underload and overload of lessons per day",
      );
      this.setHeaderText(
        4,
        "CardDoesntFitInOneDay",
        "Card doesn't fit in one day",
      );
      this.setHeaderText(3, "CardIsOnForbiddenPosition", "Forbidden positions");
      this.setHeaderText(
        14,
        "TooManyDifficultAndEasySubjectsInDay",
        "Too many difficult or too few easy subjects in a day",
      );
      this.setHeaderText(
        7,
        "BuildingMoves",
        "Too many moves between buildings",
      );
    }
    b.prototype.getText = function (b) {
      return b >= this._errors.length ? this._errors[0] : this._errors[b];
    };
    b.prototype.getFormatedText = function (b, d) {
      b = this.getText(b);
      return b.format.apply(b, d);
    };
    b.prototype.getHeaderText = function (b) {
      return b >= this._headers.length ? this._headers[0] : this._headers[b];
    };
    b.prototype.setText = function (b, d, f) {
      this._errors[b] = this._localizer.get(d, f);
    };
    b.prototype.setHeaderText = function (b, d, f) {
      this._headers[b] = this._localizer.get(d, f);
    };
    return b;
  })();
  g.ErrorText = b;
})(m || (m = {}));
(function (g) {
  g.createSolverWorker = function (g, h, f, b) {
    function d(b) {
      function d(b) {
        var d = b.data.ms;
        b = b.data.dt;
        switch (d) {
          case "ve":
            g.refreshPanel(JSON.parse(b));
            break;
          case "pr":
            d = b.split(",");
            var f = num.toInt(d[16]);
            if (!x[f]) {
              var h = parseFloat(d[15]);
              h > p &&
                (0 <= p || 0 === f) &&
                ((p = h),
                u !== f &&
                  ((u = f), console.log("Engine #" + f + " is main.")));
              u === f
                ? g.updateProgress(b)
                : 5e3 < num.toInt(d[17]) &&
                  ((x[f] = !0), k[f].postMessage({ ms: "rst" }));
            }
            break;
          case "as":
            b = JSON.parse(b);
            d = b.fitness;
            f = b.id;
            d > p && ((p = d), (u = f));
            u === f && g.writeAssignments(b.as);
            break;
          case "rst":
            x[b] = !1;
            console.log("Engine #" + b + " restarted.");
            break;
          case "re":
            console.log("Worker #" + q + " is ready.");
            q++;
            if (4 === q) g.onLoad();
            break;
          default:
            console.log("\nWrong message from web worker: '" + d + "'\n");
        }
      }
      var k = [],
        q = 0,
        p,
        u,
        x = Array(3),
        y = "js/solver/s";
      "object" === typeof window.WebAssembly && (y += "w");
      var z = f.isLocalhost ? "?id=" + str.id() : "";
      y = f.getFull(y + (h ? h : "") + ".js" + z);
      for (z = 0; 4 > z; z++) {
        var A = new Worker(y);
        A.onmessage = d;
        A.onerror = function (d) {
          d = "Worker error: " + d.message;
          b.w(d, e.logType.err, { category: e.logCategory.solver });
          g.onSolverError();
          console.log(d);
        };
        k.push(A);
      }
      return {
        isReady: function () {
          return 4 === q;
        },
        postMsg: function (b) {
          b = { ms: b };
          for (var d = 0; 3 > d; d++) k[d].postMessage(b);
        },
        start: function (b) {
          u = p = -1;
          for (var d = 0; 3 > d; d++)
            (k[d].postMessage({ ms: "st", dt: b, pl: d }), (x[d] = !1));
        },
        end: function () {
          this.postMsg("en");
        },
        getAssignments: function () {
          this.postMsg("as");
        },
        validate: function (b) {
          var d = g.isPanelOpen() ? 1 : 0;
          k[3].postMessage({ ms: "va", dt: b, pl: d });
        },
      };
    }
    function k(b) {
      if ("undefined" !== typeof Worker && "ArrayBuffer" in window) return d(b);
      console.log(
        "Worker or ArrayBuffer are not supported. Solver and notifications are disabled!",
      );
      g.noSolver();
      return {
        isReady: function () {
          return !1;
        },
        postMsg: function (b) {},
        start: function (b) {},
        end: function () {},
        getAssignments: function () {},
        validate: function (b) {},
      };
    }
    return "object" === typeof window.WebAssembly ? d(b) : k(b);
  };
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function g(f, b) {
      this._roomMaps = { IDs: [], Inds: {} };
      this._ignoredClippedCards = [];
      var d = f._t(),
        g = f.vA.config.user.ignoreMinus;
      this._csv = "";
      this.newBlock();
      var h = e.sortNotDel(d.days);
      this._dayCount = h.length;
      this.add(this._dayCount);
      for (var l = 0; l < this._dayCount; l++)
        (this.add(l), this.addStr(h[l].name));
      l = e.getDefaultPeriods(d);
      h = e.sortByPos(l);
      this._perCount = h.length;
      this.add(this._perCount);
      for (l = 0; l < this._perCount; l++)
        (this.add(l), this.addStr(h[l].position + ""));
      this.merge();
      this._toff = Array(this._dayCount);
      for (l = 0; l < this._dayCount; l++)
        this._toff[l] = Array(this._perCount);
      this.newBlock();
      var n = {},
        t = obj.notDel(d.subjects);
      h = t.length;
      var p = 0;
      for (l = 0; l < h; l++) {
        var u = t[l];
        (g && e.isMinus(u)) || (this.addSubj(u, f), (n[u.id] = p), p++);
      }
      this.prepend(p);
      this.merge();
      this.newBlock();
      t = obj.notDel(d.rooms);
      h = t.length;
      for (l = p = 0; l < h; l++)
        ((u = t[l]),
          (g && e.isMinus(u)) ||
            (this.addRoom(u, f),
            (this._roomMaps.Inds[u.id] = p),
            (this._roomMaps.IDs[p] = u.id),
            p++));
      this.prepend(p);
      this.merge();
      this.newBlock();
      t = {};
      u = obj.notDel(d.teachers);
      h = u.length;
      for (l = p = 0; l < h; l++) {
        var x = u[l];
        (g && e.isMinus(x)) || (this.addTeacher(x, f), (t[x.id] = p), p++);
      }
      this.prepend(p);
      this.merge();
      this.newBlock();
      this._groupCount = 0;
      x = obj.notDel(d.classes);
      u = { numberOfElements: 0 };
      h = x.length;
      for (l = p = 0; l < h; l++)
        (g && e.isMinus(x[l])) || (this.addClass(x[l], f, u), p++);
      this._csv += this._groupCount + ",";
      this.prepend(p);
      this.merge();
      this.newBlock();
      f = {};
      h = b.length;
      for (l = p = 0; l < h; l++)
        ((g = b[l]),
          this.addLesson(l, g, n, this._roomMaps.Inds, t, u),
          (f[g.id] = p),
          p++);
      this.prepend(p);
      this.merge();
      this.newBlock();
      b = obj.notDel(d.clips);
      h = b.length;
      for (l = p = 0; l < h; l++) {
        t = b[l];
        d = [];
        u = !1;
        n = [];
        x = 0;
        for (var y = t.cards.length; x < y; x++) {
          g = t.cards[x];
          if (e.isOutPinned(g)) {
            u = !0;
            break;
          }
          var z = t.cardIds[x];
          g = f[z];
          void 0 === g ? n.push(z) : d.push(g);
        }
        if (!u && 0 !== d.length) {
          for (g = 0; g < n.length; g++)
            this._ignoredClippedCards.push({
              ID: n[g],
              nonIgnoredCardIndex: d[0],
            });
          this.add(d.length);
          for (n = 0; n < d.length; n++) ((g = d[n]), this.add(g));
          p++;
        }
      }
      this.prepend(p);
      this.merge();
    }
    g.prototype.add = function (f) {
      this._block += f + ",";
    };
    g.prototype.addStr = function (f) {
      f = f.replace(/,/g, ";");
      f = this.addslashes(f);
      this._block += f + ",";
    };
    g.prototype.addslashes = function (f) {
      return f
        .replace(/\\/g, "\\\\")
        .replace(/\u0008/g, "\\b")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\f/g, "\\f")
        .replace(/\r/g, "\\r")
        .replace(/"/g, '\\"');
    };
    g.prototype.addBool = function (f) {
      this.add(f ? 1 : 0);
    };
    g.prototype.prepend = function (f) {
      this._block = f + "," + this._block;
    };
    g.prototype.merge = function () {
      this._csv += this._block;
    };
    g.prototype.newBlock = function () {
      this._block = "";
    };
    g.prototype.addRes = function (f, b) {
      this.addStr(f.name);
      this.add(f.position);
      this.add(0 <= f.maxUnwantedPerCycle ? f.maxUnwantedPerCycle : 1e3);
      this.add(0 <= f.maxUnwantedPerDay ? f.maxUnwantedPerDay : 1e3);
      this.add(0 <= f.minMandatoryPerCycle ? f.minMandatoryPerCycle : 1e3);
      this.add(0 <= f.minMandatoryPerDay ? f.minMandatoryPerDay : 1e3);
      b = this._toff;
      for (var d = 0, g = this._dayCount; d < g; d++)
        for (var h = 0, l = this._perCount; h < l; h++) b[d][h] = 0;
      if (0 < f.marks.length)
        for (d = 0, f = f.marks; d < f.length; d++)
          ((g = f[d]),
            g[0] > b.length ||
              g[1] > b[g[0] - 1].length ||
              (b[g[0] - 1][g[1] - 1] = g[2]));
      d = 0;
      for (g = this._dayCount; d < g; d++)
        for (h = 0, l = this._perCount; h < l; h++) this.add(b[d][h]);
    };
    g.prototype.addSubj = function (f, b) {
      this.addRes(f, b);
      this.add(f.difficulty ? f.difficulty : 0);
      f.allowMorePerDay
        ? (this.add(1), this.add(0), this.add(0))
        : (this.add(0),
          this.addBool(f.insertDayOff2),
          this.addBool(f.insertDayOff3));
    };
    g.prototype.addRoom = function (f, b) {
      this.addRes(f, b);
      this.addStr(f.building);
    };
    g.prototype.addTeacher = function (f, b) {
      this.addRes(f, b);
      this.add(0 <= f.maxGapsPerCycle ? f.maxGapsPerCycle : 1e3);
      this.add(0 <= f.maxGapsPerDay ? f.maxGapsPerDay : 1e3);
      this.add(f.allowGapsAfter);
      this.add(f.maxDeviation);
      this.add(f.minPerDay);
      this.add(f.maxPerDay);
      this.add(f.maxBuildingMoves);
      this.addBool(f.countAllMoves);
      this.add(f.maxInRow);
    };
    g.prototype.addClass = function (f, b, d) {
      this.addRes(f, b);
      this.addBool(f.startOnFirstPeriod);
      this.addBool(f.forbidGaps);
      this.addBool(f.groupsFinishTogether);
      this.add(f.maxDiff);
      f = e.sortNotDel(f.groupSets);
      b = f.map(function (b) {
        return b.position;
      }).length;
      this.add(b);
      for (b = 0; b < f.length; b++) {
        var g = f[b];
        this.add(g.position || 0);
        g = e.sortNotDel(g.groups);
        var h = g.length;
        this.add(h);
        for (var l = 0; l < h; l++) this.addGroup(g[l], d);
      }
    };
    g.prototype.addGroup = function (f, b) {
      this.add(b.numberOfElements);
      this.addStr(f.name);
      this.addBool(e.isEntire(f));
      this._groupCount++;
      b[f.id] = b.numberOfElements;
      b.numberOfElements++;
    };
    g.prototype.addLesson = function (f, b, d, g, h, l) {
      this.add(f);
      this.add(b.day ? b.day.position - 1 : -1);
      this.add(b.period ? b.period.position - 1 : -1);
      this.addBool(b.pinned);
      this.add(b.parent.length);
      this.addInds(b.parent.teacherIds, h);
      this.addInds(b.parent.groupIds, l);
      this.makeRooms(b, g);
      this.add(this.getInd(b.parent.subjectId, d));
    };
    g.prototype.makeRooms = function (f, b) {
      var d = this.getInds(f.roomIds, b);
      this.add(d.length);
      if (0 === d.length) this.add(0);
      else {
        for (var g = 0; g < d.length; g++) {
          var h = d[g];
          this.add(h);
        }
        h = {};
        g = [];
        this.appendUnique(d, g, h);
        this.appendUnique(this.getInds(f.parent.roomIds, b), g, h);
        this.appendUnique(this.getInds(f.parent.moreRoomIds, b), g, h);
        this.add(g.length);
        for (f = 0; f < g.length; f++) ((h = g[f]), this.add(h));
      }
    };
    g.prototype.appendUnique = function (f, b, d) {
      for (var g = 0; g < f.length; g++) {
        var h = f[g];
        d[h] || ((d[h] = !0), b.push(h));
      }
    };
    g.prototype.addInds = function (f, b) {
      var d = this,
        g = [];
      f.forEach(function (f) {
        f = d.getInd(f, b);
        void 0 !== f && g.push(f);
      });
      this.add(g.length);
      g.forEach(function (b) {
        d.add(b);
      });
    };
    g.prototype.getInds = function (f, b) {
      for (var d = [], g = 0; g < f.length; g++) {
        var h = this.getInd(f[g], b);
        void 0 !== h && d.push(h);
      }
      return d;
    };
    g.prototype.getInd = function (f, b) {
      return b[f];
    };
    g.prototype.getRoomGuids = function () {
      return this._roomMaps.IDs;
    };
    return g;
  })();
  g.SolCSV = p;
})(m || (m = {}));
(function (g) {
  var p = (function () {
    function f(b, d) {
      void 0 === d && (d = !1);
      this.individualCnt = "";
      this.veInd = -1;
      this.addIndividualTitle = !0;
      this.mcs = [];
      this.colMcs = {};
      this.lines = [];
      this.usedCells = [];
      this.mA = b;
      d && ((this.individualCnt = ""), (this.htmlsDone = c.callback()));
    }
    f.prototype.getHtmlDoc = function (b) {
      return this.getHtmlStart() + b + "\n</body>\n</html>";
    };
    f.prototype.startHtmls = function () {
      if (0 === r.getEntities(this.v()).length) return !1;
      this.drawCb = this.drawDone.bind(this);
      this.v().done.add(this.drawCb);
      this.prevVty = r.viewType.from(this.vTy());
      this.chgView();
      return !0;
    };
    f.prototype.drawDone = function (b) {
      this.onDrawDone();
    };
    f.prototype.onDrawDone = function () {
      var b = this.veInd === r.getEntities(this.v()).length - 1;
      this.individualCnt += this.getTimetableContent(b, !1);
      b
        ? (this.v().done.remove(this.drawCb),
          (this.individualCnt = this.getHtmlDoc(
            this.getTimetableBorderString(this.individualCnt),
          )),
          this.htmlsDone.fire(this.individualCnt),
          this.prevVty.ve !== this.vTy().ve &&
            this.v().changeViewType(this.prevVty, { data: !0 }))
        : this.chgView();
    };
    f.prototype.chgView = function () {
      this.veInd++;
      var b = new r.viewType(this.vTy().view);
      b.ve = r.getEntities(this.v())[this.veInd];
      this.v().changeViewType(b);
    };
    f.prototype.getHtmlStart = function () {
      return (
        '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n<meta name="author" content="https://primetimetable.com" /><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n<title>' +
        (this.mA._t().schoolName +
          (this.mA._v.is1() && this.addIndividualTitle
            ? " (".concat(this.vTy().name(), ") ")
            : "")) +
        "</title>\n" +
        f.getCss() +
        "\n</head>\n<body>\n"
      );
    };
    f.getCss = function () {
      return '\n<style type="text/css"> \n         body { \n             background: #61755D url("../UI/Image/green_board.png"); \n             font:normal normal normal 14px/20px Arial, Tahoma, Verdana, sans-serif; \n         } \n         .round_border{display:block} \n         .round_border *{background:#fff;display:block;height:1px;overflow:hidden} \n         .round_border_layer3{background:#c4c4c4;border-left:1px solid #d3d4d5;border-right:1px solid #d3d4d5;margin:0 3px;padding:0 1px} \n         .round_border_layer2{border-left:1px solid #d3d4d5;border-right:1px solid #d3d4d5;margin:0 2px;padding:0} \n         .round_border_layer1{border-left:1px solid #c4c4c4;border-right:1px solid #c4c4c4;margin:0 1px} \n                  \n         .round_border_content{ \n             border-left:1px solid #c4c4c4; \n             border-right:1px solid #c4c4c4; \n             background:#fff; \n             padding:10px 30px 30px 30px; \n             overflow:hidden; \n         } \n                      \n         div.TimetableOuterContainer { \n             padding: 5em;     \n             font-size: 92.80%;  \n             min-width: 480px; \n         } \n         div.TimetableContainer {  \n             clear:both; \n         } \n                      \n         div.Clear {  \n             clear: both; \n         } \n                      \n         table.Timetable { \n             border-collapse: collapse; \n             border: solid 2px #565; \n             padding: 0; \n             table-layout: fixed; \n             width: 100%; \n         } \n                      \n         table.Timetable td { \n             border-style: solid; \n             border-color: #586; \n             border-width: 0 1px 1px 0; \n             border-collapse: collapse; \n             font-size: 90%; \n             height:100%; \n         } \n                      \n         table.Timetable td.PeriodHeader, table.Timetable td.PeriodHeaderEven, table.Timetable td.Cell { \n             overflow: hidden; \n             -ms-text-overflow: clip; \n             text-overflow: clip; \n             white-space: nowrap; \n         } \n                      \n         table.Timetable td.DayHeader, table.Timetable td.DayHeaderEven { \n             font-weight: bold; \n             text-align: center; \n         } \n                      \n         table.Timetable td.Header, table.Timetable td.DayHeader, table.Timetable td.PeriodHeader { \n             background: #F5F5F5; \n         } \n                      \n         table.Timetable td.DayHeaderEven, table.Timetable td.PeriodHeaderEven { \n             background: #EAFACA; \n         } \n                      \n         table.Timetable td.PeriodHeader { \n             font-size: 90%; \n         } \n                      \n         table.Timetable td.Name { \n             padding: 0 2px; \n             font-size: 95%; \n             background-color: #FFF; \n             text-align:center; \n         } \n                      \n         table.Timetable td.Cell { \n             text-align: center; \n             height:100%; \n         } \n                      \n         table.Timetable td.Even { \n             background: #F0FADA; \n             height:100%; \n         } \n                      \n         table.Sub { \n             width:100%; \n             height:100%; \n         } \n                      \n         table.Sub td { \n             border:none; \n             height:100%; \n         } \n                      \n         div.SchoolTitle { \n             font-size: large; \n             padding:10px 5px; \n         } \n                      \n         div.SchoolYear { \n             padding:0 5px 5px; \n         } \n                      \n         @media print { \n              \n             div.TimetableOuterContainer, .round_border, .round_border, .round_border_layer3, .round_border_layer2, .round_border_layer1, .round_border_content {  \n                 margin: 0; padding: 0; border:none; \n             } \n                      \n             #WebViewMenu { display:none; } \n              \n             div.TimetablePage { page-break-after:always; margin:0; border-top:none; padding: 0; } \n              \n         } \n         \n</style>\n';
    };
    f.prototype.getTimetableContent = function (b, d) {
      var f, h;
      void 0 === d && (d = !0);
      var l = new g.table();
      l.cl = "Timetable";
      l.bgCol = "#FFFFFF";
      this.mcs = r.getScheduledCards(this.v().output);
      this.colMcs = {};
      this.usedCells = [];
      this.setLines();
      (f = l.trHs).push.apply(f, this.getHeaderRows());
      (h = l.trs).push.apply(h, this.getRows());
      f = '\n<div class="SchoolTitle">' + this.v().getTitle() + "</div>\n";
      h = '<div class="SchoolYear">' + this.mA._t().year + "</div>\n";
      l = '<div class="TimetableContainer">' + l.html() + "</div>\n";
      b =
        "<div" +
        (b ? "" : ' class="TimetablePage"') +
        ">" +
        f +
        h +
        l +
        "</div>\n";
      return d ? this.getTimetableBorderString(b) : b;
    };
    f.prototype.setLines = function () {
      this.lines = [];
      if (this.vTy().isClass())
        if (this.v().is1())
          for (
            var b = this.vTy().ve, d = 0, f = this.md().days;
            d < f.length;
            d++
          )
            this.lines.push(this.getLine(b, f[d].position - 1, !1));
        else
          for (b = r.getEntities(this.v()), d = b.length, f = 0; f < d; f++)
            this.lines.push(this.getLine(b[f], f, !0));
    };
    f.prototype.getLine = function (b, d, f) {
      var h = new g.line(),
        k = [];
      h.index = d;
      for (var n = 0, t = this.mcs; n < t.length; n++) {
        var p = t[n];
        ((f && p._rowI === d) || (!f && p._colI === d)) && h.mcs.push(p);
      }
      d = 0;
      for (f = h.mcs; d < f.length; d++)
        for (
          p = f[d], n = 0, p = obj.notDel(p._c.parent.groups);
          n < p.length;
          n++
        )
          ((t = p[n]),
            e.isEntire(t) ||
              arr.has(k, t.parent.position) ||
              k.push(t.parent.position));
      k.sort(function (b, d) {
        return arr.sort(b, d);
      });
      var u = e.sortNotDel(b.groupSets);
      b = function (b) {
        var d,
          f = u.find(function (d) {
            return d.position === b;
          });
        if (!f) return "continue";
        (d = h.groups).push.apply(d, e.sortNotDel(f.groups));
      };
      for (p = 0; p < k.length; p++) b(k[p]);
      k = h.groups.length;
      h.subCells = 0 === k ? 1 : k;
      return h;
    };
    f.prototype.getTimetableBorderString = function (b) {
      return (
        '<div class="TimetableOuterContainer"><div class="TimetableInnerContainer"><b class="round_border"><b class="round_border_layer3"></b><b class="round_border_layer2"></b><b class="round_border_layer1"></b></b><div class="round_border_content">' +
        b +
        '\n</div>\n<b class="round_border"><b class="round_border_layer1"></b><b class="round_border_layer2"></b><b class="round_border_layer3"></b></b></div>\n'
      );
    };
    f.prototype.getHeaderRows = function () {
      var b = [],
        d = [],
        f = new g.td(),
        h = [],
        l = this.md().daysCount,
        n = new g.tr(),
        t = this.md().periodsCount,
        p = -1;
      f.rowSpan = this.v().is1() ? 1 : 2;
      f.width = c.px(this.getNameColumnWidth());
      f.cl = "DayHeader";
      f.cnt = this.v().is1() ? "" : this.vTy().name();
      d.push(f);
      for (f = 0; f < l; f++) {
        var u = new g.td(),
          x = this.md().days[f];
        u.cnt = x.name;
        u.align = "center";
        u.cl = 0 === ++p % 2 ? "DayHeaderEven" : "DayHeader";
        x = 1;
        this.v().is1()
          ? (this.vTy().isClass() && (x = this.lines[p].subCells),
            (u.width = Math.floor(100 / l) + "%"))
          : (x = this.md().periodsCount);
        u.colSpan = x;
        d.push(u);
      }
      n.tds = d;
      b.push(n);
      d = this.v().vIn.periodFormat;
      if (!this.v().is1()) {
        for (f = 0; f < l; f++)
          for (n = 0; n < t; n++)
            ((p = this.md().periods[n]),
              (u = new g.td()),
              (u.cnt = e.periodDisplay(p, d)),
              (u.align = "center"),
              (u.cl = 0 === f % 2 ? "PeriodHeaderEven" : "PeriodHeader"),
              h.push(u));
        l = new g.tr();
        l.tds = h;
        b.push(l);
      }
      return b;
    };
    f.prototype.getRows = function () {
      var b = [],
        d = {},
        f = this.md().days,
        h = this.md().periods;
      if (this.v().is1())
        for (var l = 0; l < h.length; l++) {
          var n = h[l];
          d[str.id()] = e.periodDisplay(n, this.v().vIn.periodFormat);
        }
      else
        for (l = 0, n = r.getEntities(this.v()); l < n.length; l++) {
          var t = n[l];
          d[t.id] = t.name;
        }
      var p = -1,
        u;
      for (u in d) {
        p++;
        var x = new g.td();
        x.cnt = d[u];
        x.cl = "Name";
        x.width = c.px(this.getNameColumnWidth());
        this.v().is1() ||
          ((x.id = u),
          (x.rowSpan = this.vTy().isClass() ? this.lines[p].subCells : 1));
        l = function (d) {
          var k,
            l,
            n = new g.tr();
          0 === d && n.tds.push(x);
          for (var q = -1, t = [], u = 0, w = y.mcs; u < w.length; u++) {
            var z = w[u];
            z._rowI === p &&
              (y.v().is1() ? y.vTy().ve === y.getSingleEntity(z) : 1) &&
              t.push(z);
          }
          for (u = 0; u < f.length; u++)
            if (((w = f[u]), y.v().is1()))
              ((z = y.getColumns(
                t,
                p,
                d,
                r.getDayPosition(y.v(), w) - 1,
                ++q,
                !0,
              )),
                (k = n.tds).push.apply(k, z));
            else
              for (var D = 0; D < h.length; D++) {
                ++q;
                if (y.vTy().isClass() && !arr.has(obj.keys(y.colMcs), q + "")) {
                  var J = y.mcs.filter(function (b) {
                    return b._colI === q;
                  });
                  y.colMcs[q] = J;
                  for (var L = 0; L < J.length; L++)
                    ((z = J[L]), y.setUsed(z, q, z._rowI, y.lines[z._rowI]));
                }
                z = y.getColumns(t, p, d, w.position - 1, q, !1);
                (l = n.tds).push.apply(l, z);
              }
          b.push(n);
        };
        var y = this;
        for (n = 0; n < x.rowSpan; n++) l(n);
      }
      return b;
    };
    f.prototype.getNameColumnWidth = function () {
      return this.vTy().isClass() ? 50 : 80;
    };
    f.prototype.getColumns = function (b, d, f, h, l, n) {
      var k = this;
      n = [];
      var q,
        p = this.getUsedCells(l, d),
        x = [],
        y = this.v().is1() ? h : l;
      if (
        p.some(function (b) {
          return b.isEntire() || (!k.v().is1() && b.subIndex === f);
        })
      )
        return n;
      x = b.filter(function (b) {
        return b._colI === y;
      });
      if (this.vTy().isClass()) {
        if (
          (b = x.find(function (b) {
            return e.isEntire(b.grp());
          }))
        ) {
          if (0 !== f) return n;
          x = [b];
        }
      } else x = 0 < x.length ? [x[0]] : [];
      if (0 === x.length && !this.v().is1()) {
        b = !0;
        if (this.vTy().isClass()) {
          x = !1;
          var z = this.lines[d].subCells;
          for (q = 0; q < z; q++)
            if (
              p.some(function (b) {
                return b.subIndex === q;
              })
            ) {
              x = !0;
              b = !1;
              break;
            }
          if (!x && 0 !== f) return n;
        }
        p = new g.td();
        p.cl = this.getColumnCssClass(h);
        b && this.vTy().isClass() && this.setEntireColRowSpan(p, l, d);
        n.push(p);
        return n;
      }
      return (n = this.getTds(p, d, f, x, this.v().style, h, l));
    };
    f.prototype.setEntireColRowSpan = function (b, d, f) {
      this.v().is1()
        ? (b.colSpan = this.lines[d].subCells)
        : (b.rowSpan = this.lines[f].subCells);
    };
    f.prototype.getTds = function (b, d, f, h, l, n, p) {
      var k = [],
        q = 1,
        t;
      if (this.vTy().isClass()) {
        var y = this.lines[this.v().is1() ? p : d];
        q = this.v().is1() ? y.subCells : 1;
      }
      var z = function () {
          var q = new g.td(),
            u = arr.first(h),
            x = !1;
          if (A.vTy().isClass()) {
            if (
              A.v().is1() &&
              b.some(function (b) {
                return b.subIndex === t;
              })
            )
              return "continue";
            if (
              (u = h.find(function (b) {
                return e.isEntire(b.grp());
              }))
            )
              x = !0;
            else {
              var w = A.v().is1() ? t : f;
              if (0 < y.groups.length) {
                var z = y.groups[w];
                u = h.find(function (b) {
                  return b.grp() === z;
                });
              }
            }
          }
          if (!u)
            return ((q.cl = A.getColumnCssClass(n)), k.push(q), "continue");
          q = A.getSubColumn(u, l, n);
          A.setLen(q, u, p, d, y);
          k.push(q);
          if (x) return (A.setEntireColRowSpan(q, p, d), "break");
        },
        A = this;
      for (t = 0; t < q && "break" !== z(); t++);
      return k;
    };
    f.prototype.setLen = function (b, d, f, g, h) {
      var k = d._c.parent.length;
      this.v().is1() ? (b.rowSpan = k) : (b.colSpan = k);
      (this.v().viewType().isClass() && !this.v().is1()) ||
        this.setUsed(d, f, g, h);
    };
    f.prototype.setUsed = function (b, d, f, h) {
      var k = b._c.parent.length;
      if (!(2 > k)) {
        var n = -1;
        h && ((b = b.grp()), e.isEntire(b) || (n = h.groups.indexOf(b)));
        for (h = 1; h < k; h++)
          ((b = new g.usedCell()),
            this.v().is1()
              ? ((b.rowIndex = f + h), (b.colIndex = d))
              : ((b.colIndex = d + h), (b.rowIndex = f)),
            (b.subIndex = n),
            this.usedCells.push(b));
      }
    };
    f.prototype.getSubColumn = function (b, d, f) {
      var g = b._c.parent,
        h = d.backgroundType,
        k = new r.color("#FFFFFF", !0);
      h === e.vMod.t
        ? (k = this.getColor(g.teachers))
        : h === e.vMod.c
          ? (k = this.getColor(e.classes(g)))
          : h === e.vMod.s
            ? (k = this.getColor([g.subject]))
            : h === e.vMod.r && (k = this.getColor(b._c.rooms));
      g = k.html();
      b = this.getCellColumn(b, d, k);
      b.bgCol = g;
      b.cl = this.getColumnCssClass(f);
      return b;
    };
    f.prototype.getColor = function (b) {
      return new r.color(0 === b.length ? f.gray : b[0].color, !0);
    };
    f.prototype.getColumnCssClass = function (b) {
      return "Cell " + (0 === b % 2 ? "Even" : "Odd");
    };
    f.prototype.getCellColumn = function (b, d, f) {
      var h = new g.td();
      h.cl = "Cell";
      var k = -1,
        n,
        p = b._c,
        w = p.parent,
        u = d.entityTypes.length;
      for (n = 0; n < u; n++) {
        var x = d.entityTypes[n];
        var y = -1;
        k++;
        if (x === e.cardTextType._class || x === e.cardTextType.group)
          for (x = 0; x < w.groups.length; x++) {
            var z = w.groups[x],
              A = z.parent.parent;
            A = { name: A.name, shortName: A.shortName };
            if (this.vTy().isClass()) {
              if (e.isEntire(z) || z !== b.grp()) continue;
              A = z;
            } else
              e.isEntire(z) ||
                ((A.name += " (" + z.name + ")"),
                (A.shortName += " (" + z.shortName + ")"));
            y++;
            this.addText(h, d, k, y, A);
          }
        else if (x === e.cardTextType.teacher)
          for (x = 0; x < w.teachers.length; x++)
            ((z = w.teachers[x]), y++, this.addText(h, d, k, y, z));
        else if (x === e.cardTextType.room)
          for (x = 0; x < p.rooms.length; x++)
            ((z = p.rooms[x]), y++, this.addText(h, d, k, y, z));
        else
          x === e.cardTextType.subject &&
            (y++, this.addText(h, d, k, y, w.subject));
      }
      h.color = f.contrast().html();
      return h;
    };
    f.prototype.addText = function (b, d, f, g, h) {
      g = b.cnt;
      d = d.lengthTypes[f];
      g +=
        (g ? "<br />" : "") +
        (h ? (d === e.lengthType.name ? h.name : h.shortName) : "");
      return (b.cnt = g);
    };
    f.prototype.getSingleEntity = function (b) {
      if (b instanceof r.clMc) return e.getClass(b.grp());
      if (b instanceof r.tchMc) return b.t;
      if (b instanceof r.roomMc) return b.room;
      if (b instanceof r.sbjMc) return b.s;
    };
    f.prototype.getUsedCells = function (b, d) {
      return this.usedCells.filter(function (f) {
        return f.colIndex === b && f.rowIndex === d;
      });
    };
    f.prototype.t = function () {
      return this.mA._t();
    };
    f.prototype.v = function () {
      return this.mA._v;
    };
    f.prototype.md = function () {
      return this.v().data;
    };
    f.prototype.vTy = function () {
      return this.v().viewType();
    };
    f.gray = "#C0C0C0";
    return f;
  })();
  g.htmlExport = p;
  p = (function () {
    return function () {
      this.mcs = [];
      this.groups = [];
    };
  })();
  g.line = p;
  p = (function () {
    function f() {
      this.subIndex = -1;
    }
    f.prototype.isEntire = function () {
      return -1 === this.subIndex;
    };
    return f;
  })();
  g.usedCell = p;
  p = (function () {
    function f(b) {
      this.style = this.cnt = this.cl = this.id = "";
      this.name = b;
    }
    f.prototype.html = function () {
      var b = this.getStyle(),
        d = this.attr(),
        f = this.cl;
      return (
        "<" +
        this.name +
        (d ? " " + d : "") +
        (f ? ' class="' + f + '"' : "") +
        (b ? ' style="' + b + '"' : "") +
        ">" +
        (this.cnt || "") +
        "</" +
        this.name +
        ">"
      );
    };
    f.prototype.attr = function () {
      return this.id ? 'id="' + this.id + '"' : "";
    };
    f.prototype.getStyle = function () {
      return this.style;
    };
    return f;
  })();
  g.tag = p;
  var h = (function (f) {
    function b() {
      var b = f.call(this, "td") || this;
      b.colSpan = 1;
      b.rowSpan = 1;
      return b;
    }
    __extends(b, f);
    b.prototype.attr = function () {
      var b = [],
        g = f.prototype.attr.call(this);
      g && b.push(g);
      1 !== this.colSpan && b.push('colspan="' + this.colSpan + '"');
      1 !== this.rowSpan && b.push('rowspan="' + this.rowSpan + '"');
      this.width && b.push('width="' + this.width + '"');
      this.align && b.push('align="' + this.align + '"');
      return arr.join(b, " ");
    };
    b.prototype.html = function () {
      "" === this.cnt && (this.cnt = "&nbsp;");
      return f.prototype.html.call(this) + "\n";
    };
    b.prototype.getStyle = function () {
      var b = "";
      this.bgCol && (b += "background-color:" + this.bgCol + ";");
      this.color && (b += "color:" + this.color + ";");
      return f.prototype.getStyle.call(this) + b;
    };
    return b;
  })(p);
  g.td = h;
  h = (function (f) {
    function b() {
      var b = f.call(this, "tr") || this;
      b.tds = [];
      return b;
    }
    __extends(b, f);
    b.prototype.html = function () {
      for (var b = this.tds, g = b.length, h = "", l = 0; l < g; l++)
        h += b[l].html();
      this.cnt = h;
      return f.prototype.html.call(this) + "\n";
    };
    return b;
  })(p);
  g.tr = h;
  p = (function (f) {
    function b() {
      var b = f.call(this, "table") || this;
      b.trHs = [];
      b.trs = [];
      return b;
    }
    __extends(b, f);
    b.prototype.html = function () {
      var b,
        g = this.trs,
        h = g.length;
      var l =
        "\n<thead>" +
        arr.join(
          this.trHs.map(function (b) {
            return b.html();
          }),
          "",
        ) +
        "</thead>\n<tbody>\n";
      for (b = 0; b < h; b++) l += g[b].html();
      this.cnt = l + "</tbody>\n";
      return "\n" + f.prototype.html.call(this) + "\n";
    };
    b.prototype.getStyle = function () {
      var b = "";
      this.bgCol && (b += "background-color:" + this.bgCol + ";");
      return f.prototype.getStyle.call(this) + b;
    };
    return b;
  })(p);
  g.table = p;
})(m || (m = {}));
(function (g) {
  function p(b, d) {
    return (
      arr.join(b, d.type === g.formatType.powerSchool ? str.tab : ",", !1) +
      (d.type === g.formatType.smartSchoolCSV ? ",," : "") +
      ui.getNewLineChar()
    );
  }
  function h(b, d) {
    for (var f = "'", g = 1; g <= d; g++) f += b.position === g ? "1" : "0";
    return f;
  }
  function f(b) {
    for (var d = 0, f = 0; f < b.length; f++) {
      var g = b[f].capacity;
      g !== num.noValue && (d += g);
    }
    return d;
  }
  g.getCustomFileContent = function (b) {
    var d = b.type,
      k = b.timetable,
      q = e.daysCount(k),
      l = d === g.formatType.smartSchool,
      n = b.includePeriodTimes || l ? e.defaultPeriods(k.periods) : [];
    if (l) return g.getSmartSchoolXml(n, b);
    k = e.inCs(k);
    k = arr.groupByMany(k, [
      new arr.groupKey("teacherIds"),
      new arr.groupKey("subjectId"),
      new arr.groupKey("groupIds"),
    ]);
    if (b.includeHeader) {
      var t = b.type;
      l = b.includeGroupColumn;
      var w = b.includePeriodTimes,
        u = [];
      t === g.formatType.powerSchool
        ? u.push(
            "SchoolID",
            "Course Number",
            "Course Name",
            "Section Number",
            "TermID",
            "Teacher Number",
            "Teacher Name",
            "Room",
            "Expression",
          )
        : t === g.formatType.iSAMS
          ? u.push(
              "PeriodId",
              "Set Code",
              "Year",
              "Group",
              "Subject",
              "Teacher",
              "Room",
            )
          : t === g.formatType.stars
            ? u.push(
                "Course",
                "Section",
                "CourseName",
                "Period",
                "Cycle",
                "Capacity",
                "Gender",
                "Teacher Name",
                "Room",
                "Mapped Course",
                "Mapped Section",
                "Bell Schedule",
              )
            : ((t = t === g.formatType.siged),
              u.push("Activity number", "Class short name"),
              l && u.push("Group short name"),
              u.push(
                "Teacher short name",
                "Subject short name",
                "Room short name",
                "Day position",
                t ? "Start period position" : "Period position",
              ),
              t && u.push("End period position"));
      w && u.push("Start time", "End time");
      l = p(u, b);
    } else l = "";
    w = 0;
    u = d === g.formatType.siged;
    d = d === g.formatType.powerSchool;
    for (t = 0; t < k.length; t++)
      for (var x = 0, y = k[t].subGroups; x < y.length; x++)
        for (var z = 0, A = y[x].subGroups; z < A.length; z++) {
          var B = A[z].items;
          if (d) l += g.getPowerSchoolRow(B, b);
          else {
            ++w;
            for (var E = 0, I = B; E < I.length; E++) {
              var F = I[E];
              B = F.parent;
              var C = B.groups.slice();
              0 === C.length && C.push({ isEmpty: !0 });
              for (var G = 0; G < C.length; G++) {
                var H = C[G];
                var D = B.teachers.slice();
                0 === D.length && D.push({ isEmpty: !0 });
                for (var J = 0, L = D; J < L.length; J++) {
                  var K = L[J],
                    P = B.length;
                  for (D = 0; D < (u ? 1 : P); D++) {
                    var R = w,
                      O = B.subject,
                      M = K,
                      Q = H,
                      U = F.day,
                      N = F.period,
                      W = F.rooms,
                      S = D,
                      Z = P,
                      X = n,
                      da = q;
                    var Y = b;
                    var T = Y.type,
                      V = Y.periodCount,
                      ea = Y.includeGroupColumn,
                      aa = g.getIdsOrShorts(W, " "),
                      ka = U.position,
                      ia = N.position,
                      la = T === g.formatType.iSAMS,
                      ma = T === g.formatType.siged,
                      ja = T === g.formatType.stars;
                    T = [];
                    var ha = Q.parent ? g.getIdOrShort(e.getClass(Q)) : "",
                      ca = Q.parent ? e.getClass(Q).name : "",
                      fa = "";
                    ea &&
                      (fa = Q.isEmpty
                        ? ""
                        : e.isEntire(Q)
                          ? ""
                          : g.getIdOrShort(Q));
                    M = M.isEmpty ? "" : g.getIdOrShort(M);
                    Q = g.getIdOrShort(O);
                    S = ia + S;
                    la
                      ? (T.push(V * (ka - 1) + S + "", ha + fa, ca),
                        Y.includeGroupColumn && T.push(fa),
                        T.push(Q, M, aa))
                      : ja
                        ? T.push(
                            Q,
                            ha,
                            O.name,
                            S + "",
                            h(U, da),
                            f(W) + "",
                            "0",
                            M,
                            aa,
                            "",
                            "",
                            "A",
                          )
                        : (T.push(R + "", ha),
                          ea && T.push(fa),
                          T.push(M, Q, aa, ka + "", S + ""),
                          ma && T.push(ia + Z - 1 + ""),
                          Y.includePeriodTimes &&
                            ((R = T),
                            (O = e.short1(N)),
                            R.push(O),
                            (O = N),
                            1 < Z &&
                              !e.isCustomPeriod(N) &&
                              (O =
                                X[Math.min(X.length, N.position + Z - 1) - 1]),
                            (X = e.shortN(O)),
                            R.push(X)));
                    Y = p(T, Y);
                    l += Y;
                  }
                }
              }
            }
          }
        }
    return l;
  };
  g.getRowByColumns = p;
})(m || (m = {}));
(function (g) {
  function p(d, g) {
    d = f(d, g);
    for (var k = [], n = 0; n < d.length; n++)
      for (var q = d[n], p = 0, u = q.periodGroups; p < u.length; p++) {
        var x = u[p];
        if (!x.isHandled) {
          x = h(x, q.position, d);
          var y = x[0],
            z = y.start;
          y = y.end;
          var A = g.blockPrefix + z;
          z = z === y ? A : A + "-" + (g.blockPrefix + y);
          x =
            "(" +
            b(
              x.map(function (b) {
                return b.position;
              }),
            ) +
            ")";
          k.push(z + x);
        }
      }
    return arr.join(k, " ");
  }
  function h(b, d, f) {
    var g = [b],
      h = 0;
    for (
      f = f.filter(function (b) {
        return b.position > d;
      });
      h < f.length;
      h++
    ) {
      var k = f[h].periodGroups.find(function (d) {
        return d.start === b.start && d.end === b.end && d.length === b.length;
      });
      k && ((k.isHandled = !0), g.push(k));
    }
    return g;
  }
  function f(b, d) {
    var f = [],
      g = function (d) {
        var g = d.position,
          h = b.filter(function (b) {
            return b.day === d;
          });
        if (0 === h.length) return "continue";
        var k = [],
          l = 0;
        for (
          h = arr.groupByMany(h, [new arr.groupKey("length")]);
          l < h.length;
          l++
        ) {
          var n = h[l],
            q = n.key,
            p = n.items.sort(function (b, d) {
              return arr.sort(b.period.position, d.period.position);
            });
          n = -1;
          for (
            var t = { start: -1, end: -1, length: 1, position: g }, w = 0;
            w < p.length;
            w++
          ) {
            var C = p[w].period.position,
              G = { start: C, end: C + q - 1, length: q, position: g };
            1 === q
              ? (-1 !== n && n + 1 !== C
                  ? ((t.end = n), -1 !== n && k.push(t), (t = G))
                  : -1 === n && (t = G),
                (n = C))
              : ((n = C), -1 !== n && k.push(G));
          }
          1 === q && ((t.end = n), -1 !== n && k.push(t));
        }
        f.push({ position: d.position, periodGroups: k });
      },
      h = 0;
    for (d = e.sortNotDel(d.timetable.days); h < d.length; h++) g(d[h]);
    return f;
  }
  function b(b) {
    for (var f = -1, g = [], h = "", k = 0; k < b.length; k++) {
      var p = b[k];
      p !== f + 1 &&
        (-1 !== f && d(g, h, f), (h = f = String.fromCharCode(64 + p)));
      f = p;
    }
    d(g, h, f);
    return arr.joinComma(g);
  }
  function d(b, d, f) {
    f = -1 === f ? d : String.fromCharCode(64 + f);
    b.push(d === f ? d : d + "-" + f);
  }
  g.getPowerSchoolRow = function (b, d) {
    var f = d.termId,
      h = [];
    h.push(d.schoolId + "");
    var k = b[0].parent,
      q = k.subject,
      u = k.teachers,
      x = g.getIdsOrShorts([q]);
    d.switchSubjectNameAndShortName ? h.push(q.name, x) : h.push(x, q.name);
    k = e.classes(k, !0);
    h.push(g.getIdsOrShorts(k));
    h.push(f);
    h.push(g.getIdsOrShorts(u), arr.joinComma(e.names(u)));
    var y = [];
    b.forEach(function (b) {
      return arr.addUniques(y, b.rooms);
    });
    h.push(g.getIdsOrShorts(y));
    h.push(p(b, d));
    return g.getRowByColumns(h, d);
  };
})(m || (m = {}));
(function (g) {
  function p(h, f, b, d, k) {
    var q = obj.notDel(f.groups);
    if (0 !== q.length || k.includeEmptyClasses) {
      k = h.createElement("element");
      k.id = b.id;
      var l = h.createElement("type"),
        n = h.createTextNode("lesson");
      l.appendChild(n);
      k.appendChild(l);
      n = b.period;
      l = Math.min(d.length, n.position + f.length - 1);
      l = e.isCustomPeriod(n) ? n : d[l - 1];
      d = h.createElement("time");
      var p = h.createElement("start"),
        w = h.createElement("day"),
        u = h.createTextNode(b.day.position + "");
      w.appendChild(u);
      p.appendChild(w);
      w = h.createElement("time");
      n = h.createTextNode(e.short1(n) + ":00");
      w.appendChild(n);
      p.appendChild(w);
      d.appendChild(p);
      n = h.createElement("end");
      p = h.createElement("day");
      w = h.createTextNode(b.day.position + "");
      p.appendChild(w);
      n.appendChild(p);
      p = h.createElement("time");
      l = h.createTextNode(e.shortN(l) + ":00");
      p.appendChild(l);
      n.appendChild(p);
      d.appendChild(n);
      k.appendChild(d);
      d = h.createElement("classes");
      for (l = 0; l < q.length; l++)
        ((w = q[l]),
          (n = h.createElement("class")),
          (p = h.createElement("code")),
          (w = e.getClass(w)),
          (w = h.createCDATASection(g.getIdOrShort(w))),
          p.appendChild(w),
          n.appendChild(p),
          d.appendChild(n));
      k.appendChild(d);
      q = h.createElement("teachers");
      d = 0;
      for (l = f.teachers; d < l.length; d++)
        ((w = l[d]),
          (n = h.createElement("teacher")),
          (p = h.createElement("code")),
          (w = h.createCDATASection(g.getIdOrShort(w))),
          p.appendChild(w),
          n.appendChild(p),
          q.appendChild(n));
      k.appendChild(q);
      q = h.createElement("locations");
      d = 0;
      for (b = b.rooms; d < b.length; d++)
        ((p = b[d]),
          (l = h.createElement("location")),
          (n = h.createElement("code")),
          (p = h.createCDATASection(g.getIdOrShort(p))),
          n.appendChild(p),
          l.append(n),
          q.appendChild(l));
      k.appendChild(q);
      b = h.createElement("courses");
      q = h.createElement("course");
      d = h.createElement("code");
      h = h.createCDATASection(g.getIdOrShort(f.subject));
      d.appendChild(h);
      q.appendChild(d);
      b.appendChild(q);
      k.appendChild(b);
      return k;
    }
  }
  g.getSmartSchoolXml = function (g, f) {
    var b = obj.notDel(f.timetable.activities),
      d = document.implementation.createDocument(null, "model"),
      h = d.documentElement;
    h.setAttribute("version", "1.1.0");
    h.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema");
    h.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    h.setAttribute("source", "PrimeTimetable");
    for (var q = d.createElement("elements"), l = 0; l < b.length; l++)
      for (
        var n = b[l],
          t = 0,
          w = obj.notDel(n.cards).filter(function (b) {
            return e.isIn(b);
          });
        t < w.length;
        t++
      ) {
        var u = p(d, n, w[t], g, f);
        u && q.appendChild(u);
      }
    h.appendChild(q);
    return (
      '<?xml version="1.0" encoding="utf-8"?>' +
      new XMLSerializer().serializeToString(d)
    );
  };
})(m || (m = {}));
(function (g) {
  function p(k, l, n, q) {
    var t = "",
      u = ui.getNewLineChar(),
      x = l.type,
      y = l.entityIds,
      z = l.subEntityIds,
      C = l.subValue,
      G = filter.getTypeAndId(l.value),
      H = G[0],
      D = G[1],
      J = x === e.type.teacher,
      L = x === e.type.room,
      K = x === e.type.subject,
      P = x === e.type.class;
    G = activityFilter.getStatsActivities(obj.notDel(n.activities));
    var R = g.getPeriodsForStats(n),
      O = e.getViewEntities(n, x),
      M = filter.getTypeAndId(C);
    C = M[0];
    M = M[1];
    var Q = C === e.type.student && !!M,
      U = C === e.type.group && !!M;
    C = "";
    var N = e.getAllStudents(n);
    J && 0 < z.length && (C = e.byId(obj.notDel(n.subjects), z[0]).name);
    if (1 === y.length || Q || U)
      return (
        L || K
          ? (t = b(l, n, G, q, N, L, u))
          : P
            ? ((t = f(l, n, G, q, N, u)),
              Q
                ? (C = e.byId(N, M).name)
                : 0 < z.length && (C = e.byId(n.groups, z[0]).name))
            : J && (t = h(l, n, R, G, N, u)),
        (z = e.byId(O, y[0])),
        { content: t, fileName: w(z.name, C) }
      );
    z = "";
    z =
      H === filter.type.tags
        ? D
        : H === filter.type.capacity
          ? "Capacity" + D
          : H === filter.type.building
            ? D
            : e.getViewEntityName(x, !0);
    (D = keys.ctrl(k)) && (C = "details");
    k = w(z, C);
    O = O.filter(function (b) {
      return arr.has(y, b.id);
    });
    if (D) {
      for (l = 0; l < O.length; l++)
        ((z = O[l]),
          (G = z.id),
          (D = {
            type: x,
            entityIds: [G],
            value: filter.getValue(H, G),
            subEntityIds: [],
          }),
          (D = p(void 0, D, n, q)),
          (t += z.name + u + D.content + u));
      return { content: t, fileName: k };
    }
    n = [e.getViewEntityName(x, !1), "Activities", "Hours"];
    t += d(n, u);
    q = n = 0;
    x = !0;
    for (H = 0; H < O.length; H++)
      ((z = O[H]),
        (D = c.clone(l)),
        (D.entityIds = [z.id]),
        (D.value = filter.getValue(l.type, z.id)),
        (D = activityFilter.getFiltered(G, D)),
        (D = activityFilter.getTotal(D, R)),
        (J = D.minutes),
        (q += J.total),
        J.isExact || (x = !1),
        (z = [z.name, D.total + "", activityFilter.getHoursText(J)]),
        (t += d(z, u)),
        (n += D.total));
    l = [
      "Total",
      n + "",
      activityFilter.getHoursText({ total: q, isExact: x }),
    ];
    t += u + d(l, u);
    return { content: t, fileName: k };
  }
  function h(b, f, g, h, p, w) {
    f = "";
    var u = 0 < p.length,
      x = ["Subject", "Classes", "Activities", "Hours", "Rooms"];
    u && x.push("Students");
    f += d(x, w);
    var y = [];
    x = function (b) {
      var d = y.find(function (d) {
        return d[0] === b.subject;
      });
      d ? d[1].push(b) : y.push([b.subject, [b]]);
    };
    for (
      var z = 0,
        A = h.filter(function (d) {
          return (
            arr.hasOneEqual(d.teacherIds, b.entityIds) &&
            (0 < b.subEntityIds.length ? d.subjectId === b.subEntityIds[0] : !0)
          );
        });
      z < A.length;
      z++
    )
      ((h = A[z]), x(h));
    y.sort(function (b, d) {
      return (
        arr.sort(b[0].position, d[0].position) || -arr.sort(q(b[1]), q(d[1]))
      );
    });
    x = 0;
    z = { total: 0, isExact: !0 };
    for (A = 0; A < y.length; A++) {
      for (var B = y[A], D = B[0].name, J = 0, L = B[1]; J < L.length; J++) {
        h = L[J];
        var K = k(h),
          P = activityFilter.getTotal([h], g);
        K = [D, l(h), K + "", activityFilter.getHoursText(P.minutes), n(h)];
        u && K.push(t(h, p));
        f += d(K, w);
      }
      h = activityFilter.getTotal(B[1], g);
      B = h.minutes;
      z.total += B.total;
      B.isExact || (z.isExact = !1);
      x += h.total;
      h = [">>", "Total", h.total + "", activityFilter.getHoursText(B)];
      f += d(h, w) + w;
    }
    1 < y.length &&
      ((g = [">>", "Total", x + "", activityFilter.getHoursText(z)]),
      (f += d(g, w)));
    return f;
  }
  function f(b, f, g, h, l, q) {
    f = "";
    var p = 0 < l.length,
      u = ["Subject", "Teachers", "Activities", "Hours", "Rooms"];
    p && u.push("Students");
    f += d(u, q);
    var x = 0 < b.subEntityIds.length;
    u = 0;
    var w = { total: 0, isExact: !0 },
      y = 0;
    for (
      g = g
        .filter(function (d) {
          return (
            arr.hasOneEqual(
              e.ids(
                d.groups.map(function (b) {
                  return e.getClass(b);
                }),
              ),
              b.entityIds,
            ) && (x ? arr.hasOneEqual(d.groupIds, b.subEntityIds) : !0)
          );
        })
        .sort(function (b, d) {
          return (
            arr.sort(b.subject.position, d.subject.position) ||
            -arr.sort(k(b), k(d)) ||
            arr.sort(b.teacherIds.toString(), d.teacherIds.toString())
          );
        });
      y < g.length;
      y++
    ) {
      var z = g[y],
        A = k(z),
        B = activityFilter.getTotal([z], h).minutes,
        L = [
          z.subject.name,
          e.namesStr(z.teachers),
          A + "",
          activityFilter.getHoursText(B),
          n(z),
        ];
      p && L.push(t(z, l));
      f += d(L, q);
      u += A;
      w.total += B.total;
      B.isExact || (w.isExact = !1);
    }
    h = [">>", "Total", u + "", activityFilter.getHoursText(w)];
    return (f += d(h, q));
  }
  function b(b, f, g, h, p, w, E) {
    f = "";
    var u = 0 < p.length,
      x = [
        "Teachers",
        "Classes",
        "Activities",
        "Hours",
        w ? "Subject" : "Rooms",
      ];
    u && x.push("Students");
    f += d(x, E);
    var y = b.entityIds,
      z = [];
    b = function (b) {
      var d = b.teachers,
        f = z.find(function (b) {
          return arr.hasAll(b[0], d);
        });
      f ? f[1].push(b) : z.push([d, [b]]);
    };
    x = 0;
    for (
      var A = g.filter(function (b) {
        return w
          ? arr.hasOneEqual(b.roomIds, y) || arr.hasOneEqual(b.moreRoomIds, y)
          : arr.has(y, b.subjectId);
      });
      x < A.length;
      x++
    )
      ((g = A[x]), b(g));
    z.sort(function (b, d) {
      return (
        arr.sort(
          0 < b[0].length ? b[0][0].position : 1e3,
          0 < d[0].length ? d[0][0].position : 1e3,
        ) || -arr.sort(q(b[1]), q(d[1]))
      );
    });
    b = 0;
    x = { total: 0, isExact: !0 };
    for (A = 0; A < z.length; A++) {
      g = z[A];
      for (
        var B = e.namesStr(g[0]),
          J = 0,
          L = { total: 0, isExact: !0 },
          K = 0,
          P = g[1];
        K < P.length;
        K++
      ) {
        g = P[K];
        var R = k(g),
          O = activityFilter.getTotal([g], h).minutes;
        J += R;
        R = [
          B,
          l(g),
          R + "",
          activityFilter.getHoursText(O),
          w ? g.subject.name : n(g),
        ];
        u && R.push(t(g, p));
        f += d(R, E);
        O.isExact || (L.isExact = !1);
        L.total += O.total;
      }
      g = [">>", "Total", J + "", activityFilter.getHoursText(L)];
      f += d(g, E) + E;
      b += J;
      L.isExact || (x.isExact = !1);
      x.total += L.total;
    }
    1 < z.length &&
      ((h = [">>", "Total", b + "", activityFilter.getHoursText(x)]),
      (f += d(h, E)));
    return f;
  }
  function d(b, d, f) {
    void 0 === f && (f = !1);
    return arr.join(b, str.tab, f) + d;
  }
  function k(b) {
    return b.length * obj.notDel(b.cards).length;
  }
  function q(b) {
    for (var d = 0, f = 0; f < b.length; f++) d += k(b[f]);
    return d;
  }
  function l(b) {
    return arr.joinCommaSpace(
      b.groups.map(function (b) {
        return e.groupName(b);
      }),
    );
  }
  function n(b) {
    var d = e.namesStr(b.rooms);
    0 < b.moreRooms.length && (d += " (".concat(e.namesStr(b.moreRooms), ")"));
    return d;
  }
  function t(b, d) {
    var f = [],
      g = 0;
    for (b = b.groups; g < b.length; g++)
      for (
        var h = b[g], k = e.isEntire(h), l = e.getClass(h), n = 0, q = d;
        n < q.length;
        n++
      ) {
        var p = q[n];
        ((k && p.parent === l) || (!k && arr.has(p.groupIds, h.id))) &&
          arr.addUnique(f, p);
      }
    f.sort(function (b, d) {
      return arr.sort(b.position, d.position);
    });
    return arr.joinCommaSpace(
      f.map(function (b) {
        return b.name;
      }),
    );
  }
  function w(b, d) {
    void 0 === d && (d = "");
    b = [b, d, "report"].map(function (b) {
      return e.getSafeFileName(b);
    });
    return arr.join(b, "-", !0);
  }
  g.getStats = p;
  g.getPeriodsForStats = function (b) {
    var d = obj.notDel(b.periods);
    b = e.sortedDefaultPeriods(d);
    d = e.customPeriods(d).filter(function (b) {
      return b.showCustom;
    });
    return { defaultPeriods: b, showCustoms: d };
  };
})(m || (m = {}));
(function (g) {
  function p(b, f, g, l, n) {
    void 0 === n && (n = !0);
    var d = "";
    (b = b.find(function (b) {
      return b.day === g && b.period === l;
    })) && (d += h(b, f));
    n && (d += str.tab);
    return d;
  }
  function h(b, f) {
    f = f.viewType();
    var d = b.parent;
    return f.isClass()
      ? arr.joinCommaSpace(
          d.groups.map(function (b) {
            return e.getClass(b).name;
          }),
        )
      : f.isTeacher()
        ? arr.joinCommaSpace(
            d.teachers.map(function (b) {
              return b.name;
            }),
          )
        : f.isRoom()
          ? arr.joinComma(
              b.rooms.map(function (b) {
                return b.name;
              }),
            )
          : f.isSubject()
            ? d.subject.name
            : "";
  }
  function f(b) {
    var d = [],
      f = b.data,
      g = f.days,
      h = f.periods,
      p = f._t;
    b = function (b) {
      var f = b.period,
        k = b.day;
      if (
        !f ||
        !k ||
        !g.find(function (b) {
          return b.position === k.position;
        })
      )
        return "continue";
      for (
        var l = b.parent,
          n = l.length,
          q = function (g) {
            var k = h.find(function (b) {
              return b.position === f.position + g;
            });
            if (!k) return "continue";
            var n = obj.newChildCloneToUse(l, e.activity, p);
            n.length = 1;
            n = obj.newChildCloneToUse(b, e.card, n);
            n.period = k;
            n.periodId = k.id;
            d.push(n);
          },
          t = 0;
        t < n;
        t++
      )
        q(t);
    };
    var w = 0;
    for (f = f.cards; w < f.length; w++) b(f[w]);
    return d;
  }
  function b(b) {
    var d = b.data,
      g = d.days,
      h = d.periods,
      n = d._t,
      p = f(b),
      w = b.data.entities.slice(),
      u = b.viewType(),
      x = [];
    b = function (b) {
      for (
        var d = p.filter(function (d) {
            return d.day === b;
          }),
          f = function (f) {
            var g = [];
            d.filter(function (b) {
              return b.period === f;
            }).forEach(function (b) {
              return arr.addUniques(g, e.getEntities(b, u.entityType()));
            });
            var h = g.map(function (b) {
                return b.id;
              }),
              k = e.sortByPos(
                w.filter(function (b) {
                  return !arr.has(h, b.id);
                }),
              );
            if (0 === k.length) return "continue";
            var l = k.map(function (b) {
                return b.id;
              }),
              p = obj.newChildToUse(e.subject, n);
            p.color = e.getRandomColor();
            p.position = 1;
            var q = obj.newChildToUse(e.activity, n);
            u.isClass()
              ? (q.groups = k.map(function (b) {
                  return e.entireGroup(b);
                }))
              : u.isTeacher()
                ? ((q.teacherIds = l), (q.teachers = k))
                : u.isRoom()
                  ? ((q.roomIds = l), (q.rooms = k))
                  : u.isSubject() &&
                    (p.name = arr.joinCommaSpace(
                      k.map(function (b) {
                        return b.name;
                      }),
                    ));
            q.subject = p;
            q.subjectId = p.id;
            p = obj.newChildToUse(e.card, q);
            p.day = b;
            p.dayId = b.id;
            p.period = f;
            p.periodId = f.id;
            u.isRoom() && ((p.roomIds = l), (p.rooms = k));
            x.push(p);
          },
          g = 0;
        g < h.length;
        g++
      )
        f(h[g]);
    };
    for (d = 0; d < g.length; d++) b(g[d]);
    return x;
  }
  g.getFreeTimetable = function (d) {
    var f = "",
      g = b(d),
      h = d.data,
      n = h.days;
    h = h.periods;
    var t = ui.getNewLineChar(),
      w = str.tab;
    f += w;
    for (var u = 0; u < n.length; u++) {
      var x = n[u];
      f += x.name + str.tab;
    }
    f += t;
    for (u = 0; u < h.length; u++) {
      var y = h[u];
      f += y.position + w;
      for (var z = 0, A = n; z < A.length; z++)
        ((x = A[z]), (f += p(g, d, x, y)));
      f += t;
    }
    return f;
  };
  g.getFreeOn = function (d, f, g) {
    var h = b(d),
      k = d.data,
      q = k.days;
    k = k.periods;
    f = q.length >= f ? q[f - 1] : void 0;
    if (!f) return "Day not found";
    q = k.length >= g ? k[g - 1] : void 0;
    if (!q) return "Period not found";
    d = p(h, d, f, q, !1);
    return (
      "Available on ".concat(f.name, ", Period ").concat(g, ": ") +
      (d || "None")
    );
  };
})(m || (m = {}));
