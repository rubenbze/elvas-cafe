export default function PageBackground() {
  return (
    <>
      {/* BACKGROUND IMAGE */}

      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1800&auto=format&fit=crop')",
        }}
      />

      {/* DARK OVERLAY */}

      <div className="fixed inset-0 bg-black/75" />

      {/* GOLD OVERLAY */}

      <div className="fixed inset-0 bg-gradient-to-b from-black/10 via-[#120d0a]/50 to-[#120d0a]" />

      {/* GLOW */}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(214,185,140,0.15),transparent_60%)]" />
    </>
  );
}