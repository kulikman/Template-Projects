import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardMenu } from "@/components/dashboard/card-menu";
import { INBOX } from "@/components/dashboard/demo-data";

/** Latest conversations list. */
export function InboxCard(): React.ReactElement {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="mb-2 flex items-baseline justify-between">
          <CardTitle>Inbox</CardTitle>
          <CardMenu />
        </div>
        <ul className="flex flex-col">
          {INBOX.map((message) => (
            <li
              key={message.id}
              className="border-border flex items-center gap-3 border-b py-3 first:pt-0 last:border-b-0 last:pb-0"
            >
              <Avatar src={message.avatar} alt={message.name} />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <h6 className="mb-1 text-sm font-medium">{message.name}</h6>
                  <p className="text-muted-foreground text-xs">{message.time}</p>
                </div>
                <p className="text-muted-foreground truncate text-[0.8125rem]">{message.preview}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
