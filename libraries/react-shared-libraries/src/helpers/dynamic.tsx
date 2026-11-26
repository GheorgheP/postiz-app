import { ComponentType, lazy, ReactNode, Suspense } from 'react';

// next/dynamic: a component loaded on first render, showing `loading` in its
// place meanwhile. There is no server rendering any more, so `ssr: false` is
// accepted for the existing call sites and has nothing left to do.
export default function dynamic<P extends object>(
  loader: () => Promise<ComponentType<P> | { default: ComponentType<P> }>,
  options?: { ssr?: boolean; loading?: () => ReactNode }
) {
  const Component = lazy(async () => {
    const mod = await loader();
    return 'default' in mod ? mod : { default: mod };
  });
  return function DynamicComponent(props: P) {
    return (
      <Suspense fallback={options?.loading?.() ?? null}>
        <Component {...props} />
      </Suspense>
    );
  };
}
