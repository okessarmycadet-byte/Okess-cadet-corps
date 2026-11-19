-- Storage buckets for Corps public media

insert into storage.buckets (id, name, public)
values
  ('corps-images', 'corps-images', true),
  ('corps-videos', 'corps-videos', true),
  ('corps-documents', 'corps-documents', false)
on conflict (id) do nothing;

-- Public can view public image assets
create policy "Public view Corps images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'corps-images');

-- Public can view public video assets
create policy "Public view Corps videos"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'corps-videos');

-- Admins may upload Corps images
create policy "Admins upload Corps images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'corps-images'
  and public.has_admin_access()
);

-- Admins may update Corps images
create policy "Admins update Corps images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'corps-images'
  and public.has_admin_access()
)
with check (
  bucket_id = 'corps-images'
  and public.has_admin_access()
);

-- Admins may delete Corps images
create policy "Admins delete Corps images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'corps-images'
  and public.has_admin_access()
);

-- Admins may upload Corps videos
create policy "Admins upload Corps videos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'corps-videos'
  and public.has_admin_access()
);

-- Admins may update Corps videos
create policy "Admins update Corps videos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'corps-videos'
  and public.has_admin_access()
)
with check (
  bucket_id = 'corps-videos'
  and public.has_admin_access()
);

-- Admins may delete Corps videos
create policy "Admins delete Corps videos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'corps-videos'
  and public.has_admin_access()
);

-- Private Corps documents
create policy "Admins access Corps documents"
on storage.objects
for all
to authenticated
using (
  bucket_id = 'corps-documents'
  and public.has_admin_access()
)
with check (
  bucket_id = 'corps-documents'
  and public.has_admin_access()
);
