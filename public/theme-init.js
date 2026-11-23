;(function () {
  try {
    var stored = localStorage.getItem('para_theme')
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    var theme =
      stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  } catch {
    // Ignore storage or media query errors.
  }
})()
