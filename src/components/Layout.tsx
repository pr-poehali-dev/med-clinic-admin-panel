import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export const nav = [
  { icon: 'LayoutGrid', label: 'Дашборд', path: '/' },
  { icon: 'Sparkles', label: 'Лиды', path: '/leads' },
  { icon: 'CalendarDays', label: 'Расписание', path: '/schedule' },
  { icon: 'UserRound', label: 'Пациенты', path: '/patient' },
  { icon: 'Video', label: 'Видеовстречи', path: '/patient' },
  { icon: 'UsersRound', label: 'Команда', path: '/team' },
  { icon: 'MessageCircle', label: 'Чаты', path: '/chats' },
  { icon: 'Megaphone', label: 'Маркетинг', path: '/marketing' },
  { icon: 'Settings', label: 'Настройки', path: '/settings' },
  { icon: 'ShieldCheck', label: 'Супер-админ', path: '/admin' },
];

const cities = ['Санкт-Петербург', 'Москва', 'Севастополь', 'Владивосток', 'Краснодар'];

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
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

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-card rounded-2xl border border-border/70 shadow-sm ${className}`}>{children}</div>;
}

interface LayoutProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function Layout({ title, children, actions }: LayoutProps) {
  const [city, setCity] = useState('Севастополь');
  const [cityOpen, setCityOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-3xl font-bold tracking-tight text-primary">СКЛ</span>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground leading-tight">
            Сеть клиник<br />красивых людей
          </div>
        </div>
      </div>

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
          <div className="absolute left-4 right-4 mt-1 z-30 bg-card rounded-xl border border-border shadow-lg py-1 animate-scale-in">
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

      <nav className="px-3 mt-4 flex-1 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/40'
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4 space-y-3">
        <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground">
          <Icon name="Headphones" size={22} className="text-primary shrink-0" />
          <div>
            <div className="font-semibold text-foreground">+7 (951) 846-62-04</div>
            <div>Ежедневно с 9:00 до 21:00</div>
          </div>
        </div>
        <div className="px-2 text-[10px] text-muted-foreground/70">© 2026 СКЛ</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[248px] shrink-0 bg-sidebar border-r border-sidebar-border flex-col h-screen sticky top-0">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-sidebar border-r border-sidebar-border z-50 lg:hidden animate-slide-in-right">
            {SidebarContent}
          </aside>
        </>
      )}

      <main className="flex-1 min-w-0">
        <header className="flex items-center justify-between gap-4 px-4 md:px-8 py-4 md:py-6 sticky top-0 bg-background/90 backdrop-blur z-20 border-b border-border/50">
          <div className="flex items-center gap-3 min-w-0">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Icon name="Menu" size={24} />
            </button>
            <h1 className="font-display text-xl md:text-3xl font-semibold tracking-tight truncate">{title}</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            {actions}
            <button className="relative">
              <Icon name="Bell" size={22} className="text-foreground/70" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">5</span>
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <Avatar name="Администратор" size={38} />
              <div className="leading-tight">
                <div className="text-sm font-medium">Администратор</div>
                <div className="text-xs text-muted-foreground">{city}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 md:px-8 py-6 space-y-6">{children}</div>

        <div className="px-4 md:px-8 pb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-muted-foreground">
          <p className="font-display text-base md:text-lg italic">Ваш успех — это счастье и уверенность наших пациентов.</p>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm">Лариса Воловик</span>
              <span className="font-signature text-4xl text-primary">Лариса</span>
            </div>
            <a
              href="https://мастерскаягорбунова.рф"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-primary transition-colors"
            >
              Разработано в Мастерской Горбунова
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
