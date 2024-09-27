# 自定义材质

## 1.流动线材质

> 参数解释

1. `color`: Cesium.Color 类型，定义航线的颜色。

2. `duration`: 数字类型，定义动画的持续时间（以毫秒为单位）。这控制了动画效果的速度

3. `trailPercentage`: 数字类型，范围从 0 到 1，定义尾迹的长度。值越大，尾迹越长。

4. `glowIntensity`: 数字类型，范围从 0 到 1，定义发光效果的强度。值越大，发光效果越强

> 主要函数

- `constructor`: 初始化材质属性，设置默认值，并将自定义材质添加到 Cesium 的材质缓存中。

- `isConstant`: getter 方法，始终返回 false，因为这是一个动态变化的材质

- `definitionChanged`: getter 方法，返回一个 `Cesium.Event` 对象，用于通知材质定义的变化。

* `getType`: 返回材质类型的字符串标识符。

* `getValue`: 根据给定的时间计算并返回材质的当前属性值。

* `equals`: 比较两个 `AirlinePathMaterialProperty` 实例是否相等。

* `getShaderSource`: 静态方法，返回 GLSL 着色器源代码，定义了材质的视觉效果。

::: code-group

```typescript [AirlinePathMaterialProperty.ts]
import * as Cesium from "cesium";

/**
 * 定义 AirlinePathMaterialProperty 的构造函数选项
 */
interface AirlinePathOptions {
  color?: Cesium.Color; // 航线颜色
  duration?: number; // 动画持续时间（毫秒）
  trailPercentage?: number; // 尾迹长度百分比（0-1）
  glowIntensity?: number; // 发光强度（0-1）
}

/**
 * AirlinePathMaterialProperty 类
 * 用于创建自定义的飞机航线材质，实现动画和发光效果
 */
export class AirlinePathMaterialProperty {
  private _definitionChanged: Cesium.Event;
  private _color: Cesium.Property | undefined;
  private _colorSubscription: Cesium.Event.RemoveCallback | undefined;
  private _time: number;
  public duration: number;
  public trailPercentage: number;
  public glowIntensity: number;

  /**
   * 构造函数
   * @param options - 材质选项
   */
  constructor(options: AirlinePathOptions = {}) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this._time = new Date().getTime();

    // 设置默认值或使用提供的选项
    this.duration = Cesium.defaultValue(options.duration, 5000);
    this.trailPercentage = Cesium.Math.clamp(
      Cesium.defaultValue(options.trailPercentage, 0.3),
      0,
      1
    );
    this.glowIntensity = Cesium.Math.clamp(
      Cesium.defaultValue(options.glowIntensity, 0.5),
      0,
      1
    );

    this.color = options.color;

    // 向 Cesium 材质缓存中添加自定义材质
    Cesium.Material._materialCache.addMaterial(
      Cesium.Material.AirlinePathMaterialType,
      {
        fabric: {
          type: Cesium.Material.AirlinePathMaterialType,
          uniforms: {
            color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
            time: 0,
            trailPercentage: 0.3,
            glowIntensity: 0.5,
          },
          source: AirlinePathMaterialProperty.getShaderSource(),
        },
        translucent: () => true,
      }
    );
  }

  /**
   * 获取材质是否为常量
   * @returns {boolean} 始终返回 false，因为这是一个动态材质
   */
  get isConstant() {
    return false;
  }

  /**
   * 获取定义更改事件
   * @returns {Cesium.Event} 定义更改事件
   */
  get definitionChanged() {
    return this._definitionChanged;
  }

  /**
   * 获取材质类型
   * @returns {string} 材质类型名称
   */
  getType() {
    return Cesium.Material.AirlinePathMaterialType;
  }

  /**
   * 获取指定时间的材质属性值
   * @param time - Cesium.JulianDate 时间
   * @param result - 用于存储结果的对象（可选）
   * @returns {object} 包含材质属性的对象
   */
  getValue(time: Cesium.JulianDate, result: any) {
    if (!Cesium.defined(result)) {
      result = {};
    }

    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    );
    result.time =
      ((new Date().getTime() - this._time) % this.duration) / this.duration;
    result.trailPercentage = this.trailPercentage;
    result.glowIntensity = this.glowIntensity;

    return result;
  }

  /**
   * 比较两个 AirlinePathMaterialProperty 实例是否相等
   * @param other - 要比较的其他 AirlinePathMaterialProperty 实例
   * @returns {boolean} 如果两个实例相等则返回 true，否则返回 false
   */
  equals(other: AirlinePathMaterialProperty) {
    return (
      this === other ||
      (other instanceof AirlinePathMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        this.duration === other.duration &&
        this.trailPercentage === other.trailPercentage &&
        this.glowIntensity === other.glowIntensity)
    );
  }

  /**
   * 获取着色器源代码
   * @returns {string} GLSL 着色器源代码
   */
  static getShaderSource() {
    return `
      // czm_material czm_getMaterial(czm_materialInput materialInput) {
      //   czm_material material = czm_getDefaultMaterial(materialInput);
      //   vec2 st = materialInput.st;
        
      //   float glow = glowIntensity / (abs(st.t - 0.5) * 2.0);
      //   float trail = smoothstep(1.0 - trailPercentage, 1.0, fract(st.s - time));
        
      //   material.diffuse = color.rgb;
      //   material.emission = color.rgb * glow * trail;
      //   material.alpha = trail;
        
      //   return material;
      // }
      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        
        // 计算到线条中心的距离
        float distanceToCenter = abs(st.t - 0.5);
        
        // 创建圆滑的边缘效果
        float smoothEdge = 1.0 - smoothstep(0.4, 0.5, distanceToCenter);
        
        // 计算发光效果
        float glow = glowIntensity / (distanceToCenter * 2.0 + 0.01);
        
        // 计算尾迹效果
        float trail = smoothstep(1.0 - trailPercentage, 1.0, fract(st.s - time));
        
        // 组合所有效果
        vec3 finalColor = color.rgb * glow * trail * smoothEdge;
        float finalAlpha = trail * smoothEdge;
        
        material.diffuse = finalColor;
        material.emission = finalColor;
        material.alpha = finalAlpha;
        
        return material;
      }
    
    `;
  }
}

// 定义材质属性
Object.defineProperties(AirlinePathMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor("color"),
  duration: Cesium.createPropertyDescriptor("duration"),
  trailPercentage: Cesium.createPropertyDescriptor("trailPercentage"),
  glowIntensity: Cesium.createPropertyDescriptor("glowIntensity"),
});

// 定义材质类型
Cesium.Material.AirlinePathMaterialType = "AirlinePathMaterial";
```

