!(function (e, t) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define([], t)
        : "object" == typeof exports
        ? (exports.CKEditor5 = t())
        : ((e.CKEditor5 = e.CKEditor5 || {}), (e.CKEditor5.uswds_table_content_items = t()));
})(self, () =>
    (() => {
        var e = {
                "ckeditor5/src/core.js": (e, t, s) => {
                    e.exports = s("dll-reference CKEditor5.dll")("./src/core.js");
                },
                "ckeditor5/src/ui.js": (e, t, s) => {
                    e.exports = s("dll-reference CKEditor5.dll")("./src/ui.js");
                },
                "ckeditor5/src/utils.js": (e, t, s) => {
                    e.exports = s("dll-reference CKEditor5.dll")("./src/utils.js");
                },
                "dll-reference CKEditor5.dll": (e) => {
                    "use strict";
                    e.exports = CKEditor5.dll;
                },
            },
            t = {};
        function s(o) {
            var r = t[o];
            if (void 0 !== r) return r.exports;
            var a = (t[o] = { exports: {} });
            return e[o](a, a.exports, s), a.exports;
        }
        (s.d = (e, t) => {
            for (var o in t) s.o(t, o) && !s.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
        }),
            (s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
        var o = {};
        return (
            (() => {
                "use strict";
                s.d(o, { default: () => c });
                var e = s("ckeditor5/src/core.js");
                class t extends e.Command {
                    constructor(e, t) {
                        super(e), (this.attributeName = t);
                    }
                    refresh() {
                        const e = this.editor.model.document.selection.getFirstPosition().findAncestor("table");
                        (this.isEnabled = !!e), e && (this.value = e.hasAttribute(this.attributeName));
                    }
                    execute(e = {}) {
                        const t = this.editor,
                            s = this.editor.model,
                            o = t.model.document.selection,
                            r = o.getSelectedElement();
                        let a = "";
                        a = r && r.is("element", "table") ? r : o.getFirstPosition().findAncestor("table");
                        let i = !1;
                        a.hasAttribute(this.attributeName) && (i = !0),
                            s.change((e) => {
                                i ? e.removeAttribute(this.attributeName, a) : e.setAttribute(this.attributeName, !0, a);
                            });
                    }
                }
                class r extends e.Plugin {
                    static get pluginName() {
                        return "UswdsTableContentItemsEditing";
                    }
                    init() {
                        const e = this.editor;
                        e.model.schema.extend("table", { allowAttributes: ["borderless", "scrollable", "stacked", "sortable", "class"] }),
                            e.commands.add("setBorderlessClass", new t(e, "borderless")),
                            e.commands.add("setScrollableClass", new t(e, "scrollable")),
                            e.commands.add("setStackedClass", new t(e, "stacked")),
                            e.commands.add("setSortableClass", new t(e, "sortable")),
                            e.commands.add("setStripedClass", new t(e, "striped")),
                            [
                                { id: "borderless", classes: "usa-table--borderless" },
                                { id: "scrollable", classes: "usa-table--scrollable" },
                                { id: "stacked", classes: "usa-table--stacked" },
                                { id: "sortable", classes: "usa-table--sortable" },
                                { id: "striped", classes: "usa-table--striped" },
                            ].forEach((t) => {
                                e.model.schema.extend("table", { allowAttributes: t.id }), e.conversion.for("upcast").attributeToAttribute({ model: { name: "table", key: t.id, value: !0 }, view: { key: "class", value: t.classes } });
                                const s = "attribute:" + t.id + ":table";
                                e.conversion.for("downcast").add((e) => {
                                    e.on(s, (e, s, o) => {
                                        const r = o.mapper.toViewElement(s.item);
                                        o.writer.addClass(t.classes, r);
                                    });
                                }),
                                    "scrollable" === t.id &&
                                        e.conversion.for("downcast").add((e) => {
                                            e.on(s, (e, t, s) => {
                                                if ("table" === t.item.name) {
                                                    const o = s.mapper.toViewElement(t.item),
                                                        { writer: r, mapper: a } = s,
                                                        i = a.toViewPosition(t.range.start),
                                                        l = r.createContainerElement("div", { class: "usa-table-container--scrollable" });
                                                    r.insert(r.createPositionAt(l, 0), o), r.insert(i, l), e.stop();
                                                }
                                            });
                                        });
                            });
                    }
                }
                var a = s("ckeditor5/src/ui.js"),
                    i = s("ckeditor5/src/utils.js");
                class l extends e.Plugin {
                    static get pluginName() {
                        return "UswdsTableContentItemsUi";
                    }
                    init() {
                        const e = this.editor,
                            t = this.editor.t;
                        e.ui.componentFactory.add("tableUswds", (e) => {
                            const s = [
                                // { type: "switchbutton", model: { commandName: "setBorderlessClass", label: t("Borderless"), bindIsOn: !0 } },
                                // { type: "separator" },
                                // { type: "switchbutton", model: { commandName: "setScrollableClass", label: t("Scrollable"), bindIsOn: !0 } },
                                // { type: "separator" },
                                // { type: "switchbutton", model: { commandName: "setStackedClass", label: t("Stacked"), bindIsOn: !0 } },
                                { type: "separator" },
                                { type: "switchbutton", model: { commandName: "setSortableClass", label: t("Sortable"), bindIsOn: !0 } },
                                // { type: "separator" },
                                // { type: "switchbutton", model: { commandName: "setStripedClass", label: t("Striped"), bindIsOn: !0 } },
                            ];
                            return this._prepareDropdown(
                                t("USWDS Classes"),
                                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
                                s,
                                e
                            );
                        });
                    }
                    _prepareDropdown(e, t, s, o) {
                        const r = this.editor,
                            i = (0, a.createDropdown)(o),
                            l = this._fillDropdownWithListOptions(i, s);
                        return (
                            i.buttonView.set({ label: e, icon: t, tooltip: !0 }),
                            i.bind("isEnabled").toMany(l, "isEnabled", (...e) => e.some((e) => e)),
                            this.listenTo(i, "execute", (e) => {
                                r.execute(e.source.commandName), e.source instanceof a.SwitchButtonView || r.editing.view.focus();
                            }),
                            i
                        );
                    }
                    _fillDropdownWithListOptions(e, t) {
                        const s = this.editor,
                            o = [],
                            r = new i.Collection();
                        for (const e of t) n(e, s, o, r);
                        return (0, a.addListToDropdown)(e, r, s.ui.componentFactory), o;
                    }
                }
                function n(e, t, s, o) {
                    const r = (e.model = new a.Model(e.model)),
                        { commandName: i, bindIsOn: l } = e.model;
                    if ("button" === e.type || "switchbutton" === e.type) {
                        const e = t.commands.get(i);
                        s.push(e), r.set({ commandName: i }), r.bind("isEnabled").to(e), l && r.bind("isOn").to(e, "value");
                    }
                    r.set({ withText: !0 }), o.add(e);
                }
                class d extends e.Plugin {
                    static get requires() {
                        return [r, l];
                    }
                    static get pluginName() {
                        return "UswdsTableContentItems";
                    }
                }
                const c = { UswdsTableContentItems: d };
            })(),
            (o = o.default)
        );
    })()
);