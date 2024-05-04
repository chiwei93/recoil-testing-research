import { screen } from "@testing-library/react";
import DateSection from "./DateSection";
import { customRender } from "../../tests/test-utils";

describe("DateSection component", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2023, 4, 1));
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should be able to pick a date", async () => {
    const { user } = await customRender(<DateSection />);

    const datepicker = screen.getByLabelText("Date:");
    expect(datepicker).toBeInTheDocument();

    await user.click(datepicker);
    const day = await screen.findAllByText("2");
    expect(day[0]).toBeInTheDocument();

    await user.click(day[0]);
    expect(datepicker).toHaveValue("02/05/2023");
  });
});
