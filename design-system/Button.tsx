// src/components/Button/Button.tsx
import React from "react";
import clsx from "classnames";
import Link from "next/link";
import { UrlObject } from "url";

type ButtonVariant = "contained" | "text";
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "primary" | "error";
type Href = string | UrlObject;

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

// Props for button element
interface ButtonAsButtonProps
  extends
    BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never;
  type?: "button" | "submit" | "reset";
}

// Props for Next.js Link
interface ButtonAsLinkProps extends
  BaseButtonProps,
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseButtonProps | "href"
  > {
  href: Href;
  target?: string;
  rel?: string;
  scroll?: boolean;
  shallow?: boolean;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (props, ref) => {
    const {
      variant = "contained",
      size = "md",
      color = "primary",
      fullWidth = false,
      disabled = false,
      className,
      children,
      leftIcon,
      rightIcon,
      ...rest
    } = props;

    const baseStyles = clsx(
      "inline-flex items-center justify-center rounded-md font-medium cursor-pointer",
      "transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-60",
      {
        "w-full": fullWidth,
      },
    );

    const colorStyles = {
      primary: {
        contained: clsx(
          // Light & Dark: Dark background, light text
          "bg-primary-600 text-white",
          "hover:bg-primary-500",
          "active:bg-primary-400",
          "focus:ring-2 focus:ring-primary-100 focus:ring-offset-2",
          "disabled:opacity-50",
        ),
        text: clsx(
          // Light: Dark text, light hover
          "text-text-primary",
          "hover:bg-primary-200",
          "active:bg-primary-300",
          // Dark: Light text, dark hover
          "dark:text-text-primary",
          "dark:hover:bg-primary-300",
          "disabled:opacity-50",
        ),
      },
      error: {
        contained: clsx(
          "bg-error-400 text-white",
          "hover:bg-error-300",
          "active:bg-error-300",
          "focus:ring-2 focus:ring-error-300 focus:ring-offset-2",
          "disabled:opacity-50",
        ),
        text: clsx(
          "text-error-400",
          "hover:bg-error-100/20",
          "active:bg-error-100/30",
          "dark:text-error-200",
          "dark:hover:bg-error-300/10",
          "disabled:opacity-50",
        ),
      },
    };
    const variantStyles = {
      contained: colorStyles[color].contained,
      text: colorStyles[color].text,
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-base gap-2",
      lg: "px-6 py-3 text-lg gap-2.5",
    };

    const classes = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      "focus:ring-offset-background-100",
      className,
    );

    const content = (
      <>
        {leftIcon && (
          <span className="inline-flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className="inline-flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </>
    );

    // If href is provided, render as Link
    if (props.href) {
      const { href, className, ...linkProps } = props;

      return (
        <Link
          href={href}
          className={classes}
          {...(linkProps as any)}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    // Otherwise render as button
    return (
      <button
        type={props.type as "button" | "submit" | "reset" | undefined}
        className={classes}
        disabled={disabled}
        {...(rest as ButtonAsButtonProps)}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
