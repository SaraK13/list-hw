import { sortUsers } from '../utils/userUtils';

const list = [
  { name: 'Anna', status: 'inactive', createdAt: '2025-07-01' },
  { name: 'Bob',  status: 'active',   createdAt: '2025-08-01' },
  { name: 'Cara', status: 'inactive', createdAt: '2025-07-15' },
];

test('sorts by date asc/desc', () => {
    const asc = sortUsers(list, { key: 'date', order: 'asc' });
    const desc = sortUsers(list, { key: 'date', order: 'desc' });
  
    expect(asc.map(u => u.name)).toEqual(['Anna', 'Cara', 'Bob']);
    expect(desc.map(u => u.name)).toEqual(['Bob', 'Cara', 'Anna']);
  });
  
test('status asc = active first; desc = inactive first', () => {
    const asc = sortUsers(list, { key: 'status', order: 'asc' });
    const desc = sortUsers(list, { key: 'status', order: 'desc' });

    expect(asc.map(u => u.name)[0]).toBe('Bob');
    expect(desc.map(u => u.name)[0]).not.toBe('Bob');
});