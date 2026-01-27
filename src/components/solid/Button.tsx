import { JSX, splitProps, Show } from 'solid-js';
import classNames from 'classnames';

type ButtonVariant = 'contained' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'primary' | 'error';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    href?: string;
    target?: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
}

export function Button(props: ButtonProps) {
    const [local, others] = splitProps(props, [
        'variant', 'size', 'color', 'href', 'target', 'class',
        'children', 'leftIcon', 'rightIcon'
    ]);

    const variant = () => local.variant || 'contained';
    const size = () => local.size || 'md';
    const color = () => local.color || 'primary';

    const classes = () => classNames(
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        {
            // Primary color variants
            'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-400 focus:ring-primary-100':
                variant() === 'contained' && color() === 'primary',
            'text-text-primary hover:bg-primary-200 active:bg-primary-300 dark:text-white dark:text-text-primary dark:hover:bg-primary-600':
                variant() === 'text' && color() === 'primary',

            // Error color variants
            'bg-error-400 text-white hover:bg-error-300 active:bg-error-300 focus:ring-error-300':
                variant() === 'contained' && color() === 'error',
            'text-error-400 hover:bg-error-100/20 active:bg-error-100/30 dark:text-error-200 dark:hover:bg-error-300/10':
                variant() === 'text' && color() === 'error',

            // Sizes
            'px-3 py-1.5 text-sm gap-1.5': size() === 'sm',
            'px-4 py-2 text-base gap-2': size() === 'md',
            'px-6 py-3 text-lg gap-2.5': size() === 'lg',
        },
        'focus:ring-offset-background-100',
        local.class
    );

    const content = () => (
        <>
            <Show when={local.leftIcon}>
                <span class="inline-flex items-center justify-center">
                    {local.leftIcon}
                </span>
            </Show>
            {local.children}
            <Show when={local.rightIcon}>
                <span class="inline-flex items-center justify-center">
                    {local.rightIcon}
                </span>
            </Show>
        </>
    );

    return (
        <Show
            when={local.href}
            fallback={
                <button class={classes()} {...others}>
                    {content()}
                </button>
            }
        >
            <a
                href={local.href!}
                target={local.target}
                class={classes()}
            >
                {content()}
            </a>
        </Show>
    );
}