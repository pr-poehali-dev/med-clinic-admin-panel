import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Avatar, Card } from '@/components/Layout';
import { toast } from 'sonner';

const channels = [
  { name: 'Команда Администраторов', last: 'Напоминаю о новых скриптах…', time: '11:32', unread: 4, members: 12 },
  { name: 'Менеджеры городов', last: 'Добавил новые слоты на завтра.', time: '10:15', unread: 2, members: 8 },
  { name: 'Врачи и специалисты', last: 'Обсуждаем сложный случай.', time: '09:47', unread: 1, members: 24 },
  { name: 'Маркетинг', last: 'Новые креативы готовы к запуску.', time: 'Вчера', unread: 0, members: 6 },
  { name: 'Техническая поддержка', last: 'Решили проблему с интеграцией.', time: 'Вчера', unread: 0, members: 5 },
];

interface Msg { id: number; name: string; role?: string; text?: string; time: string; me?: boolean; file?: { name: string; url: string; type: string } }

const initialMsgs: Record<string, Msg[]> = {
  'Команда Администраторов': [
    { id: 1, name: 'Екатерина Смирнова', role: 'Админ', text: 'Напоминаю о новых скриптах для работы с возражениями.', time: '11:28' },
    { id: 2, name: 'Анна Сергеева', text: 'Отлично! Уже внедряем в работу.', time: '11:33' },
    { id: 3, name: 'Ирина Кузнецова', text: 'Коллеги, не забудьте про обновление регламента записи.', time: '11:34' },
  ],
};

export default function Chats() {
  const [active, setActive] = useState(channels[0].name);
  const [msgs, setMsgs] = useState<Msg[]>(initialMsgs['Команда Администраторов']);
  const [text, setText] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: Date.now(), name: 'Вы', me: true, text, time: now() }]);
    setText('');
  };

  const now = () => new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setMsgs((m) => [...m, { id: Date.now(), name: 'Вы', me: true, time: now(), file: { name: f.name, url, type: f.type } }]);
    toast.success('Файл прикреплён');
    e.target.value = '';
  };

  const copyInvite = () => {
    navigator.clipboard?.writeText(`https://скл.рф/invite/${active.replace(/\s/g, '-').toLowerCase()}-a91x`);
    toast.success('Ссылка-приглашение скопирована');
  };

  const sendInvite = () => {
    if (!email.includes('@')) { toast.error('Введите корректный email'); return; }
    toast.success(`Приглашение отправлено на ${email}`);
    setEmail(''); setInviteOpen(false);
  };

  return (
    <Layout title="Чаты команды">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-[calc(100vh-200px)] min-h-[520px]">
        {/* Channels */}
        <Card className="p-3 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-2 py-2">
            <h2 className="font-display text-lg font-semibold">Чаты</h2>
            <button onClick={() => setInviteOpen(true)} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Icon name="UserPlus" size={16} /></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1">
            {channels.map((c) => (
              <button
                key={c.name}
                onClick={() => { setActive(c.name); setMsgs(initialMsgs[c.name] || [{ id: 1, name: 'Система', text: 'Начните общение в этом чате', time: now() }]); }}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors ${active === c.name ? 'bg-accent' : 'hover:bg-accent/40'}`}
              >
                <Avatar name={c.name} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground truncate">{c.last}</span>
                    {c.unread > 0 && <span className="bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0">{c.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Messages */}
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar name={active} size={40} />
              <div>
                <div className="font-medium">{active}</div>
                <div className="text-xs text-muted-foreground">{channels.find((c) => c.name === active)?.members} участников</div>
              </div>
            </div>
            <button onClick={copyInvite} className="hidden sm:flex items-center gap-1.5 text-sm text-primary hover:underline"><Icon name="Link" size={15} /> Пригласить</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m) => (
              <div key={m.id} className={`flex gap-2.5 ${m.me ? 'flex-row-reverse' : ''}`}>
                {!m.me && <Avatar name={m.name} size={32} />}
                <div className={`max-w-[75%] ${m.me ? 'items-end' : ''} flex flex-col`}>
                  {!m.me && (
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium">{m.name}</span>
                      {m.role && <span className="text-[9px] bg-accent text-primary px-1.5 py-0.5 rounded">{m.role}</span>}
                    </div>
                  )}
                  <div className={`rounded-2xl px-3.5 py-2 ${m.me ? 'bg-primary text-primary-foreground' : 'bg-accent/60'}`}>
                    {m.text && <p className="text-sm">{m.text}</p>}
                    {m.file && (
                      m.file.type.startsWith('image/') ? (
                        <img src={m.file.url} alt={m.file.name} className="rounded-lg max-w-[220px] max-h-[220px] object-cover" />
                      ) : (
                        <a href={m.file.url} download={m.file.name} className="flex items-center gap-2 text-sm underline">
                          <Icon name="Paperclip" size={14} /> {m.file.name}
                        </a>
                      )
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{m.time}</span>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-border flex items-center gap-2">
            <input type="file" ref={fileRef} onChange={onFile} className="hidden" />
            <button onClick={() => fileRef.current?.click()} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-accent shrink-0"><Icon name="Paperclip" size={17} className="text-muted-foreground" /></button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Введите сообщение..."
              className="flex-1 bg-transparent text-sm outline-none border border-border rounded-xl px-4 py-2.5"
            />
            <button onClick={send} className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0"><Icon name="Send" size={16} /></button>
          </div>
        </Card>
      </div>

      {inviteOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setInviteOpen(false)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-semibold">Пригласить участника</h3>
              <button onClick={() => setInviteOpen(false)}><Icon name="X" size={20} /></button>
            </div>
            <button onClick={copyInvite} className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border hover:bg-accent/40 mb-4 text-sm">
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
