import { execute } from "./core/index.js";

// Example usage
const code = `
func greet {
	print("Hello, OrangeCat!")
}

call greet
`;

execute(code);
