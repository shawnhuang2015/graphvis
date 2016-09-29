
class MyVector {

  static times(k: number, v: MyVector) { return new MyVector(k * v.x, k * v.y, k * v.z); }
  static minus(v1: MyVector, v2: MyVector) { return new MyVector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z); }
  static plus(v1: MyVector, v2: MyVector) { return new MyVector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z); }
  static dot(v1: MyVector, v2: MyVector) { return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; }
  static mag(v: MyVector) { return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); }
  static norm(v: MyVector) {
    let mag = MyVector.mag(v);
    let div = (mag === 0) ? Infinity : 1.0 / mag;
    return MyVector.times(div, v);
  }
  static cross(v1: MyVector, v2: MyVector) {
    return new MyVector(v1.y * v2.z - v1.z * v2.y,
      v1.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x);
  }

  constructor(public x: number,
    public y: number,
    public z: number) {
  }
}

class MyColor {

  static white = new MyColor(1.0, 1.0, 1.0);
  static grey = new MyColor(0.5, 0.5, 0.5);
  static black = new MyColor(0.0, 0.0, 0.0);
  static background = MyColor.black;
  static defaultMyColor = MyColor.black;

  static scale(k: number, v: MyColor) { return new MyColor(k * v.r, k * v.g, k * v.b); }
  static plus(v1: MyColor, v2: MyColor) { return new MyColor(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b); }
  static times(v1: MyColor, v2: MyColor) { return new MyColor(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b); }

  static toDrawingMyColor(c: MyColor) {
    let legalize = d => d > 1 ? 1 : d;
    return {
      r: Math.floor(legalize(c.r) * 255),
      g: Math.floor(legalize(c.g) * 255),
      b: Math.floor(legalize(c.b) * 255)
    };
  }

  constructor(public r: number,
    public g: number,
    public b: number) {
  }
}

class MyCamera {
  public forward: MyVector;
  public right: MyVector;
  public up: MyVector;

  constructor(public pos: MyVector, lookAt: MyVector) {
    let down = new MyVector(0.0, -1.0, 0.0);
    this.forward = MyVector.norm(MyVector.minus(lookAt, this.pos));
    this.right = MyVector.times(1.5, MyVector.norm(MyVector.cross(this.forward, down)));
    this.up = MyVector.times(1.5, MyVector.norm(MyVector.cross(this.forward, this.right)));
  }
}

interface Ray {
  start: MyVector;
  dir: MyVector;
}

interface Intersection {
  thing: Thing;
  ray: Ray;
  dist: number;
}

interface Surface {
  diffuse: (pos: MyVector) => MyColor;
  specular: (pos: MyVector) => MyColor;
  reflect: (pos: MyVector) => number;
  roughness: number;
}

interface Thing {
  intersect: (ray: Ray) => Intersection;
  normal: (pos: MyVector) => MyVector;
  surface: Surface;
}

interface Light {
  pos: MyVector;
  Mycolor: MyColor;
}

interface Scene {
  things: Thing[];
  lights: Light[];
  Mycamera: MyCamera;
}

class Sphere implements Thing {
  public radius2: number;

  constructor(public center: MyVector, radius: number, public surface: Surface) {
    this.radius2 = radius * radius;
  }
  normal(pos: MyVector): MyVector { return MyVector.norm(MyVector.minus(pos, this.center)); }
  intersect(ray: Ray): any {
    let eo = MyVector.minus(this.center, ray.start);
    let v = MyVector.dot(eo, ray.dir);
    let dist = 0;
    if (v >= 0) {
      let disc = this.radius2 - (MyVector.dot(eo, eo) - v * v);
      if (disc >= 0) {
        dist = v - Math.sqrt(disc);
      }
    }
    if (dist === 0) {
      return null;
    } else {
      return { thing: this, ray: ray, dist: dist };
    }
  }
}

