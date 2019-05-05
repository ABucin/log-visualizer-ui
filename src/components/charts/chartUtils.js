import * as color from 'd3-color';

export function onDataHover(selection, lighten) {
  const initialFill = selection.style('fill');
  const hslFill = color.hsl(initialFill);
  const factor = 0.3;
  const finalFill = lighten ? hslFill.brighter(factor) : hslFill.darker(factor);

  // cannot use 'this' due to arrow function syntax
  selection.style('fill', finalFill);
}

export function toggleTooltip(show) {

}
