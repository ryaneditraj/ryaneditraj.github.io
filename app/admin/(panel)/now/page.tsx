import { NowEditor } from "@/components/now-editor";
import { getNow } from "@/lib/content";

export default function NowAdminPage() {
  const now = getNow();
  return (
    <>
      <h1>Now</h1>
      <NowEditor text={now.text} source={now.source} />
    </>
  );
}
