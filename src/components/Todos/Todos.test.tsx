import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import Todos from "./Todos";
import { customRender } from "../../tests/test-utils";
import { userIdAtom } from "../../atoms/userIdAtom";

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

  it("should render todos correctly when userId is 1", async () => {
    await customRender(<Todos />);

    expect(screen.getByText("userId: 1")).toBeVisible();
    expect(screen.getByText("title: delectus aut autem")).toBeVisible();
    expect(screen.getByText("completed: Not complete")).toBeVisible();
  });

  it("should render todos correctly when userId is 2", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users/2/todos", () => {
        return HttpResponse.json([
          {
            userId: 2,
            id: 21,
            title: "suscipit repellat esse quibusdam voluptatem incidunt",
            completed: true,
          },
        ]);
      })
    );

    await customRender(<Todos />, [[userIdAtom, 2]]);

    expect(screen.getByText("userId: 2")).toBeVisible();
    expect(screen.getByText("title: suscipit repellat esse quibusdam voluptatem incidunt")).toBeVisible();
    expect(screen.getByText("completed: Completed")).toBeVisible();
  });
});
