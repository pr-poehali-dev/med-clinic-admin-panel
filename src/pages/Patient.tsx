/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Avatar, Card } from '@/components/Layout';
import { toast } from 'sonner';

const VIDEO_IMG =
  'https://cdn.poehali.dev/projects/f0055936-a3cd-4ff9-a9fa-6e376202e022/files/1ae3c293-ad7e-49c0-b440-653da15aae7b.jpg';

interface Transcript { who: 'Пациент' | 'Администратор'; text: string; time: string }

const procedures = ['Чистка лица', 'Пилинг PRX-T33', 'Биоревитализация', 'Контурная пластика', 'Ботулинотерапия', 'Лазерная эпиляция', 'Мезотерапия'];
const responsibles = ['Мария Иванова — Косметолог', 'Алексей Петров — Врач-косметолог', 'Ольга Смирнова — Косметолог', 'Дмитрий Соколов — Дерматолог'];

export default function Patient() {
  const [transcript, setTranscript] = useState<Transcript[]>([
    { who: 'Пациент', text: 'Здравствуйте! Хочу убрать пигментацию на лице.', time: '11:15' },
    { who: 'Администратор', text: 'Добрый день! Расскажите, как давно появились пятна?', time: '11:16' },
  ]);
  const [recording, setRecording] = useState(false);
  const [interim, setInterim] = useState('');
  const [chosenProc, setChosenProc] = useState<string[]>([]);
  const [responsible, setResponsible] = useState('');
  const recRef = useRef<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [transcript, interim]);

  const toggleRec = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error('Распознавание речи не поддерживается в этом браузере'); return; }
    if (recording) {
      recRef.current?.stop();
      setRecording(false);
      return;
    }
    const rec = new SR();
    rec.lang = 'ru-RU';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let final = '';
      let inter = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else inter += e.results[i][0].transcript;
      }
      setInterim(inter);
      if (final) {
        setTranscript((t) => [...t, { who: 'Пациент', text: final, time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) }]);
        setInterim('');
      }
    };
    rec.onerror = () => { setRecording(false); toast.error('Ошибка распознавания'); };
    rec.start();
    recRef.current = rec;
    setRecording(true);
    toast.success('Распознавание речи включено');
  };

  const copyLink = () => {
    navigator.clipboard?.writeText('https://скл.рф/webchat/ekaterina-lebedeva-x7f2');
    toast.success('Ссылка на веб-чат скопирована');
  };

  const toggleProc = (p: string) => setChosenProc((c) => c.includes(p) ? c.filter((x) => x !== p) : [...c, p]);

  const assign = () => {
    if (!chosenProc.length || !responsible) { toast.error('Выберите процедуры и ответственного'); return; }
    toast.success('Назначение создано и передано ответственному');
  };

  return (
    <Layout
      title="Карточка пациента"
      actions={
        <button onClick={copyLink} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Icon name="Link" size={16} /> Ссылка на веб-чат
        </button>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
        {/* Video + transcript */}
        <div className="space-y-6">
          <Card className="p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-semibold">Видеоконсультация</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-rec" />
                <span className="text-muted-foreground">Идёт запись · 24:31</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
              <img src={VIDEO_IMG} alt="Пациент" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">Екатерина Лебедева</div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2">
                {['Mic', 'Video', 'MonitorUp', 'MessageSquare'].map((ic) => (
                  <button key={ic} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"><Icon name={ic} size={16} /></button>
                ))}
                <button className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white"><Icon name="PhoneOff" size={16} /></button>
              </div>
            </div>
            <button onClick={copyLink} className="md:hidden w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              <Icon name="Link" size={16} /> Ссылка на веб-чат
            </button>
          </Card>

          <Card className="p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Icon name="Captions" size={20} className="text-primary" /> Распознавание речи</h2>
              <button
                onClick={toggleRec}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${recording ? 'bg-red-500 text-white' : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}
              >
                <Icon name={recording ? 'Square' : 'Mic'} size={15} /> {recording ? 'Стоп' : 'Начать'}
              </button>
            </div>
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {transcript.map((t, i) => (
                <div key={i} className={`flex ${t.who === 'Администратор' ? 'justify-end' : ''}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 ${t.who === 'Администратор' ? 'bg-primary text-primary-foreground' : 'bg-accent/60'}`}>
                    <div className="text-[10px] opacity-70 mb-0.5">{t.who} · {t.time}</div>
                    <div className="text-sm">{t.text}</div>
                  </div>
                </div>
              ))}
              {interim && (
                <div className="flex">
                  <div className="max-w-[80%] rounded-2xl px-3.5 py-2 bg-accent/30 border border-dashed border-primary/30">
                    <div className="text-sm text-muted-foreground italic">{interim}…</div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
              <Icon name="Info" size={13} /> Текст встречи автоматически фиксируется и доступен администратору
            </p>
          </Card>
        </div>

        {/* Patient data + assignment */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar name="Екатерина Лебедева" size={48} />
              <div>
                <div className="font-display text-lg font-semibold">Екатерина Лебедева</div>
                <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-md">Новая заявка</span>
              </div>
            </div>
            <div className="space-y-2.5 text-sm">
              {[
                ['Город', 'Санкт-Петербург'], ['Запрос', 'Убрать пигментацию'],
                ['Источник', 'Instagram'], ['Телефон', '+7 (921) 555-12-34'],
                ['Следующий шаг', 'Рекомендовать специалиста'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-lg font-semibold mb-3">Назначение процедур</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {procedures.map((p) => (
                <button
                  key={p}
                  onClick={() => toggleProc(p)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${chosenProc.includes(p) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent/50'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <label className="text-sm font-medium mb-1.5 block">Ответственный специалист</label>
            <select
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-card mb-4 outline-none focus:border-primary"
            >
              <option value="">Выберите специалиста</option>
              {responsibles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button onClick={assign} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2">
              <Icon name="ClipboardCheck" size={16} /> Создать назначение
            </button>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-lg font-semibold mb-3">Что делать с клиентом</h3>
            <div className="space-y-2">
              {[
                { i: 'CalendarPlus', t: 'Записать на очный приём' },
                { i: 'UserRoundPlus', t: 'Передать специалисту в городе' },
                { i: 'Phone', t: 'Перезвонить клиенту' },
                { i: 'Bell', t: 'Напомнить о приёме (SMS / Push)' },
              ].map((a) => (
                <button key={a.t} onClick={() => toast.success(a.t)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border hover:bg-accent/40 transition-colors text-sm text-left">
                  <Icon name={a.i} size={16} className="text-primary" /> {a.t}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}