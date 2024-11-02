import { DayPicker } from "react-day-picker";
import { useItemsProvider } from "./ItemsProvider";

export default function Calender() {
    const {today, setToday} = useItemsProvider();

  return (
    <>
      <DayPicker
        required={true}
        selected={today}
        onSelect={setToday}
        mode="single"
      />
    </>
  );
}
