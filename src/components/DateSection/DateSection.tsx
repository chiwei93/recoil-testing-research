import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { dateAtom } from "../../atoms/dateAtom";

export default function DateSection() {
  const [startDate, setStartDate] = useRecoilState(dateAtom);
  const minDate = new Date();

  return (
    <div className="mb-12 flex flex-col gap-2">
      <label htmlFor="date">Date:</label>

      <ReactDatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
        className="border border-black px-2 py-1 rounded"
        minDate={minDate}
        id="date"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
