'use client';

import { useEffect, useState } from "react";

const ChatPage = () => {
    const [messages, setMessages] = useState<{ id: number; user: string; text: string }[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        // メッセージを取得する関数
        const fetchMessages = async () => {
            try {
                const response = await fetch('/api/chat/messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('メッセージの取得に失敗しました:', error);
            }
        };

        fetchMessages();

        // メッセージの定期的な取得
        const interval = setInterval(fetchMessages, 5000);

        // クリーンアップ
        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await fetch('/api/chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newMessage }),
            });

            if (response.ok) {
                setNewMessage('');
                // 再度メッセージを取得
                const updatedResponse = await fetch('/api/chat/messages');
                const updatedData = await updatedResponse.json();
                setMessages(updatedData);
            } else {
                console.error('メッセージの送信に失敗しました');
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    };

    return (
        <div className='chat-container'>
            <h1>チャットページ</h1>
            <div className='messages'>
                {messages.map((message) => (
                    <div key={message.id} className='message'>
                        <strong>{message.user}</strong>: {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder='メッセージを入力してください'
                />
                <button type='submit'>送信</button>
            </form>
        </div>
    );
};

export default ChatPage;

