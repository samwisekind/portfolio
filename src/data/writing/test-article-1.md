---
title: Test Article 1
blurb: A test article (#1)
published: 2019-09-25
---

# Test Article 1

Lorem ipsum dolor sit amet, _consectetur adipiscing elit_. *Aenean pharetra eros purus*, nec suscipit justo mollis et. _*Nunc semper vulputate blandit*_. Vivamus ac ipsum nec [lorem varius molestie](https://flamov.com).

Suspendisse tincidunt tincidunt tellus lacinia aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce vulputate rhoncus lacinia. Nunc lacinia turpis vitae efficitur interdum. ~Duis faucibus vel diam a sodales~.

> Nunc ut varius metus. Fusce nec maximus eros. Mauris quis mollis erat, vel mattis nunc. Integer lacinia consectetur elementum. In accumsan luctus tortor sit amet eleifend. Fusce sed eros et est ullamcorper bibendum eu vitae lectus.
> 
> Nulla quis ex ut tellus ornare venenatis. Nullam vitae turpis fringilla, porta lacus nec, malesuada magna. Pellentesque et leo sapien.

Curabitur tempus, tortor pellentesque blandit venenatis, orci velit ultrices libero, id cursus magna magna sed velit. Integer aliquam pulvinar mauris, nec aliquam quam scelerisque id. Proin maximus sapien eu tristique finibus. Fusce nec commodo orci. Mauris at facilisis odio, in hendrerit lorem. Nullam commodo maximus pulvinar. Ut auctor sollicitudin semper.

## Test subheader (depth 2)

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

Donec malesuada sagittis tellus, ac egestas lorem blandit finibus. Vivamus a bibendum mauris, vitae vulputate neque. Donec semper finibus consectetur.

### Test subheader (depth 3)

Proin vehicula dignissim dui eu molestie. Mauris quis metus at felis ullamcorper venenatis.

#### Test subheader (depth 4)

Nunc vitae dictum turpis, condimentum aliquet nulla.

##### Test subheader (depth 5)

Phasellus euismod turpis ut arcu pretium scelerisque.

###### Test subheader (depth 6)

Vivamus quis imperdiet nunc.
