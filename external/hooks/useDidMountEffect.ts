import React, {DependencyList, useEffect, useRef} from 'react';
import {FnReturningPromise} from './util';

function useDidMountEffect<T>(
  fn: (...args: any[]) => any,
  deps: DependencyList = [],
) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      fn();
    } else {
      didMount.current = true;
    }
  }, deps);
}

export default useDidMountEffect;
