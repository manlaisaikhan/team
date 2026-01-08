import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* glow blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-500/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-400/30 rounded-full blur-[120px]" />

      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#6366f1",
            colorText: "#ffffff",
            colorInputBackground: "rgba(255,255,255,0.08)",
            colorInputText: "#ffffff",
            borderRadius: "14px",
          },
          elements: {
            card: `
              backdrop-blur-2xl
              bg-black/50
              border border-white/10
              shadow-[0_40px_120px_rgba(99,102,241,0.45)]
            `,
            headerTitle: `
              text-3xl font-extrabold
              bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400
              bg-clip-text text-transparent
            `,
            headerSubtitle: "text-white/70",
            formFieldInput: `
              bg-white/10
              border border-white/20
              text-white
              placeholder:text-white/40
            `,
            formButtonPrimary: `
              bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
              hover:brightness-110
              shadow-[0_15px_40px_rgba(79,70,229,0.55)]
            `,
            footerActionLink: "text-cyan-400 hover:text-cyan-300",
          },
        }}
      />
    </div>
  );
}
