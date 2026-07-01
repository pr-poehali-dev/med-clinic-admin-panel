import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Card } from '@/components/Layout';

const rooms = ['Кабинет 1', 'Кабинет 2', 'Кабинет 3', 'Кабинет 4'];
const roomTypes = ['Косметология', 'Косметология', 'Инъекции', 'Лазер'];
const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

type Slot = { name?: string; proc?: string; free?: boolean; lunch?: boolean };
const initial: Record<string, Slot[]> = {
  '09:00': [{ name: 'Анна С.', proc: 'Чистка лица' }, { name: 'Мария К.', proc: 'Hydrafacial' }, { name: 'Елена П.', proc: 'Ботулинотерапия' }, { free: true }],
  '10:00': [{ name: 'Ольга Л.', proc: 'Пилинг PRX-T33' }, { free: true }, { name: 'Светлана Д.', proc: 'Контурная пластика' }, { free: true }],
  '11:00': [{ free: true }, { name: 'Ирина М.', proc: 'Чистка лица' }, { free: true }, { name: 'Александра Р.', proc: 'Лазерная эпиляция' }],
  '12:00': [{ name: 'Наталья З.', proc: 'Уход' }, { free: true }, { name: 'Татьяна В.', proc: 'Биоревитализация' }, { free: true }],
  '13:00': [{ lunch: true }],
  '14:00': [{ free: true }, { name: 'Анастасия Л.', proc: 'Пилинг' }, { free: true }, { name: 'Мария Т.', proc: 'Эпиляция' }],
  '15:00': [{ name: 'Кристина Б.', proc: 'Уход' }, { free: true }, { name: 'Юлия С.', proc: 'Контурная пластика' }, { free: true }],
  '16:00': [{ free: true }, { name: 'Ольга Д.', proc: 'Чистка лица' }, { free: true }, { name: 'Наталья К.', proc: 'Эпиляция' }],
  '17:00': [{ name: 'Ирина Г.', proc: 'Уход' }, { free: true }, { name: 'Алёна П.', proc: 'Ботулинотерапия' }, { free: true }],
  '18:00': [{ free: true }, { name: 'Мария С.', proc: 'Пилинг' }, { free: true }, { free: true }],
  '19:00': [{ free: true }, { free: true }, { free: true }, { free: true }],
  '20:00': [{ free: true }, { free: true }, { free: true }, { free: true }],
};

export default function Schedule() {
  const [grid, setGrid] = useState(initial);
  const [auto, setAuto] = useState(false);

  const runAuto = () => {
    setAuto(true);
    const patients = ['Виктория Н.', 'Дарья К.', 'Полина М.', 'София Р.'];
    const procs = ['Чистка лица', 'Уход', 'Пилинг', 'Консультация'];
    const next = { ...grid };
    let idx = 0;
    Object.keys(next).forEach((t) => {
      if (t === '13:00') return;
      next[t] = next[t].map((c) => {
        if (c.free && Math.random() > 0.5 && idx < 4) {
          const p = { name: patients[idx % 4], proc: procs[idx % 4] };
          idx++;
          return p;
        }
        return c;
      });
    });
    setGrid(next);
    setTimeout(() => setAuto(false), 800);
  };

  const filled = Object.values(grid).flat().filter((c) => !c.free && !c.lunch).length;
  const total = 4 * (times.length - 1);

  return (
    <Layout
      title="Расписание"
      actions={
        <button
          onClick={runAuto}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Icon name="Wand2" size={16} className={auto ? 'animate-spin' : ''} /> Автопланирование слотов
        </button>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Загрузка кабинетов', v: `${Math.round((filled / total) * 100)}%`, i: 'Gauge' },
          { l: 'Записано пациентов', v: String(filled), i: 'Users' },
          { l: 'Свободных слотов', v: String(total - filled), i: 'CalendarPlus' },
          { l: 'Кабинетов в работе', v: '4', i: 'DoorOpen' },
        ].map((m) => (
          <Card key={m.l} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"><Icon name={m.i} size={18} className="text-primary" /></div>
            <div>
              <div className="text-xs text-muted-foreground">{m.l}</div>
              <div className="font-display text-2xl font-semibold">{m.v}</div>
            </div>
          </Card>
        ))}
      </div>

      <button onClick={runAuto} className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
        <Icon name="Wand2" size={16} /> Автопланирование слотов
      </button>

      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">10 июля 2026, пятница</h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent"><Icon name="ChevronLeft" size={16} /></button>
            <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent"><Icon name="ChevronRight" size={16} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-[60px_repeat(4,minmax(120px,1fr))] gap-2 min-w-[560px]">
            <div />
            {rooms.map((r, i) => (
              <div key={r} className="text-center pb-2 border-b border-border">
                <div className="font-medium text-sm">{r}</div>
                <div className="text-[11px] text-muted-foreground">{roomTypes[i]}</div>
              </div>
            ))}
            {times.map((t) => (
              <div key={t} className="contents">
                <div className="text-xs text-muted-foreground flex items-start pt-2">{t}</div>
                {grid[t]?.[0]?.lunch ? (
                  <div className="col-span-4 bg-accent/50 rounded-lg py-3 text-center text-muted-foreground text-sm my-1">Обеденный перерыв</div>
                ) : (
                  grid[t]?.map((c, i) => (
                    <div key={i} className={`rounded-lg px-3 py-2 min-h-[52px] my-1 text-sm ${c.free ? 'bg-muted/40 text-muted-foreground text-center flex items-center justify-center hover:bg-accent/60 cursor-pointer' : 'bg-accent/60 border border-primary/10'}`}>
                      {c.free ? '+ Свободно' : (
                        <>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.proc}</div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Layout>
  );
}
