export default function NoWidowText({ children, as = 'span', className = '', ...props }) {
  const Tag = as;
  const content = typeof children === 'string'
    ? children.replace(/ ([^ ]*)$/, '\u00A0$1')
    : children;

  return <Tag className={className} {...props}>{content}</Tag>;
}
