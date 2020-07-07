# RenderPost

Caution: This project is still under construction

My custom extension to markdown.

Adds 

* latex-like figure/equation reference
* Inline p5js diagram
* Inline shader-doodle code


## Example input

```markdown
# H1

## H2

* dot dot dot

1. wow
1. hoho
1. no

This is a reference to Eq. \ref{eq:irradiance2} and Fig. \ref{fig:scanline}. Fig. \ref{fig:airplane2}.

Also, this is a inline math equation $f(x) = x^2 + x + 1$. Another one: $f(x) = 2x^3 + x^2 + 1$

::: diagram
\image{https://homepages.cae.wisc.edu/~ece533/images/airplane.png}
\width{128}
\label{fig:airplane1}
\caption{A picture of a plane.}
:::

::: eq
\sum_i^{N} \dfrac{1}{2} P(\mathbf{n} \cdot \mathbf{e}_i)
\label{eq:irradiance1}
:::

::: eq
\sum_i^{N} \dfrac{1}{2} P(\mathbf{n} \cdot \mathbf{e}_i)
\label{eq:irradiance2}
:::

::: diagram
\image{https://homepages.cae.wisc.edu/~ece533/images/airplane.png}
\width{128}
\label{fig:airplane2}
\caption{A picture of a plane.}
:::

::: p5diagram
\begin{setup}
    p.createCanvas(128, 128);
    p.stroke(255);
    p.frameRate(30);
    p.ud = {};
    p.ud.y = 100;

\end{setup}

\begin{draw}
    p.background(0);
    p.ud.y = p.ud.y - 1;
    if (p.ud.y < 0) {
        p.ud.y = p.height;
    }
    p.line(0, p.ud.y, p.width, p.ud.y);
\end{draw}
\label{fig:scanline}
\caption{This is a caption for scanline diagram}
:::

::: p5diagram
\begin{setup}
    p.createCanvas(128, 128);
    p.stroke(255);
    p.frameRate(30);
    p.ud = {};
    p.ud.y = 100;

\end{setup}

\begin{draw}
    p.background(0);
    p.ud.y = p.ud.y - 1;
    if (p.ud.y < 0) {
        p.ud.y = p.height;
    }
    p.line(0, p.ud.y, p.width, p.ud.y);
\end{draw}
\label{fig:scanline2}
\caption{This is a caption for scanline diagram2}
:::

::: shaderdiagram
  <script type="x-shader/x-fragment">
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec3 color = vec3(st.x, st.y, abs(sin(u_time)));

      gl_FragColor = vec4(color, 1.0);
    }
  <\/script>
\label{fig:shader}
\caption{This is a caption for shader}
:::

Another text comes here Lorem Impsum.

```cpp
#include<iostream>
    
int main(){
    return 0;
}```
```