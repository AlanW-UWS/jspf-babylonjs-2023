# Coding notes
Just setting up.

# Element 5
In Element 5, we have included the following:
* Arc Rotate Camera
* Imported Mesh
* Player Movement
* Animation

```typescript
function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
```

# Adding Links
Here is a link for BabylonJS Documentation: [BabylonJS Documentation]("https://doc.babylonjs.com")