import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/interview.action";
import Image from "next/image";
import Link from "next/link";

const Homepage = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);
  const hasPastInterviews = userInterviews ? userInterviews.length > 0 : false;
  const hasLatestInterviews = latestInterviews
    ? latestInterviews.length > 0
    : false;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Excel in interviews with AI-powered mocks and feedbacks</h2>
          <p className="text-lg">
            Practice on real interview questions and get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="AI robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>you have&apos;t taken any interview</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {hasLatestInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>no latest interviews to show</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Homepage;
