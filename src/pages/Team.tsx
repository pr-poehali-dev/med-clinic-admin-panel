import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Avatar, Card } from '@/components/Layout';
import { toast } from 'sonner';

type Role = 'Админ' | 'Админ города' | 'Доктор' | 'Медсестра';
const roleColors: Record<Role, string> = {
  'Админ': 'bg-primary/15 text-primary',
  'Админ города': 'bg-amber-100 text-amber-700',
  'Доктор': 'bg-emerald-100 text-emerald-700',
  'Медсестра': 'bg-sky-100 text-sky-700',
};

const members: { name: string; role: Role; city: string; email: string; on: boolean }[] = [
  { name: 'Лариса Воловик', role: 'Админ', city: 'Все города', email: 'larisa@скл.рф', on: true },
  { name: 'Мария Иванова', role: 'Админ города', city: 'Севастополь', email: 'ivanova@скл.рф', on: true },
  { name: 'Алексей Петров', role: 'Доктор', city: 'Севастополь', email: 'petrov@скл.рф', on: true },
  { name: 'Ольга Смирнова', role: 'Доктор', city: 'Москва', email: 'smirnova@скл.рф', on: false },
  { name: 'Наталья Кузнецова', role: 'Медсестра', city: 'Севастополь', email: 'kuznetsova@скл.рф', on: true },
  { name: 'Дмитрий Соколов', role: 'Доктор', city: 'Санкт-Петербург', email: 'sokolov@скл.рф', on: true },
  { name: 'Екатерина Волкова', role: 'Медсестра', city: 'Владивосток', email: 'volkova@скл.рф', on: false },
  { name: 'Игорь Николаев', role: 'Админ города', city: 'Краснодар', email: 'nikolaev@скл.рф', on: true },
];

const allRoles: Role[] = ['Админ', 'Админ города', 'Доктор', 'Медсестра'];

export default function Team() {
  const [filter, setFilter] = useState<Role | 'Все'>('Все');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Доктор');

  const filtered = filter === 'Все' ? members : members.filter((m) => m.role === filter);

  const copyLink = () => {
    navigator.clipboard?.writeText('https://скл.рф/join/team-invite-b73k9');
    toast.success('Ссылка-приглашение скопирована');
  };
  const sendInvite = () => {
    if (!email.includes('@')) { toast.error('Введите корректный email'); return; }
    toast.success(`Приглашение (${role}) отправлено на ${email}`);
    setEmail(''); setInviteOpen(false);
  };

  return (
    <Layout
      title="Команда"
      actions={
        <button onClick={() => setInviteOpen(true)} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Icon name="UserPlus" size={16} /> Пригласить сотрудника
        </button>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allRoles.map((r) => (
          <Card key={r} className="p-4">
            <div className={`inline-block text-xs px-2 py-0.5 rounded-md mb-2 ${roleColors[r]}`}>{r}</div>
            <div className="font-display text-2xl font-semibold">{members.filter((m) => m.role === r).length}</div>
            <div className="text-xs text-muted-foreground">сотрудников</div>
          </Card>
        ))}
      </div>

      <button onClick={() => setInviteOpen(true)} className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
        <Icon name="UserPlus" size={16} /> Пригласить сотрудника
      </button>

      <Card className="p-4 md:p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {(['Все', ...allRoles] as const).map((r) => (
            <button key={r} onClick={() => setFilter(r)} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${filter === r ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent/50'}`}>{r}</button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-muted-foreground text-xs border-b border-border">
                <th className="pb-3 font-medium">Сотрудник</th>
                <th className="pb-3 font-medium">Роль</th>
                <th className="pb-3 font-medium">Город</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.email} className="border-b border-border/50 hover:bg-accent/20">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} size={36} />
                      <span className="font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-md ${roleColors[m.role]}`}>{m.role}</span></td>
                  <td className="py-3 text-muted-foreground">{m.city}</td>
                  <td className="py-3 text-muted-foreground">{m.email}</td>
                  <td className="py-3">
                    <span className={`flex items-center gap-1.5 text-xs ${m.on ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.on ? 'bg-emerald-500' : 'bg-muted-foreground/40'}`} />
                      {m.on ? 'Активен' : 'Не в сети'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {inviteOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setInviteOpen(false)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-semibold">Пригласить сотрудника</h3>
              <button onClick={() => setInviteOpen(false)}><Icon name="X" size={20} /></button>
            </div>
            <label className="text-sm font-medium mb-1.5 block">Роль</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {allRoles.map((r) => (
                <button key={r} onClick={() => setRole(r)} className={`text-xs px-3 py-1.5 rounded-full border ${role === r ? 'bg-primary text-primary-foreground border-primary' : 'border-border'}`}>{r}</button>
              ))}
            </div>
            <button onClick={copyLink} className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border hover:bg-accent/40 mb-4 text-sm">
              <span className="flex items-center gap-2"><Icon name="Link" size={16} className="text-primary" /> Скопировать ссылку-приглашение</span>
              <Icon name="Copy" size={15} className="text-muted-foreground" />
            </button>
            <div className="text-xs text-muted-foreground mb-2">или отправьте на почту</div>
            <div className="flex gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="flex-1 border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" />
              <button onClick={sendInvite} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Отправить</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
