import { forwardRef, useEffect, useRef } from "react";

export const IndeterminateCheckbox = forwardRef(
  // @todo find type for ref
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

IndeterminateCheckbox.displayName = "IndeterminateCheckbox";
