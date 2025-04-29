import React from 'react';
interface BreadcrumbPath {
  label: string;
  href?: string;
}

export function Breadcrumb({ paths }: { paths: BreadcrumbPath[] }) {
  return (
    <nav className="mb-6 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center text-gray-600">
        {paths.map((path, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="mx-2">{'>'}</span>}
            {path.href ? (
              <a href={path.href} className="hover:underline text-red-900">{path.label}</a>
            ) : (
              <span className="text-gray-900 font-medium">{path.label}</span>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}