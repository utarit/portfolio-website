import { JSX } from 'solid-js';
import classNames from 'classnames';
import { Button } from './Button';

interface SocialButtonProps {
    href: string;
    children: JSX.Element;
    class?: string;
}

export default function SocialButton(props: SocialButtonProps) {
    return (
        <Button
            href={props.href}
            target="_blank"
            variant="text"
        >
            {props.children}
        </Button>
    );
}