const STATUS_LABELS = {
  verified: 'Verified route data',
  partially_verified: 'Preliminary route data',
  unverified: 'Unverified route data',
  outdated: 'Outdated route data',
}

export function DataStatusBadge({ status = 'unverified', className = '' }) {
  const label = STATUS_LABELS[status] ?? STATUS_LABELS.unverified

  return (
    <span
      className={[
        'inline-flex rounded-md px-2 py-1 text-xs font-semibold',
        status === 'verified'
          ? 'bg-primary-soft text-primary dark:text-primary-hover'
          : 'bg-surface-muted text-text-secondary',
        className,
      ].join(' ')}
    >
      {label}
    </span>
  )
}
