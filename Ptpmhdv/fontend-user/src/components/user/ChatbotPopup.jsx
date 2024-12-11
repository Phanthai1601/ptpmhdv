import { useRef, useState } from 'react'
import chat from '../../assets/icons/Remove-bg.ai_1733943439497.png'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    MainContainer,
    ChatContainer,
    Message,
    MessageList,
    MessageInput,
    TypingIndicator
} from '@chatscope/chat-ui-kit-react'
import axios from 'axios'

const API_URL = process.env.REACT_APP_CHAT_API

const ChatbotPopup = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: 'Xin chào, Tôi là ChatBot, Tôi có thể giúp gì bạn 😊',
            sender: 'ChatBot',
            direction: 'incoming'
        }
    ])

    const inputRef = useRef(null)
    const handleSend = async (message) => {
        const userMessage = { message, sender: 'user', direction: 'outgoing' }

        setMessages((prevMessages) => [...prevMessages, userMessage])

        setTyping(true)

        try {
            const response = await processMessageToChatBot(message)
            await displayTypingEffect(response)
        } catch (error) {
            console.error('Error communicating with chatbot:', error)
        } finally {
            setTyping(false)
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    }

    const processMessageToChatBot = async (text) => {
        const apiRequestBody = {
            contents: [
                {
                    parts: [{ text }]
                }
            ]
        }

        try {
            const response = await axios.post(API_URL, apiRequestBody)

            if (
                response.data &&
                response.data.candidates &&
                response.data.candidates[0] &&
                response.data.candidates[0].content &&
                response.data.candidates[0].content.parts &&
                response.data.candidates[0].content.parts[0].text
            ) {
                let modelResponse = response.data.candidates[0].content.parts[0].text
                const formattedResponse = modelResponse.replace(/\*/g, '')

                return formattedResponse
            } else {
                throw new Error('Invalid response format')
            }
        } catch (error) {
            console.error('Error fetching data from API:', error)
            return 'Rất tiếc, tôi không thể trả lời câu hỏi của bạn ngay bây giờ.'
        }
    }
    const displayTypingEffect = async (fullMessage) => {
        return new Promise((resolve) => {
            let currentMessage = ''
            const charsPerStep = 3

            const typingEffect = () => {
                if (currentMessage.length < fullMessage.length) {
                    currentMessage += fullMessage.slice(currentMessage.length, currentMessage.length + charsPerStep)

                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages]
                        if (updatedMessages[updatedMessages.length - 1].sender === 'ChatBot') {
                            updatedMessages[updatedMessages.length - 1].message = currentMessage
                        } else {
                            updatedMessages.push({
                                message: currentMessage,
                                sender: 'ChatBot',
                                direction: 'incoming'
                            })
                        }
                        return updatedMessages
                    })

                    requestAnimationFrame(typingEffect)
                } else {
                    resolve()
                }
            }

            requestAnimationFrame(typingEffect)
        })
    }

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all transform duration-300"
                >
                    <img src={chat} alt="Chatbot" className="w-screen" />
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute bottom-20 right-4 z-50 bg-white rounded-lg shadow-lg w-[350px] h-[80%] p-4 transition-transform transform duration-300 ease-in-out"
                    style={{ position: 'fixed' }}
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-0.5 right-1 text-sm text-gray-500 hover:text-gray-700 transition-all duration-300"
                    >
                        ✖
                    </button>
                    <MainContainer className="w-full h-full">
                        <ChatContainer>
                            <MessageList
                                typingIndicator={typing ? <TypingIndicator content="ChatBot đang soạn tin..." /> : null}
                            >
                                {messages.map((message, index) => (
                                    <Message key={index} model={message} />
                                ))}
                            </MessageList>
                            <MessageInput
                                ref={inputRef}
                                placeholder="Hãy đặt câu hỏi"
                                onSend={handleSend}
                                disabled={typing}
                                className="border-t-2 border-gray-200 pt-2"
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
            )}
        </>
    )
}

export default ChatbotPopup
