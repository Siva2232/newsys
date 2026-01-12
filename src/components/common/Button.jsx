import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20",
    secondary:
      "bg-slate-800 text-white hover:bg-slate-700",
    outline:
      "border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
