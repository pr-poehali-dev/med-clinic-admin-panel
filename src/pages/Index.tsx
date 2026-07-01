import { useState } from 'react';
import Icon from '@/components/ui/icon';

const VIDEO_IMG =
  'https://cdn.poehali.dev/projects/f0055936-a3cd-4ff9-a9fa-6e376202e022/files/1ae3c293-ad7e-49c0-b440-653da15aae7b.jpg';

const nav = [
  { icon: 'LayoutGrid', label: 'Дашборд', active: true },
  { icon: 'Sparkles', label: 'Лиды' },
  { icon: 'CalendarDays', label: 'Расписание' },
  { icon: 'UserRound', label: 'Специалисты' },
  { icon: 'Users', label: 'Пациенты' },
  { icon: 'Video', label: 'Видеовстречи' },
  { icon: 'UsersRound', label: 'Команда' },
  { icon: 'MessageCircle', label: 'Чаты' },
  { icon: 'FileBarChart', label: 'Отчёты' },
  { icon: 'Settings', label: 'Настройки' },
];

const cities = ['Санкт-Петербург', 'Москва', 'Севастополь', 'Владивосток', 'Краснодар'];

const metrics = [
  { icon: 'UserPlus', label: 'Новые лиды сегодня', value: '23', sub: '+ 7 к вчера', subColor: 'text-emerald-600' },
  { icon: 'MessagesSquare', label: 'Назначено консультаций от Ларисы', value: '14', sub: 'из 18 лидов', subColor: 'text-muted-foreground' },
  { icon: 'Heart', label: 'Конверсия в очные визиты', value: '36%', sub: '+ 6% к вчера', subColor: 'text-emerald-600' },
  { icon: 'UserCheck', label: 'Специалистов доступно сегодня', value: '5', sub: 'из 6', subColor: 'text-muted-foreground' },
];

const rooms = ['Кабинет 1', 'Кабинет 2', 'Кабинет 3', 'Кабинет 4'];
const roomTypes = ['Косметология', 'Косметология', 'Инъекции', 'Лазер'];
type Slot = { name?: string; proc?: string; free?: boolean; lunch?: boolean; dash?: boolean };
const schedule: { time: string; cells: Slot[] }[] = [
  { time: '09:00', cells: [{ name: 'Анна С.', proc: 'Чистка лица' }, { name: 'Мария К.', proc: 'Уход Hydrafacial' }, { name: 'Елена П.', proc: 'Ботулинотерапия' }, { free: true }] },
  { time: '10:00', cells: [{ name: 'Ольга Л.', proc: 'Пилинг PRX-T33' }, { free: true }, { name: 'Светлана Д.', proc: 'Контурная пластика' }, { free: true }] },
  { time: '11:00', cells: [{ free: true }, { name: 'Ирина М.', proc: 'Чистка лица' }, { free: true }, { name: 'Александра Р.', proc: 'Лазерная эпиляция' }] },
  { time: '12:00', cells: [{ name: 'Наталья З.', proc: 'Уход' }, { free: true }, { name: 'Татьяна В.', proc: 'Биоревитализация' }, { free: true }] },
  { time: '13:00', cells: [{ lunch: true }] },
  { time: '14:00', cells: [{ free: true }, { name: 'Анастасия Л.', proc: 'Пилинг' }, { free: true }, { name: 'Мария Т.', proc: 'Лазерная эпиляция' }] },
  { time: '15:00', cells: [{ name: 'Кристина Б.', proc: 'Уход' }, { free: true }, { name: 'Юлия С.', proc: 'Контурная пластика' }, { free: true }] },
  { time: '16:00', cells: [{ free: true }, { name: 'Ольга Д.', proc: 'Чистка лица' }, { free: true }, { name: 'Наталья К.', proc: 'Лазерная эпиляция' }] },
  { time: '17:00', cells: [{ name: 'Ирина Г.', proc: 'Уход' }, { free: true }, { name: 'Алёна П.', proc: 'Ботулинотерапия' }, { free: true }] },
  { time: '18:00', cells: [{ free: true }, { name: 'Мария С.', proc: 'Пилинг' }, { free: true }, { dash: true }] },
  { time: '19:00', cells: [{ dash: true }, { dash: true }, { dash: true }, { dash: true }] },
];

