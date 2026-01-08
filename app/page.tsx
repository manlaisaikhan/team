import CommunityFeedPreview from "@/components/community-feed-preview";
import CtaFooter from "@/components/cta-footer";
import Hero3D from "@/components/hero3D";
import HowItWorks from "@/components/how-it-works";
import LeaderboardPreview from "@/components/leaderboard-preview";
import ValueProps from "@/components/value-props";

export default function HomePage() {
  return (
    <main className="bg-black">
      <Hero3D />
      <ValueProps />
      <HowItWorks />
      <LeaderboardPreview />
      <CommunityFeedPreview />
      <CtaFooter />
    </main>
  );
}
