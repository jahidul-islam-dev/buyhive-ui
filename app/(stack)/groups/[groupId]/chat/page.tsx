import { ChatScreen } from "@/components/buyhive/screens/chat-screen"

export default async function GroupChatPage({
  params,
}: {
  params: Promise<{ groupId: string }>
}) {
  const { groupId } = await params
  return <ChatScreen groupId={groupId} />
}
