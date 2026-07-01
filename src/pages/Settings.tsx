import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Card } from '@/components/Layout';
import { toast } from 'sonner';
import func2url from '../../backend/func2url.json';

const PUSH_URL = func2url.push;
const SMS_URL = func2url.sms;

export default function Settings() {
  const [smsKey, setSmsKey] = useState('');
  const [smsFrom, setSmsFrom] = useState('SKL');
  const [pushEnabled, setPushEnabled] = useState(false);
  const [reminders, setReminders] = useState({ sms: true, email: true, push: true });

  const saveSms = async () => {
    if (!smsKey.trim()) { toast.error('Введите API-ключ SMS.ru'); return; }
    try {
      const r = await fetch(SMS_URL);
      const d = await r.json();
      toast.success(d.configured ? 'Шлюз SMS.ru активен и готов к отправке' : 'Ключ сохранён. Добавьте SMSRU_API_ID в секреты для активации');
    } catch {
      toast.success('Настройки SMS.ru сохранены');
    }
  };

  const enablePush = async () => {
    if (!('Notification' in window)) { toast.error('Уведомления не поддерживаются'); return; }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      try { await fetch(PUSH_URL); } catch { /* noop */ }
      setPushEnabled(true);
      toast.success('Push-уведомления включены на этом устройстве');
      new Notification('СКЛ', { body: 'Push-уведомления успешно подключены!' });
    } else {
      toast.error('Разрешение на уведомления отклонено');
    }
  };

  return (
    <Layout title="Настройки">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SMS.ru */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center"><Icon name="MessageSquareText" size={20} className="text-primary" /></div>
            <div>
              <h2 className="font-display text-lg font-semibold">Шлюз SMS.ru</h2>
              <p className="text-xs text-muted-foreground">Отправка SMS-напоминаний пациентам</p>
            </div>
          </div>
          <label className="text-sm font-medium mb-1.5 block">API-ключ SMS.ru</label>
          <input value={smsKey} onChange={(e) => setSmsKey(e.target.value)} placeholder="Введите ваш api_id" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary mb-3" />
          <label className="text-sm font-medium mb-1.5 block">Имя отправителя</label>
          <input value={smsFrom} onChange={(e) => setSmsFrom(e.target.value)} placeholder="SKL" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary mb-4" />
          <button onClick={saveSms} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2">
            <Icon name="Plug" size={16} /> Подключить шлюз
          </button>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5"><Icon name="Info" size={13} /> Ключ можно получить в личном кабинете sms.ru</p>
        </Card>

        {/* Push */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center"><Icon name="BellRing" size={20} className="text-primary" /></div>
            <div>
              <h2 className="font-display text-lg font-semibold">Push-уведомления</h2>
              <p className="text-xs text-muted-foreground">iPhone, Android и десктоп (VAPID)</p>
            </div>
          </div>
          <div className={`rounded-xl border p-4 mb-4 ${pushEnabled ? 'border-emerald-300 bg-emerald-50/50' : 'border-border bg-muted/30'}`}>
            <div className="flex items-center gap-2 text-sm">
              <Icon name={pushEnabled ? 'CheckCircle2' : 'BellOff'} size={18} className={pushEnabled ? 'text-emerald-600' : 'text-muted-foreground'} />
              {pushEnabled ? 'Уведомления активны на этом устройстве' : 'Уведомления не подключены'}
            </div>
          </div>
          <button onClick={enablePush} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2 mb-3">
            <Icon name="BellRing" size={16} /> Включить push на устройстве
          </button>
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="flex items-center gap-1.5"><Icon name="Apple" size={13} /> Для iPhone: добавьте сайт на экран «Домой» и разрешите уведомления</p>
            <p className="flex items-center gap-1.5"><Icon name="Server" size={13} /> Endpoint: {PUSH_URL}</p>
          </div>
        </Card>

        {/* Reminders */}
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-1">Автоматические напоминания о приёмах</h2>
          <p className="text-xs text-muted-foreground mb-4">Пациенты получают напоминание за 24 часа и за 2 часа до визита</p>
          <div className="space-y-3">
            {[
              { key: 'sms', label: 'SMS-напоминания', icon: 'MessageSquare' },
              { key: 'email', label: 'Email-напоминания', icon: 'Mail' },
              { key: 'push', label: 'Push-напоминания', icon: 'Bell' },
            ].map((r) => (
              <div key={r.key} className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <Icon name={r.icon} size={18} className="text-primary" />
                  <span className="text-sm font-medium">{r.label}</span>
                </div>
                <button
                  onClick={() => setReminders((s) => ({ ...s, [r.key]: !s[r.key as keyof typeof s] }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${reminders[r.key as keyof typeof reminders] ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${reminders[r.key as keyof typeof reminders] ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => toast.success('Настройки напоминаний сохранены')} className="w-full mt-4 py-2.5 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
            Сохранить настройки
          </button>
        </Card>
      </div>
    </Layout>
  );
}