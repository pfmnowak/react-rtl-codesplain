import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

describe("RepositoriesSummary component", () => {
  test("displays information about the repository", () => {
    const repository = {
      stargazers_count: 5,
      open_issues: 1,
      forks: 17,
      language: "JavaScript",
    };

    render(<RepositoriesSummary repository={repository} />);

    Object.entries(repository).forEach(([key, value]) => {
      const element = screen.getByText(new RegExp(`\\b${value}\\b`));
      expect(element).toBeInTheDocument();
    });
  });
});
