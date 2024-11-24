import Message from '../models/message.js';
import User from '../models/user.js';

export const sendMessage = async (userId, eventId, messageText) => {
    const sentTime = new Date(); 

    try {
        const message = await Message.create({
            user_id: userId,
            event_id: eventId,
            message_text: messageText,
            sent_time: sentTime,
        });

        return message;
    } catch (error) {
        throw new Error('Error sending message: ' + error.message);
    }
};

export const getMessagesByEvent = async (eventId) => {
    try {
        const messages = await Message.findAll({
            where: { event_id: eventId },
            include: [{ model: User, attributes: ['id', 'username'] }],
            order: [['sent_time', 'ASC']], 
        });

        return messages;
    } catch (error) {
        throw new Error('Error fetching messages: ' + error.message);
    }
};
