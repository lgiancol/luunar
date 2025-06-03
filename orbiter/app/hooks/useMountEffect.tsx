import { useEffect, type EffectCallback } from 'react';

export default function useMountEffect(cb: EffectCallback) {
  return useEffect(() => {
    cb();
  }, []);
}
