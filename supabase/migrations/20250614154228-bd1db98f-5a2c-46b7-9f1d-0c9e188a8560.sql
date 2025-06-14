
-- Allow public anonymous users to insert into ebook_downloads (for e-book downloads)
CREATE POLICY "Allow public inserts for ebook downloads"
  ON public.ebook_downloads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public anonymous users to insert into newsletter_subscribers (for newsletter signups/confirmation)
CREATE POLICY "Allow public inserts for newsletter subscribers"
  ON public.newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);
