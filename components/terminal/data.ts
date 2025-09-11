export const bootText = `Welcome to Skyen
\nWIP - This page will be updated every day
\nType help to see commands`

export const contentGrid = `/* prettier-ignore */
.content-grid {
  --padding-inline: 1rem;
  --content-max-width: 900px;
  --breakout-max-width: 1200px;

  --breakout-size: calc(
    (var(--breakout-max-width) - var(--content-max-width)) / 2
  );

  display: grid;
  grid-template-columns:
    [full-width-start]
      minmax(var(--padding-inline), 1fr)
      [breakout-start]
        minmax(0, var(--breakout-size))
        [content-start]
         min(100% - (var(--padding-inline) * 2), var(--content-max-width))
        [content-end]
        minmax(0, var(--breakout-size))
      [breakout-end]
      minmax(var(--padding-inline), 1fr)
    [full-width-end];
}

.content-grid > :not(.breakout, .full-width),
.full-width > :not(.breakout, .full-width) {
  grid-column: content;
}

.content-grid > .breakout {
  grid-column: breakout;
}

.content-grid > .full-width {
  grid-column: full-width;

  display: grid;
  grid-template-columns: inherit;
}
`

export const cssReset = `*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font: inherit;
}

html {
  color-scheme: dark light;
}

body {
  min-height: 100svh;
}

img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}

img {
height: auto;
vertical-align: middle; /* removes base alignment */
font-style: italic; /* error styling */
background-repeat: no-repeat;
background-size: cover;
shape-margin: 0.75rem;
}
`

export const cmdHelp = `help      Show available commands
clear     Clears screen history
sudo      Gain access to root
log       Prints command history
exit      Closes terminal window
ping      Pings target host`