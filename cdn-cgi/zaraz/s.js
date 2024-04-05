try {
    (function(w, d) {
        zaraz.debug = (eK = "") => {
            document.cookie = `zarazDebug=${eK}; path=/`;
            location.reload()
        };
        window.zaraz._al = function(fx, fy, fz) {
            w.zaraz.listeners.push({
                item: fx,
                type: fy,
                callback: fz
            });
            fx.addEventListener(fy, fz)
        };
        zaraz.preview = (eN = "") => {
            document.cookie = `zarazPreview=${eN}; path=/`;
            location.reload()
        };
        zaraz.i = function(fZ) {
            const f$ = d.createElement("div");
            f$.innerHTML = unescape(fZ);
            const ga = f$.querySelectorAll("script");
            for (let gb = 0; gb < ga.length; gb++) {
                const gc = d.createElement("script");
                ga[gb].innerHTML && (gc.innerHTML = ga[gb].innerHTML);
                for (const gd of ga[gb].attributes) gc.setAttribute(gd.name, gd.value);
                d.head.appendChild(gc);
                ga[gb].remove()
            }
            d.body.appendChild(f$)
        };
        zaraz.f = async function(ge, gf) {
            const gg = {
                credentials: "include",
                keepalive: !0,
                mode: "no-cors"
            };
            if (gf) {
                gg.method = "POST";
                gg.body = new URLSearchParams(gf);
                gg.headers = {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
            return await fetch(ge, gg)
        };
        window.zaraz._p = async D => new Promise((E => {
            if (D) {
                D.e && D.e.forEach((F => {
                    try {
                        new Function(F)()
                    } catch (G) {
                        console.error(`Error executing script: ${F}\n`, G)
                    }
                }));
                Promise.allSettled((D.f || []).map((H => fetch(H[0], H[1]))))
            }
            E()
        }));
        zaraz.pageVariables = {};
        zaraz.__zcl = zaraz.__zcl || {};
        zaraz.track = async function(fA, fB, fC) {
            return new Promise(((fD, fE) => {
                const fF = {
                    name: fA,
                    data: {}
                };
                for (const fG of [localStorage, sessionStorage]) Object.keys(fG || {}).filter((fI => fI.startsWith("_zaraz_"))).forEach((fH => {
                    try {
                        fF.data[fH.slice(7)] = JSON.parse(fG.getItem(fH))
                    } catch {
                        fF.data[fH.slice(7)] = fG.getItem(fH)
                    }
                }));
                Object.keys(zaraz.pageVariables).forEach((fJ => fF.data[fJ] = JSON.parse(zaraz.pageVariables[fJ])));
                Object.keys(zaraz.__zcl).forEach((fK => fF.data[`__zcl_${fK}`] = zaraz.__zcl[fK]));
                fF.data.__zarazMCListeners = zaraz.__zarazMCListeners;
                //
                fF.data = { ...fF.data,
                    ...fB
                };
                fF.zarazData = zarazData;
                fetch("/cdn-cgi/zaraz/t", {
                    credentials: "include",
                    keepalive: !0,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(fF)
                }).catch((() => {
                    //
                    return fetch("/cdn-cgi/zaraz/t", {
                        credentials: "include",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(fF)
                    })
                })).then((function(fM) {
                    zarazData._let = (new Date).getTime();
                    fM.ok || fE();
                    return 204 !== fM.status && fM.json()
                })).then((async fL => {
                    await zaraz._p(fL);
                    "function" == typeof fC && fC()
                })).finally((() => fD()))
            }))
        };
        zaraz.set = function(fN, fO, fP) {
            try {
                fO = JSON.stringify(fO)
            } catch (fQ) {
                return
            }
            prefixedKey = "_zaraz_" + fN;
            sessionStorage && sessionStorage.removeItem(prefixedKey);
            localStorage && localStorage.removeItem(prefixedKey);
            delete zaraz.pageVariables[fN];
            if (void 0 !== fO) {
                fP && "session" == fP.scope ? sessionStorage && sessionStorage.setItem(prefixedKey, fO) : fP && "page" == fP.scope ? zaraz.pageVariables[fN] = fO : localStorage && localStorage.setItem(prefixedKey, fO);
                zaraz.__watchVar = {
                    key: fN,
                    value: fO
                }
            }
        };
        for (const {
                m: fR,
                a: fS
            } of zarazData.q.filter((({
                m: fT
            }) => ["debug", "set"].includes(fT)))) zaraz[fR](...fS);
        for (const {
                m: fU,
                a: fV
            } of zaraz.q) zaraz[fU](...fV);
        delete zaraz.q;
        delete zarazData.q;
        zaraz.spaPageview = () => {
            zarazData.l = d.location.href;
            zarazData.t = d.title;
            zaraz.pageVariables = {};
            zaraz.__zarazMCListeners = {};
            zaraz.track("__zarazSPA")
        };
        zaraz.fulfilTrigger = function(eB, eC, eD, eE) {
            zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
            zaraz.__zarazTriggerMap[eB] || (zaraz.__zarazTriggerMap[eB] = "");
            zaraz.__zarazTriggerMap[eB] += "*" + eC + "*";
            zaraz.track("__zarazEmpty", { ...eD,
                __zarazClientTriggers: zaraz.__zarazTriggerMap[eB]
            }, eE)
        };
        zaraz._processDataLayer = gm => {
            for (const gn of Object.entries(gm)) zaraz.set(gn[0], gn[1], {
                scope: "page"
            });
            if (gm.event) {
                if (zarazData.dataLayerIgnore && zarazData.dataLayerIgnore.includes(gm.event)) return;
                let go = {};
                for (let gp of dataLayer.slice(0, dataLayer.indexOf(gm) + 1)) go = { ...go,
                    ...gp
                };
                delete go.event;
                gm.event.startsWith("gtm.") || zaraz.track(gm.event, go)
            }
        };
        window.dataLayer = w.dataLayer || [];
        const gl = w.dataLayer.push;
        Object.defineProperty(w.dataLayer, "push", {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: function(...gq) {
                let gr = gl.apply(this, gq);
                zaraz._processDataLayer(gq[0]);
                return gr
            }
        });
        dataLayer.forEach((gs => zaraz._processDataLayer(gs)));
        zaraz._cts = () => {
            zaraz._timeouts && zaraz._timeouts.forEach((gj => clearTimeout(gj)));
            zaraz._timeouts = []
        };
        zaraz._rl = function() {
            w.zaraz.listeners && w.zaraz.listeners.forEach((gk => gk.item.removeEventListener(gk.type, gk.callback)));
            window.zaraz.listeners = []
        };
        history.pushState = function() {
            try {
                zaraz._rl();
                zaraz._cts && zaraz._cts()
            } finally {
                History.prototype.pushState.apply(history, arguments);
                setTimeout(zaraz.spaPageview, 100)
            }
        };
        history.replaceState = function() {
            try {
                zaraz._rl();
                zaraz._cts && zaraz._cts()
            } finally {
                History.prototype.replaceState.apply(history, arguments);
                setTimeout(zaraz.spaPageview, 100)
            }
        };
        zaraz._c = ed => {
            const {
                event: ee,
                ...ef
            } = ed;
            zaraz.track(ee, { ...ef,
                __zarazClientEvent: !0
            })
        };
        zaraz._syncedAttributes = ["altKey", "clientX", "clientY", "pageX", "pageY", "button"];
        zaraz.__zcl.track = !0;
        zaraz._p({
            "e": ["(function(w,d){w.zarazData.executed.push(\"Pageview\");})(window,document)", "const d = document.createElement('div');d.innerHTML = ``;document.body.appendChild(d);", "const el = document.createElement('script');Object.entries(JSON.parse(`{\"async\":\"\",\"src\":\"https://analytics.umami.is/script.js\",\"data-website-id\":\"f042c72a-b07e-4817-a979-faa29d94c640\"}`)).forEach(([k, v]) => {el.setAttribute(k, v);});document.head.appendChild(el);"]
        })
    })(window, document)
} catch (e) {
    throw fetch("/cdn-cgi/zaraz/t"), e;
}