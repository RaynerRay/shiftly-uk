"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface CalendarProps {
  value?: Date
  onSelect?: (date: Date) => void
  className?: string
  disabled?: (date: Date) => boolean
  disablePastDates?: boolean
  disableFutureDates?: boolean
  showOutsideDays?: boolean
  locale?: string
  minDate?: Date
  maxDate?: Date
  initialFocus?: boolean
}

function Calendar({
  value,
  onSelect,
  className,
  disabled,
  disablePastDates,
  disableFutureDates,
  showOutsideDays = true,
  locale = "en-US",
  minDate,
  maxDate,
}: CalendarProps) {
  const [viewDate, setViewDate] = React.useState<Date>(value || new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)
  
  // Month and year navigation
  const handlePreviousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }
  
  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }
  
  // Date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (onSelect) {
      onSelect(date)
    }
  }
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }
  
  // Get day of week (0-6) for the first of the month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }
  
  // Check if date is disabled
  const isDateDisabled = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (disabled && disabled(date)) return true
    if (disablePastDates && date < today) return true
    if (disableFutureDates && date > today) return true
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    
    return false
  }

  // Check if date is the same day (ignoring time)
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }
  
  // Generate calendar grid
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const days = []
    
    // Previous month days
    if (showOutsideDays) {
      const prevMonthDays = getDaysInMonth(year, month - 1)
      for (let i = 0; i < firstDayOfMonth; i++) {
        const day = prevMonthDays - (firstDayOfMonth - i) + 1
        const date = new Date(year, month - 1, day)
        days.push({
          date,
          day,
          isCurrentMonth: false,
          isToday: isSameDay(date, today),
          isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
          isDisabled: isDateDisabled(date)
        })
      }
    } else {
      // Fill with null if not showing outside days
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null)
      }
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isDisabled: isDateDisabled(date)
      })
    }
    
    // Next month days to fill the remaining calendar
    if (showOutsideDays) {
      const totalCells = 42 // 6 rows * 7 days
      const remainingCells = totalCells - days.length
      for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(year, month + 1, day)
        days.push({
          date,
          day,
          isCurrentMonth: false,
          isToday: isSameDay(date, today),
          isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
          isDisabled: isDateDisabled(date)
        })
      }
    }
    
    return days
  }
  
  const calendarDays = generateCalendarDays()
  
  // Week day names
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2023, 0, i + 1) // Using a Sunday in 2023
    return date.toLocaleDateString(locale, { weekday: 'short' })
  })
  
  return (
    <div className={cn("p-3", className)}>
      {/* Header with month/year and navigation */}
      <div className="flex justify-center pt-1 relative items-center">
        <button
          onClick={handlePreviousMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
          )}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="text-sm font-medium">
          {viewDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </div>
        
        <button
          onClick={handleNextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
          )}
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      {/* Calendar grid */}
      <div className="mt-4">
        {/* Week day headers */}
        <div className="flex">
          {weekDays.map((day, i) => (
            <div
              key={i}
              className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 mt-2">
          {calendarDays.map((dayInfo, i) => {
            if (!dayInfo) {
              return <div key={i} className="h-9 w-9" />
            }
            
            return (
              <button
                key={i}
                type="button"
                disabled={dayInfo.isDisabled}
                onClick={() => handleDateSelect(dayInfo.date)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal",
                  dayInfo.isSelected && 
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  dayInfo.isToday && !dayInfo.isSelected && "bg-accent text-accent-foreground",
                  !dayInfo.isCurrentMonth && 
                    "text-muted-foreground opacity-50",
                  dayInfo.isDisabled && "text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                {dayInfo.day}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
export type { CalendarProps }