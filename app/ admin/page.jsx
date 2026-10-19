import { auth, signOut } from "@/auth"; import { database } from "@/lib/db"; import { redirect } from "next/navigation";
export default async function AdminPage() { const session = await auth(); const email = session?.user?.email?.trim().toLowerCase(); const owner = process.env.OWNER_EMAIL?.trim().toLowerCase();
if (!email) redirect("/"); if (!owner || email !== owner) redirect("/dashboard");
const sql = database(); const requests = await sqlSELECT email, full_name, status, created_at, updated_at FROM membership_requests ORDER BY created_at DESC;;
const labels = { PENDING: "قيد المراجعة", APPROVED: "مقبول", REJECTED: "مرفوض", EXCLUDED: "مستبعد", };
return ( <main className="container"> <section className="card"> <div className="tag">OWNER DASHBOARD</div> <h1>لوحة إدارة العضويات</h1> <p>مرحباً بك، يمكنك مراجعة طلبات الانضمام واتخاذ القرار.</p> <p><strong>حسابك:</strong> {email}</p>
    <form action={async () => {
      "use server";
      await signOut({ redirectTo: "/" });
    }}>
      <button type="submit" className="button secondary">تسجيل الخروج</button>
    </form>
  </section>
</main>
); }
