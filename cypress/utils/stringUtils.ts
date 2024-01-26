const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const removeSpaces = (str: string) => str.replace(/ /g, '');

export { capitalizeFirstLetter, removeSpaces }