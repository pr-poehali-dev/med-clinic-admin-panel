import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Avatar, Card } from '@/components/Layout';
import { toast } from 'sonner';

const sourceColors: Record<string, string> = {
  Instagram: 'bg-pink-100 text-pink-700',
  'Сайт': 'bg-sky-100 text-sky-700',
  Telegram: 'bg-blue-100 text-blue-700',
  'ВКонтакте': 'bg-indigo-100 text-indigo-700',
  Реклама: 'bg-amber-100 text-amber-700',
};

interface Lead { name: string; phone: string; req: string; source: string; status: string; time: string }
const initial: Lead[] = [
  { name: 'Екатерина Лебедева', phone: '+7 921 555-12-34', req: 'Убрать пигментацию', source: 'Instagram', status: 'Новая', time: '11:15' },
  { name: 'Анастасия Морозова', phone: '+7 916 234-56-78', req: 'Инъекции, носогубные складки', source: 'Сайт', status: 'В работе', time: '10:58' },
  { name: 'Ольга Виноградова', phone: '+7 903 111-22-33', req: 'Подбор ухода', source: 'Telegram', status: 'В работе', time: '10:42' },
  { name: 'Юлия Костина', phone: '+7 925 444-55-66', req: 'Лазерная эпиляция', source: 'ВКонтакте', status: 'Назначено', time: '10:30' },
  { name: 'Татьяна Самойлова', phone: '+7 917 777-88-99', req: 'Контурная пластика губ', source: 'Реклама', status: 'Новая', time: '10:12' },
];

const statusColors: Record<string, string> = {
  'Новая': 'bg-primary/15 text-primary',
  'В работе': 'bg-amber-100 text-amber-700',
  'Назначено': 'bg-emerald-100 text-emerald-700',
};

export default function Leads() {
  const [leads, setLeads] = useState(initial);
  const [form, setForm] = useState({ name: '', phone: '', req: '', source: 'Сайт' });

  const submit = () => {
    if (!form.name || !form.phone) { toast.error('Заполните имя и телефон'); return; }
    setLeads((l) => [{ ...form, status: 'Новая', time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) }, ...l]);
    toast.success('Лид добавлен в систему');
    setForm({ name: '', phone: '', req: '', source: 'Сайт' });
  };

  const embed = `<iframe src="https://скл.рф/lead-form" width="100%" height="480" frameborder="0"></iframe>`;

  return (
    <Layout title="Лиды">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Всего лидов', v: String(leads.length + 18), i: 'Users' },
          { l: 'Новые сегодня', v: '23', i: 'UserPlus' },
          { l: 'В работе', v: '14', i: 'Loader' },
          { l: 'Конверсия', v: '36%', i: 'TrendingUp' },
        ].map((m) => (
          <Card key={m.l} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"><Icon name={m.i} size={18} className="text-primary" /></div>
            <div><div className="text-xs text-muted-foreground">{m.l}</div><div className="font-display text-2xl font-semibold">{m.v}</div></div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <Card className="p-4 md:p-5">
          <h2 className="font-display text-xl font-semibold mb-4">Входящие заявки</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-muted-foreground text-xs border-b border-border">
                  <th className="pb-3 font-medium">Клиент</th>
                  <th className="pb-3 font-medium">Запрос</th>
                  <th className="pb-3 font-medium">Источник</th>
                  <th className="pb-3 font-medium">Статус</th>
                  <th className="pb-3 font-medium">Время</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-accent/20">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={l.name} size={34} />
                        <div><div className="font-medium">{l.name}</div><div className="text-xs text-muted-foreground">{l.phone}</div></div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{l.req}</td>
                    <td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-md ${sourceColors[l.source] || 'bg-accent'}`}>{l.source}</span></td>
                    <td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-md ${statusColors[l.status]}`}>{l.status}</span></td>
                    <td className="py-3 text-muted-foreground text-xs">{l.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-display text-lg font-semibold mb-1">Форма захвата лидов</h2>
            <p className="text-xs text-muted-foreground mb-4">Используйте для сбора заявок из любых источников</p>
            <div className="space-y-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Имя клиента" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Телефон" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" />
              <input value={form.req} onChange={(e) => setForm({ ...form, req: e.target.value })} placeholder="Запрос / услуга" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" />
              <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-card outline-none focus:border-primary">
                {Object.keys(sourceColors).map((s) => <option key={s}>{s}</option>)}
              </select>
              <button onClick={submit} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2">
                <Icon name="Send" size={16} /> Добавить лид
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-lg font-semibold mb-2">Код для встройки на сайт</h3>
            <pre className="bg-muted/50 rounded-xl p-3 text-[11px] text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all">{embed}</pre>
            <button onClick={() => { navigator.clipboard?.writeText(embed); toast.success('Код скопирован'); }} className="w-full mt-3 py-2 rounded-xl border border-border text-sm hover:bg-accent/40 flex items-center justify-center gap-2">
              <Icon name="Copy" size={15} /> Скопировать код
            </button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
