# minip-bridge

## install

```bash
npm i minip-bridge
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