```ts [test.ts]
const viewer = this.viewer;

// 创建自定义材质实例
const airlinePathMaterial = new AirlinePathMaterialProperty({
  color: Cesium.Color.CYAN,
  duration: 5000,
  trailPercentage: 0.5,
  glowIntensity: 0.3,
});

// 定义航线路径点
const positions = Cesium.Cartesian3.fromDegreesArray([
  116.3915,
  39.9053, // 北京
  121.4737,
  31.2304, // 上海
  113.2644,
  23.1291, // 广州
  103.8701,
  1.3644, // 新加坡
]);

// 创建航线实体
const entity = viewer.entities.add({
  polyline: {
    positions: positions,
    width: 5,
    material: airlinePathMaterial,
  },
});

// 将视图定位到航线
viewer.zoomTo(entity);
```

:::

## 2.圆形波纹材质

::: code-group

```ts [CircleWaveMaterialProperty.ts]
//@ts-nocheck
import * as Cesium from "cesium";
interface optionsType {
  color: Cesium.Color;
  duration: number;
  count: number;
  gradient: number;
}
/**
 * @description: 圆形波纹自定义材质类
 * @param {*} options.color 颜色
 * @param {*} options.duration 持续时间
 * @param {*} options.count 波纹数量
 * @param {*} options.gradient 渐变
 * @return {*}
 */
export default class CircleWaveMaterialProperty {
  private _definitionChanged: Cesium.Event;
  private _color: any;
  private _colorSubscription: any;
  private _time: number;
  duration: number;
  count: number;
  gradient: number;
  constructor(options: optionsType) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color;
    this.duration = Cesium.defaultValue(options.duration, 1000);
    this.count = Cesium.defaultValue(options.count, 2);
    if (this.count <= 0) {
      this.count = 1;
    }
    this.gradient = Cesium.defaultValue(options.gradient, 0.1);
    if (this.gradient === 0) {
      this.gradient = 0;
    }
    if (this.gradient > 1) {
      this.gradient = 1;
    }
    this._time = new Date().getTime();
    Cesium.Material._materialCache.addMaterial(
      Cesium.Material.CircleWaveMaterialType,
      {
        fabric: {
          type: Cesium.Material.CircleWaveMaterialType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 1),
            time: 1,
            count: 1,
            gradient: 0.1,
          },
          source: Cesium.Material.CircleWaveSource,
        },
        translucent: function (material: any) {
          return true;
        },
      }
    );
  }
  get isConstant() {
    return false;
  }

  get definitionChanged() {
    return this._definitionChanged;
  }
  // 返回材质类型
  getType() {
    return Cesium.Material.CircleWaveMaterialType;
  }
  // 获取当前时间的材质属性值
  getValue(time: any, result: any) {
    if (!Cesium.defined(result)) {
      result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    );
    result.time =
      ((new Date().getTime() - this._time) % this.duration) / this.duration;
    result.count = this.count;
    result.gradient = 1 + 10 * (1 - this.gradient);
    return result;
  }
  equals(other: any) {
    const reData =
      this === other ||
      (other instanceof CircleWaveMaterialProperty &&
        Cesium.Property.equals(this._color, other._color));
    return reData;
  }
}
// 定义材质属性
Object.defineProperties(CircleWaveMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor("color"),
  duration: Cesium.createPropertyDescriptor("duration"),
  count: Cesium.createPropertyDescriptor("count"),
});
//定义材质类型
Cesium.Material.CircleWaveMaterialType = "CircleWaveMaterial";
//定义材质source
Cesium.Material.CircleWaveSource = `
                                  czm_material czm_getMaterial(czm_materialInput materialInput) {
                                    czm_material material = czm_getDefaultMaterial(materialInput);
                                    material.diffuse = 1.5 * color.rgb;
                                    vec2 st = materialInput.st;
                                    vec3 str = materialInput.str;
                                    float dis = distance(st, vec2(0.5, 0.5));
                                    float per = fract(time);
                                    if (abs(str.z) > 0.001) {
                                      discard;
                                    }
                                    if (dis > 0.5) {
                                      discard;
                                    } else {
                                      float perDis = 0.5 / count;
                                      float disNum;
                                      float bl = .0;
                                      for (int i = 0; i <= 9; i++) {
                                        if (float(i) <= count) {
                                          disNum = perDis *float(i) - dis + per / count;
                                          if (disNum > 0.0) {
                                            if (disNum < perDis) {
                                              bl = 1.0 - disNum / perDis;
                                            } else if(disNum - perDis < perDis) {
                                              bl = 1.0 - abs(1.0 - disNum / perDis);
                                            }
                                            material.alpha = pow(bl, gradient);
                                          }
                                        }
                                      }
                                    }
                                    return material;
                                  }
                                  `;
```

```ts [test.ts]
const material = new CircleWaveMaterialProperty({
  color: Color.fromCssColorString("#0099BF"),
  duration: 10000,
  gradient: 0,
  count: 4,
});
this.viewer.entities.add({
  position: Cartesian3.fromDegrees(116.397755, 39.903179, 0),
  name: "波纹圆",
  ellipse: {
    semiMinorAxis: 1000,
    semiMajorAxis: 1000,
    material: material,
  },
});
```

:::
