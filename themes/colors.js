import color from 'color';
export const primaryColor = '#0277BD';
export const secondaryColor = '#607D8B';
export const primaryStatusBar = color(primaryColor)
    .darken(0.5)
    .rgb()
    .string();

export const statusColors = {
    success: '#4cab00',
    warning: '#ffaf00',
    alert: '#ee2300',
    darken1: 0.2,
    darken2: 0.3,
    lighten1: 0.1,
    lighten2: 0.2,
};

export const filterColors = {
    active: '#48b',
    inactive: '#eee',
};

export const neutralColors = {
    background: '#ffffff',
    surface: '#f9f9f9',
    light: '#ccd7df',
    medium: '#b0bac4',
    dark: '#89929c',
};
