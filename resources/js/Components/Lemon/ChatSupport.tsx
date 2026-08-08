import React, { useState, useEffect, useRef } from 'react';

interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
}

export default function ChatSupport() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'bot', text: 'Hi! I am the Little Lemon assistant 🍋. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), sender: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock bot reply
        setTimeout(() => {
            let replyText = "I'm sorry, I didn't understand that. Could you please rephrase?";
            const lowerInput = userMsg.text.toLowerCase();
            
            if (lowerInput.includes('hour') || lowerInput.includes('open')) {
                replyText = "We are open Monday to Sunday from 10:00 AM to 10:00 PM.";
            } else if (lowerInput.includes('vegan') || lowerInput.includes('vegetarian')) {
                replyText = "Yes! We have several vegan and vegetarian options on our menu, including our Superfood Salad.";
            } else if (lowerInput.includes('reservation') || lowerInput.includes('book')) {
                replyText = "You can make a reservation by clicking the 'Reserve' button in the navigation bar.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                replyText = "Hello there! How can I assist you with your Little Lemon experience?";
            }

            setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: replyText }]);
        }, 800);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 w-14 h-14 bg-amber-500 hover:bg-amber-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:-translate-y-1'}`}
            >
                <svg className="w-6 h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>

            {/* Chat Window Modal */}
            <div className={`fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                
                {/* Header */}
                <div className="bg-amber-500 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🍋</div>
                        <span className="font-bold text-slate-900 text-sm">Support Chat</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-slate-900 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto max-h-[350px] bg-slate-50 dark:bg-slate-950 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user' ? 'bg-amber-500 text-slate-900 rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-bl-sm'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <form onSubmit={handleSend} className="flex items-center space-x-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                        />
                        <button 
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 rounded-full p-2.5 transition-colors"
                        >
                            <svg className="w-4 h-4 translate-x-px -translate-y-px" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