class Plane implements Thing {
  public normal: (pos: MyVector) => MyVector;
  public intersect: (ray: Ray) => Intersection;
  constructor(norm: MyVector, offset: number, public surface: Surface) {
    this.normal = function(pos: MyVector) { return norm; }
    this.intersect = function(ray: Ray): Intersection {
      let denom = MyVector.dot(norm, ray.dir);
      if (denom > 0) {
        return null;
      } else {
        let dist = (MyVector.dot(norm, ray.start) + offset) / (-denom);
        return { thing: this, ray: ray, dist: dist };
      }
    }
  }
}

module Surfaces {
  export let shiny: Surface = {
    diffuse: function(pos) { return MyColor.white; },
    specular: function(pos) { return MyColor.grey; },
    reflect: function(pos) { return 0.7; },
    roughness: 250
  }
  export let checkerboard: Surface = {
    diffuse: function(pos) {
      if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
        return MyColor.white;
      } else {
        return MyColor.black;
      }
    },
    specular: function(pos) { return MyColor.white; },
    reflect: function(pos) {
      if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
        return 0.1;
      } else {
        return 0.7;
      }
    },
    roughness: 150
  };
}


class RayTracer {
  private maxDepth = 10;

  private intersections(ray: Ray, scene: Scene) {
    let closest = +Infinity;
    let closestInter: Intersection = undefined;
    for (let i in scene.things) {
      if ({}.hasOwnProperty.call(scene.things, i)) {
        let inter = scene.things[i].intersect(ray);
        if (inter != null && inter.dist < closest) {
          closestInter = inter;
          closest = inter.dist;
        }
      }
    }
    return closestInter;
  }

  private testRay(ray: Ray, scene: Scene) {
    let isect = this.intersections(ray, scene);
    if (isect != null) {
      return isect.dist;
    } else {
      return undefined;
    }
  }

  private traceRay(ray: Ray, scene: Scene, depth: number): MyColor {
    let isect = this.intersections(ray, scene);
    if (isect === undefined) {
      return MyColor.background;
    } else {
      return this.shade(isect, scene, depth);
    }
  }

  private shade(isect: Intersection, scene: Scene, depth: number) {
    let d = isect.ray.dir;
    let pos = MyVector.plus(MyVector.times(isect.dist, d), isect.ray.start);
    let normal = isect.thing.normal(pos);
    let reflectDir = MyVector.minus(d, MyVector.times(2, MyVector.times(MyVector.dot(normal, d), normal)));
    let naturalMyColor = MyColor.plus(MyColor.background,
      this.getNaturalMyColor(isect.thing, pos, normal, reflectDir, scene));
    let reflectedMyColor = (depth >= this.maxDepth) ? MyColor.grey : this.getReflectionMyColor(isect.thing, pos, normal, reflectDir, scene, depth);
    return MyColor.plus(naturalMyColor, reflectedMyColor);
  }

  private getReflectionMyColor(thing: Thing, pos: MyVector, normal: MyVector, rd: MyVector, scene: Scene, depth: number) {
    return MyColor.scale(thing.surface.reflect(pos), this.traceRay({ start: pos, dir: rd }, scene, depth + 1));
  }

  private getNaturalMyColor(thing: Thing, pos: MyVector, norm: MyVector, rd: MyVector, scene: Scene) {
    let addLight = (col, light) => {
      let ldis = MyVector.minus(light.pos, pos);
      let livec = MyVector.norm(ldis);
      let neatIsect = this.testRay({ start: pos, dir: livec }, scene);
      let isInShadow = (neatIsect === undefined) ? false : (neatIsect <= MyVector.mag(ldis));
      if (isInShadow) {
        return col;
      } else {
        let illum = MyVector.dot(livec, norm);
        let lMycolor = (illum > 0) ? MyColor.scale(illum, light.Mycolor)
          : MyColor.defaultMyColor;
        let specular = MyVector.dot(livec, MyVector.norm(rd));
        let sMycolor = (specular > 0) ? MyColor.scale(Math.pow(specular, thing.surface.roughness), light.Mycolor)
          : MyColor.defaultMyColor;
        return MyColor.plus(col, MyColor.plus(MyColor.times(thing.surface.diffuse(pos), lMycolor),
          MyColor.times(thing.surface.specular(pos), sMycolor)));
      }
    }
    return scene.lights.reduce(addLight, MyColor.defaultMyColor);
  }

