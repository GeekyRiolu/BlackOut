import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const defaultState = {
  title: '',
  date: new Date().toISOString().slice(0,10),
  platform: '',
  state: '',
  district: '',
  authority: '',
  category: '',
  legalReason: '',
  contentType: 'other',
  description: '',
  reporterEmail: '',
};

const IncidentForm: React.FC = () => {
  const [form, setForm] = useState(defaultState);
  const [submitting, setSubmitting] = useState(false);

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!form.title || !form.date || !form.state || !form.platform) {
      alert('Please fill required fields: Title, Date, State, Platform.');
      return;
    }

    setSubmitting(true);

    try {
      const existing = JSON.parse(localStorage.getItem('submittedIncidents') || '[]');
      const next = {
        id: Date.now(),
        ...form,
        status: 'Pending',
      };
      existing.unshift(next);
      localStorage.setItem('submittedIncidents', JSON.stringify(existing));
      // Give user immediate feedback
      alert('Thank you — your submission has been recorded and will be reviewed by our team.');
      // reset
      setForm(defaultState);
    } catch (err) {
      console.error(err);
      alert('Submission failed — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
  // limit form height so dialog doesn't grow too tall; scroll internally if needed
  <form onSubmit={handleSubmit} className="space-y-4 max-h-[520px] overflow-y-auto pr-2 no-scrollbar">
      <div>
        <label className="text-sm font-medium">Title*</label>
        <Input value={form.title} onChange={(e) => update('title', e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium">Date*</label>
        <Input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Platform*</label>
          <Input value={form.platform} onChange={(e) => update('platform', e.target.value)} placeholder="YouTube, Twitter/X, Website, etc." />
        </div>
        <div>
          <label className="text-sm font-medium">State*</label>
          <Input value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="State or All India" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Authority</label>
          <Input value={form.authority} onChange={(e) => update('authority', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <Input value={form.category} onChange={(e) => update('category', e.target.value)} placeholder="Misinformation, Hate Speech, etc." />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Legal Reason</label>
        <Input value={form.legalReason} onChange={(e) => update('legalReason', e.target.value)} placeholder="IT Act Section 69A, Court Order, etc." />
      </div>

      <div>
        <label className="text-sm font-medium">Content Type</label>
        <Select value={form.contentType} onValueChange={(v) => update('contentType', v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social_media">Social Media</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="film">Film</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the incident and provide links if available" />
      </div>

      <div>
        <label className="text-sm font-medium">Your email (optional)</label>
        <Input value={form.reporterEmail} onChange={(e) => update('reporterEmail', e.target.value)} placeholder="contact@example.com" />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</Button>
      </div>
    </form>
  );
};

export default IncidentForm;
