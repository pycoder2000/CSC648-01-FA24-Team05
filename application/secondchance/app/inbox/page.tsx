import Conversation from "@/app/components/inbox/Conversation";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
};

const InboxPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  const conversations = await apiService.get("/api/chat/");

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <h1 className="my-6 text-2xl">Inbox</h1>

      {conversations.map((conversation: ConversationType) => {
        return (
          <Conversation
            userId={userId}
            key={conversation.id}
            conversation={conversation}
          />
        );
      })}
    </main>
  );
};

export default InboxPage;
