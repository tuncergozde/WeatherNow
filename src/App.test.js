import { screen, render } from "@testing-library/react";
import App from "./App";

test('app.js test işlemleri', () => {
    render(<App/>)
    const element = screen.getByTest('react testing')

    expect(element).toBeInTheDocument()

})