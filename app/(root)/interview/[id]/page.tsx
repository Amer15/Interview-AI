import Agent from "@/components/agent";
import TechStackIcons from "@/components/tech-stack-icons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/interview.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const interview = await getInterviewById(id);
  const user = await getCurrentUser();

  if (!interview) redirect("/");

  console.log(interview);

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4">
            <Image
              src={getRandomInterviewCover()}
              alt="logo"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>
          <TechStackIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
          {interview.type}
        </p>
      </div>
      <Agent
        userName={user!.name}
        userId={user!.id}
        interviewId={interview.id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default InterviewDetails;
