function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

monaco.languages.registerSignatureHelpProvider('python', {
  signatureHelpTriggerCharacters: [",", "("],
  provideSignatureHelp(model, position, token, context) {
    return new Promise(resolve => setTimeout(resolve, getRandomArbitrary(0, 3000)))
        .then(() => {
          if (model.getWordAtPosition(position.delta(0, -3))?.word === "foo") {
            return {
              value: {
                signatures: [{
                  label: "Fetched",
                  parameters: []
                }],
                activeSignature: 0,
                activeParameter: 0,
              },
              dispose: () => {}
            };
          } else {
            return null;
          }
        });
  }
});

const editor = monaco.editor.create(document.getElementById("container"), {
  value: "def foo(a, b, c):\n  pass\n\nfoo()",
  language: "python",
  parameterHints: {
    verbose: true,
  },
});
