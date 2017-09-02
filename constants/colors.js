export const mainColors = {
  'blue': {
    '500': '#00B0FF'
  }
};

export const colorAliasses = {
  'primary': {
    default: mainColors['blue']['500']
  }
}

export default {
  ...mainColors,
  ...colorAliasses
}
