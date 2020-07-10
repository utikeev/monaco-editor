monaco.languages.registerDefinitionProvider('python', {
    provideDefinition(model, position, token) {
        if (position.lineNumber === 4) {
            return [{
                uri: model.uri,
                range: new monaco.Range(1, 5, 1, 8),
            }];
        }
    }
})

const editor = monaco.editor.create(document.getElementById("container"), {
    value: "def foo():\n  pass\n\nfoo()",
    language: "python"
});
