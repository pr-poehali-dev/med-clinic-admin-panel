import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Layout, { Card } from '@/components/Layout';
import { toast } from 'sonner';

const pages = [
  { name: 'Главная страница', path: '/', status: 'Опубликовано' },
  { name: 'Форма лидов', path: '/lead-form', status: 'Опубликовано' },
  { name: 'Веб-чат клиента', path: '/webchat', status: 'Опубликовано' },
  { name: 'Публичная запись', path: '/booking', status: 'Черновик' },
];

const access = [
  { role: 'Админ', perms: 'Полный доступ ко всем разделам и городам' },
  { role: 'Админ города', perms: 'Управление своим городом, лиды, расписание' },
  { role: 'Доктор', perms: 'Видеовстречи, пациенты, свой календарь' },
  { role: 'Медсестра', perms: 'Расписание, задачи, просмотр пациентов' },
];

export default function Admin() {
  const [site, setSite] = useState({ title: 'СКЛ — Сеть клиник красивых людей', slogan: 'Ваш успех — это счастье и уверенность наших пациентов.', phone: '+7 (951) 846-62-04' });

  return (
    <Layout title="Супер-админ">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20">
        <Icon name="ShieldCheck" size={22} className="text-primary" />
        <div className="text-sm"><span className="font-medium">Режим супер-администратора.</span> <span className="text-muted-foreground">Полный контроль над сайтом, доступами и контентом.</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site editing */}
        <Card className="p-5">
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2"><Icon name="Pencil" size={18} className="text-primary" /> Редактирование сайта</h2>
          <div className="space-y-3">
            <div><label className="text-sm font-medium mb-1 block">Название сайта</label><input value={site.title} onChange={(e) => setSite({ ...site, title: e.target.value })} className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" /></div>
            <div><label className="text-sm font-medium mb-1 block">Слоган</label><input value={site.slogan} onChange={(e) => setSite({ ...site, slogan: e.target.value })} className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" /></div>
            <div><label className="text-sm font-medium mb-1 block">Телефон поддержки</label><input value={site.phone} onChange={(e) => setSite({ ...site, phone: e.target.value })} className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" /></div>
          </div>
          <button onClick={() => toast.success('Изменения сайта сохранены')} className="w-full mt-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Сохранить изменения</button>
        </Card>

        {/* Pages */}
        <Card className="p-5">
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2"><Icon name="Files" size={18} className="text-primary" /> Страницы сайта</h2>
          <div className="space-y-2">
            {pages.map((p) => (
              <div key={p.path} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-accent/30 transition-colors">
                <div><div className="text-sm font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{p.path}</div></div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-md ${p.status === 'Опубликовано' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
                  <button onClick={() => toast.success(`Редактор: ${p.name}`)} className="text-muted-foreground hover:text-primary"><Icon name="Pencil" size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Access control */}
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2"><Icon name="KeyRound" size={18} className="text-primary" /> Управление доступом по ролям</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {access.map((a) => (
              <div key={a.role} className="p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{a.role}</span>
                  <button onClick={() => toast.success(`Права роли «${a.role}» открыты`)} className="text-xs text-primary hover:underline">Изменить</button>
                </div>
                <p className="text-xs text-muted-foreground">{a.perms}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
