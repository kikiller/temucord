import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';

export function Canales({ serverId }: { serverId: number }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('open');
    const [description, setDescription] = useState('');

    const handleCreateChannel = () => {
        if (!serverId) {
            alert("Error: No hay servidor seleccionado.");
            return;
        }

        router.post(
            `/servers/${serverId}/channels`,
            {
                name,
                type,
                description,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    setName('');
                    setType('open');
                    setDescription('');
                },
                onError: (errors) => {
                    console.log(errors);
                    alert(JSON.stringify(errors));
                },
            }
        );
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-4 w-4 items-center justify-center text-gray-400 hover:text-gray-100 transition"
                title="Crear Canal"
            >
                <Plus size={16} />
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="border-none bg-[#313338] text-gray-200 sm:max-w-[425px]">
                    <div className="mt-4 space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white">Crear un canal</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Organiza tu servidor creando canales para diferentes temas.
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-gray-400">
                                Nombre del canal *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">#</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="nuevo-canal"
                                    className="w-full rounded-md border-none bg-[#1e1f22] px-8 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-gray-400">
                                Tipo de canal
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full rounded-md border-none bg-[#1e1f22] px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="open">Abierto (Público)</option>
                                <option value="closed">Cerrado (Privado)</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-gray-400">
                                Descripción (Opcional)
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Propósito de este canal..."
                                rows={2}
                                className="w-full resize-none rounded-md border-none bg-[#1e1f22] px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex justify-end gap-4 border-t border-[#1e1f22] pt-4">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-sm font-medium hover:underline text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateChannel}
                                disabled={!name.trim()}
                                className="rounded-md bg-[#5865f2] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#4752c4] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Crear Canal
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}