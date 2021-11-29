export default function formatDatetime(timestamp) {
  const date = new Date(timestamp)
  const dateString = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)

  return dateString
}
