/* eslint-disable */
/* @ts-nocheck */
'use client';

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import * as React from 'react';
import { DayPicker, DayButton, getDefaultClassNames } from 'react-day-picker';

import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// 1) CalendarDayButton: 파일 최상단에 분리
export function CalendarDayButton({
  className: dayBtnClass,
  day,
  modifiers,
  ...dayBtnRest
}: React.ComponentProps<typeof DayButton>) {
  const defaultCN = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn(
        defaultCN.day,
        dayBtnClass,
        // 필요하다면 여기에 추가 스타일
      )}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_middle &&
        !modifiers.range_end
      }
      data-range-start={modifiers.range_start}
      data-range-middle={modifiers.range_middle}
      data-range-end={modifiers.range_end}
      {...dayBtnRest}
    />
  );
}

// 2) CalendarRoot
const CalendarRoot = React.forwardRef<
  HTMLDivElement,
  { className?: string; rootRef?: React.Ref<HTMLDivElement> } & any
>(({ className: rootClass, rootRef, ...rootRest }, ref) => (
  <div
    data-slot="calendar"
    ref={rootRef || ref}
    className={cn(rootClass)}
    {...rootRest}
  />
));
CalendarRoot.displayName = 'CalendarRoot';

// 3) CalendarChevron
function CalendarChevron({
  className: chevClass,
  orientation,
  ...chevRest
}: { className?: string; orientation?: 'left' | 'right' } & any) {
  if (orientation === 'left')
    return (
      <ChevronLeftIcon className={cn('size-4', chevClass)} {...chevRest} />
    );
  if (orientation === 'right')
    return (
      <ChevronRightIcon className={cn('size-4', chevClass)} {...chevRest} />
    );
  return <ChevronDownIcon className={cn('size-4', chevClass)} {...chevRest} />;
}

// 4) CalendarWeekNumber
function CalendarWeekNumber({
  children,
  ...weekProps
}: React.ComponentProps<'td'>) {
  return (
    <td {...weekProps}>
      <div className="flex size-(--cell-size) items-center justify-center text-center">
        {children}
      </div>
    </td>
  );
}

// 5) 메인 Calendar
function Calendar({
  className: calClass,
  classNames: customCN,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components: extraComponents,
  ...dayPickerRest
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultCN = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        calClass,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (d) =>
          d.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultCN.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          defaultCN.months,
        ),
        month: cn('flex flex-col w-full gap-4', defaultCN.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultCN.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultCN.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultCN.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultCN.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
          defaultCN.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          defaultCN.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0',
          defaultCN.dropdown,
        ),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultCN.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultCN.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
          defaultCN.weekday,
        ),
        week: cn('flex w-full mt-2', defaultCN.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultCN.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultCN.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          defaultCN.day,
        ),
        range_start: cn('rounded-l-md bg-accent', defaultCN.range_start),
        range_middle: cn('rounded-none', defaultCN.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultCN.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md',
          defaultCN.today,
        ),
        outside: cn('text-muted-foreground', defaultCN.outside),
        disabled: cn('text-muted-foreground opacity-50', defaultCN.disabled),
        hidden: cn('invisible', defaultCN.hidden),
        ...customCN,
      }}
      components={{
        // @ts-ignore: CalendarRoot 타입 불일치 무시
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        WeekNumber: CalendarWeekNumber,
        ...extraComponents,
      }}
      {...dayPickerRest}
    />
  );
}

export { Calendar };
