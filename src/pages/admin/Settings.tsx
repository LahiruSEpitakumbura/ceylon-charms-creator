import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Settings</h1><p className="text-muted-foreground">Configure admin settings</p></div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><SettingsIcon className="h-5 w-5" />General Settings</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Settings configuration coming soon...</p></CardContent>
      </Card>
    </div>
  );
}
