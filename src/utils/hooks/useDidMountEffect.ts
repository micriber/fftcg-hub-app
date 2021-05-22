import {useEffect, useRef} from 'react';

function useDidMountEffect<T>(fn: (...args: any[]) => any) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      fn();
    } else {
      didMount.current = true;
    }
  }, [fn]);
}

export default useDidMountEffect;
