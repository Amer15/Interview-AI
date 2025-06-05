import Agent from "@/components/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewPage = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName={user?.name ?? "user"} userId={user?.id} type="generate" />
    </>
  );
};

export default InterviewPage;
