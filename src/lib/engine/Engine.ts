import { VERTEX_SHADER, FLUID_FRAGMENT_SHADER, RENDER_FRAGMENT_SHADER } from '../shaders/shaders';
import { VortexConfig, DistortionStyle } from '../types';

export class Engine {
  private gl: WebGLRenderingContext;
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  
  private fluidProgram: WebGLProgram;
  private renderProgram: WebGLProgram;
  
  private fboA: WebGLFramebuffer;
  private texA: WebGLTexture;
  private fboB: WebGLFramebuffer;
  private texB: WebGLTexture;
  
  private quadBuffer: WebGLBuffer;
  
  private pointer = { x: 0, y: 0, down: false };
  private vortexConfig: VortexConfig = { type: 'circle', intensity: 1, sides: 6 };
  private distortion: DistortionStyle = 'glass';
  private animationFrame: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl')!;
    this.width = canvas.width;
    this.height = canvas.height;
    
    // Extensions
    this.gl.getExtension('OES_texture_float');
    this.gl.getExtension('OES_texture_float_linear');

    this.fluidProgram = this.createProgram(VERTEX_SHADER, FLUID_FRAGMENT_SHADER)!;
    this.renderProgram = this.createProgram(VERTEX_SHADER, RENDER_FRAGMENT_SHADER)!;
    
    const { fbo: fboA, tex: texA } = this.createFBO();
    const { fbo: fboB, tex: texB } = this.createFBO();
    this.fboA = fboA; this.texA = texA;
    this.fboB = fboB; this.texB = texB;

    this.quadBuffer = this.gl.createBuffer()!;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quadBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), this.gl.STATIC_DRAW);

    this.setupEvents();
    this.loop();
  }

  public setVortex(config: VortexConfig) {
    this.vortexConfig = { ...this.vortexConfig, ...config };
  }

  public setDistortion(distortion: DistortionStyle) {
    this.distortion = distortion;
  }
  
  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    // Recreate FBOs for new size in a full implementation
  }

  public destroy() {
    cancelAnimationFrame(this.animationFrame);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    this.canvas.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerup', this.onPointerUp);
  }

  private setupEvents() {
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('pointerout', this.onPointerUp);
  }

  private onPointerDown = (e: PointerEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = (e.clientX - rect.left) / this.width;
    this.pointer.y = 1.0 - (e.clientY - rect.top) / this.height;
    this.pointer.down = true;
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.pointer.down) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = (e.clientX - rect.left) / this.width;
    this.pointer.y = 1.0 - (e.clientY - rect.top) / this.height;
  };

  private onPointerUp = () => {
    this.pointer.down = false;
  };

  private createShader(type: number, source: string): WebGLShader | null {
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  private createProgram(vs: string, fs: string): WebGLProgram | null {
    const program = this.gl.createProgram()!;
    this.gl.attachShader(program, this.createShader(this.gl.VERTEX_SHADER, vs)!);
    this.gl.attachShader(program, this.createShader(this.gl.FRAGMENT_SHADER, fs)!);
    this.gl.linkProgram(program);
    return program;
  }

  private createFBO() {
    const tex = this.gl.createTexture()!;
    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.FLOAT, null);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

    const fbo = this.gl.createFramebuffer()!;
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, tex, 0);

    return { fbo, tex };
  }

  private loop = () => {
    this.step();
    this.render();
    this.animationFrame = requestAnimationFrame(this.loop);
  };

  private step() {
    const gl = this.gl;
    gl.viewport(0, 0, this.width, this.height);
    gl.useProgram(this.fluidProgram);

    // Bind current state to texture 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texA);
    gl.uniform1i(gl.getUniformLocation(this.fluidProgram, "uPressure"), 0);

    // Set uniforms
    gl.uniform2f(gl.getUniformLocation(this.fluidProgram, "uResolution"), this.width, this.height);
    gl.uniform2f(gl.getUniformLocation(this.fluidProgram, "uMouse"), this.pointer.x, this.pointer.y);
    gl.uniform1f(gl.getUniformLocation(this.fluidProgram, "uPointerDown"), this.pointer.down ? 1.0 : 0.0);
    gl.uniform1f(gl.getUniformLocation(this.fluidProgram, "uDamping"), 0.99); // Hardcoded fluid damping
    
    let vType = 0;
    if (this.vortexConfig.type === 'square') vType = 1;
    if (this.vortexConfig.type === 'polygon') vType = 2;
    gl.uniform1i(gl.getUniformLocation(this.fluidProgram, "uVortexType"), vType);
    gl.uniform1f(gl.getUniformLocation(this.fluidProgram, "uVortexSides"), this.vortexConfig.sides || 6);
    gl.uniform1f(gl.getUniformLocation(this.fluidProgram, "uVortexIntensity"), this.vortexConfig.intensity || 1.0);

    // Draw to fboB
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboB);
    this.drawQuad(this.fluidProgram);

    // Swap FBOs
    const tempFbo = this.fboA;
    this.fboA = this.fboB;
    this.fboB = tempFbo;

    const tempTex = this.texA;
    this.texA = this.texB;
    this.texB = tempTex;
  }

  private render() {
    const gl = this.gl;
    gl.viewport(0, 0, this.width, this.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); // Draw to screen
    gl.useProgram(this.renderProgram);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texA); // Use the latest pressure field
    gl.uniform1i(gl.getUniformLocation(this.renderProgram, "uPressure"), 0);
    
    gl.uniform2f(gl.getUniformLocation(this.renderProgram, "uResolution"), this.width, this.height);
    
    let dMode = 0;
    if (this.distortion === 'mercury') dMode = 1;
    if (this.distortion === 'plasma') dMode = 2;
    if (this.distortion === 'water') dMode = 3;
    if (this.distortion === 'oil') dMode = 4;
    gl.uniform1i(gl.getUniformLocation(this.renderProgram, "uDistortionMode"), dMode);

    this.drawQuad(this.renderProgram);
  }

  private drawQuad(program: WebGLProgram) {
    const posLoc = this.gl.getAttribLocation(program, "position");
    this.gl.enableVertexAttribArray(posLoc);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quadBuffer);
    this.gl.vertexAttribPointer(posLoc, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
}
