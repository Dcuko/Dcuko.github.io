import { MDXRemote } from 'next-mdx-remote/rsc';
import { blocos } from './blocos';

export function Mdx({ source }: { source: string }) {
  return (
    <div className="proj-corpo-mdx">
      <MDXRemote source={source} components={blocos} />
    </div>
  );
}
