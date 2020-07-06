# H1

## H2

* dot dot dot

1. wow
1. hoho
1. no

![image](https://homepages.cae.wisc.edu/~ece533/images/airplane.png)

::: eq
\sum_i^{N} \dfrac{1}{2} P(\mathbf{n} \cdot \mathbf{e}_i)
\label{eq:irradiance}
:::

::: diagram
\begin{setup}
    p.createCanvas(512, 512);
    p.background(0);
    p.ud = {};
    p.ud.y = 100;
\end{setup}

\begin{draw}
    p.ud.y = y - 1;
    if (p.ud.y < 0) {
        p.ud.y = p.height;
    }
    p.line(0, p.ud.y, p.width, p.ud.y);
\end{draw}
\label{fig:scanline}
\caption{This is a caption for scanline diagram}
:::