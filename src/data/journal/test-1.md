---
title: Test article 1
slug: test-article-1
description: This is a test article 1
published: 25th September 2020
updated: 26th November 2020
tags:
  - Development
---

# Test Article 1

Lorem ipsum dolor sit amet, _consectetur adipiscing elit_. *Aenean pharetra eros purus*, nec suscipit justo mollis et. _*Nunc semper vulputate blandit*_. Vivamus ac ipsum nec [lorem varius molestie](https://flamov.com).

Suspendisse tincidunt tincidunt tellus lacinia aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce vulputate rhoncus lacinia. Nunc lacinia turpis vitae efficitur interdum. ~Duis faucibus vel diam a sodales~.

Curabitur tempus, tortor pellentesque blandit venenatis, orci velit ultrices libero, id cursus magna magna sed velit. Integer aliquam pulvinar mauris, nec aliquam quam scelerisque id. Proin maximus sapien eu tristique finibus. Fusce nec commodo orci. Mauris at facilisis odio, in hendrerit lorem. Nullam commodo maximus pulvinar. Ut auctor sollicitudin semper.

## Test subheader 1

Vestibulum at malesuada nisi. Nam viverra nulla vitae dolor volutpat, vitae rutrum risus pellentesque. Sed eget luctus purus, at fringilla ante.

```js
const returnSphericalCoords = (latitude, longitude) => {
  latitude = ((latitude - MAP_WIDTH) / MAP_WIDTH) * -180;
  longitude = ((longitude - MAP_HEIGHT) / MAP_HEIGHT) * -90;

  const radius = Math.cos(longitude / 180 * Math.PI) * GLOBE_RADIUS;
  const x = Math.cos(latitude / 180 * Math.PI) * radius;
  const y = Math.sin(longitude / 180 * Math.PI) * GLOBE_RADIUS;
  const z = Math.sin(latitude / 180 * Math.PI) * radius;

  return { x, y, z };
};
```

### Test subheader 2

Proin vehicula dignissim dui eu molestie. Mauris quis metus at felis ullamcorper venenatis.

#### Test subheader 3

Nunc vitae dictum turpis, condimentum aliquet nulla.
