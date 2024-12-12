"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useSearchParams } from "@remix-run/react";

const frameworks = [
  {
    value: "cuisine",
    label: "Cuisine",
  },
  {
    value: "grade",
    label: "Grade",
  },
  {
    value: "borough",
    label: "Borough",
  },
];

export function Combobox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    borough: false,
    grade: false,
    cuisine: false,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between hover:bg-gray-700 bg-gray-600"
        >
          {Object.keys(value).some((key) => value[key])
            ? Object.keys(value)
                .filter((key) => value[key])
                .map((key) => frameworks.find((fw) => fw.value === key)?.label)
                .join(", ")
            : "Search options"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue((prevValue) => {
                      const newValue = {
                        ...prevValue,
                        [currentValue]: !prevValue[currentValue],
                      };

                      setSearchParams((prevParams) => {
                        const newParams = new URLSearchParams(prevParams);

                        Object.keys(newValue).forEach((key) => {
                          if (newValue[key]) {
                            newParams.set(key, "");
                          } else {
                            newParams.delete(key);
                          }
                        });

                        return newParams;
                      });

                      return newValue;
                    });
                  }}
                  className="cursor-pointer"
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value[framework.value] ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
