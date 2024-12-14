import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker({ date, setDate, disabled = false }) {
  const adjustForLocalTimezone = (date: Date) => {
    const localOffset = date.getTimezoneOffset();
    const utcDate = new Date(date.getTime() + localOffset * 60000);
    return utcDate;
  };

  const adjustToLocalTimezone = (utcDate: Date) => {
    const localDate = new Date(utcDate);
    return localDate;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left font-normal ${
            !date && "text-muted-foreground"
          }`}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(adjustToLocalTimezone(date), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              const adjustedDate = adjustForLocalTimezone(selectedDate);
              setDate(adjustedDate);
            } else {
              setDate(null);
            }
          }}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
