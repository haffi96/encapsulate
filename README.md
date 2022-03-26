
# Setup

You need:

- Node 16

Install expo

```bash
npm install --global expo-cli
```

cd to `frontend`

```bash
npm ci
```

Before running, you need to firebase settings added to `frontend`

- Create a new file called `config.js` and copy and paste in the firebase config

## VSCode

- Install react7 and eslint ext

- Make .vscode folder with `settings.json` in it

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.validate": ["javascript"]
}
```

Need XCode to run ios emulator and android studio to run android emulate.
Easier to open on browser or scan expo bar code
