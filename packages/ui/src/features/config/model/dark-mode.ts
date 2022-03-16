const darkMode = {
  isSystemDark: () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  setHtmlClass: (isDark: boolean) => {
    const htmlClass = document.documentElement.classList;
    if (htmlClass.contains('dark') && !isDark) {
      htmlClass.remove('dark');
    }
    if (!htmlClass.contains('dark') && isDark) {
      htmlClass.add('dark');
    }
  },
};

export default darkMode;
