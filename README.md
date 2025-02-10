# minip-bridge

## install

```bash
npm i minip-bridge
```

```JavaScript
import {navigateTo} from "minip-bridge"
navigateTo({page: "index.html", title: "title"})
```

## directly use in html/js file

```html
<script>
  import(
    "https://cdn.jsdelivr.net/gh/yosorable/minip-bridge@main/dist/index.mjs"
  ).then((minip) => {
    console.log(minip);
    console.log(minip.navigateTo);
  });
</script>
```
