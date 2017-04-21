export const {{name}} = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
    ...attrs
  } = props;

  const classStack = FcUtils.createClassStack([
    '{{name}}',
    Rucksack.createVariants('{{name}}--', variant),
    className
  ]);

  return (
    <Tag className={classStack} {...attrs}>
      {children}
    </Tag>
  );
};

{{name}}.defaultProps = {
  tagName: 'div',
  variant: 'default'
}

{{name}}.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node
};


export default {{name}};
