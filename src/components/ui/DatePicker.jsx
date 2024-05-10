"use client"

import * as React from "react"
import { format, getDate } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState, useEffect} from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker(props) {
  useEffect(() => {
    props.setSelectedDate(props.date);

  })
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal hidden md:flex",
            !props.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.date ? format(props.date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.date}
          onSelect={props.setDate}
          initialFocus
          
        />
      </PopoverContent>
    </Popover>
  )
}
