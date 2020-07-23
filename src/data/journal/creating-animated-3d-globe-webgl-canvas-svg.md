---
published: 2020-07-25T12:00:00.000Z
---

# Creating an animated 3D globe using WebGL, Canvas, & SVG

This article will cover in detail the creation, development, and mathematics of the animated 3D globe featured on the [TNG FinTech website](https://www.tngfintech.com/), and also featured below in a modified example. The globe was developed using a combination of Illustrator, SVG, Node, and WebGL (using [three.js](https://threejs.org/)).

## Preparing the globe dot data

The 3D globe is primarily made up of small dots forming Earth’s basic geography. Positioning all of the dots by hand would be cumbersome. Therefore, we created the world map in Illustrator, exported it as an SVG file, and then parsed the SVG file using a simple Node app to create a JSON file of the dot coordinates (`x`, `y`).

For purposes of demonstration for this article and in the example above an [SVG world map of dots from Wikimedia Commons](https://commons.wikimedia.org/wiki/File:World_map_(blue_dots).svg). An Illustrator file of the world map is available for download here:

TBA

In the Illustrator file there are two groups. The points group is made up of many circular path layers representing the basic geography of Earth. The _countries_ group contains layers moved from the points group that represents the countries the globe will animate between.

The Illustrator file is then exported as an SVG file. It is a good idea to set the _Decimals_ options to 0 in order to reduce data size. The exported SVG file contains the two groups, _points_ and _countries_, which contain multiple `path` layers. You can view this SVG file here:

TBA

Each path layer has a cx and cy attribute, which is the centre-point coordinate for its `x` and `y` position, respectively. These coordinates are what is used to project the dots onto 3D plane, explained later in this article.

Retrieving the cx and cy attribute values and writing them into a JSON array manually is time-consuming, therefore we developed a simple Node app to parse an SVG file and output a JSON file. The JSON output contains arrays of objects with the x and y coordinates of all SVG elements. Arrays are organized by the groups from the original SVG file. You can find the Node app here:

https://www.github.com/Flamov/svg-coordinates

You can also find the exported JSON file here:

```json
{
  "points": [
    {
      "x": 489,
      "y": 153
    },
    {
      "x": 1559,
      "y": 489
    },
    {
      "x": 372,
      "y": 342
    },
    {
      "x": 1316,
      "y": 271
    },
    {
      "x": 372,
      "y": 71
    }
  ]
}
```

With this JSON file we can now use some basic mathematics to transform the 2D coordinates into 3D coordinates.

Note: the layers in the _countries_ group are named as the keys of the countries because for the TNG FinTech website the JSON file is concatenated with information from a database (matching the country keys) before being served to the client. Therefore, when exporting the SVG, make sure to set the Object IDs option to Layer Names in order to preserve the keys. In the example provided in this article, the additional information has been manually entered into the JSON file.

## Calculating spherical coordinates

To convert 2D coordinates (`x`, `y`) into 3D coordinates (`x`, `y`, `z`) we use a mathematical method called [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection#Mathematics_of_the_Mercator_projection). This takes a set of 2D coordinates and projects them into a set of 3D coordinates relative to the centre and radius of a sphere.

In the example, the `returnSphericalCoords` function takes two parameters, `latitude` and `longitude` (the `x` and `y` values in the JSON file for each dot), and returns an object of the 3D coordinates relative to the radius (`GLOBE_RADIUS`) and centre (`0, 0, 0` in the scene) of the sphere in the WebGL scene:

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

It’s important to note that the `latitude` and `longitude` values are first converted onto a 90 and 180 degree-range respectively, based on the original Illustrator document’s artboard size, before being calculated into 3D coordinates.

In the client, the JavaScript loops through both groups of 2D coordinates in the JSON data (which is served over an HTTP API) and constructs a new object of 3D coordinates. The data in this new object is used to render and position the dots in the WebGL scene.

## Rendering the dots

The globe dots were initially rendered using a small sphere geometry for each circle, but the performance was very poor with over 6,000 geometries being shown at once. Instead the points class was used, resulting in much better performance.

By default, points appear as squares. However, a sprite texture can be mapped onto the point material. To achieve this, a local canvas element was created in the document. A circle (using canvas arc rendering) was rendered in the 2D context of the canvas element, which was then used as the bitmap image in the three.js texture constructor. The texture object was then mapped onto the point material:

```js
const returnCurveCoords = (latitudeA, longitudeA, latitudeB, longitudeB) => {
  const start = returnSphericalCoords(latitudeA, longitudeA);
  const end = returnSphericalCoords(latitudeB, longitudeB);

  const midPointX = (start.x + end.x) / 2;
  const midPointY = (start.y + end.y) / 2;
  const midPointZ = (start.z + end.z) / 2;

  let distance = Math.pow(end.x - start.x, 2);
  distance += Math.pow(end.y - start.y, 2);
  distance += Math.pow(end.z - start.z, 2);
  distance = Math.sqrt(distance);

  let multipleVal = Math.pow(midPointX, 2);
  multipleVal += Math.pow(midPointY, 2);
  multipleVal += Math.pow(midPointZ, 2);
  multipleVal = Math.pow(distance, 2) / multipleVal;
  multipleVal = multipleVal * 0.7;

  const midX = midPointX + multipleVal * midPointX;
  const midY = midPointY + multipleVal * midPointY;
  const midZ = midPointZ + multipleVal * midPointZ;

  return {
    start: {
      x: start.x,
      y: start.y,
      z: start.z,
    },
    mid: {
      x: midX,
      y: midY,
      z: midZ,
    },
    end: {
      x: end.x,
      y: end.y,
      z: end.z,
    },
  };
};
```
