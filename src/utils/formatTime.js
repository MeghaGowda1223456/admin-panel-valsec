import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fetchFormattedDate(unFormattedDate) {
  const date = new Date(unFormattedDate);

  const year = date.getFullYear();
  const month = '0'.concat(date.getMonth() + 1).slice(-2);
  const day = '0'.concat(date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
