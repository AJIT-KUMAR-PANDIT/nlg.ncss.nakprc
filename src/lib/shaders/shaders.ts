export const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    vUv.y = 1.0 - vUv.y;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const FLUID_FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uPressure;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uPointerDown;
  uniform float uTime;
  uniform float uDelta;
  uniform float uDamping;
  
  // Vortex uniforms
  uniform int uVortexType; // 0=circle, 1=square, 2=polygon
  uniform float uVortexIntensity;
  uniform float uVortexSides;

  float sdPolygon(vec2 p, int vSides, float r) {
    float n = float(vSides);
    float a = atan(p.x, p.y) + 3.14159;
    float r_a = 6.2831853 / n;
    return cos(floor(0.5 + a / r_a) * r_a - a) * length(p) - r;
  }

  float sdSquare(vec2 p, float b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  }

  void main() {
    vec2 px = 1.0 / uResolution;
    
    // Wave equation integration (basic heightmap simulation)
    vec4 t = texture2D(uPressure, vUv + vec2(0.0, -px.y));
    vec4 r = texture2D(uPressure, vUv + vec2(px.x, 0.0));
    vec4 b = texture2D(uPressure, vUv + vec2(0.0, px.y));
    vec4 l = texture2D(uPressure, vUv + vec2(-px.x, 0.0));
    vec4 c = texture2D(uPressure, vUv);

    // Wave equation: p_new = (p_left + p_right + p_up + p_down) / 2 - p_old
    // We store current pressure in R, previous in G
    float p_new = (t.r + r.r + b.r + l.r) / 2.0 - c.g;
    p_new *= uDamping; // Damping

    // Add pointer impulse
    if (uPointerDown > 0.0) {
      vec2 p = (vUv - uMouse) * uResolution;
      float d = 0.0;
      
      if (uVortexType == 1) {
        d = sdSquare(p, 20.0);
      } else if (uVortexType == 2) {
        d = sdPolygon(p, int(uVortexSides), 20.0);
      } else {
        d = length(p) - 20.0; // Circle
      }
      
      if (d < 0.0) {
        p_new += uVortexIntensity * 0.1;
      }
    }

    gl_FragColor = vec4(p_new, c.r, 0.0, 1.0);
  }
`;

export const RENDER_FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  
  uniform sampler2D uPressure;
  uniform sampler2D uBackground;
  uniform vec2 uResolution;
  
  // Distortion style
  uniform int uDistortionMode; // 0=glass, 1=mercury, 2=plasma, 3=water, 4=oil
  
  void main() {
    vec2 px = 1.0 / uResolution;
    
    // Compute normal from pressure gradient
    float p_c = texture2D(uPressure, vUv).r;
    float p_r = texture2D(uPressure, vUv + vec2(px.x, 0.0)).r;
    float p_t = texture2D(uPressure, vUv + vec2(0.0, px.y)).r;
    
    vec3 normal = normalize(vec3(p_r - p_c, p_t - p_c, 0.5));
    
    vec2 offset = normal.xy * 0.5; // Refraction intensity
    
    vec4 baseColor = texture2D(uBackground, vUv + offset);
    
    // Specular highlight
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float spec = pow(max(dot(normal, lightDir), 0.0), 32.0);
    
    if (uDistortionMode == 1) {
      // Mercury: Metallic, highly reflective
      gl_FragColor = vec4(vec3(0.7, 0.75, 0.8) * (p_c + 0.5) + spec, 1.0);
    } else if (uDistortionMode == 2) {
      // Plasma: Emissive color mapping based on pressure
      vec3 color = vec3(sin(p_c * 10.0), cos(p_c * 8.0), sin(p_c * 5.0)) * 0.5 + 0.5;
      gl_FragColor = vec4(color, 1.0);
    } else if (uDistortionMode == 4) {
      // Oil: Rainbow thin-film interference
      vec3 color = vec3(
        sin(p_c * 15.0),
        sin(p_c * 15.0 + 2.0),
        sin(p_c * 15.0 + 4.0)
      ) * 0.5 + 0.5;
      gl_FragColor = vec4(mix(baseColor.rgb, color, 0.5) + spec, 1.0);
    } else {
      // Glass / Water
      gl_FragColor = vec4(baseColor.rgb + vec3(spec * 0.5), baseColor.a);
    }
  }
`;
