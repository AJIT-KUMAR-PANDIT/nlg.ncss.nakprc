# NCSS Native WEB Liquid Glass

**Liquid Glass** is a programmable liquid interaction engine for React. It goes beyond simple ripple effects by using a WebGL-based fluid simulator and shader-based refraction to create highly realistic glass, water, and metal distortion overlays on top of your DOM elements.

## Features

- **Real-time Fluid Dynamics:** Uses a true 2D wave equation solver to simulate liquid propagation.
- **Glass Refraction:** Computes the gradient (normals) of the fluid simulation to properly refract whatever elements or background sit behind the `<LiquidGlass>` canvas.
- **Vortex Generators:** Allows generating pressure impulses in shapes (e.g. circle, square, polygon).
- **Distortion Profiles:** (e.g., Glass, Water, Mercury, Plasma, Oil) - currently tailored primarily for Circular Glass.

---

## Installation

Currently, this library is provided as a raw module in the `src/lib/` folder.

1. Ensure your React project is using TypeScript and supports WebGL.
2. Copy the `src/lib` folder into your project.
3. Import the `LiquidGlass` component.

---

## Basic Usage

The `<LiquidGlass>` component acts as a wrapper. Any `children` you place inside will be rendered *above* the liquid simulation, but the simulation will refract elements situated *behind* the component (like background images).

```tsx
import { LiquidGlass } from './lib/LiquidGlass';

function App() {
  return (
    <div style={{ backgroundImage: 'url("your-image.jpg")' }}>
      
      <LiquidGlass 
        vortex={{ type: 'circle', intensity: 1.5 }} 
        distortion="glass"
        style={{ width: '400px', height: '300px', borderRadius: '1rem' }}
      >
        <h2>My Glass Card</h2>
        <p>Click me to see the liquid ripple.</p>
      </LiquidGlass>
      
    </div>
  );
}
```

## Component API

### `LiquidGlassProps`

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `vortex` | `VortexConfig` | `{ type: 'circle' }` | Configures the shape and intensity of the pointer impulse. |
| `distortion` | `DistortionStyle` | `'glass'` | The shader effect applied to the pressure field (`'glass'`, `'water'`, `'mercury'`, `'plasma'`, `'oil'`). |
| `propagation` | `PropagationMode` | `'fluid'` | *Reserved for future fluid decay modifiers.* |
| `pressure` | `PressureProfile` | `'gaussian'` | *Reserved for future pressure decay curves.* |
| `className` | `string` | `''` | Standard CSS class string applied to the outer container. |
| `style` | `React.CSSProperties` | `{}` | Inline styles applied to the outer container. |
| `children` | `React.ReactNode` | `null` | Elements to render on top of the liquid simulation. |

---

### `VortexConfig`

| Field | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `type` | `string` | `'circle'` | The geometry of the pressure wave. Currently supported: `'circle'`. |
| `intensity` | `number` | `1.0` | How hard the liquid is displaced by the pointer. |
| `sides` | `number` | `6` | (Polygon only) The number of sides for the geometry. |

---

## Architecture Overview

The interaction engine leverages raw WebGL to keep bundle sizes tiny and performance high:

1. **`Engine.ts`**: 
   - Manages the WebGL context (`this.gl`).
   - Hooks into the `PointerEvents` over the canvas.
   - Manages two Framebuffer Objects (FBOs) to run the wave equation via ping-pong textures.
2. **`shaders.ts`**:
   - `FLUID_FRAGMENT_SHADER`: Integrates the pressure of the fluid. Calculates SDFs (Signed Distance Fields) for the vortex geometries.
   - `RENDER_FRAGMENT_SHADER`: Computes normals from the pressure field and renders specular highlights + transparency, generating the "Glass Refraction" effect.
3. **`generators/index.ts`**:
   - Extensible plugin system defining the formulas for how various vortex geometries behave in javascript, ready for future CPU-based propagation algorithms.

## Extending

To add a new distortion style:
1. Open `src/lib/shaders/shaders.ts`.
2. Locate the `RENDER_FRAGMENT_SHADER`.
3. Add a new conditional block under `uDistortionMode` to output a custom `gl_FragColor` based on the local pressure (`p_c`) and normal vector (`normal`).
4. Update `DistortionStyle` in `types.ts` to include your new style name.
