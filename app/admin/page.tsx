
"use client";

setReservations(reservationsData || []);

setLoading(false);
}

useEffect(() => {
if (loggedIn) {
fetchDashboard();
}
}, [loggedIn]);

async function updateReservation(id: number, status: string) {
await supabase
.from("reservations")
.update({ status })
.eq("id", id);

fetchDashboard();
}

if (!loggedIn) {
return (
<main className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
<div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-10">
<h1 className="text-4xl mb-8 text-center text-[#f5e6c8]">
Admin Login
</h1>

<input
type="password"
placeholder="Enter admin password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full p-4 rounded-2xl bg-black border border-white/10 outline-none mb-6"
/>

<button
onClick={() => {
if (password === "elvasadmin") {
setLoggedIn(true);
}
}}
className="w-full bg-[#d6b98c] text-black py-4 rounded-2xl font-semibold"
>
Login
</button>
</div>
</main>
);
}

return (
<main className="min-h-screen bg-black text-white p-6 md:p-10">
<div className="max-w-7xl mx-auto">
<div className="flex justify-between items-center mb-10">
<h1 className="text-5xl text-[#f5e6c8]">Admin Dashboard</h1>

<button
onClick={fetchDashboard}
className="bg-[#d6b98c] text-black px-6 py-3 rounded-2xl"
>
Refresh Dashboard
</button>
</div>

{loading ? (
<p>Loading...</p>
) : (
<>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
<div className="bg-[#111] border border-white/10 rounded-3xl p-8"