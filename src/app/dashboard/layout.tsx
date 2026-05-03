import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/**
 * Dashboard shell.
 *
 * Renders `<Breadcrumbs />` once for every nested dashboard route — this
 * is the canonical place to add them per CLAUDE.md (#URL hierarchy).
 *
 * Wrap with auth gate when you wire Supabase Auth:
 *
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 *   if (!user) redirect(ROUTES.login)
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumbs className="mb-6" />
      {children}
    </div>
  );
}
