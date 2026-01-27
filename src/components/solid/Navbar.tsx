import { createSignal, For, Show } from 'solid-js';
import classNames from 'classnames';
import { Button } from './Button';

const tabs = [
    {
        label: 'Works',
        path: '/works',
    },
    {
        label: 'Posts',
        path: '/posts',
    },
    {
        label: 'Contact',
        path: '/contact',
    },
    {
        label: 'Zehra is Missing',
        path: '/zehra',
    },
];

interface NavbarProps {
    currentPath: string;
}

export default function Navbar(props: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);

    return (
        <header class="z-20 flex justify-between gap-5 py-4 px-4 bg-background-200 dark:bg-gray-800 bg-opacity-60 backdrop-blur left-0 right-0 dark:text-white">
            <Button
                href="/"
                variant="text"
                size="md"
                class="group flex gap-3 items-center dark:text-white"
            >
                <img
                    class="group-hover:rotate-[20deg] dark:invert transition-transform"
                    src="/images/footprint.png"
                    height={24}
                    width={24}
                    alt="logo"
                />
                <h1 class="dark:text-white">Mert's Desktop</h1>
            </Button>

            <nav class="hidden md:flex gap-2">
                <For each={tabs}>
                    {(tab) => (
                        <Button
                            href={tab.path}
                            variant="text"
                            size="md"
                            class={classNames(
                                props.currentPath.includes(tab.path) && 'bg-background-300 dark:bg-gray-700',
                            )}
                        >
                            {tab.label}
                        </Button>
                    )}
                </For>
            </nav>

            <Button
                class="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen())}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen()}
                variant="text"
            >
                <HamburgerButton />
            </Button>

            <Show when={isMenuOpen()}>
                <nav class="fixed right-4 top-12 flex flex-col bg-orange-300 dark:bg-gray-900 rounded-md z-50">
                    <For each={tabs}>
                        {(tab) => (
                            <Button
                                href={tab.path}
                                variant="text"
                                size="md"
                                class={classNames(
                                    'rounded-none',
                                    props.currentPath.includes(tab.path) && 'bg-primary-100 dark:bg-gray-700',
                                )}
                            >
                                {tab.label}
                            </Button>
                        )}
                    </For>
                </nav>
            </Show>
        </header>
    );
}

function HamburgerButton() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 6H21"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />
            <path
                d="M3 12H21"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />
            <path
                d="M3 18H21"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
    );
}