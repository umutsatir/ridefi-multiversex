import { useState } from "react";
import { AuthRedirectWrapper } from "wrappers";
import { useScrollToElement } from "hooks";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "config/config.env";

interface Message {
    text: string;
    isUser: boolean;
    timestamp: number;
}

export const Search = () => {
    useScrollToElement();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage: Message = {
            text: input,
            isUser: true,
            timestamp: Date.now(),
        };
        setMessages([...messages, newMessage]);
        setInput("");
        AIResponse(input);
    };

    const ChatBubble = ({ message }: { message: Message }) => {
        return (
            <div
                className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                } my-2`}
            >
                <div
                    className={`p-3 rounded-md max-w-xs ${
                        message.isUser
                            ? "bg-blue-400 text-white"
                            : "bg-green-300 text-black"
                    }`}
                >
                    {message.text}
                </div>
            </div>
        );
    };

    const AIResponse = async (prompt: string) => {
        const apiKey = GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([prompt]);
        const response = await result.response;

        const newMessage: Message = {
            text: response.text(),
            isUser: false,
            timestamp: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col w-8/12 h-[calc(100vh-200px)] justify-between items-center border p-4">
                <h1 className="text-4xl font-bold">RideFi Chat</h1>

                <div
                    className="w-full flex flex-col gap-2 overflow-y-auto flex-1 p-2"
                    id="chat"
                >
                    {messages
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((msg, index) => (
                            <ChatBubble key={index} message={msg} />
                        ))}
                </div>

                <div className="w-full relative flex align-center mt-auto">
                    <input
                        type="text"
                        className="rounded w-full p-2 border border-white pr-10"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
