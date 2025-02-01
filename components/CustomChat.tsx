import { streamClient } from '@/streamConfig';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Text, View } from 'react-native';
import { Channel as ChannelType, StreamChat } from "stream-chat";
import { Chat, OverlayProvider, Channel, Loading, MessageList, MessageInput } from "stream-chat-expo";

type CustomChatProps =
    | { id: string; members?: never }
    | { id?: never; members: string[] };

function CustomChat({ id, members }: CustomChatProps) {
    const [channel, setChannel] = useState<ChannelType>();

    useEffect(() => {
        const createAndWatchChannel = async () => {
            let newChannel;
            if (id)
                newChannel = streamClient.channel("messaging", id);
            else if (members)
                newChannel = streamClient.channel("messaging", {
                    members: members
                });

            await newChannel!.watch();
            console.log((await newChannel?.queryMembers({}))?.members);
            setChannel(newChannel);
        };
        createAndWatchChannel();
    }, []);

    if (!channel) return <Loading />
    console.log("loaded2")

    return (
        <Chat client={streamClient}>
            <Channel channel={channel}>
                <MessageList />
                <MessageInput />
            </Channel>
        </Chat>
    )
}

export default CustomChat