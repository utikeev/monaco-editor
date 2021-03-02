
monaco.languages.register({ id: 'mySpecialLanguage' });

monaco.languages.registerHoverProvider('mySpecialLanguage', {
  provideHover: function (model, position, token, context) {
    return xhr('playground.generated/index.html').then(function (res) {
      const modifiers = context.keyModifiers;

      if (context.source === 2) {
        console.log(position);
        return {
          range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
          contents: [ { value: '<a href="https://google.com">Secret link</a>', sanitized: true, rendered: true }]
        }
      }

      let text = '';
      if (modifiers.includes(monaco.KeyMod.CtrlCmd)) {
        text += 'CtrlCmd';
      }
      if (modifiers.includes(monaco.KeyMod.Alt)) {
        text += 'Alt';
      }
      if (modifiers.includes(monaco.KeyMod.Shift)) {
        text += 'Shift';
      }
      if (modifiers.includes(monaco.KeyMod.WinCtrl)) {
        text += 'WinCtrl';
      }

      const contents = [
        { value: '[Show more](command:editor.action.showHover?{"position":{"lineNumber":1,"column":5},"sticky":true})', isTrusted: true },
        { value: 'Modifiers: ' + text },
        { value: '**SOURCE**' },
        { value: '```html\n' + res.responseText.substring(0, 200) + '\n```' },
        { value: '' +
              '<span>hello</span>' +
              '<br/>' +
              '<span>it\'s me</span>' +
              '<table><tr><th>1</th><th>2</th></tr><tr><td>a</td><td>b</td></tr></table>', sanitized: true }
      ];
      return {
        range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
        contents: contents,
      }
    });
  }
});

monaco.editor.create(document.getElementById("container"), {
	value: '\n\nHover over this text',
	language: 'mySpecialLanguage'
});

function xhr(url) {
	var req = null;
	return new Promise(function (c, e) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req._canceled) { return; }

			if (req.readyState === 4) {
				if ((req.status >= 200 && req.status < 300) || req.status === 1223) {
					c(req);
				} else {
					e(req);
				}
				req.onreadystatechange = function () { };
			}
		};

		req.open("GET", url, true);
		req.responseType = "";

		req.send(null);
	}, function () {
		req._canceled = true;
		req.abort();
	});
}
