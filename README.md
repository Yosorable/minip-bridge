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
<head>
  <script type="importmap">
    {
      "imports": {
        "minip-bridge": "https://cdn.jsdelivr.net/npm/minip-bridge/dist/index.mjs",
        "kysely": "https://cdn.jsdelivr.net/npm/kysely/dist/esm/index.js"
      }
    }
  </script>
</head>
<body>
  <script type="module">
    import * as minip from "minip-bridge";

    console.log(minip);
    console.log(minip.navigateTo);
  </script>
</body>
```
