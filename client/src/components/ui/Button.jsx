const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const Button = ({
  variant = 'primary',
  className = '',
  as: Component = 'button',
  children,
  ...props
}) => (
  <Component className={`${variants[variant]} ${className}`} {...props}>
    {children}
  </Component>
);

export default Button;