const queue = [
  { name: 'Екатерина Лебедева', req: 'Хочу убрать пигментацию', time: '11:15', status: 'Новая', isNew: true },
  { name: 'Анастасия Морозова', req: 'Инъекции, носогубные складки', time: '10:58', status: 'Ждёт назначения' },
  { name: 'Ольга Виноградова', req: 'Подбор ухода, чувствительная кожа', time: '10:42', status: 'Ждёт назначения' },
  { name: 'Юлия Костина', req: 'Лазерная эпиляция', time: '10:30', status: 'Ждёт назначения' },
  { name: 'Татьяна Самойлова', req: 'Контурная пластика губ', time: '10:12', status: 'Ждёт назначения' },
  { name: 'Мария Белова', req: 'Уход и чистка', time: '09:55', status: 'Ждёт назначения' },
];

const specialists = [
  { name: 'Мария Иванова', role: 'Косметолог', time: '09:00 – 18:00', cab: 'Каб. 1', on: true },
  { name: 'Алексей Петров', role: 'Врач-косметолог', time: '10:00 – 19:00', cab: 'Каб. 3', on: true },
  { name: 'Ольга Смирнова', role: 'Косметолог', time: '09:00 – 17:00', cab: 'Каб. 2', on: true },
  { name: 'Наталья Кузнецова', role: 'Косметолог', time: '11:00 – 20:00', cab: 'Каб. 4', on: true },
  { name: 'Екатерина Волкова', role: 'Косметолог', time: 'Выходной', cab: '—', on: false },
  { name: 'Дмитрий Соколов', role: 'Врач-дерматолог', time: 'Выходной', cab: '—', on: false },
];

const tasks = [
  { text: 'Проверить новых лидов из видеоконсультаций', time: '11:00', done: true },
  { text: 'Назначить 5 пациентов на очный приём', time: '3 / 5', done: false },
  { text: 'Связаться с клиентами без записи', time: '0 / 8', done: false },
  { text: 'Разобрать новые заявки', time: '12 новых', done: false },
  { text: 'Проверить загрузку кабинетов на завтра', time: '—', done: false },
];

const notifications = [
  { icon: 'Video', text: 'Новая видеоконсультация от Ларисы', sub: 'Екатерина Лебедева', time: '11:15' },
  { icon: 'CalendarX', text: 'Запись отменена', sub: 'Мария С., 10 июля в 16:00', time: '10:48' },
  { icon: 'Star', text: 'Новый отзыв о клинике', sub: '5 звёзд', time: '10:21' },
  { icon: 'Percent', text: 'Акция «Лазерная эпиляция -15%» активна', sub: 'до 31 июля', time: '09:30' },
];

const chat = [
  { name: 'Мария Иванова', role: 'Админ', time: '11:28', text: 'Коллеги, добавила 2 новых слота на завтра на 12:00 и 15:30.', likes: 2 },
  { name: 'Алексей Петров', time: '11:30', text: 'Принято, спасибо! 🙌' },
  { name: 'Ольга Смирнова', time: '11:32', text: 'Напоминаю про собрание в 17:00.' },
];

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <div
      className="rounded-full bg-gradient-to-br from-primary/80 to-accent-foreground/70 flex items-center justify-center text-primary-foreground font-medium shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-2xl border border-border/70 shadow-sm ${className}`}>{children}</div>
  );
}

