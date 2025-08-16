/** @type {import("prettier").Config} */
const config = {
    semi: false, // Add semicolons at the end of statements
    singleQuote: true, // Use single quotes instead of double
    trailingComma: 'all', // Add trailing commas where valid in ES5 (objects, arrays, etc.)
    printWidth: 80, // Wrap lines at 80 chars
    tabWidth: 2, // Indent with 2 spaces
    bracketSpacing: true, // Add spaces inside object literals: { foo: bar }
    arrowParens: 'always', // Always include parens in arrow functions
}

export default config
