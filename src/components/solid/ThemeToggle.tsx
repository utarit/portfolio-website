import { createSignal, createEffect, onMount } from 'solid-js';

type Theme = 'system' | 'light' | 'dark';

export default function ThemeToggle() {
    const [theme, setTheme] = createSignal<Theme>('system');

    onMount(() => {
        const themeFromStorage = localStorage.getItem('theme');
        if (themeFromStorage) {
            setTheme(themeFromStorage as Theme);
        }
    });

    createEffect(() => {
        const handleEvent = (event: MediaQueryListEvent) => {
            const themeFromStorage = localStorage.getItem('theme');

            if (themeFromStorage !== 'system') return;

            const newColorScheme = event.matches ? 'dark' : 'light';
            if (newColorScheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleEvent);

        return () => mediaQuery.removeEventListener('change', handleEvent);
    });

    const handleChange = (event: Event) => {
        const value = (event.target as HTMLSelectElement).value as Theme;

        setTheme(value);
        localStorage.setItem('theme', value);

        if (value === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (value === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            // value === system
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    return (
        <label>
            Theme:{' '}
            <select
                class="dark:text-black p-1 rounded"
                name="theme"
                value={theme()}
                onChange={handleChange}
            >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>
    );
}