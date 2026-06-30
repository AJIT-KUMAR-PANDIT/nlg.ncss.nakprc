import { lazy } from 'react';

// Automatically import all meta.json files
const metaModules = import.meta.glob('../ncss-components/**/meta.json', { eager: true });
// Automatically import all demo.tsx files lazily
const demoModules = import.meta.glob('../ncss-components/**/demo.tsx');
// Import all source code as raw strings for the copy button
const sourceModules = import.meta.glob('../ncss-components/**/source/*.tsx', { query: '?raw', import: 'default', eager: true });
const sourceCodeStringFallback = import.meta.glob('../ncss-components/**/source/*.ts', { query: '?raw', import: 'default', eager: true });

export interface ComponentMeta {
  name: string;
  slug: string;
  description: string;
  installation: string;
  props: { name: string; type: string; default: string; description: string }[];
}

export interface RegistryItem {
  meta: ComponentMeta;
  Demo: React.LazyExoticComponent<any>;
  files: { filename: string; code: string }[];
}

export const registry: Record<string, RegistryItem> = {};

for (const path in metaModules) {
  const meta = metaModules[path] as ComponentMeta;
  const slug = meta.slug;
  const folderPath = path.replace('/meta.json', '');
  
  const demoPath = `${folderPath}/demo.tsx`;
  const Demo = lazy(demoModules[demoPath] as any);
  
  const files: { filename: string; code: string }[] = [];
  
  // Find all source files for this component
  for (const srcPath in sourceModules) {
    if (srcPath.startsWith(folderPath + '/source/')) {
      const filename = srcPath.replace(folderPath + '/source/', '');
      files.push({ filename, code: sourceModules[srcPath] as string });
    }
  }
  for (const srcPath in sourceCodeStringFallback) {
    if (srcPath.startsWith(folderPath + '/source/')) {
      const filename = srcPath.replace(folderPath + '/source/', '');
      files.push({ filename, code: sourceCodeStringFallback[srcPath] as string });
    }
  }

  registry[slug] = {
    meta,
    Demo,
    files,
  };
}

export const componentsList = Object.values(registry).map(item => item.meta);
