import { HydrateClient } from "@/trpc/server";
import { MainHero } from "./_components/heroes/main/MySwiper";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="">
				<div className="max-h-dvh">
					<MainHero />
				</div>
			</main>
		</HydrateClient>
	);
}
