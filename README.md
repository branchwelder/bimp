# bimp

don't you want to mess with pixels

## todo

- direct editor
  - [x] render pixel art to canvas
  - [x] brush click/drag to paint
  - [x] set dimensions / resize
  - [x] bucket fill
  - [x] add color
  - [x] edit existing color
  - [ ] brush size and shape
  - [ ] line
  - [ ] rectangle
  - [ ] box select area
  - [ ] move selection
  - [ ] copy/paste selection
- code editor
  - [x] ui switch between direct and code editors
  - [x] make bimp in codemirror editor
  - [x] pass in previous layers
- workspace
  - [x] pan and zoom
  - [x] layer panel
  - [x] center canvas
  - [ ] undo (implemented but there are breaking changes)
  - [ ] export/download layers (implemented but there are breaking changes)
- [ ] remove color
- [ ] import image ?
- [ ] dithering
- [ ] how to handle the palette creation?
- [ ] reorder layers
- [ ] remove layers
  - how to handle layers that are dependencies?
- [ ] make direct layer from code layer?

## ideas

- common preset sizes
- favicon export... or set current bimp as favicon

## bimp

Creation:

- `constructor`
- `empty`
- `fromTile`

Accessing:

- `pixel(x,y)`: returns the value at coordinates (x, y)
- `make2d()`: returns pixels as a 2d array
- `toImageData(palette)`: returns an ImageData object generated from the given
  palette.
- [ ] copy area? specify top left and bottom right of area, and return a bimp
      with that data

Changing:

- [x] `draw` Applies changes to the bimp and returns a new bimp
- [x] brush (change one pixel)
  - [ ] specify size of brush?
- [x] flood
- [ ] circle
- [ ] rectangle
- [ ] line
- [ ] paste - pastes a bimp at specified coordinates
- [ ] translate? move a selected area to somewhere else?
- [ ] rotate - returns the whole bimp rotated
- [ ] reflect - returns the whole bimp reflected across an axis
- [ ] interpolation
  - [ ] skew -
  - [ ] resize/scale
