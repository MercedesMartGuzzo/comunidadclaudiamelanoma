'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Image as ImageIcon, Smile, Send, X, Check } from 'lucide-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface Props {
    onPublish: (content: string) => void;
    initialData?: { id: string; content: string };
    onCancel?: () => void;
}

export default function CreatePost({ onPublish, initialData, onCancel }: Props) {
    const [content, setContent] = useState(initialData?.content || '');
    const [userInitial, setUserInitial] = useState('U');
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Lógica para cerrar el emoji picker al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        async function getActiveUser() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('name, avatar_url')
                        .eq('id', user.id)
                        .maybeSingle();
                    if (profile?.avatar_url) setUserAvatar(profile.avatar_url);
                    const name = profile?.name || user.user_metadata?.name || 'U';
                    setUserInitial(name.charAt(0).toUpperCase());
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }
        getActiveUser();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error } = await supabase.storage.from('avatars').upload(filePath, file);
        if (error) { console.error(error.message); return; }

        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        setSelectedImage(data.publicUrl);
    };

    const handleSubmit = () => {
        if (!content.trim() && !selectedImage) return;
        const finalContent = selectedImage ? `${content}\n\n![img](${selectedImage})` : content;
        onPublish(finalContent.trim());
        
        if (!initialData) {
            setContent('');
            setSelectedImage(null);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 hover:shadow-[0_4px_20px_rgba(0,60,67,0.07)] transition-shadow">
            <div className="flex items-start gap-3">
                <div className="relative rounded-full bg-[#E3FEF7] w-10 h-10 flex items-center justify-center overflow-hidden shrink-0 font-bold text-[#003C43]">
                    {userAvatar ? <Image src={userAvatar} alt="Mi Perfil" fill className="object-cover" unoptimized /> : userInitial}
                </div>

                <div className="w-full relative">
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder={initialData ? "Editando tu publicación..." : "Compartí tu experiencia o un mensaje de apoyo..."}
                        rows={3}
                        className="w-full bg-[#f6fafa] rounded-xl p-3 text-sm outline-none border-2 border-transparent focus:border-[#003C43]/15 resize-none"
                    />
                    {selectedImage && (
                        <div className="mt-2 relative w-20 h-20">
                            {/* Cambiado object-cover a object-contain para que la imagen no se corte */}
                            <Image src={selectedImage} alt="Preview" fill className="rounded-lg object-contain" unoptimized />
                            <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X size={12} /></button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 pl-[52px]">
                <div className="flex gap-3 relative">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-xs text-[#003C43]/50 hover:text-[#003C43]"><ImageIcon size={16} /> Foto</button>
                    
                    <div ref={emojiPickerRef}>
                        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="flex items-center gap-1.5 text-xs text-[#003C43]/50 hover:text-[#003C43]"><Smile size={16} /> Emoción</button>
                        {showEmojiPicker && (
                            // Contenedor fixed que centra el picker en toda la pantalla (móvil y desktop)
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20" onClick={() => setShowEmojiPicker(false)}>
                                <div className="shadow-2xl rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
                                    <EmojiPicker 
                                        theme={Theme.LIGHT} 
                                        onEmojiClick={(e: EmojiClickData) => {
                                            setContent(prev => prev + e.emoji);
                                        }} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    {initialData && (
                        <button onClick={onCancel} className="px-4 py-2 rounded-md text-xs font-bold uppercase text-[#003C43]/60 hover:text-[#003C43]">
                            Cancelar
                        </button>
                    )}
                    <button onClick={handleSubmit} disabled={!content.trim() && !selectedImage} className="bg-[#003C43] text-[#E3FEF7] px-5 py-2 rounded-md text-xs font-bold uppercase hover:bg-[#00252a] disabled:opacity-40">
                        {initialData ? <><Check size={14} className="inline mr-2" /> Guardar</> : <><Send size={14} className="inline mr-2" /> Publicar</>}
                    </button>
                </div>
            </div>
        </div>
    );
}