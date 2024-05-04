import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import Todos from "./Todos";
import { customRender } from "../../tests/test-utils";

const server = setupServer(
  http.get("https://jsonplaceholder.typicode.com/users/1/todos", () => {
    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
    ]);
  })
);

describe("Todos component", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it("should render 'No todo found.' when server return empty array", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users/1/todos", () => {
        return HttpResponse.json([]);
      })
    );

    await customRender(<Todos />);

    expect(screen.getByText("No todo found.")).toBeVisible();
  });

  it("should render todos", async () => {
    await customRender(<Todos />);

    expect(screen.getByText("userId: 1")).toBeVisible();
    expect(screen.getByText("title: delectus aut autem")).toBeVisible();
    expect(screen.getByText("completed: Not complete")).toBeVisible();
  });
});