export default function Index() {
  const [city, setCity] = useState('Севастополь');
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="w-[248px] shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-bold tracking-tight text-primary">СКЛ</span>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground leading-tight">
              Сеть клиник<br />красивых людей
            </div>
          </div>
        </div>

        {/* City selector */}
        <div className="px-4 relative">
          <button
            onClick={() => setCityOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sidebar-border bg-card hover:bg-sidebar-accent/40 transition-colors"
          >
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-medium flex-1 text-left">{city}</span>
            <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
          </button>
          {cityOpen && (
            <div className="absolute left-4 right-4 mt-1 z-20 bg-card rounded-xl border border-border shadow-lg py-1 animate-scale-in">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCity(c); setCityOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-accent/50 transition-colors"
                >
                  {c}
                  {c === city && <Icon name="Check" size={14} className="text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="px-3 mt-4 flex-1 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                item.active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/40'
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Invite */}
        <div className="px-4 pb-4 space-y-3">
          <div className="rounded-xl border border-primary/30 bg-accent/40 p-4">
            <div className="flex items-start gap-2 mb-3">
              <Icon name="Gift" size={22} className="text-primary shrink-0" />
              <p className="text-xs text-foreground/80 leading-snug">Пригласите коллегу и получите бонусы</p>
            </div>
            <button className="w-full py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              Пригласить
            </button>
          </div>
          <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground">
            <Icon name="Headphones" size={22} className="text-primary shrink-0" />
            <div>
              <div className="font-semibold text-foreground">8 (800) 555-50-50</div>
              <div>Ежедневно с 9:00 до 21:00</div>
            </div>
          </div>
          <div className="px-2 text-[10px] text-muted-foreground/70">© 2026 СКЛ</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Админ города — {city}
          </h1>
          <div className="flex items-center gap-5">
            <button className="relative">
              <Icon name="Bell" size={22} className="text-foreground/70" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">5</span>
            </button>
            <div className="flex items-center gap-3">
              <Avatar name="Администратор" size={38} />
              <div className="leading-tight">
                <div className="text-sm font-medium">Администратор</div>
                <div className="text-xs text-muted-foreground">{city}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 pb-10 space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-5">
            {metrics.map((m, i) => (
              <Card key={m.label} className="p-5 animate-fade-in" >
                <div className="flex items-start gap-4" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Icon name={m.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
                    <div className="font-display text-3xl font-semibold leading-none">{m.value}</div>
                    <div className={`text-xs mt-1.5 ${m.subColor}`}>{m.sub}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Row: schedule + queue + video */}
          <div className="grid grid-cols-[1.55fr_1.15fr_1fr] gap-6">
            {/* Schedule */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold">Расписание на сегодня</h2>
                <div className="flex items-center gap-2 text-sm">
                  <button className="w-6 h-6 rounded-md hover:bg-accent flex items-center justify-center"><Icon name="ChevronLeft" size={16} /></button>
                  <span className="text-muted-foreground">10 июля 2026, пятница</span>
                  <button className="w-6 h-6 rounded-md hover:bg-accent flex items-center justify-center"><Icon name="ChevronRight" size={16} /></button>
                </div>
              </div>
              <div className="grid grid-cols-[48px_repeat(4,1fr)] gap-1.5 text-xs">
                <div />
                {rooms.map((r, i) => (
                  <div key={r} className="text-center pb-1.5">
                    <div className="font-medium text-foreground">{r}</div>
                    <div className="text-[10px] text-muted-foreground">{roomTypes[i]}</div>
                  </div>
                ))}
                {schedule.map((row) => (
                  <div key={row.time} className="contents">
                    <div className="text-muted-foreground text-[11px] flex items-center">{row.time}</div>
                    {row.cells[0]?.lunch ? (
                      <div className="col-span-4 bg-accent/50 rounded-lg py-1.5 text-center text-muted-foreground text-[11px]">Обеденный перерыв</div>
                    ) : (
                      row.cells.map((c, i) => (
                        <div
                          key={i}
                          className={`rounded-lg px-2 py-1.5 min-h-[36px] ${
                            c.dash ? 'text-center text-muted-foreground/40'
                            : c.free ? 'bg-muted/40 text-muted-foreground text-center'
                            : 'bg-accent/60 border border-primary/10'
                          }`}
                        >
                          {c.dash ? '—' : c.free ? 'Свободно' : (
                            <>
                              <div className="font-medium text-foreground text-[11px] leading-tight">{c.name}</div>
                              <div className="text-[10px] text-muted-foreground leading-tight">{c.proc}</div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
                Полное расписание <Icon name="ChevronRight" size={15} />
              </button>
            </Card>

            {/* Queue */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-display text-xl font-semibold">Очередь пациентов из видеоконсультаций Ларисы</h2>
                <span className="bg-primary/15 text-primary text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center shrink-0">6</span>
              </div>
              <div className="space-y-2.5">
                {queue.map((q) => (
                  <div key={q.name} className="flex items-center gap-3">
                    <Avatar name={q.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{q.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{q.req}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-muted-foreground mb-1">{q.time}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md ${q.isNew ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{q.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
                Открыть полный список <Icon name="ChevronRight" size={15} />
              </button>
            </Card>

            {/* Video + team chat */}
            <div className="space-y-6">
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-xl font-semibold">Текущая видеовстреча</h2>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-rec" />
                    <span className="text-muted-foreground">00:18</span>
                    <Icon name="Maximize2" size={14} className="text-muted-foreground" />
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={VIDEO_IMG} alt="Видеовстреча" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2">
                    {['Mic', 'Video', 'MonitorUp', 'MoreHorizontal'].map((ic) => (
                      <button key={ic} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
                        <Icon name={ic} size={15} />
                      </button>
                    ))}
                    <button className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                      <Icon name="PhoneOff" size={15} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <Avatar name="Анастасия Морозова" size={34} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Анастасия Морозова</div>
                    <div className="text-xs text-muted-foreground truncate">Инъекции, носогубные складки</div>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">Карточка</button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-lg font-semibold">Чат команды — {city}</h2>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Icon name="Users" size={13} /> 12</span>
                </div>
                <div className="space-y-3 mb-3">
                  {chat.map((m) => (
                    <div key={m.time} className="flex gap-2.5">
                      <Avatar name={m.name} size={30} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{m.name}</span>
                          {m.role && <span className="text-[9px] bg-accent text-primary px-1.5 py-0.5 rounded">{m.role}</span>}
                          <span className="text-[10px] text-muted-foreground">{m.time}</span>
                        </div>
                        <p className="text-xs text-foreground/80 mt-0.5">{m.text}</p>
                        {m.likes && <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground mt-1 bg-accent/50 px-1.5 py-0.5 rounded-full">❤️ {m.likes}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2">
                  <input placeholder="Введите сообщение..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                  <Icon name="Smile" size={16} className="text-muted-foreground" />
                  <button className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Icon name="Send" size={13} /></button>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Specialists */}
            <Card className="p-5">
              <h2 className="font-display text-xl font-semibold mb-4">Специалисты сегодня</h2>
              <div className="space-y-3">
                {specialists.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <Avatar name={s.name} size={34} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.role}</div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right shrink-0">
                      <div>{s.time}</div>
                      <div>{s.cab}</div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs shrink-0 w-24 justify-end ${s.on ? 'text-primary' : 'text-muted-foreground'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.on ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
                      {s.on ? 'На приёме' : 'Выходной'}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
                Все специалисты <Icon name="ChevronRight" size={15} />
              </button>
            </Card>

            {/* Tasks */}
            <Card className="p-5">
              <h2 className="font-display text-xl font-semibold mb-4">Мои задачи и напоминания</h2>
              <div className="space-y-3">
                {tasks.map((t) => (
                  <div key={t.text} className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${t.done ? 'bg-primary border-primary' : 'border-muted-foreground/40'}`}>
                      {t.done && <Icon name="Check" size={11} className="text-primary-foreground" />}
                    </span>
                    <span className={`flex-1 text-sm ${t.done ? 'line-through text-muted-foreground' : ''}`}>{t.text}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{t.time}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
                Все задачи <Icon name="ChevronRight" size={15} />
              </button>
            </Card>

            {/* Notifications */}
            <Card className="p-5">
              <h2 className="font-display text-xl font-semibold mb-4">Уведомления</h2>
              <div className="space-y-3.5">
                {notifications.map((n) => (
                  <div key={n.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <Icon name={n.icon} size={15} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{n.text}</div>
                      <div className="text-xs text-muted-foreground">{n.sub}</div>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
                Все уведомления <Icon name="ChevronRight" size={15} />
              </button>
            </Card>
          </div>

          {/* Footer signature */}
          <div className="flex items-center justify-between pt-4 text-muted-foreground">
            <p className="font-display text-lg italic">Ваш успех — это счастье и уверенность наших пациентов.</p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Лариса Воловик</span>
              <span className="font-signature text-4xl text-primary">Лариса</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
