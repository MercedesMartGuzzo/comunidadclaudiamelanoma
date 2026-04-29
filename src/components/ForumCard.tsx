interface ForumCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

export default function ForumCard({ icon, title, description, tags }: ForumCardProps) {
  return (
    <div className="group w-full bg-[var(--clr-surface-low)] rounded-lg p-6 gap-6 hover:shadow-[0_20px_40px_rgba(0,80,70,0.1)] transition-shadow">
      <div className="mb-6">{icon}</div>
      <h3 className="font-inconsolata text-lg font-semibold text-[#003C43] mb-2">{title}</h3>
      <p className="text-sm text-[#181c1d] mb-3 font-noto-sans leading-relaxed">{description}</p>
      <div className="flex gap-3 flex-wrap mb-3">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-xs uppercase font-medium text-[#003C43] tracking-wider font-inconsolata">
            {tag}
          </span>
        ))}
      </div>
      <button className="mt-2 text-sm font-medium text-[#003C43] hover:text-[#00252a] transition flex items-center gap-1 font-noto-sans">
        Entrar al foro
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
