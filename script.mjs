import { StreamChat } from "stream-chat";

export const streamClient = StreamChat.getInstance("93cd9367vtxd", {
    allowServerSideConnect: true
});
console.log("client");
console.log(streamClient);
const a = await streamClient.connectUser(
    {
        id: "omar_hassan",
        name: "Omar"
    },
    streamClient.devToken("omar_hassan"),
);

console.log("a");
console.log(a);