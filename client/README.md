# verbose/client

## problems

Installing Chakra-UI's unmet peer deps:

```log
warning " > @chakra-ui/icons@2.0.12" has unmet peer dependency "@chakra-ui/system@>=2.0.0".
warning "@chakra-ui/icons > @chakra-ui/icon@3.0.12" has unmet peer dependency "@chakra-ui/system@>=2.0.0".
warning "@emotion/react > @emotion/babel-plugin@11.10.5" has unmet peer dependency "@babel/core@^7.0.0".
warning "@emotion/react > @emotion/babel-plugin > @babel/plugin-syntax-jsx@7.18.6" has unmet peer dependency "@babel/core@^7.0.0-0".
```

Fix: `yarn install --check-files`
