# minip-bridge

## Description

JavaScript bridge package for Minip App.

Download Minip on [App Store](https://apps.apple.com/us/app/minip-editor/id6463115915)

Minip source code on [GitHub](https://github.com/Yosorable/minip)

## Quick Start

- Install with npm

```bash
npm i minip-bridge
```

```JavaScript
import {navigateTo} from "minip-bridge"
navigateTo({page: "index.html", title: "title"})
```

- Directly use in html/js file

```html
<script type="module">
  import(
    "https://cdn.jsdelivr.net/gh/yosorable/minip-bridge@main/dist/index.mjs"
  ).then((minip) => {
    console.log(minip);
    console.log(minip.navigateTo);
  });
</script>
```
