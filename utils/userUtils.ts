export type SortKey = 'none' | 'date' | 'status';
export type SortOrder = 'asc' | 'desc';
export type SortSpec = { key: SortKey; order: SortOrder };

export function sortUsers<T extends { createdAt: string; status: string; name: string }>(
  list: T[],
  spec: SortSpec,
): T[] {
    if (spec.key === 'none') return list;

    const copy = [...list];
  
    if (spec.key === 'date') {
      copy.sort((a, b) => {
        const da = new Date(a.createdAt).getTime();
        const db = new Date(b.createdAt).getTime();
        return spec.order === 'asc' ? da - db : db - da;
      });
    } else if (spec.key === 'status') {
      // rank: active=0, inactive=1
      copy.sort((a, b) => {
        const ra = a.status === 'active' ? 0 : 1;
        const rb = b.status === 'active' ? 0 : 1;
        const cmp = ra - rb; // active-first if asc; inactive-first if desc by flipping sign
        if (cmp !== 0) return spec.order === 'asc' ? cmp : -cmp;
        return a.name.localeCompare(b.name);
      });
    }

  return copy;
}