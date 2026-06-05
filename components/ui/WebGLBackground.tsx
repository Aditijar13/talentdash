'use client'
import { useEffect, useRef } from 'react'

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `
    // Fragment shader: animated topographic lines + color blobs
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float wave(vec2 uv, float freq, float amp, float speed, vec2 dir) {
        return amp * sin(dot(uv, dir) * freq + u_time * speed);
      }

      float topo(vec2 uv, float t) {
        float v = 0.0;
        v += wave(uv, 3.0, 0.15, 0.3, vec2(1.0, 0.6));
        v += wave(uv, 5.0, 0.08, 0.5, vec2(-0.7, 1.0));
        v += wave(uv, 8.0, 0.04, 0.7, vec2(0.5, -0.8));
        v += wave(uv, 2.0, 0.12, 0.2, vec2(-0.4, 0.6));
        float lines = abs(fract(v * 3.0 + t * 0.05) - 0.5);
        return smoothstep(0.04, 0.0, lines) * 0.5;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 uvN = uv * 2.0 - 1.0;
        uvN.x *= u_resolution.x / u_resolution.y;

        // Base dark background
        vec3 col = vec3(0.05, 0.05, 0.10);

        // Color blobs
        float t = u_time * 0.3;
        vec2 blob1 = vec2(cos(t * 0.7) * 0.6 + 0.4, sin(t * 0.5) * 0.3 + 0.3);
        vec2 blob2 = vec2(cos(t * 0.4 + 2.0) * 0.5 - 0.2, sin(t * 0.6 + 1.0) * 0.4 + 0.6);
        vec2 blob3 = vec2(cos(t * 0.9 + 4.0) * 0.4 + 0.7, sin(t * 0.3 + 3.0) * 0.3 + 0.5);

        float d1 = length(uv - blob1);
        float d2 = length(uv - blob2);
        float d3 = length(uv - blob3);

        col += vec3(0.35, 0.03, 0.06) * exp(-d1 * 4.5) * 0.7;   // coral/red
        col += vec3(0.03, 0.10, 0.38) * exp(-d2 * 4.0) * 0.6;   // blue
        col += vec3(0.18, 0.03, 0.38) * exp(-d3 * 5.0) * 0.5;   // purple

        // Topographic lines
        float topoVal = topo(uvN, u_time);
        col += vec3(0.8, 0.85, 1.0) * topoVal * 0.25;

        // Vignette
        float vign = length(uv - 0.5) * 1.4;
        col *= 1.0 - vign * 0.55;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const resLoc = gl.getUniformLocation(prog, 'u_resolution')
    const timeLoc = gl.getUniformLocation(prog, 'u_time')

    let startTime = performance.now()
    let raf: number

    const render = () => {
      const t = (performance.now() - startTime) / 1000
      gl!.uniform2f(resLoc, canvas!.width, canvas!.height)
      gl!.uniform1f(timeLoc, t)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="webgl-bg"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
