'use client';

import { useState } from 'react';
import { mockUsers } from '@/lib/mock-data/users';
import { Image as ImageIcon, Smile, Send } from 'lucide-react';

interface Props {
    onPublish: (content: string) => void;
}

export default function CreatePost({ onPublish }: Props) {
    const [content, setContent] = useState('');
    const user = mockUsers[0];

    const handleSubmit = () => {
        if (!content.trim()) return;
        onPublish(content.trim());
        setContent('');
    };

    return (
        <div className="bg-white rounded-xl p-6 hover:shadow-[0_4px_20px_rgba(0,60,67,0.07)] transition-shadow">
            <div className="flex items-start gap-3">
                <div
                    className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm"
                    style={{ width: '40px', height: '40px', minWidth: '40px' }}
                >
                    {user.name.charAt(0)}
                </div>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Compartí tu experiencia o un mensaje de apoyo..."
                    rows={3}
                    className="w-full bg-[#f6fafa] rounded-xl p-3 text-sm font-noto-sans text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/15 transition-colors resize-none"
                />
            </div>

            <div className="flex items-center justify-between mt-4 pl-[52px]">
                <div className="flex gap-3">
                    <button className="flex items-center gap-1.5 text-xs text-[#003C43]/50 hover:text-[#003C43] transition-colors font-noto-sans">
                        <ImageIcon className="w-4 h-4" />
                        Foto
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-[#003C43]/50 hover:text-[#003C43] transition-colors font-noto-sans">
                        <Smile className="w-4 h-4" />
                        Emoción
                    </button>
                </div>

                <button
                    disabled={!content.trim()}
                    onClick={handleSubmit}
                    className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-md hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Send className="w-3.5 h-3.5" />
                    Publicar
                </button>
            </div>
        </div>
    );
}