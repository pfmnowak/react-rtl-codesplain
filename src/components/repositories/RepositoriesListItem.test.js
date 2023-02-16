import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

// Not the best solution, but also works well
// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "A js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

describe("RepositoriesListItem component", () => {
  test("displays a link to the github homepage for this repository", async () => {
    const { repository } = renderComponent();

    // The worst solution that works
    // await act(async () => {
    //   await pause();
    // });

    // The best solution
    await screen.findByRole("img", { name: "JavaScript" });

    const link = screen.getByRole("link", {
      name: /github repository/i,
    });
    expect(link).toHaveAttribute("href", repository.html_url);
  });

  test("shows a fileicon with the appropriate icon", async () => {
    renderComponent();

    const icon = await screen.findByRole("img", { name: "JavaScript" });

    expect(icon).toHaveClass("js-icon");
  });

  test("shows a link to the code editor page", async () => {
    const { repository } = renderComponent();

    await screen.findByRole("img", { name: "JavaScript" });

    const link = screen.getByRole("link", {
      name: new RegExp(repository.owner.login),
    });

    expect(link).toHaveAttribute(
      "href",
      `/repositories/${repository.full_name}`
    );
  });
});

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
