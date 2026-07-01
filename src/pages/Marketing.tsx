import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Avatar, Card } from '@/components/Layout';

const tasks = [
  { task: 'Запустить рекламу «Лазерная эпиляция -15%»', resp: 'Ольга Смирнова', role: 'Маркетолог', due: '15 июля', progress: 80, status: 'В работе' },
  { task: 'Обновить креативы для Instagram', resp: 'Алексей Петров', role: 'SMM', due: '18 июля', progress: 45, status: 'В работе' },
  { task: 'Email-рассылка по базе пациентов', resp: 'Мария Иванова', role: 'Маркетолог', due: '20 июля', progress: 100, status: 'Готово' },
  { task: 'Настроить таргетинг ВКонтакте — Краснодар', resp: 'Игорь Николаев', role: 'Таргетолог', due: '22 июля', progress: 20, status: 'В работе' },
  { task: 'Съёмка отзывов пациентов', resp: 'Наталья Кузнецова', role: 'Контент', due: '25 июля', progress: 0, status: 'Запланировано' },
  { task: 'Аудит конверсии посадочных страниц', resp: 'Ольга Смирнова', role: 'Маркетолог', due: '28 июля', progress: 30, status: 'В работе' },
];

const budget = [
  { item: 'Таргетированная реклама (Instagram, VK)', plan: 150000, fact: 98000, cat: 'Реклама' },
  { item: 'Контекстная реклама (Яндекс.Директ)', plan: 120000, fact: 76000, cat: 'Реклама' },
  { item: 'Производство контента и съёмки', plan: 80000, fact: 45000, cat: 'Контент' },
  { item: 'Работа блогеров и амбассадоров', plan: 100000, fact: 60000, cat: 'PR' },
  { item: 'Email / SMS-рассылки', plan: 30000, fact: 18000, cat: 'CRM' },
  { item: 'Полиграфия и оформление клиник', plan: 45000, fact: 22000, cat: 'Офлайн' },
];

const statusColors: Record<string, string> = {
  'Готово': 'bg-emerald-100 text-emerald-700',
  'В работе': 'bg-amber-100 text-amber-700',
  'Запланировано': 'bg-sky-100 text-sky-700',
};

const fmt = (n: number) => n.toLocaleString('ru') + ' ₽';

export default function Marketing() {
  const [tab, setTab] = useState<'tasks' | 'budget'>('tasks');
  const totalPlan = budget.reduce((s, b) => s + b.plan, 0);
  const totalFact = budget.reduce((s, b) => s + b.fact, 0);

  return (
    <Layout title="Маркетинг">
      <div className="flex gap-2 border-b border-border">
        {[['tasks', 'План задач', 'ListTodo'], ['budget', 'Бюджет', 'Wallet']].map(([k, l, i]) => (
          <button
            key={k}
            onClick={() => setTab(k as 'tasks' | 'budget')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === k ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name={i} size={16} /> {l}
          </button>
        ))}
      </div>

      {tab === 'tasks' ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { l: 'Всего задач', v: String(tasks.length), i: 'ListTodo' },
              { l: 'В работе', v: String(tasks.filter((t) => t.status === 'В работе').length), i: 'Loader' },
              { l: 'Готово', v: String(tasks.filter((t) => t.status === 'Готово').length), i: 'CheckCircle2' },
              { l: 'Ответственных', v: '5', i: 'Users' },
            ].map((m) => (
              <Card key={m.l} className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"><Icon name={m.i} size={18} className="text-primary" /></div>
                <div><div className="text-xs text-muted-foreground">{m.l}</div><div className="font-display text-2xl font-semibold">{m.v}</div></div>
              </Card>
            ))}
          </div>

          <Card className="p-4 md:p-5">
            <h2 className="font-display text-xl font-semibold mb-4">Задачи, ответственные и сроки</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="text-left text-muted-foreground text-xs border-b border-border">
                    <th className="pb-3 font-medium">Задача</th>
                    <th className="pb-3 font-medium">Ответственный</th>
                    <th className="pb-3 font-medium">Срок</th>
                    <th className="pb-3 font-medium w-40">Прогресс</th>
                    <th className="pb-3 font-medium">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-accent/20">
                      <td className="py-3 font-medium max-w-[260px]">{t.task}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={t.resp} size={30} />
                          <div><div className="text-sm">{t.resp}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{t.due}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${t.progress}%` }} /></div>
                          <span className="text-xs text-muted-foreground w-9 text-right">{t.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-md ${statusColors[t.status]}`}>{t.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5"><div className="text-xs text-muted-foreground mb-1">План бюджета</div><div className="font-display text-3xl font-semibold">{fmt(totalPlan)}</div></Card>
            <Card className="p-5"><div className="text-xs text-muted-foreground mb-1">Израсходовано</div><div className="font-display text-3xl font-semibold">{fmt(totalFact)}</div></Card>
            <Card className="p-5"><div className="text-xs text-muted-foreground mb-1">Остаток</div><div className="font-display text-3xl font-semibold text-emerald-600">{fmt(totalPlan - totalFact)}</div></Card>
          </div>

          <Card className="p-4 md:p-5">
            <h2 className="font-display text-xl font-semibold mb-4">Бюджет по плану маркетинга</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="text-left text-muted-foreground text-xs border-b border-border">
                    <th className="pb-3 font-medium">Статья расходов</th>
                    <th className="pb-3 font-medium">Категория</th>
                    <th className="pb-3 font-medium text-right">План</th>
                    <th className="pb-3 font-medium text-right">Факт</th>
                    <th className="pb-3 font-medium w-32">Освоено</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.map((b, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-accent/20">
                      <td className="py-3 font-medium">{b.item}</td>
                      <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-md bg-accent text-primary">{b.cat}</span></td>
                      <td className="py-3 text-right">{fmt(b.plan)}</td>
                      <td className="py-3 text-right text-muted-foreground">{fmt(b.fact)}</td>
                      <td className="py-3">
                        <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${Math.round((b.fact / b.plan) * 100)}%` }} /></div>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td className="pt-3">Итого</td>
                    <td />
                    <td className="pt-3 text-right">{fmt(totalPlan)}</td>
                    <td className="pt-3 text-right">{fmt(totalFact)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </Layout>
  );
}
