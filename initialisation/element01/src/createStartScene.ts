//-----------------------------------------------------
//TOP OF CODE - IMPORTING BABYLONJS
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    Vector4,
    HemisphericLight,
    SpotLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Color3,
    Space,
  } from "@babylonjs/core";
  //----------------------------------------------------
  
  //----------------------------------------------------
  //MIDDLE OF CODE - FUNCTIONS
  function createBox(scene: Scene, px: number, py: number, pz: number, sx: number, sy: number, sz: number) {
    let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position = new Vector3(px, py, pz);
    box.scaling = new Vector3(sx, sy, sz);
    //Old position without the parameters
    //This will add every 'createBox' generated in the same position
    //box.position.y = 3;
    scene.registerAfterRender(function () {
      box.rotate(new Vector3(4, 8, 2)/*axis*/, 0.02/*angle*/, Space.LOCAL);
    });
    return box;
  }

  //faced box function
  function createFacedBox(scene: Scene, px: number, py: number, pz: number) {
    const mat = new StandardMaterial("mat");
    const texture = new Texture("https://assets.babylonjs.com/environments/numbers.jpg");
    mat.diffuseTexture = texture;

    var columns = 6;
    var rows = 1;

    const faceUV = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    const options = {
        faceUV: faceUV,
        wrap: true
    };

    let box = MeshBuilder.CreateBox("tiledBox", options, scene);
    box.material = mat;
    box.position = new Vector3(px, py, pz);

    scene.registerAfterRender(function () {
        box.rotate(new Vector3(2, 6, 4)/*axis*/, 0.02/*angle*/, Space.LOCAL);
    });
    return box;
  }


  function createAnyLight(scene: Scene, index: number, px: number, py: number, pz: number, colX: number, colY: number, colZ: number) {
    switch (index) {
      case 1: //hemispheric light
        const hemiLight = new HemisphericLight("hemiLight", new Vector3(px, py, pz), scene);
        hemiLight.intensity = 0.1;
        return hemiLight;
        break;
      case 2: //spot light
        const spotLight = new SpotLight("spotLight", new Vector3(px, py, pz), new Vector3(0, -1, 0), Math.PI / 2, 10, scene);
        spotLight.diffuse = new Color3(colX, colY, colZ); //0.39, 0.44, 0.91
        return spotLight;
        break;
      case 3: //other light
        break;
    }
  }
  //PREVIOUS METHODS
  // function createLight(scene: Scene) {
  //   const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  //   light.intensity = 0.7;
  //   return light;
  // }

  // function createSpotLight(scene: Scene, px: number, py: number, pz: number) {
  //   var light = new SpotLight("spotLight", new Vector3(-1, 1, -1), new Vector3(0, -1, 0), Math.PI / 2, 10, scene);
  //   light.diffuse = new Color3(0.39, 0.44, 0.91);
	//   light.specular = new Color3(0.22, 0.31, 0.79);
  //   return light;
  // }
  
  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 1;
    return sphere;
  }
  
  function createGround(scene: Scene, w: number, h: number) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: w, height: h },
      scene,
    );
    return ground;
  }
  
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
  //----------------------------------------------------------
  
  //----------------------------------------------------------
  //BOTTOM OF CODE - MAIN RENDERING AREA FOR YOUR SCENE
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      box?: Mesh;
      faceBox?: Mesh;
      light?: Light;
      spotlight?: SpotLight;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
      threeDText?: Text;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    that.scene.debugLayer.show();
  
    //createBox(scene, posX, posY, posZ, scalX, scalY, scalZ)
    that.box = createBox(that.scene, -5, 2, 0, 3, 2, 1);
    that.light = createAnyLight(that.scene, 2, -5, 5, 0, 0.39, 0.44, 0.91);
    //Scene Lighting
    //that.light = createAnyLight(that.scene, 1, 12, 3, 0, 0, 0, 0);
    //shape 1 and light
    that.faceBox = createFacedBox(that.scene, -10, 2, 0);
    that.light = createAnyLight(that.scene, 2, -10, 5, 0, 0.39, 0.44, 0.91);
    //that.spotlight = createSpotLight(that.scene, 0, 6, 0);
    //that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene, 30, 10);
    that.camera = createArcRotateCamera(that.scene);
    return that;
  }
  //----------------------------------------------------