  render(scene, ctx, screenWidth, screenHeight) {
    let getPoint = (x, y, Mycamera) => {
      let recenterX = reX => (reX - (screenWidth / 2.0)) / 2.0 / screenWidth;
      let recenterY = reY => - (reY - (screenHeight / 2.0)) / 2.0 / screenHeight;
      return MyVector.norm(MyVector.plus(Mycamera.forward, MyVector.plus(MyVector.times(recenterX(x), Mycamera.right), MyVector.times(recenterY(y), Mycamera.up))));
    };
    for (let y = 0; y < screenHeight; y++) {
      for (let x = 0; x < screenWidth; x++) {
        let Mycolor = this.traceRay({ start: scene.Mycamera.pos, dir: getPoint(x, y, scene.Mycamera) }, scene, 0);
        let c = MyColor.toDrawingMyColor(Mycolor);
        ctx.fillStyle = "rgb(" + String(c.r) + ", " + String(c.g) + ", " + String(c.b) + ")";
        ctx.fillRect(x, y, x + 1, y + 1);
      }
    }
  }
}


function defaultScene(): Scene {
  return {
    things: [new Plane(new MyVector(0.0, 1.0, 0.0), 0.0, Surfaces.checkerboard),
      new Sphere(new MyVector(0.0, 1.0, -0.25), 1.0, Surfaces.shiny),
      new Sphere(new MyVector(-1.0, 0.5, 1.5), 0.5, Surfaces.shiny)],
    lights: [{ pos: new MyVector(-2.0, 2.5, 0.0), Mycolor: new MyColor(0.49, 0.07, 0.07) },
      { pos: new MyVector(1.5, 2.5, 1.5), Mycolor: new MyColor(0.07, 0.07, 0.49) },
      { pos: new MyVector(1.5, 2.5, -1.5), Mycolor: new MyColor(0.07, 0.49, 0.071) },
      { pos: new MyVector(0.0, 3.5, 0.0), Mycolor: new MyColor(0.21, 0.21, 0.35) }],
    Mycamera: new MyCamera(new MyVector(3.0, 1.0, 4.0), new MyVector(-1.0, 0.5, 0.0))
  };
}

let canv = document.createElement("canvas");
let tmp: Scene = defaultScene();

canv.width = 256;
canv.height = 256;
document.body.appendChild(canv);
let ctx = canv.getContext("2d");
let rayTracer = new RayTracer();
rayTracer.render(tmp, ctx, canv.width, canv.height);


let tmpX = 3.0;
let tmpY = 1.0;
let tmpZ = 4.0;

document.onkeypress = function(e: any) {
  console.log(e);
  switch (e.key) {
    case "w":
      tmpY -= 0.3;
      tmp.Mycamera = new MyCamera(new MyVector(tmpX, tmpY, tmpZ), new MyVector(-1.0, 0.5, 0.0))
      rayTracer.render(tmp, ctx, canv.width, canv.height);
      break;

    case "s":
      tmpY += 0.3
      tmp.Mycamera = new MyCamera(new MyVector(tmpX, tmpY, tmpZ), new MyVector(-1.0, 0.5, 0.0))
      rayTracer.render(tmp, ctx, canv.width, canv.height);
      break;

    case "a":
      tmpX -= 0.3;
      tmp.Mycamera = new MyCamera(new MyVector(tmpX, tmpY, tmpZ), new MyVector(-1.0, 0.5, 0.0))
      rayTracer.render(tmp, ctx, canv.width, canv.height);
      break;

    case "d":
      tmpX += 0.3;
      tmp.Mycamera = new MyCamera(new MyVector(tmpX, tmpY, tmpZ), new MyVector(-1.0, 0.5, 0.0))
      rayTracer.render(tmp, ctx, canv.width, canv.height);
      break;
  }
};


