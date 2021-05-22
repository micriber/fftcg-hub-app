import {useEffect} from 'react';
import useAsyncFn from './useAsyncFn';
import {FnReturningPromise} from './util';

export type {AsyncState, AsyncFnReturn} from './useAsyncFn';

export default function useAsync<T extends FnReturningPromise>(fn: T) {
  const [state, callback] = useAsyncFn(fn, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
