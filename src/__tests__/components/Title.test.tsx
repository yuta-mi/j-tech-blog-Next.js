import { render, screen } from "@testing-library/react";
import { Title } from "../../components/Title";

describe("Title", () => {
  it("Titleと表示されること", async () => {
    render(<Title />);
    expect((await screen.findByTestId("title")).textContent).toBe("Title");
  });
});