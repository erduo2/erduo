!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
            ? define(t)
            : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).CCLogin =
                t());
})(this, function () {
    'use strict';
    var e = ['www.ccwork.com.cn', '360.com'],
        t = {
            sso: '/wwopen/sso/qrConnect',
            tww: 'https://www.ccwork.com.cn/',
            native: '/native/sso/qrConnect',
            twxg: 'https://www.ccwork.com.cn/',
        },
        n = '1.2.7';
    return (function () {
        function o(e) {
            (this.options = e), (this.options = e), this.createFrame();
        }
        return (
            (o.prototype.destroyed = function () {
                console.log('ccwork had destroyed.'),
                    window.removeEventListener('message', this.onPostMessage);
            }),
            (o.prototype.getUrl = function (e) {
                var o = [];
                Object.keys(e).forEach(function (t) {
                    var n = e[t];
                    [void 0, null].indexOf(n) > -1 ||
                        (-1 !== ['string', 'number', 'boolean'].indexOf(typeof n) &&
                            'id' !== t &&
                            o.push(''.concat(t, '=').concat(n)));
                }),
                    o.push('version='.concat(n)),
                    o.push('login_type=jssdk');
                var s = t[e.business_type || 'sso'];
                if (!s)
                    throw new Error(
                        'Argument business_type not match. Current version is '.concat(
                            n,
                            '.'
                        )
                    );
                var i = 'https://www.ccwork.com.cn/';
                return (
                    /tencent\.com$/.test(window.location.host) &&
                    (i = 'https://www.ccwork.com.cn/'),
                    ''.concat(i).concat(s, '?').concat(o.join('&'))
                );
            }),
            (o.prototype.createFrame = function () {
                var e = this;
                if (this.options.is_mobile)
                    window.location.href = this.getUrl(this.options);
                else {
                    this.frame = document.createElement('iframe');
                    console.log('this', this)
                    const appid = this.options.appid || null;
                    const redirect_uri = this.options.redirect_uri;
                    const project_url = this.options.server_ip;
                    const lang = this.options.lang;
                    const app_name = this.options.app_name;
                    const self_redirect = this.options.self_redirect;
                    const cid = this.options.cid;
                    var t = document.getElementById(this.options.id);
                    (this.frame.src = `${project_url}:8282/fed/extra-page/scancode.html?appid=${encodeURIComponent(appid)}&redirect_uri=${encodeURIComponent(redirect_uri)}&app_name=${encodeURIComponent(app_name)}&lang=${lang}&self_redirect=${JSON.stringify(self_redirect)}&cid=${encodeURIComponent(cid)}&project_url=${encodeURIComponent(project_url)}`),
                        (this.frame.sandbox = "allow-scripts allow-top-navigation allow-same-origin"),
                        (this.frame.frameBorder = '0'),
                        (this.frame.allowTransparency = 'true'),
                        (this.frame.scrolling = 'no'),
                        (this.frame.width = '300px'),
                        (this.frame.height = '400px'),
                        (t.innerHTML = ''),
                        t.appendChild(this.frame),
                        (this.frame.onload = function () {
                            e.frame.contentWindow.postMessage &&
                                window.addEventListener &&
                                (window.addEventListener('message', e.onPostMessage),
                                    e.frame.contentWindow.postMessage('ask_usePostMessage', '*'));
                        });
                }
            }),
            (o.prototype.onPostMessage = function (t) {
                if (
                    e.filter(function (e) {
                        return new RegExp(''.concat(e, '$')).test(t.origin);
                    }).length
                ) {
                    var n = t.data;
                    n &&
                        'string' == typeof n &&
                        /^http/.test(n) &&
                        (window.location.href = n);
                }
            }),
            o
        );
    })();
});
