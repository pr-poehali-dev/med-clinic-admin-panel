import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Layout, { Avatar, Card } from '@/components/Layout';

const VIDEO_IMG =
  'https://cdn.poehali.dev/projects/f0055936-a3cd-4ff9-a9fa-6e376202e022/files/1ae3c293-ad7e-49c0-b440-653da15aae7b.jpg';

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

export default function Index() {
  return (
    <Layout title="Админ города — Севастополь">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {metrics.map((m, i) => (
          <Card key={m.label} className="p-4 md:p-5 animate-fade-in">
            <div className="flex items-start gap-3 md:gap-4" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Icon name={m.icon} size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
                <div className="font-display text-2xl md:text-3xl font-semibold leading-none">{m.value}</div>
                <div className={`text-xs mt-1.5 ${m.subColor}`}>{m.sub}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_1.15fr_1fr] gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">Расписание на сегодня</h2>
            <Link to="/schedule" className="text-sm text-primary hover:underline hidden sm:block">Открыть</Link>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[48px_repeat(4,minmax(90px,1fr))] gap-1.5 text-xs min-w-[440px]">
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
                          c.free ? 'bg-muted/40 text-muted-foreground text-center' : 'bg-accent/60 border border-primary/10'
                        }`}
                      >
                        {c.free ? 'Свободно' : (
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
          </div>
          <Link to="/schedule" className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
            Полное расписание <Icon name="ChevronRight" size={15} />
          </Link>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-display text-xl font-semibold">Очередь пациентов из видеоконсультаций Ларисы</h2>
            <span className="bg-primary/15 text-primary text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center shrink-0">6</span>
          </div>
          <div className="space-y-2.5">
            {queue.map((q) => (
              <Link to="/patient" key={q.name} className="flex items-center gap-3 hover:bg-accent/30 -mx-2 px-2 py-1 rounded-lg transition-colors">
                <Avatar name={q.name} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{q.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{q.req}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground mb-1">{q.time}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md ${q.isNew ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{q.status}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/patient" className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
            Открыть полный список <Icon name="ChevronRight" size={15} />
          </Link>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-semibold">Текущая видеовстреча</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-rec" />
                <span className="text-muted-foreground">00:18</span>
              </div>
            </div>
            <Link to="/patient" className="relative rounded-xl overflow-hidden aspect-[4/3] block">
              <img src={VIDEO_IMG} alt="Видеовстреча" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2">
                {['Mic', 'Video', 'MonitorUp'].map((ic) => (
                  <span key={ic} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <Icon name={ic} size={15} />
                  </span>
                ))}
                <span className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                  <Icon name="PhoneOff" size={15} />
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-3 mt-3">
              <Avatar name="Анастасия Морозова" size={34} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">Анастасия Морозова</div>
                <div className="text-xs text-muted-foreground truncate">Инъекции, носогубные складки</div>
              </div>
              <Link to="/patient" className="text-xs px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">Карточка</Link>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-semibold">Чат команды</h2>
              <Link to="/chats" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Icon name="Users" size={13} /> 12</Link>
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
            <Link to="/chats" className="flex items-center justify-center gap-2 border border-border rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent/40 transition-colors">
              Открыть чаты <Icon name="ChevronRight" size={14} />
            </Link>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <div className="text-xs text-muted-foreground text-right shrink-0 hidden sm:block">
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
          <Link to="/team" className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
            Все специалисты <Icon name="ChevronRight" size={15} />
          </Link>
        </Card>

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
          <Link to="/marketing" className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
            Все задачи <Icon name="ChevronRight" size={15} />
          </Link>
        </Card>

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
          <Link to="/settings" className="w-full mt-4 py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/40 transition-colors">
            Настроить уведомления <Icon name="ChevronRight" size={15} />
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
