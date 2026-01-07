import { Settings, User, Trash2, Shield, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsViewProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
  onClearData: () => void;
}

export function SettingsView({ userName, userEmail, onLogout, onClearData }: SettingsViewProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary mb-1">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Preferences</span>
        </div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account preferences</p>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Profile
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold">{userName}</p>
            <p className="text-muted-foreground">{userEmail}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
              Pro Account
            </span>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border/30">
            <div>
              <p className="font-medium">Currency</p>
              <p className="text-sm text-muted-foreground">Display currency for amounts</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-secondary text-sm font-medium">USD ($)</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/30">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">App appearance</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-secondary text-sm font-medium">Dark Mode</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Data Storage</p>
              <p className="text-sm text-muted-foreground">Your data is stored locally</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-income/20 text-income text-sm font-medium">Local</span>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security & Data
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-start gap-3">
              <Trash2 className="w-5 h-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-destructive">Clear All Data</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This will permanently delete all your transactions. This action cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3"
                  onClick={onClearData}
                >
                  Clear All Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <Button
        variant="outline"
        className="w-full h-12 border-border/50"
        onClick={onLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
