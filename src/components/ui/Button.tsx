import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-olive-600 text-white hover:bg-olive-500 hover:scale-[1.02]",
  secondary:
    "bg-terra-500 text-white hover:bg-terra-400 hover:scale-[1.02]",
  outline:
    "border-2 border-olive-600 text-olive-600 hover:bg-olive-50",
  ghost:
    "text-olive-600 hover:bg-olive-50",
};

interface BaseProps {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

/**
 * Button - Polymorphic button/link component with variant and size support.
 * Palette: olive (primary), terra (secondary), prune, cream, bark.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Réserver</Button>
 * <Button href="/menu" variant="outline">Voir le menu</Button>
 * ```
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-lg font-medium transition-all",
    variants[variant],
    {
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
    },
    className
  );

  if ("href" in props && props.href) {
    return <a className={classes} {...(props as LinkProps)} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
