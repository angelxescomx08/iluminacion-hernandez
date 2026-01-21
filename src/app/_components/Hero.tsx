import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.heroSection}>
			<div className={styles.heroImageContainer}>
				<Image
					alt="Hero"
					className={styles.heroImage}
					fill
					priority
					sizes="100vw"
					src={"/assets/images/heroes/hero.webp"}
				/>
			</div>

			<div className={styles.heroText}>
				<h1 className="font-bold font-montserrat text-shadow-md text-white text-xl md:text-5xl">
					Iluminación que transforma tus espacios
				</h1>
				<p className="mt-4 font-inter font-medium text-lg text-shadow-md text-white md:text-3xl">
					Lámparas modernas, clásicas y decorativas para cada necesidad
				</p>
			</div>
		</section>
	);
}
